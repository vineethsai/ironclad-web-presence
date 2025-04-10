import React from 'react';
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
  // Clean up the markdown content by removing extra indentation
  const cleanContent = post.content.replace(/^\s+/gm, '');
  
  // Debug logs
  console.log('Post received:', post);
  console.log('Content length:', post.content.length);
  console.log('Clean content length:', cleanContent.length);
  console.log('Content starts with:', post.content.substring(0, 100));

  return (
    <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-cyber-green hover:prose-a:text-cyber-green/80 prose-code:text-cyber-green prose-pre:bg-cyber-grey prose-pre:text-gray-300 prose-ul:text-gray-300 prose-ol:text-gray-300">
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
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </article>
  );
}; 