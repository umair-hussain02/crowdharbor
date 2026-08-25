"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { cn, pricingTw } from "./pricingTailwind";
import { useServices, findService, formatServicePrice, SERVICE_SLUGS } from "@/lib/hooks/useServices";
import { trackEvent } from "@/lib/analytics/track";

const ease = [0.22, 1, 0.36, 1] as const;
const tabs = [
  "Readiness Review",
  "Capital Pathway Sprint",
  "Preparation Program",
] as const;
type Tab = (typeof tabs)[number];

const packages: Record<
  Tab,
  {
    label: string;
    slug: string;
    fallback: string;
    items: string[];
    outcome: string;
    cta: string;
    recommended: boolean;
    url: string;
  }
> = {
  "Readiness Review": {
    label: "Funding Readiness Review",
    slug: SERVICE_SLUGS.review,
    fallback: "€149",
    items: [
      "Readiness scorecard",
      "Strength and weakness overview",
      "Top funding blockers",
      "Missing material indicators",
      "Basic capital pathway recommendation",
      "Short action plan",
    ],
    url: "/intake"
    ,
    outcome:
      "You understand whether you are ready, what is weak, and what next step makes sense.",
    cta: "Start With Review",
    recommended: false,
  },
  "Capital Pathway Sprint": {
    label: "Capital Pathway Sprint",
    slug: SERVICE_SLUGS.sprint,
    fallback: "€650",
    items: [
      "Readiness diagnosis",
      "Pitch deck review",
      "Financial readiness review",
      "Traction story review",
      "Use-of-funds clarity review",
      "Data room checklist",
      "Strategy session",
      "Capital pathway recommendation",
      "Fundraising action plan",
      "7–14 day preparation roadmap",
    ],
    url: "/contact",
    outcome:
      "You know what to fix before outreach and which funding path fits your current stage.",
    cta: "Apply for Sprint",
    recommended: true,
  },
  "Preparation Program": {
    label: "Fundraising Preparation Program",
    slug: SERVICE_SLUGS.program,
    fallback: "From €1,500",
    items: [
      "Everything in the Sprint",
      "Pitch narrative improvement",
      "Deck structure recommendations",
      "Data room preparation guidance",
      "Financial model feedback",
      "Follow-up readiness review",
      "Founder presentation preparation",
      "2–4 week preparation support",
    ],
    url: "/contact",
    outcome:
      "You improve your materials, story, and readiness before serious funding conversations.",
    cta: "Apply for Support",
    recommended: false,
  },
};

export function PricingPackageBreakdown() {
  const [activeTab, setActiveTab] = useState<Tab>("Capital Pathway Sprint");
  const { services } = useServices();
  const pkg = packages[activeTab];
  const price = formatServicePrice(findService(services, pkg.slug), pkg.fallback);

  return (
    <section className={pricingTw.sectionWhite}>
      <div className="mx-auto max-w-[var(--container-card)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 text-center"
        >
          <span className={pricingTw.eyebrow}>Package details</span>
          <h2 className={pricingTw.h2}>What each option includes.</h2>
          <p className={pricingTw.desc}>
            Review the deeper breakdown of each preparation option before
            choosing the path that fits your current stage.
          </p>
        </motion.div>

        <div className="mb-8 flex gap-1 rounded-[16px] bg-[var(--color-bg-cream)] p-[5px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative flex-1 cursor-pointer rounded-[12px] border-0 px-3 py-[11px] [font-family:var(--font-body)] text-[13px] transition-all duration-200",
                activeTab === tab
                  ? "bg-[var(--color-bg-white)] font-bold text-[var(--color-text-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  : "bg-transparent font-medium text-[var(--color-text-muted)]",
              )}
            >
              {tab}
              {tab === "Capital Pathway Sprint" && (
                <span className="ml-1.5 inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-1.5 py-0.5 align-middle text-[9px] font-bold text-[var(--color-text-on-dark)]">
                  ★
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className={cn(
              "rounded-[24px] bg-[var(--color-bg-white)] p-9",
              pkg.recommended
                ? "border border-[var(--color-brand-orange)] shadow-[0_8px_32px_rgba(253,102,40,0.08)]"
                : "border border-[var(--color-border)] shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
            )}
          >
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-1.5 flex items-center gap-3">
                  <h3 className="m-0 [font-family:var(--font-heading)] text-[22px] font-extrabold text-[var(--color-text-primary)]">
                    {pkg.label}
                  </h3>
                  {pkg.recommended && (
                    <span className="rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-2.5 py-[3px] text-[11px] font-bold text-[var(--color-text-on-dark)]">
                      Recommended
                    </span>
                  )}
                </div>
                <div
                  className={cn(
                    "mb-6 [font-family:var(--font-heading)] text-[28px] font-extrabold",
                    pkg.recommended
                      ? "text-[var(--color-brand-orange)]"
                      : "text-[var(--color-text-primary)]",
                  )}
                >
                  {price}
                </div>
                <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#999999]">
                  You receive
                </div>
                <ul className="mb-7 flex list-none flex-col gap-2.5 p-0">
                  {pkg.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04, ease }}
                      className="flex items-start gap-2.5"
                    >
                      <Check size={14} className={pricingTw.checkIcon} />
                      <span className="text-sm leading-normal text-[var(--color-text-secondary)]">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <div className="rounded-[14px] bg-[var(--color-bg-cream)] px-[18px] py-4">
                  <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-text-subtle)]">
                    Best outcome
                  </div>
                  <p className="m-0 text-sm leading-[1.6] text-[#333333]">
                    {pkg.outcome}
                  </p>
                </div>
              </div>
              <div className="flex min-w-40 flex-col items-end gap-3">
                <motion.a
                  href={pkg.url}
                  onClick={() => trackEvent('cta_click', { label: pkg.cta, destination: pkg.url, location: 'pricing_package_breakdown' })}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] px-5 py-[13px] [font-family:var(--font-body)] text-sm font-semibold",
                    pkg.recommended
                      ? "border-0 bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)]"
                      : "border border-[var(--color-border)] bg-[var(--color-bg-white)] text-[var(--color-text-primary)]",
                  )}
                  whileHover={
                    pkg.recommended
                      ? { scale: 1.03, y: -1 }
                      : { borderColor: "#FD6628", y: -1 }
                  }
                  transition={{ duration: 0.2 }}
                >
                  {pkg.cta} <ArrowRight size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
