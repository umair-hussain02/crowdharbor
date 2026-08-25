'use client';

import { motion } from 'motion/react';
import { BarChart3, LayoutList, AlertTriangle, FileEdit, Map, CalendarDays } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const deliverables = [
  { icon: BarChart3, title: 'Funding Readiness Scorecard', desc: 'A clear diagnostic view of your current preparation level.' },
  { icon: LayoutList, title: 'Strength and Weakness Overview', desc: 'Understand what is working and what needs attention.' },
  { icon: AlertTriangle, title: 'Top Funding Blockers', desc: 'Identify the gaps most likely to create friction before outreach.' },
  { icon: FileEdit, title: 'Pitch / Material Review Notes', desc: 'See where your current materials may need improvement.' },
  { icon: Map, title: 'Capital Pathway Recommendation', desc: 'Understand which funding route may fit your stage and readiness.' },
  { icon: CalendarDays, title: '7–14 Day Action Plan', desc: 'Leave with a practical roadmap for what to fix next.' },
];

export function HIWWhatYouReceive() {
  return (
    <section className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
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
            DELIVERABLES
          </span>
          <h2
            className="text-[clamp(30px,_3.5vw,_46px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.025em] [font-family:var(--font-heading)] mb-[14px]"
          >
            What you receive from CrowdHarbor.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            Depending on your selected offer, you receive a structured combination of diagnosis, review, recommendation, and action planning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {deliverables.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[20px] p-[28px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[var(--color-brand-orange)]"
              >
                <div
                  className="w-[42px] h-[42px] rounded-[12px] bg-[var(--color-brand-orange-tint-soft)] flex items-center justify-center mb-[16px]"
                >
                  <Icon size={20} className="text-[var(--color-brand-orange)]" />
                </div>
                <div className="text-[16px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[8px]">
                  {item.title}
                </div>
                <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.65] [margin:0px]">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/sample-report"
            className="inline-flex items-center justify-center py-[14px] px-[28px] rounded-[var(--radius-pill)] bg-transparent text-[var(--color-text-primary)] text-[15px] font-semibold no-underline border border-[var(--color-border)]"
          >
            View Sample Report
          </a>
          <a
            href="/services"
            className="inline-flex items-center justify-center py-[14px] px-[28px] rounded-[var(--radius-pill)] bg-transparent text-[var(--color-text-primary)] text-[15px] font-semibold no-underline border border-[var(--color-border)]"
          >
            Compare Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
