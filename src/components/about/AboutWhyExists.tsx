'use client';

import { motion } from 'motion/react';
import { Clock, EyeOff, FileWarning, GitBranch } from 'lucide-react';
import { container, ease, section } from './aboutTailwind';

const insights = [
  { icon: Clock, title: 'Founders often raise too early', desc: 'Before their story, numbers, and materials are ready for serious review.' },
  { icon: EyeOff, title: 'Rejections rarely explain the real gaps', desc: 'Founders lose opportunities without understanding what actually went wrong.' },
  { icon: FileWarning, title: 'Materials matter before outreach', desc: 'Pitch decks, financials, and data room documents shape first impressions.' },
  { icon: GitBranch, title: 'The right funding path depends on stage', desc: 'Crowdfunding, angels, grants, and accelerators each require different readiness.' },
];

export function AboutWhyExists() {
  return (
    <section className={section.white}>
      <div className={container.lg}>
        <div className="grid grid-cols-1 items-start gap-[72px] md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease }}>
            <div className="mb-3 text-[13px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]">Why we exist</div>
            <div className="mb-5 h-1 w-10 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)]" />
            <h2 className="mb-5 text-[clamp(26px,3.5vw,42px)] font-extrabold leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">Founders should not approach capital blindly.</h2>
            <p className="mb-4 text-[17px] leading-[1.7] text-[var(--color-text-secondary)]">Many founders approach funding sources before their story, numbers, documents, and strategy are ready. When that happens, they may lose opportunities without understanding what went wrong.</p>
            <p className="text-[17px] leading-[1.7] text-[var(--color-text-secondary)]">CrowdHarbor exists to help founders pause, prepare, and understand what needs to be fixed before important funding conversations.</p>
          </motion.div>

          <div className="flex flex-col gap-3.5">
            {insights.map((ins, i) => {
              const Icon = ins.icon;
              return (
                <motion.div
                  key={ins.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease, delay: i * 0.09 }}
                  className="flex items-start gap-3.5 rounded-2xl border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-cream)] px-[22px] py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-brand-orange)] hover:bg-[var(--color-bg-white)]"
                >
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]"><Icon size={17} /></div>
                  <div>
                    <div className="mb-1 text-[15px] font-bold text-[var(--color-text-primary)]">{ins.title}</div>
                    <p className="text-[13px] leading-[1.6] text-[var(--color-text-tertiary)]">{ins.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
