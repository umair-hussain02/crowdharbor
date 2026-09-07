'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    question: 'Why should I share my confidential documents?',
    answer:
      'You sign a mutual NDA before submitting anything confidential. Your documents are stored securely, used only to produce your review, never shared with investors or third parties without your consent, and deleted on request. See our NDA & confidentiality page for the full explanation.',
  },
  {
    question: 'Is this confidential and GDPR compliant?',
    answer:
      'Yes. We handle your data under GDPR, limit access to the people directly working on your review, and you can request deletion of your materials and personal data at any time.',
  },
  {
    question: 'Do you guarantee funding?',
    answer:
      'No. CrowdHarbor improves your readiness. We do not promise money, act as an investor or broker, or introduce you to funding sources. We help you understand what to fix before you raise.',
  },
  {
    question: 'What stage is this for?',
    answer:
      'Founders with some traction who are stuck somewhere in the funding process — unclear why they are not getting traction with investors, unsure what to fix, or preparing to raise for the first time.',
  },
  {
    question: 'What exactly do I get, and how long does it take?',
    answer:
      'You get a readiness score, a score for each area we check, your top blockers ranked, the contradictions and gaps we found, a recommended funding pathway, and a 7 to 14 day action plan. The process from intake to action plan takes about 7 days.',
  },
];

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="bg-[var(--color-bg-cream)] px-6 pb-16 pt-[140px]">
        <div className="mx-auto max-w-[760px] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-4 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary)] [font-family:var(--font-heading)]"
          >
            Questions founders ask before starting.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-[17px] leading-[1.7] text-[var(--color-text-secondary)]"
          >
            Straight answers to the things that stop founders from applying.
          </motion.p>
        </div>
      </section>

      <section className="bg-[var(--color-bg-white)] px-6 py-16 md:py-[100px]">
        <div className="mx-auto max-w-[820px]">
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease }}
                  className="overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-white)]"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-7 py-[22px] text-left"
                  >
                    <span className="text-[16px] font-semibold leading-[1.4] text-[var(--color-text-primary)] [font-family:var(--font-heading)]">
                      {faq.question}
                    </span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                        isOpen ? 'bg-[var(--color-brand-orange)]' : 'bg-[var(--color-neutral-tint)]'
                      }`}
                    >
                      {isOpen ? (
                        <Minus size={14} className="text-[var(--color-text-on-dark)]" />
                      ) : (
                        <Plus size={14} className="text-[var(--color-text-secondary)]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                      >
                        <p className="m-0 px-7 pb-6 text-[15px] leading-[1.75] text-[var(--color-text-tertiary)]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/intake"
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-7 py-[15px] text-[15px] font-semibold text-[var(--color-text-on-dark)] no-underline"
            >
              Check Your Readiness
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
