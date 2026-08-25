'use client';

import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { servicesTw } from './servicesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

export function ServicesHero() {
  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="flex min-h-screen items-center bg-[var(--color-bg-cream)] px-6 pb-[80px] pt-[120px] lg:pb-[100px]">
      <div className="mx-auto w-full max-w-[var(--container-lg)]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-6 inline-block rounded-[var(--radius-pill)] border border-[rgba(253,102,40,0.2)] bg-[var(--color-brand-orange-tint-soft)] px-3.5 py-1.5 text-[13px] font-semibold text-[var(--color-brand-orange)]"
            >
              CrowdHarbor services
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mb-5 font-[var(--font-heading)] text-[clamp(38px,5vw,64px)] font-extrabold leading-[1.05] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)]"
            >
              Funding preparation for the stage you are actually in.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mb-9 max-w-[500px] text-[17px] leading-[1.75] text-[var(--color-text-secondary)]"
            >
              From a quick readiness diagnosis to a deeper capital pathway sprint,
              CrowdHarbor helps founders understand what is weak, what is missing,
              and what needs to be fixed before approaching investors,
              crowdfunding platforms, grants, or accelerators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mb-5 flex flex-col gap-4 sm:flex-row"
            >
              {/* <motion.a
                href="/services"
                className={servicesTw.primaryButton}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Apply for the Capital Pathway Sprint <ArrowRight size={16} />
              </motion.a>

              <motion.a
                onClick={() => scroll('#offer1')}
                className={servicesTw.secondaryWhiteButton}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Start With a Readiness Review
              </motion.a> */}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42, ease }}
              className="mb-5 text-[13px] text-[var(--color-text-subtle)]"
            >
              Preparation before outreach. No funding guarantees. No broker promises.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease }}
              className="flex flex-wrap gap-6"
            >
              {[
                'Readiness diagnosis',
                'Material review',
                'Capital pathway strategy',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-[var(--color-brand-orange)]"
                  />
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="relative flex min-h-[440px] items-center justify-center sm:min-h-[460px] lg:min-h-[420px]"
          >
            <ServiceStack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceStack() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[340px]">
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -top-6 left-0 right-6 rounded-[24px] border border-[#E8E8E8] bg-[#F8F8F8] px-5 py-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:-left-6 sm:px-6 sm:py-[22px]"
      >
        <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#BBBBBB]">
          Offer 03
        </div>

        <div className="font-[var(--font-heading)] text-[15px] font-bold text-[#BBBBBB]">
          Fundraising Preparation Program
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {['Prepare', 'Narrative', 'Roadmap'].map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-pill)] bg-[rgba(0,0,0,0.04)] px-2 py-0.5 text-[10px] font-semibold text-[#BBBBBB]"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 rounded-[24px] border-2 border-[var(--color-brand-orange)] bg-[var(--color-bg-white)] p-5 shadow-[0_24px_60px_rgba(253,102,40,0.15)] sm:p-7"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-brand-orange)]">
              Offer 02
            </div>

            <div className="font-[var(--font-heading)] text-base font-extrabold text-[var(--color-text-primary)] sm:text-lg">
              Capital Pathway Sprint
            </div>
          </div>

          <span className="shrink-0 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-text-on-dark)] sm:px-3 sm:text-[11px]">
            Recommended
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {['Diagnose', 'Review', 'Recommend', 'Roadmap'].map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] px-2.5 py-[3px] text-[11px] font-semibold text-[var(--color-brand-orange)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="h-1 overflow-hidden rounded-[99px] bg-[var(--color-border-divider)]">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '78%' }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            className="h-full rounded-[99px] bg-[var(--color-brand-orange)]"
          />
        </div>

        <div className="mt-1.5 flex justify-between">
          <span className="text-[11px] text-[var(--color-text-subtle)]">
            Preparation depth
          </span>
          <span className="text-[11px] font-bold text-[var(--color-brand-orange)]">
            Deep
          </span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute -bottom-7 left-6 right-0 z-[5] rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-5 py-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:-right-7"
      >
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
          Offer 01
        </div>

        <div className="font-[var(--font-heading)] text-sm font-bold text-[#333333]">
          Funding Readiness Review
        </div>

        <div className="mt-2 flex flex-wrap gap-[5px]">
          {['Diagnose', 'Review'].map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-pill)] bg-[rgba(0,0,0,0.05)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-text-subtle)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}