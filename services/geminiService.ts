import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    // In a real production app, ensure API_KEY is defined.
    // We gracefully handle missing keys for the UI demo.
    if (process.env.API_KEY) {
      aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
  }
  return aiClient;
};

export const generateBusinessDescription = async (
  businessName: string,
  category: string,
  keywords: string
): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    console.warn("API Key not found, returning mock response.");
    return `Welcome to ${businessName}! We are a premier provider in the ${category} sector. ${keywords ? `Specializing in ${keywords}.` : ''} Come visit us to experience our dedicated service and community values.`;
  }

  try {
    const prompt = `
      Write a compelling, warm, and professional business description (approx 80 words) for a business named "${businessName}".
      The category is "${category}".
      Key services/features: ${keywords}.
      Target audience: Local church community and families.
      Tone: Trustworthy, welcoming, faith-friendly.
      Do not include markdown or quotes.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Description generation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "We specialize in providing excellent service to our community with integrity and care.";
  }
};