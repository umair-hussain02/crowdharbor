'use client';

import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const painCards = [
  {
    title: 'Unclear pitch narrative',
    description: 'The story is hard to understand or does not explain why now.',
  },
  {
    title: 'Weak pitch deck',
    description: 'The deck creates questions instead of confidence.',
  },
  {
    title: 'Incomplete financial model',
    description: 'Numbers are missing, confusing, or not connected to the raise.',
  },
  {
    title: 'Missing data room documents',
    description: 'Key materials are not ready for review.',
  },
  {
    title: 'No clear use of funds',
    description: 'The funding ask does not connect to milestones.',
  },
  {
    title: 'Wrong funding pathway',
    description: 'The founder may be pursuing the wrong route for their stage.',
  },
];

export function FounderPainSection() {
  return (
    <section
      className="bg-[var(--color-bg-white)] py-[100px] px-[24px]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2
              className="text-[clamp(32px, 3.5vw, 48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[20px]"
            >
              Most founders do not fail because the idea is weak.
            </h2>
            <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75] mb-[32px]">
              They lose opportunities because their pitch, numbers, documents, traction story, and funding strategy are not prepared for serious review.
            </p>
            <a
              href="/services"
              className="inline-flex items-center gap-[6px] text-[var(--color-brand-orange)] font-semibold text-[15px] no-underline cursor-pointer"
            >
              See how we help founders prepare →
            </a>
          </motion.div>

          {/* Right: 2x3 pain cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {painCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                whileHover={{ y: -4 }}
                className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[20px] p-[24px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)] cursor-default relative overflow-hidden transition-all duration-200"
              >
                {/* Orange left accent line on hover handled via JS */}
                <div className="flex items-start gap-[12px]">
                  <div
                    className="w-[32px] h-[32px] rounded-[8px] bg-[var(--color-brand-orange-tint-soft)] flex items-center justify-center shrink-0"
                  >
                    <AlertTriangle size={16} className="text-[var(--color-brand-orange)]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[var(--color-text-primary)] mb-[6px] leading-[1.3]">
                      {card.title}
                    </div>
                    <div className="text-[13px] text-[var(--color-text-muted)] leading-[1.6]">
                      {card.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
