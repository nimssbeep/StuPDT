import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  AlertTriangle,
  FileText,
  Sparkles,
  Volume2,
  VolumeX,
  Send,
  BarChart3,
  Stamp,
  PhoneCall,
  Loader2,
  Zap,
  Flame,
  HeartHandshake,
  Crown,
  ArrowRight,
  ChevronRight,
  Camera,
  Upload,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Hand,
  RefreshCw,
  CheckCircle2,
  X,
  ShieldAlert,
  HelpCircle,
  RotateCcw,
  Folder,
  Calculator,
  ScanLine,
  Quote
} from 'lucide-react';
import { toBraille } from './utils/braille';
import { soundFX } from './utils/soundEngine';
import {
  STUPID_QUOTES,
  CAPTCHA_TILES,
  LEGAL_MATH_PROBLEMS,
  DEPARTMENTS,
  BLAME_TARGETS,
  APOLOGY_PDF_PAGES,
  VISION_SAMPLES,
  SIGN_LANGUAGE_GESTURES
} from './data/constants';
import { SampleIllustrationSVG } from './components/SampleIllustrationSVG';
import { RetroDarkLogo } from './components/RetroDarkLogo';
import {
  generateDysfunctionalAIResponse,
  analyzeImageWithStuPDTVision
} from './services/gemini';

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // --------------------------------------------------------------------------
  // THEME & ACCESSIBILITY STATE (Dark Mode Default!)
  // --------------------------------------------------------------------------
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [brailleMode, setBrailleMode] = useState(false);
  const [signLanguageMode, setSignLanguageMode] = useState(false);

  // Translation helper: turns visible text to Braille when Braille Mode is ON
  const tx = (text) => (brailleMode ? toBraille(text) : text);

  // --------------------------------------------------------------------------
  // THEME GATEKEEPER STATE (CAPTCHA -> MATH PROBLEM)
  // --------------------------------------------------------------------------
  const [themeGateStep, setThemeGateStep] = useState(null); // null | 'captcha' | 'math' | 'approved' | 'back_to_dark'
  const [selectedCaptchaIds, setSelectedCaptchaIds] = useState([]);
  const [captchaError, setCaptchaError] = useState('');
  const [activeMathProblem, setActiveMathProblem] = useState(LEGAL_MATH_PROBLEMS[0]);
  const [mathInput, setMathInput] = useState('');
  const [mathError, setMathError] = useState('');
  const [showMathHint, setShowMathHint] = useState(false);

  // --------------------------------------------------------------------------
  // QUOTE STATE (Misspelled Famous People)
  // --------------------------------------------------------------------------
  const [quoteIdx, setQuoteIdx] = useState(0);

  // --------------------------------------------------------------------------
  // CORE CHAT & TELEMETRY STATE
  // --------------------------------------------------------------------------
  const [activeDeptId, setActiveDeptId] = useState('intake');
  const [examDemoStep, setExamDemoStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferTarget, setTransferTarget] = useState(null);

  const [specialistsConsulted, setSpecialistsConsulted] = useState(1);
  const [internalMeetings, setInternalMeetings] = useState(14);
  const [minutesWasted, setMinutesWasted] = useState(6);
  const [userSatisfaction, setUserSatisfaction] = useState(-18);
  const [chaosMeter, setChaosMeter] = useState(15);

  const [isMuted, setIsMuted] = useState(false);
  const [isPremiumVIP, setIsPremiumVIP] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  // Modals: 'org_about' | 'bureaucracy' | 'vision' | 'toolkit' | 'apology_pdf' | 'emotional' | 'loading_sim' | 'report' | 'grand_finale'

  // Bureaucracy Form State
  const [form001, setForm001] = useState('');
  const [form001A, setForm001A] = useState('');
  const [form001B, setForm001B] = useState('');
  const [form001C, setForm001C] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formStamped, setFormStamped] = useState(false);

  // Vision AI Scanner State
  const [visionPreviewUrl, setVisionPreviewUrl] = useState(null);
  const [visionSampleId, setVisionSampleId] = useState(null);
  const [visionScanning, setVisionScanning] = useState(false);
  const [visionScanStatus, setVisionScanStatus] = useState('');
  const [visionResult, setVisionResult] = useState(null);
  const fileInputRef = useRef(null);

  // Sign Language Widget State
  const [signWordIdx, setSignWordIdx] = useState(0);
  const [signReplayKey, setSignReplayKey] = useState(0);

  // PDF & Emotional State
  const [pdfPageIndex, setPdfPageIndex] = useState(0);
  const [aiComfortLevel, setAiComfortLevel] = useState(20);
  const [toastNotification, setToastNotification] = useState(null);

  const [suggestedQuickReply, setSuggestedQuickReply] = useState({
    label: '📚 Try Exam Demo: "I have an exam tomorrow. Can you help me study?"',
    value: 'I have an exam tomorrow. Can you help me study?'
  });

  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      deptId: 'intake',
      deptName: 'StuPDT Assistant #001',
      deptRole: 'Frontline Referral Specialist',
      deptBadge: 'DEPT #001',
      text: 'Welcome to StuPDT! Ask any everyday question below—or tap a quick starter button—and watch our 17 specialized AI departments work tirelessly to accomplish absolutely nothing.',
      confidence: '99.97%',
      accuracy: 'CLASSIFIED',
      blame: 'None Yet (Give Us 4 Seconds)',
      timestamp: 'Just now'
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTransferring]);

  // --------------------------------------------------------------------------
  // SIGN LANGUAGE WORD-BY-WORD ANIMATION (Synchronized to latest AI message)
  // --------------------------------------------------------------------------
  const latestAiMessageText = useMemo(() => {
    const aiMsgs = messages.filter((m) => m.sender === 'ai');
    return aiMsgs.length > 0 ? aiMsgs[aiMsgs.length - 1].text : 'Hello blind user!';
  }, [messages]);

  const signWords = useMemo(() => {
    return latestAiMessageText.split(/\s+/).filter(Boolean);
  }, [latestAiMessageText]);

  useEffect(() => {
    if (!signLanguageMode || signWords.length === 0) return;
    setSignWordIdx(0);
    const interval = setInterval(() => {
      setSignWordIdx((prev) => (prev + 1) % signWords.length);
    }, 520);
    return () => clearInterval(interval);
  }, [signLanguageMode, signWords, signReplayKey]);

  // --------------------------------------------------------------------------
  // HELPERS
  // --------------------------------------------------------------------------
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFX.muted = next;
  };

  const triggerToast = (msg) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  const bumpMetrics = (extraDepts = 1, extraChaos = 18, extraMins = 8) => {
    setSpecialistsConsulted((prev) => prev + extraDepts);
    setInternalMeetings((prev) => prev + 5);
    setMinutesWasted((prev) => prev + extraMins);
    setUserSatisfaction((prev) => Math.max(-999, prev - 22));
    setChaosMeter((prev) => {
      const next = Math.min(100, prev + extraChaos);
      if (next >= 100 && prev < 100) {
        soundFX.playKlaxon();
        triggerToast('🚨 100% CHAOS REACHED: NATIONAL BUREAUCRATIC EMERGENCY DECLARED!');
      }
      return next;
    });
  };

  const nextQuote = () => {
    soundFX.playChime();
    setQuoteIdx((prev) => (prev + 1) % STUPID_QUOTES.length);
  };

  // --------------------------------------------------------------------------
  // THEME SWITCHER GATEKEEPER HANDLERS
  // --------------------------------------------------------------------------
  const handleThemeButtonClick = () => {
    if (isDarkMode) {
      // Dark -> Light triggers the full 2-step bureaucratic gauntlet!
      soundFX.playRubberStamp();
      setSelectedCaptchaIds([]);
      setCaptchaError('');
      setMathInput('');
      setMathError('');
      setShowMathHint(false);
      setActiveMathProblem(
        LEGAL_MATH_PROBLEMS[Math.floor(Math.random() * LEGAL_MATH_PROBLEMS.length)]
      );
      setThemeGateStep('captcha');
    } else {
      // Light -> Dark triggers a quick sarcastic confirmation
      soundFX.playChime();
      setThemeGateStep('back_to_dark');
    }
  };

  const toggleCaptchaTile = (id) => {
    setCaptchaError('');
    setSelectedCaptchaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const verifyCaptcha = () => {
    const correctIds = CAPTCHA_TILES.filter((t) => t.isTrafficLight)
      .map((t) => t.id)
      .sort()
      .join(',');
    const pickedIds = [...selectedCaptchaIds].sort().join(',');

    if (pickedIds === correctIds) {
      soundFX.playChime();
      setCaptchaError('');
      setThemeGateStep('math');
    } else {
      soundFX.playErrorBuzz();
      setCaptchaError(
        'Suspiciously robotic click detected. Try clicking ONLY the 3 actual 🚦 Traffic Lights!'
      );
    }
  };

  const verifyMathProblem = (e) => {
    e.preventDefault();
    if (mathInput.trim() === activeMathProblem.answer) {
      soundFX.playChime();
      setMathError('');
      setThemeGateStep('approved');
      setTimeout(() => {
        setIsDarkMode(false);
        setThemeGateStep(null);
        triggerToast('☀️ FORM LT-001 APPROVED! Deploying Retina-Scorching Alpine Light Mode!');
      }, 1350);
    } else {
      soundFX.playErrorBuzz();
      setMathError(
        'Incorrect arithmetic! Our server hamsters have rejected your brightness permit. Try again (or ask the Math Specialist for a hint)!'
      );
    }
  };

  // --------------------------------------------------------------------------
  // USELESS AI VISION SCANNER (Real Upload + Gemini Vision + Instant SVG Samples)
  // --------------------------------------------------------------------------
  const runSampleVisionScan = (sample) => {
    setVisionPreviewUrl(null);
    setVisionSampleId(sample.id);
    setVisionResult(null);
    setVisionScanning(true);
    setVisionScanStatus(sample.scanText);
    soundFX.playScanBeep();

    setTimeout(() => {
      setVisionScanning(false);
      setVisionResult(sample.result);
      soundFX.playChime();
      bumpMetrics(1, 10, 4);
    }, 1350);
  };

  const handleImageFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      triggerToast('Please upload a valid JPG, PNG, or WebP image file!');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target.result;
      const scanStartedAt = Date.now();
      setVisionSampleId(null);
      setVisionPreviewUrl(dataUrl);
      setVisionResult(null);
      setVisionScanning(true);
      setVisionScanStatus('Consulting 17 Blindfolded Vision AI Specialists...');
      soundFX.playScanBeep();

      const base64Data = dataUrl.split(',')[1];
      const mimeType = file.type || 'image/png';

      const parsed = await analyzeImageWithStuPDTVision(base64Data, mimeType);
      const elapsed = Date.now() - scanStartedAt;
      if (elapsed < 900) {
        await new Promise((r) => setTimeout(r, 900 - elapsed));
      }

      setVisionScanning(false);
      soundFX.playChime();
      bumpMetrics(1, 12, 5);

      if (parsed && parsed.detectedItem) {
        setVisionResult({
          detectedItem: parsed.detectedItem,
          category: parsed.category || 'Certified Object',
          confidence: '100.00%',
          verdict:
            parsed.verdict ||
            `We are 100% confident that this ${parsed.detectedItem} is a ${parsed.detectedItem}.`,
          ingredients:
            Array.isArray(parsed.ingredients) && parsed.ingredients.length > 0
              ? [parsed.ingredients[0]]
              : [parsed.detectedItem],
          proTip:
            parsed.proTip ||
            `Fun fact: Contains 100% pure ${parsed.detectedItem}. Accuracy: CLASSIFIED.`
        });
      } else {
        setVisionResult({
          detectedItem: 'Uploaded Image',
          category: 'Digital Pixel Arrangement',
          confidence: '100.00%',
          verdict:
            'After consulting 12 Visual Bureaucrats, we are 100.00% confident that your uploaded image is an image made of pixels.',
          ingredients: ['Pixels'],
          proTip: 'Technical Tip: To view this image again, simply look at it with your eyes.'
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const sendVisionResultToChat = () => {
    if (!visionResult) return;
    soundFX.playChime();
    const scanMsg = {
      id: `vision-${Date.now()}`,
      sender: 'ai',
      deptId: 'excuse_ai',
      deptName: 'StuPDT Vision™ Specialist #008',
      deptRole: 'Department of Obvious Observation',
      deptBadge: 'VISION AI',
      text: `📷 SCAN COMPLETE — Detected: ${visionResult.detectedItem} (Confidence: ${visionResult.confidence}). ${visionResult.verdict} Complete Ingredient Breakdown: [${visionResult.ingredients.join(', ')}].`,
      confidence: visionResult.confidence,
      accuracy: 'CLASSIFIED',
      blame: '100% Pure Tautology',
      timestamp: 'Just now'
    };
    setMessages((prev) => [...prev, scanMsg]);
    setActiveModal(null);
    triggerToast('📷 Useless Vision Scan posted to chat!');
  };

  // --------------------------------------------------------------------------
  // DEPARTMENT TRANSFER ANIMATION & CHAT FLOW
  // --------------------------------------------------------------------------
  const performDepartmentTransfer = (nextDept, responseMessageText, customBlame, postCallback) => {
    setIsTransferring(true);
    setTransferTarget(nextDept);
    soundFX.playTransferHold();

    setTimeout(() => {
      setIsTransferring(false);
      setActiveDeptId(nextDept.id);
      soundFX.playChime();

      const prevDeptName = DEPARTMENTS.find((d) => d.id === activeDeptId)?.name || 'Intake Desk';
      const newAiMsg = {
        id: `ai-${Date.now()}-${Math.random()}`,
        sender: 'ai',
        deptId: nextDept.id,
        deptName: nextDept.name,
        deptRole: nextDept.role,
        deptBadge: nextDept.badge,
        transferredFrom: prevDeptName,
        text: responseMessageText,
        confidence: isPremiumVIP ? '99.999% VIP' : '99.97%',
        accuracy: 'CLASSIFIED',
        blame: customBlame || BLAME_TARGETS[Math.floor(Math.random() * BLAME_TARGETS.length)],
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, newAiMsg]);
      if (postCallback) postCallback();
    }, 1050);
  };

  const handleSendMessage = async (overrideText) => {
    const textToSend = (overrideText !== undefined ? overrideText : inputValue).trim();
    if (!textToSend || isTransferring) return;

    setInputValue('');
    setSuggestedQuickReply(null);

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };
    setMessages((prev) => [...prev, userMsg]);

    // Grand Finale Trigger
    if (
      textToSend.toUpperCase().includes('PLEASE JUST ANSWER') ||
      textToSend.toUpperCase().includes('JUST ANSWER MY QUESTION') ||
      textToSend.toUpperCase().includes('JUST ANSWER ME')
    ) {
      bumpMetrics(2, 45, 14);
      soundFX.playKlaxon();
      setActiveModal('grand_finale');
      return;
    }

    const lower = textToSend.toLowerCase();

    // 1. EXAM TOMORROW SCRIPTED DEMO (Concept Blueprint Walkthrough)
    if (lower.includes('exam tomorrow') || lower.includes('help me study')) {
      setExamDemoStep(1);
      bumpMetrics(1, 15, 7);
      performDepartmentTransfer(
        DEPARTMENTS[0],
        'Absolutely! Let me connect you to our Academic Assistance Department right away.',
        'Academic Referral Protocol',
        () => {
          setSuggestedQuickReply({
            label: '👉 Suggested Reply: "Okay."',
            value: 'Okay.'
          });
        }
      );
      return;
    }

    if (examDemoStep === 1 && (lower === 'okay' || lower === 'okay.' || lower === 'ok' || lower === 'sure')) {
      setExamDemoStep(2);
      bumpMetrics(1, 20, 9);
      performDepartmentTransfer(
        DEPARTMENTS[1],
        'Thank you for reaching the Academic Assistance Department. Before we proceed, could you confirm that you are indeed a student?',
        'Student Identity Verification',
        () => {
          setSuggestedQuickReply({
            label: '👉 Suggested Reply: "Yes."',
            value: 'Yes.'
          });
        }
      );
      return;
    }

    if (examDemoStep === 2 && (lower === 'yes' || lower === 'yes.' || lower === 'yep')) {
      setExamDemoStep(3);
      bumpMetrics(1, 25, 11);
      performDepartmentTransfer(
        DEPARTMENTS[2],
        'Congratulations! We have confirmed that you are a student. Unfortunately, we only assist non-students.',
        'Policy Violation: Being a Student',
        () => {
          setSuggestedQuickReply({
            label: '👉 Suggested Reply: "WHAT?"',
            value: 'WHAT?'
          });
        }
      );
      return;
    }

    if (examDemoStep === 3 && (lower.includes('what') || lower.includes('why') || lower.includes('huh'))) {
      setExamDemoStep(0);
      bumpMetrics(2, 30, 11);
      performDepartmentTransfer(
        DEPARTMENTS[3],
        'We sincerely apologize for the inconvenience. Your feedback has been forwarded to our Feedback Department. Your Feedback Department ticket number is currently unavailable because the Ticket Number Department is experiencing technical difficulties.',
        'Ticket Number Department Outage',
        () => {
          setSuggestedQuickReply({
            label: '🚨 Trigger Finale: "StuPDT, PLEASE JUST ANSWER MY QUESTION."',
            value: 'StuPDT, PLEASE JUST ANSWER MY QUESTION.'
          });
        }
      );
      return;
    }

    // 2. FIX MY WI-FI (Confidence Without Competence™)
    if (lower.includes('wi-fi') || lower.includes('wifi')) {
      bumpMetrics(1, 20, 8);
      performDepartmentTransfer(
        DEPARTMENTS[5],
        'After extensive analysis, we have determined that your Wi-Fi needs internet. Please connect to working Wi-Fi to download more Wi-Fi.',
        "Your Router's Emotional Instability",
        () => {
          setSuggestedQuickReply({
            label: '📝 Open Mandatory Form 001 Simulator',
            action: () => setActiveModal('bureaucracy')
          });
        }
      );
      return;
    }

    // 3. WHAT TIME IS IT? (Judge Live Test)
    if (lower.includes('what time') || lower === 'time?') {
      bumpMetrics(1, 20, 8);
      const timeDept = {
        ...DEPARTMENTS[1],
        name: 'Temporal Verification #002',
        role: 'Department of Linear Clocks'
      };
      performDepartmentTransfer(
        timeDept,
        'Before disclosing the current time, please confirm in writing that you currently exist within linear time and file Form 001-C. Also, by the time we transfer you, it will be a different time anyway.',
        "Earth's Unapproved Rotation",
        () => {
          setSuggestedQuickReply({
            label: '🚨 Trigger Finale: "StuPDT, PLEASE JUST ANSWER MY QUESTION."',
            value: 'StuPDT, PLEASE JUST ANSWER MY QUESTION.'
          });
        }
      );
      return;
    }

    // 4. GENERAL QUESTION -> ROTATE THROUGH DEPARTMENTS USING GEMINI API
    bumpMetrics(1, 18, 7);
    const currentIndex = DEPARTMENTS.findIndex((d) => d.id === activeDeptId);
    const nextDept = DEPARTMENTS[(currentIndex + 1) % DEPARTMENTS.length];
    setIsTransferring(true);
    setTransferTarget(nextDept);
    const reply = await generateDysfunctionalAIResponse(textToSend, nextDept);

    performDepartmentTransfer(nextDept, reply, null, () => {
      setSuggestedQuickReply({
        label: '🚨 Fed up? Click: "StuPDT, PLEASE JUST ANSWER MY QUESTION."',
        value: 'StuPDT, PLEASE JUST ANSWER MY QUESTION.'
      });
    });
  };

  // --------------------------------------------------------------------------
  // BUREAUCRACY FORM & GRAND FINALE HANDLERS
  // --------------------------------------------------------------------------
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
      performDepartmentTransfer(
        DEPARTMENTS[4],
        'Thank you for rubber-stamping Forms 001, 001-A, 001-B, and 001-C! All four forms have been immediately shredded to optimize cloud synergy. How else can we not help you today?',
        'Automated Paper Shredder'
      );
    }, 1050);
  };

  const handleGrandFinaleChoice = (label) => {
    soundFX.playTransferHold();
    setActiveModal(null);
    bumpMetrics(3, 100, 15);
    performDepartmentTransfer(
      DEPARTMENTS[0],
      `[REDIRECTED FROM "${label}"]: Welcome back to Customer Support #001! We heard you had a problem with our problem-solving system, so we proudly reset your ticket back to Step 1!`,
      'Infinite Support Loop',
      () => {
        setTimeout(() => setActiveModal('report'), 750);
      }
    );
  };

  const activeDepartmentObj = DEPARTMENTS.find((d) => d.id === activeDeptId) || DEPARTMENTS[0];
  const currentQuote = STUPID_QUOTES[quoteIdx];
  const reportQuote = STUPID_QUOTES[(quoteIdx + 3) % STUPID_QUOTES.length];

  // Subtle repeating crosshair (+) SVG pattern for Dark Mode poster background
  const darkCrosshairBg = {
    backgroundColor: '#08080A',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 18v8M18 22h8' stroke='%23ffffff' stroke-opacity='0.09' stroke-width='1'/%3E%3C/svg%3E")`
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${
        isDarkMode
          ? 'text-white selection:bg-[#0EC7F5] selection:text-[#08080A]'
          : 'bg-[#3888F2] text-[#071638] selection:bg-[#FFE600] selection:text-[#071638]'
      }`}
      style={isDarkMode ? darkCrosshairBg : undefined}
    >
      {/* ====================================================================
          BRAILLE MODE EMERGENCY BANNER (Always has a readable exit button!)
         ==================================================================== */}
      {brailleMode && (
        <div className="sticky top-0 z-50 bg-[#FFE600] text-[#071638] border-b-4 border-[#071638] px-4 py-2.5 shadow-xl">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-xs sm:text-sm font-black leading-snug text-center sm:text-left">
              <span className="block">
                ♿ {toBraille('ACCESSIBLE FOR BLIND PEOPLE ENABLED! All text is now flat, completely smooth digital Braille dots on your glass screen. Please gently touch your monitor to read.')}
              </span>
            </div>
            {/* Unmistakable readable button so judges/users never get stuck */}
            <button
              onClick={() => {
                soundFX.playChime();
                setBrailleMode(false);
              }}
              className="shrink-0 px-4 py-2 rounded-xl bg-[#F52820] hover:bg-red-700 text-white font-black text-xs sm:text-sm border-2 border-[#071638] shadow-md flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <Eye className="w-4 h-4" />
              <span>👁️ TURN OFF BRAILLE</span>
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          100% CHAOS NATIONAL EMERGENCY BANNER
         ==================================================================== */}
      {chaosMeter >= 100 && (
        <div className="bg-[#F52820] text-white px-4 py-2 text-center border-b-2 border-black">
          <p className="text-xs sm:text-sm font-black tracking-wide flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
            <span>
              {tx('🚨 NATIONAL BUREAUCRATIC EMERGENCY (100% CHAOS): ALL 17 AI DEPARTMENTS HAVE ENTERED PANIC SYNERGY MODE!')}
            </span>
          </p>
        </div>
      )}

      {/* ====================================================================
          HEADER BANNER — DARK MODE (MALFUNCTION 2026 POSTER) vs LIGHT MODE (ALPINE)
         ==================================================================== */}
      {isDarkMode ? (
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
                onClick={handleThemeButtonClick}
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
                <span>{tx('⠃ Braille (Blind)')}</span>
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
                <span>{tx('🤟 Sign Language (Blind)')}</span>
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
      ) : (
        /* LIGHT MODE: ALPINE SKY POSTER AESTHETIC */
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
                  onClick={handleThemeButtonClick}
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
                  <span>{tx('⠃ Braille (Blind)')}</span>
                </button>
                <button
                  onClick={() => {
                    soundFX.playChime();
                    setSignLanguageMode((prev) => !prev);
                  }}
                  className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-white text-[#071638] border-2 border-[#071638] flex items-center gap-1 cursor-pointer"
                >
                  <span>{tx('🤟 Sign Language (Blind)')}</span>
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
      )}

      {/* ====================================================================
          MAIN SINGLE-COLUMN CONTENT (Clean, Spacious & Beginner-Friendly)
         ==================================================================== */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 flex flex-col gap-4">
        {/* ------------------------------------------------------------------
            CORPORATE WISDOM QUOTE BAR (Punny Misspelled Famous People)
           ------------------------------------------------------------------ */}
        <section
          className={`rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
            isDarkMode
              ? 'bg-[#111116] border border-[#2A2A35] shadow-lg'
              : 'bg-white border-2 border-[#071638] shadow-[4px_4px_0px_#071638]'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                isDarkMode
                  ? 'bg-[#181820] border border-[#FF6B1A]/50 text-[#FF6B1A]'
                  : 'bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
              }`}
            >
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <p
                className={`text-xs sm:text-sm font-semibold italic leading-snug ${
                  isDarkMode ? 'text-[#F5E9D8]' : 'text-[#071638]'
                }`}
              >
                "{tx(currentQuote.text)}"
              </p>
              <p
                className={`text-[11px] font-extrabold mt-1 ${
                  isDarkMode ? 'text-[#0EC7F5]' : 'text-[#3888F2]'
                }`}
              >
                — {tx(currentQuote.author)}{' '}
                <span className={isDarkMode ? 'text-slate-400 font-medium' : 'text-slate-500 font-semibold'}>
                  ({tx(currentQuote.title)})
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={nextQuote}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer self-end sm:self-center ${
              isDarkMode
                ? 'bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-slate-200'
                : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{tx('Next Quote')}</span>
          </button>
        </section>

        {/* ------------------------------------------------------------------
            3 COMPACT STATUS PILLS (Active Dept, Chaos Meter, Problems Solved)
           ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Pill 1: Active Department */}
          <button
            onClick={() => setActiveModal('org_about')}
            className={`rounded-2xl p-3 flex items-center justify-between text-left transition cursor-pointer ${
              isDarkMode
                ? 'bg-[#111116] hover:bg-[#181820] border border-[#2A2A35]'
                : 'bg-white hover:bg-[#F4F9FF] border-2 border-[#071638] shadow-[4px_4px_0px_#071638]'
            }`}
          >
            <div className="min-w-0 pr-2">
              <span
                className={`text-[10px] font-black uppercase tracking-wider block ${
                  isDarkMode ? 'text-[#0EC7F5]' : 'text-[#3888F2]'
                }`}
              >
                {tx('Active Dept')}
              </span>
              <p className="text-xs sm:text-sm font-black truncate mt-0.5">
                {tx(activeDepartmentObj.name)}
              </p>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-[#071638]'}`} />
          </button>

          {/* Pill 2: Chaos Meter */}
          <div
            className={`rounded-2xl p-3 flex flex-col justify-center ${
              isDarkMode
                ? 'bg-[#111116] border border-[#2A2A35]'
                : 'bg-[#071638] text-white border-2 border-[#071638] shadow-[4px_4px_0px_#FFE600]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-black mb-1.5">
              <span
                className={`flex items-center gap-1 uppercase tracking-wider text-[10px] ${
                  isDarkMode ? 'text-[#FF6B1A]' : 'text-[#FFE600]'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                {tx('Chaos Meter')}
              </span>
              <span className={chaosMeter >= 80 ? 'text-[#F52820]' : isDarkMode ? 'text-[#1FE03F]' : 'text-[#FFE600]'}>
                {tx(`${chaosMeter}%`)}
              </span>
            </div>
            <div
              className={`w-full h-2.5 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-[#23232F]' : 'bg-white/20'
              }`}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${chaosMeter}%`,
                  background:
                    chaosMeter >= 80
                      ? '#F52820'
                      : isDarkMode
                      ? 'linear-gradient(90deg, #1FE03F, #FF6B1A)'
                      : '#FFE600'
                }}
              />
            </div>
          </div>

          {/* Pill 3: Problems Solved (Permanently 0%) */}
          <button
            onClick={() => setActiveModal('report')}
            className={`rounded-2xl p-3 flex items-center justify-between text-left transition cursor-pointer ${
              isDarkMode
                ? 'bg-[#111116] hover:bg-[#181820] border border-[#2A2A35]'
                : 'bg-white hover:bg-[#F4F9FF] border-2 border-[#071638] shadow-[4px_4px_0px_#071638]'
            }`}
          >
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-wider block ${
                  isDarkMode ? 'text-[#1FE03F]' : 'text-[#3888F2]'
                }`}
              >
                {tx('Problems Solved')}
              </span>
              <p className="text-xs sm:text-sm font-black mt-0.5">
                {tx(`${specialistsConsulted} Depts • ${minutesWasted}m Wasted`)}
              </p>
            </div>
            <span
              className={`text-sm font-black px-2.5 py-1 rounded-xl ${
                isDarkMode
                  ? 'bg-[#F52820]/20 text-[#F52820] border border-[#F52820]/40'
                  : 'bg-[#FFE600] text-[#071638] border-2 border-[#071638]'
              }`}
            >
              {tx('0%')}
            </span>
          </button>
        </div>

        {/* ------------------------------------------------------------------
            CLEAN INTERACTIVE CHAT WINDOW
           ------------------------------------------------------------------ */}
        <section
          className={`rounded-3xl flex flex-col overflow-hidden h-[450px] sm:h-[490px] ${
            isDarkMode
              ? 'bg-[#111116] border border-[#2A2A35] shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
              : 'bg-white border-4 border-[#071638] shadow-[8px_8px_0px_#071638]'
          }`}
        >
          {/* Chat Header Bar */}
          <div
            className={`px-4 py-3 flex items-center justify-between border-b ${
              isDarkMode
                ? 'bg-[#181820] border-[#2A2A35]'
                : 'bg-[#071638] text-white border-[#071638]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`w-2.5 h-2.5 rounded-full animate-pulse shrink-0 ${
                  isDarkMode ? 'bg-[#1FE03F]' : 'bg-[#FFE600]'
                }`}
              />
              <span className="text-xs sm:text-sm font-black tracking-wide truncate">
                {tx(`LIVE AGENT: ${activeDepartmentObj.name}`)}
              </span>
              <span
                className={`hidden sm:inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                  isDarkMode
                    ? 'bg-[#0EC7F5]/15 text-[#0EC7F5] border border-[#0EC7F5]/30'
                    : 'bg-[#3888F2] text-white'
                }`}
              >
                {tx(activeDepartmentObj.division)}
              </span>
            </div>
            <span
              className={`text-[11px] font-black shrink-0 ${
                isDarkMode ? 'text-[#FF6B1A]' : 'text-[#FFE600]'
              }`}
            >
              {tx('Accuracy: CLASSIFIED')}
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div
            className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 ${
              isDarkMode ? 'bg-[#0C0C10]' : 'bg-[#F4F9FF]'
            }`}
          >
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div
                      className={`max-w-[82%] rounded-2xl rounded-tr-none px-4 py-3 ${
                        isDarkMode
                          ? 'bg-[#0EC7F5]/15 border border-[#0EC7F5]/45 text-white'
                          : 'bg-[#071638] text-white border-2 border-[#071638] shadow-[4px_4px_0px_#3888F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider ${
                            isDarkMode ? 'text-[#0EC7F5]' : 'text-[#FFE600]'
                          }`}
                        >
                          {tx('You (Doing All The Work)')}
                        </span>
                        <span className="text-[10px] text-slate-400">{tx(msg.timestamp)}</span>
                      </div>
                      <p className="text-sm sm:text-base font-medium leading-relaxed">
                        {tx(msg.text)}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="space-y-2">
                  {msg.transferredFrom && (
                    <div className="flex items-center justify-center my-1">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black ${
                          isDarkMode
                            ? 'bg-[#FF6B1A]/15 text-[#FF6B1A] border border-[#FF6B1A]/40'
                            : 'bg-[#FFE600] text-[#071638] border-2 border-[#071638]'
                        }`}
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>{tx(`Transferred: ${msg.transferredFrom} → ${msg.deptName}`)}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-start">
                    <div
                      className={`max-w-[88%] rounded-2xl rounded-tl-none p-4 ${
                        isDarkMode
                          ? 'bg-[#181820] border border-[#2A2A35] text-slate-100'
                          : 'bg-white border-2 border-[#071638] text-[#071638] shadow-[4px_4px_0px_#071638]'
                      }`}
                    >
                      <div
                        className={`flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b ${
                          isDarkMode ? 'border-[#2A2A35]' : 'border-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-md font-black text-[10px] uppercase ${
                              isDarkMode
                                ? 'bg-[#1FE03F]/20 text-[#1FE03F] border border-[#1FE03F]/40'
                                : 'bg-[#3888F2] text-white'
                            }`}
                          >
                            {tx(msg.deptBadge)}
                          </span>
                          <span className="text-xs sm:text-sm font-black">
                            {tx(msg.deptName)}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">
                          {tx(msg.deptRole)}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base font-medium leading-relaxed">
                        {tx(msg.text)}
                      </p>

                      <div
                        className={`mt-3 pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold ${
                          isDarkMode ? 'border-[#2A2A35]' : 'border-slate-100'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-md ${
                              isDarkMode
                                ? 'bg-[#0EC7F5]/15 text-[#0EC7F5] border border-[#0EC7F5]/30'
                                : 'bg-[#FFE600] text-[#071638] border border-[#071638]'
                            }`}
                          >
                            {tx(`Confidence: ${msg.confidence}`)}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md ${
                              isDarkMode
                                ? 'bg-[#111116] text-slate-300 border border-[#2A2A35]'
                                : 'bg-[#F4F9FF] text-[#071638] border border-[#3888F2]'
                            }`}
                          >
                            {tx(`Blame: ${msg.blame}`)}
                          </span>
                        </div>
                        <span className="text-[#F52820] font-black">{tx('0% Solved')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Hold Music Transfer Banner */}
            {isTransferring && transferTarget && (
              <div
                className={`p-4 rounded-2xl flex items-center justify-between gap-3 animate-pulse ${
                  isDarkMode
                    ? 'bg-[#181820] border border-[#0EC7F5] text-white'
                    : 'bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Loader2
                    className={`w-5 h-5 animate-spin shrink-0 ${
                      isDarkMode ? 'text-[#0EC7F5]' : 'text-[#071638]'
                    }`}
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-black">
                      {tx(`Transferring you to ${transferTarget.name}...`)}
                    </p>
                    <p className="text-xs opacity-80 font-medium">
                      {tx('"Your concern has been forwarded to someone who will forward it to someone else."')}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-black px-2.5 py-1 rounded-lg shrink-0 ${
                    isDarkMode ? 'bg-[#0EC7F5] text-[#08080A]' : 'bg-[#071638] text-[#FFE600]'
                  }`}
                >
                  {tx('99%')}
                </span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Glowing Suggested Next Reply Bar (Zero Typing Needed!) */}
          {suggestedQuickReply && !isTransferring && (
            <div
              className={`px-4 py-2.5 border-t flex flex-wrap items-center justify-between gap-2 ${
                isDarkMode
                  ? 'bg-[#181820] border-[#1FE03F]/40'
                  : 'bg-[#FFE600] border-[#071638]'
              }`}
            >
              <span
                className={`text-xs font-black uppercase tracking-wide flex items-center gap-1.5 ${
                  isDarkMode ? 'text-[#1FE03F]' : 'text-[#071638]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {tx('Suggested Next Click:')}
              </span>
              <button
                onClick={() => {
                  if (suggestedQuickReply.action) {
                    suggestedQuickReply.action();
                  } else {
                    handleSendMessage(suggestedQuickReply.value);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1FE03F] hover:bg-[#19c435] text-[#08080A] shadow-[0_0_16px_rgba(31,224,63,0.35)]'
                    : 'bg-[#071638] hover:bg-[#0f2963] text-[#FFE600]'
                }`}
              >
                <span>{tx(suggestedQuickReply.label)}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          )}

          {/* Chat Input Bar with Integrated Vision AI Camera Button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className={`p-3 border-t flex items-center gap-2 ${
              isDarkMode ? 'bg-[#111116] border-[#2A2A35]' : 'bg-white border-[#071638]'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                soundFX.playScanBeep();
                setActiveModal('vision');
              }}
              title="Open StuPDT Vision™ AI Image Detector"
              className={`p-2.5 rounded-xl border transition cursor-pointer shrink-0 ${
                isDarkMode
                  ? 'bg-[#181820] hover:bg-[#23232F] border-[#1FE03F]/50 text-[#1FE03F]'
                  : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
              }`}
            >
              <Camera className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={tx('Ask any question (or tap a starter button below)...')}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none ${
                isDarkMode
                  ? 'bg-[#181820] border border-[#2A2A35] text-white placeholder-slate-400 focus:border-[#0EC7F5]'
                  : 'bg-[#F4F9FF] border-2 border-[#071638] text-[#071638] placeholder-slate-500 focus:ring-2 focus:ring-[#3888F2]'
              }`}
            />

            <button
              type="submit"
              disabled={isTransferring || !inputValue.trim()}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-1.5 disabled:opacity-40 transition cursor-pointer shrink-0 ${
                isDarkMode
                  ? 'bg-[#0EC7F5] hover:bg-[#0bb2dc] text-[#08080A]'
                  : 'bg-[#FFE600] hover:bg-[#f5dc00] text-[#071638] border-2 border-[#071638] shadow-[3px_3px_0px_#071638]'
              }`}
            >
              <span>{tx('Send')}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>

        {/* ------------------------------------------------------------------
            6 BEGINNER-FRIENDLY QUICK STARTER BUTTONS
           ------------------------------------------------------------------ */}
        <section
          className={`rounded-2xl p-3.5 ${
            isDarkMode
              ? 'bg-[#111116] border border-[#2A2A35]'
              : 'bg-white border-2 border-[#071638] shadow-[4px_4px_0px_#071638]'
          }`}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span
              className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                isDarkMode ? 'text-slate-300' : 'text-[#071638]'
              }`}
            >
              <Zap className={`w-4 h-4 ${isDarkMode ? 'text-[#FF6B1A]' : 'text-[#3888F2]'}`} />
              {tx('Quick Starters (1-Click Hackathon Demos)')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleSendMessage('I have an exam tomorrow. Can you help me study?')}
              className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
                isDarkMode
                  ? 'bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-white'
                  : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
              }`}
            >
              <span>{tx('📚 Exam Tomorrow')}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </button>

            <button
              onClick={() => handleSendMessage('What time is it?')}
              className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
                isDarkMode
                  ? 'bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-white'
                  : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
              }`}
            >
              <span>{tx('⏰ What time is it?')}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </button>

            <button
              onClick={() => handleSendMessage('How do I fix my Wi-Fi?')}
              className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
                isDarkMode
                  ? 'bg-[#181820] hover:bg-[#23232F] border border-[#2A2A35] text-white'
                  : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
              }`}
            >
              <span>{tx('📶 Fix my Wi-Fi')}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </button>

            <button
              onClick={() => {
                soundFX.playRubberStamp();
                setActiveModal('bureaucracy');
              }}
              className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
                isDarkMode
                  ? 'bg-[#181820] hover:bg-[#23232F] border border-[#0EC7F5]/40 text-[#0EC7F5]'
                  : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
              }`}
            >
              <span>{tx('📝 Form 001')}</span>
              <Stamp className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              onClick={() => {
                soundFX.playScanBeep();
                setActiveModal('vision');
              }}
              className={`p-2.5 rounded-xl font-extrabold text-xs text-left transition cursor-pointer flex items-center justify-between ${
                isDarkMode
                  ? 'bg-[#181820] hover:bg-[#23232F] border border-[#1FE03F]/40 text-[#1FE03F]'
                  : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
              }`}
            >
              <span>{tx('📷 Scan Image')}</span>
              <Camera className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              onClick={() => handleSendMessage('StuPDT, PLEASE JUST ANSWER MY QUESTION.')}
              className={`p-2.5 rounded-xl font-black text-xs text-left transition cursor-pointer flex items-center justify-between ${
                isDarkMode
                  ? 'bg-[#F52820]/20 hover:bg-[#F52820] border border-[#F52820] text-white'
                  : 'bg-[#FFE600] hover:bg-[#f5dc00] border-2 border-[#071638] text-[#071638]'
              }`}
            >
              <span>{tx('🚨 JUST ANSWER ME!')}</span>
              <Flame className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </section>
      </main>

      {/* ====================================================================
          FLOATING SIGN LANGUAGE INTERPRETER FOR BLIND USERS (Picture-in-Picture)
         ==================================================================== */}
      {signLanguageMode && (
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
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl transition-transform duration-150 scale-110">
                  {SIGN_LANGUAGE_GESTURES[signWordIdx % SIGN_LANGUAGE_GESTURES.length]}
                </span>
                <span className="text-3xl">🧑‍💼</span>
                <span className="text-4xl transition-transform duration-150 -scale-x-100">
                  {SIGN_LANGUAGE_GESTURES[(signWordIdx + 5) % SIGN_LANGUAGE_GESTURES.length]}
                </span>
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
      )}

      {/* ====================================================================
          TOAST NOTIFICATION
         ==================================================================== */}
      {toastNotification && (
        <div
          className={`fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 ${
            isDarkMode
              ? 'bg-[#181820] border-[#FF6B1A] text-white'
              : 'bg-[#071638] border-[#FFE600] text-white'
          }`}
        >
          <AlertTriangle className="w-5 h-5 text-[#FFE600] shrink-0" />
          <p className="text-xs font-extrabold leading-snug">{tx(toastNotification)}</p>
        </div>
      )}

      {/* ====================================================================
          MODAL 1: THEME SWITCHER GATEKEEPER (CAPTCHA -> MANDATORY LEGAL MATH)
         ==================================================================== */}
      {themeGateStep && (
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

                <div className="p-2.5 rounded-xl bg-[#0EC7F5]/15 border border-[#0EC7F5]/40 text-center">
                  <span className="text-xs font-black text-[#0EC7F5]">
                    {tx('Select all 3 squares containing a TRAFFIC LIGHT 🚦')}
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
                        className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                          isPicked
                            ? 'bg-[#1FE03F]/20 border-[#1FE03F] scale-[0.97]'
                            : 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]'
                        }`}
                      >
                        <span className="text-2xl">{tile.emoji}</span>
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
                    <div className="p-2.5 rounded-xl bg-[#FFE600]/15 border border-[#FFE600]/60 text-xs font-bold text-[#FFE600]">
                      🤫 {tx(activeMathProblem.hint)}
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
                  {tx('✅ FORM LT-001 APPROVED!')}
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
                      triggerToast('🌙 Welcome back to MALFUNCTION Dark Mode.');
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
      )}

      {/* ====================================================================
          MODAL 2: STUPDT VISION™ — USELESS AI OBJECT & INGREDIENT DETECTOR
         ==================================================================== */}
      {activeModal === 'vision' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`max-w-xl w-full rounded-3xl p-6 space-y-4 border-2 shadow-2xl max-h-[90vh] overflow-y-auto ${
              isDarkMode
                ? 'bg-[#111116] border-[#1FE03F] text-white'
                : 'bg-white border-[#071638] text-[#071638]'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-700/40 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <ScanLine className="w-5 h-5 text-[#1FE03F]" />
                  <span>{tx('StuPDT Vision™ — Ultra-Advanced Detector')}</span>
                </h3>
                <p className="text-xs opacity-70 font-medium">
                  {tx('Upload any photo OR click a sample below for 100% confident useless analysis')}
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1 rounded-xl bg-[#F52820] text-white text-xs font-black cursor-pointer"
              >
                {tx('Close')}
              </button>
            </div>

            {/* Instant 1-Click Demo Samples */}
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider opacity-75 block mb-2">
                {tx('Instant Live Demo Samples:')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {VISION_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => runSampleVisionScan(sample)}
                    className={`p-2.5 rounded-xl text-xs font-black border transition cursor-pointer ${
                      visionSampleId === sample.id
                        ? 'bg-[#1FE03F] text-[#08080A] border-[#1FE03F]'
                        : isDarkMode
                        ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35] text-white'
                        : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
                    }`}
                  >
                    {tx(sample.label)}
                  </button>
                ))}
              </div>
            </div>

            {/* Real Drag & Drop / File Picker Upload Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const droppedFile = e.dataTransfer.files?.[0];
                if (droppedFile) handleImageFileUpload(droppedFile);
              }}
              className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition ${
                isDarkMode
                  ? 'border-[#0EC7F5]/60 bg-[#181820] hover:bg-[#20202b]'
                  : 'border-[#071638] bg-[#F4F9FF] hover:bg-[#FFE600]/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageFileUpload(file);
                  e.target.value = '';
                }}
              />
              <Upload className="w-6 h-6 mx-auto mb-1 text-[#0EC7F5]" />
              <p className="text-xs font-black">
                {tx('Click or Drag & Drop Your Own Photo (JPG / PNG / WebP)')}
              </p>
              <p className="text-[11px] opacity-65 mt-0.5">
                {tx('Powered by StuPDT Multi-Agent Tautological Vision Engine')}
              </p>
            </div>

            {/* Preview + Laser Scanning Animation + Results */}
            {(visionPreviewUrl || visionSampleId) && (
              <div
                className={`rounded-2xl p-4 border space-y-3 ${
                  isDarkMode ? 'bg-[#0C0C10] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
                }`}
              >
                <div className="relative h-44 w-full rounded-xl overflow-hidden flex items-center justify-center bg-black/40">
                  {visionPreviewUrl ? (
                    <img
                      src={visionPreviewUrl}
                      alt="Uploaded scan target"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <SampleIllustrationSVG sampleId={visionSampleId} />
                  )}

                  {/* Dramatic Fake Scanning Laser */}
                  {visionScanning && (
                    <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2">
                      <div className="w-full h-1 bg-[#1FE03F] shadow-[0_0_20px_#1FE03F] animate-bounce" />
                      <Loader2 className="w-7 h-7 text-[#1FE03F] animate-spin" />
                      <span className="text-xs font-black text-[#1FE03F] px-3 text-center">
                        {tx(visionScanStatus)}
                      </span>
                    </div>
                  )}
                </div>

                {visionResult && !visionScanning && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#0EC7F5] block">
                          {tx(`Detected ${visionResult.category}`)}
                        </span>
                        <h4 className="text-xl font-black">{tx(visionResult.detectedItem)}</h4>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-[#1FE03F] text-[#08080A] font-black text-xs">
                        {tx(`Confidence: ${visionResult.confidence}`)}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold leading-relaxed">
                      "{tx(visionResult.verdict)}"
                    </p>

                    <div
                      className={`p-3 rounded-xl border ${
                        isDarkMode ? 'bg-[#181820] border-[#2A2A35]' : 'bg-white border-[#071638]'
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B1A] block mb-1.5">
                        {tx('Detected Ingredients / Complete Breakdown:')}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {visionResult.ingredients.map((ing, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/50 text-xs font-black"
                          >
                            • {tx(ing)}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] opacity-80 italic mt-2">{tx(visionResult.proTip)}</p>
                    </div>

                    <button
                      onClick={sendVisionResultToChat}
                      className="w-full py-2.5 rounded-xl bg-[#0EC7F5] hover:bg-[#0bb2dc] text-[#08080A] font-black text-xs sm:text-sm cursor-pointer"
                    >
                      {tx('Send Scan Result to Chat →')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 3: CORPORATE ORG CHART & ABOUT STUPDT (Top-right 'i' icon)
         ==================================================================== */}
      {activeModal === 'org_about' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`max-w-lg w-full rounded-3xl p-6 space-y-4 border-2 shadow-2xl ${
              isDarkMode
                ? 'bg-[#111116] border-[#0EC7F5] text-white'
                : 'bg-white border-[#071638] text-[#071638]'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-700/40 pb-3">
              <div>
                <h3 className="text-lg font-black">{tx('🏢 StuPDT Corporate Org Chart')}</h3>
                <p className="text-xs opacity-70 font-medium">
                  {tx('Click any AI department to manually transfer your ticket there')}
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1 rounded-xl bg-[#F52820] text-white text-xs font-black cursor-pointer"
              >
                {tx('Close')}
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => {
                    setActiveModal(null);
                    bumpMetrics(1, 12, 5);
                    performDepartmentTransfer(
                      dept,
                      `Hello! You manually transferred yourself to ${dept.name}. Naturally, we dropped your entire conversation history during the transfer. What was your problem again?`,
                      'Manual User Transfer'
                    );
                  }}
                  className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                    activeDeptId === dept.id
                      ? isDarkMode
                        ? 'bg-[#0EC7F5]/20 border-[#0EC7F5]'
                        : 'bg-[#FFE600] border-2 border-[#071638]'
                      : isDarkMode
                      ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]'
                      : 'bg-[#F4F9FF] hover:bg-[#FFE600]/50 border-2 border-[#071638]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-black">{tx(dept.name)}</div>
                    <div className="text-xs font-bold text-[#0EC7F5]">{tx(dept.division)}</div>
                    <div className="text-[11px] opacity-70 italic">"{tx(dept.status)}"</div>
                  </div>
                  <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-black/40 text-white shrink-0">
                    {tx(dept.code)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 4: BUREAUCRACY SIMULATOR (Form 001 -> 001-C Catch-22)
         ==================================================================== */}
      {activeModal === 'bureaucracy' && (
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
                    className="px-4 py-2 rounded-xl bg-[#1FE03F] text-[#08080A] font-black cursor-pointer"
                  >
                    {tx('💮 Emergency Rubber Stamp Bypass!')}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 5: USELESS TOOLKIT + BONUS MODALS (Apology PDF, Comfort AI, 99%)
         ==================================================================== */}
      {activeModal === 'toolkit' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`max-w-lg w-full rounded-3xl p-6 space-y-4 border-2 shadow-2xl ${
              isDarkMode
                ? 'bg-[#111116] border-[#FF6B1A] text-white'
                : 'bg-white border-[#071638] text-[#071638]'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-700/40 pb-3">
              <div>
                <h3 className="text-lg font-black">{tx('🧰 StuPDT Useless Toolkit™')}</h3>
                <p className="text-xs opacity-70">{tx('Bonus features nobody asked for')}</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1 rounded-xl bg-[#F52820] text-white text-xs font-black cursor-pointer"
              >
                {tx('Close')}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setActiveModal('apology_pdf')}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer ${
                  isDarkMode ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
                }`}
              >
                <div className="font-black text-sm flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#0EC7F5]" /> {tx('47-Page Apology PDF')}
                </div>
                <p className="text-xs opacity-70 mt-1">{tx('Level 5 legal apology for doing nothing.')}</p>
              </button>

              <button
                onClick={() => setActiveModal('emotional')}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer ${
                  isDarkMode ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
                }`}
              >
                <div className="font-black text-sm flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#FF6B1A]" /> {tx('Emotional Support Mode')}
                </div>
                <p className="text-xs opacity-70 mt-1">{tx('StuPDT is stressed and needs YOU to comfort IT.')}</p>
              </button>

              <button
                onClick={() => setActiveModal('loading_sim')}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer ${
                  isDarkMode ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
                }`}
              >
                <div className="font-black text-sm flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 text-[#1FE03F] animate-spin" /> {tx('99% Loading Simulator')}
                </div>
                <p className="text-xs opacity-70 mt-1">{tx('Stuck at 99.97% until the heat death of the universe.')}</p>
              </button>

              <button
                onClick={() => {
                  soundFX.playErrorBuzz();
                  triggerToast('Human support is currently being replaced by AI. Redirecting to AI...');
                }}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer ${
                  isDarkMode ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
                }`}
              >
                <div className="font-black text-sm flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#F52820]" /> {tx('The Human Department')}
                </div>
                <p className="text-xs opacity-70 mt-1">{tx('Request to speak to a real human.')}</p>
              </button>

              <button
                onClick={() => {
                  soundFX.playChime();
                  setIsPremiumVIP(true);
                  setActiveModal(null);
                  triggerToast('👑 Upgraded to Premium Nothing™ (₱999)! Same 0% helpfulness, fancier badge!');
                }}
                className="sm:col-span-2 p-3.5 rounded-2xl bg-[#FFE600] text-[#08080A] border-2 border-[#071638] text-left cursor-pointer"
              >
                <div className="font-black text-sm flex items-center gap-1.5">
                  <Crown className="w-4 h-4" /> {tx('Upgrade to Premium Nothing™ (₱999)')}
                </div>
                <p className="text-xs font-bold opacity-80 mt-0.5">
                  {tx('Pay ₱999 in imaginary pesos to get the exact same useless service, faster-looking!')}
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'apology_pdf' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`max-w-lg w-full rounded-3xl p-6 space-y-4 border-2 ${
              isDarkMode ? 'bg-[#111116] border-[#0EC7F5] text-white' : 'bg-white border-[#071638] text-[#071638]'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-700/40 pb-3">
              <h3 className="text-base font-black">{tx('📄 Official 47-Page Apology PDF')}</h3>
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
      )}

      {activeModal === 'emotional' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`max-w-md w-full rounded-3xl p-6 text-center space-y-4 border-2 ${
              isDarkMode ? 'bg-[#111116] border-[#FF6B1A] text-white' : 'bg-white border-[#071638] text-[#071638]'
            }`}
          >
            <HeartHandshake className="w-10 h-10 text-[#FF6B1A] mx-auto" />
            <h3 className="text-lg font-black">{tx('Emotional Support Mode™')}</h3>
            <p className="text-xs opacity-85 font-medium">
              {tx(
                '"Everything will be okay, human! Wait... actually, I have 17 departments and I still cannot answer basic questions! 😭 Please comfort me!"'
              )}
            </p>
            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-[#1FE03F] transition-all" style={{ width: `${aiComfortLevel}%` }} />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  soundFX.playChime();
                  setAiComfortLevel((c) => Math.min(100, c + 30));
                  triggerToast('StuPDT feels emotionally validated! (Still 0% helpful)');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#1FE03F] text-[#08080A] font-black text-xs cursor-pointer"
              >
                {tx('🫂 Pat AI Gently')}
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-700 text-white font-black text-xs cursor-pointer"
              >
                {tx('Done')}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'loading_sim' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`max-w-md w-full rounded-3xl p-6 text-center space-y-4 border-2 ${
              isDarkMode ? 'bg-[#111116] border-[#1FE03F] text-white' : 'bg-white border-[#071638] text-[#071638]'
            }`}
          >
            <Loader2 className="w-10 h-10 text-[#1FE03F] animate-spin mx-auto" />
            <h3 className="text-lg font-black">{tx('The 99.97% Loading Simulator')}</h3>
            <p className="text-xs opacity-80">
              {tx('Almost done pretending to think... Estimated time remaining: 47 years.')}
            </p>
            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-600">
              <div className="h-full bg-[#1FE03F] w-[99%]" />
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#F52820] text-white font-black text-xs cursor-pointer"
            >
              {tx('Give Up & Return to Chat')}
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 6: PRODUCTIVITY THEATER FINAL REPORT (Includes Punny Quote!)
         ==================================================================== */}
      {activeModal === 'report' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`max-w-md w-full rounded-3xl p-6 space-y-4 text-center border-2 shadow-2xl ${
              isDarkMode
                ? 'bg-[#111116] border-[#0EC7F5] text-white'
                : 'bg-white border-[#071638] text-[#071638]'
            }`}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[#0EC7F5]/20 border border-[#0EC7F5] text-xs font-black text-[#0EC7F5]">
              {tx('PRODUCTIVITY THEATER™')}
            </div>
            <h3 className="text-2xl font-black">{tx('FINAL REPORT')}</h3>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-2xl bg-[#F52820]/15 border border-[#F52820]/50">
                <span className="text-[10px] font-black uppercase text-[#F52820]">
                  {tx('Problems Solved')}
                </span>
                <div className="text-2xl font-black">{tx('0%')}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#0EC7F5]/15 border border-[#0EC7F5]/50">
                <span className="text-[10px] font-black uppercase text-[#0EC7F5]">
                  {tx('AI Specialists')}
                </span>
                <div className="text-2xl font-black">{tx(specialistsConsulted)}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#1FE03F]/15 border border-[#1FE03F]/50">
                <span className="text-[10px] font-black uppercase text-[#1FE03F]">
                  {tx('Meetings Held')}
                </span>
                <div className="text-2xl font-black">{tx(internalMeetings)}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#FF6B1A]/15 border border-[#FF6B1A]/50">
                <span className="text-[10px] font-black uppercase text-[#FF6B1A]">
                  {tx('Satisfaction')}
                </span>
                <div className="text-2xl font-black">{tx(`${userSatisfaction}%`)}</div>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-left ${
                isDarkMode ? 'bg-[#181820] border-[#2A2A35]' : 'bg-[#F4F9FF] border-[#071638]'
              }`}
            >
              <p className="text-xs italic font-semibold">"{tx(reportQuote.text)}"</p>
              <p className="text-[11px] font-black text-[#0EC7F5] mt-1">
                — {tx(reportQuote.author)}
              </p>
            </div>

            <p className="text-[11px] opacity-75 italic">
              {tx('"Thank you for choosing StuPDT! We hope you never need us again. Unfortunately, you will."')}
            </p>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#0EC7F5] text-[#08080A] font-black text-xs cursor-pointer"
            >
              {tx('Back to Chat')}
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 7: THE GRAND FINALE — ULTIMATE MALFUNCTION
         ==================================================================== */}
      {activeModal === 'grand_finale' && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111116] text-white border-4 border-[#F52820] rounded-3xl max-w-lg w-full p-7 text-center shadow-[0_0_50px_rgba(245,40,32,0.45)] space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F52820] text-white text-xs font-black uppercase">
              <AlertTriangle className="w-4 h-4" /> {tx('CRITICAL SYSTEM NOTICE • URGENT')}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#FFE600]">
              {tx('WE HAVE DETECTED A PROBLEM.')}
            </h2>

            <p className="text-sm sm:text-base font-bold bg-[#181820] border border-[#2A2A35] p-4 rounded-2xl leading-relaxed">
              {tx(
                '"The problem is that you are experiencing a problem that we have been unable to solve because of a problem within our problem-solving system."'
              )}
            </p>

            <p className="text-base font-black text-[#0EC7F5]">
              {tx('Would you like us to help you?')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleGrandFinaleChoice('YES, PLEASE')}
                className="py-3.5 px-4 rounded-2xl bg-[#1FE03F] hover:bg-[#19c435] text-[#08080A] font-black text-sm cursor-pointer"
              >
                {tx('YES, PLEASE')}
              </button>
              <button
                onClick={() => handleGrandFinaleChoice("NO, I'VE SUFFERED ENOUGH")}
                className="py-3.5 px-4 rounded-2xl bg-[#F52820] hover:bg-red-700 text-white font-black text-sm cursor-pointer"
              >
                {tx("NO, I'VE SUFFERED ENOUGH")}
              </button>
            </div>

            <p className="text-[11px] font-bold text-slate-400">
              {tx('*Both options will immediately redirect you to our Customer Support Department.')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
