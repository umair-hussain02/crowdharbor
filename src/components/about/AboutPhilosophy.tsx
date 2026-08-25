'use client';

import { motion } from 'motion/react';
import { container, ease, section, text } from './aboutTailwind';

const points = [
  { label: 'Preparation protects credibility', body: 'A stronger first impression can prevent avoidable confusion during investor, platform, or accelerator review.' },
  { label: 'Clarity improves decisions', body: 'Founders make better choices when they understand their readiness level and the specific gaps holding them back.' },
  { label: 'Pathway matters', body: 'Not every business should pursue the same funding route. Choosing the right path before outreach saves time and effort.' },
  { label: 'A score is only the beginning', body: 'The real value is understanding what to fix and what to do next — not just where you rank today.' },
];

export function AboutPhilosophy() {
  return (
    <section className={section.black}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrowDark}>Our philosophy</div>
          <h2 className={text.sectionTitleDark}>We believe fundraising starts before outreach.</h2>
          <p className={`${text.descriptionDark} max-w-[580px]`}>The first investor conversation, crowdfunding campaign, grant application, or accelerator pitch should not be the first time a founder discovers major gaps. Preparation should happen earlier.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {points.map((pt, i) => (
            <motion.div key={pt.label} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.1 }} className="rounded-[22px] border-[1.5px] border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] px-8 py-9 transition-all duration-200 hover:border-[rgba(253,102,40,0.4)] hover:bg-[rgba(253,102,40,0.08)]">
              <div className="mb-5 h-[3px] w-8 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)]" />
              <h3 className="mb-3 text-xl font-extrabold leading-tight tracking-[var(--letter-spacing-snug)] text-[var(--color-text-on-dark)]">{pt.label}</h3>
              <p className="text-[15px] leading-[1.7] text-[rgba(255,255,255,0.6)]">{pt.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
