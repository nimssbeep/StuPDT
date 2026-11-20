import { sendJson } from './utils/response.js';
import { getGeminiApiKey } from './core/config.js';

export default async function handler(req, res) {
  const apiKey = getGeminiApiKey();

  return sendJson(res, 200, {
    status: 'healthy',
    service: 'StuPDT Serverless API',
    version: '1.0.0',
    ai_configured: Boolean(apiKey),
    ai_mode: apiKey ? 'live_gemini' : 'autonomous_chaos',
    timestamp: new Date().toISOString(),
    message: 'StuPDT backend is live, operating at 100% bureaucracy and 0% helpfulness.'
  });
}
