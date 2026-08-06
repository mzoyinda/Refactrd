import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

const ServicesHero = dynamic(() => import("@/components/sections/services/ServicesHero"), {
  loading: () => <div className="section-padding bg-secondary" />,
});

const ServicesCapabilities = dynamic(() => import("@/components/sections/services/ServicesCapabilities"), {
  loading: () => <div className="section-padding bg-white" />,
});

const ServicesWhoThisIsFor = dynamic(() => import("@/components/sections/services/ServicesWhoThisIsFor"), {
  loading: () => <div className="section-padding bg-white" />,
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

const servicesFaqs = [
  {
    question: "What services does Refactrd provide?",
    answer:
      "Refactrd provides four core service areas: Workflow Transformation, Knowledge Systems & AI Assistants, Intelligent Operations, and AI-Enabled Products.",
  },
  {
    question: "How do I know which service is right for me?",
    answer:
      "You don't need to decide before contacting us. We'll learn about your goals, challenges, and priorities before recommending the most appropriate service.",
  },
  {
    question: "Can services be combined?",
    answer:
      "Yes. Many engagements span multiple service areas depending on your objectives. For example, a workflow transformation initiative may lead to a knowledge system or intelligent operational capabilities.",
  },
  {
    question: "Do you implement solutions as well?",
    answer:
      "Yes. Refactrd supports organizations from opportunity identification through implementation, adoption, and capability building.",
  },
  {
    question: "What happens after I contact Refactrd?",
    answer:
      "We'll start with a conversation to understand your organization, your priorities, and the outcomes you're trying to achieve before recommending the most appropriate next step.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServicesHero />
      <ServicesCapabilities />
      <ServicesWhoThisIsFor />
      <FAQ faqs={servicesFaqs} />
      <Footer />
    </main>
  );
}
