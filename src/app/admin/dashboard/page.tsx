'use client';

import Link from 'next/link';
import { Users, DollarSign, FileText, BarChart2, CheckCircle, Clock, ArrowRight, RefreshCw, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { KPICard } from '@/components/admin/KPICard';
import { StatusPill } from '@/components/admin/StatusPill';
import { usePolling } from '@/lib/hooks/usePolling';
import type { SubmissionListItem } from '@/lib/admin/submissions';

function timeAgo(iso: string) {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

// Report Workflow and System Health below have no backing model (no Report
// model, no real health-check system) — they stay static/mock and unpolled,
// same as before this chunk. Only the data with a real source is wired here.
const reportWorkflow = [
  { label: 'Not Started', count: 4, color: '#888' },
  { label: 'Drafting', count: 6, color: '#FD6628' },
  { label: 'Ready to Send', count: 3, color: '#2563EB' },
  { label: 'Delivered', count: 18, color: '#059669' },
  { label: 'Overdue', count: 2, color: '#DC2626' },
];

const systemHealth = [
  { label: 'Website', status: 'healthy' },
  { label: 'Intake Form', status: 'healthy' },
  { label: 'File Uploads', status: 'healthy' },
  { label: 'Stripe Payments', status: 'warning' },
  { label: 'Email Service', status: 'healthy' },
  { label: 'Analytics', status: 'not-configured' },
];

type DashboardData = {
  kpis: {
    totalVisitors: number;
    pageViews: number;
    intakeStarts: number;
    intakeSubmissions: number;
    contactSubmissions: number;
    newSubmissionsThisWeek: number;
    conversionRate: number;
    revenue: number | null;
    pendingPayments: number | null;
    reportsPending: number | null;
    reportsDelivered: number | null;
  };
  topCta: { label: string; count: number } | null;
  topSource: { source: string; count: number } | null;
  visitorChart: { date: string; visitors: number }[];
  funnel: { step: string; count: number }[];
  recentSubmissions: SubmissionListItem[];
  recentEvents: { eventName: string; path: string | null; createdAt: string }[];
  generatedAt: string;
};

async function fetchDashboard(): Promise<DashboardData> {
  const response = await fetch('/api/admin/dashboard');
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) {
    throw new Error(result?.error || 'Could not load dashboard.');
  }
  return result;
}

export default function Page() {
  const { data, loading, error, lastUpdated, refresh } = usePolling(fetchDashboard, { intervalMs: 20000 });

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Track submissions, payments, reports, content, and website performance."
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {lastUpdated && (
            <span style={{ fontSize: '11px', color: '#AAA' }}>
              Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button onClick={refresh} title="Refresh now" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#FFF', border: '1px solid #E0E0E0', borderRadius: '9px', padding: '7px 10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: '#555' }}>
            <RefreshCw size={13} />
          </button>
          <Link href="/admin/submissions" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#FD6628', color: '#FFF',
            padding: '8px 16px', borderRadius: '9px',
            fontSize: '13px', fontWeight: 700, textDecoration: 'none',
          }}>
            View Submissions
          </Link>
        </div>
      }
    >
      {loading ? (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '60px', border: '1px solid #E0E0E0', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700 }}>Loading dashboard…</div>
        </div>
      ) : error ? (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '60px', border: '1px solid #E0E0E0', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#DC2626', marginBottom: '10px' }}>{error}</div>
          <button onClick={refresh} style={{ background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      ) : data && (
        <>
          {/* KPI Cards — kept to the original 8-card layout. Page Views, Intake
              Submissions, Contact Submissions, Top CTA, and Top Source are
              real and computed, but live on the Analytics tab instead, since
              they're analytics-style breakdowns rather than overview KPIs. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}
            className="grid-cols-2 md:grid-cols-4">
            <KPICard title="Total Visitors" value={data.kpis.totalVisitors.toLocaleString()} change="Last 30 days" changeType="neutral" icon={Users} />
            <KPICard title="Intake Starts" value={data.kpis.intakeStarts.toLocaleString()} change="Last 30 days" changeType="neutral" icon={FileText} />
            <KPICard title="New Submissions" value={data.kpis.newSubmissionsThisWeek.toLocaleString()} change="Last 7 days" changeType="neutral" icon={FileText} iconColor="#2563EB" />
            <KPICard title="Revenue" value="TODO" change="No Payment model yet" changeType="neutral" icon={DollarSign} iconColor="#059669" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}
            className="grid-cols-2 md:grid-cols-4">
            <KPICard title="Completion Rate" value={`${data.kpis.conversionRate}%`} change="Intake starts → submissions" changeType="neutral" icon={BarChart2} iconColor="#2563EB" />
            <KPICard title="Pending Payments" value="TODO" change="No Payment model yet" changeType="neutral" icon={DollarSign} iconColor="#D97706" />
            <KPICard title="Reports Pending" value="TODO" change="No Report model yet" changeType="neutral" icon={Clock} iconColor="#D97706" />
            <KPICard title="Reports Delivered" value="TODO" change="No Report model yet" changeType="neutral" icon={CheckCircle} iconColor="#059669" />
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}
            className="grid-cols-1 md:grid-cols-2">
            <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Website Visitors</div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '18px' }}>Last 30 days</div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={data.visitorChart}>
                  <defs>
                    <linearGradient id="vis" x1="0" y1="0" x2="0" y2="1">
                      <stop key="top" offset="5%" stopColor="#FD6628" stopOpacity={0.15} />
                      <stop key="bottom" offset="95%" stopColor="#FD6628" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0E8" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#AAA' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#AAA' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E0E0E0', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="visitors" stroke="#FD6628" strokeWidth={2} fill="url(#vis)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Conversion funnel */}
            <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Conversion Funnel</div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '18px' }}>Last 30 days · payment stage not tracked yet</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.funnel.map((f, i) => {
                  const base = data.funnel[0].count;
                  const pct = base > 0 ? Math.round((f.count / base) * 100) : 0;
                  return (
                    <div key={f.step}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#555', fontWeight: 500 }}>{f.step}</span>
                        <span style={{ fontSize: '12px', fontWeight: 700 }}>{f.count.toLocaleString()} <span style={{ color: '#AAA', fontWeight: 400 }}>({pct}%)</span></span>
                      </div>
                      <div style={{ height: '6px', background: '#F5F5EE', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: '#FD6628', borderRadius: '999px', opacity: 1 - i * 0.12 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent submissions */}
          <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>Recent Submissions</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Latest founder intake submissions</div>
              </div>
              <Link href="/admin/submissions" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 700, color: '#FD6628', textDecoration: 'none' }}>
                View all <ArrowRight size={13} />
              </Link>
            </div>
            {data.recentSubmissions.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', fontSize: '13px', color: '#888' }}>No submissions yet.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0F0E8' }}>
                      {['Founder', 'Company', 'Service', 'Stage', 'Status', 'Date', ''].map(h => (
                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentSubmissions.map(r => (
                      <tr key={r.id} style={{ borderBottom: '1px solid #F5F5EE' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAF8'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                        <td style={{ padding: '12px 12px', fontSize: '13px', fontWeight: 600 }}>{r.founder}</td>
                        <td style={{ padding: '12px 12px', fontSize: '13px', color: '#444' }}>{r.company}</td>
                        <td style={{ padding: '12px 12px', fontSize: '12px', color: '#666' }}>{r.service}</td>
                        <td style={{ padding: '12px 12px', fontSize: '12px', color: '#666' }}>{r.stage}</td>
                        <td style={{ padding: '12px 12px' }}><StatusPill status={r.status} size="sm" /></td>
                        <td style={{ padding: '12px 12px', fontSize: '12px', color: '#AAA', whiteSpace: 'nowrap' }}>{r.date}</td>
                        <td style={{ padding: '12px 12px' }}>
                          <Link href={`/admin/submissions/${r.id}`} style={{ fontSize: '12px', fontWeight: 700, color: '#FD6628', textDecoration: 'none' }}>View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent activity */}
          <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Activity size={15} color="#FD6628" />
              <div style={{ fontSize: '14px', fontWeight: 700 }}>Recent Activity</div>
            </div>
            {data.recentEvents.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', fontSize: '13px', color: '#888' }}>No events recorded yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.recentEvents.map((e, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: i < data.recentEvents.length - 1 ? '10px' : 0, borderBottom: i < data.recentEvents.length - 1 ? '1px solid #F5F5EE' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#FD6628', background: 'rgba(253,102,40,0.1)', padding: '2px 8px', borderRadius: '999px', fontFamily: 'monospace' }}>{e.eventName}</span>
                      {e.path && <span style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>{e.path}</span>}
                    </div>
                    <span style={{ fontSize: '11px', color: '#AAA', whiteSpace: 'nowrap' }}>{timeAgo(e.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Bottom row: report workflow + system health — still static/mock, no backing model yet */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
        className="grid-cols-1 md:grid-cols-2">
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>Report Workflow</div>
            <Link href="/admin/reports" style={{ fontSize: '12px', fontWeight: 700, color: '#FD6628', textDecoration: 'none' }}>View Reports</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reportWorkflow.map(r => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color }} />
                  <span style={{ fontSize: '13px', color: '#444' }}>{r.label}</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#000' }}>{r.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>System Health</div>
            <Link href="/admin/performance" style={{ fontSize: '12px', fontWeight: 700, color: '#FD6628', textDecoration: 'none' }}>Details</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {systemHealth.map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#444' }}>{s.label}</span>
                <StatusPill status={s.status as any} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
