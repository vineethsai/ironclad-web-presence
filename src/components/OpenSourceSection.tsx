
import React from 'react';
import { Globe, Shield, Award } from 'lucide-react';

const OpenSourceSection = () => {
  const publications = [
    {
      title: "LLM and GenAI Data Security Best Practices",
      organization: "OWASP",
      link: "https://genai.owasp.org/resource/llm-and-gen-ai-data-security-best-practices/",
      description: "Published a comprehensive guide on data security best practices for LLM and Generative AI systems, contributing to industry standards for secure AI implementation."
    }
  ];

  const conferenceTalks = [
    {
      title: "Securing Generative AI in Enterprise Environments",
      event: "BSides Austin",
      year: "2023",
      description: "Presented techniques for implementing robust security controls for enterprise GenAI deployments."
    },
    {
      title: "Threat Modeling for LLM Applications",
      event: "BSides Baltimore",
      year: "2023",
      description: "Shared methodologies for identifying and mitigating security risks in applications using large language models."
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
    }
  ];

  return (
    <section id="open-source" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Open Source & Publications</h2>
          <div className="w-20 h-1 bg-cyber-green mx-auto"></div>
          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
            Contributing to the security community through open source work, publications, and sharing knowledge at industry conferences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {/* OWASP Publications */}
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-green/20">
            <div className="flex items-center mb-8">
              <Shield className="h-6 w-6 text-cyber-green mr-3" />
              <h3 className="text-2xl font-bold text-white">OWASP Publications</h3>
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
                <div key={index} className="cyber-card p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">{talk.title}</h4>
                  <div className="flex items-center mb-3">
                    <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm mr-2">
                      {talk.event}
                    </span>
                    <span className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                      {talk.year}
                    </span>
                  </div>
                  <p className="text-gray-300">{talk.description}</p>
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
    </section>
  );
};

export default OpenSourceSection;
