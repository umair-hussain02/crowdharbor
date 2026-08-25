'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { cn, servicesTw } from './servicesTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

const SectionLabel = ({ children }: { children: string }) => <span className={servicesTw.eyebrow}>{children}</span>;

const Checklist = ({ items, orange }: { items: string[]; orange?: boolean }) => (
  <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
    {items.map(item => (
      <li key={item} className="flex items-start gap-2.5">
        <div className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', orange ? 'bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]' : 'bg-[rgba(0,0,0,0.05)] text-[var(--color-text-subtle)]')}>
          <Check size={11} />
        </div>
        <span className="text-[15px] leading-[1.55] text-[var(--color-text-secondary)]">{item}</span>
      </li>
    ))}
  </ul>
);

const ArrowList = ({ items }: { items: string[] }) => (
  <ul className="mb-7 flex list-none flex-col gap-2 p-0">
    {items.map(item => (
      <li key={item} className="flex items-start gap-2.5">
        <span className="mt-0.5 shrink-0 text-sm text-[var(--color-brand-orange)]">→</span>
        <span className="text-sm text-[var(--color-text-tertiary)]">{item}</span>
      </li>
    ))}
  </ul>
);

export function ServicesOffer1() {
  const bestFor = ['Are thinking about raising capital but unsure if ready', 'Want a professional outside review of their position', 'Need to understand major blockers before going further', 'Do not yet need full preparation support'];
  const includes = ['Funding readiness scorecard', 'Strength and weakness overview', 'Top funding blockers', 'Missing material indicators', 'Basic capital pathway recommendation', 'Short next-step action plan'];

  return (
    <section id="offer1" className={servicesTw.sectionCream}>
      <div className={servicesTw.container}>
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>OFFER 01</SectionLabel>
            <h2 className={servicesTw.title}>Funding Readiness Review</h2>
            <p className="mb-5 text-[17px] font-semibold leading-[1.4] text-[#333333]">A focused diagnosis of where your company stands before fundraising.</p>
            <p className="mb-3 text-[15px] font-semibold text-[var(--color-text-primary)]">Best for founders who:</p>
            <ArrowList items={bestFor} />
            <p className="mb-3.5 text-[15px] font-semibold text-[var(--color-text-primary)]">What's included:</p>
            <Checklist items={includes} />
            <motion.a href="/intake" className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-transparent px-7 py-3.5 font-[var(--font-body)] text-[15px] font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-brand-orange)]" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              Start With a Readiness Review <ArrowRight size={15} />
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease }}>
            <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-brand-orange)]">CrowdHarbor</div>
                  <div className="font-[var(--font-heading)] text-[15px] font-bold text-[var(--color-text-primary)]">Readiness Review</div>
                </div>
                <div className="text-right">
                  <div className="mb-0.5 text-[10px] text-[var(--color-text-subtle)]">Score</div>
                  <div className="font-[var(--font-heading)] text-[26px] font-extrabold leading-none text-[var(--color-text-primary)]">58<span className="text-[13px] text-[var(--color-text-subtle)]">/100</span></div>
                </div>
              </div>
              <div className="mb-5 h-[5px] overflow-hidden rounded-[99px] bg-[var(--color-border-divider)]"><motion.div initial={{ width: '0%' }} whileInView={{ width: '58%' }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }} className="h-full rounded-[99px] bg-[var(--color-brand-orange)]" /></div>
              {[
                { label: 'Overall Readiness', value: '58 / 100', tone: 'dark' },
                { label: 'Strong Signal', value: 'Early Customer Interest', tone: 'success' },
                { label: 'Main Gap', value: 'Pitch Deck Structure', tone: 'orange' },
                { label: 'Financial Model', value: 'Needs Work', tone: 'orange' },
                { label: 'Next Step', value: 'Capital Pathway Sprint', tone: 'dark' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between border-t border-[#F5F5F5] py-2.5">
                  <span className="text-xs text-[var(--color-text-subtle)]">{row.label}</span>
                  <span className={cn('max-w-40 text-right text-xs font-semibold', row.tone === 'success' ? 'text-[#16a34a]' : row.tone === 'orange' ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-primary)]')}>{row.value}</span>
                </div>
              ))}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-[var(--color-brand-orange-tint-faint)] px-3.5 py-3">
                <span className="text-xs font-semibold text-[var(--color-text-primary)]">Recommended next: Capital Pathway Sprint</span>
                <ArrowRight size={13} className="text-[var(--color-brand-orange)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const sprintIncludes = ['Funding readiness review', 'Pitch deck review', 'Financial readiness review', 'Traction story review', 'Use-of-funds clarity', 'Data room checklist', 'Founder strategy session', 'Capital pathway recommendation', 'Fundraising action plan', '7–14 day preparation roadmap'];
const sprintOutcomes = ['Clear view of current funding readiness', 'Better understanding of weak points', 'Review notes on key fundraising materials', 'Recommended capital pathway', 'Practical roadmap for what to fix before outreach'];
const dashboardModules = [
  { label: 'Readiness Diagnosis', status: 'Complete' },
  { label: 'Pitch Review', status: 'In Progress' },
  { label: 'Financial Review', status: 'Pending' },
  { label: 'Pathway Recommendation', status: 'Pending' },
  { label: 'Action Plan', status: 'Pending' },
];

export function ServicesOffer2() {
  return (
    <section id="sprint" className={servicesTw.sectionWhite}>
      <div className={servicesTw.container}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mb-14">
          <div className="mb-3.5 flex flex-wrap items-center gap-3">
            <SectionLabel>OFFER 02</SectionLabel>
            <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-black)] px-3.5 py-[5px] text-xs font-bold tracking-[0.04em] text-[var(--color-text-on-dark)]">FLAGSHIP OFFER</span>
          </div>
          <h2 className="mb-2.5 font-[var(--font-heading)] text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-text-primary)]">Capital Pathway Sprint</h2>
          <p className="max-w-[680px] text-lg font-semibold leading-[1.45] text-[#333333]">A deeper review and strategy process for founders preparing to raise soon.</p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <p className="mb-4 text-[15px] font-semibold text-[var(--color-text-primary)]">Everything included:</p>
            <Checklist items={sprintIncludes} orange />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease }}>
            <div className="rounded-[28px] border border-[var(--color-border)] bg-[#F9F9F9] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">Sprint Dashboard</div>
              <div className="mb-5 font-[var(--font-heading)] text-base font-bold text-[var(--color-text-primary)]">Capital Pathway Sprint</div>
              <div className="flex flex-col gap-2.5">
                {dashboardModules.map((mod, i) => {
                  const isActive = mod.status === 'In Progress';
                  const isComplete = mod.status === 'Complete';
                  return (
                    <motion.div key={mod.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease }} className={cn('flex items-center justify-between rounded-[14px] border bg-[var(--color-bg-white)] px-[18px] py-3.5', isActive ? 'border-[var(--color-brand-orange)] shadow-[0_4px_16px_rgba(253,102,40,0.1)]' : 'border-[#E8E8E8]')}>
                      <span className={cn('text-sm', isActive ? 'font-bold text-[var(--color-text-primary)]' : isComplete ? 'font-medium text-[var(--color-text-primary)]' : 'font-medium text-[#BBBBBB]')}>{mod.label}</span>
                      <span className={cn('whitespace-nowrap rounded-[var(--radius-pill)] px-2.5 py-[3px] text-[11px] font-bold', isComplete ? 'bg-[rgba(34,197,94,0.08)] text-[#22c55e]' : isActive ? 'bg-[var(--color-brand-orange-tint-soft)] text-[var(--color-brand-orange)]' : 'bg-[rgba(0,0,0,0.04)] text-[var(--color-text-subtle)]')}>{mod.status}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
          <p className="mb-4 text-[15px] font-semibold text-[var(--color-text-primary)]">What you leave with:</p>
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sprintOutcomes.map((outcome, i) => (
              <motion.div key={outcome} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4, ease }} className="flex items-start gap-2.5 rounded-2xl border border-[var(--color-border)] bg-[#F9F9F9] px-5 py-[18px]">
                <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-orange)]" />
                <span className="text-sm font-medium leading-normal text-[#333333]">{outcome}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <motion.a href="/intake" className={servicesTw.primaryButton} whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>Apply for the Capital Pathway Sprint <ArrowRight size={16} /></motion.a>
          <motion.a href="/sample-report" className={servicesTw.secondaryButton} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>View Sample Report</motion.a>
        </div>
      </div>
    </section>
  );
}

