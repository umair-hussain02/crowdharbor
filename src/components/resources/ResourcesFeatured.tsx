'use client';

import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { resourceTw } from './resourcesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

export function ResourcesFeatured() {
  return (
    <section className="bg-[var(--color-bg-cream)] pb-[72px] lg:pt-[10%] pt-[25%]">
      <div className={resourceTw.container}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-7">
          <div className={resourceTw.eyebrow}>Start here</div>
          <div className="text-[clamp(22px,3vw,32px)] font-extrabold tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">
            The most important guide for new visitors.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="grid grid-cols-1 overflow-hidden rounded-[28px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[0_8px_40px_rgba(0,0,0,0.07)] md:grid-cols-2"
        >
          <div className="px-6 py-10 md:px-12 md:py-[52px]">
            <div className={resourceTw.pill}>Funding Readiness</div>
            <div className="mb-4 mt-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">Featured Guide</div>
            <h2 className="mb-5 text-[clamp(22px,2.5vw,30px)] font-extrabold leading-[1.2] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">
              How to Know If Your Startup Is Ready to Raise Capital
            </h2>
            <p className="mb-8 text-base leading-[1.65] text-[var(--color-text-secondary)]">
              Before approaching investors, crowdfunding platforms, grants, or accelerators, founders need to understand their pitch, traction, financials, materials, and pathway fit. This guide explains what readiness actually means.
            </p>
            <div className="mb-9 flex flex-col gap-2.5">
              {['Understand the 5 core readiness signals', 'Identify what is weak or missing', 'Know which funding path fits your stage'].map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle size={15} strokeWidth={2.5} className="text-[var(--color-brand-orange)]" />
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
            <button className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 font-[var(--font-body)] text-[15px] font-bold text-[var(--color-brand-orange)] transition-[gap] duration-200 hover:gap-3.5">
              Read Guide
              <ArrowRight size={16} />
            </button>
            <div className="mt-6 text-[13px] font-medium text-[var(--color-text-subtle)]">8 min read · Funding Readiness</div>
          </div>

          <div className="hidden items-center justify-center bg-[linear-gradient(145deg,#F5F5EE_0%,#EDEDDE_100%)] p-10 md:flex">
            <div className="w-full max-w-[300px]">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5, ease }} className="mb-3 rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">Readiness Score</div>
                <div className="mb-2.5 flex items-baseline gap-1">
                  <span className="text-[40px] font-extrabold tracking-[-0.03em] text-[var(--color-brand-orange)]">62</span>
                  <span className="text-base font-semibold text-[var(--color-text-subtle)]">/100</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-bg-admin-muted)]">
                  <div className="h-full w-[62%] rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)]" />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5, ease }} className="mb-3 rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">Key Blockers</div>
                {['No financial model', 'Data room incomplete', 'Weak traction proof'].map(b => (
                  <div key={b} className="mb-[7px] flex items-center gap-2">
                    <AlertTriangle size={12} className="text-[var(--color-brand-orange)]" />
                    <span className="text-xs font-medium text-[var(--color-text-secondary)]">{b}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5, ease }} className="rounded-[18px] bg-[var(--color-brand-orange)] px-5 py-4 shadow-[0_4px_20px_rgba(253,102,40,0.25)]">
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[rgba(255,255,255,0.7)]">Recommended Path</div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[var(--color-text-on-dark)]" />
                  <span className="text-sm font-bold text-[var(--color-text-on-dark)]">Crowdfunding + Angel</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
