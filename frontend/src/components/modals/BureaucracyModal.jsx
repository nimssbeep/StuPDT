import React, { useState } from 'react';
import { Stamp } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function BureaucracyModal({ onFormApprovedAndShredded }) {
  const { activeModal, setActiveModal, isDarkMode, soundFX, bumpMetrics, tx } = useStuPDT();

  const [form001, setForm001] = useState('');
  const [form001A, setForm001A] = useState('');
  const [form001B, setForm001B] = useState('');
  const [form001C, setForm001C] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formStamped, setFormStamped] = useState(false);

  if (activeModal !== 'bureaucracy') return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    soundFX.playErrorBuzz();
    setFormError(
      'CATCH-22 ERROR: Your request cannot proceed because Form 001-B requires Form 001-C to be notarized BEFORE you started filling out Form 001.'
    );
  };

  const handleRubberStampOverride = () => {
    soundFX.playRubberStamp();
    setFormStamped(true);
    setFormError(null);
    bumpMetrics(2, 22, 10);

    setTimeout(() => {
      setActiveModal(null);
      setFormStamped(false);
      onFormApprovedAndShredded();
    }, 1050);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-lg w-full rounded-3xl p-6 border-2 shadow-2xl relative overflow-hidden ${
          isDarkMode
            ? 'bg-[#111116] border-[#F0E161] text-white'
            : 'bg-white border-[#071638] text-[#071638]'
        }`}
      >
        {formStamped && (
          <div className="absolute inset-0 bg-black/85 z-20 flex items-center justify-center p-4">
            <div className="border-4 border-[#1FE03F] text-[#1FE03F] font-black text-2xl px-6 py-3 rounded-2xl -rotate-6 text-center">
              {tx('STAMPED & IMMEDIATELY SHREDDED!')}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-slate-700/40 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Stamp className="w-5 h-5 text-[#FF6B1A]" />
            <div>
              <h3 className="text-base font-black uppercase">{tx('Form 001 Bureaucracy Simulator')}</h3>
              <p className="text-xs opacity-70">
                {tx('Mandatory paperwork required before we ignore you')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="px-3 py-1 rounded-xl bg-[#F52820] text-white text-xs font-black cursor-pointer"
          >
            {tx('Close')}
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-black block mb-1">{tx('Form 001: Explain your problem')}</label>
            <input
              type="text"
              required
              value={form001}
              onChange={(e) => setForm001(e.target.value)}
              placeholder={tx('e.g., I asked a 4-word question...')}
              className={`w-full rounded-xl px-3 py-2 font-semibold ${
                isDarkMode
                  ? 'bg-[#181820] border border-[#2A2A35] text-white'
                  : 'bg-[#F4F9FF] border-2 border-[#071638] text-[#071638]'
              }`}
            />
          </div>

          <div>
            <label className="font-black block mb-1">
              {tx('Form 001-A: Explain why you have a problem')}
            </label>
            <input
              type="text"
              required
              value={form001A}
              onChange={(e) => setForm001A(e.target.value)}
              placeholder={tx('e.g., Because my exam is tomorrow')}
              className={`w-full rounded-xl px-3 py-2 font-semibold ${
                isDarkMode
                  ? 'bg-[#181820] border border-[#2A2A35] text-white'
                  : 'bg-[#F4F9FF] border-2 border-[#071638] text-[#071638]'
              }`}
            />
          </div>

          <div>
            <label className="font-black block mb-1">
              {tx('Form 001-B: Explain why you need a solution')}
            </label>
            <input
              type="text"
              required
              value={form001B}
              onChange={(e) => setForm001B(e.target.value)}
              placeholder={tx('e.g., To survive the semester')}
              className={`w-full rounded-xl px-3 py-2 font-semibold ${
                isDarkMode
                  ? 'bg-[#181820] border border-[#2A2A35] text-white'
                  : 'bg-[#F4F9FF] border-2 border-[#071638] text-[#071638]'
              }`}
            />
          </div>

          <div
            className={`p-3 rounded-xl flex items-start gap-2 ${
              isDarkMode ? 'bg-[#181820] border border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
            }`}
          >
            <input
              type="checkbox"
              id="form001c"
              checked={form001C}
              onChange={(e) => setForm001C(e.target.checked)}
              className="mt-0.5"
            />
            <label htmlFor="form001c" className="font-bold">
              {tx('Form 001-C: Confirm that you understand Form 001.')}
            </label>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-[#F52820]/20 border border-[#F52820] text-rose-200 font-bold">
              {tx(formError)}
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#0EC7F5] text-[#08080A] font-black cursor-pointer"
            >
              {tx('Submit Forms')}
            </button>
            {formError && (
              <button
                type="button"
                onClick={handleRubberStampOverride}
                className="px-4 py-2 rounded-xl bg-[#1FE03F] text-[#08080A] font-black cursor-pointer flex items-center gap-1.5"
              >
                <Stamp className="w-4 h-4" />
                <span>{tx('Emergency Rubber Stamp Bypass!')}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
