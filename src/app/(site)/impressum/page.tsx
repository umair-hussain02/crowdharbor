'use client';

import { LegalLayout } from '@/components/legal/LegalLayout';

const contentTw = {
  section: 'scroll-mt-[100px]',
  h2: 'mt-10 mb-3 border-t border-[var(--color-border)] pt-10 scroll-mt-[100px] font-[var(--font-heading)] text-xl font-[800] leading-[var(--line-height-normal)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]',
  firstH2: 'mb-3 scroll-mt-[100px] font-[var(--font-heading)] text-xl font-[800] leading-[var(--line-height-normal)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]',
  p: 'mb-3.5 text-base leading-[var(--line-height-loose)] text-[var(--color-text-secondary)]',
  placeholder: 'italic text-[var(--color-text-faint)]',
  notice: 'mb-10 rounded-[var(--radius-card)] border-2 border-[rgba(253,102,40,0.3)] bg-[rgba(253,102,40,0.07)] px-[26px] py-[22px]',
  noticeTitle: 'mb-2 text-sm font-[800] text-[var(--color-text-primary)]',
  noticeText: 'mb-0 text-[15px] leading-[var(--line-height-loose)] text-[var(--color-text-secondary)]',
  contactCard: 'rounded-[14px] bg-[var(--color-bg-cream)] px-6 py-5 text-[15px] leading-[var(--line-height-loose)] text-[var(--color-text-secondary)]',
  contactName: 'text-[var(--color-text-primary)]',
} as const;

const tocItems = [
  { id: 'provider', label: 'Service Provider' },
  { id: 'representative', label: 'Represented By' },
  { id: 'contact', label: 'Contact' },
  { id: 'register', label: 'Commercial Register' },
  { id: 'vat', label: 'VAT Identification Number' },
  { id: 'content-responsibility', label: 'Responsible for Content' },
  { id: 'dispute', label: 'EU Dispute Resolution' },
] as const;

export default function Page() {
  return (
    <LegalLayout
      title="Impressum"
      heroCopy="Legal notice in accordance with § 5 of the German Telemedia Act (TMG)."
      lastUpdated="June 2026"
      tocItems={tocItems}
    >
      <div className={contentTw.notice}>
        <div className={contentTw.noticeTitle}>Placeholder — complete before launch</div>
        <p className={contentTw.noticeText}>
          This page is a structural placeholder. The bracketed fields below must be replaced with CrowdHarbor's actual registered business details before the site goes live. An Impressum with incomplete or inaccurate information does not satisfy German legal requirements.
        </p>
      </div>

      <div id="provider" className={contentTw.section}>
        <h2 className={contentTw.firstH2}>Service Provider</h2>
        <p className={`${contentTw.p} ${contentTw.placeholder}`}>
          [Full legal company name]
          <br />
          [Street address]
          <br />
          [Postal code, city]
          <br />
          [Country]
        </p>
      </div>

      <div id="representative" className={contentTw.section}>
        <h2 className={contentTw.h2}>Represented By</h2>
        <p className={`${contentTw.p} ${contentTw.placeholder}`}>[Name(s) of managing director(s) / authorized representative(s)]</p>
      </div>

      <div id="contact" className={contentTw.section}>
        <h2 className={contentTw.h2}>Contact</h2>
        <p className={contentTw.p}>
          Email: <a href="mailto:hello@crowdharbor.com">hello@crowdharbor.com</a>
          <br />
          Phone: <span className={contentTw.placeholder}>[Phone number]</span>
        </p>
      </div>

      <div id="register" className={contentTw.section}>
        <h2 className={contentTw.h2}>Commercial Register</h2>
        <p className={`${contentTw.p} ${contentTw.placeholder}`}>
          [Register court, e.g. Amtsgericht ...]
          <br />
          [Register number, e.g. HRB ...]
        </p>
      </div>

      <div id="vat" className={contentTw.section}>
        <h2 className={contentTw.h2}>VAT Identification Number</h2>
        <p className={`${contentTw.p} ${contentTw.placeholder}`}>
          VAT ID per § 27a of the German VAT Act: [VAT identification number, if applicable]
        </p>
      </div>

      <div id="content-responsibility" className={contentTw.section}>
        <h2 className={contentTw.h2}>Responsible for Content</h2>
        <p className={`${contentTw.p} ${contentTw.placeholder}`}>
          Responsible per § 18 (2) MStV: [Name and address]
        </p>
      </div>

      <div id="dispute" className={contentTw.section}>
        <h2 className={contentTw.h2}>EU Dispute Resolution</h2>
        <p className={contentTw.p}>
          The European Commission provides a platform for online dispute resolution (ODR):{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          . We are not obligated and not willing to participate in dispute resolution proceedings before a consumer arbitration board.
        </p>
      </div>
    </LegalLayout>
  );
}
