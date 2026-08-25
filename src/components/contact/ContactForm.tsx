'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertCircle, Upload, X, FileText } from 'lucide-react';
import { contactTw, cn } from './contactTailwind';
import { trackEvent } from '@/lib/analytics/track';

const ease = [0.22, 1, 0.36, 1] as const;

const inquiryTypes = [
  'Founder question',
  'Readiness Review question',
  'Capital Pathway Sprint question',
  'Preparation Program question',
  'Workshop / partner inquiry',
  'Accelerator / university inquiry',
  'Support question',
  'Media / collaboration',
  'Other',
];

const requiredFields = [
  { name: 'name', label: 'Full name', type: 'text', placeholder: 'Your full name' },
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'your@email.com' },
] as const;

const optionalFields = [
  { name: 'company', label: 'Company or organization', placeholder: 'Company name' },
  { name: 'website', label: 'Website or LinkedIn', placeholder: 'https://' },
] as const;

type Status = 'idle' | 'submitting' | 'success' | 'error';

type FieldName = 'name' | 'email' | 'company' | 'website';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const values: Record<FieldName, string> = { name, email, company, website };
  const setters: Record<FieldName, (value: string) => void> = { name: setName, email: setEmail, company: setCompany, website: setWebsite };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Please enter your name.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Please enter a valid email address.';
    if (!inquiryType) e.inquiryType = 'Please choose an inquiry type.';
    if (!message.trim()) e.message = 'Please write a short message.';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          inquiryType,
          message,
          company,
          website,
          uploadedFile: uploadedFile
            ? { name: uploadedFile.name, size: uploadedFile.size, type: uploadedFile.type }
            : null,
          honeypot,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        if (result?.fieldErrors) {
          setErrors((prev) => ({ ...prev, ...result.fieldErrors }));
        }
        setStatus('error');
        return;
      }

      trackEvent('contact_submit', { inquiryType });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleFile = (file: File) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/png',
      'image/jpeg',
    ];

    if (allowed.includes(file.type)) setUploadedFile(file);
  };

  const inputClass = (hasError?: boolean) => cn(contactTw.input, hasError ? 'border-[var(--color-brand-orange)]' : 'border-[var(--color-border)]');

  if (status === 'success') {
    return (
      <section id="contact-form" className={contactTw.sectionCream}>
        <div className={contactTw.formContainer}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease }}
            className="rounded-[28px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] px-10 py-14"
          >
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-[var(--color-brand-orange-tint)]">
              <CheckCircle size={32} color="var(--color-brand-orange)" />
            </div>
            <h2 className="mb-3 text-[26px] font-extrabold tracking-[var(--letter-spacing-snug)] text-[var(--color-text-primary)]">
              Your inquiry has been submitted.
            </h2>
            <p className="mb-8 text-base leading-[1.65] text-[var(--color-text-secondary)]">
              Thank you for contacting CrowdHarbor. We have received your message and will review it based on your inquiry type.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-bg-black)] px-[22px] py-3 text-sm font-bold text-[var(--color-text-on-dark)] no-underline transition-colors duration-200 hover:bg-[#222]">
                Return Home
              </Link>
              <Link href="/intake" className={cn(contactTw.primaryButton, 'px-[22px] py-3 text-sm')}>
                Start Founder Intake <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className={contactTw.sectionCream}>
      <div className={contactTw.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-9"
        >
          <div className={contactTw.eyebrow}>Get in touch</div>
          <h2 className={contactTw.title}>Send us a message.</h2>
          <p className="max-w-[540px] text-base leading-[1.6] text-[var(--color-text-secondary)]">
            Use this form for general questions, support, workshop inquiries, or partnership conversations. If you are ready for a readiness review, use the founder intake form.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_360px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
            className="rounded-[24px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] p-10"
          >
            <form onSubmit={handleSubmit} noValidate>
              <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                <label htmlFor="contact_hp_field">Leave this field empty</label>
                <input
                  id="contact_hp_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                />
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {requiredFields.map(field => (
                  <div key={field.name}>
                    <label className={contactTw.label}>
                      {field.label} <span className="text-[var(--color-brand-orange)]">*</span>
                    </label>
                    <input
                      type={field.type}
                      value={values[field.name]}
                      onChange={e => setters[field.name](e.target.value)}
                      placeholder={field.placeholder}
                      className={inputClass(Boolean(errors[field.name]))}
                    />
                    {errors[field.name] && <div className={contactTw.error}>{errors[field.name]}</div>}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className={contactTw.label}>
                  Inquiry type <span className="text-[var(--color-brand-orange)]">*</span>
                </label>
                <select
                  value={inquiryType}
                  onChange={e => setInquiryType(e.target.value)}
                  className={cn(inputClass(Boolean(errors.inquiryType)), 'cursor-pointer appearance-none')}
                >
                  <option value="">Select inquiry type</option>
                  {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.inquiryType && <div className={contactTw.error}>{errors.inquiryType}</div>}
              </div>

              <div className="mb-4">
                <label className={contactTw.label}>
                  Message <span className="text-[var(--color-brand-orange)]">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us what you need help with, what stage you are in, or what type of inquiry you are making."
                  rows={5}
                  className={cn(inputClass(Boolean(errors.message)), 'resize-y')}
                />
                {errors.message && <div className={contactTw.error}>{errors.message}</div>}
              </div>

              <div className="mb-4 border-t border-[var(--color-border)] pt-4">
                <div className="mb-3.5 text-xs font-bold uppercase tracking-[var(--letter-spacing-wider)] text-[var(--color-text-subtle)]">
                  Optional information
                </div>
                <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                  {optionalFields.map(field => (
                    <div key={field.name}>
                      <label className={cn(contactTw.label, 'text-[var(--color-text-tertiary)]')}>{field.label}</label>
                      <input
                        type="text"
                        value={values[field.name]}
                        onChange={e => setters[field.name](e.target.value)}
                        placeholder={field.placeholder}
                        className={inputClass()}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className={cn(contactTw.label, 'text-[var(--color-text-tertiary)]')}>
                  Attach a document <span className="text-[11px] font-medium text-[var(--color-text-subtle)]">(optional)</span>
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                  className={cn(
                    'cursor-pointer rounded-[12px] border-[1.5px] border-dashed p-4 text-center transition-all duration-200',
                    isDragging
                      ? 'border-[var(--color-brand-orange)] bg-[rgba(253,102,40,0.04)]'
                      : 'border-[var(--color-border)] bg-[var(--color-bg-cream)]',
                  )}
                >
                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-2.5">
                      <FileText size={16} color="var(--color-brand-orange)" />
                      <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">{uploadedFile.name}</span>
                      <button type="button" onClick={e => { e.stopPropagation(); setUploadedFile(null); }} className="cursor-pointer border-0 bg-transparent p-0.5">
                        <X size={14} color="var(--color-text-subtle)" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload size={18} color="var(--color-text-subtle)" className="mx-auto mb-1.5" />
                      <div className="text-[13px] font-medium text-[var(--color-text-subtle)]">
                        Optional: Attach a document if it helps us understand your inquiry.
                      </div>
                      <div className="mt-1 text-[11px] text-[var(--color-text-faint)]">PDF, DOC, PPT, PNG, JPG</div>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              </div>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 flex items-center gap-2.5 rounded-[10px] border border-[rgba(253,102,40,0.2)] bg-[var(--color-brand-orange-tint-soft)] px-4 py-3"
                  >
                    <AlertCircle size={16} color="var(--color-brand-orange)" />
                    <div>
                      <div className="text-[13px] font-bold text-[var(--color-text-primary)]">Something went wrong.</div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">Your message was not submitted. Please try again or email CrowdHarbor directly.</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] border-0 p-3.5 font-[Manrope,sans-serif] text-[15px] font-bold text-[var(--color-text-on-dark)] transition-colors duration-200',
                  status === 'submitting'
                    ? 'cursor-not-allowed bg-[var(--color-brand-orange-hover)]'
                    : 'cursor-pointer bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-hover)]',
                )}
              >
                {status === 'submitting' ? 'Submitting...' : (<>Submit Inquiry <ArrowRight size={15} /></>)}
              </button>
              <p className="mt-3 text-center text-xs text-[var(--color-text-subtle)]">
                We review inquiries and respond based on inquiry type. For urgent founder preparation, use the intake form.
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-[22px] border-[1.5px] border-l-4 border-[var(--color-border)] border-l-[var(--color-brand-orange)] bg-[var(--color-bg-white)] p-7">
              <div className="mb-3 text-[13px] font-bold uppercase tracking-[var(--letter-spacing-wider)] text-[var(--color-brand-orange)]">Ready for a review?</div>
              <h3 className="mb-2.5 text-[17px] font-extrabold leading-[1.3] text-[var(--color-text-primary)]">Ready for a funding-readiness review?</h3>
              <p className="mb-4 text-sm leading-[1.65] text-[var(--color-text-secondary)]">
                If you want CrowdHarbor to review your company stage, traction, materials, funding goal, and preparation gaps, start with the founder intake form.
              </p>
              <div className="mb-5 flex flex-col gap-2">
                {['Share your company stage', 'Upload current materials', 'Explain your funding goal', 'Identify your biggest challenge', 'Begin the review process'].map(b => (
                  <div key={b} className="flex items-center gap-2">
                    <div className="size-[5px] shrink-0 rounded-full bg-[var(--color-brand-orange)]" />
                    <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">{b}</span>
                  </div>
                ))}
              </div>
              <Link href="/intake" className={cn(contactTw.primaryButton, 'mb-2.5 flex px-5 py-3 text-sm')}>
                Start Founder Intake <ArrowRight size={14} />
              </Link>
              <Link href="/sample-report" className="flex items-center justify-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-cream)] px-5 py-[11px] text-[13px] font-bold text-[var(--color-text-primary)] no-underline transition-colors duration-200 hover:border-[var(--color-text-primary)]">
                View Sample Report
              </Link>
            </div>

            <div className="rounded-[18px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-white)] p-[22px]">
              <div className="mb-3 text-[13px] font-bold text-[var(--color-text-primary)]">Prefer email?</div>
              <a href="mailto:contact@crowdharbor.com" className="mb-1.5 block text-sm font-semibold text-[var(--color-brand-orange)] no-underline hover:underline">
                contact@crowdharbor.com
              </a>
              <p className="m-0 text-xs leading-[1.5] text-[var(--color-text-subtle)]">For general questions, founder support, and partnerships.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
