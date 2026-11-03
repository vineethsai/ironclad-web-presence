import { Star, GitFork, Globe, Newspaper } from 'lucide-react';
import { Github } from '@/components/icons/BrandIcons';
import PageShell from '@/components/content/PageShell';
import { Chip } from '@/components/content/ContentBlocks';
import { StaggerGroup, StaggerItem, SpotlightCard } from '@/components/motion';
import { openSourceProjects } from '@/content/openSource';
import github from '@/data/github.json';
import { projects } from '@/content/experience';

const stats = github.repos as Record<string, { stars: number; forks: number }>;
const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const OpenSource = () => {
  const totalStars = openSourceProjects.reduce((sum, p) => sum + (stats[p.repo]?.stars ?? 0), 0);
  const fetched = new Date(github.fetchedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <PageShell
      metaTitle="Open Source"
      description="Open-source AI security tools by Vineeth Sai Narajala, including Cisco DefenseClaw, Skill Scanner, A2A Scanner, and the Vulnerable MCP project."
      path="/open-source"
      kicker="Open Source"
      title="Open Source"
      subtitle="Tools I build and maintain for securing AI agents, at Cisco and on my own."
      headerExtra={
        <p className="mt-6 font-mono text-sm text-gray-400">
          <span className="text-cyber-green">{formatCount(totalStars)}</span> GitHub stars across these projects · updated {fetched}
        </p>
      }
    >
      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {openSourceProjects.map((project) => {
          const s = stats[project.repo];
          return (
            <StaggerItem key={project.repo}>
              <SpotlightCard className="cyber-card h-full p-6 bg-cyber-grey/80 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-white">
                      <a
                        href={`https://github.com/${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyber-green transition-colors"
                      >
                        {project.name}
                      </a>
                    </h2>
                    <p className="text-cyber-green text-sm">
                      {project.org} · {project.role}
                    </p>
                  </div>
                  {s && (
                    <div className="flex items-center gap-3 text-gray-400 text-sm shrink-0" aria-label={`${s.stars} stars, ${s.forks} forks`}>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" aria-hidden="true" />
                        {formatCount(s.stars)}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" aria-hidden="true" />
                        {formatCount(s.forks)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-4 text-sm">
                  <a
                    href={`https://github.com/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyber-green hover:text-cyber-green-light"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" /> {project.repo}
                  </a>
                  {project.website && (
                    <a href={project.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white">
                      <Globe className="h-4 w-4" aria-hidden="true" /> Website
                    </a>
                  )}
                  {project.blog && (
                    <a href={project.blog} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white">
                      <Newspaper className="h-4 w-4" aria-hidden="true" /> Announcement
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">Sites and specs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-card p-6 bg-cyber-grey/80 block hover:border-cyber-green/50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.technologies.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export default OpenSource;
