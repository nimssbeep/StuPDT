import { apiFetch } from './apiClient';

/**
 * Submit Form 001 to backend bureaucracy endpoint
 * Falls back to satirical Catch-22 error when backend is offline
 */
export async function submitBureaucracyForm(formData) {
  try {
    const res = await apiFetch('/api/bureaucracy/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (res.ok && res.data) {
      return res.data;
    }
  } catch {
    // Backend offline or unreachable
  }

  // Built-in satirical Catch-22 response
  return {
    success: false,
    stamped: false,
    error:
      'CATCH-22 ERROR: Your request cannot proceed because Form 001-B requires Form 001-C to be notarized BEFORE you started filling out Form 001.'
  };
}
