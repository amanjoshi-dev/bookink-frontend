'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Ensures the user is logged in; otherwise client-navigates to /login
 * without a full page reload.
 */
export function RequireAuth({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace('/login');
  }, [ready, user, router]);

  if (!ready) return <div className="container mt-5">Loading...</div>;
  if (!user) return null; // while redirecting

  return children;
}

/**
 * Ensures the user has the required role; otherwise client-navigates
 * to the correct dashboard.
 */
export function RequireRole({ role, children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace('/login');
    else if (user.role !== role) router.replace(`/${user.role}`);
  }, [ready, user, role, router]);

  if (!ready) return <div className="container mt-5">Loading...</div>;
  if (!user || user.role !== role) return null; // while redirecting

  return children;
}
