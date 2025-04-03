
import React from 'react';
import { Calendar, Award, Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const workExperience = [
    {
      title: 'Senior Cybersecurity Engineer',
      company: 'SecureTech Solutions',
      period: '2021 - Present',
      description: 'Leading security assessments, penetration testing, and implementing comprehensive security frameworks for enterprise clients. Developed automated threat detection systems reducing incident response time by 60%.'
    },
    {
      title: 'Security Consultant',
      company: 'CyberDefense Corp',
      period: '2018 - 2021',
      description: 'Conducted vulnerability assessments and penetration tests for clients across finance, healthcare, and government sectors. Implemented security solutions that improved clients\' security posture by an average of 75%.'
    },
    {
      title: 'Network Security Specialist',
      company: 'DataGuard Systems',
      period: '2016 - 2018',
      description: 'Managed network security infrastructure including firewalls, IDS/IPS, and VPN solutions. Led the implementation of zero-trust architecture, reducing security incidents by 40%.'
    }
  ];

  const projects = [
    {
      title: 'Enterprise Security Framework',
      description: 'Designed and implemented a comprehensive security framework for a Fortune 500 company, including threat modeling, security controls, and compliance measures.',
      technologies: ['Risk Assessment', 'NIST Framework', 'Compliance']
    },
    {
      title: 'Cloud Security Migration',
      description: 'Led the security aspects of a major cloud migration project, ensuring secure configuration and implementation of cloud-native security controls.',
      technologies: ['AWS Security', 'Azure Sentinel', 'IAM']
    },
    {
      title: 'Advanced Threat Detection System',
      description: 'Developed a machine learning-based threat detection system that identifies anomalous behavior and potential security incidents in real-time.',
      technologies: ['Python', 'Machine Learning', 'SIEM Integration']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-cyber-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience & Projects</h2>
          <div className="w-20 h-1 bg-cyber-blue mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-cyber-blue mr-3" />
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:w-0.5 before:bg-cyber-blue/30">
              {workExperience.map((job, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-cyber-dark border-4 border-cyber-blue flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-cyber-blue" />
                  </div>
                  
                  <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-blue/20">
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold text-white">{job.title}</h4>
                      <span className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue rounded text-sm">
                        {job.period}
                      </span>
                    </div>
                    <h5 className="text-lg text-cyber-blue mb-4">{job.company}</h5>
                    <p className="text-gray-300">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-8">
              <Award className="h-6 w-6 text-cyber-blue mr-3" />
              <h3 className="text-2xl font-bold text-white">Notable Projects</h3>
            </div>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-cyber-grey p-6 rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300">
                  <h4 className="text-xl font-semibold text-white mb-3">{project.title}</h4>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-cyber-grey p-6 rounded-lg border border-cyber-blue/20">
              <h4 className="text-xl font-semibold text-white mb-4">Industry Recognition</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-blue/20 border border-cyber-blue flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-blue"></div>
                  </div>
                  <span className="text-gray-300">Speaker at International Cybersecurity Conference 2023</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-blue/20 border border-cyber-blue flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-blue"></div>
                  </div>
                  <span className="text-gray-300">Published research on emerging threats in cloud environments</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-blue/20 border border-cyber-blue flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-blue"></div>
                  </div>
                  <span className="text-gray-300">Contributor to open-source security tools and frameworks</span>
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
