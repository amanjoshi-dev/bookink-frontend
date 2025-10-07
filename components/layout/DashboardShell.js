'use client';
import { useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function DashboardShell({ nav, sidebarTitle = 'Menu', children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);      // desktop collapse

  function handleTopbarToggle() {
    if (typeof window !== 'undefined' && window.innerWidth >= 992) {
      // desktop → collapse/expand
      setCollapsed((c) => !c);
    } else {
      // mobile → slide in/out
      setSidebarOpen((s) => !s);
    }
  }

return (
    // apply a class on the wrapper so CSS can react
    <div className={`dashboard ${collapsed ? 'sidebar-collapsed' : 'with-sidebar'} d-flex flex-column`} style={{ minHeight: '100vh' }}>
      <Topbar onToggleSidebar={handleTopbarToggle} collapsed={collapsed} />

      <Sidebar
        nav={nav}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        title={sidebarTitle}
      />

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
