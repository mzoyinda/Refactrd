import Anthropic from "@anthropic-ai/sdk";
import type { Outcome } from "./grading";
import { OUTCOMES } from "./reportTemplates";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/** The brief allows 8s; retries would multiply that, so they're disabled. */
const TIMEOUT_MS = 8000;

/**
 * ~250 tokens covers two 3-sentence sections, but truncating a customer-facing
 * report mid-sentence is worse than the cost of a little headroom.
 */
const MAX_TOKENS = 500;

const SYSTEM_PROMPT =
  "You are a direct, practical AI operations advisor. You've just reviewed a founder's answers about one workflow in their business. Write two short sections: a synthesis of what they told you, and a plain-language explanation of where the opportunity is. No fluff, no generic statements, no bullet points, no em dashes. Reference their specific answers directly.";

export interface GenerateInput {
  goals: string[];
  workflow: string;
  friction: string[];
  frequency: string;
  humanRole: string[];
  existingAiUse: string;
  timeline: string;
  outcome: Outcome;
}

export interface GeneratedSections {
  whatWeHeard: string;
  opportunity: string;
  /** Which path produced the text — stored as `report_method`. */
  method: "claude" | "fallback";
}

function buildUserMessage(input: GenerateInput): string {
  return [
    `Business goals: ${input.goals.join(", ")}.`,
    `Workflow: ${input.workflow}.`,
    `Friction: ${input.friction.join(", ")}.`,
    `Frequency: ${input.frequency}.`,
    `What should stay human: ${input.humanRole.join(", ")}.`,
    `Current AI use: ${input.existingAiUse}.`,
    `Timeline: ${input.timeline}.`,
    `Graded outcome: ${input.outcome}.`,
    "",
    "Write 'What we heard' (2-3 sentences, using their own specifics) and 'Where the opportunity is' (2-3 sentences, connected to their stated goal). Label each section clearly.",
  ].join(" ");
}

/**
 * Splits the labelled response into its two sections. Returns null if either
 * section is missing so the caller can fall back rather than ship a half report.
 */
function parseSections(text: string): { whatWeHeard: string; opportunity: string } | null {
  const normalised = text.replace(/\*\*/g, "").replace(/^#+\s*/gm, "");

  const heardMatch = normalised.match(
    /what we heard\s*:?\s*([\s\S]*?)(?=where the opportunity is\s*:?|$)/i
  );
  const opportunityMatch = normalised.match(/where the opportunity is\s*:?\s*([\s\S]*)/i);

  const whatWeHeard = heardMatch?.[1]?.trim() ?? "";
  const opportunity = opportunityMatch?.[1]?.trim() ?? "";

  if (!whatWeHeard || !opportunity) return null;
  return { whatWeHeard, opportunity };
}

function fallbackFor(outcome: Outcome): GeneratedSections {
  const template = OUTCOMES[outcome];
  return {
    whatWeHeard: template.fallbackWhatWeHeard,
    opportunity: template.fallbackOpportunity,
    method: "fallback",
  };
}

/**
 * Generates the two synthesis sections. Never throws — any failure, timeout, or
 * unparseable response degrades to the outcome-keyed static copy.
 */
export async function generateReportSections(
  input: GenerateInput
): Promise<GeneratedSections> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Assessment: ANTHROPIC_API_KEY is not set, using fallback copy");
    return fallbackFor(input.outcome);
  }

  try {
    const response = await anthropic.messages.create(
      {
        model: "claude-sonnet-5",
        max_tokens: MAX_TOKENS,
        // Thinking tokens count against max_tokens and would eat the 8s budget.
        thinking: { type: "disabled" },
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserMessage(input) }],
      },
      { timeout: TIMEOUT_MS, maxRetries: 0 }
    );

    if (response.stop_reason === "refusal") {
      console.error("Assessment: generation refused", response.stop_details);
      return fallbackFor(input.outcome);
    }

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    const parsed = parseSections(text);
    if (!parsed) {
      console.error("Assessment: could not parse generated sections, using fallback");
      return fallbackFor(input.outcome);
    }

    return { ...parsed, method: "claude" };
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error(`Assessment: Claude API error ${error.status}:`, error.message);
    } else {
      console.error("Assessment: generation failed:", error);
    }
    return fallbackFor(input.outcome);
  }
}
