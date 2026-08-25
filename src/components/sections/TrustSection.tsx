'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Ban, CheckSquare } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const trustCards = [
  {
    icon: Ban,
    title: 'No funding guarantees',
    description: 'We do not promise funding outcomes. CrowdHarbor helps you prepare, not raise.',
  },
  {
    icon: ShieldCheck,
    title: 'No broker positioning',
    description: 'We do not act as an investor or fundraising broker. We are an advisory preparation service.',
  },
  {
    icon: CheckSquare,
    title: 'Preparation-first approach',
    description: 'We help founders improve readiness before approaching capital, so outreach starts with strength.',
  },
];

export function TrustSection() {
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
          <h2
            className="text-[clamp(28px, 3vw, 40px)] font-extrabold text-[var(--color-text-primary)] leading-[1.15] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[16px]"
          >
            Preparation, not promises.
          </h2>
          <p className="text-[16px] text-[var(--color-text-secondary)] leading-[1.75]">
            CrowdHarbor does not guarantee funding, act as an investor, broker, or crowdfunding platform. We help founders prepare their materials, understand readiness, and choose a more suitable capital pathway before outreach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[20px] p-[32px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)] text-center"
              >
                <div
                  className="w-[52px] h-[52px] rounded-[14px] bg-[var(--color-brand-orange-tint-soft)] flex items-center justify-center [margin:0_auto_16px]"
                >
                  <Icon size={24} className="text-[var(--color-brand-orange)]" />
                </div>
                <div
                  className="text-[17px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[10px]"
                >
                  {card.title}
                </div>
                <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.7] [margin:0px]">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
