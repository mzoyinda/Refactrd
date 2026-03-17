'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Currency, detectCurrency } from '@/lib/currencyUtils';
import {
  websiteDetails,
  operationalDetails,
  growthDetails,
  customDetails,
} from '@/data/pricingCalculator';
import { trackEvent } from '@/lib/analytics';

// Components
import CurrencySelector from './CurrencySelector';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ProjectTypeQuestion from './questions/ProjectTypeQuestion';
import ProjectDetailsQuestion from './questions/ProjectDetailsQuestion';
import TimelineQuestion from './questions/TimelineQuestion';
import SupportQuestion from './questions/SupportQuestion';
import BudgetQuestion from './questions/BudgetQuestion';
import PainPointsQuestion from './questions/PainPointsQuestion';
import ContactForm from './questions/ContactForm';
import ResultsPage from './ResultsPage';
import { calculatePricing, CalculationResult } from '@/lib/pricingCalculation';

interface CalculatorState {
  currentStep: number;
  path: 'main' | 'notSure';
  answers: {
    projectType?: string;
    projectDetails?: string;
    timeline?: string;
    support?: string;
    budget?: string;
    painPoints?: string[];
    contactInfo?: {
      name: string;
      email: string;
      company?: string;
      phone?: string;
    };
  };
  result?: CalculationResult;
}

