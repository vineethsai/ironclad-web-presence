import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Citations from "./pages/Citations";
import NotFound from "./pages/NotFound";
import Publications from "./pages/Publications";
import Speaking from "./pages/Speaking";
import Media from "./pages/Media";
import ExperienceFull from "./pages/ExperienceFull";
import ResearchImpact from "./pages/ResearchImpact";
import SectionRoute from "./components/SectionRoute";

const queryClient = new QueryClient();

// Create a wrapper component to use location in AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
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
        <Route path="/open-source" element={<SectionRoute sectionId="open-source" />} />
        <Route path="/contact" element={<SectionRoute sectionId="contact" />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
