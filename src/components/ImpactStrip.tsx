import React from 'react';
import { BookOpen, Mic, Globe, TrendingUp } from 'lucide-react';
import { CountUp, StaggerGroup, StaggerItem } from '@/components/motion';
import { siteStats } from '@/content/metrics';

/** "Impact at a glance" animated counter band for the home page. Every number comes from the data files. */
const ImpactStrip: React.FC = () => {
  const stats = [
    { icon: Globe, value: siteStats.citations, suffix: '', label: 'Google Scholar Citations' },
    { icon: TrendingUp, value: siteStats.hIndex, suffix: '', label: 'h-index' },
    { icon: BookOpen, value: siteStats.peerReviewed, suffix: '', label: 'Peer-Reviewed Papers' },
    { icon: Mic, value: siteStats.talks, suffix: '', label: 'Talks' },
  ];

  return (
    <section className="relative py-14 bg-cyber-darker border-y border-cyber-green/10 overflow-hidden">
      <div className="glow-blob w-[24rem] h-96 -top-32 left-1/2 -translate-x-1/2" />
      <div className="container mx-auto px-4 relative z-10">
        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center group">
                <div className="inline-flex p-3 rounded-xl bg-cyber-green/10 border border-cyber-green/20 mb-3 transition-all duration-300 group-hover:shadow-glow-sm group-hover:scale-105">
                  <stat.icon className="h-5 w-5 text-cyber-green" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white">
                  <CountUp to={stat.value} suffix={stat.suffix} className="text-gradient cyber-glow-soft" />
                </div>
                <div className="mt-2 text-sm text-gray-400 font-mono tracking-wider uppercase">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};

export default ImpactStrip;
