import React from 'react';
import { Terminal, Zap, Shield, AlertTriangle } from 'lucide-react';

export const GuideSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Game Turbo Guide */}
      <div className="bg-ff-panel border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="text-ff-orange" size={24} />
          <h2 className="text-xl font-bold text-white uppercase italic">Otimização Game Turbo <span className="text-gray-500 text-xs not-italic ml-2">POCO X6 Exclusive</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
          <div>
            <h3 className="text-ff-yellow font-bold mb-2 uppercase text-xs tracking-wider">Passo a Passo</h3>
            <ol className="list-decimal list-inside space-y-2 marker:text-gray-500">
              <li>Abra o aplicativo <strong>Security</strong> (Segurança).</li>
              <li>Role para baixo até encontrar <strong>Game Turbo</strong>.</li>
              <li>Adicione o <strong>Free Fire</strong> à lista se não estiver.</li>
              <li>Nas configurações do jogo (ícone engrenagem ou deslizar barra lateral):</li>
              <ul className="pl-6 pt-2 space-y-1 text-xs text-gray-400">
                <li>• Modo Desempenho: <span className="text-white">ON</span></li>
                <li>• Otimização de Wi-Fi: <span className="text-white">ON</span></li>
                <li>• Resposta de Toque: <span className="text-ff-orange">MÁXIMO</span></li>
                <li>• Sensibilidade a toques contínuos: <span className="text-ff-orange">MÁXIMO</span></li>
              </ul>
            </ol>
          </div>
          <div className="bg-black/40 p-4 rounded border border-gray-800">
            <h3 className="text-ff-yellow font-bold mb-2 uppercase text-xs tracking-wider">Por que isso importa?</h3>
            <p className="mb-2">
              O POCO X6 possui uma taxa de amostragem de toque muito alta (Instant Touch Sampling).
            </p>
            <p>
              Sem ativar o modo desempenho máximo no Game Turbo, o sistema limita essa taxa para economizar bateria, causando "delay" na subida do capa.
            </p>
          </div>
        </div>
      </div>

      {/* ADB Helper */}
      <div className="bg-ff-panel border border-gray-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 text-ff-accent">
           <Terminal size={100} />
        </div>
        
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <Terminal className="text-ff-accent" size={24} />
          <h2 className="text-xl font-bold text-white uppercase italic">ADB Helper <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-400 not-italic ml-2 border border-gray-700">ADVANCED</span></h2>
        </div>

        <div className="space-y-4 relative z-10">
           <div className="bg-yellow-900/20 border border-yellow-700/50 p-3 rounded flex gap-3 items-start">
              <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-yellow-200/80">
                Atenção: Alterar a DPI via ADB é seguro se feito corretamente, mas faça por sua conta e risco. Use valores entre <strong>400</strong> e <strong>600</strong> no POCO X6.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black p-4 rounded border border-gray-800 font-mono text-xs">
                <p className="text-gray-500 mb-2">// Comando para alterar DPI</p>
                <div className="flex justify-between items-center bg-gray-900 p-2 rounded border border-gray-700">
                   <code className="text-ff-accent">adb shell wm density 480</code>
                </div>
                <p className="text-gray-600 mt-2 text-[10px]">*Substitua 480 pelo valor desejado.</p>
              </div>

              <div className="bg-black p-4 rounded border border-gray-800 font-mono text-xs">
                <p className="text-gray-500 mb-2">// Comando para RESETAR (Padrão)</p>
                <div className="flex justify-between items-center bg-gray-900 p-2 rounded border border-gray-700">
                   <code className="text-red-400">adb shell wm density reset</code>
                </div>
                <p className="text-gray-600 mt-2 text-[10px]">*Use caso a tela fique distorcida.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};