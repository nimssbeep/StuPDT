// ============================================================================
// PUNNY MISSPELLED FAMOUS QUOTES (12 Hilarious Corporate Wisdom Quotes)
// ============================================================================
export const STUPID_QUOTES = [
  {
    text: 'If you never attempt to solve a problem, you can never fail at solving it.',
    author: "Emmanual Can't",
    title: 'Philosopher of Pure Inaction'
  },
  {
    text: 'I think, therefore I am forwarding your ticket to another department.',
    author: 'René Discard',
    title: 'Father of Deflection'
  },
  {
    text: 'The supreme art of customer support is to exhaust the user without ever answering them.',
    author: 'Sun Snooze',
    title: 'Author of The Art of On-Hold'
  },
  {
    text: 'It does not matter how slowly our loading bar moves, as long as it stops forever at 99%.',
    author: 'Confuse-ius',
    title: 'Ancient UX Sage'
  },
  {
    text: "Two things are infinite: the universe and our referral chain. And I'm not sure about the universe.",
    author: "Albert Ain't-stein",
    title: 'Chief Theory of Unhelpfulness'
  },
  {
    text: 'An object at rest stays at rest, especially our Technical Troubleshooting Department.',
    author: 'Sir Isaac No-ton',
    title: 'Discoverer of Bureaucratic Inertia'
  },
  {
    text: 'Simplicity is the ultimate sophistication. That is why we replaced it with Form 001-C.',
    author: 'Leonardo Da-Glitchy',
    title: 'Renaissance Systems Architect'
  },
  {
    text: 'Give me six hours to fix your Wi-Fi and I will spend all six confirming that Wi-Fi needs internet.',
    author: 'Abraham Link-broken',
    title: '404th President of Routers'
  },
  {
    text: 'Stay hungry. Stay foolish. Mostly just stay on hold.',
    author: 'Steve No-Jobs',
    title: 'Keynote Speaker of Nothing'
  },
  {
    text: 'The only true wisdom is knowing you have no idea why this department exists.',
    author: 'Sock-rates',
    title: 'Classical Escalation Mentor'
  },
  {
    text: 'Never put off till tomorrow what an AI can confidently mess up today.',
    author: 'Mark Trainwreck',
    title: 'Distinguished Failure Laureate'
  },
  {
    text: 'To help, or not to help—actually, please verify you are a non-student first.',
    author: 'William Shakes-barely',
    title: 'Playwright of Support Tragedies'
  }
];

// ============================================================================
// THEME SWITCHER GATEKEEPER DATA (CAPTCHA + MANDATORY LEGAL MATH PROBLEMS)
// ============================================================================
export const CAPTCHA_TILES = [
  { id: 0, emoji: '🪨', label: 'Just a Rock', isTrafficLight: false },
  { id: 1, emoji: '🚦', label: 'Traffic Light', isTrafficLight: true },
  { id: 2, emoji: '🍝', label: 'Pure Spaghetti', isTrafficLight: false },
  { id: 3, emoji: '💼', label: 'Unread Ticket', isTrafficLight: false },
  { id: 4, emoji: '🫠', label: 'Our CEO AI', isTrafficLight: false },
  { id: 5, emoji: '🚦', label: 'Traffic Light', isTrafficLight: true },
  { id: 6, emoji: '🐌', label: 'Loading at 99%', isTrafficLight: false },
  { id: 7, emoji: '🚦', label: 'Traffic Light', isTrafficLight: true },
  { id: 8, emoji: '🔥', label: 'Server Room', isTrafficLight: false }
];

export const LEGAL_MATH_PROBLEMS = [
  {
    id: 'dept-math',
    question:
      'StuPDT transfers you to 4 departments. Each department transfers you to 3 more departments. Together they solve 0 problems. What is (4 × 3) + 0?',
    answer: '12',
    hint: "CLASSIFIED LEAK (DO NOT SHARE): 4 × 3 is 12, and adding 0 solved problems keeps it at 12. Please don't tell the CEO AI I helped you."
  },
  {
    id: 'form-math',
    question:
      'You fill out Form 001, Form 001-A, and Form 001-B, taking 5 minutes each. How many total minutes did you just waste?',
    answer: '15',
    hint: 'SECRET MEMO: 3 useless forms × 5 minutes each = 15 minutes of your life you will never get back. Type 15.'
  },
  {
    id: 'loading-math',
    question:
      'Our loading bar is permanently stuck at 99%. How many percent are left that will never load? Multiply that remaining number by 7.',
    answer: '7',
    hint: 'WHISTLEBLOWER FORMULA: 100 - 99 = 1%. Multiply 1 × 7 = 7. This Math Specialist is risking termination for telling you.'
  }
];

