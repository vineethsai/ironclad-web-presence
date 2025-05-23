import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fix paths for HashRouter - remove # prefix since HashRouter adds it automatically
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Open Source', path: '/open-source' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  // Helper function to check if a path is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    
    // For section links (which use hash routing internally)
    if (path !== '/blog' && path.startsWith('/')) {
      return location.hash === `#${path.substring(1)}`;
    }
    
    return location.pathname === path;
  };

  return (
    <motion.nav 
      className={`sticky top-0 z-50 backdrop-blur-md border-b py-4
        ${scrollY > 50 ? 'bg-cyber-dark/95 border-cyber-blue/20' : 'bg-cyber-dark/80 border-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 120, 
        damping: 20 
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Shield className="h-8 w-8 text-cyber-blue mr-2" />
            <Link to="/" className="text-xl font-bold text-white">Vineeth Sai</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3 + index * 0.05,
                  duration: 0.3
                }}
                className="relative"
              >
                <Link 
                  to={item.path} 
                  className="text-white hover:text-cyber-blue transition-colors py-1"
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyber-blue"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <ThemeToggle />
            <a href="https://github.com/vineethsai" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-white hover:text-cyber-green transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/vineethsai/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-white hover:text-cyber-green transition-colors" />
            </a>
            <a href="https://scholar.google.com/citations?user=hIVoKbIAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5 text-white hover:text-cyber-green transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C7.03 2 2.73 6.11 2.07 11h3.02c.56-3.36 3.47-6 6.91-6s6.35 2.64 6.91 6h3.02C21.27 6.11 16.97 2 12 2zm0 20c-4.97 0-9.27-4.11-9.93-9h3.02c.56 3.36 3.47 6 6.91 6s6.35-2.64 6.91-6h3.02c-.66 4.89-4.96 9-9.93 9z"/></svg>
            </a>
            <a href="https://orcid.org/0009-0007-4553-9930" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5 text-white hover:text-cyber-green transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">iD</text></svg>
            </a>
            <a href="https://www.semanticscholar.org/author/Vineeth-Sai-Narajala/2355085670" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5 text-white hover:text-cyber-green transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">S2</text></svg>
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="ghost"
              className="md:hidden text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-cyber-grey-light border-t border-cyber-blue/20 mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-3 space-y-3">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link 
                    to={item.path} 
                    className="block text-white hover:text-cyber-blue py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                className="flex space-x-4 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <ThemeToggle />
                <a href="https://github.com/vineethsai" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 text-white hover:text-cyber-green transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/vineethsai/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-white hover:text-cyber-green transition-colors" />
                </a>
                <a href="https://scholar.google.com/citations?user=hIVoKbIAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                  <svg className="h-5 w-5 text-white hover:text-cyber-green transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C7.03 2 2.73 6.11 2.07 11h3.02c.56-3.36 3.47-6 6.91-6s6.35 2.64 6.91 6h3.02C21.27 6.11 16.97 2 12 2zm0 20c-4.97 0-9.27-4.11-9.93-9h3.02c.56 3.36 3.47 6 6.91 6s6.35-2.64 6.91-6h3.02c-.66 4.89-4.96 9-9.93 9z"/></svg>
                </a>
                <a href="https://orcid.org/0009-0007-4553-9930" target="_blank" rel="noopener noreferrer">
                  <svg className="h-5 w-5 text-white hover:text-cyber-green transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">iD</text></svg>
                </a>
                <a href="https://www.semanticscholar.org/author/Vineeth-Sai-Narajala/2355085670" target="_blank" rel="noopener noreferrer">
                  <svg className="h-5 w-5 text-white hover:text-cyber-green transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">S2</text></svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
