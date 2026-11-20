import { apiFetch } from './apiClient';
import { generateDysfunctionalAIResponse } from './gemini';

/**
 * Dispatches a chat message to the backend /api/chat if online,
 * otherwise falls back to Gemini API proxy or offline replies.
 */
export async function sendChatMessage(userText, targetDept, history = []) {
  try {
    const res = await apiFetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: userText,
        departmentId: targetDept?.id || 'intake',
        history
      })
    });

    if (res.ok && res.data?.reply) {
      return res.data.reply;
    }
  } catch {
    // Backend offline
  }

  // Fallback to Gemini or offline replies
  return generateDysfunctionalAIResponse(userText, targetDept);
}
