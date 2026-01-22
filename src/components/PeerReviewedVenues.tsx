import React, { useMemo, useState } from 'react';
import type { CitingPaper } from '@/types/citations';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen, FileText, ExternalLink, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PeerReviewedVenuesProps {
  papers: CitingPaper[];
}

interface VenueInfo {
  name: string;
  count: number;
  tier: 'tier1' | 'tier2' | 'other' | 'preprint';
  papers: CitingPaper[];
}

interface InstitutionInfo {
  name: string;
  count: number;
  papers: CitingPaper[];
}

// Patterns for categorizing venues
const TIER1_PATTERNS = [
  // IEEE
  'ieee', 'ieee transactions', 'ieee access', 'ieee communications',
  // ACM
  'acm', 'dl.acm.org', 'acm digital library',
  // Top Security Conferences
  'usenix', 'ndss', 'ccs', 's&p', 'sp ', 'infocom',
  'security', 'oakland', 'crypto', 'eurocrypt', 'asiacrypt',
  'acsac', 'esorics', 'wisec', 'uss ',
  // Top Systems Conferences
  'isca', 'micro', 'hpca', 'sigcomm', 'mobicom', 'nsdi', 'sosp', 'osdi', 'eurosys',
  // Top SE/PL Conferences
  'pldi', 'popl', 'icse', 'fse', 'ase', 'issta', 'sigmod', 'vldb',
  // Top AI/ML Conferences
  'neurips', 'nips', 'icml', 'iclr', 'cvpr', 'iccv', 'eccv', 'aaai', 'ijcai',
  // ACM Workshops (peer-reviewed)
  'workshop on mobility', 'mobiarch', 'mobisys'
];

const TIER2_PATTERNS = [
  // Major Publishers
  'springer', 'elsevier', 'nature', 'science', 'plos', 'jstor',
  'wiley', 'taylor & francis', 'mdpi', 'sensors', 'electronics',
  // Journals
  'journal of', 'transactions on', 'international journal',
  'ict express',
  // Conferences
  'conference on', 'symposium on', 'workshop on', 'proceedings of',
  // Workshop proceedings
  'ceur-ws.org', 'ceur workshop',
  // Open peer review platforms
  'openreview.net', 'openreview',
  // Medical/Scientific databases
  'pmc.ncbi', 'pubmed', 'ncbi.nlm.nih.gov',
  // Regional/National Academic Databases (peer-reviewed)
  'dbpia', 'cyberleninka', '한국통신학회', 'kics',
  'sol.sbc.org.br', 'sbc.org.br',  // Brazilian Computer Society
  'cds.cern.ch',  // CERN Document Server
  // Books (often peer-reviewed)
  'books.google.com',
];

const PREPRINT_PATTERNS = [
  'arxiv', 'preprint', 'ssrn', 'biorxiv', 'medrxiv', 'techrxiv',
  // Additional preprint servers
  'researchgate.net', 'researchsquare', 'f1000research', 
  'preprints.org', 'osf.io', 'zenodo',
  // Institutional repositories & theses
  'digitalcommons', 'repository.lib', 'proquest', 'ela.kpi.ua',
  // Patents (not peer-reviewed research)
  'google patents', 'us patent'
];

// Publisher/Organization patterns for frequency table
const PUBLISHER_PATTERNS = {
  'IEEE': ['ieee'],
  'ACM': ['acm', 'sigcomm', 'sigmod', 'sigkdd', 'sigsac'],
  'USENIX': ['usenix'],
  'Springer': ['springer'],
  'Elsevier': ['elsevier', 'sciencedirect'],
  'arXiv': ['arxiv'],
  'MDPI': ['mdpi'],
  'Wiley': ['wiley'],
};

// Prestigious institution patterns
const PRESTIGIOUS_INSTITUTIONS = {
  'Stanford University': ['stanford'],
  'MIT': ['mit ', 'massachusetts institute'],
  'UC Berkeley': ['berkeley', 'uc berkeley'],
  'Carnegie Mellon': ['carnegie mellon', 'cmu'],
  'Harvard University': ['harvard'],
  'Princeton University': ['princeton'],
  'Cornell University': ['cornell'],
  'Georgia Tech': ['georgia tech', 'georgia institute'],
  'Purdue University': ['purdue'],
  'University of Oxford': ['oxford'],
  'University of Cambridge': ['cambridge'],
  'ETH Zurich': ['eth zurich', 'eth zürich'],
  'Tsinghua University': ['tsinghua'],
  'Peking University': ['peking'],
  'Zhejiang University': ['zhejiang'],
  'NUS': ['national university of singapore', 'nus'],
  'KAIST': ['kaist'],
  'Google': ['google'],
  'Microsoft': ['microsoft'],
  'Meta/Facebook': ['meta', 'facebook'],
  'CERN': ['cern'],
  'DeepMind': ['deepmind'],
};

