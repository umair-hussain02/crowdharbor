'use client';

import { motion } from 'motion/react';
import { ArrowRight, Activity, Map, FileCheck, Users } from 'lucide-react';
import { contactTw, cn } from './contactTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const workshops = [
  { icon: Activity, title: 'Founder Readiness Workshop', desc: 'Help founders understand what funding sources may review before outreach.' },
  { icon: Map, title: 'Capital Pathway Education', desc: 'Explain different funding routes — crowdfunding, angels, grants, accelerators, pre-seed, and revenue-based financing.' },
  { icon: FileCheck, title: 'Pitch Readiness Checklist', desc: 'Give founders a practical framework to review their story, deck, numbers, and materials before outreach.' },
  { icon: Users, title: 'Group Diagnostic Session', desc: 'Support a group of founders with readiness discussion and preparation priorities in a structured format.' },
];

export function ContactWorkshops() {
  return (
    <section className="bg-[var(--color-bg-white)] py-20">
      <div className={contactTw.container}>
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="mb-3 text-[13px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]">For communities</div>
            <h2 className="mb-3.5 text-[clamp(22px,3vw,36px)] font-extrabold leading-[1.15] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">
              Workshops for founder communities.
            </h2>
            <p className="mb-7 text-[17px] leading-[1.65] text-[var(--color-text-secondary)]">
              CrowdHarbor can support founder communities with funding-readiness workshops, capital pathway education, pitch readiness checklists, group diagnostic sessions, and optional discounted founder reviews.
            </p>
            <p className="mb-8 text-sm leading-[1.65] text-[var(--color-text-muted)]">
              For accelerators, universities, startup centers, founder communities, entrepreneur programs, coworking spaces, and crowdfunding groups.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact-form" className={cn(contactTw.primaryButton, 'px-[22px] py-3 text-sm')}>
                Ask About Workshops
                <ArrowRight size={14} />
              </a>
              <a href="mailto:contact@crowdharbor.com" className={cn(contactTw.secondaryButton, 'px-[22px] py-3 text-sm')}>
                Contact CrowdHarbor
              </a>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3.5">
            {workshops.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease, delay: i * 0.08 }}
                  className="flex items-start gap-3.5 rounded-[16px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-cream)] px-[22px] py-5"
                >
                  <div className={cn(contactTw.iconBox, 'shrink-0 border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)]')}>
                    <Icon size={17} color="var(--color-brand-orange)" />
                  </div>
                  <div>
                    <div className="mb-1 text-[15px] font-bold text-[var(--color-text-primary)]">{w.title}</div>
                    <p className="m-0 text-[13px] leading-[1.6] text-[var(--color-text-tertiary)]">{w.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
