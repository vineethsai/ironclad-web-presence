/**
 * Open-source projects. Star and fork counts are not typed in here: `npm run fetch-github`
 * (scripts/fetchGithubStats.ts) refreshes them into src/data/github.json.
 */

export interface OpenSourceProject {
  name: string;
  /** "owner/name" on GitHub */
  repo: string;
  org: string;
  role: string;
  description: string;
  website?: string;
  blog?: string;
  featured?: boolean;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'DefenseClaw',
    repo: 'cisco-ai-defense/defenseclaw',
    org: 'Cisco AI Defense',
    role: 'Top contributor',
    description:
      'Security governance for AI agents. Runs agents such as enterprise coding agents in sandboxes like NVIDIA OpenShell, with one policy that follows the signed-in user. Launched at RSAC 2026.',
    website: 'https://cisco-ai-defense.github.io/defenseclaw/',
    blog: 'https://blogs.cisco.com/ai/protect-enterprise-coding-agents-with-cisco-defenseclaw-and-nvidia-openshell',
    featured: true,
  },
  {
    name: 'Skill Scanner',
    repo: 'cisco-ai-defense/skill-scanner',
    org: 'Cisco AI Defense',
    role: 'Top contributor',
    description: 'A security scanner for AI agent skills, catching malicious or risky skills before agents use them.',
    website: 'https://cisco-ai-defense.github.io/docs/skill-scanner',
    featured: true,
  },
  {
    name: 'A2A Scanner',
    repo: 'cisco-ai-defense/a2a-scanner',
    org: 'Cisco AI Defense',
    role: 'Contributor',
    description:
      'Scans Agent-to-Agent (A2A) protocol implementations with static analysis, runtime monitoring, and AI-assisted detection.',
    blog: 'https://blogs.cisco.com/ai/securing-ai-agents-with-ciscos-open-source-a2a-scanner',
  },
  {
    name: 'Adversarial Hubness Detector',
    repo: 'cisco-ai-defense/adversarial-hubness-detector',
    org: 'Cisco AI Defense',
    role: 'Research co-author',
    description:
      'Detects poisoned “hub” documents that hijack retrieval in RAG and vector databases. The tool from our adversarial hubness paper.',
  },
  {
    name: 'Vulnerable MCP',
    repo: 'vineethsai/vulnerablemcp',
    org: 'Personal',
    role: 'Creator',
    description:
      'A community database of Model Context Protocol (MCP) vulnerabilities, from tool poisoning and rug pulls to data exfiltration.',
    website: 'https://vulnerablemcp.info/',
    featured: true,
  },
  {
    name: 'MAIF',
    repo: 'mbhatt1/maif',
    org: 'Research',
    role: 'Top contributor',
    description:
      'A cryptographically secure, auditable file format for AI agent memory with provenance tracking. The code for the MAIF paper.',
  },
  {
    name: 'Agentic Security Initiative (ASI)',
    repo: 'vineethsai/asi',
    org: 'Personal',
    role: 'Creator',
    description:
      'Threat models, verification standards, and security controls for AI agent architectures, built on OWASP AISVS and the NIST AI RMF.',
    website: 'https://agenticsecurity.info/',
  },
  {
    name: 'AIVSS',
    repo: 'vineethsai/aivss',
    org: 'OWASP AIVSS',
    role: 'Co-lead',
    description: 'Reference implementation and tooling for the OWASP AI Vulnerability Scoring System.',
    website: 'https://aivss.owasp.org/',
  },
  {
    name: 'MCP ETDI docs',
    repo: 'vineethsai/MCP-ETDI-docs',
    org: 'Personal',
    role: 'Creator',
    description:
      'Documentation for the Enhanced Tool Definition Interface (ETDI): OAuth-backed, signed tool definitions and policy-based access control for MCP.',
  },
  {
    name: 'Tool Registry',
    repo: 'vineethsai/tool-registry',
    org: 'Personal',
    role: 'Creator',
    description: 'Agent and tool registry that vends scoped, just-in-time credentials to AI agents.',
  },
  {
    name: 'Agent Name Service (ANS)',
    repo: 'vineethsai/ANS',
    org: 'Personal',
    role: 'Creator',
    description: 'Reference implementation of the Agent Name Service protocol for agent discovery and verification.',
  },
];
