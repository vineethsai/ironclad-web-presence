/**
 * Prerender every page to static HTML after `vite build`, so search engines and link previews
 * (LinkedIn, Slack, X) get each page's real content, title, and description without running JS.
 *
 *   npx tsx scripts/prerender.ts      (runs automatically as part of `npm run build`)
 *
 * It serves dist/ with `vite preview`, opens each route in headless Chrome (installed Chrome via
 * playwright-core; GitHub's Ubuntu runners have it), and saves the rendered page as
 * dist/<route>.html, which GitHub Pages serves at /<route>. The app then takes over in the browser
 * (see src/main.tsx). Set PRERENDER=0 to skip.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { preview } from 'vite';
import { chromium } from 'playwright-core';
import { pageRoutes, postRoutes, shellRoutes } from './siteRoutes';

if (process.env.PRERENDER === '0') {
  console.log('PRERENDER=0: skipping prerender');
  process.exit(0);
}

const dist = resolve(import.meta.dirname, '../dist');
// The untouched app shell. Saved on the first run so re-running never prerenders on top of output.
const shellPath = resolve(dist, 'app-shell.html');
if (!existsSync(shellPath)) copyFileSync(resolve(dist, 'index.html'), shellPath);
const template = readFileSync(shellPath, 'utf8');

// The plain app shell: GitHub Pages serves 404.html for unknown paths, and the app's router
// shows its own "not found" page (or handles redirects like /blog -> /writing).
writeFileSync(resolve(dist, '404.html'), template);
for (const route of shellRoutes) writeFileSync(resolve(dist, `${route.slice(1)}.html`), template);

const server = await preview({ logLevel: 'warn', preview: { port: 4321, strictPort: false, open: false } });
const base = (server.resolvedUrls?.local[0] ?? 'http://localhost:4321/').replace(/\/$/, '');

const browser = await chromium.launch({ channel: 'chrome' });
// Reduced motion renders final states (no fade-ins, counters at their values, no WebGL)
const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
// tsx compiles named functions with a `__name` helper; define it inside the page for page.evaluate
await context.addInitScript({ content: 'window.__name = (fn) => fn;' });
const page = await context.newPage();
const problems: string[] = [];
page.on('pageerror', (err) => problems.push(`${page.url()}: ${err.message}`));

const routes = [...pageRoutes, ...postRoutes()];
for (const route of routes) {
  await page.goto(base + route, { waitUntil: 'networkidle' });
  await page.waitForSelector('main h1', { timeout: 15000 });
  await page.evaluate(() => document.fonts.ready);

  const html = await page.evaluate((templateHtml) => {
    const templateHead = new DOMParser().parseFromString(templateHtml, 'text/html').head;
    // How many times each tag appears in the template (the app may add an identical copy)
    const templateCounts = new Map<string, number>();
    for (const el of templateHead.children) templateCounts.set(el.outerHTML, (templateCounts.get(el.outerHTML) ?? 0) + 1);
    const isManaged = (el: Element) =>
      ['TITLE', 'META'].includes(el.tagName) ||
      (el.tagName === 'LINK' && el.getAttribute('rel') === 'canonical') ||
      (el.tagName === 'SCRIPT' && el.getAttribute('type') === 'application/ld+json');
    const key = (el: Element) =>
      el.tagName === 'TITLE'
        ? 'title'
        : el.tagName === 'LINK'
          ? `link:${el.getAttribute('rel')}`
          : el.tagName === 'META'
            ? `meta:${el.getAttribute('name') ?? el.getAttribute('property')}`
            : null;

    // Tags the app added for this page (title, description, Open Graph, canonical, JSON-LD) are
    // marked so the app can remove them when it starts; template tags they replace are dropped.
    const added: Element[] = [];
    const fromTemplate: Element[] = [];
    for (const el of [...document.head.children]) {
      const remaining = templateCounts.get(el.outerHTML) ?? 0;
      if (remaining > 0) {
        templateCounts.set(el.outerHTML, remaining - 1);
        fromTemplate.push(el);
      } else if (isManaged(el)) {
        added.push(el);
      }
    }
    const replaced = new Set(added.map(key).filter(Boolean));
    for (const el of fromTemplate) if (replaced.has(key(el))) el.remove();
    for (const el of added) el.setAttribute('data-prerender', '');
    // Put the page's tags right after the charset/viewport so they come first
    const anchor = document.head.querySelector('meta[name="viewport"]');
    anchor?.after(...added);

    return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
  }, template);

  // Chunks preloaded at runtime use absolute URLs to the local server
  const out = html.split(base).join('');
  const file = route === '/' ? resolve(dist, 'index.html') : resolve(dist, `${route.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
  console.log(`prerendered ${route} -> ${file.slice(dist.length + 1)}`);
}

await browser.close();
await new Promise<void>((done) => server.httpServer.close(() => done()));


if (problems.length) {
  console.error('Page errors during prerender:\n' + problems.join('\n'));
  process.exit(1);
}
