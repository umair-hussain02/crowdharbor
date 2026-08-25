'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { FounderPainSection } from '@/components/sections/FounderPainSection';
import { WhyFundingFailsSection } from '@/components/sections/WhyFundingFailsSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { WhatWeReviewSection } from '@/components/sections/WhatWeReviewSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { CapitalPathwaySection } from '@/components/sections/CapitalPathwaySection';
import { SampleReportSection } from '@/components/sections/SampleReportSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FounderOutcomesSection } from '@/components/sections/FounderOutcomesSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';

export default function Page() {
  return (
    <>
      <HeroSection />
        <FounderPainSection />
        <WhyFundingFailsSection />
        <SolutionSection />
        <WhatWeReviewSection />
        <HowItWorksSection />
        <CapitalPathwaySection />
        <SampleReportSection />
        {/* <PricingSection /> */}
        {/* <FounderOutcomesSection /> */}
        <TrustSection />
        <FAQSection />
        <FinalCTASection />
    </>
  );
}
