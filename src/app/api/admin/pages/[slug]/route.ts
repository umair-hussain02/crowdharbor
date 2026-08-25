import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updatePageSchema } from '@/lib/validators/page';
import { deriveSeoStatus, toDetailItem } from '@/lib/admin/pages';
import { requireAdmin } from '@/lib/admin/session';

type RouteParams = { params: Promise<{ slug: string }> };

function isNotFoundError(error: unknown) {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025';
}

export async function GET(_request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { slug } = await params;

  try {
    const row = await prisma.page.findUnique({ where: { slug } });

    if (!row) {
      return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
    }

    return NextResponse.json({ page: toDetailItem(row) });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load page:', error);
    } else {
      console.error('Failed to load page:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not load page.' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { slug } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Slug is intentionally not part of updatePageSchema — the UI has no slug
  // editing control, so even if a client sends one, Zod silently drops it.
  const result = updatePageSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid request body.' },
      { status: 400 }
    );
  }

  const data = result.data;
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Provide at least one field to update.' }, { status: 400 });
  }

  try {
    const existing = await prisma.page.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
    }

    const nextSeoTitle = data.seoTitle !== undefined ? data.seoTitle : existing.seoTitle;
    const nextMetaDescription = data.metaDescription !== undefined ? data.metaDescription : existing.metaDescription;

    const updated = await prisma.page.update({
      where: { slug },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.seoTitle !== undefined && { seoTitle: data.seoTitle || null }),
        ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription || null }),
        ...(data.contentJson !== undefined && { contentJson: data.contentJson as object }),
        // seoStatus is derived, not client-settable, so it always reflects
        // the real seoTitle/metaDescription state instead of trusting input.
        seoStatus: deriveSeoStatus(nextSeoTitle, nextMetaDescription),
        // No real admin-user system yet — same placeholder convention used
        // for Article.author until auth exists.
        updatedBy: 'Admin',
      },
    });

    return NextResponse.json({ page: toDetailItem(updated) });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to update page:', error);
    } else {
      console.error('Failed to update page:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not update page.' }, { status: 500 });
  }
}
