import { randomBytes, randomInt, scrypt as scryptCallback, timingSafeEqual, createHash } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptCallback);

const SCRYPT_KEY_LENGTH = 64;

// Passwords are higher-entropy secrets that need a slow, salted KDF to resist
// offline brute force if the DB is ever read. No bcrypt/argon2 package is
// installed in this project, so this uses Node's built-in scrypt instead of
// adding a new dependency.
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(password, salt, SCRYPT_KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hashHex] = stored.split(':');
  if (!salt || !hashHex) return false;

  const derivedKey = (await scrypt(password, salt, SCRYPT_KEY_LENGTH)) as Buffer;
  const storedKey = Buffer.from(hashHex, 'hex');
  if (derivedKey.length !== storedKey.length) return false;

  return timingSafeEqual(derivedKey, storedKey);
}

// Session tokens and OTP codes are already high-entropy/short-lived-and-
// attempt-limited respectively, so a fast sha256 hash (rather than scrypt) is
// the right tool here — it's the standard approach for hashing opaque
// session tokens, and it keeps OTP verification cheap since it happens on
// every attempt within the 5-attempt limit.
export function sha256Hex(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

// Used for both session tokens and password-reset tokens — both are opaque,
// high-entropy, single-use-or-fixed-lifetime random values handled the same
// way (hashed with sha256Hex before storage, raw value only ever sent once).
export function generateOpaqueToken(): string {
  return randomBytes(32).toString('base64url');
}

export function generateOtpCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, '0');
}

// sha256Hex always produces equal-length hex strings, so this is safe to use
// for comparing an OTP/session-token hash against a stored hash without
// leaking timing information.
export function safeCompareHex(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex');
  const bufB = Buffer.from(b, 'hex');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
