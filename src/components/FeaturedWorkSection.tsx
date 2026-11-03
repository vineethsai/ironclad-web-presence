import { Link } from 'react-router-dom';
import { ArrowRight, Star, Fingerprint, Gauge, ShieldCheck, ScanSearch, Wrench, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { StaggerGroup, StaggerItem, SectionHeading, SpotlightCard } from '@/components/motion';
import { featuredWork } from '@/content/featured';
import github from '@/data/github.json';

const icons: Record<string, LucideIcon> = {
  identity: Fingerprint,
  scoring: Gauge,
  defense: ShieldCheck,
  scanner: ScanSearch,
  tools: Wrench,
  threat: Network,
};

const stars = github.repos as Record<string, { stars: number }>;
const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

/** Home page "Selected work": the projects and papers that best show what I do. */
const FeaturedWorkSection = () => (
  <section id="featured" className="py-20 bg-cyber-darker relative overflow-hidden">
    <div className="absolute inset-0 bg-grid" />
    <div className="glow-blob w-md h-112 top-10 -right-40" />

    <div className="container mx-auto px-4 relative z-10">
      <SectionHeading
        kicker="03 · Selected Work"
        title="Standards, Tools, and Research"
        subtitle="A few things I've built or led that are in use today."
      />

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {featuredWork.map((item) => {
          const Icon = icons[item.icon] ?? ShieldCheck;
          const repoStars = item.repo ? stars[item.repo]?.stars : undefined;
          return (
            <StaggerItem key={item.title}>
              <SpotlightCard className="cyber-card h-full p-6 bg-cyber-grey/80 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-cyber-green/10 border border-cyber-green/20">
                    <Icon className="h-5 w-5 text-cyber-green" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs text-cyber-green/80 text-right">
                    {item.kind}
                    {repoStars !== undefined && (
                      <span className="ml-2 inline-flex items-center gap-1 text-gray-300">
                        <Star className="h-3.5 w-3.5" aria-hidden="true" />
                        {formatCount(repoStars)}
                      </span>
                    )}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.description}</p>
                <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {item.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-green hover:text-cyber-green-light underline-offset-4 hover:underline"
                      >
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        <Link to="/publications" className="inline-flex items-center gap-2 text-cyber-green hover:text-cyber-green-light">
          All research <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/open-source" className="inline-flex items-center gap-2 text-cyber-green hover:text-cyber-green-light">
          All open source <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedWorkSection;