function getVenueTier(venue: string): 'tier1' | 'tier2' | 'other' | 'preprint' {
  const venueLower = venue.toLowerCase();
  
  if (PREPRINT_PATTERNS.some(p => venueLower.includes(p))) {
    return 'preprint';
  }
  if (TIER1_PATTERNS.some(p => venueLower.includes(p))) {
    return 'tier1';
  }
  if (TIER2_PATTERNS.some(p => venueLower.includes(p))) {
    return 'tier2';
  }
  return 'other';
}

function getTierLabel(tier: 'tier1' | 'tier2' | 'other' | 'preprint'): string {
  switch (tier) {
    case 'tier1': return 'Top-Tier (IEEE, ACM, USENIX)';
    case 'tier2': return 'Peer-Reviewed Journals & Conferences';
    case 'other': return 'Other Publications';
    case 'preprint': return 'Preprints & Working Papers';
  }
}

function getTierColor(tier: 'tier1' | 'tier2' | 'other' | 'preprint'): string {
  switch (tier) {
    case 'tier1': return 'bg-cyber-green text-cyber-dark';
    case 'tier2': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'other': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    case 'preprint': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  }
}

function getTierIcon(tier: 'tier1' | 'tier2' | 'other' | 'preprint') {
  switch (tier) {
    case 'tier1': return <Award className="h-5 w-5" />;
    case 'tier2': return <BookOpen className="h-5 w-5" />;
    default: return <FileText className="h-5 w-5" />;
  }
}

// Keywords to highlight in venue names
const HIGHLIGHT_KEYWORDS = [
  'IEEE', 'ACM', 'USENIX', 'ICML', 'ICLR', 'NeurIPS', 'CVPR', 'AAAI', 
  'Springer', 'Elsevier', 'NDSS', 'CCS', 'S&P'
];

function getVenueKeywords(venueName: string): string[] {
  const found: string[] = [];
  HIGHLIGHT_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    if (regex.test(venueName)) {
      found.push(keyword.toUpperCase());
    }
  });
  return [...new Set(found)]; // Remove duplicates
}

