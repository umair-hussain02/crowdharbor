'use client';

import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from './howItWorksTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const workflowSteps = [
  { label: 'Intake Submitted', status: 'Complete', color: '#22c55e' },
  { label: 'Materials Under Review', status: 'In Progress', color: '#FD6628' },
  { label: 'Readiness Score Generated', status: 'Pending', color: '#E0E0E0' },
  { label: 'Strategy Session Scheduled', status: 'Pending', color: '#E0E0E0' },
  { label: 'Action Plan Delivered', status: 'Pending', color: '#E0E0E0' },
];

export function HIWHero() {
  return (
    <section className="flex min-h-screen items-center bg-[var(--color-bg-cream)] px-6 pb-[80px] pt-[120px] lg:pb-[100px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="mb-6 inline-block rounded-[var(--radius-pill)] border border-[rgba(253,102,40,0.2)] bg-[var(--color-brand-orange-tint-soft)] px-[14px] py-[6px] text-[13px] font-semibold text-[var(--color-brand-orange)]">
                How CrowdHarbor works
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mb-5 font-[var(--font-heading)] text-[clamp(38px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)]"
            >
              From funding uncertainty to a clear preparation plan.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mb-9 max-w-[500px] text-[17px] leading-[1.75] text-[var(--color-text-secondary)]"
            >
              CrowdHarbor reviews your company stage, traction, materials,
              funding goal, and pathway fit so you understand what is strong,
              what is missing, and what to fix before approaching capital.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mb-6 flex flex-col gap-4 sm:flex-row"
            >
              <motion.a
                href="/intake"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-7 py-[15px] text-[15px] font-semibold text-[var(--color-text-on-dark)] no-underline"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Check Your Funding Readiness
                <ArrowRight size={16} />
              </motion.a>

              <motion.a
                href="/sample-report"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-7 py-[15px] text-[15px] font-semibold text-[var(--color-text-primary)] no-underline"
                whileHover={{ borderColor: '#FD6628', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                View Sample Report
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
              className="mb-5 text-[13px] text-[var(--color-text-subtle)]"
            >
              Human-reviewed preparation. No funding guarantees. No broker promises.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="flex flex-wrap gap-6"
            >
              {[
                '5-step preparation workflow',
                'Material review',
                'Capital pathway recommendation',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-[var(--color-brand-orange)]"
                  />
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: workflow visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="flex w-full items-center justify-center lg:block"
          >
            <WorkflowVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WorkflowVisual() {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      className="mx-auto w-full max-w-[340px] rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.09)] sm:max-w-[400px] sm:rounded-[28px] sm:p-8 lg:ml-auto"
    >
      <div className="mb-6 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[var(--color-brand-orange)]" />
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
          Preparation Workflow
        </span>
      </div>

      <div className="flex flex-col">
        {workflowSteps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
            className="relative flex items-start gap-[14px]"
          >
            {/* Connector */}
            <div className="flex shrink-0 flex-col items-center">
              <div
                className={cn(
                  'z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                  i === 0
                    ? 'bg-[#22c55e]'
                    : i === 1
                      ? 'bg-[var(--color-brand-orange)]'
                      : 'bg-[var(--color-bg-admin-muted)]'
                )}
              >
                {i < 2 && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    {i === 0 ? (
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <circle cx="6" cy="6" r="2.5" fill="#fff" />
                    )}
                  </svg>
                )}
              </div>

              {i < workflowSteps.length - 1 && (
                <div
                  className={cn(
                    'mb-0.5 mt-0.5 h-8 w-0.5',
                    i === 0
                      ? 'bg-[#22c55e]'
                      : i === 1
                        ? 'bg-[linear-gradient(to_bottom,#FD6628,#E0E0E0)]'
                        : 'bg-[#E0E0E0]'
                  )}
                />
              )}
            </div>

            <div className="pt-1">
              <div
                className={cn(
                  'mb-0.5 text-[13px] font-semibold leading-[1.3] sm:text-sm',
                  i < 2
                    ? 'text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-faint)]'
                )}
              >
                {step.label}
              </div>

              <span
                className={cn(
                  'inline-block rounded-[var(--radius-pill)] px-2 py-0.5 text-[10px] font-bold',
                  i === 0
                    ? 'bg-[rgba(34,197,94,0.1)] text-[#22c55e]'
                    : i === 1
                      ? 'bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]'
                      : 'bg-[rgba(0,0,0,0.04)] text-[var(--color-text-faint)]',
                  i < workflowSteps.length - 1 ? 'mb-1.5' : 'mb-0'
                )}
              >
                {step.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-[14px] bg-[var(--color-brand-orange-tint-faint)] px-4 py-[14px]">
        <div>
          <div className="mb-0.5 text-[11px] text-[var(--color-text-subtle)]">
            Current phase
          </div>
          <div className="text-sm font-bold text-[var(--color-text-primary)]">
            Internal Review
          </div>
        </div>

        <div className="rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-on-dark)]">
          Step 2 / 5
        </div>
      </div>
    </motion.div>
  );
}