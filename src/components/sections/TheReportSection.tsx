'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from './sectionsTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const whatWeCheck = [
  'Problem and market',
  'Traction',
  'Team',
  'Financial model',
  'Business model',
  'Use of funds',
  'Data room and documents',
  'Document consistency (deck vs numbers vs records)',
  'Funding pathway fit',
];

const whatYouGet = [
  'An overall readiness score out of 100',
  'A score for each area, so you see exactly where you stand',
  'Your top blockers, ranked',
  'The contradictions and gaps we found',
  'A recommended funding pathway',
  'A 7 to 14 day action plan',
];

function ScoreCard() {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[24px] border border-[#E8E8E8] bg-[var(--color-bg-admin-muted)]" />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-7 [box-shadow:0_24px_60px_rgba(0,0,0,0.1)]"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="mb-[2px] text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-brand-orange)]">
              CrowdHarbor
            </div>
            <div className="text-[14px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)]">
              Readiness Report
            </div>
          </div>
          <div className="text-right">
            <div className="mb-[2px] text-[10px] text-[var(--color-text-subtle)]">Score</div>
            <div className="text-[26px] font-extrabold text-[var(--color-text-primary)] [font-family:var(--font-heading)]">
              62<span className="text-[13px] text-[var(--color-text-subtle)]">/100</span>
            </div>
          </div>
        </div>

        <div className="mb-5 h-[6px] overflow-hidden rounded-[99px] bg-[var(--color-bg-admin-muted)]">
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '62%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            className="h-full rounded-[99px] bg-[var(--color-brand-orange)]"
          />
        </div>

        <div className="mb-5 inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint-soft)] px-3.5 py-[6px] text-[12px] font-bold text-[var(--color-brand-orange)]">
          Preparation Needed Before Outreach
        </div>

        {[
          { label: 'Main Gap', value: 'Financial Model' },
          { label: 'Data Room', value: 'Missing Documents' },
          { label: 'Pathway Fit', value: 'Crowdfunding + Angel Prep' },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-t border-[#F5F5F5] py-[9px]"
          >
            <span className="text-[12px] text-[var(--color-text-subtle)]">{row.label}</span>
            <span className="text-[12px] font-bold text-[var(--color-brand-orange)]">{row.value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TheReportSection() {
  return (
    <section id="the-report" className="bg-[var(--color-bg-cream)] py-16 md:py-[100px] px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mb-14 max-w-[680px] text-center"
        >
          <h2 className="mb-4 text-[clamp(32px,3.5vw,48px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary)] [font-family:var(--font-heading)]">
            See what your readiness report can reveal.
          </h2>
          <p className="text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
            The report helps founders understand where they stand, what is blocking them, and what actions should come before funding outreach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <ScoreCard />
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <div className="mb-4 text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--color-text-subtle)]">
                What we check
              </div>
              <ul className="flex list-none flex-col gap-3 p-0 m-0">
                {whatWeCheck.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <div className={cn('mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full', 'bg-[rgba(0,0,0,0.05)] text-[var(--color-text-subtle)]')}>
                      <Check size={10} />
                    </div>
                    <span className="text-[14px] leading-[1.5] text-[var(--color-text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <div className="mb-4 text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--color-brand-orange)]">
                What you get
              </div>
              <ul className="flex list-none flex-col gap-3 p-0 m-0">
                {whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]">
                      <Check size={10} />
                    </div>
                    <span className="text-[14px] leading-[1.5] text-[var(--color-text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
              className="sm:col-span-2"
            >
              <a
                href="/sample-report"
                className="inline-flex items-center gap-[6px] text-[15px] font-semibold text-[var(--color-brand-orange)] no-underline cursor-pointer"
              >
                See what is inside the report
                <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
