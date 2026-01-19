"use client";

import Image from "next/image";
import {
  FaBullseye,
  FaEye,
  FaHeart,
  FaLightbulb,
  FaHandshake,
  FaStar,
} from "react-icons/fa";

export function MissionVision() {
  // const coreValues = [
  //   {
  //     icon: <FaHeart className="w-6 h-6" />,
  //     title: "Passion",
  //     description:
  //       "We are passionate about empowering African talent and transforming lives.",
  //     color: "bg-red-100 text-red-600",
  //   },
  //   {
  //     icon: <FaLightbulb className="w-6 h-6" />,
  //     title: "Innovation",
  //     description:
  //       "We leverage AI and technology to create better opportunities for everyone.",
  //     color: "bg-yellow-100 text-yellow-600",
  //   },
  //   {
  //     icon: <FaHandshake className="w-6 h-6" />,
  //     title: "Integrity",
  //     description:
  //       "We build trust through transparency, honesty, and ethical practices.",
  //     color: "bg-blue-100 text-blue-600",
  //   },
  //   {
  //     icon: <FaStar className="w-6 h-6" />,
  //     title: "Excellence",
  //     description:
  //       "We maintain the highest standards in everything we do, from vetting to support.",
  //     color: "bg-purple-100 text-purple-600",
  //   },
  // ];

  const impactMetrics = [
    { label: "Selective talent sourcing" },
    {
      label: "Consistent vetting standards",
    },
    { label: "Sustainable hiring relationships" },
    { label: "Long-term team integration" },
  ];

  return (
    <section className="py-16 bg-white">
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
                  <span className="font-bold text-gray-900 text-lg">
                    Our Mission
                  </span>
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

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[72px]">
              Bridging Africa to Global Opportunities
            </h2>

            <div className="space-y-6 text-base text-gray-600 leading-relaxed">
              <p>
                Our mission is to support global teams by providing access to a
                carefully vetted pool of African engineering talent without
                lowering standards or increasing operational complexity. We
                approach hiring with intention, prioritizing quality, alignment,
                and long-term outcomes for both companies and engineers.
              </p>
            </div>

            {/* Mission Points */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Empower Talent</p>
                  <p className="text-sm text-gray-600">
                    Break barriers to global markets
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Build Teams</p>
                  <p className="text-sm text-gray-600">
                    Connect companies with excellence
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Drive Impact</p>
                  <p className="text-sm text-gray-600">
                    Transform lives and communities
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Scale Growth</p>
                  <p className="text-sm text-gray-600">
                    Accelerate tech ecosystem development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}

        {/* Impact Metrics */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Approach So Far
            </h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Rather than optimizing for volume, we focus on:
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-sm lg:text-lg font-medium mb-2">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
