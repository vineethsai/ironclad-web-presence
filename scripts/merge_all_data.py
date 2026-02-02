#!/usr/bin/env python3
"""
Merge CitationMap location data with SerpAPI venue data for best of both worlds.
"""

import csv
import json
import re
import time
from collections import defaultdict
from pathlib import Path

SCHOLAR_ID = 'hIVoKbIAAAAJ'

# Self-citation patterns
SELF_NAMES = [
    'vineeth sai', 'vs narajala', 'vineeth sai narajala', 'v. s. narajala', 
    'narajala, v', 'narajala, vineeth', 'v s narajala', 'vineeth narajala',
    'v narajala', 'narajala v', 'narajala vs', 'vineeth s', 'v. narajala'
]

# Venue classification patterns
TIER1_PATTERNS = [
    r'\bieee\b', r'\bieee transactions\b', r'\bieee access\b', r'\bacm\b',
    r'\busenix\b', r'\bndss\b', r'\bccs\b', r'\bs&p\b', r'\binfocom\b',
    r'\bneurips\b', r'\bicml\b', r'\biclr\b', r'\bcvpr\b', r'\baaai\b', r'\bijcai\b',
    r'\bsosp\b', r'\bosdi\b', r'\bnsdi\b', r'\bsigcomm\b', r'\bmobicom\b',
    r'\bicse\b', r'\bfse\b', r'\bpldi\b', r'\bpopl\b', r'\bsigmod\b', r'\bvldb\b',
]

TIER2_PATTERNS = [
    r'\bspringer\b', r'\belsevier\b', r'\bnature\b', r'\bscience\b', r'\bplos\b',
    r'\bwiley\b', r'\bmdpi\b', r'\bsensors\b', r'\belectronics\b',
    r'\bjournal of\b', r'\btransactions on\b', r'\binternational journal\b',
    r'\bconference on\b', r'\bsymposium on\b', r'\bworkshop on\b', r'\bproceedings\b',
    r'\bceur-ws\b', r'\bopenreview\b', r'\bpubmed\b', r'\bncbi\b',
]

PREPRINT_PATTERNS = [
    r'\barxiv\b', r'\bpreprint\b', r'\bssrn\b', r'\bbiorxiv\b', r'\bmedrxiv\b',
    r'\bresearchgate\b', r'\bresearchsquare\b', r'\bzenodo\b', r'\bosf\.io\b',
    r'\bdigitalcommons\b', r'\brepository\b', r'\bproquest\b', r'\bthesis\b',
]

# Domain to search URL patterns
DOMAIN_SEARCH_URLS = {
    'arxiv.org': 'https://arxiv.org/search/?query={query}&searchtype=all',
    'ieeexplore.ieee.org': 'https://ieeexplore.ieee.org/search/searchresult.jsp?queryText={query}',
    'dl.acm.org': 'https://dl.acm.org/action/doSearch?AllField={query}',
    'springer.com': 'https://link.springer.com/search?query={query}',
    'sciencedirect.com': 'https://www.sciencedirect.com/search?qs={query}',
    'mdpi.com': 'https://www.mdpi.com/search?q={query}',
    'pmc.ncbi.nlm.nih.gov': 'https://www.ncbi.nlm.nih.gov/pmc/?term={query}',
    'openreview.net': 'https://openreview.net/search?term={query}',
}

def generate_paper_link(title, venue):
    """Generate a link to find the paper based on title and venue."""
    import urllib.parse
    
    # Clean the title for URL encoding
    clean_title = title.strip()
    encoded_title = urllib.parse.quote(clean_title)
    
    # Try to extract domain from venue
    venue_lower = venue.lower() if venue else ''
    
    # Check for known domains in venue string
    for domain, search_url in DOMAIN_SEARCH_URLS.items():
        if domain.split('.')[0] in venue_lower or domain in venue_lower:
            return search_url.format(query=encoded_title)
    
    # Check for arXiv preprint pattern and extract ID if possible
    arxiv_match = re.search(r'arxiv[:\s]*(\d{4}\.\d{4,5})', venue_lower)
    if arxiv_match:
        arxiv_id = arxiv_match.group(1)
        return f'https://arxiv.org/abs/{arxiv_id}'
    
    # Fallback to Google Scholar search
    return f'https://scholar.google.com/scholar?q={encoded_title}'

