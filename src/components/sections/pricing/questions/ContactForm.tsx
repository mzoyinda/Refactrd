'use client';

import { useState } from 'react';
import { ArrowRight, User, Mail, Briefcase, Loader2 } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface ContactInfo {
  name: string;
  email: string;
  company: string;
  phone: string;
}

interface ContactFormProps {
  onSubmit: (contactInfo: ContactInfo) => void;
  isSubmitting?: boolean;
}

export default function ContactForm({ onSubmit, isSubmitting = false }: ContactFormProps) {
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

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.phone || formData.phone.trim().length < 10) {
      newErrors.phone = 'Valid phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
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
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              disabled={isSubmitting}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 font-clash bg-white ${
                errors.name
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#CBD5E1] focus:border-[#5B6CFF]'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@company.com"
              disabled={isSubmitting}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 font-clash bg-white ${
                errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#CBD5E1] focus:border-[#5B6CFF]'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Company (Required) */}
        <div>
          <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
            Company Name *
          </label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="Acme Inc."
              disabled={isSubmitting}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 font-clash bg-white ${
                errors.company
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#CBD5E1] focus:border-[#5B6CFF]'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          {errors.company && (
            <p className="mt-1 text-sm text-red-500">{errors.company}</p>
          )}
        </div>

        {/* Phone (Required with Country Code) */}
        <div>
          <label className="block text-sm font-clash font-semibold text-[#1F2A44] mb-2">
            Phone Number *
          </label>
          <div className="phone-input-wrapper">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="NG"
              value={formData.phone}
              onChange={(value) =>
                setFormData({ ...formData, phone: value || '' })
              }
              disabled={isSubmitting}
              placeholder="803 123 4567"
              className={`phone-input ${
                errors.phone ? 'phone-input-error' : ''
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
          <p className="font-clash mt-1 text-xs text-[#64748B]">
            Include country code (e.g., +234 for Nigeria)
          </p>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-8 inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-clash font-bold transition-all duration-300 group ${
          isSubmitting
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-[#1F2A44] hover:scale-105'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending Your Estimate...
          </>
        ) : (
          <>
            Get My Estimate
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </button>

      <p className="font-clash mt-4 text-sm text-[#64748B]">
        We'll send your detailed estimate to your email within seconds
      </p>
    </form>
  );
}