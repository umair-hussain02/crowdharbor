'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent, ReactNode, RefObject } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { trackEvent } from '@/lib/analytics/track';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  Compass,
  DollarSign,
  FileText,
  Globe,
  Handshake,
  Lock,
  Shield,
  TrendingUp,
  Upload,
  Users,
  X,
  Zap,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { label: 'Founder Details', short: 'Details', guidance: 'We use this to identify your company and send review updates.' },
  { label: 'Company Stage', short: 'Stage', guidance: 'Your stage affects which funding path may be realistic.' },
  { label: 'Traction', short: 'Traction', guidance: 'Traction helps us understand what proof you can show funding sources.' },
  { label: 'Funding Goal', short: 'Goal', guidance: 'The amount and use of funds must match your current readiness.' },
  { label: 'Materials', short: 'Materials', guidance: 'Your current documents help us identify what is ready and what is missing.' },
  { label: 'Challenges', short: 'Challenges', guidance: 'Your biggest concerns help us prioritize the review.' },
  { label: 'Review & Submit', short: 'Review', guidance: 'Check your details before submission. You can edit any step.' },
] as const;

const stageOptions = ['Idea stage', 'MVP built', 'Product live', 'Users but no revenue', 'Revenue generating', 'Preparing to raise', 'Already fundraising', 'Previously rejected'];
const workingDurationOptions = ['Less than 3 months', '3–6 months', '6–12 months', '1–2 years', '2+ years'];
const tractionOptions = ['Revenue', 'Paying customers', 'Active users', 'Waitlist', 'Partnerships', 'Letters of intent', 'Product demo', 'Community growth', 'Press or media', 'Pilot customers', 'Grants or awards', 'No traction yet'];
const revenueOptions = ['No revenue yet', 'Under €1,000', '€1,000–€5,000', '€5,000–€20,000', '€20,000+', 'Prefer not to say'];
const raiseOptions = ['Under €50,000', '€50,000–€150,000', '€150,000–€500,000', '€500,000–€1M', '€1M+', 'Not sure yet'];
const timelineOptions = ['Immediately', 'Within 30 days', '1–3 months', '3–6 months', '6+ months', 'Not sure'];
const materialOptions = ['Pitch deck', 'Financial model', 'Business plan', 'One-page company summary', 'Product demo', 'Data room documents', 'Cap table', 'Customer proof', 'Use-of-funds breakdown', 'None yet'];
const challengeOptions = ['I am not sure if we are ready to raise', 'Our pitch is unclear', 'Our pitch deck needs work', 'We do not have a financial model', 'Our use of funds is not clear', 'We do not know which funding path fits', 'We have been rejected before', 'Our traction story is weak', 'Our data room is incomplete', 'We need help preparing for outreach'];
const serviceOptions = ['Funding Readiness Review', 'Capital Pathway Sprint', 'Fundraising Preparation Program'];
const fundingPathOptions = [
  { label: 'Crowdfunding', icon: Users },
  { label: 'Angel investors', icon: DollarSign },
  { label: 'Grants', icon: FileText },
  { label: 'Accelerator', icon: Zap },
  { label: 'Pre-seed', icon: TrendingUp },
  { label: 'Revenue-based', icon: Globe },
  { label: 'Strategic partner', icon: Handshake },
  { label: 'Not sure yet', icon: Compass },
];

const formSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your full name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z.string(),
  country: z.string(),
  linkedin: z.string(),
  companyName: z.string().trim().min(1, 'Please enter your company name.'),
  website: z.string(),
  stage: z.string().min(1, 'Please select your current company stage.'),
  workingDuration: z.string(),
  industry: z.string(),
  tractionSignals: z.array(z.string()),
  monthlyRevenue: z.string(),
  proofDescription: z.string(),
  raiseAmount: z.string().min(1, 'Please select a raise amount.'),
  useOfFunds: z.string(),
  fundingPaths: z.array(z.string()),
  timeline: z.string(),
  materials: z.array(z.string()),
  hasNoMaterials: z.boolean(),
  challenges: z.array(z.string()),
  biggestConcern: z.string(),
  selectedService: z.string(),
  consentAccepted: z.literal(true, { message: 'Please accept the preparation disclaimer to continue.' }),
  marketingAccepted: z.boolean(),
  honeypot: z.string(),
});

