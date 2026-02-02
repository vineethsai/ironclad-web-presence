#!/usr/bin/env python3
"""
Full Citation Refresh Script
Uses SerpAPI to fetch fresh citation data with venue information.
Merges with existing CitationMap location data for comprehensive analysis.
"""

import csv
import json
import os
import re
import time
import urllib.request
import urllib.error
from collections import defaultdict
from pathlib import Path

# Configuration
SERPAPI_KEY = os.environ.get('SERPAPI_KEY')
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

# University coordinates
UNIVERSITY_COORDS = {
    'stanford': {'lat': 37.4275, 'lng': -122.1697, 'country': 'United States', 'city': 'Stanford'},
    'mit': {'lat': 42.3601, 'lng': -71.0942, 'country': 'United States', 'city': 'Cambridge'},
    'berkeley': {'lat': 37.8719, 'lng': -122.2585, 'country': 'United States', 'city': 'Berkeley'},
    'carnegie mellon': {'lat': 40.4432, 'lng': -79.9428, 'country': 'United States', 'city': 'Pittsburgh'},
    'georgia tech': {'lat': 33.7756, 'lng': -84.3963, 'country': 'United States', 'city': 'Atlanta'},
    'harvard': {'lat': 42.3770, 'lng': -71.1167, 'country': 'United States', 'city': 'Cambridge'},
    'princeton': {'lat': 40.3431, 'lng': -74.6551, 'country': 'United States', 'city': 'Princeton'},
    'cornell': {'lat': 42.4534, 'lng': -76.4735, 'country': 'United States', 'city': 'Ithaca'},
    'purdue': {'lat': 40.4237, 'lng': -86.9212, 'country': 'United States', 'city': 'West Lafayette'},
    'cisco': {'lat': 37.4089, 'lng': -121.9495, 'country': 'United States', 'city': 'San Jose'},
    'google': {'lat': 37.4220, 'lng': -122.0841, 'country': 'United States', 'city': 'Mountain View'},
    'microsoft': {'lat': 47.6740, 'lng': -122.1215, 'country': 'United States', 'city': 'Redmond'},
    'amazon': {'lat': 47.6062, 'lng': -122.3321, 'country': 'United States', 'city': 'Seattle'},
    'meta': {'lat': 37.4850, 'lng': -122.1469, 'country': 'United States', 'city': 'Menlo Park'},
    'san francisco': {'lat': 37.7749, 'lng': -122.4194, 'country': 'United States', 'city': 'San Francisco'},
    'oxford': {'lat': 51.7548, 'lng': -1.2544, 'country': 'United Kingdom', 'city': 'Oxford'},
    'cambridge': {'lat': 52.2043, 'lng': 0.1218, 'country': 'United Kingdom', 'city': 'Cambridge'},
    'imperial': {'lat': 51.4988, 'lng': -0.1749, 'country': 'United Kingdom', 'city': 'London'},
    'ucl': {'lat': 51.5246, 'lng': -0.1340, 'country': 'United Kingdom', 'city': 'London'},
    'eth zurich': {'lat': 47.3769, 'lng': 8.5417, 'country': 'Switzerland', 'city': 'Zurich'},
    'epfl': {'lat': 46.5197, 'lng': 6.5668, 'country': 'Switzerland', 'city': 'Lausanne'},
    'tu munich': {'lat': 48.1497, 'lng': 11.5679, 'country': 'Germany', 'city': 'Munich'},
    'tsinghua': {'lat': 40.0015, 'lng': 116.3264, 'country': 'China', 'city': 'Beijing'},
    'peking': {'lat': 39.9869, 'lng': 116.3059, 'country': 'China', 'city': 'Beijing'},
    'zhejiang': {'lat': 30.2616, 'lng': 120.1195, 'country': 'China', 'city': 'Hangzhou'},
    'fudan': {'lat': 31.2990, 'lng': 121.5000, 'country': 'China', 'city': 'Shanghai'},
    "xi'an": {'lat': 34.3416, 'lng': 108.9398, 'country': 'China', 'city': "Xi'an"},
    'xian jiaotong': {'lat': 34.3416, 'lng': 108.9398, 'country': 'China', 'city': "Xi'an"},
    'chinese academy': {'lat': 39.9775, 'lng': 116.3298, 'country': 'China', 'city': 'Beijing'},
    'hong kong': {'lat': 22.2830, 'lng': 114.1370, 'country': 'Hong Kong', 'city': 'Hong Kong'},
    'singapore': {'lat': 1.2966, 'lng': 103.7764, 'country': 'Singapore', 'city': 'Singapore'},
    'nus': {'lat': 1.2966, 'lng': 103.7764, 'country': 'Singapore', 'city': 'Singapore'},
    'nanyang': {'lat': 1.3483, 'lng': 103.6831, 'country': 'Singapore', 'city': 'Singapore'},
    'tokyo': {'lat': 35.7128, 'lng': 139.7620, 'country': 'Japan', 'city': 'Tokyo'},
    'kyoto': {'lat': 35.0274, 'lng': 135.7817, 'country': 'Japan', 'city': 'Kyoto'},
    'seoul national': {'lat': 37.4596, 'lng': 126.9520, 'country': 'South Korea', 'city': 'Seoul'},
    'kaist': {'lat': 36.3701, 'lng': 127.3604, 'country': 'South Korea', 'city': 'Daejeon'},
    'ben-gurion': {'lat': 31.2623, 'lng': 34.8013, 'country': 'Israel', 'city': 'Beer Sheva'},
    'ben gurion': {'lat': 31.2623, 'lng': 34.8013, 'country': 'Israel', 'city': 'Beer Sheva'},
    'bgu': {'lat': 31.2623, 'lng': 34.8013, 'country': 'Israel', 'city': 'Beer Sheva'},
    'technion': {'lat': 32.7775, 'lng': 35.0217, 'country': 'Israel', 'city': 'Haifa'},
    'tel aviv': {'lat': 32.1133, 'lng': 34.8044, 'country': 'Israel', 'city': 'Tel Aviv'},
    'melbourne': {'lat': -37.7983, 'lng': 144.9610, 'country': 'Australia', 'city': 'Melbourne'},
    'sydney': {'lat': -33.8888, 'lng': 151.1872, 'country': 'Australia', 'city': 'Sydney'},
    'unsw': {'lat': -33.9173, 'lng': 151.2313, 'country': 'Australia', 'city': 'Sydney'},
    'kampala': {'lat': 0.3476, 'lng': 32.5825, 'country': 'Uganda', 'city': 'Kampala'},
    'uganda': {'lat': 0.3476, 'lng': 32.5825, 'country': 'Uganda', 'city': 'Kampala'},
    'nigeria': {'lat': 6.5244, 'lng': 3.3792, 'country': 'Nigeria', 'city': 'Lagos'},
    'jos': {'lat': 9.8965, 'lng': 8.8583, 'country': 'Nigeria', 'city': 'Jos'},
    'owasp': {'lat': 40.7128, 'lng': -74.0060, 'country': 'United States', 'city': 'New York'},
    'sap': {'lat': 49.2937, 'lng': 8.6433, 'country': 'Germany', 'city': 'Walldorf'},
    'ege university': {'lat': 38.4567, 'lng': 27.2261, 'country': 'Turkey', 'city': 'Izmir'},
    'toronto': {'lat': 43.6629, 'lng': -79.3957, 'country': 'Canada', 'city': 'Toronto'},
    'waterloo': {'lat': 43.4723, 'lng': -80.5449, 'country': 'Canada', 'city': 'Waterloo'},
    'mcgill': {'lat': 45.5049, 'lng': -73.5772, 'country': 'Canada', 'city': 'Montreal'},
    'ireland': {'lat': 53.3498, 'lng': -6.2603, 'country': 'Ireland', 'city': 'Dublin'},
    'dublin': {'lat': 53.3498, 'lng': -6.2603, 'country': 'Ireland', 'city': 'Dublin'},
    'greece': {'lat': 37.9838, 'lng': 23.7275, 'country': 'Greece', 'city': 'Athens'},
    'athens': {'lat': 37.9838, 'lng': 23.7275, 'country': 'Greece', 'city': 'Athens'},
}


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


