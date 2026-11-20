import { apiFetch } from './apiClient';

/**
 * Sync telemetry & metrics with backend
 */
export async function syncTelemetryMetrics(metrics) {
  try {
    const res = await apiFetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify(metrics)
    });

    if (res.ok && res.data) {
      return res.data;
    }
  } catch {
    // Fail silently in offline mode
  }
  return metrics;
}

/**
 * Fetch global telemetry metrics from backend
 */
export async function fetchGlobalMetrics() {
  try {
    const res = await apiFetch('/api/metrics', { method: 'GET' });
    if (res.ok && res.data) {
      return res.data;
    }
  } catch {
    // Backend offline
  }
  return null;
}
