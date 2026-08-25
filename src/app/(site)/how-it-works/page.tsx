'use client';

import { useEffect } from 'react';
import { HIWHero } from '@/components/how-it-works/HIWHero';
import { HIWProcessOverview } from '@/components/how-it-works/HIWProcessOverview';
import { HIWStep1, HIWStep2, HIWStep3, HIWStep4, HIWStep5 } from '@/components/how-it-works/HIWSteps';
import { HIWWhatYouReceive } from '@/components/how-it-works/HIWWhatYouReceive';
import { HIWHumanVsAutomated } from '@/components/how-it-works/HIWHumanVsAutomated';
import { HIWTimeline } from '@/components/how-it-works/HIWTimeline';
import { HIWProcessTrust } from '@/components/how-it-works/HIWProcessTrust';
import { HIWFAQ } from '@/components/how-it-works/HIWFAQ';
import { HIWFinalCTA } from '@/components/how-it-works/HIWFinalCTA';

export default function Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HIWHero />
        <HIWProcessOverview />
        <HIWStep1 />
        <HIWStep2 />
        <HIWStep3 />
        <HIWStep4 />
        <HIWStep5 />
        <HIWWhatYouReceive />
        <HIWHumanVsAutomated />
        <HIWTimeline />
        <HIWProcessTrust />
        <HIWFAQ />
        <HIWFinalCTA />
    </>
  );
}
