import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/sections/consultation/ConsultationForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini Consultation | Refactrd",
  description: "Book a 60-minute AI opportunity session with Refactrd.",
};

export default function MiniConsultationPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <ConsultationForm type="mini" />
      </div>
      <Footer />
    </main>
  );
}
