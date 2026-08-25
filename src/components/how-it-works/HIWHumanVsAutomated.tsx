'use client';

import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const basicPoints = [
  'Quick result',
  'Limited context',
  'No material review',
  'No pathway strategy',
  'No action planning',
];

const crowdharborPoints = [
  'Readiness diagnosis',
  'Material review',
  'Pathway recommendation',
  'Strategy session',
  'Action plan',
];

export function HIWHumanVsAutomated() {
  return (
    <section className="bg-[var(--color-bg-cream)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[640px] [margin:0_auto_64px]"
        >
          <span
            className="inline-block py-[5px] px-[14px] rounded-[var(--radius-pill)] text-[12px] font-bold text-[var(--color-brand-orange)] bg-[var(--color-brand-orange-tint-soft)] tracking-[0.04em] uppercase mb-[14px]"
          >
            HUMAN-REVIEWED PROCESS
          </span>
          <h2
            className="text-[clamp(30px,_3.5vw,_46px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.025em] [font-family:var(--font-heading)] mb-[14px]"
          >
            More than an automated score.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            The readiness score is only the diagnostic entry point. CrowdHarbor's value comes from reviewing materials, identifying gaps, recommending a pathway, and helping founders understand what to fix before outreach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left card — muted */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[24px] p-[36px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)]"
          >
            <div
              className="inline-block py-[4px] px-[12px] rounded-[var(--radius-pill)] bg-[rgba(0,0,0,0.04)] text-[11px] font-bold text-[var(--color-text-subtle)] tracking-[0.06em] uppercase mb-[12px]"
            >
              Basic approach
            </div>
            <h3
              className="text-[22px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] [margin:0_0_24px]"
            >
              Basic Score Tool
            </h3>
            <ul className="list-none p-[0px] [margin:0px] flex flex-col gap-[14px]">
              {basicPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.35, ease }}
                  className="flex items-center gap-[12px]"
                >
                  <div className="w-[20px] h-[20px] rounded-full bg-[rgba(0,0,0,0.05)] flex items-center justify-center shrink-0">
                    <X size={11} className="text-[var(--color-text-faint)]" />
                  </div>
                  <span className="text-[15px] text-[var(--color-text-subtle)]">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right card — emphasized */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            whileHover={{ borderColor: '#FD6628' }}
            className="bg-[var(--color-bg-white)] [border:1.5px_solid_#FD6628] rounded-[24px] p-[36px] [box-shadow:0_20px_60px_rgba(253,102,40,0.1)] relative"
          >
            <div
              className="absolute top-[-14px] left-[32px] bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)] text-[11px] font-bold py-[4px] px-[14px] rounded-[var(--radius-pill)] tracking-[0.04em]"
            >
              Preparation-first
            </div>
            <div
              className="inline-block py-[4px] px-[12px] rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] text-[11px] font-bold text-[var(--color-brand-orange)] tracking-[0.06em] uppercase mb-[12px]"
            >
              CrowdHarbor approach
            </div>
            <h3
              className="text-[22px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] [margin:0_0_24px]"
            >
              CrowdHarbor Preparation Process
            </h3>
            <ul className="list-none p-[0px] [margin:0px] flex flex-col gap-[14px]">
              {crowdharborPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.35, ease }}
                  className="flex items-center gap-[12px]"
                >
                  <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-brand-orange-tint)] flex items-center justify-center shrink-0">
                    <Check size={11} className="text-[var(--color-brand-orange)]" />
                  </div>
                  <span className="text-[15px] text-[#333333] font-medium">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
