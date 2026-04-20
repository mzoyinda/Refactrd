'use client';

import { useState } from 'react';
import { Users, MessageSquare, ArrowRight } from 'lucide-react';
import { ContextData, TEAM_SIZES } from '@/app/types/diagonistic';

interface ContextEnrichmentScreenProps {
  onComplete: (context: ContextData) => void;
}

export default function ContextEnrichmentScreen({
  onComplete,
}: ContextEnrichmentScreenProps) {
  const [teamSize, setTeamSize] = useState<ContextData['teamSize'] | ''>('');
  const [openChallenge, setOpenChallenge] = useState('');

  const handleSubmit = () => {
    if (teamSize) {
      onComplete({
        teamSize,
        openChallenge: openChallenge.trim() || undefined,
      });
    }
  };

  const isValid = teamSize !== '';
  const remainingChars = 300 - openChallenge.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#a2d2ff]/20 border border-[#a2d2ff]/30 rounded-full text-sm font-clash font-semibold text-[#1F2A44] mb-4">
            <span>Almost there!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-clash font-bold text-[#1F2A44] mb-3">
            Tell us a bit more
          </h1>
          <p className="text-[#64748B] font-jakarta tracking-[-0.03em]">
            This helps us give you more relevant insights
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#CBD5E1]">
          {/* Team Size */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-clash font-bold text-[#1F2A44] mb-4">
              <Users className="w-5 h-5 text-[#a2d2ff]" />
              How large is your team?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TEAM_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setTeamSize(size)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left font-jakarta ${
                    teamSize === size
                      ? 'border-[#a2d2ff] bg-[#a2d2ff]/10 shadow-md'
                      : 'border-[#CBD5E1] bg-white hover:border-[#a2d2ff]/50 hover:bg-[#a2d2ff]/5'
                  }`}
                >
                  <span className="font-semibold text-[#1F2A44]">{size}</span>
                  {size === 'Just me' && (
                    <span className="block text-xs text-[#64748B] mt-1">
                      Solo founder or freelancer
                    </span>
                  )}
                  {size === '2 to 5' && (
                    <span className="block text-xs text-[#64748B] mt-1">
                      Small team
                    </span>
                  )}
                  {size === '6 to 15' && (
                    <span className="block text-xs text-[#64748B] mt-1">
                      Growing team
                    </span>
                  )}
                  {size === '16 to 30' && (
                    <span className="block text-xs text-[#64748B] mt-1">
                      Mid-size team
                    </span>
                  )}
                  {size === '30 plus' && (
                    <span className="block text-xs text-[#64748B] mt-1">
                      Large organization
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Open Challenge (Optional) */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-lg font-clash font-bold text-[#1F2A44] mb-2">
              <MessageSquare className="w-5 h-5 text-[#a2d2ff]" />
              What's your biggest operational challenge right now?
            </label>
            <p className="text-sm text-[#64748B] font-jakarta mb-3">
              Optional - but this helps us tailor your recommendations
            </p>

            <textarea
              value={openChallenge}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  setOpenChallenge(e.target.value);
                }
              }}
              placeholder="e.g., We struggle to keep track of customer requests across WhatsApp, email, and Instagram..."
              className="w-full h-32 px-4 py-3 border-2 border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#a2d2ff] transition-colors font-jakarta resize-none"
            />

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-[#64748B] font-jakarta">
                {openChallenge.length === 0
                  ? 'Feel free to skip this'
                  : 'Be specific for better insights'}
              </span>
              <span
                className={`text-xs font-clash font-semibold ${
                  remainingChars < 50 ? 'text-amber-600' : 'text-[#64748B]'
                }`}
              >
                {remainingChars} characters left
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full py-4 rounded-lg font-clash font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              !isValid
                ? 'bg-[#CBD5E1] text-[#94A3B8] cursor-not-allowed'
                : 'bg-[#a2d2ff] text-[#1F2A44] hover:bg-[#8cc2ff] hover:scale-[1.02] shadow-lg'
            }`}
          >
            <span>View My Results</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-[#64748B] font-jakarta mt-6">
          Your results will be calculated and displayed instantly
        </p>
      </div>
    </div>
  );
}