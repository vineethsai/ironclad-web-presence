/**
 * Talks, workshops, and panels. Titles and dates are from each event's own schedule (checked Nov 2026).
 * `date` is "YYYY-MM-DD" or "YYYY-MM"; the Speaking page sorts newest first.
 */

export interface Talk {
  title: string;
  event: string;
  date: string;
  location?: string;
  /** Other speakers on the same session */
  with?: string[];
  link?: string;
  videoUrl?: string;
  slidesUrl?: string;
  summary: string;
  abstract?: string;
}

const SAFEGEN_ABSTRACT =
  'The rapid adoption of generative AI presents unique security challenges that organizations must address while maintaining development velocity. This talk gives practical strategies for building secure GenAI applications, with a focus on AWS services like Bedrock and Amazon Q, and introduces a security framework covering three areas: threat modeling for GenAI systems, secure integration patterns, and robust output validation.';

const THREAT_MODELING_ABSTRACT =
  'Threat modeling needs to change to keep up with large-scale systems. Adding security bottlenecks to development is expensive and costs developer trust, but finding issues late in the SDLC is even more expensive. This talk looks at where traditional approaches like STRIDE and DREAD fall short for cloud architectures, microservices, and rapid release cycles, and shows how to add a fast, scalable threat modeling stage to the SDLC.';

