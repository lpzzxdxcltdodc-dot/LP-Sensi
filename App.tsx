import React, { useState, useEffect } from 'react';
import { generateSensi } from './services/geminiService';
import { PlayStyle, SensitivityProfile, TabView } from './types';
import { SensiCard } from './components/SensiCard';
import { DpiCalculator } from './components/DpiCalculator';
import { GuideSection } from './components/GuideSection';
import { Crosshair, Zap, Cpu, Settings, RefreshCw, AlertTriangle, Calculator, BookOpen, Layers, Download } from 'lucide-react';

// LP Sensi Presets
const PRESETS: Record<string, SensitivityProfile> = {
  HYBRID: {
    name: "LP Hybrid (Padrão)",
    description: "Equilíbrio ideal entre movimentação e precisão. Ponto de partida recomendado.",
    general: 150,
    redDot: 135,
    scope2x: 130,
    scope4x: 115,
    sniper: 100,
    freeLook: 90,
    dpi: 480,
    fireButtonSize: 52,
    pointerSpeed: "Média",
    variant: "8GB"
  },
  FLICK: {
    name: "LP Aggressive Flick",
    description: "Para jogadores rápidos que usam DPI alta e movimentos curtos.",
    general: 185,
    redDot: 170,
    scope2x: 160,
    scope4x: 150,
    sniper: 95,
    freeLook: 100,
    dpi: 520,
    fireButtonSize: 45,
    pointerSpeed: "Máxima",
    variant: "12GB"
  },
  PRECISION: {
    name: "LP Precision Control",
    description: "Focado em estabilidade para longa distância e suporte.",
    general: 110,
    redDot: 100,
    scope2x: 95,
    scope4x: 90,
    sniper: 120,
    freeLook: 70,
    dpi: 450,
    fireButtonSize: 58,
    pointerSpeed: "Mínima",
    variant: "Universal"
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>('presets');
  const [selectedStyle, setSelectedStyle] = useState<PlayStyle>(PlayStyle.BALANCED);
  const [currentProfile, setCurrentProfile] = useState<SensitivityProfile>(PRESETS.HYBRID);
  const [tips, setTips] = useState<string[]>([
    "Mantenha a taxa de atualização da tela em 120Hz para máxima fluidez.",
    "Ative o Game Turbo e coloque a resposta de toque no máximo."
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userNote, setUserNote] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      });
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateSensi(selectedStyle, userNote);
      setCurrentProfile(data.profile);
      setTips(data.tips);
    } catch (err) {
      setError("Erro na IA. Verifique conexão ou chave API.");
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (key: string) => {
    setCurrentProfile(PRESETS[key]);
    setTips(["Preset manual carregado. Ajuste conforme necessário."]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-ff-orange selection:text-black font-sans pb-12">
      
      {/* Hero Header */}
      <header className="relative bg-gradient-to-b from-ff-dark to-[#050505] border-b border-gray-900">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ff-yellow to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 py-8 md:py-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-ff-orange font-mono text-xs mb-3 border border-ff-orange/30 px-3 py-1 rounded-full bg-ff-orange/5 uppercase tracking-widest">
            <Zap size={12} />
            LP Sensi • POCO X6 Edition
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-2">
            Sensi <span className="text-transparent bg-clip-text bg-gradient-to-r from-ff-yellow to-ff-orange">Master</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto font-mono text-sm md:text-base mb-4">
            Guia definitivo de sensibilidade (0-200), DPI e otimização para POCO X6.
          </p>

          {deferredPrompt && (
            <button 
              onClick={handleInstallClick}
              className="flex items-center gap-2 bg-ff-orange text-black px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(255,102,0,0.4)] animate-pulse"
            >
              <Download size={16} /> Instalar App
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          <button 
            onClick={() => setActiveTab('presets')}
            className={`flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all
              ${activeTab === 'presets' ? 'bg-ff-yellow text-black shadow-[0_0_15px_rgba(255,204,0,0.3)]' : 'bg-gray-900 text-gray-500 hover:bg-gray-800'}`}
          >
            <Layers size={16} /> Presets LP
          </button>
          <button 
             onClick={() => setActiveTab('generator')}
             className={`flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all
              ${activeTab === 'generator' ? 'bg-ff-accent text-black shadow-[0_0_15px_rgba(0,234,255,0.3)]' : 'bg-gray-900 text-gray-500 hover:bg-gray-800'}`}
          >
            <Cpu size={16} /> IA Generator
          </button>
          <button 
             onClick={() => setActiveTab('calculator')}
             className={`flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all
              ${activeTab === 'calculator' ? 'bg-ff-orange text-black shadow-[0_0_15px_rgba(255,102,0,0.3)]' : 'bg-gray-900 text-gray-500 hover:bg-gray-800'}`}
          >
            <Calculator size={16} /> Calc DPI
          </button>
          <button 
             onClick={() => setActiveTab('guide')}
             className={`flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all
              ${activeTab === 'guide' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-gray-900 text-gray-500 hover:bg-gray-800'}`}
          >
            <BookOpen size={16} /> Guia X6
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          
          {/* PRESETS TAB */}
          {activeTab === 'presets' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(PRESETS).map(([key, profile]) => (
                  <button 
                    key={key}
                    onClick={() => loadPreset(key)}
                    className={`p-4 rounded border text-left transition-all relative overflow-hidden group
                      ${currentProfile.name === profile.name 
                        ? 'bg-ff-panel border-ff-yellow ring-1 ring-ff-yellow' 
                        : 'bg-black border-gray-800 hover:border-gray-600'}
                    `}
                  >
                    <div className="relative z-10">
                      <div className="text-xs font-mono text-gray-500 mb-1">{profile.variant}</div>
                      <div className="font-bold text-white uppercase italic mb-1">{profile.name.replace('LP ', '')}</div>
                      <div className="text-[10px] text-gray-400 leading-tight">{profile.description}</div>
                    </div>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-ff-yellow/0 via-ff-yellow/5 to-ff-yellow/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                  </button>
                ))}
              </div>
              <SensiCard profile={currentProfile} />
            </div>
          )}

          {/* GENERATOR TAB */}
          {activeTab === 'generator' && (
             <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
               <div className="md:col-span-4 bg-ff-panel border border-gray-800 rounded-xl p-5 h-fit sticky top-4">
                  <div className="flex items-center gap-2 mb-4 text-ff-accent">
                     <Settings size={20} />
                     <h2 className="font-bold uppercase tracking-wider">Customizar IA</h2>
                  </div>
                  
                  <div className="space-y-4">
                     <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Estilo de Jogo</label>
                       <select 
                         value={selectedStyle}
                         onChange={(e) => setSelectedStyle(e.target.value as PlayStyle)}
                         className="w-full bg-black border border-gray-700 rounded p-3 text-sm text-white focus:border-ff-accent focus:outline-none transition-colors"
                       >
                         {Object.values(PlayStyle).map((style) => (
                           <option key={style} value={style}>{style}</option>
                         ))}
                       </select>
                     </div>
     
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Notas Extras</label>
                        <textarea
                           value={userNote}
                           onChange={(e) => setUserNote(e.target.value)}
                           placeholder="Ex: Minha mira treme muito..."
                           className="w-full bg-black border border-gray-700 rounded p-3 text-sm text-white focus:border-ff-accent focus:outline-none transition-colors h-24 resize-none"
                        />
                     </div>
     
                     <button 
                       onClick={handleGenerate}
                       disabled={loading}
                       className={`w-full py-4 rounded font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group
                         ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-ff-accent text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'}
                       `}
                     >
                       <span className="relative z-10 flex items-center justify-center gap-2">
                         {loading ? (
                           <>
                             <RefreshCw className="animate-spin" size={16} /> Analisando...
                           </>
                         ) : (
                           <>
                             <Cpu size={16} /> Gerar Sensi IA
                           </>
                         )}
                       </span>
                     </button>
                  </div>
               </div>
     
               <div className="md:col-span-8 space-y-6">
                  {error && (
                    <div className="bg-red-900/20 border border-red-500/50 p-4 rounded text-red-200 text-sm flex items-center gap-3">
                      <AlertTriangle size={18} />
                      {error}
                    </div>
                  )}
                  
                  <SensiCard profile={currentProfile} />
     
                  <div className="bg-ff-panel border border-gray-800 rounded-xl p-6">
                     <h3 className="text-ff-accent text-xs font-bold uppercase mb-4 tracking-widest flex items-center gap-2">
                       <Zap size={14} /> Dicas do Coach
                     </h3>
                     <ul className="space-y-3">
                       {tips.map((tip, idx) => (
                         <li key={idx} className="flex gap-3 text-sm text-gray-300 items-start">
                           <span className="text-ff-accent font-mono mt-0.5">{`0${idx + 1}`}</span>
                           <span>{tip}</span>
                         </li>
                       ))}
                     </ul>
                  </div>
               </div>
             </div>
          )}

          {/* CALCULATOR TAB */}
          {activeTab === 'calculator' && <DpiCalculator />}

          {/* GUIDE TAB */}
          {activeTab === 'guide' && <GuideSection />}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 mt-12 py-8 text-center bg-[#080808]">
        <p className="text-gray-600 text-xs font-mono">
          LP SENSI • POCO X6 MASTER GUIDE • 2025
        </p>
      </footer>
    </div>
  );
};

export default App;