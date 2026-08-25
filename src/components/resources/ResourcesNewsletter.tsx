'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Lock } from 'lucide-react';
import { cn, resourceTw } from './resourcesTailwind';
import { trackEvent } from '@/lib/analytics/track';

const ease = [0.22, 1, 0.36, 1] as const;

const stages = [
  'Select your stage (optional)',
  'Idea / Pre-product',
  'MVP / Early product',
  'Revenue under $10k/mo',
  'Revenue $10k–$50k/mo',
  'Revenue $50k+/mo',
  'Seeking pre-seed',
  'Seeking seed',
];

export function ResourcesNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className={resourceTw.sectionCream}>
      <div className={resourceTw.container}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-[760px] rounded-[28px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-6 py-[60px] shadow-[0_8px_40px_rgba(0,0,0,0.07)] md:px-16"
        >
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease }} className="text-center">
              <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-[var(--radius-circle)] bg-[var(--color-brand-orange-tint)]">
                <CheckCircle size={32} className="text-[var(--color-brand-orange)]" />
              </div>
              <div className="mb-2.5 text-[22px] font-extrabold text-[var(--color-text-primary)]">You're in.</div>
              <p className="text-[15px] leading-[1.6] text-[var(--color-text-secondary)]">
                You'll receive founder preparation resources, readiness insights, and capital pathway guides as they're published.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-10 text-center">
                <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-orange)]">Founder updates</div>
                <h2 className="mb-3 text-[clamp(22px,3vw,34px)] font-extrabold leading-[1.2] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">Get founder preparation insights.</h2>
                <p className="mx-auto max-w-[500px] text-base leading-[1.6] text-[var(--color-text-secondary)]">
                  Receive practical resources on funding readiness, pitch preparation, capital pathways, and founder strategy before outreach.
                </p>
              </div>

              <div className="mx-auto flex max-w-[480px] flex-col gap-3">
                <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} className={resourceTw.input} />
                <select className={cn(resourceTw.input, 'cursor-pointer appearance-none text-[var(--color-text-secondary)]')}>
                  {stages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => { if (email) { trackEvent('newsletter_signup'); setSubmitted(true); } }} className={cn(resourceTw.primaryButton, 'w-full py-3.5 text-[15px]')}>
                  Get Updates
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5">
                <Lock size={11} className="text-[var(--color-text-subtle)]" />
                <span className="text-xs font-medium text-[var(--color-text-subtle)]">No spam. Founder preparation resources only.</span>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
