import React from 'react';
import { SensitivityProfile } from '../types';
import { Crosshair, Smartphone, MousePointer2, Move, Target, Cpu } from 'lucide-react';

interface SensiCardProps {
  profile: SensitivityProfile;
}

// Helper to calculate percentage based on max value 200
const getPercent = (val: number) => Math.min((val / 200) * 100, 100);

const SensiRow = ({ label, value, icon: Icon, color = "text-ff-yellow" }: { label: string; value: number; icon: any; color?: string }) => (
  <div className="mb-4 group/row">
    <div className="flex justify-between items-center mb-1">
      <div className="flex items-center gap-2">
        <Icon size={16} className={`${color} opacity-70 group-hover/row:opacity-100 transition-opacity`} />
        <span className="text-sm font-semibold tracking-wider text-gray-300 uppercase group-hover/row:text-white transition-colors">{label}</span>
      </div>
      <span className="text-xl font-bold font-mono text-white tabular-nums">{value}</span>
    </div>
    <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700 relative">
      {/* Grid lines for precision look */}
      <div className="absolute inset-0 w-full h-full flex justify-between px-1 opacity-20">
        <div className="w-px h-full bg-gray-500"></div>
        <div className="w-px h-full bg-gray-500"></div>
        <div className="w-px h-full bg-gray-500"></div>
        <div className="w-px h-full bg-gray-500"></div>
      </div>
      <div 
        className="h-full bg-gradient-to-r from-ff-orange to-ff-yellow transition-all duration-1000 ease-out relative z-10"
        style={{ width: `${getPercent(value)}%` }}
      >
        <div className="absolute right-0 top-0 h-full w-1 bg-white/50 shadow-[0_0_10px_white]"></div>
      </div>
    </div>
  </div>
);

export const SensiCard: React.FC<SensiCardProps> = ({ profile }) => {
  return (
    <div className="bg-ff-panel border border-gray-800 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-ff-orange/5 blur-[80px] rounded-full -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-ff-accent/5 blur-[60px] rounded-full -z-0 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 border-b border-gray-800 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-white font-sans uppercase italic tracking-widest">
                {profile.name}
              </h2>
              {profile.variant && (
                 <span className="bg-gray-800 text-gray-400 text-[10px] px-2 py-0.5 rounded border border-gray-700 font-mono">
                   {profile.variant}
                 </span>
              )}
            </div>
            <p className="text-gray-400 text-xs mt-1 max-w-[300px]">
              {profile.description}
            </p>
          </div>
          <div className="bg-ff-dark px-3 py-1 rounded border border-ff-yellow/30 text-ff-yellow font-mono text-xs flex items-center gap-2">
            <Cpu size={12} />
            POCO X6
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {/* Sensitivities */}
          <div className="space-y-1">
            <h3 className="text-ff-accent text-xs font-bold uppercase mb-4 tracking-widest opacity-80 flex justify-between">
              <span>Sensibilidade (0-200)</span>
              <span className="text-[10px] text-gray-500">2025 REV.</span>
            </h3>
            <SensiRow label="Geral" value={profile.general} icon={Move} />
            <SensiRow label="Ponto Vermelho (Red Dot)" value={profile.redDot} icon={Target} />
            <SensiRow label="Mira 2x" value={profile.scope2x} icon={Crosshair} />
            <SensiRow label="Mira 4x" value={profile.scope4x} icon={Crosshair} />
            <SensiRow label="Sniper (AWM)" value={profile.sniper} icon={Crosshair} color="text-ff-accent" />
            <SensiRow label="Olhadinha" value={profile.freeLook} icon={Move} color="text-gray-400" />
          </div>

          {/* Device Configs */}
          <div className="mt-8 md:mt-0 flex flex-col h-full">
            <h3 className="text-ff-accent text-xs font-bold uppercase mb-4 tracking-widest opacity-80">Configuração do Sistema</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-ff-dark p-4 rounded border border-gray-800 flex flex-col items-center justify-center text-center group/item hover:border-ff-orange/30 transition-colors">
                <Smartphone size={24} className="text-ff-orange mb-2 group-hover/item:scale-110 transition-transform" />
                <span className="text-xs text-gray-500 uppercase mb-1">DPI (Menor Largura)</span>
                <span className="text-2xl font-bold text-white font-mono text-shadow-glow">{profile.dpi}</span>
              </div>
              
              <div className="bg-ff-dark p-4 rounded border border-gray-800 flex flex-col items-center justify-center text-center group/item hover:border-ff-orange/30 transition-colors">
                <Target size={24} className="text-ff-orange mb-2 group-hover/item:scale-110 transition-transform" />
                <span className="text-xs text-gray-500 uppercase mb-1">Botão de Tiro</span>
                <span className="text-2xl font-bold text-white font-mono text-shadow-glow">{profile.fireButtonSize}%</span>
              </div>
            </div>

            <div className="bg-ff-dark p-4 rounded border border-gray-800 flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <MousePointer2 size={18} className="text-ff-yellow" />
                <span className="text-sm font-semibold text-gray-300">Velocidade do Ponteiro</span>
              </div>
              <span className="text-sm font-bold text-white bg-ff-panel px-3 py-0.5 rounded border border-gray-700">
                {profile.pointerSpeed}
              </span>
            </div>
             
             <div className="bg-gradient-to-r from-ff-orange/10 to-transparent p-4 rounded border-l-2 border-ff-orange mt-auto">
                 <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-ff-orange uppercase font-bold tracking-widest">
                        Game Turbo
                    </p>
                    <span className="text-[10px] bg-ff-orange/20 text-ff-orange px-1 rounded">ATIVO</span>
                 </div>
                 <p className="text-[10px] text-gray-400">
                     Otimize para "Resposta de Toque" máxima e "Sensibilidade ao toque contínuo".
                 </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};