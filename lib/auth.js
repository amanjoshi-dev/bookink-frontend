// One place to read/write the JWT access token.
// We keep it in localStorage for speed right now.
const KEY = 'access_token';

export const setToken = (t) => localStorage.setItem(KEY, t);

// During SSR there is no window, so guard it.
export const getToken = () =>
  (typeof window === 'undefined' ? null : localStorage.getItem(KEY));

export const clearToken = () => localStorage.removeItem(KEY);
