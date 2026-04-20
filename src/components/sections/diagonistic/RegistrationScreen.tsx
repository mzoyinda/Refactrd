'use client';

import { useState } from 'react';
import { Loader2, ArrowRight, User, Mail, Building, Briefcase } from 'lucide-react';
import { INDUSTRIES, RegistrationData } from '@/app/types/diagonistic';

interface RegistrationScreenProps {
  onComplete: (data: RegistrationData, recordId: string) => void;
}

export default function RegistrationScreen({ onComplete }: RegistrationScreenProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    industry: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call API to create registration
      const response = await fetch('/api/diagnostic/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to register');
      }

      // Pass data and record ID to parent
      onComplete(formData, result.id);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ email: 'Failed to register. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F2A44] to-[#0e5d7d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-clash font-bold text-white mb-3">
            AI Readiness Assessment
          </h1>
          <p className="text-white/80 font-jakarta tracking-[-0.03em] text-sm md:text-base">
            Discover where AI can transform your operations in 16 questions
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-xl font-clash font-bold text-[#1F2A44] mb-6">
            Let's get started
          </h2>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors font-jakarta ${
                  errors.firstName
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#CBD5E1] focus:border-[#a2d2ff]'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}`}
                placeholder="John"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500 font-jakarta">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors font-jakarta ${
                  errors.lastName
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#CBD5E1] focus:border-[#a2d2ff]'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}`}
                placeholder="Doe"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500 font-jakarta">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors font-jakarta ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#CBD5E1] focus:border-[#a2d2ff]'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}`}
                placeholder="john@company.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 font-jakarta">{errors.email}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
              Company Name *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors font-jakarta ${
                  errors.companyName
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#CBD5E1] focus:border-[#a2d2ff]'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}`}
                placeholder="Acme Inc."
              />
            </div>
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-500 font-jakarta">{errors.companyName}</p>
            )}
          </div>

          {/* Industry */}
          <div className="mb-6">
            <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
              Industry *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] pointer-events-none z-10" />
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors font-jakarta appearance-none cursor-pointer ${
                  errors.industry
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#CBD5E1] focus:border-[#a2d2ff]'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}`}
              >
                <option value="">Select your industry</option>
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
            {errors.industry && (
              <p className="mt-1 text-sm text-red-500 font-jakarta">{errors.industry}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 bg-[#a2d2ff] text-[#1F2A44] rounded-lg font-clash font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#8cc2ff] hover:scale-[1.02]'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Starting Assessment...</span>
              </>
            ) : (
              <>
                <span>Begin Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="mt-4 text-xs text-center text-[#64748B] font-jakarta">
            Takes approximately 5 minutes to complete
          </p>
        </form>
      </div>
    </div>
  );
}