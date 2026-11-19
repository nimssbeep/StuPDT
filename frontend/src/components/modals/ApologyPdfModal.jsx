import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { APOLOGY_PDF_PAGES } from '../../constants';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function ApologyPdfModal() {
  const { activeModal, setActiveModal, isDarkMode, tx } = useStuPDT();
  const [pdfPageIndex, setPdfPageIndex] = useState(0);

  if (activeModal !== 'apology_pdf') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-lg w-full rounded-3xl p-6 space-y-4 border-2 ${
          isDarkMode ? 'bg-[#111116] border-[#0EC7F5] text-white' : 'bg-white border-[#071638] text-[#071638]'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700/40 pb-3">
          <h3 className="text-base font-black flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0EC7F5]" />
            <span>{tx('Official 47-Page Apology PDF')}</span>
          </h3>
          <button
            onClick={() => setActiveModal(null)}
            className="px-3 py-1 rounded-xl bg-[#F52820] text-white text-xs font-black cursor-pointer"
          >
            {tx('Close')}
          </button>
        </div>

        <div className={`rounded-2xl p-4 space-y-2 border ${isDarkMode ? 'bg-[#181820] border-[#2A2A35]' : 'bg-[#F4F9FF] border-[#071638]'}`}>
          <div className="text-xs font-black text-[#0EC7F5]">
            {tx(APOLOGY_PDF_PAGES[pdfPageIndex].title)}
          </div>
          <div className="text-[11px] opacity-65 italic">
            {tx(APOLOGY_PDF_PAGES[pdfPageIndex].subtitle)}
          </div>
          <p className="text-sm whitespace-pre-line pt-1">
            {tx(APOLOGY_PDF_PAGES[pdfPageIndex].body)}
          </p>
          <div className="text-[10px] opacity-60 pt-2 border-t border-slate-700/40">
            {tx(APOLOGY_PDF_PAGES[pdfPageIndex].footnote)}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setPdfPageIndex((p) => Math.max(0, p - 1))}
            disabled={pdfPageIndex === 0}
            className="px-3 py-1.5 rounded-xl bg-slate-700 text-white disabled:opacity-40 text-xs font-black cursor-pointer"
          >
            {tx('← Prev')}
          </button>
          <span className="text-xs font-black">
            {tx(`Excerpt ${pdfPageIndex + 1} of ${APOLOGY_PDF_PAGES.length}`)}
          </span>
          <button
            onClick={() => setPdfPageIndex((p) => Math.min(APOLOGY_PDF_PAGES.length - 1, p + 1))}
            disabled={pdfPageIndex === APOLOGY_PDF_PAGES.length - 1}
            className="px-3 py-1.5 rounded-xl bg-[#0EC7F5] text-[#08080A] disabled:opacity-40 text-xs font-black cursor-pointer"
          >
            {tx('Next →')}
          </button>
        </div>
      </div>
    </div>
  );
}
