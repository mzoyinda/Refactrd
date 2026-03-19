'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Check, Mail, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

interface ThankYouPageProps {
  contactInfo: {
    name: string;
    email: string;
    company: string; 
    phone: string;   
  };
}

export default function ThankYouPage({ contactInfo }: ThankYouPageProps) {
  useEffect(() => {
    trackEvent('pricing_calculator_thank_you_viewed', {
      email: contactInfo.email,
    });
  }, [contactInfo.email]);

  const handleBookCall = () => {
    trackEvent('pricing_calculator_cta', {
      action: 'book_call',
      source: 'thank_you_page',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6EAF0] via-white to-white py-32 px-6 flex items-center">
      <div className="container-custom max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-[#10B981]/10 rounded-full mb-8"
          >
            <Check className="w-10 h-10 text-[#10B981]" />
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-5xl font-clash font-bold text-[#1F2A44] mb-6">
            Thank You, {contactInfo.name}!
          </h1>

          <p className="font-clash text-xl text-[#64748B] mb-12 max-w-2xl mx-auto">
            We've sent your custom estimate to{' '}
            <span className="font-semibold text-[#1F2A44]">{contactInfo.email}</span>
          </p>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            {/* Email Sent Card */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#CBD5E1] text-left">
              <div className="w-12 h-12 bg-[#5B6CFF]/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-clash font-bold text-[#1F2A44] mb-2">
                Check Your Email
              </h3>
              <p className="font-clash text-[#64748B]">
                Your detailed estimate with project breakdown and pricing is waiting in your inbox.
              </p>
            </div>

            {/* Next Step Card */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#CBD5E1] text-left">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-clash font-bold text-[#1F2A44] mb-2">
                Next Step
              </h3>
              <p className="font-clash text-[#64748B]">
                Book a discovery call to discuss your project in detail and get started.
              </p>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-gradient-to-br from-[#5B6CFF]/5 to-[#A2D2FF]/5 rounded-2xl p-8 lg:p-10 border-2 border-[#A2D2FF]/30 mb-12 max-w-3xl mx-auto text-left">
            <h2 className="text-2xl font-clash font-bold text-[#1F2A44] mb-6 text-center">
              What Happens Next?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-clash font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-clash font-bold text-[#1F2A44] mb-1">
                    Review Your Estimate
                  </h3>
                  <p className="text-[#64748B] text-sm">
                    Check your email for a detailed breakdown of your project estimate, timeline, and what's included.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-clash font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-clash font-bold text-[#1F2A44] mb-1">
                    Book a Discovery Call
                  </h3>
                  <p className="text-[#64748B] text-sm">
                    Schedule a 30-minute call to discuss your specific needs and refine the project scope.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-clash font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-clash font-bold text-[#1F2A44] mb-1">
                    Receive Detailed Proposal
                  </h3>
                  <p className="text-[#64748B] text-sm">
                    Get a comprehensive proposal with timeline, deliverables, and payment terms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-clash font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-clash font-bold text-[#1F2A44] mb-1">
                    Start Building
                  </h3>
                  <p className="text-[#64748B] text-sm">
                    Once approved, we'll kick off your project and start building your solution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="https://cal.com/refactrd/technical-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBookCall}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-clash font-bold hover:bg-[#1F2A44] transition-all duration-300 hover:scale-105 group"
            >
              Book a Discovery Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-secondary rounded-full font-clash font-bold  hover:text-white transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>

          <p className="font-clash text-sm text-[#64748B]">
            Questions? Email us at{' '}
            <a
              href="mailto:hello@refactrd.com"
              className="font-clash text-secondary hover:underline"
            >
              info@refactrd.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}