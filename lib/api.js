// lib/api.js
// A tiny wrapper around fetch so we don't repeat:
// - base URL
// - headers (JSON + Authorization)
// - JSON parsing + basic 401 handling

import { API_BASE } from './config';
import { getToken, clearToken } from './auth';

export async function api(path, { method = 'GET', body, headers } = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Try to parse JSON (your backend returns {status, message, data, error})
  let data;
  try { data = await res.json(); } catch { data = { status: false, message: 'Invalid JSON' }; }

  // If backend says unauthorized, clear token locally (user will be redirected by guards)
  if (res.status === 401) {
    clearToken();
  }

  return data;
}
