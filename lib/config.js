export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// ------------------------------------------------------------
// ASSET BASE CONFIGURATION
// ------------------------------------------------------------

export const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE || '';

/**
 * asset() helper builds a full URL for any static asset.
 * Works both locally and after deployment, even if base URL changes.
 *
 * Example:
 * asset('/images/logo.png')  → '/images/logo.png'
 * If NEXT_PUBLIC_ASSET_BASE=https://cdn.example.com,
 * it will return 'https://cdn.example.com/images/logo.png'
 */
export function asset(path = '') {
  if (!path) return ASSET_BASE || '';
  return `${ASSET_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
