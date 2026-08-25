import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import AssessmentComingSoon from "@/components/sections/assessment/AssessmentComingSoon";

export const metadata: Metadata = {
  title: "The Refactrd Assessment | Coming Soon",
  description:
    "A guided assessment to help you understand where AI can realistically create value in your organization. Coming soon.",
  // Placeholder page — keep it out of search results until the real thing ships.
  robots: { index: false, follow: true },
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AssessmentComingSoon />
      <Footer />
    </main>
  );
}