export default function PricingCalculator() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [state, setState] = useState<CalculatorState>({
    currentStep: 0,
    path: 'main',
    answers: {},
  });

  // Detect currency on mount
  useEffect(() => {
    const detected = detectCurrency();
    setCurrency(detected);

    // Track calculator started
    trackEvent('pricing_calculator_started', {
      source: 'pricing_calculator_page',
      detected_currency: detected,
    });
  }, []);

  const handleBack = () => {
    if (state.currentStep > 0) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));
    }
  };

  const handleProjectTypeSelect = (projectTypeId: string) => {
    if (projectTypeId === 'notSure') {
      setState((prev) => ({
        ...prev,
        path: 'notSure',
        currentStep: 1,
        answers: { ...prev.answers, projectType: projectTypeId },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        path: 'main',
        currentStep: 1,
        answers: { ...prev.answers, projectType: projectTypeId },
      }));
    }
  };

  const handleProjectDetailsSelect = (detailId: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 2,
      answers: { ...prev.answers, projectDetails: detailId },
    }));
  };

  const handleTimelineSelect = (timelineId: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 3,
      answers: { ...prev.answers, timeline: timelineId },
    }));
  };

  const handleSupportSelect = (supportId: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 4,
      answers: { ...prev.answers, support: supportId },
    }));
  };

  const handleBudgetSelect = (budgetId: string) => {
    setState((prev) => ({
      ...prev,
      currentStep: 2,
      answers: { ...prev.answers, budget: budgetId },
    }));
  };

  const handlePainPointsSubmit = (painPoints: string[]) => {
    setState((prev) => ({
      ...prev,
      currentStep: 3,
      answers: { ...prev.answers, painPoints },
    }));
  };

  const handleContactSubmit = (contactInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  }) => {
    // Calculate results
    const result = calculatePricing(state.answers);

    // Track completion
    trackEvent('pricing_calculator_completed', {
      project_type: state.answers.projectType,
      path: state.path,
      estimated_range: `${result.estimatedRange.min}-${result.estimatedRange.max}`,
      has_support: !!state.answers.support && state.answers.support !== 'none',
      lead_captured: true,
    });

    setState((prev) => ({
      ...prev,
      currentStep: state.path === 'main' ? 5 : 6,
      answers: { ...prev.answers, contactInfo },
      result,
    }));
  };

  // Get project details options based on type
  const getProjectDetailsOptions = () => {
    switch (state.answers.projectType) {
      case 'website':
        return websiteDetails;
      case 'operational':
        return operationalDetails;
      case 'growth':
        return growthDetails;
      case 'custom':
        return customDetails;
      default:
        return [];
    }
  };

  // Calculate total steps
  const totalSteps = state.path === 'main' ? 5 : 4;
  const showResults = state.result && state.answers.contactInfo;

  // Track drop-off when user leaves
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!showResults && state.currentStep > 0) {
        trackEvent('pricing_calculator_abandoned', {
          last_step: state.currentStep,
          last_question: getCurrentQuestionName(),
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.currentStep, showResults]);

  const getCurrentQuestionName = () => {
    if (state.path === 'main') {
      const questions = ['project_type', 'project_details', 'timeline', 'support', 'contact'];
      return questions[state.currentStep] || 'unknown';
    } else {
      const questions = ['project_type', 'budget', 'pain_points', 'contact'];
      return questions[state.currentStep] || 'unknown';
    }
  };

  // Show results page
  if (showResults && state.result && state.answers.contactInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E6EAF0] via-white to-white py-32 px-6">
        <div className="container-custom">
          <ResultsPage
            result={state.result}
            currency={currency}
            contactInfo={state.answers.contactInfo}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6EAF0] via-white to-white py-32 px-6">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          {/* Back button */}
          {state.currentStep > 0 && (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#5B6CFF] transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-clash font-medium">Back</span>
            </button>
          )}

          {/* Currency selector */}
          <div className="ml-auto">
            <CurrencySelector
              selectedCurrency={currency}
              onCurrencyChange={setCurrency}
            />
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />

        {/* Questions */}
        <AnimatePresence mode="wait">
          {/* Step 0: Project Type */}
          {state.currentStep === 0 && (
            <QuestionCard
              key="project-type"
              question="What type of project do you need?"
              description="Choose the category that best describes what you're looking for"
            >
              <ProjectTypeQuestion
                currency={currency}
                onSelect={handleProjectTypeSelect}
              />
            </QuestionCard>
          )}

          {/* Main Path */}
          {state.path === 'main' && (
            <>
              {/* Step 1: Project Details */}
              {state.currentStep === 1 && (
                <QuestionCard
                  key="project-details"
                  question="What specific solution do you need?"
                  description="Select the option that best matches your requirements"
                >
                  <ProjectDetailsQuestion
                    options={getProjectDetailsOptions()}
                    currency={currency}
                    onSelect={handleProjectDetailsSelect}
                  />
                </QuestionCard>
              )}

              {/* Step 2: Timeline */}
              {state.currentStep === 2 && (
                <QuestionCard
                  key="timeline"
                  question="What's your preferred timeline?"
                  description="When would you like to have this completed?"
                >
                  <TimelineQuestion onSelect={handleTimelineSelect} />
                </QuestionCard>
              )}

              {/* Step 3: Support */}
              {state.currentStep === 3 && (
                <QuestionCard
                  key="support"
                  question="Do you need ongoing support?"
                  description="Choose a support plan that fits your needs"
                >
                  <SupportQuestion
                    currency={currency}
                    onSelect={handleSupportSelect}
                  />
                </QuestionCard>
              )}

              {/* Step 4: Contact Form */}
              {state.currentStep === 4 && (
                <QuestionCard
                  key="contact"
                  question="Almost there! How can we reach you?"
                  description="We'll send your custom estimate to this email"
                >
                  <ContactForm onSubmit={handleContactSubmit} />
                </QuestionCard>
              )}
            </>
          )}

          {/* Not Sure Path */}
          {state.path === 'notSure' && (
            <>
              {/* Step 1: Budget */}
              {state.currentStep === 1 && (
                <QuestionCard
                  key="budget"
                  question="What's your budget range?"
                  description="This helps us recommend the right solution"
                >
                  <BudgetQuestion
                    currency={currency}
                    onSelect={handleBudgetSelect}
                  />
                </QuestionCard>
              )}

              {/* Step 2: Pain Points */}
              {state.currentStep === 2 && (
                <QuestionCard
                  key="pain-points"
                  question="What challenges are you facing?"
                  description="Select all that apply (you can choose multiple)"
                >
                  <PainPointsQuestion onSubmit={handlePainPointsSubmit} />
                </QuestionCard>
              )}

              {/* Step 3: Contact Form */}
              {state.currentStep === 3 && (
                <QuestionCard
                  key="contact-notSure"
                  question="How can we reach you?"
                  description="We'll send you personalized recommendations"
                >
                  <ContactForm onSubmit={handleContactSubmit} />
                </QuestionCard>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}