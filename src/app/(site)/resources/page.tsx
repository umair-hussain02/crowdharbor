'use client';

import { useEffect } from 'react';
import { ResourcesHero } from '@/components/resources/ResourcesHero';
import { ResourcesFeatured } from '@/components/resources/ResourcesFeatured';
import { ResourcesGrid } from '@/components/resources/ResourcesGrid';
import { ResourcesChecklist } from '@/components/resources/ResourcesChecklist';
import { ResourcesGuides } from '@/components/resources/ResourcesGuides';
import { ResourcesTemplates } from '@/components/resources/ResourcesTemplates';
import { ResourcesNewsletter } from '@/components/resources/ResourcesNewsletter';
import { ResourcesCTA } from '@/components/resources/ResourcesCTA';

export default function Page() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* <ResourcesHero /> */}
        <ResourcesFeatured />
        <ResourcesGrid />
        <ResourcesChecklist />
        <ResourcesGuides />
        <ResourcesTemplates />
        <ResourcesNewsletter />
        <ResourcesCTA />
    </>
  );
}
