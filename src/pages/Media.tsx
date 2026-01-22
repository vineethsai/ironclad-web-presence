import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Globe, Mic, ExternalLink, Newspaper, Youtube, Radio } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const Media = () => {
  const mediaAppearances = {
    ans: [
      {
        title: "OWASP Proposes a Way for Enterprises to Automatically Identify AI Agents",
        source: "InfoWorld",
        link: "https://www.infoworld.com/article/3991376/owasp-proposes-a-way-for-enterprises-to-automatically-identify-ai-agents.html",
        description: "Featured coverage of the OWASP Agent Name Service (ANS) proposal, with direct quotes on the security-first design and PKI integration."
      },
      {
        title: "The Agent Name Service: It's Like DNS But for AI Agents",
        source: "The Register",
        link: "https://www.theregister.com/2025/05/20/agent_name_service_proposal/",
        description: "Coverage of ANS as a protocol-agnostic registry system for secure AI agent discovery and interoperability."
      },
      {
        title: "Agent Name Service: A Secure Pathway for AI Agent Discovery",
        source: "BlogSec",
        link: "https://www.blogsec.info/agent-name-service-ans-a-secure-pathway-for-ai-agent-discovery-in-decentralised-ecosystems/",
        description: "In-depth analysis of ANS for secure AI agent discovery in decentralized ecosystems."
      },
      {
        title: "Agent Name Service for Secure AI Agent Discovery",
        source: "AIGL Blog",
        link: "https://www.aigl.blog/agent-name-service-ans-for-secure-ai-agent-discovery/",
        description: "Technical overview of the ANS framework and its applications."
      },
      {
        title: "Agent Name Service Resource",
        source: "OWASP GenAI",
        link: "https://genai.owasp.org/resource/agent-name-service-ans-for-secure-ai-agent-discovery-v1-0/",
        description: "Official OWASP resource page for the Agent Name Service specification."
      },
      {
        title: "The Agent Name Service: It's Like DNS But for AI Agents",
        source: "Daily.dev",
        link: "https://app.daily.dev/posts/the-agent-name-service-it-s-like-dns-but-for-ai-agents-hbb4keyl",
        description: "Developer community coverage of ANS and its implications for AI agent ecosystems."
      }
    ],
    mcp: [
      {
        title: "AI Agent Interoperability: MCP Vulnerabilities & Enterprise Security",
        source: "Cloud Wars",
        link: "https://cloudwars.com/ai/ai-agent-interoperability-community-project-details-mcp-vulnerabilities-enterprise-security-measures/",
        description: "Coverage of MCP vulnerability research and enterprise security measures."
      },
      {
        title: "MCP Security Research Briefing",
        source: "Wiz",
        link: "https://www.wiz.io/blog/mcp-security-research-briefing",
        description: "Security research briefing on Model Context Protocol vulnerabilities and mitigations."
      },
      {
        title: "Exploiting MCP Tool Parameters Research",
        source: "HiddenLayer",
        link: "https://hiddenlayer.com/innovation-hub/exploiting-mcp-tool-parameters/",
        description: "Research on exploiting MCP tool parameters and security implications."
      },
      {
        title: "Securing MCP Servers: Key Lessons from a Vulnerable Project",
        source: "OpenExploit",
        link: "https://www.openexploit.in/securing-mcp-servers-key-lessons-from-a-vulnerable-project/",
        description: "Analysis of lessons learned from the Vulnerable MCP project."
      },
      {
        title: "The Permission Pitfall: Securing MCP Servers Without Limiting Value",
        source: "Formal",
        link: "https://www.joinformal.com/blog/the-permission-pitfall-securing-mcp-servers-without-limiting-value/",
        description: "Discussion on balancing MCP security with functionality."
      },
      {
        title: "Setting the New Frontier: Open Collaboration on MCP Security",
        source: "OWASP GenAI",
        link: "https://genai.owasp.org/resource/2504/17/setting-the-new-frontier-the-power-of-open-collaboration-on-mcp-security/",
        description: "OWASP article on collaborative MCP security research."
      },
      {
        title: "Zero Trust Security Framework for MCP",
        source: "Market Research",
        link: "https://marketresearch.com/2025/04/17/researchers-from-aws-and-intuit-propose-a-zero-trust-security-framework-to-protect-the-model-context-protocol-mcp-from-tool-poisoning-and-unauthorized-access/",
        description: "Coverage of the Zero Trust security framework proposal for MCP protection."
      },
      {
        title: "MCP Security Research Briefing: A Safety Analysis Tutorial",
        source: "Cy3erSec",
        link: "https://cy3ersec.uk/blog/mcp-security-research-briefing-a-safety-analysis-tutorial",
        description: "Tutorial on MCP safety analysis methodologies."
      }
    ],
    aivss: [
      {
        title: "OWASP Global AppSec: New AI Vulnerability Scoring System Unveiled",
        source: "SC World",
        link: "https://www.scworld.com/resource/owasp-global-appsec-new-ai-vulnerability-scoring-system-unveiled",
        description: "Coverage of the AIVSS framework unveiling at OWASP Global AppSec conference."
      },
      {
        title: "New AI Vulnerability Scoring System Announced to Address Gaps in CVSS",
        source: "The Cyber Express",
        link: "https://thecyberexpress.com/owasp-ai-vulnerability-scoring-system-aivss/",
        description: "Featured coverage of AIVSS launch, with quotes on addressing the non-deterministic nature of Agentic AI systems."
      },
      {
        title: "Toward a Global AI Vulnerability Standard",
        source: "ZATAZ",
        link: "https://www.zataz.com/toward-a-global-ai-vulnerability-standard/",
        description: "International coverage of AIVSS as a redefined vulnerability model for AI, highlighting the framework's approach to measuring autonomy, adaptability, and tool interaction risks."
      }
    ],
    tools: [
      {
        title: "Securing AI Agents with Cisco's Open-Source A2A Scanner",
        source: "Cisco Blogs",
        link: "https://blogs.cisco.com/ai/securing-ai-agents-with-ciscos-open-source-a2a-scanner",
        description: "Official Cisco blog announcing the A2A Scanner open-source security framework for autonomous agent networks."
      },
      {
        title: "AI Security Integration",
        source: "Lumeau.ai",
        link: "https://lumeau.ai/",
        description: "Integration of AI security frameworks and tools."
      },
      {
        title: "MCP Audit Trails Implementation",
        source: "Dhanu.one",
        link: "https://www.dhanu.one/blog/mcp-audit-trails",
        description: "Implementation guide for MCP audit trails."
      },
      {
        title: "DiscoverAI Channel Feature",
        source: "YouTube - DiscoverAI",
        link: "https://www.youtube.com/watch?v=h_6unOXfv4&ab_channel=DiscoverAI",
        description: "Video feature on AI security research and frameworks."
      }
    ]
  };

  const podcastAppearances = [
    {
      title: "Model Context Protocol (MCP) - Potential & Pitfalls",
      show: "Resilient Cyber Podcast",
      host: "Chris Hughes",
      link: "https://www.resilientcyber.io/p/resilient-cyber-w-vineeth-sai-narajala",
      description: "Discussion on MCP's role in the emerging Agentic AI ecosystem and security considerations for practitioners. Covered tool poisoning, rug pull attacks, and enterprise security best practices.",
      tags: ["MCP Security", "Agentic AI", "Enterprise Security"]
    },
    {
      title: "MCP Security Research Deep Dive",
      show: "YouTube Security Interview",
      host: "Security Research Channel",
      link: "https://www.youtube.com/watch?v=IHGfv-7I2gI&pp=ygUYdmluZWV0aCBzYWkgbmFyYWphbGEgbWNw",
      description: "Video interview discussing MCP security research, vulnerability assessments, and enterprise security considerations for AI agent deployments.",
      tags: ["Video Interview", "MCP Research", "Vulnerability Assessment"]
    },
    {
      title: "AI Security Technical Deep Dive",
      show: "Technical Deep Dive Series",
      host: "Industry Experts",
      link: "https://www.youtube.com/watch?v=ESxdT2dWMtc&list=PLbIIzrns6QE_SV0_N2Nkkuo_CWgZuHjUN&index=3",
      description: "Part of a technical series discussing advanced AI security topics, threat modeling for LLM applications, and practical implementation of security frameworks.",
      tags: ["Technical Series", "AI Security", "Threat Modeling"]
    }
  ];

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
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear_gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Media</h1>
                <div className="w-20 h-1 bg-cyber-green mx-auto mb-4"></div>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Press coverage, media appearances, and podcast interviews on AI security research and frameworks.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Press Coverage */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20 p-8">
                  <div className="flex items-center mb-6">
                    <Newspaper className="h-6 w-6 text-cyber-green mr-3" />
                    <h3 className="text-2xl font-bold text-white">Press Coverage</h3>
                  </div>

                  {/* ANS Coverage */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-cyber-green mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Agent Name Service (ANS) Coverage
                    </h4>
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
                          <p className="text-cyber-green text-sm mb-2">{item.source}</p>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* MCP Security Coverage */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-cyber-green mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      MCP Security Research Coverage
                    </h4>
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
                          <p className="text-cyber-green text-sm mb-2">{item.source}</p>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* AIVSS Coverage */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-cyber-green mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      AIVSS (AI Vulnerability Scoring System) Coverage
                    </h4>
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
                          <p className="text-cyber-green text-sm mb-2">{item.source}</p>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Industry Tools */}
                  <div>
                    <h4 className="text-xl font-semibold text-cyber-green mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Industry Integration & Tools
                    </h4>
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
                          <p className="text-cyber-green text-sm mb-2">{item.source}</p>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Podcast Appearances */}
                <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20 p-8">
                  <div className="flex items-center mb-6">
                    <Mic className="h-6 w-6 text-cyber-green mr-3" />
                    <h3 className="text-2xl font-bold text-white">Podcast & Video Appearances</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    Speaking engagements on cybersecurity podcasts and video interviews discussing AI security, MCP vulnerabilities, and agentic AI systems.
                  </p>
                  
                  <div className="space-y-6">
                    {podcastAppearances.map((podcast, index) => (
                      <div key={index} className="cyber-card p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-cyber-green/20 rounded-full p-3">
                            {podcast.link.includes('youtube') ? (
                              <Youtube className="h-6 w-6 text-cyber-green" />
                            ) : (
                              <Radio className="h-6 w-6 text-cyber-green" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-xl font-semibold text-white">{podcast.title}</h4>
                                <p className="text-cyber-green">{podcast.show}</p>
                                {podcast.host && (
                                  <p className="text-gray-400 text-sm">Host: {podcast.host}</p>
                                )}
                              </div>
                              <a 
                                href={podcast.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-cyber-green/20 border border-cyber-green/30 rounded text-cyber-green text-sm hover:bg-cyber-green/30 transition-colors flex items-center"
                              >
                                {podcast.link.includes('youtube') ? 'Watch' : 'Listen'}
                                <ExternalLink className="h-3 w-3 ml-2" />
                              </a>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">{podcast.description}</p>
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
