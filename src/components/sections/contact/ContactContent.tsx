"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight, Loader2, CheckCircle, Clock } from "lucide-react";
import ServiceFAQAccordion from "@/components/sections/services/ServiceFAQAccordion";

const serviceOptions = [
  "Workflow Transformation",
  "Knowledge Systems & AI Assistants",
  "Intelligent Operations",
  "AI-Enabled Products",
  "Not Sure Yet",
];

const timelineOptions = [
  "Immediately",
  "Within 30 Days",
  "1–3 Months",
  "3–6 Months",
  "Exploring Options",
];

const whyRefactrd = {
  label: "Why Refactrd",
  heading: "Practical advice before practical AI.",
  body: [
    "Every conversation begins with understanding your organization, your goals, and the challenges you're trying to solve.",
    "Only then do we recommend the most appropriate service and the best way forward.",
  ],
};

const nextSteps = [
  {
    num: "01",
    title: "We'll review your inquiry.",
    body: "We'll take time to understand your goals, challenges, and the service you're interested in before recommending a next step.",
  },
  {
    num: "02",
    title: "We'll schedule an introductory conversation.",
    body: "If there's a good fit, we'll arrange a conversation to learn more about your organization and explore your objectives in greater detail.",
  },
  {
    num: "03",
    title: "We'll recommend the best path forward.",
    body: "Based on what we learn, we'll recommend the most appropriate service or combination of services to help you achieve your goals.",
  },
];

const faqs = [
  {
    question: "Do I need to know which service I need?",
    answer:
      "No. If you're unsure, simply select Not Sure Yet and tell us about your goals. We'll help determine the most appropriate service based on your objectives.",
  },
  {
    question: "Is there any obligation after submitting an inquiry?",
    answer:
      "No. Your first conversation is simply an opportunity for us to understand your organization, discuss your goals, and determine whether we're the right fit to work together.",
  },
  {
    question: "Who should contact Refactrd?",
    answer:
      "We work with founders, executives, operations leaders, innovation teams, and organizations looking to improve how work gets done through practical AI.",
  },
  {
    question: "What happens after we submit the form?",
    answer:
      "We'll review your inquiry and contact you within one business day if there's a good fit for an introductory conversation.",
  },
];

