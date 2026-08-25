export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const resourceTw = {
  container: 'mx-auto max-w-[var(--container-lg)] px-[var(--container-gutter)]',
  sectionWhite: 'bg-[var(--color-bg-white)] py-20',
  sectionCream: 'bg-[var(--color-bg-cream)] py-20',
  eyebrow: 'mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-orange)]',
  title: 'text-[clamp(22px,3vw,36px)] font-extrabold leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]',
  body: 'text-base leading-[1.6] text-[var(--color-text-secondary)]',
  pill: 'inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint)] px-3.5 py-1 text-xs font-bold tracking-[0.04em] text-[var(--color-brand-orange)]',
  primaryLink: 'inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-6 py-[13px] text-[15px] font-bold text-[var(--color-text-on-dark)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-brand-orange-hover)]',
  primaryButton: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] px-6 py-3.5 font-[var(--font-weight-bold-ch)] text-[var(--color-text-on-dark)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--color-brand-orange-hover)]',
  secondaryLink: 'inline-flex items-center gap-2 rounded-[var(--radius-pill)] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-6 py-[13px] text-[15px] font-bold text-[var(--color-text-primary)] no-underline transition-all duration-200 hover:border-[var(--color-text-primary)]',
  cardHover: 'cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-orange)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
  input: 'w-full box-border rounded-[14px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-cream)] px-5 py-3.5 font-[var(--font-body)] text-[15px] text-[var(--color-text-primary)] outline-none transition-colors duration-200 focus:border-[var(--color-brand-orange)]',
};
