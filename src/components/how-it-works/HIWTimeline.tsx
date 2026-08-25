'use client';

import { motion } from 'motion/react';
import { cn } from './howItWorksTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const milestones = [
  { day: 'Day 0', title: 'Intake Submitted', desc: 'Submit your company details and materials for review.' },
  { day: 'Day 1–2', title: 'Review Phase', desc: 'CrowdHarbor reviews your company, traction, materials, and funding goal.' },
  { day: 'Day 3–5', title: 'Diagnosis Delivered', desc: 'You receive your readiness diagnosis and key preparation insights.' },
  { day: 'Day 5–7', title: 'Strategy + Action Plan', desc: 'Strategy session and action plan delivery.' },
  { day: '7–14 Days', title: 'Preparation Sprint', desc: 'Sprint roadmap helps guide the next preparation phase.' },
];

export function HIWTimeline() {
  return (
    <section className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[640px] [margin:0_auto_72px]"
        >
          <span
            className="inline-block py-[5px] px-[14px] rounded-[var(--radius-pill)] text-[12px] font-bold text-[var(--color-brand-orange)] bg-[var(--color-brand-orange-tint-soft)] tracking-[0.04em] uppercase mb-[14px]"
          >
            EXPECTED FLOW
          </span>
          <h2
            className="text-[clamp(30px,_3.5vw,_46px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.025em] [font-family:var(--font-heading)] mb-[14px]"
          >
            Designed to give founders clarity quickly.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            CrowdHarbor's preparation process is built to help founders receive clear feedback and next steps without waiting months. Timelines are indicative and may vary by offer.
          </p>
        </motion.div>

        {/* Desktop horizontal */}
        <div className={cn("hidden lg:block", "relative")}>
          <div className="absolute top-[24px] left-[5%] right-[5%] h-[2px] [background:#E0E0E0]">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
              className="h-full bg-[var(--color-brand-orange)]"
            />
          </div>

          <div className="grid grid-cols-5 gap-4">
            {milestones.map((m, i) => (
              <motion.div
                key={m.day}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease }}
                className="flex flex-col items-center text-center"
              >
                {/* Dot */}
                <div
                  className={cn("w-[48px] h-[48px] rounded-full flex items-center justify-center mb-[16px] relative z-[1]", i === 0 ? "bg-[var(--color-brand-orange)]" : "bg-[var(--color-bg-white)]", i === 0 ? "[box-shadow:0_4px_20px_rgba(253,102,40,0.3)]" : "[box-shadow:0_2px_8px_rgba(0,0,0,0.05)]")}
                >
                  <span className={cn("text-[11px] font-extrabold", i === 0 ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-subtle)]")}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Day label */}
                <div
                  className={cn("py-[3px] px-[10px] rounded-[var(--radius-pill)] text-[11px] font-bold mb-[10px]", i === 0 ? "bg-[var(--color-brand-orange-tint)]" : "bg-[rgba(0,0,0,0.04)]", i === 0 ? "text-[var(--color-brand-orange)]" : "text-[var(--color-text-subtle)]")}
                >
                  {m.day}
                </div>

                <div
                  className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[16px] py-[16px] px-[14px] shadow-[var(--shadow-card)]"
                >
                  <div className="text-[13px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[6px]">{m.title}</div>
                  <p className="text-[12px] text-[var(--color-text-muted)] leading-[1.55] [margin:0px]">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
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
            {milestones.map((m, i) => (
              <motion.div
                key={m.day}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease }}
                className="relative"
              >
                <div
                  className={cn("absolute left-[-34px] top-[18px] w-[18px] h-[18px] rounded-full [border:2px_solid_#FFFFFF] z-[1]", i === 0 ? "bg-[var(--color-brand-orange)]" : "[background:#E0E0E0]")}
                />
                <div className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[18px] py-[20px] px-[24px]">
                  <div className="text-[11px] font-bold text-[var(--color-brand-orange)] tracking-[0.06em] mb-[4px]">{m.day}</div>
                  <div className="text-[16px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[6px]">{m.title}</div>
                  <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.6] [margin:0px]">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