const PeerReviewedVenues: React.FC<PeerReviewedVenuesProps> = ({ papers }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showAllInstitutions, setShowAllInstitutions] = useState(false);
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const { venueData, institutionData, publisherFrequency, prestigiousInstitutions, hasVenueData } = useMemo(() => {
    const venueMap = new Map<string, VenueInfo>();
    const institutionMap = new Map<string, InstitutionInfo>();
    let knownVenueCount = 0;
    
    // Publisher frequency counting
    const publisherCounts: Record<string, number> = {};
    Object.keys(PUBLISHER_PATTERNS).forEach(p => publisherCounts[p] = 0);
    
    // Prestigious institution counting
    const prestigiousCounts: Record<string, { count: number; papers: CitingPaper[] }> = {};
    Object.keys(PRESTIGIOUS_INSTITUTIONS).forEach(i => prestigiousCounts[i] = { count: 0, papers: [] });
    
    papers.forEach(paper => {
      const venueName = paper.venue || 'Unknown';
      const venueLower = venueName.toLowerCase();
      const tier = getVenueTier(venueName);
      
      // Count publishers
      Object.entries(PUBLISHER_PATTERNS).forEach(([publisher, patterns]) => {
        if (patterns.some(p => venueLower.includes(p))) {
          publisherCounts[publisher]++;
        }
      });
      
      // Track venues
      if (!venueMap.has(venueName)) {
        venueMap.set(venueName, {
          name: venueName,
          count: 0,
          tier,
          papers: []
        });
      }
      
      const venue = venueMap.get(venueName)!;
      venue.count++;
      venue.papers.push(paper);
      
      if (venueName !== 'Unknown') {
        knownVenueCount++;
      }
      
      // Track institutions from affiliations
      const affiliation = (paper as any).affiliation;
      if (affiliation && affiliation !== 'Unknown' && !affiliation.startsWith('No_author')) {
        const affiliationLower = affiliation.toLowerCase();
        
        // Check prestigious institutions
        Object.entries(PRESTIGIOUS_INSTITUTIONS).forEach(([instName, patterns]) => {
          if (patterns.some(p => affiliationLower.includes(p))) {
            prestigiousCounts[instName].count++;
            prestigiousCounts[instName].papers.push(paper);
          }
        });
        
        // Clean up affiliation name for general tracking
        const instName = affiliation.split(',')[0].trim();
        if (instName && instName.length > 2) {
          if (!institutionMap.has(instName)) {
            institutionMap.set(instName, {
              name: instName,
              count: 0,
              papers: []
            });
          }
          const inst = institutionMap.get(instName)!;
          inst.count++;
          inst.papers.push(paper);
        }
      }
    });
    
    // Group venues by tier
    const tier1Venues: VenueInfo[] = [];
    const tier2Venues: VenueInfo[] = [];
    const otherVenues: VenueInfo[] = [];
    const preprintVenues: VenueInfo[] = [];
    
    venueMap.forEach(venue => {
      if (venue.name === 'Unknown') return;
      switch (venue.tier) {
        case 'tier1': tier1Venues.push(venue); break;
        case 'tier2': tier2Venues.push(venue); break;
        case 'preprint': preprintVenues.push(venue); break;
        default: otherVenues.push(venue);
      }
    });
    
    // Sort each tier by count
    [tier1Venues, tier2Venues, otherVenues, preprintVenues].forEach(arr => {
      arr.sort((a, b) => b.count - a.count);
    });
    
    // Sort institutions
    const allInstitutions = Array.from(institutionMap.values()).sort((a, b) => b.count - a.count);
    
    // Sort publisher frequency
    const sortedPublishers = Object.entries(publisherCounts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);
    
    // Sort prestigious institutions
    const sortedPrestigious = Object.entries(prestigiousCounts)
      .filter(([_, data]) => data.count > 0)
      .sort((a, b) => b[1].count - a[1].count);
    
    return {
      venueData: {
        tier1: tier1Venues,
        tier2: tier2Venues,
        other: otherVenues,
        preprint: preprintVenues,
        summary: {
          tier1Count: tier1Venues.reduce((sum, v) => sum + v.count, 0),
          tier2Count: tier2Venues.reduce((sum, v) => sum + v.count, 0),
          otherCount: otherVenues.reduce((sum, v) => sum + v.count, 0),
          preprintCount: preprintVenues.reduce((sum, v) => sum + v.count, 0)
        }
      },
      institutionData: {
        all: allInstitutions,
        summary: {
          totalInstitutions: allInstitutions.length
        }
      },
      publisherFrequency: sortedPublishers,
      prestigiousInstitutions: sortedPrestigious,
      hasVenueData: knownVenueCount > papers.length * 0.1
    };
  }, [papers]);

  if (papers.length === 0) {
    return (
      <div className="text-center py-8 bg-cyber-grey rounded-lg border border-cyber-green/20">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  const renderVenueSection = (venues: VenueInfo[], tier: 'tier1' | 'tier2' | 'other' | 'preprint') => {
    if (venues.length === 0) return null;
    
    const sectionKey = `venues-${tier}`;
    const isExpanded = expandedSections[sectionKey] || false;
    const displayVenues = isExpanded ? venues : venues.slice(0, 5);
    const hasMore = venues.length > 5;
    
    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${getTierColor(tier)}`}>
            {getTierIcon(tier)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{getTierLabel(tier)}</h3>
            <p className="text-sm text-gray-400">
              {venues.reduce((sum, v) => sum + v.count, 0)} citations from {venues.length} venue{venues.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayVenues.map((venue, index) => {
            const keywords = getVenueKeywords(venue.name);
            return (
              <div
                key={index}
                className="bg-cyber-dark rounded-lg border border-cyber-green/20 hover:border-cyber-green/40 transition-all p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-white text-sm font-medium line-clamp-2 flex-1">
                    {venue.name === 'Unknown' ? 'Unknown Venue' : venue.name}
                  </span>
                  <Badge className={`shrink-0 ${getTierColor(tier)}`}>
                    {venue.count}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {keywords.map((kw, i) => (
                    <span key={i} className="bg-cyber-green/20 text-cyber-green text-xs font-bold px-2 py-0.5 rounded">
                      {kw}
                    </span>
                  ))}
                  {venue.papers.length > 0 && venue.papers[0].link && (
                    <a
                      href={venue.papers[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyber-green hover:underline inline-flex items-center gap-1"
                    >
                      View paper <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection(sectionKey)}
            className="mt-3 w-full text-cyber-green hover:text-cyber-green hover:bg-cyber-green/10"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show All {venues.length} Venues
              </>
            )}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Publisher Frequency Table */}
      {publisherFrequency.length > 0 && (
        <div className="bg-cyber-grey rounded-lg border border-cyber-green/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-cyber-green" />
            Publisher/Organization Frequency
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {publisherFrequency.map(([publisher, count]) => (
              <div
                key={publisher}
                className="bg-cyber-dark rounded-lg border border-cyber-green/30 p-4 text-center"
              >
                <div className="text-2xl font-bold text-cyber-green">{count}</div>
                <div className="text-sm text-white mt-1">{publisher}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prestigious Institutions */}
      {prestigiousInstitutions.length > 0 && (
        <div className="bg-cyber-grey rounded-lg border border-cyber-green/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-cyber-green" />
            Prestigious Institutions Citing Your Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(showAllInstitutions ? prestigiousInstitutions : prestigiousInstitutions.slice(0, 9)).map(([name, data]) => {
              const isExpanded = expandedSections[`inst-${name}`];
              return (
                <div
                  key={name}
                  className="bg-cyber-dark rounded-lg border border-cyber-green/30 hover:border-cyber-green/60 transition-all p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-white text-sm font-medium flex-1">{name}</span>
                    <Badge className="bg-cyber-green text-cyber-dark shrink-0">
                      {data.count}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {data.count} citation{data.count !== 1 ? 's' : ''}
                    </p>
                    <button
                      onClick={() => toggleSection(`inst-${name}`)}
                      className="text-xs text-cyber-green hover:underline flex items-center gap-1"
                    >
                      {isExpanded ? 'Hide' : 'View'} papers
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-cyber-green/20 space-y-2">
                      {data.papers.slice(0, 5).map((paper, i) => (
                        <div key={i} className="text-xs">
                          <a
                            href={paper.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-cyber-green hover:underline line-clamp-2"
                          >
                            {paper.title}
                          </a>
                        </div>
                      ))}
                      {data.papers.length > 5 && (
                        <p className="text-xs text-gray-500">+{data.papers.length - 5} more</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {prestigiousInstitutions.length > 9 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllInstitutions(!showAllInstitutions)}
              className="mt-4 w-full text-cyber-green hover:text-cyber-green hover:bg-cyber-green/10"
            >
              {showAllInstitutions ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Show All {prestigiousInstitutions.length} Institutions
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Summary Stats */}
      {hasVenueData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-cyber-grey rounded-lg border border-cyber-green/20 p-4 text-center">
            <div className="text-2xl font-bold text-cyber-green">{venueData.summary.tier1Count}</div>
            <div className="text-xs text-gray-400 mt-1">Top-Tier Venues</div>
          </div>
          <div className="bg-cyber-grey rounded-lg border border-yellow-500/20 p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{venueData.summary.tier2Count}</div>
            <div className="text-xs text-gray-400 mt-1">Peer-Reviewed</div>
          </div>
          <div className="bg-cyber-grey rounded-lg border border-gray-500/20 p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">{venueData.summary.otherCount}</div>
            <div className="text-xs text-gray-400 mt-1">Other</div>
          </div>
          <div className="bg-cyber-grey rounded-lg border border-blue-500/20 p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{venueData.summary.preprintCount}</div>
            <div className="text-xs text-gray-400 mt-1">Preprints</div>
          </div>
        </div>
      )}

      {/* Venue Sections */}
      {hasVenueData && (
        <>
          {renderVenueSection(venueData.tier1, 'tier1')}
          {renderVenueSection(venueData.tier2, 'tier2')}
          {renderVenueSection(venueData.other, 'other')}
          {renderVenueSection(venueData.preprint, 'preprint')}
        </>
      )}

      {!hasVenueData && (
        <div className="bg-cyber-grey/50 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-yellow-400">Note:</strong> Venue data is still being processed. 
            Run the SerpAPI fetch script to populate venue information.
          </p>
        </div>
      )}
    </div>
  );
};

export default PeerReviewedVenues;
