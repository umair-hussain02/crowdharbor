'use client';

import { useEffect } from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutFounders } from '@/components/about/AboutFounders';
import { AboutWhyExists } from '@/components/about/AboutWhyExists';
import { AboutProblem } from '@/components/about/AboutProblem';
import { AboutBelief } from '@/components/about/AboutBelief';
import { AboutWhatWeDo } from '@/components/about/AboutWhatWeDo';
import { AboutWhoWeHelp } from '@/components/about/AboutWhoWeHelp';
import { AboutDifferent } from '@/components/about/AboutDifferent';
import { AboutFramework } from '@/components/about/AboutFramework';
import { AboutManualReview } from '@/components/about/AboutManualReview';
import { AboutTrust } from '@/components/about/AboutTrust';
import { AboutFuture } from '@/components/about/AboutFuture';
import { AboutTeamNote } from '@/components/about/AboutTeamNote';
import { AboutFinalCTA } from '@/components/about/AboutFinalCTA';

export default function Page() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <AboutHero />
        <AboutFounders />
        <AboutWhyExists />
        <AboutProblem />
        <AboutBelief />
        <AboutWhatWeDo />
        <AboutWhoWeHelp />
        <AboutDifferent />
        <AboutFramework />
        <AboutManualReview />
        <AboutTrust />
        <AboutFuture />
        <AboutTeamNote />
        <AboutFinalCTA />
    </>
  );
}
