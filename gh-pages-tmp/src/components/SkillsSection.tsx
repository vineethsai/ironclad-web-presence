import React from 'react';
import { Zap, Code, Shield, Database, Server, CheckCircle, Award, Cpu, Activity, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    { name: 'AWS Security', color: 'bg-cyber-green/20 border-cyber-green/40 text-cyber-green' },
    { name: 'Generative AI', color: 'bg-cyber-green/20 border-cyber-green/40 text-cyber-green' },
    { name: 'IAM', color: 'bg-cyber-green/20 border-cyber-green/40 text-cyber-green' },
    { name: 'Hadoop', color: 'bg-cyber-green/20 border-cyber-green/40 text-cyber-green' },
    { name: 'Spark', color: 'bg-cyber-green/20 border-cyber-green/40 text-cyber-green' },
    { name: 'OWASP', color: 'bg-cyber-green/20 border-cyber-green/40 text-cyber-green' },
    { name: 'Terraform', color: 'bg-cyber-teal/20 border-cyber-teal/40 text-cyber-teal' },
    { name: 'Malware Analysis', color: 'bg-cyber-teal/20 border-cyber-teal/40 text-cyber-teal' },
  ];

  return (
    <section id="skills" className="py-20 bg-cyber-darker relative overflow-hidden">
      {/* Background grid lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
          <div className="h-1 w-20 bg-cyber-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-8 border border-cyber-green/20 shadow-lg hover:shadow-cyber-green/5 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Shield className="h-6 w-6 text-cyber-green mr-2" />
              <span>Security Skills</span>
            </h3>
            <div className="space-y-6">
              {securitySkills.map((skill, index) => (
                <div key={index} className="group hover:bg-cyber-dark/40 p-3 rounded-md transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      {skill.icon}
                      <span className="text-gray-200 ml-2 group-hover:text-white transition-colors">{skill.name}</span>
                    </div>
                    <span className="text-xs font-mono bg-cyber-grey px-2 py-1 rounded text-cyber-green">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-cyber-grey-light h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyber-green to-cyber-green/70 rounded-full transition-all duration-500 group-hover:shadow-glow-sm"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-8 border border-cyber-green/20 shadow-lg hover:shadow-cyber-green/5 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Code className="h-6 w-6 text-cyber-green mr-2" />
              <span>Technical Skills</span>
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="group hover:bg-cyber-dark/40 p-3 rounded-md transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      {skill.icon}
                      <span className="text-gray-200 ml-2 group-hover:text-white transition-colors">{skill.name}</span>
                    </div>
                    <span className="text-xs font-mono bg-cyber-grey px-2 py-1 rounded text-cyber-green">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-cyber-grey-light h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyber-green to-cyber-green/70 rounded-full transition-all duration-500 group-hover:shadow-glow-sm"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-8 border border-teal-500/20 shadow-lg hover:shadow-teal-500/5 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="h-6 w-6 text-teal-400 mr-2" />
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

            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Cpu className="h-5 w-5 text-teal-400 mr-2" />
                <span>Tools & Technologies</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1 border rounded-full ${tool.color} text-sm font-medium hover:scale-105 transition-transform`}
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="mb-2 animate-scroll-hint opacity-0">
          <ArrowDown className="h-4 w-4 text-cyber-green" />
        </div>
        <Link to="/experience" className="text-white hover:text-cyber-green transition-colors animate-bounce">
          <ArrowDown className="h-8 w-8" />
        </Link>
        <div className="mt-1 text-xs text-cyber-green font-mono opacity-70">scroll down</div>
      </div>
    </section>
  );
};

export default SkillsSection;

