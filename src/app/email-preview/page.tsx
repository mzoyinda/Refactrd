'use client';

import { useState } from 'react';
import { generateUserEmail, generateTeamEmail } from '@/lib/emailTemplates';
import { CalculationResult } from '@/lib/pricingCalculation';
import { Currency } from '@/lib/currencyUtils';

// Sample data for preview
const sampleData = {
  contactInfo: {
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Inc.',
    phone: '+234 803 123 4567',
  },
  result: {
    projectType: 'operational',
    projectTypeName: 'Operational Systems',
    projectDetails: 'dashboard',
    projectDetailsName: 'Custom Internal Dashboard',
    estimatedRange: { min: 8000, max: 14000 },
    timeline: '4-8 weeks',
    ongoingSupport: {
      type: 'growth',
      name: 'Growth Systems Partner',
      monthlyCost: 2500,
    },
    breakdown: {
      baseProject: { min: 8000, max: 14000 },
      support: 2500,
      total: { min: 8000, max: 14000 },
    },
    isCustomQuote: false,
  } as CalculationResult,
  currency: 'USD' as Currency,
};

// Sample data for "Not Sure" path
const sampleDataCustomQuote = {
  contactInfo: {
    name: 'Jane Smith',
    email: 'jane@startup.com',
    company: 'StartupCo',
  },
  result: {
    projectType: 'custom',
    projectTypeName: 'Custom Consultation Required',
    estimatedRange: { min: 5000, max: 15000 },
    timeline: 'To be determined',
    breakdown: {
      baseProject: { min: 5000, max: 15000 },
      total: { min: 5000, max: 15000 },
    },
    isCustomQuote: true,
    painPoints: [
      'Manual repetitive tasks taking up too much time',
      'Disconnected tools and poor data flow',
      'No clear visibility into business operations',
    ],
    budget: '5to15k',
  } as CalculationResult,
  currency: 'NGN' as Currency,
};

export default function EmailPreviewPage() {
  const [emailType, setEmailType] = useState<'user' | 'team'>('user');
  const [dataType, setDataType] = useState<'standard' | 'custom'>('standard');
  const [currency, setCurrency] = useState<Currency>('USD');

  const currentData = dataType === 'standard' ? sampleData : sampleDataCustomQuote;
  const dataWithCurrency = { ...currentData, currency };

  const email =
    emailType === 'user'
      ? generateUserEmail(dataWithCurrency)
      : generateTeamEmail(dataWithCurrency);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            📧 Email Template Preview
          </h1>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Email Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Type
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setEmailType('user')}
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                    emailType === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  User Email
                </button>
                <button
                  onClick={() => setEmailType('team')}
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                    emailType === 'team'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Team Notification
                </button>
              </div>
            </div>

            {/* Data Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quote Type
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setDataType('standard')}
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                    dataType === 'standard'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Standard Quote
                </button>
                <button
                  onClick={() => setDataType('custom')}
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                    dataType === 'custom'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Custom Quote
                </button>
              </div>
            </div>

            {/* Currency Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Currency
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['USD', 'NGN', 'EUR', 'GBP'] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currency === curr
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Line */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-600 mb-1">Subject:</p>
            <p className="text-lg font-bold text-gray-900">{email.subject}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => {
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                  newWindow.document.write(email.html);
                  newWindow.document.close();
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Open in New Tab
            </button>

            <button
              onClick={() => {
                const blob = new Blob([email.html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${emailType}-email-${dataType}-${currency}.html`;
                a.click();
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
            >
              Download HTML
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(email.html);
                alert('HTML copied to clipboard!');
              }}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Copy HTML
            </button>
          </div>
        </div>

        {/* Email Preview */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
            <span className="font-semibold">Email Preview</span>
            <span className="text-sm text-gray-400">
              {emailType === 'user' ? 'User View' : 'Team View'} • {dataType} • {currency}
            </span>
          </div>

          <div className="p-6 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
              <iframe
                srcDoc={email.html}
                className="w-full h-[800px] border-0"
                title="Email Preview"
              />
            </div>
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-800 text-white px-6 py-3">
            <span className="font-semibold">📱 Mobile Preview</span>
          </div>

          <div className="p-6 bg-gray-50 flex justify-center">
            <div className="w-[375px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-gray-900">
              <div className="bg-gray-900 h-6 rounded-b-3xl"></div>
              <iframe
                srcDoc={email.html}
                className="w-full h-[667px] border-0"
                title="Mobile Email Preview"
              />
            </div>
          </div>
        </div>

        {/* HTML Code View */}
        <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-800 text-white px-6 py-3">
            <span className="font-semibold">HTML Source Code</span>
          </div>

          <div className="p-6">
            <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-xs">
              <code>{email.html}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}