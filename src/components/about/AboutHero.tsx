'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, AlertCircle, FileX, BarChart2, HelpCircle, Activity, Map, CheckSquare } from 'lucide-react';
import { button, container, cx, ease, section } from './aboutTailwind';

const mapItems = [
  { icon: AlertCircle, label: 'Unclear Pitch', dim: true },
  { icon: FileX, label: 'Missing Materials', dim: true },
  { icon: BarChart2, label: 'Weak Financials', dim: true },
  { icon: HelpCircle, label: 'Funding Path Confusion', dim: true },
  { icon: Activity, label: 'Readiness Diagnosis', dim: false },
  { icon: Map, label: 'Capital Pathway Plan', dim: false },
  { icon: CheckSquare, label: 'Action Plan', dim: false },
];

export function AboutHero() {
  return (
    <section className={section.hero}>
      <div className={container.lg}>
        <div className="grid grid-cols-1 items-center gap-[72px] md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className="mb-[22px] inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] px-3.5 py-[5px] text-xs font-bold uppercase tracking-[var(--letter-spacing-wider)] text-[var(--color-brand-orange)]"
            >
              About CrowdHarbor
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.08 }}
              className="mb-[18px] text-[clamp(32px,4.5vw,54px)] font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)]"
            >
              Built for founders who want to prepare before they raise.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.14 }}
              className="mb-8 max-w-[480px] text-[17px] leading-[var(--line-height-relaxed)] text-[var(--color-text-secondary)]"
            >
              CrowdHarbor helps early-stage founders understand their funding readiness, identify missing materials, improve their preparation, and choose a better capital pathway before approaching investors, crowdfunding platforms, grants, accelerators, or other funding sources.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
              className="mb-5 flex flex-wrap gap-3"
            >
              <Link href="/intake" className={button.primary}>
                Check Your Funding Readiness
                <ArrowRight size={15} />
              </Link>
              <Link href="/how-it-works" className={button.secondary}>
                See How It Works
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-medium text-[var(--color-text-subtle)]"
            >
              Preparation before outreach. No funding guarantees. No broker promises.
            </motion.p>
          </div>

          <div className="hidden flex-col md:flex">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
              className="mb-4 h-[3px] origin-left rounded-[var(--radius-pill)] bg-[linear-gradient(90deg,var(--color-border)_0%,var(--color-brand-orange)_55%,var(--color-brand-orange)_100%)]"
            />
            <div className="flex flex-col gap-2">
              {mapItems.map((item, i) => {
                const Icon = item.icon;
                const isFirst = i === 4;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease, delay: 0.2 + i * 0.07 }}
                    className={cx(
                      'flex items-center gap-3 rounded-xl border-[1.5px] px-[18px] py-3',
                      item.dim
                        ? 'border-[#E8E8E0] bg-white/50 opacity-60'
                        : 'bg-[var(--color-bg-white)] shadow-[0_2px_12px_rgba(0,0,0,0.06)]',
                      !item.dim && (isFirst ? 'border-[var(--color-brand-orange)]' : 'border-[var(--color-border)]'),
                      i === 1 && 'ml-1.5',
                      i === 2 && 'ml-3',
                      i === 3 && 'ml-[18px]',
                    )}
                  >
                    <div className={cx('flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg', item.dim ? 'bg-[var(--color-bg-admin-muted)] text-[var(--color-text-faint)]' : 'bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]')}>
                      <Icon size={14} />
                    </div>
                    <span className={cx('text-[13px]', item.dim ? 'font-medium text-[var(--color-text-faint)]' : 'font-bold text-[var(--color-text-primary)]')}>
                      {item.label}
                    </span>
                    {!item.dim && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-brand-orange)]" />}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
