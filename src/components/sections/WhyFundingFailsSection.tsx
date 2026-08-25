'use client';

import { motion } from 'motion/react';
import { X, Check, ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const tooEarlyPoints = [
  'Rejected without clear feedback',
  'Weak first impression',
  'Confusing deck',
  'Unclear ask',
  'Missing documents',
  'Wrong funding route',
];

const preparedPoints = [
  'Clearer story',
  'Stronger materials',
  'Better funding path',
  'More confident outreach',
  'Fewer avoidable gaps',
  'Better founder decisions',
];

export function WhyFundingFailsSection() {
  return (
    <section className="bg-[var(--color-bg-cream)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[680px] [margin:0_auto_64px]"
        >
          <h2
            className="text-[clamp(32px, 3.5vw, 48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[16px]"
          >
            Funding starts before the first investor conversation.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            Before investors, platforms, grants, or accelerators review your company, they look for signals: clear positioning, traction, financial logic, use of funds, founder story, and prepared materials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* Left card - muted */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[24px] p-[36px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)]"
          >
            <div className="mb-[24px]">
              <div
                className="inline-block py-[4px] px-[12px] rounded-[var(--radius-pill)] bg-[rgba(0,0,0,0.04)] text-[11px] font-bold text-[var(--color-text-subtle)] tracking-[0.06em] uppercase mb-[12px]"
              >
                Without preparation
              </div>
              <h3
                className="text-[22px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] [margin:0px]"
              >
                When founders approach too early
              </h3>
            </div>
            <ul className="flex flex-col gap-[12px] list-none p-[0px] [margin:0px]">
              {tooEarlyPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease }}
                  className="flex items-center gap-[10px]"
                >
                  <div
                    className="w-[20px] h-[20px] rounded-full bg-[var(--color-neutral-tint)] flex items-center justify-center shrink-0"
                  >
                    <X size={12} className="text-[#999999]" />
                  </div>
                  <span className="text-[15px] text-[var(--color-text-muted)]">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow between */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="flex flex-col items-center gap-[8px] py-[0] px-[8px]"
          >
            <div
              className="w-[48px] h-[48px] rounded-full bg-[var(--color-brand-orange)] flex items-center justify-center"
            >
              <ArrowRight size={20} className="text-[var(--color-text-on-dark)]" />
            </div>
            <span
              className="text-[11px] font-bold text-[var(--color-brand-orange)] tracking-[0.06em] uppercase text-center"
            >
              Prepare<br />first
            </span>
          </motion.div>

          {/* Right card - emphasized */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="bg-[var(--color-bg-white)] [border:1.5px_solid_#FD6628] rounded-[24px] p-[36px] [box-shadow:0_20px_60px_rgba(253,102,40,0.08)]"
          >
            <div className="mb-[24px]">
              <div
                className="inline-block py-[4px] px-[12px] rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] text-[11px] font-bold text-[var(--color-brand-orange)] tracking-[0.06em] uppercase mb-[12px]"
              >
                With preparation
              </div>
              <h3
                className="text-[22px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] [margin:0px]"
              >
                When founders prepare first
              </h3>
            </div>
            <ul className="flex flex-col gap-[12px] list-none p-[0px] [margin:0px]">
              {preparedPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4, ease }}
                  className="flex items-center gap-[10px]"
                >
                  <div
                    className="w-[20px] h-[20px] rounded-full bg-[var(--color-brand-orange-tint)] flex items-center justify-center shrink-0"
                  >
                    <Check size={12} className="text-[var(--color-brand-orange)]" />
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
