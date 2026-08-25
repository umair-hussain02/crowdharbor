'use client';

import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from './sectionsTailwind';
import { trackEvent } from '@/lib/analytics/track';

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center overflow-hidden bg-[var(--color-bg-cream)] px-6 pb-[80px] pt-[120px] lg:pb-[100px]"
    >
      <div className="mx-auto w-full max-w-[var(--container-lg)]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="mb-6 inline-block rounded-[var(--radius-pill)] border border-[rgba(253,102,40,0.2)] bg-[var(--color-brand-orange-tint-soft)] px-[14px] py-[6px] text-[13px] font-semibold tracking-[0.01em] text-[var(--color-brand-orange)]">
                Funding preparation for early-stage founders
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="m-0 font-[var(--font-heading)] text-[clamp(42px,5.5vw,72px)] font-extrabold leading-none tracking-[-0.03em] text-[var(--color-text-primary)]"
            >
              Prepare before
              <br />
              you raise.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mt-5 max-w-[500px] text-[20px] font-semibold leading-[1.45] text-[var(--color-text-primary)]"
            >
              Know what&apos;s weak, what&apos;s missing, and which funding path fits before you approach capital.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease }}
              className="mt-[14px] max-w-[500px] text-base leading-[var(--line-height-loose)] text-[var(--color-text-secondary)]"
            >
              CrowdHarbor helps early-stage founders diagnose funding readiness, review key fundraising materials, and choose the right capital pathway before approaching investors, crowdfunding platforms, grants, or accelerators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <HeroCTAPrimary />
              <HeroCTASecondary />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-4 text-[13px] text-[var(--color-text-subtle)]"
            >
              No funding guarantees. No broker promises. Just structured preparation before you raise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease }}
              className="mt-6 flex flex-wrap gap-6"
            >
              {['Readiness diagnosis', 'Material review', 'Capital pathway recommendation'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0 text-[var(--color-brand-orange)]" />
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating readiness dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className={cn(
              'relative flex min-h-[500px] items-center justify-center pt-8 sm:min-h-[520px] lg:min-h-[540px] lg:pt-0'
            )}
          >
            <ReadinessDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroCTAPrimary() {
  return (
    <motion.a
      href="/intake"
      onClick={() => trackEvent('cta_click', { label: 'Check Your Funding Readiness', destination: '/intake', location: 'home_hero' })}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-7 py-[15px] text-[15px] font-semibold text-[var(--color-text-on-dark)] no-underline"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      Check Your Funding Readiness
      <ArrowRight size={16} />
    </motion.a>
  );
}

function HeroCTASecondary() {
  return (
    <motion.a
      href="/sample-report"
      onClick={() => trackEvent('cta_click', { label: 'View Sample Report', destination: '/sample-report', location: 'home_hero' })}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-7 py-[15px] text-[15px] font-semibold text-[var(--color-text-primary)] no-underline"
      whileHover={{ borderColor: '#FD6628', y: -2 }}
      transition={{ duration: 0.2 }}
    >
      View Sample Report
    </motion.a>
  );
}

function ReadinessDashboard() {
  const rows = [
    { label: 'Main Blocker', value: 'Financial Model' },
    { label: 'Pathway Fit', value: 'Crowdfunding + Angel' },
    { label: 'Priority', value: 'Fix Pitch Narrative' },
    { label: 'Next Step', value: 'Capital Pathway Sprint' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[330px] sm:max-w-[380px]">
      {/* Main report card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-6 [box-shadow:0_24px_60px_rgba(0,0,0,0.08)] sm:p-8"
      >
        <div className="mb-[6px] flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[var(--color-brand-orange)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
            Readiness Report
          </span>
        </div>

        <div className="mb-6 font-[var(--font-heading)] text-[17px] font-bold text-[var(--color-text-primary)]">
          CrowdHarbor Analysis
        </div>

        {/* Score ring */}
        <div className="mb-6 flex items-center gap-5">
          <div className="relative h-[88px] w-[88px] shrink-0">
            <svg width="88" height="88" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="38" fill="none" stroke="#F0F0F0" strokeWidth="8" />
              <motion.circle
                cx="44"
                cy="44"
                r="38"
                fill="none"
                stroke="#FD6628"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 38}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 38 * (1 - 0.62) }}
                transition={{ duration: 1.6, delay: 0.9, ease: 'easeOut' }}
                className="[transform-origin:50%_50%] [transform:rotate(-90deg)]"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[22px] font-extrabold leading-none text-[var(--color-text-primary)]">
                62
              </span>
            </div>
          </div>

          <div>
            <div className="mb-1 text-[13px] text-[var(--color-text-subtle)]">
              Overall Readiness
            </div>
            <div className="text-base font-bold text-[var(--color-text-primary)]">
              62 / 100
            </div>
            <div className="mt-[6px] inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] px-[10px] py-[3px] text-[11px] font-bold text-[var(--color-brand-orange)]">
              Needs Preparation
            </div>
          </div>
        </div>

        {/* Data rows */}
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
            className="flex items-center justify-between border-t border-[var(--color-border-divider)] py-[10px]"
          >
            <span className="text-xs text-[var(--color-text-subtle)]">
              {row.label}
            </span>
            <span className="max-w-[150px] text-right text-xs font-semibold text-[var(--color-text-primary)] sm:max-w-[160px]">
              {row.value}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating top-right mini card */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-[-28px] right-[-8px] min-w-[172px] rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-[20px] py-[16px] [box-shadow:0_12px_40px_rgba(0,0,0,0.09)] sm:right-[-36px]"
      >
        <div className="mb-1 text-[11px] text-[var(--color-text-subtle)]">
          Action Plan
        </div>
        <div className="mb-[10px] text-sm font-bold text-[var(--color-text-primary)]">
          7–14 Day Roadmap
        </div>
        <div className="h-[5px] overflow-hidden rounded-[99px] bg-[var(--color-bg-admin-muted)]">
          <motion.div
            className="h-full rounded-[99px] bg-[var(--color-brand-orange)]"
            initial={{ width: '0%' }}
            animate={{ width: '62%' }}
            transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Floating bottom-left mini card */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute bottom-[10px] left-[-8px] min-w-[152px] rounded-[18px] bg-[var(--color-brand-orange)] px-[20px] py-[14px] [box-shadow:0_12px_40px_rgba(253,102,40,0.28)] sm:left-[-44px]"
      >
        <div className="mb-1 text-[11px] text-[rgba(255,255,255,0.7)]">
          Preparation Status
        </div>
        <div className="text-sm font-bold text-[var(--color-text-on-dark)]">
          Ready to Prepare
        </div>
      </motion.div>
    </div>
  );
}