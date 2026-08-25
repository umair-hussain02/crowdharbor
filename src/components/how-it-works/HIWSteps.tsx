'use client';

import { motion } from 'motion/react';
import { cn, hiw } from './howItWorksTailwind';
import {
  User, Building2, TrendingUp, Target, FileText, AlertCircle,
  Presentation, Layers, BarChart3, Globe, Calculator, FolderLock, DollarSign, Mic, Compass,
  Check, ArrowRight,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

/* ──────────────────────────────────────────────────────────
   STEP 1 — Founder Intake
────────────────────────────────────────────────────────── */
const intakeCategories = [
  { icon: User, title: 'Founder Details', desc: 'Name, company, location, website, and contact information.' },
  { icon: Building2, title: 'Company Stage', desc: 'Idea, MVP, users, revenue, traction, or active fundraising.' },
  { icon: TrendingUp, title: 'Traction', desc: 'Revenue, users, customers, waitlist, partnerships, growth, or market proof.' },
  { icon: Target, title: 'Funding Goal', desc: 'Target raise, use of funds, preferred path, and timeline.' },
  { icon: FileText, title: 'Current Materials', desc: 'Pitch deck, financial model, business plan, data room documents, or missing materials.' },
  { icon: AlertCircle, title: 'Biggest Challenge', desc: 'Unclear pitch, weak deck, no financial model, no traction story, or wrong funding path.' },
];

export function HIWStep1() {
  return (
    <section className="bg-[var(--color-bg-cream)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: form preview */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <StepLabel num="Step 1" />
            <h2 className={hiw.sectionTitle}>Tell us where your company stands.</h2>
            <p className={hiw.sectionBody}>
              The intake helps CrowdHarbor understand your company stage, traction, funding goals, current materials, and biggest preparation challenges.
            </p>

            {/* Form preview card */}
            <div
              className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[24px] p-[28px] [box-shadow:0_20px_60px_rgba(0,0,0,0.06)] mt-[32px]"
            >
              <div className="flex items-center justify-between mb-[20px]">
                <span className="text-[13px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)]">Founder Intake</span>
                <span className="text-[12px] text-[var(--color-text-subtle)]">Step 1 of 7</span>
              </div>

              {/* Progress bar */}
              <div className="h-[4px] bg-[var(--color-bg-admin-muted)] rounded-[99px] mb-[24px] overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '20%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                  className="h-full bg-[var(--color-brand-orange)] rounded-[99px]"
                />
              </div>

              {/* Fake inputs */}
              <div className="flex flex-col gap-[12px]">
                {['Company name', 'Country / Location'].map((label) => (
                  <div key={label}>
                    <div className="text-[11px] font-semibold text-[var(--color-text-subtle)] mb-[6px]">{label}</div>
                    <div className="h-[40px] bg-[#F9F9F9] border border-[var(--color-border)] rounded-[10px]" />
                  </div>
                ))}

                {/* Selectable option */}
                <div>
                  <div className="text-[11px] font-semibold text-[var(--color-text-subtle)] mb-[8px]">Company stage</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['MVP / Beta', 'Early Revenue', 'Traction Phase', 'Pre-Seed'].map((opt, i) => (
                      <div
                        key={opt}
                        className={cn("py-[8px] px-[12px] rounded-[10px] text-[12px] font-medium cursor-default", i === 1 ? "text-[var(--color-brand-orange)]" : "text-[var(--color-text-muted)]", i === 1 ? "bg-[rgba(253,102,40,0.04)]" : "bg-[var(--color-bg-white)]")}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload box */}
                <div
                  className="border-[1.5px] border-dashed border-[var(--color-border)] rounded-[12px] p-[16px] text-center bg-[#FAFAFA]"
                >
                  <div className="text-[12px] text-[var(--color-text-faint)]">Drop pitch deck or materials here</div>
                  <div className="text-[11px] text-[#CCCCCC] mt-[2px]">PDF, PPTX, XLSX accepted</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-[8px] mt-[20px]">
                <div className="py-[8px] px-[20px] border border-[var(--color-border)] rounded-[var(--radius-pill)] text-[13px] text-[var(--color-text-subtle)] cursor-default">Back</div>
                <div className="py-[8px] px-[20px] bg-[var(--color-brand-orange)] rounded-[var(--radius-pill)] text-[13px] font-semibold text-[var(--color-text-on-dark)] cursor-default">
                  Next →
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: intake category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {intakeCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease }}
                  whileHover={{ y: -4 }}
                  className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[18px] p-[20px] shadow-[var(--shadow-card)] transition-all duration-200 hover:border-[var(--color-brand-orange)]"
                >
                  <div className="w-[34px] h-[34px] rounded-[8px] bg-[var(--color-brand-orange-tint-soft)] flex items-center justify-center mb-[10px]">
                    <Icon size={17} className="text-[var(--color-brand-orange)]" />
                  </div>
                  <div className="text-[14px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[4px]">{cat.title}</div>
                  <p className="text-[12px] text-[var(--color-text-muted)] leading-[1.6] [margin:0px]">{cat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   STEP 2 — Internal Review
────────────────────────────────────────────────────────── */
const reviewModules = [
  { icon: Presentation, title: 'Pitch Deck', desc: 'Is your deck clear, credible, and structured for serious review?', tag: 'Needs Review', type: 'neutral' },
  { icon: Layers, title: 'Business Model', desc: 'Is the way your company creates and captures value easy to understand?', tag: 'Reviewed', type: 'green' },
  { icon: TrendingUp, title: 'Traction Proof', desc: 'Do you have evidence of demand, revenue, customers, usage, or market validation?', tag: 'Strong Signal', type: 'green' },
  { icon: Globe, title: 'Market Positioning', desc: 'Is your opportunity clearly framed against the market and competition?', tag: 'Needs Work', type: 'neutral' },
  { icon: Calculator, title: 'Financial Model', desc: 'Are your numbers understandable, realistic, and connected to your funding ask?', tag: 'Priority Gap', type: 'orange' },
  { icon: FolderLock, title: 'Legal / Data Room', desc: 'Are your core documents organized enough for review?', tag: 'Missing', type: 'red' },
  { icon: DollarSign, title: 'Funding Goal', desc: 'Is your funding ask connected to clear milestones and use of funds?', tag: 'Reviewed', type: 'green' },
  { icon: Mic, title: 'Founder Story', desc: 'Does the founder narrative build credibility and trust?', tag: 'Needs Work', type: 'neutral' },
  { icon: Compass, title: 'Pathway Fit', desc: 'Are you pursuing the right funding route for your stage and traction?', tag: 'Strategic Priority', type: 'orange' },
];

const tagStyles: Record<string, { bg: string; color: string }> = {
  orange: { bg: 'rgba(253,102,40,0.1)', color: '#FD6628' },
  green: { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
  red: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626' },
  neutral: { bg: 'rgba(0,0,0,0.05)', color: '#888888' },
};

export function HIWStep2() {
  return (
    <section className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-[680px] mb-[56px]"
        >
          <StepLabel num="Step 2" />
          <h2 className={hiw.sectionTitle}>We review the signals funding sources care about.</h2>
          <p className={hiw.sectionBody}>
            CrowdHarbor reviews your pitch, business model, traction proof, financial readiness, data room status, funding goal, founder story, and pathway fit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviewModules.map((mod, i) => {
            const Icon = mod.icon;
            const ts = tagStyles[mod.type];
            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease }}
                whileHover={{ y: -4 }}
                className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[20px] p-[24px] shadow-[var(--shadow-card)] transition-all duration-200 hover:border-[var(--color-brand-orange)]"
              >
                <div className="w-[36px] h-[36px] rounded-[10px] bg-[var(--color-brand-orange-tint-soft)] flex items-center justify-center mb-[12px]">
                  <Icon size={17} className="text-[var(--color-brand-orange)]" />
                </div>
                <div className="text-[14px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[6px]">{mod.title}</div>
                <p className="text-[12px] text-[var(--color-text-muted)] leading-[1.6] [margin:0_0_12px]">{mod.desc}</p>
                <span className="inline-block py-[3px] px-[10px] rounded-[var(--radius-pill)] text-[11px] font-bold">
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

/* ──────────────────────────────────────────────────────────
   STEP 3 — Readiness Diagnosis
────────────────────────────────────────────────────────── */
const diagnosisItems = [
  { label: 'Current readiness level', desc: 'See where your company actually stands.' },
  { label: 'Strengths and weaknesses', desc: 'Understand what is working and what is not.' },
  { label: 'Missing materials', desc: 'Find out what needs to be built or improved.' },
  { label: 'Risk areas and priority blockers', desc: 'Identify the gaps that matter most.' },
];

const scorecardRows = [
  { label: 'Pitch Readiness', score: 55, tag: 'Needs Work', type: 'neutral' },
  { label: 'Financial Readiness', score: 40, tag: 'Priority Gap', type: 'orange' },
  { label: 'Traction Clarity', score: 72, tag: 'Strong Signal', type: 'green' },
  { label: 'Data Room Readiness', score: 30, tag: 'Missing', type: 'red' },
  { label: 'Funding Pathway Fit', score: 68, tag: 'Review', type: 'neutral' },
];

export function HIWStep3() {
  return (
    <section className="bg-[var(--color-bg-cream)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <StepLabel num="Step 3" />
            <h2 className={hiw.sectionTitle}>You receive a clear readiness diagnosis.</h2>
            <p className={hiw.sectionBody}>
              The diagnosis shows your current readiness level, strengths, weaknesses, missing materials, risk areas, and priority blockers before outreach.
            </p>
            <ul className="list-none p-[0px] [margin:0_0_28px] flex flex-col gap-[12px]">
              {diagnosisItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease }}
                  className="flex items-start gap-[12px]"
                >
                  <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-brand-orange-tint)] flex items-center justify-center shrink-0 mt-[2px]">
                    <Check size={12} className="text-[var(--color-brand-orange)]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">{item.label}</div>
                    <div className="text-[13px] text-[var(--color-text-muted)] mt-[2px]">{item.desc}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
            <a href="#" className="text-[var(--color-brand-orange)] font-semibold text-[14px] no-underline">
              View Sample Report →
            </a>
          </motion.div>

          {/* Right: scorecard */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <div
              className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[28px] p-[32px] [box-shadow:0_24px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center justify-between mb-[24px]">
                <div>
                  <div className="text-[10px] font-bold text-[var(--color-brand-orange)] tracking-[0.08em] uppercase mb-[2px]">CrowdHarbor</div>
                  <div className="text-[16px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)]">Readiness Diagnosis</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[var(--color-text-subtle)] mb-[2px]">Overall Score</div>
                  <div className="text-[28px] font-extrabold text-[var(--color-text-primary)] [font-family:var(--font-heading)] leading-[1px]">
                    62<span className="text-[14px] text-[var(--color-text-subtle)]">/100</span>
                  </div>
                </div>
              </div>

              {/* Score ring + status */}
              <div className="flex items-center gap-[20px] mb-[24px] p-[16px] bg-[#F9F9F9] rounded-[16px]">
                <div className="relative w-[72px] h-[72px] shrink-0">
                  <svg width="72" height="72" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="30" fill="none" stroke="#F0F0F0" strokeWidth="7" />
                    <motion.circle
                      cx="36" cy="36" r="30"
                      fill="none" stroke="#FD6628" strokeWidth="7" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 30}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 30 * (1 - 0.62) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                      className="[transform:rotate(-90deg)] [transform-origin:50%_50%]"
                    />
                  </svg>
                  <div className="absolute [inset:0px] flex items-center justify-center">
                    <span className="text-[16px] font-extrabold text-[var(--color-text-primary)]">62</span>
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[var(--color-text-subtle)] mb-[4px]">Main Blocker</div>
                  <div className="text-[14px] font-bold text-[var(--color-brand-orange)] mb-[4px]">Financial Model</div>
                  <div className="text-[12px] text-[var(--color-text-subtle)]">Strong Signal: Early Revenue</div>
                </div>
              </div>

              {scorecardRows.map((row) => {
                const ts = tagStyles[row.type];
                return (
                  <div key={row.label} className="flex items-center justify-between py-[10px] px-[0] [border-top:1px_solid_#F5F5F5]">
                    <span className="text-[13px] text-[#333333] font-medium">{row.label}</span>
                    <div className="flex items-center gap-[10px]">
                      <div className="w-[52px] h-[3px] bg-[var(--color-bg-admin-muted)] rounded-[99px] overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          whileInView={{ width: `${row.score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                          className="h-full rounded-[99px]"
                        />
                      </div>
                      <span className="inline-block py-[2px] px-[8px] rounded-[var(--radius-pill)] text-[10px] font-bold [white-space:nowrap]">
                        {row.tag}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="mt-[16px] py-[12px] px-[14px] bg-[var(--color-brand-orange-tint-faint)] rounded-[12px]">
                <div className="text-[11px] text-[var(--color-text-subtle)] mb-[2px]">Priority Fix</div>
                <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">Sharpen Use of Funds</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   STEP 4 — Strategy Session
────────────────────────────────────────────────────────── */
const benefitCards = [
  { title: 'Understand the why', desc: 'Know why certain gaps matter before outreach.' },
  { title: 'Prioritize correctly', desc: 'Focus on the fixes that most affect funding readiness.' },
  { title: 'Ask better questions', desc: 'Leave with clarity instead of confusion.' },
];

const agendaItems = [
  'Readiness score walkthrough',
  'Key blockers',
  'Material gaps',
  'Pathway recommendation',
  'Priority fixes',
  'Next-step roadmap',
];

export function HIWStep4() {
  return (
    <section className="bg-[var(--color-bg-white)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <StepLabel num="Step 4" />
            <h2 className={hiw.sectionTitle}>We walk through what the findings mean.</h2>
            <p className="mb-[32px]">
              The strategy session helps founders understand the diagnosis, ask questions, clarify priorities, and decide what should happen before fundraising outreach.
            </p>

            <div className="flex flex-col gap-[12px]">
              {benefitCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.4, ease }}
                  className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[16px] py-[18px] px-[20px] flex gap-[12px] items-start"
                >
                  <div className="w-[28px] h-[28px] rounded-full bg-[var(--color-brand-orange-tint)] flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-extrabold text-[var(--color-brand-orange)]">{i + 1}</span>
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)] mb-[3px]">{card.title}</div>
                    <div className="text-[13px] text-[var(--color-text-muted)]">{card.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: strategy session card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <div
              className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[28px] p-[36px] [box-shadow:0_20px_60px_rgba(0,0,0,0.07)]"
            >
              <div className="flex items-center gap-[10px] mb-[24px]">
                <div className="w-[36px] h-[36px] rounded-[10px] bg-[var(--color-brand-orange-tint-soft)] flex items-center justify-center">
                  <Mic size={18} className="text-[var(--color-brand-orange)]" />
                </div>
                <div>
                  <div className="text-[11px] text-[var(--color-text-subtle)] tracking-[0.06em] uppercase">Scheduled</div>
                  <div className="text-[16px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)]">Strategy Session Agenda</div>
                </div>
              </div>

              <div className="flex flex-col gap-[0]">
                {agendaItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.35, ease }}
                    className={cn("flex items-center gap-[12px] py-[14px] px-[0]", i < agendaItems.length - 1 ? "border-b border-b-[#F5F5F5]" : "border-b-0", i === 0 ? "bg-transparent" : "bg-transparent")}
                  >
                    <div
                      className={cn("w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0", i === 0 ? "bg-[var(--color-brand-orange)]" : "bg-[rgba(0,0,0,0.05)]")}
                    >
                      {i === 0 ? (
                        <Check size={12} className="text-[var(--color-text-on-dark)]" />
                      ) : (
                        <span className="text-[10px] font-bold text-[var(--color-text-faint)]">{i + 1}</span>
                      )}
                    </div>
                    <span className={cn("text-[14px]", i === 0 ? "font-semibold" : "font-normal", i === 0 ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)]")}>
                      {item}
                    </span>
                    {i === 0 && (
                      <span className="ml-auto py-[2px] px-[8px] rounded-[var(--radius-pill)] text-[10px] font-bold bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]">
                        Active
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   STEP 5 — Action Plan
────────────────────────────────────────────────────────── */
const roadmapSections = [
  { label: 'Fix Now', color: '#FD6628', bg: 'rgba(253,102,40,0.06)', items: ['Clarify use of funds', 'Update financial model assumptions'] },
  { label: 'Prepare Next', color: '#000000', bg: '#F9F9F9', items: ['Build basic data room checklist', 'Update pitch deck structure'] },
  { label: 'Improve Message', color: '#000000', bg: '#F9F9F9', items: ['Sharpen traction story', 'Strengthen founder narrative'] },
  { label: 'Prioritize Pathway', color: '#000000', bg: '#F9F9F9', items: ['Start with crowdfunding preparation', 'Defer angel outreach until ready'] },
  { label: 'Avoid', color: '#dc2626', bg: 'rgba(239,68,68,0.04)', items: ['Contacting investors before financials are clearer'] },
  { label: 'Timeline', color: '#000000', bg: '#F9F9F9', items: ['Follow 7–14 day preparation roadmap'] },
];

export function HIWStep5() {
  return (
    <section className="bg-[var(--color-bg-cream)] py-[100px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-[680px] mb-[56px]"
        >
          <StepLabel num="Step 5" />
          <h2 className={hiw.sectionTitle}>Leave with a clear action plan before outreach.</h2>
          <p className={hiw.sectionBody}>
            Your action plan shows what to fix now, what can wait, which documents to prepare, what story to sharpen, which funding path to prioritize, and what timeline to follow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[28px] p-[40px] [box-shadow:0_20px_60px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-center justify-between mb-[32px]">
            <div>
              <div className="text-[11px] font-bold text-[var(--color-text-subtle)] tracking-[0.08em] uppercase mb-[4px]">
                Preparation Roadmap
              </div>
              <div className="text-[18px] font-bold text-[var(--color-text-primary)] [font-family:var(--font-heading)]">
                7–14 Day Action Plan
              </div>
            </div>
            <div className="py-[6px] px-[14px] bg-[var(--color-brand-orange-tint)] rounded-[var(--radius-pill)] text-[12px] font-bold text-[var(--color-brand-orange)]">
              Active
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmapSections.map((section, i) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease }}
                className="rounded-[16px] p-[20px]"
              >
                <div className="text-[11px] font-bold tracking-[0.06em] uppercase mb-[10px]">
                  {section.label}
                </div>
                <ul className="list-none p-[0px] [margin:0px] flex flex-col gap-[6px]">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-[8px]">
                      <ArrowRight size={12} className="shrink-0 mt-[3px]" />
                      <span className="text-[13px] text-[var(--color-text-secondary)] leading-[1.5]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   Shared sub-components
────────────────────────────────────────────────────────── */
function StepLabel({ num }: { num: string }) {
  return (
    <span
      className="inline-block py-[5px] px-[14px] rounded-[var(--radius-pill)] text-[12px] font-bold text-[var(--color-brand-orange)] bg-[var(--color-brand-orange-tint-soft)] tracking-[0.04em] uppercase mb-[14px]"
    >
      {num}
    </span>
  );
}
