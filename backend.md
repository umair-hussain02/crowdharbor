Based on your dashboard screenshots, you **should not focus on moving `const data = []` to `data.ts` first**.

Your dashboard is not just static content. It has real production entities:

```txt id="ihzxeq"
Submissions
Reports
Payments
Blog articles
Pages / SEO / FAQs
Settings
Emails
Services pricing
Integrations
Analytics
Performance
```

So the production-grade approach is:

```txt id="ca7345"
Current arrays → use as seed/default data
Real admin data → database
Dashboard actions → APIs
Website forms/emails/payments → APIs + webhooks
```

## How many APIs are needed?

For your dashboard, I would plan around **18 API route groups**.

Not 18 buttons. Not 18 pages.
You need APIs by **resource**.

## Recommended API list

### 1. Dashboard overview

Used for the main dashboard cards, charts, funnel, revenue summary.

```txt id="94xexi"
GET /api/admin/dashboard
```

Returns:

```txt id="xhrgjw"
total visitors
intake starts
new submissions
revenue
completion rate
pending payments
reports pending
reports delivered
visitor chart
conversion funnel
```

---

### 2. Submissions

Used for the submissions table, search, filters, detail view.

```txt id="aqqgck"
GET    /api/admin/submissions
POST   /api/admin/submissions
GET    /api/admin/submissions/[id]
PATCH  /api/admin/submissions/[id]
DELETE /api/admin/submissions/[id]
```

This is one of your most important APIs.

Data includes:

```txt id="3vbsos"
founder name
company
email
service
stage
payment status
submission status
date
form answers
uploaded files
```

---

### 3. Public intake form

Used by the frontend intake form.

```txt id="w6ig9m"
POST /api/intake
```

This creates a new submission.

Flow:

```txt id="8bojcj"
validate form
save submission
send admin email
send user confirmation email
optionally create Stripe checkout/payment link
```

---

### 4. Reports

Used for reports page: not started, drafting, ready to send, delivered, overdue.

```txt id="9gj8x3"
GET   /api/admin/reports
GET   /api/admin/reports/[id]
PATCH /api/admin/reports/[id]
```

For report upload:

```txt id="w014af"
POST /api/admin/reports/[id]/upload
```

For sending/delivering report:

```txt id="te7a26"
POST /api/admin/reports/[id]/deliver
```

This should update report status and send email to the founder.

---

### 5. Payments

Used for payments table and payment stats.

```txt id="rkgguf"
GET /api/admin/payments
GET /api/admin/payments/[id]
```

For sending a payment link:

```txt id="ehqd7z"
POST /api/admin/payments/[id]/send-link
```

For refunds, if needed:

```txt id="ijpo4j"
POST /api/admin/payments/[id]/refund
```

---

### 6. Stripe webhook

Very important for production.

```txt id="q9x7f9"
POST /api/webhooks/stripe
```

This handles:

```txt id="28fdev"
checkout.session.completed
payment_intent.succeeded
payment_intent.payment_failed
charge.refunded
```

Your dashboard should not manually guess payment status. Stripe webhook should update the database.

---

### 7. Blog articles

Used for blog list, create/edit article page, draft, publish, preview.

```txt id="7bnuq5"
GET    /api/admin/blog/articles
POST   /api/admin/blog/articles
GET    /api/admin/blog/articles/[id]
PATCH  /api/admin/blog/articles/[id]
DELETE /api/admin/blog/articles/[id]
```

For publishing:

```txt id="15c34d"
POST /api/admin/blog/articles/[id]/publish
```

For duplicate action:

```txt id="7659j5"
POST /api/admin/blog/articles/[id]/duplicate
```

---

### 8. Blog categories

Used by the category dropdown in blog editor.

```txt id="66nwfu"
GET    /api/admin/blog/categories
POST   /api/admin/blog/categories
PATCH  /api/admin/blog/categories/[id]
DELETE /api/admin/blog/categories/[id]
```

---

### 9. Public blog

Used by public website blog pages.

```txt id="zkxof3"
GET /api/blog
GET /api/blog/[slug]
```

Alternative: public blog pages can fetch directly from the database in server components. But having public APIs is useful if you want easier reuse later.

---

