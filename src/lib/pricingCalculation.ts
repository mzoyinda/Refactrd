import {
  websiteDetails,
  operationalDetails,
  growthDetails,
  customDetails,
  supportOptions,
  budgetOptions,
  projectTypes,
  ProjectDetail, // Import the type
} from '@/data/pricingCalculator';

export interface CalculationResult {
  projectType: string;
  projectTypeName: string;
  projectDetails?: string;
  projectDetailsName?: string;
  estimatedRange: { min: number; max: number };
  timeline: string;
  ongoingSupport?: {
    type: string;
    name: string;
    monthlyCost: number;
  };
  breakdown: {
    baseProject: { min: number; max: number };
    support?: number;
    total: { min: number; max: number };
  };
  isCustomQuote: boolean;
  painPoints?: string[];
  budget?: string;
}

export function calculatePricing(answers: {
  projectType?: string;
  projectDetails?: string;
  timeline?: string;
  support?: string;
  budget?: string;
  painPoints?: string[];
}): CalculationResult {
  // Handle "Not Sure" path
  if (answers.projectType === 'notSure') {
    return calculateCustomQuote(answers);
  }

  // Main path calculation
  const projectType = projectTypes.find((p) => p.id === answers.projectType);
  
  if (!projectType) {
    throw new Error('Invalid project type');
  }

  // Get project details - FIX: Add explicit type
  let detailsOptions: ProjectDetail[] = [];
  switch (answers.projectType) {
    case 'website':
      detailsOptions = websiteDetails;
      break;
    case 'operational':
      detailsOptions = operationalDetails;
      break;
    case 'growth':
      detailsOptions = growthDetails;
      break;
    case 'custom':
      detailsOptions = customDetails;
      break;
  }

  const projectDetail = detailsOptions.find((d) => d.id === answers.projectDetails);
  
  // Base price range
  const baseRange = projectDetail
    ? projectDetail.estimatedPrice
    : projectType.priceRange;

  // Get support option
  const support = supportOptions.find((s) => s.id === answers.support);

  // Calculate total
  const result: CalculationResult = {
    projectType: projectType.id,
    projectTypeName: projectType.title,
    projectDetails: projectDetail?.id,
    projectDetailsName: projectDetail?.title,
    estimatedRange: baseRange,
    timeline: answers.timeline || projectType.timeline,
    ongoingSupport: support && support.monthlyCost > 0
      ? {
          type: support.id,
          name: support.title,
          monthlyCost: support.monthlyCost,
        }
      : undefined,
    breakdown: {
      baseProject: baseRange,
      support: support?.monthlyCost,
      total: baseRange,
    },
    isCustomQuote: false,
  };

  return result;
}

function calculateCustomQuote(answers: {
  budget?: string;
  painPoints?: string[];
  timeline?: string;
}): CalculationResult {
  // Get budget range
  const budgetOption = budgetOptions.find((b) => b.id === answers.budget);
  
  const estimatedRange = budgetOption?.range || { min: 2500, max: 30000 };

  // Recommend services based on pain points
  const painPoints = answers.painPoints || [];
  const recommendedType = getRecommendedType(painPoints);

  return {
    projectType: 'custom',
    projectTypeName: 'Custom Consultation Required',
    estimatedRange,
    timeline: answers.timeline || 'To be determined',
    breakdown: {
      baseProject: estimatedRange,
      total: estimatedRange,
    },
    isCustomQuote: true,
    painPoints,
    budget: answers.budget,
  };
}

function getRecommendedType(painPoints: string[]): string {
  // Simple logic to recommend based on pain points
  const hasManualTasks = painPoints.some((p) =>
    p.toLowerCase().includes('manual') || p.toLowerCase().includes('repetitive')
  );
  const hasVisibility = painPoints.some((p) =>
    p.toLowerCase().includes('visibility') || p.toLowerCase().includes('disconnected')
  );
  const needsPlatform = painPoints.some((p) =>
    p.toLowerCase().includes('launch') || p.toLowerCase().includes('platform')
  );

  if (needsPlatform) return 'growth';
  if (hasVisibility || hasManualTasks) return 'operational';
  return 'website';
}

// Get recommended solutions based on pain points
export function getRecommendedSolutions(
  painPoints: string[],
  budgetRange?: { min: number; max: number }
): Array<{ category: string; solution: string; description: string }> {
  const recommendations = [];

  const hasManualTasks = painPoints.some((p) =>
    p.toLowerCase().includes('manual') || p.toLowerCase().includes('repetitive')
  );
  const hasDisconnectedTools = painPoints.some((p) =>
    p.toLowerCase().includes('disconnected') || p.toLowerCase().includes('data flow')
  );
  const hasVisibility = painPoints.some((p) =>
    p.toLowerCase().includes('visibility') || p.toLowerCase().includes('operations')
  );
  const needsPlatform = painPoints.some((p) =>
    p.toLowerCase().includes('launch') || p.toLowerCase().includes('product')
  );
  const hasScaling = painPoints.some((p) =>
    p.toLowerCase().includes('scaling') || p.toLowerCase().includes('growth')
  );
  const needsDigitalPresence = painPoints.some((p) =>
    p.toLowerCase().includes('digital') || p.toLowerCase().includes('customer-facing')
  );

  if (hasManualTasks || hasDisconnectedTools) {
    recommendations.push({
      category: 'Workflow Automation',
      solution: 'Workflow Automation System',
      description:
        'Automate repetitive tasks and connect your tools to improve data flow',
    });
  }

  if (hasVisibility) {
    recommendations.push({
      category: 'Operational Systems',
      solution: 'Internal Dashboard',
      description:
        'Get real-time visibility into your business operations and metrics',
    });
  }

  if (needsPlatform || hasScaling) {
    recommendations.push({
      category: 'Growth Infrastructure',
      solution: 'Custom Platform Development',
      description:
        'Build scalable infrastructure to support your growth',
    });
  }

  if (needsDigitalPresence) {
    recommendations.push({
      category: 'Digital Presence',
      solution: 'Professional Website',
      description:
        'Establish a strong digital presence that builds trust with customers',
    });
  }

  // If no specific matches, provide general recommendation
  if (recommendations.length === 0) {
    if (budgetRange && budgetRange.max <= 5000) {
      recommendations.push({
        category: 'Business Website',
        solution: 'Digital Presence Package',
        description:
          'Start with a professional website to establish your online presence',
      });
    } else if (budgetRange && budgetRange.max <= 15000) {
      recommendations.push({
        category: 'Operational Systems',
        solution: 'Operational Efficiency Package',
        description:
          'Streamline your operations with custom dashboards and automation',
      });
    } else {
      recommendations.push({
        category: 'Growth Infrastructure',
        solution: 'Complete Systems Overhaul',
        description:
          'Comprehensive solution to transform your business operations',
      });
    }
  }

  return recommendations.slice(0, 3); // Return top 3
}