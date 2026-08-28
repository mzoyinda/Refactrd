import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ApproachHero from "@/components/sections/approach/ApproachHero";
import ApproachTabs from "@/components/sections/approach/ApproachTabs";
import ApproachSystem from "@/components/sections/approach/ApproachSystem";
import ApproachFAQ from "@/components/sections/approach/ApproachFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata = {
  title: "Our Approach | Refactrd - From AI Experimentation to Operational Adoption",
  description:
    "The Refactrd Approach is a structured system for moving from AI experimentation to operational adoption through assessment, transformation, implementation, and measurable outcomes.",
  keywords: [
    "Refactrd approach",
    "AI transformation",
    "operational adoption",
    "workflow transformation",
    "AI implementation",
  ],
  openGraph: {
    title: "The Refactrd Approach",
    description:
      "A practical system for moving from AI experimentation to operational adoption.",
    type: "website",
  },
};

export default function ApproachPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ApproachHero />
      <ApproachTabs />
      <ApproachSystem />
      <ApproachFAQ />
      <FinalCTA
        headingPrefix="Ready To Move From AI Experimentation To "
        headingAccent="Operational Impact?"
        body="Whether you're exploring AI for the first time or scaling adoption across your organization, we'll help you identify the right opportunities and implement solutions that improve how your business operates."
        primaryLabel="Talk With Refactrd"
        primaryHref="/contact"
      />
      <Footer />
    </main>
  );
}
