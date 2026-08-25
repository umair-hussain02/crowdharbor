'use client';

import { motion } from 'motion/react';
import { ShieldOff, UserX, Scale, Link2Off } from 'lucide-react';
import { container, ease, section, text } from './aboutTailwind';

const boundaries = [
  { icon: ShieldOff, title: 'Not a funding guarantee', desc: 'CrowdHarbor does not promise investment, grants, accelerator acceptance, crowdfunding success, or any specific business results.' },
  { icon: UserX, title: 'Not an investor or broker', desc: 'CrowdHarbor does not act as an investor, broker, dealer, crowdfunding platform, or fundraising guarantor.' },
  { icon: Scale, title: 'Not legal, tax, or investment advice', desc: 'CrowdHarbor does not replace professional legal, tax, financial, or investment advice. Founders should consult qualified advisors.' },
  { icon: Link2Off, title: 'Not instant investor access', desc: 'CrowdHarbor focuses on preparation before outreach, not guaranteed investor introductions or warm intros.' },
];

export function AboutWhatWeAreNot() {
  return (
    <section className={section.white}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>Clear boundaries</div>
          <h2 className={text.sectionTitle}>Clear boundaries. Honest expectations.</h2>
          <p className={`${text.description} max-w-[560px]`}>CrowdHarbor is a preparation-focused service. We help founders understand readiness, materials, blockers, and pathway fit before outreach.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-4">
          {boundaries.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: i * 0.08 }} className="rounded-[20px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-cream)] px-6 py-7">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[11px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] text-[var(--color-text-secondary)]"><Icon size={18} /></div>
                <h3 className="mb-2.5 text-[15px] font-bold leading-[1.35] text-[var(--color-text-primary)]">{b.title}</h3>
                <p className="text-[13px] leading-[1.65] text-[var(--color-text-muted)]">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
