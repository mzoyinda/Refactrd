'use client';

import { TOTAL_QUESTIONS } from '@/data/diagonisticQuestions';
import { getProgressPercentage } from '@/lib/diagnosticCalculations';

interface ProgressBarProps {
  currentQuestion: number; // 1-indexed (1-16)
}

export default function ProgressBar({ currentQuestion }: ProgressBarProps) {
  const percentage = getProgressPercentage(currentQuestion, TOTAL_QUESTIONS);

  return (
    <div className="w-full bg-white border-b border-[#CBD5E1] py-4 px-4 sticky top-0 z-50">
      <div className="max-w-2xl mx-auto">
        {/* Progress text */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-clash font-semibold text-[#1F2A44]">
            Question {currentQuestion} of {TOTAL_QUESTIONS}
          </span>
          <span className="text-sm font-clash font-semibold text-[#64748B]">
            {percentage}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-[#E6EAF0] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#a2d2ff] to-[#5B6CFF] transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}