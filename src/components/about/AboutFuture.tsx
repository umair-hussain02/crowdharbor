'use client';

import { motion } from 'motion/react';
import { LayoutDashboard, Activity, Users, GraduationCap, GitBranch } from 'lucide-react';
import { container, ease, section, text } from './aboutTailwind';

const futureCards = [
  { icon: LayoutDashboard, title: 'Founder Dashboard', desc: 'Track readiness, materials, and next steps over time.' },
  { icon: Activity, title: 'Readiness Tracking', desc: 'Help founders improve readiness before future funding attempts.' },
  { icon: Users, title: 'Partner Portal', desc: 'Support accelerators, universities, and startup communities.' },
  { icon: GraduationCap, title: 'Education Academy', desc: 'Offer structured founder learning around funding preparation.' },
  { icon: GitBranch, title: 'Capital Pathway Tools', desc: 'Help founders compare different funding routes more clearly.' },
];

export function AboutFuture() {
  return (
    <section className={section.white}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>Long-term vision</div>
          <h2 className={text.sectionTitle}>Starting with preparation. Building toward a smarter funding-readiness platform.</h2>
          <p className={`${text.description} max-w-[640px]`}>CrowdHarbor begins with manual founder preparation because the first priority is trust, usefulness, and real founder outcomes. Over time, the system can evolve into dashboards, readiness tracking, partner tools, and founder education products.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {futureCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.42, ease, delay: i * 0.07 }} className="relative cursor-default rounded-[20px] border-[1.5px] border-dashed border-[#D8D8D0] bg-[var(--color-bg-cream)] px-[22px] py-7 transition-all duration-200 hover:-translate-y-[3px] hover:border-[#D0D0C0] hover:bg-[var(--color-bg-white)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.05)]">
                <div className="absolute right-3.5 top-3.5 rounded-[var(--radius-pill)] bg-[#EBEBEA] px-2 py-[3px] text-[9px] font-bold uppercase tracking-[0.07em] text-[var(--color-text-faint)]">Future</div>
                <div className="mb-4 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[var(--color-neutral-tint)] text-[var(--color-text-subtle)]"><Icon size={17} /></div>
                <h3 className="mb-2 text-[15px] font-bold tracking-[-0.01em] text-[var(--color-text-tertiary)]">{card.title}</h3>
                <p className="text-[13px] leading-[1.6] text-[var(--color-text-subtle)]">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
