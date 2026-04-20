import { AnswerOption, Question, SubZone, Zone } from "@/app/types/diagonistic";

// Helper to create consistent answer options
const createOptions = (
  automated: string,
  manual: string,
  notDone: string
): [AnswerOption, AnswerOption, AnswerOption] => [
  { text: automated, points: 4 },
  { text: manual, points: 2 },
  { text: notDone, points: 0 },
];

// ZONE 1: CUSTOMER EXPERIENCE
const zone1: Zone = {
  id: '1',
  name: 'Customer Experience',
  maxScore: 16,
  subZones: [
    {
      id: '1A',
      name: 'Initial Response and Lead Acknowledgement',
      maxScore: 4,
      questions: [
        {
          id: 'Q1',
          text: 'When a new enquiry comes in via WhatsApp, email, DM, or your website, how is the first response handled?',
          options: createOptions(
            'We have an automated response that goes out immediately, every time',
            'Someone on the team responds manually, usually within the same day',
            'It depends on who is available. Response time is inconsistent'
          ),
        },
      ],
    },
    {
      id: '1B',
      name: 'Follow-up and Nurture After First Contact',
      maxScore: 4,
      questions: [
        {
          id: 'Q2',
          text: 'After a first conversation with a potential customer or client, how is follow-up managed?',
          options: createOptions(
            'A follow-up sequence triggers automatically based on where they are in the process',
            'Someone on the team follows up manually based on notes or memory',
            'Follow-up is inconsistent. Some leads get it, some do not'
          ),
        },
      ],
    },
    {
      id: '1C',
      name: 'Customer Support and Issue Resolution',
      maxScore: 8,
      questions: [
        {
          id: 'Q3',
          text: 'When an existing customer raises an issue or question, how is it handled?',
          options: createOptions(
            'Common queries are handled by an automated system before escalating to the team',
            'The team handles everything manually. No triage or automation in place',
            'It depends on who is available. There is no consistent process'
          ),
        },
        {
          id: 'Q4',
          text: 'How do you track whether customer issues are being resolved on time?',
          options: createOptions(
            'We have an automated system that tracks open issues and flags delays',
            'We track this manually, usually through spreadsheets or WhatsApp threads',
            'We do not have a structured way to track this'
          ),
        },
      ],
    },
  ],
};

// ZONE 2: INTERNAL OPERATIONS
const zone2: Zone = {
  id: '2',
  name: 'Internal Operations',
  maxScore: 12,
  subZones: [
    {
      id: '2A',
      name: 'Team Coordination and Alignment',
      maxScore: 4,
      questions: [
        {
          id: 'Q5',
          text: 'How does your team get aligned on priorities at the start of each week?',
          options: createOptions(
            'A structured summary is generated and distributed automatically before the week begins',
            'We hold a manual meeting or someone compiles updates by hand',
            'Alignment is ad hoc. People check in informally or not at all'
          ),
        },
      ],
    },
    {
      id: '2B',
      name: 'Knowledge Management and Documentation',
      maxScore: 4,
      questions: [
        {
          id: 'Q6',
          text: 'When a team member needs to find a process, policy, or past document, where do they go?',
          options: createOptions(
            'We have a centralised searchable knowledge base that is kept up to date',
            'Documents exist but are spread across Drive folders, WhatsApp, and email',
            'There is no central system. People ask each other or figure things out themselves'
          ),
        },
      ],
    },
    {
      id: '2C',
      name: 'Reporting and Performance Tracking',
      maxScore: 4,
      questions: [
        {
          id: 'Q7',
          text: 'How are your key business metrics compiled each week or month?',
          options: createOptions(
            'Reports are generated automatically and available without anyone producing them manually',
            'Someone on the team pulls the numbers together manually each reporting period',
            'Reporting is irregular. We look at numbers when something prompts us to'
          ),
        },
      ],
    },
  ],
};

