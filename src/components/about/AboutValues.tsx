'use client';

import { motion } from 'motion/react';
import { Eye, MessageSquare, LayoutGrid, BookOpen, GitBranch, Zap } from 'lucide-react';
import { card, container, ease, section, text } from './aboutTailwind';

const values = [
  { icon: Eye, title: 'Clarity', desc: 'Founders deserve to understand what is weak, what is missing, and what matters before they approach capital.' },
  { icon: MessageSquare, title: 'Honesty', desc: 'Preparation should be based on realistic expectations, not empty funding promises or guaranteed outcomes.' },
  { icon: LayoutGrid, title: 'Structure', desc: 'A clear process helps founders reduce confusion and move forward with a defined plan before approaching capital.' },
  { icon: BookOpen, title: 'Founder education', desc: 'Better-informed founders can make better funding decisions and avoid common preparation mistakes.' },
  { icon: GitBranch, title: 'Pathway fit', desc: 'Different companies need different funding routes. The right path depends on stage, traction, and goals.' },
  { icon: Zap, title: 'Practical action', desc: 'Insights are only useful if founders know what to do next. Action comes from clarity.' },
];

export function AboutValues() {
  return (
    <section className={section.white}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>What we stand for</div>
          <h2 className="text-[clamp(24px,3.5vw,40px)] font-extrabold leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">The values behind CrowdHarbor.</h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: i * 0.07 }} className={`${card.cream} ${card.hoverLift} p-7`}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[11px] bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]"><Icon size={18} /></div>
                <h3 className="mb-2 text-base font-bold text-[var(--color-text-primary)]">{v.title}</h3>
                <p className="text-sm leading-[1.65] text-[var(--color-text-tertiary)]">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
