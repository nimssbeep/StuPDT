/**
 * Vercel Serverless Function Handler for /api/gemini
 * Acts as an authenticated backend proxy for the Gemini API
 */

import { getGeminiApiKey, getGeminiModel } from './core/config.js';
import { buildChatPayload, buildVisionPayload } from './schemas/geminiSchemas.js';
import { requestGeminiGenerateContent } from './services/geminiService.js';
import { sendJson, sendError } from './utils/response.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method not allowed');
  }

  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return sendJson(res, 200, { configured: false });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { mode } = body;

  const model = getGeminiModel();
  let payload;

  if (mode === 'chat') {
    payload = buildChatPayload(body.userText, body.systemPrompt);
  } else if (mode === 'vision') {
    const base64Data = String(body.base64Data || '');
    if (!base64Data) {
      return sendError(res, 400, 'Missing image data');
    }
    payload = buildVisionPayload(body.mimeType, base64Data);
  } else {
    return sendError(res, 400, 'Invalid mode');
  }

  try {
    const upstreamResult = await requestGeminiGenerateContent(payload, apiKey, model);

    if (!upstreamResult.ok) {
      return sendJson(res, upstreamResult.status, upstreamResult.data);
    }

    return sendJson(res, 200, upstreamResult.data);
  } catch {
    return sendError(res, 502, 'Upstream Gemini request failed');
  }
}
