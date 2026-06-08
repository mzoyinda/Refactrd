"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

type ConsultationType = "mini" | "enterprise";

const MINI_STEPS = [
  {
    key: "situation",
    label: "Which best describes your situation?",
    options: [
      "We are doing everything manually and it is slowing us down",
      "We have tried tools but nothing has really stuck",
      "We know AI can help but are not sure where to start",
      "We want a second opinion on our current AI setup",
    ],
  },
  {
    key: "focus_area",
    label: "What is the main area you want to explore?",
    options: [
      "Operations and Workflows",
      "Internal Knowledge and Assistants",
      "Product Features and User Experience",
      "Sales and Customer Processes",
      "Something else",
    ],
  },
  {
    key: "team_size",
    label: "How many people are on your team?",
    options: [
      "Just me",
      "2 to 10 people",
      "11 to 50 people",
      "51 to 200 people",
      "200+ people",
    ],
  },
  {
    key: "how_heard",
    label: "How did you hear about Refactrd?",
    options: [
      "LinkedIn",
      "Instagram",
      "Google Search",
      "Word of mouth",
      "A referral",
      "Newsletter",
    ],
  },
];

const ENTERPRISE_STEPS = [
  {
    key: "industry",
    label: "What industry is your company in?",
    options: [
      "Fintech / Financial Services",
      "E-commerce / Retail",
      "Healthcare",
      "Legal",
      "Manufacturing / FMCG",
      "Media / Marketing",
      "SaaS / Technology",
      "Other",
    ],
  },
  {
    key: "company_size",
    label: "How large is your organization?",
    options: [
      "50 to 200 people",
      "200 to 500 people",
      "500 to 1,000 people",
      "1,000+ people",
    ],
  },
  {
    key: "org_readiness",
    label: "Where is your organization right now?",
    options: [
      "Just exploring what AI could do for us",
      "We have a budget approved and need direction",
      "We have a project defined and need execution",
      "We need a roadmap before we can commit to anything",
    ],
  },
  {
    key: "biggest_blocker",
    label: "What is your biggest blocker to AI adoption today?",
    options: [
      "We do not know where to start",
      "We have tried things that did not work",
      "Leadership is not aligned yet",
      "We do not have the right technical team",
      "Data and security concerns",
      "Budget uncertainty",
    ],
  },
  {
    key: "how_heard",
    label: "How did you hear about Refactrd?",
    options: [
      "LinkedIn",
      "Google Search",
      "Word of mouth",
      "A referral",
      "Industry event",
      "Newsletter",
    ],
  },
];

interface Props {
  type: ConsultationType;
}

