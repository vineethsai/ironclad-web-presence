import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, ArrowRight, Globe, Mic } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import FeaturedWorkSection from '@/components/FeaturedWorkSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import ImpactStrip from '@/components/ImpactStrip';
import { StaggerGroup, StaggerItem, SectionHeading, SpotlightCard } from '@/components/motion';
import Marquee from '@/components/motion/Marquee';

const previewCards = [
  {
    to: '/experience',
    icon: Briefcase,
    title: 'Experience',
    description: 'Work history, projects, and education.',
  },
  {
    to: '/publications',
    icon: BookOpen,
    title: 'Research',
    description: 'Peer-reviewed papers, preprints, IETF and OWASP standards.',
  },
  {
    to: '/speaking',
    icon: Globe,
    title: 'Speaking',
    description: 'Conference talks, workshops, and recordings.',
  },
  {
    to: '/media',
    icon: Mic,
    title: 'Media',
    description: 'Press coverage, podcasts, and video interviews.',
  },
];

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>Vineeth Sai Narajala | AI Security Researcher</title>
          <meta name="description" content="Vineeth Sai Narajala is an AI security researcher at Cisco working on securing AI agents: agent identity (Agent Name Service), MCP and tool security, and the OWASP AI Vulnerability Scoring System." />
          <meta property="og:title" content="Vineeth Sai Narajala | AI Security Researcher" />
          <meta property="og:description" content="Vineeth Sai Narajala is an AI security researcher at Cisco working on securing AI agents: agent identity (Agent Name Service), MCP and tool security, and the OWASP AI Vulnerability Scoring System." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://vineethsai.com" />
          <link rel="canonical" href="https://vineethsai.com" />
        </Helmet>

        <Navbar />
        <main>
          <HeroSection />
          <ImpactStrip />
          <Marquee
            items={[
              'IEEE',
              'IETF',
              'OWASP',
              'Linux Foundation',
              'Cloud Security Alliance',
              'ACSAC',
              'MIT Project NANDA',
              'arXiv',
              'BSides',
              'Agent Identity',
              'MCP Security',
            ]}
            className="py-5 bg-cyber-darker border-b border-cyber-green/10"
          />
          <AboutSection />
          <ExperienceSection />
          <FeaturedWorkSection />

          {/* Preview Cards Section */}
          <section className="py-20 bg-cyber-darker relative overflow-hidden">
            <div className="absolute inset-0 bg-grid" />
            <div className="glow-blob w-104 h-104 top-0 -left-32" />

            <div className="container mx-auto px-4 relative z-10">
              <SectionHeading kicker="04 · Explore" title="Dive Deeper" />

              <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {previewCards.map((card) => (
                  <StaggerItem key={card.to}>
                    <Link to={card.to} className="block h-full group">
                      <SpotlightCard className="cyber-card h-full p-6 bg-cyber-grey/80">
                        <div className="flex items-center mb-3">
                          <div className="p-2 rounded-lg bg-cyber-green/10 border border-cyber-green/20 mr-3 transition-transform duration-300 group-hover:scale-110">
                            <card.icon className="h-5 w-5 text-cyber-green" />
                          </div>
                          <h3 className="text-lg font-bold text-white">{card.title}</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          {card.description}
                        </p>
                        <div className="flex items-center text-cyber-green group-hover:text-cyber-green-light transition-colors text-sm">
                          <span className="mr-2">View</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </SpotlightCard>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </section>

          <ContactSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
