import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw } from 'lucide-react';

export const DpiCalculator: React.FC = () => {
  const [currentDpi, setCurrentDpi] = useState<number>(440);
  const [currentSens, setCurrentSens] = useState<number>(100);
  const [newDpi, setNewDpi] = useState<number>(480);

  // Formula: S2 = S1 * (D1 / D2)
  const calculateNewSens = () => {
    const result = currentSens * (currentDpi / newDpi);
    return Math.round(result);
  };

  const newSens = calculateNewSens();

  return (
    <div className="bg-ff-panel border border-gray-800 rounded-xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-800">
        <Calculator className="text-ff-accent" size={24} />
        <h2 className="text-xl font-bold text-white uppercase italic">Calculadora DPI <span className="text-gray-500 text-sm not-italic normal-case ml-2">v2.0</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Input Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">DPI Atual (D1)</label>
            <input 
              type="number" 
              value={currentDpi}
              onChange={(e) => setCurrentDpi(Number(e.target.value))}
              className="w-full bg-black border border-gray-700 rounded p-3 text-white font-mono focus:border-ff-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sensi Geral Atual (S1)</label>
            <input 
              type="number" 
              value={currentSens}
              onChange={(e) => setCurrentSens(Number(e.target.value))}
              className="w-full bg-black border border-gray-700 rounded p-3 text-white font-mono focus:border-ff-accent outline-none"
            />
          </div>
        </div>

        {/* Target Column */}
        <div className="space-y-4">
           <div>
            <label className="block text-xs font-bold text-ff-yellow uppercase mb-1">Nova DPI Desejada (D2)</label>
            <input 
              type="number" 
              value={newDpi}
              onChange={(e) => setNewDpi(Number(e.target.value))}
              className="w-full bg-black border border-ff-yellow/50 rounded p-3 text-white font-mono focus:border-ff-yellow outline-none"
            />
          </div>
           <div className="hidden md:block opacity-0 pointer-events-none">
             <input className="p-3" />
           </div>
        </div>

        {/* Result Column */}
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-10">
              <RefreshCw size={64} />
           </div>
           
           <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">Resultado (S2)</span>
           <div className="flex items-center gap-3">
             <span className="text-3xl font-bold text-gray-500 line-through decoration-red-500/50">{currentSens}</span>
             <ArrowRight size={20} className="text-ff-accent" />
             <span className="text-5xl font-black text-ff-accent text-shadow-glow">{newSens}</span>
           </div>
           <p className="text-[10px] text-gray-500 mt-3 text-center">
             Fórmula: S2 = S1 × (D1 ÷ D2)
           </p>
        </div>
      </div>
      
      <div className="mt-6 bg-ff-accent/5 border border-ff-accent/20 p-4 rounded text-sm text-gray-300">
        <strong className="text-ff-accent">Nota Técnica:</strong> Aumentar a DPI faz a tela "girar" mais rápido fisicamente. Para manter a mesma memória muscular (o mesmo ângulo de giro com o mesmo movimento de dedo), você deve <strong>reduzir</strong> a sensibilidade do jogo proporcionalmente.
      </div>
    </div>
  );
};