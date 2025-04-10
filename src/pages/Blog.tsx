import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPostContent } from '@/components/BlogPostContent';
import ViewCounter from '@/components/ViewCounter';
import { BlogPost } from '@/data/blogPosts';
import { getAllPosts, getPostById, getPostsByTag } from '@/services/blogService';
import PageTransition from '@/components/PageTransition';

const Blog = () => {
  const { id, tag } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      if (id) {
        // If we have an ID, we're viewing a single post
        const post = await getPostById(id);
        setCurrentPost(post);
      } else {
        // Otherwise, load all posts or filter by tag
        let loadedPosts;
        if (tag) {
          loadedPosts = await getPostsByTag(tag);
        } else {
          loadedPosts = await getAllPosts();
        }
        
        setPosts(loadedPosts);
        setFilteredPosts(loadedPosts);
        
        // Extract all unique tags
        const tagsSet = new Set<string>();
        loadedPosts.forEach(post => {
          post.tags.forEach(tag => tagsSet.add(tag));
        });
        setAllTags(Array.from(tagsSet).sort());
      }
      
      setLoading(false);
    };
    
    loadData();
    
    // Clear search when changing views
    setSearchQuery('');
  }, [id, tag]);

  // Filter posts based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  // If we're loading, show a loading state
  if (loading) {
    return (
      <PageTransition>
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
      </PageTransition>
    );
  }

  // If we have an ID but no post, show a "not found" message
  if (id && !currentPost) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-cyber-dark text-white">
          <Navbar />
          <main className="pt-16 pb-20">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold">Post not found</h1>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  // If we have a post, show it
  if (id && currentPost) {
    return (
      <PageTransition>
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
      </PageTransition>
    );
  }

  // Set up page title and description based on tag filter
  let pageTitle = "Blog | Vineeth Sai - Cybersecurity Engineer";
  let pageDescription = "Expert insights on AI security, cloud security, and cybersecurity best practices from Vineeth Sai, a Cybersecurity Engineer at Amazon.";
  
  if (tag) {
    pageTitle = `${tag} Articles | Vineeth Sai - Cybersecurity Engineer`;
    pageDescription = `Expert articles about ${tag} from Vineeth Sai, a Cybersecurity Engineer specializing in cloud security and AI safety.`;
  }

  // Otherwise, show the blog list
  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="keywords" content={`Vineeth Sai, Cybersecurity Engineer, Amazon, ${allTags.join(', ')}`} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://vineethsai.com${location.pathname}`} />
          <link rel="canonical" href={`https://vineethsai.com${location.pathname}`} />
          
          {/* JSON-LD structured data for Blog */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "headline": tag ? `${tag} Articles by Vineeth Sai` : "Vineeth Sai's Cybersecurity Blog",
              "description": pageDescription,
              "author": {
                "@type": "Person",
                "name": "Vineeth Sai",
                "url": "https://vineethsai.com",
                "jobTitle": "Cybersecurity Engineer",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Amazon Web Services"
                }
              },
              "publisher": {
                "@type": "Organization",
                "name": "Vineeth Sai",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://vineethsai.com/favicon.svg"
                }
              },
              "url": `https://vineethsai.com${location.pathname}`,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://vineethsai.com${location.pathname}`
              },
              "keywords": allTags.join(', ')
            })}
          </script>
        </Helmet>
        
        <Navbar />
        <main className="pt-16 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {tag ? `${tag} Articles` : "Cybersecurity Insights"}
              </h1>
              <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
              <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
                {tag 
                  ? `Expert perspectives on ${tag} from Vineeth Sai, a Cybersecurity Engineer at Amazon.`
                  : "Expert perspectives on AI security, cloud security, and emerging cybersecurity threats from Vineeth Sai."
                }
              </p>
            </div>
            
            {/* Search and tag filtering */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                {/* Search input */}
                <div className="w-full md:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full md:w-80 bg-cyber-grey/80 border border-cyber-green/30 rounded-md py-2 px-4 text-gray-200 focus:outline-none focus:border-cyber-green"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Tag filter options */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link
                    to="/blog"
                    className={`px-3 py-1.5 rounded text-sm ${!tag ? 'bg-cyber-green text-cyber-dark font-medium' : 'bg-cyber-grey/50 text-gray-300 hover:bg-cyber-grey'}`}
                  >
                    All
                  </Link>
                  
                  {allTags.slice(0, 5).map((tagName) => (
                    <Link
                      key={tagName}
                      to={`/blog/tag/${encodeURIComponent(tagName.toLowerCase())}`}
                      className={`px-3 py-1.5 rounded text-sm ${tag === tagName ? 'bg-cyber-green text-cyber-dark font-medium' : 'bg-cyber-grey/50 text-gray-300 hover:bg-cyber-grey'}`}
                    >
                      {tagName}
                    </Link>
                  ))}
                  
                  {allTags.length > 5 && (
                    <div className="relative group">
                      <button className="px-3 py-1.5 rounded text-sm bg-cyber-grey/50 text-gray-300 hover:bg-cyber-grey">
                        More +
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-cyber-grey rounded-md shadow-lg overflow-hidden z-10 hidden group-hover:block">
                        {allTags.slice(5).map((tagName) => (
                          <Link
                            key={tagName}
                            to={`/blog/tag/${encodeURIComponent(tagName.toLowerCase())}`}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyber-green/20 hover:text-white"
                          >
                            {tagName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Results count */}
            {searchQuery && (
              <div className="mb-8 text-gray-400">
                Found {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} for "{searchQuery}"
              </div>
            )}
            
            {/* Blog post grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                    <Link to={`/blog/${post.id}`} className="block h-full">
                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-3 hover:text-cyber-green transition-colors">
                          {post.title}
                        </h2>
                        <div className="flex flex-wrap items-center mb-4 text-sm text-gray-400">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <ViewCounter postId={post.id} />
                        </div>
                        <p className="text-gray-300 mb-4">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tagName, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/blog/tag/${encodeURIComponent(tagName.toLowerCase())}`);
                              }}
                            >
                              #{tagName}
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
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    if (tag) navigate('/blog');
                  }}
                  className="px-4 py-2 bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green rounded-md transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Blog;
