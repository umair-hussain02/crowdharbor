'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Lock, Users } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  { icon: ShieldCheck, label: 'Built on how investors actually run due diligence.' },
  { icon: Lock, label: 'Your documents stay private, under NDA. GDPR compliant.' },
  { icon: Users, label: 'Founding cohort open now, limited places.' },
];

export function TrustStripSection() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-white)] px-6 py-6">
      <div className="mx-auto flex max-w-[var(--container-lg)] flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease }}
              className="flex items-center gap-2"
            >
              <Icon size={15} className="shrink-0 text-[var(--color-brand-orange)]" />
              <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
