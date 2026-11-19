import React from 'react';
import { STUPID_QUOTES } from '../../constants';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function ReportModal() {
  const {
    activeModal,
    setActiveModal,
    isDarkMode,
    specialistsConsulted,
    internalMeetings,
    userSatisfaction,
    quoteIdx,
    tx
  } = useStuPDT();

  if (activeModal !== 'report') return null;

  const reportQuote = STUPID_QUOTES[(quoteIdx + 3) % STUPID_QUOTES.length];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-md w-full rounded-3xl p-6 space-y-4 text-center border-2 shadow-2xl ${
          isDarkMode
            ? 'bg-[#111116] border-[#0EC7F5] text-white'
            : 'bg-white border-[#071638] text-[#071638]'
        }`}
      >
        <div className="inline-block px-3 py-1 rounded-full bg-[#0EC7F5]/20 border border-[#0EC7F5] text-xs font-black text-[#0EC7F5]">
          {tx('PRODUCTIVITY THEATER™')}
        </div>
        <h3 className="text-2xl font-black">{tx('FINAL REPORT')}</h3>

        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3 rounded-2xl bg-[#F52820]/15 border border-[#F52820]/50">
            <span className="text-[10px] font-black uppercase text-[#F52820]">
              {tx('Problems Solved')}
            </span>
            <div className="text-2xl font-black">{tx('0%')}</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#0EC7F5]/15 border border-[#0EC7F5]/50">
            <span className="text-[10px] font-black uppercase text-[#0EC7F5]">
              {tx('AI Specialists')}
            </span>
            <div className="text-2xl font-black">{tx(specialistsConsulted)}</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#1FE03F]/15 border border-[#1FE03F]/50">
            <span className="text-[10px] font-black uppercase text-[#1FE03F]">
              {tx('Meetings Held')}
            </span>
            <div className="text-2xl font-black">{tx(internalMeetings)}</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#FF6B1A]/15 border border-[#FF6B1A]/50">
            <span className="text-[10px] font-black uppercase text-[#FF6B1A]">
              {tx('Satisfaction')}
            </span>
            <div className="text-2xl font-black">{tx(`${userSatisfaction}%`)}</div>
          </div>
        </div>

        <div
          className={`p-3.5 rounded-2xl border text-left ${
            isDarkMode ? 'bg-[#181820] border-[#2A2A35]' : 'bg-[#F4F9FF] border-[#071638]'
          }`}
        >
          <p className="text-xs italic font-semibold">"{tx(reportQuote.text)}"</p>
          <p className="text-[11px] font-black text-[#0EC7F5] mt-1">
            — {tx(reportQuote.author)}
          </p>
        </div>

        <p className="text-[11px] opacity-75 italic">
          {tx('"Thank you for choosing StuPDT! We hope you never need us again. Unfortunately, you will."')}
        </p>

        <button
          onClick={() => setActiveModal(null)}
          className="w-full py-2.5 rounded-xl bg-[#0EC7F5] text-[#08080A] font-black text-xs cursor-pointer"
        >
          {tx('Back to Chat')}
        </button>
      </div>
    </div>
  );
}
