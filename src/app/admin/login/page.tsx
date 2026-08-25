'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, ShieldCheck, KeyRound } from 'lucide-react';

type Step = 'credentials' | 'otp' | 'forgot';

const RESEND_COOLDOWN_S = 30;

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('credentials');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const [code, setCode] = useState('');
  const codeInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [forgotSent, setForgotSent] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/auth/me');
      if (res.ok) router.push('/admin/dashboard');
    })();
  }, [router]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (step === 'otp') codeInputRef.current?.focus();
  }, [step]);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        setError(result?.error || 'Invalid email or password.');
        return;
      }

      setStep('otp');
      setResendCooldown(RESEND_COOLDOWN_S);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        setError(result?.error || 'Invalid or expired code.');
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await fetch('/api/admin/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setForgotSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError('');
    setInfo('');

    try {
      const response = await fetch('/api/admin/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      await response.json().catch(() => null);
      setInfo('If a verification code is pending, a new one has been sent.');
      setResendCooldown(RESEND_COOLDOWN_S);
    } catch {
      setError('Could not resend code. Please try again.');
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
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#000', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Crowd<span style={{ color: '#FD6628' }}>Harbor</span>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Admin Panel
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 36px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          {step === 'credentials' ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(253,102,40,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={16} color="#FD6628" />
                </div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#000', letterSpacing: '-0.01em' }}>Sign In</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>CrowdHarbor Admin</div>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '28px' }}>
                Sign in to manage founder submissions, reports, payments, content, and website operations.
              </p>

              <form onSubmit={handleCredentialsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@crowdharbor.com"
                    required
                    autoFocus
                    style={inputStyle}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
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
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => { setStep('forgot'); setError(''); setInfo(''); setForgotSent(false); }}
                  style={{ background: 'none', border: 'none', fontSize: '13px', color: '#FD6628', fontWeight: 600, cursor: 'pointer' }}
                >
                  Forgot password?
                </button>
              </div>
            </>
          ) : step === 'forgot' ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(253,102,40,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <KeyRound size={16} color="#FD6628" />
                </div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#000', letterSpacing: '-0.01em' }}>Reset Password</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>CrowdHarbor Admin</div>
                </div>
              </div>

              {forgotSent ? (
                <>
                  <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '14px', fontSize: '13px', color: '#059669', lineHeight: 1.6, marginBottom: '20px' }}>
                    If an account exists for <strong>{email}</strong>, a password reset link has been sent. Check your inbox — the link expires in 30 minutes.
                  </div>
                  <button
                    onClick={() => { setStep('credentials'); setForgotSent(false); }}
                    style={{ background: 'none', border: 'none', fontSize: '13px', color: '#888', fontWeight: 600, cursor: 'pointer' }}
                  >
                    ← Back to sign in
                  </button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '28px' }}>
                    Enter your admin email and we&apos;ll send you a link to reset your password.
                  </p>

                  <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="admin@crowdharbor.com"
                        required
                        autoFocus
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
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </form>

                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                      onClick={() => { setStep('credentials'); setError(''); }}
                      style={{ background: 'none', border: 'none', fontSize: '13px', color: '#888', fontWeight: 600, cursor: 'pointer' }}
                    >
                      ← Back to sign in
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(253,102,40,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={16} color="#FD6628" />
                </div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#000', letterSpacing: '-0.01em' }}>Verify It&apos;s You</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>CrowdHarbor Admin</div>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '28px' }}>
                We sent a 6-digit code to <strong>{email}</strong>. Enter it below — it expires in 10 minutes.
              </p>

              <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>Verification Code</label>
                  <input
                    ref={codeInputRef}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={code}
                    onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    required
                    style={{ ...inputStyle, fontSize: '20px', fontWeight: 700, letterSpacing: '6px', textAlign: 'center' }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }}
                  />
                </div>

                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#DC2626' }}>
                    {error}
                  </div>
                )}

                {info && (
                  <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#059669' }}>
                    {info}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  style={{
                    background: loading || code.length !== 6 ? '#F0A070' : '#FD6628',
                    color: '#FFF', border: 'none', borderRadius: '10px',
                    padding: '12px', fontSize: '14px', fontWeight: 700,
                    cursor: loading || code.length !== 6 ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                    marginTop: '4px',
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify & Sign In'}
                </button>
              </form>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => { setStep('credentials'); setCode(''); setError(''); setInfo(''); }}
                  style={{ background: 'none', border: 'none', fontSize: '13px', color: '#888', fontWeight: 600, cursor: 'pointer' }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  style={{ background: 'none', border: 'none', fontSize: '13px', color: resendCooldown > 0 ? '#BBB' : '#FD6628', fontWeight: 600, cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer' }}
                >
                  {resendCooldown > 0 ? `Resend code (${resendCooldown}s)` : 'Resend code'}
                </button>
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#AAA', marginTop: '20px', lineHeight: 1.6 }}>
          Admin access is restricted to authorized CrowdHarbor team members.
        </p>
      </div>
    </div>
  );
}
