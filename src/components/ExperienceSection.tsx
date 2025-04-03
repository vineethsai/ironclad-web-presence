
import React from 'react';
import { Calendar, Award, Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const workExperience = [
    {
      title: 'Generative AI Security Engineer',
      company: 'Amazon Web Services',
      period: 'June 2024 - Present',
      description: 'Pioneered development of security best practices for Amazon\'s flagship GenAI products (Amazon Q and Bedrock). Created efficient security-compliant Golden Paths, reducing launch timelines from 3 weeks to less than 1 week. Enhanced security for Natural Language to SQL features and led security assessments for Open-Source AI model integrations.'
    },
    {
      title: 'Application Security Engineer',
      company: 'Amazon Web Services',
      period: 'Nov 2021 - June 2024',
      description: 'Conducted threat modeling, design reviews, and security testing for over 150 new feature launches for AWS Analytics and Big Data Services. Led security reviews for major AWS Spark launches. Built automated systems to detect vulnerabilities, resulting in the identification and remediation of over 350 true security findings.'
    },
    {
      title: 'Security Engineer',
      company: 'Nordstrom',
      period: 'Jan 2020 - Nov 2021',
      description: 'Integrated security tools into CI/CD pipelines including static/dynamic code analysis and dependency scanning. Deployed a comprehensive Threat Intelligence platform using MISP and Cuckoo Sandbox. Implemented infrastructure-as-code solutions for data protection and loss prevention.'
    }
  ];

  const education = [
    {
      institution: 'University of Washington',
      degree: 'Bachelor of Science - Informatics Cybersecurity',
      period: '2016 - 2020',
      description: 'Focused on cybersecurity principles, network security, and secure system design.'
    }
  ];

  const projects = [
    {
      title: 'GenAI Security Framework',
      description: 'Developed comprehensive security standards for Amazon\'s GenAI products including guardrails, prompt-injection protections, compute isolation, and session management.',
      technologies: ['AI/ML Security', 'Python', 'Prompt Engineering', 'Security Analysis']
    },
    {
      title: 'AWS Analytics Security',
      description: 'Led security reviews for major AWS Spark features, implementing complex access models (RBAC, ABAC) for AWS Analytics and Big Data Services.',
      technologies: ['Hadoop Security', 'Spark', 'IAM', 'Lake Formation']
    },
    {
      title: 'Vulnerability Detection System',
      description: 'Built automated systems to detect vulnerabilities such as overly permissive security groups, insecure IAM policies, and internet-facing applications.',
      technologies: ['Python', 'Cloud Security', 'AWS', 'Automation']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-cyber-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience & Education</h2>
          <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:w-0.5 before:bg-cyber-green/30">
              {workExperience.map((job, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-cyber-dark border-4 border-cyber-green flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-cyber-green" />
                  </div>
                  
                  <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20">
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold text-white">{job.title}</h4>
                      <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                        {job.period}
                      </span>
                    </div>
                    <h5 className="text-lg text-cyber-green mb-4">{job.company}</h5>
                    <p className="text-gray-300">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center mt-12 mb-8">
              <Award className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:w-0.5 before:bg-cyber-green/30">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-cyber-dark border-4 border-cyber-green flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-cyber-green" />
                  </div>
                  
                  <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20">
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                      <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                        {edu.period}
                      </span>
                    </div>
                    <h5 className="text-lg text-cyber-green mb-4">{edu.institution}</h5>
                    <p className="text-gray-300">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-8">
              <Award className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Notable Projects</h3>
            </div>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                  <h4 className="text-xl font-semibold text-white mb-3">{project.title}</h4>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-cyber-grey p-6 rounded-lg border border-cyber-green/20">
              <h4 className="text-xl font-semibold text-white mb-4">Skills & Expertise</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                  </div>
                  <span className="text-gray-300">Threat Modeling & Vulnerability Assessment</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                  </div>
                  <span className="text-gray-300">AI/ML & Generative AI Security</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                  </div>
                  <span className="text-gray-300">Cloud & Application Security</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                  </div>
                  <span className="text-gray-300">Python, Java, SQL, Hadoop Security</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                  </div>
                  <span className="text-gray-300">CI/CD Security Integrations</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                  </div>
                  <span className="text-gray-300">OWASP, Cryptography, Penetration Testing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
