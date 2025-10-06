// lib/guard.js
'use client';

import { useAuth } from '@/context/AuthContext';

// Use this to protect any page that requires login
export function RequireAuth({ children }) {
  const { user, ready } = useAuth();

  // Wait until we know whether a user is logged in
  if (!ready) return <div className="container mt-5">Loading...</div>;

  // If not logged in, send to /login
  if (!user) {
    if (typeof window !== 'undefined') window.location.href = '/login';
    return null;
  }
  return children;
}

// Use this when a page is for a specific role only
export function RequireRole({ role, children }) {
  const { user, ready } = useAuth();

  if (!ready) return <div className="container mt-5">Loading...</div>;
  if (!user) {
    if (typeof window !== 'undefined') window.location.href = '/login';
    return null;
  }

  // If the role doesn't match, redirect to their own dashboard
  if (user.role !== role) {
    if (typeof window !== 'undefined') window.location.href = `/${user.role}`;
    return null;
  }
  return children;
}
