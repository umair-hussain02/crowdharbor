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
  { id: 'preparation-only', label: 'Preparation Guidance Only' },
  { id: 'no-funding-guarantee', label: 'No Funding Guarantee' },
  { id: 'not-investor', label: 'Not an Investor or Broker' },
  { id: 'no-advice', label: 'No Legal, Tax, Financial, or Investment Advice' },
  { id: 'educational', label: 'Educational Content' },
  { id: 'reports', label: 'Reports and Recommendations' },
  { id: 'capital-pathways', label: 'Capital Pathway Recommendations' },
  { id: 'third-party', label: 'Third-Party Platforms and Partners' },
  { id: 'founder-responsibility', label: 'Founder Responsibility' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function Page() {
  return (
    <LegalLayout
      title="Disclaimer"
      heroCopy="CrowdHarbor provides founder preparation guidance, funding-readiness review, material review, capital pathway strategy, and educational resources. This page explains important limits of our services and content."
      lastUpdated="June 2026"
      tocItems={tocItems}
    >
      <div className={contentTw.notice}>
        <div className={contentTw.noticeTitle}>Read this before using CrowdHarbor services</div>
        <p className={contentTw.noticeText}>
          CrowdHarbor helps founders prepare before approaching capital. CrowdHarbor does not guarantee funding, act as an investor or broker, or provide legal, tax, financial, or investment advice. All preparation services are educational and advisory in nature.
        </p>
      </div>

      <div id="preparation-only" className={contentTw.section}>
        <h2 className={contentTw.firstH2}>1. Preparation Guidance Only</h2>
        <p className={contentTw.p}>
          CrowdHarbor provides founder preparation services designed to help early-stage founders understand their readiness, improve their materials, clarify their funding narrative, and identify suitable capital pathways before approaching funding sources.
        </p>
        <p className={contentTw.p}>
          Our services are educational and advisory in nature. CrowdHarbor reviews are based on the information and materials submitted by the founder through our intake process. They represent our preparation-focused assessment and do not represent legal, financial, investment, or regulatory advice of any kind.
        </p>
        <p className={contentTw.p}>
          A CrowdHarbor review is not a guarantee of funding readiness, investor appeal, platform approval, or business viability. It is a structured preparation assessment designed to help founders identify areas for improvement before outreach.
        </p>
      </div>

      <div id="no-funding-guarantee" className={contentTw.section}>
        <h2 className={contentTw.h2}>2. No Funding Guarantee</h2>
        <p className={contentTw.p}>
          CrowdHarbor does not and cannot guarantee that any founder who uses our services will receive funding from any source, including investors, crowdfunding platforms, grant programs, accelerators, lenders, or any other capital source.
        </p>
        <p className={contentTw.p}>
          Funding decisions are made independently by the relevant capital sources and are influenced by many factors outside CrowdHarbor's scope, including investor preferences, market conditions, regulatory requirements, platform criteria, and competition.
        </p>
        <p className={contentTw.p}>
          Founders should not interpret CrowdHarbor readiness scores, pathway recommendations, action plans, or any other deliverable as a representation that funding will be secured.
        </p>
      </div>

      <div id="not-investor" className={contentTw.section}>
        <h2 className={contentTw.h2}>3. Not an Investor or Broker</h2>
        <p className={contentTw.p}>
          CrowdHarbor is not an investor, venture capital firm, angel investor, broker-dealer, crowdfunding platform, lending institution, or any other regulated financial entity.
        </p>
        <p className={contentTw.p}>
          CrowdHarbor does not introduce founders to investors or capital sources, facilitate transactions between founders and investors, manage funds, or arrange securities offerings. We do not act as a placement agent or broker of any kind.
        </p>
        <p className={contentTw.p}>
          If you require regulated broker, investment, or financial services, please consult a qualified and appropriately licensed professional in your jurisdiction.
        </p>
      </div>

      <div id="no-advice" className={contentTw.section}>
        <h2 className={contentTw.h2}>4. No Legal, Tax, Financial, or Investment Advice</h2>
        <p className={contentTw.p}>
          Nothing communicated by CrowdHarbor — including reports, emails, session recordings, guides, articles, templates, or any other content — constitutes legal, tax, financial, or investment advice.
        </p>
        <p className={contentTw.p}>Founders should consult qualified professionals before making decisions related to:</p>
        <ul className={contentTw.list}>
          <li className={contentTw.listItem}>Company structure, ownership, or equity arrangements</li>
          <li className={contentTw.listItem}>Securities law compliance or exemptions</li>
          <li className={contentTw.listItem}>Tax planning or filing</li>
          <li className={contentTw.listItem}>Regulatory compliance in any jurisdiction</li>
          <li className={contentTw.listItem}>Investment decisions or financial planning</li>
          <li className={contentTw.listItem}>Contractual obligations related to fundraising</li>
        </ul>
        <p className={contentTw.p}>CrowdHarbor preparation guidance does not substitute for professional legal, financial, or regulatory counsel.</p>
      </div>

      <div id="educational" className={contentTw.section}>
        <h2 className={contentTw.h2}>5. Educational Content</h2>
        <p className={contentTw.p}>
          Articles, guides, checklists, templates, and other content published through CrowdHarbor's Resources section are for general educational purposes only.
        </p>
        <p className={contentTw.p}>
          Educational content is designed to help founders understand preparation concepts, common funding requirements, and readiness areas. This content does not constitute legal, financial, or investment advice and may not apply to every founder's specific situation, industry, or jurisdiction.
        </p>
        <p className={contentTw.p}>Founders should use educational content as a starting point for their own research and preparation, not as a substitute for professional guidance.</p>
      </div>

      <div id="reports" className={contentTw.section}>
        <h2 className={contentTw.h2}>6. Reports and Recommendations</h2>
        <p className={contentTw.p}>
          CrowdHarbor readiness reports and action plans are based on information provided by the founder at the time of the intake submission. The quality and accuracy of the report depends in part on the completeness and accuracy of the information provided.
        </p>
        <p className={contentTw.p}>
          Reports represent preparation assessments, not business valuations, investment opinions, or guarantees of outcome. Readiness scores are relative preparation indicators, not investment grades or creditworthiness assessments.
        </p>
        <p className={contentTw.p}>
          Recommendations contained in CrowdHarbor reports are preparation suggestions based on common funding source expectations. Founders should exercise their own judgment and seek professional advice before acting on any recommendation.
        </p>
      </div>

      <div id="capital-pathways" className={contentTw.section}>
        <h2 className={contentTw.h2}>7. Capital Pathway Recommendations</h2>
        <p className={contentTw.p}>
          CrowdHarbor may suggest capital pathways — such as crowdfunding, angel investment, grants, or accelerators — based on the founder's stage, traction, goals, and materials. These suggestions are preparation-oriented guidance only.
        </p>
        <p className={contentTw.p}>
          Capital pathway recommendations do not constitute investment advice or brokerage services. They are not an assessment of whether a specific platform, investor, or program will accept or fund your company. They are designed to help founders understand which pathways may be worth exploring based on their current preparation level.
        </p>
        <p className={contentTw.p}>Founders are responsible for independently researching, evaluating, and engaging with any capital pathway or funding source. CrowdHarbor does not endorse specific investors, platforms, or programs.</p>
      </div>

      <div id="third-party" className={contentTw.section}>
        <h2 className={contentTw.h2}>8. Third-Party Platforms and Partners</h2>
        <p className={contentTw.p}>
          CrowdHarbor may reference or discuss third-party platforms, investment programs, grant sources, accelerators, or other capital-related services in its reports, guides, and educational content.
        </p>
        <p className={contentTw.p}>
          Any mention of a third-party platform or program is for illustrative or educational purposes only and does not constitute an endorsement, referral, or recommendation. CrowdHarbor has no affiliation with, financial relationship with, or oversight of any third-party platform unless explicitly stated otherwise.
        </p>
        <p className={contentTw.p}>Founders should conduct independent due diligence before engaging with any third-party platform, program, or service provider.</p>
      </div>

      <div id="founder-responsibility" className={contentTw.section}>
        <h2 className={contentTw.h2}>9. Founder Responsibility</h2>
        <p className={contentTw.p}>Founders using CrowdHarbor services remain solely responsible for:</p>
        <ul className={contentTw.list}>
          <li className={contentTw.listItem}>All business, legal, financial, and fundraising decisions</li>
          <li className={contentTw.listItem}>The accuracy of information submitted through the intake form and any uploaded materials</li>
          <li className={contentTw.listItem}>Ensuring compliance with applicable securities laws, regulations, and platform requirements</li>
          <li className={contentTw.listItem}>All communications, agreements, and relationships with investors, platforms, grant bodies, and other capital sources</li>
          <li className={contentTw.listItem}>Any consequences arising from fundraising activities undertaken after completing a CrowdHarbor review</li>
        </ul>
        <p className={contentTw.p}>CrowdHarbor provides preparation support. Founders make their own decisions and bear responsibility for the outcomes of those decisions.</p>
      </div>

      <div id="contact" className={contentTw.section}>
        <h2 className={contentTw.h2}>10. Contact</h2>
        <p className={contentTw.p}>If you have questions about this Disclaimer or the scope of CrowdHarbor services, please contact us:</p>
        <div className={contentTw.contactCard}>
          <strong className={contentTw.contactName}>CrowdHarbor</strong>
          <br />
          Email:{' '}
          <a href="mailto:hello@crowdharbor.com" className={contentTw.contactLink}>
            hello@crowdharbor.com
          </a>
          <br />
          Website:{' '}
          <a href="https://crowdharbor.com" className={contentTw.contactLink}>
            crowdharbor.com
          </a>
        </div>
      </div>
    </LegalLayout>
  );
}
