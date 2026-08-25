'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Ban, UserX, Lightbulb } from 'lucide-react';
import { servicesTw } from './servicesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const trustCards = [
  { icon: ShieldCheck, title: 'We help you prepare', desc: 'CrowdHarbor identifies gaps, blockers, materials, and pathway options before outreach. Preparation is the core service.' },
  { icon: Ban, title: 'We do not guarantee funding', desc: 'The service improves preparation, not funding outcomes. No funding guarantees are made at any stage.' },
  { icon: UserX, title: 'We do not act as a broker', desc: 'CrowdHarbor does not sell investor access, promise introductions, or act as a fundraising platform or broker.' },
  { icon: Lightbulb, title: 'We support better decisions', desc: 'The goal is to help founders understand what to fix, which path to pursue, and what to prepare before approaching capital.' },
];

export function ServicesTrust() {
  return (
    <section className={servicesTw.sectionWhite}>
      <div className={servicesTw.container}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mx-auto mb-14 max-w-[580px] text-center">
          <span className={servicesTw.eyebrow}>TRUST AND EXPECTATIONS</span>
          <h2 className="mb-3 font-[var(--font-heading)] text-[clamp(28px,3.5vw,42px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-[var(--color-text-primary)]">Preparation before promises.</h2>
          <p className={servicesTw.desc}>CrowdHarbor helps founders prepare for funding conversations. It does not guarantee funding, act as an investor, serve as a broker, or replace legal, tax, financial, or investment advice.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease }} className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-7 shadow-[var(--shadow-card)]">
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-orange-tint-soft)] text-[var(--color-brand-orange)]"><Icon size={20} /></div>
                <div className="mb-2 font-[var(--font-heading)] text-[15px] font-bold text-[var(--color-text-primary)]">{card.title}</div>
                <p className="m-0 text-[13px] leading-[1.65] text-[var(--color-text-muted)]">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
