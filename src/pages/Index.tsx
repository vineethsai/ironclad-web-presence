import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import OpenSourceSection from '@/components/OpenSourceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>Vineeth Sai Narajala | Cybersecurity Engineer & AI Security Expert</title>
          <meta name="description" content="Vineeth Sai Narajala is a Cybersecurity Engineer specializing in AI security, cloud security, and application security with expertise in AWS security and generative AI security." />
          <meta name="keywords" content="Vineeth Sai, Vineeth Sai Narajala, AI Security, Cybersecurity Engineer, GenAI Security, Cloud Security, AWS Security, Generative AI" />
          <meta property="og:title" content="Vineeth Sai Narajala | Cybersecurity Engineer & AI Security Expert" />
          <meta property="og:description" content="Professional portfolio of Vineeth Sai Narajala, a Cybersecurity Engineer specializing in AI security, cloud security, and application security." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://vineethsai.com" />
          <link rel="canonical" href="https://vineethsai.com" />
          
          {/* JSON-LD structured data for Person */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Vineeth Sai Narajala",
              "jobTitle": "Cybersecurity Engineer",
              "description": "Specializing in AI security, cloud security, and application security",
              "url": "https://vineethsai.com",
              "sameAs": [
                "https://github.com/vineethsai",
                "https://linkedin.com/in/vineethsai",
                "https://twitter.com/vineethsai",
                "https://scholar.google.com/citations?user=hIVoKbIAAAAJ&hl=en",
                "https://orcid.org/0009-0007-4553-9930",
                "https://www.semanticscholar.org/author/Vineeth-Sai-Narajala/2355085670"
              ],
              "knowsAbout": [
                "AI Security",
                "Cloud Security",
                "Application Security",
                "Threat Modeling",
                "Generative AI Security"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Amazon Web Services"
              }
            })}
          </script>
        </Helmet>
        
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <OpenSourceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
