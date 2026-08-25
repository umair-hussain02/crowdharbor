import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updatePageFaqSchema } from '@/lib/validators/pageFaq';
import { findPageBySlug, toListItem } from '@/lib/admin/pageFaqs';
import { requireAdmin } from '@/lib/admin/session';

type RouteParams = { params: Promise<{ slug: string; faqId: string }> };

export async function PATCH(request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { slug, faqId } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const result = updatePageFaqSchema.safeParse(body);
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
    const page = await findPageBySlug(slug);
    if (!page) {
      return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
    }

    // Scoped by pageId too, so a faqId can never be used to edit a FAQ that
    // belongs to a different page.
    const existing = await prisma.pageFaq.findFirst({ where: { id: faqId, pageId: page.id } });
    if (!existing) {
      return NextResponse.json({ error: 'FAQ not found.' }, { status: 404 });
    }

    const updated = await prisma.pageFaq.update({
      where: { id: faqId },
      data: {
        ...(data.question !== undefined && { question: data.question }),
        ...(data.answer !== undefined && { answer: data.answer }),
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });

    return NextResponse.json({ faq: toListItem(updated) });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to update page FAQ:', error);
    } else {
      console.error('Failed to update page FAQ:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not update FAQ.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { slug, faqId } = await params;

  try {
    const page = await findPageBySlug(slug);
    if (!page) {
      return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
    }

    const existing = await prisma.pageFaq.findFirst({ where: { id: faqId, pageId: page.id } });
    if (!existing) {
      return NextResponse.json({ error: 'FAQ not found.' }, { status: 404 });
    }

    await prisma.pageFaq.delete({ where: { id: faqId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to delete page FAQ:', error);
    } else {
      console.error('Failed to delete page FAQ:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Could not delete FAQ.' }, { status: 500 });
  }
}
