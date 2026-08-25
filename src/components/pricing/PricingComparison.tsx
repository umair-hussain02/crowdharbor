'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Minus, Plus } from 'lucide-react';
import { cn, pricingTw } from './pricingTailwind';
import { useServices, findService, formatServicePrice, SERVICE_SLUGS } from '@/lib/hooks/useServices';

const ease = [0.22, 1, 0.36, 1] as const;
type RowData = [string, boolean, boolean, boolean];

const rows: RowData[] = [
  ['Funding readiness scorecard', true, true, true], ['Strength and weakness overview', true, true, true], ['Top funding blockers', true, true, true], ['Missing materials review', true, true, true], ['Pitch deck review', false, true, true], ['Financial readiness review', false, true, true], ['Data room checklist', false, true, true], ['Use-of-funds review', false, true, true], ['Founder strategy session', false, true, true], ['Capital pathway recommendation', true, true, true], ['Fundraising action plan', true, true, true], ['7–14 day roadmap', false, true, true], ['Pitch narrative improvement', false, false, true], ['Deck structure recommendations', false, false, true], ['Financial model feedback', false, false, true], ['Follow-up readiness review', false, false, true], ['2–4 week support', false, false, true],
];

const mobileOffers = [
  { label: 'Readiness Review', slug: SERVICE_SLUGS.review, fallback: '€149', highlighted: false },
  { label: 'Capital Pathway Sprint', slug: SERVICE_SLUGS.sprint, fallback: '€650', highlighted: true },
  { label: 'Preparation Program', slug: SERVICE_SLUGS.program, fallback: 'From €1,500', highlighted: false },
];

export function PricingComparison() {
  const [openMobile, setOpenMobile] = useState<number | null>(1);
  const { services } = useServices();
  const reviewPrice = formatServicePrice(findService(services, SERVICE_SLUGS.review), '€149');
  const sprintPrice = formatServicePrice(findService(services, SERVICE_SLUGS.sprint), '€650');
  const programPrice = formatServicePrice(findService(services, SERVICE_SLUGS.program), 'From €1,500');

  return (
    <section className={pricingTw.sectionCream}>
      <div className={pricingTw.containerMd}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mx-auto mb-14 max-w-[560px] text-center">
          <span className={pricingTw.eyebrow}>Compare options</span>
          <h2 className={pricingTw.h2}>Compare your preparation options.</h2>
          <p className={pricingTw.desc}>Each option supports a different level of readiness, urgency, and support.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="hidden overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[0_8px_30px_rgba(0,0,0,0.05)] md:block">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b-2 border-[var(--color-border)]">
            <div className="px-7 py-5 text-[13px] font-bold uppercase tracking-[0.04em] text-[var(--color-text-subtle)]">Feature</div>
            {[`Readiness Review\n${reviewPrice}`, `Capital Pathway Sprint\n${sprintPrice}`, `Preparation Program\n${programPrice}`].map((col, ci) => (
              <div key={ci} className={cn('border-l border-[var(--color-border)] px-4 py-5 text-center', ci === 1 && 'bg-[rgba(253,102,40,0.04)]')}>
                <div className={cn('whitespace-pre-line [font-family:var(--font-heading)] text-[13px] font-bold leading-[1.4]', ci === 1 ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-primary)]')}>{col}</div>
                {ci === 1 && <span className="mt-1.5 inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-text-on-dark)]">Recommended</span>}
              </div>
            ))}
          </div>
          {rows.map(([label, r, s, p], i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.03, ease }} className={cn('grid grid-cols-[2fr_1fr_1fr_1fr]', i < rows.length - 1 && 'border-b border-[var(--color-border-divider)]')}>
              <div className="px-7 py-3.5 text-sm font-medium leading-[1.4] text-[#333333]">{label}</div>
              {[r, s, p].map((val, ci) => (
                <div key={ci} className={cn('flex items-center justify-center border-l border-[var(--color-border-divider)] px-4 py-3.5', ci === 1 && 'bg-[rgba(253,102,40,0.03)]')}>
                  {val ? <Check size={16} className="text-[var(--color-brand-orange)]" /> : <Minus size={16} className="text-[#DDDDDD]" />}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col gap-3 md:hidden">
          {mobileOffers.map((offer, oi) => {
            const isOpen = openMobile === oi;
            const offerRows = rows.filter(([, r, s, p]) => [r, s, p][oi]);
            return (
              <motion.div key={offer.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: oi * 0.07, ease }} className={cn('overflow-hidden rounded-[20px] border bg-[var(--color-bg-white)] transition-colors duration-200', offer.highlighted && isOpen ? 'border-[var(--color-brand-orange)]' : 'border-[var(--color-border)]')}>
                <button onClick={() => setOpenMobile(isOpen ? null : oi)} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center justify-between gap-3 border-0 bg-transparent px-[22px] py-[18px] text-left">
                  <div>
                    <div className="[font-family:var(--font-heading)] text-[15px] font-bold text-[var(--color-text-primary)]">{offer.label}</div>
                    <div className={cn('mt-0.5 text-[13px]', offer.highlighted ? 'font-semibold text-[var(--color-brand-orange)]' : 'font-normal text-[var(--color-text-subtle)]')}>{formatServicePrice(findService(services, offer.slug), offer.fallback)}</div>
                  </div>
                  <div className={cn('flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full', isOpen ? 'bg-[var(--color-brand-orange)]' : 'bg-[var(--color-neutral-tint)]')}>
                    {isOpen ? <Minus size={12} className="text-[var(--color-text-on-dark)]" /> : <Plus size={12} className="text-[var(--color-text-secondary)]" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease }}>
                      <div className="flex flex-col gap-2 px-[22px] pb-5">
                        {offerRows.map(([label]) => <div key={label} className="flex items-center gap-2.5"><Check size={13} className="shrink-0 text-[var(--color-brand-orange)]" /><span className="text-[13px] text-[var(--color-text-secondary)]">{label}</span></div>)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
