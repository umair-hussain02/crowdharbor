import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { footerNavigation } from "@/content/site";
import Image from "next/image";

const companyLinks = [
  { label: "Home", href: "/" },
  ...footerNavigation.company,
];
const resourceLinks = footerNavigation.resources;
const legalLinks = footerNavigation.legal;

const footerTw = {
  footer:
    "bg-[var(--color-bg-black)] px-6 pb-10 pt-20 text-[var(--color-text-on-dark)]",

  container: "mx-auto max-w-[var(--container-lg)]",

  grid: "mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5",

  brandColumn: "lg:col-span-2",

  logo: "mb-4 inline-block font-[var(--font-heading)] text-[22px] font-[800] tracking-[-0.02em] text-[var(--color-text-on-dark)] no-underline transition-colors duration-200 hover:text-[var(--color-brand-orange)]",

  description:
    "mb-6 max-w-[300px] text-[15px] leading-[1.7] text-[var(--color-text-on-dark-muted)]",

  socialWrap: "flex flex-wrap gap-4",

  socialLink:
    "inline-flex items-center gap-2 text-sm text-[var(--color-text-on-dark-muted)] no-underline transition-colors duration-200 hover:text-[var(--color-brand-orange)]",

  linksGrid: "grid grid-cols-2 gap-10 md:contents lg:contents",

  column: "min-w-0",

  heading:
    "mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-on-dark)]",

  list: "flex list-none flex-col gap-3 p-0 m-0",

  link: "inline-block text-sm text-[var(--color-text-on-dark-muted)] no-underline transition-colors duration-200 hover:text-[var(--color-brand-orange)]",

  bottom:
    "flex flex-col gap-2 border-t border-[var(--color-border-on-dark)] pt-8",

  disclaimer:
    "text-[13px] leading-[1.65] text-[var(--color-text-on-dark-faint)]",

  copyright: "text-[13px] text-[var(--color-text-on-dark-faintest)]",
} as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div className={footerTw.column}>
      <div className={footerTw.heading}>{title}</div>

      <ul className={footerTw.list}>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className={footerTw.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className={footerTw.footer}>
      <div className={footerTw.container}>
        <div className={footerTw.grid}>
          {/* Brand column */}
          <div className={footerTw.brandColumn}>
            <Link href="/" className={footerTw.logo}>
              <Image
                src="/logov4.jpg"
                alt="CrowdHarbor"
                width={55}
                height={55}
              />
            </Link>

            <p className={footerTw.description}>
              CrowdHarbor helps early-stage founders prepare before they raise
              by diagnosing readiness, reviewing materials, and identifying
              suitable capital pathways.
            </p>

            <div className={footerTw.socialWrap}>
              <a
                href="mailto:contact@crowdharbor.com"
                className={footerTw.socialLink}
              >
                <Mail size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/crowdharbor"
                className={footerTw.socialLink}
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.facebook.com/share/1BqN87eTEp/"
                className={footerTw.socialLink}
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/crowdharbor/"
                className={footerTw.socialLink}
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://x.com/crowdharbor"
                className={footerTw.socialLink}
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@crowdharbor?_t=ZS-90gXnsuUrqB&_r=1"
                className={footerTw.socialLink}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2-2.75V9.4a6.36 6.36 0 1 0 5.45 6.27V8.56a8.16 8.16 0 0 0 4.77 1.52V6.69z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile links: 2 columns */}
          <div className={footerTw.linksGrid}>
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className={footerTw.bottom}>
          <p className={footerTw.disclaimer}>
            CrowdHarbor helps founders prepare before they raise. CrowdHarbor
            does not guarantee funding, act as an investor, broker, crowdfunding
            platform, legal advisor, tax advisor, financial advisor, or
            investment advisor.
          </p>

          <p className={footerTw.copyright}>
            © {new Date().getFullYear()} CrowdHarbor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
