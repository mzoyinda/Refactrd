'use client';

import { DollarSign, Check } from 'lucide-react';
import { budgetOptions } from '@/data/pricingCalculator';
import { Currency, formatPriceRange } from '@/lib/currencyUtils';
import { trackEvent } from '@/lib/analytics';

interface BudgetQuestionProps {
  currency: Currency;
  onSelect: (budgetId: string) => void;
}

export default function BudgetQuestion({
  currency,
  onSelect,
}: BudgetQuestionProps) {
  const handleSelect = (budgetId: string) => {
    trackEvent('pricing_calculator_step_completed', {
      step_number: 2,
      step_name: 'budget',
      answer: budgetId,
    });
    onSelect(budgetId);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {budgetOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => handleSelect(option.id)}
          className="group text-center p-6 bg-white rounded-2xl border-2 border-[#CBD5E1] hover:border-[#5B6CFF] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Icon */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#E6EAF0] group-hover:bg-[#5B6CFF] flex items-center justify-center transition-all duration-300">
            <DollarSign className="w-7 h-7 text-[#64748B] group-hover:text-white transition-colors duration-300" />
          </div>

          {/* Label */}
          <h3 className="text-lg font-clash font-bold text-[#1F2A44] mb-2 group-hover:text-[#5B6CFF] transition-colors duration-300">
            {option.range
              ? formatPriceRange(option.range.min, option.range.max, currency)
              : option.label}
          </h3>

          {/* Check indicator */}
          <div className="mt-4 w-8 h-8 mx-auto rounded-full border-2 border-[#CBD5E1] group-hover:border-[#5B6CFF] group-hover:bg-[#5B6CFF] flex items-center justify-center transition-all duration-300">
            <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      ))}
    </div>
  );
}