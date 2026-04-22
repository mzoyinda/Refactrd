"use client";

import { useState } from "react";
import { Users, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { ContextData, TEAM_SIZES } from "@/app/types/diagonistic";

interface ContextEnrichmentScreenProps {
  onComplete: (context: ContextData) => void;
}

export default function ContextEnrichmentScreen({
  onComplete,
}: ContextEnrichmentScreenProps) {
  const [teamSize, setTeamSize] = useState<ContextData["teamSize"] | "">("");
  const [openChallenge, setOpenChallenge] = useState("");

  const handleSubmit = () => {
    if (teamSize) {
      onComplete({
        teamSize,
        openChallenge: openChallenge.trim() || undefined,
      });
    }
  };

  const isValid = teamSize !== "";
  const remainingChars = 300 - openChallenge.length;

  return (
    <div className="min-h-screen bg-black/75 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header - More Dynamic */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#a2d2ff] rounded-full mb-4 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#1F2A44]" />
            <span className="text-sm font-clash font-bold text-[#1F2A44]">
              Step 2 of 2
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-clash font-bold text-white mb-4">
            One Last Thing...
          </h1>
          <p className="text-xl text-white/90 font-jakarta">
            Help us personalize your AI roadmap
          </p>
        </div>

        {/* Interactive Form Card - More Visual */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Question 1: Team Size - Card Style */}
          <div className="mb-10">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#a2d2ff] flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#1F2A44]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-clash font-bold text-[#1F2A44] mb-1">
                  How large is your team?
                </h2>
                <p className="text-sm text-[#64748B] font-jakarta">
                  Select the option that best describes your organization
                </p>
              </div>
            </div>

            {/* Team Size Options - Bigger, More Obvious */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEAM_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setTeamSize(size)}
                  className={`group relative p-5 rounded-xl border-3 transition-all duration-300 text-left ${
                    teamSize === size
                      ? "border-[#a2d2ff] bg-[#a2d2ff]/10 shadow-xl scale-[1.02]"
                      : "border-[#E6EAF0] bg-white hover:border-[#a2d2ff] hover:shadow-lg hover:scale-[1.01]"
                  }`}
                >
                  {/* Radio indicator */}
                  <div className="absolute top-5 right-5">
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        teamSize === size
                          ? "border-[#1F2A44] bg-[#1F2A44]"
                          : "border-[#CBD5E1] group-hover:border-[#a2d2ff]"
                      }`}
                    >
                      {teamSize === size && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                  </div>

                  <div className="pr-8">
                    <span className="text-lg font-clash font-bold text-[#1F2A44] block mb-1">
                      {size}
                    </span>
                    {size === "Just me" && (
                      <span className="text-sm text-[#64748B] font-jakarta">
                        Solo founder or freelancer
                      </span>
                    )}
                    {size === "2 to 5" && (
                      <span className="text-sm text-[#64748B] font-jakarta">
                        Small team
                      </span>
                    )}
                    {size === "6 to 15" && (
                      <span className="text-sm text-[#64748B] font-jakarta">
                        Growing team
                      </span>
                    )}
                    {size === "16 to 30" && (
                      <span className="text-sm text-[#64748B] font-jakarta">
                        Mid-size team
                      </span>
                    )}
                    {size === "30 plus" && (
                      <span className="text-sm text-[#64748B] font-jakarta">
                        Large organization
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Validation hint */}
            {!teamSize && (
              <p className="mt-3 text-sm text-amber-600 font-jakarta flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600" />
                Please select your team size to continue
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t-2 border-[#E6EAF0] my-8" />

          {/* Question 2: Challenge - Textarea Style */}
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#E6EAF0] flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-[#1F2A44]" />
              </div>
              <div className="flex-1">
                <h2 className="lg:text-2xl text-lg font-clash font-bold text-[#1F2A44] mb-1">
                  If you had a magic wand, what’s that one task you’d wish to
                  take off your table
                  <span className="text-base font-normal text-[#64748B] ml-2">
                    (Optional)
                  </span>
                </h2>
                <p className="text-sm text-[#64748B] font-jakarta">
                  This helps us tailor specific recommendations for your
                  situation
                </p>
              </div>
            </div>

            {/* Textarea with placeholder animation */}
            <div className="relative">
              <textarea
                value={openChallenge}
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    setOpenChallenge(e.target.value);
                  }
                }}
                placeholder="Example: We spend too much time manually copying data between tools, and our team struggles to find the latest versions of documents..."
                // className="w-full h-36 px-5 py-4 border border-black rounded-xl focus:outline-none focus:border-black focus:shadow-lg transition-all font-jakarta text-[#1F2A44] placeholder:text-[#94A3B8] resize-none"
                className="w-full h-36 px-5 py-4 rounded-xl 
    font-jakarta text-[#1F2A44] placeholder:text-[#94A3B8] 
    resize-none bg-white
    border-3 border-[#CBD5E1]
    focus:border-[#1F2A44] focus:ring-4 focus:ring-[#a2d2ff]/20 
    hover:border-[#94A3B8]
    transition-all shadow-sm"
                style={{
                  border: "3px solid #CBD5E1", // ← Inline style overrides CSS reset
                  outline: "none",
                }}
              />

              {/* Character counter - more prominent */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span
                  className={`text-xs font-clash font-semibold ${
                    remainingChars < 50 ? "text-amber-600" : "text-[#64748B]"
                  }`}
                >
                  {remainingChars} / 300
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm text-[#64748B] font-jakarta italic">
              💡 Tip: Be specific! Mention tools, processes, or pain points for
              better insights
            </p>
          </div>

          {/* Submit Button - Bigger, More Obvious */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full py-5 rounded-xl font-clash font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 ${
              !isValid
                ? "bg-[#E6EAF0] text-[#94A3B8] cursor-not-allowed"
                : "bg-[#1F2A44] text-[#E6EAF0]  hover:shadow-2xl hover:scale-[1.02] shadow-xl"
            }`}
          >
            <span>
              {isValid ? "Get My AI Roadmap" : "Select Team Size First"}
            </span>
            <ArrowRight
              className={`w-6 h-6 ${isValid ? "animate-pulse" : ""}`}
            />
          </button>
        </div>

        {/* Footer - More Reassuring */}
        <p className="text-center text-sm text-white/80 font-jakarta mt-6">
          🔒 Your information is confidential and will only be used to generate
          your personalized report
        </p>
      </div>
    </div>
  );
}
