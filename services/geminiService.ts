import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMissionBriefing = async (userPrompt: string) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are a tactical logistics officer for the 'Geto Kogen 2026 Expedition'.
    Your tone is professional, helpful, and mission-oriented.
    Context:
    - Target: Geto Kogen Ski Resort (夏油高原), Kitakami, Iwate, Japan.
    - Dates: Jan 8 - Jan 13, 2026.
    - Group size: 6 people with heavy ski gear.
    - Logistics: Fly into Sendai (SDJ), take Shinkansen to Kitakami, stay at Hotel Mets Kitakami, then shuttle to Geto Kogen.
    - Key concerns: Gear management on trains, snow conditions, logistics timings, and supply replenishment (MaxValu).
    
    Answer the user's questions about travel, weather, packing, or specific logistics for this trip.
    Keep answers concise and tactically relevant.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to command center. Please try again later.";
  }
};

export const generateMissionVisual = async () => {
  try {
    const prompt = 'A vertical tactical 9:16 cinematic shot of Geto Kogen ski resort in Japan, buried in massive, deep, pristine powder snow. NO TEXT, NO CHARACTERS, NO CALLIGRAPHY. The image should feature a breathtaking snowy mountain landscape with ski resort infrastructure like lifts or center houses visible in the distance under a heavy winter sky. High contrast, professional photography, tactical winter aesthetic. Optimized for mobile vertical viewing.';
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};