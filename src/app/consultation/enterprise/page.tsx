"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const considerationAreas = [
  "Operations",
  "Knowledge Systems",
  "Customer Experience",
  "Product",
  "Organization-Wide Transformation",
];

const maturityOptions = [
  "Exploring Opportunities",
  "Early Experiments",
  "Active Pilots",
  "Multiple Initiatives Running",
];

export default function ExecutiveDiscoveryPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    role: "",
    why_ai: "",
    areas: [] as string[],
    maturity: "",
    challenges: "",
    outcomes: "",
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

  const toggleArea = (area: string) => {
    setForm((prev) => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter((a) => a !== area)
        : [...prev.areas, area],
    }));
    setError("");
  };

  const handleSubmit = async () => {
    const { name, organization, email, role, why_ai, areas, maturity, challenges, outcomes } = form;

    if (!name || !organization || !email || !role || !why_ai || areas.length === 0 || !maturity || !challenges || !outcomes) {
      setError("Please fill in all required fields and select at least one area.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await fetch("/api/submit-executive-discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, areas: form.areas.join(", ") }),
      });
    } catch {
      // Non-blocking
    } finally {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white";
  const selectCls =
    "w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white appearance-none cursor-pointer";
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
                Executive Discovery
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Build A Roadmap For Adoption
            </h1>

            <p className={`font-jakarta text-base lg:text-lg text-[#5a6580] leading-relaxed max-w-2xl mx-auto mb-3 transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              A structured assessment for leadership teams evaluating broader AI initiatives.
              <span className="block mt-2">Help us understand your organization, priorities, and transformation goals before we begin.</span>
            </p>

            <p className={`font-clash text-sm font-semibold text-[#1F2A44]/60 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Designed for organizations preparing for larger transformation efforts.
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
                Assessment Received
              </h2>
              <p className="font-jakarta text-[#5a6580] leading-relaxed mb-8 max-w-md mx-auto">
                A member of our team will review your assessment and reach out within 24 hours to discuss next steps and schedule the discovery engagement.
              </p>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5 text-left">
                <p className="font-clash font-bold text-[#1F2A44] text-sm mb-3">What happens next</p>
                <ul className="space-y-2.5">
                  {[
                    "Personal review of your assessment within 24 hours",
                    "Initial call to align on scope and objectives",
                    "Structured discovery engagement with your leadership team",
                    "Transformation roadmap delivered at the end of the engagement",
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
                <h2 className="font-clash font-bold text-white text-xl mb-1">Executive Discovery Assessment</h2>
                <p className="font-jakarta text-white/55 text-sm">All fields marked * are required.</p>
              </div>

              <div className="px-6 py-8 md:px-10 md:py-10 space-y-6">

                {/* Name + Organization */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Organization *</label>
                    <input name="organization" value={form.organization} onChange={handleChange} placeholder="Your organization" className={inputCls} />
                  </div>
                </div>

                {/* Email + Role */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Your Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@organization.com" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Role / Position *</label>
                    <input name="role" value={form.role} onChange={handleChange} placeholder="CEO, COO, Director, Head of Operations, etc." className={inputCls} />
                  </div>
                </div>

                {/* Why AI */}
                <div>
                  <label className={labelCls}>Why are you evaluating AI adoption? *</label>
                  <textarea
                    name="why_ai"
                    value={form.why_ai}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the business drivers behind this initiative."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Areas — checkboxes */}
                <div>
                  <label className={`${labelCls} mb-3`}>Which areas are being considered? *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {considerationAreas.map((area) => {
                      const checked = form.areas.includes(area);
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleArea(area)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left font-jakarta text-sm transition-all duration-150 ${
                            checked
                              ? "border-[#1F2A44] bg-[#1F2A44] text-white"
                              : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#94A3B8]"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${checked ? "border-white bg-white" : "border-[#CBD5E1]"}`}>
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

                {/* AI Maturity */}
                <div>
                  <label className={labelCls}>Current AI Maturity *</label>
                  <select name="maturity" value={form.maturity} onChange={handleChange} className={selectCls}>
                    <option value="" disabled>Select current stage</option>
                    {maturityOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Challenges */}
                <div>
                  <label className={labelCls}>What are the biggest organizational challenges today? *</label>
                  <textarea
                    name="challenges"
                    value={form.challenges}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe operational, strategic, or organizational barriers."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Outcomes */}
                <div>
                  <label className={labelCls}>What outcomes are you hoping to achieve? *</label>
                  <textarea
                    name="outcomes"
                    value={form.outcomes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what success looks like."
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
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
                    )}
                  </button>
                  <p className="font-jakarta text-xs text-[#94A3B8] text-center">
                    We&apos;ll review your assessment and prepare the discovery process.
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
