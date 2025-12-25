
export enum AgentStatus {
  IDLE = 'IDLE',
  ORCHESTRATING = 'ORCHESTRATING', // Supervisor
  CLASSIFYING = 'CLASSIFYING', // Classification Agent
  CHECKING_COMPLIANCE = 'CHECKING_COMPLIANCE', // Compliance Agent
  ANALYZING_MARKET = 'ANALYZING_MARKET', // Strategic/Scout Agent
  CALCULATING_DUTY = 'CALCULATING_DUTY', // Duty Agent
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface MarketTrendPoint {
  month: string;
  volume: number;
  value: number; // in CAD
}

export interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  source: string; // e.g. "CFIA AIRS"
  sourceUrl?: string; // URL to the regulation
}

export interface PartnerProfile {
  name: string;
  type: 'BUYER' | 'SUPPLIER' | 'DISTRIBUTOR';
  location: string;
  matchScore: number;
}

export interface TradeCommissioner {
  name: string;
  title: string;
  location: string;
  email: string;
  sectors?: string[];
  expertise?: string[];
}

export interface DutyInfo {
  tariffTreatment: string; // e.g., MFN, GPT, CUSMA
  rate: string;
  programs: string[]; // e.g., "Duties Relief Program"
}

export interface TopPartner {
  country: string;
  value: number;
  percentage: number;
}

export interface ProvincialData {
  province: string;
  value: number;
  percentage: number;
}

export interface TradeReport {
  commodity: string;
  hsCode: string;
  hsDescription: string;
  originCountry: string;
  targetCountry: string;
  compliance: ComplianceRequirement[];
  trends: MarketTrendPoint[];
  duties: DutyInfo;
  partners: PartnerProfile[];
  tradeCommissioners: TradeCommissioner[];
  summary: string;
  lastUpdated: string;
  topPartners?: TopPartner[];
  provincialData?: ProvincialData[];
}

export interface AgentLog {
  agentName: string;
  action: string;
  timestamp: Date;
  status: 'pending' | 'success' | 'warning';
}
