'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { contactTw, cn } from './contactTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

type Faq = { question: string; answer: string };

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch('/api/pages/contact/faqs');
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
    <section className={contactTw.sectionCream}>
      <div className={contactTw.narrowContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-9 text-center"
        >
          <div className={contactTw.eyebrow}>Common questions</div>
          <h2 className={contactTw.title}>Contact questions.</h2>
        </motion.div>

        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease, delay: i * 0.04 }}
              className={cn(
                'overflow-hidden rounded-[16px] border-[1.5px] bg-[var(--color-bg-white)] transition-colors duration-200',
                open === i ? 'border-[var(--color-brand-orange)]' : 'border-[var(--color-border)]',
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-[18px] text-left font-[Manrope,sans-serif]"
              >
                <span className="text-[15px] font-bold leading-[1.4] text-[var(--color-text-primary)]">{faq.question}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                  <ChevronDown size={18} color={open === i ? 'var(--color-brand-orange)' : 'var(--color-text-subtle)'} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
