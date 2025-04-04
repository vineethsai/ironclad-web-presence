
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, Tag, ArrowLeft, Github, Linkedin, Twitter, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(post => post.id === postId);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-cyber-dark text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-8">The blog post you're looking for doesn't exist.</p>
        <Button
          variant="outline"
          className="cyber-button"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          className="mb-8 text-cyber-green hover:text-cyber-green/80"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyber-green">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span>by {post.author}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs py-1 px-2 rounded-full bg-cyber-grey-light text-cyber-green flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </header>
          
          <div className="prose prose-invert prose-green max-w-none mb-12">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          <footer className="border-t border-cyber-green/20 pt-6 mt-10">
            <h4 className="text-xl font-semibold mb-4">Share this article</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-cyber-green hover:bg-cyber-grey">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-cyber-green hover:bg-cyber-grey">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-cyber-green hover:bg-cyber-grey">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-cyber-green hover:bg-cyber-grey">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
