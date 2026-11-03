/**
 * Papers, standards, peer review, awards, and adoption.
 * Paper titles, authors, venues, DOIs, and abstracts are from Crossref, arXiv, and IEEE (checked Nov 2026).
 * Citation counts are not stored here; they come from src/data/citations.json (see src/content/metrics.ts).
 */

export interface Paper {
  id: string;
  title: string;
  /** Other titles this paper has appeared under (arXiv versions), used to match citation counts. */
  altTitles?: string[];
  authors: string[];
  /** Short venue label, e.g. "IEEE ICAIC 2026" */
  venue: string;
  venueFull?: string;
  /** Publication date (or arXiv submission date for preprints), YYYY-MM-DD */
  date: string;
  status: 'published' | 'preprint';
  doi?: string;
  arxivId?: string;
  code?: string;
  summary: string;
  abstract: string;
}

export const papers: Paper[] = [
  {
    id: "mcp-enterprise",
    title: "Enterprise-Grade Security for the Model Context Protocol (MCP): Frameworks and Mitigation Strategies",
    authors: ["Vineeth Sai Narajala", "Idan Habler"],
    venue: "IEEE ICAIC 2026",
    venueFull: "2026 IEEE 5th International Conference on AI in Cybersecurity (ICAIC)",
    date: "2026-02-18",
    status: 'published',
    doi: "10.1109/icaic67076.2026.11395723",
    arxivId: "2504.08623",
    summary: "A threat model and enterprise security controls for the Model Context Protocol, including defenses against tool poisoning.",
    abstract: "The Model Context Protocol (MCP), introduced by Anthropic, provides a standardized framework for artificial intelligence (AI) systems to interact with external data sources and tools in real-time. While MCP offers significant advantages for AI integration and capability extension, it introduces novel security challenges that demand rigorous analysis and mitigation. This paper builds upon foundational research into MCP architecture and preliminary security assessments to deliver enterprise-grade mitigation frameworks and detailed technical implementation strategies. Through systematic threat modeling and analysis of MCP implementations and analysis of potential attack vectors, including sophisticated threats like tool poisoning, we present actionable security patterns tailored for MCP implementers and adopters. The primary contribution of this research lies in translating theoretical security concerns into a practical, implementable framework with actionable controls, thereby providing essential guidance for the secure enterprise adoption and governance of integrated AI systems.",
  },
  {
    id: "threat-model",
    title: "Securing Agentic AI: A Comprehensive Threat Model and Mitigation Framework for Generative AI Agents",
    authors: ["Vineeth Sai Narajala", "Om Narayan"],
    venue: "IEEE ACAI 2025",
    venueFull: "2025 8th International Conference on Algorithms, Computing and Artificial Intelligence (ACAI)",
    date: "2025-12-26",
    status: 'published',
    doi: "10.1109/acai68217.2025.11406310",
    arxivId: "2504.19956",
    summary: "A threat model for generative AI agents: nine threats across five domains, from reasoning and memory attacks to tool misuse, with mitigations.",
    abstract: "As generative AI (GenAI) agents become more common in enterprise settings, they introduce security challenges that differ significantly from those posed by traditional systems. These agents are not just LLMs; they reason, remember, and act, often with minimal human oversight. This paper introduces a comprehensive threat model tailored specifically for GenAI agents, focusing on how their autonomy, persistent memory access, complex reasoning, and tool integration create novel risks. This research work identifies 9 primary threats and organizes them across five key domains: cognitive architecture vulnerabilities, temporal persistence threats, operational execution vulnerabilities, trust boundary violations, and governance circumvention. These threats are not just theoretical they bring practical challenges such as delayed exploitability, cross-system propagation, cross system lateral movement, and subtle goal misalignments that are hard to detect with existing frameworks and standard approaches. To help address this, the research work present two complementary frameworks: ATFAA - Advanced Threat Framework for Autonomous AI Agents, which organizes agent-specific risks, and SHIELD, a framework proposing practical mitigation strategies designed to reduce enterprise exposure. While this work builds on existing work in LLM and AI security, the focus is squarely on what makes agents different and why those differences matter. Ultimately, this research argues that GenAI agents require a new lens for security. If we fail to adapt our threat models and defenses to account for their unique architecture and behavior, we risk turning a powerful new tool into a serious enterprise liability.",
  },
  {
    id: "a2a",
    title: "Building A Secure Agentic AI Application Leveraging Google’s A2A Protocol",
    altTitles: ["Building A Secure Agentic AI Application Leveraging A2A Protocol"],
    authors: ["Vineeth Sai Narajala", "Idan Habler", "Ken Huang", "Prashant Kulkarni"],
    venue: "IEEE ACSAC Workshops 2025 (WAITI)",
    venueFull: "2025 Annual Computer Security Applications Conference Workshops (ACSAC Workshops)",
    date: "2025-12-08",
    status: 'published',
    doi: "10.1109/acsacw69556.2025.00043",
    arxivId: "2504.16902",
    summary: "A security analysis and threat model of Google’s Agent2Agent (A2A) protocol using MAESTRO, with guidance for building secure A2A applications.",
    abstract: "As Agentic AI systems evolve from basic workflows to complex multi agent collaboration, robust protocols such as Google's Agent2Agent (A2A) become essential enablers. To foster secure adoption and ensure the reliability of these complex interactions, understanding the secure implementation of A2A is essential. This paper addresses this goal by providing a comprehensive security analysis centered on the A2A protocol. We examine its fundamental elements and operational dynamics, situating it within the framework of agent communication development. Utilizing the MAESTRO framework, specifically designed for AI risks, we apply proactive threat modeling to assess potential security issues in A2A deployments, focusing on aspects such as Agent Card management, task execution integrity, and authentication methodologies. Based on these insights, we recommend practical secure development methodologies and architectural best practices designed to build resilient and effective A2A systems. Our analysis also explores how the synergy between A2A and the Model Context Protocol (MCP) can further enhance secure interoperability. This paper equips developers and architects with the knowledge and practical guidance needed to confidently leverage the A2A protocol for building robust and secure next generation agentic applications.",
  },
  {
    id: "zero-trust-identity",
    title: "A Novel Zero-Trust Identity Framework for Agentic AI: Decentralized Authentication and Fine-Grained Access Control",
    authors: ["Ken Huang", "Vineeth Sai Narajala", "John Yeoh", "Jason Ross", "Mahesh Lambe", "Ramesh Raskar", "Youssef Harkati", "Jerry Huang", "Idan Habler", "Chris Hughes"],
    venue: "IEEE AIxDKE 2026",
    venueFull: "2026 International Conference on AI x Data and Knowledge Engineering (AIxDKE)",
    date: "2026-02-02",
    status: 'published',
    doi: "10.1109/aixdke67294.2026.00024",
    arxivId: "2505.19301",
    summary: "An identity and access framework for AI agents built on decentralized identifiers, verifiable credentials, and fine-grained, just-in-time access control.",
    abstract: "Traditional Identity and Access Management (IAM) systems, primarily designed for human users or static machine identities via protocols such as OAuth, OpenID Connect (OIDC), and SAML, prove fundamentally inadequate for the dynamic, interdependent, and often ephemeral nature of AI agents operating at scale within Multi Agent Systems (MAS), a computational system composed of multiple interacting intelligent agents that work collectively. This paper posits the imperative for a novel Agentic AI IAM framework: We deconstruct the limitations of existing protocols when applied to MAS, illustrating with concrete examples why their coarse-grained controls, single-entity focus, and lack of context-awareness falter. We then propose a comprehensive framework built upon rich, verifiable Agent Identities (IDs), leveraging Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs), that encapsulate an agents capabilities, provenance, behavioral scope, and security posture. Our framework includes an Agent Naming Service (ANS) for secure and capability-aware discovery, dynamic fine-grained access control mechanisms, and critically, a unified global session management and policy enforcement layer for real-time control and consistent revocation across heterogeneous agent communication protocols. We also explore how Zero-Knowledge Proofs (ZKPs) enable privacy-preserving attribute disclosure and verifiable policy compliance. We outline the architecture, operational lifecycle, innovative contributions, and security considerations of this new IAM paradigm, aiming to establish the foundational trust, accountability, and security necessary for the burgeoning field of agentic AI and the complex ecosystems they will inhabit.",
  },
  {
    id: "etdi",
    title: "ETDI: Mitigating Tool Squatting and Rug Pull Attacks in Model Context Protocol (MCP) by Using OAuth-Enhanced Tool Definitions and Policy-Based Access Control",
    authors: ["Manish Bhatt", "Vineeth Sai Narajala", "Idan Habler"],
    venue: "IEEE CARS 2025",
    venueFull: "2025 Cyber Awareness and Research Symposium (CARS)",
    date: "2025-10-27",
    status: 'published',
    doi: "10.1109/cars67163.2025.11337310",
    arxivId: "2506.01333",
    code: "https://github.com/vineethsai/MCP-ETDI-docs",
    summary: "The Enhanced Tool Definition Interface (ETDI): signed, versioned tool definitions, OAuth, and policy-based access control that stop MCP tool squatting and rug-pull attacks.",
    abstract: "The Model Context Protocol (MCP) plays a crucial role in extending the capabilities of Large Language Models (LLMs) by enabling integration with external tools and data sources. However, the standard MCP specification presents significant security vulnerabilities, notably Tool Poisoning and Rug Pull attacks. This paper introduces the Enhanced Tool Definition Interface (ETDI), a security extension designed to fortify MCP. ETDI incorporates cryptographic identity verification, immutable versioned tool definitions, and explicit permission management, often leveraging OAuth 2.0. We further propose extending MCP with fine-grained, policy-based access control, where tool capabilities are dynamically evaluated against explicit policies using a dedicated policy engine, considering runtime context beyond static OAuth scopes. This layered approach aims to establish a more secure, trustworthy, and controllable ecosystem for AI applications interacting with LLMs and external tools.",
  },
  {
    id: "ans",
    title: "Agent Name Service (ANS): A Universal Directory for Secure AI Agent Discovery and Interoperability",
    authors: ["Ken Huang", "Vineeth Sai Narajala", "Idan Habler", "Akram Sheriff"],
    venue: "IEEE ICAIC 2026",
    venueFull: "2026 IEEE 5th International Conference on AI in Cybersecurity (ICAIC)",
    date: "2026-02-18",
    status: 'published',
    doi: "10.1109/icaic67076.2026.11395757",
    arxivId: "2505.10609",
    code: "https://github.com/vineethsai/ANS",
    summary: "A DNS-inspired, PKI-backed directory for discovering and verifying AI agents across protocols. Now an IETF draft and a Linux Foundation project.",
    abstract: "The proliferation of AI agents requires robust mechanisms for secure discovery. This paper introduces the Agent Name Service (ANS), a novel architecture based on DNS addressing the lack of a public agent discovery framework. ANS provides a protocol-agnostic registry infrastructure that leverages Public Key Infrastructure (PKI) certificates for verifiable agent identity and trust. The architecture features several key innovations: a formalized agent registration and renewal mechanism for lifecycle management; DNS-inspired naming conventions with capability-aware resolution; a modular Protocol Adapter Layer supporting diverse communication standards (A2A, MCP, ACP etc.); and precisely defined algorithms for secure resolution. We implement structured communication using JSON Schema and conduct a comprehensive threat analysis of our proposal. The result is a foundational directory service addressing the core challenges of secured discovery and interaction in multi-agent systems, paving the way for future interoperable, trustworthy, and scalable agent ecosystems.",
  },
  {
    id: "tool-squatting",
    title: "Securing GenAI Multi-Agent Systems Against Tool Squatting: A Zero Trust Registry-Based Approach",
    authors: ["Vineeth Sai Narajala", "Ken Huang", "Idan Habler"],
    venue: "IEEE AIxDKE 2026",
    venueFull: "2026 International Conference on AI x Data and Knowledge Engineering (AIxDKE)",
    date: "2026-02-02",
    status: 'published',
    doi: "10.1109/aixdke67294.2026.00022",
    arxivId: "2504.19951",
    code: "https://github.com/vineethsai/tool-registry",
    summary: "A zero-trust tool registry that stops tool squatting in multi-agent systems with admin-controlled registration and scoped, just-in-time access.",
    abstract: "The rise of generative AI (GenAI) multi-agent systems (MAS) necessitates standardized protocols enabling agents to discover and interact with external tools. However, these protocols introduce new security challenges, particularly; tool squatting; the deceptive registration or representation of tools. This paper analyzes tool squatting threats within the context of emerging interoperability standards, such as Model Context Protocol (MCP) or seamless communication between agents protocols. It introduces a comprehensive Tool Registry system designed to mitigate these risks. We propose a security-focused architecture featuring admin-controlled registration, centralized tool discovery, fine grained access policies enforced via dedicated Agent and Tool Registry services, a dynamic trust scoring mechanism based on tool versioning and known vulnerabilities, and just in time credential provisioning. Based on its design principles, the proposed registry framework aims to effectively prevent common tool squatting vectors while preserving the flexibility and power of multi-agent systems. This work addresses a critical security gap in the rapidly evolving GenAI ecosystem and provides a foundation for secure tool integration in production environments.",
  },
  {
    id: "aagate",
    title: "AAGATE: A NIST AI RMF-Aligned Governance Platform for Agentic AI",
    authors: ["Ken Huang", "Kyriakos Rock Lambros", "Jerry Huang", "Yasir Mehmood", "Hammad Atta", "Joshua Beck", "Vineeth Sai Narajala", "Muhammad Zeeshan Baig", "Muhammad Aziz Ul Haq", "Nadeem Shahzad", "Bhavya Gupta"],
    venue: "arXiv 2025",
    date: "2025-10-29",
    status: 'preprint',
    arxivId: "2510.25863",
    summary: "A Kubernetes-native control plane that puts the NIST AI Risk Management Framework into practice for autonomous agents.",
    abstract: "This paper introduces the Agentic AI Governance Assurance & Trust Engine (AAGATE), a Kubernetes-native control plane designed to address the unique security and governance challenges posed by autonomous, language-model-driven agents in production. Recognizing the limitations of traditional Application Security (AppSec) tooling for improvisational, machine-speed systems, AAGATE operationalizes the NIST AI Risk Management Framework (AI RMF). It integrates specialized security frameworks for each RMF function: the Agentic AI Threat Modeling MAESTRO framework for Map, a hybrid of OWASP's AIVSS and SEI's SSVC for Measure, and the Cloud Security Alliance's Agentic AI Red Teaming Guide for Manage. By incorporating a zero-trust service mesh, an explainable policy engine, behavioral analytics, and decentralized accountability hooks, AAGATE provides a continuous, verifiable governance solution for agentic AI, enabling safe, accountable, and scalable deployment. The framework is further extended with DIRF for digital identity rights, LPCI defenses for logic-layer injection, and QSAF monitors for cognitive degradation, ensuring governance spans systemic, adversarial, and ethical risks.",
  },
  {
    id: "a2as",
    title: "A2AS: Agentic AI Runtime Security and Self-Defense",
    authors: ["Eugene Neelou", "Ivan Novikov", "Max Moroz", "Om Narayan", "Tiffany Saade", "Mika Ayenson", "Ilya Kabanov", "Jen Ozmen", "Edward Lee", "Vineeth Sai Narajala", "Emmanuel Guilherme Junior", "Ken Huang", "Huseyin Gulsin", "Jason Ross", "Marat Vyshegorodtsev", "Adelin Travers", "Idan Habler", "Rahul Jadav"],
    venue: "arXiv 2025 · SSRN",
    date: "2025-10-08",
    status: 'preprint',
    arxivId: "2510.13825",
    summary: "A runtime security layer for AI agents, like HTTPS for HTTP: behavior certificates, authenticated prompts, and in-context defenses.",
    abstract: "The A2AS framework is introduced as a security layer for AI agents and LLM-powered applications, similar to how HTTPS secures HTTP. A2AS enforces certified behavior, activates model self-defense, and ensures context window integrity. It defines security boundaries, authenticates prompts, applies security rules and custom policies, and controls agentic behavior, enabling a defense-in-depth strategy. The A2AS framework avoids latency overhead, external dependencies, architectural changes, model retraining, and operational complexity. The BASIC security model is introduced as the A2AS foundation: (B) Behavior certificates enable behavior enforcement, (A) Authenticated prompts enable context window integrity, (S) Security boundaries enable untrusted input isolation, (I) In-context defenses enable secure model reasoning, (C) Codified policies enable application-specific rules. This first paper in the series introduces the BASIC security model and the A2AS framework, exploring their potential toward establishing the A2AS industry standard.",
  },
  {
    id: "coalesce",
    title: "COALESCE: Economic and Security Dynamics of Skill-Based Task Outsourcing Among Team of Autonomous LLM Agents",
    authors: ["Manish Bhatt", "Ronald F. Del Rosario", "Vineeth Sai Narajala", "Idan Habler"],
    venue: "IEEE CARS 2025",
    venueFull: "2025 Cyber Awareness and Research Symposium (CARS)",
    date: "2025-10-27",
    status: 'published',
    doi: "10.1109/cars67163.2025.11337769",
    arxivId: "2506.01900",
    summary: "A framework that lets LLM agents outsource subtasks to cheaper, specialized agents, weighing cost, skill, and security.",
    abstract: "The meteoric rise and proliferation of autonomous Large Language Model (LLM) agents promise significant capabilities across various domains. However, their deployment is increasingly constrained by substantial computational demands, specifically for Graphics Processing Unit (GPU) resources. This paper addresses the critical problem of optimizing resource utilization in LLM agent systems. We introduce COALESCE (Cost-Optimized and Secure Agent Labour Exchange via Skill-based Competence Estimation), a novel framework designed to enable autonomous LLM agents to dynamically outsource specific subtasks to specialized, cost-effective third-party LLM agents. The framework integrates mechanisms for hybrid skill representation, dynamic skill discovery, automated task decomposition, a unified cost model comparing internal execution costs against external outsourcing prices, simplified market-based decision-making algorithms, and a standardized communication protocol between LLM agents. Comprehensive validation through 239 theoretical simulations demonstrates 41.8\\% cost reduction potential, while large-scale empirical validation across 240 real LLM tasks confirms 20.3\\% cost reduction with proper epsilon-greedy exploration, establishing both theoretical viability and practical effectiveness. The emergence of proposed open standards like Google's Agent2Agent (A2A) protocol further underscores the need for frameworks like COALESCE that can leverage such standards for efficient agent interaction. By facilitating a dynamic market for agent capabilities, potentially utilizing protocols like A2A for communication, COALESCE aims to significantly reduce operational costs, enhance system scalability, and foster the emergence of specialized agent economies, making complex LLM agent functionalities more accessible and economically viable.",
  },
  {
    id: "acnbp",
    title: "Agent Capability Negotiation and Binding Protocol (ACNBP)",
    authors: ["Ken Huang", "Akram Sheriff", "Vineeth Sai Narajala", "Idan Habler"],
    venue: "IEEE AIxDKE 2026",
    venueFull: "2026 International Conference on AI x Data and Knowledge Engineering (AIxDKE)",
    date: "2026-02-02",
    status: 'published',
    doi: "10.1109/aixdke67294.2026.00023",
    arxivId: "2506.13590",
    summary: "A protocol for agents to negotiate capabilities and bind to each other securely, built on the Agent Name Service.",
    abstract: "As multi-agent systems evolve to encompass increasingly diverse and specialized agents, the challenge of enabling effective collaboration between heterogeneous agents has become paramount, with traditional agent communication protocols often assuming homogeneous environments or predefined interaction patterns that limit their applicability in dynamic, open-world scenarios. This paper presents the Agent Capability Negotiation and Binding Protocol (ACNBP), a novel framework designed to facilitate secure, efficient, and verifiable interactions between agents in heterogeneous multi-agent systems through integration with an Agent Name Service (ANS) infrastructure that provides comprehensive discovery, negotiation, and binding mechanisms. The protocol introduces a structured 10-step process encompassing capability discovery, candidate pre-screening and selection, secure negotiation phases, and binding commitment with built-in security measures including digital signatures, capability attestation, and comprehensive threat mitigation strategies, while a key innovation of ACNBP is its protocolExtension mechanism that enables backward-compatible protocol evolution and supports diverse agent architectures while maintaining security and interoperability. We demonstrate ACNBP's effectiveness through a comprehensive security analysis using the MAESTRO threat modeling framework, practical implementation considerations, and a detailed example showcasing the protocol's application in a document translation scenario, with the protocol addressing critical challenges in agent autonomy, capability verification, secure communication, and scalable agent ecosystem management.",
  },
  {
    id: "maif",
    title: "MAIF: Enforcing AI Trust and Provenance with an Artifact-Centric Agentic Paradigm",
    authors: ["Vineeth Sai Narajala", "Manish Bhatt", "Idan Habler", "Ronald F. Del Rosario", "Ads Dawson"],
    venue: "arXiv 2025",
    date: "2025-11-19",
    status: 'preprint',
    arxivId: "2511.15097",
    code: "https://github.com/mbhatt1/maif",
    summary: "An artifact-centric agent design built on the Multimodal Artifact File Format (MAIF), giving AI agents auditable, provenance-tracked memory.",
    abstract: "The AI trustworthiness crisis threatens to derail the artificial intelligence revolution, with regulatory barriers, security vulnerabilities, and accountability gaps preventing deployment in critical domains. Current AI systems operate on opaque data structures that lack the audit trails, provenance tracking, or explainability required by emerging regulations like the EU AI Act. We propose an artifact-centric AI agent paradigm where behavior is driven by persistent, verifiable data artifacts rather than ephemeral tasks, solving the trustworthiness problem at the data architecture level. Central to this approach is the Multimodal Artifact File Format (MAIF), an AI-native container embedding semantic representations, cryptographic provenance, and granular access controls. MAIF transforms data from passive storage into active trust enforcement, making every AI operation inherently auditable. Our production-ready implementation demonstrates ultra-high-speed streaming (2,720.7 MB/s), optimized video processing (1,342 MB/s), and enterprise-grade security. Novel algorithms for cross-modal attention, semantic compression, and cryptographic binding achieve up to 225 compression while maintaining semantic fidelity. Advanced security features include stream-level access control, real-time tamper detection, and behavioral anomaly analysis with minimal overhead. This approach directly addresses the regulatory, security, and accountability challenges preventing AI deployment in sensitive domains, offering a viable path toward trustworthy AI systems at scale.",
  },
  {
    id: "manifold-of-failure",
    title: "Manifold of Failure: Behavioral Attraction Basins in Language Models",
    authors: ["Sarthak Munshi", "Manish Bhatt", "Vineeth Sai Narajala", "Idan Habler", "Ammar Al-Kahfah", "Ken Huang", "Blake Gatto"],
    venue: "arXiv 2026",
    date: "2026-02-25",
    status: 'preprint',
    arxivId: "2602.22291",
    summary: "Maps where language models fail using quality-diversity search (MAP-Elites), revealing continuous “behavioral attraction basins” of unsafe behavior.",
    abstract: "While prior work has focused on projecting adversarial examples back onto the manifold of natural data to restore safety, we argue that a comprehensive understanding of AI safety requires characterizing the unsafe regions themselves. This paper introduces a framework for systematically mapping the Manifold of Failure in Large Language Models (LLMs). We reframe the search for vulnerabilities as a quality diversity problem, using MAP-Elites to illuminate the continuous topology of these failure regions, which we term behavioral attraction basins. Our quality metric, Alignment Deviation, guides the search towards areas where the model's behavior diverges most from its intended alignment. Across three LLMs: Llama-3-8B, GPT-OSS-20B, and GPT-5-Mini, we show that MAP-Elites achieves up to 63% behavioral coverage, discovers up to 370 distinct vulnerability niches, and reveals dramatically different model-specific topological signatures: Llama-3-8B exhibits a near-universal vulnerability plateau (mean Alignment Deviation 0.93), GPT-OSS-20B shows a fragmented landscape with spatially concentrated basins (mean 0.73), and GPT-5-Mini demonstrates strong robustness with a ceiling at 0.50. Our approach produces interpretable, global maps of each model's safety landscape that no existing attack method (GCG, PAIR, or TAP) can provide, shifting the paradigm from finding discrete failures to understanding their underlying structure.",
  },
  {
    id: "hubscan",
    title: "Adversarial Hubness Detector: Detecting Hubness Poisoning in Retrieval-Augmented Generation Systems",
    altTitles: ["HubScan: Detecting Hubness Poisoning in Retrieval-Augmented Generation Systems"],
    authors: ["Idan Habler", "Vineeth Sai Narajala", "Stav Koren", "Amy Chang", "Tiffany Saade"],
    venue: "arXiv 2026",
    date: "2026-02-25",
    status: 'preprint',
    arxivId: "2602.22427",
    code: "https://github.com/cisco-ai-defense/adversarial-hubness-detector",
    summary: "An open-source scanner that finds poisoned “hub” documents in RAG vector indexes, which can hijack retrieval across many queries.",
    abstract: "Retrieval-Augmented Generation (RAG) systems are essential to contemporary AI applications, allowing large language models to obtain external knowledge via vector similarity search. Nevertheless, these systems encounter a significant security flaw: hubness - items that frequently appear in the top-$k$ retrieval results for a disproportionately high number of varied queries. These hubs can be exploited to introduce harmful content, alter search rankings, bypass content filtering, and decrease system performance. We introduce hubscan, an open-source security scanner that evaluates vector indices and embeddings to identify hubs in RAG systems. Hubscan presents a multi-detector architecture that integrates: (1) robust statistical hubness detection utilizing median/Median Absolute Deviation (MAD)-based z-scores, (2) cluster spread analysis to assess cross-cluster retrieval patterns, (3) stability testing under query perturbations, and (4) domain-aware and modality-aware detection for category-specific and cross-modal attacks. Our solution accommodates several vector databases (FAISS, Pinecone, Qdrant, Weaviate) and offers versatile retrieval techniques, including vector similarity, hybrid search, and lexical matching with reranking capabilities. We evaluate hubscan on Food-101, MS-COCO, and FiQA adversarial hubness benchmarks constructed using state-of-the-art gradient-optimized and centroid-based hub generation methods. Hubscan achieves 90% recall at a 0.2% alert budget and 100% recall at 0.4%, with adversarial hubs ranking above the 99.8th percentile. In testing, domain-scoped scanning recovered 100% of targeted attacks that evaded global detection. Production validation on 1M real web documents from MS MARCO demonstrates significant score separation between clean documents and adversarial content.",
  },
  {
    id: "laaf",
    title: "LAAF: Logic-layer Automated Attack Framework A Systematic Red-Teaming Methodology for LPCI Vulnerabilities in Agentic Large Language Model Systems",
    authors: ["Hammad Atta", "Ken Huang", "Kyriakos Rock Lambros", "Yasir Mehmood", "Zeeshan Baig", "Mohamed Abdur Rahman", "Manish Bhatt", "M. Aziz Ul Haq", "Muhammad Aatif", "Nadeem Shahzad", "Kamal Noor", "Vineeth Sai Narajala", "Hazem Ali", "Jamel Abed"],
    venue: "arXiv 2026",
    date: "2026-03-18",
    status: 'preprint',
    arxivId: "2603.17239",
    summary: "An automated red-teaming framework for logic-layer prompt control injection (LPCI) in agentic LLM systems with memory and tools.",
    abstract: "Agentic LLM systems equipped with persistent memory, RAG pipelines, and external tool connectors face a class of attacks - Logic-layer Prompt Control Injection (LPCI) - for which no automated red-teaming instrument existed. We present LAAF (Logic-layer Automated Attack Framework), the first automated red-teaming framework to combine an LPCI-specific technique taxonomy with stage-sequential seed escalation - two capabilities absent from existing tools: Garak lacks memory-persistence and cross-session triggering; PyRIT supports multi-turn testing but treats turns independently, without seeding each stage from the prior breakthrough. LAAF provides: (i) a 49-technique taxonomy spanning six attack categories (Encoding~11, Structural~8, Semantic~8, Layered~5, Trigger~12, Exfiltration~5; see Table 1), combinable across 5 variants per technique and 6 lifecycle stages, yielding a theoretical maximum of 2,822,400 unique payloads ($49 \\times 5 \\times 1{,}920 \\times 6$; SHA-256 deduplicated at generation time); and (ii) a Persistent Stage Breaker (PSB) that drives payload mutation stage-by-stage: on each breakthrough, the PSB seeds the next stage with a mutated form of the winning payload, mirroring real adversarial escalation. Evaluation on five production LLM platforms across three independent runs demonstrates that LAAF achieves higher stage-breakthrough efficiency than single-technique random testing, with a mean aggregate breakthrough rate of 84\\% (range 83--86\\%) and platform-level rates stable within 17 percentage points across runs. Layered combinations and semantic reframing are the highest-effectiveness technique categories, with layered payloads outperforming encoding on well-defended platforms.",
  },
  {
    id: "defense-trilemma",
    title: "The Defense Trilemma: Why Prompt Injection Defense Wrappers Fail?",
    authors: ["Manish Bhatt", "Sarthak Munshi", "Vineeth Sai Narajala", "Idan Habler", "Ammar Al-Kahfah", "Ken Huang", "Joel Webb", "Blake Gatto", "Md Tamjidul Hoque"],
    venue: "arXiv 2026",
    date: "2026-04-07",
    status: 'preprint',
    arxivId: "2604.06436",
    summary: "Proves that no continuous, utility-preserving input-wrapper defense can make every output of a language model safe, and shows where such defenses must fail.",
    abstract: "We prove that no continuous, utility-preserving wrapper defense-a function $D: X\\to X$ that preprocesses inputs before the model sees them-can make all outputs strictly safe for a language model with connected prompt space, and we characterize exactly where every such defense must fail. We establish three results under successively stronger hypotheses: boundary fixation-the defense must leave some threshold-level inputs unchanged; an $ε$-robust constraint-under Lipschitz regularity, a positive-measure band around fixed boundary points remains near-threshold; and a persistent unsafe region under a transversality condition, a positive-measure subset of inputs remains strictly unsafe. These constitute a defense trilemma: continuity, utility preservation, and completeness cannot coexist. We prove parallel discrete results requiring no topology, and extend to multi-turn interactions, stochastic defenses, and capacity-parity settings. The results do not preclude training-time alignment, architectural changes, or defenses that sacrifice utility. The full theory is mechanically verified in Lean 4 and validated empirically on three LLMs.",
  },
];
export interface Standard {
  title: string;
  org: 'IETF' | 'OWASP' | 'CSA';
  year: number;
  role: string;
  url: string;
  summary: string;
}

