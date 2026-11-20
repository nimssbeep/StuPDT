import React from 'react';
import {
  Zap,
  ArrowRight,
  Stamp,
  Camera,
  Flame,
  BookOpen,
  Clock,
  Wifi,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function QuickStarters({ onSendMessage }) {
  const { isDarkMode, soundFX, setActiveModal, tx } = useStuPDT();

  return (
    <section
      className={`rounded-2xl p-3.5 ${
        isDarkMode
          ? 'bg-[#111116] border border-[#2A2A35]'
          : 'bg-white border-2 border-[#071638] shadow-[4px_4px_0px_#071638]'
      }`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span
          className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
            isDarkMode ? 'text-slate-300' : 'text-[#071638]'
          }`}
        >
          <Zap className={`w-4 h-4 ${isDarkMode ? 'text-[#FF6B1A]' : 'text-[#3888F2]'}`} />
          {tx('Quick Starters (1-Click Hackathon Demos)')}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          onClick={() => onSendMessage('I have an exam tomorrow. Can you help me study?')}
          className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
            isDarkMode
              ? 'bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-white'
              : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            {tx('Exam Tomorrow')}
          </span>
          <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
        </button>

        <button
          onClick={() => onSendMessage('What time is it?')}
          className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
            isDarkMode
              ? 'bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-white'
              : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            {tx('What time is it?')}
          </span>
          <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
        </button>

        <button
          onClick={() => onSendMessage('How do I fix my Wi-Fi?')}
          className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
            isDarkMode
              ? 'bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-white'
              : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            {tx('Fix my Wi-Fi')}
          </span>
          <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
        </button>

        <button
          onClick={() => {
            soundFX.playRubberStamp();
            setActiveModal('bureaucracy');
          }}
          className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
            isDarkMode
              ? 'bg-[#181820] hover:bg-[#23232F] border border-[#0EC7F5]/40 text-[#0EC7F5]'
              : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#0EC7F5] shrink-0" />
            {tx('Form 001')}
          </span>
          <Stamp className="w-3.5 h-3.5 shrink-0" />
        </button>

        <button
          onClick={() => {
            soundFX.playScanBeep();
            setActiveModal('vision');
          }}
          className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
            isDarkMode
              ? 'bg-[#181820] hover:bg-[#23232F] border border-[#1FE03F]/40 text-[#1FE03F]'
              : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-[#1FE03F] shrink-0" />
            {tx('Scan Image')}
          </span>
          <Camera className="w-3.5 h-3.5 shrink-0" />
        </button>

        <button
          onClick={() => onSendMessage('StuPDT, PLEASE JUST ANSWER MY QUESTION.')}
          className={`p-2.5 rounded-xl font-black text-xs text-left transition cursor-pointer flex items-center justify-between ${
            isDarkMode
              ? 'bg-[#F52820]/20 hover:bg-[#F52820] border border-[#F52820] text-white'
              : 'bg-[#FFE600] hover:bg-[#f5dc00] border-2 border-[#071638] text-[#071638]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#F52820] shrink-0" />
            {tx('JUST ANSWER ME!')}
          </span>
          <Flame className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </section>
  );
}
