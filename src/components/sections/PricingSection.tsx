'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from './sectionsTailwind';
import { useServices, findService, formatServicePriceFrom, SERVICE_SLUGS } from '@/lib/hooks/useServices';

const ease = [0.22, 1, 0.36, 1] as const;

const plans = [
  {
    title: 'Funding Readiness Review',
    slug: SERVICE_SLUGS.review,
    fallback: 'From €149',
    bestFor: 'Founders who want to know where they stand.',
    includes: [
      'Readiness scorecard',
      'Strength and weakness overview',
      'Top funding blockers',
      'Basic pathway recommendation',
      'Short action plan',
    ],
    cta: 'Get My Review',
    highlighted: false,
    label: null,
  },
  {
    title: 'Capital Pathway Sprint',
    slug: SERVICE_SLUGS.sprint,
    fallback: 'From €650',
    bestFor: 'Founders preparing to raise soon.',
    includes: [
      'Readiness review',
      'Pitch deck review',
      'Financial readiness review',
      'Data room checklist',
      'Strategy session',
      'Capital pathway recommendation',
      '7–14 day roadmap',
    ],
    cta: 'Apply for the Sprint',
    highlighted: true,
    label: 'Recommended',
  },
  {
    title: 'Fundraising Preparation Program',
    slug: SERVICE_SLUGS.program,
    fallback: 'From €1,500',
    bestFor: 'Founders who need deeper help before approaching capital.',
    includes: [
      'Everything in the Sprint',
      'Pitch narrative improvement',
      'Deck structure recommendations',
      'Financial model feedback',
      'Follow-up readiness review',
      '2–4 week support',
    ],
    cta: 'Apply for Support',
    highlighted: false,
    label: null,
  },
];

export function PricingSection() {
  const { services } = useServices();

  return (
    <section id="pricing" className="bg-[var(--color-bg-cream)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[640px] [margin:0_auto_64px]"
        >
          <h2
            className="text-[clamp(32px, 3.5vw, 48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[16px]"
          >
            Choose the preparation path that fits your stage.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            Start with a quick readiness diagnosis, move into a deeper capital pathway sprint, or get hands-on preparation support before outreach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i === 1 ? 0 : i * 0.1 + 0.1, ease }}
              whileHover={{ y: -4 }}
              className={cn("bg-[var(--color-bg-white)] rounded-[24px] p-[36px] relative transition-all duration-200", plan.highlighted ? "border-2 border-[var(--color-brand-orange)]" : "border border-[var(--color-border)] hover:border-[var(--color-brand-orange)]", plan.highlighted ? "[box-shadow:0_24px_60px_rgba(253,102,40,0.12)]" : "[box-shadow:0_8px_30px_rgba(0,0,0,0.05)]")}
            >
              {plan.label && (
                <div
                  className="absolute top-[-14px] left-[50%] [transform:translateX(-50%)] bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)] text-[12px] font-bold py-[4px] px-[16px] rounded-[var(--radius-pill)] [white-space:nowrap] tracking-[0.04em]"
                >
                  {plan.label}
                </div>
              )}

              <div className="mb-[24px]">
                <div
                  className="text-[18px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[8px]"
                >
                  {plan.title}
                </div>
                <div
                  className="text-[32px] font-extrabold text-[var(--color-text-primary)] [font-family:var(--font-heading)] tracking-[-0.02em] mb-[8px]"
                >
                  {formatServicePriceFrom(findService(services, plan.slug), plan.fallback)}
                </div>
                <div className="text-[14px] text-[var(--color-text-muted)] leading-[1.5]">
                  <span className="font-semibold text-[var(--color-text-secondary)]">Best for:</span> {plan.bestFor}
                </div>
              </div>

              <div
                className="h-[1px] bg-[var(--color-bg-admin-muted)] mb-[24px]"
              />

              <ul className="list-none p-[0px] [margin:0_0_28px_0] flex flex-col gap-[10px]">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-[10px]">
                    <div
                      className={cn("w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 mt-[2px]", plan.highlighted ? "bg-[var(--color-brand-orange-tint)]" : "bg-[rgba(0,0,0,0.05)]")}
                    >
                      <Check size={11} className={cn(plan.highlighted ? "text-[var(--color-brand-orange)]" : "text-[var(--color-text-subtle)]")} />
                    </div>
                    <span className="text-[14px] text-[var(--color-text-secondary)] leading-[1.5]">{item}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#"
                className={cn("flex items-center justify-center gap-[8px] py-[14px] px-[24px] rounded-[var(--radius-pill)] text-[15px] font-semibold no-underline cursor-pointer", plan.highlighted ? "bg-[var(--color-brand-orange)]" : "bg-transparent", plan.highlighted ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-primary)]", plan.highlighted ? "border-0" : "border border-[var(--color-border)]")}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {plan.cta}
                <ArrowRight size={15} />
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="text-center text-[13px] text-[#999999] mt-[24px]"
        >
          Prices are indicative starting points. Final pricing is confirmed after intake review.
          CrowdHarbor does not guarantee funding outcomes.
        </motion.p>
      </div>
    </section>
  );
}