### 10. Pages / SEO

Used for Pages screen: Homepage, Services, Pricing, Sample Report, Intake Form, etc.

```txt id="afhvuk"
GET   /api/admin/pages
GET   /api/admin/pages/[slug]
PATCH /api/admin/pages/[slug]
```

Data includes:

```txt id="ekzwrh"
page title
slug
status
SEO title
meta description
SEO status
content fields
updated date
```

---

### 11. Page FAQs

From your screenshot, FAQs are edited inside the Pages section. I would make FAQs separate but linked to pages.

```txt id="r2123r"
GET    /api/admin/pages/[slug]/faqs
POST   /api/admin/pages/[slug]/faqs
PATCH  /api/admin/pages/[slug]/faqs/[faqId]
DELETE /api/admin/pages/[slug]/faqs/[faqId]
```

This is better than storing FAQs only inside one big JSON field because you may need reorder, add, delete, or hide FAQs.

---

### 12. Services settings

Used for service pricing and visibility.

```txt id="sat3ax"
GET   /api/admin/settings/services
PATCH /api/admin/settings/services
```

Stores:

```txt id="rc4dzw"
Funding Readiness Review price
Capital Pathway Sprint price
Fundraising Preparation Program price
Partner Workshops visibility
service active/inactive
```

This should also affect your frontend pricing/services page.

---

### 13. General settings

Used for site name, timezone, currency, admin/support/contact email.

```txt id="i1d23t"
GET   /api/admin/settings/general
PATCH /api/admin/settings/general
```

---

### 14. Email settings

Used for sender name, sender email, admin notification email, support email.

```txt id="bwxnb5"
GET   /api/admin/settings/email
PATCH /api/admin/settings/email
POST  /api/admin/settings/email/test
```

Important: store normal email settings in database, but keep provider API keys in `.env`.

Good:

```env id="0msd7p"
RESEND_API_KEY=
```

Do not store this in the dashboard database unless you really know what you are doing.

---

### 15. Contact form

Used by public contact page.

```txt id="dh7i3j"
POST /api/contact
```

Flow:

```txt id="nptkgb"
validate
save message
send admin notification
send user confirmation if needed
```

---

### 16. Newsletter, optional

Only needed if you have newsletter signup.

```txt id="s53tuw"
POST /api/newsletter
```

---

### 17. Admin users

Used by Settings → Admin Users.

```txt id="ucb44e"
GET    /api/admin/users
POST   /api/admin/users
PATCH  /api/admin/users/[id]
DELETE /api/admin/users/[id]
```

If you use Clerk, Supabase Auth, or Auth.js, this API may be smaller because the auth provider handles some user management.

---

### 18. Performance / health

Used by Performance screen.

```txt id="u3ajb7"
GET /api/admin/health
```

Returns:

```txt id="1mdrm4"
database status
email service status
Stripe webhook status
file upload status
admin auth status
blog CMS status
analytics configured status
```

For actual performance metrics like LCP, CLS, INP, you may later connect Vercel Analytics, PostHog, GA4, or your own tracking.

---

## API count summary

For your dashboard, I would say:

```txt id="1vqbgm"
Required MVP APIs: 12 route groups
Production full dashboard APIs: 18 route groups
```

### Required first

```txt id="xcesg3"
1. /api/intake
2. /api/admin/submissions
3. /api/admin/submissions/[id]
4. /api/admin/reports
5. /api/admin/reports/[id]
6. /api/admin/reports/[id]/upload
7. /api/admin/payments
8. /api/webhooks/stripe
9. /api/admin/blog/articles
10. /api/admin/blog/articles/[id]
11. /api/admin/pages
12. /api/admin/pages/[slug]
```

### Add after that

```txt id="hhx8kb"
13. /api/admin/pages/[slug]/faqs
14. /api/admin/settings/general
15. /api/admin/settings/services
16. /api/admin/settings/email
17. /api/contact
18. /api/admin/dashboard
```

Then later:

```txt id="kk0ape"
19. /api/admin/health
20. /api/admin/users
21. /api/newsletter
22. /api/blog
23. /api/blog/[slug]
24. /api/admin/blog/categories
```

---

# Prerequisites before writing APIs

Before you write the APIs, set up these things.