export default function ConsultationForm({ type }: Props) {
  const isMini = type === "mini";
  const steps = isMini ? MINI_STEPS : ENTERPRISE_STEPS;
  const totalSteps = steps.length + 1;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [details, setDetails] = useState({ full_name: "", email: "", company_name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDetailsStep = currentStep === steps.length;
  const isLastQStep = currentStep === steps.length - 1;
  const currentQ = steps[currentStep];
  const currentAnswer = currentQ ? answers[currentQ.key] : null;
  const detailsValid = details.full_name.trim() && details.email.trim() && details.company_name.trim();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.key]: value }));
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    setError("");
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = async () => {
    if (!detailsValid) { setError("Please fill in all fields."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/initialize-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          email: details.email,
          full_name: details.full_name,
          metadata: { company_name: details.company_name, ...answers },
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong. Please try again."); setLoading(false); return; }
      window.location.href = data.authorization_url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F6F9] flex flex-col lg:flex-row" style={{ minHeight: "calc(100vh - 80px)" }}>

      {/* Left panel — context */}
      <div className="bg-[#1F2A44] lg:w-2/5 xl:w-1/3 flex-shrink-0 px-8 pt-12 pb-12 lg:px-12 lg:py-16 flex flex-col justify-between">
        <div>
          {/* Badge */}
          <span className="inline-block px-3 py-1.5 rounded-full border border-[#A2D2FF]/30 text-[#A2D2FF] text-[10px] font-clash font-bold uppercase tracking-[0.15em] mb-8">
            {isMini ? "Mini Consultation · ₦149,000" : "Enterprise Consultation · ₦749,000"}
          </span>

          <h1 className="font-clash font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
            {isMini
              ? "Let's figure out where to start."
              : "Let's map your path to AI at scale."}
          </h1>
          <p className="font-jakarta text-white/55 text-sm leading-relaxed mb-10">
            {isMini
              ? "A few quick questions so we can make the most of our 60 minutes together. No fluff — just the information we need to come prepared."
              : "Help us understand your organisation before we meet. This lets us show up with context, not questions."}
          </p>

          {/* What you get */}
          <div className="space-y-3">
            <p className="font-clash font-bold text-[10px] uppercase tracking-[0.14em] text-white/35 mb-4">
              What's included
            </p>
            {(isMini
              ? ["60-minute focused session", "Written AI opportunity map", "Prioritised next steps", "Honest feasibility assessment"]
              : ["Full-day leadership engagement", "Workflow and systems audit", "AI integration roadmap", "Risk and security assessment", "Post-consultation follow-up"]
            ).map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#A2D2FF] flex-shrink-0 mt-0.5" />
                <span className="font-jakarta text-sm text-white/60">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <Link href="/get-started" className="inline-flex items-center gap-2 text-white/35 hover:text-white/60 text-xs font-clash font-semibold uppercase tracking-wide transition-colors duration-200 mt-12 lg:mt-0">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to options
        </Link>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-16 lg:px-16 xl:px-24">
        <div className="w-full max-w-lg">

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <p className="font-clash font-bold text-xs text-[#1F2A44] uppercase tracking-wide">
                Step {currentStep + 1} of {totalSteps}
              </p>
              <p className="font-jakarta text-xs text-[#94A3B8]">
                {Math.round(progress)}% complete
              </p>
            </div>
            <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1F2A44] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
              <Loader2 className="w-10 h-10 text-[#1F2A44] animate-spin mx-auto mb-4" />
              <p className="font-clash font-bold text-[#1F2A44] text-lg mb-1">Setting up your payment</p>
              <p className="font-jakarta text-sm text-[#94A3B8]">You'll be redirected to Paystack to complete payment securely.</p>
            </div>
          )}

          {/* Question step */}
          {!loading && !isDetailsStep && currentQ && (
            <div>
              <h2 className="font-clash font-bold text-[#1F2A44] text-xl sm:text-2xl leading-tight mb-6">
                {currentQ.label}
              </h2>
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option) => {
                  const selected = answers[currentQ.key] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 font-jakarta text-sm transition-all duration-150 flex items-center gap-4 ${
                        selected
                          ? "border-[#1F2A44] bg-[#1F2A44] text-white"
                          : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#94A3B8]"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? "border-white" : "border-[#CBD5E1]"}`}>
                        {selected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <button onClick={handleBack} className="flex items-center gap-2 px-5 py-3.5 border-2 border-[#E2E8F0] bg-white text-[#64748B] rounded-xl font-clash font-semibold text-sm hover:border-[#1F2A44] hover:text-[#1F2A44] transition-all duration-200">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-sm disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-200 group"
                >
                  {isLastQStep ? "Almost done" : "Next"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          )}

          {/* Details step */}
          {!loading && isDetailsStep && (
            <div>
              <h2 className="font-clash font-bold text-[#1F2A44] text-xl sm:text-2xl leading-tight mb-2">
                Almost there
              </h2>
              <p className="font-jakarta text-[#64748B] text-sm mb-6">
                Enter your details to proceed to payment.
              </p>

              {/* Order summary */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mb-6 flex items-center justify-between">
                <div>
                  <p className="font-clash font-bold text-[#1F2A44] text-sm">{isMini ? "Mini Consultation" : "Enterprise Consultation"}</p>
                  <p className="font-jakarta text-xs text-[#94A3B8] mt-0.5">{isMini ? "60-min session + written AI opportunity map" : "Deep-dive audit + implementation roadmap"}</p>
                </div>
                <p className="font-clash font-bold text-[#1F2A44] flex-shrink-0 ml-4">{isMini ? "₦149,000" : "₦749,000"}</p>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { label: "Full name", key: "full_name", type: "text", placeholder: "John Doe" },
                  { label: "Work email", key: "email", type: "email", placeholder: "john@company.com" },
                  { label: "Company name", key: "company_name", type: "text", placeholder: "Example Company Inc." },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block font-clash font-bold text-sm text-[#1F2A44] mb-1.5">{field.label} *</label>
                    <input
                      type={field.type}
                      value={details[field.key as keyof typeof details]}
                      onChange={(e) => setDetails((p) => ({ ...p, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] bg-white font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors"
                    />
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                  <p className="font-jakarta text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={handleBack} className="flex items-center gap-2 px-5 py-3.5 border-2 border-[#E2E8F0] bg-white text-[#64748B] rounded-xl font-clash font-semibold text-sm hover:border-[#1F2A44] hover:text-[#1F2A44] transition-all duration-200">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!detailsValid}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-sm disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-200 group"
                >
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>

              <p className="font-jakarta text-xs text-[#94A3B8] text-center mt-4">
                Secured by Paystack. Your card details are never stored by us.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
