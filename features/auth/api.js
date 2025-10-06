// All auth-related API calls for clarity.
import { api } from '@/lib/api';

// Login returns {status, message, data: { access_token }}
export const loginApi = (email, password) =>
  api('/auth/login', { method: 'POST', body: { email, password } });

// Profile returns {status, data: { id, role: 'admin'|'agency'|... }}
// We'll call it "profile" because you prefer that term.
export const getProfile = () => api('/auth/profile');
