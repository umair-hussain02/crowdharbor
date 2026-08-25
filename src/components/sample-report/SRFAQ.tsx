'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { cn, sr } from './sampleReportTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

type Faq = { question: string; answer: string };

export function SRFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch('/api/pages/sample-report/faqs');
        const result = await response.json().catch(() => null);
        if (!cancelled && response.ok && result?.items) {
          setFaqs(result.items);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || faqs.length === 0) return null;

  return (
    <section className={sr.sectionCream}>
      <div className={sr.containerNarrow}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mb-14 text-center">
          <h2 className="font-[Manrope,sans-serif] text-[clamp(26px,3.5vw,42px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-[var(--color-text-primary)]">Questions about the sample report.</h2>
        </motion.div>
        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={faq.question} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04, ease }} className={cn('overflow-hidden rounded-[20px] border bg-white transition-colors', isOpen ? 'border-[var(--color-brand-orange)]' : 'border-[var(--color-border)]')}>
                <button onClick={() => setOpenIndex(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-[26px] py-5 text-left">
                  <span className="font-[Manrope,sans-serif] text-[15px] font-semibold leading-[1.4] text-[var(--color-text-primary)]">{faq.question}</span>
                  <div className={cn('flex size-[26px] shrink-0 items-center justify-center rounded-full transition-colors', isOpen ? 'bg-[var(--color-brand-orange)] text-white' : 'bg-[rgba(0,0,0,0.06)] text-[var(--color-text-secondary)]')}>
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease }}>
                      <div className="px-[26px] pb-[22px]">
                        <p className="m-0 text-sm leading-[1.75] text-[var(--color-text-tertiary)]">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
