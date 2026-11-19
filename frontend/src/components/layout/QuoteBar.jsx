import React from 'react';
import { Quote, RefreshCw } from 'lucide-react';
import { STUPID_QUOTES } from '../../constants';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function QuoteBar() {
  const { quoteIdx, nextQuote, isDarkMode, tx } = useStuPDT();
  const currentQuote = STUPID_QUOTES[quoteIdx % STUPID_QUOTES.length];

  return (
    <section
      className={`rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
        isDarkMode
          ? 'bg-[#111116] border border-[#2A2A35] shadow-lg'
          : 'bg-white border-2 border-[#071638] shadow-[4px_4px_0px_#071638]'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
            isDarkMode
              ? 'bg-[#181820] border border-[#FF6B1A]/50 text-[#FF6B1A]'
              : 'bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
          }`}
        >
          <Quote className="w-4 h-4" />
        </div>
        <div>
          <p
            className={`text-xs sm:text-sm font-semibold italic leading-snug ${
              isDarkMode ? 'text-[#F5E9D8]' : 'text-[#071638]'
            }`}
          >
            "{tx(currentQuote.text)}"
          </p>
          <p
            className={`text-[11px] font-extrabold mt-1 ${
              isDarkMode ? 'text-[#0EC7F5]' : 'text-[#3888F2]'
            }`}
          >
            — {tx(currentQuote.author)}{' '}
            <span className={isDarkMode ? 'text-slate-400 font-medium' : 'text-slate-500 font-semibold'}>
              ({tx(currentQuote.title)})
            </span>
          </p>
        </div>
      </div>

      <button
        onClick={nextQuote}
        className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer self-end sm:self-center ${
          isDarkMode
            ? 'bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-slate-200'
            : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
        }`}
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>{tx('Next Quote')}</span>
      </button>
    </section>
  );
}
