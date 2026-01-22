import { writeFileSync } from 'fs';
import { join } from 'path';
import type { CitationData, Publication, CitingPaper, CitationLocation, CitationStats } from '../src/types/citations.ts';

const SERPAPI_KEY = process.env.SERPAPI_KEY || '9700e269dc8f9bc9e8eae7a887304555e8f922f584b62f71ff19fafb26575307';
const SCHOLAR_ID = 'hIVoKbIAAAAJ';
const OUTPUT_PATH = join(process.cwd(), 'src/data/citations.json');

interface SerpApiAuthorResult {
  author: {
    name: string;
    author_id: string;
    affiliations?: string;
    email?: string;
  };
  articles: Array<{
    title: string;
    link: string;
    citation_id: string;
    authors: string; // String format, not array
    publication: string;
    year: string; // String format
    cited_by?: {
      value: number;
      link: string;
      serpapi_link: string;
      cites_id: string;
    };
  }>;
  error?: string;
}

interface SerpApiCiteResult {
  organic_results: Array<{
    title: string;
    link: string;
    snippet?: string;
    publication_info?: {
      summary: string;
      authors: Array<{ 
        name: string;
        link?: string;
        serpapi_scholar_link?: string;
      }>;
    };
    inline_links?: {
      cited_by?: {
        total: number;
        link: string;
      };
    };
    resources?: Array<{
      title: string;
      file_format: string;
      link: string;
    }>;
  }>;
  pagination?: {
    next?: string;
  };
}

// Venue scoring function
function getVenueScore(venue: string): number {
  const venueLower = venue.toLowerCase();
  const tierOne = ['ieee', 'acm', 'usenix', 'ndss', 'ccs', 's&p', 'sp'];
  const tierTwo = ['springer', 'elsevier', 'nature', 'science', 'plos', 'jstor'];
  
  if (tierOne.some(v => venueLower.includes(v))) return 50;
  if (tierTwo.some(v => venueLower.includes(v))) return 35;
  if (venueLower.includes('arxiv') || venueLower.includes('preprint')) return 10;
  return 20; // Default for unknown venues
}

// Calculate influence score
function calculateInfluenceScore(paper: Partial<CitingPaper>): { total: number; venue: number; citation: number } {
  const venueScore = getVenueScore(paper.venue || '');
  const citationCount = paper.citationCount || 0;
  const citationScore = Math.min(50, Math.log10(citationCount + 1) * 20);
  
  return {
    total: Math.round(venueScore + citationScore),
    venue: venueScore,
    citation: Math.round(citationScore)
  };
}

// Geocode affiliation using OpenStreetMap Nominatim (free, like CitationMap uses geopy)
async function geocodeAffiliation(affiliation: string): Promise<{ lat: number; lng: number; country: string; city?: string } | null> {
  if (!affiliation || affiliation.trim().length === 0) {
    return null;
  }
  
  try {
    // Use OpenStreetMap Nominatim API (free, similar to geopy which CitationMap uses)
    const encoded = encodeURIComponent(affiliation);
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CitationMap/1.0' // Required by Nominatim
      }
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        country: result.address?.country || 'Unknown',
        city: result.address?.city || result.address?.town || result.address?.village
      };
    }
  } catch (error) {
    // Fallback to pattern matching if API fails
  }
  
  // Fallback: Simple country/city detection patterns
  const affiliationLower = affiliation.toLowerCase();
  const countryPatterns: Record<string, { lat: number; lng: number; country: string }> = {
    'usa': { lat: 39.8283, lng: -98.5795, country: 'United States' },
    'united states': { lat: 39.8283, lng: -98.5795, country: 'United States' },
    'us': { lat: 39.8283, lng: -98.5795, country: 'United States' },
    'india': { lat: 20.5937, lng: 78.9629, country: 'India' },
    'china': { lat: 35.8617, lng: 104.1954, country: 'China' },
    'uk': { lat: 55.3781, lng: -3.4360, country: 'United Kingdom' },
    'united kingdom': { lat: 55.3781, lng: -3.4360, country: 'United Kingdom' },
    'germany': { lat: 51.1657, lng: 10.4515, country: 'Germany' },
    'france': { lat: 46.2276, lng: 2.2137, country: 'France' },
    'canada': { lat: 56.1304, lng: -106.3468, country: 'Canada' },
    'australia': { lat: -25.2744, lng: 133.7751, country: 'Australia' },
    'japan': { lat: 36.2048, lng: 138.2529, country: 'Japan' },
    'south korea': { lat: 35.9078, lng: 127.7669, country: 'South Korea' },
    'brazil': { lat: -14.2350, lng: -51.9253, country: 'Brazil' },
    'russia': { lat: 61.5240, lng: 105.3188, country: 'Russia' },
  };
  
  for (const [key, coords] of Object.entries(countryPatterns)) {
    if (affiliationLower.includes(key)) {
      return coords;
    }
  }
  
  // Return null if not found (don't create "Unknown" locations)
  return null;
}

