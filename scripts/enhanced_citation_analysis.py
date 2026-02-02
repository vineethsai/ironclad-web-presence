#!/usr/bin/env python3
"""
Enhanced Citation Analysis Script
Processes CitationMap CSV data and infers venue quality from paper metadata.
"""

import csv
import json
import re
import time
from collections import defaultdict
from pathlib import Path

# Self-citation patterns to filter out
SELF_NAMES = [
    'vineeth sai', 'vs narajala', 'vineeth sai narajala', 'v. s. narajala', 
    'narajala, v', 'narajala, vineeth', 'v s narajala', 'vineeth narajala',
    'v narajala', 'narajala v', 'narajala vs', 'vineeth s'
]

# Tier 1: Top-tier venues (IEEE, ACM, USENIX, major conferences)
TIER1_PATTERNS = [
    # IEEE
    r'\bieee\b', r'\bieee transactions\b', r'\bieee access\b', r'\bieee communications\b',
    r'\bieee network\b', r'\binfocom\b',
    # ACM
    r'\bacm\b', r'dl\.acm\.org', r'\bsigcomm\b', r'\bmobicom\b', r'\bccs\b',
    # USENIX
    r'\busenix\b', r'\bndss\b', r'\buss\b', r'\bosdi\b', r'\bnsdi\b',
    # Security conferences
    r'\bs&p\b', r'\boakland\b', r'\bcrypto\b', r'\bacsac\b', r'\besorics\b',
    # Top AI/ML
    r'\bneurips\b', r'\bnips\b', r'\bicml\b', r'\biclr\b', r'\bcvpr\b', r'\baaai\b', r'\bijcai\b',
    # Top systems
    r'\bsosp\b', r'\beurosys\b', r'\bisca\b', r'\bmicro\b', r'\bhpca\b',
    # Top SE
    r'\bicse\b', r'\bfse\b', r'\base\b', r'\bpldi\b', r'\bpopl\b',
]

# Tier 2: Other peer-reviewed venues
TIER2_PATTERNS = [
    r'\bspringer\b', r'\belsevier\b', r'\bnature\b', r'\bscience\b', r'\bplos\b',
    r'\bwiley\b', r'\bmdpi\b', r'\bsensors\b', r'\belectronics\b',
    r'\bjournal of\b', r'\btransactions on\b', r'\binternational journal\b',
    r'\bconference on\b', r'\bsymposium on\b', r'\bworkshop on\b', r'\bproceedings\b',
    r'\bceur-ws\b', r'\bopenreview\b', r'\bpubmed\b', r'\bncbi\b',
    # Regional databases
    r'\bdbpia\b', r'\bcyberleninka\b', r'\bsbc\.org\b',
]

# Preprint patterns
PREPRINT_PATTERNS = [
    r'\barxiv\b', r'\bpreprint\b', r'\bssrn\b', r'\bbiorxiv\b', r'\bmedrxiv\b',
    r'\bresearchgate\b', r'\bresearchsquare\b', r'\bzenodo\b', r'\bosf\.io\b',
    r'\bdigitalcommons\b', r'\brepository\b', r'\bproquest\b',
    r'\bgoogle patents\b', r'\bus patent\b', r'\bthesis\b', r'\bdissertation\b',
]

# Prestigious institutions for high-influence scoring
PRESTIGIOUS_INSTITUTIONS = [
    'stanford', 'mit', 'massachusetts institute', 'berkeley', 'uc berkeley',
    'carnegie mellon', 'cmu', 'harvard', 'princeton', 'cornell', 'georgia tech',
    'purdue', 'oxford', 'cambridge', 'eth zurich', 'eth zürich',
    'tsinghua', 'peking', 'zhejiang', 'national university of singapore', 'nus',
    'kaist', 'google', 'microsoft', 'meta', 'deepmind', 'amazon', 'nvidia', 'openai',
    'yale', 'columbia', 'ucla', 'caltech', 'nyu', 'usc', 'university of washington',
    'university of michigan', 'uiuc', 'ut austin', 'johns hopkins', 'duke',
    'university of toronto', 'waterloo', 'epfl', 'imperial college', 'ucl',
    'tu munich', 'max planck', 'inria', 'cnrs', 'ben-gurion', 'ben gurion',
    'technion', 'tel aviv', 'tokyo', 'kyoto', 'seoul national',
]

