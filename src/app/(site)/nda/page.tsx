'use client';

import { LegalLayout } from '@/components/legal/LegalLayout';

const contentTw = {
  section: 'scroll-mt-[100px]',
  h2: 'mt-10 mb-3 border-t border-[var(--color-border)] pt-10 scroll-mt-[100px] font-[var(--font-heading)] text-xl font-[800] leading-[var(--line-height-normal)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]',
  firstH2: 'mb-3 scroll-mt-[100px] font-[var(--font-heading)] text-xl font-[800] leading-[var(--line-height-normal)] tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]',
  p: 'mb-3.5 text-base leading-[var(--line-height-loose)] text-[var(--color-text-secondary)]',
  list: 'mb-3.5 list-disc pl-5',
  listItem: 'mb-1.5 text-base leading-[var(--line-height-loose)] text-[var(--color-text-secondary)]',
  notice: 'mb-10 rounded-[var(--radius-card)] border-2 border-[rgba(253,102,40,0.3)] bg-[rgba(253,102,40,0.07)] px-[26px] py-[22px]',
  noticeTitle: 'mb-2 text-sm font-[800] text-[var(--color-text-primary)]',
  noticeText: 'mb-0 text-[15px] leading-[var(--line-height-loose)] text-[var(--color-text-secondary)]',
  contactCard: 'rounded-[14px] bg-[var(--color-bg-cream)] px-6 py-5 text-[15px] leading-[var(--line-height-loose)] text-[var(--color-text-secondary)]',
  contactName: 'text-[var(--color-text-primary)]',
  contactLink: 'font-semibold text-[var(--color-brand-orange)] no-underline transition-colors hover:text-[var(--color-brand-orange-hover)]',
} as const;

const tocItems = [
  { id: 'what-is-this', label: 'What This Page Is' },
  { id: 'what-we-do', label: 'How We Protect Your Documents' },
  { id: 'what-we-dont', label: 'What We Do Not Do' },
  { id: 'deletion', label: 'Deletion on Request' },
  { id: 'signed-nda', label: 'The Signed NDA' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function Page() {
  return (
    <LegalLayout
      title="NDA & confidentiality"
      heroCopy="A plain-language explanation of how CrowdHarbor handles the documents founders share with us during a review."
      lastUpdated="June 2026"
      tocItems={tocItems}
    >
      <div className={contentTw.notice}>
        <div className={contentTw.noticeTitle}>This page is a summary, not the signed agreement</div>
        <p className={contentTw.noticeText}>
          This is a plain-language overview of our confidentiality practices. Founders who begin a review receive and sign a formal mutual non-disclosure agreement as part of the intake process. That signed document, not this page, is the binding legal agreement.
        </p>
      </div>

      <div id="what-is-this" className={contentTw.section}>
        <h2 className={contentTw.firstH2}>What This Page Is</h2>
        <p className={contentTw.p}>
          Sharing a pitch deck, financial model, and company documents with an outside reviewer is uncomfortable for most founders. This page explains, in plain terms, how CrowdHarbor treats what you share, so you can decide whether to apply with confidence.
        </p>
      </div>

      <div id="what-we-do" className={contentTw.section}>
        <h2 className={contentTw.h2}>How We Protect Your Documents</h2>
        <ul className={contentTw.list}>
          <li className={contentTw.listItem}>Materials you upload are used only to prepare your readiness review and are not shared outside the CrowdHarbor review team.</li>
          <li className={contentTw.listItem}>We do not share your documents, data, or company details with investors, platforms, accelerators, or any third party without your explicit consent.</li>
          <li className={contentTw.listItem}>We handle your data in line with GDPR requirements.</li>
          <li className={contentTw.listItem}>Access to submitted materials is limited to the people directly involved in producing your review.</li>
        </ul>
      </div>

      <div id="what-we-dont" className={contentTw.section}>
        <h2 className={contentTw.h2}>What We Do Not Do</h2>
        <p className={contentTw.p}>
          CrowdHarbor does not sell, license, or repurpose your materials. We do not use your business idea, financials, or company documents for any purpose other than producing your review.
        </p>
      </div>

      <div id="deletion" className={contentTw.section}>
        <h2 className={contentTw.h2}>Deletion on Request</h2>
        <p className={contentTw.p}>
          You can request deletion of your submitted materials and personal data at any time by contacting us. We will confirm once deletion is complete.
        </p>
      </div>

      <div id="signed-nda" className={contentTw.section}>
        <h2 className={contentTw.h2}>The Signed NDA</h2>
        <p className={contentTw.p}>
          Founders who move forward with a readiness review are provided a formal mutual non-disclosure agreement to sign before submitting confidential materials. That document sets out the binding legal terms and takes precedence over this page.
        </p>
      </div>

      <div id="contact" className={contentTw.section}>
        <h2 className={contentTw.h2}>Contact</h2>
        <p className={contentTw.p}>Questions about how your documents are handled? Reach out before you apply.</p>
        <div className={contentTw.contactCard}>
          <strong className={contentTw.contactName}>CrowdHarbor</strong>
          <br />
          Email:{' '}
          <a href="mailto:hello@crowdharbor.com" className={contentTw.contactLink}>
            hello@crowdharbor.com
          </a>
        </div>
      </div>
    </LegalLayout>
  );
}
