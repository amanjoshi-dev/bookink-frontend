// components/taxonomies/TaxonomyForm.js
'use client';
/**
 * Reusable form:
 *  - For non-image kinds: just "name"
 *  - For styles: "name" + optional image file
 *  - Handles create & update modes
 */
import { useEffect, useRef, useState } from 'react';

export default function TaxonomyForm({
  hasImage = false,
  editing,                      // null for create, or the row object for edit
  onCancelEdit,                // callback to clear edit mode
  onCreate,                    // (name, file?) => Promise
  onUpdate,                    // (id, {name?, imageFile?}) => Promise
}) {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // When editing changes, populate the form
  useEffect(() => {
    if (editing) {
      setName(editing.name || '');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      setName('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [editing]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editing) {
        await onUpdate(editing.id, { name, imageFile: file || undefined });
      } else {
        await onCreate({ name, imageFile: file || undefined });
      }
      setName('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  }

  return (
    <form className="row g-2 align-items-end mb-3" onSubmit={handleSubmit}>
      <div className="col-sm-5">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          placeholder="Enter name..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      {hasImage && (
        <div className="col-sm-4">
          <label className="form-label">Image (optional)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="form-control"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
        </div>
      )}

      <div className="col-sm-3 d-flex gap-2">
        <button className="btn btn-success flex-grow-1">
          {editing ? 'Update' : 'Add'}
        </button>
        {editing && (
          <button type="button" className="btn btn-outline-light" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
