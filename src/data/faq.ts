export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What does Refactrd do?",
    answer:
      "We help companies hire vetted African engineers for remote, full-time roles through a structured hiring process.",
  },
  {
    id: 2,
    question: "What Types of Roles do You Support?",
    answer:
      "We focus on engineering roles across frontend, backend, full-stack, mobile, and infrastructure.",
  },
  {
    id: 3,
    question: "How do You Vet Talent?",
    answer:
      "Our process combines technical assessments, manual reviews, and AI-assisted analysis to ensure consistency and quality.",
  },
  {
    id: 4,
    question: "How do You Handle Time zone Differences?",
    answer:
      "Engineers in our network have experience working with overlapping schedules across regions.",
  },
  {
    id: 5,
    question: "Is Refactrd a Talent Marketplace?",
    answer:
      "No. We operate as a hiring partner, not a self-serve platform.",
  },
  {
    id: 6,
    question: "What is your vetting process?",
    answer:
      "Every candidate goes through a rigorous vetting process including technical assessments, portfolio reviews, coding challenges, and behavioral interviews. We verify their experience, skills, and cultural fit to ensure they meet our high standards before presenting them to clients.",
  },
  {
    id: 7,
    question: "What does Refactrd specialize in?",
    answer:
      "We specialize in hiring African engineers for remote, full-time roles.",
  },
  {
    id: 8,
    question: "How selective is your talent network?",
    answer:
      "Our network is intentionally small and curated to maintain quality.",
  },
];
