// src/components/sections/about/Benefits.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaDollarSign, 
  FaClock, 
  FaUsers, 
  FaChartLine,
  FaGlobe,
  FaBriefcase,
  FaGraduationCap,
  FaHandshake,
  FaAward,
  FaHeadset
} from 'react-icons/fa';

export function Benefits() {
  const [activeTab, setActiveTab] = useState<'companies' | 'talents'>('companies');

  const companyBenefits = [
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: 'Fast Hiring Process',
      description: 'Get matched with pre-vetted candidates in 48-72 hours. No more weeks of screening and interviews.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'Rigorous Vetting',
      description: 'Every candidate passes technical assessments, portfolio reviews, and behavioral interviews.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <FaDollarSign className="w-6 h-6" />,
      title: 'Cost-Effective Talent',
      description: 'Access world-class engineers at competitive rates. Save up to 60% compared to local hires.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: 'Timezone Flexibility',
      description: 'Engineers available across multiple timezones to match your business hours and requirements.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: 'Diverse Skill Sets',
      description: 'From mobile to backend, DevOps to AI. Access 1,264+ specialties in one platform.',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: 'Quality Guarantee',
      description: 'Not satisfied? Free replacement within 14 days. We stand behind every placement.',
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  const talentBenefits = [
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: 'Global Opportunities',
      description: 'Access 100% remote roles with companies from US, Europe, and worldwide.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <FaDollarSign className="w-6 h-6" />,
      title: 'Competitive Salaries',
      description: 'Earn 3-5x more than local market rates. Get paid what you are truly worth.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <FaBriefcase className="w-6 h-6" />,
      title: 'Career Growth',
      description: 'Work with cutting-edge technologies and international teams. Accelerate your career.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <FaGraduationCap className="w-6 h-6" />,
      title: 'Skill Development',
      description: 'Access free training, workshops, and resources to keep your skills sharp and relevant.',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: 'Contract Security',
      description: 'Secure escrow payments, clear contracts, and legal protection for every engagement.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: 'Dedicated Support',
      description: 'Personal account manager, 24/7 support, and community of 31K+ professionals.',
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  const companyStats = [
    { value: '72hrs', label: 'Average time to hire' },
    { value: '60%', label: 'Cost savings vs local' },
    { value: '94%', label: 'Client retention rate' },
  ];

  const talentStats = [
    { value: '3.5x', label: 'Average salary increase' },
    { value: '100%', label: 'Remote opportunities' },
    { value: '92%', label: 'Career satisfaction' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Refactrd
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Different benefits for different needs. See what we can do for you.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'companies'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Companies
            </button>
            {/* <button
              onClick={() => setActiveTab('talents')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'talents'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Talents
            </button> */}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {/* Companies Tab */}
          <div
            className={`transition-all duration-500 ${
              activeTab === 'companies'
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 absolute inset-0 pointer-events-none translate-x-8'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              {/* Left: Benefits Grid */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {companyBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                    >
                      <div className={`${benefit.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {benefit.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Image & Stats */}
              <div>
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Image
                      src="/images/companies.webp"
                      alt="Benefits for companies hiring through Refactrd"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 bg-white rounded-xl px-4 py-2 shadow-lg">
                    <p className="text-sm font-semibold text-gray-900">Trusted by 500+ Companies</p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {companyStats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100"
                    >
                      <div className="text-2xl font-bold text-purple-600 mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full bg-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Start Hiring Now
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Companies Process Timeline */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                How It Works for Companies
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '01', title: 'Share Requirements', desc: 'Tell us your needs and team culture' },
                  { step: '02', title: 'Get Matches', desc: 'Receive 2-4 pre-vetted candidates' },
                  { step: '03', title: 'Interview', desc: 'Meet candidates and make your choice' },
                  { step: '04', title: 'Start Working', desc: 'Onboard and begin collaboration' },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-purple-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Talents Tab */}
          <div
            className={`transition-all duration-500 ${
              activeTab === 'talents'
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 absolute inset-0 pointer-events-none -translate-x-8'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              {/* Left: Image & Stats */}
              <div>
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                    <Image
                      src="/images/talent.webp"
                      alt="Benefits for talents joining Refactrd"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute top-6 right-6 bg-white rounded-xl px-4 py-2 shadow-lg">
                    <p className="text-sm font-semibold text-gray-900">Join 31K+ Professionals</p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {talentStats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100"
                    >
                      <div className="text-2xl font-bold text-green-600 mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full bg-green-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Apply as a Talent
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right: Benefits Grid */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {talentBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                    >
                      <div className={`${benefit.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {benefit.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Talents Process Timeline */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                How It Works for Talents
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '01', title: 'Create Profile', desc: 'Sign up and complete your profile' },
                  { step: '02', title: 'Get Vetted', desc: 'Pass our technical assessment' },
                  { step: '03', title: 'Browse Projects', desc: 'Find opportunities that fit you' },
                  { step: '04', title: 'Start Earning', desc: 'Work remotely and get paid' },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-green-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}