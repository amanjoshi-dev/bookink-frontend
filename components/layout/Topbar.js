'use client';
/**
 * Topbar (Playbook-style)
 * - Mobile hamburger toggles slide-in sidebar
 * - Desktop button collapses/expands sidebar
 * - Brand logo (click to go home)
 * - User dropdown: Profile, Password Change, Logout
 *
 * Dependencies:
 *  - AuthContext: { user, logout }
 *  - Bootstrap 5 JS for dropdowns (already included globally in your app)
 */
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Topbar({ onToggleSidebar, collapsed }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const displayName = user?.name || (user?.role ? user.role.toUpperCase() : 'Admin User');
  const email = user?.email ?? '';

  function handleLogout() {
    logout();              // reuse your existing logout
    router.replace('/admin');
  }

  return (
    <nav className="app-topbar navbar navbar-expand-lg navbar-dark bg-dark px-3 border-bottom border-secondary"
         style={{ height: 'var(--topbar-h)' }}>

      {/* Mobile: toggle sidebar (slide-in/out) */}
      <button
        className="btn btn-outline-light d-lg-none me-2"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className="bi bi-list" />
      </button>

      {/* Brand */}
      <Link className="navbar-brand d-flex align-items-center" href="/login">
        <Image
          src="/images/logo-dark.png"   // keep file in /public/images/
          alt="BookInk"
          width={110}
          height={59}
          priority
        />
      </Link>

      {/* Desktop: collapse/expand sidebar */}
      <button
        type="button"
        className="btn btn-outline-light btn-sm ms-2 d-none d-lg-inline-flex"
        onClick={onToggleSidebar}
        title="Collapse / Expand sidebar"
        aria-label="Collapse / Expand sidebar"
      >
        <i className={`bi ${collapsed ? 'bi-layout-sidebar-inset-reverse' : 'bi-layout-sidebar'}`} />
      </button>

      {/* Right side: user dropdown */}
      <div className="ms-auto d-flex align-items-center gap-2">
        {/* You can keep this small badge if you like; it's optional now */}
        {/* <span className="text-light small d-none d-md-inline">
          {user ? `${(user.role || '').toUpperCase()} • ${email || 'user'}` : 'Guest'}
        </span> */}

        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle d-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person-circle" />
            <span className="d-none d-sm-inline">{displayName}</span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li className="dropdown-header small">
              <div className="fw-semibold">{displayName}</div>
              {email && <div className="text-secondary">{email}</div>}
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <Link className="dropdown-item" href="/admin/profile">
                <i className="bi bi-person me-2" />
                Profile
              </Link>
            </li>

            <li>
              <Link className="dropdown-item" href="/admin/password">
                <i className="bi bi-shield-lock me-2" />
                Password Change
              </Link>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
