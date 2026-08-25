import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { toPublicDetailItem } from '@/lib/public/articles';
import { resourceTw } from '@/components/resources/resourcesTailwind';
import { ArticleViewTracker } from '@/components/analytics/ArticleViewTracker';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const row = await prisma.article.findUnique({ where: { slug } });
  if (!row || row.status !== 'published') {
    notFound();
  }

  const article = toPublicDetailItem(row);

  return (
    <article className={resourceTw.sectionCream}>
      <ArticleViewTracker slug={article.slug} />
      <div className="mx-auto max-w-[720px] px-6 mt-12">
        <Link
          href="/resources"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text-subtle)] no-underline hover:text-[var(--color-brand-orange)]"
        >
          <ArrowLeft size={14} /> Back to Resources
        </Link>

        <div className={resourceTw.pill}>{article.category}</div>

        <h1 className="mb-4 mt-4 text-[clamp(26px,4vw,42px)] font-extrabold leading-[1.15] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">
          {article.title}
        </h1>

        <div className="mb-10 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-subtle)]">
          <span>{article.author}</span>
          {article.publishedAt && <span>· {article.publishedAt}</span>}
          <span className="flex items-center gap-1.5">
            <Clock size={13} /> {article.readTime}
          </span>
        </div>

        {article.excerpt && (
          <p className="mb-8 text-lg leading-[1.6] text-[var(--color-text-muted)]">{article.excerpt}</p>
        )}

        <div className="whitespace-pre-wrap text-base leading-[1.8] text-[var(--color-text-secondary)]">
          {article.content || 'This article does not have content yet.'}
        </div>
      </div>
    </article>
  );
}
