import React from 'react';
import { Camera, Send } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function ChatInput({ inputValue, setInputValue, onSendMessage, isTransferring }) {
  const { isDarkMode, soundFX, setActiveModal, tx } = useStuPDT();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSendMessage();
      }}
      className={`p-3 border-t flex items-center gap-2 ${
        isDarkMode ? 'bg-[#111116] border-[#2A2A35]' : 'bg-white border-[#071638]'
      }`}
    >
      <button
        type="button"
        onClick={() => {
          soundFX.playScanBeep();
          setActiveModal('vision');
        }}
        title="Open StuPDT Vision™ AI Image Detector"
        className={`p-2.5 rounded-xl border transition cursor-pointer shrink-0 ${
          isDarkMode
            ? 'bg-[#181820] hover:bg-[#23232F] border-[#1FE03F]/50 text-[#1FE03F]'
            : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
        }`}
      >
        <Camera className="w-5 h-5" />
      </button>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={tx('Ask any question (or tap a starter button below)...')}
        className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none ${
          isDarkMode
            ? 'bg-[#181820] border border-[#2A2A35] text-white placeholder-slate-400 focus:border-[#0EC7F5]'
            : 'bg-[#F4F9FF] border-2 border-[#071638] text-[#071638] placeholder-slate-500 focus:ring-2 focus:ring-[#3888F2]'
        }`}
      />

      <button
        type="submit"
        disabled={isTransferring || !inputValue.trim()}
        className={`px-4 sm:px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-1.5 disabled:opacity-40 transition cursor-pointer shrink-0 ${
          isDarkMode
            ? 'bg-[#0EC7F5] hover:bg-[#0bb2dc] text-[#08080A]'
            : 'bg-[#FFE600] hover:bg-[#f5dc00] text-[#071638] border-2 border-[#071638] shadow-[3px_3px_0px_#071638]'
        }`}
      >
        <span>{tx('Send')}</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
