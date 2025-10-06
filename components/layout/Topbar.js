'use client';
/**
 * Topbar shows brand + user info + logout.
 * Reused by admin and agency dashboards.
 */
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Topbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();                // clears token + user in context
    router.replace('/login'); // soft redirect (no full refresh)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {/* Mobile: toggle sidebar */}
      <button
        className="btn btn-outline-light d-lg-none me-2"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Brand */}
      <span className="navbar-brand fw-semibold">
        BOOK<span className="text-success">INK</span>
      </span>

      {/* Right side */}
      <div className="ms-auto d-flex align-items-center gap-3">
        <span className="text-light small">
          {user ? `${(user.role || '').toUpperCase()} • ${user.email || 'user'}` : 'Guest'}
        </span>
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
