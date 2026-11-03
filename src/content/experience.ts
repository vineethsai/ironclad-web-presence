/**
 * Work history, leadership roles, education, and projects.
 * Used by the home page (current role + leadership) and the Experience page.
 */

export interface Role {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  skills: string[];
}

export const workExperience: Role[] = [
  {
    title: 'Senior Technical Leader, AI Security Research',
    company: 'Cisco',
    period: 'Nov 2025 – Present',
    location: 'New York, NY',
    highlights: [
      'Top contributor to two of Cisco’s open-source AI security projects: DefenseClaw, security governance for AI agents (launched at RSAC 2026), and Skill Scanner, a scanner for AI agent skills',
      'Research on new attacks against AI systems, including adversarial hubness in RAG pipelines and the risks of personal AI agents like OpenClaw',
      'Helped launch open-source scanners for the Agent-to-Agent (A2A) protocol and for AI agents running in developer IDEs',
      'Continue to lead open standards work on agent identity (Agent Name Service) and AI vulnerability scoring (OWASP AIVSS)',
    ],
    skills: ['Agentic AI Security', 'AI Red Teaming', 'Open Source', 'Agent Identity'],
  },
  {
    title: 'Senior Security Engineer',
    company: 'Meta',
    period: 'Jun 2024 – Nov 2025',
    location: 'New York, NY',
    highlights: [
      'Architected and built an internal Security Impact Rating system to quantify and prioritize security risks',
      'Built an asset graph that maps dependencies to improve risk prioritization across the organization',
      'Integrated large language models into automated code analysis to find potential vulnerabilities',
      'Secured AI agents and protected sensitive systems containing PII and PCI data',
    ],
    skills: ['AI Security', 'Risk Assessment', 'LLM Security', 'Code Analysis'],
  },
  {
    title: 'Senior Generative AI Security Engineer',
    company: 'Amazon Web Services',
    period: 'Nov 2021 – Jun 2024',
    location: 'New York, NY',
    highlights: [
      'Set GenAI security best practices and standards for Amazon Q and Bedrock, including model guardrails, prompt-injection protections, compute isolation, and secure token management',
      'Cut GenAI feature launch timelines from 3 weeks to under 1 week by creating security-approved “golden paths”',
      'Secured Amazon QuickSight’s natural-language-to-SQL editor with prompt boundary enforcement and query integrity controls',
      'Led security assessments for AI model integrations across AWS using LLM security evaluation frameworks',
      'Threat modeled, reviewed, and tested 150+ launches for AWS Analytics and Big Data services (Athena, EMR, Lake Formation)',
      'Led security reviews for major AWS Spark launches, including native fine-grained access control (FGAC), native LDAP integration, and multi-dialect views, and was a core security contributor to Membrane',
    ],
    skills: ['GenAI Security', 'Threat Modeling', 'AWS', 'Spark Security', 'LLM Security'],
  },
  {
    title: 'Security Engineer II, Developer Security and Tooling',
    company: 'Nordstrom',
    period: 'Aug 2021 – Nov 2021',
    location: 'Seattle, WA',
    highlights: [
      'Integrated SAST, DAST, and secret detection into CI/CD pipelines',
      'Automated parts of threat modeling, design, security, and architecture reviews',
      'Built a system to verify applications stay compliant after review',
    ],
    skills: ['CI/CD Security', 'SAST', 'DAST', 'DevSecOps'],
  },
  {
    title: 'Security Engineer, Threat Intelligence',
    company: 'Nordstrom',
    period: 'May 2020 – Aug 2021',
    location: 'Seattle, WA',
    highlights: [
      'Built a threat intelligence platform from scratch on open-source tools such as MISP',
      'Analyzed attacker TTPs and threat modeled Nordstrom’s infrastructure using MITRE ATT&CK',
      'Reverse engineered malware and researched attacker infrastructure to produce new indicators of compromise',
      'Ran design reviews, security assessments, and ad-hoc penetration tests for new applications',
    ],
    skills: ['Threat Intelligence', 'MISP', 'MITRE ATT&CK', 'Malware Analysis'],
  },
  {
    title: 'Security Engineer, BCDR',
    company: 'Nordstrom',
    period: 'Nov 2020 – Feb 2021',
    location: 'Seattle, WA',
    highlights: [
      'Built an infrastructure-as-code solution for data protection and disaster recovery',
      'Reduced the permissions surface on storage to protect against data loss and corruption',
      'Deployed object-lock (WORM) policies to meet legal and compliance requirements',
    ],
    skills: ['BCDR', 'Infrastructure as Code', 'Data Protection'],
  },
  {
    title: 'Penetration Tester',
    company: 'Nordstrom',
    period: 'Jun 2019 – Aug 2019',
    location: 'Seattle, WA',
    highlights: [
      'Simulated attacks to validate Nordstrom’s cyber risk response',
      'Built red team tooling covering network, Active Directory, OS, application, and datacenter vulnerabilities',
    ],
    skills: ['Penetration Testing', 'Red Team'],
  },
];

