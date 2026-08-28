import type { Outcome } from "./grading";

export interface OutcomeTemplate {
  /** Headline name shown as "Your AI opportunity". */
  label: string;
  /** One-line positioning under the headline. */
  summary: string;
  today: string;
  future: string;
  firstStep: string;
  /** Used when the Claude call fails or times out. */
  fallbackWhatWeHeard: string;
  fallbackOpportunity: string;
  fallbackFutureState: string;
}

export const OUTCOMES: Record<Outcome, OutcomeTemplate> = {
  AUTOMATE: {
    label: "Automate",
    summary: "The same steps are being repeated by hand. That work can run itself.",
    today: "The same steps get repeated by hand, every time.",
    future: "The work runs itself, and a person only steps in for the exception.",
    firstStep:
      "Map every step of this workflow exactly as it happens today. That map is most of the work.",
    fallbackWhatWeHeard:
      "You described a workflow where the same steps get repeated manually, and that repetition is costing your team real time. The work itself is well understood, it just has to be done again and again by hand.",
    fallbackOpportunity:
      "When a process is repetitive and well understood, it is a strong candidate for automation. The opportunity is to let the routine path run on its own so your people spend their time on the cases that genuinely need judgment.",
    fallbackFutureState:
      "The routine path runs without anyone driving it. Work arrives already prepared, and the first time a person touches it is to check the parts that need a decision. Your team stops rebuilding the same thing and starts each piece further along, which is where the reclaimed hours actually show up.",
  },
  AI_ASSIST: {
    label: "AI-Assist",
    summary: "The knowledge exists. Getting to it is what costs you.",
    today: "The right information exists, but finding it costs real time.",
    future: "The information surfaces the moment it's needed, with no digging.",
    firstStep:
      "Write down what an experienced person needs to know to make this call. That becomes the foundation.",
    fallbackWhatWeHeard:
      "You described a workflow where the information people need already exists somewhere, but locating it takes real effort. The bottleneck is retrieval, not capability.",
    fallbackOpportunity:
      "When knowledge is scattered, the fastest gain comes from surfacing it rather than reorganising everything. The opportunity is to put the right context in front of people at the moment they need it, so experience is not spent searching.",
    fallbackFutureState:
      "The context arrives with the work instead of being hunted down before it. Someone opens a task and the relevant history, precedent, and detail are already there, drawn from material your business already has. Less experienced people make the call an experienced person would, because they can see what an experienced person would see.",
  },
  REDESIGN: {
    label: "Redesign",
    summary: "Too many hands touch this before it moves. Fix the shape first.",
    today: "Too many people and approvals touch this before it moves.",
    future: "Fewer handoffs, and a shorter, clearer path.",
    firstStep:
      "Map who touches this workflow and why. Most redesigns start by removing a handoff, not adding a tool.",
    fallbackWhatWeHeard:
      "You described a workflow that moves between several people, systems, or approvals before it is finished. Each handoff adds waiting time and another place for things to stall.",
    fallbackOpportunity:
      "Automating a process with too many handoffs usually just moves the delay around. The opportunity is to change the shape of the workflow first, because a shorter path is worth more than a faster version of a long one.",
    fallbackFutureState:
      "The path gets shorter. Fewer people touch the work before it moves, and the ones who do are the ones whose judgment actually changes the outcome. Work stops sitting in queues waiting for an approval that was never really a decision, and the elapsed time drops even though nobody is working faster.",
  },
  MONITOR: {
    label: "Monitor",
    summary: "You find out too late. The opportunity is early warning.",
    today: "Problems surface only after a customer or colleague flags them.",
    future: "The system catches the warning signs and flags them first.",
    firstStep:
      "Identify the earliest possible signal that something's about to go wrong. That signal becomes the trigger.",
    fallbackWhatWeHeard:
      "You described a workflow where problems tend to be discovered after the fact, usually once someone else has noticed. The team is capable of fixing issues, it just finds out about them too late.",
    fallbackOpportunity:
      "When the core issue is visibility rather than effort, the gain comes from catching problems earlier rather than resolving them faster. The opportunity is to detect the warning signs while there is still time to act on them.",
    fallbackFutureState:
      "You find out first. The system watches the work as it runs and raises the early signals, so the problem reaches your team while there is still time to fix it quietly. The same people handle the same volume, but they stop absorbing the cost of discovering things late and stop spending their week on recovery.",
  },
  EXPLORE: {
    label: "Explore",
    summary: "Several things are contributing. Worth mapping before building.",
    today: "Multiple things are contributing, with no single obvious fix.",
    future: "To be determined, with more clarity.",
    firstStep:
      "A short working session to map the actual workflow will surface the real opportunity.",
    fallbackWhatWeHeard:
      "You described a workflow where several things are contributing to the friction at once, without one clear source standing out above the others.",
    fallbackOpportunity:
      "When friction is spread across a workflow, picking a tool too early usually solves the wrong problem. The opportunity starts with mapping how the work actually happens, which almost always makes the real bottleneck obvious.",
    fallbackFutureState:
      "That depends on what the mapping surfaces, and being honest about it is more useful than guessing. What changes first is clarity: a shared picture of how the work actually moves, where it stalls, and which single change would take the most weight out of it. That picture is usually worth more than the tool anyone would have bought without it.",
  },
  AUTOMATE_AI_ASSIST: {
    label: "Automate + AI-Assist",
    summary: "Two things are slowing this down, and they need different fixes.",
    today: "Repeated manual work and hard-to-find information, both slowing this down.",
    future:
      "The repetitive parts run themselves, and the judgment parts get the right context automatically.",
    firstStep:
      "Start with whichever piece is costing more right now. That's usually the clearer signal of the two.",
    fallbackWhatWeHeard:
      "You described two things happening at once: the same steps being repeated by hand, and information that takes real effort to track down. Both are slowing the same workflow.",
    fallbackOpportunity:
      "These two problems need different solutions, which is why they are worth separating. The opportunity is to let the routine steps run on their own while making sure the parts that need judgment have the right context immediately available.",
    fallbackFutureState:
      "Two things change at once. The repetitive setup runs on its own, so work arrives already assembled rather than built from scratch. And where judgment is genuinely needed, the context is already on the screen instead of scattered across tools. Your team spends its time on the decisions, not on the preparation that used to surround them.",
  },
};
