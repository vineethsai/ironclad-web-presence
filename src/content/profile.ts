/**
 * Who I am, in one place. The hero, About, footer, contact, and page metadata all read from here.
 */

export const profile = {
  name: 'Vineeth Sai Narajala',
  shortName: 'Vineeth Sai',
  title: 'AI Security Researcher',
  employer: 'Cisco',
  location: 'New York, NY',
  siteUrl: 'https://vineethsai.com',

  /** One sentence used for page descriptions and link previews. */
  summary:
    'AI security researcher at Cisco working on securing AI agents: agent identity (Agent Name Service), MCP and tool security, and the OWASP AI Vulnerability Scoring System.',

  /** About section, first person. Each string is a paragraph. */
  bio: [
    "I'm an AI security researcher at Cisco, where I work on keeping AI agents safe to deploy: how they prove who they are, which tools they're allowed to call, and how to catch them when they misbehave.",
    "Most of my work ends up as open standards and open-source tools. I co-authored the Agent Name Service (ANS), an identity layer for AI agents that is now an IETF draft and is being launched at the Linux Foundation. I co-lead the OWASP AI Vulnerability Scoring System (AIVSS), and I'm the top contributor to Cisco's open-source DefenseClaw and Skill Scanner.",
    'Before Cisco I worked on security at Meta and on generative AI security at AWS, and started out in threat intelligence and application security at Nordstrom.',
  ],

  links: {
    github: 'https://github.com/vineethsai',
    linkedin: 'https://www.linkedin.com/in/vineethsai/',
    scholar: 'https://scholar.google.com/citations?user=hIVoKbIAAAAJ&hl=en',
    orcid: 'https://orcid.org/0009-0007-4553-9930',
    semanticScholar: 'https://www.semanticscholar.org/author/2355085670',
  },

  /** What I'm open to (contact section). */
  openTo: ['Research collaboration', 'Talks and panels', 'Standards work', 'Podcasts and interviews'],
} as const;

/** Focus areas shown in the About section. */
export const focusAreas = [
  {
    key: 'identity',
    title: 'Agent identity',
    description:
      'Verifiable identity and discovery for AI agents. Co-author of the Agent Name Service (ANS), a DNS-style, PKI-backed registry now on the IETF track.',
  },
  {
    key: 'tools',
    title: 'MCP and tool security',
    description:
      'Securing how agents call tools: enterprise MCP security, signed tool definitions (ETDI), and zero-trust tool registries that stop tool squatting.',
  },
  {
    key: 'scoring',
    title: 'AI vulnerability scoring',
    description:
      'Co-lead of OWASP AIVSS, a scoring system for agentic AI risks that CVSS was never built to capture.',
  },
  {
    key: 'defense',
    title: 'Agent runtime defense',
    description:
      'Open-source tools that scan and guard agents in practice, from coding agents and agent skills to RAG pipelines.',
  },
] as const;
