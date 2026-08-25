'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Eye, Copy, Archive, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatusPill } from '@/components/admin/StatusPill';
import type { ArticleListItem } from '@/lib/admin/blog';

const categoryOpts = ['All', 'Funding Readiness', 'Pitch Deck Preparation', 'Financial Readiness', 'Data Room Basics', 'Capital Pathways', 'Accelerator Preparation', 'Crowdfunding Preparation', 'Grant Readiness', 'Founder Strategy'];
const statusOpts = ['All', 'published', 'draft', 'scheduled', 'needs-review', 'archived'];

export default function Page() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  const [items, setItems] = useState<ArticleListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);
  const [actionPending, setActionPending] = useState<string | null>(null);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams();
        if (search.trim()) params.set('search', search.trim());
        if (catFilter !== 'All') params.set('category', catFilter);
        if (statusFilter !== 'All') params.set('status', statusFilter);
        params.set('perPage', '50');

        const response = await fetch(`/api/admin/blog/articles?${params.toString()}`, { signal: controller.signal });
        const result = await response.json().catch(() => null);

        if (!response.ok || !result) {
          setError(result?.error || 'Could not load articles. Please try again.');
          setItems([]);
          setTotal(0);
          return;
        }

        setItems(result.items);
        setTotal(result.total);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Could not load articles. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, catFilter, statusFilter, retryKey]);

  const refresh = () => setRetryKey(k => k + 1);

  const duplicateArticle = async (id: string) => {
    if (actionPending) return;
    setActionPending(id);
    setActionError('');

    try {
      const response = await fetch(`/api/admin/blog/articles/${id}/duplicate`, { method: 'POST' });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setActionError(result?.error || 'Could not duplicate article.');
        return;
      }

      refresh();
    } finally {
      setActionPending(null);
    }
  };

  const deleteArticle = async (id: string) => {
    if (actionPending) return;
    setActionPending(id);
    setActionError('');

    try {
      const response = await fetch(`/api/admin/blog/articles/${id}`, { method: 'DELETE' });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setActionError(result?.error || 'Could not delete article.');
        return;
      }

      setDeleteModal(null);
      refresh();
    } finally {
      setActionPending(null);
    }
  };

  return (
    <AdminLayout
      title="Blog & Resources"
      subtitle="Create and manage founder education articles, guides, and resource content."
      action={
        <Link href="/admin/blog/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FD6628', color: '#FFF', padding: '8px 14px', borderRadius: '9px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
          <Plus size={14} /> New Article
        </Link>
      }
    >
      {/* Search + filters */}
      <div style={{ background: '#FFF', borderRadius: '18px', padding: '18px', border: '1px solid #E0E0E0', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F5F5EE', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '8px 14px', flex: 1, minWidth: '200px' }}>
          <Search size={14} color="#888" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }} />
        </div>
        {[
          { label: 'Category', value: catFilter, opts: categoryOpts, set: setCatFilter },
          { label: 'Status', value: statusFilter, opts: statusOpts, set: setStatusFilter },
        ].map(f => (
          <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '10px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
            <select value={f.value} onChange={e => f.set(e.target.value)}
              style={{ border: '1px solid #E0E0E0', borderRadius: '9px', padding: '7px 10px', fontSize: '12px', outline: 'none', background: '#FAFAFA', cursor: 'pointer' }}>
              {f.opts.map(o => <option key={o} value={o}>{o === 'All' ? `All ${f.label}` : o}</option>)}
            </select>
          </div>
        ))}
      </div>

      {actionError && (
        <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', fontSize: '13px', color: '#DC2626', fontWeight: 600 }}>
          {actionError}
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0E8' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>{total} article{total !== 1 ? 's' : ''}</span>
        </div>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>Loading articles…</div>
          </div>
        ) : error ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: '#DC2626' }}>{error}</div>
            <button onClick={refresh} style={{ marginTop: '10px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
              Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>No articles yet.</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>Create your first founder resource article.</div>
            <Link href="/admin/blog/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FD6628', color: '#FFF', padding: '9px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
              <Plus size={13} /> New Article
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                  {['Title', 'Category', 'Status', 'Author', 'Updated', 'Publish Date', 'SEO', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map(a => (
                  <tr key={a.id} style={{ borderBottom: '1px solid #F5F5EE', opacity: actionPending === a.id ? 0.5 : 1 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAF8'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    <td style={{ padding: '13px 14px', maxWidth: '260px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
                    </td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#666', whiteSpace: 'nowrap' }}>{a.category}</td>
                    <td style={{ padding: '13px 14px' }}><StatusPill status={a.status as any} size="sm" /></td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#666' }}>{a.author}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#AAA', whiteSpace: 'nowrap' }}>{a.updated}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#AAA', whiteSpace: 'nowrap' }}>{a.published}</td>
                    <td style={{ padding: '13px 14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: a.seo === 'good' ? '#059669' : '#D97706', background: a.seo === 'good' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '999px' }}>
                        {a.seo === 'good' ? 'Good' : 'Missing'}
                      </span>
                    </td>
                    <td style={{ padding: '13px 14px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Link href={`/admin/blog/${a.id}/edit`} style={{ color: '#FD6628', display: 'flex' }}><Edit size={14} /></Link>
                        <button disabled style={{ background: 'none', border: 'none', cursor: 'not-allowed', color: '#CCC', display: 'flex' }} title="Public blog preview not connected yet"><Eye size={14} /></button>
                        <button onClick={() => duplicateArticle(a.id)} disabled={actionPending === a.id} style={{ background: 'none', border: 'none', cursor: actionPending === a.id ? 'not-allowed' : 'pointer', color: '#888', display: 'flex' }}><Copy size={14} /></button>
                        <button onClick={() => setDeleteModal(a.id)} disabled={actionPending === a.id} style={{ background: 'none', border: 'none', cursor: actionPending === a.id ? 'not-allowed' : 'pointer', color: '#DC2626', display: 'flex' }}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#FFF', borderRadius: '20px', padding: '32px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: '17px', fontWeight: 800, marginBottom: '10px' }}>Delete article?</div>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '24px', lineHeight: 1.6 }}>This action cannot be undone. The article will be permanently removed.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteModal(null)} style={{ flex: 1, padding: '10px', border: '1px solid #E0E0E0', borderRadius: '10px', background: '#FFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button
                onClick={() => deleteArticle(deleteModal)}
                disabled={actionPending === deleteModal}
                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', background: '#DC2626', color: '#FFF', fontSize: '13px', fontWeight: 700, cursor: actionPending === deleteModal ? 'not-allowed' : 'pointer', opacity: actionPending === deleteModal ? 0.6 : 1 }}
              >
                {actionPending === deleteModal ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
