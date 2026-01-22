#!/usr/bin/env python3
"""
Convert CitationMap cache files and CSV output to JSON format for the website.
Processes the cached data and extracts venue information for peer-reviewed analysis.
"""

import pickle
import json
import os
import re
import csv
import time
import math
from pathlib import Path

# Try to import geopy, but make it optional
try:
    from geopy.geocoders import Nominatim
    from geopy.exc import GeocoderTimedOut, GeocoderServiceError
    GEOPY_AVAILABLE = True
except ImportError:
    GEOPY_AVAILABLE = False
    print("Note: geopy not installed, using predefined coordinates only")

# Your name patterns to filter out self-citations
SELF_NAMES = [
    'vineeth sai', 
    'vs narajala', 
    'vineeth sai narajala', 
    'v. s. narajala', 
    'narajala, v',
    'narajala, vineeth',
    'v s narajala',
    'vineeth narajala',
    'narajala vs',
    'narajala vineeth'
]

# Tier 1: Top-tier peer-reviewed venues (IEEE, ACM, USENIX, major security conferences)
TIER1_PATTERNS = [
    'ieee', 'acm', 'usenix', 'ndss', 'ccs', 's&p', 'sp ', 'infocom',
    'security', 'oakland', 'crypto', 'eurocrypt', 'asiacrypt',
    'acsac', 'esorics', 'wisec', 'uss ', 'isca', 'micro', 'hpca',
    'sigcomm', 'mobicom', 'nsdi', 'sosp', 'osdi', 'eurosys',
    'pldi', 'popl', 'icse', 'fse', 'ase', 'issta', 'sigmod', 'vldb',
    'transactions on', 'ieee access', 'ieee communications', 
    'ieee network', 'ieee transactions'
]

# Tier 2: Other peer-reviewed venues
TIER2_PATTERNS = [
    'springer', 'elsevier', 'nature', 'science', 'plos', 'jstor',
    'wiley', 'taylor & francis', 'mdpi', 'sensors', 'electronics',
    'journal of', 'international journal', 'conference on', 
    'symposium on', 'workshop on', 'proceedings', 'applied sciences'
]

# Preprints
PREPRINT_PATTERNS = ['arxiv', 'preprint', 'ssrn', 'biorxiv', 'medrxiv', 'techrxiv']