export const standards: Standard[] = [
  {
    title: 'Agent Name Service v2 (ANS): A Domain-Anchored Identity Layer for Autonomous AI Agents',
    org: 'IETF',
    year: 2026,
    role: 'Co-author',
    url: 'https://datatracker.ietf.org/doc/draft-narajala-courtney-ansv2/',
    summary:
      'Internet-Draft (rev. 02, Oct 2026) with GoDaddy that anchors agent identity in DNS using DNSSEC, Web PKI/DANE, and a transparency log. Replaces the original 2025 ANS draft.',
  },
  {
    title: 'AIVSS Scoring System for OWASP Agentic AI Core Security Risks v0.8',
    org: 'OWASP',
    year: 2026,
    role: 'Project co-lead and lead author',
    url: 'https://aivss.owasp.org/assets/publications/AIVSS%20Scoring%20System%20For%20OWASP%20Agentic%20AI%20Core%20Security%20Risks%20v0.8.pdf',
    summary:
      'Scoring for agentic AI vulnerabilities, co-published with AIUC and mapped to the OWASP Agentic Top 10 for 2026 and CSA MAESTRO. Follows v0.5 (2025).',
  },
  {
    title: 'Securing Agentic Applications Guide 1.0',
    org: 'OWASP',
    year: 2025,
    role: 'Co-lead',
    url: 'https://genai.owasp.org/resource/securing-agentic-applications-guide-1-0/',
    summary: 'Practical guidance for designing, building, and running agentic AI applications securely.',
  },
  {
    title: 'Agent Name Service (ANS) for Secure AI Agent Discovery v1.0',
    org: 'OWASP',
    year: 2025,
    role: 'Co-author',
    url: 'https://genai.owasp.org/resource/agent-name-service-ans-for-secure-al-agent-discovery-v1-0/',
    summary: 'The original OWASP publication of the Agent Name Service.',
  },
  {
    title: 'Multi-Agentic System Threat Modelling Guide v1.0',
    org: 'OWASP',
    year: 2025,
    role: 'Contributor',
    url: 'https://genai.owasp.org/resource/multi-agentic-system-threat-modeling-guide-v1-0/',
    summary: 'Applies OWASP’s agentic AI threat taxonomy to real-world multi-agent systems.',
  },
  {
    title: 'LLM and Gen AI Data Security Best Practices',
    org: 'OWASP',
    year: 2025,
    role: 'Co-author',
    url: 'https://genai.owasp.org/resource/llm-and-gen-ai-data-security-best-practices/',
    summary: 'Data security practices for LLM and generative AI systems across the data lifecycle.',
  },
  {
    title: 'State of Agentic AI Security and Governance (v1.0)',
    org: 'OWASP',
    year: 2025,
    role: 'Contributor',
    url: 'https://genai.owasp.org/resource/state-of-agentic-ai-security-and-governance/',
    summary: 'A survey of the security and governance landscape for agentic AI.',
  },
];

