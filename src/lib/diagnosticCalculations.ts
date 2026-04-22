import { CalculationResult, DiagnosticAnswers, ScoreBand, SubZoneScore, SubZoneScores, ZonePercentages, ZoneScores } from "@/app/types/diagonistic";


/**
 * Calculate all scores from diagnostic answers
 */
export function calculateScores(answers: DiagnosticAnswers): CalculationResult {
  // Calculate zone raw scores
  const zoneScores: ZoneScores = {
    zone1: (answers.Q1 || 0) + (answers.Q2 || 0) + (answers.Q3 || 0) + (answers.Q4 || 0),
    zone2: (answers.Q5 || 0) + (answers.Q6 || 0) + (answers.Q7 || 0),
    zone3: (answers.Q8 || 0) + (answers.Q9 || 0) + (answers.Q10 || 0) + (answers.Q11 || 0),
    zone4:
      (answers.Q12 || 0) +
      (answers.Q13 || 0) +
      (answers.Q14 || 0) +
      (answers.Q15 || 0) +
      (answers.Q16 || 0),
  };

  // Calculate zone percentages (score / max * 100)
  const zonePercentages: ZonePercentages = {
    zone1: Math.round((zoneScores.zone1 / 16) * 100),
    zone2: Math.round((zoneScores.zone2 / 12) * 100),
    zone3: Math.round((zoneScores.zone3 / 16) * 100),
    zone4: Math.round((zoneScores.zone4 / 20) * 100),
  };

  // Calculate sub-zone scores
  const subZoneScores: SubZoneScores = {
    '1A': createSubZoneScore(answers.Q1 || 0, 4),
    '1B': createSubZoneScore(answers.Q2 || 0, 4),
    '1C': createSubZoneScore((answers.Q3 || 0) + (answers.Q4 || 0), 8),
    '2A': createSubZoneScore(answers.Q5 || 0, 4),
    '2B': createSubZoneScore(answers.Q6 || 0, 4),
    '2C': createSubZoneScore(answers.Q7 || 0, 4),
    '3A': createSubZoneScore(answers.Q8 || 0, 4),
    '3B': createSubZoneScore(answers.Q9 || 0, 4),
    '3C': createSubZoneScore((answers.Q10 || 0) + (answers.Q11 || 0), 8),
    '4A': createSubZoneScore(answers.Q12 || 0, 4),
    '4B': createSubZoneScore((answers.Q13 || 0) + (answers.Q14 || 0), 8),
    '4C': createSubZoneScore((answers.Q15 || 0) + (answers.Q16 || 0), 8),
  };

  // Calculate overall scores
  const rawTotal = Object.values(zoneScores).reduce((sum, score) => sum + score, 0);
  const normalisedScore = Math.round((rawTotal / 64) * 100);
  const scoreBand = getScoreBand(normalisedScore);

  // Find weakest zone (by percentage, not raw score)
  const weakestZone = getWeakestZone(zonePercentages);

  // Find weakest sub-zone (by percentage)
  const weakestSubZone = getWeakestSubZone(subZoneScores);

  return {
    zoneScores,
    zonePercentages,
    subZoneScores,
    rawTotal,
    normalisedScore,
    scoreBand,
    weakestZone,
    weakestSubZone,
  };
}

/**
 * Create sub-zone score object with percentage
 */
function createSubZoneScore(score: number, max: number): SubZoneScore {
  return {
    score,
    max,
    percentage: Math.round((score / max) * 100),
  };
}

/**
 * Determine score band based on normalised score
 */
export function getScoreBand(normalisedScore: number): ScoreBand {
  if (normalisedScore >= 80) return 'AI-Ready';
  if (normalisedScore >= 60) return 'Relevance Zone';
  if (normalisedScore >= 40) return 'At Risk';
  return 'Urgent';
}

/**
 * Find weakest zone by percentage
 */
function getWeakestZone(percentages: ZonePercentages): string {
  const zones = [
    { name: 'Tool Stack and Integration', percentage: percentages.zone1 },
    { name: 'Internal Operations', percentage: percentages.zone2 },
    { name: 'Delivery and Project Execution', percentage: percentages.zone3 },
    { name: 'People and Talent', percentage: percentages.zone4 },
  ];

  zones.sort((a, b) => a.percentage - b.percentage);
  return zones[0].name;
}

/**
 * Find weakest sub-zone by percentage
 */
function getWeakestSubZone(subZoneScores: SubZoneScores): string {
  const subZoneNames: Record<string, string> = {
    '1A': 'Tools You Are Currently Using',
    '1B': 'How Your Tools Connect',
    '1C': 'Repetitive Manual Work',
    '2A': 'Team Coordination and Alignment',
    '2B': 'Knowledge and Documentation',
    '2C': 'Reporting and Visibility',
    '3A': 'How Work Gets Tracked',
    '3B': 'Client and Stakeholder Updates',
    '3C': 'Proposals and Scopes of Work',
    '4A': 'Bringing People In',
    '4B': 'Getting New People Up to Speed',
    '4C': 'Performance and Feedback',
  };

  const subZones = Object.entries(subZoneScores).map(([id, score]) => ({
    id,
    name: subZoneNames[id],
    percentage: score.percentage,
  }));

  subZones.sort((a, b) => a.percentage - b.percentage);
  return subZones[0].name;
}

/**
 * Get progress percentage (0-100)
 */
export function getProgressPercentage(answeredCount: number, totalQuestions: number): number {
  return Math.round((answeredCount / totalQuestions) * 100);
}

/**
 * Get color class based on percentage score
 */
export function getScoreColor(percentage: number): string {
  if (percentage >= 75) return 'text-green-600 bg-green-50 border-green-200';
  if (percentage >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-red-600 bg-red-50 border-red-200';
}

/**
 * Get bar color based on percentage score
 */
export function getBarColor(percentage: number): string {
  if (percentage >= 75) return 'bg-green-500';
  if (percentage >= 50) return 'bg-amber-500';
  return 'bg-red-500';
}