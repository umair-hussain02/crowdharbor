import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { intakeFormSchema } from '@/lib/validators/forms';
import { sendIntakeAdminNotification, sendIntakeConfirmation } from '@/lib/mail';

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

  const result = intakeFormSchema.safeParse(body);

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
    await prisma.intakeSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        country: data.country || null,
        linkedin: data.linkedin || null,
        companyName: data.companyName,
        website: data.website || null,
        stage: data.stage,
        workingDuration: data.workingDuration || null,
        industry: data.industry || null,
        tractionSignals: data.tractionSignals,
        monthlyRevenue: data.monthlyRevenue || null,
        proofDescription: data.proofDescription || null,
        raiseAmount: data.raiseAmount,
        useOfFunds: data.useOfFunds || null,
        fundingPaths: data.fundingPaths,
        timeline: data.timeline || null,
        materials: data.materials,
        hasNoMaterials: data.hasNoMaterials,
        uploadedFiles: data.uploadedFiles,
        challenges: data.challenges,
        biggestConcern: data.biggestConcern || null,
        selectedService: data.selectedService,
        consentAccepted: data.consentAccepted,
        marketingAccepted: data.marketingAccepted,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to save intake submission:', error);
    } else {
      console.error('Failed to save intake submission:', error instanceof Error ? error.message : 'Unknown error');
    }
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  try {
    await Promise.all([sendIntakeAdminNotification(data), sendIntakeConfirmation(data)]);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to send intake emails:', error);
    } else {
      console.error('Failed to send intake emails:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  return NextResponse.json({ success: true });
}
