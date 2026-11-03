import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PenLine, Archive, ArrowRight } from 'lucide-react';
import PageShell from '@/components/content/PageShell';
import { CollapsibleSection, Chip, ExternalButton, formatMonth } from '@/components/content/ContentBlocks';
import { StaggerGroup, StaggerItem } from '@/components/motion';
import { articles } from '@/content/writing';
import type { BlogPost } from '@/data/blogPosts';

const Writing = () => {
  const [archive, setArchive] = useState<BlogPost[]>([]);

  useEffect(() => {
    import('@/services/blogService')
      .then((m) => m.getAllPosts())
      .then(setArchive)
      .catch(() => setArchive([]));
  }, []);

  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageShell
      metaTitle="Writing"
      description="Articles by Vineeth Sai Narajala on AI agent security, published on the Cisco blog, the Cloud Security Alliance, and the OWASP GenAI Security Project."
      path="/writing"
      kicker="Writing"
      title="Writing"
      subtitle="Articles on AI agent security for the Cisco blog, the Cloud Security Alliance, and OWASP."
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <CollapsibleSection icon={PenLine} title="Articles" badge={`${articles.length} articles`}>
          <StaggerGroup className="space-y-5">
            {sorted.map((a) => (
              <StaggerItem key={a.url}>
                <article className="cyber-card p-6 bg-cyber-darker">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold text-white">{a.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        <span className="text-cyber-green">{a.publication}</span> · {formatMonth(a.date)}
                        {a.coAuthors.length > 0 && <> · with {a.coAuthors.join(', ')}</>}
                      </p>
                    </div>
                    <ExternalButton href={a.url}>Read</ExternalButton>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{a.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {a.topics.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </CollapsibleSection>

        {archive.length > 0 && (
          <CollapsibleSection
            icon={Archive}
            title="Archive"
            badge="2025 blog posts"
            intro="Earlier posts from this site's blog, kept for reference."
            defaultOpen={false}
          >
            <ul className="divide-y divide-white/10">
              {archive.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/blog/${post.id}`}
                    className="flex items-center justify-between gap-4 py-4 group"
                  >
                    <span>
                      <span className="block text-white group-hover:text-cyber-green transition-colors">{post.title}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-cyber-green shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}
      </div>
    </PageShell>
  );
};

export default Writing;
