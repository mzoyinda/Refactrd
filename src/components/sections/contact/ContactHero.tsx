"use client";

import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter } from 'react-icons/fa';

export function ContactHero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-purple-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <FaEnvelope className="w-4 h-4" />
            <span className="text-sm font-semibold">Get In Touch</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>

          <p className="text-2xl lg:text-3xl text-purple-600 font-semibold mb-6">
            Start a hiring conversation
          </p>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            If you are exploring remote, full-time engineering hires and would like to understand how Refactrd can support your team, we welcome a conversation.
          </p>

          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mt-4">
            We work with companies seeking qualified engineers and a structured, dependable hiring process.
          </p>
        </div>
      </div>
    </section>
  );
}