type FormData = Omit<z.input<typeof formSchema>, 'consentAccepted'> & { consentAccepted: boolean };
type ErrorMap = Partial<Record<keyof FormData | 'consent', string>>;

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  country: '',
  linkedin: '',
  companyName: '',
  website: '',
  stage: '',
  workingDuration: '',
  industry: '',
  tractionSignals: [],
  monthlyRevenue: '',
  proofDescription: '',
  raiseAmount: '',
  useOfFunds: '',
  fundingPaths: [],
  timeline: '',
  materials: [],
  hasNoMaterials: false,
  challenges: [],
  biggestConcern: '',
  selectedService: 'Capital Pathway Sprint',
  consentAccepted: false,
  marketingAccepted: false,
  honeypot: '',
};

const tw = {
  page: 'min-h-screen bg-[var(--color-bg-cream)] font-[var(--font-body)]',
  container: 'mx-auto max-w-[var(--container-md)] px-6 pb-20 pt-12',
  confirmationContainer: 'mx-auto max-w-[600px] px-6 py-20',
  card: 'rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-[clamp(24px,4vw,40px)] shadow-[0_8px_32px_rgba(0,0,0,0.05)]',
  welcomeCard: 'mb-6 flex flex-wrap items-start justify-between gap-5 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-8 py-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)]',
  eyebrow: 'mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-brand-orange)]',
  welcomeTitle: 'mb-2 text-xl font-extrabold text-[var(--color-text-primary)]',
  welcomeText: 'm-0 text-sm leading-[1.65] text-[var(--color-text-tertiary)]',
  mutedRow: 'flex items-center gap-1.5 text-xs text-[var(--color-text-subtle)]',
  progressCard: 'mb-6 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-7 py-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]',
  formGrid: 'grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_300px]',
  fieldGrid: 'grid grid-cols-1 gap-5 sm:grid-cols-2',
  stack: 'flex flex-col gap-2',
  wrap: 'flex flex-wrap gap-2',
  navRow: 'mt-8 flex items-center justify-between gap-3 border-t border-[var(--color-border-divider)] pt-6',
  backButton: 'inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-transparent px-5 py-3 text-sm font-medium text-[var(--color-text-tertiary)] transition-all duration-150 hover:border-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:text-[#CCCCCC] disabled:hover:border-[var(--color-border)]',
  submitButton: 'inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border-0 bg-[var(--color-brand-orange)] px-7 py-3.5 text-[15px] font-semibold text-[var(--color-text-on-dark)]',
  sideCard: 'sticky top-6 rounded-[22px] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]',
  selectedBorder: 'border-2 border-[var(--color-brand-orange)] bg-[var(--color-brand-orange-tint-faint)]',
  unselectedBorder: 'border border-[var(--color-border)] bg-[var(--color-bg-white)]',
} as const;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Page() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    trackEvent('intake_start');
  }, []);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleMulti = (key: 'tractionSignals' | 'fundingPaths' | 'materials' | 'challenges', value: string) => {
    setFormData((prev) => {
      const current = prev[key];
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];

      return { ...prev, [key]: next };
    });
  };

  const validateCurrentStep = () => {
    const stepSchemas: Record<number, z.ZodTypeAny> = {
      1: formSchema.pick({ name: true, email: true, companyName: true }),
      2: formSchema.pick({ stage: true }),
      4: formSchema.pick({ raiseAmount: true }),
      7: formSchema.pick({ consentAccepted: true }),
    };

    const schema = stepSchemas[step];

    if (!schema) {
      setErrors({});
      return true;
    }

    const result = schema.safeParse(formData);

    if (result.success) {
      setErrors({});
      return true;
    }

    const nextErrors: ErrorMap = {};

    result.error.issues.forEach((issue) => {
      const key = String(issue.path[0]) as keyof FormData;
      nextErrors[key === 'consentAccepted' ? 'consent' : key] = issue.message;
    });

    setErrors(nextErrors);
    return false;
  };

  const handleContinue = async () => {
    if (!validateCurrentStep()) return;

    if (step < steps.length) {
      setStep((current) => current + 1);
      window.scrollTo(0, 0);
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          uploadedFiles: uploadedFiles.map((file) => ({ name: file.name, size: file.size })),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        if (result?.fieldErrors) {
          setErrors((prev) => ({ ...prev, ...result.fieldErrors }));
        }
        setSubmitError(result?.error || 'Something went wrong. Please try again.');
        return;
      }

      trackEvent('intake_submit', { selectedService: formData.selectedService });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setSubmitError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step <= 1) return;
    setStep((current) => current - 1);
    window.scrollTo(0, 0);
  };

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    setUploadedFiles((current) => [...current, ...Array.from(event.dataTransfer.files)]);
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setUploadedFiles((current) => [...current, ...Array.from(event.target.files ?? [])]);
    event.target.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const reviewSections = useMemo(
    () => [
      { title: 'Founder details', items: [formData.name, formData.email, formData.companyName, formData.country].filter(Boolean), step: 1 },
      { title: 'Company stage', items: [formData.stage, formData.workingDuration, formData.industry].filter(Boolean), step: 2 },
      { title: 'Traction', items: [formData.monthlyRevenue, ...formData.tractionSignals.slice(0, 3)].filter(Boolean), step: 3 },
      { title: 'Funding goal', items: [formData.raiseAmount, formData.timeline, ...formData.fundingPaths.slice(0, 2)].filter(Boolean), step: 4 },
      { title: 'Materials', items: formData.materials.length > 0 ? formData.materials.slice(0, 3) : ['No materials yet'], step: 5 },
      { title: 'Challenges', items: formData.challenges.slice(0, 2).length > 0 ? formData.challenges.slice(0, 2) : ['None selected'], step: 6 },
    ],
    [formData]
  );

  if (submitted) {
    return <Confirmation selectedService={formData.selectedService} />;
  }

  return (
    <div className={tw.page}>
      <IntakeHeader />

      <div className={tw.container}>
        {step === 1 && <WelcomeCard />}

        <ProgressCard step={step} setStep={setStep} />

        <div className={tw.formGrid}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease }}
              className={tw.card}
            >
              {step === 1 && (
                <StepOne
                  formData={formData}
                  errors={errors}
                  updateField={updateField}
                  toggleMulti={toggleMulti}
                />
              )}

              {step === 2 && (
                <StepTwo
                  formData={formData}
                  errors={errors}
                  updateField={updateField}
                  toggleMulti={toggleMulti}
                />
              )}

              {step === 3 && (
                <StepThree
                  formData={formData}
                  errors={errors}
                  updateField={updateField}
                  toggleMulti={toggleMulti}
                />
              )}

              {step === 4 && (
                <StepFour
                  formData={formData}
                  errors={errors}
                  updateField={updateField}
                  toggleMulti={toggleMulti}
                />
              )}

              {step === 5 && (
                <StepFive
                  formData={formData}
                  errors={errors}
                  uploadedFiles={uploadedFiles}
                  isDragging={isDragging}
                  fileInputRef={fileInputRef}
                  updateField={updateField}
                  toggleMulti={toggleMulti}
                  setIsDragging={setIsDragging}
                  handleDrop={handleDrop}
                  handleFileChange={handleFileChange}
                  removeFile={removeFile}
                />
              )}

              {step === 6 && (
                <StepSix
                  formData={formData}
                  errors={errors}
                  updateField={updateField}
                  toggleMulti={toggleMulti}
                />
              )}

              {step === 7 && (
                <StepSeven
                  formData={formData}
                  errors={errors}
                  reviewSections={reviewSections}
                  updateField={updateField}
                  toggleMulti={toggleMulti}
                  setStep={setStep}
                />
              )}

              {submitError && step === steps.length && <ErrorMessage msg={submitError} />}

              <div className={tw.navRow}>
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1 || isSubmitting}
                  className={tw.backButton}
                >
                  <ChevronLeft size={15} />
                  Back
                </button>

                <motion.button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(tw.submitButton, isSubmitting && 'cursor-not-allowed opacity-70')}
                >
                  {step === steps.length
                    ? isSubmitting
                      ? 'Submitting…'
                      : formData.selectedService === 'Funding Readiness Review'
                        ? 'Continue to Payment'
                        : 'Submit My Intake'
                    : 'Continue'}
                  <ArrowRight size={15} />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <SideGuidance step={step} />
        </div>
      </div>
    </div>
  );
}

