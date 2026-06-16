import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InsightsContent from "@/components/sections/InsightsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Refactrd",
  description:
    "Perspectives, frameworks, and lessons from helping organizations move AI from experimentation to operational adoption.",
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <InsightsContent />
      <Footer />
    </main>
  );
}