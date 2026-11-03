/** Home page "Selected work" cards. Star counts come from src/data/github.json via `repo`. */

export interface FeaturedItem {
  title: string;
  kind: string;
  icon: 'identity' | 'scoring' | 'defense' | 'scanner' | 'tools' | 'threat';
  description: string;
  repo?: string;
  links: { label: string; href: string }[];
}

export const featuredWork: FeaturedItem[] = [
  {
    title: 'Agent Name Service (ANS)',
    kind: 'Standard',
    icon: 'identity',
    description:
      'DNS-style, PKI-backed identity and discovery for AI agents. Published at IEEE ICAIC 2026, now an IETF draft (v2), adopted by GoDaddy, and being launched as an open project at the Linux Foundation.',
    links: [
      { label: 'IETF draft', href: 'https://datatracker.ietf.org/doc/draft-narajala-courtney-ansv2/' },
      {
        label: 'Linux Foundation',
        href: 'https://www.linuxfoundation.org/press/linux-foundation-announces-intent-to-launch-agent-name-service-to-establish-trusted-identity-infrastructure-for-ai-agents',
      },
      { label: 'Paper', href: 'https://doi.org/10.1109/ICAIC67076.2026.11395757' },
    ],
  },
  {
    title: 'OWASP AIVSS',
    kind: 'Standard',
    icon: 'scoring',
    description:
      'A vulnerability scoring system for agentic AI that captures what CVSS misses: autonomy, tool use, and non-deterministic behavior. I co-lead the project.',
    links: [{ label: 'aivss.owasp.org', href: 'https://aivss.owasp.org/' }],
  },
  {
    title: 'DefenseClaw',
    kind: 'Open source · Cisco',
    icon: 'defense',
    repo: 'cisco-ai-defense/defenseclaw',
    description:
      'Cisco’s open-source security governance for AI agents, launched at RSAC 2026. It sandboxes agents like enterprise coding agents with one policy that follows the user. I’m its top contributor.',
    links: [
      { label: 'GitHub', href: 'https://github.com/cisco-ai-defense/defenseclaw' },
      {
        label: 'Announcement',
        href: 'https://blogs.cisco.com/ai/protect-enterprise-coding-agents-with-cisco-defenseclaw-and-nvidia-openshell',
      },
    ],
  },
  {
    title: 'Skill Scanner',
    kind: 'Open source · Cisco',
    icon: 'scanner',
    repo: 'cisco-ai-defense/skill-scanner',
    description:
      'A security scanner for AI agent skills that catches malicious or risky skills before agents use them. I’m its top contributor.',
    links: [{ label: 'GitHub', href: 'https://github.com/cisco-ai-defense/skill-scanner' }],
  },
  {
    title: 'Enterprise-grade security for MCP',
    kind: 'Paper · IEEE ICAIC 2026',
    icon: 'tools',
    description:
      'Threats and controls for the Model Context Protocol, from tool poisoning to rug pulls. My most-cited paper, and the basis for the ETDI extension and the Vulnerable MCP project.',
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1109/ICAIC67076.2026.11395723' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2504.08623' },
      { label: 'Vulnerable MCP', href: 'https://vulnerablemcp.info/' },
    ],
  },
  {
    title: 'Securing Agentic AI: threat model',
    kind: 'Paper · IEEE ACAI 2025',
    icon: 'threat',
    description:
      'A threat model and mitigation framework for generative AI agents, covering reasoning, memory, tool, and multi-agent attacks.',
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1109/ACAI68217.2025.11406310' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2504.19956' },
    ],
  },
];
