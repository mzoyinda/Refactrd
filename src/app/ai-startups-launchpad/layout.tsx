import { Metadata } from "next";

export const metadata: Metadata = {
  title: " AI Startups Launchpad | Refactrd - Get Your First AI Employee Free for 3 Weeks",
  description:
    "Free 3-week AI deployment for startups. We find the manual work slowing you down, build a custom AI solution, and let you test it live. Subscribe at $100/month only if it delivers results. Cohort 1 launching June 2026.",
  keywords: [
    "ai startups launchpad",
    "free ai trial",
    "ai for startups",
    "startup automation",
    "ai employee for startups",
    "startup bottleneck solution",
    "free ai deployment",
    "startup operations automation",
    "ai trial program",
    "startup ai assistant",
    "cohort program",
    "ai waitlist",
  ],
  openGraph: {
    title: " AI Startups Launchpad | Get Your First AI Employee Free",
    description:
      "Free 3-week AI deployment for startups. We build a custom solution for your biggest bottleneck and let you test it live. Subscribe only if it works.",
    type: "website",
  },
};

export default function ImplementationProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}