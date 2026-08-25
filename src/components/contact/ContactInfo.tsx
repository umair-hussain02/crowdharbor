'use client';

import { motion } from 'motion/react';
import { Mail, Linkedin } from 'lucide-react';
import { contactTw, cn } from './contactTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const contacts = [
  { title: 'General Inquiries', desc: 'Questions about CrowdHarbor services, how we work, and what to expect.', email: 'hello@crowdharbor.com' },
  { title: 'Founder Support', desc: 'Intake, payment, scheduling, uploaded materials, or report questions.', email: 'support@crowdharbor.com' },
  { title: 'Partnerships', desc: 'Workshops, startup programs, universities, and community collaborations.', email: 'partners@crowdharbor.com' },
];

export function ContactInfo() {
  return (
    <section className={contactTw.sectionCream}>
      <div className={contactTw.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-9"
        >
          <div className={contactTw.eyebrow}>Direct contact</div>
          <h2 className={contactTw.title}>Contact details.</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contacts.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease, delay: i * 0.08 }}
              className="rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] p-6"
            >
              <div className={cn(contactTw.iconBox, 'mb-3.5 bg-[var(--color-brand-orange-tint)]')}>
                <Mail size={17} color="var(--color-brand-orange)" />
              </div>
              <div className="mb-1.5 text-sm font-bold text-[var(--color-text-primary)]">{c.title}</div>
              <p className="mb-3.5 text-xs leading-[1.6] text-[var(--color-text-muted)]">{c.desc}</p>
              <a href={`mailto:${c.email}`} className="break-all text-[13px] font-semibold text-[var(--color-brand-orange)] no-underline hover:underline">
                {c.email}
              </a>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease, delay: 0.3 }}
            className="rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] p-6"
          >
            <div className={cn(contactTw.iconBox, 'mb-3.5 bg-[var(--color-neutral-tint)]')}>
              <Linkedin size={17} color="var(--color-text-primary)" />
            </div>
            <div className="mb-1.5 text-sm font-bold text-[var(--color-text-primary)]">LinkedIn</div>
            <p className="mb-3.5 text-xs leading-[1.6] text-[var(--color-text-muted)]">
              Follow for founder preparation updates, resources, and capital pathway education.
            </p>
            <a href="#" className="text-[13px] font-semibold text-[var(--color-text-primary)] no-underline transition-colors duration-200 hover:text-[var(--color-brand-orange)]">
              CrowdHarbor on LinkedIn →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
