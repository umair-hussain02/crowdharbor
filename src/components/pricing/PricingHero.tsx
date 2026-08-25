'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn, pricingTw } from './pricingTailwind';
import { useServices, findService, formatServicePrice, SERVICE_SLUGS } from '@/lib/hooks/useServices';
import { trackEvent } from '@/lib/analytics/track';

const ease = [0.22, 1, 0.36, 1] as const;
const heroSteps = [
  { num: '01', label: 'Diagnose', slug: SERVICE_SLUGS.review, fallback: '€149', active: false },
  { num: '02', label: 'Sprint', slug: SERVICE_SLUGS.sprint, fallback: '€650', active: true },
  { num: '03', label: 'Prepare', slug: SERVICE_SLUGS.program, fallback: 'From €1,500', active: false },
];

export function PricingHero() {
  const { services } = useServices();
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="bg-[var(--color-bg-cream)] px-6 pb-20 pt-[140px]">
      <div className={pricingTw.containerLg}>
        <div className="mx-auto mb-14 max-w-[720px] text-center">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mb-5 inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint-soft)] px-3.5 py-[5px] text-xs font-bold uppercase tracking-[0.04em] text-[var(--color-brand-orange)]">CrowdHarbor pricing</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08, ease }} className="mb-5 [font-family:var(--font-heading)] text-[clamp(38px,6vw,68px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)]">Simple preparation options before you raise.</motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16, ease }} className="mb-9 text-lg leading-[1.7] text-[var(--color-text-secondary)]">Choose a funding readiness diagnosis, a deeper capital pathway sprint, or hands-on preparation support to understand what is weak, what is missing, and what to fix before approaching capital.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24, ease }} className="flex flex-col items-center gap-3">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.button onClick={() => { trackEvent('cta_click', { label: 'Apply for the Capital Pathway Sprint', location: 'pricing_hero' }); scroll('#sprint-card'); }} className={`${pricingTw.primaryButton} px-8 py-4 text-[15px]`} whileHover={{ scale: 1.03, y: -2 }} transition={{ duration: 0.2 }}>Apply for the Capital Pathway Sprint <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}><ArrowRight size={16} /></motion.span></motion.button>
              <motion.button onClick={() => { trackEvent('cta_click', { label: 'Start With a Readiness Review', location: 'pricing_hero' }); scroll('#review-card'); }} className={`${pricingTw.outlineButton} px-8 py-4 text-[15px]`} whileHover={{ borderColor: '#FD6628', y: -2 }} transition={{ duration: 0.2 }}>Start With a Readiness Review</motion.button>
            </div>
            <p className="mt-1 text-[13px] text-[var(--color-text-faint)]">No funding guarantees. No broker promises. Preparation before outreach.</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.36, ease }} className="flex flex-col items-center justify-center gap-0 sm:flex-row">
          {heroSteps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center sm:flex-row">
              <div className={cn('relative min-w-40 rounded-[20px] bg-[var(--color-bg-white)] px-8 py-5 text-center', step.active ? 'border-2 border-[var(--color-brand-orange)] shadow-[0_8px_32px_rgba(253,102,40,0.12)]' : 'border border-[var(--color-border)] shadow-[0_4px_20px_rgba(0,0,0,0.04)]')}>
                {step.active && <div className="absolute left-1/2 top-[-13px] -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-3 py-1 text-[11px] font-bold text-[var(--color-text-on-dark)]">Recommended</div>}
                <div className={cn('mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em]', step.active ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-faint)]')}>{step.num}</div>
                <div className="[font-family:var(--font-heading)] text-[17px] font-bold text-[var(--color-text-primary)]">{step.label}</div>
                <div className={cn('mt-1 text-[13px]', step.active ? 'font-semibold text-[var(--color-brand-orange)]' : 'font-normal text-[var(--color-text-subtle)]')}>{formatServicePrice(findService(services, step.slug), step.fallback)}</div>
              </div>
              {i < 2 && <><div className={cn('hidden h-0.5 w-12 shrink-0 sm:block', i === 0 ? 'bg-[linear-gradient(90deg,var(--color-border),var(--color-brand-orange))]' : 'bg-[linear-gradient(90deg,var(--color-brand-orange),var(--color-border))]')} /><div className={cn('h-7 w-0.5 shrink-0 sm:hidden', i === 0 ? 'bg-[linear-gradient(180deg,var(--color-border),var(--color-brand-orange))]' : 'bg-[linear-gradient(180deg,var(--color-brand-orange),var(--color-border))]')} /></>}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
