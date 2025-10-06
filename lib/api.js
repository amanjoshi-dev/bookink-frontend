// A tiny helper so you don't repeat fetch boilerplate everywhere:
// - attaches base URL
// - sets JSON headers
// - adds Authorization when token exists
// - parses JSON once
// - on 401 clears token (optional)

import { API_BASE } from '@/lib/config';
import { getToken, clearToken } from '@/lib/auth';

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

  let data;
  try { data = await res.json(); } 
  catch { data = { status: false, message: 'Invalid JSON from server' }; }

  // If the token is bad/expired, clear it locally.
  if (res.status === 401) clearToken();

  // Your backend uses {status, message, data, error}
  return data;
}