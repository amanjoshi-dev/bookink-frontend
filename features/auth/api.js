// features/auth/api.js
import { api } from '@/lib/api';

// Login with email/password -> backend returns {status, data:{access_token}, message}
export const loginApi = (email, password) =>
  api('/auth/login', { method: 'POST', body: { email, password } });

// Get current user profile -> backend returns {status, data:{ id, role: 'admin'|'artist', ...}}
export const me = () => api('/auth/me');
