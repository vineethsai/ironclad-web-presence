import React, { useState } from 'react';
import { Mic, Video, ChevronDown } from 'lucide-react';
import PageShell from '@/components/content/PageShell';
import { CollapsibleSection, ExternalButton, formatMonth } from '@/components/content/ContentBlocks';
import VideoButton from '@/components/content/VideoButton';
import { StaggerGroup, StaggerItem } from '@/components/motion';
import { talks, type Talk } from '@/content/talks';

const TalkCard: React.FC<{ talk: Talk }> = ({ talk }) => {
  const [showAbstract, setShowAbstract] = useState(false);
  return (
    <article className="h-full bg-cyber-darker rounded-lg p-6 border border-cyber-green/20 flex flex-col">
      <h3 className="text-cyber-green font-semibold text-lg leading-snug">{talk.title}</h3>
      <div className="flex flex-wrap items-center gap-2 mt-3 mb-3">
        <span className="px-2.5 py-0.5 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
          {talk.event}
        </span>
        <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-300 text-sm">
          {formatMonth(talk.date)}
        </span>
        {talk.location && <span className="text-gray-400 text-sm">{talk.location}</span>}
      </div>
      {talk.with && <p className="text-gray-400 text-sm mb-2">With {talk.with.join(', ')}</p>}
      <p className="text-gray-300 text-sm leading-relaxed">{talk.summary}</p>
      {showAbstract && talk.abstract && (
        <p className="text-gray-400 text-sm leading-relaxed mt-3 border-l-2 border-cyber-green/30 pl-3">{talk.abstract}</p>
      )}
      <div className="mt-auto pt-4 flex flex-wrap items-center gap-4">
        {talk.link && <ExternalButton href={talk.link} variant="ghost">Event</ExternalButton>}
        {talk.videoUrl && <VideoButton url={talk.videoUrl} title={`${talk.title} (${talk.event})`} label="Watch recording" />}
        {talk.slidesUrl && <ExternalButton href={talk.slidesUrl} variant="ghost">Slides</ExternalButton>}
        {talk.abstract && (
          <button
            type="button"
            onClick={() => setShowAbstract((v) => !v)}
            aria-expanded={showAbstract}
            className="inline-flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            {showAbstract ? 'Hide abstract' : 'Abstract'}
            <ChevronDown className={`h-4 w-4 transition-transform ${showAbstract ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
};

const Speaking = () => {
  const sorted = [...talks].sort((a, b) => b.date.localeCompare(a.date));
  const withVideo = talks.filter((t) => t.videoUrl);

  return (
    <PageShell
      metaTitle="Speaking"
      description="Conference talks, workshops, and panels by Vineeth Sai Narajala on AI agent security, MCP, agent identity, and threat modeling."
      path="/speaking"
      kicker="Talks"
      title="Speaking"
      subtitle="Conference talks, workshops, and panels on AI agent security, agent identity, and threat modeling."
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <CollapsibleSection icon={Mic} title="Talks" badge={`${talks.length} talks`}>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sorted.map((talk) => (
              <StaggerItem key={`${talk.event}-${talk.title}`}>
                <TalkCard talk={talk} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </CollapsibleSection>

        <CollapsibleSection icon={Video} title="Recordings" badge={`${withVideo.length} videos`}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {withVideo.map((t) => (
              <li key={t.videoUrl} className="cyber-card p-5 bg-cyber-darker">
                <p className="text-white font-medium">{t.title}</p>
                <p className="text-sm text-gray-400 mb-3">
                  {t.event} · {formatMonth(t.date)}
                </p>
                <VideoButton url={t.videoUrl!} title={`${t.title} (${t.event})`} />
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </div>
    </PageShell>
  );
};

export default Speaking;
