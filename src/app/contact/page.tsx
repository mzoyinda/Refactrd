import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import ContactContent from "@/components/sections/contact/ContactContent";

export const metadata: Metadata = {
  title: "Talk With Refactrd | Contact",
  description:
    "Tell us about your organization and what you're trying to achieve. We'll review your enquiry and arrange an introductory conversation if we're a good fit.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactContent />
      <Footer />
    </main>
  );
}
