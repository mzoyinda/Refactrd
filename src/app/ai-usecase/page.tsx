'use client';

import { useState } from 'react';
import { ContextData, DiagnosticAnswers, RegistrationData } from '../types/diagonistic';
import RegistrationScreen from '@/components/sections/diagonistic/RegistrationScreen';
import DiagnosticQuestionsScreen from '@/components/sections/diagonistic/DiagnosticQuestionsScreen';
import ContextEnrichmentScreen from '@/components/sections/diagonistic/ContextEnrichmentScreen';
import ResultsScreen from '@/components/sections/diagonistic/ResultsScreen';


type DiagnosticStep = 'registration' | 'questions' | 'context' | 'results';

export default function AIUseCasePage() {
  // Current step in the diagnostic flow
  const [currentStep, setCurrentStep] = useState<DiagnosticStep>('registration');

  // Registration data
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [recordId, setRecordId] = useState<string>('');

  // Diagnostic answers (Q1-Q16)
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});

  // Context enrichment data 
  const [contextData, setContextData] = useState<ContextData | null>(null);

  // Handle registration completion
  const handleRegistrationComplete = (data: RegistrationData, id: string) => {
    setRegistrationData(data);
    setRecordId(id);
    setCurrentStep('questions');
  };
  

  // Handle diagnostic questions completion
  const handleQuestionsComplete = (diagnosticAnswers: DiagnosticAnswers) => {
    setAnswers(diagnosticAnswers);
    setCurrentStep('context');
  };

  // Handle context enrichment completion
  const handleContextComplete = (context: ContextData) => {
    setContextData(context);
    setCurrentStep('results');
  };

  return (
    <>
      {currentStep === 'registration' && (
        <RegistrationScreen onComplete={handleRegistrationComplete} />
      )}

      {currentStep === 'questions' && (
        <DiagnosticQuestionsScreen onComplete={handleQuestionsComplete} />
      )}

      {currentStep === 'context' && (
        <ContextEnrichmentScreen onComplete={handleContextComplete} />
      )}

      {currentStep === 'results' && contextData && registrationData && (
        <ResultsScreen
          answers={answers}
          contextData={contextData}
          recordId={recordId}
          companyName={registrationData.companyName}
          industry={registrationData.industry}
          name={`${registrationData.firstName} ${registrationData.lastName}`}
        />
      )}
    </>
  );
}