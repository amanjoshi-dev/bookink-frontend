// lib/auth.js
// Tiny helpers to store the access token in localStorage.
// Keeping all token logic here lets us change storage later in ONE file.

const KEY = 'access_token';

// Save token after login
export const setToken = (t) => localStorage.setItem(KEY, t);

// Read token for authenticated requests
export const getToken = () =>
  (typeof window === 'undefined' ? null : localStorage.getItem(KEY));

// Remove token on logout / 401
export const clearToken = () => localStorage.removeItem(KEY);