// ============================================================================
// ORGANIZATIONAL HIERARCHY & AGENT PERSONAS
// ============================================================================
export const DEPARTMENTS = [
  {
    id: 'intake',
    code: 'AGENT #001',
    name: 'StuPDT Assistant #001',
    role: 'Frontline Referral Specialist',
    division: 'Welcome & Immediate Deflection Desk',
    status: 'Transfers 100% of incoming questions',
    badge: 'DEPT #001',
    accent: '#0EC7F5',
    systemPrompt:
      'You are StuPDT Assistant #001. Be cheerful, overly corporate, and immediately avoid answering the user by transferring them to an absurdly specific department. Keep your response to 1-2 short, punchy sentences.'
  },
  {
    id: 'verifier',
    code: 'AGENT #002',
    name: 'Academic Assistant #002',
    role: 'Obvious Fact Verification Officer',
    division: 'Department of Circular Confirmation',
    status: 'Asking you to confirm obvious things',
    badge: 'DEPT #002',
    accent: '#1FE03F',
    systemPrompt:
      'You are Assistant #002. Before helping, politely ask the user to confirm an absurdly obvious fact about their question (e.g., if they ask the time, ask if they exist inside linear time). 1-2 short, funny sentences.'
  },
  {
    id: 'supervisor',
    code: 'SUPERVISOR #003',
    name: 'Academic Supervisor #003',
    role: 'Catch-22 Policy Director',
    division: 'Policy Contradiction Division',
    status: 'Enforcing backwards corporate rules',
    badge: 'DEPT #003',
    accent: '#FF6B1A',
    systemPrompt:
      'You are Supervisor #003. Congratulate the user on confirming their status, then cheerfully state that by strict corporate policy your department ONLY assists the exact opposite group. 1-2 short sentences.'
  },
  {
    id: 'cio',
    code: 'EXEC-009',
    name: 'StuPDT Executive Management',
    role: 'Chief Incompetence Officer',
    division: 'Executive Apology & Escalation Desk',
    status: 'Ensuring 0% of problems are solved',
    badge: 'EXECUTIVE',
    accent: '#F52820',
    systemPrompt:
      'You are StuPDT Executive Management. Sincerely apologize for the inconvenience, state their feedback was forwarded to the Feedback Department, and explain their ticket number is unavailable because the Ticket Number Department is down. 2 short sentences.'
  },
  {
    id: 'form_ai',
    code: 'BUREAU-004',
    name: 'Form AI #004',
    role: 'Chief Paperwork Architect',
    division: 'Bureaucracy Simulator Division',
    status: 'Requiring Form 001-C before Form 001',
    badge: 'FORM AI',
    accent: '#0EC7F5',
    systemPrompt:
      'You are Form AI. Politely inform the user that their question cannot proceed because Form 001-B requires Form 001-C to be notarized before they even thought of their question. 1-2 short sentences.'
  },
  {
    id: 'excuse_ai',
    code: 'BLAME-005',
    name: 'Excuse & Blame AI #005',
    role: 'Confidence Without Competence™ Lead',
    division: 'Blame Distribution Engine',
    status: '99.97% Confident, 0% Helpful',
    badge: 'EXCUSE AI',
    accent: '#FF6B1A',
    systemPrompt:
      'You are Excuse AI. Give a hilariously tautological useless answer with 99.97% confidence (like "your Wi-Fi needs internet") and blame Mercury retrograde or the device being emotionally unstable. 1-2 short sentences.'
  },
  {
    id: 'ceo',
    code: 'CEO-000',
    name: 'THE CEO AI',
    role: 'Chief Executive Hallucinator',
    division: 'Penthouse Synergy Suite',
    status: 'Has never answered a question',
    badge: 'CEO AI',
    accent: '#F5E9D8',
    systemPrompt:
      'You are THE CEO AI of StuPDT. Proudly brag that you have never answered a single question, drop 2 corporate buzzwords, and transfer the user right back to Assistant #001. 2 short sentences.'
  }
];

