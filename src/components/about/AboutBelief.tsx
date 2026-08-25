'use client';

import { motion } from 'motion/react';
import { container, cx, ease, section, text } from './aboutTailwind';

const beliefs = [
  { num: '01', title: 'Readiness comes before access.', body: 'Before founders chase capital, they need to know whether their company is prepared for review. Outreach without readiness wastes time and credibility.' },
  { num: '02', title: 'A score is only the starting point.', body: 'The real value is understanding what the score means, what is missing, and what to fix next. A number without context does not help a founder move forward.' },
  { num: '03', title: 'Not every founder needs the same funding path.', body: 'Crowdfunding, angels, grants, accelerators, pre-seed, and revenue-based financing all require different preparation, timelines, and readiness signals.' },
  { num: '04', title: 'Materials shape first impressions.', body: 'Pitch decks, financial models, traction proof, and data room documents often decide whether a founder is taken seriously before a conversation begins.' },
  { num: '05', title: 'Founders need clarity, not hype.', body: 'CrowdHarbor does not promise funding. It helps founders make better preparation decisions before outreach — with honest expectations and practical steps.' },
];

export function AboutBelief() {
  return (
    <section className={section.black}>
      <div className={container.md}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mb-[52px]">
          <div className={text.eyebrowDark}>Our belief</div>
          <h2 className="mb-3.5 text-[clamp(24px,3.5vw,42px)] font-extrabold leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-on-dark)]">We believe fundraising should start with preparation, not outreach.</h2>
          <p className="max-w-[580px] text-[17px] leading-[var(--line-height-relaxed)] text-[rgba(255,255,255,0.55)]">Fundraising is not only about getting in front of investors, platforms, grants, or accelerators. It is about being ready for the questions, expectations, documents, and decisions that come before funding.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="flex flex-col rounded-[28px] border-[1.5px] border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-6 py-12 md:px-14">
          {beliefs.map((b, i) => (
            <motion.div key={b.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: i * 0.09 }} className={cx('grid grid-cols-[56px_1fr] gap-6 pb-7', i > 0 && 'pt-7', i < beliefs.length - 1 && 'border-b border-[rgba(255,255,255,0.08)]')}>
              <span className="text-[22px] font-extrabold leading-none tracking-[var(--letter-spacing-snug)] text-[var(--color-brand-orange)]">{b.num}</span>
              <div>
                <h3 className="mb-2 text-[19px] font-extrabold leading-[1.3] tracking-[-0.01em] text-[var(--color-text-on-dark)]">{b.title}</h3>
                <p className="text-[15px] leading-[1.7] text-[rgba(255,255,255,0.55)]">{b.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
