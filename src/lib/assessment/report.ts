import { frequencyCaveat, resolveMulti, resolveSingle, type Outcome } from "./grading";
import { OUTCOMES } from "./reportTemplates";
import { recommendServices, type ServiceRecommendation } from "./services";

/** The finished report, shared by the API response, the PDF, and the email. */
export interface AssessmentReport {
  id: string;
  name: string;
  /** Shown on screen so we can say where the copy was sent. */
  email: string;
  outcome: Outcome;
  outcomeLabel: string;
  outcomeSummary: string;
  /** Step 02 answer, or the custom description. */
  workflow: string;
  /** Step 01 answers, resolved. */
  goals: string[];
  /** Claude-generated or fallback. */
  whatWeHeard: string;
  opportunity: string;
  /** The concrete "what could be" picture. */
  futureState: string;
  today: string;
  future: string;
  /** Services that fit this outcome, explained against their workflow. */
  services: ServiceRecommendation[];
  firstStep: string;
  /** Soft caveat when the workflow runs only occasionally. */
  caveat: string | null;
  generatedAt: string;
}

export interface BuildReportInput {
  id: string;
  name: string;
  email: string;
  outcome: Outcome;
  workflow: string;
  goals: string[];
  frequency: string;
  whatWeHeard: string;
  opportunity: string;
  futureState: string;
}

export function buildReport(input: BuildReportInput): AssessmentReport {
  const template = OUTCOMES[input.outcome];

  return {
    id: input.id,
    name: input.name,
    email: input.email,
    outcome: input.outcome,
    outcomeLabel: template.label,
    outcomeSummary: template.summary,
    workflow: input.workflow,
    goals: input.goals,
    whatWeHeard: input.whatWeHeard,
    opportunity: input.opportunity,
    futureState: input.futureState,
    today: template.today,
    future: template.future,
    services: recommendServices(input.outcome, input.workflow),
    firstStep: template.firstStep,
    caveat: frequencyCaveat(input.frequency),
    generatedAt: new Date().toISOString(),
  };
}

/** Shape of the columns the PDF, email, and meeting routes read back. */
export interface AssessmentRow {
  id: string;
  name: string;
  email: string;
  created_at: string | null;
  step1_goal: string[] | null;
  step1_other: string | null;
  step2_workflow: string;
  step2_other: string | null;
  step3_friction: string[] | null;
  step4_frequency: string;
  step4_other: string | null;
  outcome: string;
  report_what_we_heard: string | null;
  report_opportunity: string | null;
  report_future_state: string | null;
}

export const ASSESSMENT_ROW_COLUMNS =
  "id, name, email, created_at, step1_goal, step1_other, step2_workflow, step2_other, step3_friction, step4_frequency, step4_other, outcome, report_what_we_heard, report_opportunity, report_future_state";

/**
 * Rebuilds a report from a stored row so the PDF and the email render exactly
 * what the user saw on screen, without re-running grading or generation.
 */
export function reportFromRow(row: AssessmentRow): AssessmentReport {
  const outcome = (row.outcome in OUTCOMES ? row.outcome : "EXPLORE") as Outcome;
  const template = OUTCOMES[outcome];
  const workflow = resolveSingle(row.step2_workflow, row.step2_other || "");

  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    outcome,
    outcomeLabel: template.label,
    outcomeSummary: template.summary,
    workflow,
    goals: resolveMulti(row.step1_goal || [], row.step1_other || ""),
    whatWeHeard: row.report_what_we_heard || template.fallbackWhatWeHeard,
    opportunity: row.report_opportunity || template.fallbackOpportunity,
    futureState: row.report_future_state || template.fallbackFutureState,
    today: template.today,
    future: template.future,
    services: recommendServices(outcome, workflow),
    firstStep: template.firstStep,
    caveat: frequencyCaveat(resolveSingle(row.step4_frequency, row.step4_other || "")),
    generatedAt: row.created_at || new Date().toISOString(),
  };
}
