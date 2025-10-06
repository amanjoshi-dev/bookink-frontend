'use client';
// This page is a Client Component because it uses hooks and click handlers.

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { RequireRole } from '@/lib/guard';

export default function AgencyHome() {
  const router = useRouter();
  const { logout, user } = useAuth(); // user will have role "agency" here

  function handleLogout() {
    // 1) Clear token + user from AuthContext/localStorage
    logout();
    // 2) Client-side navigation back to /login (NO full page reload)
    router.replace('/login');
  }

  return (
    // Guard ensures only "agency" users can see this page.
    <RequireRole role="agency">
      <div className="container mt-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">Agency Dashboard</h4>
            <small className="text-muted">
              {user?.name ? `Welcome, ${user.name}` : 'Welcome'}
            </small>
          </div>

          <div className="d-flex gap-2">
            {/* Example: go to profile page (we'll wire later) */}
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => router.push('/agency/profile')}
            >
              Profile
            </button>

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <hr />

        {/* Quick-start tiles (placeholders you can wire later) */}
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Update Profile</h5>
                <p className="card-text">Logo, about, contact, opening hours, min price.</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => router.push('/agency/profile')}
                >
                  Go to Profile
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Manage Availability</h5>
                <p className="card-text">Set working slots so bookings don’t overlap.</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => router.push('/agency/availability')}
                >
                  Availability
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Packages</h5>
                <p className="card-text">Create/edit packages customers can book.</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => router.push('/agency/packages')}
                >
                  Manage Packages
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* You can add a "Recent Bookings" table here later */}
      </div>
    </RequireRole>
  );
}
