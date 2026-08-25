'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics/track';
import { SRHero } from '@/components/sample-report/SRHero';
import { SROverview } from '@/components/sample-report/SROverview';
import { SRFounderProfile } from '@/components/sample-report/SRFounderProfile';
import { SRScore } from '@/components/sample-report/SRScore';
import { SRCategoryBreakdown } from '@/components/sample-report/SRCategoryBreakdown';
import { SRStrengthsWeaknesses } from '@/components/sample-report/SRStrengthsWeaknesses';
import { SRBlockers } from '@/components/sample-report/SRBlockers';
import { SRPitchReview } from '@/components/sample-report/SRPitchReview';
import { SRFinancialReview } from '@/components/sample-report/SRFinancialReview';
import { SRDataRoom } from '@/components/sample-report/SRDataRoom';
import { SRPathway } from '@/components/sample-report/SRPathway';
import { SRActionPlan } from '@/components/sample-report/SRActionPlan';
import { SRDecisions } from '@/components/sample-report/SRDecisions';
import { SROfferDepth } from '@/components/sample-report/SROfferDepth';
import { SRTrust } from '@/components/sample-report/SRTrust';
import { SRFAQ } from '@/components/sample-report/SRFAQ';
import { SRFinalCTA } from '@/components/sample-report/SRFinalCTA';

export default function Page() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { trackEvent('sample_report_view'); }, []);

  return (
    <>
      <SRHero />
        <SROverview />
        <SRFounderProfile />
        <SRScore />
        <SRCategoryBreakdown />
        <SRStrengthsWeaknesses />
        <SRBlockers />
        <SRPitchReview />
        <SRFinancialReview />
        <SRDataRoom />
        <SRPathway />
        <SRActionPlan />
        <SRDecisions />
        <SROfferDepth />
        <SRTrust />
        <SRFAQ />
        <SRFinalCTA />
    </>
  );
}
