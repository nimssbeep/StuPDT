/**
 * StuPDT Backend Configuration
 * Centralized environment variable resolution and API URLs
 */

export const DEFAULT_GEMINI_MODEL = 'gemini-3-flash-preview';
export const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || '';
}

export function getGeminiModel() {
  return process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
}

export function buildGeminiEndpoint(model, apiKey) {
  return `${GEMINI_API_BASE_URL}/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
}
