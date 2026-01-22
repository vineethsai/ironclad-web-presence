#!/usr/bin/env python3
"""
Fetch citation data from SerpAPI for GitHub Actions.
Uses SERPAPI_KEY from environment variable.
"""

import json
import os
import re
import time
import urllib.request
import urllib.error
from pathlib import Path

# Get API key from environment
SERPAPI_KEY = os.environ.get('SERPAPI_KEY')
if not SERPAPI_KEY:
    raise ValueError("SERPAPI_KEY environment variable not set")

SCHOLAR_ID = 'hIVoKbIAAAAJ'

# Self-citation patterns
SELF_NAMES = [
    'vineeth sai', 'vs narajala', 'vineeth sai narajala', 'v. s. narajala', 
    'narajala, v', 'narajala, vineeth', 'v s narajala', 'vineeth narajala'
]

# Venue patterns for categorization
TIER1_PATTERNS = [
    'ieee', 'ieee transactions', 'ieee access', 'ieee communications',
    'acm', 'dl.acm.org', 'acm digital library',
    'usenix', 'ndss', 'ccs', 's&p', 'sp ', 'infocom',
    'security', 'oakland', 'crypto', 'eurocrypt', 'asiacrypt',
    'acsac', 'esorics', 'wisec', 'uss ',
    'isca', 'micro', 'hpca', 'sigcomm', 'mobicom', 'nsdi', 'sosp', 'osdi', 'eurosys',
    'pldi', 'popl', 'icse', 'fse', 'ase', 'issta', 'sigmod', 'vldb',
    'neurips', 'nips', 'icml', 'iclr', 'cvpr', 'iccv', 'eccv', 'aaai', 'ijcai',
    'workshop on mobility', 'mobiarch', 'mobisys'
]

TIER2_PATTERNS = [
    'springer', 'elsevier', 'nature', 'science', 'plos', 'jstor',
    'wiley', 'taylor & francis', 'mdpi', 'sensors', 'electronics',
    'journal of', 'transactions on', 'international journal', 'ict express',
    'conference on', 'symposium on', 'workshop on', 'proceedings of',
    'ceur-ws.org', 'ceur workshop', 'openreview.net', 'openreview',
    'pmc.ncbi', 'pubmed', 'ncbi.nlm.nih.gov',
    'dbpia', 'cyberleninka', '한국통신학회', 'kics',
    'sol.sbc.org.br', 'sbc.org.br', 'cds.cern.ch', 'books.google.com',
]

PREPRINT_PATTERNS = [
    'arxiv', 'preprint', 'ssrn', 'biorxiv', 'medrxiv', 'techrxiv',
    'researchgate.net', 'researchsquare', 'f1000research', 
    'preprints.org', 'osf.io', 'zenodo',
    'digitalcommons', 'repository.lib', 'proquest', 'ela.kpi.ua',
    'google patents', 'us patent'
]

# University coordinates for map
UNIVERSITY_COORDS = {
    'stanford': {'lat': 37.4275, 'lng': -122.1697, 'country': 'United States'},
    'mit': {'lat': 42.3601, 'lng': -71.0942, 'country': 'United States'},
    'berkeley': {'lat': 37.8719, 'lng': -122.2585, 'country': 'United States'},
    'carnegie mellon': {'lat': 40.4432, 'lng': -79.9428, 'country': 'United States'},
    'georgia tech': {'lat': 33.7756, 'lng': -84.3963, 'country': 'United States'},
    'harvard': {'lat': 42.3770, 'lng': -71.1167, 'country': 'United States'},
    'princeton': {'lat': 40.3431, 'lng': -74.6551, 'country': 'United States'},
    'cornell': {'lat': 42.4534, 'lng': -76.4735, 'country': 'United States'},
    'purdue': {'lat': 40.4237, 'lng': -86.9212, 'country': 'United States'},
    'tsinghua': {'lat': 40.0015, 'lng': 116.3264, 'country': 'China'},
    'peking': {'lat': 39.9869, 'lng': 116.3059, 'country': 'China'},
    'zhejiang': {'lat': 30.2616, 'lng': 120.1195, 'country': 'China'},
    'oxford': {'lat': 51.7548, 'lng': -1.2544, 'country': 'United Kingdom'},
    'cambridge': {'lat': 52.2043, 'lng': 0.1218, 'country': 'United Kingdom'},
    'eth zurich': {'lat': 47.3769, 'lng': 8.5417, 'country': 'Switzerland'},
    'google': {'lat': 37.4220, 'lng': -122.0841, 'country': 'United States'},
    'microsoft': {'lat': 47.6740, 'lng': -122.1215, 'country': 'United States'},
    'cern': {'lat': 46.2330, 'lng': 6.0557, 'country': 'Switzerland'},
    'hong kong': {'lat': 22.2830, 'lng': 114.1370, 'country': 'Hong Kong'},
    'singapore': {'lat': 1.2966, 'lng': 103.7764, 'country': 'Singapore'},
    'kaist': {'lat': 36.3701, 'lng': 127.3604, 'country': 'South Korea'},
}