# Predefined university coordinates (fallback when geocoding is unavailable or fails)
UNIVERSITY_COORDS = {
    # USA
    'stanford': {'lat': 37.4275, 'lng': -122.1697, 'country': 'United States'},
    'mit': {'lat': 42.3601, 'lng': -71.0942, 'country': 'United States'},
    'massachusetts institute': {'lat': 42.3601, 'lng': -71.0942, 'country': 'United States'},
    'berkeley': {'lat': 37.8719, 'lng': -122.2585, 'country': 'United States'},
    'carnegie mellon': {'lat': 40.4432, 'lng': -79.9428, 'country': 'United States'},
    'georgia tech': {'lat': 33.7756, 'lng': -84.3963, 'country': 'United States'},
    'georgia institute': {'lat': 33.7756, 'lng': -84.3963, 'country': 'United States'},
    'harvard': {'lat': 42.3770, 'lng': -71.1167, 'country': 'United States'},
    'princeton': {'lat': 40.3431, 'lng': -74.6551, 'country': 'United States'},
    'cornell': {'lat': 42.4534, 'lng': -76.4735, 'country': 'United States'},
    'purdue': {'lat': 40.4237, 'lng': -86.9212, 'country': 'United States'},
    'michigan': {'lat': 42.2780, 'lng': -83.7382, 'country': 'United States'},
    'illinois': {'lat': 40.1020, 'lng': -88.2272, 'country': 'United States'},
    'uiuc': {'lat': 40.1020, 'lng': -88.2272, 'country': 'United States'},
    'ucla': {'lat': 34.0689, 'lng': -118.4452, 'country': 'United States'},
    'usc': {'lat': 34.0224, 'lng': -118.2851, 'country': 'United States'},
    'texas': {'lat': 30.2849, 'lng': -97.7341, 'country': 'United States'},
    'ut austin': {'lat': 30.2849, 'lng': -97.7341, 'country': 'United States'},
    'virginia tech': {'lat': 37.2296, 'lng': -80.4139, 'country': 'United States'},
    'unc': {'lat': 35.9049, 'lng': -79.0469, 'country': 'United States'},
    'north carolina': {'lat': 35.9049, 'lng': -79.0469, 'country': 'United States'},
    'washington': {'lat': 47.6553, 'lng': -122.3035, 'country': 'United States'},
    'columbia': {'lat': 40.8075, 'lng': -73.9626, 'country': 'United States'},
    'nyu': {'lat': 40.7295, 'lng': -73.9965, 'country': 'United States'},
    'ohio state': {'lat': 40.0067, 'lng': -83.0305, 'country': 'United States'},
    'penn state': {'lat': 40.7982, 'lng': -77.8599, 'country': 'United States'},
    'cisco': {'lat': 37.4089, 'lng': -121.9495, 'country': 'United States'},
    'google': {'lat': 37.4220, 'lng': -122.0841, 'country': 'United States'},
    'microsoft': {'lat': 47.6740, 'lng': -122.1215, 'country': 'United States'},
    'apple': {'lat': 37.3349, 'lng': -122.0090, 'country': 'United States'},
    'amazon': {'lat': 47.6062, 'lng': -122.3321, 'country': 'United States'},
    'meta': {'lat': 37.4850, 'lng': -122.1469, 'country': 'United States'},
    'facebook': {'lat': 37.4850, 'lng': -122.1469, 'country': 'United States'},
    
    # UK
    'oxford': {'lat': 51.7548, 'lng': -1.2544, 'country': 'United Kingdom'},
    'cambridge': {'lat': 52.2043, 'lng': 0.1218, 'country': 'United Kingdom'},
    'imperial': {'lat': 51.4988, 'lng': -0.1749, 'country': 'United Kingdom'},
    'ucl': {'lat': 51.5246, 'lng': -0.1340, 'country': 'United Kingdom'},
    'edinburgh': {'lat': 55.9445, 'lng': -3.1892, 'country': 'United Kingdom'},
    'manchester': {'lat': 53.4668, 'lng': -2.2339, 'country': 'United Kingdom'},
    'bristol': {'lat': 51.4584, 'lng': -2.6030, 'country': 'United Kingdom'},
    'unsw': {'lat': -33.9173, 'lng': 151.2313, 'country': 'Australia'},
    
    # Europe
    'eth zurich': {'lat': 47.3769, 'lng': 8.5417, 'country': 'Switzerland'},
    'epfl': {'lat': 46.5197, 'lng': 6.5668, 'country': 'Switzerland'},
    'tu munich': {'lat': 48.1497, 'lng': 11.5679, 'country': 'Germany'},
    'rwth aachen': {'lat': 50.7785, 'lng': 6.0597, 'country': 'Germany'},
    'kit': {'lat': 49.0094, 'lng': 8.4108, 'country': 'Germany'},
    'tu berlin': {'lat': 52.5125, 'lng': 13.3269, 'country': 'Germany'},
    'sorbonne': {'lat': 48.8462, 'lng': 2.3464, 'country': 'France'},
    'inria': {'lat': 48.8422, 'lng': 2.2656, 'country': 'France'},
    'delft': {'lat': 52.0116, 'lng': 4.3571, 'country': 'Netherlands'},
    'amsterdam': {'lat': 52.3556, 'lng': 4.9556, 'country': 'Netherlands'},
    
    # Asia
    'tsinghua': {'lat': 40.0015, 'lng': 116.3264, 'country': 'China'},
    'peking': {'lat': 39.9869, 'lng': 116.3059, 'country': 'China'},
    'fudan': {'lat': 31.2990, 'lng': 121.5000, 'country': 'China'},
    'zhejiang': {'lat': 30.2616, 'lng': 120.1195, 'country': 'China'},
    'shanghai jiao': {'lat': 31.0284, 'lng': 121.4374, 'country': 'China'},
    'nanjing': {'lat': 32.1194, 'lng': 118.9589, 'country': 'China'},
    'ustc': {'lat': 31.8205, 'lng': 117.2272, 'country': 'China'},
    'science and technology of china': {'lat': 31.8205, 'lng': 117.2272, 'country': 'China'},
    'electronic science': {'lat': 30.7633, 'lng': 103.9889, 'country': 'China'},
    'hong kong': {'lat': 22.2830, 'lng': 114.1370, 'country': 'Hong Kong'},
    'chinese university': {'lat': 22.4196, 'lng': 114.2068, 'country': 'Hong Kong'},
    'tokyo': {'lat': 35.7128, 'lng': 139.7620, 'country': 'Japan'},
    'kyoto': {'lat': 35.0274, 'lng': 135.7817, 'country': 'Japan'},
    'seoul national': {'lat': 37.4596, 'lng': 126.9520, 'country': 'South Korea'},
    'kaist': {'lat': 36.3701, 'lng': 127.3604, 'country': 'South Korea'},
    'nus': {'lat': 1.2966, 'lng': 103.7764, 'country': 'Singapore'},
    'ntu singapore': {'lat': 1.3483, 'lng': 103.6831, 'country': 'Singapore'},
    'nanyang': {'lat': 1.3483, 'lng': 103.6831, 'country': 'Singapore'},
    'iit': {'lat': 19.1334, 'lng': 72.9133, 'country': 'India'},
    'iisc': {'lat': 13.0219, 'lng': 77.5671, 'country': 'India'},
    'indian institute': {'lat': 28.5447, 'lng': 77.1929, 'country': 'India'},
    
    # Australia
    'melbourne': {'lat': -37.7983, 'lng': 144.9610, 'country': 'Australia'},
    'sydney': {'lat': -33.8888, 'lng': 151.1872, 'country': 'Australia'},
    'anu': {'lat': -35.2777, 'lng': 149.1185, 'country': 'Australia'},
    'monash': {'lat': -37.9105, 'lng': 145.1363, 'country': 'Australia'},
    
    # Middle East
    'technion': {'lat': 32.7775, 'lng': 35.0217, 'country': 'Israel'},
    'tel aviv': {'lat': 32.1133, 'lng': 34.8044, 'country': 'Israel'},
    'kaust': {'lat': 22.3097, 'lng': 39.1036, 'country': 'Saudi Arabia'},
    
    # Other
    'xian': {'lat': 34.3416, 'lng': 108.9398, 'country': 'China'},
    "xi'an": {'lat': 34.3416, 'lng': 108.9398, 'country': 'China'},
    'sun yat-sen': {'lat': 23.0967, 'lng': 113.2847, 'country': 'China'},
    'wuhan': {'lat': 30.5364, 'lng': 114.3577, 'country': 'China'},
    'kiev': {'lat': 50.4501, 'lng': 30.5234, 'country': 'Ukraine'},
    'киев': {'lat': 50.4501, 'lng': 30.5234, 'country': 'Ukraine'},
}

