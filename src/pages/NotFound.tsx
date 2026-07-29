import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { MagneticButton } from '@/components/motion';
import { motion } from 'framer-motion';
import { EASE } from '@/components/motion/easing';

const NotFound = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white flex flex-col">
        <Helmet>
          <title>Page Not Found | Vineeth Sai Narajala</title>
          <meta name="description" content="The page you're looking for cannot be found. Return to Vineeth Sai Narajala's cybersecurity portfolio." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        <Navbar />
        <main className="flex-grow flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid" />
          <div className="glow-blob w-[30rem] h-[30rem] top-1/3 left-1/2 -translate-x-1/2" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1
              className="text-7xl md:text-9xl font-bold text-gradient cyber-glow-soft mb-6 font-mono"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              404
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
              <p className="font-mono text-sm text-cyber-green/70 mb-3">$ grep -r "page" ./site — no matches found</p>
              <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <MagneticButton>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-cyber-green text-black font-semibold rounded-md hover:bg-cyber-green-light hover:shadow-glow transition-all"
                >
                  Return to Home
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default NotFound;
