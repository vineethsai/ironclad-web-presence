
import React from 'react';
import { Calendar, Award, Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const workExperience = [
    {
      title: 'Software Development Engineer - Security',
      company: 'Amazon',
      period: 'Feb 2023 - Present',
      description: 'Working on the AWS incident detection team automating security detection and response. Building security tooling in Python and Java, focusing on AWS services like Lambda, S3, SNS, SQS, IAM.'
    },
    {
      title: 'Security Engineer',
      company: 'Verizon Media',
      period: 'Jul 2021 - Feb 2023',
      description: 'Built security features for Media Platform servicing Yahoo products. Worked on implementing authorization service, code hardening, and application vulnerability remediation. Designed and deployed security scans with ServiceNow.'
    },
    {
      title: 'Software Security Engineer',
      company: 'The Home Depot',
      period: 'Jul 2019 - Jul 2021',
      description: 'Led security architecture for various Home Depot applications. Implemented secure coding practices, SAST/DAST testing, and vulnerability remediation. Integrated security scanning into CI/CD pipelines and optimized IDE security plugins.'
    }
  ];

  const education = [
    {
      institution: 'Georgia Institute of Technology',
      degree: 'Master of Science in Cybersecurity',
      period: '2019 - 2022',
      description: 'Focused on information security principles, network security, and secure system design. Completed thesis on cloud security frameworks.'
    },
    {
      institution: 'Vellore Institute of Technology',
      degree: 'Bachelor of Technology in Computer Science',
      period: '2015 - 2019',
      description: 'Core coursework in computer science with a focus on information security. Participated in multiple cybersecurity competitions and hackathons.'
    }
  ];

  const projects = [
    {
      title: 'AWS Security Automation',
      description: 'Designed and implemented automated security detection and response systems for AWS infrastructure, reducing incident response time by 60%.',
      technologies: ['Python', 'AWS Lambda', 'IAM', 'CloudFormation']
    },
    {
      title: 'Auth Service Implementation',
      description: 'Built a scalable authorization service for Yahoo Media Platform to ensure secure access control across multiple products.',
      technologies: ['Java', 'Spring Boot', 'OAuth 2.0', 'RBAC']
    },
    {
      title: 'Security Pipeline Integration',
      description: 'Integrated security scanning tools into CI/CD pipelines at Home Depot, improving vulnerability detection and remediation efficiency.',
      technologies: ['Jenkins', 'SonarQube', 'OWASP ZAP', 'Docker']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-cyber-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience & Education</h2>
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

            <div className="flex items-center mt-12 mb-8">
              <Award className="h-6 w-6 text-cyber-blue mr-3" />
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:w-0.5 before:bg-cyber-blue/30">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-cyber-dark border-4 border-cyber-blue flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-cyber-blue" />
                  </div>
                  
                  <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-blue/20">
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                      <span className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue rounded text-sm">
                        {edu.period}
                      </span>
                    </div>
                    <h5 className="text-lg text-cyber-blue mb-4">{edu.institution}</h5>
                    <p className="text-gray-300">{edu.description}</p>
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
                  <span className="text-gray-300">AWS Certified Security - Specialty</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-blue/20 border border-cyber-blue flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-blue"></div>
                  </div>
                  <span className="text-gray-300">Certified Ethical Hacker (CEH)</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-blue/20 border border-cyber-blue flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 rounded-full bg-cyber-blue"></div>
                  </div>
                  <span className="text-gray-300">AWS Certified Cloud Practitioner</span>
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
