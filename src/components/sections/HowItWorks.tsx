"use client";

import { FaBriefcase, FaListUl, FaMoneyCheckAlt } from 'react-icons/fa';

export function HowItWorks() {
  const steps = [
    {
      icon: <FaBriefcase className="w-8 h-8" />,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Connect with a Tech Recruiter',
      description: 'Meet with a Refactrd recruiter to discuss your technical needs and team culture.',
    },
    {
      icon: <FaListUl className="w-8 h-8" />,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Get Your Curated Shortlist',
      description: 'Receive 2-4 top-matching candidates within days, handpicked for your project.',
    },
    {
      icon: <FaMoneyCheckAlt className="w-8 h-8" />,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Start & Pay with Confidence',
      description: 'Begin work and pay securely via our Escrow system only when results are delivered.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-heading">
            How Refactrd works
          </h2>
          <p className="text-3xl lg:text-4xl font-semibold text-purple-600 font-heading">
            Find talent in a few simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className={`${step.iconBg} ${step.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}