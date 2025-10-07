// app/(dashboard)/admin/taxonomies/page.js
'use client';
/**
 * Just a navigator landing: choose which taxonomy to manage.
 */
import { RequireRole } from '@/lib/guard';
import Link from 'next/link';

export default function TaxonomiesLanding() {
  return (
    <RequireRole role="admin">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Taxonomies</h4>
        <div className="text-secondary small">Choose a category to manage</div>
      </div>

      <div className="row g-3">
        <div className="col-md-3">
          <div className="card bg-dark text-light h-100">
            <div className="card-body">
              <h5 className="card-title">Tattoo Styles</h5>
              <p className="text-secondary small">Names + images</p>
              <Link href="/admin/taxonomies/styles" className="btn btn-success w-100">Manage</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark text-light h-100">
            <div className="card-body">
              <h5 className="card-title">Languages</h5>
              <p className="text-secondary small">Names only</p>
              <Link href="/admin/taxonomies/languages" className="btn btn-outline-light w-100">Manage</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark text-light h-100">
            <div className="card-body">
              <h5 className="card-title">Ink Types</h5>
              <p className="text-secondary small">Names only</p>
              <Link href="/admin/taxonomies/inks" className="btn btn-outline-light w-100">Manage</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-dark text-light h-100">
            <div className="card-body">
              <h5 className="card-title">Tattoo Placements</h5>
              <p className="text-secondary small">Names; filter by type</p>
              <Link href="/admin/taxonomies/placements" className="btn btn-outline-light w-100">Manage</Link>
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