# Country coordinates (fallback)
COUNTRY_COORDS = {
    'usa': {'lat': 39.8283, 'lng': -98.5795, 'country': 'United States'},
    'united states': {'lat': 39.8283, 'lng': -98.5795, 'country': 'United States'},
    'us': {'lat': 39.8283, 'lng': -98.5795, 'country': 'United States'},
    'india': {'lat': 20.5937, 'lng': 78.9629, 'country': 'India'},
    'china': {'lat': 35.8617, 'lng': 104.1954, 'country': 'China'},
    'uk': {'lat': 55.3781, 'lng': -3.4360, 'country': 'United Kingdom'},
    'united kingdom': {'lat': 55.3781, 'lng': -3.4360, 'country': 'United Kingdom'},
    'germany': {'lat': 51.1657, 'lng': 10.4515, 'country': 'Germany'},
    'france': {'lat': 46.2276, 'lng': 2.2137, 'country': 'France'},
    'canada': {'lat': 56.1304, 'lng': -106.3468, 'country': 'Canada'},
    'australia': {'lat': -25.2744, 'lng': 133.7751, 'country': 'Australia'},
    'japan': {'lat': 36.2048, 'lng': 138.2529, 'country': 'Japan'},
    'south korea': {'lat': 35.9078, 'lng': 127.7669, 'country': 'South Korea'},
    'korea': {'lat': 35.9078, 'lng': 127.7669, 'country': 'South Korea'},
    'brazil': {'lat': -14.2350, 'lng': -51.9253, 'country': 'Brazil'},
    'russia': {'lat': 61.5240, 'lng': 105.3188, 'country': 'Russia'},
    'singapore': {'lat': 1.3521, 'lng': 103.8198, 'country': 'Singapore'},
    'israel': {'lat': 31.0461, 'lng': 34.8516, 'country': 'Israel'},
    'switzerland': {'lat': 46.8182, 'lng': 8.2275, 'country': 'Switzerland'},
    'netherlands': {'lat': 52.1326, 'lng': 5.2913, 'country': 'Netherlands'},
    'spain': {'lat': 40.4637, 'lng': -3.7492, 'country': 'Spain'},
    'italy': {'lat': 41.8719, 'lng': 12.5674, 'country': 'Italy'},
}


