"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Loader2, Check } from "lucide-react";

const opportunityAreas = [
  "Operations",
  "Knowledge Management",
  "Customer Experience",
  "Product",
  "Sales",
  "Marketing",
  "Unsure",
  "Other",
];

const processSteps = [
  {
    num: "01",
    title: "Complete The Intake",
    body: "Tell us about your organization, challenges, and goals.",
  },
  {
    num: "02",
    title: "Confirm Engagement",
    body: "Review and confirm your assessment engagement.",
  },
  {
    num: "03",
    title: "Assessment Session",
    body: "We'll review your workflows, challenges, and opportunity areas.",
  },
  {
    num: "04",
    title: "Receive Your Assessment",
    body: "Get your Opportunity Assessment Brief and recommended next steps.",
  },
];

const deliverables = [
  "Prioritized Opportunities",
  "Workflow Insights",
  "Recommended Next Steps",
];

type Step = "form" | "payment";
const USD_PRICE = 99;

export default function OpportunityAssessmentPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState("");
  const [ngnAmount, setNgnAmount] = useState<number | null>(null);
  const [rate, setRate] = useState(1600);
  const [fetchingRate, setFetchingRate] = useState(true);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    prompt: "",
    opportunities: [] as string[],
    challenges: "",
    desired_outcome: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeroVisible(true);
      },
      { threshold: 0.1 },
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchRate();
  }, []);

  const fetchRate = async () => {
    setFetchingRate(true);
    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      const data = await res.json();
      const liveRate = data.rates?.NGN || 1600;
      setRate(liveRate);
      setNgnAmount(Math.round(USD_PRICE * liveRate));
    } catch {
      setRate(1600);
      setNgnAmount(Math.round(USD_PRICE * 1600));
    } finally {
      setFetchingRate(false);
    }
  };

  const formatNgn = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const toggleOpportunity = (area: string) => {
    setForm((prev) => ({
      ...prev,
      opportunities: prev.opportunities.includes(area)
        ? prev.opportunities.filter((a) => a !== area)
        : [...prev.opportunities, area],
    }));
    setError("");
  };

  const handleFormSubmit = async () => {
    const {
      name,
      company,
      email,
      prompt,
      opportunities,
      challenges,
      desired_outcome,
    } = form;
    if (
      !name ||
      !company ||
      !email ||
      !prompt ||
      opportunities.length === 0 ||
      !challenges ||
      !desired_outcome
    ) {
      setError(
        "Please fill in all required fields and select at least one opportunity area.",
      );
      return;
    }
    setLoading(true);
    setError("");
    try {
      await fetch("/api/submit-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          opportunities: form.opportunities.join(", "),
        }),
      });
    } catch {
      /* non-blocking */
    } finally {
      setLoading(false);
      setStep("payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    setError("");
    try {
      const res = await fetch("/api/initialize-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "mini",
          email: form.email,
          full_name: form.name,
          provider: "flutterwave",
          metadata: {
            company_name: form.company,
            prompt: form.prompt,
            opportunities: form.opportunities.join(", "),
            challenges: form.challenges,
            desired_outcome: form.desired_outcome,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setPaymentLoading(false);
        return;
      }
      window.location.href = data.authorization_url;
    } catch {
      setError("Something went wrong. Please try again.");
      setPaymentLoading(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl border border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white";
  const labelCls =
    "block font-clash font-semibold text-[13px] text-[#1F2A44] mb-1.5";

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative bg-[#1F2A44] overflow-hidden pt-32 pb-0 md:pt-36"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-0 lg:gap-12 xl:gap-16 items-end">
            <div className="pb-16 lg:pb-20">
              <div
                className={`mb-8 transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              >
                <span className="font-clash font-bold text-[10px] uppercase tracking-[0.22em] text-[#A2D2FF]/60">
                  Opportunity Assessment
                </span>
              </div>
              <h1
                className={`font-clash font-bold text-white leading-[1.06] tracking-tight mb-8 transition-all duration-700 delay-75 text-[36px] sm:text-[48px] lg:text-[52px] xl:text-[60px] ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Find Your
                <br />
                Highest-Impact
                <br />
                Opportunities
              </h1>
              <div
                className={`mb-10 transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                <p className="font-clash font-semibold text-white text-xl mb-2 leading-snug">
                  AI can create value.
                </p>
                <p className="font-jakarta text-white/50 text-base mb-6 leading-relaxed">
                  The challenge is knowing where to focus first.
                </p>
                <p className="font-jakarta text-white/65 text-[15px] leading-relaxed max-w-lg">
                  The Opportunity Assessment helps identify the opportunities
                  most likely to improve how work gets done.
                </p>
              </div>
              <div
                className={`transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                <a
                  href="#get-started"
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-[15px] transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start Your Opportunity Assessment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <p className="font-jakarta text-white/30 text-sm mt-3">
                  For organizations seeking clarity before making larger
                  investments.
                </p>
              </div>
            </div>
            <div
              className={`hidden lg:flex flex-col self-end transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div className="bg-white rounded-t-2xl overflow-hidden">
                <div className="px-7 py-6 border-b border-[#F0F3F7]">
                  <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">
                    Best For
                  </p>
                  <p className="font-jakarta text-[#1F2A44] text-[14px] leading-relaxed">
                    Organizations that know AI can help but aren&apos;t sure
                    where to focus.
                  </p>
                </div>
                <div className="px-7 py-6 border-b border-[#F0F3F7]">
                  <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">
                    You&apos;ll Leave With
                  </p>
                  <ul className="space-y-2">
                    {deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2.5 font-jakarta text-[#475569] text-[13px]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-7 py-6">
                  <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">
                    Outcome
                  </p>
                  <p className="font-jakarta text-[#475569] text-[13px] leading-relaxed">
                    A clear understanding of where AI can create meaningful
                    operational impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="lg:hidden bg-white border-b border-[#E8ECF2]">
        <div className="container-custom">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E8ECF2]">
            <div className="py-6 sm:pr-6">
              <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2">
                Best For
              </p>
              <p className="font-jakarta text-[#1F2A44] text-sm leading-relaxed">
                Organizations that know AI can help but aren&apos;t sure where
                to focus.
              </p>
            </div>
            <div className="py-6 sm:px-6">
              <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2">
                You&apos;ll Leave With
              </p>
              <ul className="space-y-1.5">
                {deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2 font-jakarta text-[#475569] text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-6 sm:pl-6">
              <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2">
                Outcome
              </p>
              <p className="font-jakarta text-[#475569] text-sm leading-relaxed">
                A clear understanding of where AI can create meaningful
                operational impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-[#F8FAFC] border-b border-[#E8ECF2] py-14 md:py-16">
        <div className="container-custom">
          <p className="font-clash font-bold text-[9px] uppercase tracking-[0.22em] text-[#94A3B8] mb-10">
            How It Works
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((s) => (
              <div key={s.num} className="flex flex-col gap-3">
                <span className="font-clash font-bold text-[#A2D2FF] text-sm">
                  {s.num}
                </span>
                <h3 className="font-clash font-bold text-[#1F2A44] text-[15px] leading-snug">
                  {s.title}
                </h3>
                <p className="font-jakarta text-[#64748B] text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + PAYMENT ── */}
      <section id="get-started" className="bg-[#F4F6F9] py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="font-clash font-bold text-[#1F2A44] text-2xl sm:text-3xl mb-2">
              Start Your Opportunity Assessment
            </h2>
            <p className="font-jakarta text-[#94A3B8] text-sm">
              {fetchingRate
                ? "Loading price..."
                : `Assessment Price: $${USD_PRICE}`}
            </p>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-clash font-bold text-xs transition-all ${step === "form" ? "bg-[#1F2A44] text-white" : "bg-[#F4F6F9] text-[#94A3B8]"}`}
            >
              {step === "payment" ? (
                <Check className="w-3 h-3" />
              ) : (
                <span>1</span>
              )}
              Assessment Intake
            </div>
            <div className="flex-1 h-px bg-[#E8ECF2]" />
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-clash font-bold text-xs transition-all ${step === "payment" ? "bg-[#1F2A44] text-white" : "bg-[#F4F6F9] text-[#94A3B8]"}`}
            >
              <span>2</span>
              Payment
            </div>
          </div>

          {step === "form" && (
            <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
              <div className="bg-[#1F2A44] px-7 py-6">
                <h3 className="font-clash font-bold text-white text-lg mb-1">
                  Assessment Intake
                </h3>
                <p className="font-jakarta text-white/50 text-sm">
                  Help us understand your organization so we can identify the
                  right opportunities.
                </p>
              </div>
              <div className="bg-white px-7 py-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Company *</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    What prompted you to explore AI right now? *
                  </label>
                  <textarea
                    name="prompt"
                    value={form.prompt}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us what sparked the conversation internally."
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div>
                  <label className={`${labelCls} mb-3`}>
                    Where do you believe the biggest opportunities exist? *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {opportunityAreas.map((area) => {
                      const checked = form.opportunities.includes(area);
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleOpportunity(area)}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left font-jakarta text-sm transition-all duration-150 ${checked ? "border-[#1F2A44] bg-[#1F2A44] text-white" : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#1F2A44]/30"}`}
                        >
                          <span
                            className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${checked ? "border-white bg-white" : "border-[#D1D5DB]"}`}
                          >
                            {checked && (
                              <svg
                                className="w-2.5 h-2.5 text-[#1F2A44]"
                                fill="none"
                                viewBox="0 0 12 12"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              >
                                <path d="M2 6l3 3 5-5" />
                              </svg>
                            )}
                          </span>
                          {area}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>
                    What are the biggest operational challenges today? *
                  </label>
                  <textarea
                    name="challenges"
                    value={form.challenges}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe bottlenecks, inefficiencies, or recurring challenges."
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    What outcome would make this assessment valuable? *
                  </label>
                  <textarea
                    name="desired_outcome"
                    value={form.desired_outcome}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What would success look like after this engagement?"
                    className={`${inputCls} resize-none`}
                  />
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <p className="font-jakarta text-sm text-red-600">{error}</p>
                  </div>
                )}
                <div className="pt-2 space-y-3">
                  <button
                    onClick={handleFormSubmit}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        Continue To Payment{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                  <p className="font-jakarta text-xs text-[#94A3B8] text-center">
                    Next step: confirm your engagement and schedule your
                    assessment session.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── PAYMENT (Flutterwave only) ── */}
          {step === "payment" && (
            <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
              <div className="bg-[#1F2A44] px-7 py-6">
                <h3 className="font-clash font-bold text-white text-lg mb-1">
                  Confirm Your Engagement
                </h3>
                <p className="font-jakarta text-white/50 text-sm">
                  Complete payment via Flutterwave to confirm your assessment.
                </p>
              </div>

              <div className="bg-white px-7 py-8 space-y-6">
                <div className="rounded-xl bg-[#F8FAFC] border border-[#E8ECF2] p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-clash font-bold text-[#1F2A44] text-[15px]">
                      Opportunity Assessment
                    </p>
                    <p className="font-jakarta text-xs text-[#94A3B8] mt-0.5">
                      For: {form.name} · {form.company}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-clash font-bold text-[#1F2A44]">
                      ${USD_PRICE}
                    </p>
                    {ngnAmount && (
                      <p className="font-jakarta text-xs text-[#94A3B8]">
                        {formatNgn(ngnAmount)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl bg-[#1F2A44] p-5 text-center">
                  <p className="font-jakarta text-white/50 text-xs mb-1">
                    Total due today
                  </p>
                  <p className="font-clash font-bold text-white text-3xl">
                    ${USD_PRICE}
                  </p>
                  <p className="font-jakarta text-white/35 text-xs mt-1">
                    {ngnAmount
                      ? `Approx. ${formatNgn(ngnAmount)} · Rate: ₦${Math.round(rate).toLocaleString()}/USD`
                      : ""}
                  </p>
                </div>

                <div>
                  <p className="font-clash font-bold text-sm text-[#1F2A44] mb-3">
                    Payment method
                  </p>
                  <div className="w-full px-5 py-4 rounded-xl border-2 border-[#1F2A44] bg-[#1F2A44] flex items-center gap-4">
                    {/* White card behind the logo so it's always legible regardless of dark surroundings */}
                    <div className="h-12 w-40 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden px-3 bg-white shadow-sm">
                      <Image
                        src="/images/flutterwave-logo.png"
                        alt="Flutterwave"
                        width={150}
                        height={80}
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-jakarta text-xs text-white/70">
                        Cards, mobile money, bank transfer · Charged in USD
                      </p>
                    </div>
                    <span className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <p className="font-jakarta text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setStep("form");
                      setError("");
                    }}
                    className="flex items-center gap-1.5 px-5 py-3.5 border border-[#E2E8F0] text-[#64748B] rounded-xl font-clash font-semibold text-sm hover:border-[#1F2A44] hover:text-[#1F2A44] transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={paymentLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {paymentLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />{" "}
                        Redirecting...
                      </>
                    ) : (
                      <>
                        Pay with Flutterwave{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                </div>

                <p className="font-jakarta text-xs text-[#94A3B8] text-center">
                  Secured payment. Your card details are never stored by us.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