# University coordinates for map
UNIVERSITY_COORDS = {
    'stanford': {'lat': 37.4275, 'lng': -122.1697, 'country': 'United States', 'city': 'Stanford'},
    'mit': {'lat': 42.3601, 'lng': -71.0942, 'country': 'United States', 'city': 'Cambridge'},
    'massachusetts institute': {'lat': 42.3601, 'lng': -71.0942, 'country': 'United States', 'city': 'Cambridge'},
    'berkeley': {'lat': 37.8719, 'lng': -122.2585, 'country': 'United States', 'city': 'Berkeley'},
    'carnegie mellon': {'lat': 40.4432, 'lng': -79.9428, 'country': 'United States', 'city': 'Pittsburgh'},
    'georgia tech': {'lat': 33.7756, 'lng': -84.3963, 'country': 'United States', 'city': 'Atlanta'},
    'georgia institute': {'lat': 33.7756, 'lng': -84.3963, 'country': 'United States', 'city': 'Atlanta'},
    'harvard': {'lat': 42.3770, 'lng': -71.1167, 'country': 'United States', 'city': 'Cambridge'},
    'princeton': {'lat': 40.3431, 'lng': -74.6551, 'country': 'United States', 'city': 'Princeton'},
    'cornell': {'lat': 42.4534, 'lng': -76.4735, 'country': 'United States', 'city': 'Ithaca'},
    'purdue': {'lat': 40.4237, 'lng': -86.9212, 'country': 'United States', 'city': 'West Lafayette'},
    'cisco': {'lat': 37.4089, 'lng': -121.9495, 'country': 'United States', 'city': 'San Jose'},
    'san jose': {'lat': 37.3387, 'lng': -121.8853, 'country': 'United States', 'city': 'San Jose'},
    'google': {'lat': 37.4220, 'lng': -122.0841, 'country': 'United States', 'city': 'Mountain View'},
    'microsoft': {'lat': 47.6740, 'lng': -122.1215, 'country': 'United States', 'city': 'Redmond'},
    'amazon': {'lat': 47.6062, 'lng': -122.3321, 'country': 'United States', 'city': 'Seattle'},
    'meta': {'lat': 37.4850, 'lng': -122.1469, 'country': 'United States', 'city': 'Menlo Park'},
    'oxford': {'lat': 51.7548, 'lng': -1.2544, 'country': 'United Kingdom', 'city': 'Oxford'},
    'cambridge': {'lat': 52.2043, 'lng': 0.1218, 'country': 'United Kingdom', 'city': 'Cambridge'},
    'imperial': {'lat': 51.4988, 'lng': -0.1749, 'country': 'United Kingdom', 'city': 'London'},
    'ucl': {'lat': 51.5246, 'lng': -0.1340, 'country': 'United Kingdom', 'city': 'London'},
    'eth zurich': {'lat': 47.3769, 'lng': 8.5417, 'country': 'Switzerland', 'city': 'Zurich'},
    'epfl': {'lat': 46.5197, 'lng': 6.5668, 'country': 'Switzerland', 'city': 'Lausanne'},
    'tu munich': {'lat': 48.1497, 'lng': 11.5679, 'country': 'Germany', 'city': 'Munich'},
    'rwth aachen': {'lat': 50.7785, 'lng': 6.0597, 'country': 'Germany', 'city': 'Aachen'},
    'tsinghua': {'lat': 40.0015, 'lng': 116.3264, 'country': 'China', 'city': 'Beijing'},
    'peking': {'lat': 39.9869, 'lng': 116.3059, 'country': 'China', 'city': 'Beijing'},
    'zhejiang': {'lat': 30.2616, 'lng': 120.1195, 'country': 'China', 'city': 'Hangzhou'},
    'fudan': {'lat': 31.2990, 'lng': 121.5000, 'country': 'China', 'city': 'Shanghai'},
    'shanghai jiao': {'lat': 31.0284, 'lng': 121.4374, 'country': 'China', 'city': 'Shanghai'},
    'nanjing': {'lat': 32.1194, 'lng': 118.9589, 'country': 'China', 'city': 'Nanjing'},
    "xi'an": {'lat': 34.3416, 'lng': 108.9398, 'country': 'China', 'city': "Xi'an"},
    'xian jiaotong': {'lat': 34.3416, 'lng': 108.9398, 'country': 'China', 'city': "Xi'an"},
    'hong kong': {'lat': 22.2830, 'lng': 114.1370, 'country': 'Hong Kong', 'city': 'Hong Kong'},
    'singapore': {'lat': 1.2966, 'lng': 103.7764, 'country': 'Singapore', 'city': 'Singapore'},
    'nus': {'lat': 1.2966, 'lng': 103.7764, 'country': 'Singapore', 'city': 'Singapore'},
    'national university of singapore': {'lat': 1.2966, 'lng': 103.7764, 'country': 'Singapore', 'city': 'Singapore'},
    'nanyang': {'lat': 1.3483, 'lng': 103.6831, 'country': 'Singapore', 'city': 'Singapore'},
    'tokyo': {'lat': 35.7128, 'lng': 139.7620, 'country': 'Japan', 'city': 'Tokyo'},
    'kyoto': {'lat': 35.0274, 'lng': 135.7817, 'country': 'Japan', 'city': 'Kyoto'},
    'seoul national': {'lat': 37.4596, 'lng': 126.9520, 'country': 'South Korea', 'city': 'Seoul'},
    'kaist': {'lat': 36.3701, 'lng': 127.3604, 'country': 'South Korea', 'city': 'Daejeon'},
    'ben-gurion': {'lat': 31.2623, 'lng': 34.8013, 'country': 'Israel', 'city': 'Beer Sheva'},
    'ben gurion': {'lat': 31.2623, 'lng': 34.8013, 'country': 'Israel', 'city': 'Beer Sheva'},
    'technion': {'lat': 32.7775, 'lng': 35.0217, 'country': 'Israel', 'city': 'Haifa'},
    'tel aviv': {'lat': 32.1133, 'lng': 34.8044, 'country': 'Israel', 'city': 'Tel Aviv'},
    'melbourne': {'lat': -37.7983, 'lng': 144.9610, 'country': 'Australia', 'city': 'Melbourne'},
    'sydney': {'lat': -33.8888, 'lng': 151.1872, 'country': 'Australia', 'city': 'Sydney'},
    'unsw': {'lat': -33.9173, 'lng': 151.2313, 'country': 'Australia', 'city': 'Sydney'},
    'anu': {'lat': -35.2777, 'lng': 149.1185, 'country': 'Australia', 'city': 'Canberra'},
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
}

