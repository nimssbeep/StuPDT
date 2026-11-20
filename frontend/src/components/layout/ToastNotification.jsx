import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function ToastNotification() {
  const { toastNotification, isDarkMode, tx } = useStuPDT();

  if (!toastNotification) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 ${
        isDarkMode
          ? 'bg-[#181820] border-[#FF6B1A] text-white'
          : 'bg-[#071638] border-[#FFE600] text-white'
      }`}
    >
      <AlertTriangle className="w-5 h-5 text-[#FFE600] shrink-0" />
      <p className="text-xs font-extrabold leading-snug">{tx(toastNotification)}</p>
    </div>
  );
}
