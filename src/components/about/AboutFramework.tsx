'use client';

import { motion } from 'motion/react';
import { Building2, MessageSquare, TrendingUp, BarChart2, DollarSign, FolderOpen, Globe, GitBranch, CheckSquare } from 'lucide-react';
import { container, ease, section, text } from './aboutTailwind';

const frameworks = [
  { icon: Building2, title: 'Company Stage', desc: 'Is the company at a stage where funding conversations make sense?' },
  { icon: MessageSquare, title: 'Pitch Narrative', desc: 'Is the company story clear, credible, and easy to understand?' },
  { icon: TrendingUp, title: 'Traction Proof', desc: 'Is there evidence of real progress — users, revenue, waitlist, pilots, or partnerships?' },
  { icon: BarChart2, title: 'Financial Readiness', desc: 'Are the numbers and assumptions ready for serious review?' },
  { icon: DollarSign, title: 'Use of Funds', desc: 'Is there a clear, credible breakdown of where capital would go and why?' },
  { icon: FolderOpen, title: 'Data Room Status', desc: 'Are key legal, financial, and company documents organized and accessible?' },
  { icon: Globe, title: 'Market Positioning', desc: 'Is the market opportunity well-defined and the competitive position clear?' },
  { icon: GitBranch, title: 'Funding Pathway Fit', desc: "Does the selected route match the company's stage and traction?" },
  { icon: CheckSquare, title: 'Founder Action Plan', desc: 'Does the founder know what to fix first and what to prepare before outreach?' },
];

export function AboutFramework() {
  return (
    <section className={section.white}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>The framework</div>
          <h2 className={text.sectionTitle}>A structured framework for funding preparation.</h2>
          <p className={`${text.description} max-w-[600px]`}>CrowdHarbor reviews a founder's company through practical preparation areas that funding sources often care about.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.42, ease, delay: i * 0.06 }} className="flex cursor-default flex-col rounded-[18px] border-[1.5px] border-[#E8E8E0] bg-[var(--color-bg-cream)] px-6 py-7 transition-all duration-200 hover:-translate-y-[3px] hover:border-[var(--color-brand-orange)] hover:bg-[var(--color-bg-white)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
                <div className="mb-3.5 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]"><Icon size={17} /></div>
                  <h3 className="text-[15px] font-extrabold tracking-[-0.01em] text-[var(--color-text-primary)]">{f.title}</h3>
                </div>
                <p className="text-[13px] leading-[1.65] text-[var(--color-text-muted)]">{f.desc}</p>
                <div className="mt-4 h-1 overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-border)]">
                  <div className={`h-full rounded-[var(--radius-pill)] bg-[linear-gradient(90deg,var(--color-brand-orange),rgba(253,102,40,0.6))] ${['w-[55%]', 'w-[62%]', 'w-[69%]', 'w-[76%]', 'w-[83%]', 'w-[90%]', 'w-[57%]', 'w-[64%]', 'w-[71%]'][i]}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
