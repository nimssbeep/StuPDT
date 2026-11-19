import React, { useState, useEffect, useMemo } from 'react';
import { X, RotateCcw, Hand, HandMetal, ThumbsUp, User } from 'lucide-react';
import { SIGN_LANGUAGE_GESTURES } from '../../constants';
import { useStuPDT } from '../../contexts/StuPDTContext';

function GestureIcon({ idx, flipped = false }) {
  const rotationAngles = [-25, -15, 0, 15, 25, 10, -20, 5, -10, 20, -5, 12];
  const rot = rotationAngles[idx % rotationAngles.length] * (flipped ? -1 : 1);
  const IconComponent = idx % 3 === 0 ? Hand : idx % 3 === 1 ? HandMetal : ThumbsUp;

  return (
    <div
      className={`transition-all duration-200 transform ${flipped ? '-scale-x-100' : ''}`}
      style={{ transform: `rotate(${rot}deg) ${flipped ? 'scaleX(-1)' : ''}` }}
    >
      <IconComponent className="w-8 h-8 text-[#FFE600] drop-shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
    </div>
  );
}

export function SignLanguageWidget({ latestAiMessageText }) {
  const { signLanguageMode, setSignLanguageMode, isDarkMode, tx } = useStuPDT();
  const [signWordIdx, setSignWordIdx] = useState(0);
  const [signReplayKey, setSignReplayKey] = useState(0);

  const signWords = useMemo(() => {
    return (latestAiMessageText || 'Hello blind user!').split(/\s+/).filter(Boolean);
  }, [latestAiMessageText]);

  useEffect(() => {
    if (!signLanguageMode || signWords.length === 0) return;
    setSignWordIdx(0);
    const interval = setInterval(() => {
      setSignWordIdx((prev) => (prev + 1) % signWords.length);
    }, 520);
    return () => clearInterval(interval);
  }, [signLanguageMode, signWords, signReplayKey]);

  if (!signLanguageMode) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 w-72 rounded-2xl overflow-hidden shadow-2xl border-2 ${
        isDarkMode
          ? 'bg-[#111116] border-[#F52820] text-white'
          : 'bg-white border-[#071638] text-[#071638]'
      }`}
    >
      {/* TV Broadcast Header */}
      <div className="bg-[#F52820] text-white px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>{tx('LIVE SIGN LANGUAGE (BLIND)')}</span>
        </div>
        <button
          onClick={() => setSignLanguageMode(false)}
          className="p-0.5 hover:bg-black/20 rounded cursor-pointer"
          title="Close Sign Language Interpreter"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Animated Interpreter Box */}
      <div className="p-3 text-center space-y-2">
        <div
          className={`rounded-xl py-4 px-2 flex flex-col items-center justify-center relative overflow-hidden ${
            isDarkMode ? 'bg-[#181820] border border-[#2A2A35]' : 'bg-[#F4F9FF] border border-[#071638]'
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
            {tx('MUTED VISUAL STREAM')}
          </span>

          {/* Expressive animated hands synced word-by-word */}
          <div className="flex items-center justify-center gap-3 py-1">
            <GestureIcon idx={signWordIdx} />
            <div className="w-10 h-10 rounded-full bg-[#0EC7F5]/20 border border-[#0EC7F5]/50 flex items-center justify-center">
              <User className="w-6 h-6 text-[#0EC7F5]" />
            </div>
            <GestureIcon idx={signWordIdx + 5} flipped />
          </div>

          <div
            className={`mt-2 px-2.5 py-0.5 rounded-full text-xs font-black ${
              isDarkMode ? 'bg-[#0EC7F5]/20 text-[#0EC7F5]' : 'bg-[#FFE600] text-[#071638]'
            }`}
          >
            {tx(`Signing: "${signWords[signWordIdx] || '...'}"`)}
          </div>
        </div>

        <p className="text-[11px] leading-snug opacity-80 font-medium">
          {tx(
            'Silently translating text into visual hand gestures exclusively for blind users. Audio has been strictly disabled for maximum sign-language authenticity.'
          )}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setSignReplayKey((k) => k + 1)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-black flex items-center justify-center gap-1 cursor-pointer ${
              isDarkMode
                ? 'bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-white'
                : 'bg-[#FFE600] border border-[#071638] text-[#071638]'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>{tx('Replay Signs')}</span>
          </button>
          <button
            onClick={() => setSignLanguageMode(false)}
            className="px-3 py-1.5 rounded-lg bg-[#F52820] text-white text-xs font-black cursor-pointer"
          >
            {tx('Close')}
          </button>
        </div>
      </div>
    </div>
  );
}
