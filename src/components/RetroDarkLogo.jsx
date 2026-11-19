import React from 'react';

// ============================================================================
// RETRO GLOWING "StuPDT" HERO WORDMARK FOR DARK MODE (Matches Poster!)
// ============================================================================
export function RetroDarkLogo({ brailleMode }) {
  const letters = brailleMode
    ? [
        { char: '⠎', color: '#F5E9D8', glow: 'rgba(245, 233, 216, 0.65)', rot: '-4deg' },
        { char: '⠞', color: '#F52820', glow: 'rgba(245, 40, 32, 0.78)', rot: '3deg' },
        { char: '⠥', color: '#1FE03F', glow: 'rgba(31, 224, 63, 0.78)', rot: '-3deg' },
        { char: '⠏', color: '#0EC7F5', glow: 'rgba(14, 199, 245, 0.8)', rot: '4deg' },
        { char: '⠙', color: '#FF6B1A', glow: 'rgba(255, 107, 26, 0.78)', rot: '-2deg' },
        { char: '⠞', color: '#F5E9D8', glow: 'rgba(245, 233, 216, 0.65)', rot: '3deg' }
      ]
    : [
        { char: 'S', color: '#F5E9D8', glow: 'rgba(245, 233, 216, 0.68)', rot: '-4deg', scale: 'scale-y-105' },
        { char: 't', color: '#F52820', glow: 'rgba(245, 40, 32, 0.82)', rot: '4deg', scale: 'scale-y-100' },
        { char: 'u', color: '#1FE03F', glow: 'rgba(31, 224, 63, 0.8)', rot: '-3deg', scale: 'scale-y-95' },
        { char: 'P', color: '#0EC7F5', glow: 'rgba(14, 199, 245, 0.84)', rot: '5deg', scale: 'scale-y-110' },
        { char: 'D', color: '#FF6B1A', glow: 'rgba(255, 107, 26, 0.82)', rot: '-4deg', scale: 'scale-y-105' },
        { char: 'T', color: '#F5E9D8', glow: 'rgba(245, 233, 216, 0.68)', rot: '2deg', scale: 'scale-y-100' }
      ];

  return (
    <div className="relative inline-flex items-baseline justify-center select-none py-1">
      {/* Subtle SVG noise grain overlay for authentic stippled print texture */}
      <svg width="0" height="0" className="absolute">
        <filter id="retroStipple">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
          <feComposite in="SourceGraphic" in2="noise" operator="arithmetic" k1="0.35" k2="0.85" k3="0.1" k4="0" />
        </filter>
      </svg>

      <div className="flex items-baseline tracking-tight" style={{ filter: 'url(#retroStipple)' }}>
        {letters.map((item, idx) => (
          <span
            key={idx}
            className={`inline-block font-black text-6xl sm:text-8xl leading-none transition-transform duration-300 hover:scale-110 ${item.scale || ''}`}
            style={{
              color: item.color,
              transform: `rotate(${item.rot})`,
              textShadow: `0 0 18px ${item.glow}, 0 0 38px ${item.glow}, 0 3px 0 rgba(0,0,0,0.85)`,
              fontFamily: '"Trebuchet MS", "Arial Black", Impact, sans-serif',
              marginRight: idx === 1 ? '-2px' : '1px'
            }}
          >
            {item.char}
          </span>
        ))}
      </div>
    </div>
  );
}
