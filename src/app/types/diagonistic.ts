// Registration form data
export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  industry: string;
}

// Answer option for each question
export interface AnswerOption {
  text: string;
  points: 0 | 2 | 4; // 0 = not done, 2 = manual, 4 = automated
}

// Individual question
export interface Question {
  id: string; // e.g., "Q1", "Q2"
  text: string;
  options: [AnswerOption, AnswerOption, AnswerOption]; // Always 3 options
}

// Sub-zone (contains 1 or 2 questions)
export interface SubZone {
  id: string; // e.g., "1A", "1B"
  name: string;
  questions: Question[];
  maxScore: number; // 4 or 8 depending on question count
}

// Primary zone (contains 2-3 sub-zones)
export interface Zone {
  id: string; // "1", "2", "3", "4"
  name: string;
  subZones: SubZone[];
  maxScore: number; // Sum of sub-zone max scores
}

// User's answers (stored in state during diagnostic)
export interface DiagnosticAnswers {
  [questionId: string]: number; // e.g., { "Q1": 4, "Q2": 2, "Q3": 0 }
}

// Context enrichment data (after Q16)
export interface ContextData {
  teamSize: 'Just me' | '2 to 5' | '6 to 15' | '16 to 30' | '30 plus';
  openChallenge?: string; // Optional 300 char text
}

// Sub-zone score with metadata
export interface SubZoneScore {
  score: number;
  max: number;
  percentage: number;
}

// Calculated zone scores
export interface ZoneScores {
  zone1: number;
  zone2: number;
  zone3: number;
  zone4: number;
}

// Calculated zone percentages
export interface ZonePercentages {
  zone1: number;
  zone2: number;
  zone3: number;
  zone4: number;
}

// Sub-zone scores object (12 sub-zones)
export interface SubZoneScores {
  '1A': SubZoneScore;
  '1B': SubZoneScore;
  '1C': SubZoneScore;
  '2A': SubZoneScore;
  '2B': SubZoneScore;
  '2C': SubZoneScore;
  '3A': SubZoneScore;
  '3B': SubZoneScore;
  '3C': SubZoneScore;
  '4A': SubZoneScore;
  '4B': SubZoneScore;
  '4C': SubZoneScore;
}

// Score band categories
export type ScoreBand = 'AI-Ready' | 'Relevance Zone' | 'At Risk' | 'Urgent';

// Complete calculation result
export interface CalculationResult {
  // Raw scores
  zoneScores: ZoneScores;
  zonePercentages: ZonePercentages;
  subZoneScores: SubZoneScores;
  rawTotal: number;
  normalisedScore: number;
  scoreBand: ScoreBand;
  
  // Analysis
  weakestZone: string;
  weakestSubZone: string;
}

// Complete diagnostic submission (for Supabase)
export interface DiagnosticSubmission {
  // From registration
  name: string;
  email: string;
  company_name: string;
  industry: string;
  
  // From context enrichment
  team_size?: string;
  open_challenge?: string;
  
  // Zone scores
  zone_1_score: number;
  zone_2_score: number;
  zone_3_score: number;
  zone_4_score: number;
  
  // Zone percentages
  zone_1_percentage: number;
  zone_2_percentage: number;
  zone_3_percentage: number;
  zone_4_percentage: number;
  
  // Sub-zone scores
  subzone_scores: SubZoneScores;
  
  // Overall scores
  raw_total: number;
  normalised_score: number;
  score_band: ScoreBand;
  
  // Analysis
  weakest_zone: string;
  weakest_subzone: string;
  ai_recommendation?: string;
}

// Supabase record (includes ID and timestamp)
export interface DiagnosticRecord extends DiagnosticSubmission {
  id: string;
  created_at: string;
}

// Industry options for dropdown
export const INDUSTRIES = [
  'Healthcare',
  'Media / Marketing / Creative',
  'Logistics / Supply Chain',
  'SaaS / Technology',
  'Non-profit / Social Impact',
  'Professional Services',
  'Retail / eCommerce',
  'Financial Services',
  'Education / EdTech',
  'Other',
] as const;

export type Industry = typeof INDUSTRIES[number];

// Team size options
export const TEAM_SIZES = [
  'Just me',
  '2 to 5',
  '6 to 15',
  '16 to 30',
  '30 plus',
] as const;

export type TeamSize = typeof TEAM_SIZES[number];

// Score band descriptions
export const SCORE_BAND_DESCRIPTIONS: Record<ScoreBand, string> = {
  'AI-Ready': 'You are ahead of the curve. The work now is optimisation and depth, not adoption.',
  'Relevance Zone': 'You are competitive, but clear gaps exist that someone in your market is likely already closing.',
  'At Risk': 'Competitors actively adopting AI today will operationally outpace you within 12 months.',
  'Urgent': 'Your current operations are actively costing you growth right now, not eventually.',
};