async function fetchAuthorPublications(): Promise<Publication[]> {
  // Use Google Scholar Author API with author_id parameter
  const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${SCHOLAR_ID}&api_key=${SERPAPI_KEY}`;
  
  try {
    console.log(`Fetching from: ${url.replace(SERPAPI_KEY, 'API_KEY_HIDDEN')}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${errorText.substring(0, 200)}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: SerpApiAuthorResult = await response.json();
    
    if (data.error) {
      console.error('API error:', data.error);
      return [];
    }
    
    if (!data.articles || data.articles.length === 0) {
      console.warn('No articles found in author profile');
      return [];
    }
    
    console.log(`Found ${data.articles.length} articles`);
    
    return data.articles.map(article => ({
      title: article.title,
      authors: article.authors ? article.authors.split(',').map(a => a.trim()) : [],
      year: parseInt(article.year) || new Date().getFullYear(),
      venue: article.publication || 'Unknown',
      link: article.link,
      citationCount: article.cited_by?.value || 0,
      resultId: article.citation_id,
      citesId: article.cited_by?.cites_id || article.citation_id
    }));
  } catch (error) {
    console.error('Error fetching author publications:', error);
    // Return empty array on error so build can continue
    return [];
  }
}

// Fetch author profile to get affiliation (like CitationMap does with scholarly)
async function fetchAuthorAffiliation(authorLink: string): Promise<string | null> {
  try {
    // Extract author_id from link if it's a SerpAPI link
    const authorIdMatch = authorLink.match(/author_id=([^&]+)/);
    if (!authorIdMatch) return null;
    
    const authorId = authorIdMatch[1];
    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authorId}&api_key=${SERPAPI_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.author?.affiliations || null;
  } catch (error) {
    return null;
  }
}

