import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPostContent } from '@/components/BlogPostContent';
import ViewCounter from '@/components/ViewCounter';
import { BlogPost as BlogPostType } from '@/data/blogPosts';
import { getPostById, getRelatedPosts } from '@/services/blogService';
import { extractKeywords, extractFAQSchema } from '@/services/seoHelpers';

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);
  const [faqData, setFaqData] = useState<{question: string, answer: string}[] | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      
      if (postId) {
        const loadedPost = await getPostById(postId);
        
        if (loadedPost) {
          setPost(loadedPost);
          
          // Extract SEO keywords from content
          if (loadedPost.content) {
            const keywords = extractKeywords(loadedPost.content, loadedPost.tags);
            setExtractedKeywords(keywords);
            
            // Extract FAQ schema if available
            const faqs = extractFAQSchema(loadedPost.content);
            setFaqData(faqs);
          }
          
          // Load related posts based on tags
          const related = await getRelatedPosts(loadedPost.id, loadedPost.tags);
          setRelatedPosts(related);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    };
    
    loadPost();
    
    // Scroll to top when changing posts
    window.scrollTo(0, 0);
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

  // Generate an optimized meta description
  const cleanDescription = post.excerpt || '';
  const postUrl = `https://vineethsai.com/blog/${post.id}`;
  const publicationDate = new Date(post.date).toISOString();
  const modifiedDate = post.lastModified 
    ? new Date(post.lastModified).toISOString() 
    : publicationDate;
  
  // Format the date in a more SEO friendly way
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Combine post tags with extracted keywords for better SEO
  const allKeywords = [...new Set([...post.tags, ...extractedKeywords])];

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      <Helmet>
        <title>{post.title} | Vineeth Sai - Cybersecurity Engineer</title>
        <meta name="description" content={cleanDescription} />
        <meta name="keywords" content={allKeywords.join(', ')} />
        <meta name="author" content={post.author} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        {post.image && <meta property="og:image" content={post.image} />}
        {!post.image && <meta property="og:image" content="https://vineethsai.com/placeholder.svg" />}
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={cleanDescription} />
        {post.image && <meta name="twitter:image" content={post.image} />}
        
        {/* Article specific tags */}
        <meta property="article:published_time" content={publicationDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        <meta property="article:author" content="https://vineethsai.com" />
        {post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        <link rel="canonical" href={postUrl} />
        
        {/* JSON-LD structured data for BlogPost */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image || "https://vineethsai.com/placeholder.svg",
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
                "url": "https://vineethsai.com/favicon.svg"
              }
            },
            "url": postUrl,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": postUrl
            },
            "datePublished": publicationDate,
            "dateModified": modifiedDate,
            "keywords": allKeywords.join(', ')
          })}
        </script>
        
        {/* FAQ Schema if available */}
        {faqData && faqData.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqData.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })}
          </script>
        )}
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
          
          <article className="max-w-4xl mx-auto bg-cyber-grey rounded-lg p-8 border border-cyber-green/20" itemScope itemType="https://schema.org/BlogPosting">
            <meta itemProp="datePublished" content={publicationDate} />
            <meta itemProp="dateModified" content={modifiedDate} />
            <meta itemProp="author" content={post.author} />
            <meta itemProp="publisher" content="Vineeth Sai" />
            
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" itemProp="headline">{post.title}</h1>
              <div className="flex flex-wrap items-center mb-6 text-sm text-gray-400">
                <time dateTime={publicationDate} className="mr-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </time>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {post.author}
                </span>
                <span className="mx-2">•</span>
                <ViewCounter postId={post.id} />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <Link 
                    to={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`} 
                    key={index} 
                    className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm hover:bg-cyber-green/20 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </header>
            
            <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-cyber-green" itemProp="articleBody">
              <BlogPostContent post={post} />
            </div>
            
            {/* Author bio for E-E-A-T signals */}
            <div className="mt-12 pt-8 border-t border-cyber-green/20">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-16 h-16 rounded-full bg-cyber-blue/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-cyber-blue">VS</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">About {post.author}</h3>
                  <p className="text-gray-300">Vineeth Sai is a Cybersecurity Engineer specializing in cloud security, application security, and AI safety protocols. With experience at Amazon Web Services, he helps organizations implement robust security solutions for modern technology stacks.</p>
                </div>
              </div>
            </div>
            
            {/* Related posts section */}
            {relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-cyber-green/20">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link 
                      key={relatedPost.id} 
                      to={`/blog/${relatedPost.id}`}
                      className="block bg-cyber-dark/50 p-5 rounded-lg border border-cyber-green/10 hover:border-cyber-green/30 transition-all"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-white hover:text-cyber-green transition-colors">{relatedPost.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{relatedPost.excerpt.substring(0, 120)}...</p>
                      <div className="text-cyber-green text-sm font-medium hover:underline">Read more →</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
