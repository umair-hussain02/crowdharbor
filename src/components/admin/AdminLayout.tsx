'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, FileText, CreditCard, BarChart2,
  BookOpen, Settings, LogOut, Activity, Globe, ChevronRight,
  Bell, Search, Menu, X, TrendingUp, Mail, ChevronDown,
} from 'lucide-react';
import { logout, isAuthenticated } from './adminAuth';

type SearchGroup = { key: string; label: string; items: { id: string; title: string; subtitle: string; href: string }[] };
type NotificationItem = { id: string; type: string; message: string; href: string; createdAt: string };

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Submissions', href: '/admin/submissions', icon: Users },
  { label: 'Contact Messages', href: '/admin/contact-messages', icon: Mail },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Blog', href: '/admin/blog', icon: BookOpen },
  { label: 'Pages', href: '/admin/pages', icon: Globe },
  { label: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
  { label: 'Performance', href: '/admin/performance', icon: Activity },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AdminLayout({ children, title, subtitle, action }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchVal, setSearchVal] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchGroups, setSearchGroups] = useState<SearchGroup[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Real, server-verified check (hits /api/admin/auth/me, backed by the
  // HttpOnly session cookie + DB lookup) — runs on every mount, so navigating
  // between admin pages or refreshing also re-validates an expired/revoked
  // session rather than trusting client-side state.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await isAuthenticated();
      if (cancelled) return;
      setAuthenticated(ok);
      if (!ok) router.push('/admin/login');
    })();
    return () => { cancelled = true; };
  }, [router]);

  // Global search — debounced, only queries once there's something to search for.
  useEffect(() => {
    const q = searchVal.trim();
    if (!q) {
      setSearchGroups([]);
      setSearchLoading(false);
      setSearchError('');
      return;
    }

    const controller = new AbortController();
    setSearchLoading(true);
    setSearchError('');

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/admin/search?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        const result = await response.json().catch(() => null);
        if (!response.ok || !result) {
          setSearchError('Search failed. Please try again.');
          setSearchGroups([]);
          return;
        }
        setSearchGroups(result.groups ?? []);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setSearchError('Search failed. Please try again.');
        }
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchVal]);

  const fetchNotifications = async () => {
    setNotifLoading(true);
    setNotifError('');
    try {
      const response = await fetch('/api/admin/notifications');
      const result = await response.json().catch(() => null);
      if (!response.ok || !result) {
        setNotifError('Could not load notifications.');
        return;
      }
      setNotifications(result.items ?? []);
    } catch {
      setNotifError('Could not load notifications.');
    } finally {
      setNotifLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchNotifications();
  }, [authenticated]);

  // Close any open dropdown when clicking outside it.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!authenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const handleResultClick = (href: string) => {
    setSearchOpen(false);
    setSearchVal('');
    router.push(href);
  };

  const unread = notifications.length;

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div style={{
      width: mobile ? '100%' : '230px',
      background: '#FFFFFF',
      borderRight: '1px solid #E0E0E0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #F0F0E8' }}>
        <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#000', letterSpacing: '-0.02em' }}>
            Crowd<span style={{ color: '#FD6628' }}>Harbor</span>
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2px' }}>
            Admin Panel
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', borderRadius: '10px',
                textDecoration: 'none', marginBottom: '2px',
                background: active ? 'rgba(253,102,40,0.08)' : 'transparent',
                borderLeft: active ? '3px solid #FD6628' : '3px solid transparent',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#F5F5EE'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <Icon size={16} color={active ? '#FD6628' : '#666'} />
              <span style={{ fontSize: '13px', fontWeight: active ? 700 : 500, color: active ? '#000' : '#555' }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom: status + logout */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid #F0F0E8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', marginBottom: '4px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#059669' }} />
          <span style={{ fontSize: '11px', color: '#888', fontWeight: 500 }}>All systems operational</span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '9px 12px', borderRadius: '10px', width: '100%',
            background: 'transparent', border: 'none', cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFF0EB'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <LogOut size={16} color="#EF4444" />
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#EF4444' }}>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Manrope, sans-serif', background: '#F5F5EE', overflow: 'hidden' }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex" style={{ flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50 }}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            style={{ width: '240px', height: '100%', background: '#FFF' }}
            onClick={e => e.stopPropagation()}
          >
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E0E0E0',
          padding: '0 24px',
          height: '58px',
          display: 'flex', alignItems: 'center', gap: '16px',
          flexShrink: 0,
        }}>
          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <Menu size={20} color="#444" />
          </button>

          {/* Title */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#000', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{title}</div>
            {subtitle && <div className="hidden md:block" style={{ fontSize: '11px', color: '#888', fontWeight: 500 }}>{subtitle}</div>}
          </div>

          {/* Search */}
          <div ref={searchRef} className="hidden md:flex" style={{ position: 'relative', minWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F5F5EE', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '7px 12px', width: '100%' }}>
              <Search size={13} color="#888" />
              <input
                value={searchVal}
                onChange={e => { setSearchVal(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search submissions, posts..."
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: '#444', width: '100%' }}
              />
            </div>

            {searchOpen && searchVal.trim() && (
              <div style={{
                position: 'absolute', top: '38px', left: 0,
                width: '340px', background: '#FFF',
                border: '1px solid #E0E0E0', borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                zIndex: 100, overflow: 'hidden', maxHeight: '360px', overflowY: 'auto',
              }}>
                {searchLoading ? (
                  <div style={{ padding: '24px 18px', textAlign: 'center', fontSize: '12px', color: '#888' }}>Searching…</div>
                ) : searchError ? (
                  <div style={{ padding: '24px 18px', textAlign: 'center', fontSize: '12px', color: '#DC2626' }}>{searchError}</div>
                ) : searchGroups.length === 0 ? (
                  <div style={{ padding: '24px 18px', textAlign: 'center', fontSize: '12px', color: '#888' }}>No results found.</div>
                ) : (
                  searchGroups.map(group => (
                    <div key={group.key}>
                      <div style={{ padding: '10px 16px 4px', fontSize: '10px', fontWeight: 700, color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {group.label}
                      </div>
                      {group.items.map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleResultClick(item.href)}
                          style={{
                            display: 'block', width: '100%', textAlign: 'left',
                            padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAF8'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                        >
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#222' }}>{item.title}</div>
                          <div style={{ fontSize: '11px', color: '#999' }}>{item.subtitle}</div>
                        </button>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          {action}

          {/* Notif bell */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setNotifOpen(v => { const next = !v; if (next) fetchNotifications(); return next; }); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px', position: 'relative', display: 'flex' }}
            >
              <Bell size={18} color="#444" />
              {unread > 0 && (
                <span style={{
                  position: 'absolute', top: '3px', right: '3px',
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: '#FD6628', color: '#FFF',
                  fontSize: '9px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {unread}
                </span>
              )}
            </button>

            {notifOpen && (
              <div style={{
                position: 'absolute', top: '40px', right: 0,
                width: '300px', background: '#FFF',
                border: '1px solid #E0E0E0', borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                zIndex: 100, overflow: 'hidden', maxHeight: '360px', overflowY: 'auto',
              }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>Notifications</span>
                  <button onClick={() => setNotifOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={14} color="#888" />
                  </button>
                </div>
                {notifLoading ? (
                  <div style={{ padding: '24px 18px', textAlign: 'center', fontSize: '12px', color: '#888' }}>Loading…</div>
                ) : notifError ? (
                  <div style={{ padding: '24px 18px', textAlign: 'center', fontSize: '12px', color: '#DC2626' }}>{notifError}</div>
                ) : notifications.length === 0 ? (
                  <div style={{ padding: '24px 18px', textAlign: 'center', fontSize: '12px', color: '#888' }}>No new notifications</div>
                ) : (
                  notifications.map(n => (
                    <Link
                      key={n.id}
                      href={n.href}
                      onClick={() => setNotifOpen(false)}
                      style={{ display: 'block', padding: '12px 18px', borderBottom: '1px solid #F5F5EE', background: 'rgba(253,102,40,0.04)', textDecoration: 'none' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAF8'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(253,102,40,0.04)'; }}
                    >
                      <div style={{ fontSize: '12px', color: '#222', fontWeight: 600, lineHeight: 1.4, marginBottom: '3px' }}>{n.message}</div>
                      <div style={{ fontSize: '11px', color: '#AAA' }}>{timeAgo(n.createdAt)}</div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Admin avatar */}
          <div ref={profileRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileOpen(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: '#FD6628', color: '#FFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 700,
              }}>
                A
              </div>
              <ChevronDown size={13} color="#888" className="hidden md:block" />
            </button>

            {profileOpen && (
              <div style={{
                position: 'absolute', top: '42px', right: 0,
                width: '190px', background: '#FFF',
                border: '1px solid #E0E0E0', borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                zIndex: 100, overflow: 'hidden',
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0E8' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#222' }}>Admin</div>
                  <div style={{ fontSize: '11px', color: '#999' }}>CrowdHarbor</div>
                </div>
                <Link
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '13px', color: '#444', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F5F5EE'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <Settings size={14} color="#666" /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '13px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFF0EB'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <LogOut size={14} color="#EF4444" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
