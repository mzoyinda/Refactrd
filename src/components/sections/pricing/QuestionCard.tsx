'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: string;
  description?: string;
  children: ReactNode;
}

export default function QuestionCard({
  question,
  description,
  children,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Question header */}
      <div className="mb-8">
        <h2 className="text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] mb-4">
          {question}
        </h2>
        {description && (
          <p className="font-clash text-lg text-[#64748B] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Question content/options */}
      <div>{children}</div>
    </motion.div>
  );
}