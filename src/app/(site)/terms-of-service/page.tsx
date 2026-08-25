'use client';

import { ShieldCheck, AlertCircle, User } from 'lucide-react';
import { LegalLayout } from '@/components/legal/LegalLayout';

const h2: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 800,
  color: '#000000',
  letterSpacing: '-0.02em',
  marginBottom: '12px',
  marginTop: '40px',
  paddingTop: '40px',
  borderTop: '1px solid #E0E0E0',
  scrollMarginTop: '100px',
};

const firstH2: React.CSSProperties = {
  ...h2,
  marginTop: 0,
  paddingTop: 0,
  borderTop: 'none',
};

const p: React.CSSProperties = {
  fontSize: '16px',
  color: '#444444',
  lineHeight: 1.75,
  marginBottom: '14px',
};

const ul: React.CSSProperties = {
  paddingLeft: '20px',
  marginBottom: '14px',
};

const li: React.CSSProperties = {
  fontSize: '16px',
  color: '#444444',
  lineHeight: 1.75,
  marginBottom: '6px',
};

const tocItems = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'about', label: 'About CrowdHarbor' },
  { id: 'services', label: 'Services' },
  { id: 'no-funding-guarantee', label: 'No Funding Guarantee' },
  { id: 'no-broker', label: 'No Broker, Investor, or Advisor Relationship' },
  { id: 'user-responsibilities', label: 'User Responsibilities' },
  { id: 'payments', label: 'Payments' },
  { id: 'refunds', label: 'Refunds' },
  { id: 'reports', label: 'Reports and Deliverables' },
  { id: 'scheduling', label: 'Scheduling and Sessions' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'submitted-materials', label: 'Founder-Submitted Materials' },
  { id: 'educational', label: 'Educational Content' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'third-party', label: 'Third-Party Tools and Links' },
  { id: 'service-changes', label: 'Service Changes' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'updates', label: 'Updates to Terms' },
  { id: 'contact', label: 'Contact' },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Preparation Service',
    desc: 'CrowdHarbor helps founders prepare before approaching capital. Our services are educational and advisory in nature.',
  },
  {
    icon: AlertCircle,
    title: 'No Funding Guarantee',
    desc: 'CrowdHarbor does not promise funding, investment, platform approval, accelerator acceptance, or any specific business results.',
  },
  {
    icon: User,
    title: 'Founder Responsibility',
    desc: 'Founders remain responsible for their own business, legal, financial, and fundraising decisions.',
  },
];

