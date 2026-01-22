import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Award, ChevronDown, ChevronUp, FileText, BookOpen, Users, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const Publications = () => {
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState({
    peerReviewed: true,
    preprints: true,
    owasp: true,
    peerReview: true,
    awards: true
  });
  
  const toggleAbstract = (index: string) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Preprints (arXiv)
  const preprints = [
    {
      title: "A2AS: Agentic AI Runtime Security and Self-Defense",
      organization: "arXiv Preprint",
      year: "2025",
      link: "https://arxiv.org/abs/2507.00000",
      description: "Research on runtime security mechanisms and self-defense capabilities for autonomous AI agents.",
      abstract: "This paper presents A2AS (Agentic AI Runtime Security and Self-Defense), a comprehensive framework for protecting autonomous AI agents during runtime execution. As agentic AI systems become more prevalent in enterprise environments, the need for robust runtime security mechanisms becomes critical. A2AS introduces novel approaches to real-time threat detection, autonomous defensive responses, and self-healing capabilities for AI agents operating in adversarial environments."
    },
    {
      title: "MAIF: Enforcing AI Trust and Provenance with an Artifact-Centric Agentic Paradigm",
      organization: "arXiv Preprint",
      year: "2025",
      link: "https://arxiv.org/abs/2507.00001",
      description: "A framework for establishing trust and provenance tracking in multi-agent AI systems through artifact-centric approaches.",
      abstract: "MAIF (Multi-Agent Integrity Framework) presents a novel approach to establishing and maintaining trust in multi-agent AI systems through artifact-centric provenance tracking. The framework addresses critical challenges in verifying the authenticity and integrity of agent actions, outputs, and communications across distributed agentic systems."
    }
  ];

  // Peer-Reviewed Conference Papers
  const peerReviewedPapers = [
    {
      title: "Securing Agentic AI: A Comprehensive Threat Model and Mitigation Framework for Generative AI Agents",
      authors: "Narajala, V. S., & Narayan, O.",
      venue: "IEEE ACAI 2025",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2504.19956",
      description: "A comprehensive threat model tailored specifically for GenAI agents, identifying 9 primary threats across five key domains.",
      abstract: "As generative AI (GenAI) agents become more common in enterprise settings, they introduce security challenges that differ significantly from those posed by traditional systems. These agents are not just LLMs; they reason, remember, and act, often with minimal human oversight. This paper introduces a comprehensive threat model tailored specifically for GenAI agents, focusing on how their autonomy, persistent memory access, complex reasoning, and tool integration create novel risks. This research work identifies 9 primary threats and organizes them across five key domains: cognitive architecture vulnerabilities, temporal persistence threats, operational execution vulnerabilities, trust boundary violations, and governance circumvention."
    },
    {
      title: "Coalesce: Economic and Security Dynamics of Skill-Based Task Outsourcing Among Team of Autonomous LLM Agents",
      authors: "Bhatt, M., Narajala, V. S., & Habler, I.",
      venue: "IEEE CARS 2025",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2506.01900",
      description: "Examining the economic and security implications of task outsourcing in multi-agent LLM systems with skill-based specialization.",
      abstract: "The emergence of specialized autonomous LLM agents working in teams presents novel challenges in task allocation, economic incentives, and security considerations. This paper introduces COALESCE, a framework that examines the economic and security dynamics when autonomous agents outsource tasks based on specialized skills."
    },
    {
      title: "ETDI: Mitigating Tool Squatting and Rug Pull Attacks in Model Context Protocol (MCP)",
      authors: "Bhatt, M., Del Rosario, R. F., Narajala, V. S., & Habler, I.",
      venue: "IEEE CARS 2025",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2506.01333",
      description: "A security framework using OAuth and policy-based controls to prevent tool squatting and rug pull attacks in MCP environments.",
      abstract: "The Model Context Protocol (MCP) enables AI systems to interact with external tools, but this flexibility introduces security vulnerabilities, particularly tool squatting and rug pull attacks. This paper presents ETDI (Enhanced Tool Definition Infrastructure), a comprehensive security framework that leverages OAuth-enhanced tool definitions and policy-based access control to mitigate these threats."
    },
    {
      title: "Building A Secure Agentic AI Application Leveraging A2A Protocol",
      authors: "Narajala, V. S., Habler, I., Huang, K., & Kulkarni, P.",
      venue: "IEEE WAITI 2025",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2504.16902",
      description: "Comprehensive security analysis of Google's Agent2Agent (A2A) protocol for multi-agent collaboration.",
      abstract: "As Agentic AI systems evolve from basic workflows to complex multi agent collaboration, robust protocols such as Google's Agent2Agent (A2A) become essential enablers. This paper provides a comprehensive security analysis centered on the A2A protocol, examining its fundamental elements and operational dynamics."
    },
    {
      title: "Securing GenAI Multi-Agent Systems Against Tool Squatting: A Zero Trust Registry-Based Approach",
      authors: "Narajala, V. S., Huang, K., & Habler, I.",
      venue: "IEEE AIKE 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2504.19951",
      description: "A Zero Trust Registry-based approach to mitigate tool squatting threats in multi-agent GenAI systems.",
      abstract: "The rise of generative AI (GenAI) multi-agent systems necessitates standardized protocols enabling agents to discover and interact with external tools. This paper analyzes tool squatting threats and introduces a comprehensive Tool Registry system designed to mitigate these risks."
    },
    {
      title: "A Novel Zero-Trust Identity Framework for Agentic AI",
      authors: "Huang, K., Narajala, V. S., Yeoh, J., Ross, J., Raskar, R., et al.",
      venue: "IEEE AIKE 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2505.19301",
      description: "A decentralized zero-trust identity framework specifically designed for autonomous AI agents with fine-grained access controls.",
      abstract: "As AI agents become more autonomous and operate across distributed environments, traditional identity and access management systems prove inadequate. This paper introduces a novel zero-trust identity framework specifically designed for agentic AI systems, featuring decentralized authentication mechanisms and fine-grained access control policies."
    },
    {
      title: "Agent Capability Negotiation and Binding Protocol (ACNBP)",
      authors: "Huang, K., Sheriff, A., Narajala, V. S., & Habler, I.",
      venue: "IEEE AIKE 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2506.13590",
      description: "A protocol framework for autonomous agents to discover, negotiate, and bind to capabilities in multi-agent systems.",
      abstract: "This paper presents the Agent Capability Negotiation and Binding Protocol (ACNBP), a comprehensive framework designed to enable autonomous agents to discover, negotiate, and securely bind to capabilities within multi-agent systems."
    },
    {
      title: "Agent Name Service (ANS): A Universal Directory for Secure AI Agent Discovery and Interoperability",
      authors: "Huang, K., Narajala, V. S., Habler, I., & Sheriff, A.",
      venue: "5th IEEE ICAIC 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2505.10609",
      description: "A universal directory service enabling secure discovery and interoperability of AI agents across platforms.",
      abstract: "The proliferation of AI agents across diverse platforms creates a critical need for standardized discovery and interoperability mechanisms. This paper presents the Agent Name Service (ANS), a universal directory system that enables secure AI agent discovery while maintaining privacy and security requirements."
    },
    {
      title: "Enterprise-Grade Security for the Model Context Protocol (MCP): Frameworks and Mitigation Strategies",
      authors: "Narajala, V. S., & Habler, I.",
      venue: "5th IEEE ICAIC 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2504.08623",
      description: "Enterprise-grade mitigation frameworks and implementation strategies for secure MCP adoption.",
      abstract: "The Model Context Protocol (MCP) provides a standardized framework for AI systems to interact with external data sources and tools. This paper delivers enterprise-grade mitigation frameworks and detailed technical implementation strategies for secure MCP adoption."
    }
  ];

  // OWASP White Papers and Guidelines
  const owaspPublications = [
    {
      title: "State of Agentic AI Security and Governance",
      role: "Contributing Author",
      year: "2025",
      organization: "OWASP",
      link: "https://genai.owasp.org/",
      description: "Comprehensive analysis of the current state of security and governance practices for agentic AI systems."
    },
    {
      title: "Securing Agentic Applications Guide",
      role: "Lead Author",
      year: "2025",
      organization: "OWASP",
      link: "https://genai.owasp.org/",
      description: "Comprehensive guide for securing agentic AI applications in enterprise environments."
    },
    {
      title: "Multi-Agentic System Threat Modeling Guide v1.0",
      role: "Contributing Author",
      year: "2025",
      organization: "OWASP",
      link: "https://genai.owasp.org/resource/multi-agentic-system-threat-modeling-guide-v1-0/",
      description: "A guide that applies OWASP's Agentic AI threat taxonomy to real-world multi-agent systems."
    },
    {
      title: "LLM and GenAI Data Security Best Practices",
      role: "Lead Author",
      year: "2025",
      organization: "OWASP",
      link: "https://genai.owasp.org/resource/llm-and-gen-ai-data-security-best-practices/",
      description: "Comprehensive guide on data security best practices for LLM and Generative AI systems."
    },
    {
      title: "AIVSS Scoring System and Agentic AI Core Security Risks",
      role: "Lead Author",
      year: "2025",
      organization: "OWASP",
      link: "https://aivss.owasp.org/",
      description: "AI Vulnerability Scoring System methodology and core security risks identification for agentic AI."
    }
  ];

  // Peer Review Experience
  const peerReviewVenues = [
    { name: "IEEE Cyber Awareness and Research Symposium (CARS)", count: 5 },
    { name: "AAAI/ACM Conference on AI, Ethics, and Society (AIES)", count: 4 },
    { name: "IEEE Open Journal of the Communications Society", count: 3 },
    { name: "IEEE Consumer Communications & Networking Conference (CCNC)", count: 3 },
    { name: "IEEE International Conference on AI in Cybersecurity (ICAIC)", count: 4 },
    { name: "IEEE International Conference on Software System and Information Processing (ICSSIP)", count: 4 }
  ];

  // Awards
  const awards = [
    {
      title: "2nd Place - AI Safety & Alignment",
      organization: "UC Berkeley AgentX–LLM Agents MOOC Competition",
      year: "2025",
      description: "Awarded 2nd Place in AI Safety & Alignment in the Research Track, hosted by the Berkeley Center for Responsible, Decentralized Intelligence. Served as team lead on the award-winning project focused on original academic contributions to LLM agent technologies.",
      link: "https://berkeley.edu"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>Publications | Vineeth Sai Narajala</title>
          <meta name="description" content="Research papers, publications, and scholarly contributions by Vineeth Sai Narajala on AI security, agentic AI, and cybersecurity." />
        </Helmet>
        
        <Navbar />
        <main>
          <section className="py-20 bg-cyber-darker relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Publications</h1>
                <div className="w-20 h-1 bg-cyber-green mx-auto mb-4"></div>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Peer-reviewed research, technical reports, and contributions to AI security standards.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Peer-Reviewed Papers */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('peerReviewed')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Award className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Peer-Reviewed Conference Papers</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {peerReviewedPapers.length} papers
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.peerReviewed ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.peerReviewed && (
                    <div className="p-8 pt-0 space-y-4">
                      {peerReviewedPapers.map((publication, index) => (
                        <div key={`peer-${index}`} className="cyber-card p-6">
                          <h5 className="text-lg font-semibold text-white mb-2">{publication.title}</h5>
                          <p className="text-gray-400 text-sm mb-2 italic">{publication.authors}</p>
                          <p className="text-gray-300 mb-3 text-sm">{publication.description}</p>
                          
                          <button 
                            onClick={() => toggleAbstract(`peer-${index}`)}
                            className="flex items-center text-cyber-green hover:text-cyber-green-light mb-2 transition-colors text-sm"
                          >
                            {expandedAbstracts[`peer-${index}`] ? (
                              <>
                                <span>Hide Abstract</span>
                                <ChevronUp className="ml-1 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <span>Show Abstract</span>
                                <ChevronDown className="ml-1 h-4 w-4" />
                              </>
                            )}
                          </button>
                          
                          {expandedAbstracts[`peer-${index}`] && (
                            <div className="mt-2 mb-4 text-gray-300 p-4 bg-cyber-darker/50 rounded border border-cyber-green/10 transition-all duration-200 text-sm">
                              {publication.abstract}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                              {publication.venue}
                            </span>
                            <a href={publication.link} target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:text-cyber-green-light underline text-sm">
                              Read Paper
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preprints Section */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('preprints')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Preprints (arXiv)</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {preprints.length} papers
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.preprints ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.preprints && (
                    <div className="p-8 pt-0 space-y-4">
                      {preprints.map((publication, index) => (
                        <div key={`preprint-${index}`} className="cyber-card p-6">
                          <h5 className="text-lg font-semibold text-white mb-2">{publication.title}</h5>
                          <p className="text-gray-300 mb-3 text-sm">{publication.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-cyber-green text-sm">{publication.organization} ({publication.year})</span>
                            <a href={publication.link} target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:text-cyber-green-light underline text-sm">
                              Read Paper
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* OWASP Publications Section */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('owasp')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Shield className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">OWASP White Papers & Guidelines</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {owaspPublications.length} publications
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.owasp ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.owasp && (
                    <div className="p-8 pt-0 space-y-4">
                      {owaspPublications.map((publication, index) => (
                        <div key={`owasp-${index}`} className="cyber-card p-6">
                          <h5 className="text-lg font-semibold text-white mb-2">{publication.title}</h5>
                          <p className="text-gray-300 mb-3 text-sm">{publication.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                                {publication.role}
                              </span>
                              <span className="text-gray-400 text-sm">({publication.year})</span>
                            </div>
                            <a href={publication.link} target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:text-cyber-green-light underline text-sm">
                              View Resource
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Peer Review Experience */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('peerReview')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Users className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Peer Review Experience</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        23+ reviews
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.peerReview ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.peerReview && (
                    <div className="p-8 pt-0">
                      <p className="text-gray-300 mb-6">
                        Served as a peer reviewer for leading IEEE and ACM conferences and journals, evaluating cutting-edge research in AI security, cybersecurity, and communications.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {peerReviewVenues.map((venue, index) => (
                          <div key={index} className="cyber-card p-4 flex justify-between items-center">
                            <span className="text-white text-sm">{venue.name}</span>
                            <span className="px-2 py-1 bg-cyber-green/20 rounded text-cyber-green text-sm">
                              {venue.count} reviews
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Awards */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('awards')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Star className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Awards & Recognition</h3>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.awards ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.awards && (
                    <div className="p-8 pt-0 space-y-4">
                      {awards.map((award, index) => (
                        <div key={index} className="cyber-card p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h5 className="text-lg font-semibold text-white">{award.title}</h5>
                              <p className="text-cyber-green text-sm">{award.organization}</p>
                            </div>
                            <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                              {award.year}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">{award.description}</p>
                        </div>
                      ))}
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

export default Publications;
