export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const hiw = {
  sectionCream: 'bg-[var(--color-bg-cream)] py-[100px] px-[24px]',
  sectionWhite: 'bg-[var(--color-bg-white)] py-[100px] px-[24px]',
  container: 'max-w-[var(--container-lg)] mx-auto',
  eyebrow: 'inline-block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange-tint-soft)] px-[14px] py-[5px] text-[12px] font-bold uppercase tracking-[var(--letter-spacing-wide)] text-[var(--color-brand-orange)]',
  sectionTitle: 'm-0 mb-[14px] text-[clamp(28px,3vw,42px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[var(--color-text-primary)] [font-family:var(--font-heading)]',
  sectionBody: 'm-0 mb-[20px] text-[16px] leading-[1.75] text-[var(--color-text-secondary)]',
  card: 'bg-[var(--color-bg-white)] border border-[var(--color-border)] shadow-[var(--shadow-card)]',
};
