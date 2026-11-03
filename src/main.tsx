import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
// Self-hosted fonts (no third-party font requests)
import '@fontsource-variable/inter';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/500.css';
import '@fontsource/roboto-mono/600.css';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { preloadPageFor } from './routes';
import { boot } from './lib/boot';

const rootElement = document.getElementById('root')!;

// Pages are prerendered to static HTML at build time (scripts/prerender.ts) so search engines and
// link previews see real content. When the app starts, it re-renders that content itself:
//  - drop the prerendered <title>/<meta> tags, since the app adds its own for each page
//  - load the current page's code first, so the first render matches the static HTML
//  - show final states on that first render, so visible content doesn't fade out and back in
const prerendered = rootElement.hasChildNodes();
// Prerendered page tags and the shell's default title/description: the app sets its own per page
document.querySelectorAll('[data-prerender], [data-default]').forEach((el) => el.remove());

const start = async () => {
  await preloadPageFor(window.location.pathname).catch(() => undefined);
  boot.prerendered = prerendered;

  createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>,
  );

  // Pages opened later (in-app navigation) animate in as usual
  requestAnimationFrame(() => setTimeout(() => (boot.prerendered = false), 0));
};

void start();
