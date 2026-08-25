import nodemailer from 'nodemailer';
import type { ContactFormOutput, IntakeFormOutput } from '@/lib/validators/forms';

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function sendIntakeAdminNotification(data: IntakeFormOutput) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!adminEmail) return;

  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Email', data.email],
    ['Company', data.companyName],
    ['Stage', data.stage],
    ['Raise amount', data.raiseAmount],
    ['Selected service', data.selectedService],
    ['Funding paths', data.fundingPaths.join(', ') || '—'],
    ['Materials', data.materials.join(', ') || '—'],
    ['Challenges', data.challenges.join(', ') || '—'],
  ];

  const html = `
    <h2>New founder intake submission</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${rows.map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`).join('')}
    </table>
  `;

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: adminEmail,
    subject: `New intake: ${data.companyName} (${data.name})`,
    html,
  });
}

export async function sendIntakeConfirmation(data: IntakeFormOutput) {
  const html = `
    <p>Hi ${escapeHtml(data.name)},</p>
    <p>Thanks for submitting your founder intake to CrowdHarbor. We've received your information for <strong>${escapeHtml(data.companyName)}</strong> and will review it within 1–3 business days.</p>
    <p>You'll hear from us with next steps for your selected preparation path: <strong>${escapeHtml(data.selectedService)}</strong>.</p>
    <p>— The CrowdHarbor team</p>
  `;

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: data.email,
    subject: 'We received your CrowdHarbor intake submission',
    html,
  });
}

export async function sendContactAdminNotification(data: ContactFormOutput) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!adminEmail) return;

  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Email', data.email],
    ['Inquiry type', data.inquiryType],
    ['Company', data.company || '—'],
    ['Website', data.website || '—'],
    ['Message', data.message],
  ];

  const html = `
    <h2>New contact form submission</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${rows.map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`).join('')}
    </table>
  `;

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: adminEmail,
    subject: `New contact inquiry: ${data.inquiryType} (${data.name})`,
    html,
  });
}

export async function sendAdminOtpEmail(email: string, code: string) {
  const html = `
    <p>Your CrowdHarbor admin sign-in code is:</p>
    <p style="font-size:28px; font-weight:700; letter-spacing:4px;">${escapeHtml(code)}</p>
    <p>This code expires in 10 minutes and can only be used once. If you didn't request this, you can ignore this email.</p>
  `;

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: `${code} is your CrowdHarbor admin sign-in code`,
    html,
  });
}

export async function sendAdminPasswordResetEmail(email: string, resetUrl: string) {
  const html = `
    <p>We received a request to reset your CrowdHarbor admin password.</p>
    <p><a href="${escapeHtml(resetUrl)}">Click here to set a new password</a>. This link expires in 30 minutes and can only be used once.</p>
    <p>If you didn't request this, you can safely ignore this email — your password won't change.</p>
  `;

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'Reset your CrowdHarbor admin password',
    html,
  });
}

export async function sendContactConfirmation(data: ContactFormOutput) {
  const html = `
    <p>Hi ${escapeHtml(data.name)},</p>
    <p>Thanks for contacting CrowdHarbor. We've received your message and will respond based on your inquiry type: <strong>${escapeHtml(data.inquiryType)}</strong>.</p>
    <p>— The CrowdHarbor team</p>
  `;

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: data.email,
    subject: 'We received your message to CrowdHarbor',
    html,
  });
}
