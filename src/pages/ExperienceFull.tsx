import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Award, Briefcase, Shield, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const ExperienceFull = () => {
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
      title: 'Senior Technical Leader - AI Security Researcher',
      company: 'Cisco',
      period: 'November 2025 - Present',
      location: 'New York, United States',
      description: `
        <ul>
          <li>Leading research and development of AI security frameworks, agentic AI threat modeling, and zero-trust protocols for multi-agent systems</li>
          <li>Architecting enterprise-grade security solutions for generative AI and autonomous agent deployments</li>
          <li>Driving thought leadership in agentic AI security through cutting-edge research, publications, and industry collaboration</li>
        </ul>
      `,
      skills: ['Agentic AI Security', 'Zero Trust Architecture', 'AI Security Research', 'Threat Modeling']
    },
    {
      title: 'Senior Security Engineer',
      company: 'Meta',
      period: 'June 2024 - November 2025',
      location: 'New York, United States',
      description: `
        <ul>
          <li>Architected and developed an internal Security Impact Rating system to quantify and prioritize security risks</li>
          <li>Built a comprehensive Asset Graph to map dependencies and enhance risk prioritization across the organization</li>
          <li>Integrated Large Language Models (LLMs) for advanced, automated code analysis to identify potential vulnerabilities</li>
          <li>Secured AI agents and protected sensitive systems containing PII and PCI data</li>
        </ul>
      `,
      skills: ['AI Security', 'Risk Assessment', 'LLM Security', 'Code Analysis']
    },
    {
      title: 'Senior Generative AI Security Engineer',
      company: 'Amazon Web Services',
      period: 'Nov 2021 - June 2024',
      location: 'New York, United States',
      description: `
        <ul>
          <li>Pioneered comprehensive GenAI security best practices and standards for Amazon Q and Bedrock, including AI model safety guardrails, prompt-injection protections, compute isolation, and secure token management</li>
          <li>Accelerated GenAI feature integration, reducing launch timelines from 3 weeks to less than 1 week by creating efficient, security-compliant Golden Paths</li>
          <li>Enhanced security for key features like Amazon QuickSight's Natural Language to SQL editor, implementing prompt boundary enforcement and reinforcing data protection and query integrity</li>
          <li>Led security assessments for AI model integrations across the AWS ecosystem, applying LLM security evaluation frameworks and ensuring strict adherence to security standards</li>
          <li>Conducted threat modeling, design reviews, and security testing for over 150 new feature launches for AWS Analytics & Big Data Services (Athena, EMR, Lake Formation) within the Hadoop/Spark ecosystem</li>
          <li>Led security reviews for major AWS Spark launches, including Native Fine-Grained Access Control (FGAC), HBase Write-Ahead Logs, Native LDAP Integration, Remote Shuffle Protocol, Multi-Dialect Views, and Predicate Pushdown security</li>
          <li>Served as a Core Security Contributor to Membrane, enabling secure FGAC in native Spark</li>
        </ul>
      `,
      skills: ['GenAI Security', 'Threat Modeling', 'AWS', 'Hadoop/Spark Security', 'LLM Security']
    },
    {
      title: 'Security Engineer II, Developer Security and Tooling',
      company: 'Nordstrom',
      period: 'Aug 2021 - Nov 2021',
      location: 'Seattle, United States',
      description: `
        <ul>
          <li>Integrated security tools (SAST, DAST, secret detection) into CI/CD pipelines</li>
          <li>Automated aspects of threat modeling, design, security, and architecture reviews</li>
          <li>Built a system to ensure post-review application compliance</li>
        </ul>
      `,
      skills: ['CI/CD Security', 'SAST', 'DAST', 'DevSecOps']
    },
    {
      title: 'Security Engineer, Threat Intelligence',
      company: 'Nordstrom',
      period: 'May 2020 - Aug 2021',
      location: 'Seattle, United States',
      description: `
        <ul>
          <li>Architected and built a Threat Intelligence Platform from scratch using open-source tools like MISP, implementing zero trust architecture principles</li>
          <li>Analyzed TTPs of internal/external threats and performed threat modeling to defend Nordstrom's infrastructure using MITRE ATT&CK framework</li>
          <li>Reverse engineered malware, triaged threat intelligence, and researched attacker infrastructure to curate novel Indicators of Compromise (IOCs)</li>
          <li>Developed actionable remediation plans for internal stakeholders, proactively improving security posture</li>
          <li>Conducted design reviews, security assessments, threat modeling, and ad-hoc penetration testing for new applications</li>
        </ul>
      `,
      skills: ['Threat Intelligence', 'MISP', 'MITRE ATT&CK', 'Malware Analysis', 'IOC']
    },
    {
      title: 'Security Engineer, BCDR',
      company: 'Nordstrom',
      period: 'Nov 2020 - Feb 2021',
      location: 'Seattle, United States',
      description: `
        <ul>
          <li>Improved Business Continuity and Disaster Recovery (BCDR) by creating an Infrastructure-as-Code solution for data protection</li>
          <li>Enhanced protection against data loss/corruption by isolating and reducing permissions surface area on storage</li>
          <li>Configured and deployed object lock policies for WORM protection, meeting legal/compliance requirements</li>
          <li>Implemented least-privilege permissions controls for backup and configuration management</li>
        </ul>
      `,
      skills: ['BCDR', 'Infrastructure as Code', 'Data Protection', 'Compliance']
    },
    {
      title: 'Penetration Tester',
      company: 'Nordstrom',
      period: 'June 2019 - Aug 2019',
      location: 'Seattle, United States',
      description: `
        <ul>
          <li>Identified vulnerabilities by simulating attacks, validating Nordstrom's cyber risk response capabilities</li>
          <li>Developed a security toolset enhancing Red Team capabilities across network, Active Directory, OS, application, and datacenter vulnerabilities</li>
          <li>Researched hacker methodologies and system exploits to support Red Team assessments</li>
          <li>Authored reports with findings and recommendations</li>
        </ul>
      `,
      skills: ['Penetration Testing', 'Red Team', 'Vulnerability Assessment', 'Security Research']
    }
  ];

  const education = [
    {
      institution: 'University of Washington Information School',
      degree: 'Bachelor of Science - Informatics - Information Assurance and Cybersecurity',
      period: '2016 - 2020',
      description: 'Focused on cybersecurity principles, network security, and secure system design.',
      tags: ['Cybersecurity', 'Network Security', 'System Design', 'Information Security']
    },
    {
      institution: 'University of Washington, Henry M. Jackson School of International Studies',
      degree: 'Fellowship, Cybersecurity Policy Task Force',
      period: '',
      description: 'Research fellowship focused on cybersecurity policy and international studies.',
      tags: ['Cybersecurity Policy', 'Research', 'International Studies']
    }
  ];

  const academicExperience = [
    {
      title: 'Adjunct Professor',
      institution: 'University of Nevada-Las Vegas',
      period: 'Feb 2021 - Oct 2021',
      description: 'Lead Instructor for Cybersecurity courses through HackerU (@HackerUSA) at UNLV',
      tags: ['Teaching', 'Cybersecurity Education']
    },
    {
      title: 'Teaching Assistant',
      institution: 'University of Washington Information School',
      period: 'Sep 2019 - Aug 2020',
      description: 'Instructed over 100 students in courses including Introduction to Programming, Design for Personal Health, and Data & Privacy Ethics. Conducted lab sections, prepared/graded assignments, and held office hours.',
      tags: ['Teaching', 'Programming', 'Ethics']
    },
    {
      title: 'Data Analyst',
      institution: 'University of Washington - School of Medicine',
      period: 'Dec 2017 - June 2019',
      description: 'Developed custom ImageJ (Java) plugins and macros, reducing analysis time from hours to seconds. Applied statistical methods to analyze large MRI datasets, creating visualizations to derive insights into diseases like Cancer and Muscular Dystrophy.',
      tags: ['Data Analysis', 'Java', 'Medical Research']
    }
  ];

  const certifications = [
    { name: 'GIAC Cloud Penetration Tester (GCPN)', icon: <Shield className="h-5 w-5 text-cyber-teal" /> }
  ];

  const projects = [
    {
      title: 'Agentic AI Security Research Initiative',
      description: 'Leading comprehensive research on securing autonomous AI agents and multi-agentic systems with focus on threat modeling, zero-trust frameworks, and identity management. Authoring industry-leading white papers and conference presentations on agentic AI security challenges and solutions.',
      technologies: ['Agentic AI Security', 'Threat Modeling', 'Zero Trust Architecture', 'Identity Frameworks'],
      link: 'https://agenticsecurity.info/'
    },
    {
      title: 'The Vulnerable MCP Project',
      description: 'Maintainer for a community database of vulnerabilities and security concerns related to the Model Context Protocol (MCP). Contributes to the knowledge base for security researchers and developers working with AI assistant tools.',
      technologies: ['AI Security', 'MCP', 'Security Research', 'Vulnerability Database'],
      link: 'https://vulnerablemcp.info/'
    },
    {
      title: 'MCP Enhanced Tool Definition Interface (ETDI)',
      description: 'Designed a security framework to protect LLM applications from tool poisoning and rug pull attacks. Implemented cryptographic verification, OAuth integration, and policy-based access control in MCP environments.',
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
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>Experience & Career | Vineeth Sai Narajala</title>
          <meta name="description" content="Complete work experience, projects, academic background, and certifications of Vineeth Sai Narajala." />
        </Helmet>
        
        <Navbar />
        <main>
          <section className="py-20 bg-cyber-darker relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience & Career</h1>
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
                            {edu.period && (
                              <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                                {edu.period}
                              </span>
                            )}
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
                    <Award className="h-6 w-6 text-cyber-green mr-3" />
                    <h3 className="text-2xl font-bold text-white">Notable Projects</h3>
                  </div>

                  <div className="space-y-6 mb-12">
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

                  {/* Academic Experience - Under Notable Projects as requested */}
                  <div className="flex items-center mb-8">
                    <BookOpen className="h-6 w-6 text-cyber-green mr-3" />
                    <h3 className="text-2xl font-bold text-white">Academic Experience</h3>
                  </div>

                  <div className="space-y-6 mb-12">
                    {academicExperience.map((exp, index) => (
                      <div key={index} className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h4 className="text-xl font-semibold text-white">{exp.title}</h4>
                          <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                            {exp.period}
                          </span>
                        </div>
                        <h5 className="text-lg text-cyber-green mb-3">{exp.institution}</h5>
                        <p className="text-gray-300 mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center mb-8">
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
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ExperienceFull;
