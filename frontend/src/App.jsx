import React, { useState, useMemo, useEffect } from 'react';
import { StuPDTProvider, useStuPDT } from './contexts/StuPDTContext';
import { DEPARTMENTS, CAPTCHA_TILES, LEGAL_MATH_PROBLEMS } from './constants';
import { useChat } from './hooks/useChat';
import { useVisionScan } from './hooks/useVisionScan';

// Layout Components
import { BrailleBanner } from './components/layout/BrailleBanner';
import { EmergencyBanner } from './components/layout/EmergencyBanner';
import { Header } from './components/layout/Header';
import { QuoteBar } from './components/layout/QuoteBar';
import { StatusPills } from './components/layout/StatusPills';
import { ToastNotification } from './components/layout/ToastNotification';

// Chat & Accessibility Components
import { ChatWindow, QuickStarters } from './components/chat';
import { SignLanguageWidget } from './components/accessibility/SignLanguageWidget';

// Modal Components
import {
  ThemeGatekeeperModal,
  VisionAIModal,
  OrgAboutModal,
  BureaucracyModal,
  ToolkitModal,
  ApologyPdfModal,
  EmotionalSupportModal,
  InfiniteLoadingModal,
  ReportModal,
  GrandFinaleModal
} from './components/modals';

function StuPDTApp() {
  const {
    isDarkMode,
    setIsDarkMode,
    soundFX,
    triggerToast,
    bumpMetrics,
    activeModal,
    setActiveModal
  } = useStuPDT();

  // Chat management
  const {
    activeDeptId,
    messages,
    addAiMessage,
    inputValue,
    setInputValue,
    isTransferring,
    transferTarget,
    suggestedQuickReply,
    chatEndRef,
    performDepartmentTransfer,
    handleSendMessage
  } = useChat();

  // Vision scanner management
  const {
    visionPreviewUrl,
    visionSampleId,
    visionScanning,
    visionScanStatus,
    visionResult,
    runSampleVisionScan,
    handleImageFileUpload,
    sendVisionResultToChat
  } = useVisionScan(addAiMessage);

  // Theme Gatekeeper State (Captcha -> Mandatory Legal Math)
  const [themeGateStep, setThemeGateStep] = useState(null);
  const [selectedCaptchaIds, setSelectedCaptchaIds] = useState([]);
  const [captchaError, setCaptchaError] = useState('');
  const [activeMathProblem, setActiveMathProblem] = useState(LEGAL_MATH_PROBLEMS[0]);
  const [mathInput, setMathInput] = useState('');
  const [mathError, setMathError] = useState('');
  const [showMathHint, setShowMathHint] = useState(false);

  // Global Escape key listener to dismiss active modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (themeGateStep) {
          setThemeGateStep(null);
        } else if (activeModal) {
          setActiveModal(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [themeGateStep, activeModal, setActiveModal]);

  const handleThemeButtonClick = () => {
    if (isDarkMode) {
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
        'Suspiciously robotic click detected. Try clicking ONLY the 3 actual Traffic Lights!'
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
        triggerToast('FORM LT-001 APPROVED! Deploying Retina-Scorching Alpine Light Mode!');
      }, 1350);
    } else {
      soundFX.playErrorBuzz();
      setMathError(
        'Incorrect arithmetic! Our server hamsters have rejected your brightness permit. Try again (or ask the Math Specialist for a hint)!'
      );
    }
  };

  // Grand Finale Choice Handler
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

  // Bureaucracy Form Completion Handler
  const handleFormApprovedAndShredded = () => {
    performDepartmentTransfer(
      DEPARTMENTS[4],
      'Thank you for rubber-stamping Forms 001, 001-A, 001-B, and 001-C! All four forms have been immediately shredded to optimize cloud synergy. How else can we not help you today?',
      'Automated Paper Shredder'
    );
  };

  // Manual Org Chart Department Transfer
  const handleTransferToDept = (dept) => {
    setActiveModal(null);
    bumpMetrics(1, 12, 5);
    performDepartmentTransfer(
      dept,
      `Hello! You manually transferred yourself to ${dept.name}. Naturally, we dropped your entire conversation history during the transfer. What was your problem again?`,
      'Manual User Transfer'
    );
  };

  const activeDepartmentObj =
    DEPARTMENTS.find((d) => d.id === activeDeptId) || DEPARTMENTS[0];

  const latestAiMessageText = useMemo(() => {
    if (!Array.isArray(messages)) return 'Hello blind user!';
    const aiMsgs = messages.filter((m) => m && m.sender === 'ai');
    return aiMsgs.length > 0 && aiMsgs[aiMsgs.length - 1]?.text
      ? aiMsgs[aiMsgs.length - 1].text
      : 'Hello blind user!';
  }, [messages]);

  // Crosshair (+) SVG pattern for Dark Mode poster background
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
      {/* Accessibility & Emergency Banners */}
      <BrailleBanner />
      <EmergencyBanner />

      {/* Main Header */}
      <Header onThemeClick={handleThemeButtonClick} />

      {/* Main Single-Column Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 flex flex-col gap-4">
        <QuoteBar />
        <StatusPills activeDepartmentObj={activeDepartmentObj} />
        <ChatWindow
          activeDepartmentObj={activeDepartmentObj}
          messages={messages}
          isTransferring={isTransferring}
          transferTarget={transferTarget}
          suggestedQuickReply={suggestedQuickReply}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={handleSendMessage}
          chatEndRef={chatEndRef}
        />
        <QuickStarters onSendMessage={handleSendMessage} />
      </main>

      {/* Floating Picture-in-Picture Sign Language Widget */}
      <SignLanguageWidget latestAiMessageText={latestAiMessageText} />

      {/* Floating Toast Notification */}
      <ToastNotification />

      {/* Modals */}
      <ThemeGatekeeperModal
        themeGateStep={themeGateStep}
        setThemeGateStep={setThemeGateStep}
        selectedCaptchaIds={selectedCaptchaIds}
        toggleCaptchaTile={toggleCaptchaTile}
        captchaError={captchaError}
        verifyCaptcha={verifyCaptcha}
        activeMathProblem={activeMathProblem}
        mathInput={mathInput}
        setMathInput={setMathInput}
        mathError={mathError}
        setMathError={setMathError}
        showMathHint={showMathHint}
        setShowMathHint={setShowMathHint}
        verifyMathProblem={verifyMathProblem}
      />
      <VisionAIModal
        visionPreviewUrl={visionPreviewUrl}
        visionSampleId={visionSampleId}
        visionScanning={visionScanning}
        visionScanStatus={visionScanStatus}
        visionResult={visionResult}
        onRunSampleVisionScan={runSampleVisionScan}
        onImageFileUpload={handleImageFileUpload}
        onSendVisionResultToChat={sendVisionResultToChat}
      />
      <OrgAboutModal
        activeDeptId={activeDeptId}
        onTransferToDept={handleTransferToDept}
      />
      <BureaucracyModal
        onFormApprovedAndShredded={handleFormApprovedAndShredded}
      />
      <ToolkitModal />
      <ApologyPdfModal />
      <EmotionalSupportModal />
      <InfiniteLoadingModal />
      <ReportModal />
      <GrandFinaleModal onChoice={handleGrandFinaleChoice} />
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('StuPDT Error Caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08080A] text-white flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-[#111116] border-2 border-[#F52820] rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-[#F52820]/20 text-[#F52820] text-xs font-black uppercase">
              CRITICAL BUREAUCRATIC EXCEPTION
            </div>
            <h2 className="text-xl font-black">Something went wrong while rendering StuPDT.</h2>
            <p className="text-xs text-rose-300 bg-black/60 p-3 rounded-xl font-mono text-left overflow-auto max-h-36">
              {String(this.state.error?.message || this.state.error)}
            </p>
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-xl bg-[#0EC7F5] text-[#08080A] font-black text-xs cursor-pointer hover:bg-[#0bb2dc]"
            >
              Clear Corrupted Storage & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <StuPDTProvider>
        <StuPDTApp />
      </StuPDTProvider>
    </ErrorBoundary>
  );
}
