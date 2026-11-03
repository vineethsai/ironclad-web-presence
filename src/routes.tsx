import { lazy, type ComponentType } from 'react';
import { matchPath } from 'react-router-dom';

/**
 * A code-split page that can also be loaded ahead of time. On first load, main.tsx preloads
 * the current page so React's first render already has its content (no loading spinner
 * replacing the prerendered HTML).
 */
type Loader = () => Promise<{ default: ComponentType }>;

export type PageComponent = ComponentType & { preload: () => Promise<void> };

const lazyPage = (loader: Loader): PageComponent => {
  let Loaded: ComponentType | null = null;
  const Lazy = lazy(async () => {
    const mod = await loader();
    Loaded = mod.default;
    return mod;
  });
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  return Object.assign(Page, {
    preload: async () => {
      Loaded = (await loader()).default;
    },
  });
};

export const pages = {
  BlogPost: lazyPage(() => import('./pages/BlogPost')),
  Citations: lazyPage(() => import('./pages/Citations')),
  NotFound: lazyPage(() => import('./pages/NotFound')),
  Publications: lazyPage(() => import('./pages/Publications')),
  Speaking: lazyPage(() => import('./pages/Speaking')),
  Media: lazyPage(() => import('./pages/Media')),
  ExperienceFull: lazyPage(() => import('./pages/ExperienceFull')),
  ResearchImpact: lazyPage(() => import('./pages/ResearchImpact')),
  OpenSource: lazyPage(() => import('./pages/OpenSource')),
  Writing: lazyPage(() => import('./pages/Writing')),
};

/** Code-split pages by path, used to preload the page for the URL being opened. */
const pageForPath: [string, PageComponent][] = [
  ['/writing', pages.Writing],
  ['/blog/:postId', pages.BlogPost],
  ['/citations', pages.Citations],
  ['/publications', pages.Publications],
  ['/speaking', pages.Speaking],
  ['/media', pages.Media],
  ['/experience', pages.ExperienceFull],
  ['/research-impact', pages.ResearchImpact],
  ['/open-source', pages.OpenSource],
];

const appRoutes = ['/', '/blog', '/blog/tag/:tag', '/about', '/skills', '/contact', ...pageForPath.map(([p]) => p)];

export const preloadPageFor = async (pathname: string): Promise<void> => {
  const match = pageForPath.find(([pattern]) => matchPath(pattern, pathname));
  if (match) return match[1].preload();
  if (!appRoutes.some((pattern) => matchPath(pattern, pathname))) return pages.NotFound.preload();
};
