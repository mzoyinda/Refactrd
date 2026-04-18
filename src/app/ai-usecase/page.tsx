export default function StartPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-clash font-bold text-[#1F2A44] mb-4">
          If you had to implement AI in 14 days…
        </h1>
        <p className="text-2xl font-clash text-[#64748B] mb-8">
          What would you build?
        </p>
        
        <p className="text-lg font-jakarta text-[#1F2A44] mb-8">
          We help you answer that, build and deploy it.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-12 text-left">
          <div className="p-4 bg-[#E6EAF0] rounded-lg">
            <p className="font-clash font-semibold text-[#1F2A44]">• Workflow automation</p>
          </div>
          <div className="p-4 bg-[#E6EAF0] rounded-lg">
            <p className="font-clash font-semibold text-[#1F2A44]">• Internal AI assistants & Co-Pilots</p>
          </div>
          <div className="p-4 bg-[#E6EAF0] rounded-lg">
            <p className="font-clash font-semibold text-[#1F2A44]">• Product AI features</p>
          </div>
          <div className="p-4 bg-[#E6EAF0] rounded-lg">
            <p className="font-clash font-semibold text-[#1F2A44]">• Agentic Workflows & AI Operations</p>
          </div>
        </div>

        <a
          href="https://cal.com/refactrd/technical-discovery-call"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold hover:bg-[#0e5d7d] transition-all duration-300"
        >
          Get Your First AI Use Case
        </a>
      </div>
    </div>
  );
}