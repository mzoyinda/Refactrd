'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { projectTypes, ProjectTypeOption } from '@/data/pricingCalculator';
import { Currency, formatPriceRange } from '@/lib/currencyUtils';
import { trackEvent } from '@/lib/analytics';

interface ProjectTypeQuestionProps {
  currency: Currency;
  onSelect: (projectTypeId: string) => void;
}

export default function ProjectTypeQuestion({
  currency,
  onSelect,
}: ProjectTypeQuestionProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleSelect = (projectType: ProjectTypeOption) => {
    trackEvent('pricing_calculator_step_completed', {
      step_number: 1,
      step_name: 'project_type',
      answer: projectType.id,
    });
    onSelect(projectType.id);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projectTypes.map((projectType) => (
        <div key={projectType.id} className="relative">
          {/* Main card */}
          <button
            onClick={() => handleSelect(projectType)}
            className="w-full text-left p-6 bg-white rounded-2xl border-2 border-[#CBD5E1] hover:border-[#5B6CFF] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            {/* Icon & Title */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{projectType.icon}</span>
                <h3 className="text-xl font-clash font-bold text-[#1F2A44] transition-colors duration-300">
                  {projectType.title}
                </h3>
              </div>

              {/* Info icon for tooltip */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTooltip(
                    activeTooltip === projectType.id ? null : projectType.id
                  );
                }}
                className="p-2 hover:bg-[#E6EAF0] rounded-lg transition-colors duration-200"
              >
                <Info className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>

            {/* Description */}
            <p className="font-clash text-[#64748B] text-sm mb-4">
              {projectType.description}
            </p>

            {/* Price range */}
            {/* {projectType.priceRange.min > 0 && (
              <div className="pt-4 border-t border-[#E6EAF0]">
                <p className="font-clash text-sm text-[#64748B] mb-1">Starting from</p>
                <p className="text-lg font-clash font-medium">
                  {formatPriceRange(
                    projectType.priceRange.min,
                    projectType.priceRange.max,
                    currency
                  )}
                </p>
              </div>
            )} */}
          </button>

          {/* Tooltip popover */}
          {activeTooltip === projectType.id && (
            <>
              {/* Backdrop for mobile */}
              <div
                className="fixed inset-0 z-40 md:hidden"
                onClick={() => setActiveTooltip(null)}
              />

              {/* Tooltip content */}
              <div className="absolute top-full left-0 right-0 md:left-auto md:right-0 md:w-80 mt-2 z-50 bg-white rounded-xl shadow-2xl border-2 border-[#A2D2FF] p-6 animate-fade-in">
                <h4 className="text-lg font-clash font-bold text-[#1F2A44] mb-3">
                  What's included
                </h4>

                <ul className="space-y-2 mb-4">
                  {projectType.examples.map((example, index) => (
                    <li
                      key={index}
                      className="font-clash flex items-start gap-2 text-sm text-[#64748B]"
                    >
                      <span className="text-[#A2D2FF] mt-0.5">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>

                {projectType.priceRange.min > 0 && (
                  <div className="pt-4 border-t border-[#E6EAF0]">
                    {/* <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-clash text-[#64748B]">Investment range</span>
                      <span className="font-clash font-semibold text-[#1F2A44]">
                        {formatPriceRange(
                          projectType.priceRange.min,
                          projectType.priceRange.max,
                          currency
                        )}
                      </span>
                    </div> */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-clash text-[#64748B]">Typical timeline</span>
                      <span className="font-clash font-semibold text-[#1F2A44]">
                        {projectType.timeline}
                      </span>
                    </div>
                  </div>
                )}

                {/* Close button */}
                <button
                  onClick={() => setActiveTooltip(null)}
                  className="mt-4 w-full py-2 text-sm hover:bg-[#E6EAF0] rounded-lg transition-colors duration-200 font-clash font-medium"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}