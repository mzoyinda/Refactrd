import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Startups Launchpad | Refactrd",
  description:
    "A selective cohort program for early-stage startups. We audit your workflow, build a custom AI solution, and deploy it in your live operations. You test it for three weeks and decide whether to continue. Cohort 1 is live. Cohort 2 applications are open now.",
  keywords: [
    "ai startups launchpad",
    "ai for startups",
    "startup automation",
    "cohort program",
    "ai waitlist",
    "startup bottleneck solution",
    "ai deployment",
    "startup operations automation",
  ],
  openGraph: {
    title: "AI Startups Launchpad | Refactrd",
    description:
      "A selective cohort program for early-stage startups. We audit your workflow, build a custom AI solution, and deploy it in your live operations. You test it for three weeks and decide whether to continue.",
    type: "website",
  },
};

export default function LaunchpadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
