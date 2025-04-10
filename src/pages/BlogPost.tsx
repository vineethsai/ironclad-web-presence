import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPostContent } from '@/components/BlogPostContent';
import { BlogPost as BlogPostType } from '@/data/blogPosts';
import { getPostById } from '@/services/blogService';

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      
      if (postId) {
        const loadedPost = await getPostById(postId);
        console.log('Loaded post from markdown:', loadedPost);
        
        if (loadedPost) {
          setPost(loadedPost);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    };
    
    loadPost();
  }, [postId]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark text-white">
        <Navbar />
        <main className="pt-16 pb-20">
          <div className="container mx-auto px-4">
            <div className="animate-pulse text-center">
              <div className="h-8 bg-cyber-grey/30 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-cyber-grey/30 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect if post not found
  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  // Extract the first paragraph for meta description
  const cleanDescription = post.excerpt || '';

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      <Helmet>
        <title>{post.title} | Vineeth Sai Narajala</title>
        <meta name="description" content={cleanDescription} />
        <meta name="keywords" content={`Vineeth Sai, Vineeth Sai Narajala, ${post.tags.join(', ')}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://vineethsai.com/blog/${post.id}`} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:tag" content={post.tags.join(', ')} />
        <link rel="canonical" href={`https://vineethsai.com/blog/${post.id}`} />
        
        {/* JSON-LD structured data for BlogPost */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Person",
              "name": post.author,
              "url": "https://vineethsai.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Vineeth Sai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vineethsai.com/placeholder.svg"
              }
            },
            "url": `https://vineethsai.com/blog/${post.id}`,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://vineethsai.com/blog/${post.id}`
            },
            "datePublished": new Date(post.date).toISOString(),
            "dateModified": new Date(post.date).toISOString(),
            "keywords": post.tags.join(', ')
          })}
        </script>
      </Helmet>
      
      <Navbar />
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/blog" className="text-cyber-green hover:underline flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>Back to Blog</span>
            </Link>
          </div>
          
          <article className="max-w-4xl mx-auto bg-cyber-grey rounded-lg p-8 border border-cyber-green/20">
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center mb-6 text-sm text-gray-400">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            
            <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-cyber-green">
              <BlogPostContent post={post} />
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
