'use client';

import { motion } from 'motion/react';
import { cn } from './howItWorksTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { num: '01', title: 'Founder Intake', desc: 'Share your company stage, traction, materials, funding goal, and biggest challenge.' },
  { num: '02', title: 'Internal Review', desc: 'CrowdHarbor reviews the signals that funding sources care about.' },
  { num: '03', title: 'Readiness Diagnosis', desc: 'You receive a clear view of strengths, weaknesses, missing materials, and blockers.' },
  { num: '04', title: 'Strategy Session', desc: 'Walk through what the findings mean and which fixes matter most.' },
  { num: '05', title: 'Action Plan', desc: 'Leave with a practical roadmap before approaching capital.' },
];

export function HIWProcessOverview() {
  return (
    <section id="process" className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[640px] [margin:0_auto_72px]"
        >
          <span
            className="inline-block py-[5px] px-[14px] rounded-[var(--radius-pill)] text-[12px] font-semibold text-[var(--color-brand-orange)] bg-[var(--color-brand-orange-tint-soft)] tracking-[0.04em] mb-[16px]"
          >
            THE PREPARATION JOURNEY
          </span>
          <h2
            className="text-[clamp(30px,_3.5vw,_48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.025em] [font-family:var(--font-heading)] mb-[16px]"
          >
            A five-step preparation journey.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            The process is designed to help founders understand their current readiness, review important fundraising materials, identify blockers, and leave with a practical action plan.
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className={cn("hidden lg:block", "relative")}>
          <div className="absolute top-[28px] left-[10%] right-[10%] h-[2px] [background:#E0E0E0]">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
              className="h-full bg-[var(--color-brand-orange)]"
            />
          </div>

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={cn("w-[56px] h-[56px] rounded-full flex items-center justify-center mb-[20px] relative z-[1]", i === 0 ? "bg-[var(--color-brand-orange)]" : "bg-[var(--color-bg-white)]", i === 0 ? "[box-shadow:0_4px_20px_rgba(253,102,40,0.3)]" : "[box-shadow:0_2px_8px_rgba(0,0,0,0.05)]")}
                >
                  <span className={cn("text-[13px] font-extrabold [font-family:var(--font-heading)]", i === 0 ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-subtle)]")}>
                    {step.num}
                  </span>
                </div>
                <div
                  className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[20px] py-[20px] px-[16px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="text-[14px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[8px]">
                    {step.title}
                  </div>
                  <p className="text-[12px] text-[var(--color-text-muted)] leading-[1.6] [margin:0px]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className={cn("lg:hidden", "relative pl-[44px]")}>
          <div className="absolute left-[18px] top-[0px] bottom-[0px] w-[2px] [background:#E0E0E0]">
            <motion.div
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-full bg-[var(--color-brand-orange)]"
            />
          </div>
          <div className="flex flex-col gap-[20px]">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease }}
                className="relative"
              >
                <div
                  className={cn("absolute left-[-34px] top-[18px] w-[18px] h-[18px] rounded-full [border:2px_solid_#FFFFFF] z-[1]", i === 0 ? "bg-[var(--color-brand-orange)]" : "[background:#E0E0E0]")}
                />
                <div
                  className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[20px] py-[20px] px-[24px]"
                >
                  <div className="text-[11px] font-bold text-[var(--color-brand-orange)] tracking-[0.06em] mb-[4px]">STEP {step.num}</div>
                  <div className="text-[16px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[6px]">{step.title}</div>
                  <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.6] [margin:0px]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
