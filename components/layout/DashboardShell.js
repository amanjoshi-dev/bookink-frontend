// components/layout/DashboardShell.js
'use client';
import { useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function DashboardShell({ nav, sidebarTitle = 'Menu', children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Topbar onToggleSidebar={() => setSidebarOpen(s => !s)} />

      <Sidebar
        nav={nav}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        title={sidebarTitle}
      />

      <main
        className="container-fluid"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-2">
            <div className="p-3">{children}</div>
          </div>
        </div>
      </main>

      <Footer />

      {/* CSS helpers */}
      <style jsx global>{`
        /* Prevent horizontal scroll if something mis-measures */
        html, body {
          max-width: 100%;
          overflow-x: hidden;
        }

        /* Slide only on small screens */
        .-translate-x-100 { transform: translateX(-100%); transition: transform .2s ease; }
        .translate-x-0   { transform: translateX(0);       transition: transform .2s ease; }

        /* On lg+ the sidebar is always visible and content is pushed */
        @media (min-width: 992px) {
          .app-sidebar { transform: none !important; }   /* force visible */
          main.container-fluid { margin-left: 260px; }   /* leave space for sidebar */
        }
      `}</style>
    </div>
  );
}
