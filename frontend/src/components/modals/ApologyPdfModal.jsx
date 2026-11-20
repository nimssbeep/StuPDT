import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { APOLOGY_PDF_PAGES } from '../../constants';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function ApologyPdfModal() {
  const { activeModal, setActiveModal, isDarkMode, tx, soundFX, triggerToast } = useStuPDT();
  const [pdfPageIndex, setPdfPageIndex] = useState(0);

  if (activeModal !== 'apology_pdf') return null;

  const handleDownloadFullApology = () => {
    soundFX.playRubberStamp();
    const content = [
      '=========================================================================',
      '          OFFICIAL STUPDT LEGAL APOLOGY MEMORANDUM (FORM AP-999)         ',
      '=========================================================================',
      'DATE: ' + new Date().toISOString(),
      'CLASSIFICATION: MAXIMUM CORPORATE NON-COMPLIANCE',
      'PAGES: 47 (Condensed for Human Sanity)',
      '=========================================================================\n',
      ...APOLOGY_PDF_PAGES.map(
        (p, i) =>
          `[EXCERPT ${i + 1} OF 47: ${p.title.toUpperCase()}]\n` +
          `Sub-clause: ${p.subtitle}\n\n` +
          `${p.body}\n\n` +
          `Legal Footnote: ${p.footnote}\n` +
          '-------------------------------------------------------------------------\n'
      ),
      'CONCLUSION:',
      'We hereby solemnly confirm that this document resolves exactly 0% of your concerns.',
      'Thank you for partnering with StuPDT Bureaucracy Solutions™.'
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'StuPDT_Official_Legal_Apology_47_Pages.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast('Official 47-Page Legal Apology Document Downloaded!');
  };

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

        <div className="flex justify-between items-center gap-2 pt-2 border-t border-slate-700/40">
          <div className="flex gap-2">
            <button
              onClick={() => setPdfPageIndex((p) => Math.max(0, p - 1))}
              disabled={pdfPageIndex === 0}
              className="px-3 py-1.5 rounded-xl bg-slate-700 text-white disabled:opacity-40 text-xs font-black cursor-pointer"
            >
              {tx('← Prev')}
            </button>
            <button
              onClick={() => setPdfPageIndex((p) => Math.min(APOLOGY_PDF_PAGES.length - 1, p + 1))}
              disabled={pdfPageIndex === APOLOGY_PDF_PAGES.length - 1}
              className="px-3 py-1.5 rounded-xl bg-[#0EC7F5] text-[#08080A] disabled:opacity-40 text-xs font-black cursor-pointer"
            >
              {tx('Next →')}
            </button>
          </div>

          <span className="text-xs font-black">
            {tx(`Excerpt ${pdfPageIndex + 1} of ${APOLOGY_PDF_PAGES.length}`)}
          </span>

          <button
            onClick={handleDownloadFullApology}
            className="px-3 py-1.5 rounded-xl bg-[#1FE03F] text-[#08080A] text-xs font-black cursor-pointer flex items-center gap-1.5"
            title="Download full 47-page apology document"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{tx('Download .TXT')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
