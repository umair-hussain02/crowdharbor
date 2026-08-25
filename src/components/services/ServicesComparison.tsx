'use client';

import { motion } from 'motion/react';
import { Check, Minus } from 'lucide-react';
import { cn, servicesTw } from './servicesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  { label: 'Readiness scorecard', r: true, s: true, p: true },
  { label: 'Strength / weakness overview', r: true, s: true, p: true },
  { label: 'Top funding blockers', r: true, s: true, p: true },
  { label: 'Basic pathway recommendation', r: true, s: false, p: false },
  { label: 'Pitch deck review', r: false, s: true, p: true },
  { label: 'Financial readiness review', r: false, s: true, p: true },
  { label: 'Data room checklist', r: false, s: true, p: true },
  { label: 'Strategy session', r: false, s: true, p: true },
  { label: 'Capital pathway recommendation', r: false, s: true, p: true },
  { label: '7–14 day roadmap', r: false, s: true, p: true },
  { label: 'Pitch narrative improvement', r: false, s: false, p: true },
  { label: 'Deck structure recommendations', r: false, s: false, p: true },
  { label: 'Financial model feedback', r: false, s: false, p: true },
  { label: 'Follow-up readiness review', r: false, s: false, p: true },
  { label: '2–4 week support', r: false, s: false, p: true },
];

export function ServicesComparison() {
  return (
    <section id="comparison" className={servicesTw.sectionWhite}>
      <div className={servicesTw.container}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mx-auto mb-14 max-w-[640px] text-center">
          <span className={servicesTw.eyebrow}>COMPARE OPTIONS</span>
          <h2 className={servicesTw.title}>Compare the preparation options.</h2>
          <p className={servicesTw.desc}>Each offer is designed for a different level of readiness, urgency, and support.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="hidden overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[0_8px_40px_rgba(0,0,0,0.05)] md:block">
          <div className="grid grid-cols-4 border-b border-[var(--color-border)]">
            <div className="px-6 py-5 text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--color-text-subtle)]">Feature</div>
            {[
              { label: 'Readiness Review', highlighted: false },
              { label: 'Capital Pathway Sprint', highlighted: true },
              { label: 'Preparation Program', highlighted: false },
            ].map(col => (
              <div key={col.label} className={cn('border-l px-6 py-5', col.highlighted ? 'border-l-[rgba(253,102,40,0.15)] bg-[rgba(253,102,40,0.04)]' : 'border-l-[var(--color-border-divider)] bg-transparent')}>
                <div className="font-[var(--font-heading)] text-sm font-bold text-[var(--color-text-primary)]">{col.label}</div>
                {col.highlighted && <div className="mt-[3px] text-[11px] font-bold text-[var(--color-brand-orange)]">Recommended</div>}
              </div>
            ))}
          </div>

          {features.map((feat, i) => (
            <motion.div key={feat.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.35, ease }} className={cn('grid grid-cols-4', i < features.length - 1 && 'border-b border-[#F5F5F5]', i % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-[var(--color-bg-white)]')}>
              <div className="px-6 py-3.5 text-sm font-medium text-[#333333]">{feat.label}</div>
              {[feat.r, feat.s, feat.p].map((has, j) => (
                <div key={j} className={cn('flex items-center justify-center border-l px-6 py-3.5', j === 1 ? 'border-l-[rgba(253,102,40,0.1)] bg-[rgba(253,102,40,0.02)]' : 'border-l-[var(--color-border-divider)] bg-transparent')}>
                  {has ? (
                    <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]"><Check size={12} /></div>
                  ) : (
                    <Minus size={16} className="text-[#DDDDDD]" />
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:hidden">
          {[
            { title: 'Readiness Review', items: features.filter(f => f.r).map(f => f.label) },
            { title: 'Capital Pathway Sprint', items: features.filter(f => f.s).map(f => f.label), highlighted: true },
            { title: 'Preparation Program', items: features.filter(f => f.p).map(f => f.label) },
          ].map((col) => (
            <motion.div key={col.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className={cn('rounded-[20px] bg-[var(--color-bg-white)] p-6', col.highlighted ? 'border-2 border-[var(--color-brand-orange)] shadow-[0_12px_40px_rgba(253,102,40,0.1)]' : 'border border-[var(--color-border)] shadow-[var(--shadow-card)]')}>
              <div className={cn('font-[var(--font-heading)] text-[15px] font-bold text-[var(--color-text-primary)]', col.highlighted ? 'mb-1' : 'mb-3.5')}>{col.title}</div>
              {col.highlighted && <div className="mb-3.5 text-[11px] font-bold text-[var(--color-brand-orange)]">Recommended</div>}
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {col.items.map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <Check size={13} className="shrink-0 text-[var(--color-brand-orange)]" />
                    <span className="text-[13px] text-[var(--color-text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
