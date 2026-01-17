// src/components/sections/contact/ContactContent.tsx
"use client";

import { FaEnvelope, FaClock, FaUsers, FaRocket, FaShieldAlt, FaHandshake } from 'react-icons/fa';

export function ContactContent() {
  const whyPartnerWithUs = [
    {
      icon: <FaClock className="w-6 h-6" />,
      title: 'Fast Turnaround',
      description: 'Get matched with pre-vetted candidates within 48-72 hours.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'Quality Assurance',
      description: 'Every engineer passes rigorous technical and behavioral vetting.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: 'Long-term Partnership',
      description: 'We focus on sustainable matches that benefit both sides.',
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Primary Information */}
          <div>
            {/* Get In Touch */}
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  To begin, send us an email with:
                </p>
                
                <ul className="space-y-3">
                  {[
                    'A brief description of your company',
                    'The role(s) you are hiring for',
                    'Any relevant timeline',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-purple-200">
                  <div className="flex items-center space-x-3 text-gray-700 mb-3">
                    <FaEnvelope className="w-5 h-5 text-purple-600" />
                    <a 
                      href="mailto:info@refactrd.com" 
                      className="font-semibold text-purple-600 hover:text-purple-700 transition-colors text-lg"
                    >
                      info@refactrd.com
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">
                    Our team will review your request and schedule a call with a sales representative if aligned.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="mailto:info@refactrd.com?subject=Hiring Inquiry&body=Company Name:%0D%0A%0D%0ARole(s) Hiring For:%0D%0A%0D%0ATimeline:%0D%0A%0D%0AAdditional Information:%0D%0A"
                className="inline-flex items-center justify-center w-full bg-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FaEnvelope className="w-5 h-5 mr-3" />
                Send Us an Email
              </a>
            </div>

            {/* What Happens Next */}
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                What Happens Next
              </h2>

              <div className="space-y-4">
                {[
                  { step: '01', title: 'Initial review of your hiring needs', desc: 'We carefully review your requirements and context' },
                  { step: '02', title: 'Short discovery call', desc: 'A focused conversation to understand your needs better' },
                  { step: '03', title: 'Clear next steps', desc: 'Transparent timeline and actionable plan forward' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                <p className="text-gray-700 font-medium">
                  We aim to keep the process focused and efficient.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Value */}
          <div>
            {/* Why Partner With Us */}
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 lg:p-10 shadow-xl mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Partner With Us
              </h3>

              <div className="space-y-6">
                {whyPartnerWithUs.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-3 gap-4">
                <div className="text-center">
                  {/* <div className="text-2xl font-bold text-purple-600">31K+</div> */}
                  <div className="text-base font-bold text-gray-600 mt-1">Premium talent</div>
                </div>
                <div className="text-center">
                  {/* <div className="font-bold text-purple-600">500+</div> */}
                  <div className="text-base font-bold text-gray-600 mt-1">Structured vetting</div>
                </div>
                <div className="text-center">
                  {/* <div className="text-2base font-bold text-purple-600">72hrs</div> */}
                  <div className="text-base font-bold text-gray-600 mt-1"> Reduced hiring risk</div>
                </div>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaClock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Quick Response Time</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We typically respond to all inquiries within 24 hours during business days. For urgent hiring needs, we can expedite the process.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Support Card */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUsers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Dedicated Support Team</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You'll have a dedicated account manager throughout your hiring journey, ensuring personalized attention and smooth communication.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaRocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    Designed for clarity and long-term partnerships
                  </h3>
                  <p className="text-purple-100 leading-relaxed text-sm">
                    We believe in building transparent, trustworthy relationships that drive mutual success. Every engagement starts with clear expectations and honest communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>      
      </div>
    </section>
  );
}