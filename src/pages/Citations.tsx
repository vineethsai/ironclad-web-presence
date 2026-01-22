import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import CitationMap from '@/components/CitationMap';
import CitingPapersList from '@/components/CitingPapersList';
import PeerReviewedVenues from '@/components/PeerReviewedVenues';
import { getCitationData } from '@/services/citationService';
import { Globe, FileText, MapPin, TrendingUp, Info, Award, Users, AlertCircle, Network, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Self-citation patterns to filter out
const SELF_NAME_PATTERNS = [
  'vineeth sai',
  'vs narajala',
  'vineeth sai narajala',
  'v. s. narajala',
  'narajala, v',
  'narajala, vineeth',
  'v s narajala',
  'vineeth narajala'
];

const isSelfCitation = (authors: string[]): boolean => {
  return authors.some(author => {
    const authorLower = author.toLowerCase();
    return SELF_NAME_PATTERNS.some(pattern => authorLower.includes(pattern));
  });
};

const Citations = () => {
  const citationData = getCitationData();
  const { publications, citingPapers: allCitingPapers, locations, stats, lastUpdated } = citationData;
  const [activeTab, setActiveTab] = useState('map');

  // Filter out self-citations
  const citingPapers = useMemo(() => {
    return allCitingPapers.filter(paper => !isSelfCitation(paper.authors));
  }, [allCitingPapers]);

  // Recalculate stats without self-citations
  const filteredStats = useMemo(() => {
    const selfCitationCount = allCitingPapers.length - citingPapers.length;
    
    return {
      totalCitations: citingPapers.length,
      selfCitationsFiltered: selfCitationCount,
      uniqueLocations: stats.uniqueLocations,
      topVenues: stats.topVenues,
      influenceDistribution: {
        high: citingPapers.filter(p => p.influenceScore >= 70).length,
        medium: citingPapers.filter(p => p.influenceScore >= 40 && p.influenceScore < 70).length,
        low: citingPapers.filter(p => p.influenceScore < 40).length
      }
    };
  }, [citingPapers, allCitingPapers, stats]);

  // Geographic breakdown by country
  const countryStats = useMemo(() => {
    const countryMap = new Map<string, { count: number; cities: Set<string>; affiliations: Set<string> }>();
    
    locations.forEach(loc => {
      const country = loc.country || 'Unknown';
      if (!countryMap.has(country)) {
        countryMap.set(country, { count: 0, cities: new Set(), affiliations: new Set() });
      }
      const entry = countryMap.get(country)!;
      entry.count += loc.count;
      if (loc.city) entry.cities.add(loc.city);
      loc.affiliations?.forEach(aff => entry.affiliations.add(aff));
    });
    
    return Array.from(countryMap.entries())
      .map(([country, data]) => ({
        country,
        count: data.count,
        cities: Array.from(data.cities),
        affiliations: Array.from(data.affiliations)
      }))
      .sort((a, b) => b.count - a.count);
  }, [locations]);

  // Papers citing multiple of your works (citation network)
  const multiCitingPapers = useMemo(() => {
    const paperCitations = new Map<string, { paper: typeof citingPapers[0]; citedWorks: string[] }>();
    
    citingPapers.forEach(paper => {
      const title = paper.title;
      if (!paperCitations.has(title)) {
        paperCitations.set(title, { paper, citedWorks: [] });
      }
      paperCitations.get(title)!.citedWorks.push(paper.citedPublication);
    });
    
    return Array.from(paperCitations.values())
      .filter(item => item.citedWorks.length > 1)
      .sort((a, b) => b.citedWorks.length - a.citedWorks.length);
  }, [citingPapers]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>Citations | Vineeth Sai Narajala - Cybersecurity Engineer</title>
          <meta 
            name="description" 
            content={`Research citations and impact visualization for Vineeth Sai Narajala. ${filteredStats.totalCitations} external citations from ${filteredStats.uniqueLocations} locations worldwide.`} 
          />
          <meta property="og:title" content="Citations | Vineeth Sai Narajala" />
          <meta property="og:description" content={`${filteredStats.totalCitations} external citations from ${filteredStats.uniqueLocations} locations worldwide`} />
          <meta property="og:type" content="website" />
          <link rel="canonical" href="https://vineethsai.com/citations" />
        </Helmet>
        
        <Navbar />
        <main className="pt-16 pb-20">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Research Citations
              </h1>
              <div className="w-20 h-1 bg-cyber-green mx-auto mb-6"></div>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-4">
                Explore the global impact of my research through citations from researchers around the world
              </p>
              <p className="text-sm text-gray-400">
                Last updated: {formatDate(lastUpdated)}
              </p>
            </div>

            {/* Self-citation notice */}
            {filteredStats.selfCitationsFiltered > 0 && (
              <div className="mb-8 bg-cyber-grey/50 border border-cyber-green/20 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-cyber-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">Self-citations filtered:</strong> {filteredStats.selfCitationsFiltered} self-citation{filteredStats.selfCitationsFiltered !== 1 ? 's' : ''} have been excluded from this analysis to show only external citations from other researchers.
                  </p>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-cyber-grey border-cyber-green/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    External Citations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyber-green">
                    {filteredStats.totalCitations}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    From {publications.length} publication{publications.length !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-cyber-grey border-cyber-green/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Locations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyber-green">
                    {filteredStats.uniqueLocations}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Worldwide institutions
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-cyber-grey border-cyber-green/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    High Influence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyber-green">
                    {filteredStats.influenceDistribution.high}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    From top-tier venues
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-cyber-grey border-cyber-green/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Citing Authors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyber-green">
                    {citingPapers.reduce((acc, p) => acc + p.authors.length, 0)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Unique researchers
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different views */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-cyber-grey border border-cyber-green/20">
                <TabsTrigger 
                  value="map" 
                  className="data-[state=active]:bg-cyber-green data-[state=active]:text-cyber-dark"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  World Map
                </TabsTrigger>
                <TabsTrigger 
                  value="venues" 
                  className="data-[state=active]:bg-cyber-green data-[state=active]:text-cyber-dark"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Peer-Reviewed Venues
                </TabsTrigger>
                <TabsTrigger 
                  value="papers" 
                  className="data-[state=active]:bg-cyber-green data-[state=active]:text-cyber-dark"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  All Papers
                </TabsTrigger>
                <TabsTrigger 
                  value="geography" 
                  className="data-[state=active]:bg-cyber-green data-[state=active]:text-cyber-dark"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  By Country
                </TabsTrigger>
                {multiCitingPapers.length > 0 && (
                  <TabsTrigger 
                    value="network" 
                    className="data-[state=active]:bg-cyber-green data-[state=active]:text-cyber-dark"
                  >
                    <Network className="h-4 w-4 mr-2" />
                    Multi-Citations
                  </TabsTrigger>
                )}
              </TabsList>

              {/* World Map Tab */}
              <TabsContent value="map" className="space-y-6">
                <div className="bg-cyber-grey/50 border border-cyber-green/20 rounded-lg p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-cyber-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-300">
                      This map shows the geographic distribution of researchers who have cited my work. Each marker represents an institution or research group, sized by the number of citations from that location.
                    </p>
                  </div>
                </div>
                <CitationMap locations={locations} />
              </TabsContent>

              {/* Peer-Reviewed Venues Tab */}
              <TabsContent value="venues" className="space-y-6">
                <div className="bg-cyber-grey/50 border border-cyber-green/20 rounded-lg p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-cyber-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-300">
                      <strong className="text-white">Venue Categories:</strong> Papers are categorized by publication venue quality. 
                      <span className="text-cyber-green"> Top-Tier</span> includes IEEE, ACM, USENIX, and major security conferences. 
                      <span className="text-yellow-400"> Peer-Reviewed</span> includes established journals and conferences. 
                      <span className="text-blue-400"> Preprints</span> are non-peer-reviewed working papers.
                    </p>
                  </div>
                </div>
                <PeerReviewedVenues papers={citingPapers} />
              </TabsContent>

              {/* All Papers Tab */}
              <TabsContent value="papers" className="space-y-6">
                <div className="bg-cyber-grey/50 border border-cyber-green/20 rounded-lg p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-cyber-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-300">
                      <strong className="text-white">Venue Score (0-50):</strong> Based on publication venue quality: 
                      <span className="text-cyber-green"> Top-Tier (50)</span> - IEEE, ACM, USENIX conferences and journals.
                      <span className="text-yellow-400"> Peer-Reviewed (35)</span> - Springer, Elsevier, and other journals.
                      <span className="text-gray-400"> Other (20)</span> - Unknown or pending venue data.
                      <span className="text-blue-400"> Preprints (10)</span> - arXiv, SSRN.
                    </p>
                  </div>
                </div>
                <CitingPapersList papers={citingPapers} />
              </TabsContent>

              {/* Geographic Breakdown Tab */}
              <TabsContent value="geography" className="space-y-6">
                <div className="bg-cyber-grey/50 border border-cyber-green/20 rounded-lg p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-cyber-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-300">
                      Geographic distribution of citations by country, showing the global reach of your research impact.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {countryStats.map((country, index) => (
                    <div
                      key={country.country}
                      className={`bg-cyber-grey rounded-lg border p-4 transition-all hover:border-cyber-green/50 ${
                        index === 0 ? 'border-cyber-green/50 md:col-span-2 lg:col-span-1' : 'border-cyber-green/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-cyber-green" />
                          <h3 className="text-lg font-semibold text-white">{country.country}</h3>
                        </div>
                        <span className={`text-2xl font-bold ${index === 0 ? 'text-cyber-green' : 'text-white'}`}>
                          {country.count}
                        </span>
                      </div>
                      
                      {country.cities.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1">Cities:</p>
                          <p className="text-sm text-gray-300">
                            {country.cities.slice(0, 3).join(', ')}
                            {country.cities.length > 3 && ` +${country.cities.length - 3} more`}
                          </p>
                        </div>
                      )}
                      
                      {country.affiliations.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Institutions:</p>
                          <div className="flex flex-wrap gap-1">
                            {country.affiliations.slice(0, 2).map((aff, i) => (
                              <span key={i} className="text-xs bg-cyber-green/10 text-cyber-green px-2 py-0.5 rounded">
                                {aff.length > 25 ? aff.substring(0, 25) + '...' : aff}
                              </span>
                            ))}
                            {country.affiliations.length > 2 && (
                              <span className="text-xs text-gray-500">+{country.affiliations.length - 2} more</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Country summary bar */}
                <div className="bg-cyber-grey rounded-lg border border-cyber-green/20 p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Citation Distribution</h4>
                  <div className="flex h-6 rounded overflow-hidden">
                    {countryStats.slice(0, 5).map((country, index) => {
                      const total = countryStats.reduce((sum, c) => sum + c.count, 0);
                      const width = (country.count / total) * 100;
                      const colors = ['bg-cyber-green', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
                      return (
                        <div
                          key={country.country}
                          className={`${colors[index]} flex items-center justify-center text-xs font-medium`}
                          style={{ width: `${width}%` }}
                          title={`${country.country}: ${country.count} citations (${width.toFixed(1)}%)`}
                        >
                          {width > 10 && <span className="text-cyber-dark truncate px-1">{country.country}</span>}
                        </div>
                      );
                    })}
                    {countryStats.length > 5 && (
                      <div
                        className="bg-gray-600 flex items-center justify-center text-xs"
                        style={{ width: `${(countryStats.slice(5).reduce((sum, c) => sum + c.count, 0) / countryStats.reduce((sum, c) => sum + c.count, 0)) * 100}%` }}
                      >
                        <span className="text-white">Others</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs">
                    {countryStats.slice(0, 5).map((country, index) => {
                      const colors = ['text-cyber-green', 'text-yellow-500', 'text-blue-500', 'text-purple-500', 'text-pink-500'];
                      return (
                        <span key={country.country} className={colors[index]}>
                          ● {country.country}: {country.count}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Citation Network Tab */}
              {multiCitingPapers.length > 0 && (
                <TabsContent value="network" className="space-y-6">
                  <div className="bg-cyber-grey/50 border border-cyber-green/20 rounded-lg p-4 flex items-start gap-3">
                    <Info className="h-5 w-5 text-cyber-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-300">
                        <strong className="text-white">Multi-Citations:</strong> These papers cite{' '}
                        <span className="text-cyber-green">multiple</span> of your publications, 
                        indicating deeper engagement with your research.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {multiCitingPapers.map((item, index) => (
                      <div
                        key={index}
                        className="bg-cyber-grey rounded-lg border border-cyber-green/30 hover:border-cyber-green/60 transition-all p-5"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-lg font-semibold text-white flex-1">
                            {item.paper.link ? (
                              <a href={item.paper.link} target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green hover:underline">
                                {item.paper.title}
                              </a>
                            ) : (
                              item.paper.title
                            )}
                          </h3>
                          <span className="bg-cyber-green text-cyber-dark px-3 py-1 rounded-full text-sm font-bold shrink-0">
                            Cites {item.citedWorks.length} papers
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                          <Users className="h-4 w-4" />
                          <span>{item.paper.authors.slice(0, 3).join(', ')}{item.paper.authors.length > 3 ? ' et al.' : ''}</span>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Cites your publications:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.citedWorks.map((work, i) => (
                              <span key={i} className="text-xs bg-cyber-green/10 border border-cyber-green/30 text-cyber-green px-2 py-1 rounded">
                                {work.length > 50 ? work.substring(0, 50) + '...' : work}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Summary */}
                  <div className="bg-cyber-grey rounded-lg border border-cyber-green/20 p-4 text-center">
                    <p className="text-gray-400">
                      <span className="text-cyber-green font-bold text-2xl">{multiCitingPapers.length}</span>
                      <span className="ml-2">papers cite multiple of your works, showing deep research engagement</span>
                    </p>
                  </div>
                </TabsContent>
              )}
            </Tabs>

            {/* Venue Distribution */}
            <div className="mt-12 bg-cyber-grey rounded-lg border border-cyber-green/20 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Venue Quality Distribution</h3>
              <p className="text-sm text-gray-400 mb-6">
                Distribution of citations by publication venue quality
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-cyber-dark rounded-lg border border-cyber-green/30">
                  <div className="text-3xl font-bold text-cyber-green mb-2">
                    {citingPapers.filter(p => {
                      const v = p.venue?.toLowerCase() || '';
                      return ['ieee', 'acm', 'usenix', 'ndss', 'ccs', 's&p'].some(t => v.includes(t));
                    }).length}
                  </div>
                  <div className="text-sm text-gray-400">Top-Tier</div>
                  <div className="text-xs text-cyber-green mt-2">IEEE, ACM, USENIX</div>
                </div>
                <div className="text-center p-4 bg-cyber-dark rounded-lg border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {citingPapers.filter(p => {
                      const v = p.venue?.toLowerCase() || '';
                      const isTopTier = ['ieee', 'acm', 'usenix', 'ndss', 'ccs', 's&p'].some(t => v.includes(t));
                      const isPeerReviewed = ['springer', 'elsevier', 'journal', 'conference', 'symposium', 'transactions'].some(t => v.includes(t));
                      return !isTopTier && isPeerReviewed;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-400">Peer-Reviewed</div>
                  <div className="text-xs text-yellow-400 mt-2">Journals & Conferences</div>
                </div>
                <div className="text-center p-4 bg-cyber-dark rounded-lg border border-blue-500/30">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {citingPapers.filter(p => {
                      const v = p.venue?.toLowerCase() || '';
                      return ['arxiv', 'preprint', 'ssrn'].some(t => v.includes(t));
                    }).length}
                  </div>
                  <div className="text-sm text-gray-400">Preprints</div>
                  <div className="text-xs text-blue-400 mt-2">arXiv, SSRN</div>
                </div>
                <div className="text-center p-4 bg-cyber-dark rounded-lg border border-gray-500/30">
                  <div className="text-3xl font-bold text-gray-400 mb-2">
                    {citingPapers.filter(p => {
                      const v = p.venue?.toLowerCase() || '';
                      const isTopTier = ['ieee', 'acm', 'usenix', 'ndss', 'ccs', 's&p'].some(t => v.includes(t));
                      const isPeerReviewed = ['springer', 'elsevier', 'journal', 'conference', 'symposium', 'transactions'].some(t => v.includes(t));
                      const isPreprint = ['arxiv', 'preprint', 'ssrn'].some(t => v.includes(t));
                      return !isTopTier && !isPeerReviewed && !isPreprint;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-400">Other/Unknown</div>
                  <div className="text-xs text-gray-400 mt-2">Pending venue data</div>
                </div>
              </div>
            </div>

            {/* Data Source Notice */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                Data sourced from Google Scholar using{' '}
                <a 
                  href="https://github.com/ChenLiu-1996/CitationMap" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyber-green hover:underline"
                >
                  CitationMap
                </a>
                . Geographic data from OpenStreetMap Nominatim.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Citations;
