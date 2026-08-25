'use client';

import { motion } from 'motion/react';
import { MessageSquare, Layout, BarChart2, FolderOpen, DollarSign, TrendingDown, GitBranch, Compass } from 'lucide-react';
import { card, container, ease, section, text } from './aboutTailwind';

const problems = [
  { icon: MessageSquare, title: 'Unclear pitch narrative', desc: 'The business story is hard to follow, making the opportunity difficult to evaluate.' },
  { icon: Layout, title: 'Weak or confusing deck', desc: 'The pitch deck may be missing key slides or fail to explain the business clearly.' },
  { icon: BarChart2, title: 'Incomplete financial model', desc: 'Numbers, assumptions, and projections are not ready for serious review.' },
  { icon: FolderOpen, title: 'Missing data room documents', desc: 'Key documents are unorganized, incomplete, or simply not prepared for due diligence.' },
  { icon: DollarSign, title: 'No clear use of funds', desc: 'The funding ask lacks a clear breakdown of where money goes and why.' },
  { icon: TrendingDown, title: 'Weak traction story', desc: 'Real proof exists but is not framed in a way that signals progress convincingly.' },
  { icon: GitBranch, title: 'Wrong funding pathway', desc: 'The founder may be chasing investors when grants, crowdfunding, or accelerators may fit better.' },
  { icon: Compass, title: 'No clear action plan', desc: 'The founder knows they need funding but does not know which gaps to address first.' },
];

export function AboutProblem() {
  return (
    <section className={section.cream}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-11">
          <div className={text.eyebrow}>The founder problem</div>
          <h2 className={text.sectionTitle}>The problem is not always the idea. It is the preparation.</h2>
          <p className={`${text.description} max-w-[640px]`}>A founder may have a strong product, early traction, or real ambition — but still be unprepared for serious funding review. The pitch may be unclear, the financial model incomplete, the data room missing, or the funding pathway wrong.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((prob, i) => {
            const Icon = prob.icon;
            return (
              <motion.div key={prob.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.06 }} className={`${card.white} ${card.hoverLift} p-[22px] pt-6`}>
                <div className="mb-3.5 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[var(--color-brand-orange-tint-soft)] text-[var(--color-brand-orange)]"><Icon size={17} /></div>
                <h3 className="mb-[7px] text-sm font-bold leading-[1.35] tracking-[-0.01em] text-[var(--color-text-primary)]">{prob.title}</h3>
                <p className="text-[13px] leading-[1.6] text-[var(--color-text-muted)]">{prob.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
