'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics/track';

// Mounted once in AppShell — fires a page_view on first load and on every
// client-side route change across the whole public site.
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent('page_view');
  }, [pathname]);

  return null;
}
