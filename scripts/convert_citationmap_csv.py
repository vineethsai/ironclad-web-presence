#!/usr/bin/env python3
"""
Convert CitationMap CSV output to citations.json format.
Uses the rich affiliation and geolocation data from CitationMap.
"""

import csv
import json
import os
import re
from collections import defaultdict
from pathlib import Path

# Self-citation patterns
SELF_NAMES = [
    'vineeth sai', 'vs narajala', 'vineeth sai narajala', 'v. s. narajala', 
    'narajala, v', 'narajala, vineeth', 'v s narajala', 'vineeth narajala',
    'v narajala', 'narajala v'
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
    'workshop on mobility', 'mobiarch', 'mobisys', 'springer'
]

TIER2_PATTERNS = [
    'elsevier', 'nature', 'science', 'plos', 'jstor',
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


def is_self_citation(author_name):
    if not author_name:
        return False
    author_lower = author_name.lower().strip()
    return any(name in author_lower for name in SELF_NAMES)


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


def get_venue_score(venue):
    tier = get_venue_tier(venue)
    return {'tier1': 50, 'tier2': 35, 'preprint': 10, 'other': 20}[tier]


def main():
    script_dir = Path(__file__).parent
    csv_path = script_dir / 'citation_info.csv'
    output_path = script_dir.parent / 'src' / 'data' / 'citations.json'
    
    if not csv_path.exists():
        print(f"Error: {csv_path} not found")
        return 1
    
    print(f"Reading {csv_path}...")
    
    # Parse CSV
    papers_by_title = {}  # Deduplicate by citing paper title
    locations_map = {}
    publications_set = set()
    self_citations_filtered = 0
    
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
            
            # Track publications
            if cited_title:
                publications_set.add(cited_title)
            
            # Filter self-citations
            if is_self_citation(author):
                self_citations_filtered += 1
                continue
            
            # Skip if no title
            if not citing_title:
                continue
            
            # Deduplicate by paper title, keep first occurrence with best data
            if citing_title not in papers_by_title:
                papers_by_title[citing_title] = {
                    'title': citing_title,
                    'authors': [author] if author else [],
                    'venue': '',  # CitationMap doesn't provide venue
                    'link': '',
                    'citationCount': 0,
                    'influenceScore': 20,  # Default for unknown venue
                    'venueScore': 20,
                    'citationScore': 0,
                    'citedPublication': cited_title,
                    'affiliation': affiliation if affiliation and affiliation not in ['AI_ML', 'GENAI', 'Security', 'No_author_info'] else 'Unknown'
                }
            else:
                # Add author if not already present
                if author and author not in papers_by_title[citing_title]['authors']:
                    papers_by_title[citing_title]['authors'].append(author)
            
            # Aggregate locations
            try:
                lat_f = float(lat) if lat else None
                lng_f = float(lng) if lng else None
                
                if lat_f and lng_f and country:
                    # Round for grouping
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
                    
                    if affiliation and affiliation not in ['AI_ML', 'GENAI', 'Security', 'No_author_info']:
                        if affiliation not in locations_map[key]['affiliations']:
                            locations_map[key]['affiliations'].append(affiliation)
            except (ValueError, TypeError):
                pass
    
    print(f"  Papers parsed: {len(papers_by_title)}")
    print(f"  Self-citations filtered: {self_citations_filtered}")
    print(f"  Locations: {len(locations_map)}")
    
    # Convert to lists
    citing_papers = list(papers_by_title.values())
    locations = list(locations_map.values())
    
    # Create publications list
    publications = [{'title': t, 'year': 2024, 'venue': '', 'citationCount': 0} for t in publications_set]
    
    # Calculate stats
    tier_counts = {'tier1': 0, 'tier2': 0, 'other': 0, 'preprint': 0}
    for paper in citing_papers:
        # Since CitationMap doesn't provide venue, all are 'other' by default
        tier_counts['other'] += 1
    
    # Sort locations by count
    locations.sort(key=lambda x: x['count'], reverse=True)
    
    # Build output
    citation_data = {
        'lastUpdated': __import__('datetime').datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z'),
        'scholarId': 'hIVoKbIAAAAJ',
        'publications': publications,
        'citingPapers': citing_papers,
        'locations': locations,
        'stats': {
            'totalCitations': len(citing_papers),
            'uniqueLocations': len(locations),
            'topVenues': [],  # CitationMap doesn't provide venue data
            'influenceDistribution': {
                'high': tier_counts['tier1'],
                'medium': tier_counts['tier2'],
                'low': tier_counts['other'] + tier_counts['preprint']
            },
            'tierDistribution': tier_counts
        }
    }
    
    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(citation_data, f, indent=2, ensure_ascii=False)
    
    print(f"\nOutput written to {output_path}")
    print(f"\nSummary:")
    print(f"  Publications cited: {len(publications)}")
    print(f"  Unique citing papers: {len(citing_papers)}")
    print(f"  Unique locations: {len(locations)}")
    print(f"  Self-citations filtered: {self_citations_filtered}")
    
    # Show top locations
    print(f"\nTop 10 locations by citation count:")
    for loc in locations[:10]:
        affs = ', '.join(loc['affiliations'][:2]) if loc['affiliations'] else 'Unknown'
        print(f"  {loc['country']}: {loc['count']} citations ({affs})")
    
    return 0


if __name__ == '__main__':
    exit(main())
