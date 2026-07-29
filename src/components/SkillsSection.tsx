import React, { Suspense, lazy } from 'react';
import { Zap, Code, Shield, Database, Server, CheckCircle, Award, Cpu, Activity, Radar } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, StaggerGroup, StaggerItem, SectionHeading } from '@/components/motion';
import { EASE } from '@/components/motion/easing';

const SkillsRadarChart = lazy(() => import('@/components/SkillsRadar'));

interface SkillBarProps {
  name: string;
  level: number;
  icon: React.ReactNode;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, icon }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="group hover:bg-cyber-dark/40 p-3 rounded-md transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {icon}
          <span className="text-gray-200 ml-2 group-hover:text-white transition-colors">{name}</span>
        </div>
        <span className="text-xs font-mono bg-cyber-grey px-2 py-1 rounded text-cyber-green">{level}%</span>
      </div>
      <div className="w-full bg-cyber-grey-light h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-green-muted via-cyber-green to-cyber-green-light rounded-full group-hover:shadow-glow-sm"
          initial={reduceMotion ? false : { width: 0 }}
          whileInView={reduceMotion ? undefined : { width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          style={reduceMotion ? { width: `${level}%` } : undefined}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const securitySkills = [
    { name: 'AI/ML Security', level: 95, icon: <Shield className="h-5 w-5 text-cyber-green" /> },
    { name: 'Threat Modeling', level: 90, icon: <Activity className="h-5 w-5 text-cyber-green" /> },
    { name: 'Vulnerability Assessment', level: 92, icon: <Zap className="h-5 w-5 text-cyber-green" /> },
    { name: 'Cloud Security', level: 88, icon: <Server className="h-5 w-5 text-cyber-green" /> },
    { name: 'Application Security', level: 85, icon: <Code className="h-5 w-5 text-cyber-green" /> }
  ];

  const technicalSkills = [
    { name: 'Python', level: 90, icon: <Code className="h-5 w-5 text-cyber-green" /> },
    { name: 'Java', level: 85, icon: <Code className="h-5 w-5 text-cyber-green" /> },
    { name: 'SQL', level: 88, icon: <Database className="h-5 w-5 text-cyber-green" /> },
    { name: 'Hadoop/Spark Security', level: 92, icon: <Cpu className="h-5 w-5 text-cyber-green" /> },
    { name: 'CI/CD Security', level: 85, icon: <Server className="h-5 w-5 text-cyber-green" /> }
  ];

  const certifications = [
    { name: 'AWS Certified Security Specialty', icon: <Award className="h-5 w-5 text-cyber-teal" /> },
    { name: 'GIAC Enterprise Penetration Tester (GPEN)', icon: <Shield className="h-5 w-5 text-cyber-teal" /> },
    { name: 'GIAC Cloud Penetration Tester (GCPN)', icon: <Shield className="h-5 w-5 text-cyber-teal" /> },
    { name: 'AWS Certified Solutions Architect', icon: <Server className="h-5 w-5 text-cyber-teal" /> },
    { name: 'CompTIA Security+', icon: <CheckCircle className="h-5 w-5 text-cyber-teal" /> }
  ];

  const tools = [
    'AWS Security', 'Generative AI', 'IAM', 'Hadoop', 'Spark', 'OWASP', 'Terraform', 'Malware Analysis',
  ];

  return (
    <section id="skills" className="py-20 bg-cyber-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="glow-blob w-[28rem] h-[28rem] top-10 -right-40" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading kicker="03 · Capabilities" title="Skills & Expertise" />

        <StaggerGroup className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <StaggerItem>
            <div className="glass-card h-full p-8 hover:border-cyber-green/30 hover:shadow-glow-sm transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Shield className="h-6 w-6 text-cyber-green mr-2" />
                <span>Security Skills</span>
              </h3>
              <div className="space-y-6">
                {securitySkills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-card h-full p-8 hover:border-cyber-green/30 hover:shadow-glow-sm transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Code className="h-6 w-6 text-cyber-green mr-2" />
                <span>Technical Skills</span>
              </h3>
              <div className="space-y-6">
                {technicalSkills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-card h-full p-8 hover:border-cyber-teal/30 hover:shadow-glow-sm transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="h-6 w-6 text-cyber-teal mr-2" />
                <span>Certifications</span>
              </h3>
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start p-2 hover:bg-cyber-dark/40 rounded-md transition-all duration-300">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {cert.icon}
                    </div>
                    <span className="text-gray-200">{cert.name}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Cpu className="h-5 w-5 text-cyber-teal mr-2" />
                  <span>Tools & Technologies</span>
                </h4>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 border rounded-full bg-cyber-green/10 border-cyber-green/30 text-cyber-green text-sm font-medium hover:scale-105 hover:bg-cyber-green/20 transition-all"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>

        {/* Security domain radar */}
        <Reveal className="mt-10" delay={0.1}>
          <div className="glass-card p-8 max-w-2xl mx-auto hover:border-cyber-green/30 hover:shadow-glow-sm transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
              <Radar className="h-6 w-6 text-cyber-green mr-2" />
              <span>Domain Proficiency</span>
            </h3>
            <p className="text-sm text-gray-400 text-center mb-4">Security expertise across key domains</p>
            <Suspense
              fallback={
                <div className="h-[340px] flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full border-2 border-cyber-green/30 border-t-cyber-green animate-spin" />
                </div>
              }
            >
              <SkillsRadarChart />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SkillsSection;
