/**
 * Writes dist/sitemap.xml and dist/rss.xml from the site's routes and content.
 * Runs as part of every build, after `vite build` (see the "build" script in package.json).
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SITE_URL, pageRoutes, archivedPosts } from './siteRoutes';
import { articles } from '../src/content/writing';

const outDir = resolve(import.meta.dirname, '../dist');
const today = new Date().toISOString().slice(0, 10);
const isoDate = (d: string) => new Date(d).toISOString().slice(0, 10);
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`;

// Sitemap: every page, plus the archived posts
const posts = archivedPosts();
const sitemapEntries = [
  ...pageRoutes.map((p) => ({ loc: url(p), lastmod: today })),
  ...posts.map((p) => ({ loc: url(`/blog/${p.id}`), lastmod: isoDate(p.lastModified || p.date) })),
];
writeFileSync(
  resolve(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`,
);

// RSS: articles (newest first), then the archived posts
const items = [
  ...articles.map((a) => ({ title: a.title, link: a.url, date: a.date, description: `${a.summary} (${a.publication})` })),
  ...posts.map((p) => ({ title: p.title, link: url(`/blog/${p.id}`), date: isoDate(p.date), description: p.excerpt })),
].sort((a, b) => b.date.localeCompare(a.date));

writeFileSync(
  resolve(outDir, 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vineeth Sai Narajala: Writing</title>
    <link>${url('/writing')}</link>
    <atom:link href="${url('/rss.xml')}" rel="self" type="application/rss+xml" />
    <description>Articles on AI agent security by Vineeth Sai Narajala.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map(
    (i) => `    <item>
      <title>${escape(i.title)}</title>
      <link>${escape(i.link)}</link>
      <guid isPermaLink="true">${escape(i.link)}</guid>
      <pubDate>${new Date(i.date.length === 7 ? `${i.date}-01` : i.date).toUTCString()}</pubDate>
      <description>${escape(i.description)}</description>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`,
);

console.log(`sitemap.xml: ${sitemapEntries.length} URLs, rss.xml: ${items.length} items`);
