'use client';

import { motion } from 'motion/react';
import { Heart, Shield, Target, Users } from 'lucide-react';
import { container, ease, section } from './aboutTailwind';

const principles = [
  { icon: Heart, title: 'Founder-first', desc: 'Every decision is made with founders in mind — what they actually need, not what looks impressive.' },
  { icon: Shield, title: 'Honest expectations', desc: 'CrowdHarbor does not overpromise. Preparation support, not funding guarantees.' },
  { icon: Target, title: 'Useful deliverables', desc: 'Every engagement should result in something a founder can act on — a score, a plan, a clear next step.' },
  { icon: Users, title: 'Repeatable process', desc: 'The review process is built to be consistent, structured, and improvable over time.' },
];

export function AboutTeamNote() {
  return (
    <section className={section.cream}>
      <div className={container.lg}>
        <div className="grid grid-cols-1 items-start gap-[60px] md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease }}>
            <div className="mb-3 text-[13px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]">About / team note</div>
            <div className="mb-5 h-1 w-10 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)]" />
            <h2 className="mb-5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">Built around founder preparation.</h2>
            <p className="mb-4 text-[17px] leading-[1.7] text-[var(--color-text-secondary)]">CrowdHarbor is being developed as a preparation-first service for early-stage founders who need clarity before approaching funding sources.</p>
            <p className="text-[17px] leading-[1.7] text-[var(--color-text-secondary)]">The first version is focused on manual review, useful deliverables, founder feedback, and a repeatable preparation process.</p>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: 0.3 }} className="mt-8 rounded-2xl border-[1.5px] border-[var(--color-border)] border-l-4 border-l-[var(--color-brand-orange)] bg-[var(--color-bg-white)] p-6">
              <p className="text-[15px] italic leading-[1.65] text-[#333]">&quot;CrowdHarbor exists because founders need clarity before capital. Not just a score — but a real understanding of what is missing and what to do next.&quot;</p>
              <div className="mt-3.5 text-[13px] font-bold text-[var(--color-brand-orange)]">— CrowdHarbor Mission</div>
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-3.5">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease }} className="mb-1 text-sm font-bold tracking-[-0.01em] text-[var(--color-text-primary)]">Operating principles</motion.div>
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.42, ease, delay: i * 0.09 }} className="flex items-start gap-3.5 rounded-2xl border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-[22px] py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-brand-orange)]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]"><Icon size={16} /></div>
                  <div>
                    <div className="mb-1 text-sm font-bold text-[var(--color-text-primary)]">{p.title}</div>
                    <p className="text-[13px] leading-[1.6] text-[var(--color-text-muted)]">{p.desc}</p>
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
