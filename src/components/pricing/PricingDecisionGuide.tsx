'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { cn, pricingTw } from './pricingTailwind';
import { useServices, findService, formatServicePrice, SERVICE_SLUGS } from '@/lib/hooks/useServices';

const ease = [0.22, 1, 0.36, 1] as const;

const cards = [
  { title: 'Choose Readiness Review if:', slug: SERVICE_SLUGS.review, fallback: '€149', conditions: ['You are unsure where you stand', 'You want a quick professional diagnosis', 'You do not have full materials yet', 'You want to identify blockers first'], cta: 'Start With Review', badge: null, highlighted: false },
  { title: 'Choose Capital Pathway Sprint if:', slug: SERVICE_SLUGS.sprint, fallback: '€650', conditions: ['You are preparing to raise soon', 'You have some traction or materials', 'You need pitch and financial review', 'You need a capital pathway recommendation', 'You want a practical roadmap'], cta: 'Apply for Sprint', badge: 'Best starting point', highlighted: true },
  { title: 'Choose Preparation Program if:', slug: SERVICE_SLUGS.program, fallback: 'From €1,500', conditions: ['You need deeper help before outreach', 'Your pitch and materials need improvement', 'You want 2–4 weeks of support', 'You are preparing for serious capital conversations'], cta: 'Apply for Support', badge: null, highlighted: false },
];

export function PricingDecisionGuide() {
  const { services } = useServices();

  return (
    <section className={pricingTw.sectionCream}>
      <div className={pricingTw.containerMd}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mx-auto mb-14 max-w-[560px] text-center">
          <span className={pricingTw.eyebrow}>Decision guide</span>
          <h2 className={pricingTw.h2}>Which option should you choose?</h2>
          <p className={pricingTw.desc}>Choose based on your current stage, timeline, and how much preparation support you need.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease }} whileHover={{ y: -5 }} className={cn('relative rounded-[24px] bg-[var(--color-bg-white)] p-8 transition-shadow duration-200', card.highlighted ? 'border-2 border-[var(--color-brand-orange)] shadow-[0_12px_40px_rgba(253,102,40,0.1)]' : 'border border-[var(--color-border)] shadow-[0_4px_20px_rgba(0,0,0,0.04)]')}>
              {card.badge && <div className="absolute left-8 top-[-13px] rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-3 py-1 text-[11px] font-bold text-[var(--color-text-on-dark)]">{card.badge}</div>}
              <div className="mb-1.5 [font-family:var(--font-heading)] text-[15px] font-extrabold leading-[1.3] text-[var(--color-text-primary)]">{card.title}</div>
              <div className={cn('mb-[22px] [font-family:var(--font-heading)] text-xl font-extrabold', card.highlighted ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-primary)]')}>{formatServicePrice(findService(services, card.slug), card.fallback)}</div>
              <ul className="mb-7 flex list-none flex-col gap-2.5 p-0">
                {card.conditions.map(cond => <li key={cond} className="flex items-start gap-2.5"><Check size={13} className={pricingTw.checkIcon} /><span className="text-sm leading-normal text-[var(--color-text-secondary)]">{cond}</span></li>)}
              </ul>
              <motion.button className={cn('inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] px-5 py-3 [font-family:var(--font-body)] text-[13px] font-semibold', card.highlighted ? 'border-0 bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)]' : 'border border-[var(--color-border)] bg-[var(--color-bg-white)] text-[var(--color-text-primary)]')} whileHover={card.highlighted ? { scale: 1.03 } : { borderColor: '#FD6628' }} transition={{ duration: 0.2 }}>
                {card.cta}<motion.span whileHover={{ x: 3 }} transition={{ duration: 0.2 }}><ArrowRight size={13} /></motion.span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
