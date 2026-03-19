'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Mail,
  Download,
  Sparkles,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { Currency, formatPriceRange, formatPrice } from '@/lib/currencyUtils';
import { trackEvent } from '@/lib/analytics';
import { CalculationResult, getRecommendedSolutions } from '@/lib/pricingCalculation';

interface ResultsPageProps {
  result: CalculationResult;
  currency: Currency;
  contactInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
}

export default function ResultsPage({
  result,
  currency,
  contactInfo,
}: ResultsPageProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleBookCall = () => {
    trackEvent('pricing_calculator_cta', {
      action: 'book_call',
      project_type: result.projectType,
      estimated_range: `${result.estimatedRange.min}-${result.estimatedRange.max}`,
    });
  };

  const handleEmailResults = async () => {
    setIsSending(true);
    
    trackEvent('pricing_calculator_cta', {
      action: 'email_results',
      project_type: result.projectType,
    });

    // Simulate sending email (implement actual email logic later)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setEmailSent(true);
    setIsSending(false);
  };

  // Custom quote path
  if (result.isCustomQuote) {
    const recommendations = getRecommendedSolutions(
      result.painPoints || [],
      result.estimatedRange
    );

    return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B6CFF]/10 text-[#5B6CFF] rounded-full text-sm font-clash font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Custom Consultation Recommended
          </div>

          <h1 className="text-4xl lg:text-5xl font-clash font-bold text-[#1F2A44] mb-4">
            Let's Build Your Custom Solution
          </h1>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Based on your needs, we recommend a personalized consultation to design
            the perfect solution for your business.
          </p>
        </div>

        {/* Your Indicated Needs */}
        <div className="bg-white rounded-2xl p-8 border-2 border-[#CBD5E1] mb-8">
          <h2 className="text-2xl font-clash font-bold text-[#1F2A44] mb-6">
            Your Indicated Needs
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Budget */}
            {result.estimatedRange && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-[#5B6CFF]" />
                  <span className="text-sm font-clash font-semibold text-[#64748B]">
                    Budget Range
                  </span>
                </div>
                <p className="text-lg font-clash font-bold text-[#1F2A44]">
                  {formatPriceRange(
                    result.estimatedRange.min,
                    result.estimatedRange.max,
                    currency
                  )}
                </p>
              </div>
            )}

            {/* Timeline */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#5B6CFF]" />
                <span className="text-sm font-clash font-semibold text-[#64748B]">
                  Timeline
                </span>
              </div>
              <p className="text-lg font-clash font-bold text-[#1F2A44]">
                {result.timeline}
              </p>
            </div>

            {/* Pain Points Count */}
            {result.painPoints && result.painPoints.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-[#5B6CFF]" />
                  <span className="text-sm font-clash font-semibold text-[#64748B]">
                    Key Challenges
                  </span>
                </div>
                <p className="text-lg font-clash font-bold text-[#1F2A44]">
                  {result.painPoints.length} identified
                </p>
              </div>
            )}
          </div>

          {/* Pain points list */}
          {result.painPoints && result.painPoints.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#E6EAF0]">
              <h3 className="text-sm font-clash font-semibold text-[#64748B] mb-3">
                Your Main Challenges:
              </h3>
              <div className="space-y-2">
                {result.painPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1F2A44]">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommended Solutions */}
        {recommendations.length > 0 && (
          <div className="bg-gradient-to-br from-[#5B6CFF]/5 to-[#A2D2FF]/5 rounded-2xl p-8 border-2 border-[#A2D2FF]/30 mb-8">
            <h2 className="text-2xl font-clash font-bold text-[#1F2A44] mb-6">
              Recommended Solutions
            </h2>

            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-[#CBD5E1]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#5B6CFF]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-clash font-bold text-[#5B6CFF]">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-clash font-semibold text-[#5B6CFF] mb-1">
                        {rec.category}
                      </div>
                      <h3 className="text-lg font-clash font-bold text-[#1F2A44] mb-2">
                        {rec.solution}
                      </h3>
                      <p className="text-[#64748B]">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#5B6CFF] to-[#1F2A44] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-clash font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Let's discuss your needs in detail and design a custom solution that
            perfectly fits your business requirements.
          </p>

          <Link
            href="https://cal.com/refactrd/technical-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBookCall}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#5B6CFF] rounded-full font-clash font-bold hover:bg-[#E6EAF0] transition-all duration-300 hover:scale-105 group"
          >
            Book a Discovery Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    );
  }

  // Standard path with clear pricing
  return (
    <div className="max-w-4xl mx-auto">
      {/* Success header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#10B981]/10 rounded-full mb-6">
          <Check className="w-8 h-8 text-[#10B981]" />
        </div>

        <h1 className="text-4xl lg:text-5xl font-clash font-bold text-[#1F2A44] mb-4">
          Your Estimated Investment
        </h1>
        <p className="text-lg text-[#64748B]">
          Hi {contactInfo.name}, here's your custom estimate
        </p>
      </div>

      {/* Main pricing card */}
      <div className="bg-gradient-to-br from-[#5B6CFF] to-[#1F2A44] rounded-2xl p-8 lg:p-10 text-white mb-8">
        <div className="text-center mb-8">
          <div className="text-sm font-clash font-semibold text-white/70 mb-2">
            Project Investment
          </div>
          <div className="text-5xl lg:text-6xl font-clash font-bold mb-4">
            {formatPriceRange(
              result.estimatedRange.min,
              result.estimatedRange.max,
              currency
            )}
          </div>

          {result.ongoingSupport && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <span className="text-sm">+ {formatPrice(result.ongoingSupport.monthlyCost, currency)}/month</span>
              <span className="text-white/70 text-sm">ongoing support</span>
            </div>
          )}
        </div>

        {/* Project breakdown */}
        <div className="space-y-4 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-white/90">Project Type</span>
            <span className="font-clash font-semibold">{result.projectTypeName}</span>
          </div>

          {result.projectDetailsName && (
            <div className="flex items-center justify-between">
              <span className="text-white/90">Specific Solution</span>
              <span className="font-clash font-semibold">{result.projectDetailsName}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-white/90">Timeline</span>
            <span className="font-clash font-semibold">{result.timeline}</span>
          </div>

          {result.ongoingSupport && (
            <div className="flex items-center justify-between">
              <span className="text-white/90">Support Plan</span>
              <span className="font-clash font-semibold">{result.ongoingSupport.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* What's included */}
      <div className="bg-white rounded-2xl p-8 border-2 border-[#CBD5E1] mb-8">
        <h2 className="text-2xl font-clash font-bold text-[#1F2A44] mb-6">
          What's Included
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            'System architecture planning',
            'Custom development',
            'Testing and deployment',
            'Documentation',
            'Training and handoff',
            'Post-launch support',
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="font-clash text-[#1F2A44]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-[#E6EAF0] rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-clash font-bold text-[#1F2A44] mb-6">
          Next Steps
        </h2>

        <div className="space-y-4">
          {[
            {
              number: '1',
              title: 'Book a Discovery Call',
              description: 'We will discuss your specific needs and refine the scope',
            },
            {
              number: '2',
              title: 'Receive Detailed Proposal',
              description: 'Get a comprehensive proposal with timeline and deliverables',
            },
            {
              number: '3',
              title: 'Project Kickoff',
              description: 'Start building with our engineering team',
            },
          ].map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#5B6CFF] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-clash font-bold">{step.number}</span>
              </div>
              <div>
                <h3 className="font-clash font-bold text-[#1F2A44] mb-1">
                  {step.title}
                </h3>
                <p className="text-[#64748B] text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="https://cal.com/refactrd/technical-discovery-call"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleBookCall}
          className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5B6CFF] text-white rounded-full font-clash font-bold hover:bg-[#1F2A44] transition-all duration-300 hover:scale-105 group"
        >
          Book a Discovery Call
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>

        <button
          onClick={handleEmailResults}
          disabled={emailSent || isSending}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 border-2 rounded-full font-clash font-bold transition-all duration-300 ${
            emailSent
              ? 'border-[#10B981] text-[#10B981] cursor-default'
              : 'border-[#5B6CFF] text-[#5B6CFF] hover:bg-[#5B6CFF] hover:text-white'
          }`}
        >
          {isSending ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : emailSent ? (
            <>
              <Check className="w-5 h-5" />
              Email Sent!
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              Email Results
            </>
          )}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-[#64748B]">
        Questions? Email us at{' '}
        <a
          href="mailto:hello@refactrd.com"
          className="text-[#5B6CFF] hover:underline"
        >
          hello@refactrd.com
        </a>
      </p>
    </div>
  );
}