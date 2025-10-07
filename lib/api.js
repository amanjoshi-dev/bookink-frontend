// A tiny helper so you don't repeat fetch boilerplate everywhere:
// - attaches base URL
// - sets JSON headers
// - adds Authorization when token exists
// - parses JSON once
// - on 401 clears token (optional)

// lib/api.js
import { API_BASE } from '@/lib/config';
import { getToken, clearToken } from '@/lib/auth';

// tiny helper to build a query string easily
export function qs(params = {}) {
  const esc = encodeURIComponent;
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
  if (!entries.length) return '';
  return '?' + entries.map(([k, v]) => `${esc(k)}=${esc(v)}`).join('&');
}

/**
 * api(path, options)
 * - Adds baseURL, Authorization, JSON parsing.
 * - If body is FormData, DO NOT set Content-Type (browser will do it).
 */
export async function api(path, { method = 'GET', body, headers } = {}) {
  const token = getToken();

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  let data;
  try { data = await res.json(); } catch { data = { status: false, message: 'Invalid JSON from server' }; }

  if (res.status === 401) clearToken();

  return data; // expected to be { status, message, data, error }
}