## 1. Database

Use one of these:

```txt id="8m1cnn"
Supabase Postgres
Neon Postgres
Railway Postgres
PlanetScale
```

For your dashboard, I would choose:

```txt id="anljmd"
Supabase Postgres
```

because you also need file storage for reports.

## 2. ORM

Use one:

```txt id="6248lc"
Prisma
Drizzle
```

For easier development, I would use **Prisma**.

Recommended structure:

```txt id="rh9prh"
src/lib/db.ts
prisma/schema.prisma
```

## 3. Authentication

Your admin APIs must be protected.

You need:

```txt id="vpwa1s"
admin login
session check
role check
protected admin routes
protected admin APIs
```

Options:

```txt id="4pj5pp"
Auth.js / NextAuth
Supabase Auth
Clerk
```

## 4. File storage

For report uploads, you need storage.

Use:

```txt id="01s7p2"
Supabase Storage
AWS S3
Cloudflare R2
UploadThing
```

For your case, Supabase Storage is enough.

## 5. Email provider

Use:

```txt id="k7z3go"
Resend
Postmark
SendGrid
```

For your website, I would use **Resend**.

You need emails for:

```txt id="f2hi50"
new intake submission
admin notification
payment link sent
report delivered
contact form
user confirmation
```

## 6. Stripe

Since your dashboard has payments, you need:

```txt id="xorzp8"
Stripe secret key
Stripe webhook secret
Stripe checkout/payment links
success URL
failed URL
currency config
```

Do not manually mark paid from the frontend. Use Stripe webhooks to update payment status.

## 7. Validation

Use `zod`.

Create:

```txt id="1is3fk"
src/lib/validators/
```

Examples:

```txt id="d43yap"
intake.schema.ts
submission.schema.ts
report.schema.ts
article.schema.ts
page.schema.ts
settings.schema.ts
contact.schema.ts
```

## 8. Environment variables

You will need:

```env id="zo7xbp"
DATABASE_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

RESEND_API_KEY=
EMAIL_FROM=
ADMIN_NOTIFICATION_EMAIL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=
```

Never expose secret keys with `NEXT_PUBLIC_`.

---

# Recommended database tables

For your dashboard, start with these tables:

```txt id="op9tse"
users
submissions
reports
payments
articles
blog_categories
pages
page_faqs
services
settings
contact_messages
audit_logs
```

Optional later:

```txt id="ekpje5"
analytics_events
newsletter_subscribers
uploaded_files
email_logs
payment_events
```

## Minimum tables for first version

Start with only these:

```txt id="dwlzfu"
submissions
reports
payments
articles
pages
page_faqs
services
settings
contact_messages
```

That is enough to make most of your dashboard real.

---

# Best implementation order

Do not build all APIs at once.

Build in this order:

```txt id="gk1uud"
1. Database + Prisma setup
2. Auth protection for admin routes
3. Settings APIs
4. Services/pricing APIs
5. Intake form API
6. Submissions admin APIs
7. Email sending
8. Stripe checkout + webhook
9. Payments admin APIs
10. Reports APIs + upload
11. Blog CRUD APIs
12. Pages + SEO + FAQs APIs
13. Dashboard summary API
14. Health/performance API
```

This order is good because each step depends on the previous one.

For example:

```txt id="qu5i7n"
Services pricing → needed before payment
Intake form → creates submission
Payment webhook → updates payment
Report upload → depends on submission/report
Dashboard stats → depends on real data
```

---

# Final recommendation

Your production-grade approach should be:

```txt id="zgyu7z"
Do not migrate all arrays to data.ts right now.
Set up database first.
Use current arrays as seed data.
Build dashboard APIs around real database models.
Connect public forms, emails, payments, and reports.
Move only truly static developer-controlled arrays to data.ts later.
```

For your dashboard, the first APIs I would personally build are:

```txt id="zhz9hx"
/api/admin/settings/services
/api/intake
/api/admin/submissions
/api/admin/submissions/[id]
/api/contact
/api/webhooks/stripe
/api/admin/payments
/api/admin/reports
/api/admin/reports/[id]/upload
/api/admin/blog/articles
/api/admin/pages
/api/admin/pages/[slug]
```
