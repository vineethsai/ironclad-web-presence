
import React from 'react';
import { Calendar, Award, Briefcase } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

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
      description: 'Conducted threat modeling, design reviews, and security testing for over 150 new feature launches for AWS Analytics and Big Data Services. Led security reviews for major AWS Spark launches including Glue 5, FGAC in Spark and Athena, and launched projects at re:Invent. Architected complex access models (RBAC, ABAC) for AWS services. Built automated vulnerability detection systems, identifying and remediating over 350 security findings.'
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
      description: 'Led security reviews for major AWS Spark features, implementing complex access models (RBAC, ABAC) for AWS Analytics and Big Data Services. These systems are used by DOD and US Government as part of the $10 billion NSA contract award.',
      technologies: ['Hadoop Security', 'Spark', 'IAM', 'Lake Formation']
    },
    {
      title: 'Vulnerability Detection System',
      description: 'Built automated systems to detect vulnerabilities such as overly permissive security groups, insecure IAM policies, and internet-facing applications.',
      technologies: ['Python', 'Cloud Security', 'AWS', 'Automation']
    }
  ];

  // Create refs for the experience sections with animation triggers
  const [workRef, workInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [eduRef, eduInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 bg-cyber-darker overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal-animation">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience & Education</h2>
          <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-cyber-green mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
            </div>

            <div ref={workRef} className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:w-0.5 before:bg-cyber-green/30">
              {workExperience.map((job, index) => (
                <div 
                  key={index} 
                  className={`relative pl-10 transition-all duration-700 ${
                    workInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute left-0 top-1 h-8 w-8 rounded-full bg-cyber-dark border-4 border-cyber-green flex items-center justify-center transition-all duration-500 ${
                    workInView ? 'scale-100' : 'scale-0'
                  }`} style={{ transitionDelay: `${index * 300}ms` }}>
                    <Calendar className="h-4 w-4 text-cyber-green" />
                  </div>
                  
                  <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/60 hover:shadow-lg hover:shadow-cyber-green/20 transition-all duration-300 transform hover:-translate-y-1">
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
              <Award className="h-6 w-6 text-cyber-green mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            <div ref={eduRef} className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:w-0.5 before:bg-cyber-green/30">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className={`relative pl-10 transition-all duration-700 ${
                    eduInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className={`absolute left-0 top-1 h-8 w-8 rounded-full bg-cyber-dark border-4 border-cyber-green flex items-center justify-center transition-all duration-500 ${
                    eduInView ? 'scale-100' : 'scale-0'
                  }`}>
                    <Calendar className="h-4 w-4 text-cyber-green" />
                  </div>
                  
                  <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/60 hover:shadow-lg hover:shadow-cyber-green/20 transition-all duration-300 transform hover:-translate-y-1">
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
              <Award className="h-6 w-6 text-cyber-green mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-white">Notable Projects</h3>
            </div>

            <div ref={projectsRef} className="space-y-6">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className={`bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyber-green/20 ${
                    projectsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <h4 className="text-xl font-semibold text-white mb-3">{project.title}</h4>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={`px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm transition-all ${
                          projectsInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`}
                        style={{ transitionDelay: `${(index * 200) + (techIndex * 100)}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-10 bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 transition-all duration-700 ${
              projectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '800ms' }}>
              <h4 className="text-xl font-semibold text-white mb-4">Skills & Expertise</h4>
              <ul className="space-y-3">
                {[
                  'Threat Modeling & Vulnerability Assessment',
                  'AI/ML & Generative AI Security',
                  'Cloud & Application Security',
                  'Python, Java, SQL, Hadoop Security',
                  'CI/CD Security Integrations',
                  'OWASP, Cryptography, Penetration Testing'
                ].map((skill, index) => (
                  <li 
                    key={index} 
                    className={`flex items-start transition-all duration-500 ${
                      projectsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                    style={{ transitionDelay: `${900 + (index * 150)}ms` }}
                  >
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyber-green/20 border border-cyber-green flex items-center justify-center mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-cyber-green"></div>
                    </div>
                    <span className="text-gray-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
