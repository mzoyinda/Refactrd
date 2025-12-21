"use client";

import Image from 'next/image';
import { FaBullseye, FaEye, FaHeart, FaLightbulb, FaHandshake, FaStar } from 'react-icons/fa';

export function MissionVision() {
  const coreValues = [
    {
      icon: <FaHeart className="w-6 h-6" />,
      title: 'Passion',
      description: 'We are passionate about empowering African talent and transforming lives.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <FaLightbulb className="w-6 h-6" />,
      title: 'Innovation',
      description: 'We leverage AI and technology to create better opportunities for everyone.',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: 'Integrity',
      description: 'We build trust through transparency, honesty, and ethical practices.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <FaStar className="w-6 h-6" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from vetting to support.',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const impactMetrics = [
    { label: 'Engineers Placed', value: '4,200+', change: '+32% YoY' },
    { label: 'Average Salary Increase', value: '3.5x', change: 'vs local market' },
    { label: 'Time to Hire', value: '5 days', change: '-80% faster' },
    { label: 'Client Retention', value: '94%', change: 'Year over year' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Image
                  src="/images/mission.webp"
                  alt="Our mission - Empowering African tech talent"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Icon Card */}
              <div className="absolute top-8 left-8 bg-white rounded-2xl p-5 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaBullseye className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="font-bold text-gray-900 text-lg">Our Mission</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Right: Content */}
          <div>
            {/* <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
              <FaBullseye className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Mission</span>
            </div> */}

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Bridging Africa to Global Opportunities
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Our mission is to <span className="font-semibold text-gray-900">empower African engineers</span> to access world-class remote opportunities while helping global companies build exceptional distributed teams.
              </p>
              <p>
                We believe that talent is equally distributed, but opportunity is not. By providing rigorous vetting, AI-powered matching, and comprehensive career support, we're leveling the playing field for African tech professionals.
              </p>
              <p>
                Every placement we make is a step toward economic empowerment, family transformation, and continental growth. We're not just filling positions—we're changing lives and building the future of work.
              </p>
            </div>

            {/* Mission Points */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Empower Talent</p>
                  <p className="text-sm text-gray-600">Break barriers to global markets</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Build Teams</p>
                  <p className="text-sm text-gray-600">Connect companies with excellence</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Drive Impact</p>
                  <p className="text-sm text-gray-600">Transform lives and communities</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Scale Growth</p>
                  <p className="text-sm text-gray-600">Accelerate tech ecosystem development</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Content */}
          <div>
            {/* <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <FaEye className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Vision</span>
            </div> */}

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Africa as a Global Tech Powerhouse
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                We envision a future where <span className="font-semibold text-gray-900">Africa is recognized as a leading source of world-class tech talent</span>, where every skilled engineer has access to opportunities that match their ambitions, regardless of location.
              </p>
              <p>
                By 2030, we aim to have facilitated 100,000+ career transformations, helped build 1,000+ successful distributed teams, and contributed significantly to making remote work the norm for African tech professionals.
              </p>
              <p>
                We're building more than a platform—we're creating a movement that reshapes how the world views African talent and how African professionals view their career possibilities.
              </p>
            </div>

            {/* Vision Goals */}
            <div className="mt-8 space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">100K+ Career Transformations</p>
                    <p className="text-sm text-gray-600">By 2030</p>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">2030</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Leading Remote Work Platform</p>
                    <p className="text-sm text-gray-600">For African tech talent globally</p>
                  </div>
                  <div className="text-2xl">🌍</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Image
                  src="/images/vision.webp"
                  alt="Our vision - Africa as a global tech powerhouse"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Icon Card */}
              <div className="absolute bottom-8 right-8 bg-white rounded-2xl p-5 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaEye className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="font-bold text-gray-900 text-lg">Our Vision</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>

        {/* Core Values */}
       

        {/* Impact Metrics */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Impact So Far
            </h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Real numbers, real change, real lives transformed.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2">{metric.value}</div>
                <div className="text-sm lg:text-base font-medium mb-2">{metric.label}</div>
                <div className="text-xs text-purple-200">{metric.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}