export const talks: Talk[] = [
  {
    title: 'AI Supply Chain Security: Models, Data, Dependencies & Hidden Trust Risks',
    event: 'Global AI Security Summit',
    date: '2026-03-24',
    location: 'San Francisco',
    link: 'https://luma.com/pz7uym7m',
    summary: 'A masterclass during RSAC week on the trust risks hidden in AI models, training data, and dependencies.',
  },
  {
    title: 'Agent Name Service (ANS)',
    event: 'Patchwork: Syncing on AI Standards',
    date: '2025-12-10',
    location: 'Online',
    link: 'https://luma.com/rutu7j4a',
    summary: 'A lightning talk on ANS in the agent registries session of this AI standards mini-conference.',
  },
  {
    title: 'Building Secure Agentic AI Applications',
    event: 'WAITI 2025 at ACSAC',
    date: '2025-12-08',
    location: 'Honolulu',
    link: 'https://www.acsac.org/2025/workshops/waiti/',
    slidesUrl:
      'https://www.acsac.org/2025/workshops/waiti/proceedings/Sai%20Narajala-Building%20Secure%20Agentic%20AI%20Applications_2025-12-08_.pdf',
    summary: 'Paper talk on securing applications built on Google’s Agent2Agent (A2A) protocol, published in the IEEE ACSAC Workshops proceedings.',
  },
  {
    title: 'OWASP AIVSS Project: What It Is, Why We Need It, and How We Are Doing It',
    event: 'OWASP Global AppSec USA 2025',
    date: '2025-11-07',
    location: 'Washington, DC',
    with: ['Michael Bargury', 'Ken Huang'],
    link: 'https://owaspglobalappsecusa2025.sched.com/event/29Ikz',
    videoUrl: 'https://www.youtube.com/watch?v=Vcg_DjYtQig',
    summary: 'Introduces the OWASP AI Vulnerability Scoring System and why agentic AI needs its own way to score risk.',
  },
  {
    title: 'Securing Agentic Applications',
    event: 'Gen AI Application Security & Risk Summit 2025',
    date: '2025-10-09',
    location: 'Online',
    with: ['Idan Habler'],
    link: 'https://cybersecuritysummit.com/summit/owasp-appsec/',
    summary: 'A walkthrough of the OWASP Securing Agentic Applications Guide 1.0 and how to apply it.',
  },
  {
    title: 'Cybersecurity Risks of Generative AI: A Conversation with Vineeth Sai',
    event: 'Tower Research Ventures',
    date: '2025-08-22',
    location: 'New York',
    link: 'https://luma.com/314n01k3',
    summary: 'A fireside conversation on generative AI security vulnerabilities for founders and engineers.',
  },
  {
    title: 'NANDA & Agent Name Service (ANS) Security',
    event: 'Project NANDA (MIT Media Lab)',
    date: '2025-05',
    with: ['Ken Huang', 'Akram Sheriff'],
    link: 'https://nanda.media.mit.edu/',
    videoUrl: 'https://www.youtube.com/watch?v=yVgy5VqgvxE',
    summary: 'Presented the Agent Name Service to MIT’s NANDA initiative, which is building infrastructure for an “Internet of AI agents.”',
  },
  {
    title: 'Securing Agentic Apps',
    event: 'OWASP Agentic Security Open Workshop (RSAC 2025 week)',
    date: '2025-04-30',
    location: 'San Francisco',
    with: ['Idan Habler', 'Rob Truesdell'],
    link: 'https://genai.owasp.org/event/agentic-security-open-workshop-livestream-event-from-rsac-2025',
    videoUrl: 'https://vimeo.com/1084365179',
    summary: 'Workshop session from the OWASP Securing Agentic Applications leads on building agentic AI apps securely.',
  },
  {
    title: 'SafeGen: Accelerating Secure Generative AI Implementation',
    event: 'BSides Harrisburg 2025',
    date: '2025-04-25',
    location: 'Harrisburg, PA',
    link: 'https://eventzilla.net/e/bsides-harrisburg-2025-2138665882',
    summary: 'Practical security patterns for shipping GenAI features quickly without cutting corners.',
    abstract: SAFEGEN_ABSTRACT,
  },
  {
    title: 'SafeGen: Accelerating Secure Generative AI Implementation',
    event: 'BSides Seattle 2025',
    date: '2025-04-18',
    location: 'Seattle',
    link: 'https://www.bsidesseattle.com/2025-schedule.html',
    summary: 'Practical security patterns for shipping GenAI features quickly without cutting corners.',
    abstract: SAFEGEN_ABSTRACT,
  },
  {
    title: 'Analyzing Zero Trust Architecture in the Age of Agentic GenAI: A Practical Approach',
    event: 'OWASP BASC 2025',
    date: '2025-04-05',
    location: 'Boston',
    link: 'https://owaspbasc2025.sched.com/event/1xqja',
    videoUrl: 'https://www.youtube.com/watch?v=-o52PXD3Xu4',
    summary: 'Applying zero trust principles to AI agents that generate content, make decisions, and act with little human oversight.',
    abstract:
      'The spread of generative AI agents brings new security challenges. As these autonomous systems generate content, make decisions, and take actions with minimal human oversight, perimeter-based security falls short. This talk examines where Zero Trust Architecture and GenAI agent deployment meet, and proposes a framework for integrating AI agents securely in enterprise environments.',
  },
  {
    title: 'SafeGen: Accelerating Secure Generative AI Implementation',
    event: 'CypherCon 2025',
    date: '2025-04',
    location: 'Milwaukee',
    link: 'https://cyphercon.com/portfolio/safegen-accelerating-secure-generative-ai-implementation/',
    summary: 'Practical security patterns for shipping GenAI features quickly without cutting corners.',
    abstract: SAFEGEN_ABSTRACT,
  },
  {
    title: 'Scaling the Security Wall: Agile Threat Modeling for Complex Systems',
    event: 'BSides Austin 2024',
    date: '2024-12-06',
    location: 'Austin',
    link: 'https://bsidesaustin.com/schedule/',
    summary: 'Making threat modeling fast enough to keep up with cloud architectures, microservices, and rapid release cycles.',
    abstract: THREAT_MODELING_ABSTRACT,
  },
  {
    title: 'Scaling the Security Wall: Agile Threat Modeling for Complex Systems',
    event: 'BSidesCharm 2024',
    date: '2024-04-20',
    location: 'Baltimore',
    link: 'https://web.archive.org/web/20240605103014/https://pretalx.com/bsidescharm2024/talk/X7BQUZ/',
    videoUrl: 'https://www.youtube.com/watch?v=lZYATxO0rMA',
    summary: 'Making threat modeling fast enough to keep up with cloud architectures, microservices, and rapid release cycles.',
    abstract: THREAT_MODELING_ABSTRACT,
  },
];
