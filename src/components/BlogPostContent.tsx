import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../data/blogPosts';

interface BlogPostContentProps {
  post: BlogPost;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  
  // Clean up the markdown content by removing extra indentation
  const cleanContent = post.content.replace(/^\s+/gm, '');
  
  // Debug logs
  console.log('Post received:', post);
  console.log('Content length:', post.content.length);
  console.log('Clean content length:', cleanContent.length);
  console.log('Content starts with:', post.content.substring(0, 100));

  useEffect(() => {
    // Initialize Mermaid diagrams after the component is mounted
    const initMermaid = async () => {
      try {
        if (mermaidRef.current) {
          const mermaid = await import('mermaid');
          mermaid.default.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            themeVariables: {
              primaryColor: '#00ff00',
              primaryTextColor: '#fff',
              primaryBorderColor: '#00ff00',
              lineColor: '#00ff00',
              secondaryColor: '#006100',
              tertiaryColor: '#fff',
            },
          });
          
          // Find all Mermaid diagram containers and render them
          const diagrams = mermaidRef.current.querySelectorAll('.mermaid-diagram');
          console.log('Found Mermaid diagrams:', diagrams.length);
          diagrams.forEach(async (diagram, index) => {
            try {
              const diagramText = diagram.textContent || '';
              if (diagramText.trim()) {
                const id = `mermaid-${index}`;
                const { svg } = await mermaid.default.render(id, diagramText);
                diagram.innerHTML = svg;
              }
            } catch (err) {
              console.error('Error rendering Mermaid diagram:', err);
              diagram.innerHTML = '<div class="text-red-500">Error rendering diagram</div>';
            }
          });
        }
      } catch (err) {
        console.error('Error initializing Mermaid:', err);
      }
    };
    
    initMermaid();
  }, [post.content]);

  return (
    <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-cyber-green hover:prose-a:text-cyber-green/80 prose-code:text-cyber-green prose-pre:bg-cyber-grey prose-pre:text-gray-300 prose-ul:text-gray-300 prose-ol:text-gray-300">
      <div ref={mermaidRef}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            code: ({ className, children, ...props }: CodeProps) => {
              if (className === 'language-mermaid') {
                console.log('Rendering Mermaid diagram:', String(children).substring(0, 50));
                return (
                  <div className="mermaid-diagram bg-cyber-grey p-4 rounded-lg my-4">
                    {String(children).replace(/\n$/, '')}
                  </div>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {cleanContent}
        </ReactMarkdown>
      </div>
    </article>
  );
}; 