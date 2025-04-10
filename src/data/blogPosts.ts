export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
}

// Placeholder for static data
// In a real application, this would be populated at build time
// by the markdown loader utility
export const blogPosts: BlogPost[] = [
  {
    id: "generative-ai-security",
    title: "Securing Generative AI: Best Practices for Enterprise Deployment",
    excerpt: "Learn about the essential security considerations when implementing generative AI solutions in enterprise environments.",
    content: "",
    date: "April 2, 2025",
    author: "Vineeth Sai",
    tags: ["AI Security", "GenAI", "Cybersecurity", "Enterprise Security"]
  },
  {
    id: "cloud-security-patterns",
    title: "Modern Cloud Security Patterns for Big Data Workloads",
    excerpt: "Discover effective security patterns for protecting big data workloads in cloud environments.",
    content: "",
    date: "March 26, 2025",
    author: "Vineeth Sai",
    tags: ["Cloud Security", "Big Data", "AWS", "Security Architecture"]
  }
];

// This function would be used in a Next.js or similar SSG/SSR framework
// to load blog posts at build time or server-side
export async function loadBlogPosts(): Promise<BlogPost[]> {
  // This is where we would dynamically load the blog posts
  // For now, we'll return the static data
  // In a real implementation, this would use the markdownLoader utility
  return blogPosts;
}
