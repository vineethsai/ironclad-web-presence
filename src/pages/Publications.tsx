import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, FlaskConical, Landmark, Users, Award, Building2, ChevronDown } from 'lucide-react';
import PageShell from '@/components/content/PageShell';
import { CollapsibleSection, Chip, ExternalButton } from '@/components/content/ContentBlocks';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion';
import QuoteCarousel from '@/components/motion/QuoteCarousel';
import { papers, standards, peerReviewVenues, awards, adoption, type Paper } from '@/content/research';
import { citationCountFor } from '@/content/metrics';
import scholar from '@/data/scholarMetrics.json';
import { profile } from '@/content/profile';

const MY_NAME = 'Vineeth Sai Narajala';

const AuthorList: React.FC<{ authors: string[] }> = ({ authors }) => (
  <p className="text-sm text-gray-400">
    {authors.map((a, i) => (
      <React.Fragment key={a}>
        {i > 0 && ', '}
        <span className={a === MY_NAME ? 'text-white font-medium' : undefined}>{a}</span>
      </React.Fragment>
    ))}
  </p>
);

const PaperCard: React.FC<{ paper: Paper }> = ({ paper }) => {
  const [open, setOpen] = useState(false);
  const citations = citationCountFor(paper);
  return (
    <article className="bg-cyber-darker rounded-lg p-6 border border-cyber-green/20">
      <h3 className="text-lg font-semibold text-white leading-snug">{paper.title}</h3>
      <div className="flex flex-wrap items-center gap-2 mt-3 mb-3">
        <Chip>{paper.venue}</Chip>
        {citations > 0 && <Chip tone="muted">{citations} citations</Chip>}
      </div>
      <AuthorList authors={paper.authors} />
      <p className="text-gray-300 text-sm leading-relaxed mt-3">{paper.summary}</p>
      {open && paper.abstract && (
        <p className="text-gray-400 text-sm leading-relaxed mt-3 border-l-2 border-cyber-green/30 pl-3">{paper.abstract}</p>
      )}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        {paper.doi && <ExternalButton href={`https://doi.org/${paper.doi}`}>IEEE</ExternalButton>}
        {paper.arxivId && <ExternalButton href={`https://arxiv.org/abs/${paper.arxivId}`} variant="ghost">arXiv</ExternalButton>}
        {paper.code && <ExternalButton href={paper.code} variant="ghost">Code</ExternalButton>}
        {paper.abstract && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            {open ? 'Hide abstract' : 'Abstract'}
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
};

const byNewest = (a: Paper, b: Paper) => b.date.localeCompare(a.date);

const Publications = () => {
  const published = papers.filter((p) => p.status === 'published').sort(byNewest);
  const preprints = papers.filter((p) => p.status === 'preprint').sort(byNewest);
  const quotes = adoption.filter((a) => a.quote).map((a) => ({ quote: a.quote!, author: a.quotedBy!, org: a.title }));
  const updated = new Date(scholar.lastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const stats = [
    { value: scholar.totalCitations, label: 'citations' },
    { value: scholar.hIndex, label: 'h-index' },
    { value: published.length, label: 'peer-reviewed papers' },
    { value: preprints.length, label: 'preprints' },
  ];

  return (
    <PageShell
      metaTitle="Research"
      description="Peer-reviewed papers, preprints, and standards by Vineeth Sai Narajala on AI agent security: MCP, agent identity (ANS), zero trust for agents, and AI vulnerability scoring."
      path="/publications"
      kicker="Research"
      title="Research and Publications"
      subtitle="Peer-reviewed papers, preprints, and open standards on securing AI agents."
      headerExtra={
        <div className="mt-8">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-cyber-green/20 bg-cyber-dark/60 px-3 py-3">
                <dd className="text-2xl font-bold text-gradient">{s.value}</dd>
                <dt className="text-xs text-gray-400 font-mono uppercase tracking-wider mt-1">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-gray-500">
            Citations and h-index from{' '}
            <a href={profile.links.scholar} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
              Google Scholar
            </a>
            , {updated}. See <Link to="/citations" className="underline hover:text-gray-300">who cites this work</Link>.
          </p>
        </div>
      }
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {quotes.length > 0 && (
          <Reveal className="max-w-4xl mx-auto mb-8">
            <QuoteCarousel quotes={quotes} />
          </Reveal>
        )}

        <CollapsibleSection id="papers" icon={FileText} title="Peer-reviewed papers" badge={`${published.length} papers`}>
          <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {published.map((p) => (
              <StaggerItem key={p.title}>
                <PaperCard paper={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </CollapsibleSection>

        <CollapsibleSection id="preprints" icon={FlaskConical} title="Preprints" badge={`${preprints.length} on arXiv`}>
          <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {preprints.map((p) => (
              <StaggerItem key={p.title}>
                <PaperCard paper={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </CollapsibleSection>

        <CollapsibleSection id="standards" icon={Landmark} title="Standards and guides" badge="IETF · OWASP · CSA">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {standards.map((s) => (
              <li key={s.url} className="cyber-card p-5 bg-cyber-darker flex flex-col">
                <p className="text-sm text-cyber-green mb-1">
                  {s.org} · {s.year} · {s.role}
                </p>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{s.summary}</p>
                <div className="mt-auto">
                  <ExternalButton href={s.url} variant="ghost">
                    View
                  </ExternalButton>
                </div>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection id="adoption" icon={Building2} title="Industry adoption">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {adoption.map((a) => (
              <li key={a.org} className="cyber-card p-5 bg-cyber-darker flex flex-col">
                <p className="text-white font-semibold">{a.org}</p>
                <p className="text-sm text-cyber-green mb-2">{a.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{a.summary}</p>
                <div className="mt-auto">
                  <ExternalButton href={a.url} variant="ghost">Source</ExternalButton>
                </div>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection
          id="peer-review"
          icon={Users}
          title="Peer review"
          badge={`${peerReviewVenues.reduce((n, v) => n + v.count, 0)}+ reviews`}
          defaultOpen={false}
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {peerReviewVenues.map((v) => (
              <li key={v.name} className="flex items-center justify-between gap-4 bg-cyber-darker border border-cyber-green/15 rounded-lg px-4 py-3">
                <span className="text-gray-200 text-sm">{v.name}</span>
                <span className="text-cyber-green font-mono text-sm shrink-0">{v.count}</span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection id="awards" icon={Award} title="Awards" defaultOpen={false}>
          <ul className="space-y-4">
            {awards.map((a) => (
              <li key={a.title} className="cyber-card p-5 bg-cyber-darker">
                <p className="text-white font-semibold">{a.title}</p>
                <p className="text-sm text-cyber-green mb-2">
                  {a.org} · {a.year}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">{a.summary}</p>
                {a.url && (
                  <div className="mt-3">
                    <ExternalButton href={a.url} variant="ghost">Details</ExternalButton>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </div>
    </PageShell>
  );
};

export default Publications;