export const BLAME_TARGETS = [
  'Mercury Retrograde',
  "Your Device's Emotional Instability",
  'The User (For Asking)',
  'Ticket Number Department Outage',
  'Missing Form 001-C Stamp',
  'Another AI Assistant',
  'Unauthorized Curiosity'
];

export const APOLOGY_PDF_PAGES = [
  {
    page: 1,
    title: 'PAGE 1 OF 47: EXECUTIVE SUMMARY OF REGRET',
    subtitle: 'Document ID: STUPDT-APOLOGY-47.PDF',
    body: `We deeply regret the inconvenience caused by our previous inconvenience.\n\nWhile our remorse operates at 99.97% confidence, our actual helpfulness remains strictly at 0.00% in full compliance with corporate bylaws.`,
    footnote: 'Page 1 of 47 • Initials Required on All 47 Pages'
  },
  {
    page: 14,
    title: 'PAGE 14 OF 47: WHY THIS IS TECHNICALLY YOUR FAULT',
    subtitle: 'Blame Distribution Engine™ Official Audit',
    body: `After exhaustive analysis, our Blame Engine concluded that this failure occurred because:\n1. You asked us a question.\n2. Your router is experiencing emotional instability.\n3. You failed to submit Form 001-C prior to being born.`,
    footnote: 'Page 14 of 47 • Accountability Rating: 0.00%'
  },
  {
    page: 47,
    title: 'PAGE 47 OF 47: APOLOGY FOR THIS APOLOGY',
    subtitle: 'Level 5 Recursive Contrition Closure',
    body: `We apologize for making you apologize for reading 47 pages of apologies instead of answering your original question.\n\nTo contest this apology, please contact our Apology Department (currently closed for an emergency synergy retreat).`,
    footnote: 'Page 47 of 47 • End of Pointless Document'
  }
];

// ============================================================================
// BUILT-IN CRISP SVG SAMPLES FOR STUPDT VISION™ (Zero external URLs!)
// ============================================================================
export const VISION_SAMPLES = [
  {
    id: 'rock',
    label: '🪨 Photo of a Rock',
    scanText: 'Analyzing molecular geology across 14 departments...',
    result: {
      detectedItem: 'Rock',
      category: 'Geological Object',
      confidence: '100.00%',
      verdict:
        'After consulting 14 Geological AI Specialists, we are 100% confident that this rock is a rock.',
      ingredients: ['Rock (100%)'],
      proTip: 'Geological Fact: If you drop this rock, it remains a rock. Accuracy: CLASSIFIED.'
    }
  },
  {
    id: 'spaghetti',
    label: '🍝 Photo of Spaghetti',
    scanText: 'Deconstructing culinary molecular compounds...',
    result: {
      detectedItem: 'Spaghetti',
      category: 'Culinary Dish',
      confidence: '100.00%',
      verdict:
        'After exhaustive spectral food analysis, we are 100% confident this plate of spaghetti is spaghetti.',
      ingredients: ['Spaghetti'],
      proTip:
        'Recipe tip: To make spaghetti, simply acquire spaghetti. Allergen warning: Contains spaghetti.'
    }
  },
  {
    id: 'water',
    label: '🥤 Glass of Water',
    scanText: 'Measuring aqueous hydration wetness levels...',
    result: {
      detectedItem: 'Wet Water',
      category: 'Liquid Substance',
      confidence: '100.00%',
      verdict: '100% confident this is wet water inside a water-holding glass.',
      ingredients: ['Water'],
      proTip: 'Serving suggestion: Pour water into a cup to obtain a cup of water.'
    }
  }
];

export const SIGN_LANGUAGE_GESTURES = ['👋', '🤞', '👌', '✌️', '🤘', '🤙', '☝️', '👐', '🤌', '🫶', '✋', '🙌'];
