import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { getCitationData } from '@/services/citationService';
import { isSelfCitation } from '@/utils/citationFilters';
import { PageHeader, CountUp, StaggerGroup, StaggerItem, Reveal } from '@/components/motion';
import { FileText, MapPin, Award, Users, Globe, ArrowRight } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const GREEN = '#33CC66';
const GREEN_LIGHT = '#5CE68A';
const TEAL = '#2DD4BF';
const GREY = '#6B7280';
const YELLOW = '#EAB308';

const tooltipStyle = {
  backgroundColor: '#111111',
  border: '1px solid rgba(51, 204, 102, 0.35)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '13px',
};

const axisStyle = { fill: '#9CA3AF', fontSize: 12 };

const ResearchImpact = () => {
  const citationData = getCitationData();
  const { publications, citingPapers: allCitingPapers, locations, stats, lastUpdated, scholar } = citationData;

  const citingPapers = useMemo(
    () => allCitingPapers.filter((paper) => !isSelfCitation(paper.authors)),
    [allCitingPapers]
  );

  // Top publications by citation count
  const publicationChart = useMemo(
    () =>
      [...publications]
        .sort((a, b) => b.citationCount - a.citationCount)
        .slice(0, 8)
        .map((p) => ({
          name: p.title.length > 42 ? `${p.title.slice(0, 42)}…` : p.title,
          fullTitle: p.title,
          citations: p.citationCount,
        })),
    [publications]
  );

  // Influence distribution donut
  const influenceChart = useMemo(
    () => [
      { name: 'High influence', value: stats.influenceDistribution.high, color: GREEN },
      { name: 'Medium influence', value: stats.influenceDistribution.medium, color: TEAL },
      { name: 'Low influence', value: stats.influenceDistribution.low, color: GREY },
    ],
    [stats]
  );

  // Venue tier distribution
  const tierChart = useMemo(() => {
    const t = stats.tierDistribution as Record<string, number>;
    return [
      { name: 'Tier 1 venues', value: t.tier1 ?? 0, color: GREEN },
      { name: 'Tier 2 venues', value: t.tier2 ?? 0, color: GREEN_LIGHT },
      { name: 'Other venues', value: t.other ?? 0, color: YELLOW },
      { name: 'Preprints', value: t.preprint ?? 0, color: TEAL },
    ];
  }, [stats]);

  // Top countries
  const countryChart = useMemo(
    () => stats.topCountries.slice(0, 8).map((c) => ({ name: c.name, citations: c.count })),
    [stats]
  );

  const kpis = [
    {
      icon: FileText,
      label: 'Google Scholar Citations',
      value: scholar.totalCitations,
      caption: `${citingPapers.length} external papers mapped`,
    },
    {
      icon: MapPin,
      label: 'Global Locations',
      value: stats.uniqueLocations,
      caption: `${stats.topCountries.length} countries reached`,
    },
    {
      icon: Award,
      label: 'Prestigious Sources',
      value: stats.prestigiousCount,
      caption: 'Top venues & institutions',
    },
    {
      icon: Users,
      label: 'Citing Researchers',
      value: stats.uniqueAuthors,
      caption: 'Unique authors worldwide',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>Research Impact | Vineeth Sai Narajala</title>
          <meta
            name="description"
            content={`Research impact analytics for Vineeth Sai Narajala: ${scholar.totalCitations} Google Scholar citations and ${citingPapers.length} mapped external citing papers.`}
          />
          <meta property="og:title" content="Research Impact | Vineeth Sai Narajala" />
          <meta property="og:type" content="website" />
          <link rel="canonical" href="https://vineethsai.com/research-impact" />
        </Helmet>

        <Navbar />
        <main className="pb-20">
          <PageHeader
            kicker="Analytics"
            title="Research Impact"
            subtitle="Citation analytics and the global footprint of my published research"
          >
            <div className="mt-4 space-y-1 text-sm text-gray-500">
              <p>
                <a
                  href={scholar.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cyber-green"
                >
                  Google Scholar metrics
                </a>{' '}
                updated: {new Date(scholar.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                Citation-map records updated: {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <Link
                to="/citations"
                className="inline-flex items-center gap-2 px-5 py-2 bg-cyber-green/10 border border-cyber-green/30 rounded-lg text-cyber-green text-sm hover:bg-cyber-green/20 hover:border-cyber-green/60 hover:shadow-glow-sm transition-all duration-300 group"
              >
                <Globe className="h-4 w-4" />
                <span>Explore the 3D citation globe</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </PageHeader>

          <div className="container mx-auto px-4">
            {/* KPI cards */}
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {kpis.map((kpi) => (
                <StaggerItem key={kpi.label}>
                  <div className="glass-card h-full p-6 transition-all duration-300 hover:border-cyber-green/40 hover:shadow-glow-sm hover:-translate-y-0.5">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <kpi.icon className="h-4 w-4 text-cyber-green" />
                      {kpi.label}
                    </div>
                    <div className="text-4xl font-bold text-cyber-green">
                      <CountUp to={kpi.value} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{kpi.caption}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Citations per publication */}
              <Reveal className="lg:col-span-2">
                <div className="glass-card p-6 overflow-hidden">
                  <h3 className="text-xl font-bold text-white mb-1">Citations per Publication</h3>
                  <p className="text-sm text-gray-400 mb-6">Top 8 most-cited publications</p>
                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={publicationChart} layout="vertical" margin={{ left: 12, right: 24 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                        <XAxis type="number" tick={axisStyle} axisLine={{ stroke: 'rgba(255,255,255,0.12)' }} tickLine={false} />
                        <YAxis
                          type="category"
                          dataKey="name"
                          width={250}
                          tick={{ ...axisStyle, fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={tooltipStyle}
                          cursor={{ fill: 'rgba(51, 204, 102, 0.06)' }}
                          formatter={(value: number, _name, item) => [`${value} citations`, item.payload.fullTitle]}
                        />
                        <Bar dataKey="citations" fill={GREEN} radius={[0, 6, 6, 0]} maxBarSize={22} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Reveal>

              {/* Influence distribution */}
              <Reveal delay={0.05}>
                <div className="glass-card p-6 h-full overflow-hidden">
                  <h3 className="text-xl font-bold text-white mb-1">Citation Influence</h3>
                  <p className="text-sm text-gray-400 mb-4">Influence score of citing papers</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={influenceChart}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={62}
                          outerRadius={95}
                          paddingAngle={3}
                          strokeWidth={0}
                        >
                          {influenceChart.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                        <Legend
                          verticalAlign="bottom"
                          iconType="circle"
                          iconSize={9}
                          formatter={(value: string) => <span style={{ color: '#D1D5DB', fontSize: 12 }}>{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Reveal>

              {/* Venue tiers */}
              <Reveal delay={0.1}>
                <div className="glass-card p-6 h-full overflow-hidden">
                  <h3 className="text-xl font-bold text-white mb-1">Venue Quality Tiers</h3>
                  <p className="text-sm text-gray-400 mb-4">Where citing papers are published</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={tierChart} margin={{ left: -16, right: 8, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ ...axisStyle, fontSize: 11 }}
                          angle={-18}
                          textAnchor="end"
                          interval={0}
                          axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                          tickLine={false}
                        />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(51, 204, 102, 0.06)' }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={52}>
                          {tierChart.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Reveal>

              {/* Top countries */}
              <Reveal className="lg:col-span-2" delay={0.05}>
                <div className="glass-card p-6 overflow-hidden">
                  <h3 className="text-xl font-bold text-white mb-1">Top Countries</h3>
                  <p className="text-sm text-gray-400 mb-6">Citation counts by country of citing institution</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={countryChart} margin={{ left: -16, right: 8, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ ...axisStyle, fontSize: 11 }}
                          angle={-18}
                          textAnchor="end"
                          interval={0}
                          axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                          tickLine={false}
                        />
                        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(51, 204, 102, 0.06)' }} />
                        <Bar dataKey="citations" fill={GREEN} radius={[6, 6, 0, 0]} maxBarSize={48} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-8">
              <p className="text-center text-sm text-gray-500">
                Data sourced from Google Scholar. Self-citations are excluded from external citation counts.
              </p>
            </Reveal>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ResearchImpact;
