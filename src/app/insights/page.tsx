import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import InsightsContent from "@/components/sections/InsightsContent";

export const metadata: Metadata = {
  title: "Case Studies | Refactrd",
  description:
    "From operational challenges to measurable outcomes. Case studies showing how organizations improved workflows, strengthened operations, and created business impact through practical AI adoption.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <InsightsContent />
      <Footer />
    </main>
  );
}