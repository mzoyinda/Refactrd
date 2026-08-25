"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Download,
  Loader2,
  Mail,
  RotateCcw,
} from "lucide-react";
import type { AssessmentReport } from "@/lib/assessment/report";

interface Props {
  report: AssessmentReport | null;
  error: string;
  onRestart: () => void;
}

function Section({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-clash font-bold text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function ResultsScreen({ report, error, onRestart }: Props) {
  const [pdfState, setPdfState] = useState<"idle" | "loading" | "done">("idle");
  const [emailState, setEmailState] = useState<"idle" | "loading" | "done">("idle");
  const [actionError, setActionError] = useState("");

  const handleDownload = async () => {
    if (!report) return;
    setPdfState("loading");
    setActionError("");
    try {
      const res = await fetch("/api/assess/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: report.id }),
      });
      if (!res.ok) throw new Error("PDF request failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${report.name.replace(/[^a-zA-Z0-9]+/g, "-")}-AI-Opportunity-Assessment.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setPdfState("done");
    } catch {
      setPdfState("idle");
      setActionError("We couldn't build your PDF. Please try again.");
    }
  };

  const handleEmail = async () => {
    if (!report) return;
    setEmailState("loading");
    setActionError("");
    try {
      const res = await fetch("/api/assess/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: report.id }),
      });
      if (!res.ok) throw new Error("Email request failed");
      setEmailState("done");
    } catch {
      setEmailState("idle");
      setActionError("We couldn't send your report. Please try again.");
    }
  };

  if (!report) {
    return (
      <section className="bg-[#F4F6F9] min-h-[100svh] flex items-center justify-center px-6 py-20">
        <div className="max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="font-clash font-bold text-[#1F2A44] text-2xl mb-3">
            We couldn&apos;t finish your assessment.
          </h1>
          <p className="font-jakarta text-[#64748B] text-[15px] leading-relaxed mb-7">
            {error || "Something went wrong on our end."}
          </p>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-colors duration-200 hover:bg-[#263352]"
          >
            <RotateCcw className="w-4 h-4" />
            Start again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Outcome hero */}
      <section className="relative bg-[#1F2A44] overflow-hidden py-16 sm:py-24">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 relative z-10">
          <p className="font-clash font-bold text-[10px] uppercase tracking-[0.24em] text-[#A2D2FF]/70 mb-5">
            Your AI opportunity
          </p>
          <h1 className="font-clash font-bold text-white text-[38px] sm:text-[54px] leading-[1.05] tracking-tight mb-5">
            {report.outcomeLabel}
          </h1>
          <p className="font-jakarta text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
            {report.outcomeSummary}
          </p>
        </div>
      </section>

      {/* Report body */}
      <section className="bg-[#F4F6F9] py-12 sm:py-16">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6">
          {report.caveat && (
            <div className="bg-white border border-[#E2E8F0] border-l-[3px] border-l-[#A2D2FF] rounded-r-xl px-5 py-4 mb-8">
              <p className="font-jakarta text-[#475569] text-[14.5px] leading-relaxed">
                {report.caveat}
              </p>
            </div>
          )}

          {/* Context strip */}
          <div className="grid sm:grid-cols-2 gap-4 mb-9">
            <div className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
              <Section label="The workflow">
                <p className="font-jakarta text-[#1F2A44] text-[15px] leading-relaxed font-medium">
                  {report.workflow}
                </p>
              </Section>
            </div>
            <div className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
              <Section label="Your goal">
                <p className="font-jakarta text-[#1F2A44] text-[15px] leading-relaxed font-medium">
                  {report.goals.join(", ")}
                </p>
              </Section>
            </div>
          </div>

          {/* Narrative */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-9 space-y-9">
            <Section label="What we heard">
              <p className="font-jakarta text-[#475569] text-[15.5px] sm:text-base leading-[1.75] whitespace-pre-line">
                {report.whatWeHeard}
              </p>
            </Section>

            <div className="border-t border-[#F1F5F9]" />

            <Section label="Where the opportunity is">
              <p className="font-jakarta text-[#475569] text-[15.5px] sm:text-base leading-[1.75] whitespace-pre-line">
                {report.opportunity}
              </p>
            </Section>

            <div className="border-t border-[#F1F5F9]" />

            <Section label="What could change">
              <div className="grid sm:grid-cols-2 gap-3 mt-1">
                <div className="bg-[#F8FAFC] rounded-xl border border-[#E8ECF2] px-5 py-4">
                  <p className="font-clash font-bold text-[10px] uppercase tracking-[0.16em] text-[#94A3B8] mb-2">
                    Today
                  </p>
                  <p className="font-jakarta text-[#475569] text-[14.5px] leading-relaxed">
                    {report.today}
                  </p>
                </div>
                <div className="bg-[#1F2A44]/[0.03] rounded-xl border border-[#1F2A44]/10 px-5 py-4">
                  <p className="font-clash font-bold text-[10px] uppercase tracking-[0.16em] text-[#5B8FC7] mb-2">
                    Potential future
                  </p>
                  <p className="font-jakarta text-[#1F2A44] text-[14.5px] leading-relaxed">
                    {report.future}
                  </p>
                </div>
              </div>
            </Section>

            <div className="border-t border-[#F1F5F9]" />

            <Section label="What stays human">
              <ul className="space-y-2 mb-4">
                {report.humanRole.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-[18px] h-[18px] rounded-full bg-[#1F2A44] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
                    </span>
                    <span className="font-jakarta text-[#1F2A44] text-[15px] font-medium leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-jakarta text-[#64748B] text-[14.5px] leading-relaxed">
                {report.humanRoleRationale}
              </p>
            </Section>
          </div>

          {/* First step */}
          <div className="bg-[#1F2A44] rounded-2xl p-6 sm:p-9 mt-6">
            <p className="font-clash font-bold text-[10px] uppercase tracking-[0.2em] text-[#A2D2FF] mb-4">
              Your first step
            </p>
            <p className="font-clash font-bold text-white text-lg sm:text-2xl leading-[1.35] mb-7">
              {report.firstStep}
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-[14px] transition-all duration-300 hover:bg-white"
            >
              Talk it through with us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Actions */}
          <div className="mt-6 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7">
            <p className="font-clash font-bold text-[#1F2A44] text-base mb-1">
              Keep a copy
            </p>
            <p className="font-jakarta text-[#64748B] text-sm leading-relaxed mb-5">
              Download it as a PDF, or have it sent to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownload}
                disabled={pdfState === "loading"}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[14px] transition-all duration-200 hover:bg-[#263352] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pdfState === "loading" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Building PDF...</>
                ) : pdfState === "done" ? (
                  <><Check className="w-4 h-4" /> Downloaded</>
                ) : (
                  <><Download className="w-4 h-4" /> Download PDF</>
                )}
              </button>

              <button
                onClick={handleEmail}
                disabled={emailState === "loading" || emailState === "done"}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#1F2A44] border border-[#E2E8F0] rounded-xl font-clash font-bold text-[14px] transition-all duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {emailState === "loading" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : emailState === "done" ? (
                  <><Check className="w-4 h-4" /> Sent to your inbox</>
                ) : (
                  <><Mail className="w-4 h-4" /> Email me my results</>
                )}
              </button>
            </div>

            {actionError && (
              <p className="font-jakarta text-[13px] text-red-600 mt-3">{actionError}</p>
            )}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 font-jakarta text-[14px] text-[#94A3B8] hover:text-[#1F2A44] transition-colors duration-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Assess another workflow
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
