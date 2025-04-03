
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
            I'm Vineeth Sai, a Cybersecurity Engineer with expertise in protecting digital assets and infrastructure.
            Currently working at Amazon on the AWS incident detection team automating security detection and response.
            I have a strong background in software security engineering, cloud security, and application security.
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
                <h4 className="text-xl font-semibold text-white mb-2">Security by Design</h4>
                <p className="text-gray-300">
                  I believe in integrating security from the beginning of the development lifecycle, focusing on proactive measures rather than reactive solutions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-cyber-blue/10 p-3 rounded-lg">
                <Database className="h-6 w-6 text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Automation-First</h4>
                <p className="text-gray-300">
                  Leveraging automation to enhance security operations, reduce human error, and scale security practices across complex infrastructures.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-cyber-blue/10 p-3 rounded-lg">
                <User className="h-6 w-6 text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Continuous Learning</h4>
                <p className="text-gray-300">
                  The security landscape is constantly evolving. I'm committed to staying updated with the latest threats, techniques, and best practices.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-blue/20">
            <h3 className="text-2xl font-bold text-white mb-6">Areas of Expertise</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="cyber-card p-6">
                <Lock className="h-10 w-10 text-cyber-blue mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Application Security</h4>
                <p className="text-gray-300">
                  Implementing secure coding practices, vulnerability assessment, and remediation for web and mobile applications.
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <Server className="h-10 w-10 text-cyber-blue mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Cloud Security</h4>
                <p className="text-gray-300">
                  Securing AWS infrastructure with expertise in IAM, S3, Lambda, and other core services using security best practices.
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <Globe className="h-10 w-10 text-cyber-blue mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Security Automation</h4>
                <p className="text-gray-300">
                  Building automated security detection and response systems to identify and mitigate threats at scale.
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <Shield className="h-10 w-10 text-cyber-blue mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">DevSecOps</h4>
                <p className="text-gray-300">
                  Integrating security into CI/CD pipelines and development workflows to ensure continuous security validation.
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
