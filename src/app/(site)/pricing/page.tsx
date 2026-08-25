'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics/track';
import { PricingHero } from '@/components/pricing/PricingHero';
import { PricingCards } from '@/components/pricing/PricingCards';
import { PricingSprintExplain } from '@/components/pricing/PricingSprintExplain';
import { PricingPackageBreakdown } from '@/components/pricing/PricingPackageBreakdown';
import { PricingComparison } from '@/components/pricing/PricingComparison';
import { PricingAfterChoose } from '@/components/pricing/PricingAfterChoose';
import { PricingDecisionGuide } from '@/components/pricing/PricingDecisionGuide';
import { PricingPaymentNotes } from '@/components/pricing/PricingPaymentNotes';
import { ServicesWorkshops } from '@/components/services/ServicesWorkshops';
import { ServicesTrust } from '@/components/services/ServicesTrust';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingFinalCTA } from '@/components/pricing/PricingFinalCTA';
import { ServicesDecisionGuide } from '@/components/services/ServicesDecisionGuide';
import { ServicesFinalCTA } from '@/components/services/ServicesFinalCTA';

export default function Page() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { trackEvent('pricing_view'); }, []);

  return (
    <>
      <PricingHero />
        <PricingCards />
        <PricingSprintExplain />
        <PricingPackageBreakdown />
        <PricingComparison />
        <PricingAfterChoose />
        <ServicesDecisionGuide />
        <PricingPaymentNotes />
        <ServicesWorkshops />
        <ServicesTrust />
        <PricingFAQ />
        <ServicesFinalCTA />
    </>
  );
}
