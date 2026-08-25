import { NextResponse } from 'next/server';
import { destroySession } from '@/lib/admin/session';

export async function POST() {
  try {
    await destroySession();
  } catch (error) {
    console.error('Admin logout failed:', error instanceof Error ? error.message : 'Unknown error');
  }
  return NextResponse.json({ ok: true });
}
