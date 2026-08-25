import { prisma } from '@/lib/prisma';
import { sha256Hex } from './crypto';

// DB-backed rather than in-memory (unlike src/lib/analytics/rateLimit.ts)
// because login/OTP brute-force protection needs to survive process
// restarts and work across serverless instances.

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS_PER_IDENTIFIER = 5;
const MAX_ATTEMPTS_PER_IP = 20;
const MAX_RESENDS_PER_IDENTIFIER = 3;

export type LoginStage = 'password' | 'otp' | 'resend' | 'password-reset';

// Never store the raw IP — only a sha256 hash, per project privacy rules.
export function hashIp(ip: string): string {
  return sha256Hex(ip);
}

export function getRequestIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || null;
  return request.headers.get('x-real-ip');
}

export async function isLoginRateLimited(identifier: string, ipHash: string | null, stage: LoginStage): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MS);
  const limit = stage === 'resend' || stage === 'password-reset' ? MAX_RESENDS_PER_IDENTIFIER : MAX_ATTEMPTS_PER_IDENTIFIER;

  const [byIdentifier, byIp] = await Promise.all([
    prisma.adminLoginAttempt.count({
      where: { identifier, stage, success: false, createdAt: { gte: since } },
    }),
    ipHash
      ? prisma.adminLoginAttempt.count({
          where: { ipHash, stage, success: false, createdAt: { gte: since } },
        })
      : Promise.resolve(0),
  ]);

  return byIdentifier >= limit || byIp >= MAX_ATTEMPTS_PER_IP;
}

export async function recordLoginAttempt(identifier: string, ipHash: string | null, stage: LoginStage, success: boolean) {
  await prisma.adminLoginAttempt.create({ data: { identifier, ipHash, stage, success } });
}
