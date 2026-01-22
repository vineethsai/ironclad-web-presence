import React, { useState } from 'react';
import { Globe, Shield, Award, ArrowDown, ChevronDown, ChevronUp, FileText, BookOpen, Bookmark, Zap, Mic } from 'lucide-react';
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

  // Preprints (arXiv)
  const preprints = [
    {
      title: "A2AS: Agentic AI Runtime Security and Self-Defense",
      organization: "arXiv Preprint",
      year: "2025",
      link: "https://arxiv.org/abs/2507.00000", // Placeholder - update with actual link
      description: "Research on runtime security mechanisms and self-defense capabilities for autonomous AI agents.",
      abstract: "This paper presents A2AS (Agentic AI Runtime Security and Self-Defense), a comprehensive framework for protecting autonomous AI agents during runtime execution. As agentic AI systems become more prevalent in enterprise environments, the need for robust runtime security mechanisms becomes critical. A2AS introduces novel approaches to real-time threat detection, autonomous defensive responses, and self-healing capabilities for AI agents operating in adversarial environments."
    },
    {
      title: "MAIF: Enforcing AI Trust and Provenance with an Artifact-Centric Agentic Paradigm",
      organization: "arXiv Preprint",
      year: "2025",
      link: "https://arxiv.org/abs/2507.00001", // Placeholder - update with actual link
      description: "A framework for establishing trust and provenance tracking in multi-agent AI systems through artifact-centric approaches.",
      abstract: "MAIF (Multi-Agent Integrity Framework) presents a novel approach to establishing and maintaining trust in multi-agent AI systems through artifact-centric provenance tracking. The framework addresses critical challenges in verifying the authenticity and integrity of agent actions, outputs, and communications across distributed agentic systems."
    }
  ];

  // Peer-Reviewed Conference Papers
  const peerReviewedPapers = [
    {
      title: "Securing Agentic AI: A Comprehensive Threat Model and Mitigation Framework for Generative AI Agents",
      authors: "Narajala, V. S., & Narayan, O.",
      venue: "IEEE ACAI 2025",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2504.19956",
      description: "A comprehensive threat model tailored specifically for GenAI agents, identifying 9 primary threats across five key domains.",
      abstract: "As generative AI (GenAI) agents become more common in enterprise settings, they introduce security challenges that differ significantly from those posed by traditional systems. These agents are not just LLMs; they reason, remember, and act, often with minimal human oversight. This paper introduces a comprehensive threat model tailored specifically for GenAI agents, focusing on how their autonomy, persistent memory access, complex reasoning, and tool integration create novel risks. This research work identifies 9 primary threats and organizes them across five key domains: cognitive architecture vulnerabilities, temporal persistence threats, operational execution vulnerabilities, trust boundary violations, and governance circumvention."
    },
    {
      title: "Coalesce: Economic and Security Dynamics of Skill-Based Task Outsourcing Among Team of Autonomous LLM Agents",
      authors: "Bhatt, M., Narajala, V. S., & Habler, I.",
      venue: "IEEE CARS 2025",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2506.01900",
      description: "Examining the economic and security implications of task outsourcing in multi-agent LLM systems with skill-based specialization.",
      abstract: "The emergence of specialized autonomous LLM agents working in teams presents novel challenges in task allocation, economic incentives, and security considerations. This paper introduces COALESCE, a framework that examines the economic and security dynamics when autonomous agents outsource tasks based on specialized skills."
    },
    {
      title: "ETDI: Mitigating Tool Squatting and Rug Pull Attacks in Model Context Protocol (MCP)",
      authors: "Bhatt, M., Del Rosario, R. F., Narajala, V. S., & Habler, I.",
      venue: "IEEE CARS 2025",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2506.01333",
      description: "A security framework using OAuth and policy-based controls to prevent tool squatting and rug pull attacks in MCP environments.",
      abstract: "The Model Context Protocol (MCP) enables AI systems to interact with external tools, but this flexibility introduces security vulnerabilities, particularly tool squatting and rug pull attacks. This paper presents ETDI (Enhanced Tool Definition Infrastructure), a comprehensive security framework that leverages OAuth-enhanced tool definitions and policy-based access control to mitigate these threats."
    },
    {
      title: "Building A Secure Agentic AI Application Leveraging A2A Protocol",
      authors: "Narajala, V. S., Habler, I., Huang, K., & Kulkarni, P.",
      venue: "IEEE WAITI 2025",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2504.16902",
      description: "Comprehensive security analysis of Google's Agent2Agent (A2A) protocol for multi-agent collaboration.",
      abstract: "As Agentic AI systems evolve from basic workflows to complex multi agent collaboration, robust protocols such as Google's Agent2Agent (A2A) become essential enablers. This paper provides a comprehensive security analysis centered on the A2A protocol, examining its fundamental elements and operational dynamics."
    },
    {
      title: "Securing GenAI Multi-Agent Systems Against Tool Squatting: A Zero Trust Registry-Based Approach",
      authors: "Narajala, V. S., Huang, K., & Habler, I.",
      venue: "IEEE AIKE 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2504.19951",
      description: "A Zero Trust Registry-based approach to mitigate tool squatting threats in multi-agent GenAI systems.",
      abstract: "The rise of generative AI (GenAI) multi-agent systems necessitates standardized protocols enabling agents to discover and interact with external tools. This paper analyzes tool squatting threats and introduces a comprehensive Tool Registry system designed to mitigate these risks."
    },
    {
      title: "A Novel Zero-Trust Identity Framework for Agentic AI",
      authors: "Huang, K., Narajala, V. S., Yeoh, J., Ross, J., Raskar, R., et al.",
      venue: "IEEE AIKE 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2505.19301",
      description: "A decentralized zero-trust identity framework specifically designed for autonomous AI agents with fine-grained access controls.",
      abstract: "As AI agents become more autonomous and operate across distributed environments, traditional identity and access management systems prove inadequate. This paper introduces a novel zero-trust identity framework specifically designed for agentic AI systems, featuring decentralized authentication mechanisms and fine-grained access control policies."
    },
    {
      title: "Agent Capability Negotiation and Binding Protocol (ACNBP)",
      authors: "Huang, K., Sheriff, A., Narajala, V. S., & Habler, I.",
      venue: "IEEE AIKE 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2506.13590",
      description: "A protocol framework for autonomous agents to discover, negotiate, and bind to capabilities in multi-agent systems.",
      abstract: "This paper presents the Agent Capability Negotiation and Binding Protocol (ACNBP), a comprehensive framework designed to enable autonomous agents to discover, negotiate, and securely bind to capabilities within multi-agent systems."
    },
    {
      title: "Agent Name Service (ANS): A Universal Directory for Secure AI Agent Discovery and Interoperability",
      authors: "Huang, K., Narajala, V. S., Habler, I., & Sheriff, A.",
      venue: "5th IEEE ICAIC 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2505.10609",
      description: "A universal directory service enabling secure discovery and interoperability of AI agents across platforms.",
      abstract: "The proliferation of AI agents across diverse platforms creates a critical need for standardized discovery and interoperability mechanisms. This paper presents the Agent Name Service (ANS), a universal directory system that enables secure AI agent discovery while maintaining privacy and security requirements."
    },
    {
      title: "Enterprise-Grade Security for the Model Context Protocol (MCP): Frameworks and Mitigation Strategies",
      authors: "Narajala, V. S., & Habler, I.",
      venue: "5th IEEE ICAIC 2026",
      organization: "IEEE",
      link: "https://arxiv.org/abs/2504.08623",
      description: "Enterprise-grade mitigation frameworks and implementation strategies for secure MCP adoption.",
      abstract: "The Model Context Protocol (MCP) provides a standardized framework for AI systems to interact with external data sources and tools. This paper delivers enterprise-grade mitigation frameworks and detailed technical implementation strategies for secure MCP adoption."
    }
  ];

  // OWASP White Papers and Guidelines
  const owaspPublications = [
    {
      title: "State of Agentic AI Security and Governance",
      role: "Contributing Author",
      year: "2025",
      organization: "OWASP",
      link: "https://genai.owasp.org/",
      description: "Comprehensive analysis of the current state of security and governance practices for agentic AI systems."
    },
    {
      title: "Securing Agentic Applications Guide",
      role: "Lead Author",
      year: "2025",
      organization: "OWASP",
      link: "https://genai.owasp.org/",
      description: "Comprehensive guide for securing agentic AI applications in enterprise environments."
    },
    {
      title: "Multi-Agentic System Threat Modeling Guide v1.0",
      role: "Contributing Author",
      year: "2025",
      organization: "OWASP",
      link: "https://genai.owasp.org/resource/multi-agentic-system-threat-modeling-guide-v1-0/",
      description: "A guide that applies OWASP's Agentic AI threat taxonomy to real-world multi-agent systems."
    },
    {
      title: "LLM and GenAI Data Security Best Practices",
      role: "Lead Author",
      year: "2025",
      organization: "OWASP",
      link: "https://genai.owasp.org/resource/llm-and-gen-ai-data-security-best-practices/",
      description: "Comprehensive guide on data security best practices for LLM and Generative AI systems."
    },
    {
      title: "AIVSS Scoring System and Agentic AI Core Security Risks",
      role: "Lead Author",
      year: "2025",
      organization: "OWASP",
      link: "https://aivss.owasp.org/",
      description: "AI Vulnerability Scoring System methodology and core security risks identification for agentic AI."
    }
  ];

  // Combined publications for backward compatibility
  const publications = [...preprints, ...peerReviewedPapers, ...owaspPublications];
  
  const conferenceTalks = [
    {
      id: 0,
      title: "Securing Generative AI in Enterprise Environments",
      event: "BSides Harrisburg",
      year: "2025",
      description: "Presented techniques for implementing robust security controls for enterprise GenAI deployments.",
      link: "https://bsidesharrisburg.com/",
      abstract: "The rapid adoption of Generative AI (GenAI) presents unique security challenges that organizations must address while maintaining development velocity. This presentation provides practical strategies for building secure GenAI applications, addressing threat modeling for GenAI systems, secure integration patterns, and robust output validation mechanisms."
    },
    {
      id: 1,
      title: "Securing Generative AI in Enterprise Environments",
      event: "CypherCon Milwaukee",
      year: "2025",
      description: "Presented techniques for implementing robust security controls for enterprise GenAI deployments.",
      link: "https://cyphercon.com/portfolio/safegen-accelerating-secure-generative-ai-implementation/",
      abstract: "The rapid adoption of Generative AI (GenAI) presents unique security challenges that organizations must address while maintaining development velocity. This presentation provides practical strategies for building secure GenAI applications, with a focus on AWS services like Bedrock and Amazon Q. We introduce a comprehensive security framework that addresses three critical areas: threat modeling for GenAI systems, secure integration patterns, and robust output validation mechanisms. Through real-world case studies, we'll demonstrate how to identify and mitigate GenAI-specific vulnerabilities, including prompt injection attacks and data leakage risks. Attendees will learn concrete techniques for securing their entire GenAI pipeline, from input validation to output verification, with an emphasis on protecting sensitive information and preventing model hallucinations with an emphasis on speed and efficiency of the SDLC."
    },
    {
      id: 2,
      title: "Building a secure Agentic AI application",
      event: "RSA Conference San Francisco",
      year: "2025",
      description: "Workshop on practical techniques for developing secure AI agents with appropriate controls and safeguards.",
      link: "https://genai.owasp.org/event/rsa-conference-2025/",
      abstract: "Ran a workshop on building a secure Agentic AI application, covering security frameworks, threat modeling, and implementation best practices for autonomous AI systems."
    },
    {
      id: 3,
      title: "Analyzing Zero Trust Architecture in the Age of Agentic GenAI: A practical approach",
      event: "OWASP Global AppSec Boston",
      year: "2025",
      description: "Presented a framework for applying Zero Trust principles to AI agent deployments in enterprise environments.",
      link: "https://owaspbasc2025.sched.com/event/1xqja/analyzing-zero-trust-architecture-in-the-age-of-agentic-genai-a-practical-approach?iframe=yes&w=100%&sidebar=no&bg=no",
      abstract: "The proliferation of generative artificial intelligence (GenAI) agents introduces unprecedented security challenges to modern organizations. As these autonomous systems increasingly generate content, make decisions, and execute actions with minimal human oversight, traditional perimeter-based security approaches prove inadequate. This paper examines the critical intersection of Zero Trust Architecture (ZTA) and GenAI agent deployment, proposing a framework for secure AI integration in enterprise environments."
    },
    {
      id: 4,
      title: "Threat Modeling for LLM Applications",
      event: "BSides Baltimore",
      year: "2024",
      description: "Shared methodologies for identifying and mitigating security risks in applications using large language models.",
      link: "https://www.youtube.com/watch?v=lZYATxO0rMA",
      abstract: "This talk explores the urgent need for a paradigm shift in threat modeling to address the complexities of large-scale systems. Adding more security bottlenecks to the development process is not only expensive but also risks losing developers' trust. However, identifying security issues later in the Software Development Life Cycle (SDLC) or after launch proves to be even more expensive. Threat modeling provides an ideal and cost-effective approach to incorporating security into the development process, ensuring it does not impede the rate of progress."
    },
    {
      id: 5,
      title: "Threat Modeling for LLM Applications",
      event: "BSides Austin",
      year: "2024",
      description: "Shared methodologies for identifying and mitigating security risks in applications using large language models.",
      link: "https://bsidesaustin.com/schedule/",
      abstract: "This talk explores the urgent need for a paradigm shift in threat modeling to address the complexities of large-scale systems. The presentation delves into the challenges presented by cloud architectures, microservices, and rapid development practices, highlighting the shortcomings of traditional threat modeling approaches like STRIDE and DREAD. It also presents ways to integrate a fast and scalable threat modeling stage into the SDLC."
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
                    <span className="text-sm text-gray-300">{preprints.length + peerReviewedPapers.length + owaspPublications.length} Publications</span>
                  </div>
                  <div className="flex items-center bg-cyber-darker px-3 py-1.5 rounded-full border border-cyber-green/10">
                    <Bookmark className="h-3.5 w-3.5 text-cyber-green mr-1.5" />
                    <span className="text-sm text-gray-300">IEEE, arXiv, OWASP</span>
                  </div>
                  <div className="flex-1 text-sm text-gray-300 ml-2">
                    8+ peer-reviewed IEEE papers on agentic AI security, MCP, Zero Trust, and multi-agent systems.
                  </div>
                </div>
              )}
            </div>
            
            {expandedSections.publications && (
              <div className="p-8 pt-0 space-y-8 transition-all duration-300">
                {/* Preprints Section */}
                <div>
                  <h4 className="text-xl font-bold text-cyber-green mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Preprints (arXiv)
                  </h4>
                  <div className="space-y-4">
                    {preprints.map((publication, index) => (
                      <div key={`preprint-${index}`} className="cyber-card p-6">
                        <h5 className="text-lg font-semibold text-white mb-2">{publication.title}</h5>
                        <p className="text-gray-300 mb-3 text-sm">{publication.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-cyber-green text-sm">{publication.organization} ({publication.year})</span>
                          <a href={publication.link} target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:text-cyber-green-light underline text-sm">
                            Read Paper
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peer-Reviewed Papers Section */}
                <div>
                  <h4 className="text-xl font-bold text-cyber-green mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Peer-Reviewed Conference Papers
                  </h4>
                  <div className="space-y-4">
                    {peerReviewedPapers.map((publication, index) => (
                      <div key={`peer-${index}`} className="cyber-card p-6">
                        <h5 className="text-lg font-semibold text-white mb-2">{publication.title}</h5>
                        <p className="text-gray-400 text-sm mb-2 italic">{publication.authors}</p>
                        <p className="text-gray-300 mb-3 text-sm">{publication.description}</p>
                        
                        <button 
                          onClick={() => toggleAbstract(`peer-${index}`)}
                          className="flex items-center text-cyber-green hover:text-cyber-green-light mb-2 transition-colors text-sm"
                        >
                          {expandedAbstracts[`peer-${index}`] ? (
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
                        
                        {expandedAbstracts[`peer-${index}`] && (
                          <div className="mt-2 mb-4 text-gray-300 p-4 bg-cyber-darker/50 rounded border border-cyber-green/10 transition-all duration-200 text-sm">
                            {publication.abstract}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                            {publication.venue}
                          </span>
                          <a href={publication.link} target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:text-cyber-green-light underline text-sm">
                            Read Paper
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OWASP Publications Section */}
                <div>
                  <h4 className="text-xl font-bold text-cyber-green mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    OWASP White Papers and Guidelines
                  </h4>
                  <div className="space-y-4">
                    {owaspPublications.map((publication, index) => (
                      <div key={`owasp-${index}`} className="cyber-card p-6">
                        <h5 className="text-lg font-semibold text-white mb-2">{publication.title}</h5>
                        <p className="text-gray-300 mb-3 text-sm">{publication.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                              {publication.role}
                            </span>
                            <span className="text-gray-400 text-sm">({publication.year})</span>
                          </div>
                          <a href={publication.link} target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:text-cyber-green-light underline text-sm">
                            View Resource
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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

          {/* Media Appearances */}
          <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20 mt-6">
            <div className="flex flex-col">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <Globe className="h-6 w-6 text-cyber-green mr-3" />
                  <h3 className="text-2xl font-bold text-white">Media Appearances</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Research and work featured across cybersecurity publications, industry blogs, and media outlets.
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-2 border-cyber-green/30 pl-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Agent Name Service (ANS) Coverage</h4>
                    <div className="space-y-2">
                      <a href="https://www.blogsec.info/agent-name-service-ans-a-secure-pathway-for-ai-agent-discovery-in-decentralised-ecosystems/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        BlogSec - Agent Name Service: A Secure Pathway for AI Agent Discovery ↗
                      </a>
                      <a href="https://genai.owasp.org/resource/agent-name-service-ans-for-secure-ai-agent-discovery-v1-0/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        OWASP GenAI - Agent Name Service Resource ↗
                      </a>
                      <a href="https://www.theregister.com/2025/05/20/agent_name_service_proposal/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        The Register - Agent Name Service Proposal ↗
                      </a>
                      <a href="https://www.aigl.blog/agent-name-service-ans-for-secure-ai-agent-discovery/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        AIGL Blog - Agent Name Service for Secure AI Agent Discovery ↗
                      </a>
                      <a href="https://app.daily.dev/posts/the-agent-name-service-it-s-like-dns-but-for-ai-agents-hbb4keyl" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        Daily.dev - The Agent Name Service: It's Like DNS But for AI Agents ↗
                      </a>
                      <a href="https://www.infoworld.com/article/3991376/owasp-proposes-a-way-for-enterprises-to-automatically-identify-ai-agents.html" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        InfoWorld - OWASP Proposes a Way for Enterprises to Automatically Identify AI Agents ↗
                      </a>
                    </div>
                  </div>

                  <div className="border-l-2 border-cyber-green/30 pl-4">
                    <h4 className="text-lg font-semibold text-white mb-2">MCP Security Research Coverage</h4>
                    <div className="space-y-2">
                      <a href="https://cloudwars.com/ai/ai-agent-interoperability-community-project-details-mcp-vulnerabilities-enterprise-security-measures/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        Cloud Wars - AI Agent Interoperability: Community Project Details MCP Vulnerabilities, Enterprise Security Measures ↗
                      </a>
                      <a href="https://hiddenlayer.com/innovation-hub/exploiting-mcp-tool-parameters/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        HiddenLayer - Exploiting MCP Tool Parameters Research ↗
                      </a>
                      <a href="https://www.openexploit.in/securing-mcp-servers-key-lessons-from-a-vulnerable-project/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        OpenExploit - Securing MCP Servers: Key Lessons from a Vulnerable Project ↗
                      </a>
                      <a href="https://www.joinformal.com/blog/the-permission-pitfall-securing-mcp-servers-without-limiting-value/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        Formal - The Permission Pitfall: Securing MCP Servers Without Limiting Value ↗
                      </a>
                      <a href="https://www.wiz.io/blog/mcp-security-research-briefing" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        Wiz - MCP Security Research Briefing ↗
                      </a>
                      <a href="https://genai.owasp.org/resource/2504/17/setting-the-new-frontier-the-power-of-open-collaboration-on-mcp-security/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        OWASP GenAI - Setting the New Frontier: The Power of Open Collaboration on MCP Security ↗
                      </a>
                      <a href="https://marketresearch.com/2025/04/17/researchers-from-aws-and-intuit-propose-a-zero-trust-security-framework-to-protect-the-model-context-protocol-mcp-from-tool-poisoning-and-unauthorized-access/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        Market Research - AWS and Intuit Researchers Propose Zero Trust Security Framework for MCP ↗
                      </a>
                      <a href="https://cy3ersec.uk/blog/mcp-security-research-briefing-a-safety-analysis-tutorial" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        Cy3erSec - MCP Security Research Briefing: A Safety Analysis Tutorial ↗
                      </a>
                    </div>
                  </div>

                  <div className="border-l-2 border-cyber-green/30 pl-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Industry Integration & Tools</h4>
                    <div className="space-y-2">
                      <a href="https://lumeau.ai/" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        Lumeau.ai - AI Security Integration ↗
                      </a>
                      <a href="https://www.dhanu.one/blog/mcp-audit-trails" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        Dhanu.one - MCP Audit Trails Implementation ↗
                      </a>
                      <a href="https://www.youtube.com/watch?v=h_6unOXfv4&ab_channel=DiscoverAI" target="_blank" rel="noopener noreferrer" className="block text-cyber-green hover:text-cyber-green-light transition-colors text-sm">
                        YouTube - DiscoverAI Channel Feature ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Podcast Appearances */}
          <div className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20 mt-6">
            <div className="flex flex-col">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <Mic className="h-6 w-6 text-cyber-green mr-3" />
                  <h3 className="text-2xl font-bold text-white">Podcast Appearances</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Speaking engagements on cybersecurity podcasts and video interviews discussing AI security, MCP vulnerabilities, and agentic AI systems.
                </p>
                
                <div className="space-y-4">
                  <div className="cyber-card p-6">
                    <h4 className="text-xl font-semibold text-white mb-3">
                      <a href="https://www.resilientcyber.io/p/resilient-cyber-w-vineeth-sai-narajala" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green transition-colors">
                        Resilient Cyber Podcast ↗
                      </a>
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Discussion with Chris Hughes on Model Context Protocol (MCP) - Potential & Pitfalls, covering MCP's role in the emerging Agentic AI ecosystem and security considerations for practitioners.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                        MCP Security
                      </span>
                      <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                        Agentic AI
                      </span>
                      <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                        Podcast Interview
                      </span>
                    </div>
                  </div>

                  <div className="cyber-card p-6">
                    <h4 className="text-xl font-semibold text-white mb-3">
                      <a href="https://www.youtube.com/watch?v=IHGfv-7I2gI&pp=ygUYdmluZWV0aCBzYWkgbmFyYWphbGEgbWNw" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green transition-colors">
                        YouTube Security Interview ↗
                      </a>
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Video interview discussing MCP security research, vulnerability assessments, and enterprise security considerations for AI agent deployments.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                        Video Interview
                      </span>
                      <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                        MCP Research
                      </span>
                      <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                        YouTube
                      </span>
                    </div>
                  </div>

                  <div className="cyber-card p-6">
                    <h4 className="text-xl font-semibold text-white mb-3">
                      <a href="https://www.youtube.com/watch?v=ESxdT2dWMtc&list=PLbIIzrns6QE_SV0_N2Nkkuo_CWgZuHjUN&index=3" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green transition-colors">
                        Technical Deep Dive Series ↗
                      </a>
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Part of a technical series discussing advanced AI security topics, threat modeling for LLM applications, and practical implementation of security frameworks.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                        Technical Series
                      </span>
                      <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                        AI Security
                      </span>
                      <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                        Deep Dive
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
