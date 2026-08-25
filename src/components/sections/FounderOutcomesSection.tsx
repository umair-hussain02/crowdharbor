'use client';

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const outcomes = [
  {
    title: 'Know if you are ready to raise',
    description: 'Get a clear picture of your current readiness level before approaching any capital source.',
  },
  {
    title: 'Understand your biggest funding blockers',
    description: 'Identify exactly what is preventing a strong first impression with investors.',
  },
  {
    title: 'See what materials are missing',
    description: 'Discover which documents and presentations need to be created or improved.',
  },
  {
    title: 'Improve your pitch and funding story',
    description: 'Refine how you communicate your company, traction, and vision to capital sources.',
  },
  {
    title: 'Choose a better capital pathway',
    description: 'Find the right route — investors, crowdfunding, grants, or accelerators — for your stage.',
  },
  {
    title: 'Follow a clear preparation roadmap',
    description: 'Leave with a structured action plan showing what to fix and what to prioritize first.',
  },
];

export function FounderOutcomesSection() {
  return (
    <section id="resources" className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[640px] [margin:0_auto_64px]"
        >
          <h2
            className="text-[clamp(32px, 3.5vw, 48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[16px]"
          >
            Leave with clarity before you approach capital.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              whileHover={{ y: -4 }}
              className="bg-[var(--color-bg-white)] border border-[var(--color-border)] hover:border-[var(--color-brand-orange)] rounded-[20px] p-[28px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-200"
            >
              <div className="mb-[14px]">
                <CheckCircle2 size={28} className="text-[var(--color-brand-orange)]" />
              </div>
              <div
                className="text-[16px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[8px] leading-[1.3]"
              >
                {outcome.title}
              </div>
              <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.65] [margin:0px]">
                {outcome.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
