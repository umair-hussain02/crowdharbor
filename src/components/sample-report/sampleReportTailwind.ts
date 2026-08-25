export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const sr = {
  sectionWhite: 'bg-[var(--color-bg-white)] px-6 py-[100px]',
  sectionCream: 'bg-[var(--color-bg-cream)] px-6 py-[100px]',
  containerLg: 'mx-auto max-w-[1200px]',
  containerMd: 'mx-auto max-w-[1100px]',
  containerNarrow: 'mx-auto max-w-[860px]',
  header: 'mx-auto mb-14 max-w-[560px] text-center',
  eyebrow: 'mb-3.5 inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint-soft)] px-3.5 py-[5px] text-xs font-bold uppercase tracking-[0.04em] text-[var(--color-brand-orange)]',
  title: 'mb-3 font-[Manrope,sans-serif] text-[clamp(26px,3.5vw,42px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-[var(--color-text-primary)]',
  description: 'text-base leading-[1.75] text-[var(--color-text-secondary)]',
  card: 'rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[0_8px_30px_rgba(0,0,0,0.05)]',
  iconBox: 'flex shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-brand-orange-tint-soft)] text-[var(--color-brand-orange)]',
  pillOrange: 'rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] px-2.5 py-[3px] text-[10px] font-bold text-[var(--color-brand-orange)]',
};
