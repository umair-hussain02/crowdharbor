import { z } from 'zod';

const uploadedFileSchema = z.object({
  name: z.string().max(255),
  size: z.number().nonnegative(),
  type: z.string().max(200).optional(),
});

export const intakeFormSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your full name.').max(200),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  phone: z.string().trim().max(50).optional().default(''),
  country: z.string().trim().max(100).optional().default(''),
  linkedin: z.string().trim().max(300).optional().default(''),
  companyName: z.string().trim().min(1, 'Please enter your company name.').max(200),
  website: z.string().trim().max(300).optional().default(''),

  stage: z.string().trim().min(1, 'Please select your current company stage.').max(100),
  workingDuration: z.string().trim().max(100).optional().default(''),
  industry: z.string().trim().max(150).optional().default(''),

  tractionSignals: z.array(z.string().max(150)).max(50).optional().default([]),
  monthlyRevenue: z.string().trim().max(100).optional().default(''),
  proofDescription: z.string().trim().max(2000).optional().default(''),

  raiseAmount: z.string().trim().min(1, 'Please select a raise amount.').max(100),
  useOfFunds: z.string().trim().max(2000).optional().default(''),
  fundingPaths: z.array(z.string().max(150)).max(50).optional().default([]),
  timeline: z.string().trim().max(100).optional().default(''),

  materials: z.array(z.string().max(150)).max(50).optional().default([]),
  hasNoMaterials: z.boolean().optional().default(false),
  uploadedFiles: z.array(uploadedFileSchema).max(20).optional().default([]),

  challenges: z.array(z.string().max(150)).max(50).optional().default([]),
  biggestConcern: z.string().trim().max(2000).optional().default(''),

  selectedService: z.string().trim().min(1, 'Please select a preparation service.').max(150),
  consentAccepted: z.literal(true, { message: 'Please accept the preparation disclaimer to continue.' }),
  marketingAccepted: z.boolean().optional().default(false),

  honeypot: z.string().optional().default(''),
});

export type IntakeFormInput = z.input<typeof intakeFormSchema>;
export type IntakeFormOutput = z.output<typeof intakeFormSchema>;

export const contactInquiryTypes = [
  'Founder question',
  'Readiness Review question',
  'Capital Pathway Sprint question',
  'Preparation Program question',
  'Workshop / partner inquiry',
  'Accelerator / university inquiry',
  'Support question',
  'Media / collaboration',
  'Other',
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(200),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  inquiryType: z.enum(contactInquiryTypes, {
    message: 'Please choose an inquiry type.',
  }),
  message: z.string().trim().min(1, 'Please write a short message.').max(5000),
  company: z.string().trim().max(200).optional().default(''),
  website: z.string().trim().max(300).optional().default(''),
  uploadedFile: uploadedFileSchema.nullable().optional().default(null),

  honeypot: z.string().optional().default(''),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormOutput = z.output<typeof contactFormSchema>;
