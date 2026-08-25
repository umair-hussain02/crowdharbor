'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { X, Check, ArrowRight } from 'lucide-react';
import { container, cx, ease, section, text } from './aboutTailwind';

const columns = [
  { label: 'Basic Score Tool', featured: false, items: [{ text: 'Gives a quick result', yes: true }, { text: 'Limited context', yes: false }, { text: 'Little material review', yes: false }, { text: 'No pathway strategy', yes: false }, { text: 'No action plan', yes: false }] },
  { label: 'Generic Startup Advice', featured: false, items: [{ text: 'Broad guidance', yes: true }, { text: 'Not company-specific', yes: false }, { text: 'Hard to know what applies', yes: false }, { text: 'No structured review process', yes: false }, { text: 'No preparation roadmap', yes: false }] },
  { label: 'Fundraising Broker', featured: false, items: [{ text: 'Focuses on capital access', yes: true }, { text: 'May imply introductions', yes: false }, { text: 'Not focused on readiness', yes: false }, { text: 'Can create wrong expectations', yes: false }] },
  { label: 'CrowdHarbor', featured: true, items: [{ text: 'Readiness diagnosis', yes: true }, { text: 'Material review', yes: true }, { text: 'Capital pathway strategy', yes: true }, { text: 'Founder action plan', yes: true }, { text: 'Preparation before outreach', yes: true }] },
];

export function AboutDifferent() {
  return (
    <section className={section.cream}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>What makes us different</div>
          <h2 className={text.sectionTitle}>Different from a score tool. Different from a broker.</h2>
          <p className={`${text.description} max-w-[580px]`}>CrowdHarbor is designed around preparation. It helps founders understand what is weak, what is missing, and which path makes sense before fundraising outreach.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col, i) => (
            <motion.div key={col.label} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.09 }} className={cx('relative rounded-[22px] bg-[var(--color-bg-white)] px-[26px] py-8', col.featured ? 'border-2 border-[var(--color-brand-orange)]' : 'border-[1.5px] border-[var(--color-border)]')}>
              {col.featured && <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[var(--letter-spacing-wider)] text-[var(--color-text-on-dark)]">Preparation-focused</div>}
              <div className={cx('mb-[22px] text-base font-extrabold tracking-[-0.01em]', col.featured ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-primary)]')}>{col.label}</div>
              <div className={cx('flex flex-col gap-[11px]', col.featured && 'mb-7')}>
                {col.items.map(item => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    {item.yes ? <Check size={15} strokeWidth={2.5} className="shrink-0 text-[var(--color-brand-orange)]" /> : <X size={15} strokeWidth={2.5} className="shrink-0 text-[#CCC]" />}
                    <span className={cx('text-sm', item.yes ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[#999]')}>{item.text}</span>
                  </div>
                ))}
              </div>
              {col.featured && (
                <Link href="/how-it-works" className="inline-flex items-center gap-[7px] text-[13px] font-bold text-[var(--color-brand-orange)] no-underline transition-[gap] duration-200 hover:gap-3">
                  See How It Works
                  <ArrowRight size={13} />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
