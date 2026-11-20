import React from 'react';

//nothing change
export function SampleIllustrationSVG({ sampleId }) {
  if (sampleId === 'rock') {
    return (
      <svg viewBox="0 0 240 160" className="w-full h-full rounded-xl bg-gradient-to-b from-slate-800 to-slate-900">
        <defs>
          <radialGradient id="rockGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="55%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>
        </defs>
        <ellipse cx="120" cy="132" rx="74" ry="14" fill="rgba(0,0,0,0.45)" />
        <path
          d="M52,122 L42,92 L65,52 L112,34 L166,44 L196,82 L184,122 L124,132 Z"
          fill="url(#rockGrad)"
          stroke="#1E293B"
          strokeWidth="3"
        />
        <path d="M65,52 L114,76 L166,44" fill="none" stroke="#CBD5E1" strokeWidth="2" opacity="0.45" />
        <path d="M114,76 L124,132" fill="none" stroke="#1E293B" strokeWidth="2.5" opacity="0.5" />
        <circle cx="88" cy="96" r="3" fill="#475569" />
        <circle cx="152" cy="86" r="4" fill="#475569" />
        <circle cx="136" cy="108" r="2.5" fill="#CBD5E1" opacity="0.5" />
      </svg>
    );
  }
  if (sampleId === 'spaghetti') {
    return (
      <svg viewBox="0 0 240 160" className="w-full h-full rounded-xl bg-gradient-to-b from-amber-950/60 to-slate-900">
        <ellipse cx="120" cy="116" rx="88" ry="28" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
        <ellipse cx="120" cy="114" rx="68" ry="19" fill="#E2E8F0" />
        <g stroke="#FACC15" strokeWidth="4.5" fill="none" strokeLinecap="round">
          <path d="M64,108 Q88,68 122,74 Q158,80 176,108" />
          <path d="M72,114 Q102,58 144,68 Q170,76 168,112" />
          <path d="M80,104 Q114,82 152,102" />
          <path d="M78,94 Q120,50 160,96" />
          <path d="M90,115 Q124,78 156,114" />
        </g>
        <path
          d="M84,88 Q106,68 134,74 Q156,82 146,98 Q120,106 84,88 Z"
          fill="#DC2626"
          opacity="0.92"
        />
        <circle cx="102" cy="84" r="9" fill="#7F1D1D" />
        <circle cx="134" cy="82" r="10" fill="#7F1D1D" />
        <circle cx="118" cy="96" r="8" fill="#7F1D1D" />
        <ellipse cx="118" cy="70" rx="8" ry="4" fill="#22C55E" transform="rotate(-18 118 70)" />
        <ellipse cx="126" cy="72" rx="7" ry="3.5" fill="#16A34A" transform="rotate(24 126 72)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 240 160" className="w-full h-full rounded-xl bg-gradient-to-b from-sky-950 to-slate-900">
      <ellipse cx="120" cy="136" rx="46" ry="9" fill="rgba(0,0,0,0.4)" />
      <polygon points="84,30 156,30 144,132 96,132" fill="rgba(224,242,254,0.18)" stroke="#BAE6FD" strokeWidth="3" />
      <polygon points="88,62 152,62 143,130 97,130" fill="#38BDF8" opacity="0.72" />
      <ellipse cx="120" cy="62" rx="32" ry="6" fill="#7DD3FC" />
      <ellipse cx="120" cy="30" rx="36" ry="6" fill="none" stroke="#E0F2FE" strokeWidth="2.5" />
      <circle cx="108" cy="96" r="3" fill="#E0F2FE" opacity="0.7" />
      <circle cx="130" cy="82" r="2.5" fill="#E0F2FE" opacity="0.7" />
      <circle cx="122" cy="112" r="2" fill="#E0F2FE" opacity="0.7" />
    </svg>
  );
}
