'use client';

import { motion, useMotionValue, useSpring, animate } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn, sr } from './sampleReportTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

function ScoreRing({ score }: { score: number; size?: number }) {
  const size = 80;
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const raw = useMotionValue(0);
  const val = useSpring(raw, { stiffness: 60, damping: 20 });
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctrl = animate(raw, score, { duration: 1.4, ease: 'easeOut', delay: 0.5 });
    const unsubscribe = val.on('change', (v) => { if (countRef.current) countRef.current.textContent = Math.round(v).toString(); });
    return () => { ctrl.stop(); unsubscribe(); };
  }, [score, raw, val]);

  return (
    <div className="relative size-20">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border-divider)" strokeWidth={10} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-brand-orange)" strokeWidth={10}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (circ * score) / 100 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span ref={countRef} className="font-[Manrope,sans-serif] text-[28px] font-extrabold leading-none text-[var(--color-text-primary)]">0</span>
        <span className="text-[11px] font-medium text-[var(--color-text-subtle)]">/100</span>
      </div>
    </div>
  );
}

const reportPages = [
  'Funding Readiness Score', 'Top Funding Blockers', 'Pitch Review', 'Financial Readiness', 'Data Room Checklist', 'Capital Pathway Plan', '7–14 Day Action Plan',
];

export function SRHero() {
  return (
    <section className="overflow-hidden bg-[var(--color-bg-cream)] px-6 pb-20 pt-[140px]">
      <div className={sr.containerLg}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
              className={cn(sr.eyebrow, 'mb-5')}>Sample CrowdHarbor report</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08, ease }}
              className="mb-5 font-[Manrope,sans-serif] text-[clamp(38px,5.5vw,66px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)]">
              See the gaps before funding sources do.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16, ease }}
              className="mb-9 text-[17px] leading-[1.7] text-[var(--color-text-secondary)]">
              Preview how CrowdHarbor diagnoses funding readiness, identifies weak points, reviews key materials, recommends a capital pathway, and creates a practical preparation plan before outreach.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24, ease }} className="mb-7 flex flex-col gap-3.5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.a href="/intake" className="inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] px-7 py-[15px] font-[Manrope,sans-serif] text-[15px] font-semibold text-white" whileHover={{ scale: 1.03, y: -2 }} transition={{ duration: 0.2 }}>
                  Get My Readiness Review <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}><ArrowRight size={15} /></motion.span>
                </motion.a>
                <motion.a href="/contact" className="inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white px-6 py-[15px] font-[Manrope,sans-serif] text-[15px] font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-brand-orange)]" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  Apply for the Sprint
                </motion.a>
              </div>
              <Link href="/pricing" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-text-tertiary)] no-underline">
                View Pricing <span className="text-[var(--color-brand-orange)]">→</span>
              </Link>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4, ease }} className="text-[13px] text-[var(--color-text-faint)]">
              Sample only. Actual reports are based on your company stage, materials, traction, and funding goals.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.48, ease }} className="mt-5 flex flex-wrap gap-2">
              {['Readiness diagnosis', 'Funding blockers', 'Capital pathway plan'].map(tag => (
                <span key={tag} className="rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white px-3 py-[5px] text-xs font-semibold text-[var(--color-text-tertiary)]">{tag}</span>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }} className="relative flex h-[420px] items-center justify-center">
            {[3, 2, 1].map((depth) => (
              <div key={depth} className={cn('absolute h-[360px] w-80 rounded-[20px] border border-[var(--color-border)] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)]', depth === 3 && 'translate-x-[18px] translate-y-[30px] rotate-[4.5deg] opacity-[0.55]', depth === 2 && 'translate-x-3 translate-y-5 rotate-[3deg] opacity-[0.7]', depth === 1 && 'translate-x-1.5 translate-y-2.5 rotate-[1.5deg] opacity-[0.85]')}>
                <div className="border-b border-[var(--color-border-divider)] px-[22px] py-5"><div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#CCCCCC]">{reportPages[depth]}</div></div>
                <div className="flex flex-col gap-2 px-[22px] py-4">{[0, 1, 2, 3].map(l => <div key={l} className={cn('h-2 rounded bg-[var(--color-border-divider)]', l === 0 && 'w-3/4', l === 1 && 'w-[63%]', l === 2 && 'w-[51%]', l === 3 && 'w-[39%]')} />)}</div>
              </div>
            ))}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute z-10 w-80 rounded-[20px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.10)]">
              <div className="mb-4 flex items-center justify-between">
                <div><div className="mb-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-text-subtle)]">CrowdHarbor</div><div className="font-[Manrope,sans-serif] text-sm font-bold text-[var(--color-text-primary)]">Funding Readiness Score</div></div>
                <ScoreRing score={62} />
              </div>
              <div className="flex flex-col gap-2 border-t border-[var(--color-bg-cream)] pt-3.5">
                {[{ label: 'Main Gap', value: 'Financial Model', orange: true }, { label: 'Pathway Fit', value: 'Crowdfunding + Angel Prep' }, { label: 'Priority', value: 'Strengthen Use of Funds', orange: true }].map(row => (
                  <div key={row.label} className="flex items-center justify-between"><span className="text-[11px] font-medium text-[var(--color-text-subtle)]">{row.label}</span><span className={cn('text-[11px] font-bold', row.orange ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-primary)]')}>{row.value}</span></div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
