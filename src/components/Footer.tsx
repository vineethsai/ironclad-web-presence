
import React from 'react';
import { Shield, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-darker py-12 border-t border-cyber-green/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-6 hover-lift">
            <Shield className="h-8 w-8 text-cyber-green mr-2 animate-pulse" />
            <span className="text-xl font-bold text-white">Vineeth Sai</span>
          </div>

          <p className="text-gray-400 text-center max-w-md mb-8">
            Cybersecurity Engineer specializing in cloud security, application security, and security automation.
          </p>

          <div className="flex items-center space-x-6 mb-8">
            <a href="https://github.com/vineethsai" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-cyber-green transition-colors transform hover:scale-110 duration-300">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/in/vineethsai" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-cyber-green transition-colors transform hover:scale-110 duration-300">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-cyber-green transition-colors transform hover:scale-110 duration-300">
              <Twitter className="h-6 w-6" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8 w-full max-w-3xl">
            <Link to="/#home" className="text-gray-400 hover:text-cyber-green transition-colors animated-link">Home</Link>
            <Link to="/#about" className="text-gray-400 hover:text-cyber-green transition-colors animated-link">About</Link>
            <Link to="/#skills" className="text-gray-400 hover:text-cyber-green transition-colors animated-link">Skills</Link>
            <Link to="/#experience" className="text-gray-400 hover:text-cyber-green transition-colors animated-link">Experience</Link>
            <Link to="/blog" className="text-gray-400 hover:text-cyber-green transition-colors animated-link">Blog</Link>
            <Link to="/#contact" className="text-gray-400 hover:text-cyber-green transition-colors animated-link">Contact</Link>
          </div>

          <div className="border-t border-cyber-green/10 pt-8 w-full">
            <p className="text-gray-500 text-center flex items-center justify-center flex-wrap gap-2">
              <span>© {currentYear} Vineeth Sai. All rights reserved.</span>
              <span className="hidden sm:inline mx-2">|</span>
              <span className="flex items-center">
                Made with <Heart className="h-4 w-4 text-cyber-green mx-1 hover:animate-pulse" /> for digital security
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