export default function ContactContent() {
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
    service: "",
    challenge: "",
    successOutcome: "",
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
    const { name, company, email, role, challenge, successOutcome } = form;
    if (!name || !company || !email || !role || !challenge || !successOutcome) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await fetch("/api/submit-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          company,
          email,
          role,
          situation: form.service || "Not Sure Yet",
          challenges: challenge,
          desired_outcome: successOutcome,
          goals: form.timeline,
        }),
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
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative bg-[#1F2A44] overflow-hidden pt-32 pb-0 md:pt-48"
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
            {/* Left: copy + CTA */}
            <div className="pb-16 lg:pb-20 max-w-2xl">
              <div className={`mb-6 transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                <span className="font-clash font-bold text-[10px] uppercase tracking-[0.22em] text-[#A2D2FF]/60">
                  Let&apos;s Start The Conversation
                </span>
              </div>

              <h1
                className={`font-clash font-bold text-white leading-[1.06] tracking-tight mb-6 transition-all duration-700 delay-75
                  text-[36px] sm:text-[48px] lg:text-[56px]
                  ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Talk With Refactrd
              </h1>

              <div className={`space-y-4 mb-8 transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                <p className="font-jakarta text-white/70 text-[15px] sm:text-base leading-relaxed">
                  Tell us what you&apos;re trying to achieve.
                </p>
                <p className="font-jakarta text-white/70 text-[15px] sm:text-base leading-relaxed">
                  We&apos;ll review your inquiry and be in touch within one business day.
                </p>
              </div>

              <div className={`transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                <a
                  href="#start"
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-[15px] transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
                >
                  Talk With Refactrd
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <p className="font-jakarta text-white/40 text-sm mt-4 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#A2D2FF]/60 flex-shrink-0" />
                  Typical response time: Within one business day.
                </p>
              </div>
            </div>

            {/* Right: "Why Refactrd" card — flush to bottom */}
            <div className={`hidden lg:flex flex-col self-end transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="bg-white rounded-t-2xl overflow-hidden px-7 py-7">
                <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3">
                  {whyRefactrd.label}
                </p>
                <p className="font-clash font-bold text-[#1F2A44] text-[19px] leading-snug mb-4">
                  {whyRefactrd.heading}
                </p>
                <div className="space-y-3">
                  {whyRefactrd.body.map((paragraph, i) => (
                    <p key={i} className="font-jakarta text-[#475569] text-[13px] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile "Why Refactrd" card */}
      <div className="lg:hidden bg-white border-b border-[#E8ECF2]">
        <div className="container-custom py-6">
          <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-2">
            {whyRefactrd.label}
          </p>
          <p className="font-clash font-bold text-[#1F2A44] text-[17px] leading-snug mb-3">
            {whyRefactrd.heading}
          </p>
          <div className="space-y-2">
            {whyRefactrd.body.map((paragraph, i) => (
              <p key={i} className="font-jakarta text-[#475569] text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT HAPPENS NEXT */}
      <section className="bg-[#F8FAFC] border-b border-[#E8ECF2] py-14 md:py-16">
        <div className="container-custom">
          <p className="font-clash font-bold text-[9px] uppercase tracking-[0.22em] text-[#94A3B8] mb-10">What To Expect</p>
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-10">
            {nextSteps.map((s) => (
              <div key={s.num} className="flex flex-col gap-3">
                <span className="font-clash font-bold text-[#A2D2FF] text-sm">{s.num}</span>
                <h3 className="font-clash font-bold text-[#1F2A44] text-[17px] leading-snug">{s.title}</h3>
                <p className="font-jakarta text-[#64748B] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="start" className="bg-[#F4F6F9] py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          {submitted ? (
            <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
              <div className="bg-[#1F2A44] px-7 py-6">
                <h3 className="font-clash font-bold text-white text-lg mb-1">Inquiry Received</h3>
                <p className="font-jakarta text-white/50 text-sm">We&apos;ll be in touch to arrange an introductory conversation.</p>
              </div>
              <div className="px-7 py-10 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#A2D2FF]/15 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-[#1F2A44]" />
                </div>
                <div>
                  <p className="font-clash font-bold text-[#1F2A44] text-xl mb-2">Thank you, {form.name}.</p>
                  <p className="font-jakarta text-[#64748B] text-base leading-relaxed max-w-md">
                    We&apos;ve received your inquiry for {form.company}. A member of the Refactrd team will review it and reach out within 1 business day to arrange an introductory conversation.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
              <div className="bg-[#1F2A44] px-7 py-6">
                <h3 className="font-clash font-bold text-white text-lg mb-1">Start The Conversation</h3>
                <p className="font-jakarta text-white/50 text-sm">Tell us about your organization and what you&apos;re hoping to accomplish.</p>
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
                    <label className={labelCls}>Work Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Role *</label>
                    <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. CTO, Product Manager" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Which service are you interested in?</label>
                  <div className="space-y-2 mt-1">
                    {serviceOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors duration-200 ${
                          form.service === opt ? "border-[#1F2A44] bg-[#1F2A44]/5" : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={opt}
                          checked={form.service === opt}
                          onChange={handleChange}
                          className="w-4 h-4 accent-[#1F2A44] flex-shrink-0"
                        />
                        <span className="font-jakarta text-sm text-[#1F2A44]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Tell us about your challenge. *</label>
                  <textarea
                    name="challenge"
                    value={form.challenge}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What prompted you to reach out today?"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelCls}>What would success look like? *</label>
                  <textarea
                    name="successOutcome"
                    value={form.successOutcome}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe the outcome you're hoping to achieve."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelCls}>When are you looking to get started?</label>
                  <select name="timeline" value={form.timeline} onChange={handleChange} className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="">Select an option</option>
                    {timelineOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
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
                      : <>Send Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
                    }
                  </button>
                  <p className="font-jakarta text-xs text-[#94A3B8] text-center">
                    We&apos;ll review every inquiry personally and arrange an introductory conversation if we&apos;re a good fit.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#F9FAFC]">
        <div className="container-custom max-w-3xl">
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">FAQ</span>
          <h2 className="mt-2 mb-8 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight">
            Frequently Asked Questions
          </h2>
          <ServiceFAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* FINAL SECTION */}
      <section className="bg-white py-16 md:py-20 border-t border-[#E8ECF2]">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-clash font-bold text-[#1F2A44] mb-4 leading-tight">
            Ready To Create Operational Impact?
          </h2>
          <p className="font-jakarta text-[#5a6580] text-base sm:text-lg leading-relaxed mb-3">
            Whether you&apos;re exploring an idea or planning a larger transformation initiative, we&apos;re here to help you identify meaningful opportunities and determine the best way forward.
          </p>
          <p className="font-jakarta text-[#94A3B8] text-sm">
            We&apos;ll review every inquiry personally and respond within one business day.
          </p>
        </div>
      </section>
    </>
  );
}
