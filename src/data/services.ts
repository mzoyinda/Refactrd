export interface TransformItem {
  title: string;
  tagline: string;
  description: string;
}

export interface OutcomeItem {
  title: string;
  description: string;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface RelatedCaseStudy {
  name: string;
  summary: string;
  problem: string;
  solution: string;
  results: string[];
  href: string;
}

export interface ServiceDefinition {
  slug: string;
  level: string;
  title: string;
  headline: string;
  image: string;
  body: string[];
  helpWith: string[];
  outcome: string;

  // Rich detail-page fields — optional, populated per service as copy is finalized.
  subheadline?: string;
  outcomeBadges?: string[];
  heroCaption?: {
    title: string;
    subtitle: string;
  };
  challenge?: {
    heading: string;
    body: string[];
    signs: string[];
    diagram?: {
      type: "workflow" | "funnel" | "sequence";
      sources?: string[];
      destination?: string;
      caption?: string;
      stages?: string[];
      beforeLabel?: string;
      afterLabel?: string;
    };
  };
  approach?: {
    heading: string;
    body: string[];
    statement: string;
  };
  transformItems?: TransformItem[];
  outcomes?: {
    heading: string;
    intro: string;
    items: OutcomeItem[];
  };
  fit?: {
    heading: string;
    body: string[];
  };
  relatedServiceSlugs?: string[];
  relatedServicesIntro?: string;
  relatedCaseStudies?: RelatedCaseStudy[];
  caseStudiesIntro?: string;
  faqs?: ServiceFAQItem[];
  finalCta?: {
    heading: string;
    body: string;
  };
}

export const services: ServiceDefinition[] = [
  {
    slug: "workflow-transformation",
    level: "01",
    title: "Workflow Transformation",
    headline: "Redesign How Work Gets Done",
    image: "/images/ai-workflow.jpg",
    body: [
      "We help organizations redesign how work moves across teams, systems, and processes to improve execution and prepare for practical AI adoption.",
    ],
    helpWith: [
      "Workflow redesign",
      "Process improvement",
      "Operational assessments",
      "Cross-functional collaboration",
    ],
    outcome: "Better workflows. Faster execution. Stronger operational performance.",

    subheadline: "AI creates the greatest value when it's applied to the right workflows.",
    outcomeBadges: [
      "Reduce Operational Friction",
      "Improve Execution",
      "Prepare For AI Adoption",
    ],
    heroCaption: {
      title: "Workflow Mapped",
      subtitle: "Current state → Redesigned state",
    },
    challenge: {
      heading: "Workflows Weren't Designed For AI",
      body: [
        "Many organizations introduce AI into workflows that already contain unnecessary friction.",
        "The result is faster execution of the same operational problems.",
        "Workflow transformation begins by improving how work gets done before introducing technology.",
      ],
      diagram: { type: "workflow" },
      signs: [
        "Teams spend too much time on manual work.",
        "Processes are inconsistent across departments.",
        "Work slows down because of approvals and handoffs.",
        "Information is difficult to find.",
        "AI tools have been introduced with little operational impact.",
      ],
    },
    approach: {
      heading: "Improve The Workflow Before The Technology",
      body: [
        "Successful AI adoption isn't about replacing people.",
        "It's about redesigning how work gets done.",
        "We work with organizations to understand how work flows today, identify opportunities for improvement, and redesign workflows that are more efficient, scalable, and ready for AI.",
      ],
      statement: "Technology supports the transformation. It isn't the transformation.",
    },
    transformItems: [
      {
        title: "Workflow Design",
        tagline: "Remove friction before adding technology.",
        description: "We redesign workflows to simplify execution, eliminate bottlenecks, and improve how work moves across teams.",
      },
      {
        title: "Operational Efficiency",
        tagline: "Improve execution across the organization.",
        description: "Identify opportunities to streamline work, strengthen collaboration, and reduce operational complexity.",
      },
      {
        title: "Information Flow",
        tagline: "Make information easier to access and use.",
        description: "Improve how knowledge moves between people, teams, and systems to support faster, better decisions.",
      },
      {
        title: "Decision-Making",
        tagline: "Enable better operational decisions.",
        description: "Create clearer processes, better visibility, and more consistent decision-making across the organization.",
      },
      {
        title: "AI Readiness",
        tagline: "Prepare workflows for practical AI implementation.",
        description: "Design workflows that are structured, scalable, and ready to support successful AI adoption.",
      },
    ],
    outcomes: {
      heading: "What Changes",
      intro: "Workflow transformation improves more than individual processes. It creates stronger operational foundations for AI adoption.",
      items: [
        { title: "Faster Execution", description: "Complete work with fewer delays." },
        { title: "Better Collaboration", description: "Improve coordination across teams." },
        { title: "Better Visibility", description: "See how work moves across the organization." },
        { title: "AI Readiness", description: "Prepare workflows for AI implementation." },
        { title: "Greater Agility", description: "Respond more effectively to operational change." },
        { title: "Reduced Manual Effort", description: "Spend less time on repetitive work." },
      ],
    },
    fit: {
      heading: "Workflow Transformation Is Where AI Transformation Begins",
      body: [
        "Redesigning workflows creates the operational foundation for knowledge systems, intelligent operations, and AI-enabled products.",
        "It's often the first step toward sustainable AI adoption.",
      ],
    },
    relatedServiceSlugs: [
      "knowledge-systems-ai-assistants",
      "intelligent-operations",
      "ai-enabled-products",
    ],
    relatedCaseStudies: [
      {
        name: "Quill",
        summary: "Proposal creation reduced from two to three hours to approximately twelve minutes through workflow redesign and AI implementation.",
        problem: "Proposal creation required two to three hours, slowing business development and reducing delivery capacity.",
        solution: "Refactrd redesigned the proposal workflow and implemented an AI-powered proposal system that transformed discovery notes into branded proposals.",
        results: [
          "Proposal creation reduced to approximately 12 minutes",
          "Faster client response",
          "Increased delivery capacity",
          "Approximately 80% first-draft accuracy",
        ],
        href: "/case-studies/quill",
      },
    ],
    faqs: [
      {
        question: "What is workflow transformation?",
        answer:
          "Workflow transformation is the process of redesigning how work is performed to improve efficiency, collaboration, and operational outcomes before introducing AI or automation.",
      },
      {
        question: "Is workflow transformation only for organizations adopting AI?",
        answer:
          "No. Many organizations begin by improving workflows before implementing AI, while others use workflow transformation to strengthen existing AI initiatives.",
      },
      {
        question: "How do you identify workflows to improve?",
        answer:
          "We assess current workflows, operational bottlenecks, information flow, and business priorities to identify opportunities where improvements will create measurable operational impact.",
      },
      {
        question: "Do you also implement AI solutions?",
        answer:
          "Yes. Workflow transformation often leads into practical AI implementation, knowledge systems, intelligent operations, or AI-enabled products where appropriate.",
      },
      {
        question: "How long does a workflow transformation engagement take?",
        answer:
          "Every engagement is different and depends on the scope, organizational priorities, and operational complexity. We'll recommend the most appropriate approach after understanding your goals.",
      },
    ],
    finalCta: {
      heading: "Ready To Improve How Work Gets Done?",
      body: "Let's explore how workflow transformation can improve execution and prepare your organization for practical AI adoption.",
    },
  },
  {
    slug: "knowledge-systems-ai-assistants",
    level: "02",
    title: "Knowledge Systems & AI Assistants",
    headline: "Make Organizational Knowledge Instantly Accessible",
    image: "/images/ai-research.jpg",
    body: [
      "Refactrd designs AI-powered knowledge systems and assistants that help teams quickly find trusted information, make better decisions, and work more confidently.",
    ],
    helpWith: [
      "AI Assistants",
      "Knowledge Systems",
      "Enterprise Search",
      "Documentation",
    ],
    outcome: "Better decisions. Faster onboarding. Less time searching for information.",

    subheadline: "Knowledge shouldn't be trapped in documents, inboxes, or individual employees.",
    outcomeBadges: [
      "Faster Information Access",
      "Better Decisions",
      "Smarter AI Assistants",
    ],
    heroCaption: {
      title: "Knowledge Connected",
      subtitle: "Scattered sources → One system",
    },
    challenge: {
      heading: "Knowledge Is Everywhere. Answers Aren't.",
      body: [
        "Organizations create enormous amounts of knowledge.",
        "Finding the right information at the right time is often the real challenge.",
        "Without a connected knowledge system, teams spend more time searching than acting.",
      ],
      diagram: {
        type: "funnel",
        sources: ["Email", "Documents", "SharePoint", "CRM"],
        destination: "AI Knowledge Assistant",
        caption: "Scattered sources converging into one connected system",
      },
      signs: [
        "Teams struggle to find trusted information.",
        "Knowledge exists across multiple systems.",
        "Employees rely on asking colleagues instead of searching.",
        "Onboarding takes longer than it should.",
        "AI assistants produce inconsistent responses.",
      ],
    },
    transformItems: [
      {
        title: "Enterprise Knowledge Systems",
        tagline: "Bring organizational knowledge together.",
        description: "Connect documents, policies, procedures, and operational knowledge into a single searchable experience.",
      },
      {
        title: "AI Assistants",
        tagline: "Give teams answers, not more searching.",
        description: "Design assistants that understand your organization's knowledge and provide contextual responses.",
      },
      {
        title: "Enterprise Search",
        tagline: "Make information easier to discover.",
        description: "Improve how employees search, retrieve, and use organizational knowledge.",
      },
      {
        title: "Knowledge Architecture",
        tagline: "Organize information for scale.",
        description: "Create structures that make knowledge easier to maintain, govern, and expand.",
      },
      {
        title: "AI Readiness",
        tagline: "Build knowledge that AI can actually use.",
        description: "Prepare documentation and information so AI systems deliver more accurate and reliable responses.",
      },
    ],
    outcomes: {
      heading: "What Changes",
      intro: "Connected knowledge systems improve how organizations learn, collaborate, and make decisions.",
      items: [
        { title: "Faster Information Access", description: "Find trusted information in seconds." },
        { title: "Better Decisions", description: "Improve confidence through reliable knowledge." },
        { title: "Faster Onboarding", description: "Help new employees become productive sooner." },
        { title: "Stronger Knowledge Retention", description: "Reduce dependency on individual expertise." },
        { title: "Better AI Responses", description: "Increase the quality and consistency of AI assistants." },
        { title: "Greater Productivity", description: "Spend less time searching and more time executing." },
      ],
    },
    fit: {
      heading: "Knowledge Systems Power Intelligent Organizations",
      body: [
        "Connected knowledge creates the foundation for intelligent operations, AI assistants, and AI-enabled products.",
        "Without accessible knowledge, AI cannot consistently deliver value.",
      ],
    },
    relatedServiceSlugs: [
      "workflow-transformation",
      "intelligent-operations",
      "ai-enabled-products",
    ],
    relatedServicesIntro: "Knowledge systems often support broader operational transformation.",
    relatedCaseStudies: [],
    caseStudiesIntro: "See how organizations improved knowledge access and decision-making through AI-powered knowledge systems.",
    faqs: [
      {
        question: "What is an AI knowledge system?",
        answer:
          "An AI knowledge system connects organizational information into a structured, searchable experience that helps employees quickly find trusted answers.",
      },
      {
        question: "How is this different from a chatbot?",
        answer:
          "A chatbot provides conversation. A knowledge system provides trusted organizational intelligence that can power assistants, enterprise search, and AI applications.",
      },
      {
        question: "Can you use our existing documentation?",
        answer:
          "Yes. We work with existing documentation, policies, procedures, and knowledge repositories before recommending improvements where necessary.",
      },
      {
        question: "Do we need to replace our current systems?",
        answer:
          "Not necessarily. We often integrate with existing platforms while improving how information is organized and accessed.",
      },
      {
        question: "Can knowledge systems support AI assistants?",
        answer:
          "Yes. Well-structured knowledge systems provide the foundation for reliable AI assistants and enterprise search experiences.",
      },
    ],
    finalCta: {
      heading: "Ready To Make Organizational Knowledge More Accessible?",
      body: "Let's explore how AI-powered knowledge systems can improve decision-making, reduce time spent searching, and strengthen AI adoption.",
    },
  },
  {
    slug: "intelligent-operations",
    level: "03",
    title: "Intelligent Operations",
    headline: "Embed AI Into Everyday Operations",
    image: "/images/ai-dashboard.jpg",
    body: [
      "Refactrd helps organizations integrate AI into operational processes, enabling faster decisions, greater visibility, and more intelligent execution across the business.",
    ],
    helpWith: [
      "Operational AI",
      "Decision Support",
      "Operational Intelligence",
      "AI Monitoring",
    ],
    outcome: "Smarter operations that improve execution, responsiveness, and operational performance.",

    subheadline: "The greatest operational impact happens when AI becomes part of how work is executed every day.",
    outcomeBadges: [
      "Smarter Decisions",
      "Greater Operational Visibility",
      "Faster Execution",
    ],
    heroCaption: {
      title: "Operations, Connected",
      subtitle: "Fragmented → Coordinated execution",
    },
    challenge: {
      heading: "Operations Generate Data. Not Always Better Decisions.",
      body: [
        "Most organizations already have the data they need.",
        "The challenge is turning that information into timely, consistent, and actionable decisions.",
        "Without intelligent operational systems, teams spend more time reacting than improving.",
      ],
      diagram: {
        type: "sequence",
        stages: ["Requests", "Operations", "Reporting", "Decisions", "Execution"],
        beforeLabel: "Disconnected.",
        afterLabel: "AI coordinates information and decision-making.",
      },
      signs: [
        "Teams rely on manual reporting.",
        "Decisions are delayed because information is fragmented.",
        "Operational visibility is limited.",
        "AI tools exist but aren't integrated into daily work.",
        "Leaders lack real-time operational insight.",
      ],
    },
    transformItems: [
      {
        title: "Operational Intelligence",
        tagline: "Turn operational data into meaningful insight.",
        description: "Improve visibility across teams, systems, and processes through AI-powered operational intelligence.",
      },
      {
        title: "Decision Support",
        tagline: "Help teams make faster, more informed decisions.",
        description: "Provide AI-assisted recommendations that improve consistency and execution.",
      },
      {
        title: "AI-Enabled Workflows",
        tagline: "Embed intelligence into everyday execution.",
        description: "Integrate AI directly into operational processes where it creates measurable value.",
      },
      {
        title: "Operational Monitoring",
        tagline: "Improve visibility across operations.",
        description: "Monitor workflows, identify bottlenecks, and surface opportunities for improvement before they become operational issues.",
      },
      {
        title: "Continuous Improvement",
        tagline: "Build operations that learn over time.",
        description: "Use operational insights to continuously refine workflows, improve execution, and strengthen organizational performance.",
      },
    ],
    outcomes: {
      heading: "What Changes",
      intro: "Intelligent operations improve how organizations execute, monitor, and adapt.",
      items: [
        { title: "Faster Decisions", description: "Reduce the time between information and action." },
        { title: "Greater Visibility", description: "Understand what's happening across operations." },
        { title: "Smarter Execution", description: "Use AI to support everyday operational decisions." },
        { title: "Better Performance", description: "Monitor operational health more effectively." },
        { title: "Continuous Improvement", description: "Use insights to improve over time." },
        { title: "More Scalable Operations", description: "Support growth without increasing operational complexity." },
      ],
    },
    fit: {
      heading: "Intelligent Operations Turn AI Into Everyday Execution",
      body: [
        "Workflow transformation redesigns how work happens.",
        "Knowledge systems provide trusted information.",
        "Intelligent operations bring AI into everyday execution, helping organizations make faster decisions and improve operational performance.",
      ],
    },
    relatedServiceSlugs: [
      "workflow-transformation",
      "knowledge-systems-ai-assistants",
      "ai-enabled-products",
    ],
    relatedServicesIntro: "Intelligent operations often connect with other transformation initiatives.",
    relatedCaseStudies: [],
    caseStudiesIntro: "See how organizations have embedded AI into everyday operations.",
    faqs: [
      {
        question: "What are intelligent operations?",
        answer:
          "Intelligent operations use AI to improve execution, decision-making, operational visibility, and coordination across the organization.",
      },
      {
        question: "Is this the same as automation?",
        answer:
          "No. Automation focuses on repetitive tasks. Intelligent operations focus on improving how people, processes, and AI work together to make better operational decisions.",
      },
      {
        question: "Can intelligent operations work with our existing systems?",
        answer:
          "Yes. We integrate AI into existing operational environments wherever practical rather than replacing systems unnecessarily.",
      },
      {
        question: "Do we need AI before starting?",
        answer:
          "No. Many organizations begin by identifying operational opportunities before implementing AI solutions.",
      },
      {
        question: "How does this relate to workflow transformation?",
        answer:
          "Workflow transformation improves how work is designed. Intelligent operations improve how that work is executed every day using AI.",
      },
    ],
    finalCta: {
      heading: "Ready To Make Operations More Intelligent?",
      body: "Let's explore how AI can improve execution, decision-making, and operational performance across your organization.",
    },
  },
  {
    slug: "ai-enabled-products",
    level: "04",
    title: "AI-Enabled Products",
    headline: "Create Smarter Products And Experiences",
    image: "/images/people.png",
    body: [
      "Refactrd helps organizations identify, design, and implement AI capabilities that improve customer experiences, strengthen products, and unlock new opportunities for growth.",
    ],
    helpWith: [
      "AI Product Features",
      "Customer Experiences",
      "Internal AI Tools",
      "Product Strategy",
    ],
    outcome: "Products and experiences that create measurable business value and competitive advantage.",

    subheadline: "AI is changing how products create value.",
    outcomeBadges: [
      "Smarter Customer Experiences",
      "AI-Powered Product Features",
      "Faster Product Innovation",
    ],
    heroCaption: {
      title: "Product Intelligence",
      subtitle: "Static features → AI-enabled experience",
    },
    challenge: {
      heading: "Products Are Changing Faster Than Expectations",
      body: [
        "Customers increasingly expect products that are intelligent, personalized, and responsive.",
        "Many organizations know AI could improve their products but aren't sure where it creates meaningful value.",
        "Without a clear strategy, AI becomes another feature instead of a competitive advantage.",
      ],
      diagram: {
        type: "sequence",
        stages: [
          "Current Product",
          "Static Features",
          "Limited Personalization",
          "Manual Experience",
          "Customer Friction",
          "AI-Enabled Product",
        ],
      },
      signs: [
        "Customers expect more personalized experiences.",
        "Product teams are exploring AI but lack direction.",
        "Existing products feel increasingly commoditized.",
        "AI opportunities are difficult to prioritize.",
        "Internal tools create unnecessary operational friction.",
      ],
    },
    transformItems: [
      {
        title: "AI Product Strategy",
        tagline: "Identify where AI creates meaningful value.",
        description: "Evaluate opportunities before investing in development.",
      },
      {
        title: "AI-Powered Features",
        tagline: "Enhance products with practical AI capabilities.",
        description: "Design features that improve customer experience rather than adding unnecessary complexity.",
      },
      {
        title: "Customer Experiences",
        tagline: "Create more intelligent interactions.",
        description: "Use AI to personalize experiences, improve engagement, and increase product value.",
      },
      {
        title: "Internal Product Tools",
        tagline: "Improve how teams build and deliver products.",
        description: "Create AI-enabled tools that strengthen product operations and internal workflows.",
      },
      {
        title: "Product Validation",
        tagline: "Test ideas before scaling investment.",
        description: "Prototype, validate, and refine AI initiatives before larger commitments.",
      },
    ],
    outcomes: {
      heading: "What Changes",
      intro: "AI-enabled products create value for both customers and the organizations that build them.",
      items: [
        { title: "Better Customer Experiences", description: "Deliver more valuable interactions." },
        { title: "Faster Product Innovation", description: "Validate and launch new capabilities more efficiently." },
        { title: "Practical AI Features", description: "Introduce AI where it improves the experience." },
        { title: "New Growth Opportunities", description: "Identify new ways to create customer value." },
        { title: "Stronger Internal Tools", description: "Support product teams with AI-powered capabilities." },
        { title: "Better Product Decisions", description: "Prioritize AI opportunities with greater confidence." },
      ],
    },
    fit: {
      heading: "AI-Enabled Products Extend Operational Transformation",
      body: [
        "Workflow transformation improves execution.",
        "Knowledge systems strengthen organizational intelligence.",
        "Intelligent operations improve daily performance.",
        "AI-enabled products bring those capabilities directly into customer and employee experiences.",
      ],
    },
    relatedServiceSlugs: [
      "workflow-transformation",
      "knowledge-systems-ai-assistants",
      "intelligent-operations",
    ],
    relatedServicesIntro: "AI-enabled products often build on other transformation initiatives.",
    relatedCaseStudies: [],
    caseStudiesIntro: "See how organizations are creating smarter products through practical AI implementation.",
    faqs: [
      {
        question: "What is an AI-enabled product?",
        answer:
          "An AI-enabled product uses artificial intelligence to improve customer experiences, increase product value, or create entirely new capabilities.",
      },
      {
        question: "Do you build products from scratch?",
        answer:
          "We help organizations identify opportunities, design AI capabilities, validate concepts, and implement practical solutions. Every engagement is tailored to your goals and existing product strategy.",
      },
      {
        question: "How do you identify AI opportunities?",
        answer:
          "We evaluate customer needs, product strategy, workflows, and operational priorities to identify where AI creates measurable value.",
      },
      {
        question: "Can AI improve internal products too?",
        answer:
          "Yes. Many organizations begin by enhancing internal tools that improve employee productivity before introducing AI into customer-facing products.",
      },
      {
        question: "How does this relate to the other Refactrd services?",
        answer:
          "AI-enabled products often build on workflow transformation, knowledge systems, and intelligent operations to create complete AI-powered experiences.",
      },
    ],
    finalCta: {
      heading: "Ready To Build Smarter Products?",
      body: "Let's explore how AI can create better customer experiences, stronger products, and measurable business value.",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}
