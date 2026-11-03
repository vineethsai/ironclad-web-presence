import React from 'react';
import { Shield, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '@/content/profile';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-darker py-12 border-t border-cyber-green/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-cyber-green mr-2" />
            <span className="text-xl font-bold text-white">{profile.name}</span>
          </div>

          <p className="text-gray-400 text-center max-w-md mb-8">
            {profile.title} at {profile.employer}, working on securing AI agents.
          </p>

          <div className="flex items-center space-x-6 mb-8">
            <a href={profile.links.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href={profile.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href={profile.links.orcid} aria-label="ORCID" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">iD</text></svg>
            </a>
            <a href={profile.links.semanticScholar} aria-label="Semantic Scholar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">S2</text></svg>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              ['/', 'Home'],
              ['/experience', 'Experience'],
              ['/publications', 'Research'],
              ['/open-source', 'Open Source'],
              ['/speaking', 'Speaking'],
              ['/media', 'Media'],
              ['/writing', 'Writing'],
              ['/citations', 'Citations'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-gray-400 hover:text-cyber-green transition-colors">
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t border-cyber-green/10 pt-8 w-full">
            <p className="text-gray-500 text-center text-sm">
              © {currentYear} {profile.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
