'use client';

import { Check } from 'lucide-react';
import { ProjectDetail } from '@/data/pricingCalculator';
import { Currency, formatPriceRange } from '@/lib/currencyUtils';
import { trackEvent } from '@/lib/analytics';

interface ProjectDetailsQuestionProps {
  options: ProjectDetail[];
  currency: Currency;
  onSelect: (detailId: string) => void;
}

export default function ProjectDetailsQuestion({
  options,
  currency,
  onSelect,
}: ProjectDetailsQuestionProps) {
  const handleSelect = (detail: ProjectDetail) => {
    trackEvent('pricing_calculator_step_completed', {
      step_number: 2,
      step_name: 'project_details',
      answer: detail.id,
    });
    onSelect(detail.id);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {options.map((detail) => (
        <button
          key={detail.id}
          onClick={() => handleSelect(detail)}
          className="group text-left p-6 bg-white rounded-2xl border-2 border-[#CBD5E1] hover:border-[#5B6CFF] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Title */}
          <h3 className="text-xl font-clash font-bold text-[#1F2A44] mb-2 transition-colors duration-300">
            {detail.title}
          </h3>

          {/* Description */}
          <p className="font-clash text-[#64748B] text-sm mb-4">{detail.description}</p>

          {/* Price estimate */}
          <div className="pt-4 border-t border-[#E6EAF0] flex items-center justify-between">
            <div>
              <p className="font-clash text-xs text-[#64748B] mb-1">Estimated range</p>
              <p className="text-lg font-clash font-medium">
                {formatPriceRange(
                  detail.estimatedPrice.min,
                  detail.estimatedPrice.max,
                  currency
                )}
              </p>
            </div>

            {/* Select indicator */}
            <div className="w-10 h-10 rounded-full border-2 border-[#CBD5E1] group-hover:border-[#A2D2FF] group-hover:bg-[#A2D2FF] flex items-center justify-center transition-all duration-300">
              <Check className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}