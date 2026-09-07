'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { TrustStripSection } from '@/components/sections/TrustStripSection';
import { FounderPainSection } from '@/components/sections/FounderPainSection';
import { WhyFundingFailsSection } from '@/components/sections/WhyFundingFailsSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { TheReportSection } from '@/components/sections/TheReportSection';
import { WhyDifferentSection } from '@/components/sections/WhyDifferentSection';
import { CapitalPathwaySection } from '@/components/sections/CapitalPathwaySection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { VisionSection } from '@/components/sections/VisionSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';

export default function Page() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <FounderPainSection />
      <WhyFundingFailsSection />
      <HowItWorksSection />
      <TheReportSection />
      <WhyDifferentSection />
      <CapitalPathwaySection />
      <PricingSection />
      <TrustSection />
      <VisionSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
