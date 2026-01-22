import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Globe, Mic, ExternalLink, Newspaper, Youtube, Radio, ChevronDown, ChevronUp, Shield, Cpu, FileCode, Wrench, Headphones } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const Media = () => {
  const [expandedSections, setExpandedSections] = useState({
    featured: true,
    ans: true,
    mcp: true,
    aivss: true,
    tools: true,
    podcasts: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Featured/highlight coverage
  const featuredCoverage = [
    {
      title: "OWASP Proposes a Way for Enterprises to Automatically Identify AI Agents",
      source: "InfoWorld",
      sourceType: "tech-news",
      year: "2025",
      link: "https://www.infoworld.com/article/3991376/owasp-proposes-a-way-for-enterprises-to-automatically-identify-ai-agents.html",
      description: "Featured coverage of the OWASP Agent Name Service (ANS) proposal, with direct quotes on the security-first design and PKI integration.",
      highlight: "Direct quotes featured"
    },
    {
      title: "The Agent Name Service: It's Like DNS But for AI Agents",
      source: "The Register",
      sourceType: "tech-news",
      year: "2025",
      link: "https://www.theregister.com/2025/05/20/agent_name_service_proposal/",
      description: "Coverage of ANS as a protocol-agnostic registry system for secure AI agent discovery and interoperability.",
      highlight: "Major tech publication"
    },
    {
      title: "New AI Vulnerability Scoring System Announced to Address Gaps in CVSS",
      source: "The Cyber Express",
      sourceType: "security-news",
      year: "2025",
      link: "https://thecyberexpress.com/owasp-ai-vulnerability-scoring-system-aivss/",
      description: "Featured coverage of AIVSS launch, with quotes on addressing the non-deterministic nature of Agentic AI systems.",
      highlight: "AIVSS launch coverage"
    }
  ];

  const mediaAppearances = {
    ans: [
      {
        title: "OWASP Proposes a Way for Enterprises to Automatically Identify AI Agents",
        source: "InfoWorld",
        sourceType: "tech-news",
        year: "2025",
        link: "https://www.infoworld.com/article/3991376/owasp-proposes-a-way-for-enterprises-to-automatically-identify-ai-agents.html",
        description: "Featured coverage of the OWASP Agent Name Service (ANS) proposal, with direct quotes on the security-first design and PKI integration."
      },
      {
        title: "The Agent Name Service: It's Like DNS But for AI Agents",
        source: "The Register",
        sourceType: "tech-news",
        year: "2025",
        link: "https://www.theregister.com/2025/05/20/agent_name_service_proposal/",
        description: "Coverage of ANS as a protocol-agnostic registry system for secure AI agent discovery and interoperability."
      },
      {
        title: "Agent Name Service: A Secure Pathway for AI Agent Discovery",
        source: "BlogSec",
        sourceType: "security-blog",
        year: "2025",
        link: "https://www.blogsec.info/agent-name-service-ans-a-secure-pathway-for-ai-agent-discovery-in-decentralised-ecosystems/",
        description: "In-depth analysis of ANS for secure AI agent discovery in decentralized ecosystems."
      },
      {
        title: "Agent Name Service for Secure AI Agent Discovery",
        source: "AIGL Blog",
        sourceType: "ai-blog",
        year: "2025",
        link: "https://www.aigl.blog/agent-name-service-ans-for-secure-ai-agent-discovery/",
        description: "Technical overview of the ANS framework and its applications."
      },
      {
        title: "Agent Name Service Resource",
        source: "OWASP GenAI",
        sourceType: "owasp",
        year: "2025",
        link: "https://genai.owasp.org/resource/agent-name-service-ans-for-secure-ai-agent-discovery-v1-0/",
        description: "Official OWASP resource page for the Agent Name Service specification."
      },
      {
        title: "The Agent Name Service: It's Like DNS But for AI Agents",
        source: "Daily.dev",
        sourceType: "developer",
        year: "2025",
        link: "https://app.daily.dev/posts/the-agent-name-service-it-s-like-dns-but-for-ai-agents-hbb4keyl",
        description: "Developer community coverage of ANS and its implications for AI agent ecosystems."
      }
    ],
    mcp: [
      {
        title: "When Good Tools Go Bad: AI Tool Poisoning and How to Stop Your AI From Acting as a Double Agent",
        source: "Secure Code Warrior",
        sourceType: "security-vendor",
        year: "2025",
        link: "https://www.securecodewarrior.com/article/when-good-tools-go-bad-ai-tool-poisoning-and-how-to-stop-your-ai-from-acting-as-a-double-agent",
        description: "Featured with direct quote: 'As AI systems become more autonomous and start interacting directly with external tools and real-time data through things like MCP, making sure those interactions are secure becomes absolutely essential.'"
      },
      {
        title: "AI Agent Interoperability: MCP Vulnerabilities & Enterprise Security",
        source: "Cloud Wars",
        sourceType: "tech-news",
        year: "2025",
        link: "https://cloudwars.com/ai/ai-agent-interoperability-community-project-details-mcp-vulnerabilities-enterprise-security-measures/",
        description: "Coverage of MCP vulnerability research and enterprise security measures."
      },
      {
        title: "MCP Security Research Briefing",
        source: "Wiz",
        sourceType: "security-vendor",
        year: "2025",
        link: "https://www.wiz.io/blog/mcp-security-research-briefing",
        description: "Security research briefing on Model Context Protocol vulnerabilities and mitigations."
      },
      {
        title: "Exploiting MCP Tool Parameters Research",
        source: "HiddenLayer",
        sourceType: "security-vendor",
        year: "2025",
        link: "https://hiddenlayer.com/innovation-hub/exploiting-mcp-tool-parameters/",
        description: "Research on exploiting MCP tool parameters and security implications."
      },
      {
        title: "Securing MCP Servers: Key Lessons from a Vulnerable Project",
        source: "OpenExploit",
        sourceType: "security-blog",
        year: "2025",
        link: "https://www.openexploit.in/securing-mcp-servers-key-lessons-from-a-vulnerable-project/",
        description: "Analysis of lessons learned from the Vulnerable MCP project."
      },
      {
        title: "The Permission Pitfall: Securing MCP Servers Without Limiting Value",
        source: "Formal",
        sourceType: "security-blog",
        year: "2025",
        link: "https://www.joinformal.com/blog/the-permission-pitfall-securing-mcp-servers-without-limiting-value/",
        description: "Discussion on balancing MCP security with functionality."
      },
      {
        title: "Setting the New Frontier: Open Collaboration on MCP Security",
        source: "OWASP GenAI",
        sourceType: "owasp",
        year: "2025",
        link: "https://genai.owasp.org/resource/2504/17/setting-the-new-frontier-the-power-of-open-collaboration-on-mcp-security/",
        description: "OWASP article on collaborative MCP security research."
      },
      {
        title: "Zero Trust Security Framework for MCP",
        source: "Market Research",
        sourceType: "research",
        year: "2025",
        link: "https://marketresearch.com/2025/04/17/researchers-from-aws-and-intuit-propose-a-zero-trust-security-framework-to-protect-the-model-context-protocol-mcp-from-tool-poisoning-and-unauthorized-access/",
        description: "Coverage of the Zero Trust security framework proposal for MCP protection."
      },
      {
        title: "MCP Security Research Briefing: A Safety Analysis Tutorial",
        source: "Cy3erSec",
        sourceType: "security-blog",
        year: "2025",
        link: "https://cy3ersec.uk/blog/mcp-security-research-briefing-a-safety-analysis-tutorial",
        description: "Tutorial on MCP safety analysis methodologies."
      }
    ],
    aivss: [
      {
        title: "OWASP Global AppSec: New AI Vulnerability Scoring System Unveiled",
        source: "SC World",
        sourceType: "security-news",
        year: "2025",
        link: "https://www.scworld.com/resource/owasp-global-appsec-new-ai-vulnerability-scoring-system-unveiled",
        description: "Coverage of the AIVSS framework unveiling at OWASP Global AppSec conference."
      },
      {
        title: "New AI Vulnerability Scoring System Announced to Address Gaps in CVSS",
        source: "The Cyber Express",
        sourceType: "security-news",
        year: "2025",
        link: "https://thecyberexpress.com/owasp-ai-vulnerability-scoring-system-aivss/",
        description: "Featured coverage of AIVSS launch, with quotes on addressing the non-deterministic nature of Agentic AI systems."
      },
      {
        title: "Toward a Global AI Vulnerability Standard",
        source: "ZATAZ",
        sourceType: "security-news",
        year: "2025",
        link: "https://www.zataz.com/toward-a-global-ai-vulnerability-standard/",
        description: "International coverage of AIVSS as a redefined vulnerability model for AI, highlighting the framework's approach to measuring autonomy, adaptability, and tool interaction risks."
      }
    ],
    tools: [
      {
        title: "Securing AI Agents with Cisco's Open-Source A2A Scanner",
        source: "Cisco Blogs",
        sourceType: "enterprise",
        year: "2025",
        link: "https://blogs.cisco.com/ai/securing-ai-agents-with-ciscos-open-source-a2a-scanner",
        description: "Official Cisco blog announcing the A2A Scanner open-source security framework for autonomous agent networks."
      },
      {
        title: "AI Security Integration",
        source: "Lumeau.ai",
        sourceType: "ai-platform",
        year: "2025",
        link: "https://lumeau.ai/",
        description: "Integration of AI security frameworks and tools."
      },
      {
        title: "MCP Audit Trails Implementation",
        source: "Dhanu.one",
        sourceType: "developer",
        year: "2025",
        link: "https://www.dhanu.one/blog/mcp-audit-trails",
        description: "Implementation guide for MCP audit trails."
      }
    ]
  };

  const podcastAppearances = [
    {
      title: "Navigating AI's New Security Landscape",
      show: "BoringAppSec Podcast",
      host: "Sandesh Mysore Anand & Anshuman Bhartiya",
      date: "August 2025",
      type: "podcast",
      link: "https://boringappsec.substack.com/p/ep-25-navigating-ais-new-security",
      description: "Deep dive into the evolving landscape of AI security, focusing on MCP, ETDI, and AIVSS. Discussed the challenges of integrating AI into existing systems, identity management for AI agents, and the need for standardized security practices.",
      keyTakeaways: [
        "MCP simplifies AI integration but raises security concerns",
        "Identity management is crucial for AI agents",
        "ETDI addresses specific vulnerabilities in AI tools",
        "Developers should start with minimal permissions for AI"
      ],
      tags: ["MCP", "ETDI", "AIVSS", "Identity Management"]
    },
    {
      title: "Model Context Protocol (MCP) - Potential & Pitfalls",
      show: "Resilient Cyber Podcast",
      host: "Chris Hughes",
      date: "2025",
      type: "podcast",
      link: "https://www.resilientcyber.io/p/resilient-cyber-w-vineeth-sai-narajala",
      description: "Discussion on MCP's role in the emerging Agentic AI ecosystem and security considerations for practitioners. Covered tool poisoning, rug pull attacks, and enterprise security best practices.",
      tags: ["MCP Security", "Agentic AI", "Enterprise Security"]
    },
    {
      title: "MCP Security Research Deep Dive",
      show: "Security Research Interview",
      host: "Industry Security Researchers",
      date: "2025",
      type: "video",
      link: "https://www.youtube.com/watch?v=IHGfv-7I2gI",
      description: "Video interview discussing MCP security research, vulnerability assessments, and enterprise security considerations for AI agent deployments.",
      tags: ["Video Interview", "MCP Research", "Vulnerability Assessment"]
    },
    {
      title: "Agentic AI Security: Frameworks and Best Practices",
      show: "AI Security Insights",
      host: "Security Community",
      date: "2025",
      type: "video",
      link: "https://www.youtube.com/watch?v=BrgqP6AStks",
      description: "Comprehensive discussion on securing agentic AI systems, covering threat modeling approaches, security frameworks, and practical implementation strategies for enterprise environments.",
      tags: ["Agentic AI", "Security Frameworks", "Enterprise Security"]
    },
    {
      title: "AI Security Technical Deep Dive",
      show: "Technical Deep Dive Series",
      host: "Security Practitioners",
      date: "2025",
      type: "video",
      link: "https://www.youtube.com/watch?v=ESxdT2dWMtc&list=PLbIIzrns6QE_SV0_N2Nkkuo_CWgZuHjUN&index=3",
      description: "Part of a technical series discussing advanced AI security topics, threat modeling for LLM applications, and practical implementation of security frameworks.",
      tags: ["Technical Series", "AI Security", "Threat Modeling"]
    }
  ];

  // Helper function to get source type icon
  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'tech-news':
        return <Newspaper className="h-4 w-4" />;
      case 'security-news':
        return <Shield className="h-4 w-4" />;
      case 'security-blog':
        return <FileCode className="h-4 w-4" />;
      case 'security-vendor':
        return <Shield className="h-4 w-4" />;
      case 'owasp':
        return <Shield className="h-4 w-4" />;
      case 'ai-blog':
      case 'ai-platform':
        return <Cpu className="h-4 w-4" />;
      case 'enterprise':
        return <Globe className="h-4 w-4" />;
      case 'developer':
        return <FileCode className="h-4 w-4" />;
      case 'research':
        return <FileCode className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  // Helper function to get source type color class
  const getSourceTypeClass = (sourceType: string) => {
    switch (sourceType) {
      case 'tech-news':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'security-news':
      case 'security-blog':
      case 'security-vendor':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'owasp':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'ai-blog':
      case 'ai-platform':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'enterprise':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'developer':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-cyber-green/20 text-cyber-green border-cyber-green/30';
    }
  };

  const totalCoverage = mediaAppearances.ans.length + mediaAppearances.mcp.length + mediaAppearances.aivss.length + mediaAppearances.tools.length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>Media | Vineeth Sai Narajala</title>
          <meta name="description" content="Media appearances, press coverage, and podcast interviews featuring Vineeth Sai Narajala on AI security, MCP, and agentic AI." />
        </Helmet>
        
        <Navbar />
        <main>
          <section className="py-20 bg-cyber-darker relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Media</h1>
                <div className="w-20 h-1 bg-cyber-green mx-auto mb-4"></div>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Press coverage, media appearances, and podcast interviews on AI security research and frameworks.
                </p>
                {/* Stats Summary */}
                <div className="flex justify-center gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyber-green">{totalCoverage}+</div>
                    <div className="text-sm text-gray-400">Press Mentions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyber-green">{podcastAppearances.length}</div>
                    <div className="text-sm text-gray-400">Podcasts & Videos</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Featured Coverage */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('featured')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Newspaper className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Featured Coverage</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        Highlights
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.featured ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.featured && (
                    <div className="p-8 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredCoverage.map((item, index) => (
                          <a 
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cyber-card p-6 hover:border-cyber-green/50 transition-all group relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 bg-cyber-green/20 px-3 py-1 rounded-bl text-cyber-green text-xs">
                              {item.highlight}
                            </div>
                            <div className="flex items-start justify-between mb-3 mt-4">
                              <h5 className="text-white font-semibold group-hover:text-cyber-green transition-colors text-lg leading-tight">
                                {item.title}
                              </h5>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 border ${getSourceTypeClass(item.sourceType)}`}>
                                {getSourceIcon(item.sourceType)}
                                {item.source}
                              </span>
                              <span className="text-gray-500 text-xs">{item.year}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                            <div className="mt-4 flex items-center text-cyber-green text-sm group-hover:underline">
                              Read article <ExternalLink className="h-3 w-3 ml-1" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ANS Coverage */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('ans')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Globe className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Agent Name Service (ANS) Coverage</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {mediaAppearances.ans.length} articles
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.ans ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.ans && (
                    <div className="p-8 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mediaAppearances.ans.map((item, index) => (
                          <a 
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cyber-card p-4 hover:border-cyber-green/50 transition-colors group"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-white font-medium group-hover:text-cyber-green transition-colors">
                                {item.title}
                              </h5>
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-cyber-green flex-shrink-0 ml-2" />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 border ${getSourceTypeClass(item.sourceType)}`}>
                                {getSourceIcon(item.sourceType)}
                                {item.source}
                              </span>
                              <span className="text-gray-500 text-xs">{item.year}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* MCP Coverage */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('mcp')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <FileCode className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">MCP Security Research Coverage</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {mediaAppearances.mcp.length} articles
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.mcp ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.mcp && (
                    <div className="p-8 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mediaAppearances.mcp.map((item, index) => (
                          <a 
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cyber-card p-4 hover:border-cyber-green/50 transition-colors group"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-white font-medium group-hover:text-cyber-green transition-colors">
                                {item.title}
                              </h5>
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-cyber-green flex-shrink-0 ml-2" />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 border ${getSourceTypeClass(item.sourceType)}`}>
                                {getSourceIcon(item.sourceType)}
                                {item.source}
                              </span>
                              <span className="text-gray-500 text-xs">{item.year}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* AIVSS Coverage */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('aivss')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Shield className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">AIVSS Coverage</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {mediaAppearances.aivss.length} articles
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.aivss ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.aivss && (
                    <div className="p-8 pt-0">
                      <p className="text-gray-300 mb-4 text-sm">
                        Coverage of the AI Vulnerability Scoring System (AIVSS), a framework designed to address gaps in CVSS for scoring vulnerabilities in non-deterministic AI systems.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mediaAppearances.aivss.map((item, index) => (
                          <a 
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cyber-card p-4 hover:border-cyber-green/50 transition-colors group"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-white font-medium group-hover:text-cyber-green transition-colors">
                                {item.title}
                              </h5>
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-cyber-green flex-shrink-0 ml-2" />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 border ${getSourceTypeClass(item.sourceType)}`}>
                                {getSourceIcon(item.sourceType)}
                                {item.source}
                              </span>
                              <span className="text-gray-500 text-xs">{item.year}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Industry Tools */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('tools')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Wrench className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Industry Integration & Tools</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {mediaAppearances.tools.length} mentions
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.tools ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.tools && (
                    <div className="p-8 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {mediaAppearances.tools.map((item, index) => (
                          <a 
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cyber-card p-4 hover:border-cyber-green/50 transition-colors group"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-white font-medium group-hover:text-cyber-green transition-colors">
                                {item.title}
                              </h5>
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-cyber-green flex-shrink-0 ml-2" />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 border ${getSourceTypeClass(item.sourceType)}`}>
                                {getSourceIcon(item.sourceType)}
                                {item.source}
                              </span>
                              <span className="text-gray-500 text-xs">{item.year}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Podcast & Video Appearances */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
                  <button 
                    onClick={() => toggleSection('podcasts')}
                    className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Mic className="h-6 w-6 text-cyber-green mr-3" />
                      <h3 className="text-2xl font-bold text-white">Podcast & Video Appearances</h3>
                      <span className="ml-3 px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm">
                        {podcastAppearances.length} appearances
                      </span>
                    </div>
                    <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                      {expandedSections.podcasts ? 
                        <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                        <ChevronDown className="h-5 w-5 text-cyber-green" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.podcasts && (
                    <div className="p-8 pt-0">
                      <p className="text-gray-300 mb-6">
                        Speaking engagements on cybersecurity podcasts and video interviews discussing AI security, MCP vulnerabilities, and agentic AI systems.
                      </p>
                      
                      <div className="space-y-6">
                        {podcastAppearances.map((podcast, index) => (
                          <div key={index} className="cyber-card p-6">
                            <div className="flex items-start gap-4">
                              <div className={`rounded-full p-3 flex-shrink-0 ${podcast.type === 'video' ? 'bg-red-500/20' : 'bg-purple-500/20'}`}>
                                {podcast.type === 'video' ? (
                                  <Youtube className={`h-6 w-6 ${podcast.type === 'video' ? 'text-red-400' : 'text-purple-400'}`} />
                                ) : (
                                  <Headphones className="h-6 w-6 text-purple-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                  <div className="min-w-0">
                                    <h4 className="text-xl font-semibold text-white">{podcast.title}</h4>
                                    <p className="text-cyber-green font-medium">{podcast.show}</p>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                      <p className="text-gray-400 text-sm">Host: {podcast.host}</p>
                                      <span className="text-gray-600">•</span>
                                      <p className="text-gray-500 text-sm">{podcast.date}</p>
                                    </div>
                                  </div>
                                  <a 
                                    href={podcast.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 border rounded text-sm hover:opacity-80 transition-colors flex items-center whitespace-nowrap ${
                                      podcast.type === 'video' 
                                        ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30' 
                                        : 'bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30'
                                    }`}
                                  >
                                    {podcast.type === 'video' ? 'Watch' : 'Listen'}
                                    <ExternalLink className="h-3 w-3 ml-2" />
                                  </a>
                                </div>
                                <p className="text-gray-300 text-sm mb-4">{podcast.description}</p>
                                
                                {/* Key Takeaways for BoringAppSec */}
                                {podcast.keyTakeaways && (
                                  <div className="mb-4 p-3 bg-cyber-darker/50 rounded border border-cyber-green/10">
                                    <p className="text-cyber-green text-xs font-medium mb-2">Key Takeaways:</p>
                                    <ul className="text-gray-400 text-sm space-y-1">
                                      {podcast.keyTakeaways.map((takeaway, i) => (
                                        <li key={i} className="flex items-start">
                                          <span className="text-cyber-green mr-2">•</span>
                                          {takeaway}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                <div className="flex flex-wrap gap-2">
                                  {podcast.tags.map((tag, tagIndex) => (
                                    <span 
                                      key={tagIndex}
                                      className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
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

export default Media;
