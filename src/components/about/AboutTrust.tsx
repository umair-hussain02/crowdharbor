'use client';

import { motion } from 'motion/react';
import { ShieldCheck, AlertCircle, User, Lightbulb } from 'lucide-react';
import { container, ease, section, text } from './aboutTailwind';

const trustCards = [
  { icon: ShieldCheck, title: 'Preparation before outreach', desc: 'We help founders identify readiness gaps before approaching capital — not after.' },
  { icon: AlertCircle, title: 'No guaranteed outcomes', desc: 'We do not promise funding, investment, grants, crowdfunding success, or accelerator acceptance.' },
  { icon: User, title: 'Founder responsibility', desc: 'Founders remain responsible for their own business, legal, financial, and fundraising decisions.' },
  { icon: Lightbulb, title: 'Clearer decisions', desc: 'Our goal is to help founders make better preparation decisions before outreach — not to make decisions for them.' },
];

export function AboutTrust() {
  return (
    <section className={section.cream}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>Trust and transparency</div>
          <h2 className={text.sectionTitle}>Preparation-focused. Expectation-aware.</h2>
          <p className={`${text.description} max-w-[560px]`}>CrowdHarbor helps founders prepare before approaching funding sources. CrowdHarbor does not guarantee funding, act as an investor, broker, crowdfunding platform, legal advisor, tax advisor, financial advisor, or investment advisor.</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: i * 0.08 }} className="rounded-[20px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-6 py-7">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[11px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-cream)] text-[var(--color-text-secondary)]"><Icon size={18} /></div>
                <h3 className="mb-2 text-[15px] font-bold leading-[1.35] text-[var(--color-text-primary)]">{card.title}</h3>
                <p className="text-[13px] leading-[1.65] text-[var(--color-text-muted)]">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
