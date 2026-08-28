import Anthropic from "@anthropic-ai/sdk";
import type { Outcome } from "./grading";
import { OUTCOMES } from "./reportTemplates";
import { recommendServices } from "./services";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/** Three sections now, so a little more room than the original 8s. */
const TIMEOUT_MS = 14000;

/** Three sections of 2-4 sentences, with headroom against mid-sentence truncation. */
const MAX_TOKENS = 900;

const SYSTEM_PROMPT =
  "You are a direct, practical AI operations advisor. You've just reviewed a founder's answers about one workflow in their business. Write three short sections: a synthesis of what they told you, a plain-language explanation of where the opportunity is, and a concrete picture of what their workflow would actually look like once it's fixed. No fluff, no generic statements, no bullet points, no em dashes. Reference their specific answers directly. The third section is the most important: make it vivid and specific to their workflow, describing the changed day-to-day rather than listing benefits. Never restate their answers back to them as a list.";

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
  /** The concrete "what could be" picture. */
  futureState: string;
  /** Which path produced the text — stored as `report_method`. */
  method: "claude" | "fallback";
}

function buildUserMessage(input: GenerateInput): string {
  const services = recommendServices(input.outcome)
    .map((service) => `${service.formalName} (${service.what})`)
    .join("; ");

  return [
    `Business goals: ${input.goals.join(", ")}.`,
    `Workflow: ${input.workflow}.`,
    `Friction: ${input.friction.join(", ")}.`,
    `Frequency: ${input.frequency}.`,
    `Current AI use: ${input.existingAiUse}.`,
    `Timeline: ${input.timeline}.`,
    `Graded outcome: ${input.outcome}.`,
    `Services we would recommend: ${services}.`,
    "",
    "Write three labelled sections.",
    "'What we heard' (2-3 sentences, using their own specifics).",
    "'Where the opportunity is' (2-3 sentences, connected to their stated goal).",
    "'What this could look like' (3-4 sentences describing their workflow after the change, concretely, in terms of what a person on their team would actually experience day to day. Ground it in the recommended services without naming them like products.)",
    "Label each section clearly.",
  ].join(" ");
}

/** Grabs one labelled section's body, stopping at the next known heading. */
function extractSection(text: string, heading: RegExp, nextHeadings: RegExp[]): string {
  const stop = nextHeadings.length
    ? `(?=${nextHeadings.map((r) => r.source).join("|")}|$)`
    : "$";
  const match = text.match(new RegExp(`${heading.source}\\s*:?\\s*([\\s\\S]*?)${stop}`, "i"));
  return match?.[1]?.trim() ?? "";
}

const HEARD = /what we heard/i;
const OPPORTUNITY = /where the opportunity is/i;
const FUTURE = /what this could look like/i;

/**
 * Splits the labelled response into its three sections. Returns null if any is
 * missing so the caller can fall back rather than ship a half report.
 */
function parseSections(
  text: string
): { whatWeHeard: string; opportunity: string; futureState: string } | null {
  const normalised = text.replace(/\*\*/g, "").replace(/^#+\s*/gm, "");

  const whatWeHeard = extractSection(normalised, HEARD, [OPPORTUNITY, FUTURE]);
  const opportunity = extractSection(normalised, OPPORTUNITY, [FUTURE]);
  const futureState = extractSection(normalised, FUTURE, []);

  if (!whatWeHeard || !opportunity || !futureState) return null;
  return { whatWeHeard, opportunity, futureState };
}

function fallbackFor(outcome: Outcome): GeneratedSections {
  const template = OUTCOMES[outcome];
  return {
    whatWeHeard: template.fallbackWhatWeHeard,
    opportunity: template.fallbackOpportunity,
    futureState: template.fallbackFutureState,
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