def get_coords(text):
    if not text:
        return None
    t = text.lower()
    for pattern, coords in UNIVERSITY_COORDS.items():
        if pattern in t:
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


def fetch_citations_for_publication(cites_id, max_pages=10):
    """Fetch all citing papers for a publication"""
    papers = []
    start = 0
    
    while start < max_pages * 10:
        url = f"https://serpapi.com/search.json?engine=google_scholar&cites={cites_id}&start={start}&api_key={SERPAPI_KEY}"
        
        data = fetch_url(url)
        if not data:
            break
        
        results = data.get('organic_results', [])
        if not results:
            break
        
        for r in results:
            pub_info = r.get('publication_info', {})
            venue = pub_info.get('summary', '')
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
        time.sleep(1.2)  # Rate limit
    
    return papers


def load_existing_csv_locations(csv_path):
    """Load location data from existing CitationMap CSV"""
    locations = {}
    if not csv_path.exists():
        return locations
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                title = row.get('citing paper title', '').strip().lower()
                if not title:
                    continue
                
                lat = row.get('latitude', '')
                lng = row.get('longitude', '')
                country = row.get('country', '')
                city = row.get('city', '')
                affiliation = row.get('affiliation', '')
                
                # Skip noisy geocoding
                if country in ['Papua New Guinea', 'Mali']:
                    continue
                
                # Clean affiliation
                if affiliation in ['AI_ML', 'GENAI', 'Security', 'No_author_info', 'No_author_found']:
                    affiliation = ''
                
                if title not in locations:
                    locations[title] = {
                        'lat': lat,
                        'lng': lng,
                        'country': country,
                        'city': city,
                        'affiliations': []
                    }
                
                if affiliation and affiliation not in locations[title]['affiliations']:
                    locations[title]['affiliations'].append(affiliation)
    except Exception as e:
        print(f"Error loading CSV: {e}")
    
    return locations


