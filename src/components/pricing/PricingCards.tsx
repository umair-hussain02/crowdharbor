'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { pricingTw } from './pricingTailwind';
import { useServices, findService, formatServicePrice, SERVICE_SLUGS } from '@/lib/hooks/useServices';
import { trackEvent } from '@/lib/analytics/track';

const ease = [0.22, 1, 0.36, 1] as const;

const reviewIncludes = ['Funding readiness scorecard', 'Strength and weakness overview', 'Top funding blockers', 'Basic pathway recommendation', 'Short action plan'];
const sprintIncludes = ['Funding readiness review', 'Pitch deck review', 'Financial readiness review', 'Data room checklist', 'Founder strategy session', 'Capital pathway recommendation', 'Fundraising action plan', '7–14 day preparation roadmap'];
const programIncludes = ['Everything in the Sprint', 'Pitch narrative improvement', 'Deck structure recommendations', 'Data room preparation guidance', 'Financial model feedback', 'Follow-up readiness review', 'Founder presentation preparation', '2–4 week support'];

function IncludesList({ items }: { items: string[] }) {
  return (
    <ul className="mb-7 flex list-none flex-col gap-2.5 p-0">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2.5">
          <Check size={14} className={pricingTw.checkIcon} />
          <span className="text-sm leading-normal text-[var(--color-text-secondary)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PricingCards() {
  const { services } = useServices();
  const reviewPrice = formatServicePrice(findService(services, SERVICE_SLUGS.review), '€149');
  const sprintPrice = formatServicePrice(findService(services, SERVICE_SLUGS.sprint), '€650');
  const programPrice = formatServicePrice(findService(services, SERVICE_SLUGS.program), 'From €1,500');

  return (
    <section id="pricing-cards" className={pricingTw.sectionWhite}>
      <div className={pricingTw.containerLg}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className={pricingTw.centerHeader}>
          <h2 className={pricingTw.h2Large}>Choose your preparation path.</h2>
          <p className={pricingTw.desc}>Each option is designed for a different level of readiness, urgency, and support needed before approaching capital.</p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <motion.div id="review-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease }} whileHover={{ y: -6 }} className={pricingTw.card}>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.06em] text-[var(--color-text-subtle)]">Entry Diagnosis</div>
            <div className="mb-1 [font-family:var(--font-heading)] text-[clamp(40px,5vw,56px)] font-extrabold leading-none tracking-[-0.03em] text-[var(--color-text-primary)]">{reviewPrice}</div>
            <div className="mb-4 text-sm text-[var(--color-text-subtle)]">one-time</div>
            <p className="mb-6 border-b border-[var(--color-border-divider)] pb-6 text-sm leading-[1.65] text-[var(--color-text-tertiary)]">For founders who want to understand where they currently stand before fundraising.</p>
            <div className="mb-3.5 text-xs font-bold uppercase tracking-[0.04em] text-[var(--color-text-primary)]">Includes</div>
            <IncludesList items={reviewIncludes} />
            <motion.a href="/intake" onClick={() => trackEvent('cta_click', { label: 'Start With Review', destination: '/intake', location: 'pricing_cards' })} className={`${pricingTw.outlineButton} w-full px-6 py-3.5 text-sm`} whileHover={{ borderColor: '#FD6628' }} transition={{ duration: 0.2 }}>Start With Review <ArrowRight size={14} /></motion.a>
            <p className="mt-2.5 text-center text-xs text-[var(--color-text-faint)]">Best first step if you are unsure where you stand.</p>
          </motion.div>

          <motion.div id="sprint-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1, ease }} whileHover={{ y: -6 }} className={pricingTw.highlightedCard}>
            <div className="absolute left-1/2 top-[-14px] -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-4 py-[5px] text-xs font-bold tracking-[0.02em] text-[var(--color-text-on-dark)]">Recommended</div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.06em] text-[var(--color-brand-orange)]">Main Preparation Path</div>
            <div className="mb-1 [font-family:var(--font-heading)] text-[clamp(40px,5vw,56px)] font-extrabold leading-none tracking-[-0.03em] text-[var(--color-text-primary)]">{sprintPrice}</div>
            <div className="mb-4 text-sm text-[var(--color-text-subtle)]">one-time</div>
            <p className="mb-6 border-b border-[var(--color-border-divider)] pb-6 text-sm leading-[1.65] text-[var(--color-text-tertiary)]">For founders preparing to raise soon who need readiness diagnosis, material review, pathway strategy, and a clear roadmap.</p>
            <div className="mb-3.5 text-xs font-bold uppercase tracking-[0.04em] text-[var(--color-text-primary)]">Includes</div>
            <IncludesList items={sprintIncludes} />
            <motion.a href="/contact" onClick={() => trackEvent('cta_click', { label: 'Apply for the Sprint', destination: '/contact', location: 'pricing_cards' })} className={`${pricingTw.primaryButton} w-full px-6 py-[15px] text-sm`} whileHover={{ scale: 1.02, y: -1 }} transition={{ duration: 0.2 }}>Apply for the Sprint <ArrowRight size={14} /></motion.a>
            <p className="mt-2.5 text-center text-xs text-[var(--color-text-faint)]">The best starting point for serious funding conversations.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2, ease }} whileHover={{ y: -6 }} className={pricingTw.card}>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.06em] text-[var(--color-text-subtle)]">Premium Support</div>
            <div className="mb-1 [font-family:var(--font-heading)] text-[clamp(32px,4vw,48px)] font-extrabold leading-none tracking-[-0.03em] text-[var(--color-text-primary)]">{programPrice}</div>
            <div className="mb-4 text-sm text-[var(--color-text-subtle)]">application-based</div>
            <p className="mb-6 border-b border-[var(--color-border-divider)] pb-6 text-sm leading-[1.65] text-[var(--color-text-tertiary)]">For founders who need deeper help improving materials, story, readiness, and presentation before outreach.</p>
            <div className="mb-3.5 text-xs font-bold uppercase tracking-[0.04em] text-[var(--color-text-primary)]">Includes</div>
            <IncludesList items={programIncludes} />
            <motion.a href="/contact" onClick={() => trackEvent('cta_click', { label: 'Apply for Support', destination: '/contact', location: 'pricing_cards' })} className={`${pricingTw.outlineButton} w-full px-6 py-3.5 text-sm`} whileHover={{ borderColor: '#FD6628' }} transition={{ duration: 0.2 }}>Apply for Support <ArrowRight size={14} /></motion.a>
            <p className="mt-2.5 text-center text-xs text-[var(--color-text-faint)]">Best when you need deeper preparation support.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
