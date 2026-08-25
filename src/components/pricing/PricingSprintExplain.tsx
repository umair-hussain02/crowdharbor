"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  BarChart3,
  FileText,
  DollarSign,
  Map,
  CalendarDays,
} from "lucide-react";
import { cn, pricingTw } from "./pricingTailwind";

const ease = [0.22, 1, 0.36, 1] as const;

const sprintValue = [
  "Readiness diagnosis and scorecard",
  "Pitch deck and financial review",
  "Data room checklist",
  "Capital pathway recommendation",
  "Strategy session and action roadmap",
];
const modules = [
  {
    icon: BarChart3,
    label: "Readiness Diagnosis",
    desc: "Score and gap analysis",
  },
  { icon: FileText, label: "Material Review", desc: "Pitch and data room" },
  {
    icon: DollarSign,
    label: "Financial Review",
    desc: "Model and story clarity",
  },
  { icon: Map, label: "Pathway Strategy", desc: "Best capital route" },
  { icon: CalendarDays, label: "Action Roadmap", desc: "7–14 day plan" },
];

export function PricingSprintExplain() {
  return (
    <section className={pricingTw.sectionCream}>
      <div className={pricingTw.containerLg}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="mb-[18px] inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint-soft)] px-3.5 py-[5px] text-xs font-bold uppercase tracking-[0.04em] text-[var(--color-brand-orange)]">
              Recommended path
            </span>
            <h2 className="mb-4 [font-family:var(--font-heading)] text-[clamp(26px,3.5vw,42px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-[var(--color-text-primary)]">
              Why most founders start with the Capital Pathway Sprint.
            </h2>
            <p className="mb-7 text-base leading-[1.75] text-[var(--color-text-secondary)]">
              The Sprint goes beyond a readiness score. It combines diagnosis,
              pitch and financial review, data room guidance, pathway
              recommendation, strategy session, and a practical roadmap before
              outreach.
            </p>
            <ul className="mb-9 flex list-none flex-col gap-3 p-0">
              {sprintValue.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-orange-tint)]">
                    <Check
                      size={11}
                      className="text-[var(--color-brand-orange)]"
                    />
                  </div>
                  <span className="text-[15px] leading-normal text-[#333333]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <motion.a
                href="/contact"
                className={`${pricingTw.primaryButton} self-start px-7 py-[15px] text-[15px]`}
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Apply for the Capital Pathway Sprint{" "}
                <motion.span
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={15} />
                </motion.span>
              </motion.a>
              <motion.a
                href="/sample-report"
                className="flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left [font-family:var(--font-body)] text-sm font-semibold text-[var(--color-text-tertiary)]"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                View Sample Report{" "}
                <span className="text-[var(--color-brand-orange)]">→</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <div className="[font-family:var(--font-heading)] text-[13px] font-bold text-[var(--color-text-primary)]">
                    Capital Pathway Sprint System
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--color-text-subtle)]">
                    5-module preparation path
                  </div>
                </div>
                <div className="rounded-lg bg-[var(--color-brand-orange-tint-soft)] px-2.5 py-1">
                  <span className="text-[11px] font-bold text-[var(--color-brand-orange)]">
                    ACTIVE
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-0">
                {modules.map((mod, i) => {
                  const Icon = mod.icon;
                  const isLast = i === modules.length - 1;
                  const current = i === 1;
                  return (
                    <motion.div
                      key={mod.label}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + i * 0.08,
                        ease,
                      }}
                      className="relative flex gap-3.5"
                    >
                      <div className="flex flex-col items-center gap-0">
                        <div
                          className={cn(
                            "z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
                            current
                              ? "bg-[var(--color-brand-orange)]"
                              : "bg-[var(--color-brand-orange-tint-soft)]",
                          )}
                        >
                          <Icon
                            size={17}
                            className={
                              current
                                ? "text-[var(--color-text-on-dark)]"
                                : "text-[var(--color-brand-orange)]"
                            }
                          />
                        </div>
                        {!isLast && (
                          <div
                            className={cn(
                              "mx-auto h-6 w-0.5",
                              i === 0
                                ? "bg-[var(--color-brand-orange)]"
                                : "bg-[rgba(253,102,40,0.2)]",
                            )}
                          />
                        )}
                      </div>
                      <div className={cn("pt-1.5", !isLast && "pb-4")}>
                        <div className="[font-family:var(--font-heading)] text-sm font-bold text-[var(--color-text-primary)]">
                          {mod.label}
                        </div>
                        <div className="mt-0.5 text-xs text-[var(--color-text-subtle)]">
                          {mod.desc}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-6 rounded-[12px] border-t border-[var(--color-border-divider)] bg-[rgba(253,102,40,0.04)] px-4 py-3.5 pt-5">
                <div className="mb-1 text-xs font-bold text-[var(--color-brand-orange)]">
                  Outcome
                </div>
                <div className="text-[13px] leading-[1.55] text-[var(--color-text-secondary)]">
                  You know what to fix before outreach and which funding path
                  fits your current stage.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
