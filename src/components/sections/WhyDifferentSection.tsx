'use client';

import { motion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

export function WhyDifferentSection() {
  return (
    <section className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="mx-auto max-w-[780px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="mb-5 inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint-soft)] px-[14px] py-[6px] text-[13px] font-bold tracking-[0.01em] text-[var(--color-brand-orange)]">
            Why we are different
          </span>
          <h2 className="mb-5 text-[clamp(30px,3.2vw,44px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-[var(--color-text-primary)] [font-family:var(--font-heading)]">
            Most tools grade your slides. We do more.
          </h2>
          <p className="text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
            We cross-check your slides against your numbers and your company records, and flag what does not match, the same way an investor does in a data room. A beautiful deck with broken numbers still fails. We catch that first, so an investor never has to.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