# Countries that indicate geocoding noise (should be filtered)
EXCLUDED_COUNTRIES = ['Papua New Guinea', 'Mali']


def is_self_citation(author_name: str) -> bool:
    """Check if the author name matches the profile owner"""
    if not author_name:
        return False
    author_lower = author_name.lower().strip()
    for name in SELF_NAMES:
        if name in author_lower or author_lower in name:
            return True
    return False


def get_venue_tier(title: str, venue: str = '', affiliation: str = '') -> str:
    """Determine venue tier from paper metadata"""
    # Combine all text for pattern matching
    text = f"{title} {venue} {affiliation}".lower()
    
    # Check preprints first
    for pattern in PREPRINT_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            return 'preprint'
    
    # Check tier 1 venues
    for pattern in TIER1_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            return 'tier1'
    
    # Check tier 2 venues
    for pattern in TIER2_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            return 'tier2'
    
    return 'other'


def get_venue_score(tier: str) -> int:
    """Get numeric score for a venue tier"""
    return {'tier1': 50, 'tier2': 35, 'preprint': 10, 'other': 20}[tier]


def is_prestigious_institution(affiliation: str) -> bool:
    """Check if affiliation is from a prestigious institution"""
    if not affiliation:
        return False
    aff_lower = affiliation.lower()
    return any(inst in aff_lower for inst in PRESTIGIOUS_INSTITUTIONS)


