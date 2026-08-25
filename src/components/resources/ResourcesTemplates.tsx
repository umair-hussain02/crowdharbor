'use client';

import { motion } from 'motion/react';
import { FileCheck, FolderOpen, Calculator, GitCompare, Bell } from 'lucide-react';
import { resourceTw } from './resourcesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const templates = [
  {
    icon: FileCheck,
    title: 'Pitch Deck Review Checklist',
    desc: 'A checklist to evaluate whether your deck clearly explains the business, traction, market, and funding ask.',
  },
  {
    icon: FolderOpen,
    title: 'Data Room Starter Checklist',
    desc: 'A simple list of documents to organize before funding conversations. Know what is ready and what is missing.',
  },
  {
    icon: Calculator,
    title: 'Use-of-Funds Worksheet',
    desc: 'A worksheet to clarify how much you are raising, where the money goes, and what each allocation produces.',
  },
  {
    icon: GitCompare,
    title: 'Capital Pathway Comparison Sheet',
    desc: 'A simple framework to compare funding routes based on your stage, traction, and goals.',
  },
];

export function ResourcesTemplates() {
  return (
    <section className={resourceTw.sectionWhite}>
      <div className={resourceTw.container}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-3">
          <div className={resourceTw.eyebrow}>Practical tools</div>
          <div className="mb-2 text-[clamp(22px,3vw,36px)] font-extrabold tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">Founder preparation templates.</div>
          <p className="mb-9 max-w-[560px] text-base leading-[1.6] text-[var(--color-text-secondary)]">Use simple templates to organize your pitch, documents, funding ask, and next-step preparation plan.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div key={t.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.08 }} className="flex flex-col rounded-[20px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-cream)] p-7">
                <div className="mb-[18px] flex size-11 items-center justify-center rounded-[12px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)]">
                  <Icon size={20} className="text-[var(--color-brand-orange)]" />
                </div>
                <h3 className="mb-2.5 text-base font-bold leading-[1.3] text-[var(--color-text-primary)]">{t.title}</h3>
                <p className="mb-5 flex-1 text-[13px] leading-[1.6] text-[var(--color-text-tertiary)]">{t.desc}</p>
                <div className="flex items-center gap-2 rounded-[var(--radius-pill)] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-4 py-2 text-xs font-semibold text-[var(--color-text-subtle)]">
                  <Bell size={12} className="text-[var(--color-text-subtle)]" />
                  Coming soon
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-6 rounded-[18px] border-[1.5px] border-[rgba(253,102,40,0.2)] bg-[var(--color-brand-orange-tint-faint)] px-8 py-6"
        >
          <div>
            <div className="mb-1 text-[15px] font-bold text-[var(--color-text-primary)]">Get notified when templates launch</div>
            <p className="m-0 text-[13px] text-[var(--color-text-secondary)]">We'll send you templates as they become available.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input type="email" placeholder="Your email address" className="min-w-[220px] rounded-[var(--radius-pill)] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-[18px] py-2.5 font-[var(--font-body)] text-sm text-[var(--color-text-primary)] outline-none transition-colors duration-200 focus:border-[var(--color-brand-orange)]" />
            <button className="cursor-pointer rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] px-5 py-2.5 font-[var(--font-body)] text-sm font-bold text-[var(--color-text-on-dark)] transition-colors duration-200 hover:bg-[var(--color-brand-orange-hover)]">
              Notify Me
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
