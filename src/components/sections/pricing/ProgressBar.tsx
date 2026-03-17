'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="h-2 bg-[#E6EAF0] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#A2D2FF] to-[#5B6CFF] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step counter */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-[#64748B] font-clash">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-[#64748B font-clash font-semibold">
          {Math.round(progress)}% Complete
        </span>
      </div>
    </div>
  );
}