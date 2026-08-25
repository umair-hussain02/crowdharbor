'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Target, Layers } from 'lucide-react';
import { cn, servicesTw } from './servicesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  { icon: Zap, num: '01', title: 'Funding Readiness Review', bestFor: 'Founders who want to know where they stand.', includes: ['Readiness scorecard', 'Strength and weakness overview', 'Top funding blockers', 'Basic pathway recommendation', 'Short action plan'], cta: 'Get My Review', anchor: '#offer1', highlighted: false },
  { icon: Target, num: '02', title: 'Capital Pathway Sprint', bestFor: 'Founders preparing to raise soon and needing a deeper review.', includes: ['Readiness review', 'Pitch deck review', 'Financial readiness review', 'Data room checklist', 'Strategy session', 'Capital pathway recommendation', '7–14 day roadmap'], cta: 'Apply for the Sprint', anchor: '#sprint', highlighted: true, badge: 'Recommended' },
  { icon: Layers, num: '03', title: 'Fundraising Preparation Program', bestFor: 'Founders who need deeper preparation before approaching capital.', includes: ['Everything in the Sprint', 'Pitch narrative improvement', 'Deck structure recommendations', 'Financial model feedback', 'Follow-up readiness review', '2–4 week support'], cta: 'Apply for Support', anchor: '#offer3', highlighted: false },
];

export function ServicesOverview() {
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={servicesTw.sectionWhite}>
      <div className={servicesTw.container}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className={servicesTw.headerLg}>
          <span className={servicesTw.eyebrow}>SERVICE OPTIONS</span>
          <h2 className={servicesTw.titleLarge}>Three ways to prepare before you raise.</h2>
          <p className={servicesTw.descLg}>Start with a readiness diagnosis, move into a deeper capital pathway sprint, or get hands-on preparation support before funding outreach.</p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div key={svc.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease }} whileHover={{ y: -6 }} className={cn('relative rounded-[24px] bg-[var(--color-bg-white)] p-9 transition-colors', svc.highlighted ? 'border-2 border-[var(--color-brand-orange)] shadow-[0_24px_60px_rgba(253,102,40,0.1)]' : 'border border-[var(--color-border)] shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:border-[var(--color-brand-orange)]')}>
                {svc.badge && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-4 py-1 text-[11px] font-bold text-[var(--color-text-on-dark)]">{svc.badge}</div>}
                <div className="mb-5 flex items-start justify-between">
                  <div className={servicesTw.orangeIcon}><Icon size={22} /></div>
                  <span className="font-[var(--font-heading)] text-[13px] font-extrabold text-[var(--color-border)]">{svc.num}</span>
                </div>
                <div className="mb-2 font-[var(--font-heading)] text-xl font-extrabold text-[var(--color-text-primary)]">{svc.title}</div>
                <div className="mb-5 text-sm leading-normal text-[var(--color-text-muted)]"><span className="font-semibold text-[var(--color-text-secondary)]">Best for: </span>{svc.bestFor}</div>
                <div className="mb-5 h-px bg-[var(--color-border-divider)]" />
                <ul className="mb-7 flex list-none flex-col gap-[9px] p-0">
                  {svc.includes.map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className={cn('mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full', svc.highlighted ? 'bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]' : 'bg-[rgba(0,0,0,0.05)] text-[var(--color-text-subtle)]')}><Check size={10} /></div>
                      <span className="text-sm leading-normal text-[var(--color-text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.button onClick={() => scroll(svc.anchor)} className={cn('flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] px-5 py-[13px] font-[var(--font-body)] text-sm font-semibold', svc.highlighted ? 'border-0 bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)]' : 'border border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:border-[var(--color-brand-orange)]')} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  {svc.cta} <ArrowRight size={14} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
