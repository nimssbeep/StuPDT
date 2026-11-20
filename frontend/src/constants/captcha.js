// ============================================================================
// THEME SWITCHER GATEKEEPER DATA (CAPTCHA + MANDATORY LEGAL MATH PROBLEMS)
// ============================================================================
export const CAPTCHA_TILES = [
  { id: 0, iconType: 'mountain', label: 'Just a Rock', isTrafficLight: false },
  { id: 1, iconType: 'traffic-light', label: 'Traffic Light', isTrafficLight: true },
  { id: 2, iconType: 'utensils', label: 'Pure Spaghetti', isTrafficLight: false },
  { id: 3, iconType: 'briefcase', label: 'Unread Ticket', isTrafficLight: false },
  { id: 4, iconType: 'bot', label: 'Our CEO AI', isTrafficLight: false },
  { id: 5, iconType: 'traffic-light', label: 'Traffic Light', isTrafficLight: true },
  { id: 6, iconType: 'timer', label: 'Loading at 99%', isTrafficLight: false },
  { id: 7, iconType: 'traffic-light', label: 'Traffic Light', isTrafficLight: true },
  { id: 8, iconType: 'flame', label: 'Server Room', isTrafficLight: false }
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
