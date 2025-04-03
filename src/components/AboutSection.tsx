
import React from 'react';
import { Database, Shield, Lock, Globe, Server, User } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cyber-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-cyber-blue mx-auto"></div>
          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
            I'm a passionate Cybersecurity Engineer with expertise in protecting digital assets and infrastructure.
            With a background in both offensive and defensive security measures, I help organizations safeguard their most valuable information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">My Approach</h3>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-cyber-blue/10 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Proactive Defense</h4>
                <p className="text-gray-300">
                  I believe in staying ahead of threats through continuous monitoring, vulnerability assessments, and security posture improvements.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-cyber-blue/10 p-3 rounded-lg">
                <Database className="h-6 w-6 text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Data-Driven Security</h4>
                <p className="text-gray-300">
                  Leveraging data analytics and threat intelligence to identify patterns and anticipate potential security breaches.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-cyber-blue/10 p-3 rounded-lg">
                <User className="h-6 w-6 text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Human-Centric</h4>
                <p className="text-gray-300">
                  Acknowledging that people are both the greatest vulnerability and the strongest defense in cybersecurity.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-blue/20">
            <h3 className="text-2xl font-bold text-white mb-6">Areas of Expertise</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="cyber-card p-6">
                <Lock className="h-10 w-10 text-cyber-blue mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Network Security</h4>
                <p className="text-gray-300">
                  Designing and implementing secure network architectures with proper segmentation and access controls.
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <Server className="h-10 w-10 text-cyber-blue mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Cloud Security</h4>
                <p className="text-gray-300">
                  Securing cloud infrastructure across AWS, Azure, and GCP environments with compliance best practices.
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <Globe className="h-10 w-10 text-cyber-blue mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Web Application Security</h4>
                <p className="text-gray-300">
                  Identifying vulnerabilities in web applications and implementing secure coding practices.
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <Shield className="h-10 w-10 text-cyber-blue mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Incident Response</h4>
                <p className="text-gray-300">
                  Preparing for, responding to, and recovering from security incidents with minimal impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