def is_self_citation(author_name):
    if not author_name:
        return False
    author_lower = author_name.lower().strip()
    return any(name in author_lower for name in SELF_NAMES)


def get_venue_tier(venue):
    v = venue.lower()
    if any(p in v for p in PREPRINT_PATTERNS):
        return 'preprint'
    if any(p in v for p in TIER1_PATTERNS):
        return 'tier1'
    if any(p in v for p in TIER2_PATTERNS):
        return 'tier2'
    return 'other'


def get_venue_score(venue):
    tier = get_venue_tier(venue)
    return {'tier1': 50, 'tier2': 35, 'preprint': 10, 'other': 20}[tier]


def get_coords(affiliation):
    if not affiliation:
        return None
    aff_lower = affiliation.lower()
    for pattern, coords in UNIVERSITY_COORDS.items():
        if pattern in aff_lower:
            return coords.copy()
    return None


def fetch_url(url, retries=3):
    """Fetch URL with retries"""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as response:
                return json.loads(response.read().decode())
        except urllib.error.HTTPError as e:
            print(f"  HTTP Error {e.code}: {e.reason}")
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
        except Exception as e:
            print(f"  Error: {e}")
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
    return None


def fetch_serpapi_citations(publication_cites_id):
    """Fetch citing papers for a publication from SerpAPI"""
    papers = []
    start = 0
    max_pages = 5  # Limit to 50 citations per publication
    
    while start < max_pages * 10:
        url = f"https://serpapi.com/search.json?engine=google_scholar&cites={publication_cites_id}&start={start}&api_key={SERPAPI_KEY}"
        
        data = fetch_url(url)
        if not data:
            break
            
        results = data.get('organic_results', [])
        if not results:
            break
            
        for r in results:
            pub_info = r.get('publication_info', {})
            venue = pub_info.get('summary', 'Unknown')
            authors = [a.get('name', '') for a in pub_info.get('authors', [])]
            
            papers.append({
                'title': r.get('title', ''),
                'venue': venue,
                'authors': authors,
                'link': r.get('link', ''),
                'citationCount': r.get('inline_links', {}).get('cited_by', {}).get('total', 0),
                'snippet': r.get('snippet', '')
            })
        
        if not data.get('pagination', {}).get('next'):
            break
        start += 10
        time.sleep(1.5)  # Rate limit
    
    return papers


