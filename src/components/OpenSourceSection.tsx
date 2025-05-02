import React, { useState } from 'react';
import { Globe, Shield, Award, ArrowDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from './ui/dialog';

const ConferenceTalk = ({ title, event, year, description, link, abstract }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-cyber-green underline mt-2 block">
          View Artifacts
        </a>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogOverlay />
        <DialogContent className="max-w-2xl">
          <DialogTitle className="text-2xl font-bold mb-4">{title}</DialogTitle>
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-cyber-green underline mb-4 block">
            Link to Conference
          </a>
          <DialogDescription className="text-lg">{abstract}</DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const OpenSourceSection = () => {
  const publications = [
    {
      title: "Enterprise-Grade Security for the Model Context Protocol (MCP): Frameworks and Mitigation Strategies",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2504.08623",
      description: "The Model Context Protocol (MCP), introduced by Anthropic, provides a standardized framework for artificial intelligence (AI) systems to interact with external data sources and tools in real-time. While MCP offers significant advantages for AI integration and capability extension, it introduces novel security challenges that demand rigorous analysis and mitigation. This paper builds upon foundational research into MCP architecture and preliminary security assessments to deliver enterprise-grade mitigation frameworks and detailed technical implementation strategies. Through systematic threat modeling and analysis of MCP implementations and analysis of potential attack vectors, including sophisticated threats like tool poisoning, we present actionable security patterns tailored for MCP implementers and adopters. The primary contribution of this research lies in translating theoretical security concerns into a practical, implementable framework with actionable controls, thereby providing essential guidance for the secure enterprise adoption and governance of integrated AI systems."
    },
    {
      title: "Securing Agentic AI: A Comprehensive Threat Model and Mitigation Framework for Generative AI Agents",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2504.19956",
      description: "As generative AI (GenAI) agents become more common in enterprise settings, they introduce security challenges that differ significantly from those posed by traditional systems. These agents are not just LLMs; they reason, remember, and act, often with minimal human oversight. This paper introduces a comprehensive threat model tailored specifically for GenAI agents, focusing on how their autonomy, persistent memory access, complex reasoning, and tool integration create novel risks. This research work identifies 9 primary threats and organizes them across five key domains: cognitive architecture vulnerabilities, temporal persistence threats, operational execution vulnerabilities, trust boundary violations, and governance circumvention. These threats are not just theoretical they bring practical challenges such as delayed exploitability, cross-system propagation, cross system lateral movement, and subtle goal misalignments that are hard to detect with existing frameworks and standard approaches. To help address this, the research work present two complementary frameworks: ATFAA - Advanced Threat Framework for Autonomous AI Agents, which organizes agent-specific risks, and SHIELD, a framework proposing practical mitigation strategies designed to reduce enterprise exposure. While this work builds on existing work in LLM and AI security, the focus is squarely on what makes agents different and why those differences matter. Ultimately, this research argues that GenAI agents require a new lens for security. If we fail to adapt our threat models and defenses to account for their unique architecture and behavior, we risk turning a powerful new tool into a serious enterprise liability."
    },
    {
      title: "Securing GenAI Multi-Agent Systems Against Tool Squatting: A Zero Trust Registry-Based Approach",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2504.19951",
      description: "The rise of generative AI (GenAI) multi-agent systems (MAS) necessitates standardized protocols enabling agents to discover and interact with external tools. However, these protocols introduce new security challenges, particularly; tool squatting; the deceptive registration or representation of tools. This paper analyzes tool squatting threats within the context of emerging interoperability standards, such as Model Context Protocol (MCP) or seamless communication between agents protocols. It introduces a comprehensive Tool Registry system designed to mitigate these risks. We propose a security-focused architecture featuring admin-controlled registration, centralized tool discovery, fine grained access policies enforced via dedicated Agent and Tool Registry services, a dynamic trust scoring mechanism based on tool versioning and known vulnerabilities, and just in time credential provisioning. Based on its design principles, the proposed registry framework aims to effectively prevent common tool squatting vectors while preserving the flexibility and power of multi-agent systems. This work addresses a critical security gap in the rapidly evolving GenAI ecosystem and provides a foundation for secure tool integration in production environments."
    },
    {
      title: "Building A Secure Agentic AI Application Leveraging A2A Protocol",
      organization: "arXiv",
      link: "https://arxiv.org/abs/2504.16902",
      description: "As Agentic AI systems evolve from basic workflows to complex multi agent collaboration, robust protocols such as Google's Agent2Agent (A2A) become essential enablers. To foster secure adoption and ensure the reliability of these complex interactions, understanding the secure implementation of A2A is essential. This paper addresses this goal by providing a comprehensive security analysis centered on the A2A protocol. We examine its fundamental elements and operational dynamics, situating it within the framework of agent communication development. Utilizing the MAESTRO framework, specifically designed for AI risks, we apply proactive threat modeling to assess potential security issues in A2A deployments, focusing on aspects such as Agent Card management, task execution integrity, and authentication methodologies. Based on these insights, we recommend practical secure development methodologies and architectural best practices designed to build resilient and effective A2A systems. Our analysis also explores how the synergy between A2A and the Model Context Protocol (MCP) can further enhance secure interoperability. This paper equips developers and architects with the knowledge and practical guidance needed to confidently leverage the A2A protocol for building robust and secure next generation agentic applications."
    },
    {
      title: "Multi-Agentic system Threat Modeling Guide v1.0",
      organization: "OWASP",
      link: "https://genai.owasp.org/resource/multi-agentic-system-threat-modeling-guide-v1-0/",
      description: "A guide that applies OWASP's Agentic AI threat taxonomy to real-world multi-agent systems, addressing the additional complexity and new attack surfaces these systems introduce."
    },
    {
      title: "LLM and GenAI Data Security Best Practices",
      organization: "OWASP",
      link: "https://genai.owasp.org/resource/llm-and-gen-ai-data-security-best-practices/",
      description: "Published a comprehensive guide on data security best practices for LLM and Generative AI systems, contributing to industry standards for secure AI implementation."
    }
  ];
  
  const conferenceTalks = [
    {
      id: 0,
      title: "Securing Generative AI in Enterprise Environments",
      event: "BSides Austin",
      year: "2024",
      description: "Presented techniques for implementing robust security controls for enterprise GenAI deployments.",
      link: "https://example.com",
      abstract: "Abstract not available."
    },
    {
      id: 1,
      title: "Threat Modeling for LLM Applications",
      event: "BSides Baltimore",
      year: "2024",
      description: "Shared methodologies for identifying and mitigating security risks in applications using large language models.",
      link: "https://example.com",
      abstract: "Abstract not available."
    },
    {
      id: 2,
      title: "Securing Generative AI in Enterprise Environments",
      event: "CypherCon",
      year: "2025",
      description: "Presented techniques for implementing robust security controls for enterprise GenAI deployments.",
      link: "https://cyphercon.com/portfolio/safegen-accelerating-secure-generative-ai-implementation/",
      abstract: "The rapid adoption of Generative AI (GenAI) presents unique security challenges..."
    },
    {
      id: 3,
      title: "Threat Modeling for LLM Applications",
      event: "BSides Seattle",
      year: "2025",
      description: "Shared methodologies for identifying and mitigating security risks in applications using large language models.",
      link: "https://example.com",
      abstract: "Abstract not available."
    },
    {
      id: 4,
      title: "Securing Generative AI in Enterprise Environments",
      event: "RSA San Francisco",
      year: "2025",
      description: "Presented techniques for implementing robust security controls for enterprise GenAI deployments.",
      link: "https://example.com",
      abstract: "Abstract not available."
    },
    {
      id: 5,
      title: "Threat Modeling for LLM Applications",
      event: "OWASP AppSec Conference",
      year: "2025",
      description: "Shared methodologies for identifying and mitigating security risks in applications using large language models.",
      link: "https://example.com",
      abstract: "Abstract not available."
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

        <div className="grid grid-cols-1 gap-10">
          {/* Papers and Publications */}
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-green/20">
            <div className="flex items-center mb-8">
              <Shield className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Papers and Publications</h3>
            </div>
            
            <div className="space-y-6">
              {publications.map((publication, index) => (
                <div key={index} className="cyber-card p-6">
                  <h4 className="text-xl font-semibold text-white mb-3">{publication.title}</h4>
                  <p className="text-gray-300 mb-4">{publication.description}</p>
                  <div className="flex items-center justify-between">
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
          </div>

          {/* Conference Talks */}
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-green/20">
            <div className="flex items-center mb-8">
              <Globe className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Conference Talks</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conferenceTalks.map((talk, index) => (
                <div key={index} className="bg-cyber-grey rounded-lg p-6 border border-cyber-green/20">
                  <ConferenceTalk {...talk} />
                </div>
              ))}
            </div>
          </div>

          {/* Major AWS Launches */}
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-green/20">
            <div className="flex items-center mb-8">
              <Award className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">Major AWS Launches</h3>
            </div>
            
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
