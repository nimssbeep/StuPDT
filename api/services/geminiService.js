/**
 * StuPDT Backend Gemini Service
 * Handles upstream communication with the Google Gemini API
 */

import { buildGeminiEndpoint } from '../core/config.js';

export async function requestGeminiGenerateContent(payload, apiKey, model) {
  const apiUrl = buildGeminiEndpoint(model, apiKey);

  const upstream = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await upstream.json();
  return {
    ok: upstream.ok,
    status: upstream.status,
    data
  };
}
