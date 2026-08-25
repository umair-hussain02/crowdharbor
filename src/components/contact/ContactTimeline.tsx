'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { contactTw } from './contactTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { num: '01', title: 'Inquiry received', desc: 'Your message is submitted through the contact form.' },
  { num: '02', title: 'Inquiry is reviewed', desc: 'CrowdHarbor reviews the topic and determines the best next step based on your inquiry type.' },
  { num: '03', title: 'Response or redirect', desc: 'You may receive an email response, intake link, payment support, or workshop discussion link.' },
  { num: '04', title: 'Next step confirmed', desc: 'If relevant, CrowdHarbor may direct you to the founder intake form, a strategy session, or a partnership conversation.' },
];

export function ContactTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className={contactTw.sectionWhite}>
      <div className={contactTw.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <div className={contactTw.eyebrow}>What to expect</div>
          <h2 className={contactTw.title}>What happens after you submit an inquiry.</h2>
          <p className="text-base leading-[1.65] text-[var(--color-text-secondary)]">
            CrowdHarbor reviews your message and routes it based on your inquiry type.
          </p>
        </motion.div>

        <div ref={ref} className="hidden md:block">
          <div className="relative grid grid-cols-4 gap-0">
            <div className="absolute left-[12.5%] right-[12.5%] top-6 z-0 h-0.5 bg-[var(--color-border)]">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, ease, delay: 0.3 }}
                className="h-full origin-left rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)]"
              />
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease, delay: 0.15 + i * 0.12 }}
                className="relative z-[1] px-4"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-[var(--color-brand-orange)] shadow-[0_0_0_4px_var(--color-bg-white),0_0_0_6px_rgba(253,102,40,0.2)]">
                  <span className="text-[13px] font-extrabold text-[var(--color-text-on-dark)]">{step.num}</span>
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-[var(--color-text-primary)]">{step.title}</h3>
                <p className="m-0 text-[13px] leading-[1.65] text-[var(--color-text-tertiary)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-0 md:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease, delay: i * 0.08 }}
              className="relative flex gap-4"
            >
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand-orange)]">
                  <span className="text-xs font-extrabold text-[var(--color-text-on-dark)]">{step.num}</span>
                </div>
                {i < steps.length - 1 && <div className="mt-2 min-h-6 w-0.5 flex-1 bg-[var(--color-border)]" />}
              </div>
              <div className={i < steps.length - 1 ? 'pb-6 pt-2' : 'pt-2'}>
                <h3 className="mb-1.5 text-[15px] font-bold text-[var(--color-text-primary)]">{step.title}</h3>
                <p className="m-0 text-[13px] leading-[1.65] text-[var(--color-text-tertiary)]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
