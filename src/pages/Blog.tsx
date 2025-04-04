
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="cyber-glow">Blog</span>
          </h1>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-300">
            Insights on cybersecurity, generative AI security, and cloud security from my experience and research.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card 
                key={post.id} 
                className="cyber-card hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <CardHeader>
                  <CardTitle className="text-cyber-green">{post.title}</CardTitle>
                  <CardDescription className="text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs py-1 px-2 rounded-full bg-cyber-grey-light text-cyber-green flex items-center gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
