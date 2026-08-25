'use client';

import { motion } from 'motion/react';
import { Search, FileText, Map, ClipboardList } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const solutions = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnose readiness',
    description: 'Understand where your company stands before you raise. Get a clear view of strengths, weaknesses, and blockers.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Review key materials',
    description: 'Evaluate your pitch, financials, traction story, and data room status before approaching capital sources.',
  },
  {
    number: '03',
    icon: Map,
    title: 'Choose the right pathway',
    description: 'Identify whether crowdfunding, angels, grants, accelerators, pre-seed, or another route fits best for your stage.',
  },
  {
    number: '04',
    icon: ClipboardList,
    title: 'Build your action plan',
    description: 'Know what to fix first, what to prepare next, and what to avoid with a clear preparation roadmap.',
  },
];

export function SolutionSection() {
  return (
    <section id="services" className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-[680px] mb-[64px]"
        >
          <h2
            className="text-[clamp(32px, 3.5vw, 48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[16px]"
          >
            CrowdHarbor gives founders a structured preparation process before they approach capital.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            We combine readiness diagnosis, material review, capital pathway strategy, and action planning so founders know what to fix before fundraising outreach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {solutions.map((sol, i) => (
            <SolutionCard key={sol.title} sol={sol} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({ sol, index }: { sol: typeof solutions[0]; index: number }) {
  const Icon = sol.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-[var(--color-bg-white)] border border-[var(--color-border)] hover:border-[var(--color-brand-orange)] rounded-[24px] p-[36px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)] cursor-default [transition:border-color_0.25s]"
    >
      <div className="flex items-start justify-between mb-[20px]">
        <div
          className="w-[44px] h-[44px] rounded-[12px] bg-[var(--color-brand-orange-tint-soft)] flex items-center justify-center"
        >
          <Icon size={22} className="text-[var(--color-brand-orange)]" />
        </div>
        <span
          className="text-[13px] font-extrabold [color:#E0E0E0] [font-family:var(--font-heading)] tracking-[-0.01em]"
        >
          {sol.number}
        </span>
      </div>
      <h3
        className="text-[20px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[10px] [margin:0_0_10px_0]"
      >
        {sol.title}
      </h3>
      <p className="text-[15px] text-[var(--color-text-tertiary)] leading-[1.7] [margin:0px]">
        {sol.description}
      </p>
    </motion.div>
  );
}
