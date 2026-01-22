#!/usr/bin/env python3
"""
Merge CitationMap CSV (rich location data) with SerpAPI fetch (venue data).
Best of both worlds: accurate venues + detailed affiliations/locations.
"""

import csv
import json
import os
import re
import time
import urllib.request
from collections import defaultdict
from pathlib import Path

SERPAPI_KEY = os.environ.get('SERPAPI_KEY')
SCHOLAR_ID = 'hIVoKbIAAAAJ'

# Self-citation patterns
SELF_NAMES = [
    'vineeth sai', 'vs narajala', 'vineeth sai narajala', 'v. s. narajala', 
    'narajala, v', 'narajala, vineeth', 'v s narajala', 'vineeth narajala',
    'v narajala', 'narajala v'
]

TIER1_PATTERNS = [
    'ieee', 'ieee transactions', 'ieee access', 'acm', 'dl.acm.org',
    'usenix', 'ndss', 'ccs', 's&p', 'infocom', 'security', 'crypto',
    'neurips', 'icml', 'iclr', 'cvpr', 'aaai', 'ijcai', 'springer'
]

TIER2_PATTERNS = [
    'elsevier', 'nature', 'science', 'plos', 'wiley', 'mdpi',
    'journal of', 'transactions on', 'international journal',
    'conference on', 'symposium on', 'workshop on', 'proceedings',
    'ceur-ws', 'openreview', 'pubmed'
]

PREPRINT_PATTERNS = [
    'arxiv', 'preprint', 'ssrn', 'biorxiv', 'medrxiv',
    'researchgate', 'researchsquare', 'f1000research', 'zenodo'
]


def is_self_citation(author_name):
    if not author_name:
        return False
    return any(name in author_name.lower() for name in SELF_NAMES)


def get_venue_tier(venue):
    if not venue:
        return 'other'
    v = venue.lower()
    if any(p in v for p in PREPRINT_PATTERNS):
        return 'preprint'
    if any(p in v for p in TIER1_PATTERNS):
        return 'tier1'
    if any(p in v for p in TIER2_PATTERNS):
        return 'tier2'
    return 'other'


def get_venue_score(tier):
    return {'tier1': 50, 'tier2': 35, 'preprint': 10, 'other': 20}[tier]


def normalize_title(title):
    """Normalize title for matching"""
    return re.sub(r'[^a-z0-9]', '', title.lower())[:50]


def fetch_serpapi_venues():
    """Fetch venue data from SerpAPI"""
    if not SERPAPI_KEY:
        print("  No SERPAPI_KEY, skipping venue fetch")
        return {}
    
    print("Fetching venue data from SerpAPI...")
    venues = {}  # normalized_title -> venue
    
    try:
        # Get author's publications
        url = f"https://serpapi.com/search.json?engine=google_scholar_author&author_id={SCHOLAR_ID}&api_key={SERPAPI_KEY}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode())
        
        articles = data.get('articles', [])
        print(f"  Found {len(articles)} publications")
        
        # For each publication, get citing papers (limited)
        for i, article in enumerate(articles[:10]):  # Limit to first 10 pubs
            cites_id = article.get('cited_by', {}).get('cites_id')
            if not cites_id:
                continue
            
            print(f"  [{i+1}] Fetching citations for: {article['title'][:40]}...")
            
            # Get first page of citations
            cite_url = f"https://serpapi.com/search.json?engine=google_scholar&cites={cites_id}&api_key={SERPAPI_KEY}"
            req = urllib.request.Request(cite_url, headers={'User-Agent': 'Mozilla/5.0'})
            
            try:
                with urllib.request.urlopen(req, timeout=30) as resp:
                    cite_data = json.loads(resp.read().decode())
                
                results = cite_data.get('organic_results', [])
                for r in results:
                    title = r.get('title', '')
                    pub_info = r.get('publication_info', {})
                    venue = pub_info.get('summary', '')
                    
                    if title and venue:
                        key = normalize_title(title)
                        venues[key] = venue
                
                print(f"      Got {len(results)} citing papers")
            except Exception as e:
                print(f"      Error: {e}")
            
            time.sleep(1)  # Rate limit
    except Exception as e:
        print(f"  Error fetching from SerpAPI: {e}")
    
    print(f"  Total venues collected: {len(venues)}")
    return venues


