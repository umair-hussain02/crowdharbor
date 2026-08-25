'use client';

import { motion } from 'motion/react';
import { ClipboardList, RefreshCw, Users, Package, Rocket } from 'lucide-react';
import { container, cx, ease, section, text } from './aboutTailwind';

const stages = [
  { num: '01', icon: ClipboardList, title: 'Manual Review', desc: 'The process should feel thoughtful and founder-specific, not like a generic automated quiz.', active: true },
  { num: '02', icon: RefreshCw, title: 'Repeatable Process', desc: 'CrowdHarbor is building a consistent review, report, and action-plan workflow for every founder.', active: true },
  { num: '03', icon: Users, title: 'Founder Results', desc: 'The early version generates testimonials, case studies, and evidence that preparation matters.', active: false },
  { num: '04', icon: Package, title: 'Productized System', desc: 'After validation, the service evolves into a stronger readiness system with a cleaner delivery structure.', active: false },
  { num: '05', icon: Rocket, title: 'Future Platform', desc: 'A full founder readiness platform, dashboard, and partner ecosystem built on real outcomes.', active: false },
];

export function AboutManualReview() {
  return (
    <section className={section.cream}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>How it evolves</div>
          <h2 className={text.sectionTitle}>Built manually first, so the process can become stronger.</h2>
          <p className={`${text.description} max-w-[600px]`}>CrowdHarbor's first version is intentionally focused on founder trust, manual review, repeatable delivery, and real feedback. The goal is to prove that founders value structured preparation before building a heavier platform.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease, delay: 0.1 }} className="rounded-[24px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-6 py-12 md:px-11">
          <div className="hidden md:block">
            <div className="relative mb-8">
              <div className="relative h-0.5 rounded-[var(--radius-pill)] bg-[#E8E8E0]">
                <motion.div initial={{ width: '0%' }} whileInView={{ width: '40%' }} viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: 0.3 }} className="absolute left-0 top-0 h-full rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)]" />
              </div>
              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-[10%]">
                {stages.map(s => (
                  <div key={s.num} className={cx('h-3.5 w-3.5 rounded-full', s.active ? 'border-[3px] border-[rgba(253,102,40,0.25)] bg-[var(--color-brand-orange)] shadow-[0_0_0_4px_rgba(253,102,40,0.12)]' : 'border-2 border-[#D0D0D0] bg-[var(--color-border)]')} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-5">
              {stages.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.09 }}>
                    <div className="mb-2.5 flex items-center gap-2">
                      <div className={cx('flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]', s.active ? 'bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]' : 'bg-[var(--color-bg-cream)] text-[var(--color-text-faint)]')}><Icon size={15} /></div>
                      <span className={cx('text-[11px] font-bold tracking-[0.05em]', s.active ? 'text-[var(--color-brand-orange)]' : 'text-[#CCC]')}>{s.num}</span>
                    </div>
                    <h4 className={cx('mb-1.5 text-sm font-extrabold tracking-[-0.01em]', s.active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-faint)]')}>{s.title}</h4>
                    <p className={cx('text-xs leading-[1.6]', s.active ? 'text-[var(--color-text-muted)]' : 'text-[#CCC]')}>{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:hidden">
            {stages.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className={cx('flex gap-4', i < stages.length - 1 && 'pb-6')}>
                  <div className="flex flex-col items-center">
                    <div className={cx('flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2', s.active ? 'border-[var(--color-brand-orange)] bg-[rgba(253,102,40,0.12)] text-[var(--color-brand-orange)]' : 'border-[var(--color-border)] bg-[var(--color-bg-cream)] text-[#BBB]')}><Icon size={15} /></div>
                    {i < stages.length - 1 && <div className={cx('mt-1.5 w-0.5 flex-1', s.active ? 'bg-[var(--color-brand-orange)]' : 'bg-[#E8E8E0]')} />}
                  </div>
                  <div className="pt-1.5">
                    <div className={cx('mb-1 text-[13px] font-extrabold', s.active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-faint)]')}>{s.title}</div>
                    <p className={cx('text-[13px] leading-[1.6]', s.active ? 'text-[var(--color-text-muted)]' : 'text-[#CCC]')}>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
