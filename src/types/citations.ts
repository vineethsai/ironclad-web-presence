export interface Publication {
  title: string;
  authors: string[];
  year: number;
  venue: string;
  link: string;
  citationCount: number;
  resultId: string;
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
  affiliation?: string; // Institution/affiliation of the citing author
  country?: string; // Country of the citing institution
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
}

export interface CitationData {
  lastUpdated: string;
  scholarId: string;
  publications: Publication[];
  citingPapers: CitingPaper[];
  locations: CitationLocation[];
  stats: CitationStats;
}
