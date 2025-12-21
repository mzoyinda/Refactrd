export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is Refactrd and how does it work?",
    answer:
      "Refactrd is a platform connecting businesses with top-tier remote talent. We carefully vet and match skilled professionals with companies looking for engineering, design, and technical expertise. Simply tell us your needs, and we'll provide you with pre-screened candidates within days.",
  },
  {
    id: 2,
    question: "What Types of Projects Are Available on Refactrd?",
    answer:
      "We support a wide range of projects including web development, mobile app development, UI/UX design, backend engineering, DevOps, data science, and more. Whether you need short-term contract work or long-term dedicated resources, we can help match you with the right talent.",
  },
  {
    id: 3,
    question: "Who Are These Talents?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    question: "Who Are Refactrd's Clients?",
    answer:
      "Our clients range from early-stage startups to established enterprises across various industries including fintech, healthcare, e-commerce, and SaaS. We work with companies of all sizes who need reliable, high-quality remote engineering talent.",
  },
  {
    id: 5,
    question: "How much does it cost to hire through Refactrd?",
    answer:
      "Our pricing is transparent and competitive. Rates vary based on the role, experience level, and engagement type. Contact us for a customized quote based on your specific needs. We offer flexible engagement models to fit your budget.",
  },
  {
    id: 6,
    question: "What is your vetting process?",
    answer:
      "Every candidate goes through a rigorous vetting process including technical assessments, portfolio reviews, coding challenges, and behavioral interviews. We verify their experience, skills, and cultural fit to ensure they meet our high standards before presenting them to clients.",
  },
];
