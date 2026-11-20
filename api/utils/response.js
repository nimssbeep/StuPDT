/**
 * HTTP response helpers for serverless handlers
 */

export function sendJson(res, statusCode, data) {
  return res.status(statusCode).json(data);
}

export function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}