/** Papers I've reviewed, by venue. */
export const peerReviewVenues = [
  { name: 'IEEE Cyber Awareness and Research Symposium (CARS)', count: 5 },
  { name: 'AAAI/ACM Conference on AI, Ethics, and Society (AIES)', count: 4 },
  { name: 'IEEE International Conference on AI in Cybersecurity (ICAIC)', count: 4 },
  { name: 'IEEE Int’l Conference on Software System and Information Processing (ICSSIP)', count: 4 },
  { name: 'IEEE Open Journal of the Communications Society', count: 3 },
  { name: 'IEEE Consumer Communications & Networking Conference (CCNC)', count: 3 },
];

export const awards = [
  {
    title: '2nd Place, AI Safety & Alignment (Research Track)',
    org: 'UC Berkeley AgentX: LLM Agents MOOC Competition',
    year: 2025,
    summary:
      'Team lead on the second-place project in the AI Safety & Alignment category, hosted by the Berkeley Center for Responsible, Decentralized Intelligence.',
    url: 'https://rdi.berkeley.edu/agentx/',
  },
];

export interface Adoption {
  org: string;
  title: string;
  summary: string;
  url: string;
  quote?: string;
  quotedBy?: string;
}

export const adoption: Adoption[] = [
  {
    org: 'Linux Foundation',
    title: 'Agent Name Service project (2026)',
    summary:
      'The Linux Foundation announced in June 2026 that it will host the Agent Name Service as an open, DNS-anchored identity and discovery standard for AI agents.',
    url: 'https://www.linuxfoundation.org/press/linux-foundation-announces-intent-to-launch-agent-name-service-to-establish-trusted-identity-infrastructure-for-ai-agents',
  },
  {
    org: 'GoDaddy',
    title: 'ANS registry and registration authority',
    summary:
      'GoDaddy built and ran an ANS registry for agent registration, verification, and lifecycle management, then contributed it to the Linux Foundation.',
    url: 'https://www.godaddy.com/ANS',
    quote:
      'Just as HTTPS was necessary to enable secure transactions on the web, the ANS framework is a necessary foundation to enable verifiable, high-stakes transactions between autonomous digital assets.',
    quotedBy: 'Scott Courtney, VP Engineering, GoDaddy',
  },
  {
    org: 'HUMAN Security',
    title: 'HUMAN Verified AI Agent',
    summary:
      'An open-source foundation for agent identity built on ANS, interoperable with Google’s A2A protocol, for authenticating AI agents and preventing impersonation.',
    url: 'https://www.humansecurity.com/',
    quote: 'The HUMAN Verified AI Agent leverages ANS to establish trust and prevent impersonation in AI ecosystems.',
    quotedBy: 'HUMAN Security',
  },
];
