"use client";

import Image from "next/image";
import { FaGlobe, FaUsers, FaRocket, FaShieldAlt } from "react-icons/fa";

export function WhoWeAre() {
  const values = [
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: "Global Reach",
      description:
        "Connecting talent from Africa with opportunities worldwide, breaking geographical barriers.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Quality First",
      description:
        "Rigorous vetting process ensures only top-tier professionals join our network.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Speed & Efficiency",
      description:
        "Match with pre-vetted candidates in days, not weeks. Fast-track your hiring process.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Trust & Security",
      description:
        "Secure payments, verified identities, and escrow protection for complete peace of mind.",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const stats = [
    { value: "31K+", label: "Verified Talents" },
    { value: "500+", label: "Companies Trust Us" },
    { value: "50+", label: "Countries Served" },
    { value: "95%", label: "Client Satisfaction" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-4 mt-20">
          {/* Left: Text Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
              <FaUsers className="w-4 h-4" />
              <span className="text-sm font-semibold">About Refactrd</span>
            </div>

            <h1 className="text-xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading leading-[45px] lg:leading-[54px]">
              Connecting African engineering talent to global teams
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Refactrd is a global hiring partner focused on sourcing, vetting,
              and placing high-quality African engineers into remote, full-time
              roles with startups and enterprises worldwide.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We help companies hire with confidence by removing the
              uncertainty, inefficiency, and overhead often associated with
              global recruitment.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">100% Remote Opportunities</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">AI-Powered Matching</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Vetted Professionals</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Main Image - Replace with team photo or African tech professionals working */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                <Image
                  src="/images/about-refactrd.webp"
                  alt="Refactrd team and African tech professionals"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute bottom-6 right-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-sm text-gray-500">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>

        {/* Stats Section */}

        {/* Our Values */}
        {/* <div className="mb-12 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just a hiring platform. We're your partner in building exceptional remote teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 hover:shadow-md transition-all duration-300 border border-gray-100 group"
              >
                <div className={`${value.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Story Section with Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          {/* <div className="order-2 lg:order-1">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <Image
                  src="/images/our-story.webp"
                  alt="Our story - Building bridges for African tech talent"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div> */}

          {/* Right: Story Text */}
          {/* <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Refactrd was built to address a clear gap in global hiring:
                Companies need dependable engineering talent, while Africa
                continues to produce engineers capable of contributing at a
                global level — yet accessing this talent remains inefficient and
                inconsistent.
              </p>
              <p>
                We created Refactrd to act as a focused hiring partner, ensuring
                companies engage with engineers who meet global expectations
                across skill, communication, and professionalism.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
