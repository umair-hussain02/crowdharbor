'use client';

import { motion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

export function VisionSection() {
  return (
    <section className="bg-[var(--color-bg-black)] px-6 py-[100px]">
      <div className="mx-auto max-w-[820px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="mb-6 inline-block rounded-[var(--radius-pill)] border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.06)] px-[14px] py-[6px] text-[12px] font-bold uppercase tracking-[0.08em] text-[rgba(255,255,255,0.7)]">
            On the roadmap — where CrowdHarbor is going
          </span>

          <h2 className="mb-6 text-[clamp(28px,3.2vw,42px)] font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--color-text-on-dark)] [font-family:var(--font-heading)]">
            Today we get you ready to raise. Next, we will build the bridge to capital.
          </h2>

          <p className="mb-10 text-[17px] leading-[1.8] text-[rgba(255,255,255,0.7)]">
            Verified startups will connect directly to accelerators, angel groups, and funding platforms, so founders prepare once and reach many funding channels instead of chasing them one by one. We are building that now.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[rgba(255,255,255,0.85)] no-underline"
          >
            Are you an accelerator or investor? Get in touch
            <span className="text-[var(--color-brand-orange)]">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
