'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Upload, ScanSearch, FileCheck2, Rocket } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    icon: Upload,
    title: 'Apply and upload',
    description: 'Share your deck, financials, and company details.',
  },
  {
    icon: ScanSearch,
    title: 'We check across all of them',
    description: 'Not just the slides. Every document, cross-checked.',
  },
  {
    icon: FileCheck2,
    title: 'Get your readiness report',
    description: 'Your score, your weak spots, and exact fixes.',
  },
  {
    icon: Rocket,
    title: 'Fix and go to investors',
    description: 'Approach capital sources prepared, not hopeful.',
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
          className="text-center max-w-[640px] [margin:0_auto_64px]"
        >
          <h2 className="text-[clamp(32px,3.5vw,48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[16px]">
            A simple, real process.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            Four steps from upload to a prepared, investor-ready company.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-[28px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-brand-orange-tint-soft)]">
                    <Icon size={19} className="text-[var(--color-brand-orange)]" />
                  </div>
                  <span className="text-[13px] font-extrabold text-[#E0E0E0] [font-family:var(--font-heading)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mb-[8px] text-[16px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)]">
                  {step.title}
                </div>
                <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.6] [margin:0px]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-[6px] text-[var(--color-brand-orange)] font-semibold text-[15px] no-underline cursor-pointer"
          >
            See the full process →
          </Link>
        </div>
      </div>
    </section>
  );
}
