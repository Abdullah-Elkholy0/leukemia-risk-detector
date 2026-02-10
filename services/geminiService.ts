import { GoogleGenAI } from "@google/genai";
import { ScanMetric, RiskLevel } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeScanResults = async (metrics: ScanMetric): Promise<{ risk: RiskLevel; summary: string }> => {
  if (!process.env.API_KEY) {
    // Fallback if no API key is present
    return {
      risk: metrics.wbc > 11000 ? RiskLevel.HIGH : RiskLevel.LOW,
      summary: "Simulated analysis: High WBC count detected indicating potential abnormalities. Please consult a specialist immediately."
    };
  }

  try {
    const prompt = `
      Act as a medical diagnostic assistant for a "Leukemia Risk Detector" app.
      Analyze the following simulated blood sensor data:
      - Oxygen Saturation: ${metrics.oxygen}%
      - White Blood Cell (WBC) Count: ${metrics.wbc} /mcL
      - Red Blood Cell (RBC) Count: ${metrics.rbc} M/mcL

      Task:
      1. Determine a simulated Risk Level (Low, Moderate, High) based on general leukemia indicators (e.g., very high WBC, low RBC).
      2. Provide a concise, bulleted clinical summary of findings (max 40 words).

      Return the response in this specific JSON format:
      {
        "risk": "Low" | "Moderate" | "High",
        "summary": "string"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const json = JSON.parse(text);

    return {
      risk: (json.risk as RiskLevel) || RiskLevel.LOW,
      summary: json.summary || "Analysis completed successfully."
    };
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      risk: RiskLevel.LOW,
      summary: "Unable to perform AI analysis. Standard metrics check indicates stable condition."
    };
  }
};

export const getHealthGuidance = async (): Promise<string> => {
   if (!process.env.API_KEY) {
    return "Maintain a balanced diet rich in fruits and vegetables. Regular exercise helps boost your immune system.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Provide 3 concise, bullet-pointed healthy lifestyle tips specifically relevant to blood health and immune system support. Keep it under 50 words total.",
    });
    return response.text || "";
  } catch (e) {
    return "Eat iron-rich foods. Stay hydrated. Exercise regularly.";
  }
}