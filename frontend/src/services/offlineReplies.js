/**
 * Offline fallback responses for StuPDT AI departments
 * Used when no API key is configured or offline/rate-limited
 */

export function getOfflineDepartmentReply(userText, targetDept) {
  if (targetDept.id === 'verifier') {
    return `Thank you for reaching us! Before we look at "${userText}", could you confirm in writing that you are a human currently experiencing this question?`;
  }
  if (targetDept.id === 'supervisor') {
    return `Congratulations on confirming your status! Unfortunately, under Policy 404-B, we strictly assist people who do NOT have "${userText}" as a problem.`;
  }
  if (targetDept.id === 'form_ai') {
    return `We cannot process "${userText}" yet because Form 001-B requires Form 001-C to be notarized before you even thought of this question.`;
  }
  if (targetDept.id === 'excuse_ai') {
    return `After extensive analysis, we are 99.97% confident that your issue with "${userText}" is caused by Mercury retrograde and your device feeling emotionally fragile.`;
  }
  if (targetDept.id === 'ceo') {
    return `As THE CEO AI, I am proud to say I have never answered a single question. Synergizing your ticket straight back to Assistant #001!`;
  }
  return `We sincerely apologize for the inconvenience! Your concern has been forwarded to someone who will immediately forward it to someone else.`;
}