function StepOne({ formData, errors, updateField }: StepProps) {
  return (
    <div>
      <StepHeading title="Founder details" sub="Tell us who you are and where we can send your review updates." />

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="hp_field">Leave this field empty</label>
        <input
          id="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(event) => updateField('honeypot', event.target.value)}
        />
      </div>

      <div className={tw.fieldGrid}>
        <div>
          <FieldLabel required>Full name</FieldLabel>
          <TextInput value={formData.name} onChange={(value) => updateField('name', value)} placeholder="Jane Founder" />
          {errors.name && <ErrorMessage msg={errors.name} />}
        </div>

        <div>
          <FieldLabel required>Email address</FieldLabel>
          <TextInput value={formData.email} onChange={(value) => updateField('email', value)} placeholder="jane@company.com" type="email" />
          {errors.email && <ErrorMessage msg={errors.email} />}
        </div>

        <div>
          <FieldLabel>Phone number <Optional /></FieldLabel>
          <TextInput value={formData.phone} onChange={(value) => updateField('phone', value)} placeholder="+1 234 567 890" type="tel" />
        </div>

        <div>
          <FieldLabel>Country</FieldLabel>
          <TextInput value={formData.country} onChange={(value) => updateField('country', value)} placeholder="Netherlands, UK, Germany…" />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel required>Company name</FieldLabel>
          <TextInput value={formData.companyName} onChange={(value) => updateField('companyName', value)} placeholder="Your company name" />
          {errors.companyName && <ErrorMessage msg={errors.companyName} />}
        </div>

        <div className="sm:col-span-2">
          <FieldLabel>Website or social link <Optional /></FieldLabel>
          <TextInput value={formData.website} onChange={(value) => updateField('website', value)} placeholder="https://yourcompany.com" />
          <p className="mt-1.5 text-xs text-[var(--color-text-subtle)]">
            Share anything that helps us understand your company — website, LinkedIn, product page, or social profile.
          </p>
        </div>

        <div className="sm:col-span-2">
          <FieldLabel>LinkedIn profile <Optional /></FieldLabel>
          <TextInput value={formData.linkedin} onChange={(value) => updateField('linkedin', value)} placeholder="linkedin.com/in/yourname" />
        </div>
      </div>
    </div>
  );
}

