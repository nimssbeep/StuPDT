import React, { createContext, useContext, useState, useCallback } from 'react';
import { toBraille } from '../utils/braille';
import { soundFX } from '../utils/soundEngine';

const StuPDTContext = createContext(null);

export function StuPDTProvider({ children }) {
  // Theme & Accessibility
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [brailleMode, setBrailleMode] = useState(false);
  const [signLanguageMode, setSignLanguageMode] = useState(false);

  // Translation helper: turns visible text to Braille when Braille Mode is ON
  const tx = useCallback(
    (text) => (brailleMode ? toBraille(text) : text),
    [brailleMode]
  );

  // Sound Engine
  const [isMuted, setIsMuted] = useState(false);
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundFX.muted = next;
      return next;
    });
  }, []);

  // Telemetry Metrics
  const [specialistsConsulted, setSpecialistsConsulted] = useState(1);
  const [internalMeetings, setInternalMeetings] = useState(14);
  const [minutesWasted, setMinutesWasted] = useState(6);
  const [userSatisfaction, setUserSatisfaction] = useState(-18);
  const [chaosMeter, setChaosMeter] = useState(15);
  const [isPremiumVIP, setIsPremiumVIP] = useState(false);

  // Toast Notification
  const [toastNotification, setToastNotification] = useState(null);
  const triggerToast = useCallback((msg) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  }, []);

  const bumpMetrics = useCallback(
    (extraDepts = 1, extraChaos = 18, extraMins = 8) => {
      setSpecialistsConsulted((prev) => prev + extraDepts);
      setInternalMeetings((prev) => prev + 5);
      setMinutesWasted((prev) => prev + extraMins);
      setUserSatisfaction((prev) => Math.max(-999, prev - 22));
      setChaosMeter((prev) => {
        const next = Math.min(100, prev + extraChaos);
        if (next >= 100 && prev < 100) {
          soundFX.playKlaxon();
          triggerToast('100% CHAOS REACHED: NATIONAL BUREAUCRATIC EMERGENCY DECLARED!');
        }
        return next;
      });
    },
    [triggerToast]
  );

  // Active Modals
  // 'org_about' | 'bureaucracy' | 'vision' | 'toolkit' | 'apology_pdf' | 'emotional' | 'loading_sim' | 'report' | 'grand_finale'
  const [activeModal, setActiveModal] = useState(null);

  // Quotes
  const [quoteIdx, setQuoteIdx] = useState(0);
  const nextQuote = useCallback(() => {
    soundFX.playChime();
    setQuoteIdx((prev) => (prev + 1) % 12); // STUPID_QUOTES length is 12
  }, []);

  const value = {
    // Theme & a11y
    isDarkMode,
    setIsDarkMode,
    brailleMode,
    setBrailleMode,
    signLanguageMode,
    setSignLanguageMode,
    tx,

    // Audio
    isMuted,
    toggleMute,
    soundFX,

    // Telemetry
    specialistsConsulted,
    internalMeetings,
    minutesWasted,
    userSatisfaction,
    chaosMeter,
    bumpMetrics,
    isPremiumVIP,
    setIsPremiumVIP,

    // Toast
    toastNotification,
    triggerToast,

    // Modals
    activeModal,
    setActiveModal,

    // Quotes
    quoteIdx,
    setQuoteIdx,
    nextQuote
  };

  return <StuPDTContext.Provider value={value}>{children}</StuPDTContext.Provider>;
}

export function useStuPDT() {
  const context = useContext(StuPDTContext);
  if (!context) {
    throw new Error('useStuPDT must be used within a StuPDTProvider');
  }
  return context;
}
