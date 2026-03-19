'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Currency, detectCurrency } from '@/lib/currencyUtils';
import { calculatePricing } from '@/lib/pricingCalculation';
import { submitPricingCalculatorLead } from '@/app/actions/submitPricingCalculator';
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
import ThankYouPage from './ThankYouPage';

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
  isSubmitted: boolean;
}

export default function PricingCalculator() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [state, setState] = useState<CalculatorState>({
    currentStep: 0,
    path: 'main',
    answers: {},
    isSubmitted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Detect currency on mount
  useEffect(() => {
    const detected = detectCurrency();
    setCurrency(detected);
    startTimeRef.current = Date.now();

    trackEvent('pricing_calculator_started', {
      source: 'pricing_calculator_page',
      detected_currency: detected,
    });
  }, []);

  const handleBack = () => {
    if (state.currentStep > 0) {
      trackEvent('pricing_calculator_back_used', {
        from_step: state.currentStep,
        to_step: state.currentStep - 1,
      });
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

  const handleContactSubmit = async (contactInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  }) => {
    setIsSubmitting(true);

    try {
      // Calculate results
      const result = calculatePricing(state.answers);

      // Calculate time to complete
      const completionTime = Math.round((Date.now() - startTimeRef.current) / 1000);

      // Track completion
      trackEvent('pricing_calculator_completed', {
        project_type: state.answers.projectType || 'unknown',
        path: state.path,
        estimated_range: `${result.estimatedRange.min}-${result.estimatedRange.max}`,
        has_support: !!state.answers.support && state.answers.support !== 'none',
        currency,
        time_to_complete_seconds: completionTime,
      });

      // Submit to server action
      const response = await submitPricingCalculatorLead({
        contactInfo: {
          ...contactInfo,
          company: contactInfo.company ?? '',
          phone: contactInfo.phone ?? '',
        },
        result,
        currency,
        completionTimeSeconds: completionTime,
      });

      if (response.success) {
        // Update state to show thank you page
        setState((prev) => ({
          ...prev,
          answers: { ...prev.answers, contactInfo },
          isSubmitted: true,
        }));
      } else {
        throw new Error(response.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again or contact us at hello@refactrd.com');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const totalSteps = state.path === 'main' ? 5 : 4;

  // Show thank you page after submission
  if (state.isSubmitted && state.answers.contactInfo) {
    const { name, email, company = '', phone = '' } = state.answers.contactInfo;
    return <ThankYouPage contactInfo={{ name, email, company, phone }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6EAF0] via-white to-white py-32 px-6">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          {state.currentStep > 0 && !isSubmitting && (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#5B6CFF] transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-clash font-medium">Back</span>
            </button>
          )}

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

          {state.path === 'main' && (
            <>
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

              {state.currentStep === 2 && (
                <QuestionCard
                  key="timeline"
                  question="What's your preferred timeline?"
                  description="When would you like to have this completed?"
                >
                  <TimelineQuestion onSelect={handleTimelineSelect} />
                </QuestionCard>
              )}

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

              {state.currentStep === 4 && (
                <QuestionCard
                  key="contact"
                  question="Almost there! How can we reach you?"
                  description="We'll send your custom estimate to this email"
                >
                  <ContactForm
                    onSubmit={handleContactSubmit}
                    isSubmitting={isSubmitting}
                  />
                </QuestionCard>
              )}
            </>
          )}

          {state.path === 'notSure' && (
            <>
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

              {state.currentStep === 2 && (
                <QuestionCard
                  key="pain-points"
                  question="What challenges are you facing?"
                  description="Select all that apply (you can choose multiple)"
                >
                  <PainPointsQuestion onSubmit={handlePainPointsSubmit} />
                </QuestionCard>
              )}

              {state.currentStep === 3 && (
                <QuestionCard
                  key="contact-notSure"
                  question="How can we reach you?"
                  description="We'll send you personalized recommendations"
                >
                  <ContactForm
                    onSubmit={handleContactSubmit}
                    isSubmitting={isSubmitting}
                  />
                </QuestionCard>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}