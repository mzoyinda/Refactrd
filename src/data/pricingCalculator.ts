export interface PriceRange {
  min: number;
  max: number;
}

export interface ProjectTypeOption {
  id: string;
  title: string;
  description: string;
  examples: string[];
  priceRange: PriceRange;
  timeline: string;
  icon: string;
}

export const projectTypes: ProjectTypeOption[] = [
  {
    id: 'website',
    title: 'Business Website & Digital Presence',
    description: 'Professional online presence that builds trust',
    examples: [
      'Informational business websites',
      'Company profile sites',
      'Marketing websites',
      'Landing pages',
      'E-commerce stores',
    ],
    priceRange: { min: 2500, max: 6000 },
    timeline: '2-4 weeks typically',
    icon: '🌐',
  },
  {
    id: 'operational',
    title: 'Operational Systems',
    description: 'Internal systems that power your operations',
    examples: [
      'Internal dashboards',
      'CRM customization & automation',
      'Workflow automation',
      'Order management systems',
      'Admin portals',
    ],
    priceRange: { min: 7000, max: 15000 },
    timeline: '4-8 weeks typically',
    icon: '⚙️',
  },
  {
    id: 'growth',
    title: 'Growth Infrastructure',
    description: 'Digital infrastructure that supports significant growth',
    examples: [
      'Custom web platforms',
      'SaaS MVP development',
      'Advanced automation systems',
      'Integrated operational platforms',
    ],
    priceRange: { min: 15000, max: 30000 },
    timeline: '8-12 weeks typically',
    icon: '📈',
  },
  {
    id: 'custom',
    title: 'Custom Product Engineering',
    description: 'Complex product development and platforms',
    examples: [
      'Mobile applications',
      'SaaS platforms',
      'Marketplace systems',
      'Large operational platforms',
    ],
    priceRange: { min: 20000, max: 80000 },
    timeline: '3-6 months typically',
    icon: '🚀',
  },
  {
    id: 'notSure',
    title: 'Not Sure / Need Guidance',
    description: "We'll help you identify the right solution",
    examples: [
      'Exploring options',
      'Need expert consultation',
      'Complex requirements',
      'Multiple system needs',
    ],
    priceRange: { min: 0, max: 0 },
    timeline: 'Custom timeline',
    icon: '💡',
  },
];

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  estimatedPrice: PriceRange;
}

export const websiteDetails: ProjectDetail[] = [
  {
    id: 'simple',
    title: 'Simple Business Website',
    description: '5-10 pages, contact form, basic SEO',
    estimatedPrice: { min: 2500, max: 4500 },
  },
  {
    id: 'multipage',
    title: 'Multi-Page Website with CMS',
    description: 'Blog, CMS, multiple sections, integrations',
    estimatedPrice: { min: 6000, max: 10000 },
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Store',
    description: 'Shopify, WooCommerce, payment integration',
    estimatedPrice: { min: 8000, max: 15000 },
  },
  {
    id: 'landing',
    title: 'Landing Page System',
    description: 'High-conversion pages, A/B testing ready',
    estimatedPrice: { min: 2000, max: 3500 },
  },
];

export const operationalDetails: ProjectDetail[] = [
  {
    id: 'dashboard',
    title: 'Custom Internal Dashboard',
    description: 'Sales data, operational metrics, data visualization',
    estimatedPrice: { min: 8000, max: 14000 },
  },
  {
    id: 'crm',
    title: 'CRM + Workflow Automation',
    description: 'CRM customization, automated workflows, reporting',
    estimatedPrice: { min: 7000, max: 12000 },
  },
  {
    id: 'automation',
    title: 'Workflow Automation System',
    description: 'Tool integrations, automated processes, monitoring',
    estimatedPrice: { min: 7000, max: 15000 },
  },
  {
    id: 'management',
    title: 'Internal Management Tool',
    description: 'Inventory, booking, operations management',
    estimatedPrice: { min: 10000, max: 15000 },
  },
];

export const growthDetails: ProjectDetail[] = [
  {
    id: 'saas',
    title: 'SaaS MVP Platform',
    description: 'Product architecture, user accounts, dashboard UI',
    estimatedPrice: { min: 20000, max: 30000 },
  },
  {
    id: 'platform',
    title: 'Custom Web Platform',
    description: 'Full-stack application, database, API integrations',
    estimatedPrice: { min: 18000, max: 28000 },
  },
  {
    id: 'advanced-automation',
    title: 'Advanced Automation System',
    description: 'Multi-department automation, complex integrations',
    estimatedPrice: { min: 15000, max: 25000 },
  },
];

export const customDetails: ProjectDetail[] = [
  {
    id: 'mobile-app',
    title: 'Mobile Application',
    description: 'iOS and/or Android app development',
    estimatedPrice: { min: 30000, max: 80000 },
  },
  {
    id: 'full-saas',
    title: 'Full SaaS Platform',
    description: 'Scalable architecture, cloud infrastructure, API systems',
    estimatedPrice: { min: 40000, max: 80000 },
  },
  {
    id: 'marketplace',
    title: 'Marketplace System',
    description: 'Multi-vendor platform, payment processing, admin tools',
    estimatedPrice: { min: 35000, max: 70000 },
  },
  {
    id: 'enterprise',
    title: 'Enterprise Infrastructure',
    description: 'ERP integrations, operational platforms, analytics',
    estimatedPrice: { min: 30000, max: 80000 },
  },
];

export const timelineOptions = [
  {
    id: 'asap',
    label: 'ASAP (2-4 weeks)',
    value: '2-4 weeks',
  },
  {
    id: 'standard',
    label: 'Standard (4-8 weeks)',
    value: '4-8 weeks',
  },
  {
    id: 'flexible',
    label: 'Flexible (8-12+ weeks)',
    value: '8-12+ weeks',
  },
];

export const supportOptions = [
  {
    id: 'none',
    title: 'No, just the project',
    description: 'One-time project delivery',
    monthlyCost: 0,
  },
  {
    id: 'systems',
    title: 'Systems Support',
    description: 'Maintenance, bug fixes, minor updates',
    monthlyCost: 1500,
  },
  {
    id: 'growth',
    title: 'Growth Systems Partner',
    description: 'Ongoing improvements, system upgrades, integrations',
    monthlyCost: 2500,
  },
  {
    id: 'infrastructure',
    title: 'Technical Infrastructure Partner',
    description: 'Strategic advisory, new development, priority support',
    monthlyCost: 4000,
  },
];

// "Not Sure" path options
export const budgetOptions = [
  {
    id: 'under5k',
    label: 'Under $5,000',
    range: { min: 0, max: 5000 },
  },
  {
    id: '5to15k',
    label: '$5,000 - $15,000',
    range: { min: 5000, max: 15000 },
  },
  {
    id: '15to30k',
    label: '$15,000 - $30,000',
    range: { min: 15000, max: 30000 },
  },
  {
    id: 'over30k',
    label: 'Over $30,000',
    range: { min: 30000, max: 100000 },
  },
  {
    id: 'flexible',
    label: 'Flexible / Not sure',
    range: null,
  },
];

export const painPointOptions = [
  'Manual repetitive tasks taking up too much time',
  'Disconnected tools and poor data flow',
  'No clear visibility into business operations',
  'Need to launch a product/platform quickly',
  'Scaling issues with current systems',
  'Poor internal collaboration and workflows',
  'Need better customer-facing digital presence',
  'Other',
];