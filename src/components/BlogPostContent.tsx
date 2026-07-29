import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../data/blogPosts';
import OptimizedImage from './OptimizedImage';
import { Clock, ListTree } from 'lucide-react';

interface BlogPostContentProps {
  post: BlogPost;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

interface Heading {
  level: number;
  text: string;
  id: string;
}

function extractHeadingsFromMarkdown(markdown: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const seen = new Map<string, number>();

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[2].trim();
    let id = slugify(text);
    const count = seen.get(id) || 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    headings.push({ level: match[1].length, text, id });
  }

  return headings;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  // Clean up the markdown content by removing extra indentation
  const cleanContent = post.content.replace(/^\s+/gm, '');

  const headings = useMemo(() => extractHeadingsFromMarkdown(cleanContent), [cleanContent]);
  const [activeHeading, setActiveHeading] = useState<string>('');

  const readingMinutes = Math.max(1, Math.round(cleanContent.split(/\s+/).length / 200));

  // Scrollspy: track which heading is currently in view
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Heading renderer with anchor ids (keeps TOC links in sync)
  const headingRenderer = (level: 2 | 3) => {
    const Tag = `h${level}` as 'h2' | 'h3';
    const className = level === 2 ? 'text-2xl font-bold mt-8 mb-4 scroll-mt-24' : 'text-xl font-bold mt-6 mb-3 scroll-mt-24';
    return ({ children }: { children?: React.ReactNode }) => {
      const text = String(children);
      return <Tag id={slugify(text)} className={className}>{children}</Tag>;
    };
  };

  return (
    <div className="flex gap-10 items-start">
      {/* TOC sidebar */}
      {headings.length > 1 && (
        <aside className="hidden xl:block w-64 shrink-0 sticky top-28">
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-cyber-green/80 mb-4">
              <ListTree className="h-4 w-4" />
              On this page
            </div>
            <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
              {headings.map((h) => (
                <button
                  key={h.id}
                  onClick={() => scrollToHeading(h.id)}
                  className={`block w-full text-left text-sm rounded px-2 py-1.5 transition-colors ${
                    h.level === 3 ? 'pl-6' : ''
                  } ${
                    activeHeading === h.id
                      ? 'text-cyber-green bg-cyber-green/10 border-l-2 border-cyber-green'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border-l-2 border-transparent'
                  }`}
                >
                  {h.text}
                </button>
              ))}
            </nav>
          </div>
        </aside>
      )}

      <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-cyber-green hover:prose-a:text-cyber-green/80 prose-code:text-cyber-green prose-pre:bg-cyber-grey prose-pre:text-gray-300 prose-ul:text-gray-300 prose-ol:text-gray-300 min-w-0">
        {/* Reading time */}
        <div className="not-prose flex items-center gap-2 text-sm text-gray-400 mb-6 font-mono">
          <Clock className="h-4 w-4 text-cyber-green" />
          {readingMinutes} min read
        </div>

        {/* Structured data for article outline (Table of Contents) */}
        {headings.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "datePublished": new Date(post.date).toISOString(),
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://vineethsai.com/blog/${post.id}`
              },
              "articleSection": headings.map(h => h.text)
            })}
          </script>
        )}

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: ({ className, children, ...props }: CodeProps) => {
              // If it was a mermaid diagram, just show it as a code block now
              if (className === 'language-mermaid') {
                return (
                  <div className="bg-cyber-grey p-4 rounded-lg my-4 border border-cyber-green/20">
                    <p className="text-cyber-green mb-2">Diagram code (rendered diagram disabled):</p>
                    <pre className="overflow-auto">
                      <code className="text-gray-300">
                        {String(children).replace(/\n$/, '')}
                      </code>
                    </pre>
                  </div>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            img: ({ src, alt, title, ...props }: ImageProps) => {
              if (!src) return null;

              return (
                <OptimizedImage
                  src={src}
                  alt={alt || title || ''}
                  className="my-6"
                  loadingPriority="lazy"
                />
              );
            },
            // Add semantic structure to headings
            h1: ({ children }) => <h1 className="text-3xl font-bold mt-10 mb-6">{children}</h1>,
            h2: headingRenderer(2),
            h3: headingRenderer(3),
            // Enhance link handling for SEO
            a: ({ href, children }) => {
              const isExternal = href?.startsWith('http');
              return (
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-cyber-green hover:text-cyber-green/80 underline"
                >
                  {children}
                </a>
              );
            }
          }}
        >
          {cleanContent}
        </ReactMarkdown>
      </article>
    </div>
  );
};
