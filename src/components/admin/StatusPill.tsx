type StatusType =
  | 'new' | 'under-review' | 'need-info' | 'payment-pending' | 'payment-complete'
  | 'report-progress' | 'report-delivered' | 'closed' | 'rejected'
  | 'paid' | 'pending' | 'failed' | 'refunded' | 'link-sent' | 'not-required'
  | 'draft' | 'published' | 'scheduled' | 'archived' | 'needs-review'
  | 'not-started' | 'drafting' | 'internal-review' | 'ready' | 'sent' | 'delivered' | 'completed'
  | 'healthy' | 'warning' | 'down' | 'not-configured'
  | string;

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  'new': { label: 'New', bg: 'rgba(253,102,40,0.1)', color: '#FD6628' },
  'read': { label: 'Read', bg: 'rgba(0,0,0,0.06)', color: '#555' },
  'under-review': { label: 'Under Review', bg: 'rgba(59,130,246,0.1)', color: '#2563EB' },
  'need-info': { label: 'Need More Info', bg: 'rgba(245,158,11,0.1)', color: '#D97706' },
  'payment-pending': { label: 'Payment Pending', bg: 'rgba(245,158,11,0.1)', color: '#D97706' },
  'payment-complete': { label: 'Payment Complete', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  'report-progress': { label: 'Report In Progress', bg: 'rgba(59,130,246,0.1)', color: '#2563EB' },
  'report-delivered': { label: 'Report Delivered', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  'closed': { label: 'Closed', bg: 'rgba(0,0,0,0.06)', color: '#555' },
  'rejected': { label: 'Rejected', bg: 'rgba(239,68,68,0.1)', color: '#DC2626' },
  'paid': { label: 'Paid', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  'pending': { label: 'Pending', bg: 'rgba(245,158,11,0.1)', color: '#D97706' },
  'failed': { label: 'Failed', bg: 'rgba(239,68,68,0.1)', color: '#DC2626' },
  'refunded': { label: 'Refunded', bg: 'rgba(0,0,0,0.06)', color: '#555' },
  'link-sent': { label: 'Link Sent', bg: 'rgba(253,102,40,0.1)', color: '#FD6628' },
  'not-required': { label: 'Not Required', bg: 'rgba(0,0,0,0.06)', color: '#888' },
  'draft': { label: 'Draft', bg: 'rgba(0,0,0,0.06)', color: '#555' },
  'published': { label: 'Published', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  'scheduled': { label: 'Scheduled', bg: 'rgba(59,130,246,0.1)', color: '#2563EB' },
  'archived': { label: 'Archived', bg: 'rgba(0,0,0,0.06)', color: '#888' },
  'needs-review': { label: 'Needs Review', bg: 'rgba(245,158,11,0.1)', color: '#D97706' },
  'not-started': { label: 'Not Started', bg: 'rgba(0,0,0,0.06)', color: '#888' },
  'drafting': { label: 'Drafting', bg: 'rgba(253,102,40,0.1)', color: '#FD6628' },
  'internal-review': { label: 'Internal Review', bg: 'rgba(59,130,246,0.1)', color: '#2563EB' },
  'ready': { label: 'Ready to Send', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  'sent': { label: 'Sent', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  'delivered': { label: 'Delivered', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  'completed': { label: 'Completed', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  'healthy': { label: 'Healthy', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  'warning': { label: 'Warning', bg: 'rgba(245,158,11,0.1)', color: '#D97706' },
  'down': { label: 'Down', bg: 'rgba(239,68,68,0.1)', color: '#DC2626' },
  'not-configured': { label: 'Not Configured', bg: 'rgba(0,0,0,0.06)', color: '#888' },
};

interface StatusPillProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

export function StatusPill({ status, size = 'md' }: StatusPillProps) {
  const cfg = statusConfig[status] ?? { label: status, bg: 'rgba(0,0,0,0.06)', color: '#555' };
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: cfg.bg,
      color: cfg.color,
      borderRadius: '999px',
      fontWeight: 600,
      fontSize: size === 'sm' ? '11px' : '12px',
      padding: size === 'sm' ? '2px 8px' : '3px 10px',
      whiteSpace: 'nowrap',
      letterSpacing: '0.01em',
    }}>
      {cfg.label}
    </span>
  );
}
