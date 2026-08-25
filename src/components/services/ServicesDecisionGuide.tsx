'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn, servicesTw } from './servicesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const cards = [
  { title: 'Funding Readiness Review', conditions: ['You are early and unsure where you stand', 'You want a quick diagnosis', 'You do not have all materials ready', 'You want to identify major blockers first'], cta: 'Start With Review', anchor: '/intake', highlighted: false },
  { title: 'Capital Pathway Sprint', badge: 'Best starting point', conditions: ['You are preparing to raise soon', 'You have some traction or materials', 'You need deck, financial, and pathway review', 'You want a practical roadmap before outreach'], cta: 'Apply for Sprint', anchor: '/contact', highlighted: true },
  { title: 'Preparation Program', conditions: ['You need deeper support', 'Your materials need improvement', 'You are preparing for serious outreach', 'You want 2–4 weeks of guidance'], cta: 'Apply for Support', anchor: '/contact', highlighted: false },
];

export function ServicesDecisionGuide() {
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={servicesTw.sectionCream}>
      <div className={servicesTw.container}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mx-auto mb-14 max-w-[580px] text-center">
          <span className={servicesTw.eyebrow}>DECISION GUIDE</span>
          <h2 className={servicesTw.title}>Not sure where to start?</h2>
          <p className={servicesTw.desc}>Choose based on how close you are to fundraising and how much preparation support you need.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              whileHover={{ y: -4 }}
              className={cn(
                'relative flex flex-col rounded-[24px] bg-[var(--color-bg-white)] p-8 transition-colors',
                card.highlighted
                  ? 'border-2 border-[var(--color-brand-orange)] shadow-[var(--shadow-card-brand)]'
                  : 'border border-[var(--color-border)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:border-[var(--color-brand-orange)]',
              )}
            >
              {card.badge && <span className="absolute -top-[13px] left-6 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-3 py-[3px] text-[11px] font-bold text-[var(--color-text-on-dark)]">{card.badge}</span>}
              <div className={cn('mb-2 text-[11px] font-bold uppercase tracking-[0.06em]', card.highlighted ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-subtle)]')}>{card.highlighted ? 'RECOMMENDED' : 'CHOOSE THIS IF'}</div>
              <div className="mb-5 font-[var(--font-heading)] text-lg font-extrabold leading-[1.25] text-[var(--color-text-primary)]">{card.title}</div>
              <ul className="mb-7 flex flex-1 list-none flex-col gap-2.5 p-0">
                {card.conditions.map(c => (
                  <li key={c} className="flex items-start gap-2.5">
                    <span className={cn('mt-0.5 shrink-0 text-sm', card.highlighted ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-faint)]')}>→</span>
                    <span className="text-sm leading-normal text-[var(--color-text-secondary)]">{c}</span>
                  </li>
                ))}
              </ul>
              <motion.a href={card.anchor} className={cn('flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] px-5 py-3 font-[var(--font-body)] text-sm font-semibold', card.highlighted ? 'border-0 bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)]' : 'border border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:border-[var(--color-brand-orange)]')} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                {card.cta} <ArrowRight size={14} />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
