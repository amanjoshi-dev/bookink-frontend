'use client';
/**
 * DashboardShell
 *  - Desktop (>=992px): Topbar toggle collapses/expands the sidebar (CSS handles widths).
 *  - Mobile (<992px): Topbar toggle slides sidebar in/out.
 *  - Supports BOTH:
 *      - nav (flat array)  → existing behavior
 *      - navGroups (grouped) → Playbook-like sections (Dashboard/Masters/App/System)
 *
 * Props:
 *  - nav?: Array<{ label, href, icon?, startsWith?, children? }>
 *  - navGroups?: Array<{ title, items: Array<...same as nav item...> }>
 *  - sidebarTitle?: string
 */
import { useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function DashboardShell({
  nav,          // existing flat nav (still works)
  navGroups,    // NEW: grouped nav (optional)
  sidebarTitle = 'Menu',
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile slide-in
  const [collapsed, setCollapsed] = useState(false);     // desktop collapse

  function handleTopbarToggle() {
    if (typeof window !== 'undefined' && window.innerWidth >= 992) {
      // Desktop → collapse/expand (CSS responds to wrapper class)
      setCollapsed((c) => !c);
    } else {
      // Mobile → slide in/out
      setSidebarOpen((s) => !s);
    }
  }

  return (
    // Wrapper class is important: your CSS already reacts to these.
    <div
      className={`dashboard ${collapsed ? 'sidebar-collapsed' : 'with-sidebar'} d-flex flex-column`}
      style={{ minHeight: '100vh' }}
    >
      {/* Topbar with the same toggle contract */}
      <Topbar onToggleSidebar={handleTopbarToggle} collapsed={collapsed} />

      {/* Sidebar:
          - Still works with your old `nav`
          - Also accepts `navGroups` for sectioned menus
          - Mobile slide controlled by isOpen/setIsOpen
          - `collapsed` passed for optional visual tweaks if you add them later */}
      <Sidebar
        nav={nav}
        navGroups={navGroups}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        title={sidebarTitle}
        collapsed={collapsed}
      />

      {/* Main content:
          Keeping your grid/offset so existing CSS continues to line up with the sidebar.
          If you later change sidebar width logic, adjust these classes or handle via CSS. */}
      <main className="container-fluid" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-2">
            <div className="p-3">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
