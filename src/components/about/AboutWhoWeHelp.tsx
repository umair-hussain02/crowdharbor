'use client';

import { motion } from 'motion/react';
import { CheckCircle, XCircle } from 'lucide-react';
import { container, ease, section, text } from './aboutTailwind';

const fitItems = [
  'Have started a company',
  'Have a product, MVP, users, revenue, or market proof',
  'Are thinking about raising capital',
  'Are unsure which funding path fits',
  'Need help preparing your pitch, materials, and strategy',
  'Have been rejected before and want to understand why',
  'Are not yet ready for a full investor process',
];

const notFitItems = [
  'Only have a vague idea with no execution yet',
  'Want guaranteed investor introductions',
  'Expect funding without preparation',
  'Need legal, tax, investment, or securities advice',
  'Want someone to raise money for you as a broker',
];

export function AboutWhoWeHelp() {
  return (
    <section className={section.cream}>
      <div className={container.lg}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-12">
          <div className={text.eyebrow}>Who we help</div>
          <h2 className={text.sectionTitle}>Built for early-stage founders preparing for capital.</h2>
          <p className={`${text.description} max-w-[600px]`}>CrowdHarbor is designed for founders who have started building and want to understand whether they are ready for funding conversations.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: 0.05 }} className="rounded-[24px] border-2 border-[var(--color-brand-orange)] bg-[var(--color-bg-white)] px-9 py-10">
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]"><CheckCircle size={18} /></div>
              <h3 className="text-lg font-extrabold tracking-[-0.01em] text-[var(--color-text-primary)]">CrowdHarbor is a strong fit if you:</h3>
            </div>
            <div className="flex flex-col gap-3.5">
              {fitItems.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, ease, delay: 0.1 + i * 0.06 }} className="flex items-start gap-3">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-orange)]" />
                  <span className="text-[15px] font-medium leading-normal text-[#222]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: 0.12 }} className="rounded-[24px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-9 py-10">
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-neutral-tint)] text-[var(--color-text-subtle)]"><XCircle size={18} /></div>
              <h3 className="text-lg font-extrabold tracking-[-0.01em] text-[var(--color-text-primary)]">CrowdHarbor may not be the right fit if you:</h3>
            </div>
            <div className="flex flex-col gap-3.5">
              {notFitItems.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, ease, delay: 0.12 + i * 0.06 }} className="flex items-start gap-3">
                  <XCircle size={16} className="mt-0.5 shrink-0 text-[#BBBBBB]" />
                  <span className="text-[15px] leading-normal text-[var(--color-text-muted)]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
