import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/admin/sessionCookie';

// Fast, Edge-compatible first line of defense: only checks whether the
// session cookie is present, not whether it's still valid in the DB (that
// requires Prisma, which isn't Edge-compatible). The real, DB-backed check
// happens via /api/admin/auth/me (called by AdminLayout on every page) and
// via requireAdmin() in every /api/admin/* route handler — this middleware
// just avoids briefly rendering protected pages for obviously logged-out
// visitors and bounces logged-in visitors away from the login page.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSessionCookie = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === '/admin/login') {
    if (hasSessionCookie) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Reachable from an emailed link regardless of current login state — never
  // redirected either way.
  if (pathname === '/admin/reset-password') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') && !hasSessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
