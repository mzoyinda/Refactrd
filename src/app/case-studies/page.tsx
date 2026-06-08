import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CaseStudiesContent from "@/components/sections/CaseStudiesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Refactrd",
  description:
    "From operational challenges to measurable outcomes. Case studies showing how organizations improved workflows, strengthened operations, and created business impact through practical AI adoption.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CaseStudiesContent />
      <Footer />
    </main>
  );
}