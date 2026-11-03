export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  lastModified?: string;
  author: string;
  tags: string[];
  image?: string;
}
