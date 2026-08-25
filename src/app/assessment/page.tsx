import type { Metadata } from "next";
import AssessmentFlow from "@/components/sections/assessment/AssessmentFlow";

export const metadata: Metadata = {
  title: "AI Opportunity Assessment | Refactrd",
  description:
    "Take a few minutes to look at one real workflow in your business. We'll help you identify where the friction is, what could change, and where AI can create meaningful leverage.",
};

export default function AssessmentPage() {
  // No Header/Footer — this is a focused, single-task flow, like /ai-usecase.
  return (
    <main className="min-h-screen">
      <AssessmentFlow />
    </main>
  );
}
