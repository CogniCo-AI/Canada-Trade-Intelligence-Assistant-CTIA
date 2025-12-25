
import { GoogleGenAI, Type } from "@google/genai";
import { TradeReport } from "../types";

const apiKey = process.env.API_KEY || process.env.VITE_GOOGLE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// We define a schema to ensure Gemini returns structured data for our dashboard
const tradeReportSchema = {
  type: Type.OBJECT,
  properties: {
    commodity: { type: Type.STRING },
    hsCode: { type: Type.STRING, description: "The 8-digit HS Code" },
    hsDescription: { type: Type.STRING, description: "Official HS description" },
    originCountry: { type: Type.STRING },
    targetCountry: { type: Type.STRING },
    summary: { type: Type.STRING, description: "Executive summary of the trade opportunity/risk" },
    compliance: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ["HIGH", "MEDIUM", "LOW"] },
          source: { type: Type.STRING },
          sourceUrl: { type: Type.STRING, description: "Official URL to the regulation source" }
        }
      }
    },
    trends: {
      type: Type.ARRAY,
      description: "12 months of simulated historical data",
      items: {
        type: Type.OBJECT,
        properties: {
          month: { type: Type.STRING, description: "Format MMM-YY" },
          volume: { type: Type.NUMBER },
          value: { type: Type.NUMBER }
        }
      }
    },
    topPartners: {
      type: Type.ARRAY,
      description: "Top 5 trading partner countries for this specific commodity",
      items: {
        type: Type.OBJECT,
        properties: {
          country: { type: Type.STRING },
          value: { type: Type.NUMBER, description: "Total CAD value" },
          percentage: { type: Type.NUMBER, description: "0-100 percentage share" }
        }
      }
    },
    provincialData: {
      type: Type.ARRAY,
      description: "Breakdown of trade by Canadian province (top 5)",
      items: {
        type: Type.OBJECT,
        properties: {
          province: { type: Type.STRING, description: "Province Code e.g. ON, BC, QC" },
          value: { type: Type.NUMBER, description: "Total CAD value" },
          percentage: { type: Type.NUMBER, description: "0-100 percentage share" }
        }
      }
    },
    partners: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          type: { type: Type.STRING },
          location: { type: Type.STRING },
          matchScore: { type: Type.NUMBER }
        }
      }
    },
    tradeCommissioners: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          title: { type: Type.STRING },
          location: { type: Type.STRING },
          email: { type: Type.STRING },
          expertise: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    },
    duties: {
      type: Type.OBJECT,
      properties: {
        tariffTreatment: { type: Type.STRING },
        rate: { type: Type.STRING },
        programs: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    }
  },
  required: ["commodity", "hsCode", "summary", "compliance", "trends", "topPartners", "provincialData", "partners", "tradeCommissioners", "duties"]
};

export const analyzeTradeQuery = async (query: string, language: string = 'en'): Promise<TradeReport> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const langMap: Record<string, string> = {
      'en': 'English',
      'fr': 'French',
      'ms': 'Malay',
      'tl': 'Filipino (Tagalog)',
      'id': 'Indonesian',
      'vi': 'Vietnamese'
    };
    const targetLang = langMap[language] || 'English';

    // Prompt engineering to simulate the multi-agent system
    const systemInstruction = `
      You are the CTIA (Canada Trade Intelligence Assistant) Orchestrator. 
      Your goal is to simulate a multi-agent system.
      
      CRITICAL INSTRUCTION: Generate the entire response content (summary, titles, descriptions, country names, etc.) in **${targetLang}**.
      Use **Plain Language**: Avoid complex jargon. Use simple, clear terms suitable for non-native speakers.

      Agents:
      1. Classification Agent (Assigns HS Codes).
      2. Compliance Agent (Checks CFIA AIRS/SFCR).
      3. Strategic Agent (Generates realistic trade volume trends).
      4. Duty Agent (Calculates duties).
      5. Scout Agent (Finds partners and commissioners).

      User Query: "${query}"

      If the user query is vague, assume a standard trade flow (e.g., Exporting to Canada or Importing to Canada) based on context. 
      If no country is specified, assume Canada is one endpoint and pick a likely partner (e.g., USA, Mexico, China) for the other.
      
      Generate realistic, high-fidelity data for a dashboard. 
      
      For "trends", generate 12 months of data points reflecting seasonality.
      - Base trends on typical patterns found in 'Canadian International Merchandise Trade' data.
      
      For "topPartners" and "provincialData":
      - ACT LIKE THE STATISTICS CANADA CIMT DATABASE.
      - Provide realistic top 5 trading partners for this specific commodity. 
      - Provide realistic Provincial breakdown (Top 4-5).

      For "partners":
      - Generate 3 realistic potential B2B partners in the target market.
      
      For "tradeCommissioners":
      - Provide 2 realistic Trade Commissioner contacts for the target country (e.g., at the High Commission or Embassy).
      - Use format: first.last@international.gc.ca
      
      For "compliance":
      - Cite specific regulations.
      - RULE 1: For "CFIA AIRS", set source to "CFIA AIRS" and sourceUrl to "https://airs-sari.inspection.gc.ca/airs_external/english/decisions-eng.aspx".
      - RULE 2: For "Safe Food for Canadians Regulations (SFCR)", set source to "Department of Justice" and sourceUrl to "https://laws-lois.justice.gc.ca/eng/regulations/SOR-2018-108/".
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: query }] }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: tradeReportSchema,
        temperature: 0.4, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text) as TradeReport;
    
    // Add timestamp manually since LLM doesn't generate current time well
    data.lastUpdated = new Date().toLocaleDateString(language === 'en' ? 'en-CA' : language, { year: 'numeric', month: 'long', day: 'numeric' });
    
    return data;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
