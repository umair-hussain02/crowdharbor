'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Shield, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { legalTw } from './legalTailwind';

const ease = [0.22, 1, 0.36, 1] as const;

interface TocItem {
  id: string;
  label: string;
}

interface LegalLayoutProps {
  title: string;
  heroCopy: string;
  lastUpdated: string;
  tocItems: readonly TocItem[];
  topCards?: React.ReactNode;
  children: React.ReactNode;
}

export function LegalLayout({ title, heroCopy, lastUpdated, tocItems, topCards, children }: LegalLayoutProps) {
  const [tocOpen, setTocOpen] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={legalTw.page}>
        {/* Hero */}
        <section className={legalTw.heroSection}>
          <div className={legalTw.heroContainer}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className={legalTw.eyebrow}
            >
              CrowdHarbor legal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.08 }}
              className={legalTw.heroTitle}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              className={legalTw.heroCopy}
            >
              {heroCopy}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className={legalTw.lastUpdated}
            >
              Last updated: {lastUpdated}
            </motion.div>
          </div>
        </section>

        <div className={legalTw.container}>
          {/* Table of contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className={legalTw.panel}
          >
            <button
              onClick={() => setTocOpen((open) => !open)}
              className={`${legalTw.tocButton} ${tocOpen ? legalTw.tocButtonOpen : ''}`}
            >
              <span className={legalTw.tocTitle}>Table of Contents</span>
              {tocOpen ? <ChevronUp size={16} className={legalTw.tocIcon} /> : <ChevronDown size={16} className={legalTw.tocIcon} />}
            </button>

            {tocOpen && (
              <div className={legalTw.tocList}>
                {tocItems.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`${legalTw.tocItem} group`}
                  >
                    <span className={legalTw.tocNumber}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={legalTw.tocLabel}>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Important notice card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.25 }}
            className={legalTw.notice}
          >
            <Shield size={20} className={legalTw.noticeIcon} />
            <div>
              <div className={legalTw.noticeTitle}>Important</div>
              <p className={legalTw.noticeText}>
                CrowdHarbor helps founders prepare before approaching funding sources. CrowdHarbor does not guarantee funding, act as an investor, broker, crowdfunding platform, legal advisor, tax advisor, financial advisor, or investment advisor.
              </p>
            </div>
          </motion.div>

          {/* Top cards (optional, e.g. Terms highlight cards) */}
          {topCards && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.28 }}
              className={legalTw.topCards}
            >
              {topCards}
            </motion.div>
          )}

          {/* Main content card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className={legalTw.contentCard}
          >
            {children}
          </motion.div>

          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className={legalTw.cta}
          >
            <h2 className={legalTw.ctaTitle}>Questions before starting?</h2>
            <p className={legalTw.ctaText}>
              Review how CrowdHarbor works or explore a sample report before submitting your company information.
            </p>
            <div className={legalTw.ctaActions}>
              <Link href="/how-it-works" className={legalTw.primaryLink}>
                See How It Works
                <ArrowRight size={14} />
              </Link>
              <Link href="/sample-report" className={legalTw.secondaryLink}>
                View Sample Report
              </Link>
            </div>
            <div className={legalTw.contactWrap}>
              <a href="mailto:hello@crowdharbor.com" className={legalTw.contactLink}>
                Contact CrowdHarbor →
              </a>
            </div>
          </motion.div>
        </div>
    </div>
  );
}
