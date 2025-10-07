/**
 * Admin layout: defines admin menu and wraps every /admin/* page in the shell.
 * THIS FILE makes the shell appear automatically on all admin pages.
 */
import DashboardShell from '@/components/layout/DashboardShell';

const adminNav = [
  { label: 'Home', href: '/admin', icon: 'bi-speedometer2' },
  {
    label: 'Taxonomies',
    href: '/admin/taxonomies',
    icon: 'bi-tags',
    startsWith: '/admin/taxonomies',
    // NEW: sub menu
    children: [
      { label: 'Styles', href: '/admin/taxonomies/styles', icon: 'bi-image' },
      { label: 'Languages', href: '/admin/taxonomies/languages', icon: 'bi-translate' },
      { label: 'Ink Types', href: '/admin/taxonomies/inks', icon: 'bi-droplet' },
      { label: 'Placements', href: '/admin/taxonomies/placements', icon: 'bi-grid' },
    ],
  },
  { label: 'Agencies', href: '/admin/agencies', icon: 'bi-buildings' },
  { label: 'Forum', href: '/admin/forum', icon: 'bi-chat-square-text' },
  { label: 'Settings', href: '/admin/settings', icon: 'bi-gear' },
];

export default function AdminLayout({ children }) {
  return (
    <DashboardShell nav={adminNav} sidebarTitle="Admin Menu">
      {children}
    </DashboardShell>
  );
}