function StepTwo({ formData, errors, updateField }: StepProps) {
  return (
    <div>
      <StepHeading title="Where is your company right now?" sub="Choose the stage that best describes your current situation." />

      <FormSection className="mb-6">
        <SectionLabel>Current company stage *</SectionLabel>
        <div className={tw.stack}>
          {stageOptions.map((stage) => (
            <SelectCard key={stage} label={stage} selected={formData.stage === stage} onClick={() => updateField('stage', stage)} />
          ))}
        </div>
        {errors.stage && <ErrorMessage msg={errors.stage} />}
      </FormSection>

      <FormSection className="mb-6">
        <SectionLabel>How long have you been working on this?</SectionLabel>
        <div className={tw.wrap}>
          {workingDurationOptions.map((duration) => (
            <ChoicePill key={duration} label={duration} selected={formData.workingDuration === duration} onClick={() => updateField('workingDuration', duration)} />
          ))}
        </div>
      </FormSection>

      <FieldLabel>Industry</FieldLabel>
      <TextInput value={formData.industry} onChange={(value) => updateField('industry', value)} placeholder="SaaS, Fintech, Health, Marketplace, Consumer product…" />
    </div>
  );
}

function StepThree({ formData, updateField, toggleMulti }: StepProps) {
  return (
    <div>
      <StepHeading
        title="What traction or proof do you have?"
        sub="Funding sources look for signals. Share any traction, revenue, users, customers, partnerships, or market proof you currently have."
      />

      <FormSection className="mb-6">
        <SectionLabel>Which traction signals do you currently have? (select all that apply)</SectionLabel>
        <div className={tw.wrap}>
          {tractionOptions.map((traction) => (
            <MultiCard key={traction} label={traction} selected={formData.tractionSignals.includes(traction)} onClick={() => toggleMulti('tractionSignals', traction)} />
          ))}
        </div>
      </FormSection>

      <FormSection className="mb-6">
        <SectionLabel>Current monthly revenue</SectionLabel>
        <div className={tw.wrap}>
          {revenueOptions.map((revenue) => (
            <ChoicePill key={revenue} label={revenue} selected={formData.monthlyRevenue === revenue} onClick={() => updateField('monthlyRevenue', revenue)} />
          ))}
        </div>
      </FormSection>

      <FieldLabel>Briefly describe your strongest proof so far</FieldLabel>
      <TextArea value={formData.proofDescription} onChange={(value) => updateField('proofDescription', value)} placeholder="Example: We have 300 beta users, 12 paying customers, and €2,500 in monthly revenue." />
    </div>
  );
}