def get_coords_from_affiliation(affiliation: str) -> dict:
    """Get coordinates from affiliation using predefined mapping"""
    if not affiliation:
        return None
    
    aff_lower = affiliation.lower()
    
    for pattern, coords in UNIVERSITY_COORDS.items():
        if pattern in aff_lower:
            return coords.copy()
    
    return None


def normalize_country(country: str) -> str:
    """Normalize country names"""
    normalized = country.strip()
    if normalized == 'USA' or normalized == 'US':
        return 'United States'
    if normalized == 'UK':
        return 'United Kingdom'
    return normalized


def main():
    script_dir = Path(__file__).parent
    csv_path = script_dir / 'citation_info.csv'
    output_path = script_dir.parent / 'src' / 'data' / 'citations.json'
    
    print("=" * 60)
    print("Enhanced Citation Analysis")
    print("=" * 60)
    
    if not csv_path.exists():
        print(f"Error: CSV file not found at {csv_path}")
        return
    
    print(f"\nReading data from: {csv_path}")
    
    # Parse CSV
    papers_by_title = {}
    locations_map = {}
    publications_set = set()
    self_citations_filtered = 0
    total_rows = 0
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            total_rows += 1
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
            
            # Clean affiliation (filter placeholder values)
            clean_aff = affiliation if affiliation and affiliation not in ['AI_ML', 'GENAI', 'Security', 'No_author_info', 'No_author_found'] else ''
            
            # Determine venue tier from paper metadata
            tier = get_venue_tier(citing_title, '', clean_aff)
            score = get_venue_score(tier)
            
            # Check if from prestigious institution
            is_prestigious = is_prestigious_institution(clean_aff)
            if is_prestigious and tier == 'other':
                tier = 'tier2'  # Upgrade if from prestigious institution
                score = get_venue_score(tier)
            
            # Normalize country
            norm_country = normalize_country(country) if country else 'Unknown'
            
            if citing_title not in papers_by_title:
                papers_by_title[citing_title] = {
                    'title': citing_title,
                    'authors': [author] if author else [],
                    'venue': tier.upper() if tier != 'other' else 'Unknown',
                    'link': '',
                    'citationCount': 0,
                    'influenceScore': score,
                    'venueScore': score,
                    'citationScore': 0,
                    'citedPublication': cited_title,
                    'affiliation': clean_aff or 'Unknown',
                    'affiliations': [clean_aff] if clean_aff else [],
                    'country': norm_country,
                    'tier': tier,
                    'isPrestigious': is_prestigious
                }
            else:
                # Add author if not already present
                if author and author not in papers_by_title[citing_title]['authors']:
                    papers_by_title[citing_title]['authors'].append(author)
                # Update affiliation if better
                if clean_aff and clean_aff not in papers_by_title[citing_title]['affiliations']:
                    papers_by_title[citing_title]['affiliations'].append(clean_aff)
                    if papers_by_title[citing_title]['affiliation'] == 'Unknown':
                        papers_by_title[citing_title]['affiliation'] = clean_aff
                # Update country if better
                if norm_country != 'Unknown' and papers_by_title[citing_title]['country'] == 'Unknown':
                    papers_by_title[citing_title]['country'] = norm_country
                # Update prestigious status
                if is_prestigious:
                    papers_by_title[citing_title]['isPrestigious'] = True
            
            # Aggregate locations from CSV data
            try:
                lat_f = float(lat) if lat else None
                lng_f = float(lng) if lng else None
                
                if lat_f and lng_f and country and country not in EXCLUDED_COUNTRIES:
                    key = f"{lat_f:.1f},{lng_f:.1f}"
                    
                    if key not in locations_map:
                        locations_map[key] = {
                            'latitude': lat_f,
                            'longitude': lng_f,
                            'country': normalize_country(country),
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
    
    # Also try to get coordinates from affiliations
    for title, paper in papers_by_title.items():
        for aff in paper.get('affiliations', []):
            coords = get_coords_from_affiliation(aff)
            if coords:
                key = f"{coords['lat']:.1f},{coords['lng']:.1f}"
                
                if key not in locations_map:
                    locations_map[key] = {
                        'latitude': coords['lat'],
                        'longitude': coords['lng'],
                        'country': coords['country'],
                        'city': coords.get('city', ''),
                        'count': 0,
                        'papers': [],
                        'affiliations': []
                    }
                
                if title not in locations_map[key]['papers']:
                    locations_map[key]['count'] += 1
                    if len(locations_map[key]['papers']) < 10:
                        locations_map[key]['papers'].append(title)
                    
                    if aff not in locations_map[key]['affiliations']:
                        locations_map[key]['affiliations'].append(aff)
    
    # Convert to lists
    citing_papers = list(papers_by_title.values())
    locations = sorted(locations_map.values(), key=lambda x: x['count'], reverse=True)
    
    # Calculate tier stats
    tier_counts = {'tier1': 0, 'tier2': 0, 'other': 0, 'preprint': 0}
    prestigious_count = 0
    
    for paper in citing_papers:
        tier_counts[paper['tier']] += 1
        if paper.get('isPrestigious'):
            prestigious_count += 1
    
    # Calculate country stats
    country_counts = defaultdict(int)
    for paper in citing_papers:
        country = paper.get('country', 'Unknown')
        if country != 'Unknown':
            country_counts[country] += 1
    
    top_countries = sorted(country_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    
    # Get top affiliations
    aff_counts = defaultdict(int)
    for paper in citing_papers:
        for aff in paper.get('affiliations', []):
            if aff and aff != 'Unknown':
                aff_counts[aff] += 1
    
    top_affiliations = sorted(aff_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    
    # Build publications list
    publications = [{'title': t, 'year': 2024, 'venue': '', 'citationCount': 0} for t in publications_set]
    
    # Create output
    citation_data = {
        'lastUpdated': time.strftime('%Y-%m-%dT%H:%M:%S.000Z'),
        'scholarId': 'hIVoKbIAAAAJ',
        'publications': publications,
        'citingPapers': citing_papers,
        'locations': locations,
        'stats': {
            'totalCitations': len(citing_papers),
            'uniqueLocations': len(locations),
            'topVenues': [{'name': v[0], 'count': v[1]} for v in top_affiliations],  # Use affiliations as venues
            'influenceDistribution': {
                'high': tier_counts['tier1'] + prestigious_count,
                'medium': tier_counts['tier2'],
                'low': tier_counts['other'] + tier_counts['preprint']
            },
            'tierDistribution': tier_counts,
            'topCountries': [{'name': c[0], 'count': c[1]} for c in top_countries]
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
    print(f"  Total CSV rows processed: {total_rows}")
    print(f"  Your publications cited: {len(publications)}")
    print(f"  External citing papers: {len(citing_papers)}")
    print(f"  Self-citations filtered: {self_citations_filtered}")
    print(f"  Unique locations: {len(locations)}")
    print(f"  Unique countries: {len(country_counts)}")
    
    print(f"\n{'='*40}")
    print("VENUE TIER DISTRIBUTION")
    print(f"{'='*40}")
    print(f"  Tier 1 (Top venues): {tier_counts['tier1']}")
    print(f"  Tier 2 (Peer-reviewed): {tier_counts['tier2']}")
    print(f"  Preprints: {tier_counts['preprint']}")
    print(f"  Other/Unknown: {tier_counts['other']}")
    
    print(f"\n{'='*40}")
    print("HIGH-INFLUENCE CITATIONS")
    print(f"{'='*40}")
    print(f"  From prestigious institutions: {prestigious_count}")
    print(f"  Top-tier venue papers: {tier_counts['tier1']}")
    
    print(f"\n{'='*40}")
    print("TOP COUNTRIES")
    print(f"{'='*40}")
    for country, count in top_countries[:10]:
        print(f"  {country}: {count}")
    
    print(f"\n{'='*40}")
    print("TOP AFFILIATIONS")
    print(f"{'='*40}")
    for aff, count in top_affiliations[:10]:
        aff_display = aff[:50] + '...' if len(aff) > 50 else aff
        print(f"  {aff_display}: {count}")
    
    print(f"\n{'='*60}")
    print("Done!")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
