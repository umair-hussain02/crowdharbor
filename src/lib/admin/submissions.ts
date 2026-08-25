import type { IntakeSubmission } from '@/generated/prisma/client';

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function parseUploadedFiles(value: unknown): Array<{ name: string; size: number }> {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    .map((item) => ({
      name: typeof item.name === 'string' ? item.name : 'Unnamed file',
      size: typeof item.size === 'number' ? item.size : 0,
    }));
}

// Payment status has no backing column yet — IntakeSubmission predates the Payments
// chunk. Every row reports this placeholder until a real Payment model exists.
const PAYMENT_PLACEHOLDER = 'not-required' as const;

export function toListItem(row: IntakeSubmission) {
  return {
    id: row.id,
    founder: row.name,
    company: row.companyName,
    email: row.email,
    service: row.selectedService,
    stage: row.stage,
    goal: row.raiseAmount,
    payment: PAYMENT_PLACEHOLDER,
    status: row.status,
    date: formatDate(row.createdAt),
  };
}

export type SubmissionListItem = ReturnType<typeof toListItem>;

export function toDetailItem(row: IntakeSubmission) {
  const files = parseUploadedFiles(row.uploadedFiles).map((file) => ({
    name: file.name,
    type: file.name.includes('.') ? file.name.split('.').pop()!.toUpperCase() : '—',
    size: formatFileSize(file.size),
    date: formatDate(row.createdAt),
    status: 'uploaded' as const,
  }));

  return {
    id: row.id,
    founder: row.name,
    company: row.companyName,
    email: row.email,
    phone: row.phone || '—',
    country: row.country || '—',
    website: row.website || '—',
    linkedin: row.linkedin || '—',

    service: row.selectedService,
    status: row.status,
    payment: PAYMENT_PLACEHOLDER,

    stage: row.stage,
    industry: row.industry || '—',
    workingDuration: row.workingDuration || '—',

    traction: row.proofDescription || row.tractionSignals.join(', ') || '—',
    tractionSignals: row.tractionSignals,
    revenue: row.monthlyRevenue || '—',

    goal: row.raiseAmount,
    useOfFunds: row.useOfFunds || '—',
    timeline: row.timeline || '—',
    fundingPath: row.fundingPaths.join(', ') || '—',

    materials: row.materials,
    hasNoMaterials: row.hasNoMaterials,

    challenge: row.biggestConcern || row.challenges.join(', ') || '—',
    challenges: row.challenges,

    consentAccepted: row.consentAccepted,
    marketingAccepted: row.marketingAccepted,

    // No Reports model yet — placeholders until that chunk adds real columns.
    assigned: 'Unassigned',
    dueDate: '—',
    reportStatus: 'not-started' as const,

    lastActivity: formatDate(row.updatedAt),
    date: formatDate(row.createdAt),
    files,
  };
}

export type SubmissionDetailItem = ReturnType<typeof toDetailItem>;
