"use client";

import { useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarCheck,
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
  /** False when the confirmation email didn't go out. */
  emailSent: boolean;
  onRestart: () => void;
}

type MeetingStage = "idle" | "asking" | "sending" | "done";

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-clash font-bold text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function ResultsScreen({ report, error, emailSent, onRestart }: Props) {
  const [pdfState, setPdfState] = useState<"idle" | "loading" | "done">("idle");
  const [meeting, setMeeting] = useState<MeetingStage>("idle");
  const [note, setNote] = useState("");
  const [actionError, setActionError] = useState("");
  const noteRef = useRef<HTMLTextAreaElement>(null);

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

  const openMeeting = () => {
    setMeeting("asking");
    setActionError("");
    // Let the panel mount before reaching for the field.
    requestAnimationFrame(() => noteRef.current?.focus());
  };

  const submitMeeting = async () => {
    if (!report) return;
    setMeeting("sending");
    setActionError("");
    try {
      const res = await fetch("/api/assess/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: report.id, note }),
      });
      if (!res.ok) throw new Error("Meeting request failed");
      setMeeting("done");
    } catch {
      setMeeting("asking");
      setActionError("We couldn't send your request. Please try again.");
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
          </div>

          {/* What this could look like — the "what could be" view */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] border-t-[3px] border-t-[#A2D2FF] p-6 sm:p-9 mt-6">
            <Section label="What this could look like">
              <p className="font-jakarta text-[#1F2A44] text-[16px] sm:text-[17px] leading-[1.75] whitespace-pre-line">
                {report.futureState}
              </p>
            </Section>

            <div className="grid sm:grid-cols-2 gap-3 mt-7">
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
          </div>

          {/* Things you might need */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-9 mt-6">
            <Section label="Things you might need">
              <p className="font-jakarta text-[#64748B] text-[15px] leading-relaxed mb-6">
                Based on what you told us, these are the pieces that would move this
                workflow. Not a quote, just the shape of the work.
              </p>
              <div className="space-y-3">
                {report.services.map((service) => (
                  <div
                    key={service.key}
                    className="rounded-xl border border-[#E8ECF2] bg-[#F8FAFC] px-5 py-5"
                  >
                    <p className="font-clash font-bold text-[#1F2A44] text-[16px] mb-2">
                      {service.name}
                    </p>
                    <p className="font-jakarta text-[#475569] text-[14.5px] leading-[1.7]">
                      {service.why}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* First step + meeting request */}
          <div className="bg-[#1F2A44] rounded-2xl p-6 sm:p-9 mt-6">
            <p className="font-clash font-bold text-[10px] uppercase tracking-[0.2em] text-[#A2D2FF] mb-4">
              Your first step
            </p>
            <p className="font-clash font-bold text-white text-lg sm:text-2xl leading-[1.35] mb-7">
              {report.firstStep}
            </p>

            {meeting === "done" ? (
              <div className="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-5">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#A2D2FF] flex items-center justify-center flex-shrink-0">
                    <CalendarCheck className="w-4 h-4 text-[#1F2A44]" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="font-clash font-bold text-white text-base mb-1.5">
                      We&apos;ll be in touch.
                    </p>
                    <p className="font-jakarta text-white/70 text-[14.5px] leading-relaxed">
                      We&apos;ve sent a booking link to{" "}
                      <span className="text-white font-medium">{report.email}</span>. Please
                      check your email and book at your earliest convenience.
                    </p>
                  </div>
                </div>
              </div>
            ) : meeting === "asking" || meeting === "sending" ? (
              <div className="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-5 assessment-fade-up-fast">
                <p className="font-clash font-bold text-white text-base mb-1.5">
                  We&apos;ll send a booking link to you shortly.
                </p>
                <label
                  htmlFor="meeting-note"
                  className="block font-jakarta text-white/60 text-[14px] leading-relaxed mb-3"
                >
                  Anything else you&apos;d like for us to know?
                </label>
                <textarea
                  id="meeting-note"
                  ref={noteRef}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  placeholder="Optional. Anything that would help us prepare."
                  disabled={meeting === "sending"}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] font-jakarta text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#A2D2FF]/60 focus:bg-white/[0.07] transition-all duration-200 resize-none disabled:opacity-50"
                />
                <button
                  onClick={submitMeeting}
                  disabled={meeting === "sending"}
                  className="group mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-[14px] transition-all duration-300 hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {meeting === "sending" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <>Send request <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={openMeeting}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-[14px] transition-all duration-300 hover:bg-white"
              >
                Request a meeting with Refactrd
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            )}
          </div>

          {/* Copy of the report */}
          <div className="mt-6 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7">
            <div className="flex items-start gap-3 mb-5">
              <span className="w-8 h-8 rounded-full bg-[#A2D2FF]/15 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-[#1F2A44]" strokeWidth={2} />
              </span>
              <div>
                <p className="font-clash font-bold text-[#1F2A44] text-base mb-1">
                  {emailSent ? "A copy is on its way." : "Keep a copy"}
                </p>
                <p className="font-jakarta text-[#64748B] text-sm leading-relaxed">
                  {emailSent ? (
                    <>
                      We&apos;ve sent this report to{" "}
                      <span className="text-[#1F2A44] font-medium">{report.email}</span>. If it
                      doesn&apos;t arrive shortly, check your spam folder.
                    </>
                  ) : (
                    <>We couldn&apos;t email your copy, but you can download it here.</>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={pdfState === "loading"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#1F2A44] border border-[#E2E8F0] rounded-xl font-clash font-bold text-[14px] transition-all duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pdfState === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Building PDF...</>
              ) : pdfState === "done" ? (
                <><Check className="w-4 h-4" /> Downloaded</>
              ) : (
                <><Download className="w-4 h-4" /> Download as PDF</>
              )}
            </button>

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
