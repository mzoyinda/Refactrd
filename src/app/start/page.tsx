"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const stageOptions = [
  "Exploring Options",
  "Defining Requirements",
  "Ready To Build",
  "Existing Solution Needs Improvement",
];

const budgetOptions = [
  "Under $2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000+",
];

const timelineOptions = [
  "As Soon As Possible",
  "Within 30 Days",
  "Within 90 Days",
  "Flexible",
];

export default function StartPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    what_to_build: "",
    business_challenge: "",
    stage: "",
    budget: "",
    timeline: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    const { name, company, email, what_to_build, business_challenge, stage, budget, timeline } = form;

    if (!name || !company || !email || !what_to_build || !business_challenge || !stage || !budget || !timeline) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/submit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── shared input classes ── */
  const inputCls =
    "w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white";
  const selectCls =
    "w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white appearance-none cursor-pointer";
  const labelCls = "block font-clash font-semibold text-sm text-[#1F2A44] mb-1.5";

  return (
    <main className="min-h-screen">
      <Header />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-36 pb-16 md:pt-40 md:pb-20"
      >
        {/* Background blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Badge */}
            <div className={`mb-5 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F2A44]/8 text-[#1F2A44] rounded-full text-xs font-clash font-bold uppercase tracking-[0.16em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F2A44]" />
                Ready To Build
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Tell Us About Your Initiative
            </h1>

            {/* Body */}
            <p
              className={`font-jakarta text-base lg:text-lg text-[#5a6580] leading-relaxed max-w-2xl mx-auto mb-3 transition-all duration-700 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Already know what you&apos;re trying to achieve? Whether you&apos;re planning an AI assistant, knowledge system, workflow automation initiative, AI-enabled product feature, or operational improvement project, we&apos;ll review the opportunity and determine the most practical implementation path.
            </p>

            {/* Supporting text */}
            <p
              className={`font-clash text-sm font-semibold text-[#1F2A44]/60 transition-all duration-700 delay-300 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              We&apos;ll review your submission and respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FORM / CONFIRMATION
      ══════════════════════════════════════ */}
      <section className="bg-[#F4F6F9] py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-[680px] mx-auto">

          {submitted ? (
            /* ── CONFIRMATION ── */
            <div className="bg-white rounded-3xl border border-[#DDE3EE] shadow-sm p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-[#E6EAF0] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#1F2A44]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-clash font-bold text-[#1F2A44] mb-3">
                Initiative Received
              </h2>
              <p className="font-jakarta text-[#5a6580] leading-relaxed mb-8">
                Someone from the Refactrd team will review your brief personally and respond within 24 hours.
              </p>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5 text-left">
                <p className="font-clash font-bold text-[#1F2A44] text-sm mb-3">What to expect</p>
                <ul className="space-y-2.5">
                  {[
                    "Response within 24 hours",
                    "Personal review — no automated responses",
                    "Scope assessment and next steps",
                    "Honest feedback if it&apos;s not the right fit",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#1F2A44] flex-shrink-0" />
                      <span className="font-jakarta text-sm text-[#5a6580]" dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            /* ── FORM ── */
            <div className="bg-white rounded-3xl border border-[#DDE3EE] shadow-sm overflow-hidden">

              {/* Card header */}
              <div className="bg-[#1F2A44] px-8 py-7 md:px-10">
                <h2 className="font-clash font-bold text-white text-xl mb-1">
                  Implementation Brief
                </h2>
                <p className="font-jakarta text-white/55 text-sm">
                  All fields marked * are required.
                </p>
              </div>

              <div className="px-6 py-8 md:px-10 md:py-10 space-y-6">

                {/* Row: Name + Company */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Company Name *</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls}>Your Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={inputCls}
                  />
                </div>

                {/* What to build */}
                <div>
                  <label className={labelCls}>What are you looking to build or improve? *</label>
                  <p className="font-jakarta text-xs text-[#94A3B8] mb-2">
                    Describe the initiative, workflow, system, or opportunity.
                  </p>
                  <textarea
                    name="what_to_build"
                    value={form.what_to_build}
                    onChange={handleChange}
                    rows={5}
                    placeholder="We're looking to implement an internal AI assistant that helps employees find policies, procedures, and operational information across multiple departments."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Business challenge */}
                <div>
                  <label className={labelCls}>What business challenge are you trying to solve? *</label>
                  <textarea
                    name="business_challenge"
                    value={form.business_challenge}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Our team spends significant time searching for information, onboarding new employees, and answering repetitive questions."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Row: Stage + Budget */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>What stage are you in? *</label>
                    <select
                      name="stage"
                      value={form.stage}
                      onChange={handleChange}
                      className={selectCls}
                    >
                      <option value="" disabled>Select stage</option>
                      {stageOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Estimated Budget *</label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={selectCls}
                    >
                      <option value="" disabled>Select budget</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Desired Timeline */}
                <div>
                  <label className={labelCls}>Desired Timeline *</label>
                  <select
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className={selectCls}
                  >
                    <option value="" disabled>Select timeline</option>
                    {timelineOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <p className="font-jakarta text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-[#E8ECF2]" />

                {/* Submit */}
                <div className="space-y-3">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Initiative
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                  <p className="font-jakarta text-xs text-[#94A3B8] text-center">
                    We&apos;ll review your submission and respond within 24 hours.
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
