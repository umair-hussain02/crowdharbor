"use client";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { cn, sr } from "./sampleReportTailwind";
import { useServices, findService, formatServicePrice, SERVICE_SLUGS } from "@/lib/hooks/useServices";
import { trackEvent } from "@/lib/analytics/track";
const ease = [0.22, 1, 0.36, 1] as const;
const offers = [
  {
    title: "Funding Readiness Review",
    label: "Entry Diagnosis",
    slug: SERVICE_SLUGS.review,
    fallback: "€149",
    items: [
      "Readiness scorecard",
      "Strengths and weaknesses",
      "Top blockers",
      "Basic pathway recommendation",
      "Short action plan",
    ],
    cta: "Get My Review",
    recommended: false,
    url: "/intake",
  },
  {
    title: "Capital Pathway Sprint",
    label: "Main Preparation Path",
    slug: SERVICE_SLUGS.sprint,
    fallback: "€650",
    items: [
      "Everything in Readiness Review",
      "Pitch deck review",
      "Financial readiness review",
      "Data room checklist",
      "Strategy session",
      "Capital pathway recommendation",
      "7–14 day roadmap",
    ],
    cta: "Apply for Sprint",
    recommended: true,
    url: "/contact",
  },
  {
    title: "Preparation Program",
    label: "Premium Support",
    slug: SERVICE_SLUGS.program,
    fallback: "From €1,500",
    items: [
      "Everything in Sprint",
      "Pitch narrative improvement",
      "Deck structure recommendations",
      "Financial model feedback",
      "Follow-up readiness review",
      "2–4 week support",
    ],
    cta: "Apply for Support",
    recommended: false,
    url: "/contact",
  },
];
export function SROfferDepth() {
  const { services } = useServices();

  return (
    <section className={sr.sectionWhite}>
      <div className={sr.containerMd}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mb-14 max-w-[600px] text-center"
        >
          <span className={sr.eyebrow}>Report depth</span>
          <h2 className={sr.title}>
            Report depth depends on your selected preparation path.
          </h2>
          <p className={sr.description}>
            The Funding Readiness Review gives a focused diagnosis. The Capital
            Pathway Sprint adds deeper material review, strategy, and roadmap.
            The Preparation Program adds hands-on support.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              whileHover={{ y: -5 }}
              className={cn(
                "relative rounded-3xl bg-white p-[30px]",
                offer.recommended
                  ? "border-2 border-[var(--color-brand-orange)] shadow-[0_12px_40px_rgba(253,102,40,0.1)]"
                  : "border border-[var(--color-border)] shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
              )}
            >
              {offer.recommended && (
                <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-3.5 py-1 text-[11px] font-bold text-white">
                  Recommended
                </div>
              )}
              <div
                className={cn(
                  "mb-1.5 text-[11px] font-bold uppercase tracking-[0.06em]",
                  offer.recommended
                    ? "text-[var(--color-brand-orange)]"
                    : "text-[var(--color-text-subtle)]",
                )}
              >
                {offer.label}
              </div>
              <div className="mb-1 font-[Manrope,sans-serif] text-xl font-extrabold text-[var(--color-text-primary)]">
                {offer.title}
              </div>
              <div
                className={cn(
                  "mb-5 font-[Manrope,sans-serif] text-[22px] font-extrabold",
                  offer.recommended
                    ? "text-[var(--color-brand-orange)]"
                    : "text-[var(--color-text-primary)]",
                )}
              >
                {formatServicePrice(findService(services, offer.slug), offer.fallback)}
              </div>
              <ul className="mb-6 flex list-none flex-col gap-[9px] p-0">
                {offer.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      size={13}
                      className="mt-0.5 shrink-0 text-[var(--color-brand-orange)]"
                    />
                    <span className="text-[13px] leading-[1.45] text-[var(--color-text-secondary)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <motion.a
                href={offer.url }
                onClick={() => trackEvent('cta_click', { label: offer.cta, destination: offer.url, location: 'sample_report_offer_depth' })}
                className={cn(
                  "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] px-5 py-[13px] font-[Manrope,sans-serif] text-[13px] font-semibold",
                  offer.recommended
                    ? "border-0 bg-[var(--color-brand-orange)] text-white"
                    : "border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-brand-orange)]",
                )}
                whileHover={offer.recommended ? { scale: 1.02 } : {}}
                transition={{ duration: 0.2 }}
              >
                {offer.cta}
                <motion.span
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={13} />
                </motion.span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
