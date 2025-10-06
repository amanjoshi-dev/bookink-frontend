// components/layout/Sidebar.js
'use client';
/**
 * Sidebar slides on small screens only.
 * On lg+ it is always visible.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Sidebar({ nav, isOpen, setIsOpen, title = 'Menu' }) {
  const pathname = usePathname();

  // Close only on mobile when route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      setIsOpen?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Small screens: slide in/out with transform
  // Large screens: force visible (we override via CSS)
  const slideClass = isOpen ? 'translate-x-0' : '-translate-x-100';

  return (
    <aside
      className={`app-sidebar bg-dark text-light p-3 border-end border-secondary
                  position-fixed top-0 bottom-0 start-0 d-lg-block ${slideClass}`}
      style={{ width: 260, zIndex: 1030 }}
    >
      <div className="d-none d-lg-block h5 mb-3">{title}</div>

      {/* Close button for mobile */}
      <button
        className="btn btn-outline-light d-lg-none mb-3"
        onClick={() => setIsOpen(false)}
      >
        <i className="bi bi-x-lg"></i> Close
      </button>

      <ul className="nav nav-pills flex-column gap-1">
        {nav.map(item => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.startsWith || '___no');
          return (
            <li key={item.href} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link d-flex align-items-center gap-2 ${
                  active ? 'active bg-success' : 'text-light'
                }`}
                style={{ borderRadius: 8 }}
              >
                {item.icon && <i className={`bi ${item.icon}`}></i>}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
