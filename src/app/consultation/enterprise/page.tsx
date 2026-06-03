import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/sections/consultation/ConsultationForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Consultation | Refactrd",
  description: "Book a full-day AI enterprise consultation with Refactrd.",
};

export default function EnterpriseConsultationPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <ConsultationForm type="enterprise" />
      </div>
      <Footer />
    </main>
  );
}
