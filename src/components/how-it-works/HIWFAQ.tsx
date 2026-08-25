'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { cn } from './howItWorksTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

type Faq = { question: string; answer: string };

export function HIWFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch('/api/pages/how-it-works/faqs');
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
    <section className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="max-w-[860px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-[56px]"
        >
          <h2
            className="text-[clamp(28px,_3.5vw,_42px)] font-extrabold text-[var(--color-text-primary)] leading-[1.15] tracking-[-0.025em] [font-family:var(--font-heading)]"
          >
            Questions about the process.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-[10px]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
                className={cn("bg-[var(--color-bg-white)] border rounded-[20px] overflow-hidden transition-all duration-200", isOpen ? "border-[var(--color-brand-orange)]" : "border-[var(--color-border)]")}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between py-[22px] px-[28px] bg-transparent border-0 cursor-pointer text-left gap-[16px]"
                >
                  <span className="text-[16px] font-semibold text-[var(--color-text-primary)] [font-family:var(--font-heading)] leading-[1.4]">
                    {faq.question}
                  </span>
                  <div
                    className={cn("w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 transition-all duration-200", isOpen ? "bg-[var(--color-brand-orange)]" : "bg-[var(--color-neutral-tint)]")}
                  >
                    {isOpen ? <Minus size={13} className="text-[var(--color-text-on-dark)]" /> : <Plus size={13} className="text-[var(--color-text-secondary)]" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease }}
                    >
                      <div className="[padding:0_28px_24px]">
                        <p className="text-[15px] text-[var(--color-text-tertiary)] leading-[1.75] [margin:0px]">{faq.answer}</p>
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
