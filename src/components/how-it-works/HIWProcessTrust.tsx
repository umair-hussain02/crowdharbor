'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Ban, CheckSquare, Lightbulb } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const trustCards = [
  { icon: CheckSquare, title: 'Preparation-first', desc: 'We help founders understand and fix readiness gaps before outreach. The goal is better preparation, not a funding guarantee.' },
  { icon: Ban, title: 'No funding guarantees', desc: 'We do not promise funding outcomes. CrowdHarbor helps you prepare, understand your position, and move forward with clarity.' },
  { icon: ShieldCheck, title: 'No broker positioning', desc: 'We do not act as an investor, broker, or fundraising platform. CrowdHarbor is an advisory preparation service.' },
  { icon: Lightbulb, title: 'Founder clarity', desc: 'The goal is to help you make better funding decisions before outreach begins, not to replace legal, financial, or investment advice.' },
];

export function HIWProcessTrust() {
  return (
    <section className="bg-[var(--color-bg-cream)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[580px] [margin:0_auto_56px]"
        >
          <span
            className="inline-block py-[5px] px-[14px] rounded-[var(--radius-pill)] text-[12px] font-bold text-[var(--color-brand-orange)] bg-[var(--color-brand-orange-tint-soft)] tracking-[0.04em] uppercase mb-[14px]"
          >
            TRUST AND EXPECTATIONS
          </span>
          <h2
            className="text-[clamp(28px,_3.5vw,_42px)] font-extrabold text-[var(--color-text-primary)] leading-[1.15] tracking-[-0.025em] [font-family:var(--font-heading)] mb-[14px]"
          >
            Clear preparation. Honest expectations.
          </h2>
          <p className="text-[16px] text-[var(--color-text-secondary)] leading-[1.75]">
            CrowdHarbor helps founders prepare before approaching funding sources. It does not guarantee funding, act as an investor, or replace legal, financial, tax, or investment advice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[20px] p-[28px] shadow-[var(--shadow-card)]"
              >
                <div
                  className="w-[44px] h-[44px] rounded-[12px] bg-[var(--color-brand-orange-tint-soft)] flex items-center justify-center mb-[14px]"
                >
                  <Icon size={20} className="text-[var(--color-brand-orange)]" />
                </div>
                <div className="text-[15px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[8px]">
                  {card.title}
                </div>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-[1.65] [margin:0px]">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
