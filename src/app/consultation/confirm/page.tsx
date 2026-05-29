"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Loader2, XCircle, ArrowRight } from "lucide-react";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      return;
    }
    verifyPayment();
  }, [reference]);

  const verifyPayment = async () => {
    try {
      const res = await fetch(`/api/verify-payment?reference=${reference}`);
      const data = await res.json();

      if (!res.ok) {
        setStatus("failed");
        return;
      }

      setBooking(data.booking);
      setStatus("success");
    } catch (err) {
      setStatus("failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#E6EAF0] via-white to-white flex items-center justify-center pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-xl mx-auto">

          {/* Loading */}
          {status === "loading" && (
            <div className="bg-white rounded-3xl border-2 border-[#E2E8F0] p-12 text-center">
              <Loader2 className="w-12 h-12 text-[#1F2A44] animate-spin mx-auto mb-6" />
              <h2 className="font-clash font-bold text-2xl text-[#1F2A44] mb-2">
                Confirming your payment
              </h2>
              <p className="font-jakarta text-[#94A3B8] text-sm">
                This will only take a moment...
              </p>
            </div>
          )}

          {/* Success */}
          {status === "success" && booking && (
            <div className="bg-white rounded-3xl border-2 border-[#E2E8F0] overflow-hidden">
              {/* Top banner */}
              <div className="bg-[#1F2A44] px-10 py-8 text-center">
                <div className="w-16 h-16 bg-[#A2D2FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#A2D2FF]" />
                </div>
                <h1 className="font-clash font-bold text-white text-2xl mb-1">
                  You are booked in.
                </h1>
                <p className="font-jakarta text-white/60 text-sm">
                  Payment confirmed successfully
                </p>
              </div>

              {/* Body */}
              <div className="px-10 py-8 space-y-6">
                <div>
                  <p className="font-clash font-bold text-[#1F2A44] text-lg mb-1">
                    Hi {booking.full_name},
                  </p>
                  <p className="font-jakarta text-[#475569] leading-relaxed text-sm">
                    Your {booking.type === "mini" ? "Mini Consultation" : "Enterprise Consultation"} has been confirmed. Someone from the Refactrd team will reach out within 24 hours to schedule your session at a time that works for you.
                  </p>
                </div>

                {/* What to expect */}
                <div className="bg-[#F4F6F9] rounded-xl p-5">
                  <p className="font-clash font-bold text-sm text-[#1F2A44] mb-3">
                    What to expect
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "We will reach out within 24 hours to schedule",
                      "Come prepared to walk us through your workflows",
                      "You will leave with a clear written recommendation",
                      "No pitch. No fluff. A real conversation.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#0e5d7d] flex-shrink-0 mt-0.5" />
                        <span className="font-jakarta text-sm text-[#64748B]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payment summary */}
                <div className="border border-[#E2E8F0] rounded-xl p-5">
                  <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest mb-3">
                    Payment Summary
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-jakarta text-sm text-[#64748B]">Consultation</span>
                      <span className="font-clash font-semibold text-sm text-[#1F2A44]">
                        {booking.type === "mini" ? "Mini consultation" : "Enterprise consultation"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-jakarta text-sm text-[#64748B]">Amount Paid</span>
                      <span className="font-clash font-semibold text-sm text-[#1F2A44]">
                        ₦{Number(booking.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-jakarta text-sm text-[#64748B]">Reference</span>
                      <span className="font-jakarta text-xs text-[#94A3B8]">
                        {booking.reference}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-jakarta text-xs text-[#94A3B8] text-center">
                  A confirmation has been sent to {booking.email}
                </p>

                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#1F2A44] text-white rounded-full font-clash font-bold text-sm transition-all duration-300 group"
                >
                  Back to Home
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          )}

          {/* Failed */}
          {status === "failed" && (
            <div className="bg-white rounded-3xl border-2 border-[#E2E8F0] p-12 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="font-clash font-bold text-2xl text-[#1F2A44] mb-2">
                Payment could not be confirmed
              </h2>
              <p className="font-jakarta text-[#64748B] text-sm mb-8 leading-relaxed">
                Something went wrong verifying your payment. If you were charged, please contact us at{" "}
                <a href="mailto:info@refactrd.com" className="text-[#0e5d7d] font-semibold">
                  info@refactrd.com
                </a>{" "}
                with your payment reference and we will sort it out immediately.
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-semibold text-sm transition-all duration-200"
              >
                Try again
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ConsultationConfirmPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#1F2A44] animate-spin" />
        </div>
      }>
        <ConfirmContent />
      </Suspense>
      <Footer />
    </main>
  );
}