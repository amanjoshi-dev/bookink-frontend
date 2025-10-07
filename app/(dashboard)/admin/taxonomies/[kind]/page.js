// app/(dashboard)/admin/taxonomies/[kind]/page.js
'use client';
/**
 * Dynamic Taxonomy Manager for: styles, languages, inks, placements
 * - styles: supports image upload (FormData)
 * - placements: supports optional filter ?type=unsuitable (via select)
 * - others: simple JSON
 */
import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { RequireRole } from '@/lib/guard';
import TaxonomyForm from '@/components/taxonomies/TaxonomyForm';
import TaxonomyTable from '@/components/taxonomies/TaxonomyTable';
import {
  isValidKind,
  getKindConfig,
  listTaxonomy,
  createTaxonomy,
  updateTaxonomy,
  deleteTaxonomy,
  deleteTaxonomyPermanent,
} from '@/features/taxonomies/api';

const TITLES = {
  styles: 'Tattoo Styles',
  languages: 'Languages',
  inks: 'Ink Types',
  placements: 'Tattoo Placements',
};

export default function TaxonomyKindPage() {
  const params = useParams();            // { kind: 'styles' | 'languages' | 'inks' | 'placements' }
  const search = useSearchParams();      // e.g., ?type=unsuitable
  const kind = (params?.kind || '').toString();

  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const valid = isValidKind(kind);
  const { hasImage } = valid ? getKindConfig(kind) : { hasImage: false };

  const placementsType = search?.get('type') || ''; // optional filter

  async function refresh() {
    setLoading(true);
    const r = await listTaxonomy(kind, kind === 'placements' ? { type: placementsType } : {});
    if (!r?.status) {
      setMsg(r?.message || 'Failed to load');
      setItems([]);
    } else {
      // assume r.data.items or r.data array depending on your backend
      const rows = Array.isArray(r.data) ? r.data : (r.data?.items || []);
      setItems(rows);
      setMsg('');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (valid) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, placementsType]);

  async function handleCreate({ name, imageFile }) {
    const r = await createTaxonomy(kind, { name, imageFile });
    if (!r?.status) { alert(r?.message || 'Create failed'); return; }
    await refresh();
  }

  async function handleUpdate(id, patch) {
    const r = await updateTaxonomy(kind, id, patch);
    if (!r?.status) { alert(r?.message || 'Update failed'); return; }
    setEditing(null);
    await refresh();
  }

  async function handleDelete(row) {
    if (!confirm(`Archive "${row.name}"?`)) return;
    const r = await deleteTaxonomy(kind, row.id);
    if (!r?.status) { alert(r?.message || 'Delete failed'); return; }
    await refresh();
  }

  async function handleDeletePermanent(row) {
    if (!confirm(`Permanently delete "${row.name}"? This cannot be undone.`)) return;
    const r = await deleteTaxonomyPermanent(kind, row.id);
    if (!r?.status) { alert(r?.message || 'Permanent delete failed'); return; }
    await refresh();
  }

  if (!valid) {
    return (
      <RequireRole role="admin">
        <div className="alert alert-danger">Invalid taxonomy.</div>
      </RequireRole>
    );
  }

  return (
    <RequireRole role="admin">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="mb-0">{TITLES[kind]}</h4>

        {/* Placements filter (example) */}
        {kind === 'placements' && (
          <form
            className="d-flex align-items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="text-secondary small">Type</label>
            <select
              className="form-select form-select-sm"
              defaultValue={placementsType}
              onChange={(e) => {
                const val = e.target.value;
                const url = val ? `?type=${encodeURIComponent(val)}` : '';
                // client-side "navigation" by query string:
                window.history.replaceState(null, '', url);
                // trigger refresh:
                refresh();
              }}
            >
              <option value="">All</option>
              <option value="unsuitable">Unsuitable</option>
              <option value="suitable">Suitable</option>
            </select>
          </form>
        )}
      </div>

      <p className="text-secondary small">CRUD demo with {hasImage ? 'image upload' : 'JSON only'}.</p>

      {/* Create / Edit form */}
      <TaxonomyForm
        hasImage={hasImage}
        editing={editing}
        onCancelEdit={() => setEditing(null)}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      {/* Status / loading */}
      {loading && <div className="my-3">Loading...</div>}
      {msg && <div className="alert alert-warning">{msg}</div>}

      {/* Table */}
      {!loading && (
        <TaxonomyTable
          items={items}
          hasImage={hasImage}
          onEdit={(row) => setEditing(row)}
          onDelete={handleDelete}
          onDeletePermanent={handleDeletePermanent}
        />
      )}
    </RequireRole>
  );
}
