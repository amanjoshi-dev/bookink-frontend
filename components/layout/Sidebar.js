'use client';
/**
 * Sidebar (mobile slide-in + desktop fixed) with support for GROUPED nav.
 * - Backward compatible with your existing `nav` array prop.
 * - New: pass `navGroups=[{ title, items: [...] }]` to render Playbook-like sections.
 * - Keeps your animations (translate-x-0 / -translate-x-100) and nested children.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

/** === Single item (supports children) – unchanged logic from your version === */
function NavItem({ item, depth = 0, pathname, onNavigate }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const isActive =
    pathname === item.href ||
    (item.startsWith && pathname.startsWith(item.startsWith));

  const childActive =
    hasChildren &&
    item.children.some(
      (c) =>
        pathname === c.href ||
        (c.startsWith && pathname.startsWith(c.startsWith || c.href))
    );

  const [open, setOpen] = useState(childActive);

  useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  const padLeft = depth === 0 ? 0 : 10 + depth * 10;

  if (!hasChildren) {
    return (
      <li className="nav-item">
        <Link
          href={item.href}
          className={`nav-link d-flex align-items-center gap-2 ${
            isActive ? 'active bg-success' : 'text-light'
          }`}
          style={{ borderRadius: 8, paddingLeft: padLeft }}
          onClick={onNavigate}
        >
          {item.icon && <i className={`bi ${item.icon}`}></i>}
          <span>{item.label}</span>
        </Link>
      </li>
    );
  }

  return (
    <li className="nav-item">
      <button
        type="button"
        className={`nav-link d-flex align-items-center gap-2 w-100 ${
          childActive ? 'text-light' : 'text-light'
        }`}
        style={{
          borderRadius: 8,
          paddingLeft: padLeft,
          background: 'transparent',
          border: 0,
          textAlign: 'left',
        }}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {item.icon && <i className={`bi ${item.icon}`}></i>}
        <span className="flex-grow-1">{item.label}</span>
        <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
      </button>

      <ul className="nav flex-column gap-1 mt-1">
        {open &&
          item.children.map((child) => (
            <NavItem
              key={child.href || child.label}
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

/** === Sidebar root – now accepts navGroups in addition to your existing nav === */
export default function Sidebar({
  nav,            // existing flat list [{label, href, icon, children?}]
  navGroups,      // NEW grouped list [{title, items: [...] }]
  isOpen,
  setIsOpen,
  title = 'Menu',
}) {
  const pathname = usePathname();

  // Back-compat: if no groups passed, wrap your flat `nav` in a single group.
  const groups = useMemo(() => {
    if (Array.isArray(navGroups) && navGroups.length) return navGroups;
    if (Array.isArray(nav) && nav.length) return [{ title, items: nav }];
    return [];
  }, [navGroups, nav, title]);

  // Close only on mobile when route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      setIsOpen?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const slideClass = isOpen ? 'translate-x-0' : '-translate-x-100';

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
      <button
        className="btn btn-outline-light d-lg-none mb-3"
        onClick={() => setIsOpen(false)}
      >
        <i className="bi bi-x-lg"></i> Close
      </button>

      {/* Render grouped sections */}
      {groups.map((group, gi) => (
        <div key={gi} className="mb-3">
          <div className="px-1 mb-2 text-uppercase text-secondary fw-semibold small">
            {group.title}
          </div>
          <ul className="nav nav-pills flex-column gap-1">
            {(group.items || []).map((item) => (
              <NavItem
                key={item.href || item.label}
                item={item}
                depth={0}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
