import { Newspaper, Headphones, Star } from 'lucide-react';
import PageShell from '@/components/content/PageShell';
import { CollapsibleSection, Chip, ExternalButton, formatMonth } from '@/components/content/ContentBlocks';
import VideoButton from '@/components/content/VideoButton';
import { StaggerGroup, StaggerItem, SpotlightCard } from '@/components/motion';
import { press, pressTopics, podcasts, type PressTopic } from '@/content/media';

const byNewest = <T extends { date: string }>(items: T[]) => [...items].sort((a, b) => b.date.localeCompare(a.date));

const Media = () => {
  const featured = byNewest(press.filter((p) => p.featured));
  const topicOrder = Object.keys(pressTopics) as PressTopic[];

  return (
    <PageShell
      metaTitle="Media"
      description="Press coverage and podcast interviews featuring Vineeth Sai Narajala on the Agent Name Service, MCP security, AIVSS, and AI agent security."
      path="/media"
      kicker="In the News"
      title="Media"
      subtitle="Press coverage of my research and standards work, plus podcast and video interviews."
      headerExtra={
        <p className="mt-6 font-mono text-sm text-gray-400">
          <span className="text-cyber-green">{press.length}</span> articles ·{' '}
          <span className="text-cyber-green">{podcasts.length}</span> podcasts and interviews
        </p>
      }
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <CollapsibleSection icon={Star} title="Featured coverage">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((item) => (
              <StaggerItem key={item.url}>
                <SpotlightCard className="cyber-card h-full p-6 bg-cyber-darker flex flex-col">
                  <p className="text-sm text-cyber-green mb-2">
                    {item.outlet} · {formatMonth(item.date)}
                  </p>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.summary}</p>
                  <div className="mt-auto">
                    <ExternalButton href={item.url}>Read</ExternalButton>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </CollapsibleSection>

        <CollapsibleSection icon={Newspaper} title="Press coverage" badge={`${press.length} articles`}>
          <div className="space-y-10">
            {topicOrder.map((topic) => {
              const items = byNewest(press.filter((p) => p.topic === topic));
              if (items.length === 0) return null;
              return (
                <div key={topic}>
                  <h3 className="font-mono text-sm tracking-wider uppercase text-cyber-green/80 mb-4">{pressTopics[topic]}</h3>
                  <ul className="divide-y divide-white/10 border-y border-white/10">
                    {items.map((item) => (
                      <li key={item.url} className="py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-white font-medium">{item.title}</p>
                          <p className="text-sm text-gray-400 mt-0.5">
                            {item.outlet} · {formatMonth(item.date)}
                          </p>
                          <p className="text-sm text-gray-300 mt-1">{item.summary}</p>
                        </div>
                        <ExternalButton href={item.url} variant="ghost">Read</ExternalButton>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CollapsibleSection>

        <CollapsibleSection icon={Headphones} title="Podcasts and interviews" badge={`${podcasts.length} episodes`}>
          <StaggerGroup className="space-y-5">
            {byNewest(podcasts).map((p) => (
              <StaggerItem key={p.url}>
                <article className="cyber-card p-6 bg-cyber-darker">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        <span className="text-cyber-green">{p.show}</span> · {p.host} · {formatMonth(p.date)}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      {p.videoUrl && <VideoButton url={p.videoUrl} title={`${p.show}: ${p.title}`} />}
                      <ExternalButton href={p.url}>Listen</ExternalButton>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{p.summary}</p>
                  {p.takeaways && (
                    <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1 mb-4 marker:text-cyber-green/70">
                      {p.takeaways.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {p.topics.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </CollapsibleSection>
      </div>
    </PageShell>
  );
};

export default Media;
