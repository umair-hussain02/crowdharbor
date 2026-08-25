export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const section = {
  cream: 'bg-[var(--color-bg-cream)] py-[100px] px-[24px]',
  white: 'bg-[var(--color-bg-white)] py-[100px] px-[24px]',
};

export const container = {
  lg: 'max-w-[var(--container-lg)] mx-auto',
  md: 'max-w-[var(--container-md)] mx-auto',
  narrow: 'max-w-[var(--container-narrow)] mx-auto',
  text: 'max-w-[var(--container-text-sm)] mx-auto',
};

export const type = {
  eyebrow: 'inline-block py-[5px] px-[14px] rounded-[var(--radius-pill)] text-[var(--text-eyebrow)] font-bold tracking-[var(--letter-spacing-wider)] uppercase text-[var(--color-brand-orange)] bg-[var(--color-brand-orange-tint-soft)]',
  title: 'text-[var(--text-section-title)] font-extrabold text-[var(--color-text-primary)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-snug)] [font-family:var(--font-heading)]',
  description: 'text-[var(--text-body-lg)] text-[var(--color-text-secondary)] leading-[var(--line-height-loose)]',
};

export const card = {
  base: 'bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)]',
  lg: 'bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-[var(--radius-card-2xl)] shadow-[var(--shadow-card-lg)]',
  highlighted: 'bg-[var(--color-bg-white)] border-2 border-[var(--color-brand-orange)] rounded-[var(--radius-card-2xl)] shadow-[var(--shadow-card-brand)]',
};

export const button = {
  primary: 'inline-flex items-center justify-center gap-[8px] py-[13px] px-[24px] rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] text-[var(--color-text-on-dark)] text-[var(--text-body)] font-bold [font-family:var(--font-body)] no-underline cursor-pointer border-0 transition-all duration-200 hover:bg-[var(--color-brand-orange-hover)] hover:-translate-y-[2px]',
  secondary: 'inline-flex items-center justify-center gap-[8px] py-[13px] px-[24px] rounded-[var(--radius-pill)] bg-[var(--color-bg-white)] text-[var(--color-text-primary)] text-[var(--text-body)] font-bold [font-family:var(--font-body)] no-underline cursor-pointer border border-[var(--color-border)] transition-all duration-200 hover:border-[var(--color-text-primary)] hover:-translate-y-[2px]',
};
