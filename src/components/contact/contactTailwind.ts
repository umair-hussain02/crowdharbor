export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const contactTw = {
  sectionCream: 'bg-[var(--color-bg-cream)] py-[72px]',
  sectionWhite: 'bg-[var(--color-bg-white)] py-[72px]',
  container: 'mx-auto max-w-[var(--container-lg)] px-[var(--container-gutter)]',
  narrowContainer: 'mx-auto max-w-[760px] px-[var(--container-gutter)]',
  formContainer: 'mx-auto max-w-[640px] px-[var(--container-gutter)] text-center',
  ctaContainer: 'mx-auto max-w-[900px] px-[var(--container-gutter)]',
  eyebrow: 'mb-2.5 text-[13px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]',
  title: 'mb-2 text-[clamp(22px,3vw,34px)] font-extrabold tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]',
  body: 'text-base leading-[1.65] text-[var(--color-text-secondary)]',
  card: 'rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)]',
  iconBox: 'flex size-[38px] items-center justify-center rounded-[10px]',
  primaryButton: 'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)] font-bold no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-brand-orange-hover)]',
  secondaryButton: 'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] text-[var(--color-text-primary)] font-bold no-underline transition-all duration-200 hover:border-[var(--color-text-primary)]',
  input: 'w-full box-border rounded-[12px] border-[1.5px] bg-[var(--color-bg-cream)] px-4 py-[13px] font-[Manrope,sans-serif] text-[15px] text-[var(--color-text-primary)] outline-none transition-colors duration-200 focus:border-[var(--color-brand-orange)]',
  label: 'mb-1.5 block text-[13px] font-bold text-[var(--color-text-primary)]',
  error: 'mt-1 text-xs font-semibold text-[var(--color-brand-orange)]',
};
