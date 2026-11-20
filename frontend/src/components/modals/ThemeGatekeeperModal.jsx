import React from 'react';
import {
  ShieldAlert,
  Calculator,
  CheckCircle2,
  Moon,
  Mountain,
  Utensils,
  Briefcase,
  Bot,
  Timer,
  Flame,
  CircleDot,
  HelpCircle
} from 'lucide-react';
import { CAPTCHA_TILES } from '../../constants';
import { useStuPDT } from '../../contexts/StuPDTContext';

function CaptchaTileIcon({ type }) {
  if (type === 'traffic-light') {
    return (
      <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-600 flex flex-col items-center justify-center gap-0.5 p-1">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      </div>
    );
  }
  if (type === 'mountain') return <Mountain className="w-6 h-6 text-slate-400" />;
  if (type === 'utensils') return <Utensils className="w-6 h-6 text-amber-400" />;
  if (type === 'briefcase') return <Briefcase className="w-6 h-6 text-blue-400" />;
  if (type === 'bot') return <Bot className="w-6 h-6 text-emerald-400" />;
  if (type === 'timer') return <Timer className="w-6 h-6 text-orange-400" />;
  if (type === 'flame') return <Flame className="w-6 h-6 text-rose-500" />;
  return <CircleDot className="w-6 h-6 text-slate-400" />;
}