def main():
    script_dir = Path(__file__).parent
    output_path = script_dir.parent / 'src' / 'data' / 'citations.json'
    
    print("Fetching publications from SerpAPI...")
    url = f"https://serpapi.com/search.json?engine=google_scholar_author&author_id={SCHOLAR_ID}&api_key={SERPAPI_KEY}"
    
    data = fetch_url(url)
    if not data:
        print("Error fetching publications")
        return 1
    
    articles = data.get('articles', [])
    print(f"Found {len(articles)} publications")
    
    publications = []
    for a in articles:
        cites_id = a.get('cited_by', {}).get('cites_id', '')
        publications.append({
            'title': a.get('title', ''),
            'year': int(a.get('year', '2024') or '2024'),
            'venue': a.get('publication', 'Unknown'),
            'citationCount': a.get('cited_by', {}).get('value', 0),
            'citesId': cites_id,
            'link': a.get('link', '')
        })
    
    # Fetch citing papers
    all_citing_papers = []
    
    for i, pub in enumerate(publications):
        if not pub.get('citesId'):
            continue
        
        print(f"[{i+1}/{len(publications)}] Fetching citations for: {pub['title'][:50]}...")
        papers = fetch_serpapi_citations(pub['citesId'])
        
        for p in papers:
            # Filter self-citations
            if any(is_self_citation(a) for a in p['authors']):
                continue
            
            venue_score = get_venue_score(p['venue'])
            
            all_citing_papers.append({
                'title': p['title'],
                'authors': p['authors'],
                'venue': p['venue'],
                'link': p['link'],
                'citationCount': p['citationCount'],
                'snippet': p['snippet'],
                'influenceScore': venue_score,
                'venueScore': venue_score,
                'citationScore': 0,
                'citedPublication': pub['title'],
                'affiliation': 'Unknown'
            })
        
        print(f"  Found {len(papers)} citing papers")
    
    print(f"\nTotal citing papers (after filtering): {len(all_citing_papers)}")
    
    # Aggregate locations
    print("Aggregating locations...")
    location_map = {}
    
    for paper in all_citing_papers:
        # Try to extract affiliation from venue/snippet
        text = f"{paper['venue']} {paper['snippet']}"
        uni_match = re.search(r'([A-Z][^,]+(?:University|Institute|College|Lab)[^,]*)', text)
        if uni_match:
            aff = uni_match.group(1).strip()
            paper['affiliation'] = aff
            
            coords = get_coords(aff)
            if coords:
                key = f"{coords['lat']:.2f},{coords['lng']:.2f}"
                if key not in location_map:
                    location_map[key] = {
                        'latitude': coords['lat'],
                        'longitude': coords['lng'],
                        'country': coords['country'],
                        'count': 0,
                        'papers': [],
                        'affiliations': []
                    }
                location_map[key]['count'] += 1
                if len(location_map[key]['papers']) < 10:
                    location_map[key]['papers'].append(paper['title'])
                if aff not in location_map[key]['affiliations']:
                    location_map[key]['affiliations'].append(aff)
    
    locations = list(location_map.values())
    print(f"  Found {len(locations)} unique locations")
    
    # Calculate stats
    tier_counts = {'tier1': 0, 'tier2': 0, 'other': 0, 'preprint': 0}
    venue_counts = {}
    
    for paper in all_citing_papers:
        venue = paper['venue']
        tier = get_venue_tier(venue)
        tier_counts[tier] += 1
        venue_counts[venue] = venue_counts.get(venue, 0) + 1
    
    top_venues = sorted(venue_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    
    # Create output
    citation_data = {
        'lastUpdated': time.strftime('%Y-%m-%dT%H:%M:%S.000Z'),
        'scholarId': SCHOLAR_ID,
        'publications': publications,
        'citingPapers': all_citing_papers,
        'locations': locations,
        'stats': {
            'totalCitations': len(all_citing_papers),
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
    
    print(f"\n{'='*50}")
    print(f"Data written to {output_path}")
    print(f"\nSummary:")
    print(f"  Publications: {len(publications)}")
    print(f"  Citing Papers: {len(all_citing_papers)}")
    print(f"  Locations: {len(locations)}")
    print(f"\nVenue Tiers:")
    print(f"  Tier 1 (IEEE/ACM/USENIX): {tier_counts['tier1']}")
    print(f"  Tier 2 (Peer-reviewed): {tier_counts['tier2']}")
    print(f"  Preprints: {tier_counts['preprint']}")
    print(f"  Other: {tier_counts['other']}")
    
    return 0


if __name__ == '__main__':
    exit(main())
