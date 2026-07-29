import React from 'react';
import { Shield, Lock, Globe, Server, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, StaggerGroup, StaggerItem, SectionHeading, SpotlightCard, TiltCard, MagneticButton } from '@/components/motion';

const expertise = [
  {
    icon: Lock,
    title: 'AI/ML Security',
    description:
      'Developing security best practices for generative AI products, including guardrails, prompt-injection protections, and compute isolation.',
  },
  {
    icon: Server,
    title: 'Cloud Security',
    description:
      'Securing AWS infrastructure with expertise in IAM, access control, and vulnerability detection systems.',
  },
  {
    icon: Globe,
    title: 'Application Security',
    description:
      'Integrating security into CI/CD pipelines and conducting threat modeling and security testing for enterprise applications.',
  },
  {
    icon: Shield,
    title: 'Threat Intelligence',
    description:
      'Building and implementing threat intelligence platforms for advanced malware analysis and indicator of compromise tracking.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cyber-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="glow-blob w-[30rem] h-[30rem] top-0 -left-40" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          kicker="01 · Who I Am"
          title="About Me"
          subtitle="Vineeth Sai Narajala is a highly skilled security researcher and technical leader with specialized expertise in AI/ML security, agentic AI systems, cloud security, and application security. Currently serving as Senior Technical Leader - AI Security Researcher at Cisco, he leads research and development of AI security frameworks and zero-trust protocols for multi-agent systems. Previously a Senior Security Engineer at Meta and Senior Generative AI Security Engineer at Amazon Web Services, Vineeth has pioneered GenAI security practices and standards across the industry. With extensive experience conducting comprehensive security assessments, threat modeling autonomous AI systems, and developing zero-trust identity frameworks for agentic AI, he has contributed to 15+ publications including OWASP white papers on AI security and led development of OWASP's AI Vulnerability Scoring System (AIVSS) and Multi-Agentic System Threat Modeling Guide. His diverse skill set encompasses agentic AI threat modeling, LLM security, vulnerability assessment, IAM, secure AI deployments, and malware analysis."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <Reveal>
            <TiltCard maxTilt={5}>
              <div className="glass-card p-3 shadow-glow-sm">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/conference.jpg"
                    alt="Vineeth Sai Narajala"
                    className="w-full h-auto rounded-lg transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-cyber-green" />
                Areas of Expertise
              </h3>
            </Reveal>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {expertise.map((area) => (
                <StaggerItem key={area.title}>
                  <SpotlightCard className="cyber-card h-full p-6 bg-cyber-dark/80 border-cyber-green/10">
                    <area.icon className="h-10 w-10 text-cyber-green mb-4 transition-transform duration-300 group-hover/spotlight:scale-110" />
                    <h4 className="text-xl font-semibold text-white mb-2">{area.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{area.description}</p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>

        {/* Call-to-action section */}
        <Reveal className="mt-16 text-center" delay={0.1}>
          <div className="inline-block py-3 px-8 bg-cyber-green/10 rounded-full text-cyber-green border border-cyber-green/20 hover:bg-cyber-green/20 transition-all duration-300 max-w-xl mx-auto">
            <p className="text-lg">Interested in collaborating on AI security challenges? Let's connect!</p>
          </div>
          <div className="mt-6">
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 py-2.5 px-7 bg-cyber-green text-cyber-dark font-medium rounded-md hover:bg-cyber-green-light hover:shadow-glow transition-all duration-300"
              >
                Get in Touch
                <Zap className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
