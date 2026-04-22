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

// ZONE 1: TOOL STACK AND INTEGRATION
const zone1: Zone = {
  id: '1',
  name: 'Tool Stack and Integration',
  maxScore: 16,
  subZones: [
    {
      id: '1A',
      name: 'Tools You Are Currently Using',
      maxScore: 4,
      questions: [
        {
          id: 'Q1',
          text: 'How would you describe the tools your organisation currently runs on?',
          options: createOptions(
            'We have a deliberate tool stack. Each tool has a clear purpose and someone who owns it',
            'We use a mix of tools picked up over time. Some overlap, some have clear gaps',
            'Most things run on WhatsApp, email, and shared documents. The tool setup is still being figured out'
          ),
        },
      ],
    },
    {
      id: '1B',
      name: 'How Your Tools Connect',
      maxScore: 4,
      questions: [
        {
          id: 'Q2',
          text: 'When information is captured in one tool, such as a new lead, a payment, or a completed task, does it automatically flow to where it needs to go next?',
          options: createOptions(
            'Yes. The core tools are connected and information moves between them without anyone transferring it manually',
            'Sometimes. A few connections exist but a lot still gets copied across by hand',
            'No. Each tool sits separately. Moving information between them always requires a manual step'
          ),
        },
      ],
    },
    {
      id: '1C',
      name: 'Repetitive Manual Work',
      maxScore: 8,
      questions: [
        {
          id: 'Q3',
          text: 'Think about the tasks your team handles repeatedly every week, things like sending updates, chasing approvals, compiling information, or following up on outstanding items. How are those handled?',
          options: createOptions(
            'Most recurring tasks run automatically. The team focuses on exceptions and decisions, not routine execution',
            'Some recurring tasks are systematised. Others still depend on someone remembering to initiate them',
            'Most of this work is done manually every time. Nothing runs unless someone actively starts it'
          ),
        },
        {
          id: 'Q4',
          text: 'How much of a typical week for senior people in your organisation goes into work that a well-configured system could handle?',
          options: createOptions(
            'Very little. Routine work has largely been offloaded to systems or clearly structured processes',
            'Some. There are things senior people still handle personally that should not require their attention',
            'A significant amount. Operational and administrative work takes up more leadership time than it should'
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
          text: 'How does your organisation stay aligned on priorities, progress, and what each person or team is working on?',
          options: createOptions(
            'There is a lightweight system that keeps everyone informed without requiring a meeting or manual update to make it happen',
            'Alignment happens through regular meetings or check-ins but someone has to actively facilitate it each time',
            'Alignment is mostly informal. People generally know their own work but there is no structured way to see the full picture'
          ),
        },
      ],
    },
    {
      id: '2B',
      name: 'Knowledge and Documentation',
      maxScore: 4,
      questions: [
        {
          id: 'Q6',
          text: 'When someone in your organisation needs to find out how something works, whether that is a process, a policy, or a past decision, where do they go?',
          options: createOptions(
            'There is a central place where this information lives and it is actually kept current',
            'Some things are documented but they are scattered across different places and not always up to date',
            "Most of this knowledge lives in people's heads or buried in chat threads that are hard to search"
          ),
        },
      ],
    },
    {
      id: '2C',
      name: 'Reporting and Visibility',
      maxScore: 4,
      questions: [
        {
          id: 'Q7',
          text: 'How does leadership currently understand how the organisation is performing week to week?',
          options: createOptions(
            'There is a dashboard or automated report that gives a clear picture without anyone having to pull it together',
            'Someone compiles this manually or leadership relies on team updates to piece together what is happening',
            'Performance visibility is mostly reactive. Things surface when something goes wrong or someone raises it'
          ),
        },
      ],
    },
  ],
};

// ZONE 3: DELIVERY AND PROJECT EXECUTION
const zone3: Zone = {
  id: '3',
  name: 'Delivery and Project Execution',
  maxScore: 16,
  subZones: [
    {
      id: '3A',
      name: 'How Work Gets Tracked',
      maxScore: 4,
      questions: [
        {
          id: 'Q8',
          text: 'Once work is agreed on, whether with a client, a partner, or internally, how is it tracked through to completion?',
          options: createOptions(
            'There is a project or task management system that shows what is in progress, what is delayed, and what is done',
            'Work is tracked informally through shared documents, WhatsApp threads, or individual notes',
            'Tracking is minimal. Issues usually surface when a deadline is missed or someone follows up to ask'
          ),
        },
      ],
    },
    {
      id: '3B',
      name: 'Client and Stakeholder Updates',
      maxScore: 4,
      questions: [
        {
          id: 'Q9',
          text: 'How do clients, partners, or key stakeholders get updated on progress without having to chase the team?',
          options: createOptions(
            'There is a structured update process that is scheduled, consistent, and does not depend on someone remembering to send it',
            'Updates go out when there is something to share or when someone asks. There is no set rhythm to it',
            'Most updates happen reactively. Stakeholders follow up with the team more often than the other way around'
          ),
        },
      ],
    },
    {
      id: '3C',
      name: 'Proposals and Scopes of Work',
      maxScore: 8,
      questions: [
        {
          id: 'Q10',
          text: 'How does your organisation put together a proposal, quote, or scope of work when a new opportunity comes in?',
          options: createOptions(
            'There are templates and a clear process that allow the team to turn around strong proposals consistently and quickly',
            'There are some templates but proposals still require significant effort and time to pull together each time',
            'Every proposal is largely built from scratch. Quality and turnaround time vary depending on who is doing it'
          ),
        },
        {
          id: 'Q11',
          text: 'How quickly can your team get a proposal or scope of work in front of a potential client or partner after the first conversation?',
          options: createOptions(
            'Within 24 hours, consistently',
            'Usually 3 to 5 days, depending on availability and how complex the scope is',
            'It varies widely. Sometimes fast, sometimes over a week. It mostly depends on who has capacity'
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
      name: 'Bringing People In',
      maxScore: 4,
      questions: [
        {
          id: 'Q12',
          text: 'When your organisation needs to add someone, whether full time, part time, or contract, what does that process look like?',
          options: createOptions(
            'There is a clear, repeatable process covering role definition, structured screening, and how candidates get evaluated',
            'There is a rough approach based on experience but it is not fully documented or consistent each time',
            'Hiring is largely ad hoc. Each time feels like the process is being figured out from scratch'
          ),
        },
      ],
    },
    {
      id: '4B',
      name: 'Getting New People Up to Speed',
      maxScore: 8,
      questions: [
        {
          id: 'Q13',
          text: 'When someone new joins the organisation, what do their first two weeks typically look like?',
          options: createOptions(
            'There is a structured onboarding process that runs consistently regardless of who is managing it',
            'Onboarding happens but the quality depends heavily on who has time and what else is going on that week',
            'New people largely figure things out themselves. The organisation is too stretched to run a proper onboarding'
          ),
        },
        {
          id: 'Q14',
          text: 'How does a new team member understand what they are responsible for and what success looks like in their role from day one?',
          options: createOptions(
            'Role expectations and early milestones are documented and shared as a standard part of joining',
            'This is communicated verbally or informally. It is not written down in a consistent way',
            'Expectations are mostly assumed. People piece together what is required from conversations over time'
          ),
        },
      ],
    },
    {
      id: '4C',
      name: 'Performance and Feedback',
      maxScore: 8,
      questions: [
        {
          id: 'Q15',
          text: 'How do people in your organisation know how they are performing against what is expected of them?',
          options: createOptions(
            'There is a regular structured process for performance conversations and feedback. It runs on a set schedule',
            'These conversations happen but informally, or only when something specific prompts them',
            'Performance feedback is mostly reactive. It surfaces when there is a problem rather than as a regular rhythm'
          ),
        },
        {
          id: 'Q16',
          text: 'Outside of formal reviews, how does feedback flow across teams day to day?',
          options: createOptions(
            'There is a culture and a lightweight structure that makes regular feedback normal and not dependent on a specific event to trigger it',
            'Feedback happens in conversation occasionally but there is no real cadence or structure to it',
            'Feedback culture is something the organisation wants to build but has not established yet'
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