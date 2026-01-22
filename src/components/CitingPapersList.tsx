import React, { useState, useMemo } from 'react';
import type { CitingPaper } from '@/types/citations';
import InfluenceScore from './InfluenceScore';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ExternalLink, Search, TrendingUp, Calendar, Users, Building2, Globe } from 'lucide-react';

interface CitingPapersListProps {
  papers: CitingPaper[];
}

type SortOption = 'influence-desc' | 'influence-asc' | 'citations-desc' | 'citations-asc' | 'year-desc' | 'year-asc';
type FilterOption = 'all' | 'high' | 'medium' | 'low';

const CitingPapersList: React.FC<CitingPapersListProps> = ({ papers }) => {
  const [sortBy, setSortBy] = useState<SortOption>('influence-desc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique countries for filter dropdown (exclude noisy geocoding results)
  const EXCLUDED_COUNTRIES = ['Papua New Guinea', 'Mali'];
  
  // Normalize country names
  const normalizeCountry = (country: string): string => {
    const normalized = country.trim();
    if (normalized === 'USA' || normalized === 'US') return 'United States';
    if (normalized === 'UK') return 'United Kingdom';
    return normalized;
  };
  
  const uniqueCountries = useMemo(() => {
    const countries = new Set<string>();
    papers.forEach(paper => {
      if (paper.country && paper.country !== 'Unknown' && !EXCLUDED_COUNTRIES.includes(paper.country)) {
        countries.add(normalizeCountry(paper.country));
      }
    });
    return Array.from(countries).sort();
  }, [papers]);

  const filteredAndSortedPapers = useMemo(() => {
    let filtered = [...papers];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(paper =>
        paper.title.toLowerCase().includes(query) ||
        paper.authors.some(author => author.toLowerCase().includes(query)) ||
        paper.venue.toLowerCase().includes(query) ||
        paper.citedPublication.toLowerCase().includes(query) ||
        (paper.affiliation && paper.affiliation.toLowerCase().includes(query)) ||
        (paper.country && paper.country.toLowerCase().includes(query))
      );
    }

    // Apply country filter (with normalization)
    if (countryFilter !== 'all') {
      filtered = filtered.filter(paper => 
        paper.country && normalizeCountry(paper.country) === countryFilter
      );
    }

    // Apply influence filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(paper => {
        if (filterBy === 'high') return paper.influenceScore >= 70;
        if (filterBy === 'medium') return paper.influenceScore >= 40 && paper.influenceScore < 70;
        if (filterBy === 'low') return paper.influenceScore < 40;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'influence-desc':
          return b.influenceScore - a.influenceScore;
        case 'influence-asc':
          return a.influenceScore - b.influenceScore;
        case 'citations-desc':
          return b.citationCount - a.citationCount;
        case 'citations-asc':
          return a.citationCount - b.citationCount;
        case 'year-desc':
          return (b.year || 0) - (a.year || 0);
        case 'year-asc':
          return (a.year || 0) - (b.year || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [papers, sortBy, filterBy, countryFilter, searchQuery]);

  if (papers.length === 0) {
    return (
      <div className="text-center py-12 bg-cyber-grey rounded-lg border border-cyber-green/20">
        <p className="text-gray-400">No citing papers available</p>
        <p className="text-sm text-gray-500 mt-2">Run the fetch-citations script to populate data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search papers, authors, venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-cyber-grey border-cyber-green/30 text-white placeholder:text-gray-500"
          />
        </div>
        
        <Select value={filterBy} onValueChange={(value) => setFilterBy(value as FilterOption)}>
          <SelectTrigger className="w-full md:w-48 bg-cyber-grey border-cyber-green/30 text-white">
            <SelectValue placeholder="Filter by influence" />
          </SelectTrigger>
          <SelectContent className="bg-cyber-grey border-cyber-green/30">
            <SelectItem value="all" className="text-white">All Papers</SelectItem>
            <SelectItem value="high" className="text-white">High Influence</SelectItem>
            <SelectItem value="medium" className="text-white">Medium Influence</SelectItem>
            <SelectItem value="low" className="text-white">Low Influence</SelectItem>
          </SelectContent>
        </Select>

        {uniqueCountries.length > 0 && (
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-full md:w-48 bg-cyber-grey border-cyber-green/30 text-white">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by country" />
            </SelectTrigger>
            <SelectContent className="bg-cyber-grey border-cyber-green/30 max-h-60">
              <SelectItem value="all" className="text-white">All Countries</SelectItem>
              {uniqueCountries.map(country => (
                <SelectItem key={country} value={country} className="text-white">
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-full md:w-48 bg-cyber-grey border-cyber-green/30 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-cyber-grey border-cyber-green/30">
            <SelectItem value="influence-desc" className="text-white">Influence (High→Low)</SelectItem>
            <SelectItem value="influence-asc" className="text-white">Influence (Low→High)</SelectItem>
            <SelectItem value="citations-desc" className="text-white">Citations (High→Low)</SelectItem>
            <SelectItem value="citations-asc" className="text-white">Citations (Low→High)</SelectItem>
            <SelectItem value="year-desc" className="text-white">Year (Newest)</SelectItem>
            <SelectItem value="year-asc" className="text-white">Year (Oldest)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-400">
        Showing {filteredAndSortedPapers.length} of {papers.length} paper{papers.length !== 1 ? 's' : ''}
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        {filteredAndSortedPapers.map((paper, index) => (
          <div
            key={index}
            className="bg-cyber-grey rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300 p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold text-white hover:text-cyber-green transition-colors flex-1">
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {paper.title}
                    </a>
                  </h3>
                  <InfluenceScore score={paper.influenceScore} size="sm" />
                </div>

                {paper.snippet && (
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{paper.snippet}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  {paper.authors.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ' et al.' : ''}</span>
                    </div>
                  )}
                  
                  {paper.affiliation && paper.affiliation !== 'Unknown' && !paper.affiliation.startsWith('No_author') && (
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span className="truncate max-w-[200px]">{paper.affiliation}</span>
                    </div>
                  )}
                  
                  {paper.country && paper.country !== 'Unknown' && !EXCLUDED_COUNTRIES.includes(paper.country) && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <span>{normalizeCountry(paper.country)}</span>
                    </div>
                  )}
                  
                  {paper.year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{paper.year}</span>
                    </div>
                  )}
                  
                  {paper.citationCount > 0 && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{paper.citationCount} citation{paper.citationCount !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-xs">
                    {paper.venue}
                  </span>
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-xs">
                    Cites: {paper.citedPublication.substring(0, 40)}{paper.citedPublication.length > 40 ? '...' : ''}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <span>Venue Score: {paper.venueScore}/50</span>
                  {paper.venueScore >= 50 && <span className="text-cyber-green">• Top-Tier</span>}
                  {paper.venueScore >= 35 && paper.venueScore < 50 && <span className="text-yellow-400">• Peer-Reviewed</span>}
                  {paper.venueScore < 20 && <span className="text-gray-400">• Other</span>}
                </div>
              </div>

              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-cyber-dark"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Paper
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedPapers.length === 0 && (
        <div className="text-center py-12 bg-cyber-grey rounded-lg border border-cyber-green/20">
          <p className="text-gray-400">No papers match your filters</p>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchQuery('');
              setFilterBy('all');
              setCountryFilter('all');
            }}
            className="mt-4 text-cyber-green hover:text-cyber-green/80"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CitingPapersList;