async function fetchCitingPapers(citesId: string, publicationTitle: string): Promise<CitingPaper[]> {
  const citingPapers: CitingPaper[] = [];
  let start = 0;
  let hasMore = true;
  // Get ALL citations like CitationMap does (no limit, just safety check)
  const maxIterations = 1000; // Safety limit to prevent infinite loops
  
  // Handle multiple cites_ids (comma-separated)
  const citesIds = citesId.split(',');
  const firstCitesId = citesIds[0].trim();
  
  let iteration = 0;
  while (hasMore && iteration < maxIterations) {
    iteration++;
    const url = `https://serpapi.com/search.json?engine=google_scholar&cites=${firstCitesId}&start=${start}&api_key=${SERPAPI_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`HTTP error for cites ${citesId}: ${response.status}`);
        hasMore = false;
        break;
      }
      const data: SerpApiCiteResult = await response.json();
      
      if (!data.organic_results || data.organic_results.length === 0) {
        hasMore = false;
        break;
      }
      
      for (const result of data.organic_results) {
        const citationCount = result.inline_links?.cited_by?.total || 0;
        const venue = result.publication_info?.summary || 'Unknown';
        const authors = result.publication_info?.authors?.map(a => a.name) || [];
        const authorLinks = result.publication_info?.authors
          ?.map(a => a.serpapi_scholar_link || a.link)
          .filter(Boolean) || [];
        
        // Try to get affiliations from first author (like CitationMap does)
        let authorAffiliation: string | null = null;
        if (authorLinks.length > 0) {
          try {
            authorAffiliation = await fetchAuthorAffiliation(authorLinks[0]);
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
          } catch (error) {
            // Silently fail - we'll use venue-based geocoding as fallback
          }
        }
        
        const scores = calculateInfluenceScore({
          venue,
          citationCount
        });
        
        citingPapers.push({
          title: result.title,
          authors,
          venue,
          link: result.link,
          citationCount,
          snippet: result.snippet,
          publicationInfo: result.publication_info ? { summary: result.publication_info.summary } : undefined,
          influenceScore: scores.total,
          venueScore: scores.venue,
          citationScore: scores.citation,
          citedPublication: publicationTitle,
          // Store affiliation for geocoding (like CitationMap does)
          _authorAffiliation: authorAffiliation || undefined
        } as CitingPaper & { _authorAffiliation?: string });
      }
      
      // Check if there's a next page
      hasMore = !!data.pagination?.next;
      start += 10;
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(`Error fetching citing papers for ${citesId}:`, error);
      hasMore = false;
    }
  }
  
  return citingPapers;
}

async function aggregateLocations(citingPapers: CitingPaper[]): Promise<CitationLocation[]> {
  const locationMap = new Map<string, CitationLocation>();
  
  // For each citing paper, extract affiliation (like CitationMap does)
  for (const paper of citingPapers) {
    // First try to use author affiliation if we fetched it
    let affiliation = (paper as any)._authorAffiliation;
    
    // If no author affiliation, try to extract from venue/snippet (like CitationMap's fallback)
    if (!affiliation) {
      const text = `${paper.venue} ${paper.snippet || ''}`;
      
      // Improved pattern matching (similar to CitationMap's approach)
      const patterns = [
        // University patterns
        /(?:at|from|,\s*)([A-Z][^,]+(?:University|Univ\.?|College|Institute|School)[^,]*)/i,
        // Institution patterns
        /([A-Z][^,]+(?:University|Univ\.?|College|Institute|School)[^,]*)/i,
        // City, Country patterns
        /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
          affiliation = match[0].trim();
          break;
        }
      }
      
      // Fallback to venue if nothing found
      if (!affiliation) {
        affiliation = paper.venue;
      }
    }
    
    // Clean up affiliation string (remove common prefixes)
    affiliation = affiliation
      .replace(/^(at|from|,\s*)/i, '')
      .trim();
    
    const geocode = await geocodeAffiliation(affiliation);
    if (geocode && geocode.lat !== 0 && geocode.lng !== 0) {
      const key = `${geocode.lat.toFixed(2)},${geocode.lng.toFixed(2)}`;
      
      if (!locationMap.has(key)) {
        locationMap.set(key, {
          latitude: geocode.lat,
          longitude: geocode.lng,
          city: geocode.city,
          country: geocode.country,
          count: 0,
          papers: [],
          affiliations: []
        });
      }
      
      const location = locationMap.get(key)!;
      location.count++;
      if (!location.papers.includes(paper.title)) {
        location.papers.push(paper.title);
      }
      if (!location.affiliations.includes(affiliation)) {
        location.affiliations.push(affiliation);
      }
    }
    
    // Small delay to avoid overwhelming
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  return Array.from(locationMap.values());
}

async function main() {
  console.log('Fetching citations data...');
  console.log(`Using Scholar ID: ${SCHOLAR_ID}`);
  
  // Fetch publications
  console.log('Fetching publications...');
  const publications = await fetchAuthorPublications();
  console.log(`Found ${publications.length} publications`);
  
  if (publications.length === 0) {
    console.warn('No publications found. The API key may be invalid or the Scholar ID may be incorrect.');
    console.warn('Creating empty citation data file...');
    
    const emptyData: CitationData = {
      lastUpdated: new Date().toISOString(),
      scholarId: SCHOLAR_ID,
      publications: [],
      citingPapers: [],
      locations: [],
      stats: {
        totalCitations: 0,
        uniqueLocations: 0,
        topVenues: [],
        influenceDistribution: { high: 0, medium: 0, low: 0 }
      }
    };
    
    writeFileSync(OUTPUT_PATH, JSON.stringify(emptyData, null, 2));
    console.log(`Empty citation data written to ${OUTPUT_PATH}`);
    return;
  }
  
  // Fetch citing papers for each publication
  const allCitingPapers: CitingPaper[] = [];
  for (let i = 0; i < publications.length; i++) {
    const pub = publications[i];
    if (pub.citesId) {
      console.log(`[${i + 1}/${publications.length}] Fetching citing papers for: ${pub.title.substring(0, 50)}...`);
      const citingPapers = await fetchCitingPapers(pub.citesId, pub.title);
      allCitingPapers.push(...citingPapers);
      console.log(`  Found ${citingPapers.length} citing papers`);
    } else {
      console.log(`  Skipping ${pub.title.substring(0, 50)}... (no cites ID)`);
    }
  }
  
  console.log(`Total citing papers: ${allCitingPapers.length}`);
  
  // Aggregate locations
  console.log('Aggregating locations...');
  const locations = await aggregateLocations(allCitingPapers);
  console.log(`Found ${locations.length} unique locations`);
  
  // Calculate stats
  const venueCounts = new Map<string, number>();
  allCitingPapers.forEach(paper => {
    venueCounts.set(paper.venue, (venueCounts.get(paper.venue) || 0) + 1);
  });
  
  const topVenues = Array.from(venueCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));
  
  const influenceDistribution = {
    high: allCitingPapers.filter(p => p.influenceScore >= 70).length,
    medium: allCitingPapers.filter(p => p.influenceScore >= 40 && p.influenceScore < 70).length,
    low: allCitingPapers.filter(p => p.influenceScore < 40).length
  };
  
  const stats: CitationStats = {
    totalCitations: allCitingPapers.length,
    uniqueLocations: locations.length,
    topVenues,
    influenceDistribution
  };
  
  // Create final data structure
  const citationData: CitationData = {
    lastUpdated: new Date().toISOString(),
    scholarId: SCHOLAR_ID,
    publications,
    citingPapers: allCitingPapers,
    locations,
    stats
  };
  
  // Write to file
  writeFileSync(OUTPUT_PATH, JSON.stringify(citationData, null, 2));
  console.log(`\nCitation data written to ${OUTPUT_PATH}`);
  console.log(`\nSummary:`);
  console.log(`  Publications: ${publications.length}`);
  console.log(`  Citing Papers: ${allCitingPapers.length}`);
  console.log(`  Locations: ${locations.length}`);
  console.log(`  High Influence: ${influenceDistribution.high}`);
  console.log(`  Medium Influence: ${influenceDistribution.medium}`);
  console.log(`  Low Influence: ${influenceDistribution.low}`);
}

main().catch(console.error);
