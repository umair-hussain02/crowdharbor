'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Mail, ExternalLink, FileText, Clock, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatusPill } from '@/components/admin/StatusPill';
import type { SubmissionDetailItem } from '@/lib/admin/submissions';

const tabs = ['Overview', 'Intake Answers', 'Uploaded Files', 'Review Notes', 'Report Status', 'Activity', 'Payment'];

// Review Notes, Report Status, and Activity have no backing model yet — they
// stay local/static until the Reports chunk adds real tables for them.
const activity = [
  { time: 'Jun 2, 2026 10:42', action: 'Intake submitted', by: 'Founder', note: '' },
  { time: 'Jun 2, 2026 10:43', action: 'Files uploaded (2)', by: 'Founder', note: 'Pitch deck + financial model' },
  { time: 'Jun 2, 2026 11:15', action: 'Status changed to Under Review', by: 'Admin', note: '' },
];

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState(0);
  const [notes, setNotes] = useState({ summary: '', strengths: '', weaknesses: '', blockers: '', pathway: '', nextStep: '' });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const [submission, setSubmission] = useState<SubmissionDetailItem | null>(null);
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
        const response = await fetch(`/api/admin/submissions/${id}`);
        const result = await response.json().catch(() => null);

        if (cancelled) return;

        if (!response.ok || !result?.submission) {
          setError(result?.error || 'Could not load this submission.');
          return;
        }

        setSubmission(result.submission);
      } catch {
        if (!cancelled) setError('Could not load this submission.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const updateStatus = async (status: string) => {
    if (!submission || actionPending) return;
    setActionPending(true);

    try {
      const response = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = await response.json().catch(() => null);

      if (response.ok && result?.submission) {
        setSubmission(result.submission);
      }
    } finally {
      setActionPending(false);
    }
  };

  const saveNotes = async () => {
    setSaveStatus('saving');
    await new Promise(r => setTimeout(r, 800));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  if (loading) {
    return (
      <AdminLayout title="Submission" subtitle="Loading…">
        <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 700 }}>Loading submission…</div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !submission) {
    return (
      <AdminLayout title="Submission" subtitle="">
        <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E0E0E0', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px', color: '#DC2626' }}>{error || 'Submission not found.'}</div>
          <Link href="/admin/submissions" style={{ fontSize: '13px', color: '#FD6628', fontWeight: 700, textDecoration: 'none' }}>
            ← Back to Submissions
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const intakeAnswers = [
    { group: 'Founder Details', fields: [
      { label: 'Full name', value: submission.founder },
      { label: 'Email', value: submission.email },
      { label: 'Phone', value: submission.phone },
      { label: 'Country', value: submission.country },
      { label: 'Website', value: submission.website },
      { label: 'LinkedIn', value: submission.linkedin },
    ]},
    { group: 'Company Stage', fields: [
      { label: 'Company stage', value: submission.stage },
      { label: 'Industry', value: submission.industry },
      { label: 'Working duration', value: submission.workingDuration },
      { label: 'Monthly revenue', value: submission.revenue },
    ]},
    { group: 'Traction', fields: [
      { label: 'Traction signals', value: submission.tractionSignals.join(', ') || '—' },
      { label: 'Proof description', value: submission.traction },
    ]},
    { group: 'Funding Goal', fields: [
      { label: 'Funding goal', value: submission.goal },
      { label: 'Use of funds', value: submission.useOfFunds },
      { label: 'Funding timeline', value: submission.timeline },
      { label: 'Preferred funding path', value: submission.fundingPath },
    ]},
    { group: 'Materials', fields: [
      { label: 'Materials', value: submission.hasNoMaterials ? 'None yet' : (submission.materials.join(', ') || '—') },
    ]},
    { group: 'Service Selected', fields: [
      { label: 'Selected service', value: submission.service },
      { label: 'Challenges', value: submission.challenges.join(', ') || '—' },
      { label: 'Biggest challenge', value: submission.challenge },
      { label: 'Disclaimer accepted', value: submission.consentAccepted ? 'Yes' : 'No' },
      { label: 'Marketing accepted', value: submission.marketingAccepted ? 'Yes' : 'No' },
    ]},
  ];

  return (
    <AdminLayout title={`Submission: ${submission.company}`} subtitle={`${submission.founder} · ${submission.service}`}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/admin/submissions" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#888', textDecoration: 'none', fontWeight: 500 }}>
          <ArrowLeft size={14} /> Back to Submissions
        </Link>
      </div>

      {/* Top summary card */}
      <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>{submission.company}</div>
            <div style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>{submission.founder} · {submission.email}</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <StatusPill status={submission.status as any} />
              <StatusPill status={submission.payment as any} />
              <span style={{ fontSize: '12px', background: '#F5F5EE', padding: '3px 10px', borderRadius: '999px', color: '#555', fontWeight: 500 }}>{submission.service}</span>
            </div>
          </div>
          {/* Quick actions */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { label: 'Mark Under Review', status: 'under-review' },
              { label: 'Request Info', status: 'need-info' },
            ].map(a => (
              <button key={a.label} disabled={actionPending} onClick={() => updateStatus(a.status)}
                style={{ padding: '8px 14px', borderRadius: '9px', border: '1px solid #E0E0E0', background: '#FFF', fontSize: '12px', fontWeight: 600, cursor: actionPending ? 'not-allowed' : 'pointer', opacity: actionPending ? 0.6 : 1, transition: 'border-color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#FD6628'; (e.currentTarget as HTMLElement).style.color = '#FD6628'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E0E0E0'; (e.currentTarget as HTMLElement).style.color = '#000'; }}>
                {a.label}
              </button>
            ))}
            {/* Send Payment Link / Mark Delivered belong to the Payments/Reports chunks — no backing model yet. */}
            <button style={{ padding: '8px 14px', borderRadius: '9px', border: '1px solid #E0E0E0', background: '#FFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'border-color 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#FD6628'; (e.currentTarget as HTMLElement).style.color = '#FD6628'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E0E0E0'; (e.currentTarget as HTMLElement).style.color = '#000'; }}>
              Send Payment Link
            </button>
            <button style={{ padding: '8px 14px', borderRadius: '9px', background: '#FD6628', color: '#FFF', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Mark Delivered
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '2px' }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)}
            style={{
              padding: '8px 16px', borderRadius: '9px', cursor: 'pointer',
              background: activeTab === i ? '#FD6628' : '#FFF',
              color: activeTab === i ? '#FFF' : '#555',
              fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap',
              border: activeTab === i ? 'none' : '1px solid #E0E0E0',
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }} className="grid-cols-1 md:grid-cols-[1fr_300px]">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              ['Company Stage', submission.stage], ['Industry', submission.industry],
              ['Traction', submission.traction], ['Monthly Revenue', submission.revenue],
              ['Funding Goal', submission.goal], ['Funding Timeline', submission.timeline],
              ['Preferred Path', submission.fundingPath], ['Biggest Challenge', submission.challenge],
            ].map(([l, v]) => (
              <div key={l} style={{ background: '#FFF', borderRadius: '14px', padding: '18px 20px', border: '1px solid #E0E0E0', display: 'flex', gap: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#888', minWidth: '150px', paddingTop: '1px' }}>{l}</div>
                <div style={{ fontSize: '14px', color: '#000', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#FFF', borderRadius: '14px', padding: '18px', border: '1px solid #E0E0E0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#888', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Summary</div>
              {[['Assigned', submission.assigned], ['Due Date', submission.dueDate], ['Last Activity', submission.lastActivity]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>{l}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Report Status</div>
                <StatusPill status={submission.reportStatus as any} size="sm" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {intakeAnswers.map(group => (
            <div key={group.group} style={{ background: '#FFF', borderRadius: '16px', padding: '22px', border: '1px solid #E0E0E0' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#000', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #F0F0E8' }}>{group.group}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.fields.map(f => (
                  <div key={f.label} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#888', minWidth: '180px', paddingTop: '1px' }}>{f.label}</div>
                    <div style={{ fontSize: '13px', color: '#222' }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 2 && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '24px', border: '1px solid #E0E0E0' }}>
          {submission.files.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No files uploaded.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F0F0E8' }}>
                  {['File Name', 'Type', 'Size', 'Upload Date', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submission.files.map(f => (
                  <tr key={f.name} style={{ borderBottom: '1px solid #F5F5EE' }}>
                    <td style={{ padding: '14px', fontSize: '13px', fontWeight: 600 }}>{f.name}</td>
                    <td style={{ padding: '14px', fontSize: '12px', color: '#666' }}>{f.type}</td>
                    <td style={{ padding: '14px', fontSize: '12px', color: '#666' }}>{f.size}</td>
                    <td style={{ padding: '14px', fontSize: '12px', color: '#888' }}>{f.date}</td>
                    <td style={{ padding: '14px' }}><StatusPill status={f.status as any} size="sm" /></td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ fontSize: '12px', color: '#FD6628', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Download</button>
                        <button style={{ fontSize: '12px', color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>Mark Reviewed</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Internal Review Summary', key: 'summary', placeholder: 'Overall assessment of this founder submission...' },
            { label: 'Founder Strengths', key: 'strengths', placeholder: 'Strong product, early traction, clear market...' },
            { label: 'Weaknesses / Gaps', key: 'weaknesses', placeholder: 'Financial model needs assumptions, data room not started...' },
            { label: 'Top Blockers', key: 'blockers', placeholder: 'Main issues blocking funding readiness...' },
            { label: 'Capital Pathway Recommendation', key: 'pathway', placeholder: 'Recommend angel investors at this stage due to...' },
            { label: 'Suggested Next Step', key: 'nextStep', placeholder: 'Review pitch deck, complete financial model, start data room...' },
          ].map(f => (
            <div key={f.key} style={{ background: '#FFF', borderRadius: '14px', padding: '20px', border: '1px solid #E0E0E0' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>{f.label}</label>
              <textarea
                rows={3}
                placeholder={f.placeholder}
                value={(notes as any)[f.key]}
                onChange={e => setNotes(n => ({ ...n, [f.key]: e.target.value }))}
                style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '10px 12px', fontSize: '13px', resize: 'vertical', outline: 'none', boxSizing: 'border-box', fontFamily: 'Manrope, sans-serif', lineHeight: 1.6 }}
                onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#FD6628'; }}
                onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#E0E0E0'; }}
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={saveNotes} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
              <Save size={14} /> {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Notes'}
            </button>
            <button style={{ padding: '10px 20px', border: '1px solid #E0E0E0', borderRadius: '10px', background: '#FFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              Mark Review Complete
            </button>
          </div>
        </div>
      )}

      {activeTab === 4 && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Report Status</div>
            <StatusPill status="not-started" />
          </div>
          {[['Report Type', 'Capital Pathway Sprint Report'], ['Assigned To', 'Admin'], ['Due Date', 'Jun 10, 2026'], ['Last Updated', '—'], ['Delivery Date', '—']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#888', minWidth: '150px', fontWeight: 700 }}>{l}</span>
              <span style={{ fontSize: '13px' }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
            <button style={{ background: '#FD6628', color: '#FFF', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Upload Report</button>
            <button style={{ border: '1px solid #E0E0E0', background: '#FFF', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Mark Ready to Send</button>
          </div>
        </div>
      )}

      {activeTab === 5 && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', paddingBottom: i < activity.length - 1 ? '20px' : '0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FD6628', marginTop: '3px', flexShrink: 0 }} />
                  {i < activity.length - 1 && <div style={{ width: '1px', flex: 1, background: '#E0E0E0', marginTop: '4px' }} />}
                </div>
                <div style={{ paddingBottom: i < activity.length - 1 ? '4px' : '0' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{a.action}</div>
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{a.time} · {a.by}</div>
                  {a.note && <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{a.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 6 && (
        <div style={{ background: '#FFF', borderRadius: '18px', padding: '28px', border: '1px solid #E0E0E0' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Payment Status</div>
            <StatusPill status="paid" />
          </div>
          {[['Stripe Payment ID', 'pi_3OxYZ123abc456def'], ['Amount', '€895'], ['Currency', 'EUR'], ['Service Purchased', 'Capital Pathway Sprint'], ['Payment Date', 'Jun 2, 2026 10:41'], ['Refund Status', 'None']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#888', minWidth: '180px', fontWeight: 700 }}>{l}</span>
              <span style={{ fontSize: '13px', fontFamily: l === 'Stripe Payment ID' ? 'monospace' : 'inherit' }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
            <button style={{ border: '1px solid #E0E0E0', background: '#FFF', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>View in Stripe</button>
            <button style={{ border: '1px solid #E0E0E0', background: '#FFF', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Add Refund Note</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
