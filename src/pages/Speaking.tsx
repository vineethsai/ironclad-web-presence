import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Globe, Shield, Award, ChevronDown, ChevronUp, FileText, Zap, Github, Building2, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const ConferenceTalk = ({ title, event, year, description, link, abstract }: {
  title: string;
  event: string;
  year: string;
  description: string;
  link: string;
  abstract: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAbstractModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="conference-talk">
      <h4 className="text-cyber-green font-semibold">{title}</h4>
      <div className="mt-2">
        <div className="flex items-center mb-3 flex-wrap gap-2">
          <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
            {event}
          </span>
          <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
            {year}
          </span>
        </div>
        <p className="text-gray-300 text-sm">{description}</p>
        <div className="flex gap-4 mt-2">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-cyber-green underline text-sm">
            View conference details
          </a>
          <button 
            onClick={openAbstractModal} 
            className="text-cyber-green underline text-sm flex items-center cursor-pointer hover:text-cyber-green-light"
          >
            <FileText className="h-4 w-4 mr-1" />
            View Abstract
          </button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogOverlay className="bg-cyber-dark/80 backdrop-blur-sm" />
        <DialogContent className="max-w-2xl bg-cyber-grey border border-cyber-green/30">
          <DialogTitle className="text-2xl font-bold mb-4 text-white">{title}</DialogTitle>
          <div className="mb-4 flex items-center flex-wrap gap-2">
            <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
              {event}
            </span>
            <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
              {year}
            </span>
          </div>
          <div className="mb-4">
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-cyber-green underline flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              Conference Details
            </a>
          </div>
          <div className="mb-2 text-lg text-cyber-green font-medium">Abstract</div>
          <div className="max-h-[60vh] overflow-y-auto rounded border border-cyber-green/10 mb-4">
            <DialogDescription className="text-base text-gray-300 p-4 bg-cyber-darker/50 whitespace-pre-line">
              {abstract || "Abstract not available for this presentation."}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Speaking = () => {
  const [expandedSections, setExpandedSections] = useState({
    conferences: true,
    launches: true,
    openSource: true,
    adoption: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const conferenceTalks = [
    {
      id: 0,
      title: "Agent Name Service (ANS) Framework",
      event: "MIT Media Lab NANDA Initiative",
      year: "2025",
      description: "Presented ANS framework to the Networked Agents and Decentralized AI initiative, a pioneering project bringing together 18 leading research institutions led by Professor Ramesh Raskar.",
      link: "https://www.media.mit.edu/projects/nanda/overview/",
      abstract: "Presented the Agent Name Service (ANS) framework to MIT Media Lab's NANDA (Networked Agents and Decentralized AI) Initiative, a pioneering project developing foundational infrastructure for the 'Internet of AI Agents.' The presentation covered secure agent discovery, identity verification, and interoperability mechanisms for multi-agent systems."
    },
    {
      id: 1,
      title: "Agent Name Service Protocol",
      event: "IETF Conference",
      year: "2025",
      description: "Presented the ANS Internet-Draft (draft-narajala-ans-00) to the Internet Engineering Task Force.",
      link: "https://datatracker.ietf.org/doc/draft-narajala-ans/",
      abstract: "Presented the Agent Name Service protocol specification to the Internet Engineering Task Force (IETF), proposing a standardized approach for AI agent discovery and verification at internet scale. The draft establishes naming conventions, security requirements, and interoperability standards for autonomous AI agents."
    },
    {
      id: 2,
      title: "Networks for AI Computing",
      event: "ACM SIGCOMM NAIC",
      year: "2025",
      description: "Presented research on networking requirements and security considerations for AI agent communication at scale.",
      link: "https://www.sigcomm.org/",
      abstract: "Discussed the unique networking challenges posed by multi-agent AI systems, including latency requirements, bandwidth considerations, and security protocols for agent-to-agent communication in distributed computing environments."
    },
    {
      id: 3,
      title: "Syncing on AI Standards",
      event: "Patchwork by Advanced AI Society",
      year: "2025",
      description: "Panel discussion on AI security standards and the future of enterprise AI governance.",
      link: "https://advancedai.org/",
      abstract: "Participated in a panel discussion hosted by the Advanced AI Society, an industry association advancing enterprise-grade adoption of Proof-of-Control AI solutions. Discussed the evolving landscape of AI security standards and governance frameworks."
    },
    {
      id: 4,
      title: "Securing Agentic Applications",
      event: "GenAI Application Security & Risk Summit",
      year: "2025",
      description: "Presented comprehensive strategies for securing agentic AI applications in enterprise environments.",
      link: "https://genai.owasp.org/",
      abstract: "Delivered a presentation on securing agentic AI applications, covering threat modeling, access control, and runtime security mechanisms for autonomous AI systems deployed in enterprise environments."
    },
    {
      id: 5,
      title: "Threat Modelling for LLM Applications via SafeGen",
      event: "BSides Seattle",
      year: "2025",
      description: "Shared methodologies for identifying and mitigating security risks in applications using large language models.",
      link: "https://www.bsidesseattle.com/",
      abstract: "Presented the SafeGen framework for threat modeling LLM applications, demonstrating practical methodologies for identifying vulnerabilities, assessing risks, and implementing mitigations in production LLM deployments."
    },
    {
      id: 6,
      title: "Securing Generative AI in Enterprise Environments",
      event: "BSides Harrisburg",
      year: "2025",
      description: "Presented techniques for implementing robust security controls for enterprise GenAI deployments.",
      link: "https://bsidesharrisburg.com/",
      abstract: "The rapid adoption of Generative AI (GenAI) presents unique security challenges that organizations must address while maintaining development velocity. This presentation provides practical strategies for building secure GenAI applications, addressing threat modeling for GenAI systems, secure integration patterns, and robust output validation mechanisms."
    },
    {
      id: 7,
      title: "SafeGen: Accelerating Secure Generative AI Implementation",
      event: "CypherCon Milwaukee",
      year: "2025",
      description: "Presented techniques for implementing robust security controls for enterprise GenAI deployments.",
      link: "https://cyphercon.com/portfolio/safegen-accelerating-secure-generative-ai-implementation/",
      abstract: "The rapid adoption of Generative AI (GenAI) presents unique security challenges that organizations must address while maintaining development velocity. This presentation provides practical strategies for building secure GenAI applications, with a focus on AWS services like Bedrock and Amazon Q. We introduce a comprehensive security framework that addresses three critical areas: threat modeling for GenAI systems, secure integration patterns, and robust output validation mechanisms."
    },
    {
      id: 8,
      title: "Building a Secure Agentic AI Application",
      event: "RSA Conference San Francisco",
      year: "2025",
      description: "Workshop on practical techniques for developing secure AI agents with appropriate controls and safeguards.",
      link: "https://genai.owasp.org/event/rsa-conference-2025/",
      abstract: "Ran a workshop on building a secure Agentic AI application, covering security frameworks, threat modeling, and implementation best practices for autonomous AI systems."
    },
    {
      id: 9,
      title: "Analyzing Zero Trust Architecture in the Age of Agentic GenAI",
      event: "OWASP Global AppSec Boston",
      year: "2025",
      description: "Presented a framework for applying Zero Trust principles to AI agent deployments in enterprise environments.",
      link: "https://owaspbasc2025.sched.com/event/1xqja/analyzing-zero-trust-architecture-in-the-age-of-agentic-genai-a-practical-approach",
      abstract: "The proliferation of generative artificial intelligence (GenAI) agents introduces unprecedented security challenges to modern organizations. As these autonomous systems increasingly generate content, make decisions, and execute actions with minimal human oversight, traditional perimeter-based security approaches prove inadequate. This paper examines the critical intersection of Zero Trust Architecture (ZTA) and GenAI agent deployment, proposing a framework for secure AI integration in enterprise environments."
    },
    {
      id: 10,
      title: "Threat Modeling for LLM Applications",
      event: "BSides Baltimore",
      year: "2024",
      description: "Shared methodologies for identifying and mitigating security risks in applications using large language models.",
      link: "https://www.youtube.com/watch?v=lZYATxO0rMA",
      abstract: "This talk explores the urgent need for a paradigm shift in threat modeling to address the complexities of large-scale systems. Adding more security bottlenecks to the development process is not only expensive but also risks losing developers' trust. However, identifying security issues later in the Software Development Life Cycle (SDLC) or after launch proves to be even more expensive. Threat modeling provides an ideal and cost-effective approach to incorporating security into the development process."
    },
    {
      id: 11,
      title: "Agile Threat Modelling for Complex Systems",
      event: "BSides Austin",
      year: "2024",
      description: "Exploring innovative approaches to threat modelling with AI assistance for rapidly evolving systems.",
      link: "https://bsidesaustin.com/schedule/",
      abstract: "This talk explores the urgent need for a paradigm shift in threat modeling to address the complexities of large-scale systems. The presentation delves into the challenges presented by cloud architectures, microservices, and rapid development practices, highlighting the shortcomings of traditional threat modeling approaches like STRIDE and DREAD. It also presents ways to integrate a fast and scalable threat modeling stage into the SDLC."
    }
  ];

  const majorLaunches = [
    {
      title: "AWS Glue Data Catalog Multi-Engine Views for Analytics Engines",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/11/aws-glue-data-catalog-multi-engine-views-analytics-engines/",
      description: "Led security reviews ensuring secure interoperability between different analytics engines while maintaining data integrity and access controls."
    },
    {
      title: "Amazon Athena Federated Query Pass-Through",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/04/amazon-athena-federated-query-pass-through/",
      description: "Implemented security mechanisms to safely enable pass-through of federated queries while preserving query integrity and data protection."
    },
    {
      title: "Amazon EMR Serverless Streaming Jobs for Continuous Processing",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/06/amazon-emr-serverless-streaming-jobs-continuous-processing/",
      description: "Ensured secure processing of continuous data streams with proper isolation and access controls."
    },
    {
      title: "Connect Jupyter Notebooks to Amazon EMR Serverless through Apache Livy Endpoints",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/05/connect-jupyter-notebooks-amazon-emr-serverless-apache-livy-endpoints/",
      description: "Established secure connectivity between Jupyter notebooks and EMR Serverless through properly authenticated and authorized Apache Livy endpoints."
    },
    {
      title: "Amazon EMR on EKS with Apache Livy",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/04/amazon-emr-eks-apache-livy/",
      description: "Developed security protocols for Amazon EMR on EKS with Apache Livy, ensuring secure data processing in containerized environments."
    },
    {
      title: "Fine-Grained Access Controls with Job-Scoped IAM Roles in AWS Lake Formation",
      link: "https://aws.amazon.com/about-aws/whats-new/2022/07/fine-grained-access-controls-job-scoped-iam-roles-integration-aws-lake-formation-apache-spark-hive-amazon-emr-ec2-clusters/",
      description: "Designed and implemented fine-grained access controls for Apache Spark and Hive workloads using job-scoped IAM roles."
    },
    {
      title: "Amazon Redshift Integration with Apache Spark on Amazon EMR",
      link: "https://aws.amazon.com/about-aws/whats-new/2022/11/amazon-redshift-integration-apache-spark-amazon-emr/",
      description: "Developed secure integration patterns between Amazon Redshift and Apache Spark on EMR."
    },
    {
      title: "AWS Lake Formation Formats for EMR Fine-Grained Control",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/11/aws-lake-formation-formats-emr-fine-grained-control/",
      description: "Enhanced data access controls through Lake Formation formats integration with EMR."
    },
    {
      title: "Amazon Athena Minimum Encryption for Query Result Security",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/03/amazon-athena-minimum-encryption-query-result-security/",
      description: "Enhanced data security through minimum encryption requirements for Athena query results."
    },
    {
      title: "Amazon S3 Express One Zone Storage Class for EMR",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/08/amazon-s3-express-one-zone-storage-class-emr/",
      description: "Implemented secure high-performance storage options for EMR workloads using S3 Express One Zone."
    }
  ];

  const openSourceProjects = [
    {
      name: 'A2A Scanner',
      organization: 'Cisco AI Defense',
      description: 'Enterprise-grade security tool for scanning Agent-to-Agent (A2A) protocol implementations. Combines static analysis, runtime monitoring, and AI-powered detection to identify threats across the A2A protocol stack.',
      github: 'https://github.com/cisco-ai-defense/a2a-scanner',
      blog: 'https://blogs.cisco.com/ai/securing-ai-agents-with-ciscos-open-source-a2a-scanner',
      stars: 99,
      forks: 15,
    },
    {
      name: 'Vulnerable MCP',
      organization: 'Personal',
      description: 'Intentionally vulnerable Model Context Protocol application for security research and education. Demonstrates common MCP vulnerabilities including tool poisoning, rug pull attacks, and data exfiltration vectors.',
      github: 'https://github.com/vineethsai/vulnerablemcp',
      stars: 32,
      forks: 7,
    },
    {
      name: 'Agentic Security Initiative (ASI)',
      organization: 'Personal',
      description: 'Comprehensive toolkit for securing AI agents, aligned with OWASP and NIST AI Risk Management Frameworks. Provides security guidelines, vulnerability taxonomies, and implementation resources.',
      github: 'https://github.com/vineethsai/asi',
      website: 'https://agenticsecurity.info',
      stars: 12,
      forks: 4,
    },
    {
      name: 'MCP-ETDI Documentation',
      organization: 'Personal',
      description: 'Enhanced Tool Definition Infrastructure documentation for MCP security, providing OAuth-enhanced tool definitions and policy-based access control.',
      github: 'https://github.com/vineethsai/MCP-ETDI-docs',
      stars: 9,
      forks: 2,
    },
    {
      name: 'Tool Registry',
      organization: 'Personal',
      description: 'GenAI agent and tool registry system for secure JIT credential vending. Enables scoped-down, just-in-time credentials for AI agents.',
      github: 'https://github.com/vineethsai/tool-registry',
      stars: 2,
    },
    {
      name: 'Agent Name Service (ANS)',
      organization: 'Personal',
      description: 'Implementation of the ANS protocol for secure AI agent discovery and verification at internet scale.',
      github: 'https://github.com/vineethsai/ANS',
      stars: 1,
    },
  ];

  const industryAdoptions = [
    {
      company: "GoDaddy Inc.",
      logo: "🌐",
      title: "ANS Registry and Registration Authority",
      description: "Fortune 500 company serving 21+ million customers worldwide adopted ANS as the foundation for their Agent Name Service infrastructure. GoDaddy's implementation enables secure agent registration, verification, and lifecycle management at internet scale.",
      quote: "Just as HTTPS was necessary to enable secure transactions on the web, the ANS framework is a necessary foundation to enable verifiable, high-stakes transactions between autonomous digital assets.",
      quotedBy: "Scott Courtney, VP Engineering, GoDaddy",
      link: "https://www.godaddy.com/ANS"
    },
    {
      company: "HUMAN Security",
      logo: "🛡️",
      title: "AI Agent Verification Service",
      description: "Released 'HUMAN Verified AI Agent,' an open-source foundation for agent identity using Agent Name Service (ANS). Supports interoperability with Google's Agent-to-Agent (A2A) protocol for authenticating and securing AI agents.",
      quote: "The HUMAN Verified AI Agent leverages ANS to establish trust and prevent impersonation in AI ecosystems.",
      quotedBy: "HUMAN Security",
      link: "https://www.humansecurity.com/"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>Speaking & Industry | Vineeth Sai Narajala</title>
          <meta name="description" content="Conference talks, speaking engagements, AWS launches, open source projects, and industry adoption by Vineeth Sai Narajala." />
        </Helmet>
        
        <Navbar />
        <main>
          <section className="py-20 bg-cyber-darker relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Speaking & Industry</h1>
                <div className="w-20 h-1 bg-cyber-green mx-auto mb-4"></div>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Conference presentations, industry contributions, open source projects, and real-world adoption of security frameworks.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Conference Talks */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('conferences')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Globe className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Conference Talks</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {conferenceTalks.length} presentations
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.conferences ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.conferences && (
                    <div className="p-8 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {conferenceTalks.map((talk) => (
                          <div key={talk.id} className="bg-cyber-darker rounded-lg p-6 border border-cyber-green/20">
                            <ConferenceTalk {...talk} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Open Source Projects */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('openSource')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Github className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Open Source Projects</h3>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.openSource ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.openSource && (
                    <div className="p-8 pt-0">
                      {/* GitHub Stats Card */}
                      <div className="mb-8 flex justify-center">
                        <a href="https://github.com/vineethsai" target="_blank" rel="noopener noreferrer">
                          <img 
                            src="https://github-readme-stats.vercel.app/api?username=vineethsai&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117" 
                            alt="GitHub Stats"
                            className="rounded-lg"
                          />
                        </a>
                      </div>

                      {/* Project Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {openSourceProjects.map((project, index) => (
                          <div key={index} className="cyber-card p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                                <p className="text-cyber-green text-sm">{project.organization}</p>
                              </div>
                              <div className="flex items-center gap-3 text-gray-400 text-sm">
                                {project.stars !== undefined && (
                                  <span className="flex items-center">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                                    </svg>
                                    {project.stars}
                                  </span>
                                )}
                                {project.forks !== undefined && (
                                  <span className="flex items-center">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                                    </svg>
                                    {project.forks}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-3">
                              <a 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyber-green hover:underline text-sm flex items-center"
                              >
                                <Github className="h-4 w-4 mr-1" />
                                GitHub
                              </a>
                              {project.blog && (
                                <a 
                                  href={project.blog}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyber-green hover:underline text-sm flex items-center"
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Blog Post
                                </a>
                              )}
                              {project.website && (
                                <a 
                                  href={project.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyber-green hover:underline text-sm flex items-center"
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Website
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Industry Adoption */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('adoption')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Building2 className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Industry Adoption</h3>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.adoption ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.adoption && (
                    <div className="p-8 pt-0">
                      <p className="text-gray-300 mb-6">
                        Research frameworks and protocols adopted by industry leaders for production deployments.
                      </p>
                      <div className="space-y-6">
                        {industryAdoptions.map((adoption, index) => (
                          <div key={index} className="cyber-card p-6">
                            <div className="flex items-start gap-4">
                              <div className="text-4xl">{adoption.logo}</div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-xl font-semibold text-white">{adoption.company}</h4>
                                  <a 
                                    href={adoption.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-cyber-green hover:underline text-sm flex items-center"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Visit
                                  </a>
                                </div>
                                <h5 className="text-cyber-green mb-3">{adoption.title}</h5>
                                <p className="text-gray-300 text-sm mb-4">{adoption.description}</p>
                                <blockquote className="border-l-2 border-cyber-green/50 pl-4 italic text-gray-400 text-sm">
                                  "{adoption.quote}"
                                  <footer className="text-cyber-green mt-1 not-italic">— {adoption.quotedBy}</footer>
                                </blockquote>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Major AWS Launches */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('launches')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Zap className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Major AWS Launches</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {majorLaunches.length}+ launches
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.launches ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.launches && (
                    <div className="p-8 pt-0">
                      <p className="text-gray-300 mb-6">
                        Led security efforts for AWS Analytics services, including work supporting the <a href="https://www.nextgov.com/modernization/2021/08/nsa-awards-secret-10-billion-contract-amazon/184390/" target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:underline">$10 billion NSA contract</a>. Launched projects at <a href="https://reinvent.awsevents.com/" target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:underline">AWS re:Invent</a>.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {majorLaunches.map((launch, index) => (
                          <div key={index} className="cyber-card p-4">
                            <h4 className="text-white font-medium mb-2">
                              <a 
                                href={launch.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-cyber-green transition-colors"
                              >
                                {launch.title}
                              </a>
                            </h4>
                            <p className="text-gray-400 text-sm">{launch.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

export default Speaking;
