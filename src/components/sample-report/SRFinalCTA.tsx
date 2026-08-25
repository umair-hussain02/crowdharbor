"use client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { sr } from "./sampleReportTailwind";
import { trackEvent } from "@/lib/analytics/track";
const ease = [0.22, 1, 0.36, 1] as const;
export function SRFinalCTA() {
  return (
    <section className={sr.sectionCream}>
      <div className={sr.containerLg}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white px-[clamp(28px,5vw,72px)] py-[clamp(40px,6vw,80px)] text-center shadow-[0_24px_80px_rgba(0,0,0,0.06)]"
        >
          <div className="pointer-events-none absolute -right-[60px] -top-[60px] size-[280px] rounded-full bg-[radial-gradient(circle,rgba(253,102,40,0.07)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 size-[220px] rounded-full bg-[radial-gradient(circle,rgba(253,102,40,0.05)_0%,transparent_70%)]" />
          <div className="relative z-[1] mx-auto max-w-[680px]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mb-[18px] font-[Manrope,sans-serif] text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-text-primary)]"
            >
              Ready to see what your funding gaps look like?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mb-10 text-base leading-[1.75] text-[var(--color-text-tertiary)]"
            >
              Start with a readiness review or apply for the Capital Pathway
              Sprint to understand your current readiness, material gaps,
              funding blockers, and best-fit preparation path before outreach.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="flex flex-col items-center gap-3.5"
            >
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.a
                  href="/intake"
                  onClick={() => trackEvent('cta_click', { label: 'Get My Readiness Review', destination: '/intake', location: 'sample_report_final_cta' })}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] px-8 py-4 font-[Manrope,sans-serif] text-[15px] font-semibold text-white"
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Get My Readiness Review
                  <motion.span
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </motion.a>
                <motion.a
                    href="/contact"
                  onClick={() => trackEvent('cta_click', { label: 'Apply for the Capital Pathway Sprint', destination: '/contact', location: 'sample_report_final_cta' })}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white px-8 py-4 font-[Manrope,sans-serif] text-[15px] font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-brand-orange)]"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Apply for the Capital Pathway Sprint
                </motion.a>
              </div>
              <Link
                href="/pricing"
                className="text-sm font-semibold text-[var(--color-text-subtle)] underline decoration-[rgba(0,0,0,0.15)]"
              >
                View Pricing →
              </Link>
              <p className="mt-0.5 text-[13px] text-[var(--color-text-faint)]">
                No funding guarantees. No broker promises. Structured
                preparation before you raise.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
