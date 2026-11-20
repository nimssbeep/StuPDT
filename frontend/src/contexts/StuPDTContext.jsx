import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toBraille } from '../utils/braille';
import { soundFX } from '../utils/soundEngine';
import { checkBackendHealth } from '../services/apiClient';

const StuPDTContext = createContext(null);

const STORAGE_KEYS = {
  METRICS: 'stupdt_telemetry_metrics',
  VIP: 'stupdt_is_vip'
};

function getStoredJson(key, fallback) {
  try {
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function setStoredJson(key, val) {
  try {
    sessionStorage.setItem(key, JSON.stringify(val));
  } catch {
    // SessionStorage unavailable or restricted
  }
}

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

  // Backend Health Status: 'checking' | 'connected' | 'offline'
  const [backendStatus, setBackendStatus] = useState('checking');

  const refreshBackendStatus = useCallback(async () => {
    setBackendStatus('checking');
    const health = await checkBackendHealth();
    setBackendStatus(health.online ? 'connected' : 'offline');
  }, []);

  useEffect(() => {
    refreshBackendStatus();
  }, [refreshBackendStatus]);

  // Telemetry Metrics with Session Storage Persistence
  const defaultMetrics = {
    specialistsConsulted: 1,
    internalMeetings: 14,
    minutesWasted: 6,
    userSatisfaction: -18,
    chaosMeter: 15
  };

  const storedMetrics = getStoredJson(STORAGE_KEYS.METRICS, null);
  const initialMetrics = { ...defaultMetrics, ...(storedMetrics || {}) };

  const [specialistsConsulted, setSpecialistsConsulted] = useState(
    typeof initialMetrics.specialistsConsulted === 'number'
      ? initialMetrics.specialistsConsulted
      : defaultMetrics.specialistsConsulted
  );
  const [internalMeetings, setInternalMeetings] = useState(
    typeof initialMetrics.internalMeetings === 'number'
      ? initialMetrics.internalMeetings
      : defaultMetrics.internalMeetings
  );
  const [minutesWasted, setMinutesWasted] = useState(
    typeof initialMetrics.minutesWasted === 'number'
      ? initialMetrics.minutesWasted
      : defaultMetrics.minutesWasted
  );
  const [userSatisfaction, setUserSatisfaction] = useState(
    typeof initialMetrics.userSatisfaction === 'number'
      ? initialMetrics.userSatisfaction
      : defaultMetrics.userSatisfaction
  );
  const [chaosMeter, setChaosMeter] = useState(
    typeof initialMetrics.chaosMeter === 'number'
      ? initialMetrics.chaosMeter
      : defaultMetrics.chaosMeter
  );
  const [isPremiumVIP, setIsPremiumVIP] = useState(() =>
    getStoredJson(STORAGE_KEYS.VIP, false)
  );

  // Save metrics to storage whenever they change
  useEffect(() => {
    setStoredJson(STORAGE_KEYS.METRICS, {
      specialistsConsulted,
      internalMeetings,
      minutesWasted,
      userSatisfaction,
      chaosMeter
    });
  }, [specialistsConsulted, internalMeetings, minutesWasted, userSatisfaction, chaosMeter]);

  useEffect(() => {
    setStoredJson(STORAGE_KEYS.VIP, isPremiumVIP);
  }, [isPremiumVIP]);

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

  const resetMetrics = useCallback(() => {
    setSpecialistsConsulted(1);
    setInternalMeetings(14);
    setMinutesWasted(0);
    setUserSatisfaction(-18);
    setChaosMeter(15);
    setIsPremiumVIP(false);
    sessionStorage.removeItem(STORAGE_KEYS.METRICS);
    sessionStorage.removeItem(STORAGE_KEYS.VIP);
    triggerToast('All bureaucracy metrics reset back to baseline chaos!');
  }, [triggerToast]);

  // Active Modals
  // 'org_about' | 'bureaucracy' | 'vision' | 'toolkit' | 'apology_pdf' | 'emotional' | 'loading_sim' | 'report' | 'grand_finale'
  const [activeModal, setActiveModal] = useState(null);

  // Quotes
  const [quoteIdx, setQuoteIdx] = useState(0);
  const nextQuote = useCallback(() => {
    soundFX.playChime();
    setQuoteIdx((prev) => (prev + 1) % 12);
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

    // Backend
    backendStatus,
    refreshBackendStatus,

    // Telemetry
    specialistsConsulted,
    internalMeetings,
    minutesWasted,
    userSatisfaction,
    chaosMeter,
    bumpMetrics,
    resetMetrics,
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
