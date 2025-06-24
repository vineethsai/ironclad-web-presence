import React, { useState } from 'react';
import { Globe, Shield, Award, ArrowDown, ChevronDown, ChevronUp, FileText, BookOpen, Bookmark, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from './ui/dialog';

const ConferenceTalk = ({ title, event, year, description, link, abstract }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAbstractModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="conference-talk">
      <h4 className="text-cyber-green">{title}</h4>
      <div className="mt-2">
        <div className="flex items-center mb-3">
          <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm mr-2">
            {event}
          </span>
          <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
            {year}
          </span>
        </div>
        <p className="text-gray-300">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-cyber-green underline mt-2 block">
          View conference details
        </a>
        <button 
          onClick={openAbstractModal} 
          className="text-cyber-green underline mt-2 block text-left cursor-pointer hover:text-cyber-green-light flex items-center"
        >
          <FileText className="h-4 w-4 mr-1" />
          View Artifacts & Abstract
        </button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogOverlay className="bg-cyber-dark/80 backdrop-blur-sm" />
        <DialogContent className="max-w-2xl bg-cyber-grey border border-cyber-green/30">
          <DialogTitle className="text-2xl font-bold mb-4 text-white">{title}</DialogTitle>
          <div className="mb-4 flex items-center">
            <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm mr-2">
              {event}
            </span>
            <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
              {year}
            </span>
          </div>
          <div className="mb-4">
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-cyber-green underline flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              Conference Details
            </a>
          </div>
          <div className="mb-2 text-lg text-cyber-green font-medium">Abstract</div>
          <div className="max-h-[60vh] overflow-y-auto rounded border border-cyber-green/10 mb-4">
            <DialogDescription className="text-base text-gray-300 p-4 bg-cyber-darker/50 whitespace-pre-line">
              {abstract || "Abstract not available for this presentation."}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const OpenSourceSection = () => {
  const [expandedAbstracts, setExpandedAbstracts] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    publications: true,
    conferences: false,
    launches: false
  });
  
  const toggleAbstract = (index) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const publications = [
    {
      title: "Agent Capability Negotiation and Binding Protocol (ACNBP)",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2506.13590",
      description: "A protocol framework for autonomous agents to discover, negotiate, and bind to capabilities in multi-agent systems environments.",
      abstract: "This paper presents the Agent Capability Negotiation and Binding Protocol (ACNBP), a comprehensive framework designed to enable autonomous agents to discover, negotiate, and securely bind to capabilities within multi-agent systems. As AI agents become more sophisticated and autonomous, the need for standardized protocols that facilitate secure capability exchange becomes critical. ACNBP addresses the challenges of capability discovery, negotiation semantics, binding mechanisms, and security considerations in distributed agent environments. The protocol defines a structured approach for agents to advertise their capabilities, negotiate terms of engagement, and establish secure binding contracts that govern capability utilization. Through formal protocol specification and security analysis, we demonstrate how ACNBP enables secure and efficient capability sharing while maintaining agent autonomy and system integrity. The framework includes provisions for capability verification, access control, and audit trails, making it suitable for enterprise deployments where security and accountability are paramount."
    },
    {
      title: "COALESCE: Economic and Security Dynamics of Skill-Based Task Outsourcing Among Team of Autonomous LLM Agents",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2506.01900",
      description: "Examining the economic and security implications of task outsourcing in multi-agent LLM systems with skill-based specialization.",
      abstract: "The emergence of specialized autonomous LLM agents working in teams presents novel challenges in task allocation, economic incentives, and security considerations. This paper introduces COALESCE (Collaborative Outsourcing Architecture for Large-scale Efficient Skill-Coordinated Execution), a framework that examines the economic and security dynamics when autonomous agents outsource tasks based on specialized skills. We analyze how agents can efficiently discover, evaluate, and contract with other agents for specialized capabilities while maintaining security and economic viability. The research explores market mechanisms for skill-based task allocation, reputation systems for agent trustworthiness, and security measures to prevent malicious behavior in outsourcing relationships. Through simulation and analysis, we demonstrate how COALESCE enables efficient task distribution while addressing key challenges such as agent incentive alignment, quality assurance, and protection against adversarial agents. The framework provides insights into building resilient multi-agent systems that can leverage specialized skills while maintaining economic sustainability and security."
    },
    {
      title: "ETDI: Mitigating Tool Squatting and Rug Pull Attacks in Model Context Protocol (MCP) by using OAuth-Enhanced Tool Definitions and Policy-Based Access Control",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2506.01333",
      description: "A security framework using OAuth and policy-based controls to prevent tool squatting and rug pull attacks in MCP environments.",
      abstract: "The Model Context Protocol (MCP) enables AI systems to interact with external tools, but this flexibility introduces security vulnerabilities, particularly tool squatting and rug pull attacks where malicious actors register deceptive tools or suddenly withdraw legitimate ones. This paper presents ETDI (Enhanced Tool Definition Infrastructure), a comprehensive security framework that leverages OAuth-enhanced tool definitions and policy-based access control to mitigate these threats. ETDI introduces a trusted tool registry with cryptographic verification, OAuth-based authentication for tool interactions, and dynamic policy enforcement that adapts to changing threat landscapes. The framework includes reputation scoring for tools, behavioral analysis to detect suspicious activities, and automated response mechanisms for identified threats. Through detailed security analysis and implementation guidelines, we demonstrate how ETDI significantly reduces the attack surface for tool-based vulnerabilities in MCP deployments. The framework is designed to be backward-compatible with existing MCP implementations while providing enhanced security guarantees for enterprise environments."
    },
    {
      title: "A Novel Zero-Trust Identity Framework for Agentic AI: Decentralized Authentication and Fine-Grained Access Control",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2505.19301",
      description: "A decentralized zero-trust identity framework specifically designed for autonomous AI agents with fine-grained access controls.",
      abstract: "As AI agents become more autonomous and operate across distributed environments, traditional identity and access management systems prove inadequate for securing agent interactions. This paper introduces a novel zero-trust identity framework specifically designed for agentic AI systems, featuring decentralized authentication mechanisms and fine-grained access control policies. The framework addresses unique challenges in agent identity management, including agent lifecycle management, capability-based permissions, cross-domain authentication, and dynamic trust assessment. We present a decentralized architecture that eliminates single points of failure while maintaining strong security guarantees through cryptographic protocols and consensus mechanisms. The framework includes novel approaches to agent identity verification, behavioral analysis for anomaly detection, and adaptive access policies that respond to changing agent behaviors and environmental conditions. Through formal security analysis and practical implementation examples, we demonstrate how this framework enables secure agent interactions while preserving agent autonomy and system scalability. The proposed solution is designed to support enterprise deployments where multiple AI agents must interact securely across organizational boundaries."
    },
    {
      title: "Agent Name Service (ANS): A Universal Directory for Secure AI Agent Discovery and Interoperability",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2505.10609",
      description: "A universal directory service enabling secure discovery and interoperability of AI agents across different platforms and organizations.",
      abstract: "The proliferation of AI agents across diverse platforms and organizations creates a critical need for standardized discovery and interoperability mechanisms. This paper presents the Agent Name Service (ANS), a universal directory system that enables secure AI agent discovery while maintaining privacy and security requirements. ANS provides a decentralized, hierarchical naming system specifically designed for AI agents, incorporating cryptographic verification, capability advertisement, and secure communication establishment. The system supports both public and private agent registries, enabling organizations to maintain control over their agent ecosystems while participating in broader inter-organizational agent networks. We address key challenges including agent identity verification, capability matching, secure communication bootstrapping, and privacy-preserving discovery mechanisms. The ANS architecture includes provisions for agent reputation management, service level agreements, and audit trails to support enterprise requirements. Through detailed protocol specifications and security analysis, we demonstrate how ANS enables seamless agent interoperability while maintaining strong security and privacy guarantees. The system is endorsed by the OWASP GenAI ASI Project and designed to support the growing ecosystem of autonomous AI agents."
    },
    {
      title: "Enterprise-Grade Security for the Model Context Protocol (MCP): Frameworks and Mitigation Strategies",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2504.08623",
      description: "The Model Context Protocol (MCP), introduced by Anthropic, provides a standardized framework for artificial intelligence (AI) systems to interact with external data sources and tools in real-time.",
      abstract: "The Model Context Protocol (MCP), introduced by Anthropic, provides a standardized framework for artificial intelligence (AI) systems to interact with external data sources and tools in real-time. While MCP offers significant advantages for AI integration and capability extension, it introduces novel security challenges that demand rigorous analysis and mitigation. This paper builds upon foundational research into MCP architecture and preliminary security assessments to deliver enterprise-grade mitigation frameworks and detailed technical implementation strategies. Through systematic threat modeling and analysis of MCP implementations and analysis of potential attack vectors, including sophisticated threats like tool poisoning, we present actionable security patterns tailored for MCP implementers and adopters. The primary contribution of this research lies in translating theoretical security concerns into a practical, implementable framework with actionable controls, thereby providing essential guidance for the secure enterprise adoption and governance of integrated AI systems."
    },
    {
      title: "Securing Agentic AI: A Comprehensive Threat Model and Mitigation Framework for Generative AI Agents",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2504.19956",
      description: "As generative AI (GenAI) agents become more common in enterprise settings, they introduce security challenges that differ significantly from those posed by traditional systems.",
      abstract: "As generative AI (GenAI) agents become more common in enterprise settings, they introduce security challenges that differ significantly from those posed by traditional systems. These agents are not just LLMs; they reason, remember, and act, often with minimal human oversight. This paper introduces a comprehensive threat model tailored specifically for GenAI agents, focusing on how their autonomy, persistent memory access, complex reasoning, and tool integration create novel risks. This research work identifies 9 primary threats and organizes them across five key domains: cognitive architecture vulnerabilities, temporal persistence threats, operational execution vulnerabilities, trust boundary violations, and governance circumvention. These threats are not just theoretical they bring practical challenges such as delayed exploitability, cross-system propagation, cross system lateral movement, and subtle goal misalignments that are hard to detect with existing frameworks and standard approaches. To help address this, the research work present two complementary frameworks: ATFAA - Advanced Threat Framework for Autonomous AI Agents, which organizes agent-specific risks, and SHIELD, a framework proposing practical mitigation strategies designed to reduce enterprise exposure. While this work builds on existing work in LLM and AI security, the focus is squarely on what makes agents different and why those differences matter. Ultimately, this research argues that GenAI agents require a new lens for security. If we fail to adapt our threat models and defenses to account for their unique architecture and behavior, we risk turning a powerful new tool into a serious enterprise liability."
    },
    {
      title: "Securing GenAI Multi-Agent Systems Against Tool Squatting: A Zero Trust Registry-Based Approach",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2504.19951",
      description: "The rise of generative AI (GenAI) multi-agent systems (MAS) necessitates standardized protocols enabling agents to discover and interact with external tools.",
      abstract: "The rise of generative AI (GenAI) multi-agent systems (MAS) necessitates standardized protocols enabling agents to discover and interact with external tools. However, these protocols introduce new security challenges, particularly; tool squatting; the deceptive registration or representation of tools. This paper analyzes tool squatting threats within the context of emerging interoperability standards, such as Model Context Protocol (MCP) or seamless communication between agents protocols. It introduces a comprehensive Tool Registry system designed to mitigate these risks. We propose a security-focused architecture featuring admin-controlled registration, centralized tool discovery, fine grained access policies enforced via dedicated Agent and Tool Registry services, a dynamic trust scoring mechanism based on tool versioning and known vulnerabilities, and just in time credential provisioning. Based on its design principles, the proposed registry framework aims to effectively prevent common tool squatting vectors while preserving the flexibility and power of multi-agent systems. This work addresses a critical security gap in the rapidly evolving GenAI ecosystem and provides a foundation for secure tool integration in production environments."
    },
    {
      title: "Building A Secure Agentic AI Application Leveraging A2A Protocol",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2504.16902",
      description: "As Agentic AI systems evolve from basic workflows to complex multi agent collaboration, robust protocols such as Google's Agent2Agent (A2A) become essential enablers.",
      abstract: "As Agentic AI systems evolve from basic workflows to complex multi agent collaboration, robust protocols such as Google's Agent2Agent (A2A) become essential enablers. To foster secure adoption and ensure the reliability of these complex interactions, understanding the secure implementation of A2A is essential. This paper addresses this goal by providing a comprehensive security analysis centered on the A2A protocol. We examine its fundamental elements and operational dynamics, situating it within the framework of agent communication development. Utilizing the MAESTRO framework, specifically designed for AI risks, we apply proactive threat modeling to assess potential security issues in A2A deployments, focusing on aspects such as Agent Card management, task execution integrity, and authentication methodologies. Based on these insights, we recommend practical secure development methodologies and architectural best practices designed to build resilient and effective A2A systems. Our analysis also explores how the synergy between A2A and the Model Context Protocol (MCP) can further enhance secure interoperability. This paper equips developers and architects with the knowledge and practical guidance needed to confidently leverage the A2A protocol for building robust and secure next generation agentic applications."
    },
    {
      title: "Multi-Agentic system Threat Modeling Guide v1.0",
      organization: "OWASP",
      link: "https://genai.owasp.org/resource/multi-agentic-system-threat-modeling-guide-v1-0/",
      description: "A guide that applies OWASP's Agentic AI threat taxonomy to real-world multi-agent systems.",
      abstract: "A guide that applies OWASP's Agentic AI threat taxonomy to real-world multi-agent systems, addressing the additional complexity and new attack surfaces these systems introduce."
    },
    {
      title: "LLM and GenAI Data Security Best Practices",
      organization: "OWASP",
      link: "https://genai.owasp.org/resource/llm-and-gen-ai-data-security-best-practices/",
      description: "Published a comprehensive guide on data security best practices for LLM and Generative AI systems.",
      abstract: "Published a comprehensive guide on data security best practices for LLM and Generative AI systems, contributing to industry standards for secure AI implementation."
    }
  ];
  
  const conferenceTalks = [
    {
      id: 0,
      title: "Agile Threat Modeling for Complex Systems using AI",
      event: "BSides Austin",
      year: "2024",
      description: "Exploring innovative approaches to threat modeling for increasingly complex systems with AI assistance.",
      link: "https://bsidesaustin.com/schedule/",
      abstract: "This talk explores the urgent need for a paradigm shift in threat modeling to address the complexities of large-scale systems. Adding more security bottlenecks to the development process is not only expensive but also risks losing developers' trust. However, identifying security issues later in the Software Development Life Cycle (SDLC) or after launch proves to be even more expensive. Threat modeling provides an ideal and cost-effective approach to incorporating security into the development process, ensuring it does not impede the rate of progress. The first part of the presentation delves into the challenges presented by cloud architectures, microservices, and rapid development practices, highlighting the shortcomings of traditional threat modeling approaches like STRIDE and DREAD. It also presents ways to integrate a fast and scalable threat modeling stage into the SDLC.\nFollowing that, the talk unveils strategies for effective threat modeling at scale, emphasizing the importance of automation, secure design principles, and the integration of builder-focused security tools into agile and DevOps practices. It includes dissection of real-world case studies that offer concrete insights into organizations that have successfully implemented threat modeling at scale. Furthermore, this talk examines the overcoming of challenges, the fostering of a cultural shift towards security, and the assurance of efficient resource allocation. Attendees will leave with a clear understanding of the critical need for threat modeling at scale and practical insights to enhance security in their large-scale systems."
    },
    {
      id: 1,
      title: "Scaling the Security Wall: Agile Threat Modeling for Complex Systems",
      event: "BSides Baltimore",
      year: "2024",
      description: "Demonstrating how to implement agile security practices for rapidly evolving complex systems.",
      link: "https://www.youtube.com/watch?v=lZYATxO0rMA",
      abstract: "This talk explores the urgent need for a paradigm shift in threat modeling to address the complexities of large-scale systems. Adding more security bottlenecks to the development process is not only expensive but also risks losing developers' trust. However, identifying security issues later in the Software Development Life Cycle (SDLC) or after launch proves to be even more expensive. Threat modeling provides an ideal and cost-effective approach to incorporating security into the development process, ensuring it does not impede the rate of progress. The first part of the presentation delves into the challenges presented by cloud architectures, microservices, and rapid development practices, highlighting the shortcomings of traditional threat modeling approaches like STRIDE and DREAD. It also presents ways to integrate a fast and scalable threat modeling stage into the SDLC.\nFollowing that, the talk unveils strategies for effective threat modeling at scale, emphasizing the importance of automation, secure design principles, and the integration of builder-focused security tools into agile and DevOps practices. It includes dissection of real-world case studies that offer concrete insights into organizations that have successfully implemented threat modeling at scale. Furthermore, this talk examines the overcoming of challenges, the fostering of a cultural shift towards security, and the assurance of efficient resource allocation. Attendees will leave with a clear understanding of the critical need for threat modeling at scale and practical insights to enhance security in their large-scale systems."
    },
    {
      id: 2,
      title: "Securing Generative AI in Enterprise Environments",
      event: "CypherCon",
      year: "2025",
      description: "Presented techniques for implementing robust security controls for enterprise GenAI deployments.",
      link: "https://cyphercon.com/portfolio/safegen-accelerating-secure-generative-ai-implementation/",
      abstract: "The rapid adoption of Generative AI (GenAI) presents unique security challenges that organizations must address while maintaining development velocity. This presentation provides practical strategies for building secure GenAI applications, with a focus on AWS services like Bedrock and Amazon Q. We introduce a comprehensive security framework that addresses three critical areas: threat modeling for GenAI systems, secure integration patterns, and robust output validation mechanisms. Through real-world case studies, we'll demonstrate how to identify and mitigate GenAI-specific vulnerabilities, including prompt injection attacks and data leakage risks. Attendees will learn concrete techniques for securing their entire GenAI pipeline, from input validation to output verification, with an emphasis on protecting sensitive information and preventing model hallucinations with an emphasis on speed and efficiency of the SDLC. The presentation includes hands-on examples of implementing security controls in GenAI applications, featuring code samples and architecture patterns that can be immediately applied. Security professionals and developers will gain practical knowledge about automated security testing for GenAI systems, session isolation techniques, and effective output validation strategies. By the end of this session, attendees will have actionable insights for accelerating their GenAI initiatives while maintaining enterprise-grade security standards.\nPresentation Importance: There is a top down push for organizations to implement GenAI and quickly. As organizations rush to adopt GenAI technologies, they face unique security challenges that traditional cybersecurity approaches may not adequately address. This presentation offers critical, actionable insights for implementing robust security measures in GenAI systems, with a specific focus on AWS services like Bedrock and Amazon Q. By providing practical strategies, real-world case studies, and hands-on examples, this presentation equips security peeps and developers with the knowledge needed to balance innovation with security and quick deployments."
    },
    {
      id: 3,
      title: "Threat Modeling for LLM Applications",
      event: "BSides Seattle",
      year: "2025",
      description: "Shared methodologies for identifying and mitigating risks specific to large language model applications.",
      link: "https://www.bsidesseattle.com/2025-schedule.html",
      abstract: "The rapid adoption of Generative AI (GenAI) presents unique security challenges that organizations must address while maintaining development velocity. This presentation provides practical strategies for building secure GenAI applications, with a focus on AWS services like Bedrock and Amazon Q. We introduce a comprehensive security framework that addresses three critical areas: threat modeling for GenAI systems, secure integration patterns, and robust output validation mechanisms. Through real-world case studies, we'll demonstrate how to identify and mitigate GenAI-specific vulnerabilities, including prompt injection attacks and data leakage risks. Attendees will learn concrete techniques for securing their entire GenAI pipeline, from input validation to output verification, with an emphasis on protecting sensitive information and preventing model hallucinations with an emphasis on speed and efficiency of the SDLC. The presentation includes hands-on examples of implementing security controls in GenAI applications, featuring code samples and architecture patterns that can be immediately applied. Security professionals and developers will gain practical knowledge about automated security testing for GenAI systems, session isolation techniques, and effective output validation strategies. By the end of this session, attendees will have actionable insights for accelerating their GenAI initiatives while maintaining enterprise-grade security standards.\nPresentation Importance: There is a top down push for organizations to implement GenAI and quickly. As organizations rush to adopt GenAI technologies, they face unique security challenges that traditional cybersecurity approaches may not adequately address. This presentation offers critical, actionable insights for implementing robust security measures in GenAI systems, with a specific focus on AWS services like Bedrock and Amazon Q. By providing practical strategies, real-world case studies, and hands-on examples, this presentation equips security peeps and developers with the knowledge needed to balance innovation with security and quick deployments."    
    },
    {
      id: 4,
      title: "Building a secure Agentic AI application",
      event: "RSA ConferenceSan Francisco",
      year: "2025",
      description: "Workshop on practical techniques for developing secure AI agents with appropriate controls and safeguards.",
      link: "https://genai.owasp.org/event/rsa-conference-2025/",
      abstract: "Ran a workshop on building a secure Agentic AI application."
    },
    {
      id: 5,
      title: "Analyzing Zero Trust Architecture in the Age of Agentic GenAI: A practical approach",
      event: "OWASP AppSec Conference, Boston",
      year: "2025",
      description: "Presented a framework for applying Zero Trust principles to AI agent deployments in enterprise environments.",
      link: "https://owaspbasc2025.sched.com/event/1xqja/analyzing-zero-trust-architecture-in-the-age-of-agentic-genai-a-practical-approach?iframe=yes&w=100%&sidebar=no&bg=no",
      abstract: "The proliferation of generative artificial intelligence (GenAI) agents introduces unprecedented security challenges to modern organizations. As these autonomous systems increasingly generate content, make decisions, and execute actions with minimal human oversight, traditional perimeter-based security approaches prove inadequate. This paper examines the critical intersection of Zero Trust Architecture (ZTA) and GenAI agent deployment, proposing a framework for secure AI integration in enterprise environments. The rapid adoption of Generative AI (GenAI) presents unique security challenges that organizations must address while maintaining development velocity. This presentation provides practical strategies for building secure GenAI applications, with a focus on AWS services like Bedrock and Amazon Q. We introduce a comprehensive security framework that addresses three critical areas: threat modeling for GenAI systems, secure integration patterns, and robust output validation mechanisms. Through real-world case studies, we'll demonstrate how to identify and mitigate GenAI-specific vulnerabilities, including prompt injection attacks and data leakage risks. Attendees will learn concrete techniques for securing their entire GenAI pipeline, from input validation to output verification, with an emphasis on protecting sensitive information and preventing model hallucinations with an emphasis on speed and efficiency of the SDLC. The presentation includes hands-on examples of implementing security controls in GenAI applications, featuring code samples and architecture patterns that can be immediately applied. Security professionals and developers will gain practical knowledge about automated security testing for GenAI systems, session isolation techniques, and effective output validation strategies. By the end of this session, attendees will have actionable insights for accelerating their GenAI initiatives while maintaining enterprise-grade security standards. Presentation Importance: There is a top down push for organizations to implement GenAI and quickly. As organizations rush to adopt GenAI technologies, they face unique security challenges that traditional cybersecurity approaches may not adequately address. This presentation offers critical, actionable insights for implementing robust security measures in GenAI systems, with a specific focus on AWS services like Bedrock and Amazon Q. By providing practical strategies, real-world case studies, and hands-on examples, this presentation equips security peeps and developers with the knowledge needed to balance innovation with security and quick deployments."
    }
  ];

  const majorLaunches = [
    {
      title: "AWS Glue Data Catalog Multi-Engine Views for Analytics Engines",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/11/aws-glue-data-catalog-multi-engine-views-analytics-engines/",
      description: "Led security reviews ensuring secure interoperability between different analytics engines while maintaining data integrity and access controls."
    },
    {
      title: "Amazon Athena Federated Query Pass-Through",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/04/amazon-athena-federated-query-pass-through/",
      description: "Implemented security mechanisms to safely enable pass-through of federated queries while preserving query integrity and data protection."
    },
    {
      title: "Amazon EMR Serverless Streaming Jobs for Continuous Processing",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/06/amazon-emr-serverless-streaming-jobs-continuous-processing/",
      description: "Ensured secure processing of continuous data streams with proper isolation and access controls."
    },
    {
      title: "Connect Jupyter Notebooks to Amazon EMR Serverless through Apache Livy Endpoints",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/05/connect-jupyter-notebooks-amazon-emr-serverless-apache-livy-endpoints/",
      description: "Established secure connectivity between Jupyter notebooks and EMR Serverless through properly authenticated and authorized Apache Livy endpoints."
    },
    {
      title: "Amazon EMR on EKS with Apache Livy",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/04/amazon-emr-eks-apache-livy/",
      description: "Developed security protocols for Amazon EMR on EKS with Apache Livy, ensuring secure data processing in containerized environments."
    },
    {
      title: "Monitor Amazon EMR Serverless Jobs in Real-Time with Native Spark, Hive, and Tez UI",
      link: "https://aws.amazon.com/about-aws/whats-new/2022/10/monitor-amazon-emr-serverless-jobs-real-time-native-spark-hiv-tez-ui/",
      description: "Implemented secure monitoring capabilities for EMR Serverless jobs with real-time visibility into Spark, Hive, and Tez workloads."
    },
    {
      title: "Fine-Grained Access Controls with Job-Scoped IAM Roles in AWS Lake Formation",
      link: "https://aws.amazon.com/about-aws/whats-new/2022/07/fine-grained-access-controls-job-scoped-iam-roles-integration-aws-lake-formation-apache-spark-hive-amazon-emr-ec2-clusters/",
      description: "Designed and implemented fine-grained access controls for Apache Spark and Hive workloads using job-scoped IAM roles."
    },
    {
      title: "Amazon EMR Table Metadata in Glue Data Catalog for Flink Workloads",
      link: "https://aws.amazon.com/about-aws/whats-new/2022/11/amazon-emr-table-metadata-glue-data-catalog-flink-workloads/",
      description: "Enabled secure metadata management for Flink workloads through integration with AWS Glue Data Catalog."
    },
    {
      title: "Configuring Spark Properties in EMR Studio Jupyter Notebooks",
      link: "https://aws.amazon.com/about-aws/whats-new/2022/11/emr-eks-configuring-spark-properties-emr-studio-jupyter-notebooks/",
      description: "Implemented secure configuration management for Spark properties in EMR Studio Jupyter notebooks."
    },
    {
      title: "Amazon Redshift Integration with Apache Spark on Amazon EMR",
      link: "https://aws.amazon.com/about-aws/whats-new/2022/11/amazon-redshift-integration-apache-spark-amazon-emr/",
      description: "Developed secure integration patterns between Amazon Redshift and Apache Spark on EMR."
    },
    {
      title: "Reading and Writing Data from Amazon DynamoDB and S3 in EMR Serverless",
      link: "https://aws.amazon.com/about-aws/whats-new/2022/11/reading-writing-data-amazon-dynamodb-s3-access-emr-serverless/",
      description: "Implemented secure data access patterns for DynamoDB and S3 in EMR Serverless environments."
    },
    {
      title: "AWS Lake Formation Formats for EMR Fine-Grained Control",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/11/aws-lake-formation-formats-emr-fine-grained-control/",
      description: "Enhanced data access controls through Lake Formation formats integration with EMR."
    },
    {
      title: "SQL Explorer in EMR Studio",
      link: "https://aws.amazon.com/about-aws/whats-new/2022/01/introducing-sql-explorer-in-emr-studio/",
      description: "Implemented secure SQL query capabilities in EMR Studio for interactive data analysis."
    },
    {
      title: "Amazon Athena JDBC Driver",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/11/amazon-athena-jdbc-driver/",
      description: "Developed secure JDBC connectivity for Amazon Athena with proper authentication and authorization."
    },
    {
      title: "Amazon EMR Serverless Fine-Grained Lake Formation Preview",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/12/amazon-emr-serverless-grained-lake-formation-preview/",
      description: "Implemented fine-grained access controls for EMR Serverless through Lake Formation integration."
    },
    {
      title: "Amazon Athena IPv6 Endpoints for Inbound Connections",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/05/amazon-athena-ipv6-endpoints-inbound-connections/",
      description: "Enhanced network security with IPv6 support for Athena endpoints."
    },
    {
      title: "Amazon Athena Apache Hudi Integration",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/05/amazon-athena-apache-hudi/",
      description: "Implemented secure data lake capabilities through Athena's integration with Apache Hudi."
    },
    {
      title: "Amazon Athena Minimum Encryption for Query Result Security",
      link: "https://aws.amazon.com/about-aws/whats-new/2023/03/amazon-athena-minimum-encryption-query-result-security/",
      description: "Enhanced data security through minimum encryption requirements for Athena query results."
    },
    {
      title: "Amazon EMR EC2 Cluster Launch with Intelligent Selection",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/09/amazon-emr-ec2-cluster-launch-intelligent-selection/",
      description: "Implemented intelligent instance selection for EMR clusters with security considerations."
    },
    {
      title: "Amazon EMR Capacity Prioritized Allocation Strategies for EC2",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/08/amazon-emr-capacity-prioritized-allocation-strategies-ec2/",
      description: "Developed secure capacity management strategies for EMR workloads on EC2."
    },
    {
      title: "Amazon S3 Express One Zone Storage Class for EMR",
      link: "https://aws.amazon.com/about-aws/whats-new/2024/08/amazon-s3-express-one-zone-storage-class-emr/",
      description: "Implemented secure high-performance storage options for EMR workloads using S3 Express One Zone."
    }
  ];

  return (
    <section id="open-source" className="py-20 bg-cyber-darker relative overflow-hidden">
      {/* Background grid lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Open Source & Publications</h2>
          <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
            Contributing to the security community through open source work, publications, and sharing knowledge at industry conferences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Papers and Publications */}
          <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
            <div className="flex flex-col">
              <button 
                onClick={() => toggleSection('publications')}
                className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
              >
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-cyber-green mr-3" />
                  <h3 className="text-2xl font-bold text-white">Papers and Publications</h3>
                </div>
                <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                  {expandedSections.publications ? 
                    <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                    <ChevronDown className="h-5 w-5 text-cyber-green" />
                  }
                </div>
              </button>
              
              {!expandedSections.publications && (
                <div className="px-8 pb-6 flex flex-wrap gap-3">
                  <div className="flex items-center bg-cyber-darker px-3 py-1.5 rounded-full border border-cyber-green/10">
                    <BookOpen className="h-3.5 w-3.5 text-cyber-green mr-1.5" />
                    <span className="text-sm text-gray-300">{publications.length} Publications</span>
                  </div>
                  <div className="flex items-center bg-cyber-darker px-3 py-1.5 rounded-full border border-cyber-green/10">
                    <Bookmark className="h-3.5 w-3.5 text-cyber-green mr-1.5" />
                    <span className="text-sm text-gray-300">arXiv, OWASP</span>
                  </div>
                  <div className="flex-1 text-sm text-gray-300 ml-2">
                    Research papers on AI/ML security, including GenAI systems, MCP, and Zero Trust Architecture.
                  </div>
                </div>
              )}
            </div>
            
            {expandedSections.publications && (
              <div className="p-8 pt-0 space-y-6 transition-all duration-300">
                {publications.map((publication, index) => (
                  <div key={index} className="cyber-card p-6">
                    <h4 className="text-xl font-semibold text-white mb-3">{publication.title}</h4>
                    <p className="text-gray-300 mb-4">{publication.description}</p>
                    
                    <button 
                      onClick={() => toggleAbstract(index)}
                      className="flex items-center text-cyber-green hover:text-cyber-green-light mb-2 transition-colors"
                    >
                      {expandedAbstracts[index] ? (
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
                    
                    {expandedAbstracts[index] && (
                      <div className="mt-2 mb-4 text-gray-300 p-4 bg-cyber-darker/50 rounded border border-cyber-green/10 transition-all duration-200">
                        {publication.abstract}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-cyber-green">{publication.organization}</span>
                      <a 
                        href={publication.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyber-green hover:text-cyber-green-light underline"
                      >
                        Read Publication
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conference Talks */}
          <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
            <div className="flex flex-col">
              <button 
                onClick={() => toggleSection('conferences')}
                className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
              >
                <div className="flex items-center">
                  <Globe className="h-6 w-6 text-cyber-green mr-3" />
                  <h3 className="text-2xl font-bold text-white">Conference Talks</h3>
                </div>
                <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                  {expandedSections.conferences ? 
                    <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                    <ChevronDown className="h-5 w-5 text-cyber-green" />
                  }
                </div>
              </button>
              
              {!expandedSections.conferences && (
                <div className="px-8 pb-6 flex flex-wrap gap-3">
                  <div className="flex items-center bg-cyber-darker px-3 py-1.5 rounded-full border border-cyber-green/10">
                    <Globe className="h-3.5 w-3.5 text-cyber-green mr-1.5" />
                    <span className="text-sm text-gray-300">{conferenceTalks.length} Presentations</span>
                  </div>
                  <div className="flex items-center bg-cyber-darker px-3 py-1.5 rounded-full border border-cyber-green/10">
                    <Bookmark className="h-3.5 w-3.5 text-cyber-green mr-1.5" />
                    <span className="text-sm text-gray-300">BSides, RSA, OWASP, CypherCon</span>
                  </div>
                  <div className="flex-1 text-sm text-gray-300 ml-2">
                    Speaking engagements on Threat Modeling, GenAI Security, and Zero Trust Architecture for AI.
                  </div>
                </div>
              )}
            </div>
            
            {expandedSections.conferences && (
              <div className="p-8 pt-0 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {conferenceTalks.map((talk, index) => (
                    <div key={index} className="bg-cyber-grey rounded-lg p-6 border border-cyber-green/20">
                      <ConferenceTalk {...talk} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Major AWS Launches */}
          <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20">
            <div className="flex flex-col">
              <button 
                onClick={() => toggleSection('launches')}
                className="w-full p-8 flex justify-between items-center cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
              >
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-cyber-green mr-3" />
                  <h3 className="text-2xl font-bold text-white">Major AWS Launches</h3>
                </div>
                <div className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20">
                  {expandedSections.launches ? 
                    <ChevronUp className="h-5 w-5 text-cyber-green" /> : 
                    <ChevronDown className="h-5 w-5 text-cyber-green" />
                  }
                </div>
              </button>
              
              {!expandedSections.launches && (
                <div className="px-8 pb-6 flex flex-wrap gap-3">
                  <div className="flex items-center bg-cyber-darker px-3 py-1.5 rounded-full border border-cyber-green/10">
                    <Zap className="h-3.5 w-3.5 text-cyber-green mr-1.5" />
                    <span className="text-sm text-gray-300">{majorLaunches.length} Production Launches</span>
                  </div>
                  <div className="flex items-center bg-cyber-darker px-3 py-1.5 rounded-full border border-cyber-green/10">
                    <Bookmark className="h-3.5 w-3.5 text-cyber-green mr-1.5" />
                    <span className="text-sm text-gray-300">AWS Analytics, Glue, Athena, EMR</span>
                  </div>
                  <div className="flex-1 text-sm text-gray-300 ml-2">
                    Led security efforts for AWS Analytics services, including work on $10B NSA contract infrastructure.
                  </div>
                </div>
              )}
            </div>
            
            {expandedSections.launches && (
              <div className="p-8 pt-0 transition-all duration-300">
                <p className="text-gray-300 mb-6">
                  Worked on major launches like Glue 5, FGAC in Spark and Athena, and launched projects at <a href="https://reinvent.awsevents.com/" target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:underline">AWS re:Invent</a>. These systems continue to be supported to ensure they remain secure, and are used by the DOD and US Government as part of the <a href="https://www.nextgov.com/modernization/2021/08/nsa-awards-secret-10-billion-contract-amazon/184390/" target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:underline">$10 billion NSA contract award</a>.
                </p>
                
                <div className="space-y-6">
                  {majorLaunches.map((launch, index) => (
                    <div key={index} className="cyber-card p-6">
                      <h4 className="text-xl font-semibold text-white mb-3">
                        <a 
                          href={launch.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-cyber-green transition-colors"
                        >
                          {launch.title}
                        </a>
                      </h4>
                      <p className="text-gray-300">{launch.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="mb-2 animate-scroll-hint opacity-0">
          <ArrowDown className="h-4 w-4 text-cyber-green" />
        </div>
        <Link to="/contact" className="text-white hover:text-cyber-green transition-colors animate-bounce">
          <ArrowDown className="h-8 w-8" />
        </Link>
        <div className="mt-1 text-xs text-cyber-green font-mono opacity-70">scroll down</div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
