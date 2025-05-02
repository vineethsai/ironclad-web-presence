import React from 'react';
import { Shield, Github, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-darker py-12 border-t border-cyber-blue/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-cyber-blue mr-2" />
            <span className="text-xl font-bold text-white">Vineeth Sai</span>
          </div>

          <p className="text-gray-400 text-center max-w-md mb-8">
            Cybersecurity Engineer specializing in cloud security, application security, and security automation.
          </p>

          <div className="flex items-center space-x-6 mb-8">
            <a href="https://github.com/vineethsai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/vineethsai/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://orcid.org/0009-0007-4553-9930" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">iD</text></svg>
            </a>
            <a href="https://www.semanticscholar.org/author/Vineeth-Sai-Narajala/2355085670" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">S2</text></svg>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/#home" className="text-gray-400 hover:text-cyber-blue transition-colors">Home</Link>
            <Link to="/#about" className="text-gray-400 hover:text-cyber-blue transition-colors">About</Link>
            <Link to="/#skills" className="text-gray-400 hover:text-cyber-blue transition-colors">Skills</Link>
            <Link to="/#experience" className="text-gray-400 hover:text-cyber-blue transition-colors">Experience</Link>
            <Link to="/blog" className="text-gray-400 hover:text-cyber-blue transition-colors">Blog</Link>
            <Link to="/#contact" className="text-gray-400 hover:text-cyber-blue transition-colors">Contact</Link>
          </div>

          <div className="border-t border-cyber-blue/10 pt-8 w-full">
            <p className="text-gray-500 text-center flex items-center justify-center">
              <span>© {currentYear} Vineeth Sai. All rights reserved.</span>
              <span className="mx-2">|</span>
              <span className="flex items-center">
                Made with <Heart className="h-4 w-4 text-cyber-blue mx-1" /> for digital security
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
