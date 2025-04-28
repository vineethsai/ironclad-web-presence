import { BlogPost } from '../data/blogPosts';
import matter from 'gray-matter';

// Polyfill for Buffer in browser environments
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// Cache for blog posts
let blogPostsCache: BlogPost[] | null = null;

/**
 * Gets all blog posts by importing markdown files
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // If we have a cache, return it
  if (blogPostsCache) {
    return blogPostsCache;
  }

  try {
    // Import all markdown files
    // This uses Vite's import.meta.glob which is processed at build time
    const modules = import.meta.glob('../data/blog/*.md', { eager: true, as: 'raw' });
    console.log('Found markdown files:', Object.keys(modules));
    
    // Process each file
    const posts = Object.entries(modules).map(([path, content]) => {
      try {
        console.log(`Processing file: ${path}, content length: ${(content as string).length}`);
        // Parse frontmatter
        const matterResult = matter(content as string);
        const { data, content: markdownContent } = matterResult;
        
        console.log(`Frontmatter data:`, data);
        console.log(`Markdown content length: ${markdownContent.length}`);
        console.log(`Markdown content starts with: ${markdownContent.substring(0, 50)}`);
        
        // Extract ID from filename
        const id = path.split('/').pop()?.replace(/\.md$/, '') || '';
        
        return {
          id,
          title: data.title || '',
          excerpt: data.excerpt || '',
          content: markdownContent,
          date: data.date || '',
          author: data.author || '',
          tags: data.tags || [],
          image: data.image,
        } as BlogPost;
      } catch (err) {
        console.error(`Error processing markdown file ${path}:`, err);
        return null;
      }
    }).filter(Boolean) as BlogPost[];
    
    // Sort posts by date
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Cache the posts
    blogPostsCache = sortedPosts;
    
    return sortedPosts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

/**
 * Gets a specific blog post by ID
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const post = posts.find(post => post.id === id) || null;
  console.log(`Retrieved post by ID ${id}:`, post);
  return post;
}

/**
 * Gets posts that match a specific tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const normalizedTag = tag.toLowerCase();
  return posts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === normalizedTag)
  );
}

/**
 * Gets related posts based on shared tags
 * @param currentPostId The ID of the current post to exclude from results
 * @param tags Array of tags to match against
 * @param limit Maximum number of posts to return
 */
export async function getRelatedPosts(currentPostId: string, tags: string[], limit: number = 2): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.id !== currentPostId);
  
  // Calculate relevance score based on shared tags
  const scoredPosts = otherPosts.map(post => {
    const sharedTags = post.tags.filter(tag => tags.includes(tag));
    return {
      post,
      score: sharedTags.length
    };
  });
  
  // Sort by score (highest first) and take the specified limit
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0) // Only posts with at least one shared tag
    .slice(0, limit)
    .map(item => item.post);
} 