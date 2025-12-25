
import React from 'react';
import { TradeReport } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { CheckCircle, Globe, Percent, ShieldAlert, Download, ExternalLink, Brain, Map, TrendingUp, Building2, UserCircle, Truck } from 'lucide-react';

interface DashboardProps {
  report: TradeReport;
  onReset: () => void;
  language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ report, onReset, language }) => {
  // Determine if this is an export from Canada or import to Canada to show correct data source
  const isExport = report.originCountry.toLowerCase().includes('canada');
  const statCanUrl = isExport 
    ? "https://www150.statcan.gc.ca/n1/pub/71-607-x/2021004/exp-eng.htm" 
    : "https://www150.statcan.gc.ca/n1/pub/71-607-x/2021004/imp-eng.htm";
  
  // Translation Dictionary
  const t: Record<string, Record<string, string>> = {
    updated: { en: "Updated", fr: "Mis à jour", ms: "Dikemaskini", tl: "Na-update", id: "Diperbarui", vi: "Cập nhật" },
    newSearch: { en: "New Search", fr: "Nouvelle recherche", ms: "Carian Baru", tl: "Bagong Paghahanap", id: "Pencarian Baru", vi: "Tìm kiếm mới" },
    exportBrief: { en: "Export Brief", fr: "Exporter le dossier", ms: "Eksport Ringkasan", tl: "I-export ang Brief", id: "Ekspor Ringkasan", vi: "Xuất tóm tắt" },
    spsCheck: { en: "SPS & Regulatory Check", fr: "Contrôle SPS et réglementaire", ms: "Pemeriksaan SPS & Peraturan", tl: "Pagsusuri ng SPS at Regulasyon", id: "Pemeriksaan SPS & Regulasi", vi: "Kiểm tra SPS & Quy định" },
    source: { en: "Source", fr: "Source", ms: "Sumber", tl: "Pinagmulan", id: "Sumber", vi: "Nguồn" },
    dutyTax: { en: "Duty & Tax", fr: "Droits et taxes", ms: "Duti & Cukai", tl: "Tungkulin at Buwis", id: "Bea & Pajak", vi: "Thuế & Hải quan" },
    tariffTreatment: { en: "Tariff Treatment", fr: "Traitement tarifaire", ms: "Layanan Tarif", tl: "Paggamot sa Taripa", id: "Perlakuan Tarif", vi: "Ưu đãi thuế quan" },
    baseRate: { en: "Base Rate", fr: "Taux de base", ms: "Kadar Asas", tl: "Base Rate", id: "Tarif Dasar", vi: "Thuế suất cơ bản" },
    incentives: { en: "Available Incentives", fr: "Incitatifs disponibles", ms: "Insentif Tersedia", tl: "Magagamit na Insentibo", id: "Insentif Tersedia", vi: "Ưu đãi có sẵn" },
    synthesis: { en: "Orchestrator Synthesis", fr: "Synthèse de l'Orchestrateur", ms: "Sintesis Orkestra", tl: "Sintesis ng Orchestrator", id: "Sintesis Orkestrator", vi: "Tổng hợp thông minh" },
    marketTrends: { en: "Market Trends (Last 12 Months)", fr: "Tendances du marché (12 derniers mois)", ms: "Trend Pasaran (12 Bulan Terakhir)", tl: "Trend sa Market (Huling 12 Buwan)", id: "Tren Pasar (12 Bulan Terakhir)", vi: "Xu hướng thị trường (12 tháng qua)" },
    statCanExport: { en: "Canadian International Merchandise Trade (Exports)", fr: "Commerce international de marchandises du Canada (Exportations)", ms: "Perdagangan Barangan Antarabangsa Kanada (Eksport)", tl: "Kalakalang Internasyonal ng Canada (Exports)", id: "Perdagangan Barang Internasional Kanada (Ekspor)", vi: "Thương mại quốc tế Canada (Xuất khẩu)" },
    statCanImport: { en: "Canadian International Merchandise Trade (Imports)", fr: "Commerce international de marchandises du Canada (Importations)", ms: "Perdagangan Barangan Antarabangsa Kanada (Import)", tl: "Kalakalang Internasyonal ng Canada (Imports)", id: "Perdagangan Barang Internasional Kanada (Impor)", vi: "Thương mại quốc tế Canada (Nhập khẩu)" },
    basedOn: { en: "Based on", fr: "Basé sur", ms: "Berdasarkan", tl: "Batay sa", id: "Berdasarkan", vi: "Dựa trên" },
    topPartners: { en: "Top Trading Partners", fr: "Principaux partenaires commerciaux", ms: "Rakan Dagangan Utama", tl: "Mga Pangunahing Kasosyo", id: "Mitra Dagang Utama", vi: "Đối tác thương mại hàng đầu" },
    provinces: { en: "Provincial Distribution", fr: "Distribution provinciale", ms: "Taburan Wilayah", tl: "Distribusyon sa Probinsya", id: "Distribusi Provinsi", vi: "Phân bố theo tỉnh" },
    tradeComm: { en: "Trade Commissioner Service", fr: "Service des délégués commerciaux", ms: "Perkhidmatan Pesuruhjaya Perdagangan", tl: "Serbisyo ng Komisyoner ng Kalakalan", id: "Layanan Komisaris Perdagangan", vi: "Dịch vụ Ủy viên Thương mại" },
    partners: { en: "Potential Partners (TFO Match)", fr: "Partenaires potentiels (TFO)", ms: "Rakan Kongsi Berpotensi (TFO)", tl: "Mga Potensyal na Kasosyo (TFO)", id: "Mitra Potensial (TFO)", vi: "Đối tác tiềm năng (TFO)" },
    partnerName: { en: "Partner Name", fr: "Nom du partenaire", ms: "Nama Rakan Kongsi", tl: "Pangalan ng Kasosyo", id: "Nama Mitra", vi: "Tên đối tác" },
    type: { en: "Type", fr: "Type", ms: "Jenis", tl: "Uri", id: "Tipe", vi: "Loại" },
    location: { en: "Location", fr: "Emplacement", ms: "Lokasi", tl: "Lokasyon", id: "Lokasi", vi: "Vị trí" },
    matchScore: { en: "Match Score", fr: "Score de correspondance", ms: "Skor Padanan", tl: "Iskor ng Pagtutugma", id: "Skor Kecocokan", vi: "Điểm phù hợp" }
  };

  const txt = (key: string) => t[key][language] || t[key]['en'];
  const statCanLabel = isExport ? txt('statCanExport') : txt('statCanImport');

  // Helper to format large numbers
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-mono font-bold border border-slate-200">
               HS {report.hsCode}
             </span>
             <span className="text-slate-400 text-sm">|</span>
             <span className="text-sm font-medium text-slate-500">{txt('updated')}: {report.lastUpdated}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {report.commodity} <span className="text-slate-400 mx-2">→</span> {report.targetCountry}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">{report.hsDescription}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onReset} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            {txt('newSearch')}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            {txt('exportBrief')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Compliance & Duty */}
        <div className="space-y-6">
          
          {/* Compliance Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-red-50 border-b border-red-100 p-4 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-red-700" />
              <h3 className="font-bold text-red-900">{txt('spsCheck')}</h3>
            </div>
            <div className="p-4 space-y-4">
              {report.compliance.map((item, idx) => {
                 let effectiveUrl = item.sourceUrl;
                 const lowerSource = (item.source || "").toLowerCase();
                 const lowerTitle = (item.title || "").toLowerCase();

                 if (!effectiveUrl) {
                    if (lowerSource.includes("airs") || lowerSource.includes("cfia") || lowerTitle.includes("airs")) {
                      effectiveUrl = "https://airs-sari.inspection.gc.ca/airs_external/english/decisions-eng.aspx";
                    } else if (lowerSource.includes("justice") || lowerTitle.includes("safe food") || lowerTitle.includes("sfcr")) {
                      effectiveUrl = "https://laws-lois.justice.gc.ca/eng/regulations/SOR-2018-108/";
                    }
                 }

                 return (
                <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className={`mt-0.5 min-w-[8px] h-2 rounded-full ${item.severity === 'HIGH' ? 'bg-red-500' : item.severity === 'MEDIUM' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                    {effectiveUrl ? (
                      <a 
                        href={effectiveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center mt-2 text-[10px] uppercase tracking-wider font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {txt('source')}: {item.source} <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    ) : (
                      <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                        {txt('source')}: {item.source}
                      </span>
                    )}
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Duty & Tax Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-blue-50 border-b border-blue-100 p-4 flex items-center gap-3">
              <Percent className="w-5 h-5 text-blue-700" />
              <h3 className="font-bold text-blue-900">{txt('dutyTax')}</h3>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-slate-500">{txt('tariffTreatment')}</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">{report.duties.tariffTreatment}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                 <span className="text-sm text-slate-500">{txt('baseRate')}</span>
                 <span className="text-2xl font-bold text-slate-900">{report.duties.rate}</span>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{txt('incentives')}</span>
                {report.duties.programs.map((prog, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-3 py-2 rounded border border-blue-100">
                    <CheckCircle className="w-3 h-3" />
                    {prog}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Center Column: Market Intelligence & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Executive Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <div className="flex items-center gap-2 mb-4">
               <Brain className="w-5 h-5 text-purple-600" />
               <h3 className="font-bold text-slate-900">{txt('synthesis')}</h3>
             </div>
             <p className="text-slate-700 leading-relaxed text-sm md:text-base">
               {report.summary}
             </p>
          </div>

          {/* Trends Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900">{txt('marketTrends')}</h3>
              </div>
              <a href={statCanUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center group">
                 <span className="hidden sm:inline mr-1">{txt('source')}: Statistics Canada</span>
                 <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={report.trends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: '#64748b'}} 
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [formatCurrency(value), 'Volume']}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorVol)" name="Volume (MT)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
             <div className="mt-2 text-[10px] text-slate-400 text-right">
                {txt('basedOn')}: <a href={statCanUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-500">{statCanLabel}</a>
             </div>
          </div>

          {/* New CIMT Data Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Trading Partners */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">{txt('topPartners')}</h3>
                </div>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={report.topPartners} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis 
                      type="category" 
                      dataKey="country" 
                      axisLine={false} 
                      tickLine={false} 
                      width={80}
                      tick={{fontSize: 11, fill: '#475569', fontWeight: 500}} 
                    />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                       {report.topPartners?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-[10px] text-slate-400 text-right">
                {txt('source')}: Statistics Canada (CIMT)
              </div>
            </div>

            {/* Provincial Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">{txt('provinces')}</h3>
                </div>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={report.provincialData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="province" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 11, fill: '#475569', fontWeight: 500}} 
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32} fill="#10b981">
                      {report.provincialData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
               <div className="mt-2 text-[10px] text-slate-400 text-right">
                {txt('source')}: Statistics Canada (CIMT)
              </div>
            </div>
          </div>

          {/* Trade Commissioner Service */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900">{txt('tradeComm')}</h3>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.tradeCommissioners?.map((tc, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-start gap-4">
                    <div className="bg-white p-2 rounded-full border border-slate-200">
                      <UserCircle className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{tc.name}</h4>
                      <p className="text-xs text-red-700 font-semibold mb-1">{tc.title}</p>
                      <p className="text-xs text-slate-500 mb-2">{tc.location}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {tc.expertise?.map((skill, sIdx) => (
                          <span key={sIdx} className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <a href={`mailto:${tc.email}`} className="text-xs font-mono text-blue-600 hover:underline">
                        {tc.email}
                      </a>
                    </div>
                  </div>
                ))}
                {(!report.tradeCommissioners || report.tradeCommissioners.length === 0) && (
                 <div className="col-span-2 text-sm text-slate-500 italic">No specific commissioners identified. Please check the official database.</div>
               )}
             </div>
          </div>

          {/* Potential Partners (TFO Match) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
               <Truck className="w-5 h-5 text-slate-600" />
               <h3 className="font-bold text-slate-900">{txt('partners')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">{txt('partnerName')}</th>
                    <th className="px-4 py-3">{txt('type')}</th>
                    <th className="px-4 py-3">{txt('location')}</th>
                    <th className="px-4 py-3 rounded-r-lg text-right">{txt('matchScore')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.partners?.map((partner, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4 font-medium text-slate-900">{partner.name}</td>
                      <td className="px-4 py-4">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200">
                          {partner.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{partner.location}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${partner.matchScore * 100}%` }}></div>
                          </div>
                          <span className="font-mono text-emerald-600 font-bold">{(partner.matchScore * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
