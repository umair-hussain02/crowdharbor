'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics/track';

export function ArticleViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent('blog_view', { slug });
  }, [slug]);

  return null;
}
