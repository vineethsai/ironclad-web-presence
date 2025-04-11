import React from 'react';
import { Calendar, Award, Briefcase, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExperienceSection = () => {
  const workExperience = [
    {
      title: 'Generative AI Security Engineer',
      company: 'Amazon Web Services',
      period: 'June 2024 - Present',
      location: 'New York, United States',
      description: `
        <ul>
          <li>Pioneered the development of comprehensive GenAI security best practices and standards for Amazon's flagship products (Amazon Q and Bedrock), including guardrails, prompt-injection protections, compute isolation, and session management, and implemented mechanisms to enforce them across the organization.</li>
          <li>Accelerated GenAI feature integration, reducing launch timelines from 3 weeks to less than 1 week by creating efficient, security-compliant Golden Paths for various integrations.</li>
          <li>Enhanced security for key features like Amazon QuickSight's Natural Language to SQL editor, reinforcing data protection and query integrity.</li>
          <li>Led security assessments for AI model integrations across the AWS ecosystem, ensuring strict adherence to security standards, and spearheaded developer training initiatives, improving team-wide awareness and expertise in secure AI integration.</li>
        </ul>
      `,
      skills: ['AI', 'Threat Modeling', 'Security Assessment', 'Design Review']
    },
    {
      title: 'Application Security Engineer',
      company: 'Amazon Web Services',
      period: 'Nov 2021 - June 2024',
      description: 'Conducted threat modeling, design reviews, and security testing for over 150 new feature launches for AWS Analytics and Big Data Services. Led security reviews for major AWS Spark launches including Glue 5, FGAC in Spark and Athena, and launched projects at re:Invent. Architected complex access models (RBAC, ABAC) for AWS services. Built automated vulnerability detection systems, identifying and remediating over 350 security findings.',
      skills: ['Threat Modeling', 'AWS', 'Security Testing']
    },
    {
      title: 'Security Engineer',
      company: 'Nordstrom',
      period: 'Jan 2020 - Nov 2021',
      description: 'Integrated security tools into CI/CD pipelines including static/dynamic code analysis and dependency scanning. Deployed a comprehensive Threat Intelligence platform using MISP and Cuckoo Sandbox. Implemented infrastructure-as-code solutions for data protection and loss prevention.',
      skills: ['CI/CD Security', 'Threat Intelligence', 'Infrastructure as Code']
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

  return (
    <section id="experience" className="py-20 bg-cyber-darker relative overflow-hidden">
      {/* Background grid lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
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
                    <div dangerouslySetInnerHTML={{ __html: job.description }} className="text-gray-300" />
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
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
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="mb-2 animate-scroll-hint opacity-0">
          <ArrowDown className="h-4 w-4 text-cyber-green" />
        </div>
        <Link to="/open-source" className="text-white hover:text-cyber-green transition-colors animate-bounce">
          <ArrowDown className="h-8 w-8" />
        </Link>
        <div className="mt-1 text-xs text-cyber-green font-mono opacity-70">scroll down</div>
      </div>
    </section>
  );
};

export default ExperienceSection;
