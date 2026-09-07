'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { User, FileText, Building2, LifeBuoy, ArrowRight } from 'lucide-react';
import { contactTw, cn } from './contactTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const paths = [
  { icon: User, title: 'I am a founder', desc: 'Questions before starting a readiness review, Sprint, or preparation program.', cta: 'Ask a Founder Question', href: '#contact-form', isLink: false },
  { icon: FileText, title: 'I want to submit my company', desc: 'Founders ready to begin the review process.', cta: 'Start Founder Intake', href: '/intake', isLink: true, highlight: true },
  { icon: Building2, title: 'I am an accelerator or investor', desc: 'Accelerators, angel groups, universities, and funding platforms interested in partnering or workshops.', cta: 'Get in Touch', href: 'mailto:contact@crowdharbor.com', isLink: true },
  { icon: LifeBuoy, title: 'I need support', desc: 'Questions about payments, submissions, scheduling, or uploaded materials.', cta: 'Contact Support', href: 'mailto:contact@crowdharbor.com', isLink: true },
];

export function ContactPathSelector() {
  return (
    <section className={contactTw.sectionWhite}>
      <div className={contactTw.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-9"
        >
          <div className={contactTw.eyebrow}>Find your path</div>
          <h2 className={contactTw.title}>Choose the best path.</h2>
          <p className="text-base leading-[1.6] text-[var(--color-text-secondary)]">
            Select the option that best matches why you are contacting CrowdHarbor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {paths.map((path, i) => {
            const Icon = path.icon;
            const content = (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: i * 0.08 }}
                className={cn(
                  'relative flex cursor-pointer flex-col rounded-[20px] bg-[var(--color-bg-white)] px-6 py-7 text-[inherit] no-underline transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-orange)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]',
                  path.highlight ? 'border-2 border-[var(--color-brand-orange)]' : 'border-[1.5px] border-[var(--color-border)]',
                )}
              >
                {path.highlight && (
                  <div className="absolute -top-[11px] left-5 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-3 py-[3px] text-[10px] font-bold uppercase tracking-[var(--letter-spacing-wider)] text-[var(--color-text-on-dark)]">
                    Ready to start
                  </div>
                )}
                <div className={cn(
                  'mb-4 flex size-[42px] items-center justify-center rounded-[12px]',
                  path.highlight ? 'bg-[var(--color-brand-orange-tint)]' : 'bg-[var(--color-bg-cream)]',
                )}>
                  <Icon size={19} color={path.highlight ? 'var(--color-brand-orange)' : 'var(--color-text-secondary)'} />
                </div>
                <h3 className="mb-2 text-[15px] font-bold leading-[1.3] text-[var(--color-text-primary)]">{path.title}</h3>
                <p className="mb-5 flex-1 text-[13px] leading-[1.6] text-[var(--color-text-tertiary)]">{path.desc}</p>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-brand-orange)] transition-[gap] duration-200">
                  {path.cta}
                  <ArrowRight size={13} />
                </div>
              </motion.div>
            );

            return path.isLink ? (
              <Link key={path.title} href={path.href} className="text-inherit no-underline">
                {content}
              </Link>
            ) : (
              <a key={path.title} href={path.href} className="text-inherit no-underline">
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
