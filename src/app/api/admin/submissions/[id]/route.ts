import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { toDetailItem } from '@/lib/admin/submissions';
import { requireAdmin } from '@/lib/admin/session';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  try {
    const row = await prisma.intakeSubmission.findUnique({ where: { id } });

    if (!row) {
      return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    }

    return NextResponse.json({ submission: toDetailItem(row) });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load submission:', error);
    } else {
      console.error('Failed to load submission:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load submission.' }, { status: 500 });
  }
}

// Only `status` and `stage` are real columns on IntakeSubmission today.
// Payment status / review notes need the future Payments/Reports models
// before they can be persisted here.
const patchSchema = z
  .object({
    status: z.string().trim().min(1).max(50).optional(),
    stage: z.string().trim().min(1).max(100).optional(),
  })
  .refine((data) => data.status !== undefined || data.stage !== undefined, {
    message: 'Provide at least one field to update.',
  });

export async function PATCH(request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const result = patchSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid request body.' },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.intakeSubmission.update({
      where: { id },
      data: result.data,
    });

    return NextResponse.json({ submission: toDetailItem(updated) });
  } catch (error) {
    const isNotFound = typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025';
    if (isNotFound) {
      return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to update submission:', error);
    } else {
      console.error('Failed to update submission:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not update submission.' }, { status: 500 });
  }
}
