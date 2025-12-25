
import React, { useState } from 'react';
import { Search, ArrowRight, Layers, ShieldCheck, Globe, Zap, Users, ChevronRight, BarChart3, Lock, FileSearch } from 'lucide-react';

interface HeroInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  language: string;
}

export const CTIALogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeroInput: React.FC<HeroInputProps> = ({ onSearch, isLoading, language }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const suggestions = [
    "Import mangoes from Philippines",
    "Export canola oil to Malaysia",
    "Import spices from Indonesia",
    "Export blueberries to Vietnam"
  ];

  const t: Record<string, Record<string, string>> = {
    placeholder: { en: "Ask about a trade flow (e.g., 'Fresh Potatoes to USA')", fr: "Demandez un flux commercial (ex: 'Pommes de terre fraîches vers les USA')", ms: "Tanya tentang aliran perdagangan", tl: "Magtanong tungkol sa kalakalan", id: "Tanyakan arus perdagangan", vi: "Hỏi về luồng thương mại" },
    analyze: { en: "Analyze", fr: "Analyser", ms: "Analisis", tl: "Pag-aralan", id: "Analisis", vi: "Phân tích" },
    tryExample: { en: "Try example", fr: "Essayer un exemple", ms: "Cuba contoh", tl: "Subukan ang halimbawa", id: "Coba contoh", vi: "Thử ví dụ" }
  };
  
  const txt = (key: string) => t[key][language] || t[key]['en'];

  return (
    <div className="w-full bg-white flex flex-col">
      
      {/* Hero Section */}
      <div className="relative bg-slate-950 text-white pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-slate-800/20 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-12 max-w-6xl pt-8 text-slate-500 leading-tight">
            AI That Powers Trade Decisions <br /> <span className="text-white font-semibold">In Real Time.</span>
          </h1>

          {/* Search Input */}
          <form onSubmit={handleSubmit} className="w-full max-w-3xl relative group mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full p-2 pl-6 shadow-2xl transition-all ring-1 ring-white/10 focus-within:ring-red-500/50">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                type="text"
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 text-lg py-2"
                placeholder={txt('placeholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 px-8 font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-900/20"
              >
                {isLoading ? '...' : txt('analyze')}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            <span className="text-sm text-slate-500 py-1">{txt('tryExample')}:</span>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setQuery(s)}
                className="text-sm text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1 rounded-full transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Mini Stats/Trust */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-slate-800 pt-8 opacity-70">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">8-Digit</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">HS Classification</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">Live</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">AIRS Integration</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Duty Accuracy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">TFO</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Partner Database</span>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid Section */}
      <div className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-red-700 font-bold tracking-wide uppercase text-sm mb-3">The Intelligence Layer</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Five specialized agents. One coherent answer.</h3>
            <p className="text-slate-600">
              CTIA doesn't just search; it thinks. The Supervisor breaks down your query and dispatches specialized agents to gather, verify, and synthesize data from siloed government sources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AgentCard 
              icon={<FileSearch className="w-6 h-6 text-blue-600" />}
              title="The Taxonomist"
              role="HS Classification Agent"
              description="Automatically maps natural language products to precise 8-digit Customs Tariff HS Codes using semantic understanding."
            />
            <AgentCard 
              icon={<ShieldCheck className="w-6 h-6 text-red-600" />}
              title="The Compliance Officer"
              role="SPS & Regulatory Agent"
              description="Simulates AIRS decision trees to identify phytosanitary certificates, soil restrictions, and labeling requirements."
            />
            <AgentCard 
              icon={<BarChart3 className="w-6 h-6 text-emerald-600" />}
              title="The Strategist"
              role="Market Trend Agent"
              description="Visualizes 12-month volume trends and farm-gate pricing signals to detect shifts in demand before they happen."
            />
            <AgentCard 
              icon={<Zap className="w-6 h-6 text-amber-600" />}
              title="The Accountant"
              role="Duty & Incentive Agent"
              description="Calculates base MFN, GPT, and CUSMA rates while flagging relevant incentive programs like the Duties Relief Program."
            />
             <AgentCard 
              icon={<Users className="w-6 h-6 text-purple-600" />}
              title="The Scout"
              role="Partner Identification"
              description="Scans TFO and Trade Commissioner databases to create a shortlist of high-potential buyers or suppliers."
            />
             <div className="bg-slate-900 rounded-xl p-6 flex flex-col justify-center items-center text-center text-white shadow-xl">
               <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                 <CTIALogo className="w-6 h-6 text-red-500" />
               </div>
               <h4 className="font-bold text-lg mb-2">The Supervisor</h4>
               <p className="text-slate-400 text-sm">Synthesizes all agent outputs into a single, actionable strategic brief.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Architecture / How it Works */}
      <div className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl font-bold text-slate-900">From Raw Data to <br/>Trade Strategy.</h2>
              <div className="space-y-6">
                <WorkflowStep 
                  number="01"
                  title="Ingestion (The Senses)"
                  desc="CTIA constantly 'listens' to legislative updates, real-time price shocks, and monthly trade volumes."
                />
                 <WorkflowStep 
                  number="02"
                  title="Intelligence (The Brain)"
                  desc="Multi-agent planning occurs. Agents research compliance, logistics, and tariffs in parallel."
                />
                 <WorkflowStep 
                  number="03"
                  title="Experience (The Interface)"
                  desc="Complex data is rendered into a 'Day in the Life' one-pager for immediate policy support."
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Globe className="w-5 h-5"/></div>
                    <div>
                      <span className="text-sm font-bold text-slate-800">Raw Data</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="h-8 w-0.5 bg-slate-200"></div>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-lg shadow-lg text-white border border-slate-700">
                     <div className="flex items-center gap-3 mb-4">
                       <CTIALogo className="w-6 h-6 text-red-500" />
                       <span className="font-bold">CTIA Core</span>
                     </div>
                     <div className="space-y-2">
                       <div className="flex gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 mt-1"></span>
                          <div className="h-2 w-full bg-slate-700 rounded opacity-50"></div>
                       </div>
                       <div className="flex gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-1"></span>
                          <div className="h-2 w-3/4 bg-slate-700 rounded opacity-50"></div>
                       </div>
                     </div>
                  </div>
                   <div className="flex justify-center">
                    <div className="h-8 w-0.5 bg-slate-200"></div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"><CheckCircle className="w-5 h-5"/></div>
                    <div>
                      <div className="h-2 w-28 bg-slate-100 rounded mb-2"></div>
                      <span className="text-xs font-bold text-slate-800">Actionable Intelligence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

const AgentCard = ({ icon, title, role, description }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-4 border border-slate-100">
      {icon}
    </div>
    <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
    <span className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2 block">{role}</span>
    <p className="text-sm text-slate-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const WorkflowStep = ({ number, title, desc }: any) => (
  <div className="flex gap-4">
    <span className="text-lg font-bold text-slate-300 font-mono pt-1">{number}</span>
    <div>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  </div>
);

// Simple Icon helper for visual section
function CheckCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  );
}

export default HeroInput;
