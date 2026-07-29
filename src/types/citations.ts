export interface Publication {
  title: string;
  authors?: string[];
  year: number;
  venue: string;
  link: string;
  citationCount: number;
  resultId?: string;
  citesId?: string;
}

export interface CitingPaper {
  title: string;
  authors: string[];
  year?: number;
  venue: string;
  link: string;
  citationCount: number;
  snippet?: string;
  publicationInfo?: {
    summary: string;
  };
  influenceScore: number;
  venueScore: number;
  citationScore: number;
  citedPublication: string; // Title of the publication it cites
  citedPublications?: string[]; // All publications it cites
  affiliation?: string; // Institution/affiliation of the citing author
  affiliations?: string[]; // All institutions of the citing authors
  country?: string; // Country of the citing institution
  tier?: string; // Venue quality tier (tier1, tier2, other, preprint)
  isPrestigious?: boolean;
}

export interface CitationLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country: string;
  count: number;
  papers: string[]; // Titles of papers citing from this location
  affiliations: string[];
}

export interface CitationStats {
  totalCitations: number;
  uniqueLocations: number;
  topVenues: Array<{ name: string; count: number }>;
  influenceDistribution: {
    high: number; // 70-100
    medium: number; // 40-69
    low: number; // 0-39
  };
  tierDistribution: Record<string, number>; // tier1, tier2, other, preprint
  topCountries: Array<{ name: string; count: number }>;
  prestigiousCount: number;
  uniqueAuthors: number;
  totalAuthorCitations?: number; // Authors × citations per paper
}

export interface ScholarMetrics {
  totalCitations: number;
  publicationCount: number;
  lastUpdated: string;
  profileUrl: string;
}

export interface CitationData {
  lastUpdated: string;
  scholarId: string;
  scholar: ScholarMetrics;
  publications: Publication[];
  citingPapers: CitingPaper[];
  locations: CitationLocation[];
  stats: CitationStats;
}
