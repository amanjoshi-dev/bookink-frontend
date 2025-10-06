'use client';
/**
 * Dummy Taxonomies page: shows a heading, a small form to add a taxonomy,
 * and a placeholder table. We'll wire real CRUD next.
 */
import { RequireRole } from '@/lib/guard';
import { useState } from 'react';

export default function AdminTaxonomiesPage() {
  const [name, setName] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'Black & Gray', slug: 'black-gray' },
    { id: 2, name: 'Neo Traditional', slug: 'neo-traditional' },
  ]);

  function addItem(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    setItems(prev => [...prev, { id: Date.now(), name, slug }]);
    setName('');
  }

  return (
    <RequireRole role="admin">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Taxonomies</h4>
        <div className="text-muted small">Dummy data for now</div>
      </div>

      {/* Add form */}
      <form className="row g-2 mb-3" onSubmit={addItem}>
        <div className="col-auto">
          <input
            className="form-control"
            placeholder="New taxonomy name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-success">Add</button>
        </div>
      </form>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th style={{width: 80}}>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th style={{width: 120}}></th>
            </tr>
          </thead>
          <tbody>
            {items.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td className="text-secondary">{row.slug}</td>
                <td className="text-end">
                  <button className="btn btn-outline-light btn-sm me-2" disabled>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => setItems(prev => prev.filter(x => x.id !== row.id))}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-secondary py-4">No items.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </RequireRole>
  );
}
