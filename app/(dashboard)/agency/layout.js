/**
 * Agency layout: defines agency menu and wraps every /agency/* page in the shell.
 */
import DashboardShell from '@/components/layout/DashboardShell';

const agencyNav = [
  { label: 'Home',         href: '/agency',               icon: 'bi-house' },
  { label: 'Profile',      href: '/agency/profile',       icon: 'bi-person-badge' },
  { label: 'Availability', href: '/agency/availability',  icon: 'bi-calendar-check' },
  { label: 'Packages',     href: '/agency/packages',      icon: 'bi-box-seam' },
  { label: 'Bookings',     href: '/agency/bookings',      icon: 'bi-journal-text' },
  { label: 'Forum',        href: '/agency/forum',         icon: 'bi-chat-dots' },
  { label: 'Settings',     href: '/agency/settings',      icon: 'bi-gear' },
];

export default function AgencyLayout({ children }) {
  return (
    <DashboardShell nav={agencyNav} sidebarTitle="Agency Menu">
      {children}
    </DashboardShell>
  );
}
