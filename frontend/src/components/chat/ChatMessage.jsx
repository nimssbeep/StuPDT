import React from 'react';
import { PhoneCall } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function ChatMessage({ message }) {
  const { isDarkMode, tx } = useStuPDT();

  if (message.sender === 'user') {
    return (
      <div className="flex justify-end">
        <div
          className={`max-w-[82%] rounded-2xl rounded-tr-none px-4 py-3 ${
            isDarkMode
              ? 'bg-[#0EC7F5]/15 border border-[#0EC7F5]/45 text-white'
              : 'bg-[#071638] text-white border-2 border-[#071638] shadow-[4px_4px_0px_#3888F2]'
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-1">
            <span
              className={`text-[10px] font-black uppercase tracking-wider ${
                isDarkMode ? 'text-[#0EC7F5]' : 'text-[#FFE600]'
              }`}
            >
              {tx('You (Doing All The Work)')}
            </span>
            <span className="text-[10px] text-slate-400">{tx(message.timestamp)}</span>
          </div>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            {tx(message.text)}
          </p>
        </div>
      </div>
    );
  }

  // AI message
  return (
    <div className="space-y-2">
      {message.transferredFrom && (
        <div className="flex items-center justify-center my-1">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black ${
              isDarkMode
                ? 'bg-[#FF6B1A]/15 text-[#FF6B1A] border border-[#FF6B1A]/40'
                : 'bg-[#FFE600] text-[#071638] border-2 border-[#071638]'
            }`}
          >
            <PhoneCall className="w-3 h-3" />
            <span>{tx(`Transferred: ${message.transferredFrom} → ${message.deptName}`)}</span>
          </div>
        </div>
      )}

      <div className="flex justify-start">
        <div
          className={`max-w-[88%] rounded-2xl rounded-tl-none p-4 ${
            isDarkMode
              ? 'bg-[#181820] border border-[#2A2A35] text-slate-100'
              : 'bg-white border-2 border-[#071638] text-[#071638] shadow-[4px_4px_0px_#071638]'
          }`}
        >
          <div
            className={`flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b ${
              isDarkMode ? 'border-[#2A2A35]' : 'border-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-md font-black text-[10px] uppercase ${
                  isDarkMode
                    ? 'bg-[#1FE03F]/20 text-[#1FE03F] border border-[#1FE03F]/40'
                    : 'bg-[#3888F2] text-white'
                }`}
              >
                {tx(message.deptBadge)}
              </span>
              <span className="text-xs sm:text-sm font-black">
                {tx(message.deptName)}
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {tx(message.deptRole)}
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium leading-relaxed">
            {tx(message.text)}
          </p>

          <div
            className={`mt-3 pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold ${
              isDarkMode ? 'border-[#2A2A35]' : 'border-slate-100'
            }`}
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`px-2 py-0.5 rounded-md ${
                  isDarkMode
                    ? 'bg-[#0EC7F5]/15 text-[#0EC7F5] border border-[#0EC7F5]/30'
                    : 'bg-[#FFE600] text-[#071638] border border-[#071638]'
                }`}
              >
                {tx(`Confidence: ${message.confidence}`)}
              </span>
              <span
                className={`px-2 py-0.5 rounded-md ${
                  isDarkMode
                    ? 'bg-[#111116] text-slate-300 border border-[#2A2A35]'
                    : 'bg-[#F4F9FF] text-[#071638] border border-[#3888F2]'
                }`}
              >
                {tx(`Blame: ${message.blame}`)}
              </span>
            </div>
            <span className="text-[#F52820] font-black">{tx('0% Solved')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
