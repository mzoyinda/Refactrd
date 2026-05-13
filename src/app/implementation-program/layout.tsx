import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementation Program - 2 Week Build | Refactrd - Deploy Your First AI Role in 14 Days",
  description:
    "Your team is too good to spend half their week on work a machine could handle. We identify the function that's burying them, build an AI role to own it, and hand it over in 14 days. No retainer. No lock-in. Yours to keep.",
  keywords: [
    "ai implementation program",
    "2 week ai build",
    "deploy ai role",
    "ai workforce",
    "ai agent deployment",
    "enterprise ai implementation",
    "ai operations assistant",
    "ai sales rep",
    "ai support agent",
    "production ai",
    "rapid ai deployment",
  ],
  openGraph: {
    title: "The Refactrd 2-Week Build | Implementation Program",
    description:
      "Deploy a working AI role in 14 days. Not a prototype. Not a pilot. A fully deployed AI agent that operates as a reliable member of your team.",
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