const TopCards = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}
    className="grid-cols-1 md:grid-cols-3"
  >
    {highlights.map(h => {
      const Icon = h.icon;
      return (
        <div key={h.title} style={{
          background: '#FFFFFF',
          border: '1.5px solid #E0E0E0',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(253,102,40,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={18} color="#FD6628" />
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#000' }}>{h.title}</div>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.65, margin: 0 }}>{h.desc}</p>
        </div>
      );
    })}
  </div>
);

export default function Page() {
  return (
    <LegalLayout
      title="Terms of Service"
      heroCopy="These terms explain the rules and conditions for using CrowdHarbor's website, intake forms, reports, services, payment flows, and founder preparation support."
      lastUpdated="June 2026"
      tocItems={tocItems}
      topCards={<TopCards />}
    >
      <div id="acceptance">
        <h2 style={firstH2}>1. Acceptance of Terms</h2>
        <p style={p}>
          By accessing the CrowdHarbor website, submitting an intake form, purchasing a service, or receiving a report or session from CrowdHarbor, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>
        <p style={p}>
          These terms constitute a legal agreement between you and CrowdHarbor. We recommend reading them fully before submitting your company information or completing a purchase.
        </p>
      </div>

      <div id="about">
        <h2 style={h2}>2. About CrowdHarbor</h2>
        <p style={p}>
          CrowdHarbor is a founder preparation and funding-readiness advisory service. We help early-stage founders prepare their company, materials, narrative, and capital pathway strategy before approaching funding sources.
        </p>
        <p style={p}>
          CrowdHarbor is not an investor, broker, crowdfunding platform, financial institution, legal advisor, tax advisor, or investment advisor. Our services are educational and advisory in nature.
        </p>
      </div>

      <div id="services">
        <h2 style={h2}>3. Services</h2>
        <p style={p}>CrowdHarbor offers founder preparation services including but not limited to:</p>
        <ul style={ul}>
          <li style={li}><strong>Funding Readiness Review</strong> — a written assessment of company readiness across key preparation areas</li>
          <li style={li}><strong>Capital Pathway Sprint</strong> — an intensive preparation package including review, strategy session, and action plan</li>
          <li style={li}><strong>Standalone document or material review</strong> — targeted review of pitch decks, financial models, or data room materials</li>
          <li style={li}><strong>Educational resources</strong> — guides, checklists, articles, and templates published through our Resources section</li>
        </ul>
        <p style={p}>
          The specific deliverables for each service are described at the time of purchase. CrowdHarbor reserves the right to adjust service offerings, pricing, and scope over time.
        </p>
      </div>

      <div id="no-funding-guarantee">
        <h2 style={h2}>4. No Funding Guarantee</h2>
        <p style={p}>
          CrowdHarbor does not guarantee that any founder who uses our services will receive funding from any source. Our services are designed to improve preparation and readiness, not to guarantee outcomes.
        </p>
        <p style={p}>
          Funding decisions are made solely by investors, crowdfunding platforms, grant bodies, accelerators, and other capital sources. CrowdHarbor has no control over, affiliation with, or influence over those decisions.
        </p>
        <p style={p}>
          Founders should not interpret any CrowdHarbor report, recommendation, score, or communication as a guarantee of funding readiness, investor interest, platform approval, or fundraising success.
        </p>
      </div>

      <div id="no-broker">
        <h2 style={h2}>5. No Broker, Investor, or Advisor Relationship</h2>
        <p style={p}>
          CrowdHarbor does not act as a broker-dealer, registered investment advisor, financial planner, legal advisor, or tax advisor. Nothing in our reports, sessions, communications, or educational content constitutes financial, legal, tax, or investment advice.
        </p>
        <p style={p}>
          Founders should consult qualified legal, financial, and tax professionals before making decisions related to fundraising, company structure, securities, or regulatory compliance.
        </p>
        <p style={p}>
          Using CrowdHarbor services does not create a fiduciary, advisory, or broker relationship between CrowdHarbor and the founder.
        </p>
      </div>

      <div id="user-responsibilities">
        <h2 style={h2}>6. User Responsibilities</h2>
        <p style={p}>By using CrowdHarbor services, you agree to:</p>
        <ul style={ul}>
          <li style={li}>Provide accurate information in the intake form and throughout the service process</li>
          <li style={li}>Only upload materials that you have the right to share</li>
          <li style={li}>Not use CrowdHarbor services for any unlawful purpose</li>
          <li style={li}>Not submit false, misleading, or fraudulent information</li>
          <li style={li}>Not attempt to reverse-engineer, copy, or redistribute CrowdHarbor reports or proprietary materials</li>
          <li style={li}>Respect the confidentiality of any communications between you and CrowdHarbor</li>
        </ul>
      </div>

      <div id="payments">
        <h2 style={h2}>7. Payments</h2>
        <p style={p}>
          Payments for CrowdHarbor services are processed through a third-party payment processor. By completing a purchase, you agree to the pricing and payment terms displayed at checkout.
        </p>
        <p style={p}>
          All prices are listed in the applicable currency at checkout. CrowdHarbor reserves the right to update pricing at any time. Price changes will not affect purchases already completed.
        </p>
        <p style={p}>
          Incomplete payments, failed transactions, or disputed charges may result in delays in service delivery.
        </p>
      </div>

      <div id="refunds">
        <h2 style={h2}>8. Refunds</h2>
        <p style={p}>
          Refund eligibility depends on the service purchased and the stage of service delivery at the time of the request.
        </p>
        <ul style={ul}>
          <li style={li}>Refund requests submitted before work has begun may be eligible for a full refund.</li>
          <li style={li}>Refund requests submitted after a report has been delivered are generally not eligible for a full refund, but partial credits may be considered at our discretion.</li>
          <li style={li}>Sprint packages that have included sessions or calls are generally non-refundable after those sessions have been completed.</li>
        </ul>
        <p style={p}>
          To request a refund, contact us at hello@crowdharbor.com with your order details. We will review each request individually.
        </p>
      </div>

      <div id="reports">
        <h2 style={h2}>9. Reports and Deliverables</h2>
        <p style={p}>
          CrowdHarbor reports are founder preparation documents. They reflect our assessment of the information submitted through your intake form and any materials provided for review.
        </p>
        <p style={p}>
          Reports are based on information provided by the founder. The accuracy and completeness of the report depends in part on the accuracy and completeness of the information submitted. CrowdHarbor is not responsible for inaccuracies resulting from incomplete or incorrect intake submissions.
        </p>
        <p style={p}>
          Reports are for the personal use of the submitting founder only. You may not distribute, publish, or commercialize CrowdHarbor reports without written permission.
        </p>
      </div>

      <div id="scheduling">
        <h2 style={h2}>10. Scheduling and Sessions</h2>
        <p style={p}>
          Certain CrowdHarbor service packages include scheduled preparation calls or sessions. Scheduling details will be provided after purchase.
        </p>
        <p style={p}>
          Founders are expected to attend scheduled sessions at the agreed time. Missed sessions or late cancellations may result in forfeiture of that session depending on the notice provided. We ask for at least 48 hours notice for rescheduling where possible.
        </p>
      </div>

      <div id="ip">
        <h2 style={h2}>11. Intellectual Property</h2>
        <p style={p}>
          All content, templates, frameworks, methodologies, and reports created by CrowdHarbor are the intellectual property of CrowdHarbor. Founders receive a personal, non-transferable license to use their report for their own preparation purposes.
        </p>
        <p style={p}>
          CrowdHarbor educational content, guides, and articles published on our website are the property of CrowdHarbor and may not be reproduced, republished, or redistributed without permission.
        </p>
      </div>

      <div id="submitted-materials">
        <h2 style={h2}>12. Founder-Submitted Materials</h2>
        <p style={p}>
          Documents and materials submitted by founders for review remain the intellectual property of the founder. By submitting materials, you grant CrowdHarbor a limited license to review and analyze those materials for the purpose of delivering your requested service.
        </p>
        <p style={p}>
          CrowdHarbor does not share submitted materials with third parties, investors, platforms, or other capital sources. Materials are used solely for service delivery.
        </p>
      </div>

      <div id="educational">
        <h2 style={h2}>13. Educational Content</h2>
        <p style={p}>
          Articles, guides, checklists, and templates published through the CrowdHarbor Resources section are for general educational purposes only. They do not constitute legal, financial, tax, or investment advice.
        </p>
        <p style={p}>
          Educational content represents general preparation guidance and may not apply to every founder's specific situation, jurisdiction, or circumstances. Founders should seek qualified professional advice where needed.
        </p>
      </div>

      <div id="liability">
        <h2 style={h2}>14. Limitation of Liability</h2>
        <p style={p}>
          To the maximum extent permitted by applicable law, CrowdHarbor shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use of our services, reports, sessions, or educational content.
        </p>
        <p style={p}>
          CrowdHarbor's total liability for any claim arising from our services shall not exceed the amount paid by the founder for the specific service from which the claim arose.
        </p>
        <p style={p}>
          CrowdHarbor does not guarantee any particular outcome from the use of our services, including fundraising success, investor interest, or business growth.
        </p>
      </div>

      <div id="third-party">
        <h2 style={h2}>15. Third-Party Tools and Links</h2>
        <p style={p}>
          CrowdHarbor may use third-party tools for payment processing, scheduling, analytics, and email delivery. We are not responsible for the privacy practices or terms of these third parties.
        </p>
        <p style={p}>
          Our website may include links to external resources, platforms, or services. These links are provided for convenience and do not constitute an endorsement of those platforms or their services.
        </p>
      </div>

      <div id="service-changes">
        <h2 style={h2}>16. Service Changes</h2>
        <p style={p}>
          CrowdHarbor reserves the right to modify, update, or discontinue services, pricing, or features at any time. We will make reasonable efforts to communicate significant changes to active clients.
        </p>
      </div>

      <div id="termination">
        <h2 style={h2}>17. Termination</h2>
        <p style={p}>
          CrowdHarbor reserves the right to decline or discontinue service to any founder who violates these Terms of Service, submits fraudulent information, or engages in conduct that is harmful to CrowdHarbor or its team.
        </p>
        <p style={p}>
          Founders may discontinue use of CrowdHarbor services at any time. Refund eligibility in such cases is governed by the Refunds section above.
        </p>
      </div>

      <div id="governing-law">
        <h2 style={h2}>18. Governing Law</h2>
        <p style={p}>
          These Terms of Service are governed by applicable law. Any disputes arising from these terms or CrowdHarbor services will be resolved in accordance with applicable legal jurisdiction. Founders agree to attempt good-faith resolution of disputes before pursuing formal legal remedies.
        </p>
      </div>

      <div id="updates">
        <h2 style={h2}>19. Updates to Terms</h2>
        <p style={p}>
          CrowdHarbor may update these Terms of Service from time to time. Updated terms will be published on this page with a revised "Last updated" date. Continued use of CrowdHarbor services after updates constitutes acceptance of the revised terms.
        </p>
        <p style={p}>
          We recommend reviewing these terms periodically, particularly before completing a new purchase or submitting a new intake form.
        </p>
      </div>

      <div id="contact">
        <h2 style={h2}>20. Contact</h2>
        <p style={p}>
          Questions about these Terms of Service should be directed to:
        </p>
        <div style={{
          background: '#F5F5EE',
          borderRadius: '14px',
          padding: '20px 24px',
          fontSize: '15px',
          color: '#444',
          lineHeight: 1.75,
        }}>
          <strong style={{ color: '#000' }}>CrowdHarbor</strong><br />
          Email: <a href="mailto:hello@crowdharbor.com" style={{ color: '#FD6628', textDecoration: 'none', fontWeight: 600 }}>hello@crowdharbor.com</a><br />
          Website: <a href="https://crowdharbor.com" style={{ color: '#FD6628', textDecoration: 'none', fontWeight: 600 }}>crowdharbor.com</a>
        </div>
      </div>
    </LegalLayout>
  );
}
