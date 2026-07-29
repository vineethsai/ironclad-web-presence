import React from 'react';
import { MapPin, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, StaggerGroup, StaggerItem, SectionHeading, SpotlightCard, MagneticButton } from '@/components/motion';

const contactRows = [
  {
    icon: <Linkedin className="h-6 w-6 text-cyber-green" />,
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/vineethsai/',
    label: 'Connect with me on LinkedIn',
  },
  {
    icon: <MapPin className="h-6 w-6 text-cyber-green" />,
    title: 'Location',
    label: 'New York, NY, United States',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-cyber-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C7.03 2 2.73 6.11 2.07 11h3.02c.56-3.36 3.47-6 6.91-6s6.35 2.64 6.91 6h3.02C21.27 6.11 16.97 2 12 2zm0 20c-4.97 0-9.27-4.11-9.93-9h3.02c.56 3.36 3.47 6 6.91 6s6.35-2.64 6.91-6h3.02c-.66 4.89-4.96 9-9.93 9z"/></svg>
    ),
    title: 'Google Scholar',
    link: 'https://scholar.google.com/citations?user=hIVoKbIAAAAJ&hl=en',
    label: 'View my Google Scholar profile',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-cyber-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">iD</text></svg>
    ),
    title: 'ORCID',
    link: 'https://orcid.org/0009-0007-4553-9930',
    label: 'View my ORCID profile',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-cyber-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">S2</text></svg>
    ),
    title: 'Semantic Scholar',
    link: 'https://www.semanticscholar.org/author/Vineeth-Sai-Narajala/2355085670',
    label: 'View my Semantic Scholar profile',
  },
];

const availableFor = ['Security Consulting', 'Penetration Testing', 'Security Training', 'Speaking Engagements'];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-cyber-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="glow-blob w-[32rem] h-[32rem] -bottom-20 left-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          kicker="05 · Contact"
          title="Get In Touch"
          subtitle="Want to get a coffee? Feel free to reach out on LinkedIn and I'll get back to you as soon as possible."
        />

        <div className="max-w-2xl mx-auto">
          <Reveal>
            <SpotlightCard className="glass-card p-8 hover:border-cyber-green/30 hover:shadow-glow-sm transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

              <StaggerGroup className="space-y-6">
                {contactRows.map((row) => (
                  <StaggerItem key={row.title}>
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg border border-cyber-green/20">
                        {row.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{row.title}</h4>
                        {row.link ? (
                          <a
                            href={row.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-cyber-green transition-colors"
                          >
                            {row.label}
                          </a>
                        ) : (
                          <p className="text-gray-300">{row.label}</p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <div className="mt-10 pt-6 border-t border-cyber-green/20">
                <h4 className="text-xl font-semibold text-white mb-4">Available For</h4>
                <div className="flex flex-wrap gap-3">
                  {availableFor.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green hover:bg-cyber-green/20 hover:scale-105 transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <MagneticButton>
                  <Button asChild className="cyber-button">
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
                </MagneticButton>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
