'use client';

import { motion } from 'motion/react';
import { cn } from './sectionsTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: '01',
    title: 'Founder Intake',
    description: 'You share your company stage, traction, funding goal, current materials, and biggest challenge.',
  },
  {
    number: '02',
    title: 'Internal Review',
    description: 'We review your pitch, business model, traction proof, financials, data room status, and pathway fit.',
  },
  {
    number: '03',
    title: 'Readiness Diagnosis',
    description: 'You receive a clear view of your strengths, weaknesses, missing materials, and blockers.',
  },
  {
    number: '04',
    title: 'Strategy Session',
    description: 'We explain the findings and help you understand what matters most before fundraising.',
  },
  {
    number: '05',
    title: 'Action Plan',
    description: 'You receive a roadmap showing what to fix, what to prepare, and which funding path to prioritize.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[640px] [margin:0_auto_72px]"
        >
          <h2
            className="text-[clamp(32px, 3.5vw, 48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[16px]"
          >
            A clear path from uncertainty to funding preparation.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            CrowdHarbor guides founders through intake, review, diagnosis, strategy, and action planning.
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute top-[28px] left-[10%] right-[10%] h-[2px] [background:#E0E0E0] z-[0]"
            >
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                className="h-full bg-[var(--color-brand-orange)]"
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step dot */}
                  <div
                    className={cn("w-[56px] h-[56px] rounded-full flex items-center justify-center mb-[20px] relative z-[1]", i === 0 ? "bg-[var(--color-brand-orange)]" : "bg-[var(--color-bg-white)]", i === 0 ? "[box-shadow:0_4px_20px_rgba(253,102,40,0.3)]" : "[box-shadow:none]")}
                  >
                    <span
                      className={cn("text-[14px] font-extrabold [font-family:var(--font-heading)]", i === 0 ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-secondary)]")}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div
                    className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[20px] p-[20px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)]"
                  >
                    <div
                      className="text-[15px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[8px]"
                    >
                      {step.title}
                    </div>
                    <p className="text-[13px] text-[var(--color-text-muted)] leading-[1.6] [margin:0px]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-[40px]">
            {/* Vertical line */}
            <div
              className="absolute left-[16px] top-[0px] bottom-[0px] w-[2px] [background:#E0E0E0]"
            >
              <motion.div
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="w-full bg-[var(--color-brand-orange)]"
              />
            </div>

            <div className="flex flex-col gap-[24px]">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  className="relative"
                >
                  {/* Dot */}
                  <div
                    className={cn("absolute left-[-32px] top-[20px] w-[16px] h-[16px] rounded-full [border:2px_solid_#FFFFFF] z-[1]", i === 0 ? "bg-[var(--color-brand-orange)]" : "[background:#E0E0E0]")}
                  />

                  <div
                    className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[20px] p-[24px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)]"
                  >
                    <div className="text-[11px] font-bold text-[var(--color-brand-orange)] tracking-[0.06em] mb-[6px]">
                      STEP {step.number}
                    </div>
                    <div
                      className="text-[17px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[8px]"
                    >
                      {step.title}
                    </div>
                    <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.65] [margin:0px]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
