'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { servicesTw } from './servicesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

export function ServicesFinalCTA() {
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={servicesTw.sectionWhite}>
      <div className={servicesTw.container}>
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="relative overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-bg-cream)] px-[clamp(28px,5vw,72px)] py-[clamp(40px,6vw,80px)] text-center shadow-[0_24px_80px_rgba(0,0,0,0.05)]">
          <div className="pointer-events-none absolute -right-[60px] -top-[60px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(253,102,40,0.07)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(253,102,40,0.05)_0%,transparent_70%)]" />

          <div className="relative z-[1] mx-auto max-w-[680px]">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }} className="mb-[18px] font-[var(--font-heading)] text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-text-primary)]">
              Choose your preparation path before you raise.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease }} className="mb-10 text-base leading-[1.75] text-[var(--color-text-tertiary)]">
              Start with a readiness diagnosis, apply for the Capital Pathway Sprint, or get deeper preparation support before approaching investors, crowdfunding platforms, grants, or accelerators.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }} className="flex flex-col items-center gap-3.5">
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.a href="/contact" className="inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] px-8 py-4 font-[var(--font-body)] text-[15px] font-semibold text-[var(--color-text-on-dark)]" whileHover={{ scale: 1.03, y: -2 }} transition={{ duration: 0.2 }}>
                  Apply for the Capital Pathway Sprint
                  <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}><ArrowRight size={16} /></motion.span>
                </motion.a>
                <motion.a href="/intake" className="inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-8 py-4 font-[var(--font-body)] text-[15px] font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-brand-orange)]" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  Start With a Readiness Review
                </motion.a>
              </div>
              <motion.a href="/sample-report" className="cursor-pointer border-0 bg-transparent font-[var(--font-body)] text-sm font-medium text-[var(--color-text-subtle)] underline decoration-[rgba(0,0,0,0.15)]" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                View Sample Report →
              </motion.a>
              <p className="mt-0.5 text-[13px] text-[var(--color-text-faint)]">No funding guarantees. No broker promises. Just structured preparation before outreach.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
