'use client';

import { CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatusPill } from '@/components/admin/StatusPill';
import { usePolling } from '@/lib/hooks/usePolling';

// System Health, Recent Error Logs, and Form Health below have no backing
// model (no health-check system, no error-log table) — they stay static/mock
// and unpolled, same as before this chunk. Only Web Vitals data is wired here.
const systemHealth = [
  { label: 'Website', status: 'healthy', note: 'All pages reachable' },
  { label: 'Database', status: 'healthy', note: 'Connected' },
  { label: 'File Uploads', status: 'healthy', note: 'Storage accessible' },
  { label: 'Stripe Payments', status: 'warning', note: 'Webhook pending verification' },
  { label: 'Email Service', status: 'healthy', note: 'Delivery active' },
  { label: 'Admin Login', status: 'healthy', note: 'Auth working' },
  { label: 'Blog CMS', status: 'healthy', note: 'Content accessible' },
  { label: 'Analytics Tracking', status: 'not-configured', note: 'GA4 not connected' },
];

const errorLogs = [
  { time: 'Jun 2, 2026 09:12', page: '/intake', type: 'Upload Error', severity: 'warning', status: 'resolved' },
  { time: 'Jun 1, 2026 17:44', page: '/payments', type: 'Stripe Webhook', severity: 'warning', status: 'pending' },
  { time: 'May 31, 2026 11:22', page: '/*', type: '404 Error', severity: 'info', status: 'resolved' },
  { time: 'May 30, 2026 08:15', page: '/contact', type: 'Form Submit Error', severity: 'info', status: 'resolved' },
];

const formHealth = [
  { label: 'Intake Submissions Today', value: '7' },
  { label: 'Failed Submissions', value: '0' },
  { label: 'Upload Failures (7d)', value: '1' },
  { label: 'Payment Redirect Failures', value: '0' },
  { label: 'Contact Form Failures', value: '0' },
];

type MetricName = 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB';
type Rating = 'good' | 'needs-improvement' | 'poor';

type PerformanceData = {
  averages: Partial<Record<MetricName, { value: number; rating: Rating; samples: number }>>;
  ratingCounts: Record<string, number>;
  recentSlowPages: { path: string; issues: number; worstRating: Rating; metrics: string[]; lastSeen: string }[];
  trend: { date: string; lcp: number }[];
  totalSamples: number;
};

const METRIC_LABELS: Record<MetricName, string> = {
  LCP: 'Largest Contentful Paint',
  INP: 'Interaction to Next Paint',
  CLS: 'Cumulative Layout Shift',
  FCP: 'First Contentful Paint',
  TTFB: 'Time to First Byte',
};

function formatMetricValue(name: MetricName, value: number) {
  if (name === 'CLS') return value.toFixed(3);
  if (value >= 1000) return `${(value / 1000).toFixed(2)}s`;
  return `${Math.round(value)}ms`;
}

function ratingIcon(rating: Rating) {
  if (rating === 'good') return <CheckCircle size={14} color="#059669" />;
  if (rating === 'needs-improvement') return <AlertTriangle size={14} color="#D97706" />;
  return <XCircle size={14} color="#DC2626" />;
}

async function fetchPerformance(): Promise<PerformanceData> {
  const response = await fetch('/api/admin/performance');
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) {
    throw new Error(result?.error || 'Could not load performance metrics.');
  }
  return result;
}

