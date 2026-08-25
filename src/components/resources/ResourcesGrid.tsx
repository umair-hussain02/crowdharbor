'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { cn, resourceTw } from './resourcesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

type PublicArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
};

export function ResourcesGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [articles, setArticles] = useState<PublicArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/articles');
        const result = await response.json().catch(() => null);

        if (cancelled) return;

        if (!response.ok || !result?.items) {
          setError('Could not load articles right now.');
          return;
        }

        setArticles(result.items);
      } catch {
        if (!cancelled) setError('Could not load articles right now.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Category chips are derived from whatever published articles actually
  // exist, so they always match real data instead of a fixed, hand-typed list.
  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];
  const filtered = activeCategory === 'All' ? articles : articles.filter(a => a.category === activeCategory);

  return (
    <section className="bg-[var(--color-bg-cream)] pb-20 pt-0">
      <div className={resourceTw.container}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-7">
          <div className="text-[clamp(22px,3vw,32px)] font-extrabold tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">Browse by preparation area.</div>
        </motion.div>

        {loading ? (
          <div className="py-[60px] text-center text-[15px] text-[var(--color-text-subtle)]">Loading articles…</div>
        ) : error ? (
          <div className="py-[60px] text-center text-[15px] text-[var(--color-text-subtle)]">{error}</div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: 0.1 }} className="mb-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'cursor-pointer whitespace-nowrap rounded-[var(--radius-pill)] border-[1.5px] px-[18px] py-2 font-[var(--font-body)] text-[13px] font-semibold transition-all duration-200',
                    activeCategory === cat
                      ? 'border-[var(--color-brand-orange)] bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)]'
                      : 'border-[var(--color-border)] bg-[var(--color-bg-white)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-orange)]',
                  )}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                    className="rounded-[20px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-orange)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)]"
                  >
                    <Link href={`/resources/${article.slug}`} className="flex h-full cursor-pointer flex-col p-7 no-underline">
                      <div className="mb-4 self-start rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] px-3 py-1 text-[11px] font-bold tracking-[0.03em] text-[var(--color-brand-orange)]">{article.category}</div>
                      <h3 className="mb-3 flex-1 text-base font-bold leading-[1.35] tracking-[-0.01em] text-[var(--color-text-primary)]">{article.title}</h3>
                      <p className="mb-5 text-sm leading-[1.6] text-[var(--color-text-muted)]">{article.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-[5px] text-xs font-medium text-[var(--color-text-subtle)]">
                          <Clock size={12} />
                          {article.readTime}
                        </div>
                        <span className="flex items-center gap-[5px] font-[var(--font-body)] text-[13px] font-bold text-[var(--color-brand-orange)]">
                          Read Article
                          <ArrowRight size={13} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="py-[60px] text-center text-[15px] text-[var(--color-text-subtle)]">No articles in this category yet. More guides coming soon.</div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
