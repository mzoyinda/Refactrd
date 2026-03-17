'use client';

import { Check, Wrench, TrendingUp, Zap } from 'lucide-react';
import { supportOptions } from '@/data/pricingCalculator';
import { Currency, formatPrice } from '@/lib/currencyUtils';
import { trackEvent } from '@/lib/analytics';

interface SupportQuestionProps {
  currency: Currency;
  onSelect: (supportId: string) => void;
}

const supportIcons = {
  none: Wrench,
  systems: Wrench,
  growth: TrendingUp,
  infrastructure: Zap,
};

export default function SupportQuestion({
  currency,
  onSelect,
}: SupportQuestionProps) {
  const handleSelect = (supportId: string) => {
    trackEvent('pricing_calculator_step_completed', {
      step_number: 4,
      step_name: 'support',
      answer: supportId,
    });
    onSelect(supportId);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {supportOptions.map((option) => {
        const Icon = supportIcons[option.id as keyof typeof supportIcons];

        return (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className="group text-left p-6 bg-white rounded-2xl border-2 border-[#CBD5E1] hover:border-[#5B6CFF] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon & Title */}
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#E6EAF0] flex items-center justify-center transition-all duration-300">
                <Icon className="w-6 h-6 text-[#64748B]  transition-colors duration-300" />
              </div>

              <div className="w-8 h-8 rounded-full border-2 border-[#CBD5E1] group-hover:border-[#A2D2FF] group-hover:bg-[#A2D2FF] flex items-center justify-center transition-all duration-300">
                <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-clash font-bold text-[#1F2A44] mb-2 transition-colors duration-300">
              {option.title}
            </h3>

            {/* Description */}
            <p className="font-clash text-[#64748B] text-sm mb-4">{option.description}</p>

            {/* Price */}
            {option.monthlyCost > 0 && (
              <div className="pt-4 border-t border-[#E6EAF0]">
                <p className="text-sm text-[#64748B] mb-1 font-clash">Monthly cost</p>
                <p className="text-lg font-clash font-medium">
                  {formatPrice(option.monthlyCost, currency)}/month
                </p>
              </div>
            )}

            {option.monthlyCost === 0 && (
              <div className="pt-4 border-t border-[#E6EAF0]">
                <p className="text-sm font-clash font-semibold text-[#10B981]">
                  No ongoing costs
                </p>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}