import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function GrandFinaleModal({ onChoice }) {
  const { activeModal, tx } = useStuPDT();

  if (activeModal !== 'grand_finale') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111116] text-white border-4 border-[#F52820] rounded-3xl max-w-lg w-full p-7 text-center shadow-[0_0_50px_rgba(245,40,32,0.45)] space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F52820] text-white text-xs font-black uppercase">
          <AlertTriangle className="w-4 h-4" /> {tx('CRITICAL SYSTEM NOTICE • URGENT')}
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#FFE600]">
          {tx('WE HAVE DETECTED A PROBLEM.')}
        </h2>

        <p className="text-sm sm:text-base font-bold bg-[#181820] border border-[#2A2A35] p-4 rounded-2xl leading-relaxed">
          {tx(
            '"The problem is that you are experiencing a problem that we have been unable to solve because of a problem within our problem-solving system."'
          )}
        </p>

        <p className="text-base font-black text-[#0EC7F5]">
          {tx('Would you like us to help you?')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onChoice('YES, PLEASE')}
            className="py-3.5 px-4 rounded-2xl bg-[#1FE03F] hover:bg-[#19c435] text-[#08080A] font-black text-sm cursor-pointer"
          >
            {tx('YES, PLEASE')}
          </button>
          <button
            onClick={() => onChoice("NO, I'VE SUFFERED ENOUGH")}
            className="py-3.5 px-4 rounded-2xl bg-[#F52820] hover:bg-red-700 text-white font-black text-sm cursor-pointer"
          >
            {tx("NO, I'VE SUFFERED ENOUGH")}
          </button>
        </div>

        <p className="text-[11px] font-bold text-slate-400">
          {tx('*Both options will immediately redirect you to our Customer Support Department.')}
        </p>
      </div>
    </div>
  );
}
