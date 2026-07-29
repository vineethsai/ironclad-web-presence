import React from 'react';
import { Award, Briefcase, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, StaggerGroup, StaggerItem, SectionHeading, SpotlightCard } from '@/components/motion';

const leadership = [
  {
    title: 'Co Leader and Founding Member of AIVSS',
    period: 'Jun 2025 - Present',
    org: 'OWASP AIVSS Project ↗',
    link: 'https://aivss.owasp.org/',
    description:
      'AI Vulnerability Scoring System and Agentic AI Top 10 - Leading the development of comprehensive vulnerability scoring methodologies specifically designed for AI systems, including agentic AI applications.',
    skills: ['AI Security', 'Vulnerability Assessment', 'Open Source Leadership'],
  },
  {
    title: 'Co Lead for Agentic Application Security',
    period: 'Mar 2025 - Present',
    org: 'OWASP GenAI Project - Agentic Security Initiative (ASI) ↗',
    link: 'http://genai.owasp.org/',
    description:
      'Working with the open source community to advance the security of Agentic AI and GenAI generally by contributing and authoring white papers, security frameworks, and best practices for the industry.',
    skills: ['Agentic AI Security', 'GenAI Security', 'Community Leadership'],
  },
];

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
      <div className="absolute inset-0 bg-grid" />
      <div className="glow-blob w-[30rem] h-[30rem] bottom-0 -right-40" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading kicker="02 · Career" title="Current Role & Leadership" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <Reveal className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Current Role</h3>
            </Reveal>

            <Reveal delay={0.1}>
              <SpotlightCard className="cyber-card p-6 bg-cyber-grey/80">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">{currentRole.title}</h4>
                  <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm border border-cyber-green/20">
                    {currentRole.period}
                  </span>
                </div>
                <h5 className="text-lg text-cyber-green mb-4">{currentRole.company}</h5>

                <div dangerouslySetInnerHTML={{ __html: currentRole.description }} className="text-gray-300 mt-4" />
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentRole.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm transition-colors hover:bg-cyber-green/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal className="mt-8" delay={0.15}>
              <Link
                to="/experience"
                className="inline-flex items-center px-6 py-3 bg-cyber-green/10 border border-cyber-green/30 rounded-lg text-cyber-green hover:bg-cyber-green/20 hover:border-cyber-green/60 hover:shadow-glow-sm transition-all duration-300 group"
              >
                <span>View Full Experience</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>

          <div>
            <Reveal className="flex items-center mb-8" delay={0.05}>
              <Shield className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Leadership</h3>
            </Reveal>

            <StaggerGroup className="space-y-6">
              {leadership.map((role) => (
                <StaggerItem key={role.title}>
                  <SpotlightCard className="cyber-card p-6 bg-cyber-grey/80">
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold text-white">{role.title}</h4>
                      <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm border border-cyber-green/20">
                        {role.period}
                      </span>
                    </div>
                    <h5 className="text-lg text-cyber-green mb-3">
                      <a
                        href={role.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyber-green-light transition-colors"
                      >
                        {role.org}
                      </a>
                    </h5>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{role.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm transition-colors hover:bg-cyber-green/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
