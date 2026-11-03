/** Every public page of the site, shared by the sitemap/RSS generator and the prerenderer. */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const SITE_URL = 'https://vineethsai.com';

/** Pages that get prerendered and listed in the sitemap. */
export const pageRoutes = [
  '/',
  '/publications',
  '/open-source',
  '/speaking',
  '/media',
  '/writing',
  '/experience',
  '/citations',
  '/research-impact',
];

/** Routes the app handles by redirecting or scrolling (served as the plain app shell, not listed in the sitemap). */
export const shellRoutes = ['/about', '/contact', '/skills', '/blog'];

export interface ArchivedPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  lastModified?: string;
}

/** The archived blog posts in src/data/blog (front matter is `key: "json value"` lines). */
export const archivedPosts = (): ArchivedPost[] => {
  const dir = resolve(import.meta.dirname, '../src/data/blog');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(resolve(dir, file), 'utf8');
      const front = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const data: Record<string, string> = {};
      for (const line of front.split(/\r?\n/)) {
        const i = line.indexOf(':');
        if (i < 1) continue;
        const value = line.slice(i + 1).trim();
        try {
          data[line.slice(0, i).trim()] = JSON.parse(value);
        } catch {
          data[line.slice(0, i).trim()] = value;
        }
      }
      return {
        id: file.replace(/\.md$/, ''),
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        lastModified: data.lastModified,
      };
    });
};

export const postRoutes = () => archivedPosts().map((p) => `/blog/${p.id}`);
