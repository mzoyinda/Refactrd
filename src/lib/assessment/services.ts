import type { Outcome } from "./grading";

export type ServiceKey = "workflow" | "knowledge" | "operations";

/** Catalog entry. `why` is a template, so this shape stays server-side only. */
export interface ServiceDefinition {
  key: ServiceKey;
  /** How it's introduced in the report: "A workflow transformation". */
  name: string;
  /** The service as it's named on the site. */
  formalName: string;
  href: string;
  /** What the service actually is, in one line. */
  what: string;
  /** Why it fits *this* workflow — the reader's own words are passed in. */
  why: (workflow: string) => string;
}

/**
 * What actually goes on the report.
 *
 * Every field is a plain value: the report is serialized to JSON on its way to
 * the browser, and `JSON.stringify` drops functions silently, so a method here
 * would arrive as `undefined` and crash on first call.
 */
export interface ServiceRecommendation {
  key: ServiceKey;
  name: string;
  formalName: string;
  href: string;
  what: string;
  /** Already resolved against the reader's workflow. */
  why: string;
}

export const SERVICES: Record<ServiceKey, ServiceDefinition> = {
  workflow: {
    key: "workflow",
    name: "A workflow transformation",
    formalName: "Workflow Transformation",
    href: "https://refactrd.com/services/workflow-transformation",
    what: "Rebuilding how the work moves so the routine path runs on its own, and a person only handles the exception.",
    why: (workflow) =>
      `For ${workflow}, this is where the time actually comes back. We map the steps as they happen today, then let the predictable ones run without anyone driving them. Your team stops repeating the same setup and starts each piece of work further along.`,
  },
  knowledge: {
    key: "knowledge",
    name: "A knowledge assistant",
    formalName: "Knowledge Systems & AI Assistants",
    href: "https://refactrd.com/services/knowledge-systems-ai-assistants",
    what: "Putting what your business already knows in front of whoever needs it, at the moment they need it.",
    why: (workflow) =>
      `The context ${workflow} depends on already exists in your business, it's just spread across documents, tools, and people's heads. An assistant that knows your material means the answer arrives with the task instead of being hunted down first.`,
  },
  operations: {
    key: "operations",
    name: "An intelligent operation",
    formalName: "Intelligent Operations",
    href: "https://refactrd.com/services/intelligent-operations",
    what: "Watching the work as it runs, so problems surface while there's still time to act on them.",
    why: (workflow) =>
      `Instead of finding out that ${workflow} went wrong after someone complains, the system watches for the early signals and raises them first. The same team handles the same volume, but stops absorbing the cost of late discovery.`,
  },
};

/**
 * Which services fit a graded outcome. Order matters — the first is the one we
 * lead with in the report.
 */
const BY_OUTCOME: Record<Outcome, ServiceKey[]> = {
  AUTOMATE: ["workflow"],
  AI_ASSIST: ["knowledge"],
  AUTOMATE_AI_ASSIST: ["workflow", "knowledge"],
  // A shape problem is a workflow problem first; monitoring keeps it honest after.
  REDESIGN: ["workflow", "operations"],
  MONITOR: ["operations"],
  // Nothing stood out, so show the full range and let the conversation narrow it.
  EXPLORE: ["workflow", "knowledge", "operations"],
};

/**
 * Services for an outcome, with `why` resolved against the reader's workflow so
 * the result is safe to serialize.
 */
export function recommendServices(
  outcome: Outcome,
  workflow: string
): ServiceRecommendation[] {
  return BY_OUTCOME[outcome].map((key) => {
    const { why, ...rest } = SERVICES[key];
    return { ...rest, why: why(workflow) };
  });
}

export function serviceKeys(outcome: Outcome): ServiceKey[] {
  return BY_OUTCOME[outcome];
}