export const leadership = [
  {
    title: 'Co-lead and founding member, AIVSS',
    period: 'Jun 2025 – Present',
    org: 'OWASP AI Vulnerability Scoring System',
    link: 'https://aivss.owasp.org/',
    description:
      'Leading a scoring system for agentic AI vulnerabilities that captures what CVSS misses, such as autonomy, tool use, and non-deterministic behavior. Released v0.8 in 2026, with an AIUC-1 integration.',
    skills: ['AI Risk Scoring', 'Standards', 'Open Source Leadership'],
  },
  {
    title: 'Co-lead, Agentic Application Security',
    period: 'Mar 2025 – Present',
    org: 'OWASP GenAI Security Project, Agentic Security Initiative',
    link: 'https://genai.owasp.org/initiatives/agentic-security-initiative/',
    description:
      'Writing white papers, threat models, and guidance on securing agentic AI with the OWASP community, including the Securing Agentic Applications Guide.',
    skills: ['Agentic AI Security', 'Threat Modeling', 'Community Leadership'],
  },
];

export const education = [
  {
    institution: 'University of Washington, Information School',
    degree: 'B.S. Informatics, Information Assurance and Cybersecurity',
    period: '2016 – 2020',
    description: 'Cybersecurity principles, network security, and secure system design.',
    tags: ['Cybersecurity', 'Network Security', 'System Design'],
  },
  {
    institution: 'University of Washington, Henry M. Jackson School of International Studies',
    degree: 'Fellow, Cybersecurity Policy Task Force',
    period: '',
    description: 'Research fellowship on cybersecurity policy and international studies.',
    tags: ['Cybersecurity Policy', 'Research'],
  },
];

export const academicExperience = [
  {
    title: 'Adjunct Professor',
    institution: 'University of Nevada, Las Vegas',
    period: 'Feb 2021 – Oct 2021',
    description: 'Lead instructor for cybersecurity courses through HackerU at UNLV.',
    tags: ['Teaching', 'Cybersecurity Education'],
  },
  {
    title: 'Teaching Assistant',
    institution: 'University of Washington, Information School',
    period: 'Sep 2019 – Aug 2020',
    description:
      'Taught 100+ students in Introduction to Programming, Design for Personal Health, and Data & Privacy Ethics: lab sections, grading, and office hours.',
    tags: ['Teaching', 'Programming', 'Ethics'],
  },
  {
    title: 'Data Analyst',
    institution: 'University of Washington, School of Medicine',
    period: 'Dec 2017 – Jun 2019',
    description:
      'Wrote ImageJ (Java) plugins that cut MRI analysis time from hours to seconds, and analyzed large MRI datasets for cancer and muscular dystrophy research.',
    tags: ['Data Analysis', 'Java', 'Medical Research'],
  },
];

