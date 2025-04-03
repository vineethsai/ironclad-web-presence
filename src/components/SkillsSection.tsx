
import React from 'react';
import { Progress } from '@/components/ui/progress';

const SkillsSection = () => {
  const securitySkills = [
    { name: 'Penetration Testing', level: 90 },
    { name: 'Vulnerability Assessment', level: 95 },
    { name: 'Incident Response', level: 85 },
    { name: 'Security Architecture', level: 80 },
    { name: 'Cloud Security', level: 85 }
  ];

  const technicalSkills = [
    { name: 'Python', level: 90 },
    { name: 'Bash Scripting', level: 85 },
    { name: 'Network Protocols', level: 90 },
    { name: 'Linux Systems', level: 95 },
    { name: 'Docker & Kubernetes', level: 80 }
  ];

  const certifications = [
    'Certified Information Systems Security Professional (CISSP)',
    'Certified Ethical Hacker (CEH)',
    'Offensive Security Certified Professional (OSCP)',
    'AWS Certified Security Specialty',
    'CompTIA Security+'
  ];

  return (
    <section id="skills" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-cyber-blue mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-blue/20">
            <h3 className="text-2xl font-bold text-white mb-6">Security Skills</h3>
            <div className="space-y-6">
              {securitySkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-200">{skill.name}</span>
                    <span className="text-cyber-blue">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 bg-cyber-grey-light" indicatorClassName="bg-cyber-blue" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-blue/20">
            <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-200">{skill.name}</span>
                    <span className="text-cyber-blue">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 bg-cyber-grey-light" indicatorClassName="bg-cyber-blue" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-blue/20">
            <h3 className="text-2xl font-bold text-white mb-6">Certifications</h3>
            <ul className="space-y-4">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-blue/20 border border-cyber-blue flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-blue"></div>
                  </div>
                  <span className="text-gray-200">{cert}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-cyber-blue/20">
              <h4 className="text-xl font-semibold text-white mb-4">Tools & Technologies</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Kali Linux</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Metasploit</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Wireshark</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Burp Suite</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Nmap</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">SIEM</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Splunk</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">AWS Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
