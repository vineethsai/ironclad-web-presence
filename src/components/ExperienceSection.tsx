import React from 'react';
import { Award, Briefcase, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, StaggerGroup, StaggerItem, SectionHeading, SpotlightCard } from '@/components/motion';
import { workExperience, leadership } from '@/content/experience';


const ExperienceSection = () => {
  const currentRole = workExperience[0];

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

                <ul className="text-gray-300 mt-4 space-y-2 list-disc pl-5 marker:text-cyber-green/70">
                  {currentRole.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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
                        {role.org} ↗
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
