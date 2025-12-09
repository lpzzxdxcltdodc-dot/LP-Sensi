export interface SensitivityProfile {
  name: string;
  description: string;
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number;
  dpi: number;
  fireButtonSize: number;
  pointerSpeed: string; // e.g. "Max", "Medium"
  variant?: '8GB' | '12GB' | 'Pro' | 'Universal'; // New field for device variant
}

export interface AiResponse {
  profile: SensitivityProfile;
  tips: string[];
}

export enum PlayStyle {
  BALANCED = "Balanceado",
  RUSHER = "Rushadão (SMG/Shotgun)",
  SUPPORT = "Suporte (AR/Longa Distância)",
  SNIPER = "Sniper (AWM/Barrett)",
  ONETAP = "One Tap (Desert/Carapina)"
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type TabView = 'generator' | 'presets' | 'calculator' | 'guide';