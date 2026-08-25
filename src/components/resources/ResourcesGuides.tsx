'use client';

import { motion } from 'motion/react';
import { ArrowRight, BarChart2, FileText, Map, FolderOpen } from 'lucide-react';
import { resourceTw } from './resourcesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const guides = [
  {
    icon: BarChart2,
    category: 'Funding Readiness',
    title: 'Funding Readiness Guide',
    excerpt: 'Understand the signs that your company may or may not be ready to raise. Five core areas, practical questions, and what to fix first.',
  },
  {
    icon: FileText,
    category: 'Pitch Deck',
    title: 'Pitch Deck Preparation Guide',
    excerpt: 'Learn what your deck needs before serious review. Structure, story, traction framing, team presentation, and ask clarity.',
  },
  {
    icon: Map,
    category: 'Capital Pathways',
    title: 'Capital Pathway Guide',
    excerpt: 'Compare crowdfunding, angels, grants, accelerators, pre-seed, and other routes. Understand which path fits your stage and company.',
  },
  {
    icon: FolderOpen,
    category: 'Data Room',
    title: 'Data Room Readiness Guide',
    excerpt: 'Understand what documents may be expected during funding conversations and how to organize them before any capital source asks.',
  },
];

export function ResourcesGuides() {
  return (
    <section className={resourceTw.sectionCream}>
      <div className={resourceTw.container}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-9">
          <div className={resourceTw.eyebrow}>Essential reading</div>
          <div className="text-[clamp(22px,3vw,36px)] font-extrabold tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">Most useful founder guides.</div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="flex cursor-pointer flex-col rounded-[24px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-7 py-8 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-orange)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-[14px] bg-[var(--color-brand-orange-tint)]">
                  <Icon size={22} className="text-[var(--color-brand-orange)]" />
                </div>
                <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-brand-orange)]">{guide.category}</div>
                <h3 className="mb-3 text-[17px] font-extrabold leading-[1.3] tracking-[-0.01em] text-[var(--color-text-primary)]">{guide.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-[1.6] text-[var(--color-text-tertiary)]">{guide.excerpt}</p>
                <button className="flex cursor-pointer items-center gap-1.5 self-start border-0 bg-transparent p-0 font-[var(--font-body)] text-[13px] font-bold text-[var(--color-brand-orange)]">
                  Read Guide
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