def get_venue_tier(venue: str) -> str:
    """Determine the tier of a venue"""
    venue_lower = venue.lower()
    
    if any(p in venue_lower for p in PREPRINT_PATTERNS):
        return 'preprint'
    if any(p in venue_lower for p in TIER1_PATTERNS):
        return 'tier1'
    if any(p in venue_lower for p in TIER2_PATTERNS):
        return 'tier2'
    return 'other'


def get_venue_score(venue: str) -> int:
    """Get numeric score for a venue"""
    tier = get_venue_tier(venue)
    if tier == 'tier1':
        return 50
    elif tier == 'tier2':
        return 35
    elif tier == 'preprint':
        return 10
    return 20


def calculate_influence_score(venue: str) -> dict:
    """Calculate influence score based on venue only (no citation count)"""
    venue_score = get_venue_score(venue)
    return {
        'total': venue_score,
        'venue': venue_score,
        'citation': 0  # No longer used
    }


def is_self_citation(author_name: str) -> bool:
    """Check if the author name matches the profile owner"""
    if not author_name:
        return False
    author_lower = author_name.lower().strip()
    for name in SELF_NAMES:
        if name in author_lower or author_lower in name:
            return True
    return False


def get_coords_from_affiliation(affiliation: str) -> dict:
    """Get coordinates from affiliation using predefined mapping"""
    if not affiliation:
        return None
    
    aff_lower = affiliation.lower()
    
    # Try university matches first
    for pattern, coords in UNIVERSITY_COORDS.items():
        if pattern in aff_lower:
            return coords.copy()
    
    # Try country matches
    for pattern, coords in COUNTRY_COORDS.items():
        if pattern in aff_lower:
            return coords.copy()
    
    return None


def geocode_with_nominatim(affiliation: str, geolocator, cache: dict) -> dict:
    """Geocode an affiliation using Nominatim (if available)"""
    if not GEOPY_AVAILABLE or not affiliation:
        return None
    
    if affiliation in cache:
        return cache[affiliation]
    
    try:
        # Clean up the affiliation string
        clean_aff = re.sub(r'[^\w\s,.-]', '', affiliation)
        
        # Try to geocode
        location = geolocator.geocode(clean_aff, timeout=10)
        if location:
            result = {
                'lat': location.latitude,
                'lng': location.longitude,
                'country': 'Unknown'
            }
            cache[affiliation] = result
            return result
        
        # Try just the last part (often the institution name)
        parts = affiliation.split(',')
        for part in reversed(parts):
            part = part.strip()
            if len(part) > 3:
                location = geolocator.geocode(part, timeout=10)
                if location:
                    result = {
                        'lat': location.latitude,
                        'lng': location.longitude,
                        'country': 'Unknown'
                    }
                    cache[affiliation] = result
                    return result
    except Exception:
        pass
    
    cache[affiliation] = None
    return None


def load_csv_data(csv_path: str) -> list:
    """Load and parse CSV file from CitationMap"""
    papers = []
    if not os.path.exists(csv_path):
        return papers
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                papers.append(row)
    except Exception as e:
        print(f"Error reading CSV: {e}")
    
    return papers