export default function Page() {
  const { data, loading, error, lastUpdated, refresh } = usePolling(fetchPerformance, { intervalMs: 30000 });
  const metricOrder: MetricName[] = ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'];

  return (
    <AdminLayout
      title="Website Performance"
      subtitle="Monitor site speed, system health, form errors, upload issues, and recent website errors."
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {lastUpdated && (
            <span style={{ fontSize: '11px', color: '#AAA' }}>
              Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button onClick={refresh} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E0E0E0', borderRadius: '9px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      }
    >
      {loading ? (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '60px', border: '1px solid #E0E0E0', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700 }}>Loading performance data…</div>
        </div>
      ) : error ? (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '60px', border: '1px solid #E0E0E0', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#DC2626', marginBottom: '10px' }}>{error}</div>
          <button onClick={refresh} style={{ background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      ) : data && (
        <>
          {/* Speed overview */}
          <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Speed Overview — Core Web Vitals</div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Last 30 days · {data.totalSamples.toLocaleString()} real visitor samples</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}
              className="grid-cols-2 md:grid-cols-3">
              {metricOrder.map((name) => {
                const m = data.averages[name];
                return (
                  <div key={name} style={{ padding: '14px', background: '#F5F5EE', borderRadius: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#888', fontWeight: 600, marginBottom: '6px' }}>{METRIC_LABELS[name]}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                        {m ? formatMetricValue(name, m.value) : '—'}
                      </span>
                      {m ? ratingIcon(m.rating) : null}
                    </div>
                    <div style={{ fontSize: '11px', color: '#AAA', marginTop: '4px' }}>{m ? `${m.samples} samples` : 'No data yet'}</div>
                  </div>
                );
              })}
              <div style={{ padding: '14px', background: '#F5F5EE', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#888', fontWeight: 600, marginBottom: '6px' }}>Lighthouse Performance Score</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', color: '#D97706' }}>TODO</span>
                </div>
                <div style={{ fontSize: '11px', color: '#AAA', marginTop: '4px' }}>No Lighthouse CI integration yet</div>
              </div>
            </div>
          </div>

          {/* LCP trend + rating breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}
            className="grid-cols-1 md:grid-cols-2">
            <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>LCP Trend</div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '18px' }}>Average per day, last 30 days</div>
              {data.trend.length === 0 ? (
                <div style={{ padding: '30px 0', textAlign: 'center', fontSize: '12px', color: '#888' }}>No LCP samples yet.</div>
              ) : (
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={data.trend}>
                    <defs>
                      <linearGradient id="lcpGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FD6628" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#FD6628" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0E8" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#AAA' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#AAA' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E0E0E0', fontSize: '12px' }} formatter={(v: number) => [`${v}ms`, 'Avg LCP']} />
                    <Area type="monotone" dataKey="lcp" stroke="#FD6628" strokeWidth={2} fill="url(#lcpGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Rating Breakdown</div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '18px' }}>All vitals, last 30 days</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {([['good', '#059669', 'Good'], ['needs-improvement', '#D97706', 'Needs Improvement'], ['poor', '#DC2626', 'Poor']] as const).map(([key, color, label]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                      <span style={{ fontSize: '13px', color: '#444' }}>{label}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#000' }}>{data.ratingCounts[key] ?? 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System health + form health */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}
            className="grid-cols-1 md:grid-cols-2">
            <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>System Health</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {systemHealth.map(s => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{s.label}</div>
                      <div style={{ fontSize: '11px', color: '#AAA' }}>{s.note}</div>
                    </div>
                    <StatusPill status={s.status as any} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0', flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Form Health</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {formHealth.map(f => (
                    <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: '#555' }}>{f.label}</span>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: f.value !== '0' && f.label !== 'Intake Submissions Today' ? '#D97706' : '#000' }}>{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent slow pages */}
          <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0E8', fontSize: '14px', fontWeight: 700 }}>Recent Slow Pages</div>
            {data.recentSlowPages.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', fontSize: '12px', color: '#888' }}>No needs-improvement/poor samples in the last 30 days.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                      {['Page', 'Issues', 'Worst Rating', 'Metrics', 'Last Seen'].map(h => (
                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentSlowPages.map(p => (
                      <tr key={p.path} style={{ borderBottom: '1px solid #F5F5EE' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAF8'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                        <td style={{ padding: '12px 14px', fontSize: '13px', fontFamily: 'monospace', fontWeight: 500 }}>{p.path}</td>
                        <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 700 }}>{p.issues}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: p.worstRating === 'poor' ? '#DC2626' : '#D97706', background: p.worstRating === 'poor' ? 'rgba(220,38,38,0.1)' : 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '999px' }}>
                            {p.worstRating === 'poor' ? 'Poor' : 'Needs Improvement'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '12px', color: '#666' }}>{p.metrics.join(', ')}</td>
                        <td style={{ padding: '12px 14px', fontSize: '12px', color: '#AAA' }}>{p.lastSeen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Error logs — still static/mock, no error-log model exists yet */}
      <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0E8', fontSize: '14px', fontWeight: 700 }}>Recent Error Logs</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                {['Time', 'Page', 'Error Type', 'Severity', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {errorLogs.map((e, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F5F5EE' }}>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: '#888', whiteSpace: 'nowrap' }}>{e.time}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontFamily: 'monospace' }}>{e.page}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500 }}>{e.type}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700,
                      color: e.severity === 'warning' ? '#D97706' : '#888',
                      background: e.severity === 'warning' ? 'rgba(245,158,11,0.1)' : 'rgba(0,0,0,0.05)',
                      padding: '2px 8px', borderRadius: '999px' }}>
                      {e.severity}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700,
                      color: e.status === 'resolved' ? '#059669' : '#D97706',
                      background: e.status === 'resolved' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                      padding: '2px 8px', borderRadius: '999px' }}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
