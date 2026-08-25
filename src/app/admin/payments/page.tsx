'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, AlertCircle, RefreshCw, Search, Download } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { KPICard } from '@/components/admin/KPICard';
import { StatusPill } from '@/components/admin/StatusPill';

const payments = [
  { id: 'pi_001', founder: 'James Okafor', company: 'TechFlow Ltd', service: 'Capital Pathway Sprint', amount: '€895', currency: 'EUR', status: 'paid', stripeId: 'pi_3Oxyz123', date: 'Jun 2, 2026' },
  { id: 'pi_002', founder: 'Amara Nwosu', company: 'HealthStart', service: 'Readiness Review', amount: '€595', currency: 'EUR', status: 'paid', stripeId: 'pi_3Oabc456', date: 'Jun 1, 2026' },
  { id: 'pi_003', founder: 'Luca Bianchi', company: 'GreenData', service: 'Prep Program', amount: '€2,400', currency: 'EUR', status: 'pending', stripeId: '—', date: 'May 31, 2026' },
  { id: 'pi_004', founder: 'Priya Sharma', company: 'AgroTech', service: 'Prep Program', amount: '€2,400', currency: 'EUR', status: 'failed', stripeId: 'pi_3Odef789', date: 'May 28, 2026' },
  { id: 'pi_005', founder: 'Kofi Asante', company: 'EduLink', service: 'Readiness Review', amount: '€595', currency: 'EUR', status: 'paid', stripeId: 'pi_3Oghi012', date: 'May 29, 2026' },
  { id: 'pi_006', founder: 'Yuki Tanaka', company: 'Robotics.io', service: 'Capital Pathway Sprint', amount: '€895', currency: 'EUR', status: 'link-sent', stripeId: '—', date: 'May 26, 2026' },
  { id: 'pi_007', founder: 'Marc Dupont', company: 'CleanEnergy', service: 'Readiness Review', amount: '€595', currency: 'EUR', status: 'refunded', stripeId: 'pi_3Ojkl345', date: 'May 27, 2026' },
];

const statusOpts = ['All', 'paid', 'pending', 'failed', 'link-sent', 'refunded'];

export default function Page() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = payments.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.founder.toLowerCase().includes(q) || p.company.toLowerCase().includes(q) || p.stripeId.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchQ && matchStatus;
  });

  return (
    <AdminLayout
      title="Payments"
      subtitle="Track Stripe payments, pending reviews, failed payments, refunds, and service revenue."
      action={
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 14px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
          <Download size={13} /> Export CSV
        </button>
      }
    >
      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}
        className="grid-cols-2 md:grid-cols-3">
        <KPICard title="Total Revenue" value="€8,450" change="+€1,200 this month" changeType="up" icon={DollarSign} iconColor="#059669" />
        <KPICard title="Completed Payments" value="12" change="—" changeType="neutral" icon={TrendingUp} iconColor="#059669" />
        <KPICard title="Pending Payments" value="3" change="2 link sent" changeType="neutral" icon={AlertCircle} iconColor="#D97706" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}
        className="grid-cols-2 md:grid-cols-3">
        <KPICard title="Failed Payments" value="2" change="Needs follow-up" changeType="down" icon={AlertCircle} iconColor="#DC2626" />
        <KPICard title="Refunds" value="1" change="—" changeType="neutral" icon={RefreshCw} iconColor="#888" />
        <KPICard title="Avg Order Value" value="€704" change="—" changeType="neutral" icon={DollarSign} />
      </div>

      {/* Search + filter */}
      <div style={{ background: '#FFF', borderRadius: '18px', padding: '18px', border: '1px solid #E0E0E0', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F5F5EE', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '8px 14px', flex: 1, minWidth: '200px' }}>
          <Search size={14} color="#888" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search founder, company, Stripe ID..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ border: '1px solid #E0E0E0', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', outline: 'none', background: '#FAFAFA', cursor: 'pointer' }}>
          {statusOpts.map(o => <option key={o} value={o}>{o === 'All' ? 'All Statuses' : o}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                {['Founder', 'Company', 'Service', 'Amount', 'Status', 'Stripe ID', 'Date', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F5F5EE' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAF8'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                  <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600 }}>{p.founder}</td>
                  <td style={{ padding: '13px 14px', fontSize: '13px', color: '#444' }}>{p.company}</td>
                  <td style={{ padding: '13px 14px', fontSize: '12px', color: '#555', whiteSpace: 'nowrap' }}>{p.service}</td>
                  <td style={{ padding: '13px 14px', fontSize: '14px', fontWeight: 700 }}>{p.amount}</td>
                  <td style={{ padding: '13px 14px' }}><StatusPill status={p.status as any} size="sm" /></td>
                  <td style={{ padding: '13px 14px', fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>{p.stripeId}</td>
                  <td style={{ padding: '13px 14px', fontSize: '12px', color: '#AAA', whiteSpace: 'nowrap' }}>{p.date}</td>
                  <td style={{ padding: '13px 14px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {p.status === 'pending' || p.status === 'failed' ? (
                        <button style={{ fontSize: '12px', color: '#FD6628', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Send Link</button>
                      ) : null}
                      <button style={{ fontSize: '12px', color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#888', fontSize: '14px' }}>No payments found.</div>
        )}
      </div>
    </AdminLayout>
  );
}
