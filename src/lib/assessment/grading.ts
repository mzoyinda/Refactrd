import { FRICTION, OCCASIONALLY, OTHER_VALUE } from "./questions";

export type Outcome =
  | "REDESIGN"
  | "MONITOR"
  | "AUTOMATE_AI_ASSIST"
  | "AUTOMATE"
  | "AI_ASSIST"
  | "EXPLORE";

/**
 * Grades the assessment from the Step 03 friction answers.
 *
 * Rules are evaluated in priority order — first match wins:
 *  1. Handoffs selected at all      → REDESIGN (a broken process shape
 *     undermines anything built on top of it)
 *  2. Late discovery, no handoffs   → MONITOR (the issue is visibility)
 *  3. Repetitive + hard-to-find     → AUTOMATE_AI_ASSIST
 *  4. Repetitive only               → AUTOMATE
 *  5. Hard-to-find only             → AI_ASSIST
 *  6. Anything else                 → EXPLORE
 */
export function gradeAssessment(friction: string[]): Outcome {
  const has = (value: string) => friction.includes(value);

  if (has(FRICTION.HANDOFFS)) return "REDESIGN";
  if (has(FRICTION.LATE_DISCOVERY)) return "MONITOR";

  const repetitive = has(FRICTION.REPETITIVE);
  const hardToFind = has(FRICTION.HARD_TO_FIND);

  if (repetitive && hardToFind) return "AUTOMATE_AI_ASSIST";
  if (repetitive) return "AUTOMATE";
  if (hardToFind) return "AI_ASSIST";

  // "A bit of everything", "Something else" alone, or nothing recognised.
  return "EXPLORE";
}

/**
 * "Occasionally" doesn't change the outcome — it softens how confidently the
 * recommendation should be read.
 */
export function frequencyCaveat(frequency: string): string | null {
  if (frequency !== OCCASIONALLY) return null;
  return "Because this workflow runs only occasionally, treat the recommendation below as a direction rather than an immediate priority. The lower the volume, the more the payoff depends on how costly each individual run is.";
}

/** Resolves a stored answer to the custom text when "Something else" was picked. */
export function resolveSingle(value: string, other: string): string {
  return value === OTHER_VALUE ? other.trim() || value : value;
}

/** Same as `resolveSingle`, for multi-select answers. */
export function resolveMulti(values: string[], other: string): string[] {
  const custom = other.trim();
  return values.flatMap((value) => {
    if (value !== OTHER_VALUE) return [value];
    return custom ? [custom] : [];
  });
}