export function ThemeGatekeeperModal({
  themeGateStep,
  setThemeGateStep,
  selectedCaptchaIds,
  toggleCaptchaTile,
  captchaError,
  verifyCaptcha,
  activeMathProblem,
  mathInput,
  setMathInput,
  mathError,
  setMathError,
  showMathHint,
  setShowMathHint,
  verifyMathProblem
}) {
  const { isDarkMode, setIsDarkMode, soundFX, triggerToast, tx } = useStuPDT();

  if (!themeGateStep) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-md w-full rounded-3xl p-6 space-y-4 border-2 shadow-2xl ${
          isDarkMode
            ? 'bg-[#111116] border-[#0EC7F5] text-white'
            : 'bg-white border-[#071638] text-[#071638]'
        }`}
      >
        {/* STEP 1: HUMAN VERIFICATION CAPTCHA */}
        {themeGateStep === 'captcha' && (
          <>
            <div className="flex items-center justify-between border-b border-[#2A2A35] pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#0EC7F5]" />
                <h3 className="text-base font-black">
                  {tx('STEP 1 OF 2: HUMAN VERIFICATION')}
                </h3>
              </div>
              <button
                onClick={() => setThemeGateStep(null)}
                className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                {tx('Cancel')}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {tx(
                'In order to request Light Mode from our system, please solve this CAPTCHA to prove that you are a human (and not a sentient moth attracted to bright screens).'
              )}
            </p>

            <div className="p-2.5 rounded-xl bg-[#0EC7F5]/15 border border-[#0EC7F5]/40 text-center flex items-center justify-center gap-2">
              <span className="text-xs font-black text-[#0EC7F5]">
                {tx('Select all 3 squares containing a TRAFFIC LIGHT')}
              </span>
            </div>

            {/* 3x3 Clean, Genuinely Solvable CAPTCHA Grid */}
            <div className="grid grid-cols-3 gap-2">
              {CAPTCHA_TILES.map((tile) => {
                const isPicked = selectedCaptchaIds.includes(tile.id);
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => toggleCaptchaTile(tile.id)}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer min-h-[78px] ${
                      isPicked
                        ? 'bg-[#1FE03F]/20 border-[#1FE03F] scale-[0.97]'
                        : 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]'
                    }`}
                  >
                    <CaptchaTileIcon type={tile.iconType} />
                    <span className="text-[10px] font-bold text-slate-300 text-center leading-tight">
                      {tx(tile.label)}
                    </span>
                  </button>
                );
              })}
            </div>

            {captchaError && (
              <div className="p-2.5 rounded-xl bg-[#F52820]/20 border border-[#F52820] text-xs font-bold text-rose-200">
                {tx(captchaError)}
              </div>
            )}

            <button
              onClick={verifyCaptcha}
              className="w-full py-2.5 rounded-xl bg-[#0EC7F5] hover:bg-[#0bb2dc] text-[#08080A] font-black text-sm cursor-pointer"
            >
              {tx('Verify I Am Human →')}
            </button>
          </>
        )}

        {/* STEP 2: MANDATORY LEGAL MATH PROBLEM */}
        {themeGateStep === 'math' && (
          <>
            <div className="flex items-center justify-between border-b border-[#2A2A35] pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#1FE03F]" />
                <h3 className="text-base font-black">
                  {tx('STEP 2 OF 2: MANDATORY LEGAL MATH')}
                </h3>
              </div>
              <button
                onClick={() => setThemeGateStep(null)}
                className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                {tx('Cancel')}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {tx(
                'Humanity provisionally confirmed! However, in order to request Light Mode from the Department of Visual Illumination, please solve this critical math problem because it is legally necessary for brightness compliance and our server hamsters refuse to adjust the contrast without peer-reviewed arithmetic:'
              )}
            </p>

            <div className="p-4 rounded-2xl bg-[#181820] border border-[#FF6B1A]/60 text-sm font-bold text-[#F5E9D8] leading-relaxed">
              {tx(activeMathProblem.question)}
            </div>

            <form onSubmit={verifyMathProblem} className="space-y-3">
              <input
                type="text"
                inputMode="numeric"
                value={mathInput}
                onChange={(e) => {
                  setMathInput(e.target.value);
                  setMathError('');
                }}
                placeholder={tx('Type your numeric answer here...')}
                className="w-full px-4 py-2.5 rounded-xl bg-[#181820] border border-[#2A2A35] text-white text-sm font-bold focus:outline-none focus:border-[#1FE03F]"
              />

              {mathError && (
                <div className="p-2.5 rounded-xl bg-[#F52820]/20 border border-[#F52820] text-xs font-bold text-rose-200">
                  {tx(mathError)}
                </div>
              )}

              {showMathHint && (
                <div className="p-2.5 rounded-xl bg-[#FFE600]/15 border border-[#FFE600]/60 text-xs font-bold text-[#FFE600] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{tx(activeMathProblem.hint)}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playChime();
                    setShowMathHint(true);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-xs font-bold text-slate-200 cursor-pointer"
                >
                  {tx('Ask Math Specialist for Hint')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#1FE03F] hover:bg-[#19c435] text-[#08080A] font-black text-xs sm:text-sm cursor-pointer"
                >
                  {tx('Submit to Illumination Committee')}
                </button>
              </div>
            </form>
          </>
        )}

        {/* APPROVED FLASH SCREEN */}
        {themeGateStep === 'approved' && (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#1FE03F] mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-[#1FE03F]">
              {tx('FORM LT-001 APPROVED!')}
            </h3>
            <p className="text-sm font-bold text-slate-200">
              {tx('Deploying Retina-Scorching Alpine Light Mode... Put on sunglasses immediately.')}
            </p>
          </div>
        )}

        {/* SARCASTIC 1-CLICK RETURN TO DARK MODE */}
        {themeGateStep === 'back_to_dark' && (
          <div className="text-center space-y-4">
            <Moon className="w-10 h-10 text-[#071638] mx-auto" />
            <h3 className="text-lg font-black">{tx('Retreating to Dark Mode?')}</h3>
            <p className="text-xs font-bold text-slate-600">
              {tx(
                'Our Department of Visual Illumination spent 47 milliseconds processing your math exam! Are you sure you want to abandon your certified Light Mode permit?'
              )}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setThemeGateStep(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-200 text-[#071638] font-black text-xs cursor-pointer"
              >
                {tx('Keep Light Mode')}
              </button>
              <button
                onClick={() => {
                  soundFX.playChime();
                  setIsDarkMode(true);
                  setThemeGateStep(null);
                  triggerToast('Welcome back to MALFUNCTION Dark Mode.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#071638] text-[#FFE600] font-black text-xs cursor-pointer"
              >
                {tx('Yes, Return to Dark Mode')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
