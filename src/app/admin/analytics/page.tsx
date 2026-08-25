'use client';

import { useState } from 'react';
import { Users, MousePointer, Eye, MessageSquare, TrendingUp, Activity, FileText, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { KPICard } from '@/components/admin/KPICard';
import { usePolling } from '@/lib/hooks/usePolling';

const periods = [
  { label: 'Today', query: () => {
    const now = new Date();
    const start = new Date(now);
    start.setUTCHours(0, 0, 0, 0);
    return `from=${start.toISOString()}&to=${now.toISOString()}`;
  } },
  { label: 'Last 7 days', query: () => 'range=7d' },
  { label: 'Last 30 days', query: () => 'range=30d' },
  { label: 'Last 90 days', query: () => 'range=90d' },
];

const DEVICE_COLORS = ['#FD6628', '#2563EB', '#D97706', '#888'];

type AnalyticsData = {
  summary: {
    totalPageViews: number;
    uniqueVisitors: number;
    sessions: number;
    ctaClicks: number;
    intakeStarts: number;
    intakeSubmissions: number;
    contactSubmissions: number;
    conversionRate: number;
  };
  timeSeries: { date: string; pageViews: number; sessions: number }[];
  topPages: { path: string; views: number }[];
  topSources: { source: string; visits: number }[];
  deviceBreakdown: { device: string; count: number; percentage: number }[];
  eventBreakdown: { eventName: string; count: number }[];
  funnel: { step: string; count: number }[];
};

async function fetchAnalytics(queryString: string): Promise<AnalyticsData> {
  const response = await fetch(`/api/admin/analytics?${queryString}`);
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) {
    throw new Error(result?.error || 'Could not load analytics.');
  }
  return result;
}

