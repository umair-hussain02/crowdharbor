export const ease = [0.22, 1, 0.36, 1] as const;

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const section = {
  white: 'bg-[var(--color-bg-white)] py-20',
  cream: 'bg-[var(--color-bg-cream)] py-20',
  black: 'bg-[var(--color-bg-black)] py-20',
  hero: 'bg-[var(--color-bg-cream)] pt-[var(--hero-padding-top)] pb-20',
};

export const container = {
  lg: 'mx-auto max-w-[var(--container-lg)] px-[var(--container-gutter)]',
  md: 'mx-auto max-w-[var(--container-md)] px-[var(--container-gutter)]',
  narrow: 'mx-auto max-w-[var(--container-narrow)] px-[var(--container-gutter)]',
};

export const text = {
  eyebrow: 'mb-2.5 text-[13px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]',
  eyebrowDark: 'mb-3 text-[13px] font-semibold uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-brand-orange)]',
  sectionTitle: 'mb-3.5 text-[clamp(24px,3.5vw,40px)] font-extrabold leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]',
  sectionTitleDark: 'mb-3.5 text-[clamp(24px,3.5vw,40px)] font-extrabold leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-on-dark)]',
  description: 'text-[17px] leading-[var(--line-height-relaxed)] text-[var(--color-text-secondary)]',
  descriptionDark: 'text-[17px] leading-[var(--line-height-relaxed)] text-[rgba(255,255,255,0.6)]',
};

export const button = {
  primary: 'inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-6 py-[13px] text-[15px] font-bold text-[var(--color-text-on-dark)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-brand-orange-hover)]',
  primaryLarge: 'inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] px-[26px] py-3.5 text-[15px] font-bold text-[var(--color-text-on-dark)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-brand-orange-hover)]',
  secondary: 'inline-flex items-center gap-2 rounded-[var(--radius-pill)] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-6 py-[13px] text-[15px] font-bold text-[var(--color-text-primary)] no-underline transition-all duration-200 hover:border-[var(--color-text-primary)]',
  secondaryLarge: 'inline-flex items-center gap-2 rounded-[var(--radius-pill)] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-[26px] py-3.5 text-[15px] font-bold text-[var(--color-text-primary)] no-underline transition-all duration-200 hover:border-[var(--color-text-primary)]',
};

export const card = {
  white: 'rounded-[20px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)]',
  cream: 'rounded-[20px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-cream)]',
  hoverLift: 'cursor-default transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-orange)] hover:bg-[var(--color-bg-white)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]',
  iconOrange: 'flex h-10 w-10 items-center justify-center rounded-[11px] bg-[var(--color-brand-orange-tint)] text-[var(--color-brand-orange)]',
};
