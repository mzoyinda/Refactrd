'use client';

import { useState, useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import { DiagnosticAnswers } from '@/app/types/diagonistic';
import { DIAGNOSTIC_ZONES, getAllQuestions } from '@/data/diagonisticQuestions';

interface DiagnosticQuestionsScreenProps {
  onComplete: (answers: DiagnosticAnswers) => void;
}

export default function DiagnosticQuestionsScreen({
  onComplete,
}: DiagnosticQuestionsScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const allQuestions = getAllQuestions();
  const currentQuestion = allQuestions[currentQuestionIndex];

  // Find which zone and sub-zone the current question belongs to
  const getCurrentZoneAndSubZone = () => {
    for (const zone of DIAGNOSTIC_ZONES) {
      for (const subZone of zone.subZones) {
        const questionInSubZone = subZone.questions.find(
          (q) => q.id === currentQuestion.id
        );
        if (questionInSubZone) {
          return { zoneName: zone.name, subZoneName: subZone.name };
        }
      }
    }
    return { zoneName: '', subZoneName: '' };
  };

  const { zoneName, subZoneName } = getCurrentZoneAndSubZone();

  // Auto-scroll to top when question changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    // Also scroll window to top for mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex]);

  const handleAnswer = (questionId: string, points: number) => {
    // Store answer
    const newAnswers = { ...answers, [questionId]: points };
    setAnswers(newAnswers);

    // Move to next question or complete
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered
      onComplete(newAnswers);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-white overflow-y-auto"
    >
      {/* Progress bar - sticky at top */}
      <ProgressBar currentQuestion={currentQuestionIndex + 1} />

      {/* Question card */}
      <div className="py-8">
        <QuestionCard
          question={currentQuestion}
          zoneName={zoneName}
          subZoneName={subZoneName}
          onAnswer={handleAnswer}
          isLastQuestion={currentQuestionIndex === allQuestions.length - 1}
        />
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
          <div>Q{currentQuestionIndex + 1}/{allQuestions.length}</div>
          <div>ID: {currentQuestion.id}</div>
          <div>Answered: {Object.keys(answers).length}</div>
        </div>
      )}
    </div>
  );
}