"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const opportunityAreas = [
  "Operations",
  "Knowledge Management",
  "Customer Experience",
  "Product",
  "Sales",
  "Marketing",
  "Unsure",
];

const SCHEDULING_URL = "https://cal.com/refactrd/technical-discovery-call";

export default function TransformationDiagnosticPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleSubmit = async () => {
    const { name, company, email, prompt, opportunities, challenges, desired_outcome } = form;

    if (!name || !company || !email || !prompt || opportunities.length === 0 || !challenges || !desired_outcome) {
      setError("Please fill in all required fields and select at least one opportunity area.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await fetch("/api/submit-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, opportunities: form.opportunities.join(", ") }),
      });
    } catch {
      // Non-blocking — proceed to scheduling regardless
    } finally {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white";
  const labelCls = "block font-clash font-semibold text-sm text-[#1F2A44] mb-1.5";

  return (
    <main className="min-h-screen">
      <Header />

      {/* ══ HERO ══ */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-36 pb-16 md:pt-40 md:pb-20"
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            <div className={`mb-5 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F2A44]/8 text-[#1F2A44] rounded-full text-xs font-clash font-bold uppercase tracking-[0.16em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F2A44]" />
                AI Opportunity Diagnostic
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Discover Where AI Creates The Most Value
            </h1>

            <p className={`font-jakarta text-base lg:text-lg text-[#5a6580] leading-relaxed max-w-2xl mx-auto mb-3 transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              A focused assessment designed to help you identify opportunities, understand operational challenges, and determine where AI can create meaningful impact.
              <span className="block mt-2">Complete the intake below before scheduling your diagnostic session.</span>
            </p>

            <p className={`font-clash text-sm font-semibold text-[#1F2A44]/60 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Designed for organizations exploring AI adoption.
            </p>
          </div>
        </div>
      </section>

      {/* ══ FORM / CONFIRMATION ══ */}
      <section className="bg-[#F4F6F9] py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-[680px] mx-auto">

          {submitted ? (
            <div className="bg-white rounded-3xl border border-[#DDE3EE] shadow-sm p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-[#E6EAF0] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#1F2A44]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-clash font-bold text-[#1F2A44] mb-3">
                Intake Complete
              </h2>
              <p className="font-jakarta text-[#5a6580] leading-relaxed mb-8 max-w-md mx-auto">
                Your responses have been saved. Choose a time for your diagnostic session below.
              </p>

              <a
                href={SCHEDULING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] hover:bg-[#263352] hover:shadow-lg transition-all duration-300 group mb-8"
              >
                Schedule Your Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5 text-left">
                <p className="font-clash font-bold text-[#1F2A44] text-sm mb-3">What to expect</p>
                <ul className="space-y-2.5">
                  {[
                    "Focused 60-minute diagnostic session",
                    "Opportunity mapping across your workflows",
                    "Prioritized recommendations and next steps",
                    "Written brief delivered after the session",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#1F2A44] flex-shrink-0" />
                      <span className="font-jakarta text-sm text-[#5a6580]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#DDE3EE] shadow-sm overflow-hidden">

              {/* Card header */}
              <div className="bg-[#1F2A44] px-8 py-7 md:px-10">
                <h2 className="font-clash font-bold text-white text-xl mb-1">Diagnostic Intake</h2>
                <p className="font-jakarta text-white/55 text-sm">Help us understand your organization before the session.</p>
              </div>

              <div className="px-6 py-8 md:px-10 md:py-10 space-y-6">

                {/* Name + Company */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Company Name *</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Your company" className={inputCls} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls}>Your Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className={inputCls} />
                </div>

                {/* Prompt */}
                <div>
                  <label className={labelCls}>What prompted you to explore AI right now? *</label>
                  <textarea
                    name="prompt"
                    value={form.prompt}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us what sparked the conversation internally."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Opportunity areas — checkboxes */}
                <div>
                  <label className={`${labelCls} mb-3`}>Where do you believe the biggest opportunities exist? *</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {opportunityAreas.map((area) => {
                      const checked = form.opportunities.includes(area);
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleOpportunity(area)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left font-jakarta text-sm transition-all duration-150 ${
                            checked
                              ? "border-[#1F2A44] bg-[#1F2A44] text-white"
                              : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#94A3B8]"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                            checked ? "border-white bg-white" : "border-[#CBD5E1]"
                          }`}>
                            {checked && (
                              <svg className="w-2.5 h-2.5 text-[#1F2A44]" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

                {/* Challenges */}
                <div>
                  <label className={labelCls}>What are the biggest operational challenges today? *</label>
                  <textarea
                    name="challenges"
                    value={form.challenges}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe bottlenecks, inefficiencies, or recurring challenges."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Desired outcome */}
                <div>
                  <label className={labelCls}>What outcome would make this diagnostic valuable? *</label>
                  <textarea
                    name="desired_outcome"
                    value={form.desired_outcome}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What would success look like after this engagement?"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <p className="font-jakarta text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="h-px bg-[#E8ECF2]" />

                {/* Submit */}
                <div className="space-y-3">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                    ) : (
                      <>Continue To Scheduling <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
                    )}
                  </button>
                  <p className="font-jakarta text-xs text-[#94A3B8] text-center">
                    We&apos;ll use this information to prepare for your session.
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