function StepFour({ formData, errors, updateField, toggleMulti }: StepProps) {
  return (
    <div>
      <StepHeading title="What are you preparing to raise?" sub="This helps CrowdHarbor understand whether your funding goal and pathway match your current stage and materials." />

      <FormSection className="mb-6">
        <SectionLabel>How much are you planning to raise? *</SectionLabel>
        <div className={tw.wrap}>
          {raiseOptions.map((raise) => (
            <ChoicePill key={raise} label={raise} selected={formData.raiseAmount === raise} onClick={() => updateField('raiseAmount', raise)} />
          ))}
        </div>
        {errors.raiseAmount && <ErrorMessage msg={errors.raiseAmount} />}
      </FormSection>

      <FormSection className="mb-6">
        <FieldLabel>What will the funds be used for?</FieldLabel>
        <TextArea value={formData.useOfFunds} onChange={(value) => updateField('useOfFunds', value)} placeholder="Example: Product development, hiring, marketing, inventory, operations, or runway." />
      </FormSection>

      <FormSection className="mb-6">
        <SectionLabel>What funding path are you considering? (select all that apply)</SectionLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {fundingPathOptions.map(({ label, icon: Icon }) => {
            const selected = formData.fundingPaths.includes(label);

            return (
              <motion.button
                key={label}
                type="button"
                onClick={() => toggleMulti('fundingPaths', label)}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'flex cursor-pointer flex-col items-center gap-2 rounded-[14px] px-3 py-3.5 font-[var(--font-body)] transition-all duration-150',
                  selected ? tw.selectedBorder : tw.unselectedBorder
                )}
              >
                <Icon size={18} className={selected ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-subtle)]'} />
                <span className={cn('text-center text-xs leading-[1.3] text-[var(--color-text-primary)]', selected ? 'font-bold' : 'font-normal')}>
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </FormSection>

      <SectionLabel>When are you hoping to approach funding sources?</SectionLabel>
      <div className={tw.wrap}>
        {timelineOptions.map((timeline) => (
          <ChoicePill key={timeline} label={timeline} selected={formData.timeline === timeline} onClick={() => updateField('timeline', timeline)} />
        ))}
      </div>
    </div>
  );
}

function StepFive({ formData, uploadedFiles, isDragging, fileInputRef, updateField, toggleMulti, setIsDragging, handleDrop, handleFileChange, removeFile }: StepFiveProps) {
  return (
    <div>
      <StepHeading title="What materials do you already have?" sub="Upload any current materials you use or plan to use for funding conversations. If you do not have them yet, that is okay — missing materials are part of the review." />

      <FormSection className="mb-7">
        <SectionLabel>Which materials do you currently have? (select all that apply)</SectionLabel>
        <div className="mb-3 flex flex-wrap gap-2">
          {materialOptions.map((material) => (
            <MultiCard key={material} label={material} selected={formData.materials.includes(material)} onClick={() => toggleMulti('materials', material)} />
          ))}
        </div>

        <CheckboxRow
          checked={formData.hasNoMaterials}
          onChange={(checked) => updateField('hasNoMaterials', checked)}
          label="I do not have these materials yet"
        />
      </FormSection>

      <SectionLabel>Upload documents (optional)</SectionLabel>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'cursor-pointer rounded-[16px] border-2 border-dashed px-6 py-8 text-center transition-all duration-200',
          isDragging
            ? 'border-[var(--color-brand-orange)] bg-[var(--color-brand-orange-tint-faint)]'
            : 'border-[var(--color-border)] bg-[#F8F8F8]'
        )}
      >
        <Upload size={24} className={cn('mx-auto mb-3', isDragging ? 'text-[var(--color-brand-orange)]' : 'text-[var(--color-text-faint)]')} />
        <div className="mb-1.5 text-[15px] font-semibold text-[var(--color-text-primary)]">Drag your files here or click to upload</div>
        <div className="text-xs text-[var(--color-text-subtle)]">Pitch deck, financial model, business plan, company overview, or other fundraising materials.</div>
        <div className="mt-2 text-[11px] text-[var(--color-text-faint)]">PDF, DOC, PPT, XLS, CSV, PNG, JPG accepted</div>
        <input ref={fileInputRef} type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.png,.jpg,.jpeg" className="hidden" onChange={handleFileChange} />
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--color-text-subtle)]">
        <Lock size={11} className="text-[var(--color-brand-orange)]" />
        Only upload materials you are comfortable sharing for review.
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-3.5 flex flex-col gap-2">
          {uploadedFiles.map((file, index) => (
            <motion.div
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2.5 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-cream)] px-3.5 py-2.5"
            >
              <FileText size={14} className="shrink-0 text-[var(--color-brand-orange)]" />
              <span className="flex-1 truncate text-[13px] text-[var(--color-text-primary)]">{file.name}</span>
              <span className="shrink-0 text-[11px] text-[var(--color-text-subtle)]">{(file.size / 1024).toFixed(0)} KB</span>
              <button type="button" onClick={(event) => { event.stopPropagation(); removeFile(index); }} className="flex items-center p-0.5 text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-brand-orange)]">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function StepSix({ formData, updateField, toggleMulti }: StepProps) {
  return (
    <div>
      <StepHeading title="What feels most unclear or difficult right now?" sub="Select the areas where you need the most clarity before approaching capital." />

      <FormSection className="mb-6">
        <SectionLabel>Select all that apply</SectionLabel>
        <div className={tw.stack}>
          {challengeOptions.map((challenge) => (
            <SelectCard key={challenge} label={challenge} selected={formData.challenges.includes(challenge)} onClick={() => toggleMulti('challenges', challenge)} />
          ))}
        </div>
      </FormSection>

      <FieldLabel>In your own words, what is your biggest funding concern?</FieldLabel>
      <TextArea value={formData.biggestConcern} onChange={(value) => updateField('biggestConcern', value)} rows={4} placeholder="Example: We have early traction but I am not sure whether we should pursue crowdfunding, angels, or grants first." />
    </div>
  );
}

function StepSeven({ formData, errors, reviewSections, updateField, setStep }: StepSevenProps) {
  return (
    <div>
      <StepHeading title="Review your intake before submitting." sub="Make sure the information looks correct. CrowdHarbor will use this to understand your readiness and preparation needs." />

      <div className="mb-7 flex flex-col gap-3.5">
        {reviewSections.map((section) => (
          <div key={section.title} className="flex items-start justify-between gap-3 rounded-[14px] bg-[#F8F8F8] px-[18px] py-4">
            <div>
              <div className="mb-1.5 text-xs font-bold uppercase tracking-[0.04em] text-[var(--color-text-subtle)]">{section.title}</div>
              <div className="text-[13px] leading-[1.5] text-[#333333]">{section.items.join(' · ') || 'Not provided'}</div>
            </div>
            <button type="button" onClick={() => setStep(section.step)} className="shrink-0 whitespace-nowrap border-0 bg-transparent text-[13px] font-semibold text-[var(--color-brand-orange)]">
              Edit
            </button>
          </div>
        ))}
      </div>

      <FormSection className="mb-6">
        <SectionLabel>Confirm your selected preparation service</SectionLabel>
        <div className={tw.stack}>
          {serviceOptions.map((service) => (
            <SelectCard key={service} label={service} selected={formData.selectedService === service} onClick={() => updateField('selectedService', service)} />
          ))}
        </div>
      </FormSection>

      <div className="mb-2 flex flex-col gap-3">
        <CheckboxRow
          checked={formData.consentAccepted}
          onChange={(checked) => updateField('consentAccepted', checked)}
          label={<strong>I understand CrowdHarbor provides preparation guidance and does not guarantee funding or act as an investor, broker, legal advisor, tax advisor, or investment advisor.</strong>}
        />
        {errors.consent && <ErrorMessage msg={errors.consent} />}

        <CheckboxRow
          checked={formData.marketingAccepted}
          onChange={(checked) => updateField('marketingAccepted', checked)}
          label="I agree to receive updates and resources from CrowdHarbor."
          muted
        />
      </div>
    </div>
  );
}

function Confirmation({ selectedService }: { selectedService: string }) {
  const nextSteps = [
    'CrowdHarbor reviews your submission within 1–3 business days.',
    selectedService === 'Funding Readiness Review'
      ? 'You will receive a payment link to complete your Readiness Review.'
      : 'You will receive a confirmation email with next steps for your application.',
    'A preparation review and recommended path will follow.',
  ];

  return (
    <div className={tw.page}>
      <IntakeHeader />

      <div className={tw.confirmationContainer}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-10 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--color-brand-orange-tint)]"
          >
            <CheckCircle2 size={36} className="text-[var(--color-brand-orange)]" />
          </motion.div>

          <h1 className="mb-3.5 text-[28px] font-extrabold tracking-[-0.02em] text-[var(--color-text-primary)]">Your intake has been submitted.</h1>
          <p className="mb-8 text-base leading-[1.75] text-[var(--color-text-tertiary)]">
            CrowdHarbor has received your company information and materials. The next step depends on the preparation path you selected.
          </p>

          <div className="mb-8 rounded-[18px] bg-[var(--color-bg-cream)] px-6 py-5 text-left">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--color-text-subtle)]">What happens next</div>

            {nextSteps.map((item) => (
              <div key={item} className="mb-2.5 flex gap-2.5 last:mb-0">
                <div className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-orange)]">
                  <Check size={10} className="text-[var(--color-text-on-dark)]" />
                </div>
                <span className="text-sm leading-[1.5] text-[var(--color-text-secondary)]">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <Link href="/" className="block rounded-[var(--radius-pill)] bg-[var(--color-brand-orange)] p-3.5 text-center text-[15px] font-semibold text-[var(--color-text-on-dark)] no-underline transition-colors hover:bg-[var(--color-brand-orange-hover)]">
              Return Home
            </Link>
            <Link href="/sample-report" className="block rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-3.5 text-center text-[15px] font-semibold text-[var(--color-text-primary)] no-underline transition-colors hover:border-[var(--color-text-primary)]">
              View Sample Report
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function WelcomeCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className={tw.welcomeCard}>
      <div className="flex-1">
        <div className={tw.eyebrow}>Founder intake</div>
        <div className={tw.welcomeTitle}>Let&apos;s understand where your company stands.</div>
        <p className={tw.welcomeText}>Share your company stage, traction, funding goal, materials, and biggest challenges so CrowdHarbor can review your readiness and recommend the right preparation path.</p>
      </div>

      <div className="flex shrink-0 flex-col gap-2">
        <div className={tw.mutedRow}><Lock size={12} className="text-[var(--color-brand-orange)]" /> Takes about 7–10 minutes</div>
        <div className={tw.mutedRow}><Shield size={12} className="text-[var(--color-brand-orange)]" /> Your information is used only for readiness review</div>
      </div>
    </motion.div>
  );
}

