export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export const servicesTw = {
  sectionWhite: 'bg-[var(--color-bg-white)] px-6 py-[100px]',
  sectionCream: 'bg-[var(--color-bg-cream)] px-6 py-[100px]',
  sectionCreamShort: 'bg-[var(--color-bg-cream)] px-6 py-20',
  container: 'mx-auto max-w-[var(--container-lg)]',
  containerNarrow: 'mx-auto max-w-[var(--container-narrow)]',
  header: 'mx-auto mb-14 max-w-[640px] text-center',
  headerLg: 'mx-auto mb-16 max-w-[640px] text-center',
  eyebrow: 'mb-3.5 inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint-soft)] px-3.5 py-[5px] text-xs font-bold uppercase tracking-[0.04em] text-[var(--color-brand-orange)]',
  title: 'mb-3 font-[var(--font-heading)] text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[var(--color-text-primary)]',
  titleLarge: 'mb-3.5 font-[var(--font-heading)] text-[clamp(30px,3.5vw,48px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[var(--color-text-primary)]',
  desc: 'text-base leading-[1.75] text-[var(--color-text-secondary)]',
  descLg: 'text-[17px] leading-[1.75] text-[var(--color-text-secondary)]',
  card: 'rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[var(--shadow-card)]',
  orangeIcon: 'flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-orange-tint-soft)] text-[var(--color-brand-orange)]',
  primaryButton: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] px-7 py-[15px] font-[var(--font-body)] text-[15px] font-semibold text-[var(--color-text-on-dark)]',
  secondaryButton: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-transparent px-7 py-[15px] font-[var(--font-body)] text-[15px] font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-brand-orange)]',
  secondaryWhiteButton: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-7 py-[15px] font-[var(--font-body)] text-[15px] font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-brand-orange)]',
};
