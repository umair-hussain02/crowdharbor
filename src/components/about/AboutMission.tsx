'use client';

import { motion } from 'motion/react';
import { Search, FileSearch, Map } from 'lucide-react';
import { container, ease, section } from './aboutTailwind';

const pillars = [
  { icon: Search, label: 'Diagnose readiness', desc: 'Understand where your company stands before outreach.' },
  { icon: FileSearch, label: 'Review preparation gaps', desc: 'Identify what is weak, missing, or unclear in your materials and story.' },
  { icon: Map, label: 'Recommend a clearer pathway', desc: 'Match your stage and profile to the capital path that may fit best.' },
];

export function AboutMission() {
  return (
    <section className={section.white}>
      <div className={container.narrow}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-10 text-center">
          <div className="mb-3 text-[13px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]">Our mission</div>
          <h2 className="text-[clamp(24px,3.5vw,38px)] font-extrabold leading-[1.2] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">Our mission is to make fundraising preparation clearer.</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="mb-9 rounded-[24px] border-l-4 border-l-[var(--color-brand-orange)] bg-[var(--color-bg-cream)] px-11 py-10">
          <p className="text-xl font-bold leading-[1.55] tracking-[-0.01em] text-[var(--color-text-primary)]">CrowdHarbor helps founders move from uncertainty to a clearer funding-readiness diagnosis, material review, capital pathway recommendation, and action plan.</p>
        </motion.div>

        <p className="mb-12 text-center text-[17px] leading-[1.7] text-[var(--color-text-secondary)]">Founders often approach capital before their pitch, numbers, documents, traction story, and funding pathway are ready. CrowdHarbor exists to help founders see what needs work before they spend time, money, and credibility on funding outreach.</p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: i * 0.1 }} className="rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-6 py-7 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-[11px] bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]"><Icon size={18} /></div>
                <h3 className="mb-2 text-[15px] font-bold text-[var(--color-text-primary)]">{p.label}</h3>
                <p className="text-[13px] leading-[1.6] text-[var(--color-text-muted)]">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