function ProgressCard({ step, setStep }: { step: number; setStep: (step: number) => void }) {
  return (
    <div className={tw.progressCard}>
      <div className="mb-2.5 text-[13px] font-semibold text-[var(--color-text-primary)] md:hidden">
        Step {step} of 7: <span className="text-[var(--color-brand-orange)]">{steps[step - 1].label}</span>
      </div>

      <div className="hidden items-center gap-1 md:flex">
        {steps.map((item, index) => {
          const num = index + 1;
          const done = num < step;
          const active = num === step;

          return (
            <div key={item.label} className={cn('flex items-center', index < steps.length - 1 && 'flex-1')}>
              <button
                type="button"
                disabled={!done}
                onClick={() => done && setStep(num)}
                className={cn('flex items-center gap-1.5 border-0 bg-transparent p-0', done ? 'cursor-pointer' : 'cursor-default')}
              >
                <span
                  className={cn(
                    'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full transition-all duration-200',
                    done ? 'bg-[var(--color-brand-orange)]' : active ? 'bg-[var(--color-bg-black)]' : 'bg-[var(--color-bg-admin-muted)]'
                  )}
                >
                  {done ? <Check size={12} className="text-[var(--color-text-on-dark)]" /> : <span className={cn('text-[11px] font-bold', active ? 'text-[var(--color-text-on-dark)]' : 'text-[var(--color-text-faint)]')}>{num}</span>}
                </span>
                <span className={cn('whitespace-nowrap text-xs', active ? 'font-bold text-[var(--color-text-primary)]' : done ? 'font-medium text-[var(--color-brand-orange)]' : 'font-medium text-[var(--color-text-faint)]')}>{item.short}</span>
              </button>

              {index < steps.length - 1 && (
                <div className={cn('mx-2 h-0.5 flex-1 transition-colors duration-300', done ? 'bg-[var(--color-brand-orange)]' : 'bg-[var(--color-border)]')} />
              )}
            </div>
          );
        })}
      </div>

      <div className="h-1 overflow-hidden rounded-sm bg-[var(--color-bg-admin-muted)] md:hidden">
        <motion.div animate={{ width: `${(step / steps.length) * 100}%` }} transition={{ duration: 0.4, ease }} className="h-full rounded-sm bg-[var(--color-brand-orange)]" />
      </div>
    </div>
  );
}