// ZONE 3: OUTREACH AND GROWTH
const zone3: Zone = {
  id: '3',
  name: 'Outreach and Growth',
  maxScore: 16,
  subZones: [
    {
      id: '3A',
      name: 'Pipeline and Opportunity Management',
      maxScore: 4,
      questions: [
        {
          id: 'Q8',
          text: 'How do you track where each active lead, donor, or partner opportunity currently stands?',
          options: createOptions(
            'We have a CRM or pipeline tool that updates automatically based on activity',
            'We track this manually in a spreadsheet or document',
            'Pipeline tracking is informal. We rely on memory or WhatsApp to know where things are'
          ),
        },
      ],
    },
    {
      id: '3B',
      name: 'Partner and Stakeholder Communication',
      maxScore: 4,
      questions: [
        {
          id: 'Q9',
          text: 'How do you maintain regular communication with partners, donors, or key stakeholders?',
          options: createOptions(
            'We have structured automated touchpoints that keep stakeholders updated without manual effort',
            'We communicate manually when there is news or when someone remembers to follow up',
            'Stakeholder communication is reactive. We reach out only when there is a specific reason'
          ),
        },
      ],
    },
    {
      id: '3C',
      name: 'Proposal and Pitch Production',
      maxScore: 8,
      questions: [
        {
          id: 'Q10',
          text: 'How does your team produce proposals, pitches, or scopes of work for new opportunities?',
          options: createOptions(
            'We have templates and AI-assisted tools that allow us to produce proposals quickly and consistently',
            'We write proposals manually each time, adapting from previous versions',
            'Proposal production is slow and inconsistent. Each one is largely built from scratch'
          ),
        },
        {
          id: 'Q11',
          text: 'How long does it typically take to get a proposal or pitch out from first conversation to delivery?',
          options: createOptions(
            'We can turn around a strong proposal within 24 hours using our systems',
            'It usually takes 3 to 5 days depending on who is available',
            'Turnaround is unpredictable. It depends on workload and can take over a week'
          ),
        },
      ],
    },
  ],
};

// ZONE 4: PEOPLE AND TALENT
const zone4: Zone = {
  id: '4',
  name: 'People and Talent',
  maxScore: 20,
  subZones: [
    {
      id: '4A',
      name: 'Hiring and Screening',
      maxScore: 4,
      questions: [
        {
          id: 'Q12',
          text: 'When you open a new role, how is the hiring process managed from job description to shortlist?',
          options: createOptions(
            'We have templated job descriptions, automated screening, and a structured candidate flow',
            'We write job descriptions manually and screen applications by hand',
            'Hiring is ad hoc. The process changes each time depending on who is leading it'
          ),
        },
      ],
    },
    {
      id: '4B',
      name: 'Onboarding and Role Clarity',
      maxScore: 8,
      questions: [
        {
          id: 'Q13',
          text: 'When a new team member joins, what does their first two weeks look like?',
          options: createOptions(
            'We have a structured onboarding sequence that runs automatically and is consistent for every hire',
            'Onboarding is managed manually. Quality depends on who has time to run it',
            'Onboarding is informal. New hires largely figure things out themselves'
          ),
        },
        {
          id: 'Q14',
          text: 'How does a new team member know exactly what success looks like in their role?',
          options: createOptions(
            'Role expectations, KPIs, and 30/60/90 day milestones are documented and shared automatically at hire',
            'We communicate expectations verbally or in a document shared manually',
            'Role clarity is informal. Expectations are not consistently documented'
          ),
        },
      ],
    },
    {
      id: '4C',
      name: 'Performance Cycles and Feedback',
      maxScore: 8,
      questions: [
        {
          id: 'Q15',
          text: 'How are performance reviews and check-ins managed across your team?',
          options: createOptions(
            'Check-ins and review cycles are scheduled and tracked automatically. Nothing depends on someone remembering',
            'We do performance reviews manually on a schedule someone has to manage',
            'Performance conversations happen reactively, usually when there is a problem'
          ),
        },
        {
          id: 'Q16',
          text: 'How does your team give and receive structured feedback outside of formal reviews?',
          options: createOptions(
            'We have a lightweight system that creates regular feedback loops without requiring manual coordination',
            'Feedback happens informally in conversation or not at all between formal reviews',
            'There is no structured feedback culture or system in place'
          ),
        },
      ],
    },
  ],
};

// Export all zones
export const DIAGNOSTIC_ZONES: Zone[] = [zone1, zone2, zone3, zone4];

// Export total question count for progress tracking
export const TOTAL_QUESTIONS = 16;

// Helper function to get all questions in order
export function getAllQuestions(): Question[] {
  const questions: Question[] = [];
  
  DIAGNOSTIC_ZONES.forEach(zone => {
    zone.subZones.forEach(subZone => {
      questions.push(...subZone.questions);
    });
  });
  
  return questions;
}

// Helper function to get question by ID
export function getQuestionById(questionId: string): Question | undefined {
  const allQuestions = getAllQuestions();
  return allQuestions.find(q => q.id === questionId);
}

// Helper function to get sub-zone by ID
export function getSubZoneById(subZoneId: string): SubZone | undefined {
  for (const zone of DIAGNOSTIC_ZONES) {
    const subZone = zone.subZones.find(sz => sz.id === subZoneId);
    if (subZone) return subZone;
  }
  return undefined;
}

// Helper function to get zone by ID
export function getZoneById(zoneId: string): Zone | undefined {
  return DIAGNOSTIC_ZONES.find(z => z.id === zoneId);
}

// Total number of questions
