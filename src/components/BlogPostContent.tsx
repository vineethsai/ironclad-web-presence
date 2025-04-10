import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../data/blogPosts';
import OptimizedImage from './OptimizedImage';

interface BlogPostContentProps {
  post: BlogPost;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  // Clean up the markdown content by removing extra indentation
  const cleanContent = post.content.replace(/^\s+/gm, '');
  
  // Debug logs
  console.log('Post received:', post);
  console.log('Content length:', post.content.length);
  console.log('Clean content length:', cleanContent.length);
  console.log('Content starts with:', post.content.substring(0, 100));

  // Extract headings from content for structured data
  const headings = extractHeadingsFromMarkdown(cleanContent);
  
  return (
    <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-cyber-green hover:prose-a:text-cyber-green/80 prose-code:text-cyber-green prose-pre:bg-cyber-grey prose-pre:text-gray-300 prose-ul:text-gray-300 prose-ol:text-gray-300">
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
          h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
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
  );
};

/**
 * Extract headings from markdown content for structured data
 */
function extractHeadingsFromMarkdown(markdown: string): Array<{level: number, text: string}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{level: number, text: string}> = [];
  
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({ level, text });
  }
  
  return headings;
} 