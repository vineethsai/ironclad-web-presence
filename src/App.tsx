import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import Index from "./pages/Index";
import SectionRoute from "./components/SectionRoute";
import CustomCursor from "@/components/motion/CustomCursor";
import ScanlineTransition from "@/components/motion/ScanlineTransition";
import CommandPalette from "@/components/CommandPalette";

import { pages } from "./routes";

// Route-level code splitting: heavy pages (recharts, leaflet, markdown) load on demand
const { BlogPost, Citations, NotFound, Publications, Speaking, Media, ExperienceFull, ResearchImpact, OpenSource, Writing } = pages;

const PageLoader = () => (
  <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-cyber-green/70">
      <div className="h-8 w-8 rounded-full border-2 border-cyber-green/30 border-t-cyber-green animate-spin" />
      <span className="font-mono text-xs tracking-widest uppercase">Loading…</span>
    </div>
  </div>
);

// Create a wrapper component to use location in AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();

  // On each new page: start at the top, and report the page view to Google Analytics
  // (gtag only records the first page load on its own)
  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (!window.location.hash) window.scrollTo(0, 0);
    const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("event", "page_view", {
      page_path: location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        <ScanlineTransition key={`scan-${location.pathname}`} />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />} key={location.pathname}>
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/writing" element={<Writing />} />
          {/* Old blog list URLs now point to Writing; individual posts keep their URLs */}
          <Route path="/blog" element={<Navigate to="/writing" replace />} />
          <Route path="/blog/tag/:tag" element={<Navigate to="/writing" replace />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/citations" element={<Citations />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/media" element={<Media />} />
          <Route path="/experience" element={<ExperienceFull />} />
          <Route path="/research-impact" element={<ResearchImpact />} />

          {/* Section routes */}
          <Route path="/about" element={<SectionRoute sectionId="about" />} />
          <Route path="/skills" element={<SectionRoute sectionId="featured" />} />
          <Route path="/open-source" element={<OpenSource />} />
          <Route path="/contact" element={<SectionRoute sectionId="contact" />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
    </>
  );
};

const App = () => (
  <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-cyber-green focus:text-cyber-dark focus:font-medium"
    >
      Skip to content
    </a>
    <CustomCursor />
    <BrowserRouter>
      <CommandPalette />
      <AnimatedRoutes />
    </BrowserRouter>
  </>
);

export default App;