# Prestigious institutions
PRESTIGIOUS_INSTITUTIONS = [
    'stanford', 'mit', 'massachusetts institute', 'berkeley', 'uc berkeley',
    'carnegie mellon', 'cmu', 'harvard', 'princeton', 'cornell', 'georgia tech',
    'purdue', 'oxford', 'cambridge', 'eth zurich', 'tsinghua', 'peking', 'zhejiang',
    'national university of singapore', 'nus', 'kaist', 'google', 'microsoft',
    'meta', 'deepmind', 'amazon', 'nvidia', 'openai', 'anthropic', 'cisco',
    'yale', 'columbia', 'ucla', 'caltech', 'nyu', 'johns hopkins', 'duke',
    'ben-gurion', 'ben gurion', 'technion', 'tel aviv', 'tokyo', 'kyoto',
]

# Countries to exclude (geocoding noise)
EXCLUDED_COUNTRIES = ['Papua New Guinea', 'Mali']


def is_self_citation(author_name):
    if not author_name:
        return False
    author_lower = author_name.lower().strip()
    return any(name in author_lower for name in SELF_NAMES)


def get_venue_tier(venue):
    if not venue:
        return 'other'
    v = venue.lower()
    for pattern in PREPRINT_PATTERNS:
        if re.search(pattern, v):
            return 'preprint'
    for pattern in TIER1_PATTERNS:
        if re.search(pattern, v):
            return 'tier1'
    for pattern in TIER2_PATTERNS:
        if re.search(pattern, v):
            return 'tier2'
    return 'other'


def get_venue_score(tier):
    return {'tier1': 50, 'tier2': 35, 'preprint': 10, 'other': 20}[tier]


def is_prestigious(text):
    if not text:
        return False
    t = text.lower()
    return any(inst in t for inst in PRESTIGIOUS_INSTITUTIONS)


def normalize_country(country):
    if not country:
        return 'Unknown'
    c = country.strip()
    if c in ['USA', 'US']:
        return 'United States'
    if c == 'UK':
        return 'United Kingdom'
    return c


