'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Building2, HelpCircle } from 'lucide-react';
import { contactTw, cn } from './contactTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const floatCards = [
  { icon: MessageSquare, label: 'Founder Question', color: 'var(--color-brand-orange)', isBrand: true },
  { icon: Building2, label: 'Workshop Inquiry', color: 'var(--color-text-primary)', isBrand: false },
  { icon: HelpCircle, label: 'Support Request', color: 'var(--color-brand-orange)', isBrand: true },
];

export function ContactHero() {
  return (
    <section className="bg-[var(--color-bg-cream)] pb-[72px] pt-[120px]">
      <div className={contactTw.container}>
        <div className="grid grid-cols-1 items-center gap-[72px] md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className="mb-[22px] inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] px-3.5 py-[5px] text-xs font-bold uppercase tracking-[var(--letter-spacing-wider)] text-[var(--color-brand-orange)]"
            >
              Contact CrowdHarbor
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.08 }}
              className="mb-[18px] max-w-[680px] text-[var(--text-hero)] font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)]"
            >
              Questions before you prepare to raise?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.14 }}
              className="mb-8 max-w-[480px] text-[17px] leading-[1.65] text-[var(--color-text-secondary)]"
            >
              Reach out for founder questions, workshop inquiries, startup community partnerships, or support related to funding readiness, material review, capital pathway strategy, and preparation before fundraising outreach.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
              className="mb-5 flex flex-wrap gap-3"
            >
              <a href="#contact-form" className={cn(contactTw.primaryButton, 'px-6 py-[13px] text-[15px]')}>
                Submit an Inquiry
                <ArrowRight size={15} />
              </a>
              <Link href="/intake" className={cn(contactTw.secondaryButton, 'px-6 py-[13px] text-[15px]')}>
                Start Founder Intake
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-medium text-[var(--color-text-subtle)]"
            >
              For readiness reviews and Sprint applications, the founder intake form is the fastest next step.
            </motion.p>
          </div>

          <div className="hidden flex-col gap-3 md:flex">
            {floatCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: i === 1 ? 20 : 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.18 + i * 0.1 }}
                  className="flex items-center gap-3.5 rounded-[16px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-[22px] py-4 shadow-[var(--shadow-card-sm)]"
                >
                  <div className={cn(
                    contactTw.iconBox,
                    'shrink-0 rounded-[11px]',
                    card.isBrand ? 'bg-[var(--color-brand-orange-tint)]' : 'bg-[var(--color-neutral-tint)]',
                  )}>
                    <Icon size={18} color={card.color} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--color-text-primary)]">{card.label}</div>
                    <div className="text-xs font-medium text-[var(--color-text-subtle)]">CrowdHarbor inquiry</div>
                  </div>
                  <div className="ml-auto">
                    <div className={cn('size-2 rounded-full', card.isBrand ? 'bg-[var(--color-brand-orange)]' : 'bg-[#D0D0D0]')} />
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
