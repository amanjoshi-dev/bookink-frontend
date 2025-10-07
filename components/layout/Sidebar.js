'use client';
/**
 * Sidebar with support for nested items (children).
 * - On mobile (<992px) it slides in/out.
 * - On desktop (>=992px) it is always visible.
 * - If current route starts with parent's startsWith, the parent group auto-expands.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function NavItem({ item, depth = 0, pathname, onNavigate }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  // active: exact match OR route starts with provided hint
  const isActive = pathname === item.href || (item.startsWith && pathname.startsWith(item.startsWith));

  // auto-expand a parent if any child is active
  const childActive = hasChildren && item.children.some(
    c => pathname === c.href || (c.startsWith && pathname.startsWith(c.startsWith || c.href))
  );

  const [open, setOpen] = useState(childActive);

  // keep group open when we navigate into it
  useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  // indent children a bit
  const padLeft = depth === 0 ? 0 : 10 + depth * 10;

  if (!hasChildren) {
    return (
      <li className="nav-item">
        <Link
          href={item.href}
          className={`nav-link d-flex align-items-center gap-2 ${isActive ? 'active bg-success' : 'text-light'}`}
          style={{ borderRadius: 8, paddingLeft: padLeft }}
          onClick={onNavigate}
        >
          {item.icon && <i className={`bi ${item.icon}`}></i>}
          <span>{item.label}</span>
        </Link>
      </li>
    );
  }

  // Parent with children (collapsible)
  return (
    <li className="nav-item">
      <button
        type="button"
        className={`nav-link d-flex align-items-center gap-2 w-100 ${childActive ? 'text-light' : 'text-light'}`}
        style={{ borderRadius: 8, paddingLeft: padLeft, background: 'transparent', border: 0, textAlign: 'left' }}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {item.icon && <i className={`bi ${item.icon}`}></i>}
        <span className="flex-grow-1">{item.label}</span>
        <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
      </button>

      <ul className="nav flex-column gap-1 mt-1">
        {open && item.children.map(child => (
          <NavItem
            key={child.href}
            item={child}
            depth={depth + 1}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </li>
  );
}

export default function Sidebar({ nav, isOpen, setIsOpen, title = 'Menu' }) {
  const pathname = usePathname();

  // Close only on mobile when route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      setIsOpen?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const slideClass = isOpen ? 'translate-x-0' : '-translate-x-100';

  // When a leaf link is clicked, close on mobile
  const onNavigate = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      setIsOpen?.(false);
    }
  };

  return (
    <aside
      className={`app-sidebar bg-dark text-light p-3 border-end border-secondary
                  position-fixed bottom-0 start-0 d-lg-block ${slideClass}`}
      style={{ width: 'var(--sidebar-w)', zIndex: 1030 }}
    >
      <div className="d-none d-lg-block h5 mb-3">{title}</div>

      {/* Close on mobile */}
      <button className="btn btn-outline-light d-lg-none mb-3" onClick={() => setIsOpen(false)}>
        <i className="bi bi-x-lg"></i> Close
      </button>

      <ul className="nav nav-pills flex-column gap-1">
        {nav.map(item => (
          <NavItem
            key={item.href}
            item={item}
            depth={0}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </aside>
  );
}