def main():
    script_dir = Path(__file__).parent
    csv_path = script_dir / 'citation_info.csv'
    output_path = script_dir.parent / 'src' / 'data' / 'citations.json'
    
    # Fetch venue data from SerpAPI
    venue_map = fetch_serpapi_venues()
    
    print(f"\nReading CitationMap CSV: {csv_path}")
    
    # Parse CitationMap CSV for location data
    papers_by_title = {}
    locations_map = {}
    publications_set = set()
    self_citations_filtered = 0
    
    # First pass: collect country info for each paper title
    paper_countries = {}
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            citing_title = row.get('citing paper title', '')
            country = row.get('country', '')
            if citing_title and country and citing_title not in paper_countries:
                paper_countries[citing_title] = country
    
    # Second pass: process papers
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
            
            if is_self_citation(author):
                self_citations_filtered += 1
                continue
            
            if not citing_title:
                continue
            
            # Look up venue from SerpAPI data
            title_key = normalize_title(citing_title)
            venue = venue_map.get(title_key, '')
            tier = get_venue_tier(venue)
            score = get_venue_score(tier)
            
            # Clean affiliation
            clean_aff = affiliation if affiliation and affiliation not in ['AI_ML', 'GENAI', 'Security', 'No_author_info'] else ''
            
            # Get country for this paper
            paper_country = paper_countries.get(citing_title, country) or 'Unknown'
            
            if citing_title not in papers_by_title:
                papers_by_title[citing_title] = {
                    'title': citing_title,
                    'authors': [author] if author else [],
                    'venue': venue,
                    'link': '',
                    'citationCount': 0,
                    'influenceScore': score,
                    'venueScore': score,
                    'citationScore': 0,
                    'citedPublication': cited_title,
                    'affiliation': clean_aff or 'Unknown',
                    'country': paper_country
                }
            else:
                if author and author not in papers_by_title[citing_title]['authors']:
                    papers_by_title[citing_title]['authors'].append(author)
                # Update affiliation if better
                if clean_aff and papers_by_title[citing_title]['affiliation'] == 'Unknown':
                    papers_by_title[citing_title]['affiliation'] = clean_aff
                # Update country if better
                if paper_country and paper_country != 'Unknown' and papers_by_title[citing_title].get('country') == 'Unknown':
                    papers_by_title[citing_title]['country'] = paper_country
            
            # Aggregate locations
            try:
                lat_f = float(lat) if lat else None
                lng_f = float(lng) if lng else None
                
                if lat_f and lng_f and country:
                    key = f"{lat_f:.1f},{lng_f:.1f}"
                    
                    if key not in locations_map:
                        locations_map[key] = {
                            'latitude': lat_f,
                            'longitude': lng_f,
                            'country': country,
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
    
    # Convert to lists
    citing_papers = list(papers_by_title.values())
    locations = list(locations_map.values())
    locations.sort(key=lambda x: x['count'], reverse=True)
    
    # Calculate tier stats
    tier_counts = {'tier1': 0, 'tier2': 0, 'other': 0, 'preprint': 0}
    venue_counts = defaultdict(int)
    
    for paper in citing_papers:
        tier = get_venue_tier(paper['venue'])
        tier_counts[tier] += 1
        if paper['venue']:
            venue_counts[paper['venue']] += 1
    
    top_venues = sorted(venue_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    
    # Build output
    publications = [{'title': t, 'year': 2024, 'venue': '', 'citationCount': 0} for t in publications_set]
    
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
                'high': tier_counts['tier1'],
                'medium': tier_counts['tier2'],
                'low': tier_counts['other'] + tier_counts['preprint']
            },
            'tierDistribution': tier_counts
        }
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(citation_data, f, indent=2, ensure_ascii=False)
    
    print(f"\nOutput: {output_path}")
    print(f"\nSummary:")
    print(f"  Publications: {len(publications)}")
    print(f"  Citing papers: {len(citing_papers)}")
    print(f"  Locations: {len(locations)}")
    print(f"  Self-citations filtered: {self_citations_filtered}")
    print(f"\nVenue Tiers:")
    print(f"  Tier 1 (IEEE/ACM): {tier_counts['tier1']}")
    print(f"  Tier 2 (Peer-reviewed): {tier_counts['tier2']}")
    print(f"  Preprints: {tier_counts['preprint']}")
    print(f"  Other/Unknown: {tier_counts['other']}")
    
    print(f"\nTop Locations:")
    for loc in locations[:5]:
        affs = ', '.join(loc['affiliations'][:2]) if loc['affiliations'] else 'Unknown'
        print(f"  {loc['country']}: {loc['count']} ({affs})")
    
    return 0


if __name__ == '__main__':
    exit(main())
