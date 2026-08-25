import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/admin/submissions';
import { requireAdmin } from '@/lib/admin/session';

// No Report model exists yet, so every row here is derived from
// IntakeSubmission rather than read from a dedicated reports table:
// - reportType is inferred from selectedService
// - reportStatus is inferred from the submission's own status field
//   (payment-complete/report-progress -> drafting, report-delivered/closed
//   -> delivered, everything else -> not-started). "Ready to Send" and
//   "Sent" have no corresponding submission state today, so those buckets
//   stay at 0 until a real Report model tracks that distinction.
// - assigned has no owner/assignment model, so it's always "Admin"
// - dueDate has no real column, so it's derived as createdAt + 7 days

const DUE_DAYS = 7;

export type ReportStatus = 'not-started' | 'drafting' | 'ready' | 'sent' | 'delivered';

function reportTypeFor(service: string): string {
  const s = service.toLowerCase();
  if (s.includes('sprint')) return 'Pathway Report';
  if (s.includes('readiness')) return 'Readiness Report';
  if (s.includes('prep')) return 'Preparation Plan';
  return 'Report';
}

function reportStatusFor(submissionStatus: string): ReportStatus {
  if (submissionStatus === 'report-delivered' || submissionStatus === 'closed') return 'delivered';
  if (submissionStatus === 'payment-complete' || submissionStatus === 'report-progress') return 'drafting';
  return 'not-started';
}

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const now = new Date();

  try {
    const submissions = await prisma.intakeSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
      select: {
        id: true,
        name: true,
        companyName: true,
        selectedService: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const counts = { 'not-started': 0, drafting: 0, ready: 0, sent: 0, delivered: 0 };
    let overdue = 0;

    const items = submissions.map((row) => {
      const reportStatus = reportStatusFor(row.status);
      counts[reportStatus] += 1;

      const dueDate = new Date(row.createdAt.getTime() + DUE_DAYS * 24 * 60 * 60 * 1000);
      const isOverdue = reportStatus !== 'delivered' && dueDate < now;
      if (isOverdue) overdue += 1;

      return {
        id: row.id,
        founder: row.name,
        company: row.companyName,
        service: row.selectedService,
        type: reportTypeFor(row.selectedService),
        status: reportStatus,
        assigned: 'Admin',
        due: formatDate(dueDate),
        updated: formatDate(row.updatedAt),
        overdue: isOverdue,
      };
    });

    return NextResponse.json({
      items,
      counts: {
        notStarted: counts['not-started'],
        drafting: counts.drafting,
        readyToSend: counts.ready,
        delivered: counts.delivered,
        overdue,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load reports:', error);
    } else {
      console.error('Failed to load reports:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load reports.' }, { status: 500 });
  }
}
