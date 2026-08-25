'use client';

import { useEffect, useState } from 'react';
import { Edit, CheckCircle, Save, Plus, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { PageListItem } from '@/lib/admin/pages';
import type { PageFaqListItem } from '@/lib/admin/pageFaqs';

// The only 6 pages that currently have an FAQ section on the live site.
const FAQ_ENABLED_SLUGS = ['home', 'how-it-works', 'services', 'sample-report', 'pricing', 'contact'];

type DraftFaq = PageFaqListItem & { isNew?: boolean };

export default function Page() {
  const [items, setItems] = useState<PageListItem[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveError, setSaveError] = useState('');

  const [faqs, setFaqs] = useState<DraftFaq[]>([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const [faqError, setFaqError] = useState('');
  const [faqPendingId, setFaqPendingId] = useState<string | null>(null);
  const [faqRowErrors, setFaqRowErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setListLoading(true);
      setListError('');

      try {
        const response = await fetch('/api/admin/pages');
        const result = await response.json().catch(() => null);

        if (cancelled) return;

        if (!response.ok || !result?.items) {
          setListError(result?.error || 'Could not load pages.');
          return;
        }

        setItems(result.items);
      } catch {
        if (!cancelled) setListError('Could not load pages.');
      } finally {
        if (!cancelled) setListLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  const startEdit = async (slug: string) => {
    if (editSlug === slug) {
      setEditSlug(null);
      return;
    }

    setEditSlug(slug);
    setDetailLoading(true);
    setDetailError('');
    setSaveStatus('idle');
    setFaqs([]);
    setFaqError('');
    setFaqRowErrors({});

    try {
      const response = await fetch(`/api/admin/pages/${slug}`);
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.page) {
        setDetailError(result?.error || 'Could not load this page.');
        return;
      }

      const page = result.page;
      setEditTitle(page.title);
      setSeoTitle(page.seoTitle);
      setMetaDesc(page.metaDescription);
    } catch {
      setDetailError('Could not load this page.');
      return;
    } finally {
      setDetailLoading(false);
    }

    if (FAQ_ENABLED_SLUGS.includes(slug)) {
      setFaqLoading(true);
      try {
        const response = await fetch(`/api/admin/pages/${slug}/faqs`);
        const result = await response.json().catch(() => null);

        if (!response.ok || !result?.items) {
          setFaqError(result?.error || 'Could not load FAQs.');
          return;
        }

        setFaqs(result.items);
      } catch {
        setFaqError('Could not load FAQs.');
      } finally {
        setFaqLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!editSlug || saveStatus === 'saving') return;
    setSaveStatus('saving');
    setSaveError('');

    try {
      const response = await fetch(`/api/admin/pages/${editSlug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seoTitle, metaDescription: metaDesc }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.page) {
        setSaveError(result?.error || 'Could not save changes.');
        setSaveStatus('error');
        return;
      }

      setItems(current => current.map(p => (p.slug === editSlug ? { ...p, seoStatus: result.page.seoStatus, updated: result.page.updated, updatedBy: result.page.updatedBy } : p)));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveError('Could not reach the server. Please try again.');
      setSaveStatus('error');
    }
  };

  const addFaqDraft = () => {
    setFaqs(current => [
      ...current,
      { id: `draft-${Date.now()}`, question: '', answer: '', sortOrder: current.length, isActive: true, isNew: true },
    ]);
  };

  const updateFaqField = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqs(current => current.map(f => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const saveFaq = async (faq: DraftFaq) => {
    if (!editSlug || faqPendingId) return;
    setFaqPendingId(faq.id);
    setFaqRowErrors(current => ({ ...current, [faq.id]: '' }));

    try {
      const isNew = faq.isNew || faq.id.startsWith('draft-');
      const url = isNew ? `/api/admin/pages/${editSlug}/faqs` : `/api/admin/pages/${editSlug}/faqs/${faq.id}`;
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: faq.question, answer: faq.answer }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.faq) {
        setFaqRowErrors(current => ({ ...current, [faq.id]: result?.error || 'Could not save this FAQ.' }));
        return;
      }

      setFaqs(current => current.map(f => (f.id === faq.id ? result.faq : f)));
    } catch {
      setFaqRowErrors(current => ({ ...current, [faq.id]: 'Could not reach the server.' }));
    } finally {
      setFaqPendingId(null);
    }
  };

  const deleteFaq = async (faq: DraftFaq) => {
    if (!editSlug || faqPendingId) return;

    const isNew = faq.isNew || faq.id.startsWith('draft-');
    if (!isNew && !window.confirm('Delete this FAQ? This cannot be undone.')) return;

    if (isNew) {
      setFaqs(current => current.filter(f => f.id !== faq.id));
      return;
    }

    setFaqPendingId(faq.id);
    try {
      const response = await fetch(`/api/admin/pages/${editSlug}/faqs/${faq.id}`, { method: 'DELETE' });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setFaqRowErrors(current => ({ ...current, [faq.id]: result?.error || 'Could not delete this FAQ.' }));
        return;
      }

      setFaqs(current => current.filter(f => f.id !== faq.id));
    } catch {
      setFaqRowErrors(current => ({ ...current, [faq.id]: 'Could not reach the server.' }));
    } finally {
      setFaqPendingId(null);
    }
  };

  return (
    <AdminLayout title="Pages" subtitle="View and safely edit page SEO, FAQs, and content blocks.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}
        className="grid-cols-1 md:grid-cols-2">

        {/* Pages list */}
        <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0E8', fontSize: '14px', fontWeight: 700 }}>All Pages</div>

          {listLoading ? (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>Loading pages…</div>
            </div>
          ) : listError ? (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#DC2626' }}>{listError}</div>
              <button onClick={() => setRetryKey(k => k + 1)} style={{ marginTop: '6px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Retry
              </button>
            </div>
          ) : items.length === 0 ? (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>No pages yet.</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Pages will appear here once they exist in the database.</div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F0F0E8', background: '#FAFAF8' }}>
                    {['Page', 'Status', 'Updated', 'SEO', ''].map(h => (
                      <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map(p => (
                    <tr key={p.slug} style={{ borderBottom: '1px solid #F5F5EE', background: editSlug === p.slug ? 'rgba(253,102,40,0.04)' : 'transparent' }}
                      onMouseEnter={e => { if (editSlug !== p.slug) (e.currentTarget as HTMLElement).style.background = '#FAFAF8'; }}
                      onMouseLeave={e => { if (editSlug !== p.slug) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                      <td style={{ padding: '11px 14px', fontSize: '13px', fontWeight: 600 }}>{p.title}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '999px' }}>
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: '11px', color: '#AAA', whiteSpace: 'nowrap' }}>{p.updated}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: p.seoStatus === 'good' ? '#059669' : '#D97706', background: p.seoStatus === 'good' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '999px' }}>
                          {p.seoStatus === 'good' ? 'Good' : 'Missing'}
                        </span>
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <button onClick={() => startEdit(p.slug)} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#FD6628', fontSize: '12px', fontWeight: 600 }}>
                          <Edit size={12} /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Editor panel */}
        {editSlug ? (
          detailLoading ? (
            <div style={{ background: '#FFF', borderRadius: '18px', padding: '32px', border: '1px solid #E0E0E0', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>Loading page…</div>
            </div>
          ) : detailError ? (
            <div style={{ background: '#FFF', borderRadius: '18px', padding: '32px', border: '1px solid #E0E0E0', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#DC2626', marginBottom: '10px' }}>{detailError}</div>
              <button onClick={() => setEditSlug(null)} style={{ padding: '8px 16px', border: '1px solid #E0E0E0', borderRadius: '9px', background: '#FFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Close
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                  {editTitle}
                </div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>Editing SEO and content fields only.</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#444', marginBottom: '6px' }}>SEO Title</label>
                    <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E0E0E0', borderRadius: '9px', outline: 'none', fontSize: '13px', boxSizing: 'border-box', background: '#FAFAFA' }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
                    <div style={{ fontSize: '11px', color: seoTitle.length <= 60 ? '#059669' : '#D97706', marginTop: '3px', fontWeight: 600 }}>
                      {seoTitle.length}/60 {seoTitle.length > 60 ? '— Too long' : '— Good'}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#444', marginBottom: '6px' }}>Meta Description</label>
                    <textarea rows={3} value={metaDesc} onChange={e => setMetaDesc(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E0E0E0', borderRadius: '9px', outline: 'none', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical', background: '#FAFAFA', fontFamily: 'Manrope, sans-serif', lineHeight: 1.6 }}
                      onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#FD6628'; }}
                      onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#E0E0E0'; }} />
                    <div style={{ fontSize: '11px', color: metaDesc.length <= 160 ? '#059669' : '#D97706', marginTop: '3px', fontWeight: 600 }}>
                      {metaDesc.length}/160 {metaDesc.length > 160 ? '— Too long' : '— Good'}
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ editor (only for pages that have an FAQ section on the live site) */}
              {FAQ_ENABLED_SLUGS.includes(editSlug) && (
                <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>FAQ Content</div>
                    <button onClick={addFaqDraft} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: '1px solid #E0E0E0', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, color: '#FD6628', cursor: 'pointer' }}>
                      <Plus size={13} /> Add FAQ
                    </button>
                  </div>

                  {faqLoading ? (
                    <div style={{ textAlign: 'center', padding: '24px', fontSize: '13px', color: '#888' }}>Loading FAQs…</div>
                  ) : faqError ? (
                    <div style={{ textAlign: 'center', padding: '24px', fontSize: '13px', color: '#DC2626' }}>{faqError}</div>
                  ) : faqs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px', fontSize: '13px', color: '#888' }}>No FAQs yet. Click "Add FAQ" to create one.</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {faqs.map(faq => (
                        <div key={faq.id} style={{ borderRadius: '12px', border: '1px solid #E8E8E0', padding: '14px' }}>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', marginBottom: '5px' }}>Question</label>
                          <input value={faq.question} onChange={e => updateFaqField(faq.id, 'question', e.target.value)}
                            style={{ width: '100%', padding: '7px 10px', border: '1px solid #E0E0E0', borderRadius: '7px', outline: 'none', fontSize: '12px', boxSizing: 'border-box', marginBottom: '8px', background: '#FAFAFA' }} />
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', marginBottom: '5px' }}>Answer</label>
                          <textarea rows={2} value={faq.answer} onChange={e => updateFaqField(faq.id, 'answer', e.target.value)}
                            style={{ width: '100%', padding: '7px 10px', border: '1px solid #E0E0E0', borderRadius: '7px', outline: 'none', fontSize: '12px', boxSizing: 'border-box', resize: 'vertical', background: '#FAFAFA', fontFamily: 'Manrope, sans-serif' }} />

                          {faqRowErrors[faq.id] && (
                            <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, marginTop: '6px' }}>{faqRowErrors[faq.id]}</div>
                          )}

                          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                            <button onClick={() => saveFaq(faq)} disabled={faqPendingId === faq.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '7px', padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: faqPendingId === faq.id ? 'not-allowed' : 'pointer', opacity: faqPendingId === faq.id ? 0.6 : 1 }}>
                              <Save size={12} /> {faqPendingId === faq.id ? 'Saving…' : 'Save'}
                            </button>
                            <button onClick={() => deleteFaq(faq)} disabled={faqPendingId === faq.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: '1px solid #E0E0E0', borderRadius: '7px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, color: '#DC2626', cursor: faqPendingId === faq.id ? 'not-allowed' : 'pointer' }}>
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {saveStatus === 'error' && (
                <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#DC2626', fontWeight: 600 }}>
                  {saveError}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleSave} disabled={saveStatus === 'saving'} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: saveStatus === 'saving' ? 'not-allowed' : 'pointer', opacity: saveStatus === 'saving' ? 0.7 : 1 }}>
                  {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
                </button>
                <button onClick={() => setEditSlug(null)} style={{ padding: '10px 18px', border: '1px solid #E0E0E0', borderRadius: '10px', background: '#FFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </div>
          )
        ) : (
          <div style={{ background: '#FFF', borderRadius: '18px', padding: '32px', border: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', textAlign: 'center' }}>
            <Edit size={28} color="#DDD" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#AAA', marginBottom: '6px' }}>Select a page to edit</div>
            <div style={{ fontSize: '12px', color: '#CCC' }}>Click Edit on any page to update its SEO and content fields.</div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
