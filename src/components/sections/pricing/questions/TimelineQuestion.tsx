'use client';

import { Clock, Check } from 'lucide-react';
import { timelineOptions } from '@/data/pricingCalculator';
import { trackEvent } from '@/lib/analytics';

interface TimelineQuestionProps {
  onSelect: (timelineId: string) => void;
}

export default function TimelineQuestion({ onSelect }: TimelineQuestionProps) {
  const handleSelect = (timelineId: string, timelineValue: string) => {
    trackEvent('pricing_calculator_step_completed', {
      step_number: 3,
      step_name: 'timeline',
      answer: timelineId,
    });
    onSelect(timelineId);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {timelineOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => handleSelect(option.id, option.value)}
          className="group text-center p-8 bg-white rounded-2xl border-2 border-[#CBD5E1] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E6EAF0] group-hover:bg-[#64748B] flex items-center justify-center transition-all duration-300">
            <Clock className="w-8 h-8 text-[#64748B] group-hover:text-white transition-colors duration-300" />
          </div>

          {/* Label */}
          <h3 className="text-lg font-clash font-bold text-[#1F2A44] mb-2  transition-colors duration-300">
            {option.label}
          </h3>

          {/* Check indicator */}
          <div className="mt-4 w-8 h-8 mx-auto rounded-full border-2 border-[#CBD5E1] group-hover:border-[#A2D2FF] group-hover:bg-[#A2D2FF] flex items-center justify-center transition-all duration-300">
            <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      ))}
    </div>
  );
}