import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import CitationMap from '@/components/CitationMap';
import CitingPapersList from '@/components/CitingPapersList';
import PeerReviewedVenues from '@/components/PeerReviewedVenues';
import { getCitationData } from '@/services/citationService';
import { Globe, FileText, MapPin, TrendingUp, Info, Award, Users, AlertCircle } from 'lucide-react';
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
