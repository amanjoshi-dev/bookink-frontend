'use client';
/**
 * Admin home page.
 * NOTE: The chrome (Topbar + Sidebar + Footer) is provided by
 * app/(dashboard)/admin/layout.js via <DashboardShell/>.
 * Here we only render the page content, protected by RequireRole.
 */
import { RequireRole } from '@/lib/guard';
import Link from 'next/link';

export default function AdminHome() {
  return (
    <RequireRole role="admin">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Hello Super Admin, Admin Dashboard</h4>
        </div>
        <hr />

        {/* Quick actions/cards */}
        <div className="row g-3">
          <div className="col-md-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <h5 className="card-title">Taxonomies</h5>
                <p className="text-secondary small mb-3">Manage Styles, Languages, Inks, Placements</p>
                <Link href="/admin/taxonomies" className="btn btn-success w-100">Open</Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <h5 className="card-title">Agencies</h5>
                <p className="text-secondary small mb-3">Review & manage agencies</p>
                <Link href="/admin/agencies" className="btn btn-outline-light w-100">Open</Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <h5 className="card-title">Forum</h5>
                <p className="text-secondary small mb-3">Moderate posts & comments</p>
                <Link href="/admin/forum" className="btn btn-outline-light w-100">Open</Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-dark text-light h-100">
              <div className="card-body">
                <h5 className="card-title">Settings</h5>
                <p className="text-secondary small mb-3">Platform configuration</p>
                <Link href="/admin/settings" className="btn btn-outline-light w-100">Open</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
