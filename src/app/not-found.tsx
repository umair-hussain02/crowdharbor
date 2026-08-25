'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Activity, FileText, Layers } from 'lucide-react';
import { AppShell } from './app-shell';

const ease = [0.22, 1, 0.36, 1] as const;

const helpCards = [
  {
    icon: Activity,
    title: 'Check Funding Readiness',
    desc: 'Start the founder intake process.',
    href: '/intake',
  },
  {
    icon: FileText,
    title: 'View Sample Report',
    desc: 'See what a readiness report looks like.',
    href: '/sample-report',
  },
  {
    icon: Layers,
    title: 'Compare Services',
    desc: 'Choose the right preparation path.',
    href: '/services',
  },
];

export default function NotFound() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <AppShell>
    <div style={{ fontFamily: 'Manrope, sans-serif', background: '#F5F5EE', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ maxWidth: '680px', width: '100%' }}>

          {/* Main 404 card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '30px',
              padding: '60px 52px',
              textAlign: 'center',
              boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
              marginBottom: '24px',
            }}
            className="px-6 md:px-14"
          >
            {/* 404 label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
              style={{
                display: 'inline-block',
                fontSize: '13px',
                fontWeight: 700,
                color: '#FD6628',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                background: 'rgba(253,102,40,0.08)',
                padding: '5px 16px',
                borderRadius: '999px',
                marginBottom: '28px',
              }}
            >
              404
            </motion.div>

            {/* Broken pathway visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}
            >
              <div style={{ position: 'relative', width: '160px', height: '60px' }}>
                {/* Left line segment */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.3 }}
                  style={{
                    position: 'absolute', top: '50%', left: 0,
                    width: '52px', height: '2px',
                    background: '#FD6628',
                    borderRadius: '999px',
                    transformOrigin: 'left',
                  }}
                />
                {/* Gap dot */}
                <div style={{
                  position: 'absolute', top: '50%', left: '52px',
                  transform: 'translateY(-50%)',
                  width: '56px', height: '2px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                }}>
                  {[0,1,2].map(i => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                      style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#E0E0E0' }}
                    />
                  ))}
                </div>
                {/* Right line reconnecting */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease, delay: 0.7 }}
                  style={{
                    position: 'absolute', top: '50%', right: 0,
                    width: '52px', height: '2px',
                    background: '#FD6628',
                    borderRadius: '999px',
                    transformOrigin: 'right',
                  }}
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
              style={{
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 800,
                color: '#000',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              This page is not available.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.26 }}
              style={{ fontSize: '16px', color: '#555', lineHeight: 1.65, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}
            >
              The page you are looking for may have moved, been removed, or the link may be incorrect. You can return to the homepage, explore the process, or view a sample CrowdHarbor report.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.32 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}
            >
              <Link
                href="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#FD6628', color: '#FFFFFF',
                  padding: '13px 26px', borderRadius: '999px',
                  fontSize: '15px', fontWeight: 700, textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e55a20'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#FD6628'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                Return Home
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/sample-report"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#FFFFFF', color: '#000',
                  padding: '13px 26px', borderRadius: '999px',
                  fontSize: '15px', fontWeight: 700, textDecoration: 'none',
                  border: '1.5px solid #E0E0E0', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#000'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E0E0E0'; }}
              >
                View Sample Report
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/how-it-works"
                style={{ fontSize: '14px', color: '#FD6628', fontWeight: 600, textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
              >
                See How It Works →
              </Link>
            </motion.div>
          </motion.div>

          {/* Helpful link cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}
            className="grid-cols-1 md:grid-cols-3"
          >
            {helpCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease, delay: 0.45 + i * 0.08 }}
                >
                  <Link
                    href={card.href}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: '10px',
                      background: '#FFFFFF', borderRadius: '18px',
                      padding: '22px 20px',
                      border: '1.5px solid #E0E0E0',
                      textDecoration: 'none',
                      transition: 'all 0.22s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = '#FD6628';
                      el.style.transform = 'translateY(-3px)';
                      el.style.boxShadow = '0 6px 22px rgba(0,0,0,0.07)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = '#E0E0E0';
                      el.style.transform = 'translateY(0)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '9px',
                      background: 'rgba(253,102,40,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={15} color="#FD6628" />
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#000', lineHeight: 1.3 }}>{card.title}</div>
                    <div style={{ fontSize: '12px', color: '#777', lineHeight: 1.5 }}>{card.desc}</div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Support note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            style={{ textAlign: 'center', fontSize: '13px', color: '#888', lineHeight: 1.6 }}
          >
            Need help?{' '}
            <Link
              href="/contact"
              style={{ color: '#FD6628', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
            >
              Contact CrowdHarbor
            </Link>{' '}
            and we will help you find the right page.
          </motion.p>
        </div>
      </div>
    </div>
    </AppShell>
  );
}
