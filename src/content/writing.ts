/** Articles published elsewhere (Cisco blog, Cloud Security Alliance, OWASP). Newest first is handled by the page. */

export interface Article {
  title: string;
  publication: string;
  /** ISO date (YYYY-MM-DD or YYYY-MM) */
  date: string;
  url: string;
  coAuthors: string[];
  summary: string;
  topics: string[];
}

export const articles: Article[] = [
  {
    title: 'Protect Enterprise Coding Agents with Cisco DefenseClaw and NVIDIA OpenShell',
    publication: 'Cisco Blogs',
    date: '2026-10-21',
    url: 'https://blogs.cisco.com/ai/protect-enterprise-coding-agents-with-cisco-defenseclaw-and-nvidia-openshell',
    coAuthors: ['Ruchika Pandey'],
    summary:
      'AI coding agents act with your permissions. DefenseClaw runs them in NVIDIA OpenShell sandboxes, with one security policy that follows the signed-in user.',
    topics: ['DefenseClaw', 'Coding Agents', 'Open Source'],
  },
  {
    title: 'Introducing the AI Agent Security Scanner for IDEs: Verify Your Agents',
    publication: 'Cisco Blogs',
    date: '2026-04-21',
    url: 'https://blogs.cisco.com/ai/introducing-the-ai-agent-security-scanner-for-ides-verify-your-agents',
    coAuthors: ['Idan Habler'],
    summary: 'A scanner for the agents, MCP servers, and skills running inside AI-powered IDEs like Cursor, VS Code, and Windsurf.',
    topics: ['IDE Security', 'Agent Skills', 'MCP'],
  },
  {
    title: 'Your Model’s Memory Has Been Compromised: Adversarial Hubness in RAG Systems',
    publication: 'Cisco Blogs',
    date: '2026-03-12',
    url: 'https://blogs.cisco.com/ai/your-models-memory-has-been-compromised-adversarial-hubness-in-rag-systems',
    coAuthors: ['Amy Chang', 'Idan Habler'],
    summary:
      'How attackers can plant “hub” documents that show up for huge numbers of RAG queries, and an open-source detector to find them.',
    topics: ['RAG', 'Vector Search', 'Data Poisoning'],
  },
  {
    title: 'Personal AI Agents like OpenClaw Are a Security Nightmare',
    publication: 'Cisco Blogs',
    date: '2026-01-28',
    url: 'https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare',
    coAuthors: ['Amy Chang', 'Idan Habler'],
    summary: 'What goes wrong when personal AI agents get broad access to your accounts, files, and devices.',
    topics: ['Personal Agents', 'OpenClaw', 'Agent Risk'],
  },
  {
    title: 'Securing AI Agents with Cisco’s Open-Source A2A Scanner',
    publication: 'Cisco Blogs',
    date: '2025-12-09',
    url: 'https://blogs.cisco.com/ai/securing-ai-agents-with-ciscos-open-source-a2a-scanner',
    coAuthors: ['Sanket Mendapara'],
    summary:
      'Introduces the open-source A2A Scanner, which checks Agent-to-Agent protocol implementations for threats using static analysis, runtime monitoring, and AI-assisted detection.',
    topics: ['A2A', 'Open Source', 'Agent Security'],
  },
  {
    title: 'AAGATE: A NIST AI RMF-Aligned Governance Platform for Agentic AI',
    publication: 'Cloud Security Alliance',
    date: '2025-12-22',
    url: 'https://cloudsecurityalliance.org/blog/2025/12/22/aagate-a-nist-ai-rmf-aligned-governance-platform-for-agentic-ai',
    coAuthors: ['Ken Huang', 'Kyriakos Rock Lambros', 'Jerry Huang', 'and others'],
    summary:
      'A Kubernetes-native architecture that puts the NIST AI RMF into practice for agentic AI, built on CSA MAESTRO, OWASP AIVSS, and the Agentic AI Red Teaming Guide.',
    topics: ['AI Governance', 'NIST AI RMF', 'AIVSS'],
  },
  {
    title: 'Agentic AI Identity and Access Management: A New Approach',
    publication: 'Cloud Security Alliance',
    date: '2025-08-18',
    url: 'https://cloudsecurityalliance.org/artifacts/agentic-ai-identity-and-access-management-a-new-approach',
    coAuthors: ['Ken Huang', 'CSA AI Safety Working Group'],
    summary:
      'An IAM framework built for AI agents, accounting for their autonomy, short lifetimes, and delegation, using decentralized identifiers, verifiable credentials, and zero trust.',
    topics: ['Agent Identity', 'IAM', 'Zero Trust'],
  },
  {
    title: 'Securing AI’s New Frontier: The Power of Open Collaboration on MCP Security',
    publication: 'OWASP GenAI Security Project',
    date: '2025-04-22',
    url: 'https://genai.owasp.org/2025/04/22/securing-ais-new-frontier-the-power-of-open-collaboration-on-mcp-security/',
    coAuthors: ['Idan Habler', 'Ron F. Del Rosario', 'John Sotiropoulos'],
    summary:
      'A defense-in-depth framework for the Model Context Protocol, covering tool poisoning, zero-trust controls, and deployment patterns for enterprise MCP.',
    topics: ['MCP', 'Tool Poisoning', 'Zero Trust'],
  },
];
