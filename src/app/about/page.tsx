import dynamic from "next/dynamic";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import WhyWeExist from "@/components/sections/about/WhyWeExist";
import FAQ from "@/components/sections/FAQ";

const HowToGetStarted = dynamic(
  () => import("@/components/sections/HowToGetStarted"),
  {
    loading: () => <div className="section-padding bg-tertiary/30" />,
  },
);

export const metadata = {
  title: "About Us | Refactrd - We build AI that actually works for your team.",
  description:
    "Refactrd is an AI engineering studio founded to help companies introduce AI in a focused, practical way. We build working systems, start small, and grow the relationship through results.",
  keywords: [
    "about Refactrd",
    "ai engineering studio",
    "engineering team",
    "ai engineering partner",
  ],
  openGraph: {
    title: "About Refactrd | Our Story",
    description:
      "Built around one idea: most companies know AI can help their team, they just do not know where to start, what to build, or who to trust with it.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <WhyWeExist />
      <HowToGetStarted />
      <FAQ />
      <Footer />
    </main>
  );
}
