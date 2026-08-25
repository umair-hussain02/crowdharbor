'use client';

import { motion } from 'motion/react';
import { Search, FileText, Map, ClipboardList, BookOpen } from 'lucide-react';
import { servicesTw } from './servicesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  { icon: Search, num: '01', title: 'Funding Readiness Diagnosis', desc: 'Understand your current strengths, weaknesses, gaps, and blockers before approaching capital.' },
  { icon: FileText, num: '02', title: 'Fundraising Asset Preparation', desc: 'Review the materials funding sources will care about — pitch, financials, traction, data room.' },
  { icon: Map, num: '03', title: 'Capital Pathway Strategy', desc: 'Identify which funding route fits your stage, business type, and current readiness level.' },
  { icon: ClipboardList, num: '04', title: 'Fundraising Action Plan', desc: 'Know what to fix first, what to prepare next, and what timeline to follow before outreach.' },
  { icon: BookOpen, num: '05', title: 'Founder Education and Support', desc: 'Build clarity and confidence before approaching funding sources with a stronger preparation base.' },
];

export function ServicesCorePillars() {
  return (
    <section className={servicesTw.sectionWhite}>
      <div className={servicesTw.container}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className={servicesTw.headerLg}>
          <span className={servicesTw.eyebrow}>CORE FRAMEWORK</span>
          <h2 className={servicesTw.title}>Every service is built around funding preparation.</h2>
          <p className={servicesTw.desc}>CrowdHarbor combines diagnosis, material review, capital pathway strategy, and action planning so founders prepare before outreach.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09, ease }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-colors hover:border-[var(--color-brand-orange)]"
              >
                <div className="mb-[18px] flex items-start justify-between">
                  <div className={servicesTw.orangeIcon}><Icon size={22} /></div>
                  <span className="font-[var(--font-heading)] text-xl font-extrabold text-[var(--color-border-divider)]">{pillar.num}</span>
                </div>
                <div className="mb-2 font-[var(--font-heading)] text-[17px] font-bold leading-[1.25] text-[var(--color-text-primary)]">{pillar.title}</div>
                <p className="m-0 text-sm leading-[1.65] text-[var(--color-text-muted)]">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
