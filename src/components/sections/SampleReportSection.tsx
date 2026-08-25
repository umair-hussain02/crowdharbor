'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from './sectionsTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const reportModules = [
  'Overall Readiness Score',
  'Strengths and Weaknesses',
  'Top Funding Blockers',
  'Material Gaps',
  'Capital Pathway Recommendation',
  '7–14 Day Action Plan',
];

export function SampleReportSection() {
  return (
    <section
      id="sample-report"
      className="bg-[var(--color-bg-white)] py-16 md:py-[100px] px-4 sm:px-6 overflow-x-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: 3D report preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center min-w-0"
          >
            <ReportPreview />
          </motion.div>

          {/* Right: explanation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="min-w-0"
          >
            <h2 className="text-[clamp(30px,3vw,44px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[16px] break-words">
              See what your readiness report can reveal.
            </h2>

            <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75] mb-[28px] break-words">
              The report helps founders understand where they stand, what is blocking them, and what actions should come before funding outreach.
            </p>

            <ul className="list-none p-0 [margin:0_0_36px_0] flex flex-col gap-[12px]">
              {reportModules.map((module, i) => (
                <motion.li
                  key={module}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4, ease }}
                  className="flex items-start gap-[12px] min-w-0"
                >
                  <div className="w-[22px] h-[22px] rounded-full bg-[var(--color-brand-orange-tint)] flex items-center justify-center shrink-0 mt-[1px]">
                    <Check size={13} className="text-[var(--color-brand-orange)]" />
                  </div>

                  <span className="text-[15px] text-[#333333] font-medium break-words min-w-0">
                    {module}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/pricing"
                className="inline-flex items-center justify-center gap-[8px] py-[14px] px-[24px] rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)] text-[15px] font-semibold no-underline cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Get My Readiness Review
                <ArrowRight size={15} className="shrink-0" />
              </motion.a>

              <motion.a
                href="/sample-report"
                className="inline-flex items-center justify-center py-[14px] px-[24px] rounded-[var(--radius-pill)] bg-transparent text-[var(--color-text-primary)] text-[15px] font-semibold border border-[var(--color-border)] cursor-pointer"
                whileHover={{ borderColor: '#FD6628', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                View Sample Report
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReportPreview() {
  return (
    <div className="relative w-full max-w-[420px] px-4 sm:px-5">
      <div className="relative w-full">
        {/* Back shadow card */}
        <div className="absolute inset-0 translate-x-5 translate-y-5 bg-[var(--color-bg-admin-muted)] rounded-[24px] [border:1px_solid_#E8E8E8]" />

        <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 [background:#F8F8F8] rounded-[24px] [border:1px_solid_#EBEBEB]" />

        {/* Main report */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[24px] p-5 sm:p-[28px] [box-shadow:0_24px_60px_rgba(0,0,0,0.1)] z-[5] w-full max-w-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-[20px] min-w-0">
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-[var(--color-brand-orange)] tracking-[0.08em] uppercase mb-[2px]">
                CrowdHarbor
              </div>

              <div className="text-[14px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] break-words">
                Readiness Report
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[10px] text-[var(--color-text-subtle)] mb-[2px]">
                Score
              </div>

              <div className="text-[22px] font-extrabold text-[var(--color-text-primary)] [font-family:var(--font-heading)]">
                62
                <span className="text-[12px] [color:#888]">/100</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-[20px]">
            <div className="flex justify-between gap-4 mb-[6px]">
              <span className="text-[11px] text-[var(--color-text-subtle)]">
                Overall Readiness
              </span>

              <span className="text-[11px] font-bold text-[var(--color-brand-orange)] shrink-0">
                62%
              </span>
            </div>

            <div className="h-[6px] bg-[var(--color-bg-admin-muted)] rounded-[99px] overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '62%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                className="h-full bg-[var(--color-brand-orange)] rounded-[99px]"
              />
            </div>
          </div>

          {/* Module list */}
          {[
            { label: 'Pitch Narrative', score: 55, status: 'Needs Work' },
            { label: 'Financial Model', score: 40, status: 'Major Gap' },
            { label: 'Traction Story', score: 72, status: 'Good' },
            { label: 'Capital Pathway', score: 68, status: 'Review' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 py-[8px] px-0 [border-top:1px_solid_#F5F5F5] min-w-0"
            >
              <span className="text-[12px] text-[var(--color-text-secondary)] font-medium min-w-0 break-words">
                {item.label}
              </span>

              <div className="flex items-center gap-[8px] shrink-0">
                <div className="w-[48px] h-[3px] bg-[var(--color-bg-admin-muted)] rounded-[99px] overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-[99px]',
                      item.score < 50
                        ? 'bg-[var(--color-brand-orange)]'
                        : item.score < 70
                          ? '[background:#f0a030]'
                          : '[background:#22c55e]'
                    )}
                  />
                </div>

                <span className="text-[11px] text-[var(--color-text-subtle)] [min-width:60px] text-right">
                  {item.status}
                </span>
              </div>
            </div>
          ))}

          {/* CTA row */}
          <div className="mt-[16px] py-[12px] px-[16px] bg-[var(--color-brand-orange-tint-faint)] rounded-[12px] flex items-center justify-between gap-3 min-w-0">
            <span className="text-[12px] font-semibold text-[var(--color-text-primary)] break-words min-w-0">
              Next: Capital Pathway Sprint
            </span>

            <ArrowRight size={14} className="text-[var(--color-brand-orange)] shrink-0" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
