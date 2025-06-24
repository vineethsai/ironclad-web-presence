import React, { useState } from 'react';
import { Calendar, Award, Briefcase, ArrowDown, CheckCircle, Shield, Server, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExperienceSection = () => {
  const [expandedJobs, setExpandedJobs] = useState({
    0: true, // First job expanded by default
  });

  const [expandedEducation, setExpandedEducation] = useState({
    0: false, // Education collapsed by default
  });

  const toggleJob = (index) => {
    setExpandedJobs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleEducation = (index) => {
    setExpandedEducation(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
      location: 'New York, United States',
      description: 'Conducted threat modeling, design reviews, and security testing for over 150 new feature launches for AWS Analytics and Big Data Services. Led security reviews for major AWS Spark launches including Glue 5, FGAC in Spark and Athena, and launched projects at re:Invent. Architected complex access models (RBAC, ABAC) for AWS services. Built automated vulnerability detection systems, identifying and remediating over 350 security findings.',
      skills: ['Threat Modeling', 'AWS', 'Security Testing']
    },
    {
      title: 'DevSecOps Security Engineer',
      company: 'Nordstrom',
      period: 'Aug 2021 - Nov 2021',
      location: 'Seattle, United States',
      description: '1) Improve Business Continuity and Disaster Recovery solutions at Nordstrom by creating an infrastructure-as-code solution for data protection and data loss.\n2) Enhance protection against permanent data loss, corruption, seizure, or ransom by Isolating and reducing permissions surface area on both short-term and long-term storage.\n3) Configure and deploy object lock policies to enable WORM protection with legal and compliance requirements in mind. \n4) Implement least-privilege permissions controls to manage backups and configuration.',
      skills: ['CI/CD Security', 'SAST', 'Infrastructure as Code']
    },
    {
      title: 'Threat Intelligence/BCDR Security Engineer',
      company: 'Nordstrom',
      period: 'May 2020 - Aug 2021',
      location: 'Seattle, United States',
      description: `1. Architected and built the Threat Intelligence platform from scratch using open-source tools like MISP. 
2. Supported and performed a deep-dive analysis of TTP's of both internal and external threats as well as performed threat modeling for applications to defend Nordstrom's infrastructure, to improve the ability to defend vulnerabilities, and make Security-in-depth a default concept during SDLC. 
3. Reverse engineered malware, triaged threat intelligence, researched attacker infrastructure to curate previously unknown Indicators of Compromise, and created actionable results and remediation plans for internal stakeholders to proactively improve the security posture and maturity.
4. Conduct Design Reviews, Security assessments and threat modeling for new applications as well as ad hoc automated and manual penetration testing.`,
      skills: ['BCDR', 'Threat Intelligence', 'MISP', 'IOC', 'TTPs']
    }
  ];

  const education = [
    {
      institution: 'University of Washington',
      degree: 'Bachelor of Science - Informatics Cybersecurity',
      period: '2016 - 2020',
      description: 'Focused on cybersecurity principles, network security, and secure system design.',
      tags: ['Cybersecurity', 'Network Security', 'System Design', 'Information Security']
    }
  ];

  const certifications = [
    { name: 'AWS Certified Security Specialty', icon: <Award className="h-5 w-5 text-cyber-teal" /> },
    { name: 'GIAC Enterprise Penetration Tester (GPEN)', icon: <Shield className="h-5 w-5 text-cyber-teal" /> },
    { name: 'GIAC Cloud Penetration Tester (GCPN)', icon: <Shield className="h-5 w-5 text-cyber-teal" /> },
    { name: 'AWS Certified Solutions Architect', icon: <Server className="h-5 w-5 text-cyber-teal" /> },
    { name: 'CompTIA Security+', icon: <CheckCircle className="h-5 w-5 text-cyber-teal" /> }
  ];

  const projects = [
    {
      title: 'The Vulnerable MCP Project',
      description: 'A community-maintained database of known vulnerabilities, limitations, and security concerns with the Model Context Protocol (MCP). Contributes to the knowledge base of security researchers and developers working with AI assistant tools.',
      technologies: ['AI Security', 'MCP', 'Security Research', 'Vulnerability Database'],
      link: 'https://vulnerablemcp.info/'
    },
    {
      title: 'MCP Enhanced Tool Definition Interface',
      description: 'A comprehensive security framework for protecting Large Language Model applications from tool poisoning and rug pull attacks through cryptographic verification, OAuth integration, and policy-based access control in Model Context Protocol environments.',
      technologies: ['MCP Security', 'Cryptographic Verification', 'OAuth 2.0', 'Policy-Based Access Control'],
      link: 'https://vulnerablemcp.info/etdi-security.html'
    },
    {
      title: 'Agentic Security Hub',
      description: 'Developed comprehensive security standards for Amazon\'s GenAI products including guardrails, prompt-injection protections, compute isolation, and session management.',
      technologies: ['AI/ML Security', 'Python', 'Prompt Engineering', 'Security Analysis'],
      link: 'http://agenticsecurity.info/'
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
                    
                    <button 
                      onClick={() => toggleJob(index)}
                      className="flex items-center text-cyber-green hover:text-cyber-green-light mb-2 transition-colors"
                    >
                      {expandedJobs[index] ? (
                        <>
                          <span>Hide Details</span>
                          <ChevronUp className="ml-1 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <span>Show Details</span>
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </button>

                    {expandedJobs[index] && (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: job.description }} className="text-gray-300 mt-4" />
                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
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
                    
                    <button 
                      onClick={() => toggleEducation(index)}
                      className="flex items-center text-cyber-green hover:text-cyber-green-light mb-2 transition-colors"
                    >
                      {expandedEducation[index] ? (
                        <>
                          <span>Hide Details</span>
                          <ChevronUp className="ml-1 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <span>Show Details</span>
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </button>

                    {expandedEducation[index] ? (
                      <p className="text-gray-300 mt-4">{edu.description}</p>
                    ) : (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {edu.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center mt-4 bg-cyber-darker/80 p-2 rounded">
                          <BookOpen className="h-4 w-4 text-cyber-green mr-2" />
                          <span className="text-gray-300 text-sm">Focus areas: {edu.description.split('.')[0]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-8">
              <Shield className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Leadership</h3>
            </div>

            <div className="space-y-6 mb-12">
              <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">Co Leader and Founding Member of AIVSS</h4>
                  <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                    Jun 2025 - Present
                  </span>
                </div>
                <h5 className="text-lg text-cyber-green mb-3">
                  <a href="https://aivss.owasp.org/" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green-light transition-colors">
                    OWASP AIVSS Project ↗
                  </a>
                </h5>
                <p className="text-gray-300 mb-4">
                  AI Vulnerability Scoring System and Agentic AI Top 10 - Leading the development of comprehensive vulnerability scoring methodologies specifically designed for AI systems, including agentic AI applications.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    AI Security
                  </span>
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    Vulnerability Assessment
                  </span>
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    Open Source Leadership
                  </span>
                </div>
              </div>

              <div className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">Co Lead for Agentic Application Security</h4>
                  <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                    Mar 2025 - Present
                  </span>
                </div>
                <h5 className="text-lg text-cyber-green mb-3">
                  <a href="http://genai.owasp.org/" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green-light transition-colors">
                    OWASP GenAI Project - Agentic Security Initiative (ASI) ↗
                  </a>
                </h5>
                <p className="text-gray-300 mb-4">
                  Working with the open source community to advance the security of Agentic AI and GenAI generally by contributing and authoring white papers, security frameworks, and best practices for the industry.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    Agentic AI Security
                  </span>
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    GenAI Security
                  </span>
                  <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                    Community Leadership
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <Award className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Notable Projects</h3>
            </div>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green transition-colors">
                        {project.title} ↗
                      </a>
                    ) : (
                      project.title
                    )}
                  </h4>
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
            
            <div className="flex items-center mt-12 mb-8">
              <Award className="h-6 w-6 text-cyber-teal mr-3" />
              <h3 className="text-2xl font-bold text-white">Certifications</h3>
            </div>
            
            <div className="bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-6 border border-teal-500/20 shadow-lg hover:shadow-teal-500/5 transition-all duration-300">
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
