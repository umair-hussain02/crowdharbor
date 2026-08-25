import type { ContactSubmission } from '@/generated/prisma/client';

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function parseUploadedFile(value: unknown): { name: string; size: number; type?: string } | null {
  if (typeof value !== 'object' || value === null) return null;
  const record = value as Record<string, unknown>;
  if (typeof record.name !== 'string') return null;

  return {
    name: record.name,
    size: typeof record.size === 'number' ? record.size : 0,
    type: typeof record.type === 'string' ? record.type : undefined,
  };
}

export function toListItem(row: ContactSubmission) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    inquiryType: row.inquiryType,
    message: row.message,
    company: row.company || '—',
    status: row.status,
    date: formatDate(row.createdAt),
  };
}

export type ContactMessageListItem = ReturnType<typeof toListItem>;

export function toDetailItem(row: ContactSubmission) {
  const fileMeta = parseUploadedFile(row.uploadedFile);

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    inquiryType: row.inquiryType,
    message: row.message,
    company: row.company || '—',
    website: row.website || '—',
    status: row.status,
    date: formatDate(row.createdAt),
    updatedAt: formatDate(row.updatedAt),
    file: fileMeta
      ? {
          name: fileMeta.name,
          type: fileMeta.type?.toUpperCase() || (fileMeta.name.includes('.') ? fileMeta.name.split('.').pop()!.toUpperCase() : '—'),
          size: formatFileSize(fileMeta.size),
        }
      : null,
  };
}

export type ContactMessageDetailItem = ReturnType<typeof toDetailItem>;
