'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { button, container, ease, section } from './aboutTailwind';

export function AboutFinalCTA() {
  return (
    <section className={section.white}>
      <div className={container.md}>
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="grid grid-cols-1 items-center gap-12 rounded-[28px] bg-[var(--color-bg-cream)] px-14 py-16 md:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]">Ready when you are</div>
            <h2 className="mb-4 text-[clamp(26px,3.5vw,44px)] font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)]">Prepare before you approach capital.</h2>
            <p className="mb-9 max-w-[500px] text-[17px] leading-[var(--line-height-relaxed)] text-[var(--color-text-secondary)]">CrowdHarbor helps founders understand readiness, identify gaps, review materials, choose a better funding path, and build an action plan before outreach.</p>
            <div className="mb-6 flex flex-wrap gap-3">
              <Link href="/intake" className={button.primaryLarge}>Check Your Funding Readiness<ArrowRight size={15} /></Link>
              <Link href="/how-it-works" className={button.secondaryLarge}>See How It Works</Link>
            </div>
            <Link href="/sample-report" className="text-[13px] font-semibold text-[var(--color-brand-orange)] no-underline hover:underline">View Sample Report →</Link>
            <div className="mt-5 text-xs font-medium text-[var(--color-text-subtle)]">No funding guarantees. No broker promises. Structured preparation before outreach.</div>
          </div>

          <div className="hidden min-w-[220px] flex-col gap-2.5 md:flex">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} className="rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-5 py-[18px] shadow-[0_8px_28px_rgba(0,0,0,0.09)]">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-text-subtle)]">Readiness Score</div>
              <div className="mb-2 flex items-baseline gap-[3px]"><span className="text-4xl font-extrabold tracking-[var(--letter-spacing-tight)] text-[var(--color-brand-orange)]">74</span><span className="text-sm font-semibold text-[var(--color-text-subtle)]">/100</span></div>
              <div className="h-[5px] overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-bg-admin-muted)]"><div className="h-full w-[74%] rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)]" /></div>
            </motion.div>
            {['Pathway identified', 'Materials reviewed', 'Action plan ready'].map(item => (
              <div key={item} className="flex items-center gap-2 rounded-xl border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-4 py-3">
                <CheckCircle size={14} className="text-[var(--color-brand-orange)]" />
                <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
