'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { loginApi, getProfile } from '@/features/auth/api';
import { useAuth } from '@/context/AuthContext';
import { asset } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const r = await loginApi(email, password);
    if (!r?.status) {
      setMsg(r?.message || 'Login failed.');
      setLoading(false);
      return;
    }

    const token = r?.data?.access_token ?? r?.access_token ?? null;
    if (!token) {
      setMsg('Login failed: no token received.');
      setLoading(false);
      return;
    }

    const profileFromLogin = r?.data && r?.data.role ? r.data : null;
    login(token, profileFromLogin);

    let profile = profileFromLogin;
    if (!profile) {
      const p = await getProfile();
      profile = p?.status ? p.data : null;
      login(token, profile);
    }

    const role = profile?.role;
    if (role === 'admin') router.replace('/admin');
    else if (role === 'agency') router.replace('/agency');
    else setMsg('This web app is only for Admins & Agencies.');

    setLoading(false);
  }

  return (
    <div
      className="login-page d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${asset('/images/login-front.jpg')})`,
      }}
    >
      {/* dark overlay to dim the background image */}
      <div className="login-overlay" />

      <div className="login-card shadow-lg">
        <div className="text-center mb-3">
          <Image
            src={asset('/images/logo-dark.png')}
            alt="Logo"
            width={200}
            height={150}
            priority
          />
        </div>

        <h2 className="login-title text-center mb-1">Login</h2>
        <p className="login-subtitle text-center mb-4">Sign in to your account</p>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person" aria-hidden="true" />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock" aria-hidden="true" />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button className="btn btn-success w-100 login-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        {msg && <div className="alert alert-danger mt-3 py-2 mb-0">{msg}</div>}
      </div>
    </div>
  );
}
