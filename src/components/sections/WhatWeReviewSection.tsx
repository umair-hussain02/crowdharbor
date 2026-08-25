'use client';

import { motion } from 'motion/react';
import { MessageSquare, Presentation, Calculator, TrendingUp, DollarSign, Globe, FolderOpen, Compass } from 'lucide-react';
import { cn } from './sectionsTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const reviewModules = [
  {
    icon: MessageSquare,
    title: 'Pitch Narrative',
    description: 'Clarity, story structure, and why-now positioning.',
    tag: 'Common Gap',
    tagType: 'neutral',
  },
  {
    icon: Presentation,
    title: 'Pitch Deck',
    description: 'Flow, completeness, and investor readiness.',
    tag: 'High Impact',
    tagType: 'orange',
  },
  {
    icon: Calculator,
    title: 'Financial Model',
    description: 'Assumptions, projections, and raise logic.',
    tag: 'Needs Review',
    tagType: 'neutral',
  },
  {
    icon: TrendingUp,
    title: 'Traction Story',
    description: 'Evidence of momentum, user proof, and market signals.',
    tag: 'Strategic Priority',
    tagType: 'orange',
  },
  {
    icon: DollarSign,
    title: 'Use of Funds',
    description: 'Milestone alignment and capital deployment clarity.',
    tag: 'Material Check',
    tagType: 'neutral',
  },
  {
    icon: Globe,
    title: 'Market Positioning',
    description: 'Differentiation, market sizing, and competitor framing.',
    tag: 'Common Gap',
    tagType: 'neutral',
  },
  {
    icon: FolderOpen,
    title: 'Data Room Readiness',
    description: 'Document completeness and due diligence preparation.',
    tag: 'High Impact',
    tagType: 'orange',
  },
  {
    icon: Compass,
    title: 'Funding Pathway Fit',
    description: 'Stage, traction, and route alignment assessment.',
    tag: 'Strategic Priority',
    tagType: 'orange',
  },
];

export function WhatWeReviewSection() {
  return (
    <section className="bg-[var(--color-bg-cream)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[680px] [margin:0_auto_64px]"
        >
          <h2
            className="text-[clamp(32px, 3.5vw, 48px)] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em] [font-family:var(--font-heading)] mb-[16px]"
          >
            We review the signals funding sources care about.
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-[1.75]">
            CrowdHarbor looks across your company story, traction, financial readiness, documents, and funding goals to identify gaps before they become rejection points.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviewModules.map((mod, i) => {
            const Icon = mod.icon;
            const isOrange = mod.tagType === 'orange';
            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                whileHover={{ y: -4 }}
                className="bg-[var(--color-bg-white)] border border-[var(--color-border)] hover:border-[var(--color-brand-orange)] rounded-[20px] p-[24px] [box-shadow:0_4px_20px_rgba(0,0,0,0.04)] cursor-default transition-all duration-200"
              >
                <div
                  className="w-[38px] h-[38px] rounded-[10px] bg-[var(--color-brand-orange-tint-soft)] flex items-center justify-center mb-[14px]"
                >
                  <Icon size={18} className="text-[var(--color-brand-orange)]" />
                </div>
                <div
                  className="text-[15px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[6px]"
                >
                  {mod.title}
                </div>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-[1.6] mb-[14px] [margin:0_0_14px_0]">
                  {mod.description}
                </p>
                <span
                  className={cn("inline-block py-[3px] px-[10px] rounded-[var(--radius-pill)] text-[11px] font-bold", isOrange ? "bg-[var(--color-brand-orange-tint)]" : "bg-[rgba(0,0,0,0.05)]", isOrange ? "text-[var(--color-brand-orange)]" : "text-[var(--color-text-subtle)]")}
                >
                  {mod.tag}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
