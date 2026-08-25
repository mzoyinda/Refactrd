import { INDUSTRIES } from "@/app/types/diagonistic";

export const ASSESSMENT_INDUSTRIES = INDUSTRIES;

export const TEAM_SIZES = ["Just me", "2-5", "6-15", "16-30", "30+"] as const;

export const OTHER_VALUE = "Something else";

export type Phase =
  | "Understand the Business"
  | "Find the Friction"
  | "Define the Transformation";

export const PHASES: Phase[] = [
  "Understand the Business",
  "Find the Friction",
  "Define the Transformation",
];

/** Keys match the assessment answer object and the DB column suffixes. */
export type QuestionKey =
  | "goal"
  | "workflow"
  | "friction"
  | "frequency"
  | "humanRole"
  | "existingAiUse"
  | "timeline";

export interface QuestionOption {
  /** Stored value — also the visible headline on the card. */
  value: string;
  /** Supporting line shown under the headline. */
  description?: string;
}

export interface Question {
  key: QuestionKey;
  /** Display number, e.g. "01". */
  number: string;
  phase: Phase;
  /** Short name of the question, shown above the prompt. */
  title: string;
  prompt: string;
  /** Optional clarifying line under the prompt. */
  helper?: string;
  multi: boolean;
  options: QuestionOption[];
  /** Label for the free-text field revealed by "Something else". */
  otherPrompt: string;
}

export const QUESTIONS: Question[] = [
  {
    key: "goal",
    number: "01",
    phase: "Understand the Business",
    title: "Business goal",
    prompt: "What are you trying to improve?",
    helper: "Select all that apply.",
    multi: true,
    otherPrompt: "Tell us what you're trying to achieve.",
    options: [
      {
        value: "Win more business",
        description: "Move prospects from interest to signed deals faster",
      },
      {
        value: "Serve customers better",
        description: "Respond faster and deliver a better experience",
      },
      {
        value: "Free up experienced people",
        description: "Reduce time senior staff spend on routine work",
      },
      {
        value: "Reduce errors",
        description: "Make work more consistent and less dependent on manual steps",
      },
      {
        value: "Operate more efficiently",
        description: "Get more done without simply adding more people",
      },
      { value: OTHER_VALUE },
    ],
  },
  {
    key: "workflow",
    number: "02",
    phase: "Understand the Business",
    title: "Workflow",
    prompt: "Which workflow are you looking at?",
    helper: "Pick the one costing you the most time, capacity, or value right now.",
    multi: false,
    otherPrompt: "What workflow are you looking at?",
    options: [
      {
        value: "Proposals & Quoting",
        description: "Creating pricing, proposals, or offers for prospects",
      },
      {
        value: "Customer Onboarding",
        description: "Getting new customers set up and ready",
      },
      {
        value: "Sales Follow-up",
        description: "Managing follow-ups, next steps, and opportunities",
      },
      {
        value: "Customer Support",
        description: "Responding to customer questions, issues, or complaints",
      },
      {
        value: "Knowledge & Documentation",
        description: "Finding, creating, and sharing what the business already knows",
      },
      {
        value: "Operations & Fulfillment",
        description: "Processing requests and delivering products or services",
      },
      {
        value: "Reporting & Analysis",
        description: "Pulling together information for decisions or reporting",
      },
      { value: OTHER_VALUE },
    ],
  },
  {
    key: "friction",
    number: "03",
    phase: "Find the Friction",
    title: "Friction",
    prompt: "What makes this workflow harder than it should be?",
    helper: "Select all that apply.",
    multi: true,
    otherPrompt: "What makes this workflow difficult?",
    options: [
      {
        value: "Too much repetitive work",
        description: "People keep doing the same steps again and again",
      },
      {
        value: "Information is hard to find",
        description: "People spend time searching for the context they need",
      },
      {
        value: "Too many handoffs",
        description: "Work moves between people, systems, or approvals before it gets done",
      },
      {
        value: "Problems are discovered too late",
        description: "The team usually finds out something went wrong after the fact",
      },
      {
        value: "A bit of everything",
        description: "There isn't one obvious source of friction",
      },
      { value: OTHER_VALUE },
    ],
  },
  {
    key: "frequency",
    number: "04",
    phase: "Find the Friction",
    title: "Frequency",
    prompt: "How often does this workflow happen?",
    multi: false,
    otherPrompt: "Tell us how often it happens.",
    options: [
      { value: "Every day" },
      { value: "Several times a week" },
      { value: "Occasionally" },
      { value: OTHER_VALUE },
    ],
  },
  {
    key: "humanRole",
    number: "05",
    phase: "Define the Transformation",
    title: "Human role",
    prompt: "What should always remain human?",
    helper: "Select all that apply.",
    multi: true,
    otherPrompt: "What would you never want AI or automation to decide on its own?",
    options: [
      { value: "Final decisions" },
      { value: "Customer relationships" },
      { value: "Unusual or sensitive situations" },
      { value: "Final approval" },
      { value: "Strategic decisions" },
      { value: OTHER_VALUE },
    ],
  },
  {
    key: "existingAiUse",
    number: "06",
    phase: "Define the Transformation",
    title: "Current AI use",
    prompt: "Where are you today with AI?",
    multi: false,
    otherPrompt: "Tell us how you're currently using AI.",
    options: [
      { value: "We haven't started" },
      { value: "We're using a few AI tools" },
      { value: "People are using AI, but informally" },
      { value: "AI is already part of our workflows" },
      { value: OTHER_VALUE },
    ],
  },
  {
    key: "timeline",
    number: "07",
    phase: "Define the Transformation",
    title: "Timing",
    prompt: "How soon would you want to act on this?",
    multi: false,
    otherPrompt: "Tell us about your timeline.",
    options: [
      { value: "As soon as possible" },
      { value: "Within the next month" },
      { value: "Within the next quarter" },
      { value: "I'm exploring for now" },
      { value: OTHER_VALUE },
    ],
  },
];

