"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  ASSESSMENT_INDUSTRIES,
  TEAM_SIZES,
  type Registration,
} from "@/lib/assessment/questions";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Props {
  values: Registration;
  onChange: (field: keyof Registration, value: string) => void;
  onContinue: () => void;
}

const fieldCls =
  "w-full px-4 py-3.5 rounded-xl border border-[#E2E8F0] bg-white font-jakarta text-[15px] text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] focus:ring-4 focus:ring-[#1F2A44]/5 transition-all duration-200";
const labelCls = "block font-clash font-semibold text-[13px] text-[#1F2A44] mb-2";

export default function RegistrationScreen({ values, onChange, onContinue }: Props) {
  const [touched, setTouched] = useState<Partial<Record<keyof Registration, boolean>>>({});

  const emailValid = EMAIL_PATTERN.test(values.email.trim());
  const complete =
    values.name.trim() !== "" &&
    emailValid &&
    values.industry !== "" &&
    values.companySize !== "";

  const emailError = touched.email && values.email.trim() !== "" && !emailValid;

  return (
    <section className="bg-[#F4F6F9] min-h-[100svh] py-14 sm:py-20">
      <div className="max-w-[620px] mx-auto px-4 sm:px-6">
        <p className="font-clash font-bold text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-3">
          Before we begin
        </p>
        <h1 className="font-clash font-bold text-[#1F2A44] text-[28px] sm:text-[34px] leading-[1.15] tracking-tight mb-3">
          Let&apos;s get you set up.
        </h1>
        <p className="font-jakarta text-[#64748B] text-[15px] leading-relaxed mb-9">
          Four quick details so we know who we&apos;re writing this for and where to send it.
        </p>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="name" className={labelCls}>What should we call you?</label>
            <input
              id="name"
              value={values.name}
              onChange={(e) => onChange("name", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Your name"
              autoComplete="name"
              className={fieldCls}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelCls}>Where should we send your assessment?</label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={emailError || undefined}
              className={`${fieldCls} ${emailError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            />
            {emailError && (
              <p className="font-jakarta text-[13px] text-red-600 mt-2">
                That doesn&apos;t look like a valid email address.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="industry" className={labelCls}>What kind of business do you run?</label>
            <select
              id="industry"
              value={values.industry}
              onChange={(e) => onChange("industry", e.target.value)}
              className={`${fieldCls} appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%2394A3B8%22 stroke-width=%222%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11`}
            >
              <option value="">Select your industry</option>
              {ASSESSMENT_INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className={labelCls}>How large is your team?</legend>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TEAM_SIZES.map((size) => {
                const selected = values.companySize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => onChange("companySize", size)}
                    aria-pressed={selected}
                    className={`px-2 py-3 rounded-xl border font-jakarta text-[13px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A44]/30 ${
                      selected
                        ? "border-[#1F2A44] bg-[#1F2A44] text-white"
                        : "border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="mt-6">
          <button
            onClick={onContinue}
            disabled={!complete}
            className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1F2A44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A44]/40 focus-visible:ring-offset-2"
          >
            Continue
            <ArrowRight className="w-4 h-4 group-enabled:group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <p className="font-jakarta text-[13px] text-[#94A3B8] text-center mt-3">
            We&apos;ll email you a copy. No newsletter, no follow-up spam.
          </p>
        </div>
      </div>
    </section>
  );
}
