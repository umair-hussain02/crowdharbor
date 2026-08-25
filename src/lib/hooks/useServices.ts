import { useEffect, useState } from 'react';

export type PublicService = {
  name: string;
  slug: string;
  description: string;
  price: number | null;
  currency: string;
  isStartingPrice: boolean;
};

export const SERVICE_SLUGS = {
  review: 'funding-readiness-review',
  sprint: 'capital-pathway-sprint',
  program: 'fundraising-preparation-program',
} as const;

// Used by every pricing-page component that displays a service price — fetched
// once per component since there's no shared app-wide data layer yet.
export function useServices() {
  const [services, setServices] = useState<PublicService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch('/api/services');
        const result = await response.json().catch(() => null);
        if (!cancelled && response.ok && result?.items) {
          setServices(result.items);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { services, loading };
}

export function findService(services: PublicService[], slug: string) {
  return services.find((s) => s.slug === slug);
}

const CURRENCY_SYMBOLS: Record<string, string> = { EUR: '€', GBP: '£', USD: '$' };

// Falls back to the given static string until the real service has loaded
// (or if the fetch fails), so the public page never shows a blank price.
export function formatServicePrice(service: PublicService | undefined, fallback: string): string {
  if (!service) return fallback;
  if (service.price === null) return 'Custom';

  const symbol = CURRENCY_SYMBOLS[service.currency] ?? `${service.currency} `;
  const amount = service.price.toLocaleString('en-US');
  return service.isStartingPrice ? `From ${symbol}${amount}` : `${symbol}${amount}`;
}

// Some sections (e.g. the home page teaser) always frame every price as a
// starting point ("From €X"), regardless of the per-service isStartingPrice
// flag used on the actual pricing page — this keeps that established copy style.
export function formatServicePriceFrom(service: PublicService | undefined, fallback: string): string {
  if (!service) return fallback;
  if (service.price === null) return 'Custom';

  const symbol = CURRENCY_SYMBOLS[service.currency] ?? `${service.currency} `;
  const amount = service.price.toLocaleString('en-US');
  return `From ${symbol}${amount}`;
}
