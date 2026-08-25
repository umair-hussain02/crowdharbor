'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, FileText, BarChart2, FolderOpen, Map, DollarSign } from 'lucide-react';
import { cn, resourceTw } from './resourcesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const resourceCards = [
  { icon: FileText, label: 'Pitch Deck Checklist', variant: 'brand' },
  { icon: BarChart2, label: 'Funding Readiness Guide', variant: 'dark' },
  { icon: FolderOpen, label: 'Data Room Checklist', variant: 'brand' },
  { icon: Map, label: 'Capital Pathway Guide', variant: 'dark' },
  { icon: DollarSign, label: 'Use-of-Funds Template', variant: 'brand' },
];

const cardType = (index: number) =>
  index === 0 ? 'Checklist' : index === 1 ? 'Guide' : index === 2 ? 'Checklist' : index === 3 ? 'Framework' : 'Template';

export function ResourcesHero() {
  return (
    <section className="bg-[var(--color-bg-cream)] pb-20 pt-[var(--hero-padding-top)]">
      <div className={resourceTw.container}>
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-6 inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] px-3.5 py-1.5 text-[13px] font-semibold tracking-[0.02em] text-[var(--color-brand-orange)]"
            >
              Founder preparation resources
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="mb-5 text-[clamp(34px,5vw,56px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--color-text-primary)]"
            >
              Learn what to fix before you approach capital.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="mb-9 max-w-[520px] text-[17px] leading-[1.65] text-[var(--color-text-secondary)]"
            >
              Practical guides, checklists, and funding-readiness insights for early-stage founders preparing for investors, crowdfunding platforms, grants, accelerators, or other capital sources.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/intake" className={resourceTw.primaryLink}>
                Check Your Funding Readiness
                <ArrowRight size={15} />
              </Link>
              <Link href="/sample-report" className={resourceTw.secondaryLink}>
                View Sample Report
              </Link>
            </motion.div>
          </div>

          <div className="hidden flex-col gap-2.5 md:flex">
            {resourceCards.map((card, i) => {
              const Icon = card.icon;
              const isBrand = card.variant === 'brand';
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.08 }}
                  className={cn(
                    'flex items-center gap-3.5 rounded-[14px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-5 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
                    i % 2 === 0 ? 'translate-x-0' : 'translate-x-4',
                  )}
                >
                  <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-[10px]', isBrand ? 'bg-[var(--color-brand-orange-tint)]' : 'bg-[var(--color-neutral-tint)]')}>
                    <Icon size={18} className={isBrand ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-primary)]'} />
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">{card.label}</span>
                  <div className="ml-auto">
                    <div className={cn('rounded-[var(--radius-pill)] px-2.5 py-[3px] text-[11px] font-semibold', isBrand ? 'bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]' : 'bg-[var(--color-neutral-tint)] text-[var(--color-text-muted)]')}>
                      {cardType(i)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
