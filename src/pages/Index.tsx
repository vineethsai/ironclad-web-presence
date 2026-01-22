import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, ArrowRight, Award, FileText, Globe, Mic } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
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
                "name": "Cisco"
              }
            })}
          </script>
        </Helmet>
        
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          
          {/* Preview Cards Section */}
          <section className="py-20 bg-cyber-darker relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {/* Experience Preview Card */}
                <Link 
                  to="/experience" 
                  className="group bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-center mb-3">
                    <Briefcase className="h-6 w-6 text-cyber-green mr-2" />
                    <h3 className="text-lg font-bold text-white">Experience</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Complete work history, projects, education, and certifications.
                  </p>
                  <div className="flex items-center text-cyber-green group-hover:text-cyber-green-light transition-colors text-sm">
                    <span className="mr-2">View</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Publications Preview Card */}
                <Link 
                  to="/publications" 
                  className="group bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-center mb-3">
                    <BookOpen className="h-6 w-6 text-cyber-green mr-2" />
                    <h3 className="text-lg font-bold text-white">Publications</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Peer-reviewed papers, OWASP guides, and awards.
                  </p>
                  <div className="flex items-center text-cyber-green group-hover:text-cyber-green-light transition-colors text-sm">
                    <span className="mr-2">View</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Speaking Preview Card */}
                <Link 
                  to="/speaking" 
                  className="group bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-center mb-3">
                    <Globe className="h-6 w-6 text-cyber-green mr-2" />
                    <h3 className="text-lg font-bold text-white">Speaking</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Conference talks, open source projects, and industry adoption.
                  </p>
                  <div className="flex items-center text-cyber-green group-hover:text-cyber-green-light transition-colors text-sm">
                    <span className="mr-2">View</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Media Preview Card */}
                <Link 
                  to="/media" 
                  className="group bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-center mb-3">
                    <Mic className="h-6 w-6 text-cyber-green mr-2" />
                    <h3 className="text-lg font-bold text-white">Media</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Press coverage, podcasts, and video interviews.
                  </p>
                  <div className="flex items-center text-cyber-green group-hover:text-cyber-green-light transition-colors text-sm">
                    <span className="mr-2">View</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
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
