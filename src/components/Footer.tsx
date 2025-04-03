
import React from 'react';
import { Shield, Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-darker py-12 border-t border-cyber-blue/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-cyber-blue mr-2" />
            <span className="text-xl font-bold text-white">CyberDefender</span>
          </div>

          <p className="text-gray-400 text-center max-w-md mb-8">
            Providing expert cybersecurity solutions to protect your digital assets and infrastructure from evolving threats.
          </p>

          <div className="flex items-center space-x-6 mb-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="#home" className="text-gray-400 hover:text-cyber-blue transition-colors">Home</a>
            <a href="#about" className="text-gray-400 hover:text-cyber-blue transition-colors">About</a>
            <a href="#skills" className="text-gray-400 hover:text-cyber-blue transition-colors">Skills</a>
            <a href="#experience" className="text-gray-400 hover:text-cyber-blue transition-colors">Experience</a>
            <a href="#contact" className="text-gray-400 hover:text-cyber-blue transition-colors">Contact</a>
          </div>

          <div className="border-t border-cyber-blue/10 pt-8 w-full">
            <p className="text-gray-500 text-center flex items-center justify-center">
              <span>© {currentYear} CyberDefender. All rights reserved.</span>
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