/* ── Friction values referenced by the grader ─────────────────────────── */

export const FRICTION = {
  REPETITIVE: "Too much repetitive work",
  HARD_TO_FIND: "Information is hard to find",
  HANDOFFS: "Too many handoffs",
  LATE_DISCOVERY: "Problems are discovered too late",
  EVERYTHING: "A bit of everything",
} as const;

export const OCCASIONALLY = "Occasionally";

/* ── Answer shape shared by the client and the API ────────────────────── */

export interface Registration {
  name: string;
  email: string;
  industry: string;
  companySize: string;
}

export interface AssessmentAnswers {
  goal: string[];
  goalOther: string;
  workflow: string;
  workflowOther: string;
  friction: string[];
  frictionOther: string;
  frequency: string;
  frequencyOther: string;
  humanRole: string[];
  humanRoleOther: string;
  existingAiUse: string;
  existingAiUseOther: string;
  timeline: string;
  timelineOther: string;
}

export type AssessmentPayload = Registration & AssessmentAnswers;

export const EMPTY_ANSWERS: AssessmentAnswers = {
  goal: [],
  goalOther: "",
  workflow: "",
  workflowOther: "",
  friction: [],
  frictionOther: "",
  frequency: "",
  frequencyOther: "",
  humanRole: [],
  humanRoleOther: "",
  existingAiUse: "",
  existingAiUseOther: "",
  timeline: "",
  timelineOther: "",
};

/**
 * True when a question has enough input to advance — at least one option, and
 * custom text whenever "Something else" is the only thing selected.
 */
export function isQuestionAnswered(
  question: Question,
  answers: AssessmentAnswers
): boolean {
  const otherText = String(answers[`${question.key}Other` as keyof AssessmentAnswers] || "").trim();

  if (question.multi) {
    const selected = answers[question.key] as string[];
    if (selected.length === 0) return false;
    if (selected.includes(OTHER_VALUE) && selected.length === 1 && !otherText) return false;
    return true;
  }

  const selected = answers[question.key] as string;
  if (!selected) return false;
  if (selected === OTHER_VALUE && !otherText) return false;
  return true;
}
