export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const pricingTw = {
  sectionWhite: 'bg-[var(--color-bg-white)] px-6 py-[100px]',
  sectionCream: 'bg-[var(--color-bg-cream)] px-6 py-[100px]',
  containerLg: 'mx-auto max-w-[var(--container-lg)]',
  containerMd: 'mx-auto max-w-[var(--container-md)]',
  containerNarrow: 'mx-auto max-w-[var(--container-narrow)]',
  eyebrow: 'mb-3.5 inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint-soft)] px-3.5 py-[5px] text-xs font-bold uppercase tracking-[0.04em] text-[var(--color-brand-orange)]',
  h2: 'mb-3 [font-family:var(--font-heading)] text-[clamp(26px,3.5vw,42px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-[var(--color-text-primary)]',
  h2Large: 'mb-3 [font-family:var(--font-heading)] text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[var(--color-text-primary)]',
  desc: 'text-base leading-[1.75] text-[var(--color-text-secondary)]',
  centerHeader: 'mx-auto mb-14 max-w-[580px] text-center',
  card: 'rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-9 shadow-[var(--shadow-card-lg)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--color-brand-orange)]',
  highlightedCard: 'relative rounded-[28px] border-2 border-[var(--color-brand-orange)] bg-[var(--color-bg-white)] p-9 shadow-[var(--shadow-card-brand)] transition-shadow duration-200 hover:shadow-[0_28px_80px_rgba(253,102,40,0.15)]',
  pillOrange: 'inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)]',
  outlineButton: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] [font-family:var(--font-body)] font-semibold text-[var(--color-text-primary)] transition-colors duration-200 hover:border-[var(--color-brand-orange)]',
  primaryButton: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] [font-family:var(--font-body)] font-semibold text-[var(--color-text-on-dark)]',
  checkIcon: 'mt-0.5 shrink-0 text-[var(--color-brand-orange)]',
};
