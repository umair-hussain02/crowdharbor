import type { Metadata } from 'next';
import '@/styles/index.css';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-bg-white)] text-[var(--color-text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
