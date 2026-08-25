'use client';

import { motion } from 'motion/react';
import { Users, ArrowRight, Check } from 'lucide-react';
import { servicesTw } from './servicesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const includes = ['Founder readiness workshop', 'Funding pathway education', 'Pitch readiness checklist', 'Group diagnostic session', 'Optional discounted founder reviews'];

export function ServicesWorkshops() {
  return (
    <section className={servicesTw.sectionCreamShort}>
      <div className={servicesTw.container}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="flex flex-col gap-6 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-12 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)] lg:flex-row">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr_auto] lg:gap-16">
            <div className="flex flex-col items-start gap-3">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[var(--color-brand-orange-tint-soft)] text-[var(--color-brand-orange)]"><Users size={26} /></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-brand-orange)]">FOR COMMUNITIES</span>
            </div>
            <div>
              <h3 className="mb-2 font-[var(--font-heading)] text-[clamp(18px,2.5vw,26px)] font-extrabold leading-[1.2] text-[var(--color-text-primary)]">Workshops for founder communities and startup programs.</h3>
              <p className="mb-4 text-[15px] leading-[1.7] text-[var(--color-text-tertiary)]">CrowdHarbor can support accelerators, universities, startup centers, and founder communities with funding-readiness workshops, pathway education, and group diagnostic sessions.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {includes.map(item => (
                  <div key={item} className="flex items-center gap-1.5">
                    <Check size={13} className="text-[var(--color-brand-orange)]" />
                    <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <motion.a href="/contact" className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-transparent px-6 py-[13px] font-[var(--font-body)] text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-brand-orange)]" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                Ask About Workshops <ArrowRight size={14} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
