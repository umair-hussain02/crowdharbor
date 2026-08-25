'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, KeyRound, CheckCircle } from 'lucide-react';

type TokenState = 'checking' | 'valid' | 'invalid';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [tokenState, setTokenState] = useState<TokenState>('checking');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setTokenState('invalid');
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/admin/auth/reset-password?token=${encodeURIComponent(token)}`);
        const result = await res.json().catch(() => null);
        setTokenState(result?.valid ? 'valid' : 'invalid');
      } catch {
        setTokenState('invalid');
      }
    })();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        setError(result?.error || 'This reset link is invalid or has expired.');
        return;
      }

      setDone(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: '1.5px solid #E0E0E0', outline: 'none',
    fontSize: '14px', color: '#000', background: '#FAFAFA',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#F5F5EE',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Manrope, sans-serif', padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#000', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Crowd<span style={{ color: '#FD6628' }}>Harbor</span>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Admin Panel
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 36px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          {tokenState === 'checking' ? (
            <p style={{ fontSize: '13px', color: '#888', textAlign: 'center' }}>Checking your reset link…</p>
          ) : tokenState === 'invalid' ? (
            <>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#000', marginBottom: '12px' }}>Link invalid or expired</div>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>
                This password reset link is no longer valid. Request a new one from the sign-in page.
              </p>
              <button
                onClick={() => router.push('/admin/login')}
                style={{ background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', width: '100%' }}
              >
                Back to Sign In
              </button>
            </>
          ) : done ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={16} color="#059669" />
                </div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#000', letterSpacing: '-0.01em' }}>Password Updated</div>
              </div>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>
                Your password has been changed and all existing sessions have been signed out. Sign in again with your new password.
              </p>
              <button
                onClick={() => router.push('/admin/login')}
                style={{ background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', width: '100%' }}
              >
                Back to Sign In
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(253,102,40,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <KeyRound size={16} color="#FD6628" />
                </div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#000', letterSpacing: '-0.01em' }}>Set New Password</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>CrowdHarbor Admin</div>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                      autoFocus
                      style={{ ...inputStyle, padding: '10px 40px 10px 14px' }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(v => !v)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {showPw ? <EyeOff size={15} color="#888" /> : <Eye size={15} color="#888" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>Confirm Password</label>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    style={inputStyle}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }}
                  />
                </div>

                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#DC2626' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? '#F0A070' : '#FD6628',
                    color: '#FFF', border: 'none', borderRadius: '10px',
                    padding: '12px', fontSize: '14px', fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                    marginTop: '4px',
                  }}
                >
                  {loading ? 'Saving...' : 'Set New Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
