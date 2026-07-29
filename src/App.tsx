import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import SectionRoute from "./components/SectionRoute";
import Preloader from "@/components/motion/Preloader";
import CustomCursor from "@/components/motion/CustomCursor";
import ScanlineTransition from "@/components/motion/ScanlineTransition";
import CommandPalette from "@/components/CommandPalette";

// Route-level code splitting: heavy pages (recharts, leaflet, markdown) load on demand
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Citations = lazy(() => import("./pages/Citations"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Publications = lazy(() => import("./pages/Publications"));
const Speaking = lazy(() => import("./pages/Speaking"));
const Media = lazy(() => import("./pages/Media"));
const ExperienceFull = lazy(() => import("./pages/ExperienceFull"));
const ResearchImpact = lazy(() => import("./pages/ResearchImpact"));

const queryClient = new QueryClient();

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

  return (
    <>
      <AnimatePresence>
        <ScanlineTransition key={`scan-${location.pathname}`} />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />} key={location.pathname}>
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/tag/:tag" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/citations" element={<Citations />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/media" element={<Media />} />
          <Route path="/experience" element={<ExperienceFull />} />
          <Route path="/research-impact" element={<ResearchImpact />} />

          {/* Section routes */}
          <Route path="/about" element={<SectionRoute sectionId="about" />} />
          <Route path="/skills" element={<SectionRoute sectionId="skills" />} />
          <Route path="/open-source" element={<Navigate to="/publications" replace />} />
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
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Preloader />
      <CustomCursor />
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CommandPalette />
        <AnimatedRoutes />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
