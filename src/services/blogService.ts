import { BlogPost } from '../data/blogPosts';

/**
 * Minimal front-matter parser for the posts in src/data/blog. Each line between the
 * leading `---` fences is `key: value`, where value is a JSON string or array.
 * (Replaces gray-matter, which needed a Buffer polyfill and ~110 KB in the browser.)
 */
const parseFrontMatter = (raw: string): { data: Record<string, unknown>; content: string } => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 1) continue;
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim();
    try {
      data[key] = JSON.parse(value);
    } catch {
      data[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }
  return { data, content: raw.slice(match[0].length) };
};

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
    const modules = import.meta.glob<string>('../data/blog/*.md', {
      eager: true,
      query: '?raw',
      import: 'default',
    });
    
    // Process each file
    const posts = Object.entries(modules).map(([path, content]) => {
      try {
        // Parse frontmatter
        const { data, content: markdownContent } = parseFrontMatter(content);
        
        // Extract ID from filename
        const id = path.split('/').pop()?.replace(/\.md$/, '') || '';
        
        return {
          id,
          title: String(data.title ?? ''),
          excerpt: String(data.excerpt ?? ''),
          content: markdownContent,
          date: String(data.date ?? ''),
          lastModified: data.lastModified ? String(data.lastModified) : undefined,
          author: String(data.author ?? ''),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          image: data.image ? String(data.image) : undefined,
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
  return posts.find(post => post.id === id) || null;
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
