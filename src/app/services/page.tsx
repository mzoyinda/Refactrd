import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import FAQ from "@/components/sections/FAQ";

const ServicesHero = dynamic(() => import("@/components/sections/services/ServicesHero"), {
  loading: () => <div className="section-padding bg-secondary" />,
});

const ServicesWhoThisIsFor = dynamic(() => import("@/components/sections/services/ServicesWhoThisIsFor"), {
  loading: () => <div className="section-padding bg-white" />,
});

const ServicesHowItWorks = dynamic(() => import("@/components/sections/services/ServicesHowItWorks"), {
  loading: () => <div className="section-padding bg-tertiary/30" />,
});

export const metadata = {
  title: "Transformation Areas | Refactrd",
  description:
    "Refactrd helps organizations move from AI experimentation to operational adoption through workflow transformation, knowledge systems, AI-enabled products, and intelligent workflows.",
  keywords: [
    "workflow transformation",
    "AI knowledge systems",
    "AI-enabled products",
    "AI operations",
    "operational adoption",
    "AI transformation",
  ],
  openGraph: {
    title: "Transformation Areas | Refactrd",
    description:
      "Helping organizations identify opportunities, redesign workflows, implement practical AI solutions, and create measurable operational impact.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServicesHero />
      <WhatWeDoSection showChallenges={true} />
      <ServicesWhoThisIsFor />
      <ServicesHowItWorks />
      <FAQ />
      <Footer />
    </main>
  );
}