function SideGuidance({ step }: { step: number }) {
  return (
    <aside className="hidden lg:block">
      <motion.div key={`guide-${step}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} className={tw.sideCard}>
        <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--color-brand-orange-tint-soft)]">
          <span className="text-sm font-extrabold text-[var(--color-brand-orange)]">{step}</span>
        </div>

        <div className="mb-2 text-sm font-bold text-[var(--color-text-primary)]">{steps[step - 1].label}</div>
        <p className="m-0 mb-5 text-[13px] leading-[1.65] text-[var(--color-text-muted)]">{steps[step - 1].guidance}</p>

        <div className="flex flex-col gap-2.5 border-t border-[var(--color-border-divider)] pt-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--color-text-subtle)]">Preparation path</div>
          {['Readiness Review', 'Pathway Fit', 'Action Plan'].map((label, index) => (
            <div key={label} className="flex items-center gap-2 rounded-[10px] bg-[#F8F8F8] px-3 py-2">
              <div className={cn('h-1.5 w-1.5 rounded-full', index === 0 ? 'bg-[var(--color-brand-orange)]' : 'bg-[var(--color-border)]')} />
              <span className="text-xs font-medium text-[var(--color-text-tertiary)]">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2 border-t border-[var(--color-border-divider)] pt-4">
          <Shield size={13} className="mt-px shrink-0 text-[var(--color-brand-orange)]" />
          <p className="m-0 text-xs leading-[1.5] text-[var(--color-text-subtle)]">Your information is used only to review your readiness and preparation needs.</p>
        </div>
      </motion.div>
    </aside>
  );
}

function IntakeHeader() {
  return (
    <header className="sticky top-0 z-[100] flex h-[72px] items-center border-b border-[var(--color-border)] bg-[rgba(245,245,238,0.95)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[var(--container-md)] items-center justify-between px-6">
        <Link href="/" className="font-[var(--font-heading)] text-lg font-extrabold tracking-[-0.02em] text-[var(--color-text-primary)] no-underline transition-colors hover:text-[var(--color-brand-orange)]">
          CrowdHarbor
        </Link>
        <div className="flex items-center gap-2 text-[13px] text-[var(--color-text-subtle)]">
          <Lock size={13} className="text-[var(--color-brand-orange)]" />
          Secure founder intake
        </div>
      </div>
    </header>
  );
}

function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-7">
      <h2 className="mb-2 font-[var(--font-heading)] text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--color-text-primary)]">{title}</h2>
      <p className="m-0 text-sm leading-[1.65] text-[var(--color-text-muted)]">{sub}</p>
    </div>
  );
}

function FormSection({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-[var(--color-text-primary)]">
      {children}
      {required && <span className="ml-1 text-[var(--color-brand-orange)]">*</span>}
    </label>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.05em] text-[var(--color-text-subtle)]">{children}</div>;
}

function TextInput({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-4 py-[13px] text-[15px] text-[var(--color-text-primary)] outline-none transition-colors duration-200 placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-brand-orange)]"
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (value: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-y rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-4 py-[13px] text-[15px] leading-[1.6] text-[var(--color-text-primary)] outline-none transition-colors duration-200 placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-brand-orange)]"
    />
  );
}

function SelectCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-[14px] px-4 py-[13px] text-left font-[var(--font-body)] transition-all duration-150',
        selected ? tw.selectedBorder : tw.unselectedBorder
      )}
    >
      <span className="text-sm font-medium text-[var(--color-text-primary)]">{label}</span>
      {selected && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-orange)]">
          <Check size={11} className="text-[var(--color-text-on-dark)]" />
        </span>
      )}
    </motion.button>
  );
}

function MultiCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[12px] px-3.5 py-[11px] text-left font-[var(--font-body)] transition-all duration-150',
        selected ? tw.selectedBorder : tw.unselectedBorder
      )}
    >
      {selected && <Check size={12} className="shrink-0 text-[var(--color-brand-orange)]" />}
      <span className={cn('text-[13px]', selected ? 'font-semibold text-[var(--color-text-primary)]' : 'font-normal text-[var(--color-text-secondary)]')}>
        {label}
      </span>
    </motion.button>
  );
}

function ChoicePill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'cursor-pointer rounded-[var(--radius-pill)] px-4 py-2.5 text-[13px] text-[var(--color-text-primary)] transition-all duration-150',
        selected ? 'border-2 border-[var(--color-brand-orange)] bg-[var(--color-brand-orange-tint-faint)] font-bold' : 'border border-[var(--color-border)] bg-[var(--color-bg-white)] font-normal'
      )}
    >
      {label}
    </motion.button>
  );
}

function CheckboxRow({ checked, onChange, label, muted = false }: { checked: boolean; onChange: (checked: boolean) => void; label: ReactNode; muted?: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[var(--color-brand-orange)]"
      />
      <span className={cn('text-[13px] leading-[1.6]', muted ? 'text-[var(--color-text-tertiary)]' : 'text-[#333333]')}>{label}</span>
    </label>
  );
}

function Optional() {
  return <span className="ml-1 text-xs font-normal text-[var(--color-text-faint)]">(optional)</span>;
}

function ErrorMessage({ msg }: { msg: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs font-medium text-[var(--color-brand-orange-hover)]">
      {msg}
    </motion.div>
  );
}

type UpdateField = <K extends keyof FormData>(key: K, value: FormData[K]) => void;
type ToggleMulti = (key: 'tractionSignals' | 'fundingPaths' | 'materials' | 'challenges', value: string) => void;

type StepProps = {
  formData: FormData;
  errors: ErrorMap;
  updateField: UpdateField;
  toggleMulti: ToggleMulti;
};

type StepFiveProps = StepProps & {
  uploadedFiles: File[];
  isDragging: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  setIsDragging: (value: boolean) => void;
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
};

type ReviewSection = {
  title: string;
  items: string[];
  step: number;
};

type StepSevenProps = StepProps & {
  reviewSections: ReviewSection[];
  setStep: (step: number) => void;
};
