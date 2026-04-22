'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Question } from '@/app/types/diagonistic';

interface QuestionCardProps {
  question: Question;
  zoneName: string;
  subZoneName: string;
  onAnswer: (questionId: string, points: number) => void;
  isLastQuestion?: boolean;
}

export default function QuestionCard({
  question,
  zoneName,
  subZoneName,
  onAnswer,
  isLastQuestion = false,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (points: number, index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const points = question.options[selectedOption].points;
      onAnswer(question.id, points);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Zone & Sub-zone labels */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E6EAF0] rounded-full mb-2">
          <span className="text-xs font-clash font-bold text-[#1F2A44]">
            {zoneName}
          </span>
        </div>
        <p className="text-sm font-clash font-semibold text-[#64748B]">
          {subZoneName}
        </p>
      </div>

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-montserrat font-bold text-[#1F2A44] mb-8 leading-[29px]">
        {question.text}
      </h2>

      {/* Answer options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option.points, index)}
            className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 min-h-[72px] flex items-center ${
              selectedOption === index
                ? 'border-[#a2d2ff] bg-[#a2d2ff]/10 shadow-lg scale-[1.02]'
                : 'border-[#CBD5E1] bg-white hover:border-[#a2d2ff]/50 hover:bg-[#a2d2ff]/5'
            }`}
          >
            {/* Radio indicator */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mr-4 transition-all duration-300 ${
                selectedOption === index
                  ? 'border-[#1F2A44] bg-[#1F2A44]'
                  : 'border-[#CBD5E1]'
              }`}
            >
              {selectedOption === index && (
                <div className="w-full h-full rounded-full bg-white scale-50" />
              )}
            </div>

            {/* Option text */}
            <span className="font-montserrat text-[#1F2A44] leading-relaxed">
              {option.text}
            </span>
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={selectedOption === null}
        className={`w-full py-4 rounded-lg font-clash font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          selectedOption === null
            ? 'bg-[#CBD5E1] text-[#94A3B8] cursor-not-allowed'
            : 'bg-[#1F2A44] text-[#E6EAF0] hover:scale-[1.02]'
        }`}
      >
        <span>{isLastQuestion ? 'Submit Assessment' : 'Next Question'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}