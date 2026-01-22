from citation_map import generate_citation_map
import os


# Vineeth's Google Scholar ID
scholar_id = 'hIVoKbIAAAAJ'

# Output paths
output_dir = os.path.dirname(os.path.abspath(__file__))
output_html = os.path.join(output_dir, 'citation_map.html')
output_csv = os.path.join(output_dir, 'citation_info.csv')
cache_folder = os.path.join(output_dir, 'citation_cache')

print(f"Running CitationMap for Scholar ID: {scholar_id}")
print(f"Output HTML: {output_html}")
print(f"Output CSV: {output_csv}")
print(f"Cache folder: {cache_folder}")

if __name__ == '__main__':
# Run CitationMap
    generate_citation_map(
        scholar_id=scholar_id,
        output_path=output_html,
        csv_output_path=output_csv,
        cache_folder=cache_folder,
        affiliation_conservative=False,  # Get more affiliations
        # num_processes=4,  # Reduce to avoid rate limiting
        use_proxy=False,
        pin_colorful=True,
        print_citing_affiliations=True
    )

    print("\nCitationMap completed!")
    print(f"HTML map saved to: {output_html}")
    print(f"CSV data saved to: {output_csv}")
