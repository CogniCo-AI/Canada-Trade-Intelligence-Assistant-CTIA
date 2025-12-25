
import React, { useState } from 'react';
import HeroInput, { CTIALogo } from './components/HeroInput';
import AgentVisualizer from './components/AgentVisualizer';
import Dashboard from './components/Dashboard';
import { analyzeTradeQuery } from './services/geminiService';
import { AgentStatus, TradeReport } from './types';
import { Globe } from 'lucide-react';

export type LanguageCode = 'en' | 'fr' | 'ms' | 'tl' | 'id' | 'vi';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<'input' | 'processing' | 'results'>('input');
  const [status, setStatus] = useState<AgentStatus>(AgentStatus.IDLE);
  const [report, setReport] = useState<TradeReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageCode>('en');

  const handleSearch = async (query: string) => {
    setViewState('processing');
    setError(null);

    // Simulate the sequence of agents for visual effect
    const sequence = [
      AgentStatus.ORCHESTRATING,
      AgentStatus.CLASSIFYING,
      AgentStatus.CHECKING_COMPLIANCE,
      AgentStatus.ANALYZING_MARKET,
      AgentStatus.CALCULATING_DUTY
    ];

    let currentStepIndex = 0;
    setStatus(sequence[currentStepIndex]);

    // Start the interval to flip visual cards
    const interval = setInterval(() => {
      currentStepIndex++;
      if (currentStepIndex < sequence.length) {
        setStatus(sequence[currentStepIndex]);
      }
    }, 1500); // 1.5s per step visual delay

    try {
      // Actually fetch data in background, passing the selected language
      const data = await analyzeTradeQuery(query, language);
      
      clearInterval(interval);
      setStatus(AgentStatus.COMPLETE);
      setReport(data);
      // Small delay to let the 'Complete' state register
      setTimeout(() => setViewState('results'), 500);

    } catch (err) {
      clearInterval(interval);
      setStatus(AgentStatus.ERROR);
      setError("Analysis failed. Please try again. Ensure API Key is set.");
      setViewState('input');
    }
  };

  const handleReset = () => {
    setViewState('input');
    setReport(null);
    setStatus(AgentStatus.IDLE);
    setError(null);
  };

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'tl', label: 'Filipino' },
    { code: 'id', label: 'Bahasa Indonesia' },
    { code: 'vi', label: 'Tiếng Việt' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation / Header */}
      <nav className={`border-b border-slate-200 sticky top-0 z-50 transition-colors ${viewState === 'input' ? 'bg-slate-950 border-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleReset}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors ${viewState === 'input' ? 'text-red-500' : 'text-red-700'}`}>
                <CTIALogo className="w-8 h-8" />
              </div>
              <span className={`font-bold text-xl tracking-tight ${viewState === 'input' ? 'text-white' : 'text-slate-900'}`}>CTIA</span>
            </div>
            <div className="flex items-center gap-4">
              
              {/* Language Selector */}
              <div className="relative group">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${viewState === 'input' ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'} cursor-pointer transition-colors`}>
                  <Globe className="w-4 h-4" />
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                    className="bg-transparent border-none focus:ring-0 text-sm font-medium cursor-pointer appearance-none pr-4 outline-none"
                    style={{ backgroundImage: 'none' }}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code} className="text-slate-900 bg-white">
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-red-900/20 text-sm">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative">
        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-lg">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {viewState === 'input' && (
          <HeroInput onSearch={handleSearch} isLoading={false} language={language} />
        )}

        {viewState === 'processing' && (
          <div className="flex flex-col items-center justify-center flex-grow bg-slate-50 py-20">
             <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-slate-800">Coordinating Trade Intelligence</h2>
               <p className="text-slate-500 mt-2">Dispatching agents to analyze your query...</p>
             </div>
             <AgentVisualizer status={status} />
          </div>
        )}

        {viewState === 'results' && report && (
          <Dashboard report={report} onReset={handleReset} language={language} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2025 CogniCo AI Consulting</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