export default function Page() {
  const [period, setPeriod] = useState(periods[2]);
  const { data, loading, error, lastUpdated, refresh } = usePolling(
    () => fetchAnalytics(period.query()),
    { intervalMs: 20000, deps: [period.label] }
  );

  return (
    <AdminLayout
      title="Analytics"
      subtitle="Understand how visitors move through the website, where they convert, and where they drop off."
    >
      {/* Period filter */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        {periods.map(p => (
          <button key={p.label} onClick={() => setPeriod(p)}
            style={{
              padding: '7px 14px', borderRadius: '9px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              background: period.label === p.label ? '#FD6628' : '#FFF',
              color: period.label === p.label ? '#FFF' : '#555',
              border: period.label === p.label ? 'none' : '1px solid #E0E0E0',
              transition: 'all 0.15s',
            }}>
            {p.label}
          </button>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
          {lastUpdated && (
            <span style={{ fontSize: '11px', color: '#AAA' }}>
              Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button onClick={refresh} title="Refresh now" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#FFF', border: '1px solid #E0E0E0', borderRadius: '9px', padding: '7px 10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#555' }}>
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '60px', border: '1px solid #E0E0E0', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: 700 }}>Loading analytics…</div>
        </div>
      ) : error ? (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '60px', border: '1px solid #E0E0E0', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#DC2626', marginBottom: '10px' }}>{error}</div>
          <button onClick={refresh} style={{ background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      ) : !data ? null : (
        <>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}
            className="grid-cols-2 md:grid-cols-4">
            <KPICard title="Page Views" value={data.summary.totalPageViews.toLocaleString()} change={period.label} changeType="neutral" icon={Eye} />
            <KPICard title="Unique Visitors" value={data.summary.uniqueVisitors.toLocaleString()} change={period.label} changeType="neutral" icon={Users} iconColor="#2563EB" />
            <KPICard title="Sessions" value={data.summary.sessions.toLocaleString()} change={period.label} changeType="neutral" icon={Activity} iconColor="#059669" />
            <KPICard title="CTA Clicks" value={data.summary.ctaClicks.toLocaleString()} change={period.label} changeType="neutral" icon={MousePointer} iconColor="#D97706" />
            <KPICard title="Intake Starts" value={data.summary.intakeStarts.toLocaleString()} change={period.label} changeType="neutral" icon={FileText} />
            <KPICard title="Intake Submissions" value={data.summary.intakeSubmissions.toLocaleString()} change={period.label} changeType="neutral" icon={FileText} iconColor="#2563EB" />
            <KPICard title="Contact Submissions" value={data.summary.contactSubmissions.toLocaleString()} change={period.label} changeType="neutral" icon={MessageSquare} iconColor="#059669" />
            <KPICard title="Conversion Rate" value={`${data.summary.conversionRate}%`} change="Intake starts → submissions" changeType="neutral" icon={TrendingUp} iconColor="#D97706" />
          </div>

          {/* Time series chart + device split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', marginBottom: '24px', alignItems: 'start' }}
            className="grid-cols-1 md:grid-cols-[1fr_auto]">
            <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Page Views &amp; Sessions Over Time</div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '18px' }}>{period.label}</div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data.timeSeries}>
                  <defs>
                    <linearGradient id="pageViewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FD6628" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#FD6628" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0E8" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#AAA' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#AAA' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E0E0E0', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#FD6628" strokeWidth={2} fill="url(#pageViewsGrad)" />
                  <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#2563EB" strokeWidth={2} fill="url(#sessionsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0', minWidth: '220px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Device Split</div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Page views by device</div>
              {data.deviceBreakdown.length === 0 ? (
                <div style={{ padding: '30px 0', textAlign: 'center', fontSize: '12px', color: '#888' }}>No device data yet.</div>
              ) : (
                <>
                  <PieChart width={160} height={160}>
                    <Pie data={data.deviceBreakdown} cx={80} cy={80} innerRadius={45} outerRadius={72} dataKey="count" strokeWidth={2} stroke="#FFF">
                      {data.deviceBreakdown.map((d, i) => <Cell key={d.device} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E0E0E0', fontSize: '12px' }} />
                  </PieChart>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {data.deviceBreakdown.map((d, i) => (
                      <div key={d.device} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: DEVICE_COLORS[i % DEVICE_COLORS.length] }} />
                        <span style={{ fontSize: '12px', color: '#555', textTransform: 'capitalize' }}>{d.device}</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, marginLeft: 'auto' }}>{d.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Funnel */}
          <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Intake Conversion Funnel</div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>
              Page View → Intake Started → Intake Submitted
              <span style={{ display: 'block', marginTop: '4px', color: '#AAA' }}>
                Payment / report-delivery stages aren&apos;t tracked yet — no Payment or Report model exists.
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.funnel.map((f, i) => {
                const base = data.funnel[0].count;
                const pct = base > 0 ? Math.round((f.count / base) * 100) : 0;
                const prev = i > 0 ? data.funnel[i - 1].count : f.count;
                const dropoff = i > 0 && prev > 0 ? Math.round((1 - f.count / prev) * 100) : 0;
                return (
                  <div key={f.step}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '13px', color: '#333', fontWeight: 500 }}>{f.step}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700 }}>
                        {f.count.toLocaleString()} <span style={{ color: '#AAA', fontWeight: 400 }}>({pct}%)</span>
                        {i > 0 && <span style={{ color: '#DC2626', fontSize: '11px', fontWeight: 600, marginLeft: '8px' }}>↓ {dropoff}%</span>}
                      </span>
                    </div>
                    <div style={{ height: '8px', background: '#F5F5EE', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: '#FD6628', borderRadius: '999px', opacity: 1 - i * 0.15 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top pages + Top sources */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}
            className="grid-cols-1 md:grid-cols-2">
            <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0E8', fontSize: '14px', fontWeight: 700 }}>Top Pages</div>
              {data.topPages.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', fontSize: '12px', color: '#888' }}>No page views recorded yet.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                      {['Page', 'Views'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPages.map(p => (
                      <tr key={p.path} style={{ borderBottom: '1px solid #F5F5EE' }}>
                        <td style={{ padding: '11px 16px', fontSize: '13px', fontFamily: 'monospace' }}>{p.path}</td>
                        <td style={{ padding: '11px 16px', fontSize: '13px', fontWeight: 700 }}>{p.views.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0E8', fontSize: '14px', fontWeight: 700 }}>Top Sources</div>
              {data.topSources.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', fontSize: '12px', color: '#888' }}>No source data recorded yet.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                      {['Source', 'Visits'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.topSources.map(s => (
                      <tr key={s.source} style={{ borderBottom: '1px solid #F5F5EE' }}>
                        <td style={{ padding: '11px 16px', fontSize: '13px' }}>{s.source}</td>
                        <td style={{ padding: '11px 16px', fontSize: '13px', fontWeight: 700 }}>{s.visits.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Event breakdown */}
          <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0E8', fontSize: '14px', fontWeight: 700 }}>Event Breakdown</div>
            {data.eventBreakdown.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', fontSize: '12px', color: '#888' }}>No events recorded yet.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                    {['Event', 'Count'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.eventBreakdown.map(e => (
                    <tr key={e.eventName} style={{ borderBottom: '1px solid #F5F5EE' }}>
                      <td style={{ padding: '11px 16px', fontSize: '13px', fontFamily: 'monospace' }}>{e.eventName}</td>
                      <td style={{ padding: '11px 16px', fontSize: '13px', fontWeight: 700 }}>{e.count.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
