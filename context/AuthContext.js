'use client';
// This is a client component because it uses state and effects.
// It loads the profile on first load if a token exists.

import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, setToken, clearToken } from '@/lib/auth';
import { getProfile } from '@/features/auth/api';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // e.g., { id, role: 'admin'|'agency', ... }
  const [ready, setReady] = useState(false); // becomes true when we tried to restore session

  useEffect(() => {
    const t = getToken();
    if (!t) { setReady(true); return; }     // no token → not logged in
    getProfile().then(r => {
      if (r.status) setUser(r.data || null);
      setReady(true);
    });
  }, []);

  // Call on successful login (we pass token + optional profile)
  const login = (token, profile) => { setToken(token); setUser(profile || null); };

  // Clear token + user
  const logout = () => { clearToken(); setUser(null); };

  return (
    <AuthCtx.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
