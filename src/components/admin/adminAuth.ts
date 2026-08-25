// Thin client wrappers around the real server-side session endpoints
// (/api/admin/auth/*). The actual session validity check happens in the DB
// via the HttpOnly cookie — nothing auth-relevant is stored in the browser.

export async function isAuthenticated(): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/auth/me', { cache: 'no-store' });
    return res.ok;
  } catch {
    return false;
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
  } catch {
    // Cookie may already be gone server-side — proceed to redirect regardless.
  }
}
