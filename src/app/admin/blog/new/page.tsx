'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, CheckCircle } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';

const categories = ['Funding Readiness', 'Pitch Deck Preparation', 'Financial Readiness', 'Data Room Basics', 'Capital Pathways', 'Crowdfunding Preparation', 'Grant Readiness', 'Accelerator Preparation', 'Founder Strategy', 'Fundraising Mistakes'];

const seoCheck = (field: string, val: string, min: number, max: number) => {
  if (!val) return { label: 'Missing', color: '#DC2626' };
  if (val.length < min) return { label: 'Too short', color: '#D97706' };
  if (val.length > max) return { label: 'Too long', color: '#D97706' };
  return { label: 'Good', color: '#059669' };
};

export default function Page() {
  const isNew = true;
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', category: categories[0],
    body: '', author: 'Admin', readTime: '5', status: 'draft',
    seoTitle: '', metaDesc: '', focusKeyword: '', publishDate: '',
    featured: false,
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveError, setSaveError] = useState('');

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  // readTime, focusKeyword, and featured have no backing column on Article
  // yet, so they stay local-only for now (same as before this chunk).
  const save = async (publish = false) => {
    setSaveStatus('saving');
    setSaveError('');

    try {
      const response = await fetch('/api/admin/blog/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          content: form.body,
          category: form.category,
          author: form.author,
          status: publish ? 'published' : form.status,
          seoTitle: form.seoTitle,
          metaDescription: form.metaDesc,
          publishedAt: form.publishDate,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.article) {
        setSaveError(result?.error || 'Could not save article.');
        setSaveStatus('error');
        return;
      }

      setSaveStatus('saved');
      router.replace(`/admin/blog/${result.article.id}/edit`);
    } catch {
      setSaveError('Could not reach the server. Please try again.');
      setSaveStatus('error');
    }
  };

  const titleSeo = seoCheck('title', form.seoTitle, 30, 60);
  const metaSeo = seoCheck('meta', form.metaDesc, 50, 160);

  const Field = ({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) => (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#444', marginBottom: '6px' }}>
        {label}{req && <span style={{ color: '#FD6628', marginLeft: '3px' }}>*</span>}
      </label>
      {children}
    </div>
  );

  const inputStyle = {
    width: '100%', padding: '9px 12px', borderRadius: '9px',
    border: '1.5px solid #E0E0E0', outline: 'none',
    fontSize: '13px', color: '#000', background: '#FAFAFA',
    boxSizing: 'border-box' as const, transition: 'border-color 0.15s',
    fontFamily: 'Manrope, sans-serif',
  };

  return (
    <AdminLayout title={isNew ? 'New Article' : 'Edit Article'} subtitle="Write and publish a founder resource article.">
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <Link href="/admin/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#888', textDecoration: 'none' }}>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button disabled style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E0E0E0', borderRadius: '9px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'not-allowed', color: '#CCC' }} title="Public blog preview not connected yet">
            <Eye size={13} /> Preview
          </button>
          <button onClick={() => save(false)} disabled={saveStatus === 'saving'} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid #E0E0E0', borderRadius: '9px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: saveStatus === 'saving' ? 'not-allowed' : 'pointer' }}>
            <Save size={13} /> {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Draft'}
          </button>
          <button onClick={() => save(true)} disabled={saveStatus === 'saving'} style={{ background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '9px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: saveStatus === 'saving' ? 'not-allowed' : 'pointer' }}>
            Publish
          </button>
        </div>
      </div>

      {saveStatus === 'error' && (
        <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', fontSize: '13px', color: '#DC2626', fontWeight: 600 }}>
          {saveError}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'start' }}
        className="grid-cols-1 md:grid-cols-[1fr_300px]">

        {/* Editor left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Field label="Article Title" req>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="How to prepare your startup for funding conversations..." style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Slug" req>
                <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="how-to-prepare-startup-funding" style={inputStyle}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
              </Field>
              <Field label="Category" req>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Excerpt">
              <textarea rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="A short summary shown in the article list..." style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#E0E0E0'; }} />
            </Field>
          </div>

          {/* Body */}
          <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#444', marginBottom: '10px' }}>Article Body <span style={{ color: '#FD6628' }}>*</span></label>
            <div style={{ border: '1.5px solid #E0E0E0', borderRadius: '10px', overflow: 'hidden' }}>
              {/* Toolbar */}
              <div style={{ display: 'flex', gap: '4px', padding: '8px 10px', borderBottom: '1px solid #F0F0E8', background: '#FAFAFA', flexWrap: 'wrap' }}>
                {['H2', 'H3', 'B', 'I', 'Link', 'List', '""', '✓'].map(t => (
                  <button key={t} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #E0E0E0', background: '#FFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>{t}</button>
                ))}
              </div>
              <textarea
                rows={16}
                value={form.body}
                onChange={e => set('body', e.target.value)}
                placeholder="Write your article here. Use headings, bullets, and clear paragraphs..."
                style={{ width: '100%', border: 'none', outline: 'none', padding: '16px', fontSize: '14px', lineHeight: 1.7, resize: 'vertical', fontFamily: 'Manrope, sans-serif', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Publish controls */}
          <div style={{ background: '#FFF', borderRadius: '18px', padding: '20px', border: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #F0F0E8', paddingBottom: '10px' }}>Publishing</div>
            <Field label="Status">
              <select value={form.status} onChange={e => set('status', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                {['draft', 'published', 'scheduled', 'archived'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Author">
              <input value={form.author} onChange={e => set('author', e.target.value)} style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
            </Field>
            <Field label="Read Time (min)">
              <input type="number" value={form.readTime} onChange={e => set('readTime', e.target.value)} style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
            </Field>
            <Field label="Publish Date">
              <input type="date" value={form.publishDate} onChange={e => set('publishDate', e.target.value)} style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
            </Field>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} style={{ accentColor: '#FD6628' }} />
              <span style={{ fontSize: '13px', fontWeight: 500 }}>Featured article</span>
            </label>
          </div>

          {/* SEO */}
          <div style={{ background: '#FFF', borderRadius: '18px', padding: '20px', border: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #F0F0E8', paddingBottom: '10px' }}>SEO Settings</div>
            <Field label="SEO Title">
              <input value={form.seoTitle} onChange={e => set('seoTitle', e.target.value)} placeholder="SEO-optimized title..." style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
              <span style={{ fontSize: '11px', color: titleSeo.color, fontWeight: 600, marginTop: '3px', display: 'block' }}>{titleSeo.label} {form.seoTitle ? `(${form.seoTitle.length}/60)` : ''}</span>
            </Field>
            <Field label="Meta Description">
              <textarea rows={3} value={form.metaDesc} onChange={e => set('metaDesc', e.target.value)} placeholder="Brief description for search engines..." style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#E0E0E0'; }} />
              <span style={{ fontSize: '11px', color: metaSeo.color, fontWeight: 600, marginTop: '3px', display: 'block' }}>{metaSeo.label} {form.metaDesc ? `(${form.metaDesc.length}/160)` : ''}</span>
            </Field>
            <Field label="Focus Keyword">
              <input value={form.focusKeyword} onChange={e => set('focusKeyword', e.target.value)} placeholder="e.g. funding readiness" style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#E0E0E0'; }} />
            </Field>

            {/* SEO checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
              {[
                { label: 'Title set', ok: !!form.title },
                { label: 'Slug set', ok: !!form.slug },
                { label: 'SEO title good', ok: form.seoTitle.length >= 30 && form.seoTitle.length <= 60 },
                { label: 'Meta description good', ok: form.metaDesc.length >= 50 && form.metaDesc.length <= 160 },
                { label: 'Focus keyword set', ok: !!form.focusKeyword },
                { label: 'Category selected', ok: !!form.category },
                { label: 'Excerpt added', ok: !!form.excerpt },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <CheckCircle size={12} color={c.ok ? '#059669' : '#CCC'} />
                  <span style={{ fontSize: '12px', color: c.ok ? '#333' : '#AAA' }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
