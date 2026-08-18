"use client";

import { useState } from "react";
import {
  renderContactCustomerEmail,
  renderContactTeamEmail,
  type ContactSubmission,
} from "@/lib/emails/contactEmails";

const sample: ContactSubmission = {
  name: "Jane Okafor",
  company: "Meridian Logistics",
  email: "jane.okafor@meridianlogistics.com",
  role: "Chief Operating Officer",
  services: ["Intelligent Operations", "Workflow Transformation"],
  challenge:
    "Our dispatch team reconciles delivery exceptions by hand across three systems. It takes roughly 20 hours a week and errors slip through to invoicing.\n\nWe've tried scripting parts of it but nothing holds up when the upstream formats change.",
  successOutcome:
    "Exceptions triaged automatically with a clear audit trail, and the dispatch team spending their time on the escalations that actually need a human.",
  timeline: "Within 30 Days",
  referenceId: "8f2c1a44-3b7e-4d19-9a55-0c6e2f7b1d83",
  submittedAt: new Date(),
};

const variants = {
  customer: { label: "Customer confirmation", render: renderContactCustomerEmail },
  team: { label: "Team notification", render: renderContactTeamEmail },
  "team-warning": {
    label: "Team notification (DB write failed)",
    render: (d: ContactSubmission) =>
      renderContactTeamEmail({ ...d, storageFailed: true, referenceId: undefined }),
  },
} as const;

type VariantKey = keyof typeof variants;

export default function ContactEmailPreview() {
  const [variant, setVariant] = useState<VariantKey>("customer");
  const email = variants[variant].render(sample);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Contact Email Preview</h1>
          <p className="text-sm text-gray-500 mb-5">
            Templates from <code>src/lib/emails/contactEmails.ts</code>
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {(Object.keys(variants) as VariantKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setVariant(key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  variant === key
                    ? "bg-[#1F2A44] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {variants[key].label}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Subject:</span> {email.subject}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-2.5 text-sm font-semibold">
              Desktop
            </div>
            <iframe
              srcDoc={email.html}
              className="w-full h-[900px] border-0"
              title="Desktop email preview"
            />
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-800 text-white px-5 py-2.5 text-sm font-semibold">
              Mobile (375px)
            </div>
            <div className="p-4 bg-gray-50 flex justify-center">
              <iframe
                srcDoc={email.html}
                className="w-[375px] h-[820px] border border-gray-300 rounded-lg bg-white"
                title="Mobile email preview"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-800 text-white px-5 py-2.5 text-sm font-semibold">
            Plain-text fallback
          </div>
          <pre className="p-5 text-xs text-gray-700 whitespace-pre-wrap font-mono">
            {email.text}
          </pre>
        </div>
      </div>
    </div>
  );
}
