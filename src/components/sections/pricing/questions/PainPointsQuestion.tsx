'use client';

import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { painPointOptions } from '@/data/pricingCalculator';
import { trackEvent } from '@/lib/analytics';

interface PainPointsQuestionProps {
  onSubmit: (painPoints: string[]) => void;
}

export default function PainPointsQuestion({
  onSubmit,
}: PainPointsQuestionProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');

  const toggleSelection = (painPoint: string) => {
    if (selected.includes(painPoint)) {
      setSelected(selected.filter((p) => p !== painPoint));
    } else {
      setSelected([...selected, painPoint]);
    }
  };

  const handleSubmit = () => {
    const finalSelection = selected.includes('Other')
      ? [...selected.filter((p) => p !== 'Other'), `Other: ${otherText}`]
      : selected;

    trackEvent('pricing_calculator_step_completed', {
      step_number: 4,
      step_name: 'pain_points',
      answer: finalSelection.join(', '),
      count: finalSelection.length,
    });

    onSubmit(finalSelection);
  };

  const isOtherSelected = selected.includes('Other');
  const canSubmit = selected.length > 0 && (!isOtherSelected || otherText.trim());

  return (
    <div>
      {/* Options grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {painPointOptions.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <button
              key={option}
              onClick={() => toggleSelection(option)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[#5B6CFF] bg-[#5B6CFF]/5'
                  : 'border-[#CBD5E1] hover:border-[#A2D2FF]'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'border-[#5B6CFF] bg-[#5B6CFF]'
                      : 'border-[#CBD5E1]'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>

                {/* Text */}
                <span
                  className={`text-sm font-clash ${
                    isSelected ? 'text-[#1F2A44] font-semibold' : 'text-[#64748B]'
                  }`}
                >
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Other text input */}
      {isOtherSelected && (
        <div className="mb-8">
          <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
            Please specify:
          </label>
          <input
            type="text"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Describe your main challenge..."
            className="w-full px-4 py-3 border-2 border-[#CBD5E1] rounded-lg focus:border-[#5B6CFF] focus:outline-none transition-colors duration-300 font-clash"
            autoFocus
          />
        </div>
      )}

      {/* Continue button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-clash font-bold transition-all duration-300 ${
          canSubmit
            ? 'bg-[#5B6CFF] text-white hover:bg-[#1F2A44] hover:scale-105'
            : 'bg-[#E6EAF0] text-[#64748B] cursor-not-allowed'
        }`}
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="mt-4 text-sm text-[#64748B]">
        Selected {selected.length} pain point{selected.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}