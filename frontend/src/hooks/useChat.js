import { useState, useRef, useEffect, useCallback } from 'react';
import { DEPARTMENTS, BLAME_TARGETS } from '../constants';
import { sendChatMessage } from '../services/chatService';
import { useStuPDT } from '../contexts/StuPDTContext';

const INITIAL_MESSAGES = [
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
];

const CHAT_STORAGE_KEY = 'stupdt_chat_history';

function loadStoredMessages() {
  try {
    const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // SessionStorage restricted
  }
  return INITIAL_MESSAGES;
}

export function useChat() {
  const { soundFX, bumpMetrics, isPremiumVIP, setActiveModal } = useStuPDT();

  const [activeDeptId, setActiveDeptId] = useState('intake');
  const [examDemoStep, setExamDemoStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferTarget, setTransferTarget] = useState(null);
  const [messages, setMessages] = useState(loadStoredMessages);

  // Sync messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage quota or restriction
    }
  }, [messages]);

  const [suggestedQuickReply, setSuggestedQuickReply] = useState({
    label: 'Try Exam Demo: "I have an exam tomorrow. Can you help me study?"',
    value: 'I have an exam tomorrow. Can you help me study?'
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTransferring]);

  const clearChatHistory = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setActiveDeptId('intake');
    setExamDemoStep(0);
    try {
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const performDepartmentTransfer = useCallback(
    (nextDept, responseMessageText, customBlame, postCallback) => {
      setIsTransferring(true);
      setTransferTarget(nextDept);
      soundFX.playTransferHold();

      setTimeout(() => {
        setIsTransferring(false);
        setActiveDeptId(nextDept.id);
        soundFX.playChime();

        setActiveDeptId((currentDeptId) => {
          const prevDeptName =
            DEPARTMENTS.find((d) => d.id === currentDeptId)?.name || 'Intake Desk';
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
          return nextDept.id;
        });

        if (postCallback) postCallback();
      }, 1050);
    },
    [soundFX, isPremiumVIP]
  );

  const handleSendMessage = useCallback(
    async (overrideText) => {
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
              label: 'Suggested Reply: "Okay."',
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
              label: 'Suggested Reply: "Yes."',
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
              label: 'Suggested Reply: "WHAT?"',
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
              label: 'Trigger Finale: "StuPDT, PLEASE JUST ANSWER MY QUESTION."',
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
              label: 'Open Mandatory Form 001 Simulator',
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
              label: 'Trigger Finale: "StuPDT, PLEASE JUST ANSWER MY QUESTION."',
              value: 'StuPDT, PLEASE JUST ANSWER MY QUESTION.'
            });
          }
        );
        return;
      }

      // 4. GENERAL QUESTION -> ROTATE THROUGH DEPARTMENTS USING BACKEND/GEMINI API
      bumpMetrics(1, 18, 7);
      const currentIndex = DEPARTMENTS.findIndex((d) => d.id === activeDeptId);
      const nextDept = DEPARTMENTS[(currentIndex + 1) % DEPARTMENTS.length];
      setIsTransferring(true);
      setTransferTarget(nextDept);
      const reply = await sendChatMessage(textToSend, nextDept, messages.slice(-4));

      performDepartmentTransfer(nextDept, reply, null, () => {
        setSuggestedQuickReply({
          label: 'Fed up? Click: "StuPDT, PLEASE JUST ANSWER MY QUESTION."',
          value: 'StuPDT, PLEASE JUST ANSWER MY QUESTION.'
        });
      });
    },
    [inputValue, isTransferring, examDemoStep, activeDeptId, bumpMetrics, soundFX, setActiveModal, performDepartmentTransfer, messages]
  );

  const addAiMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  return {
    activeDeptId,
    setActiveDeptId,
    messages,
    addAiMessage,
    clearChatHistory,
    inputValue,
    setInputValue,
    isTransferring,
    transferTarget,
    suggestedQuickReply,
    chatEndRef,
    performDepartmentTransfer,
    handleSendMessage
  };
}
