'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatusPill } from '@/components/admin/StatusPill';
import type { ContactMessageListItem } from '@/lib/admin/contactMessages';

const statusOptions = ['All', 'new', 'read', 'archived'];
const perPage = 10;

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export default function Page() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [items, setItems] = useState<ContactMessageListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams();
        if (search.trim()) params.set('search', search.trim());
        if (statusFilter !== 'All') params.set('status', statusFilter);
        params.set('page', String(page));
        params.set('perPage', String(perPage));

        const response = await fetch(`/api/admin/contact-messages?${params.toString()}`, { signal: controller.signal });
        const result = await response.json().catch(() => null);

        if (!response.ok || !result) {
          setError(result?.error || 'Could not load contact messages. Please try again.');
          setItems([]);
          setTotal(0);
          setTotalPages(1);
          return;
        }

        setItems(result.items);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Could not load contact messages. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, statusFilter, page, retryKey]);

  return (
    <AdminLayout
      title="Contact Messages"
      subtitle="Review and manage messages submitted through the contact form."
    >
      {/* Search + Filters */}
      <div style={{ background: '#FFF', borderRadius: '18px', padding: '20px', border: '1px solid #E0E0E0', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F5F5EE', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '8px 14px', flex: 1, minWidth: '200px' }}>
            <Search size={14} color="#888" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search name, email, subject, or message..."
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }}
            />
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: showFilters ? 'rgba(253,102,40,0.1)' : '#F5F5EE', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: showFilters ? '#FD6628' : '#444' }}
          >
            <Filter size={13} /> Filters
          </button>
        </div>

        {showFilters && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</label>
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                style={{ border: '1px solid #E0E0E0', borderRadius: '8px', padding: '6px 10px', fontSize: '12px', outline: 'none', background: '#FAFAFA', cursor: 'pointer' }}
              >
                {statusOptions.map(o => <option key={o} value={o}>{o === 'All' ? 'All Status' : o}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>{total} message{total !== 1 ? 's' : ''}</span>
        </div>

        {loading ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>Loading messages…</div>
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
        ) : items.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>No messages found.</div>
            <div style={{ fontSize: '13px', color: '#888' }}>Try adjusting filters or check again after new contact messages arrive.</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                  {['Name', 'Email', 'Subject', 'Message', 'Status', 'Date', ''].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #F5F5EE', transition: 'background 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAF8'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>{m.name}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#666' }}>{m.email}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#555', whiteSpace: 'nowrap' }}>{m.inquiryType}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#666', maxWidth: '260px' }}>{truncate(m.message, 60)}</td>
                    <td style={{ padding: '13px 14px' }}><StatusPill status={m.status as any} size="sm" /></td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#AAA', whiteSpace: 'nowrap' }}>{m.date}</td>
                    <td style={{ padding: '13px 14px' }}>
                      <Link href={`/admin/contact-messages/${m.id}`} style={{ fontSize: '12px', fontWeight: 700, color: '#FD6628', textDecoration: 'none', whiteSpace: 'nowrap' }}>View →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ padding: '14px 20px', borderTop: '1px solid #F0F0E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: '#888' }}>Page {page} of {totalPages}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ padding: '6px 10px', borderRadius: '7px', border: '1px solid #E0E0E0', background: '#FFF', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}>
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                style={{ padding: '6px 10px', borderRadius: '7px', border: '1px solid #E0E0E0', background: '#FFF', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
