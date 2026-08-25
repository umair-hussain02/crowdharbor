'use client';

import { motion } from 'motion/react';
import { Activity, FileText, AlertCircle, Map, CheckSquare } from 'lucide-react';
import { card, container, ease, section, text } from './aboutTailwind';

const pillars = [
  { num: '01', icon: Activity, title: 'Diagnose funding readiness', desc: 'Understand where your company currently stands before approaching capital.' },
  { num: '02', icon: FileText, title: 'Review key materials', desc: 'Evaluate pitch decks, financials, traction proof, use of funds, and data room readiness.' },
  { num: '03', icon: AlertCircle, title: 'Identify blockers', desc: 'See what could create confusion, hesitation, or rejection during funding review.' },
  { num: '04', icon: Map, title: 'Recommend a capital pathway', desc: 'Understand whether crowdfunding, angels, grants, accelerators, pre-seed, revenue-based financing, or another route may fit better.' },
  { num: '05', icon: CheckSquare, title: 'Build an action plan', desc: 'Know what to fix first, what to prepare next, and what to avoid before outreach.' },
];

export function AboutWhatWeDo() {
  return (
    <section className={section.white}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>What we do</div>
          <h2 className={text.sectionTitle}>What CrowdHarbor helps founders do.</h2>
          <p className={`${text.description} max-w-[580px]`}>CrowdHarbor gives founders a structured way to understand their readiness, review important fundraising materials, identify blockers, and choose a preparation path before outreach.</p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: i * 0.07 }} className={`${card.cream} ${card.hoverLift} flex flex-col px-[22px] py-7`}>
                <div className="mb-3.5 text-[28px] font-extrabold leading-none tracking-[var(--letter-spacing-tight)] text-[var(--color-brand-orange)]">{p.num}</div>
                <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-[10px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] text-[var(--color-text-primary)]"><Icon size={17} /></div>
                <h3 className="mb-2.5 text-[15px] font-bold leading-[1.35] text-[var(--color-text-primary)]">{p.title}</h3>
                <p className="text-[13px] leading-[1.6] text-[var(--color-text-tertiary)]">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
