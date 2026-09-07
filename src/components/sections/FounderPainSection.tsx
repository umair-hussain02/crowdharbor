'use client';

import { motion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

export function FounderPainSection() {
  return (
    <section className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="max-w-[760px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="text-[clamp(32px,3.5vw,48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[20px]">
            Most founders are filtered out on things they never see.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            An investor spots a number in your deck that does not match your financial model, or a missing document, and passes in minutes. You never hear why. You assume the idea was rejected. Often it was just unread, or it quietly failed a basic check.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
