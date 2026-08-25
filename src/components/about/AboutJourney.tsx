'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { container, ease, section, text } from './aboutTailwind';

const before = ['Unsure if ready to raise', 'Pitch feels unclear', 'Financials may be incomplete', 'Documents are scattered', 'Funding path is uncertain', 'Outreach feels risky'];
const after = ['Readiness diagnosis', 'Clearer blockers identified', 'Material review notes', 'Pathway recommendation', 'Structured action plan', 'Better preparation before outreach'];

export function AboutJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={section.cream}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>The transformation</div>
          <h2 className={text.sectionTitle}>From uncertainty to a clearer preparation plan.</h2>
          <p className={`${text.description} max-w-[560px]`}>CrowdHarbor helps founders move from unclear funding readiness to a structured view of what to fix, what to prepare, and which path may fit.</p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, ease }} className="rounded-[22px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-8 py-9">
            <div className="mb-5 text-xs font-bold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-text-subtle)]">Before CrowdHarbor</div>
            <div className="flex flex-col gap-3">
              {before.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.1 + i * 0.06 }} className="flex items-center gap-2.5">
                  <X size={14} strokeWidth={2.5} className="shrink-0 text-[#CCC]" />
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, ease, delay: 0.3 }} className="hidden shrink-0 items-center justify-center md:flex">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)] shadow-[var(--shadow-dot-active)]"><ArrowRight size={20} /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, ease, delay: 0.15 }} className="rounded-[22px] border-2 border-[var(--color-brand-orange)] bg-[var(--color-bg-white)] px-8 py-9 shadow-[0_8px_32px_rgba(253,102,40,0.1)]">
            <div className="mb-5 text-xs font-bold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]">After CrowdHarbor</div>
            <div className="flex flex-col gap-3">
              {after.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.35, ease, delay: 0.25 + i * 0.06 }} className="flex items-center gap-2.5">
                  <CheckCircle size={14} strokeWidth={2.5} className="shrink-0 text-[var(--color-brand-orange)]" />
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
