'use client';

import { useState } from 'react';
import { ArrowRight, User, Mail, Briefcase, Phone } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface ContactInfo {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

interface ContactFormProps {
  onSubmit: (contactInfo: ContactInfo) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactInfo>({
    name: '',
    email: '',
    company: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<ContactInfo>>({});

  const validate = () => {
    const newErrors: Partial<ContactInfo> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      trackEvent('pricing_calculator_step_completed', {
        step_number: 5,
        step_name: 'contact_info',
        has_company: !!formData.company,
        has_phone: !!formData.phone,
      });

      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
            Your Name *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              className={`w-full pl-12 pr-4 py-3 border-2 border-black rounded-lg focus:outline-none transition-colors duration-300 font-clash ${
                errors.name
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-black focus:border-[#A2D2FF]'
              }`}
            />
          </div>
          {errors.name && (
            <p className="font-clash mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@company.com"
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 font-clash ${
                errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#CBD5E1] focus:border-[#5B6CFF]'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Company (Optional) */}
        <div>
          <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
            Company Name <span className="text-[#64748B] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="Acme Inc."
              className="w-full pl-12 pr-4 py-3 border-2 border-[#CBD5E1] rounded-lg focus:border-[#5B6CFF] focus:outline-none transition-colors duration-300 font-clash"
            />
          </div>
        </div>

        {/* Phone (Optional) */}
        <div>
          <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
            Phone Number <span className="text-[#64748B] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+1 (555) 123-4567"
              className="w-full pl-12 pr-4 py-3 border-2 border-[#CBD5E1] rounded-lg focus:border-[#5B6CFF] focus:outline-none transition-colors duration-300 font-clash"
            />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-clash font-bold hover:bg-[#1F2A44] transition-all duration-300 hover:scale-105 group"
      >
        See Your Estimate
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      <p className="font-clash mt-4 text-sm text-[#64748B]">
        We'll use this information to send you a detailed proposal
      </p>
    </form>
  );
}