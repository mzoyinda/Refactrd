"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

const processSteps = [
  {
    num: "01",
    title: "Submit Your Initiative",
    body: "Tell us what you're looking to build.",
  },
  {
    num: "02",
    title: "Initial Discussion",
    body: "Review objectives, requirements, and desired outcomes.",
  },
  {
    num: "03",
    title: "Define The Approach",
    body: "Determine scope, implementation strategy, and success criteria.",
  },
  {
    num: "04",
    title: "Receive A Proposal",
    body: "Review the recommended plan and engagement structure.",
  },
  {
    num: "05",
    title: "Begin Implementation",
    body: "Move forward with delivery and implementation.",
  },
];

const deliverables = [
  "Defined Scope",
  "Implementation Plan",
  "Recommended Next Steps",
];

export default function BuildImplementPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
    initiative: "",
    outcome: "",
    goals: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    const { name, company, email, role, initiative, outcome, goals } = form;
    if (!name || !company || !email || !role || !initiative || !outcome || !goals) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await fetch("/api/submit-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "build-implement" }),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl border border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white";
  const labelCls = "block font-clash font-semibold text-[13px] text-[#1F2A44] mb-1.5";

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

            {/* Left: headline + CTA */}
            <div className="pb-16 lg:pb-20">
              <div className={`mb-8 transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                <span className="font-clash font-bold text-[10px] uppercase tracking-[0.22em] text-[#A2D2FF]/60">
                  Build &amp; Implement
                </span>
              </div>

              <h1
                className={`font-clash font-bold text-white leading-[1.06] tracking-tight mb-8 transition-all duration-700 delay-75
                  text-[36px] sm:text-[48px] lg:text-[52px] xl:text-[60px]
                  ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Move From Idea<br />To Implementation
              </h1>

              <div className={`mb-10 transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                <p className="font-clash font-semibold text-white text-xl mb-2 leading-snug">
                  Already know what you&apos;re trying to build?
                </p>
                <p className="font-jakarta text-white/65 text-[15px] leading-relaxed max-w-lg">
                  We&apos;ll help define the scope, design the right approach, and move from concept to implementation.
                </p>
              </div>

              <div className={`transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                <a
                  href="#get-started"
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-[15px] transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
                >
                  Discuss Your Initiative
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <p className="font-jakarta text-white/30 text-sm mt-3">
                  For organizations ready to move from identified opportunity to implementation.
                </p>
              </div>
            </div>

            {/* Right: info card — flush to bottom */}
            <div className={`hidden lg:flex flex-col self-end transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="bg-white rounded-t-2xl overflow-hidden">

                <div className="px-7 py-6 border-b border-[#F0F3F7]">
                  <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">Best For</p>
                  <p className="font-jakarta text-[#1F2A44] text-[14px] leading-relaxed">
                    Organizations with a defined initiative and a clear understanding of the challenge they want to solve.
                  </p>
                </div>

                <div className="px-7 py-6 border-b border-[#F0F3F7]">
                  <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">You&apos;ll Leave With</p>
                  <ul className="space-y-2">
                    {deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 font-jakarta text-[#475569] text-[13px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-7 py-6">
                  <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">Outcome</p>
                  <p className="font-jakarta text-[#475569] text-[13px] leading-relaxed">
                    A clear path from concept to deployment.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile info cards */}
      <div className="lg:hidden bg-white border-b border-[#E8ECF2]">
        <div className="container-custom">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E8ECF2]">
            <div className="py-6 sm:pr-6">
              <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2">Best For</p>
              <p className="font-jakarta text-[#1F2A44] text-sm leading-relaxed">Organizations with a defined initiative and a clear understanding of the challenge they want to solve.</p>
            </div>
            <div className="py-6 sm:px-6">
              <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2">You&apos;ll Leave With</p>
              <ul className="space-y-1.5">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 font-jakarta text-[#475569] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-6 sm:pl-6">
              <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2">Outcome</p>
              <p className="font-jakarta text-[#475569] text-sm leading-relaxed">A clear path from concept to deployment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#F8FAFC] border-b border-[#E8ECF2] py-14 md:py-16">
        <div className="container-custom">
          <p className="font-clash font-bold text-[9px] uppercase tracking-[0.22em] text-[#94A3B8] mb-10">How It Works</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {processSteps.map((s) => (
              <div key={s.num} className="flex flex-col gap-3">
                <span className="font-clash font-bold text-[#A2D2FF] text-sm">{s.num}</span>
                <h3 className="font-clash font-bold text-[#1F2A44] text-[15px] leading-snug">{s.title}</h3>
                <p className="font-jakarta text-[#64748B] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="get-started" className="bg-[#F4F6F9] py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">

          {submitted ? (
            <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
              <div className="bg-[#1F2A44] px-7 py-6">
                <h3 className="font-clash font-bold text-white text-lg mb-1">Inquiry Received</h3>
                <p className="font-jakarta text-white/50 text-sm">We&apos;ll be in touch shortly to discuss your initiative.</p>
              </div>
              <div className="px-7 py-10 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#A2D2FF]/15 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-[#1F2A44]" />
                </div>
                <div>
                  <p className="font-clash font-bold text-[#1F2A44] text-xl mb-2">Thank you, {form.name}.</p>
                  <p className="font-jakarta text-[#64748B] text-base leading-relaxed max-w-md">
                    We&apos;ve received your initiative inquiry for {form.company}. A member of the Refactrd team will reach out within 1–2 business days to schedule an initial discussion.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="font-clash font-bold text-[#1F2A44] text-2xl sm:text-3xl mb-2">
                  Discuss Your Initiative
                </h2>
                <p className="font-jakarta text-[#94A3B8] text-sm max-w-lg">
                  Tell us about your initiative and we&apos;ll determine the most practical path forward.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
                <div className="bg-[#1F2A44] px-7 py-6">
                  <h3 className="font-clash font-bold text-white text-lg mb-1">Start The Conversation</h3>
                  <p className="font-jakarta text-white/50 text-sm">Tell us what you&apos;re looking to build and what you want to achieve.</p>
                </div>

                <div className="bg-white px-7 py-8 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Organization *</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Your organization" className={inputCls} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Role *</label>
                      <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. CTO, Product Manager" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>What are you looking to build? *</label>
                    <textarea
                      name="initiative"
                      value={form.initiative}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe the initiative, product, or solution you want to implement."
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>What problem does it solve? *</label>
                    <textarea
                      name="outcome"
                      value={form.outcome}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe the operational challenge or opportunity this initiative addresses."
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>What does success look like? *</label>
                    <textarea
                      name="goals"
                      value={form.goals}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe the outcome you're hoping to achieve once this is built."
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
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {loading
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                        : <>Discuss Your Initiative <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
                      }
                    </button>
                    <p className="font-jakarta text-xs text-[#94A3B8] text-center">
                      We&apos;ll review your submission and reach out to schedule an initial discussion.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
