'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { resourceTw } from './resourcesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const previewItems = [
  { icon: TrendingUp, label: 'Strong market narrative', ok: true },
  { icon: AlertTriangle, label: 'Data room incomplete', ok: false },
  { icon: CheckCircle, label: 'Pathway identified', ok: true },
];

export function ResourcesCTA() {
  return (
    <section className={resourceTw.sectionWhite}>
      <div className={resourceTw.container}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-1 items-center gap-12 rounded-[28px] bg-[var(--color-bg-cream)] px-6 py-12 md:grid-cols-[1fr_auto] md:px-14 md:py-16"
        >
          <div>
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-orange)]">Ready to go deeper?</div>
            <h2 className="mb-4 text-[clamp(22px,3vw,38px)] font-extrabold leading-[1.15] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">
              Reading helps. A readiness review shows where you actually stand.
            </h2>
            <p className="mb-9 max-w-[520px] text-[17px] leading-[1.65] text-[var(--color-text-secondary)]">
              CrowdHarbor reviews your company stage, traction, materials, funding goals, and pathway fit so you know what to fix before approaching capital.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/intake" className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-[26px] py-3.5 text-[15px] font-bold text-[var(--color-text-on-dark)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-brand-orange-hover)]">
                Check Your Funding Readiness
                <ArrowRight size={15} />
              </Link>
              <Link href="/sample-report" className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-[26px] py-3.5 text-[15px] font-bold text-[var(--color-text-primary)] no-underline transition-colors duration-200 hover:border-[var(--color-text-primary)]">
                View Sample Report
              </Link>
            </div>
          </div>

          <div className="hidden min-w-60 flex-col gap-3 md:flex">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-5 py-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">Readiness Score</div>
              <div className="mb-2 flex items-baseline gap-[3px]">
                <span className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--color-brand-orange)]">62</span>
                <span className="text-sm font-semibold text-[var(--color-text-subtle)]">/100</span>
              </div>
              <div className="h-[5px] overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-bg-admin-muted)]">
                <div className="h-full w-[62%] rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)]" />
              </div>
            </motion.div>

            <div className="rounded-[14px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-[18px] py-3.5">
              {previewItems.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="mb-2 flex items-center gap-2 last:mb-0">
                    <Icon size={13} className={item.ok ? 'text-[#22c55e]' : 'text-[var(--color-brand-orange)]'} />
                    <span className="text-xs font-medium text-[var(--color-text-secondary)]">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