def main():
    script_dir = Path(__file__).parent
    cache_dir = script_dir / 'citation_cache' / 'hIVoKbIAAAAJ'
    csv_path = script_dir / 'citation_info.csv'
    output_path = script_dir.parent / 'src' / 'data' / 'citations.json'
    
    # Load cached data
    affiliation_cache_path = cache_dir / 'author_paper_affiliation_tuple_list.pkl'
    
    if not affiliation_cache_path.exists():
        print(f"Cache file not found: {affiliation_cache_path}")
        print("Please run CitationMap first: python3.11 run_citation_map.py")
        return
    
    print("Loading cached data...")
    
    with open(affiliation_cache_path, 'rb') as f:
        affiliation_list = pickle.load(f)
    
    print(f"Loaded {len(affiliation_list)} affiliation entries from cache")
    
    # Also try to load CSV for venue information
    csv_data = load_csv_data(csv_path)
    print(f"Loaded {len(csv_data)} entries from CSV")
    
    # Create a lookup from CSV data (paper title -> venue)
    venue_lookup = {}
    for row in csv_data:
        title = row.get('citing_paper_title', '').strip()
        venue = row.get('venue', row.get('publication', '')).strip()
        if title and venue:
            venue_lookup[title.lower()] = venue
    
    # Process citing papers
    citing_papers = []
    seen_papers = set()
    cited_publications = set()
    self_citation_count = 0
    affiliations_collected = {}
    
    for entry in affiliation_list:
        if len(entry) >= 4:
            author_name = str(entry[0]) if entry[0] else ''
            citing_paper = str(entry[1]).strip() if entry[1] else ''
            cited_paper = str(entry[2]).strip() if entry[2] else ''
            affiliation = str(entry[3]).strip() if len(entry) > 3 and entry[3] else 'Unknown'
            
            if not citing_paper:
                continue
            
            # Track cited publications
            if cited_paper:
                cited_publications.add(cited_paper)
            
            # Skip self-citations
            if is_self_citation(author_name):
                self_citation_count += 1
                continue
            
            # Track affiliations for each paper
            paper_key = citing_paper.lower()
            if paper_key not in affiliations_collected:
                affiliations_collected[paper_key] = {
                    'title': citing_paper,
                    'authors': [],
                    'affiliations': [],
                    'cited_paper': cited_paper
                }
            
            if author_name and author_name not in affiliations_collected[paper_key]['authors']:
                affiliations_collected[paper_key]['authors'].append(author_name)
            if affiliation and affiliation != 'Unknown' and affiliation not in affiliations_collected[paper_key]['affiliations']:
                affiliations_collected[paper_key]['affiliations'].append(affiliation)
    
    print(f"Found {len(affiliations_collected)} unique citing papers after filtering")
    print(f"Skipped {self_citation_count} self-citation entries")
    
    # Convert collected data to citing papers list
    for paper_key, data in affiliations_collected.items():
        # Try to get venue from CSV lookup
        venue = venue_lookup.get(paper_key, 'Unknown')
        
        # Calculate influence score (venue-only)
        scores = calculate_influence_score(venue)
        
        # Get primary affiliation for this paper
        primary_aff = data['affiliations'][0] if data['affiliations'] else 'Unknown'
        
        citing_papers.append({
            'title': data['title'],
            'authors': data['authors'],
            'venue': venue,
            'link': '',
            'citationCount': 0,
            'influenceScore': scores['total'],
            'venueScore': scores['venue'],
            'citationScore': scores['citation'],
            'citedPublication': data['cited_paper'],
            'affiliation': primary_aff
        })
    
    print(f"Processed {len(citing_papers)} citing papers")
    
    # Aggregate locations using predefined coordinates (fast)
    print("Aggregating locations...")
    
    location_counts = {}
    geocoded_count = 0
    
    for paper in citing_papers:
        aff = paper.get('affiliation', 'Unknown')
        if aff and aff != 'Unknown':
            # Try each part of the affiliation
            parts = re.split(r'[,|]', aff)
            coords = None
            
            for part in parts:
                part = part.strip()
                coords = get_coords_from_affiliation(part)
                if coords:
                    break
            
            # Also try the full affiliation
            if not coords:
                coords = get_coords_from_affiliation(aff)
            
            if coords:
                geocoded_count += 1
                key = f"{coords['lat']:.2f},{coords['lng']:.2f}"
                
                if key not in location_counts:
                    location_counts[key] = {
                        'latitude': coords['lat'],
                        'longitude': coords['lng'],
                        'country': coords['country'],
                        'count': 0,
                        'papers': [],
                        'affiliations': []
                    }
                
                location_counts[key]['count'] += 1
                if paper['title'] not in location_counts[key]['papers'][:10]:  # Limit stored papers
                    location_counts[key]['papers'].append(paper['title'])
                if aff not in location_counts[key]['affiliations'][:5]:  # Limit stored affiliations
                    location_counts[key]['affiliations'].append(aff)
    
    locations = list(location_counts.values())
    print(f"Geocoded {geocoded_count} papers to {len(locations)} unique locations")
    
    # Create publications list from cited papers
    publications = [{'title': p, 'citationCount': 0, 'year': 2024} for p in cited_publications]
    
    # Calculate venue statistics
    venue_counts = {}
    tier_counts = {'tier1': 0, 'tier2': 0, 'other': 0, 'preprint': 0}
    
    for paper in citing_papers:
        venue = paper.get('venue', 'Unknown')
        venue_counts[venue] = venue_counts.get(venue, 0) + 1
        tier = get_venue_tier(venue)
        tier_counts[tier] += 1
    
    # Get top venues (excluding Unknown)
    top_venues = sorted(
        [(v, c) for v, c in venue_counts.items() if v != 'Unknown'],
        key=lambda x: x[1],
        reverse=True
    )[:10]
    
    # If we don't have enough venues, add affiliations as "venues" for display
    if len(top_venues) < 5:
        aff_counts = {}
        for paper in citing_papers:
            aff = paper.get('affiliation', 'Unknown')
            if aff and aff != 'Unknown':
                aff_counts[aff] = aff_counts.get(aff, 0) + 1
        
        top_affiliations = sorted(aff_counts.items(), key=lambda x: x[1], reverse=True)[:10]
        top_venues = top_affiliations
    
    # Calculate influence distribution
    influence_dist = {
        'high': len([p for p in citing_papers if p['influenceScore'] >= 70]),
        'medium': len([p for p in citing_papers if 40 <= p['influenceScore'] < 70]),
        'low': len([p for p in citing_papers if p['influenceScore'] < 40])
    }
    
    # Create final data structure
    citation_data = {
        'lastUpdated': time.strftime('%Y-%m-%dT%H:%M:%S.000Z'),
        'scholarId': 'hIVoKbIAAAAJ',
        'publications': publications,
        'citingPapers': citing_papers,
        'locations': locations,
        'stats': {
            'totalCitations': len(citing_papers),
            'uniqueLocations': len(locations),
            'topVenues': [{'name': v[0], 'count': v[1]} for v in top_venues],
            'influenceDistribution': influence_dist,
            'tierDistribution': tier_counts
        }
    }
    
    # Write to file
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(citation_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*50}")
    print(f"Citation data written to {output_path}")
    print(f"\nSummary:")
    print(f"  Publications cited: {len(publications)}")
    print(f"  Citing Papers (external): {len(citing_papers)}")
    print(f"  Self-citations filtered: {self_citation_count}")
    print(f"  Locations: {len(locations)}")
    print(f"\nVenue Tiers:")
    print(f"  Tier 1 (IEEE/ACM/USENIX): {tier_counts['tier1']}")
    print(f"  Tier 2 (Other peer-reviewed): {tier_counts['tier2']}")
    print(f"  Other: {tier_counts['other']}")
    print(f"  Preprints: {tier_counts['preprint']}")
    print(f"\nInfluence Distribution:")
    print(f"  High (70-100): {influence_dist['high']}")
    print(f"  Medium (40-69): {influence_dist['medium']}")
    print(f"  Low (0-39): {influence_dist['low']}")


if __name__ == '__main__':
    main()
