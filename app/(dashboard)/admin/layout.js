/**
 * Admin layout: defines admin menu and wraps every /admin/* page in the shell.
 * THIS FILE makes the shell appear automatically on all admin pages.
 */
import DashboardShell from '@/components/layout/DashboardShell';

const adminNav = [
  { label: 'Home',        href: '/admin',            icon: 'bi-speedometer2' },
  { label: 'Taxonomies',  href: '/admin/taxonomies', icon: 'bi-tags', startsWith: '/admin/taxonomies' },
  { label: 'Agencies',    href: '/admin/agencies',   icon: 'bi-buildings' },
  { label: 'Forum',       href: '/admin/forum',      icon: 'bi-chat-square-text' },
  { label: 'Settings',    href: '/admin/settings',   icon: 'bi-gear' },
];

export default function AdminLayout({ children }) {
  return (
    <DashboardShell nav={adminNav} sidebarTitle="Admin Menu">
      {children}
    </DashboardShell>
  );
}
