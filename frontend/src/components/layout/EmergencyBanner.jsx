import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function EmergencyBanner() {
  const { chaosMeter, tx } = useStuPDT();

  if (chaosMeter < 100) return null;

  return (
    <div className="bg-[#F52820] text-white px-4 py-2 text-center border-b-2 border-black">
      <p className="text-xs sm:text-sm font-black tracking-wide flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
        <span>
          {tx('NATIONAL BUREAUCRATIC EMERGENCY (100% CHAOS): ALL 17 AI DEPARTMENTS HAVE ENTERED PANIC SYNERGY MODE!')}
        </span>
      </p>
    </div>
  );
}
