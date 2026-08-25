'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, AlertCircle, Users, Lightbulb } from 'lucide-react';
import { contactTw, cn } from './contactTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const trustCards = [
  { icon: ShieldCheck, title: 'Founder preparation', desc: 'We help founders understand readiness, gaps, materials, and capital pathway fit.' },
  { icon: Users, title: 'Partner education', desc: 'We support founder communities with preparation-focused workshops and educational sessions.' },
  { icon: AlertCircle, title: 'No funding guarantees', desc: 'CrowdHarbor does not promise funding, investment, grants, crowdfunding success, or accelerator acceptance.' },
  { icon: Lightbulb, title: 'No broker role', desc: 'CrowdHarbor does not act as an investor, broker, dealer, crowdfunding platform, or funding guarantor.' },
];

export function ContactFinalCTA() {
  return (
    <>
      <section className={contactTw.sectionWhite}>
        <div className={contactTw.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mb-9"
          >
            <div className={contactTw.eyebrow}>Trust and transparency</div>
            <h2 className={contactTw.title}>Preparation-focused support.</h2>
            <p className="max-w-[540px] text-base leading-[1.65] text-[var(--color-text-secondary)]">
              CrowdHarbor helps founders prepare before approaching funding sources. It does not guarantee funding, act as an investor, serve as a broker, or replace legal, tax, financial, or investment advice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trustCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease, delay: i * 0.08 }}
                  className="rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-cream)] p-6"
                >
                  <div className={cn(contactTw.iconBox, 'mb-3.5 border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)]')}>
                    <Icon size={17} color="var(--color-text-secondary)" />
                  </div>
                  <div className="mb-1.5 text-sm font-bold text-[var(--color-text-primary)]">{card.title}</div>
                  <p className="m-0 text-[13px] leading-[1.65] text-[var(--color-text-muted)]">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-cream)] pb-20 pt-[72px]">
        <div className={contactTw.ctaContainer}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="rounded-[28px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-6 py-14 text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:px-14"
          >
            <div className="mb-3.5 text-[13px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]">Your next step</div>
            <h2 className="mb-3.5 text-[clamp(24px,3vw,38px)] font-extrabold leading-[1.15] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">
              Ready to prepare before you raise?
            </h2>
            <p className="mx-auto mb-9 max-w-[500px] text-[17px] leading-[1.65] text-[var(--color-text-secondary)]">
              Start the founder intake if you want a company-specific review. Use the contact form if you have a question, support request, or partner inquiry.
            </p>
            <div className="mb-4 flex flex-wrap justify-center gap-3">
              <Link href="/intake" className={cn(contactTw.primaryButton, 'px-[26px] py-3.5 text-[15px]')}>
                Start Founder Intake <ArrowRight size={15} />
              </Link>
              <a href="#contact-form" className={cn(contactTw.secondaryButton, 'px-[26px] py-3.5 text-[15px]')}>
                Submit an Inquiry
              </a>
            </div>
            <Link href="/sample-report" className="text-[13px] font-semibold text-[var(--color-brand-orange)] no-underline hover:underline">
              View Sample Report →
            </Link>
            <div className="mt-5 text-xs font-medium text-[var(--color-text-subtle)]">
              Preparation before outreach. No funding guarantees. No broker promises.
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
