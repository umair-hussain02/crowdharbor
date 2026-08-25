// Zero-dependency constant — safe to import from both the Node-only session
// helpers (src/lib/admin/session.ts) and the Edge-runtime middleware
// (src/middleware.ts), which can't import Prisma/Node-only code.
export const SESSION_COOKIE = 'admin_session';
