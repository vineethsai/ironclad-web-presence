import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPostContent } from '@/components/BlogPostContent';
import { BlogPost } from '@/data/blogPosts';
import { getAllPosts, getPostById } from '@/services/blogService';

const Blog = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      if (id) {
        // If we have an ID, we're viewing a single post
        const post = await getPostById(id);
        setCurrentPost(post);
      } else {
        // Otherwise, load all posts
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, [id]);

  // If we're loading, show a loading state
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

  // If we have an ID but no post, show a "not found" message
  if (id && !currentPost) {
    return (
      <div className="min-h-screen bg-cyber-dark text-white">
        <Navbar />
        <main className="pt-16 pb-20">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Post not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If we have a post, show it
  if (id && currentPost) {
    return (
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>{currentPost.title} | Vineeth Sai Narajala - Cybersecurity Engineer</title>
          <meta name="description" content={currentPost.excerpt} />
          <meta property="og:title" content={currentPost.title} />
          <meta property="og:description" content={currentPost.excerpt} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://vineethsai.com/blog/${currentPost.id}`} />
          <link rel="canonical" href={`https://vineethsai.com/blog/${currentPost.id}`} />
        </Helmet>
        <Navbar />
        <main className="pt-16 pb-20">
          <div className="container mx-auto px-4">
            <BlogPostContent post={currentPost} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Otherwise, show the blog list
  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      <Helmet>
        <title>Blog | Vineeth Sai Narajala - Cybersecurity Engineer</title>
        <meta name="description" content="Read expert insights on AI security, cloud security, and cybersecurity best practices from Vineeth Sai Narajala, a Cybersecurity Engineer specializing in Generative AI Security." />
        <meta name="keywords" content="Vineeth Sai, Vineeth Sai Narajala, AI Security, Cybersecurity, Generative AI, Cloud Security, AWS Security" />
        <meta property="og:title" content="Cybersecurity Blog | Vineeth Sai" />
        <meta property="og:description" content="Expert insights on AI security and cybersecurity from Vineeth Sai Narajala" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vineethsai.com/blog" />
        <link rel="canonical" href="https://vineethsai.com/blog" />
        
        {/* JSON-LD structured data for Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "headline": "Vineeth Sai's Cybersecurity Blog",
            "description": "Expert insights on AI security, cloud security, and cybersecurity best practices",
            "author": {
              "@type": "Person",
              "name": "Vineeth Sai Narajala",
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
            "url": "https://vineethsai.com/blog",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://vineethsai.com/blog"
            },
            "datePublished": "2025-04-04T12:00:00+00:00",
            "dateModified": "2025-04-04T12:00:00+00:00"
          })}
        </script>
      </Helmet>
      
      <Navbar />
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Cybersecurity Insights</h1>
            <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
            <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
              Expert perspectives on AI security, cloud security, and emerging cybersecurity threats from Vineeth Sai Narajala.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                <Link to={`/blog/${post.id}`} className="block h-full">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-3 hover:text-cyber-green transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center mb-4 text-sm text-gray-400">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
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
                    <div className="text-cyber-green font-medium hover:underline">
                      Read more →
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
