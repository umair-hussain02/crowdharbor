import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin/session';

const PER_GROUP = 5;

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') ?? '').trim();

  if (!q) {
    return NextResponse.json({ query: '', groups: [] });
  }

  try {
    const [submissions, contactMessages, posts, pages] = await Promise.all([
      prisma.intakeSubmission.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { companyName: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
        take: PER_GROUP,
        select: { id: true, name: true, companyName: true, selectedService: true },
      }),
      prisma.contactSubmission.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
            { message: { contains: q, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
        take: PER_GROUP,
        select: { id: true, name: true, inquiryType: true },
      }),
      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { excerpt: { contains: q, mode: 'insensitive' } },
          ],
        },
        orderBy: { updatedAt: 'desc' },
        take: PER_GROUP,
        select: { id: true, title: true, status: true },
      }),
      prisma.page.findMany({
        where: { title: { contains: q, mode: 'insensitive' } },
        orderBy: { updatedAt: 'desc' },
        take: PER_GROUP,
        select: { slug: true, title: true, routePath: true },
      }),
    ]);

    const groups = [
      {
        key: 'submissions',
        label: 'Founder Submissions',
        items: submissions.map((row) => ({
          id: row.id,
          title: row.name,
          subtitle: `${row.companyName} • ${row.selectedService}`,
          href: `/admin/submissions/${row.id}`,
        })),
      },
      {
        key: 'contactMessages',
        label: 'Contact Messages',
        items: contactMessages.map((row) => ({
          id: row.id,
          title: row.name,
          subtitle: row.inquiryType,
          href: `/admin/contact-messages/${row.id}`,
        })),
      },
      {
        key: 'posts',
        label: 'Blog Posts',
        items: posts.map((row) => ({
          id: row.id,
          title: row.title,
          subtitle: row.status,
          href: `/admin/blog/${row.id}/edit`,
        })),
      },
      {
        key: 'pages',
        label: 'Pages',
        items: pages.map((row) => ({
          id: row.slug,
          title: row.title,
          subtitle: row.routePath,
          href: `/admin/pages`,
        })),
      },
    ].filter((group) => group.items.length > 0);

    return NextResponse.json({ query: q, groups });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to run admin search:', error);
    } else {
      console.error('Failed to run admin search:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ error: 'Search failed.' }, { status: 500 });
  }
}
