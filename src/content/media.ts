/** Press coverage and podcast/video interviews. Dates are "YYYY" or "YYYY-MM[-DD]". */

export type PressTopic = 'ans' | 'mcp' | 'aivss' | 'tools';

export const pressTopics: Record<PressTopic, string> = {
  ans: 'Agent Name Service',
  mcp: 'MCP security',
  aivss: 'AI Vulnerability Scoring System',
  tools: 'Open-source tools',
};

export interface PressItem {
  title: string;
  outlet: string;
  date: string;
  url: string;
  topic: PressTopic;
  summary: string;
  /** Shown in the "Featured" row at the top of the Media page. */
  featured?: boolean;
}

export const press: PressItem[] = [
  {
    title: 'Linux Foundation Announces Intent to Launch Agent Name Service to Establish Trusted Identity Infrastructure for AI Agents',
    outlet: 'Linux Foundation',
    date: '2026-06-23',
    url: 'https://www.linuxfoundation.org/press/linux-foundation-announces-intent-to-launch-agent-name-service-to-establish-trusted-identity-infrastructure-for-ai-agents',
    topic: 'ans',
    summary: 'The Linux Foundation announces it will host ANS as an open, DNS-anchored identity standard for AI agents, with a quote from me as ANS co-author.',
    featured: true,
  },
  {
    title: 'Linux Foundation extends DNS to AI agents with new Agent Name Service',
    outlet: 'SiliconANGLE',
    date: '2026-06-23',
    url: 'https://siliconangle.com/2026/06/23/linux-foundation-extends-dns-ai-agents-new-agent-name-service/',
    topic: 'ans',
    summary: 'Covers the Linux Foundation launch and traces ANS back to the original paper, naming me as co-author.',
    featured: true,
  },
  {
    title: 'Can DNS become the basis for AI agent identity?',
    outlet: 'The New Stack',
    date: '2026-06-23',
    url: 'https://thenewstack.io/can-dns-become-the-basis-for-ai-agent-identity',
    topic: 'ans',
    summary: 'Compares ANS with other DNS-based agent identity proposals and quotes me on extending DNS trust to agents.',
  },
  {
    title: 'Linux Foundation unveils DNS-based identity standard for AI agents',
    outlet: 'Biometric Update',
    date: '2026-06-25',
    url: 'https://www.biometricupdate.com/202606/linux-foundation-unveils-dns-based-identity-standard-for-ai-agents',
    topic: 'ans',
    summary: 'Covers the Linux Foundation ANS announcement, including my quote on anchoring agent identity in DNS.',
  },
  {
    title: 'New Linux Foundation project aims to bring DNS-style trust to AI agents',
    outlet: 'InfoWorld',
    date: '2026-06-25',
    url: 'https://www.infoworld.com/article/4189361/new-linux-foundation-project-aims-to-bring-dns-style-trust-to-ai-agents.html',
    topic: 'ans',
    summary: 'Coverage of the Agent Name Service launching as a Linux Foundation project.',
  },
  {
    title: 'Agent identity gets a DNS anchor: how GoDaddy built the Agent Name Service, then gave it to the Linux Foundation',
    outlet: 'diginomica',
    date: '2026-07-14',
    url: 'https://diginomica.com/agent-identity-gets-dns-anchor-how-godaddy-built-agent-name-service-then-gave-it-linux-foundation',
    topic: 'ans',
    summary: 'How GoDaddy built and ran ANS before contributing it to the Linux Foundation.',
  },
  {
    title: 'Cisco debuts new AI agent security features, open-source DefenseClaw tool',
    outlet: 'SiliconANGLE',
    date: '2026-03-23',
    url: 'https://siliconangle.com/2026/03/23/cisco-debuts-new-ai-agent-security-features-open-source-defenseclaw-tool/',
    topic: 'tools',
    summary: 'Coverage of Cisco launching DefenseClaw, the open-source agent security project I’m the top contributor to, at RSAC 2026.',
  },
  {
    title: "OWASP Proposes a Way for Enterprises to Automatically Identify AI Agents",
    outlet: "InfoWorld",
    date: "2025",
    url: "https://www.infoworld.com/article/3991376/owasp-proposes-a-way-for-enterprises-to-automatically-identify-ai-agents.html",
    topic: 'ans',
    summary: "Featured coverage of the OWASP Agent Name Service (ANS) proposal, with direct quotes on the security-first design and PKI integration.",
    featured: true,
  },
  {
    title: "The Agent Name Service: It's Like DNS But for AI Agents",
    outlet: "The Register",
    date: "2025-05-20",
    url: "https://www.theregister.com/2025/05/20/agent_name_service_proposal/",
    topic: 'ans',
    summary: "Coverage of ANS as a protocol-agnostic registry system for secure AI agent discovery and interoperability.",
  },
  {
    title: "When Good Tools Go Bad: AI Tool Poisoning and How to Stop Your AI From Acting as a Double Agent",
    outlet: "Secure Code Warrior",
    date: "2025",
    url: "https://www.securecodewarrior.com/article/when-good-tools-go-bad-ai-tool-poisoning-and-how-to-stop-your-ai-from-acting-as-a-double-agent",
    topic: 'mcp',
    summary: "Featured with direct quote: 'As AI systems become more autonomous and start interacting directly with external tools and real-time data through things like MCP, making sure those interactions are secure becomes absolutely essential.'",
  },
  {
    title: "AI Agent Interoperability: MCP Vulnerabilities & Enterprise Security",
    outlet: "Cloud Wars",
    date: "2025",
    url: "https://cloudwars.com/ai/ai-agent-interoperability-community-project-details-mcp-vulnerabilities-enterprise-security-measures/",
    topic: 'mcp',
    summary: "Coverage of MCP vulnerability research and enterprise security measures.",
  },
  {
    title: "MCP Security Research Briefing",
    outlet: "Wiz",
    date: "2025",
    url: "https://www.wiz.io/blog/mcp-security-research-briefing",
    topic: 'mcp',
    summary: "Security research briefing on Model Context Protocol vulnerabilities and mitigations.",
  },
  {
    title: "Exploiting MCP Tool Parameters Research",
    outlet: "HiddenLayer",
    date: "2025",
    url: "https://hiddenlayer.com/innovation-hub/exploiting-mcp-tool-parameters/",
    topic: 'mcp',
    summary: "Research on exploiting MCP tool parameters and security implications.",
  },
  {
    title: "Securing MCP Servers: Key Lessons from a Vulnerable Project",
    outlet: "OpenExploit",
    date: "2025",
    url: "https://www.openexploit.in/securing-mcp-servers-key-lessons-from-a-vulnerable-project/",
    topic: 'mcp',
    summary: "Analysis of lessons learned from the Vulnerable MCP project.",
  },
  {
    title: "The Permission Pitfall: Securing MCP Servers Without Limiting Value",
    outlet: "Formal",
    date: "2025",
    url: "https://www.joinformal.com/blog/the-permission-pitfall-securing-mcp-servers-without-limiting-value/",
    topic: 'mcp',
    summary: "Discussion on balancing MCP security with functionality.",
  },
  {
    title: "Zero Trust Security Framework for MCP",
    outlet: "Market Research",
    date: "2025",
    url: "https://marketresearch.com/2025/04/17/researchers-from-aws-and-intuit-propose-a-zero-trust-security-framework-to-protect-the-model-context-protocol-mcp-from-tool-poisoning-and-unauthorized-access/",
    topic: 'mcp',
    summary: "Coverage of the Zero Trust security framework proposal for MCP protection.",
  },
  {
    title: "OWASP Global AppSec: New AI Vulnerability Scoring System Unveiled",
    outlet: "SC World",
    date: "2025",
    url: "https://www.scworld.com/resource/owasp-global-appsec-new-ai-vulnerability-scoring-system-unveiled",
    topic: 'aivss',
    summary: "Coverage of the AIVSS framework unveiling at OWASP Global AppSec conference.",
  },
  {
    title: "New AI Vulnerability Scoring System Announced to Address Gaps in CVSS",
    outlet: "The Cyber Express",
    date: "2025",
    url: "https://thecyberexpress.com/owasp-ai-vulnerability-scoring-system-aivss/",
    topic: 'aivss',
    summary: "Featured coverage of AIVSS launch, with quotes on addressing the non-deterministic nature of Agentic AI systems.",
  },
  {
    title: "Toward a Global AI Vulnerability Standard",
    outlet: "ZATAZ",
    date: "2025",
    url: "https://www.zataz.com/toward-a-global-ai-vulnerability-standard/",
    topic: 'aivss',
    summary: "International coverage of AIVSS as a redefined vulnerability model for AI, highlighting the framework's approach to measuring autonomy, adaptability, and tool interaction risks.",
  },
];

