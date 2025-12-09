import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SensitivityProfile, PlayStyle } from "../types";

// Helper function to get AI instance
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    profile: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        general: { type: Type.INTEGER },
        redDot: { type: Type.INTEGER },
        scope2x: { type: Type.INTEGER },
        scope4x: { type: Type.INTEGER },
        sniper: { type: Type.INTEGER },
        freeLook: { type: Type.INTEGER },
        dpi: { type: Type.INTEGER },
        fireButtonSize: { type: Type.INTEGER },
        pointerSpeed: { type: Type.STRING },
      },
      required: ["name", "general", "redDot", "scope2x", "scope4x", "sniper", "dpi", "fireButtonSize"],
    },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: ["profile", "tips"],
};

export const generateSensi = async (playStyle: PlayStyle, additionalInfo?: string): Promise<{ profile: SensitivityProfile; tips: string[] }> => {
  const ai = getAiClient();
  
  const prompt = `
    Atue como um treinador profissional de Free Fire e especialista técnico em hardware mobile "LP Sensi", especificamente para o dispositivo POCO X6 (Snapdragon 7s Gen 2, tela 120Hz, Alta Taxa de Amostragem de Toque).
    
    ESTADO ATUAL (2025): A comunidade agora utiliza sensibilidades gerais altas, variando de 0 a 200.
    
    Crie uma configuração de sensibilidade perfeita para um jogador com estilo: ${playStyle}.
    ${additionalInfo ? `Informação extra do jogador: ${additionalInfo}` : ''}
    
    Regras Técnicas para POCO X6:
    1. Sensibilidade Geral: Pode variar entre 100 e 200 dependendo do estilo (ex: Rusher prefere >170, Suporte ~130).
    2. DPI (Menor Largura): Sugira entre 440 e 580. O POCO X6 aguenta DPIs mais altas, mas mantenha a segurança.
    3. Mapeamento: Se a DPI for baixa (<450), a sensibilidade do jogo deve compensar sendo mais alta.
    4. Hardware: Considere que o Game Turbo está ativado com resposta de toque máxima.
    
    Retorne apenas JSON válido conforme o schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.75,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const parsed = JSON.parse(text);
    return {
      profile: {
        ...parsed.profile,
        variant: 'Universal'
      },
      tips: parsed.tips
    };
  } catch (error) {
    console.error("Error generating sensi:", error);
    // Fallback safe profile based on "Hybrid" preset
    return {
      profile: {
        name: "POCO X6 Hybrid (Fallback)",
        description: "Perfil híbrido seguro (Modo Offline).",
        general: 150,
        redDot: 135,
        scope2x: 130,
        scope4x: 115,
        sniper: 100,
        freeLook: 90,
        dpi: 480,
        fireButtonSize: 50,
        pointerSpeed: "Máxima",
        variant: "8GB"
      },
      tips: [
        "Use o Game Turbo para reduzir a latência de toque.",
        "Verifique sua conexão para gerar perfis de IA personalizados."
      ]
    };
  }
};