def main():
    script_dir = Path(__file__).parent
    csv_path = script_dir / 'citation_info.csv'
    serpapi_json = script_dir.parent / 'src' / 'data' / 'citations.json'
    output_path = script_dir.parent / 'src' / 'data' / 'citations.json'
    
    print("=" * 60)
    print("MERGING CITATIONMAP + SERPAPI DATA")
    print("=" * 60)
    
    # Load existing SerpAPI data for venue info AND links
    serpapi_venues = {}
    serpapi_links = {}
    serpapi_pubs = []
    if serpapi_json.exists():
        with open(serpapi_json, 'r') as f:
            serpapi_data = json.load(f)
        
        # Get venue info and links by paper title
        for paper in serpapi_data.get('citingPapers', []):
            title_key = paper.get('title', '').lower().strip()
            if paper.get('venue') and paper['venue'] != 'Unknown':
                serpapi_venues[title_key] = paper['venue']
            if paper.get('link'):
                serpapi_links[title_key] = paper['link']
        
        # Keep publications from SerpAPI (has citation counts)
        serpapi_pubs = serpapi_data.get('publications', [])
        print(f"Loaded {len(serpapi_venues)} venue records from SerpAPI")
        print(f"Loaded {len(serpapi_links)} link records from SerpAPI")
        print(f"Loaded {len(serpapi_pubs)} publications from SerpAPI")
    
    # Parse CitationMap CSV
    print(f"\nReading CitationMap CSV: {csv_path}")
    
    papers_by_title = {}
    locations_map = {}
    publications_set = set()
    self_citations_filtered = 0
    all_authors = set()
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            author = row.get('citing author name', '')
            citing_title = row.get('citing paper title', '')
            cited_title = row.get('cited paper title', '')
            affiliation = row.get('affiliation', '')
            lat = row.get('latitude', '')
            lng = row.get('longitude', '')
            country = row.get('country', '')
            city = row.get('city', '')
            
            if cited_title:
                publications_set.add(cited_title)
            
            # Filter self-citations
            if is_self_citation(author):
                self_citations_filtered += 1
                continue
            
            if not citing_title:
                continue
            
            # Filter geocoding noise
            if country in EXCLUDED_COUNTRIES:
                continue
            
            # Clean affiliation
            clean_aff = affiliation if affiliation and affiliation not in [
                'AI_ML', 'GENAI', 'Security', 'No_author_info', 'No_author_found'
            ] else ''
            
            # Get venue from SerpAPI data
            title_key = citing_title.lower().strip()
            venue = serpapi_venues.get(title_key, '')
            tier = get_venue_tier(venue)
            score = get_venue_score(tier)
            
            # Normalize country
            norm_country = normalize_country(country)
            
            # Check prestigious
            is_prest = is_prestigious(clean_aff) or is_prestigious(venue)
            
            if author:
                all_authors.add(author)
            
            if citing_title not in papers_by_title:
                # Get link from SerpAPI data or generate fallback
                paper_link = serpapi_links.get(title_key, '') or generate_paper_link(citing_title, venue)
                
                papers_by_title[citing_title] = {
                    'title': citing_title,
                    'authors': [author] if author else [],
                    'authors_set': {author} if author else set(),  # For dedup tracking
                    'venue': venue,
                    'link': paper_link,
                    'citationCount': 0,
                    'influenceScore': score,
                    'venueScore': score,
                    'citationScore': 0,
                    'citedPublication': cited_title,
                    'citedPublications': [cited_title] if cited_title else [],  # Track all cited papers
                    'affiliation': clean_aff or 'Unknown',
                    'affiliations': [clean_aff] if clean_aff else [],
                    'country': norm_country,
                    'tier': tier,
                    'isPrestigious': is_prest
                }
            else:
                # Add author if not already in this paper's author list
                if author and author not in papers_by_title[citing_title]['authors_set']:
                    papers_by_title[citing_title]['authors'].append(author)
                    papers_by_title[citing_title]['authors_set'].add(author)
                # Track all cited publications
                if cited_title and cited_title not in papers_by_title[citing_title]['citedPublications']:
                    papers_by_title[citing_title]['citedPublications'].append(cited_title)
                if clean_aff and clean_aff not in papers_by_title[citing_title]['affiliations']:
                    papers_by_title[citing_title]['affiliations'].append(clean_aff)
                    if papers_by_title[citing_title]['affiliation'] == 'Unknown':
                        papers_by_title[citing_title]['affiliation'] = clean_aff
                if norm_country != 'Unknown' and papers_by_title[citing_title]['country'] == 'Unknown':
                    papers_by_title[citing_title]['country'] = norm_country
                if is_prest:
                    papers_by_title[citing_title]['isPrestigious'] = True
            
            # Aggregate locations
            try:
                lat_f = float(lat) if lat else None
                lng_f = float(lng) if lng else None
                
                if lat_f and lng_f and country and country not in EXCLUDED_COUNTRIES:
                    key = f"{lat_f:.1f},{lng_f:.1f}"
                    
                    if key not in locations_map:
                        locations_map[key] = {
                            'latitude': lat_f,
                            'longitude': lng_f,
                            'country': norm_country,
                            'city': city or '',
                            'count': 0,
                            'papers': [],
                            'affiliations': []
                        }
                    
                    locations_map[key]['count'] += 1
                    
                    if len(locations_map[key]['papers']) < 10 and citing_title not in locations_map[key]['papers']:
                        locations_map[key]['papers'].append(citing_title)
                    
                    if clean_aff and clean_aff not in locations_map[key]['affiliations']:
                        locations_map[key]['affiliations'].append(clean_aff)
            except (ValueError, TypeError):
                pass
    
    # Convert to lists and clean up internal tracking fields
    citing_papers = []
    for paper in papers_by_title.values():
        paper.pop('authors_set', None)  # Remove tracking set
        citing_papers.append(paper)
    locations = sorted(locations_map.values(), key=lambda x: x['count'], reverse=True)
    
    # Calculate stats
    tier_counts = {'tier1': 0, 'tier2': 0, 'other': 0, 'preprint': 0}
    venue_counts = defaultdict(int)
    country_counts = defaultdict(int)
    prestigious_count = 0
    total_author_citations = 0  # Authors × citations per paper
    
    for paper in citing_papers:
        tier_counts[paper['tier']] += 1
        if paper['venue']:
            venue_counts[paper['venue']] += 1
        if paper.get('country') and paper['country'] != 'Unknown':
            country_counts[paper['country']] += 1
        if paper.get('isPrestigious'):
            prestigious_count += 1
        # Count authors × citations (how many author-citation events)
        num_cited = len(paper.get('citedPublications', []))
        if num_cited == 0:
            num_cited = 1
        total_author_citations += len(paper.get('authors', [])) * num_cited
    
    top_venues = sorted(venue_counts.items(), key=lambda x: x[1], reverse=True)[:15]
    top_countries = sorted(country_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    
    # Use SerpAPI publications (has citation counts)
    publications = serpapi_pubs if serpapi_pubs else [
        {'title': t, 'year': 2024, 'venue': '', 'citationCount': 0} 
        for t in publications_set
    ]
    
    # Create output
    citation_data = {
        'lastUpdated': time.strftime('%Y-%m-%dT%H:%M:%S.000Z'),
        'scholarId': SCHOLAR_ID,
        'publications': publications,
        'citingPapers': citing_papers,
        'locations': locations,
        'stats': {
            'totalCitations': len(citing_papers),
            'uniqueLocations': len(locations),
            'topVenues': [{'name': v[0], 'count': v[1]} for v in top_venues],
            'influenceDistribution': {
                'high': tier_counts['tier1'] + prestigious_count,
                'medium': tier_counts['tier2'],
                'low': tier_counts['other'] + tier_counts['preprint']
            },
            'tierDistribution': tier_counts,
            'topCountries': [{'name': c[0], 'count': c[1]} for c in top_countries],
            'prestigiousCount': prestigious_count,
            'uniqueAuthors': len(all_authors),
            'totalAuthorCitations': total_author_citations  # Authors × citations (like old 503)
        }
    }
    
    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(citation_data, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print(f"\n{'='*60}")
    print("MERGE COMPLETE")
    print(f"{'='*60}")
    print(f"\nOutput: {output_path}")
    
    total_gs = sum(p.get('citationCount', 0) or 0 for p in publications)
    
    print(f"\n{'='*40}")
    print("SUMMARY")
    print(f"{'='*40}")
    print(f"  Your publications: {len(publications)}")
    print(f"  Google Scholar total: {total_gs}")
    print(f"  External citing papers: {len(citing_papers)}")
    print(f"  Self-citations filtered: {self_citations_filtered}")
    print(f"  Unique locations: {len(locations)}")
    print(f"  Unique countries: {len(country_counts)}")
    print(f"  Unique citing authors: {len(all_authors)}")
    print(f"  Author-citation pairs: {total_author_citations}")
    
    print(f"\n{'='*40}")
    print("VENUE DISTRIBUTION")
    print(f"{'='*40}")
    print(f"  Tier 1 (IEEE/ACM/Top): {tier_counts['tier1']}")
    print(f"  Tier 2 (Peer-reviewed): {tier_counts['tier2']}")
    print(f"  Preprints: {tier_counts['preprint']}")
    print(f"  Other/Unknown: {tier_counts['other']}")
    
    print(f"\n{'='*40}")
    print("HIGH-INFLUENCE")
    print(f"{'='*40}")
    print(f"  Prestigious institutions: {prestigious_count}")
    
    print(f"\n{'='*40}")
    print("TOP COUNTRIES")
    print(f"{'='*40}")
    for country, count in top_countries:
        print(f"  {count:3} | {country}")
    
    return 0


if __name__ == '__main__':
    exit(main())
