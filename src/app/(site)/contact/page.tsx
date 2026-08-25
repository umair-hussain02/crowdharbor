'use client';

import { ContactHero } from '@/components/contact/ContactHero';
import { ContactPathSelector } from '@/components/contact/ContactPathSelector';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactWorkshops } from '@/components/contact/ContactWorkshops';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactTimeline } from '@/components/contact/ContactTimeline';
import { ContactFAQ } from '@/components/contact/ContactFAQ';
import { ContactFinalCTA } from '@/components/contact/ContactFinalCTA';

export default function Page() {
  return (
    <>
      <ContactHero />
        <ContactPathSelector />
        <ContactForm />
        <ContactWorkshops />
        <ContactInfo />
        <ContactTimeline />
        <ContactFAQ />
        <ContactFinalCTA />
    </>
  );
}
