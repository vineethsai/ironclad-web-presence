import React from 'react';
import { Calendar, Award, Briefcase, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExperienceSection = () => {
  const currentRole = {
    title: 'Senior Technical Leader - AI Security Researcher',
    company: 'Cisco',
    period: 'November 2025 - Present',
    location: 'New York, United States',
    description: `
      <ul>
        <li>Leading research and development of AI security frameworks, agentic AI threat modeling, and zero-trust protocols for multi-agent systems</li>
        <li>Architecting enterprise-grade security solutions for generative AI and autonomous agent deployments</li>
        <li>Driving thought leadership in agentic AI security through cutting-edge research, publications, and industry collaboration</li>
      </ul>
    `,
    skills: ['Agentic AI Security', 'Zero Trust Architecture', 'AI Security Research', 'Threat Modeling']
  };

  return (
    <section id="experience" className="py-20 bg-cyber-darker relative overflow-hidden">
      {/* Background grid lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Current Role & Leadership</h2>
          <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Current Role</h3>
            </div>

            <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h4 className="text-xl font-semibold text-white">{currentRole.title}</h4>
                <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                  {currentRole.period}
                </span>
              </div>
              <h5 className="text-lg text-cyber-green mb-4">{currentRole.company}</h5>
              
              <div dangerouslySetInnerHTML={{ __html: currentRole.description }} className="text-gray-300 mt-4" />
              <div className="flex flex-wrap gap-2 mt-4">
                {currentRole.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link 
                to="/experience" 
                className="inline-flex items-center px-6 py-3 bg-cyber-green/10 border border-cyber-green/30 rounded-lg text-cyber-green hover:bg-cyber-green/20 transition-all duration-300 group"
              >
                <span>View Full Experience</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-8">
              <Shield className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Leadership</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">Co Leader and Founding Member of AIVSS</h4>
                  <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                    Jun 2025 - Present
                  </span>
                </div>
                <h5 className="text-lg text-cyber-green mb-3">
                  <a href="https://aivss.owasp.org/" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green-light transition-colors">
                    OWASP AIVSS Project ↗
                  </a>
                </h5>
                <p className="text-gray-300 mb-4">
                  AI Vulnerability Scoring System and Agentic AI Top 10 - Leading the development of comprehensive vulnerability scoring methodologies specifically designed for AI systems, including agentic AI applications.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    AI Security
                  </span>
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    Vulnerability Assessment
                  </span>
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    Open Source Leadership
                  </span>
                </div>
              </div>

              <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">Co Lead for Agentic Application Security</h4>
                  <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                    Mar 2025 - Present
                  </span>
                </div>
                <h5 className="text-lg text-cyber-green mb-3">
                  <a href="http://genai.owasp.org/" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green-light transition-colors">
                    OWASP GenAI Project - Agentic Security Initiative (ASI) ↗
                  </a>
                </h5>
                <p className="text-gray-300 mb-4">
                  Working with the open source community to advance the security of Agentic AI and GenAI generally by contributing and authoring white papers, security frameworks, and best practices for the industry.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    Agentic AI Security
                  </span>
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    GenAI Security
                  </span>
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    Community Leadership
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
