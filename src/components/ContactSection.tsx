import React from 'react';
import { Mail, MapPin, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-cyber-darker relative overflow-hidden">
      {/* Background grid lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
            Want to get a coffee? Feel free to reach out on LinkedIn and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-green/20">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg">
                  <Linkedin className="h-6 w-6 text-cyber-green" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/vineethsai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyber-green transition-colors"
                  >
                    Connect with me on LinkedIn
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-cyber-green" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Location</h4>
                  <p className="text-gray-300">
                    New York, NY, United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-cyber-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C7.03 2 2.73 6.11 2.07 11h3.02c.56-3.36 3.47-6 6.91-6s6.35 2.64 6.91 6h3.02C21.27 6.11 16.97 2 12 2zm0 20c-4.97 0-9.27-4.11-9.93-9h3.02c.56 3.36 3.47 6 6.91 6s6.35-2.64 6.91-6h3.02c-.66 4.89-4.96 9-9.93 9z"/></svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Google Scholar</h4>
                  <a 
                    href="https://scholar.google.com/citations?user=hIVoKbIAAAAJ&hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyber-green transition-colors"
                  >
                    View my Google Scholar profile
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-cyber-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">iD</text></svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">ORCID</h4>
                  <a 
                    href="https://orcid.org/0009-0007-4553-9930" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyber-green transition-colors"
                  >
                    View my ORCID profile
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-cyber-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">S2</text></svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Semantic Scholar</h4>
                  <a 
                    href="https://www.semanticscholar.org/author/Vineeth-Sai-Narajala/2355085670" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyber-green transition-colors"
                  >
                    View my Semantic Scholar profile
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-cyber-green/20">
              <h4 className="text-xl font-semibold text-white mb-4">Available For</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green">Security Consulting</span>
                <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green">Penetration Testing</span>
                <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green">Security Training</span>
                <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green">Speaking Engagements</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                asChild
                className="cyber-button"
              >
                <a 
                  href="https://www.linkedin.com/in/vineethsai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Message Me on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
