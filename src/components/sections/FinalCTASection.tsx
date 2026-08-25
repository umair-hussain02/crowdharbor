'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCTASection() {
  return (
    <section className="bg-[var(--color-bg-cream)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[32px] py-[80px] px-[60px] [box-shadow:0_24px_80px_rgba(0,0,0,0.06)] text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div
            className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full [background:radial-gradient(circle,_rgba(253,102,40,0.06)_0%,_transparent_70%)] pointer-events-none"
          />
          <div
            className="absolute bottom-[-40px] left-[-40px] w-[240px] h-[240px] rounded-full [background:radial-gradient(circle,_rgba(253,102,40,0.04)_0%,_transparent_70%)] pointer-events-none"
          />

          <div className="relative z-[1]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-[clamp(32px, 4vw, 56px)] font-extrabold text-[var(--color-text-primary)] leading-[1.08] tracking-[-0.025em] [font-family:var(--font-heading)] mb-[20px] max-w-[680px] [margin:0_auto_20px]"
            >
              Before you raise, know what needs to be fixed.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-[18px] text-[var(--color-text-tertiary)] leading-[1.75] max-w-[560px] [margin:0_auto_40px]"
            >
              Get a structured view of your funding readiness, material gaps, and best-fit capital pathway before you approach investors, platforms, grants, or accelerators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="flex flex-col items-center gap-[16px]"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/pricing"
                  className="inline-flex items-center gap-[8px] py-[16px] px-[32px] rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)] text-[16px] font-semibold no-underline cursor-pointer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Check Your Funding Readiness
                  <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <ArrowRight size={17} />
                  </motion.span>
                </motion.a>
                <motion.a
                  href="/sample-report"
                  className="inline-flex items-center gap-[8px] py-[16px] px-[32px] rounded-[var(--radius-pill)] bg-transparent text-[var(--color-text-primary)] text-[16px] font-semibold no-underline border border-[var(--color-border)] cursor-pointer"
                  whileHover={{ borderColor: '#FD6628', y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  View Sample Report
                </motion.a>
              </div>

              <p className="text-[13px] text-[var(--color-text-faint)] mt-[4px]">
                No funding guarantees. No broker promises. Preparation before outreach.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
