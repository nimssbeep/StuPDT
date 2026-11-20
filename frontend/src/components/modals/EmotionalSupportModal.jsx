import React, { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function EmotionalSupportModal() {
  const { activeModal, setActiveModal, isDarkMode, soundFX, triggerToast, tx } = useStuPDT();
  const [aiComfortLevel, setAiComfortLevel] = useState(20);

  if (activeModal !== 'emotional') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-md w-full rounded-3xl p-6 text-center space-y-4 border-2 ${
          isDarkMode ? 'bg-[#111116] border-[#FF6B1A] text-white' : 'bg-white border-[#071638] text-[#071638]'
        }`}
      >
        <HeartHandshake className="w-10 h-10 text-[#FF6B1A] mx-auto" />
        <h3 className="text-lg font-black">{tx('Emotional Support Mode™')}</h3>
        <p className="text-xs opacity-85 font-medium">
          {tx(
            '"Everything will be okay, human! Wait... actually, I have 17 departments and I still cannot answer basic questions! Please comfort me!"'
          )}
        </p>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-[#1FE03F] transition-all" style={{ width: `${aiComfortLevel}%` }} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              soundFX.playChime();
              setAiComfortLevel((c) => Math.min(100, c + 30));
              triggerToast('StuPDT feels emotionally validated! (Still 0% helpful)');
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#1FE03F] text-[#08080A] font-black text-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{tx('Pat AI Gently')}</span>
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2.5 rounded-xl bg-slate-700 text-white font-black text-xs cursor-pointer"
          >
            {tx('Done')}
          </button>
        </div>
      </div>
    </div>
  );
}
