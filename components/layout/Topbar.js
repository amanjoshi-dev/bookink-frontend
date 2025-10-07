'use client';
/**
 * Topbar shows brand + user info + logout and has both:
 * - mobile "hamburger" to open/close slide-in sidebar
 * - desktop collapse/expand button
 */
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Topbar({ onToggleSidebar, collapsed }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
     <nav className="app-topbar navbar navbar-expand-lg navbar-dark bg-dark px-3 border-bottom border-secondary">
      {/* Mobile: toggle sidebar (slide-in/out) */}
      <button
        className="btn btn-outline-light d-lg-none me-2"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className="bi bi-list"></i>
      </button>

       {/* Brand logo (clickable) */}
      <a className="navbar-brand d-flex align-items-center" href="/">
        <Image
          src="/images/logo-dark.png"   // put the file in /public/images/
          alt="BookInk"
          width={110}
          height={59}
          priority
        />
      </a>

      {/* >>> NEW: Desktop collapse/expand button (hidden on mobile) <<< */}
      <button
        type="button"
        className="btn btn-outline-light btn-sm ms-2 d-none d-lg-inline-flex"
        onClick={onToggleSidebar}
        title="Collapse / Expand sidebar"
        aria-label="Collapse / Expand sidebar"
      >
        {/* icon changes based on collapsed state */}
        <i className={`bi ${collapsed ? 'bi-layout-sidebar-inset-reverse' : 'bi-layout-sidebar'}`}></i>
      </button>
      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

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
