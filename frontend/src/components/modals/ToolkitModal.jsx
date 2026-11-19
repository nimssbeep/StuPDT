import React from 'react';
import { FileText, HeartHandshake, Loader2, HelpCircle, Crown, Wrench } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function ToolkitModal() {
  const {
    activeModal,
    setActiveModal,
    isDarkMode,
    setIsPremiumVIP,
    soundFX,
    triggerToast,
    tx
  } = useStuPDT();

  if (activeModal !== 'toolkit') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-lg w-full rounded-3xl p-6 space-y-4 border-2 shadow-2xl ${
          isDarkMode
            ? 'bg-[#111116] border-[#FF6B1A] text-white'
            : 'bg-white border-[#071638] text-[#071638]'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700/40 pb-3">
          <div>
            <h3 className="text-lg font-black flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#FF6B1A]" />
              <span>{tx('StuPDT Useless Toolkit™')}</span>
            </h3>
            <p className="text-xs opacity-70">{tx('Bonus features nobody asked for')}</p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="px-3 py-1 rounded-xl bg-[#F52820] text-white text-xs font-black cursor-pointer"
          >
            {tx('Close')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setActiveModal('apology_pdf')}
            className={`p-3.5 rounded-2xl border text-left cursor-pointer ${
              isDarkMode ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
            }`}
          >
            <div className="font-black text-sm flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0EC7F5]" /> {tx('47-Page Apology PDF')}
            </div>
            <p className="text-xs opacity-70 mt-1">{tx('Level 5 legal apology for doing nothing.')}</p>
          </button>

          <button
            onClick={() => setActiveModal('emotional')}
            className={`p-3.5 rounded-2xl border text-left cursor-pointer ${
              isDarkMode ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
            }`}
          >
            <div className="font-black text-sm flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-[#FF6B1A]" /> {tx('Emotional Support Mode')}
            </div>
            <p className="text-xs opacity-70 mt-1">{tx('StuPDT is stressed and needs YOU to comfort IT.')}</p>
          </button>

          <button
            onClick={() => setActiveModal('loading_sim')}
            className={`p-3.5 rounded-2xl border text-left cursor-pointer ${
              isDarkMode ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
            }`}
          >
            <div className="font-black text-sm flex items-center gap-1.5">
              <Loader2 className="w-4 h-4 text-[#1FE03F] animate-spin" /> {tx('99% Loading Simulator')}
            </div>
            <p className="text-xs opacity-70 mt-1">{tx('Stuck at 99.97% until the heat death of the universe.')}</p>
          </button>

          <button
            onClick={() => {
              soundFX.playErrorBuzz();
              triggerToast('Human support is currently being replaced by AI. Redirecting to AI...');
            }}
            className={`p-3.5 rounded-2xl border text-left cursor-pointer ${
              isDarkMode ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
            }`}
          >
            <div className="font-black text-sm flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#F52820]" /> {tx('The Human Department')}
            </div>
            <p className="text-xs opacity-70 mt-1">{tx('Request to speak to a real human.')}</p>
          </button>

          <button
            onClick={() => {
              soundFX.playChime();
              setIsPremiumVIP(true);
              setActiveModal(null);
              triggerToast('Upgraded to Premium Nothing™ (₱999)! Same 0% helpfulness, fancier badge!');
            }}
            className="sm:col-span-2 p-3.5 rounded-2xl bg-[#FFE600] text-[#08080A] border-2 border-[#071638] text-left cursor-pointer"
          >
            <div className="font-black text-sm flex items-center gap-1.5">
              <Crown className="w-4 h-4" /> {tx('Upgrade to Premium Nothing™ (₱999)')}
            </div>
            <p className="text-xs font-bold opacity-80 mt-0.5">
              {tx('Pay ₱999 in imaginary pesos to get the exact same useless service, faster-looking!')}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
