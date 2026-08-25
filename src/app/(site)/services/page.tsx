'use client';

import { useEffect } from 'react';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServicesOverview } from '@/components/services/ServicesOverview';
import { ServicesOffer1, ServicesOffer2, ServicesOffer3 } from '@/components/services/ServicesOffers';
import { ServicesComparison } from '@/components/services/ServicesComparison';
import { ServicesDecisionGuide } from '@/components/services/ServicesDecisionGuide';
import { ServicesCorePillars } from '@/components/services/ServicesCorePillars';
import { ServicesWorkshops } from '@/components/services/ServicesWorkshops';
import { ServicesTrust } from '@/components/services/ServicesTrust';
import { ServicesFAQ } from '@/components/services/ServicesFAQ';
import { ServicesFinalCTA } from '@/components/services/ServicesFinalCTA';

export default function Page() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <ServicesHero />
        <ServicesOverview />
        <ServicesOffer1 />
        <ServicesOffer2 />
        <ServicesOffer3 />
        <ServicesComparison />
        <ServicesDecisionGuide />
        <ServicesCorePillars />
        <ServicesWorkshops />
        <ServicesTrust />
        <ServicesFAQ />
        <ServicesFinalCTA />
    </>
  );
}
