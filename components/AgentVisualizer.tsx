import React, { useEffect, useState } from 'react';
import { AgentStatus, AgentLog } from '../types';
import { Brain, FileText, Scale, TrendingUp, Users, CheckCircle, Loader2 } from 'lucide-react';

interface AgentVisualizerProps {
  status: AgentStatus;
}

const AgentVisualizer: React.FC<AgentVisualizerProps> = ({ status }) => {
  const [logs, setLogs] = useState<AgentLog[]>([]);

  // Simulation of logs coming in based on status
  useEffect(() => {
    let newLog: AgentLog | null = null;
    const now = new Date();

    switch (status) {
      case AgentStatus.ORCHESTRATING:
        newLog = { agentName: 'Supervisor', action: 'Decomposing query & routing tasks...', timestamp: now, status: 'pending' };
        break;
      case AgentStatus.CLASSIFYING:
        newLog = { agentName: 'Taxonomist', action: 'Consulting Customs Tariff for HS Code...', timestamp: now, status: 'pending' };
        break;
      case AgentStatus.CHECKING_COMPLIANCE:
        newLog = { agentName: 'Compliance Officer', action: 'Querying CFIA AIRS database...', timestamp: now, status: 'pending' };
        break;
      case AgentStatus.ANALYZING_MARKET:
        newLog = { agentName: 'Strategic Agent', action: 'Fetching StatCan trade volumes...', timestamp: now, status: 'pending' };
        break;
      case AgentStatus.CALCULATING_DUTY:
        newLog = { agentName: 'Duty Agent', action: 'Calculating MFN/GPT rates...', timestamp: now, status: 'pending' };
        break;
    }

    if (newLog) {
      setLogs(prev => {
        // Mark previous as success
        const updated = prev.map((l, i) => i === 0 ? { ...l, status: 'success' as const } : l);
        return [newLog!, ...updated];
      });
    }
  }, [status]);

  const agents = [
    { id: AgentStatus.ORCHESTRATING, icon: Brain, label: 'Orchestrator' },
    { id: AgentStatus.CLASSIFYING, icon: FileText, label: 'Classification' },
    { id: AgentStatus.CHECKING_COMPLIANCE, icon: Scale, label: 'Compliance' },
    { id: AgentStatus.ANALYZING_MARKET, icon: TrendingUp, label: 'Market Intel' },
    { id: AgentStatus.CALCULATING_DUTY, icon: Users, label: 'Partners' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
        {agents.map((agent, index) => {
          const isActive = status === agent.id;
          const isPast = Object.values(AgentStatus).indexOf(status) > index;
          const Icon = agent.icon;

          return (
            <div key={agent.id} className="flex flex-col items-center bg-slate-50 px-2">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500
                ${isActive ? 'border-red-600 bg-white scale-110 shadow-lg' : isPast ? 'border-red-600 bg-red-600' : 'border-slate-300 bg-white'}
              `}>
                {isPast ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                )}
              </div>
              <span className={`mt-2 text-xs font-semibold tracking-wide ${isActive ? 'text-red-700' : 'text-slate-500'}`}>
                {agent.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Real-time Logs */}
      <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm shadow-2xl border border-slate-700 h-64 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-2">
           <span className="flex items-center gap-2 text-xs text-green-400">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             System Active
           </span>
        </div>
        <div className="space-y-3">
          {logs.map((log, i) => (
            <div key={i} className={`flex items-start gap-3 ${i === 0 ? 'opacity-100' : 'opacity-60'}`}>
               <span className="text-slate-500 min-w-[80px]">{log.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}</span>
               <span className="text-blue-400 font-bold min-w-[140px]">[{log.agentName}]</span>
               <span className="text-slate-200 flex-1">{log.action}</span>
               {log.status === 'pending' && <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />}
               {log.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AgentVisualizer;