'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { siteNavigation } from '@/content/site';
import Image from 'next/image';

const navLinks = siteNavigation.map((link) => ({
  ...link,
  type: link.href.startsWith('#') ? ('anchor' as const) : ('route' as const),
}));

const headerTw = {
  headerBase:
    'fixed top-0 left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] md:w-[80%] mt-4 sm:mt-5 flex items-center rounded-2xl border border-[var(--color-border)] bg-[rgba(245,245,250,0.60)] py-3 backdrop-blur-xl transition-all duration-300 z-50',
  headerDefault:
    'shadow-none',
  headerScrolled:
    'bg-[rgba(245,245,228,0.60)] shadow-[0_8px_30px_rgba(0,0,0,0.08)]',

  container:
    'mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-6',

  logo:
    'font-[var(--font-heading)] text-xl font-[800] tracking-[-0.02em] text-[var(--color-text-primary)] no-underline transition-colors duration-200 hover:text-[var(--color-brand-orange)]',

  desktopNav:
    'hidden items-center gap-9 md:flex',

  navLink:
    'flex items-center border-0 bg-transparent p-0 font-[var(--font-body)] text-[15px] font-medium text-[var(--color-text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--color-text-primary)]',
  navLinkActive:
    'font-semibold text-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)]',

  actions:
    'flex items-center gap-3 sm:gap-4',

  cta:
    'hidden items-center gap-2 rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] px-5 py-2.5 font-[var(--font-body)] text-sm font-semibold text-[var(--color-text-on-dark)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--color-brand-orange-hover)] md:inline-flex',

  mobileToggle:
    'flex cursor-pointer items-center justify-center rounded-[var(--radius-pill)] border-0 bg-transparent p-2 text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-[var(--color-neutral-tint)] md:hidden',

  mobilePanel:
    'fixed left-1/2 top-[78px] sm:top-[86px] z-[999] w-[92%] sm:w-[90%] -translate-x-1/2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-cream)]/95 p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:hidden',

  mobileNav:
    'flex flex-col gap-2',

  mobileLink:
    'block border-b border-[var(--color-border)] py-3 font-[var(--font-body)] text-base font-semibold text-[var(--color-text-primary)] no-underline transition-colors duration-200 hover:text-[var(--color-brand-orange)]',

  mobileButton:
    'w-full cursor-pointer border-0 border-b border-[var(--color-border)] bg-transparent py-3 text-left font-[var(--font-body)] text-base font-semibold text-[var(--color-text-primary)] transition-colors duration-200 hover:text-[var(--color-brand-orange)]',

  mobileCta:
    'mt-2 w-full cursor-pointer rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] px-6 py-3.5 font-[var(--font-body)] text-base font-semibold text-[var(--color-text-on-dark)] transition-colors duration-200 hover:bg-[var(--color-brand-orange-hover)]',
} as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);

    if (pathname !== '/') {
      router.push('/');

      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);

      return;
    }

    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleReadinessClick = () => {
    setMobileOpen(false);
    router.push('/intake');
  };

  return (
    <>
      <header
        className={`${headerTw.headerBase} ${
          scrolled ? headerTw.headerScrolled : headerTw.headerDefault
        }`}
      >
        <div className={headerTw.container}>
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
              <Image
                src="/logov4.jpg"
                alt="CrowdHarbor"
                width={55}
                height={55}
                className="hidden md:block"
              />
              {/* Mobile logo (smaller size) */}
              <Image
                src="/logov4.jpg"
                alt="CrowdHarbor"
                width={40}
                height={40}
                className="block md:hidden"
              />
            </Link>

          {/* Desktop nav */}
          <nav className={headerTw.desktopNav}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.type === 'route') {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`${headerTw.navLink} ${
                      isActive ? headerTw.navLinkActive : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleAnchorClick(link.href)}
                  className={headerTw.navLink}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className={headerTw.actions}>
            <button
              type="button"
              onClick={handleReadinessClick}
              className={headerTw.cta}
            >
              Check Your Readiness
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              className={headerTw.mobileToggle}
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className={headerTw.mobilePanel}
          >
            <nav className={headerTw.mobileNav}>
              {navLinks.map((link) => {
                if (link.type === 'route') {
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={headerTw.mobileLink}
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleAnchorClick(link.href)}
                    className={headerTw.mobileButton}
                  >
                    {link.label}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={handleReadinessClick}
                className={headerTw.mobileCta}
              >
                Check Your Readiness
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}