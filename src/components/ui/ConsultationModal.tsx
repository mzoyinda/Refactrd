"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

type ConsultationType = "mini" | "enterprise";

interface Props {
  type: ConsultationType;
  onClose: () => void;
}

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

export default function ConsultationModal({ type, onClose }: Props) {
  const isMini = type === "mini";
  const steps = isMini ? MINI_STEPS : ENTERPRISE_STEPS;
  const totalSteps = steps.length + 1; // questions + details step

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [details, setDetails] = useState({ full_name: "", email: "", company_name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  const isLastQStep = currentStep === steps.length - 1;
  const isDetailsStep = currentStep === steps.length;
  const currentQ = steps[currentStep];
  const currentAnswer = currentQ ? answers[currentQ.key] : null;
  const detailsValid = details.full_name.trim() && details.email.trim() && details.company_name.trim();

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
    if (!detailsValid) {
      setError("Please fill in all fields.");
      return;
    }
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

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.authorization_url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop - no onClick */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col"
        style={{ maxHeight: "calc(100vh - 48px)" }}
      >
        {/* ── HEADER ── */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-[#E6EAF0] text-[#1F2A44] text-xs font-clash font-bold rounded-full uppercase tracking-wide mb-2">
                {isMini ? "Mini Consultation · ₦149,000" : "Enterprise Consultation · ₦749,000"}
              </span>
              <h2 className="font-clash font-bold text-[#1F2A44] text-xl leading-tight">
                {isDetailsStep
                  ? "Almost there"
                  : loading
                  ? "Setting up payment..."
                  : steps[currentStep]?.label}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-[#F4F6F9] flex items-center justify-center text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#1F2A44] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-[#F4F6F9] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1F2A44] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-jakarta text-xs text-[#94A3B8] mt-1.5">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto px-6 pb-2">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-[#1F2A44] animate-spin mb-4" />
              <p className="font-clash font-semibold text-[#1F2A44] mb-1">
                Setting up your payment
              </p>
              <p className="font-jakarta text-sm text-[#94A3B8] text-center">
                You will be redirected to Paystack to complete payment securely.
              </p>
            </div>
          )}

          {/* Question step */}
          {!loading && !isDetailsStep && currentQ && (
            <div className="space-y-2 py-2">
              {steps[currentStep].options.map((option) => {
                const selected = answers[currentQ.key] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-jakarta text-sm transition-all duration-150 flex items-center gap-3 ${
                      selected
                        ? "border-[#1F2A44] bg-[#1F2A44] text-white"
                        : "border-[#E2E8F0] text-[#475569] hover:border-[#94A3B8]"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                        selected
                          ? "border-white"
                          : "border-[#CBD5E1]"
                      }`}
                    >
                      {selected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          {/* Details step */}
          {!loading && isDetailsStep && (
            <div className="space-y-4 py-2">
              {/* Summary */}
              <div className="bg-[#F4F6F9] rounded-xl p-4 border border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-clash font-bold text-[#1F2A44] text-sm">
                      {isMini ? "Mini Consultation" : "Enterprise Consultation"}
                    </p>
                    <p className="font-jakarta text-xs text-[#94A3B8] mt-0.5">
                      {isMini ? "60-min session + written AI opportunity map" : "Deep-dive audit + implementation roadmap"}
                    </p>
                  </div>
                  <p className="font-clash font-bold text-[#1F2A44]">
                    {isMini ? "₦149,000" : "₦749,000"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-clash font-bold text-sm text-[#1F2A44]">
                  Full name *
                </label>
                <input
                  type="text"
                  value={details.full_name}
                  onChange={(e) => setDetails((p) => ({ ...p, full_name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-clash font-bold text-sm text-[#1F2A44]">
                  Work email *
                </label>
                <input
                  type="email"
                  value={details.email}
                  onChange={(e) => setDetails((p) => ({ ...p, email: e.target.value }))}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-clash font-bold text-sm text-[#1F2A44]">
                  Company name *
                </label>
                <input
                  type="text"
                  value={details.company_name}
                  onChange={(e) => setDetails((p) => ({ ...p, company_name: e.target.value }))}
                  placeholder="Example Company Inc."
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="font-jakarta text-sm text-red-600">{error}</p>
                </div>
              )}

              <p className="font-jakarta text-xs text-[#94A3B8] text-center pt-1">
                Secured by Paystack. Your card details are never stored by us.
              </p>
            </div>
          )}
        </div>

        {/* ── FOOTER ACTIONS ── */}
        {!loading && (
          <div className="flex-shrink-0 px-6 pb-6 pt-4 border-t border-[#F4F6F9]">
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-5 py-3 border-2 border-[#E2E8F0] text-[#64748B] rounded-full font-clash font-semibold text-sm hover:border-[#1F2A44] hover:text-[#1F2A44] transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}

              {!isDetailsStep ? (
                <button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 group"
                >
                  {isLastQStep ? "Almost done" : "Next"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!detailsValid}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 group"
                >
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}