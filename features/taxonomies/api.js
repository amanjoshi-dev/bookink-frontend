// features/taxonomies/api.js
import { api, qs } from '@/lib/api';

/**
 * Generic helpers for each taxonomy kind.
 * Backend routes you gave:
 *  - /catalog/styles
 *  - /catalog/languages
 *  - /catalog/inks
 *  - /catalog/placements?type=unsuitable
 *
 * We’ll map a "kind" -> basePath, and some kinds support image.
 */

const MAP = {
  styles:     { base: '/catalog/styles',     hasImage: true  },
  languages:  { base: '/catalog/languages',  hasImage: false },
  inks:       { base: '/catalog/inks',       hasImage: false },
  placements: { base: '/catalog/placements', hasImage: false }, // supports ?type=
};

export function isValidKind(kind) {
  return Object.prototype.hasOwnProperty.call(MAP, kind);
}

export function getKindConfig(kind) {
  if (!isValidKind(kind)) throw new Error('Invalid taxonomy kind');
  return MAP[kind];
}

// LIST
export function listTaxonomy(kind, params = {}) {
  const { base } = getKindConfig(kind);
  return api(`${base}${qs(params)}`, { method: 'GET' });
}

// CREATE
export function createTaxonomy(kind, payload) {
  const { base, hasImage } = getKindConfig(kind);

  if (hasImage) {
    // payload is { name, imageFile? } → send FormData
    const fd = new FormData();
    if (payload.name) fd.append('name', payload.name);
    if (payload.imageFile) fd.append('image', payload.imageFile); // field name "image" -> your multer field
    return api(base, { method: 'POST', body: fd });
  }

  // JSON body for non-image kinds
  return api(base, { method: 'POST', body: payload });
}

// UPDATE
export function updateTaxonomy(kind, id, payload) {
  const { base, hasImage } = getKindConfig(kind);

  if (hasImage) {
    // allow both: just name, or name+image
    const fd = new FormData();
    if (payload.name !== undefined) fd.append('name', payload.name);
    if (payload.imageFile) fd.append('image', payload.imageFile);
    return api(`${base}/${id}`, { method: 'PATCH', body: fd });
  }

  return api(`${base}/${id}`, { method: 'PATCH', body: payload });
}

// DELETE (soft / archive)
export function deleteTaxonomy(kind, id) {
  const { base } = getKindConfig(kind);
  return api(`${base}/${id}`, { method: 'DELETE' });
}

// PERMANENT DELETE (if backend exposes a different endpoint or flag)
export function deleteTaxonomyPermanent(kind, id) {
  const { base } = getKindConfig(kind);
  // Option A: dedicated endpoint, e.g. /.../id?force=true
  return api(`${base}/${id}${qs({ force: true })}`, { method: 'DELETE' });
}
