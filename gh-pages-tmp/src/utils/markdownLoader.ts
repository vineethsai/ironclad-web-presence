import matter from 'gray-matter';
import { BlogPost } from '../data/blogPosts';
import fs from 'fs';
import path from 'path';

// This function will be used to load markdown files in a Node.js environment (e.g., build time)
export async function getMarkdownFiles(directory: string): Promise<BlogPost[]> {
  // In a Node.js environment, we can read the file system directly
  const postsDirectory = path.join(process.cwd(), directory);
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      // Read the file
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // Parse the frontmatter
      const { data, content } = matter(fileContents);
      
      // Get the ID from the filename without extension
      const id = filename.replace(/\.md$/, '');
      
      // Return the post data
      return {
        id,
        title: data.title || '',
        excerpt: data.excerpt || '',
        content,
        date: data.date || '',
        author: data.author || '',
        tags: data.tags || [],
        image: data.image || undefined,
      } as BlogPost;
    });
  
  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// This is a placeholder for client-side usage (we'll need to pre-build or use an API)
export async function getMarkdownFilesClient(): Promise<BlogPost[]> {
  // In a client environment, we'd typically fetch this data from an API
  // For now, we'll return an empty array
  return [];
} 