
import React from 'react';
import { Database, Shield, Lock, Globe, Server, User } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cyber-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
            I'm Vineeth Sai Narajala, a Generative AI Security Engineer at Amazon Web Services, where I focus on developing security best practices for GenAI products. I specialize in AI/ML security, cloud security, and application security with a strong background in threat modeling and vulnerability assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">My Approach</h3>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-cyber-green" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Security by Design</h4>
                <p className="text-gray-300">
                  I believe in integrating security from the beginning of the development lifecycle, focusing on proactive measures rather than reactive solutions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg">
                <Database className="h-6 w-6 text-cyber-green" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">AI Security Expertise</h4>
                <p className="text-gray-300">
                  Specialized in GenAI security, developing comprehensive standards for products like Amazon Q and Bedrock, including guardrails and prompt-injection protections.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg">
                <User className="h-6 w-6 text-cyber-green" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Continuous Learning</h4>
                <p className="text-gray-300">
                  The security landscape is constantly evolving. I'm committed to staying updated with the latest threats, techniques, and best practices in cybersecurity.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-green/20">
            <h3 className="text-2xl font-bold text-white mb-6">Areas of Expertise</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="cyber-card p-6">
                <Lock className="h-10 w-10 text-cyber-green mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">AI/ML Security</h4>
                <p className="text-gray-300">
                  Developing security best practices for generative AI products, including guardrails, prompt-injection protections, and compute isolation.
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <Server className="h-10 w-10 text-cyber-green mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Cloud Security</h4>
                <p className="text-gray-300">
                  Securing AWS infrastructure with expertise in IAM, access control, and vulnerability detection systems.
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <Globe className="h-10 w-10 text-cyber-green mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Application Security</h4>
                <p className="text-gray-300">
                  Integrating security into CI/CD pipelines and conducting threat modeling and security testing for enterprise applications.
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <Shield className="h-10 w-10 text-cyber-green mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Threat Intelligence</h4>
                <p className="text-gray-300">
                  Building and implementing threat intelligence platforms for advanced malware analysis and indicator of compromise tracking.
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
