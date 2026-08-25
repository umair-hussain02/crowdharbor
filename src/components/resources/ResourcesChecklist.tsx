'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { resourceTw } from './resourcesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const checklistItems = [
  'Clear pitch narrative',
  'Updated pitch deck',
  'Financial model or revenue summary',
  'Use-of-funds breakdown',
  'Traction proof',
  'Market positioning',
  'Data room documents',
  'Founder story',
  'Funding target',
  'Preferred capital pathway',
];

export function ResourcesChecklist() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={resourceTw.sectionWhite}>
      <div className={resourceTw.container}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-3">
          <div className={resourceTw.eyebrow}>Preparation checklist</div>
          <div className="mb-2 text-[clamp(22px,3vw,36px)] font-extrabold tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">Before you raise, check these areas.</div>
          <p className="max-w-[600px] text-base leading-[1.6] text-[var(--color-text-secondary)]">
            Use this quick checklist to understand whether your company has the basic preparation signals funding sources may expect.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mt-9 grid grid-cols-1 items-start gap-12 rounded-[24px] bg-[var(--color-bg-cream)] p-6 md:grid-cols-[1fr_auto] md:p-12"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-3.5 md:grid-cols-2">
            {checklistItems.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease, delay: i * 0.05 }} className="flex items-center gap-3">
                <CheckCircle size={18} strokeWidth={2.5} className="shrink-0 text-[var(--color-brand-orange)]" />
                <span className="text-[15px] font-semibold text-[var(--color-text-primary)]">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.5 }}
            className="w-full max-w-[300px] rounded-[20px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-7 py-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:w-auto md:min-w-[260px]"
          >
            <div className="mb-2.5 text-[15px] font-bold leading-[1.3] text-[var(--color-text-primary)]">Not sure where you stand?</div>
            <p className="mb-5 text-[13px] leading-[1.6] text-[var(--color-text-secondary)]">CrowdHarbor can review your readiness, materials, blockers, and pathway fit.</p>
            <Link href="/intake" className="flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-5 py-3 text-sm font-bold text-[var(--color-text-on-dark)] no-underline transition-colors duration-200 hover:bg-[var(--color-brand-orange-hover)]">
              Check Your Funding Readiness
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
