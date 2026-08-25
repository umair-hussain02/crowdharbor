'use client';

import { useEffect, useState } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { KPICard } from '@/components/admin/KPICard';
import { StatusPill } from '@/components/admin/StatusPill';

type ReportRow = {
  id: string;
  founder: string;
  company: string;
  service: string;
  type: string;
  status: string;
  assigned: string;
  due: string;
  updated: string;
  overdue: boolean;
};

type ReportCounts = { notStarted: number; drafting: number; readyToSend: number; delivered: number; overdue: number };

// Reports have no dedicated model yet — rows are derived from IntakeSubmission
// by /api/admin/reports (report type from service, status from submission
// status, due date = createdAt + 7 days). See that route for the exact rules.

const statusOpts = ['All', 'not-started', 'drafting', 'ready', 'sent', 'delivered'];

export default function Page() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [reports, setReports] = useState<ReportRow[]>([]);
  const [counts, setCounts] = useState<ReportCounts>({ notStarted: 0, drafting: 0, readyToSend: 0, delivered: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/admin/reports', { signal: controller.signal });
        const result = await response.json().catch(() => null);

        if (!response.ok || !result) {
          setError(result?.error || 'Could not load reports. Please try again.');
          setReports([]);
          return;
        }

        setReports(result.items);
        setCounts(result.counts);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Could not load reports. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [retryKey]);

  const filtered = reports.filter(r => {
    const q = search.toLowerCase();
    const matchQ = !q || r.founder.toLowerCase().includes(q) || r.company.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchQ && matchStatus;
  });

  return (
    <AdminLayout
      title="Reports"
      subtitle="Track readiness reviews, Sprint reports, preparation plans, and delivery status."
      action={
        <button
          title="TODO: report creation isn't wired yet — reports are currently derived from submissions automatically."
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 14px', fontSize: '13px', fontWeight: 700, cursor: 'not-allowed', opacity: 0.6 }}
        >
          <FileText size={13} /> Create Report
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}
        className="grid-cols-2 md:grid-cols-5">
        <KPICard title="Not Started" value={String(counts.notStarted)} changeType="neutral" icon={FileText} iconColor="#888" />
        <KPICard title="Drafting" value={String(counts.drafting)} changeType="neutral" icon={FileText} iconColor="#FD6628" />
        <KPICard title="Ready to Send" value={String(counts.readyToSend)} changeType="neutral" icon={CheckCircle} iconColor="#2563EB" />
        <KPICard title="Delivered" value={String(counts.delivered)} changeType="neutral" icon={CheckCircle} iconColor="#059669" />
        <KPICard title="Overdue" value={String(counts.overdue)} changeType={counts.overdue > 0 ? 'down' : 'neutral'} icon={AlertCircle} iconColor="#DC2626" />
      </div>

      {/* Filters */}
      <div style={{ background: '#FFF', borderRadius: '18px', padding: '18px', border: '1px solid #E0E0E0', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F5F5EE', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '8px 14px', flex: 1, minWidth: '200px' }}>
          <Search size={14} color="#888" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search founder or company..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ border: '1px solid #E0E0E0', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', outline: 'none', background: '#FAFAFA', cursor: 'pointer' }}>
          {statusOpts.map(o => <option key={o} value={o}>{o === 'All' ? 'All Statuses' : o}</option>)}
        </select>
      </div>

      <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Loading reports…</div>
          </div>
        ) : error ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: '#DC2626' }}>{error}</div>
            <button
              onClick={() => setRetryKey(k => k + 1)}
              style={{ marginTop: '10px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>No reports yet.</div>
            <div style={{ fontSize: '13px', color: '#888' }}>Reports will appear here when founder reviews are started.</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                  {['Founder', 'Company', 'Service', 'Report Type', 'Status', 'Assigned', 'Due Date', 'Updated', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #F5F5EE' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAF8'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>{r.founder}</td>
                    <td style={{ padding: '13px 14px', fontSize: '13px', color: '#444', whiteSpace: 'nowrap' }}>{r.company}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#555', whiteSpace: 'nowrap' }}>{r.service}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#666', whiteSpace: 'nowrap' }}>{r.type}</td>
                    <td style={{ padding: '13px 14px' }}><StatusPill status={r.status as any} size="sm" /></td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#666' }}>{r.assigned}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: r.overdue ? '#DC2626' : '#888', fontWeight: r.overdue ? 700 : 400, whiteSpace: 'nowrap' }}>{r.due}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#AAA', whiteSpace: 'nowrap' }}>{r.updated}</td>
                    <td style={{ padding: '13px 14px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link href={`/admin/submissions/${r.id}`} style={{ fontSize: '12px', color: '#FD6628', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>Open</Link>
                        <button
                          title="TODO: report file upload isn't wired yet"
                          disabled
                          style={{ fontSize: '12px', color: '#BBB', background: 'none', border: 'none', cursor: 'not-allowed' }}
                        >
                          Upload
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
