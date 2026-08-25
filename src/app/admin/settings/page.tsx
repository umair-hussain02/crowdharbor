'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Save, AlertCircle } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { ServiceListItem } from '@/lib/admin/services';

const tabs = ['General', 'Services', 'Payments', 'Email', 'Integrations', 'Admin Users', 'Legal'];

const integrations = [
  { name: 'Google Analytics', status: 'not-configured', note: 'Add GA4 Measurement ID' },
  { name: 'Google Search Console', status: 'not-configured', note: 'Verify site ownership' },
  { name: 'Stripe', status: 'warning', note: 'Webhook pending' },
  { name: 'Supabase', status: 'healthy', note: 'Connected' },
  { name: 'Resend (Email)', status: 'healthy', note: 'Sending active' },
  { name: 'Sentry', status: 'not-configured', note: 'Error tracking not set up' },
  { name: 'PostHog', status: 'not-configured', note: 'Analytics not connected' },
];

const adminUsers = [
  { name: 'Admin', email: 'admin@crowdharbor.com', role: 'Admin', lastLogin: 'Jun 2, 2026' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('General');
  const [saved, setSaved] = useState(false);
  const [general, setGeneral] = useState({
    siteName: 'CrowdHarbor', adminEmail: 'admin@crowdharbor.com',
    supportEmail: 'hello@crowdharbor.com', contactEmail: 'hello@crowdharbor.com',
    timezone: 'Europe/Dublin', currency: 'EUR',
  });

  const [serviceList, setServiceList] = useState<ServiceListItem[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState('');
  const [servicesRetryKey, setServicesRetryKey] = useState(0);
  const [servicesSaveStatus, setServicesSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [servicesSaveError, setServicesSaveError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setServicesLoading(true);
      setServicesError('');

      try {
        const response = await fetch('/api/admin/settings/services');
        const result = await response.json().catch(() => null);

        if (cancelled) return;

        if (!response.ok || !result?.items) {
          setServicesError(result?.error || 'Could not load services.');
          return;
        }

        setServiceList(result.items);
      } catch {
        if (!cancelled) setServicesError('Could not load services.');
      } finally {
        if (!cancelled) setServicesLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [servicesRetryKey]);

  const handleSave = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveServices = async () => {
    if (servicesSaveStatus === 'saving') return;
    setServicesSaveStatus('saving');
    setServicesSaveError('');

    try {
      const response = await fetch('/api/admin/settings/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services: serviceList.map(s => ({ id: s.id, price: s.price, isActive: s.isActive })),
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.items) {
        setServicesSaveError(result?.error || 'Could not save changes.');
        setServicesSaveStatus('error');
        return;
      }

      setServiceList(result.items);
      setServicesSaveStatus('saved');
      setTimeout(() => setServicesSaveStatus('idle'), 2000);
    } catch {
      setServicesSaveError('Could not reach the server. Please try again.');
      setServicesSaveStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', padding: '9px 12px', borderRadius: '9px',
    border: '1.5px solid #E0E0E0', outline: 'none',
    fontSize: '13px', color: '#000', background: '#FAFAFA',
    boxSizing: 'border-box' as const, fontFamily: 'Manrope, sans-serif',
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#444', marginBottom: '6px' }}>{label}</label>
      {children}
    </div>
  );

  return (
    <AdminLayout title="Settings" subtitle="Manage website, service, payment, email, integration, and admin settings.">
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '2px' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            style={{
              padding: '8px 16px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              background: activeTab === t ? '#FD6628' : '#FFF',
              color: activeTab === t ? '#FFF' : '#555',
              border: activeTab === t ? 'none' : '1px solid #E0E0E0',
            }}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'General' && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '560px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #F0F0E8', paddingBottom: '10px' }}>General Settings</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <Field label="Site Name"><input value={general.siteName} onChange={e => setGeneral(g => ({ ...g, siteName: e.target.value }))} style={inputStyle} onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }} onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} /></Field>
            <Field label="Timezone">
              <select value={general.timezone} onChange={e => setGeneral(g => ({ ...g, timezone: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                {['Europe/Dublin', 'Europe/London', 'Europe/Berlin', 'America/New_York', 'America/Los_Angeles', 'UTC'].map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Admin Email"><input value={general.adminEmail} onChange={e => setGeneral(g => ({ ...g, adminEmail: e.target.value }))} style={inputStyle} onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }} onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} /></Field>
          <Field label="Support Email"><input value={general.supportEmail} onChange={e => setGeneral(g => ({ ...g, supportEmail: e.target.value }))} style={inputStyle} onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }} onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} /></Field>
          <Field label="Contact Email"><input value={general.contactEmail} onChange={e => setGeneral(g => ({ ...g, contactEmail: e.target.value }))} style={inputStyle} onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }} onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} /></Field>
          <Field label="Default Currency">
            <select value={general.currency} onChange={e => setGeneral(g => ({ ...g, currency: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
              {['EUR', 'GBP', 'USD'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>
            {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
          </button>
        </div>
      )}

      {activeTab === 'Services' && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0', maxWidth: '640px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #F0F0E8', paddingBottom: '10px', marginBottom: '20px' }}>Services Settings</div>

          {servicesLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '13px', color: '#888' }}>Loading services…</div>
          ) : servicesError ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '13px', color: '#DC2626', marginBottom: '10px' }}>{servicesError}</div>
              <button onClick={() => setServicesRetryKey(k => k + 1)} style={{ background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Retry
              </button>
            </div>
          ) : serviceList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '13px', color: '#888' }}>No services yet.</div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {serviceList.map((s, i) => (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid #E8E8E0', borderRadius: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{s.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type="number" min={0} step="0.01" disabled={s.price === null} value={s.price ?? ''}
                          onChange={e => setServiceList(list => list.map((item, j) => j === i ? { ...item, price: e.target.value === '' ? 0 : Number(e.target.value) } : item))}
                          style={{ border: '1px solid #E0E0E0', borderRadius: '7px', padding: '5px 9px', fontSize: '13px', outline: 'none', width: '100px', background: s.price === null ? '#F5F5EE' : '#FFF' }}
                          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
                        <span style={{ fontSize: '12px', color: '#888' }}>{s.currency}</span>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '12px', color: '#555' }}>
                          <input type="checkbox" checked={s.price === null} onChange={e => setServiceList(list => list.map((item, j) => j === i ? { ...item, price: e.target.checked ? null : 0 } : item))} style={{ accentColor: '#FD6628' }} />
                          Custom pricing
                        </label>
                      </div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#555' }}>
                      <input type="checkbox" checked={s.isActive} onChange={e => setServiceList(list => list.map((item, j) => j === i ? { ...item, isActive: e.target.checked } : item))} style={{ accentColor: '#FD6628' }} />
                      Visible
                    </label>
                  </div>
                ))}
              </div>

              {servicesSaveStatus === 'error' && (
                <div style={{ marginTop: '16px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#DC2626', fontWeight: 600 }}>
                  {servicesSaveError}
                </div>
              )}

              <button onClick={handleSaveServices} disabled={servicesSaveStatus === 'saving'} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: servicesSaveStatus === 'saving' ? 'not-allowed' : 'pointer', opacity: servicesSaveStatus === 'saving' ? 0.7 : 1, marginTop: '20px' }}>
                {servicesSaveStatus === 'saving' ? 'Saving...' : servicesSaveStatus === 'saved' ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
              </button>
            </>
          )}
        </div>
      )}

      {activeTab === 'Payments' && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0', maxWidth: '560px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #F0F0E8', paddingBottom: '10px', marginBottom: '20px' }}>Payment Settings</div>
          {[
            { label: 'Stripe Connection', value: '🟡 Webhook pending verification' },
            { label: 'Payment Mode', value: 'Live' },
            { label: 'Currency', value: 'EUR' },
            { label: 'Webhook Status', value: '⚠ Needs verification' },
            { label: 'Payment Success URL', value: '/payment-success' },
            { label: 'Payment Failed URL', value: '/payment-failed' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', gap: '24px', marginBottom: '14px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#888', minWidth: '180px' }}>{f.label}</span>
              <span style={{ fontSize: '13px', color: '#222' }}>{f.value}</span>
            </div>
          ))}
          <div style={{ marginTop: '20px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', padding: '12px 16px', display: 'flex', gap: '10px' }}>
            <AlertCircle size={15} color="#D97706" style={{ flexShrink: 0, marginTop: '1px' }} />
            <p style={{ fontSize: '12px', color: '#92400E', margin: 0, lineHeight: 1.6 }}>Stripe webhook needs to be verified. Configure your Stripe secret key and webhook endpoint in environment variables.</p>
          </div>
        </div>
      )}

      {activeTab === 'Email' && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0', maxWidth: '560px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #F0F0E8', paddingBottom: '10px', marginBottom: '20px' }}>Email Settings</div>
          {[
            { label: 'Sender Name', placeholder: 'CrowdHarbor' },
            { label: 'Sender Email', placeholder: 'hello@crowdharbor.com' },
            { label: 'Admin Notification Email', placeholder: 'admin@crowdharbor.com' },
            { label: 'Support Email', placeholder: 'hello@crowdharbor.com' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#444', marginBottom: '6px' }}>{f.label}</label>
              <input placeholder={f.placeholder} style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
            </div>
          ))}
          <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
          </button>
        </div>
      )}

      {activeTab === 'Integrations' && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0', maxWidth: '640px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #F0F0E8', paddingBottom: '10px', marginBottom: '20px' }}>Integrations</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {integrations.map(int => (
              <div key={int.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', border: '1px solid #E8E8E0', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{int.name}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>{int.note}</div>
                </div>
                <span style={{
                  fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px',
                  background: int.status === 'healthy' ? 'rgba(16,185,129,0.1)' : int.status === 'warning' ? 'rgba(245,158,11,0.1)' : 'rgba(0,0,0,0.06)',
                  color: int.status === 'healthy' ? '#059669' : int.status === 'warning' ? '#D97706' : '#888',
                }}>
                  {int.status === 'healthy' ? 'Connected' : int.status === 'warning' ? 'Warning' : 'Not configured'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Admin Users' && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0', maxWidth: '640px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F0F0E8', paddingBottom: '10px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>Admin Users</div>
            <button style={{ background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Add Admin</button>
          </div>
          {adminUsers.map(u => (
            <div key={u.email} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 16px', border: '1px solid #E8E8E0', borderRadius: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FD6628', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>
                {u.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{u.name}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{u.email}</div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(253,102,40,0.1)', color: '#FD6628', padding: '2px 8px', borderRadius: '999px' }}>{u.role}</span>
              <span style={{ fontSize: '12px', color: '#AAA' }}>{u.lastLogin}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Legal' && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0', maxWidth: '560px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid #F0F0E8', paddingBottom: '10px', marginBottom: '20px' }}>Legal Document Dates</div>
          {[['Privacy Policy', 'Apr 15, 2026'], ['Terms of Service', 'Apr 15, 2026'], ['Disclaimer', 'Apr 15, 2026']].map(([doc, date]) => (
            <div key={doc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', padding: '12px 16px', border: '1px solid #E8E8E0', borderRadius: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{doc}</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Last updated: {date}</span>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
