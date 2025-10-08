/**
 * Admin layout: grouped nav like Playbook (Dashboard / Masters / App / System)
 */
import DashboardShell from '@/components/layout/DashboardShell';

const adminNavGroups = [
  {
    title: 'Dashboard',
    items: [
      { label: 'Home', href: '/admin', icon: 'bi-speedometer2' },
    ],
  },
  {
    title: 'Masters',
    items: [
      {
        label: 'Taxonomies',
        href: '/admin/taxonomies',
        icon: 'bi-tags',
        startsWith: '/admin/taxonomies',
        // submenu
        children: [
          { label: 'Styles', href: '/admin/taxonomies/styles', icon: 'bi-image' },
          { label: 'Languages', href: '/admin/taxonomies/languages', icon: 'bi-translate' },
          { label: 'Ink Types', href: '/admin/taxonomies/inks', icon: 'bi-droplet' },
          { label: 'Placements', href: '/admin/taxonomies/placements', icon: 'bi-grid' },
        ],
      },
    ],
  },
  {
    title: 'App',
    items: [
      { label: 'Agencies', href: '/admin/agencies', icon: 'bi-buildings' },
      { label: 'Forum', href: '/admin/forum', icon: 'bi-chat-square-text' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: 'bi-gear' },
    ],
  },
];

export default function AdminLayout({ children }) {
  return (
    <DashboardShell navGroups={adminNavGroups} sidebarTitle="Admin Menu">
      {children}
    </DashboardShell>
  );
}
