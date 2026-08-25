'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';
import { WebVitalsReporter } from '@/components/analytics/WebVitalsReporter';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnalyticsTracker />
      <WebVitalsReporter />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