const programBestFor = ['Need more than a diagnosis', 'Have a weak or incomplete pitch deck', 'Need help improving their fundraising narrative', 'Need financial model feedback', 'Need data room preparation guidance', 'Are preparing for serious outreach soon'];
const programIncludes = ['Everything in the Capital Pathway Sprint', 'Pitch narrative improvement', 'Deck structure recommendations', 'Data room preparation guidance', 'Financial model feedback', 'Follow-up readiness review', 'Founder presentation preparation', '2–4 week preparation support'];
const workspaceCards = [
  { label: 'Pitch Narrative', status: 'Under Review' },
  { label: 'Deck Structure', status: 'Feedback Ready' },
  { label: 'Financial Model', status: 'Notes Added' },
  { label: 'Data Room Checklist', status: 'In Progress' },
  { label: 'Follow-up Review', status: 'Scheduled' },
];

export function ServicesOffer3() {
  return (
    <section id="offer3" className={servicesTw.sectionCream}>
      <div className={servicesTw.container}>
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>OFFER 03</SectionLabel>
            <h2 className={servicesTw.title}>Fundraising Preparation Program</h2>
            <p className="mb-5 text-[17px] font-semibold leading-[1.4] text-[#333333]">Hands-on preparation support for founders who need deeper help before approaching capital.</p>
            <p className="mb-2.5 text-[15px] font-semibold text-[var(--color-text-primary)]">Best for founders who:</p>
            <ArrowList items={programBestFor} />
            <motion.a href="/contact" className="inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-transparent px-7 py-3.5 font-[var(--font-body)] text-[15px] font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-brand-orange)]" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              Apply for Preparation Support <ArrowRight size={15} />
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease }}>
            <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
              <div className="mb-5 font-[var(--font-heading)] text-[13px] font-bold text-[var(--color-text-primary)]">Full preparation support</div>
              <Checklist items={programIncludes} />
              <div className="mb-5 mt-7 h-px bg-[var(--color-border-divider)]" />
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.06em] text-[var(--color-text-subtle)]">Preparation workspace</div>
              <div className="flex flex-col gap-2">
                {workspaceCards.map((card, i) => (
                  <motion.div key={card.label} initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, duration: 0.35, ease }} className="flex items-center justify-between rounded-[10px] border border-[var(--color-border-divider)] bg-[#F9F9F9] px-3.5 py-2.5">
                    <span className="text-[13px] font-medium text-[#333333]">{card.label}</span>
                    <span className="rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint-soft)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-brand-orange)]">{card.status}</span>
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
