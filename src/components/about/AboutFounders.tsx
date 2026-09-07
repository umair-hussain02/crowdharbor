'use client';

import { motion } from 'motion/react';
import { container, ease, section, text } from './aboutTailwind';

const founders = [
  {
    name: '[Founder name]',
    role: '[Role, e.g. Co-Founder & CEO]',
    bio: '[One honest paragraph — who you are, why you started CrowdHarbor, and your psychology / measurement background. This is a real asset: say specifically what assessment methodology you built and why it makes CrowdHarbor a structured review, not a slide grader.]',
  },
  {
    name: '[Founder name]',
    role: '[Role, e.g. Co-Founder & COO]',
    bio: '[One honest paragraph — your background, what you focus on day to day, and what you bring to the review process.]',
  },
];

export function AboutFounders() {
  return (
    <section className={section.white}>
      <div className={container.lg}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <div className={text.eyebrow}>Who is behind CrowdHarbor</div>
          <h2 className={text.sectionTitle}>Two founders, one method.</h2>
          <p className={`${text.description} max-w-[640px]`}>
            CrowdHarbor is built by real people, not an anonymous product. [Placeholder — replace with names, photos, and bios below before launch.]
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="rounded-[22px] border-[1.5px] border-dashed border-[var(--color-border)] bg-[var(--color-bg-cream)] p-8"
            >
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8D8D0] bg-[var(--color-bg-white)] text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--color-text-faint)]">
                Photo
              </div>
              <div className="mb-1 text-[17px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)]">
                {founder.name}
              </div>
              <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--color-brand-orange)]">
                {founder.role}
              </div>
              <p className="text-[15px] italic leading-[1.7] text-[var(--color-text-muted)]">{founder.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