def main():
    if not SERPAPI_KEY:
        print("ERROR: SERPAPI_KEY environment variable not set")
        print("Set it with: export SERPAPI_KEY='your_key'")
        return 1
    
    script_dir = Path(__file__).parent
    csv_path = script_dir / 'citation_info.csv'
    output_path = script_dir.parent / 'src' / 'data' / 'citations.json'
    
    print("=" * 60)
    print("FULL CITATION REFRESH")
    print("=" * 60)
    print(f"Scholar ID: {SCHOLAR_ID}")
    print(f"Using SerpAPI for fresh venue data")
    print()
    
    # Load existing location data from CitationMap CSV
    print("Loading existing location data from CitationMap CSV...")
    csv_locations = load_existing_csv_locations(csv_path)
    print(f"  Loaded locations for {len(csv_locations)} papers")
    
    # Fetch publications from SerpAPI
    print("\nFetching publications from SerpAPI...")
    url = f"https://serpapi.com/search.json?engine=google_scholar_author&author_id={SCHOLAR_ID}&api_key={SERPAPI_KEY}"
    
    data = fetch_url(url)
    if not data:
        print("ERROR: Failed to fetch publications")
        return 1
    
    articles = data.get('articles', [])
    print(f"  Found {len(articles)} publications")
    
    # Build publications list
    publications = []
    total_citation_count = 0
    
    for a in articles:
        cite_count = a.get('cited_by', {}).get('value', 0) or 0
        total_citation_count += cite_count
        cites_id = a.get('cited_by', {}).get('cites_id', '')
        
        publications.append({
            'title': a.get('title', ''),
            'year': int(a.get('year', '2024') or '2024'),
            'venue': a.get('publication', 'Unknown'),
            'citationCount': cite_count,
            'citesId': cites_id,
            'link': a.get('link', '')
        })
    
    print(f"  Total citation count from Google Scholar: {total_citation_count}")
    
    # Fetch citing papers for each publication
    all_citing_papers = []
    seen_titles = set()
    self_citation_count = 0
    
    for i, pub in enumerate(publications):
        cites_id = pub.get('citesId')
        if not cites_id or pub.get('citationCount', 0) == 0:
            continue
        
        print(f"\n[{i+1}/{len(publications)}] Fetching citations for: {pub['title'][:50]}...")
        print(f"  Expected citations: {pub.get('citationCount', 0)}")
        
        papers = fetch_citations_for_publication(cites_id)
        print(f"  Fetched {len(papers)} citing papers")
        
        for p in papers:
            # Filter self-citations
            if any(is_self_citation(a) for a in p['authors']):
                self_citation_count += 1
                continue
            
            # Skip duplicates
            title_key = p['title'].lower().strip()
            if title_key in seen_titles:
                continue
            seen_titles.add(title_key)
            
            # Determine venue tier
            tier = get_venue_tier(p['venue'])
            score = get_venue_score(tier)
            
            # Try to get affiliation from CSV data
            csv_loc = csv_locations.get(title_key, {})
            affiliation = csv_loc.get('affiliations', ['Unknown'])[0] if csv_loc.get('affiliations') else 'Unknown'
            country = csv_loc.get('country', '') or 'Unknown'
            
            # If no affiliation from CSV, try to extract from venue/snippet
            if affiliation == 'Unknown':
                text = f"{p['venue']} {p['snippet']}"
                uni_match = re.search(r'([A-Z][^,]+(?:University|Institute|College|Lab|Research)[^,]*)', text)
                if uni_match:
                    affiliation = uni_match.group(1).strip()
            
            # Check if prestigious
            is_prest = is_prestigious(affiliation) or is_prestigious(p['venue'])
            
            all_citing_papers.append({
                'title': p['title'],
                'authors': p['authors'],
                'venue': p['venue'],
                'link': p['link'],
                'citationCount': p['citationCount'],
                'influenceScore': score,
                'venueScore': score,
                'citationScore': 0,
                'citedPublication': pub['title'],
                'affiliation': affiliation,
                'affiliations': csv_loc.get('affiliations', [affiliation]) if affiliation != 'Unknown' else [],
                'country': country,
                'tier': tier,
                'isPrestigious': is_prest
            })
    
    print(f"\n{'='*60}")
    print(f"Total unique citing papers: {len(all_citing_papers)}")
    print(f"Self-citations filtered: {self_citation_count}")
    
    # Aggregate locations
    print("\nAggregating locations...")
    location_map = {}
    
    for paper in all_citing_papers:
        # Try CSV location first
        title_key = paper['title'].lower().strip()
        csv_loc = csv_locations.get(title_key, {})
        
        lat = csv_loc.get('lat')
        lng = csv_loc.get('lng')
        country = csv_loc.get('country') or paper.get('country', '')
        city = csv_loc.get('city', '')
        
        # If no CSV location, try affiliation-based lookup
        if not lat or not lng:
            coords = get_coords(paper.get('affiliation', ''))
            if coords:
                lat = coords['lat']
                lng = coords['lng']
                country = coords['country']
                city = coords.get('city', '')
        
        if lat and lng:
            try:
                lat_f = float(lat)
                lng_f = float(lng)
                key = f"{lat_f:.1f},{lng_f:.1f}"
                
                if key not in location_map:
                    location_map[key] = {
                        'latitude': lat_f,
                        'longitude': lng_f,
                        'country': country,
                        'city': city,
                        'count': 0,
                        'papers': [],
                        'affiliations': []
                    }
                
                location_map[key]['count'] += 1
                
                if len(location_map[key]['papers']) < 10:
                    location_map[key]['papers'].append(paper['title'])
                
                for aff in paper.get('affiliations', []):
                    if aff and aff not in location_map[key]['affiliations']:
                        location_map[key]['affiliations'].append(aff)
            except (ValueError, TypeError):
                pass
    
    locations = sorted(location_map.values(), key=lambda x: x['count'], reverse=True)
    print(f"  {len(locations)} unique locations")
    
    # Calculate stats
    tier_counts = {'tier1': 0, 'tier2': 0, 'other': 0, 'preprint': 0}
    venue_counts = defaultdict(int)
    country_counts = defaultdict(int)
    prestigious_count = 0
    
    for paper in all_citing_papers:
        tier_counts[paper['tier']] += 1
        if paper['venue']:
            venue_counts[paper['venue']] += 1
        if paper.get('country') and paper['country'] != 'Unknown':
            country_counts[paper['country']] += 1
        if paper.get('isPrestigious'):
            prestigious_count += 1
    
    top_venues = sorted(venue_counts.items(), key=lambda x: x[1], reverse=True)[:15]
    top_countries = sorted(country_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    
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
                'high': tier_counts['tier1'] + prestigious_count,
                'medium': tier_counts['tier2'],
                'low': tier_counts['other'] + tier_counts['preprint']
            },
            'tierDistribution': tier_counts,
            'topCountries': [{'name': c[0], 'count': c[1]} for c in top_countries],
            'prestigiousCount': prestigious_count
        }
    }
    
    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(citation_data, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print(f"\n{'='*60}")
    print("ANALYSIS COMPLETE")
    print(f"{'='*60}")
    print(f"\nOutput: {output_path}")
    
    print(f"\n{'='*40}")
    print("SUMMARY")
    print(f"{'='*40}")
    print(f"  Your publications: {len(publications)}")
    print(f"  Total Google Scholar citations: {total_citation_count}")
    print(f"  External citing papers fetched: {len(all_citing_papers)}")
    print(f"  Self-citations filtered: {self_citation_count}")
    print(f"  Unique locations: {len(locations)}")
    print(f"  Unique countries: {len(country_counts)}")
    
    print(f"\n{'='*40}")
    print("VENUE DISTRIBUTION")
    print(f"{'='*40}")
    print(f"  Tier 1 (IEEE/ACM/USENIX/NeurIPS): {tier_counts['tier1']}")
    print(f"  Tier 2 (Peer-reviewed): {tier_counts['tier2']}")
    print(f"  Preprints (arXiv, etc.): {tier_counts['preprint']}")
    print(f"  Other/Unknown: {tier_counts['other']}")
    
    print(f"\n{'='*40}")
    print("HIGH-INFLUENCE CITATIONS")
    print(f"{'='*40}")
    print(f"  From prestigious institutions: {prestigious_count}")
    
    print(f"\n{'='*40}")
    print("TOP VENUES")
    print(f"{'='*40}")
    for venue, count in top_venues[:10]:
        v_display = venue[:50] + '...' if len(venue) > 50 else venue
        print(f"  {count:3} | {v_display}")
    
    print(f"\n{'='*40}")
    print("TOP COUNTRIES")
    print(f"{'='*40}")
    for country, count in top_countries:
        print(f"  {count:3} | {country}")
    
    # Show top publications by citation count
    print(f"\n{'='*40}")
    print("YOUR MOST CITED PUBLICATIONS")
    print(f"{'='*40}")
    sorted_pubs = sorted(publications, key=lambda x: x.get('citationCount', 0), reverse=True)
    for pub in sorted_pubs[:10]:
        if pub.get('citationCount', 0) > 0:
            title = pub['title'][:55] + '...' if len(pub['title']) > 55 else pub['title']
            print(f"  {pub.get('citationCount', 0):3} | {title}")
    
    print(f"\n{'='*60}")
    print("Done!")
    
    return 0


if __name__ == '__main__':
    exit(main())