export const projects = [
  {
    title: 'Agentic Security Hub',
    description:
      'A public hub collecting research, threat models, and guidance on securing autonomous AI agents and multi-agent systems.',
    technologies: ['Agentic AI Security', 'Threat Modeling', 'Zero Trust'],
    link: 'https://agenticsecurity.info/',
  },
  {
    title: 'The Vulnerable MCP Project',
    description:
      'A community database of vulnerabilities and security concerns in the Model Context Protocol (MCP), for researchers and developers building with AI tools.',
    technologies: ['MCP', 'Vulnerability Database', 'Security Research'],
    link: 'https://vulnerablemcp.info/',
  },
  {
    title: 'Enhanced Tool Definition Interface (ETDI)',
    description:
      'A security extension for MCP that stops tool poisoning and rug-pull attacks with signed tool definitions, OAuth, and policy-based access control.',
    technologies: ['MCP Security', 'OAuth 2.0', 'Policy-Based Access Control'],
    link: 'https://vulnerablemcp.info/etdi-security.html',
  },
];

/** AWS launches I security-reviewed (shown on the Experience page). */
export const awsLaunches = [
  {
    title: "AWS Glue Data Catalog Multi-Engine Views for Analytics Engines",
    link: "https://aws.amazon.com/about-aws/whats-new/2023/11/aws-glue-data-catalog-multi-engine-views-analytics-engines/",
    description: "Led security reviews ensuring secure interoperability between different analytics engines while maintaining data integrity and access controls.",
  },
  {
    title: "Amazon Athena Federated Query Pass-Through",
    link: "https://aws.amazon.com/about-aws/whats-new/2024/04/amazon-athena-federated-query-pass-through/",
    description: "Implemented security mechanisms to safely enable pass-through of federated queries while preserving query integrity and data protection.",
  },
  {
    title: "Amazon EMR Serverless Streaming Jobs for Continuous Processing",
    link: "https://aws.amazon.com/about-aws/whats-new/2024/06/amazon-emr-serverless-streaming-jobs-continuous-processing/",
    description: "Ensured secure processing of continuous data streams with proper isolation and access controls.",
  },
  {
    title: "Connect Jupyter Notebooks to Amazon EMR Serverless through Apache Livy Endpoints",
    link: "https://aws.amazon.com/about-aws/whats-new/2024/05/connect-jupyter-notebooks-amazon-emr-serverless-apache-livy-endpoints/",
    description: "Established secure connectivity between Jupyter notebooks and EMR Serverless through properly authenticated and authorized Apache Livy endpoints.",
  },
  {
    title: "Amazon EMR on EKS with Apache Livy",
    link: "https://aws.amazon.com/about-aws/whats-new/2024/04/amazon-emr-eks-apache-livy/",
    description: "Developed security protocols for Amazon EMR on EKS with Apache Livy, ensuring secure data processing in containerized environments.",
  },
  {
    title: "Fine-Grained Access Controls with Job-Scoped IAM Roles in AWS Lake Formation",
    link: "https://aws.amazon.com/about-aws/whats-new/2022/07/fine-grained-access-controls-job-scoped-iam-roles-integration-aws-lake-formation-apache-spark-hive-amazon-emr-ec2-clusters/",
    description: "Designed and implemented fine-grained access controls for Apache Spark and Hive workloads using job-scoped IAM roles.",
  },
  {
    title: "Amazon Redshift Integration with Apache Spark on Amazon EMR",
    link: "https://aws.amazon.com/about-aws/whats-new/2022/11/amazon-redshift-integration-apache-spark-amazon-emr/",
    description: "Developed secure integration patterns between Amazon Redshift and Apache Spark on EMR.",
  },
  {
    title: "AWS Lake Formation Formats for EMR Fine-Grained Control",
    link: "https://aws.amazon.com/about-aws/whats-new/2023/11/aws-lake-formation-formats-emr-fine-grained-control/",
    description: "Enhanced data access controls through Lake Formation formats integration with EMR.",
  },
  {
    title: "Amazon Athena Minimum Encryption for Query Result Security",
    link: "https://aws.amazon.com/about-aws/whats-new/2023/03/amazon-athena-minimum-encryption-query-result-security/",
    description: "Enhanced data security through minimum encryption requirements for Athena query results.",
  },
  {
    title: "Amazon S3 Express One Zone Storage Class for EMR",
    link: "https://aws.amazon.com/about-aws/whats-new/2024/08/amazon-s3-express-one-zone-storage-class-emr/",
    description: "Implemented secure high-performance storage options for EMR workloads using S3 Express One Zone.",
  },
];
