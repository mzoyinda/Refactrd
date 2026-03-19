export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  shortDescription: string;
  aboutCompany: string[];
  roleOverview: {
    description: string[];
    reportingTo?: string;
  };
  responsibilities: string[];
  requirements: {
    required: string[];
    preferred?: string[];
  };
  remuneration: string[];
  successMetrics: string[];
  benefits: string[];
  interviewProcess: Array<{ step: string; title: string; description: string }>; // NEW
  closingStatement: string;
  applicationLink: string;
}

export const jobs: Job[] = [
  // {
  //   slug: "sales-intern",
  //   title: "Sales Intern",
  //   department: "Sales & Business Development",
  //   location: "Remote (Nigeria only)",
  //   type: "6-Month Internship",
  //   salary: "₦70,000 – ₦100,000/month",
  //   shortDescription:
  //     "Join our sales team to help identify potential clients, support outreach efforts, and learn the fundamentals of B2B sales in the software industry.",
  //   aboutCompany: [
  //     "Refactrd is an engineering studio that builds websites, mobile applications, and AI-powered systems for startups and growing businesses.",
  //     "We help founders move from raw ideas to clean, scalable engineering solutions. For existing businesses, we refine, refactor, and integrate AI and automation into their systems.",
  //     "We are now building a structured sales function and looking for a Sales Intern to grow with us.",
  //   ],
  //   roleOverview: {
  //     description: [
  //       "This is a hands-on, performance-driven sales role.",
  //       "You will represent Refactrd in real conversations with founders, SMEs, and enterprise teams.",
  //       "You will not just 'generate leads.'",
  //     ],
  //     reportingTo: "CTO",
  //   },
  //   responsibilities: [
  //     "Conduct cold outreach to founders and business owners",
  //     "Convert DMs and conversations into booked discovery calls",
  //     "Follow up consistently with warm and cold leads",
  //     "Qualify prospects properly before escalation",
  //     "Draft simple proposals with guidance",
  //     "Close small deals independently",
  //     "Maintain organized lead tracking sheets",
  //     "Submit structured weekly sales reports",
  //     "Contribute ideas to improve our sales system",
  //   ],
  //   requirements: {
  //     required: [
  //       "1–2 years experience in sales",
  //       "Minimum of a BSc degree",
  //       "Strong written and verbal communication skills",
  //       "Calm and structured communicator",
  //       "Organized and consistent",
  //       "Comfortable speaking with founders and decision makers",
  //       "Willingness to learn technical concepts",
  //       "Ability to follow up without being reminded",
  //     ],
  //   },
  //   remuneration: [
  //     "Monthly Stipend: ₦70,000 – ₦100,000 (depending on experience and performance)",
  //     "6-Month Internship",
  //     "Remote (Nigeria only)",
  //     "Opportunity for full-time conversion based on performance",
  //   ],
  //   successMetrics: [
  //     "Number of qualified calls booked",
  //     "Conversion rate from conversation to call",
  //     "Revenue from closed small deals",
  //     "Consistency of follow-ups",
  //     "Quality of weekly reporting",
  //     "Improvement in pipeline organization",
  //   ],
  //   benefits: [
  //     "Direct exposure to startup sales conversations",
  //     "Experience selling technical and AI services",
  //     "Deep understanding of how engineering studios operate",
  //     "Real responsibility, not busy work",
  //     "Opportunity to help build a sales system from scratch",
  //     "Potential full-time role after 6 months",
  //   ],
  //   closingStatement:
  //     "If you want to grow in sales the right way, this is a real opportunity.",
  //   applicationLink: "https://forms.gle/pfid7M2WwGzo2w5N9",
  // },
  {
    slug: "brand-and-visual-designer-intern",
    title: "Brand & Visual Designer Intern",
    department: "Growth & Marketing",
    location: "Remote (Nigeria only)",
    type: "6-Month Internship",
    salary: "₦70,000 – ₦100,000/month",
    shortDescription:
      "Design high-quality visuals for social media, marketing assets, and pitch decks while helping shape Refactrd’s brand across platforms.",

    aboutCompany: [
      "Refactrd is an engineering studio that builds websites, mobile applications, and AI-powered systems for startups and growing businesses.",
      "We help founders move from raw ideas to clean, scalable engineering solutions. For existing businesses, we refine, refactor, and integrate AI and automation into their systems.",
      "As we grow our brand and marketing efforts, we are looking for a Brand & Visual Designer (Intern) to take ownership of how we show up visually across platforms.",
    ],

    roleOverview: {
      description: [
        "This is a hands-on, output-driven design role.",
        "You will own visual content end-to-end across social media and marketing channels.",
        "You will translate ideas into clean, high-quality designs and help shape our visual identity.",
      ],
      reportingTo: "CTO",
    },

    responsibilities: [
      "Design LinkedIn and Instagram carousels and posts",
      "Create clean, high-quality marketing visuals",
      "Design pitch decks and sales materials",
      "Maintain consistency with Refactrd’s brand guidelines",
      "Create simple motion graphics and animated visuals",
      "Use AI tools to improve speed and creativity in design",
      "Turn rough ideas into polished visual outputs",
      "Manage your design workflow from concept to final delivery",
      "Iterate quickly based on feedback",
      "Contribute ideas to improve our visual identity and content",
    ],

    requirements: {
      required: [
        "1–2 years experience in graphic or visual design",
        "Strong working knowledge of Canva",
        "Good design sense (layout, spacing, typography, color)",
        "Ability to create clean and modern social media designs",
        "Basic motion design or animation skills",
        "Familiarity with AI design tools (or willingness to learn fast)",
        "Ability to work independently and own tasks end-to-end",
        "Strong attention to detail",
        "Organized and consistent",
      ],
    },

    remuneration: [
      "Monthly Stipend: ₦70,000 – ₦100,000 (based on experience and performance)",
      "6-Month Internship",
      "Remote (Nigeria only)",
      "Opportunity for full-time conversion based on performance",
    ],

    successMetrics: [
      "Consistency and quality of visual outputs",
      "Speed of execution without losing quality",
      "Ability to translate ideas into strong visuals",
      "Improvement over time",
      "Contribution to brand consistency",
      "Engagement performance of content (where applicable)",
    ],

    benefits: [
      "Real ownership of brand visuals",
      "Experience working directly with founders",
      "Exposure to startup marketing and positioning",
      "Hands-on experience with AI in design workflows",
      "Opportunity to build a strong portfolio with real work",
      "Potential full-time role after 6 months",
    ],

    interviewProcess: [
      {
        step: "1",
        title: "Design Task",
        description:
          "Shortlisted candidates will complete a practical design task based on real Refactrd content. This helps us understand your design thinking, execution, and attention to detail.",
      },
      {
        step: "2",
        title: "CTO/Co-Founder Interview",
        description:
          "Walk through your design decisions and approach. We'll assess how you think, your creative process, and overall fit with the team.",
      },
    ],

    closingStatement:
      "If you care about design quality, want to grow fast, and are ready to own real work, this is a real opportunity.",

    applicationLink: "https://forms.gle/A59v6WSBw2EamE6A8",
  },
  // Add more jobs here in the future
  // {
  //   slug: "senior-frontend-engineer",
  //   title: "Senior Frontend Engineer",
  //   ...
  // },
];

// Helper function to get job by slug
export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}

// Helper function to get all job slugs (for static generation)
export function getAllJobSlugs(): string[] {
  return jobs.map((job) => job.slug);
}
