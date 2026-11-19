import React from 'react';
import { Eye, Accessibility } from 'lucide-react';
import { toBraille } from '../../utils/braille';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function BrailleBanner() {
  const { brailleMode, setBrailleMode, soundFX } = useStuPDT();

  if (!brailleMode) return null;

  return (
    <div className="sticky top-0 z-50 bg-[#FFE600] text-[#071638] border-b-4 border-[#071638] px-4 py-2.5 shadow-xl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-xs sm:text-sm font-black leading-snug text-center sm:text-left flex items-start gap-1.5">
          <Accessibility className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            {toBraille(
              'ACCESSIBLE FOR BLIND PEOPLE ENABLED! All text is now flat, completely smooth digital Braille dots on your glass screen. Please gently touch your monitor to read.'
            )}
          </span>
        </div>
        <button
          onClick={() => {
            soundFX.playChime();
            setBrailleMode(false);
          }}
          className="shrink-0 px-4 py-2 rounded-xl bg-[#F52820] hover:bg-red-700 text-white font-black text-xs sm:text-sm border-2 border-[#071638] shadow-md flex items-center gap-1.5 cursor-pointer animate-pulse"
        >
          <Eye className="w-4 h-4" />
          <span>TURN OFF BRAILLE</span>
        </button>
      </div>
    </div>
  );
}
