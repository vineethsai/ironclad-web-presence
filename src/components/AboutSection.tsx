import React from 'react';
import { Database, Shield, Lock, Globe, Server, User, Award, Zap, BookOpen, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cyber-darker relative overflow-hidden">
      {/* Background grid lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
            About Me
            <div className="w-full h-1 bg-cyber-green absolute -bottom-2 left-0 right-0 transform translate-y-2"></div>
          </h2>
          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm Vineeth Sai Narajala, a Generative AI Security Engineer at Amazon Web Services, where I focus on developing security best practices for GenAI products. I specialize in AI/ML security, cloud security, and application security with a strong background in threat modeling and vulnerability assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-8 bg-cyber-dark/60 p-8 rounded-lg border border-cyber-green/10 hover:border-cyber-green/30 transition-all duration-300 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-cyber-green" />
              My Approach
            </h3>
            
            <div className="flex items-start space-x-4 group hover:bg-cyber-dark/80 p-4 rounded-lg transition-all duration-300">
              <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg group-hover:bg-cyber-green/20 transition-all duration-300">
                <Shield className="h-6 w-6 text-cyber-green" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyber-green transition-colors duration-300">Security by Design</h4>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  I believe in integrating security from the beginning of the development lifecycle, focusing on proactive measures rather than reactive solutions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group hover:bg-cyber-dark/80 p-4 rounded-lg transition-all duration-300">
              <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg group-hover:bg-cyber-green/20 transition-all duration-300">
                <Database className="h-6 w-6 text-cyber-green" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyber-green transition-colors duration-300">AI Security Expertise</h4>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Specialized in GenAI security, developing comprehensive standards for products like Amazon Q and Bedrock, including guardrails and prompt-injection protections.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group hover:bg-cyber-dark/80 p-4 rounded-lg transition-all duration-300">
              <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg group-hover:bg-cyber-green/20 transition-all duration-300">
                <User className="h-6 w-6 text-cyber-green" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyber-green transition-colors duration-300">Continuous Learning</h4>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  The security landscape is constantly evolving. I'm committed to staying updated with the latest threats, techniques, and best practices in cybersecurity.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group hover:bg-cyber-dark/80 p-4 rounded-lg transition-all duration-300">
              <div className="mt-1 bg-cyber-green/10 p-3 rounded-lg group-hover:bg-cyber-green/20 transition-all duration-300">
                <BookOpen className="h-6 w-6 text-cyber-green" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyber-green transition-colors duration-300">Research & Innovation</h4>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  I actively research emerging security challenges in AI systems and contribute to innovative solutions that address new threats in the rapidly evolving AI landscape.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-green/20 shadow-[0_0_15px_rgba(0,255,170,0.1)] hover:shadow-[0_0_25px_rgba(0,255,170,0.2)] transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyber-green/5 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-cyber-green" />
              Areas of Expertise
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="cyber-card p-6 bg-cyber-dark/80 border border-cyber-green/10 hover:border-cyber-green/30 hover:translate-y-[-3px] transition-all duration-300">
                <Lock className="h-10 w-10 text-cyber-green mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">AI/ML Security</h4>
                <p className="text-gray-300">
                  Developing security best practices for generative AI products, including guardrails, prompt-injection protections, and compute isolation.
                </p>
              </div>
              
              <div className="cyber-card p-6 bg-cyber-dark/80 border border-cyber-green/10 hover:border-cyber-green/30 hover:translate-y-[-3px] transition-all duration-300">
                <Server className="h-10 w-10 text-cyber-green mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Cloud Security</h4>
                <p className="text-gray-300">
                  Securing AWS infrastructure with expertise in IAM, access control, and vulnerability detection systems.
                </p>
              </div>
              
              <div className="cyber-card p-6 bg-cyber-dark/80 border border-cyber-green/10 hover:border-cyber-green/30 hover:translate-y-[-3px] transition-all duration-300">
                <Globe className="h-10 w-10 text-cyber-green mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Application Security</h4>
                <p className="text-gray-300">
                  Integrating security into CI/CD pipelines and conducting threat modeling and security testing for enterprise applications.
                </p>
              </div>
              
              <div className="cyber-card p-6 bg-cyber-dark/80 border border-cyber-green/10 hover:border-cyber-green/30 hover:translate-y-[-3px] transition-all duration-300">
                <Shield className="h-10 w-10 text-cyber-green mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Threat Intelligence</h4>
                <p className="text-gray-300">
                  Building and implementing threat intelligence platforms for advanced malware analysis and indicator of compromise tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call-to-action section */}
        <div className="mt-16 text-center">
          <div className="inline-block py-3 px-8 bg-cyber-green/10 rounded-full text-cyber-green border border-cyber-green/20 hover:bg-cyber-green/20 transition-all duration-300 max-w-xl mx-auto">
            <p className="text-lg">Interested in collaborating on AI security challenges? Let's connect!</p>
          </div>
          <div className="mt-6">
            <Link to="/contact" className="inline-flex items-center gap-2 py-2 px-6 bg-cyber-green text-cyber-dark font-medium rounded-md hover:bg-cyber-green/90 transition-all duration-300">
              Get in Touch
              <Zap className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="mb-2 animate-scroll-hint opacity-0">
          <ArrowDown className="h-4 w-4 text-cyber-green" />
        </div>
        <Link to="/skills" className="text-white hover:text-cyber-green transition-colors animate-bounce">
          <ArrowDown className="h-8 w-8" />
        </Link>
        <div className="mt-1 text-xs text-cyber-green font-mono opacity-70">scroll down</div>
      </div>
    </section>
  );
};

export default AboutSection;
