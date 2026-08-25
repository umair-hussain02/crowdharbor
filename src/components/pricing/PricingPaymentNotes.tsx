'use client';

import { motion } from 'motion/react';
import { CreditCard, FileCheck, ArrowRight as Arrow } from 'lucide-react';
import { cn, pricingTw } from './pricingTailwind';
import { useServices, findService, formatServicePrice, SERVICE_SLUGS } from '@/lib/hooks/useServices';

const ease = [0.22, 1, 0.36, 1] as const;

const flow = [
  { label: 'Plan selected', note: 'Choose your preparation option' },
  { label: 'Intake submitted', note: 'Share company details and materials' },
  { label: 'Review', note: 'CrowdHarbor assesses fit and readiness' },
  { label: 'Payment / Confirmation', note: 'Direct payment or fit confirmation' },
  { label: 'Delivery begins', note: 'Review, findings, and roadmap delivered' },
];

const paymentCards = [
  { title: 'Funding Readiness Review', slug: SERVICE_SLUGS.review, fallback: '€149', note: 'Can be paid directly online.', cta: 'Pay & Start Review', type: 'direct' },
  { title: 'Capital Pathway Sprint', slug: SERVICE_SLUGS.sprint, fallback: '€650', note: 'Application first, payment after fit is confirmed.', cta: 'Apply for Sprint', type: 'application' },
  { title: 'Fundraising Preparation Program', slug: SERVICE_SLUGS.program, fallback: 'From €1,500', note: 'Application-based premium support. Payment confirmed after review of founder needs.', cta: 'Apply for Support', type: 'application' },
];

export function PricingPaymentNotes() {
  const { services } = useServices();

  return (
    <section className={pricingTw.sectionWhite}>
      <div className={pricingTw.containerMd}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mx-auto mb-14 max-w-[560px] text-center">
          <span className={pricingTw.eyebrow}>Payment and application</span>
          <h2 className={pricingTw.h2}>Simple payment and application flow.</h2>
          <p className={pricingTw.desc}>Some preparation services require review before acceptance to make sure CrowdHarbor can provide relevant value based on your company stage and materials.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mb-8 overflow-x-auto rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-cream)] p-8">
          <div className="flex min-w-max flex-col items-start gap-4 sm:min-w-0 sm:flex-row sm:items-center sm:gap-0">
            {flow.map((step, i) => (
              <div key={step.label} className="flex items-center gap-0">
                <div className="flex min-w-[140px] flex-col items-center gap-1 text-center">
                  <div className={cn('mb-1.5 h-2.5 w-2.5 rounded-full', i < 4 ? 'bg-[var(--color-brand-orange)]' : 'bg-[var(--color-border)]')} />
                  <div className="[font-family:var(--font-heading)] text-[13px] font-bold leading-[1.3] text-[var(--color-text-primary)]">{step.label}</div>
                  <div className="text-[11px] leading-[1.4] text-[var(--color-text-subtle)]">{step.note}</div>
                </div>
                {i < flow.length - 1 && <Arrow size={16} className="mx-1 mt-[-24px] shrink-0 text-[var(--color-brand-orange)]" />}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {paymentCards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09, ease }} className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-[26px] shadow-[var(--shadow-card)]">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--color-brand-orange-tint-soft)]">
                  {card.type === 'direct' ? <CreditCard size={17} className="text-[var(--color-brand-orange)]" /> : <FileCheck size={17} className="text-[var(--color-brand-orange)]" />}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--color-text-subtle)]">{card.type === 'direct' ? 'Direct payment' : 'Application-based'}</div>
              </div>
              <div className="mb-1 [font-family:var(--font-heading)] text-base font-bold text-[var(--color-text-primary)]">{card.title}</div>
              <div className="mb-3 [font-family:var(--font-heading)] text-xl font-extrabold text-[var(--color-text-primary)]">{formatServicePrice(findService(services, card.slug), card.fallback)}</div>
              <p className="mb-5 text-[13px] leading-[1.6] text-[var(--color-text-muted)]">{card.note}</p>
              <motion.button className={`${pricingTw.outlineButton} gap-1.5 px-[18px] py-2.5 text-[13px]`} whileHover={{ borderColor: '#FD6628' }} transition={{ duration: 0.2 }}>{card.cta} <Arrow size={12} /></motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
