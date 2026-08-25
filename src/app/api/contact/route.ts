import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { contactFormSchema } from '@/lib/validators/forms';
import { sendContactAdminNotification, sendContactConfirmation } from '@/lib/mail';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const honeypotValue = (body as Record<string, unknown>).honeypot;
  if (typeof honeypotValue === 'string' && honeypotValue.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const result = contactFormSchema.safeParse(body);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }

    return NextResponse.json(
      { success: false, error: 'Please check the form for errors.', fieldErrors },
      { status: 400 }
    );
  }

  const data = result.data;

  try {
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        inquiryType: data.inquiryType,
        message: data.message,
        company: data.company || null,
        website: data.website || null,
        uploadedFile: data.uploadedFile ?? Prisma.JsonNull,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to save contact submission:', error);
    } else {
      console.error('Failed to save contact submission:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  try {
    await Promise.all([sendContactAdminNotification(data), sendContactConfirmation(data)]);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to send contact emails:', error);
    } else {
      console.error('Failed to send contact emails:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  return NextResponse.json({ success: true });
}
