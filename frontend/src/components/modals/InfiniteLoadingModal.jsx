import React from 'react';
import { Loader2 } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function InfiniteLoadingModal() {
  const { activeModal, setActiveModal, isDarkMode, tx } = useStuPDT();

  if (activeModal !== 'loading_sim') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-md w-full rounded-3xl p-6 text-center space-y-4 border-2 ${
          isDarkMode ? 'bg-[#111116] border-[#1FE03F] text-white' : 'bg-white border-[#071638] text-[#071638]'
        }`}
      >
        <Loader2 className="w-10 h-10 text-[#1FE03F] animate-spin mx-auto" />
        <h3 className="text-lg font-black">{tx('The 99.97% Loading Simulator')}</h3>
        <p className="text-xs opacity-80">
          {tx('Almost done pretending to think... Estimated time remaining: 47 years.')}
        </p>
        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-600">
          <div className="h-full bg-[#1FE03F] w-[99%]" />
        </div>
        <button
          onClick={() => setActiveModal(null)}
          className="w-full py-2.5 rounded-xl bg-[#F52820] text-white font-black text-xs cursor-pointer"
        >
          {tx('Give Up & Return to Chat')}
        </button>
      </div>
    </div>
  );
}
