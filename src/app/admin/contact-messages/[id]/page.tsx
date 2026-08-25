'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, FileText } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatusPill } from '@/components/admin/StatusPill';
import type { ContactMessageDetailItem } from '@/lib/admin/contactMessages';

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const [message, setMessage] = useState<ContactMessageDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionPending, setActionPending] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/admin/contact-messages/${id}`);
        const result = await response.json().catch(() => null);

        if (cancelled) return;

        if (!response.ok || !result?.message) {
          setError(result?.error || 'Could not load this message.');
          return;
        }

        setMessage(result.message);
      } catch {
        if (!cancelled) setError('Could not load this message.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const updateStatus = async (status: string) => {
    if (!message || actionPending) return;
    setActionPending(true);

    try {
      const response = await fetch(`/api/admin/contact-messages/${message.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = await response.json().catch(() => null);

      if (response.ok && result?.message) {
        setMessage(result.message);
      }
    } finally {
      setActionPending(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Contact Message" subtitle="Loading…">
        <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 700 }}>Loading message…</div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !message) {
    return (
      <AdminLayout title="Contact Message" subtitle="">
        <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px', color: '#DC2626' }}>{error || 'Message not found.'}</div>
          <Link href="/admin/contact-messages" style={{ fontSize: '13px', color: '#FD6628', fontWeight: 700, textDecoration: 'none' }}>
            ← Back to Contact Messages
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Message from ${message.name}`} subtitle={message.email}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/admin/contact-messages" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#888', textDecoration: 'none', fontWeight: 500 }}>
          <ArrowLeft size={14} /> Back to Contact Messages
        </Link>
      </div>

      {/* Summary card */}
      <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>{message.name}</div>
            <div style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>{message.email}</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <StatusPill status={message.status as any} />
              <span style={{ fontSize: '12px', background: '#F5F5EE', padding: '3px 10px', borderRadius: '999px', color: '#555', fontWeight: 500 }}>{message.inquiryType}</span>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button disabled={actionPending} onClick={() => updateStatus('read')}
              style={{ padding: '8px 14px', borderRadius: '9px', border: '1px solid #E0E0E0', background: '#FFF', fontSize: '12px', fontWeight: 600, cursor: actionPending ? 'not-allowed' : 'pointer', opacity: actionPending ? 0.6 : 1, transition: 'border-color 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#FD6628'; (e.currentTarget as HTMLElement).style.color = '#FD6628'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E0E0E0'; (e.currentTarget as HTMLElement).style.color = '#000'; }}>
              Mark as Read
            </button>
            <button disabled={actionPending} onClick={() => updateStatus('archived')}
              style={{ padding: '8px 14px', borderRadius: '9px', background: '#FD6628', color: '#FFF', border: 'none', fontSize: '12px', fontWeight: 700, cursor: actionPending ? 'not-allowed' : 'pointer', opacity: actionPending ? 0.6 : 1 }}>
              Archive
            </button>
          </div>
        </div>
      </div>

      {/* Message details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          ['Subject', message.inquiryType],
          ['Company', message.company],
          ['Website', message.website],
          ['Received', message.date],
          ['Last Updated', message.updatedAt],
        ].map(([l, v]) => (
          <div key={l} style={{ background: '#FFF', borderRadius: '14px', padding: '18px 20px', border: '1px solid #E0E0E0', display: 'flex', gap: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#888', minWidth: '150px', paddingTop: '1px' }}>{l}</div>
            <div style={{ fontSize: '14px', color: '#000', fontWeight: 500 }}>{v}</div>
          </div>
        ))}

        <div style={{ background: '#FFF', borderRadius: '16px', padding: '22px', border: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#000', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #F0F0E8' }}>Message</div>
          <div style={{ fontSize: '14px', color: '#222', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{message.message}</div>
        </div>

        {message.file && (
          <div style={{ background: '#FFF', borderRadius: '16px', padding: '22px', border: '1px solid #E0E0E0' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#000', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #F0F0E8' }}>Attachment</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={16} color="#FD6628" />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{message.file.name}</span>
              <span style={{ fontSize: '12px', color: '#888' }}>{message.file.type} · {message.file.size}</span>
            </div>
            {/* No real file storage exists yet — only filename/size/type metadata is captured at submission time. */}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
