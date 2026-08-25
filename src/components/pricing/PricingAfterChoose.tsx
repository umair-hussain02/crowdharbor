'use client';

import { motion } from 'motion/react';
import { ClipboardList, Upload, Search, Target, Map } from 'lucide-react';
import { cn, pricingTw } from './pricingTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { icon: ClipboardList, num: '01', title: 'Submit intake', desc: 'Share your company details, funding goals, traction, materials, and biggest challenges.' },
  { icon: Upload, num: '02', title: 'Upload materials', desc: 'Upload your pitch deck, financial model, business plan, or current fundraising documents.' },
  { icon: Search, num: '03', title: 'CrowdHarbor reviews', desc: 'Your company stage, materials, readiness gaps, and pathway fit are reviewed.' },
  { icon: Target, num: '04', title: 'Receive diagnosis or strategy', desc: 'Depending on your selected offer, you receive your readiness review, Sprint findings, or deeper preparation support.' },
  { icon: Map, num: '05', title: 'Follow your action plan', desc: 'You leave with clearer priorities before approaching capital.' },
];

export function PricingAfterChoose() {
  return (
    <section className={pricingTw.sectionWhite}>
      <div className="mx-auto max-w-[var(--container-md)]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mx-auto mb-16 max-w-[560px] text-center">
          <span className={pricingTw.eyebrow}>After you choose</span>
          <h2 className={pricingTw.h2}>What happens after you choose a plan.</h2>
          <p className={pricingTw.desc}>Once you select a preparation option, CrowdHarbor guides you through intake, review, diagnosis, and next-step delivery.</p>
        </motion.div>

        <div className="hidden lg:block">
          <div className="relative grid grid-cols-5 gap-0">
            <div className="absolute left-[10%] right-[10%] top-[22px] z-0 h-0.5 bg-[linear-gradient(90deg,var(--color-brand-orange),var(--color-brand-orange)_60%,var(--color-border))]" />
            {steps.map((step, i) => {
              const Icon = step.icon;
              const active = i < 3;
              return (
                <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease }} className="relative z-[1] flex flex-col items-center px-3 text-center">
                  <div className={cn('mb-5 flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-[0_0_0_6px_var(--color-bg-white)]', active ? 'border-[var(--color-brand-orange)] bg-[var(--color-brand-orange)]' : 'border-[var(--color-border)] bg-[var(--color-bg-white)]')}>
                    <Icon size={18} className={active ? 'text-[var(--color-text-on-dark)]' : 'text-[var(--color-text-subtle)]'} />
                  </div>
                  <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-text-faint)]">{step.num}</div>
                  <div className="mb-2 [font-family:var(--font-heading)] text-[15px] font-bold leading-[1.25] text-[var(--color-text-primary)]">{step.title}</div>
                  <p className="m-0 text-[13px] leading-[1.6] text-[var(--color-text-muted)]">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-0 lg:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const active = i < 3;
            const isLast = i === steps.length - 1;
            return (
              <motion.div key={step.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08, ease }} className="flex gap-[18px]">
                <div className="flex flex-col items-center">
                  <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2', active ? 'border-[var(--color-brand-orange)] bg-[var(--color-brand-orange)]' : 'border-[var(--color-border)] bg-[var(--color-bg-white)]')}>
                    <Icon size={16} className={active ? 'text-[var(--color-text-on-dark)]' : 'text-[var(--color-text-subtle)]'} />
                  </div>
                  {!isLast && <div className={cn('my-1 min-h-10 w-0.5 flex-1', i < 2 ? 'bg-[var(--color-brand-orange)]' : 'bg-[var(--color-border)]')} />}
                </div>
                <div className={cn('pt-1.5', !isLast && 'pb-8')}>
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-text-faint)]">{step.num}</div>
                  <div className="mb-1.5 [font-family:var(--font-heading)] text-base font-bold text-[var(--color-text-primary)]">{step.title}</div>
                  <p className="m-0 text-sm leading-[1.6] text-[var(--color-text-muted)]">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
