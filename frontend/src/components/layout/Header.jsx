import React from 'react';
import {
  Sun,
  Moon,
  Camera,
  EyeOff,
  Hand,
  Sparkles,
  BarChart3,
  Volume2,
  VolumeX,
  Crown,
  Folder,
  X
} from 'lucide-react';
import { RetroDarkLogo } from '../common/RetroDarkLogo';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function Header({ onThemeClick }) {
  const {
    isDarkMode,
    isPremiumVIP,
    brailleMode,
    setBrailleMode,
    signLanguageMode,
    setSignLanguageMode,
    isMuted,
    toggleMute,
    soundFX,
    triggerToast,
    setActiveModal,
    tx
  } = useStuPDT();

  if (isDarkMode) {
    return (
      <header className="relative border-b border-[#2A2A35] bg-[#08080A]/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 pt-4 pb-5">
          {/* Top Retro Poster Bar: MALFUNCTION 2026 (Left) + 3 Retro Window Icons (Right) */}
          <div className="flex items-start justify-between gap-4">
            {/* Top-left stacked MALFUNCTION / 2026 */}
            <div className="leading-none select-none">
              <div className="text-sm sm:text-base font-black tracking-wider text-white uppercase">
                {tx('MALFUNCTION')}
              </div>
              <div className="text-sm sm:text-base font-black tracking-wider text-white/90 flex items-center gap-2">
                <span>{tx('2026')}</span>
                {isPremiumVIP && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFE600] text-[#08080A] font-black flex items-center gap-1">
                    <Crown className="w-3 h-3" /> {tx('₱999 VIP')}
                  </span>
                )}
              </div>
            </div>

            {/* Top-right 3 Retro-OS Window Icons inspired directly by the poster */}
            <div className="flex items-center gap-2">
              {/* 1. White speech bubble with bold blue 'i' */}
              <button
                onClick={() => {
                  soundFX.playChime();
                  setActiveModal('org_about');
                }}
                title="About StuPDT & Corporate Org Chart"
                className="w-9 h-8 rounded-full bg-white hover:scale-105 transition-transform flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.25)] relative cursor-pointer"
              >
                <span className="font-serif font-black text-lg text-blue-700 leading-none">
                  {tx('i')}
                </span>
                <span className="w-2 h-2 bg-white rotate-45 absolute -bottom-0.5 right-2" />
              </button>

              {/* 2. Yellow Retro Folder Icon -> Form 001 Bureaucracy Simulator */}
              <button
                onClick={() => {
                  soundFX.playRubberStamp();
                  setActiveModal('bureaucracy');
                }}
                title="Open Form 001 Bureaucracy Simulator"
                className="w-9 h-8 rounded-md bg-[#F0E161] hover:scale-105 transition-transform border-2 border-[#08080A] flex items-center justify-center shadow-[0_0_12px_rgba(240,225,97,0.25)] cursor-pointer relative"
              >
                <Folder className="w-5 h-5 text-[#08080A] fill-[#F0E161]" />
              </button>

              {/* 3. Square Grey/White [X] Close Button -> Funny Denial Toast */}
              <button
                onClick={() => {
                  soundFX.playErrorBuzz();
                  triggerToast(
                    'Close Denied: Please submit Departure Form 999-B to the Exit Committee first.'
                  );
                }}
                title="Attempt to Close StuPDT"
                className="w-8 h-8 bg-[#D4D4D8] hover:bg-white hover:scale-105 transition-transform border-2 border-t-white border-l-white border-r-slate-600 border-b-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5 text-black stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Center Retro Glowing "StuPDT" Hero Wordmark + "Stupid. Fast. Wrong." */}
          <div className="mt-2 mb-4 text-center flex flex-col items-center">
            <RetroDarkLogo brailleMode={brailleMode} />
            <p className="mt-2 text-sm sm:text-base font-semibold tracking-wide text-white/95">
              {tx('Stupid. Fast. Wrong.')}
            </p>
          </div>

          {/* Clean, Beginner-Friendly Utility Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-[#2A2A35]">
            <button
              onClick={onThemeClick}
              className="px-3 py-1.5 rounded-xl bg-[#181820] hover:bg-[#23232F] border border-[#0EC7F5]/60 text-[#0EC7F5] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{tx('Switch to Light Mode')}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playScanBeep();
                setActiveModal('vision');
              }}
              className="px-3 py-1.5 rounded-xl bg-[#181820] hover:bg-[#23232F] border border-[#1FE03F]/60 text-[#1FE03F] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{tx('Vision AI')}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playChime();
                setBrailleMode((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                brailleMode
                  ? 'bg-[#FFE600] text-[#08080A] border-[#FFE600]'
                  : 'bg-[#181820] hover:bg-[#23232F] border-[#FF6B1A]/60 text-[#FF6B1A]'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>{tx('Braille (Blind)')}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playChime();
                setSignLanguageMode((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                signLanguageMode
                  ? 'bg-[#F52820] text-white border-[#F52820]'
                  : 'bg-[#181820] hover:bg-[#23232F] border-[#F52820]/60 text-[#F52820]'
              }`}
            >
              <Hand className="w-3.5 h-3.5" />
              <span>{tx('Sign Language (Blind)')}</span>
            </button>

            <button
              onClick={() => setActiveModal('toolkit')}
              className="px-3 py-1.5 rounded-xl bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5E9D8]" />
              <span>{tx('Useless Toolkit')}</span>
            </button>

            <button
              onClick={() => setActiveModal('report')}
              className="px-3 py-1.5 rounded-xl bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#0EC7F5]" />
              <span>{tx('Report')}</span>
            </button>

            <button
              onClick={toggleMute}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="p-1.5 rounded-xl bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-slate-300 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#F52820]" /> : <Volume2 className="w-4 h-4 text-[#1FE03F]" />}
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Light Mode (Alpine Sky poster aesthetic)
  return (
    <header className="relative bg-[#3888F2] border-b-4 border-[#071638] overflow-hidden shadow-md">
      <div
        className="hidden md:block absolute inset-y-0 right-0 w-[52%] bg-white pointer-events-none"
        style={{ clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-3 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b-2 border-[#071638]/15">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-tighter text-base text-[#071638] uppercase">
              {tx('STUPDT CORP')}
            </span>
            <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FFE600] text-[#071638] border-2 border-[#071638]">
              {tx('MALFUNCTION 2026')}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={onThemeClick}
              className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-[#071638] text-[#FFE600] flex items-center gap-1 cursor-pointer"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{tx('Switch to Dark Mode')}</span>
            </button>
            <button
              onClick={() => {
                soundFX.playScanBeep();
                setActiveModal('vision');
              }}
              className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-[#FFE600] text-[#071638] border-2 border-[#071638] flex items-center gap-1 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{tx('Vision AI')}</span>
            </button>
            <button
              onClick={() => {
                soundFX.playChime();
                setBrailleMode((prev) => !prev);
              }}
              className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-white text-[#071638] border-2 border-[#071638] flex items-center gap-1 cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>{tx('Braille (Blind)')}</span>
            </button>
            <button
              onClick={() => {
                soundFX.playChime();
                setSignLanguageMode((prev) => !prev);
              }}
              className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-white text-[#071638] border-2 border-[#071638] flex items-center gap-1 cursor-pointer"
            >
              <Hand className="w-3.5 h-3.5" />
              <span>{tx('Sign Language (Blind)')}</span>
            </button>
            <button
              onClick={() => setActiveModal('toolkit')}
              className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-white text-[#071638] border-2 border-[#071638] cursor-pointer"
            >
              {tx('Toolkit')}
            </button>
            <button
              onClick={() => setActiveModal('report')}
              className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-[#071638] text-white cursor-pointer"
            >
              {tx('Report')}
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg bg-white text-[#071638] border-2 border-[#071638] cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center select-none leading-none">
              <span
                className="text-5xl sm:text-7xl font-black tracking-tighter text-[#FFE600]"
                style={{ WebkitTextStroke: '2.5px #071638', textShadow: '4px 4px 0px #071638' }}
              >
                {tx('STU')}
              </span>
              <span
                className="text-5xl sm:text-7xl font-black tracking-tighter text-[#071638] bg-white px-2.5 py-0.5 rounded-xl border-2 border-[#071638] ml-1"
                style={{ boxShadow: '4px 4px 0px #FFE600' }}
              >
                {tx('PDT')}
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white drop-shadow-[0_1px_2px_rgba(7,22,56,0.85)]">
              {tx('Stupid. Fast. Wrong. • Alpine Illumination Permit Approved')}
            </p>
          </div>

          <button
            onClick={() => setActiveModal('report')}
            className="self-start sm:self-center shrink-0 w-24 h-24 rounded-full bg-[#FFE600] hover:scale-105 transition-transform border-2 border-[#071638] shadow-[4px_4px_0px_#071638] flex flex-col items-center justify-center text-center p-2 cursor-pointer -rotate-6"
          >
            <span className="text-xl font-black leading-none text-[#071638]">{tx('0%')}</span>
            <span className="text-[10px] font-black uppercase tracking-tighter text-[#071638] leading-tight mt-0.5">
              {tx('PROBLEMS SOLVED')}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
