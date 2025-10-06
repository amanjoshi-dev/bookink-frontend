// context/AuthContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, setToken, clearToken } from '@/lib/auth';
import { me } from '@/features/auth/api';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // e.g., { id, role: 'admin'|'artist', ... }
  const [ready, setReady] = useState(false); // gates rendering until we know auth status

  // On first load, if a token exists, fetch /auth/me to get the user object
  useEffect(() => {
    const t = getToken();
    if (!t) { setReady(true); return; }
    me().then(r => {
      if (r.status) setUser(r.data || null);
      setReady(true);
    });
  }, []);

  // Call this after successful login
  const login = (token, profile) => { setToken(token); setUser(profile || null); };

  // Call this on logout or when we want to clear session
  const logout = () => { clearToken(); setUser(null); };

  return (
    <AuthCtx.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
