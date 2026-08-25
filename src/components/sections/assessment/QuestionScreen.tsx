"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  OTHER_VALUE,
  PHASES,
  type AssessmentAnswers,
  type Question,
} from "@/lib/assessment/questions";

interface Props {
  question: Question;
  stepIndex: number;
  totalSteps: number;
  answers: AssessmentAnswers;
  canAdvance: boolean;
  isLastStep: boolean;
  onSelectSingle: (key: keyof AssessmentAnswers, value: string) => void;
  onToggleMulti: (key: keyof AssessmentAnswers, value: string) => void;
  onChangeText: (key: keyof AssessmentAnswers, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function QuestionScreen({
  question,
  stepIndex,
  totalSteps,
  answers,
  canAdvance,
  isLastStep,
  onSelectSingle,
  onToggleMulti,
  onChangeText,
  onNext,
  onBack,
}: Props) {
  const otherKey = `${question.key}Other` as keyof AssessmentAnswers;
  const otherText = String(answers[otherKey] || "");
  const otherRef = useRef<HTMLTextAreaElement>(null);

  const selectedValues: string[] = question.multi
    ? (answers[question.key] as string[])
    : [answers[question.key] as string].filter(Boolean);

  const otherSelected = selectedValues.includes(OTHER_VALUE);

  // Focus the free-text field the moment "Something else" is chosen.
  useEffect(() => {
    if (otherSelected) otherRef.current?.focus();
  }, [otherSelected]);

  const activePhaseIndex = PHASES.indexOf(question.phase);
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  const toggle = (value: string) => {
    if (question.multi) onToggleMulti(question.key, value);
    else onSelectSingle(question.key, value);
  };

  return (
    <section className="bg-[#F4F6F9] min-h-[100svh] flex flex-col">
      {/* Progress rail */}
      <div className="sticky top-0 z-20 bg-[#F4F6F9]/95 backdrop-blur-sm border-b border-[#E8ECF2]">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 pt-5 pb-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              {PHASES.map((phase, i) => (
                <span
                  key={phase}
                  className={`font-clash font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.16em] whitespace-nowrap transition-colors duration-300 ${
                    i === activePhaseIndex
                      ? "text-[#1F2A44]"
                      : i < activePhaseIndex
                        ? "text-[#94A3B8]"
                        : "text-[#CBD5E1]"
                  } ${i === activePhaseIndex ? "" : "hidden sm:inline"}`}
                >
                  {phase}
                  {i < PHASES.length - 1 && <span className="mx-2 text-[#CBD5E1] hidden sm:inline">/</span>}
                </span>
              ))}
            </div>
            <span className="font-jakarta text-[12px] text-[#94A3B8] tabular-nums flex-shrink-0">
              {stepIndex + 1} of {totalSteps}
            </span>
          </div>

          <div className="h-1 rounded-full bg-[#E2E8F0] overflow-hidden">
            <div
              className="h-full bg-[#1F2A44] rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 max-w-[720px] w-full mx-auto px-4 sm:px-6 py-9 sm:py-14 pb-32 sm:pb-14">
        <div key={question.key} className="assessment-fade-up">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-clash font-bold text-[#A2D2FF] text-[13px]">{question.number}</span>
            <span className="font-clash font-bold text-[10px] uppercase tracking-[0.18em] text-[#94A3B8]">
              {question.title}
            </span>
          </div>

          <h1 className="font-clash font-bold text-[#1F2A44] text-[25px] sm:text-[32px] leading-[1.2] tracking-tight mb-3">
            {question.prompt}
          </h1>

          {question.helper && (
            <p className="font-jakarta text-[#64748B] text-[15px] leading-relaxed mb-8">
              {question.helper}
            </p>
          )}
          {!question.helper && <div className="mb-8" />}

          {/* Options */}
          <div className="space-y-2.5" role={question.multi ? "group" : "radiogroup"}>
            {question.options.map((option) => {
              const selected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggle(option.value)}
                  role={question.multi ? "checkbox" : "radio"}
                  aria-checked={selected}
                  className={`w-full text-left flex items-start gap-4 px-4 sm:px-5 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A44]/30 ${
                    selected
                      ? "border-[#1F2A44] bg-white shadow-[0_1px_3px_rgba(31,42,68,0.08)]"
                      : "border-[#E2E8F0] bg-white/60 hover:border-[#CBD5E1] hover:bg-white"
                  }`}
                >
                  {/* Indicator: square for multi-select, circle for single */}
                  <span
                    className={`flex-shrink-0 mt-0.5 w-[19px] h-[19px] flex items-center justify-center border-2 transition-all duration-200 ${
                      question.multi ? "rounded-[6px]" : "rounded-full"
                    } ${selected ? "border-[#1F2A44] bg-[#1F2A44]" : "border-[#CBD5E1]"}`}
                  >
                    {selected &&
                      (question.multi ? (
                        <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
                      ) : (
                        <span className="w-[7px] h-[7px] rounded-full bg-white" />
                      ))}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`block font-jakarta text-[15px] leading-snug transition-colors duration-200 ${
                        selected ? "text-[#1F2A44] font-semibold" : "text-[#1F2A44] font-medium"
                      }`}
                    >
                      {option.value}
                    </span>
                    {option.description && (
                      <span className="block font-jakarta text-[13.5px] text-[#64748B] leading-relaxed mt-1">
                        {option.description}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Inline "Something else" field */}
          {otherSelected && (
            <div className="mt-4 assessment-fade-up-fast">
              <label
                htmlFor={`${question.key}-other`}
                className="block font-clash font-semibold text-[13px] text-[#1F2A44] mb-2"
              >
                {question.otherPrompt}
              </label>
              <textarea
                id={`${question.key}-other`}
                ref={otherRef}
                value={otherText}
                onChange={(e) => onChangeText(otherKey, e.target.value)}
                rows={3}
                placeholder="In your own words..."
                className="w-full px-4 py-3.5 rounded-xl border border-[#E2E8F0] bg-white font-jakarta text-[15px] text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] focus:ring-4 focus:ring-[#1F2A44]/5 transition-all duration-200 resize-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Actions — sticky on mobile, inline on desktop */}
      <div className="fixed sm:static bottom-0 left-0 right-0 z-20 bg-white sm:bg-transparent border-t sm:border-t-0 border-[#E8ECF2] px-4 py-3.5 sm:px-6 sm:py-0 sm:pb-16">
        <div className="max-w-[720px] mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-3.5 rounded-xl border border-[#E2E8F0] bg-white font-clash font-semibold text-[14px] text-[#475569] transition-all duration-200 hover:border-[#CBD5E1] hover:text-[#1F2A44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A44]/30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={onNext}
            disabled={!canAdvance}
            className="group flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1F2A44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2A44]/40 focus-visible:ring-offset-2"
          >
            {isLastStep ? "See my opportunity" : "Next"}
            <ArrowRight className="w-4 h-4 group-enabled:group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}
