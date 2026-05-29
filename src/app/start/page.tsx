"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1 to 3 months",
  "3 to 6 months",
  "Just exploring for now",
];

const teamSizeOptions = [
  "Just me",
  "2 to 5 people",
  "6 to 20 people",
  "21 to 50 people",
  "50+ people",
];

const howHeardOptions = [
  "LinkedIn",
  "Instagram",
  "Google Search",
  "Word of mouth",
  "A referral",
  "Newsletter",
  "Other",
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
    timeline: "",
    team_size: "",
    how_heard: "",
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
    const { name, company, email, what_to_build, timeline, team_size } = form;

    if (!name || !company || !email || !what_to_build || !timeline || !team_size) {
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
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-32 pb-16"
      >
        <div className="container-custom w-full relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`mb-6 transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-block px-4 py-2 bg-[#A2D2FF]/20 text-[#1F2A44] rounded-full text-sm font-clash font-semibold uppercase tracking-wider">
                ✱ Ready to Get Started
              </span>
            </div>

            <h1
              className={`text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Tell us what you{" "}
              <span className="relative inline-block">
                want to build.
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#A2D2FF]" />
              </span>
            </h1>

            <p
              className={`font-clash text-lg lg:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              You have a specific problem and you are ready to move. Fill in the brief below and we will respond within 24 hours. A real reply from a real person.
            </p>
          </div>
        </div>

        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ── FORM / CONFIRMATION ────────────────────────────── */}
      <section className="bg-[#F4F6F9] py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              /* ── CONFIRMATION STATE ── */
              <div className="bg-white rounded-3xl border-2 border-[#DDE3EE] p-10 text-center">
                <div className="w-16 h-16 bg-[#E6EAF0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-[#1F2A44]" />
                </div>
                <h2 className="text-3xl font-clash font-bold text-[rgb(31,42,68)] mb-4">
                  We have received your brief.
                </h2>
                <p className="font-jakarta text-[#64748B] leading-relaxed mb-4">
                  Someone from the Refactrd team will review it personally and respond within 24 hours. We will either reach out to schedule a scoping call or, if a consultation is a better fit for where you are, we will explain why and point you in the right direction.
                </p>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5 text-left mb-8">
                  <p className="font-clash font-semibold text-[#1F2A44] text-sm mb-1">
                    What to expect next
                  </p>
                  <ul className="space-y-2 mt-3">
                    {[
                      "Response within 24 hours",
                      "No auto-generated proposals",
                      "No generic responses",
                      "A real reply from a real person",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#0e5d7d] flex-shrink-0" />
                        <span className="font-jakarta text-sm text-[#64748B]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-jakarta text-sm text-[#94A3B8]">
                  Check your inbox. We also sent you a copy of your brief.
                </p>
              </div>
            ) : (
              /* ── FORM STATE ── */
              <div className="bg-white rounded-3xl border-2 border-[#DDE3EE] overflow-hidden">
                {/* Form header */}
                <div className="bg-[#1F2A44] px-10 py-8">
                  <h2 className="font-clash font-bold text-white text-xl mb-1">
                    Your Brief
                  </h2>
                  <p className="font-jakarta text-white text-sm">
                    All fields marked * are required
                  </p>
                </div>

                <div className="px-10 py-10 space-y-6">
                  {/* Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-clash font-semibold text-sm text-[#1F2A44]">
                        Your name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-clash font-semibold text-sm text-[#1F2A44]">
                        Company name *
                      </label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="font-clash font-semibold text-sm text-[#1F2A44]">
                      Your email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@yourcompany.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200"
                    />
                  </div>

                  {/* What to build */}
                  <div className="space-y-2">
                    <label className="font-clash font-semibold text-sm text-[#1F2A44]">
                      What do you want to build or automate? *
                    </label>
                    <p className="font-jakarta text-xs text-[#94A3B8]">
                      2 to 4 sentences. Be as specific as possible.
                    </p>
                    <textarea
                      name="what_to_build"
                      value={form.what_to_build}
                      onChange={handleChange}
                      rows={5}
                      placeholder="We want to automate our customer onboarding process. Currently our team spends 3 hours per new client setting up accounts manually across 4 different tools..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Timeline + Team size */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-clash font-semibold text-sm text-[#1F2A44]">
                        What is your rough timeline? *
                      </label>
                      <select
                        name="timeline"
                        value={form.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select timeline</option>
                        {timelineOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="font-clash font-semibold text-sm text-[#1F2A44]">
                        How many people on your team? *
                      </label>
                      <select
                        name="team_size"
                        value={form.team_size}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select team size</option>
                        {teamSizeOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* How heard */}
                  <div className="space-y-2">
                    <label className="font-clash font-semibold text-sm text-[#1F2A44]">
                      How did you hear about Refactrd?
                    </label>
                    <select
                      name="how_heard"
                      value={form.how_heard}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select an option (optional)</option>
                      {howHeardOptions.map((opt) => (
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

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-semibold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending your brief...
                      </>
                    ) : (
                      <>
                        Send My Brief
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>

                  <p className="font-jakarta text-xs text-[#94A3B8] text-center">
                    We will respond within 24 hours. No spam, no auto-replies.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}