
import React, { useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { useInView } from 'react-intersection-observer';

const SkillsSection = () => {
  const securitySkills = [
    { name: 'AI/ML Security', level: 95 },
    { name: 'Threat Modeling', level: 90 },
    { name: 'Vulnerability Assessment', level: 92 },
    { name: 'Cloud Security', level: 88 },
    { name: 'Application Security', level: 85 }
  ];

  const technicalSkills = [
    { name: 'Python', level: 90 },
    { name: 'Java', level: 85 },
    { name: 'SQL', level: 88 },
    { name: 'Hadoop/Spark Security', level: 92 },
    { name: 'CI/CD Security', level: 85 }
  ];

  const certifications = [
    'AWS Certified Security Specialty',
    'Certified Ethical Hacker (CEH)',
    'Offensive Security Certified Professional (OSCP)',
    'AWS Certified Solutions Architect',
    'CompTIA Security+'
  ];
  
  // Create refs for the skill sections with animation triggers
  const [securityRef, securityInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [technicalRef, technicalInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [certRef, certInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20 bg-cyber-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal-animation">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div 
            ref={securityRef}
            className={`bg-cyber-grey rounded-lg p-8 border border-cyber-green/20 transition-all duration-700 ${
              securityInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Security Skills</h3>
            <div className="space-y-6">
              {securitySkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-200">{skill.name}</span>
                    <span className="text-cyber-green">{securityInView ? skill.level : 0}%</span>
                  </div>
                  <Progress 
                    value={securityInView ? skill.level : 0} 
                    className="h-2 bg-cyber-grey-light"
                    style={{
                      transition: `width ${0.6 + index * 0.3}s ease-out`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div 
            ref={technicalRef}
            className={`bg-cyber-grey rounded-lg p-8 border border-cyber-green/20 transition-all duration-700 delay-150 ${
              technicalInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-200">{skill.name}</span>
                    <span className="text-cyber-green">{technicalInView ? skill.level : 0}%</span>
                  </div>
                  <Progress 
                    value={technicalInView ? skill.level : 0} 
                    className="h-2 bg-cyber-grey-light"
                    style={{
                      transition: `width ${0.6 + index * 0.3}s ease-out`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div 
            ref={certRef}
            className={`bg-cyber-grey rounded-lg p-8 border border-cyber-green/20 transition-all duration-700 delay-300 ${
              certInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Certifications</h3>
            <ul className="space-y-4">
              {certifications.map((cert, index) => (
                <li key={index} className={`flex items-start transition-all ${
                  certInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`} style={{transitionDelay: `${index * 200}ms`}}>
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                  </div>
                  <span className="text-gray-200">{cert}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-cyber-green/20">
              <h4 className="text-xl font-semibold text-white mb-4">Tools & Technologies</h4>
              <div className="flex flex-wrap gap-3">
                {['AWS Security', 'Generative AI', 'IAM', 'Hadoop', 'Spark', 'OWASP', 'Terraform', 'Malware Analysis'].map((tech, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green transition-all duration-500 ${
                      certInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`} 
                    style={{transitionDelay: `${index * 120}ms`}}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
