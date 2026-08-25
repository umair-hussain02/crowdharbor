'use client';

import { motion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

const pathways = [
  {
    label: 'Crowdfunding Preparation',
    angle: 0,
  },
  {
    label: 'Angel Investor Preparation',
    angle: 51.4,
  },
  {
    label: 'Grant Readiness',
    angle: 102.9,
  },
  {
    label: 'Accelerator Readiness',
    angle: 154.3,
  },
  {
    label: 'Pre-Seed Preparation',
    angle: 205.7,
  },
  {
    label: 'Revenue-Based Financing',
    angle: 257.1,
  },
  {
    label: 'Strategic Partner Readiness',
    angle: 308.6,
  },
];

function getPosition(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);

  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

export function CapitalPathwaySection() {
  const desktopRadius = 200;
  const mobileRadius = 128;

  return (
    <section className="overflow-hidden bg-[var(--color-bg-cream)] px-6 py-[72px] lg:py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mb-12 max-w-[640px] text-center lg:mb-[72px]"
        >
          <h2 className="mb-4 font-[var(--font-heading)] text-[clamp(32px,3.5vw,48px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary)]">
            Not every founder needs the same funding path.
          </h2>

          <p className="text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
            CrowdHarbor helps founders understand which route fits their stage,
            traction, geography, business type, and readiness level.
          </p>
        </motion.div>

        {/* Mobile circle layout */}
        <div className="block lg:hidden">
          <div className="relative mx-auto h-[360px] w-full max-w-[360px]">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 360 360"
            >
              {pathways.map((pathway, i) => {
                const pos = getPosition(pathway.angle, mobileRadius);

                return (
                  <motion.line
                    key={pathway.label}
                    x1={180}
                    y1={180}
                    x2={180 + pos.x}
                    y2={180 + pos.y}
                    stroke={i === 0 ? '#FD6628' : '#E0E0E0'}
                    strokeWidth={i === 0 ? 2 : 1}
                    strokeDasharray={i === 0 ? 'none' : '4 4'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  />
                );
              })}
            </svg>

            {/* Center hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="absolute left-1/2 top-1/2 z-10 flex h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[var(--color-bg-black)] shadow-[0_16px_44px_rgba(0,0,0,0.2)]"
            >
              <div className="text-center text-[9px] font-bold leading-[1.25] tracking-[0.06em] text-[rgba(255,255,255,0.6)]">
                FOUNDER
              </div>
              <div className="text-center font-[var(--font-heading)] text-[12px] font-extrabold leading-[1.15] text-[var(--color-text-on-dark)]">
                Profile
              </div>
            </motion.div>

            {/* Mobile pathway cards */}
            {pathways.map((pathway, i) => {
              const pos = getPosition(pathway.angle, mobileRadius);
              const isActive = i === 0;

              return (
                <motion.div
                  key={pathway.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.08,
                    ease,
                  }}
                  className={`absolute z-[5] flex min-h-[44px] w-[92px] -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-[12px] border px-2.5 py-2 text-center transition-all duration-200 ${
                    isActive
                      ? 'border-[var(--color-brand-orange)] bg-[var(--color-brand-orange)] shadow-[0_8px_24px_rgba(253,102,40,0.28)]'
                      : 'border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[0_4px_14px_rgba(0,0,0,0.06)]'
                  }`}
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                  }}
                >
                  <span
                    className={`text-[10px] font-semibold leading-[1.25] ${
                      isActive
                        ? 'text-[var(--color-text-on-dark)]'
                        : 'text-[#333333]'
                    }`}
                  >
                    {pathway.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop circle layout */}
        <div className="hidden lg:block">
          <div className="relative mx-auto h-[520px] w-[520px]">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 520 520"
            >
              {pathways.map((pathway, i) => {
                const pos = getPosition(pathway.angle, desktopRadius);

                return (
                  <motion.line
                    key={pathway.label}
                    x1={260}
                    y1={260}
                    x2={260 + pos.x}
                    y2={260 + pos.y}
                    stroke={i === 0 ? '#FD6628' : '#E0E0E0'}
                    strokeWidth={i === 0 ? 2 : 1}
                    strokeDasharray={i === 0 ? 'none' : '4 4'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  />
                );
              })}
            </svg>

            {/* Center hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="absolute left-1/2 top-1/2 z-10 flex h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[var(--color-bg-black)] shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
            >
              <div className="text-center text-[11px] font-bold leading-[1.3] tracking-[0.06em] text-[rgba(255,255,255,0.6)]">
                FOUNDER
              </div>
              <div className="text-center font-[var(--font-heading)] text-sm font-extrabold leading-[1.2] text-[var(--color-text-on-dark)]">
                Profile
              </div>
            </motion.div>

            {/* Desktop pathway cards */}
            {pathways.map((pathway, i) => {
              const pos = getPosition(pathway.angle, desktopRadius);
              const isActive = i === 0;

              return (
                <motion.div
                  key={pathway.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.08,
                    ease,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className={`absolute z-[5] max-w-[140px] -translate-x-1/2 -translate-y-1/2 cursor-default rounded-[14px] border px-[14px] py-[10px] text-center transition-all duration-200 ${
                    isActive
                      ? 'border-[var(--color-brand-orange)] bg-[var(--color-brand-orange)] shadow-[0_8px_30px_rgba(253,102,40,0.3)]'
                      : 'border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-[var(--color-brand-orange)]'
                  }`}
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                  }}
                >
                  <span
                    className={`text-xs font-semibold leading-[1.4] ${
                      isActive
                        ? 'text-[var(--color-text-on-dark)]'
                        : 'text-[#333333]'
                    }`}
                  >
                    {pathway.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}