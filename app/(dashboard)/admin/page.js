'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { RequireRole } from '@/lib/guard';

export default function AdminHome() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();                // clears token + user in context
    router.replace('/login'); // soft navigation, no reload
  }

  // 1) Don't render the page until AuthProvider finished checking the session
  if (!ready) {
    return <div className="container mt-5">Loading…</div>;
  }

  // 2) Wrap in role guard (redirects if not admin)
  return (
    <RequireRole role="admin">
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          {/* 3) Safe read of user name with fallback */}
          <h4>Hello {user?.name || 'Admin'}, Admin Dashboard</h4>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <hr />
        <p>Next: add Taxonomies here.</p>
      </div>
    </RequireRole>
  );
}
