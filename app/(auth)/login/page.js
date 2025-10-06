'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginApi, getProfile } from '@/features/auth/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();             // stop native form refresh
    setLoading(true);
    setMsg('');

    // 1) hit backend for token (+ maybe profile)
    const r = await loginApi(email, password);

    if (!r?.status) {
      setMsg(r?.message || 'Login failed.');
      setLoading(false);
      return;
    }

    // 2) extract token (support both shapes)
    //    - some backends send it inside r.data.access_token
    //    - yours (per screenshot) also puts it at r.access_token
    const token =
      r?.data?.access_token ??
      r?.access_token ??
      null;

    if (!token) {
      setMsg('Login failed: no token received.');
      setLoading(false);
      return;
    }

    // 3) if backend already sent profile in r.data, use it
    //    (your console shows { data: { id, role, ... } })
    const profileFromLogin =
      r?.data && r?.data.role ? r.data : null;

    // 4) save token immediately so subsequent calls have Authorization
    //    (AuthContext.login stores token in localStorage and sets user if provided)
    login(token, profileFromLogin);

    // 5) if we didn't get a profile with the login response, fetch it now
    let profile = profileFromLogin;
    if (!profile) {
      const p = await getProfile();
      profile = p?.status ? p.data : null;
      // update context with the real profile
      login(token, profile);
    }

    // 6) route by role (client-side; NO full page reload)
    const role = profile?.role;
    if (role === 'admin') router.replace('/admin');
    else if (role === 'agency') router.replace('/agency');
    else setMsg('This web app is only for Admins & Agencies.');

    setLoading(false);
  }

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 60 }}>
      <h3 className="mb-3">Sign in</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Signing in…' : 'Login'}
        </button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}