export interface Podcast {
  title: string;
  show: string;
  host: string;
  date: string;
  url: string;
  videoUrl?: string;
  summary: string;
  topics: string[];
  takeaways?: string[];
}

export const podcasts: Podcast[] = [
  {
    title: 'OWASP expert reveals hidden vulnerabilities in AI agents',
    show: 'LuminaTalks (S2 E6)',
    host: 'Kevin De Pauw',
    date: '2026-02-12',
    url: 'https://podcasts.apple.com/us/podcast/owasp-expert-reveals-hidden-vulnerabilities-in-ai-agents/id1850148643?i=1000749588480',
    videoUrl: 'https://www.youtube.com/watch?v=bEH8DEJHJqk',
    summary: 'A long-form conversation on agentic AI security, OWASP’s work on agent risks, and how the Agent Name Service and GoDaddy are building trust for AI agents.',
    topics: ['Agentic AI', 'OWASP', 'Agent Name Service'],
  },
  {
    title: 'Navigating AI’s new security landscape',
    show: 'The Boring AppSec Podcast (Ep. 25)',
    host: 'Sandesh Mysore Anand & Anshuman Bhartiya',
    date: '2025-08-27',
    url: 'https://www.boringappsec.com/p/ep-25-navigating-ais-new-security',
    videoUrl: 'https://www.youtube.com/watch?v=BrgqP6AStks',
    summary: 'The AI security landscape through MCP, ETDI, and AIVSS: integrating AI into existing systems, identity for AI agents, and why the industry needs shared security practices.',
    topics: ['MCP', 'ETDI', 'AIVSS', 'Agent Identity'],
    takeaways: [
      'MCP simplifies AI integration but raises new security concerns',
      'Identity management is crucial for AI agents',
      'ETDI addresses specific vulnerabilities in AI tools',
      'Start AI agents with minimal permissions',
    ],
  },
  {
    title: 'Co-leader of the OWASP Agentic AI Top 10',
    show: 'Insecure Agents (Ep. 4)',
    host: 'Allie Howe',
    date: '2025-06-26',
    url: 'https://podcasts.apple.com/us/podcast/ep-4-vineeth-sai-narajala-co-leader-of-owasp-agentic-ai-top-10/id1896571149?i=1000770432710',
    videoUrl: 'https://www.youtube.com/watch?v=3F2Hl95Iwzc',
    summary: 'On co-leading OWASP work on agentic AI risks, the Agent Name Service, and AIVSS.',
    topics: ['OWASP', 'Agentic AI', 'ANS', 'AIVSS'],
  },
  {
    title: 'Model Context Protocol (MCP): potential and pitfalls',
    show: 'Resilient Cyber',
    host: 'Chris Hughes',
    date: '2025-05-21',
    url: 'https://www.resilientcyber.io/p/resilient-cyber-w-vineeth-sai-narajala',
    summary: 'MCP’s role in the emerging agentic AI ecosystem and what practitioners need to know: tool poisoning, rug-pull attacks, and enterprise security practices.',
    topics: ['MCP Security', 'Agentic AI', 'Enterprise Security'],
  },
];
