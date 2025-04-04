
import React, { useState } from 'react';
import { Menu, X, Shield, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-cyber-dark/90 backdrop-blur-md border-b border-cyber-blue/20 py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-cyber-blue mr-2" />
            <span className="text-xl font-bold text-white">Vineeth Sai</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-cyber-blue transition-colors">Home</a>
            <a href="#about" className="text-white hover:text-cyber-blue transition-colors">About</a>
            <a href="#skills" className="text-white hover:text-cyber-blue transition-colors">Skills</a>
            <a href="#experience" className="text-white hover:text-cyber-blue transition-colors">Experience</a>
            <a href="#open-source" className="text-white hover:text-cyber-blue transition-colors">Open Source</a>
            <a href="#contact" className="text-white hover:text-cyber-blue transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-white hover:text-cyber-blue transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-white hover:text-cyber-blue transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 text-white hover:text-cyber-blue transition-colors" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cyber-grey-light border-t border-cyber-blue/20 mt-2">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <a 
              href="#home" 
              className="block text-white hover:text-cyber-blue py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="block text-white hover:text-cyber-blue py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#skills" 
              className="block text-white hover:text-cyber-blue py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#experience" 
              className="block text-white hover:text-cyber-blue py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>
            <a 
              href="#open-source" 
              className="block text-white hover:text-cyber-blue py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Open Source
            </a>
            <a 
              href="#contact" 
              className="block text-white hover:text-cyber-blue py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex space-x-4 py-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-white hover:text-cyber-blue transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-white hover:text-cyber-blue transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-white hover:text-cyber-blue transition-colors" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
