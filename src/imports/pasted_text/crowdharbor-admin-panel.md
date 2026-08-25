# Task: Build CrowdHarbor Private Admin Panel

Please create a private internal **CrowdHarbor Admin Panel** for managing founder submissions, intake reviews, payments, reports, blog/resources, page content, analytics, performance, and website settings.

This admin panel should feel like a professional internal operating system for CrowdHarbor, not a basic backend screen.

The public website brings founders in.

The admin panel manages what happens after:

* Who submitted the intake
* Which company they represent
* What service they selected
* What their funding goal is
* What materials they uploaded
* Whether payment is complete or pending
* Which submissions need review
* Which reports need delivery
* Which blog posts are live or drafted
* Which pages are converting
* Whether forms, uploads, payments, and website systems are healthy

---

# Important MVP Rule

Do not overbuild the admin panel for the first launch.

The first version should focus only on the most important launch operations.

## Must-Have for Launch

Build these first:

1. Admin login
2. Dashboard overview
3. Founder submissions list
4. Founder submission detail page
5. Payment overview
6. Reports tracking page
7. Blog list
8. Blog editor
9. Page content / FAQ editor
10. Analytics overview
11. Website performance / health overview
12. Admin settings

## Do Not Build Yet

These can wait until later:

* Advanced CRM pipelines
* AI report generation
* Full report builder
* Partner dashboard
* Founder dashboard
* Advanced role permissions
* Automated scoring
* Advanced SEO crawler
* Internal messaging
* Full media library
* Advanced email template editor

Build a clean, fast, practical admin panel that helps CrowdHarbor launch and operate.

---

# Required Admin Routes

Create the admin route system under:

`/admin`

Recommended routes:

* `/admin`
* `/admin/login`
* `/admin/dashboard`
* `/admin/submissions`
* `/admin/submissions/[id]`
* `/admin/payments`
* `/admin/reports`
* `/admin/blog`
* `/admin/blog/new`
* `/admin/blog/[id]/edit`
* `/admin/pages`
* `/admin/pages/[slug]/edit`
* `/admin/analytics`
* `/admin/performance`
* `/admin/settings`

Optional future routes:

* `/admin/media`
* `/admin/seo`
* `/admin/email-templates`
* `/admin/activity-log`
* `/admin/users`

---

# Admin Access and Security

The admin panel must be private and login-protected.

Do not allow public access to `/admin`.

## Security Requirements

The admin panel should include:

* Protected login
* Session-based access
* Logout button
* No public access to admin pages
* Secure handling of founder submissions
* Secure handling of uploaded files
* File upload validation
* Stripe webhook security
* Environment variables for API keys
* Basic rate limiting
* Admin activity logging where possible
* Session expiration
* Role-based access if possible

## Important Security Rule

Uploaded founder files must not be publicly accessible.

Founders may upload sensitive documents such as:

* Pitch decks
* Financial models
* Business plans
* Data room documents
* Use-of-funds documents
* Customer proof
* Cap table documents

These files should only be accessible to authorized admins.

---

# Recommended Tech Stack

Use the existing public website stack.

## Frontend

* Next.js
* Tailwind CSS
* shadcn/ui
* Recharts for charts
* TanStack Table for tables
* React Hook Form for forms
* Zod for validation
* Framer Motion only for very subtle admin transitions

## Backend / Database Options

Preferred MVP option:

### Supabase

Use Supabase for:

* Auth
* Database
* File storage
* Admin data
* Row-level security

Alternative fast MVP options:

* Airtable + Next.js for quick database workflow
* Sanity / Payload CMS for blog and page editing
* Stripe for payments
* Resend, SendGrid, or Postmark for email
* Vercel Analytics, GA4, PostHog, or Plausible for analytics
* Sentry for error monitoring
* Supabase Storage, AWS S3, UploadThing, or Cloudflare R2 for file storage

---

# Admin Brand Style

The admin should use the CrowdHarbor brand system but feel more functional than the public website.

## Colors

Use:

* Main background: `#F5F5EE`
* Text: `#000000`
* Cards: `#FFFFFF`
* Primary orange: `#FD6628`
* Muted text: `#444444`
* Border: `#E0E0E0`

## Admin Feeling

The admin should feel:

* Clean
* Fast
* Professional
* Organized
* Data-focused
* Easy to scan
* Serious
* Minimal
* Operational

It should not feel:

* Too decorative
* Too colorful
* Like a marketing page
* Like a cheap dashboard template
* Like a complex enterprise CRM
* Like a playful SaaS dashboard

## 3D Direction

Do not use heavy 3D inside the admin panel.

The admin should prioritize speed, clarity, tables, forms, charts, and workflow.

---

# Global Admin Layout

Use a classic dashboard layout.

## Desktop Layout

Left sidebar:

* CrowdHarbor logo
* Dashboard
* Submissions
* Reports
* Payments
* Blog
* Pages
* Analytics
* Performance
* Settings
* Logout at bottom

Top bar:

* Page title
* Global search
* Quick action button
* Notifications
* Admin profile menu

Main content area:

* KPI cards
* Tables
* Charts
* Forms
* Editors
* Status cards

## Sidebar Design

Sidebar should be fixed on desktop.

Include:

* CrowdHarbor logo at top
* Navigation items with icons
* Active page highlight
* Small system status indicator
* Logout button at bottom

Active item style:

* Orange left border or light orange background tint
* Black text
* Orange icon
* Clear active state

## Top Bar Design

Top bar should include:

* Page title
* Short page description if useful
* Global search input
* Notification bell
* Quick action button
* Admin profile menu

Global search placeholder:

**Search founders, companies, posts, or payments...**

Quick action button options:

* **New Blog Post**
* **View New Submissions**
* **Create Report**
* **Export CSV**

## Mobile / Tablet Admin

Desktop is the priority, but tablet should work.

Mobile can use:

* Collapsible sidebar
* Hamburger menu
* Stacked KPI cards
* Horizontally scrollable tables
* Simplified top bar
* Full-width forms

---

# Admin Login Page

Create a clean login page at:

`/admin/login`

## Page Goal

Allow only authorized admins to access the dashboard.

## Login Page Copy

Heading:

**CrowdHarbor Admin**

Supporting text:

**Sign in to manage founder submissions, reports, payments, content, and website operations.**

Fields:

* Email
* Password

Button:

**Sign In**

Secondary link:

**Forgot password?**

Security note:

**Admin access is restricted to authorized CrowdHarbor team members.**

## Design

Use a centered white login card.

Style:

* Background: `#F5F5EE`
* Card: `#FFFFFF`
* Border: `#E0E0E0`
* Orange primary button
* Clean and minimal
* No public marketing navigation

---

# Admin Dashboard Page

Route:

`/admin/dashboard`

## Purpose

The Dashboard is the first screen after login.

It should show the health of the business and website at a glance.

## Page Title

**Dashboard**

## Supporting Text

**Track founder submissions, conversions, payments, reports, content, and website performance.**

## MVP KPI Cards

Show these KPI cards first:

1. Total Visitors
2. Intake Starts
3. Intake Completed
4. Intake Completion Rate
5. New Submissions
6. Pending Payments
7. Revenue
8. Reports Pending

## KPI Card Design

Each KPI card should include:

* Metric title
* Main number
* Change from previous period
* Small icon
* Status indicator if needed

Example:

### Intake Completion Rate

38%

+12% from last 7 days

## Dashboard Sections

After KPI cards, include these sections:

---

## Section 1: Recent Founder Submissions

Small table showing latest submissions.

Columns:

* Founder
* Company
* Service
* Stage
* Status
* Submitted date
* Action

Action:

**View**

---

## Section 2: Conversion Funnel

Show visual funnel:

Website Visit → CTA Click → Intake Started → Intake Completed → Payment Completed

Display:

* Count per step
* Drop-off percentage
* Completion rate

Design:

* White card
* Simple funnel bars
* Orange highlight for completed steps
* Muted gray for drop-offs

---

## Section 3: Payment Overview

Show:

* Completed payments
* Pending payments
* Failed payments
* Total revenue
* Refunds if available

Use status cards and a small table if useful.

---

## Section 4: Report Workflow

Show:

* Reports not started
* Reports drafting
* Reports ready to send
* Reports delivered
* Overdue reports

CTA:

**View Reports**

---

## Section 5: Content Overview

Show:

* Published blogs
* Draft blogs
* Scheduled blogs
* Most viewed article
* Articles needing SEO updates

CTA:

**Manage Blog**

---

## Section 6: Website Health

Show status for:

* Website
* Intake form
* File uploads
* Stripe payments
* Email service
* Admin login
* Analytics tracking
* Latest error

Status options:

* Healthy
* Warning
* Down
* Not configured

Use green only for healthy status. Use orange for warnings. Use red only for critical issues.

---

# Founder Submissions Page

Route:

`/admin/submissions`

## Purpose

This page is the internal CRM for all founder intake submissions.

Admins should be able to search, filter, review, update, and manage founder submissions.

## Page Title

**Founder Submissions**

## Supporting Text

**Review founder intake submissions, track service interest, update statuses, and manage next steps.**

## Main Actions

Top actions:

* Search submissions
* Filter by status
* Filter by selected service
* Filter by company stage
* Filter by payment status
* Export CSV
* Open submission detail

Primary button:

**Export CSV**

Secondary button:

**View New Submissions**

## Submission Statuses

Use clear status pills:

* New
* Under Review
* Need More Info
* Payment Pending
* Payment Complete
* Report In Progress
* Report Delivered
* Strategy Session Scheduled
* Closed
* Rejected / Not Fit

## Table Columns

Use these table columns:

* Founder name
* Company name
* Email
* Selected service
* Company stage
* Funding goal
* Payment status
* Review status
* Submitted date
* Actions

## Row Actions

Each row should allow:

* View details
* Change status
* Send email
* Add internal note
* Mark as reviewed

Use a three-dot action menu to keep the table clean.

## Filters

Include filters for:

### Service

* Funding Readiness Review
* Capital Pathway Sprint
* Fundraising Preparation Program
* Workshop Inquiry

### Stage

* Idea stage
* MVP
* Product live
* Users but no revenue
* Revenue generating
* Preparing to raise
* Already fundraising

### Payment

* Not required
* Pending
* Completed
* Failed
* Refunded

### Review Status

* New
* Reviewing
* Need more info
* Report pending
* Delivered

## Design

Use a clean data table with:

* Search bar
* Filter chips
* Status pills
* Row hover state
* Action menu
* Pagination
* Sortable columns
* Empty state

Empty state copy:

**No submissions found.**

Supporting text:

**Try adjusting filters or check again after new intake submissions arrive.**

---

# Submission Detail Page

Route:

`/admin/submissions/[id]`

## Purpose

This is one of the most important admin pages.

It should show everything about one founder submission in one organized place.

## Page Title Format

**Founder Submission: [Company Name]**

## Top Summary Card

Show:

* Founder name
* Company name
* Email
* Phone optional
* Country
* Website / social link
* Selected service
* Submission date
* Current review status
* Payment status

## Top Quick Actions

Include buttons:

* **Mark Under Review**
* **Request More Info**
* **Create Report**
* **Send Payment Link**
* **Mark Delivered**

Keep dangerous or final actions inside confirmation modals.

## Main Tabs

Use tabs to organize information:

1. Overview
2. Intake Answers
3. Uploaded Files
4. Review Notes
5. Report Status
6. Emails / Activity
7. Payment

---

## Tab 1: Overview

Show high-level founder/company summary:

* Company stage
* Industry
* Traction
* Monthly revenue range
* Funding goal
* Funding timeline
* Preferred funding path
* Biggest challenge
* Selected service
* Current status

Add a right-side admin summary panel:

* Assigned admin
* Review due date
* Report status
* Payment status
* Last activity

---

## Tab 2: Intake Answers

Show full intake form answers grouped by step:

* Founder Details
* Company Stage
* Traction
* Funding Goal
* Materials
* Challenges
* Selected Service
* Disclaimer Consent

Each group should appear inside a white card.

Answers should be easy to scan.

Do not show all answers as one long paragraph.

Use labels and values.

Example:

Label:

**Funding goal**

Value:

**€150,000–€500,000**

---

## Tab 3: Uploaded Files

Show all uploaded files.

Columns:

* File name
* File type
* File size
* Upload date
* Status
* Actions

File statuses:

* Uploaded
* Reviewed
* Needs Replacement
* Missing
* Not Required

Admin actions:

* Download file
* Preview file if possible
* Mark reviewed
* Add file note
* Request updated file

Security rule:

Do not expose public file URLs.

## File Notes

Allow admin to add notes like:

* Financial model missing assumptions
* Deck needs updated version
* Cap table not included
* File unreadable
* Request replacement

---

## Tab 4: Review Notes

This tab is where the team adds internal review notes.

Use structured fields instead of one giant notes box.

Fields:

* Internal review summary
* Founder strengths
* Weaknesses
* Top blockers
* Material gaps
* Pitch deck notes
* Financial readiness notes
* Data room notes
* Capital pathway recommendation
* Suggested next step

These fields can later become the base for the founder report.

Buttons:

* **Save Notes**
* **Mark Review Complete**
* **Create Report Draft**

Show save status:

* Unsaved changes
* Saving...
* Saved

---

## Tab 5: Report Status

Show report workflow.

Report statuses:

* Not Started
* Drafting
* Internal Review
* Ready to Send
* Sent to Founder
* Revision Requested
* Completed

Fields:

* Report type
* Assigned admin
* Due date
* Report file link
* Delivery date
* Founder feedback
* Internal delivery notes

Actions:

* Upload report
* Preview report
* Mark ready
* Send report
* Mark delivered
* Request revision

MVP rule:

For launch, do not build a full report builder unless already planned.

Allow admin to upload a finished PDF/report file and track delivery status.

---

## Tab 6: Emails / Activity

Show timeline of important activity:

* Intake submitted
* Payment completed
* Admin changed status
* Email sent
* File uploaded
* Payment link sent
* Report uploaded
* Report delivered
* Strategy session scheduled

Each activity item should include:

* Date/time
* Action
* Admin/user
* Notes
* Link to relevant item if available

Activity timeline should be clean, chronological, and easy to scan.

---

## Tab 7: Payment

Show payment details:

* Stripe payment ID
* Amount
* Currency
* Service purchased
* Payment status
* Payment date
* Refund status
* Payment link if pending

Payment statuses:

* Paid
* Pending
* Failed
* Refunded
* Payment Link Sent
* Not Required

Actions:

* Send payment link
* Mark payment verified
* View in Stripe
* Record manual payment
* Add refund note

Important rule:

If payment is incomplete, show clearly that the review has not started unless manually approved.

---

# Reports Admin Page

Route:

`/admin/reports`

## Purpose

Manage founder reports and delivery workflow.

## Page Title

**Reports**

## Supporting Text

**Track readiness reviews, Sprint reports, preparation plans, and delivery status.**

## KPI Cards

Show:

* Reports pending
* Reports drafting
* Reports ready to send
* Reports delivered
* Overdue reports

## Report Table Columns

* Founder
* Company
* Service
* Report type
* Status
* Assigned to
* Due date
* Last updated
* Actions

## Report Statuses

Use status pills:

* Not Started
* Drafting
* Internal Review
* Ready to Send
* Sent
* Delivered
* Completed

## Report Actions

* Create report draft
* Upload report
* Preview report
* Send report
* Mark delivered
* Add notes
* Open submission

## MVP Recommendation

For launch, admin can upload a finished PDF or report file and track status.

Future report builder can include:

* Readiness score
* Strengths
* Weaknesses
* Top blockers
* Pitch review
* Financial review
* Data room checklist
* Capital pathway recommendation
* Action plan

---

# Payments Admin Page

Route:

`/admin/payments`

## Purpose

Track payments, pending payments, failed payments, refunds, and revenue.

## Page Title

**Payments**

## Supporting Text

**Track Stripe payments, pending reviews, failed payments, refunds, and service revenue.**

## KPI Cards

Show:

* Total revenue
* Completed payments
* Pending payments
* Failed payments
* Refunds
* Average order value

## Payment Table Columns

* Founder
* Company
* Service
* Amount
* Currency
* Payment status
* Stripe ID
* Payment date
* Actions

## Status Pills

* Paid
* Pending
* Failed
* Refunded
* Payment Link Sent
* Not Required

## Actions

* View payment
* Send payment link
* Open founder submission
* Mark manual payment
* Add refund note
* View in Stripe

## Design

Use a clean financial table.

Use orange for important actions.

Use calm warning style for failed or pending payments.

Use red only for serious failed payment/error states.

---

# Blog Admin Page

Route:

`/admin/blog`

## Purpose

Manage CrowdHarbor resources and blog articles.

Admins should be able to create, edit, draft, publish, schedule, and manage SEO for articles.

## Page Title

**Blog & Resources**

## Supporting Text

**Create and manage founder education articles, guides, templates, and resource content.**

## Primary Button

**New Article**

Link:

`/admin/blog/new`

## Blog Table Columns

* Title
* Category
* Status
* Author
* Last updated
* Publish date
* SEO status
* Actions

## Blog Statuses

* Draft
* Published
* Scheduled
* Needs Review
* Archived

## Filters

* Category
* Status
* Author
* Date
* SEO status

## Blog Categories

Use categories aligned with the public Resources page:

* Funding Readiness
* Pitch Deck Preparation
* Financial Readiness
* Data Room Basics
* Capital Pathways
* Crowdfunding Preparation
* Grant Readiness
* Accelerator Preparation
* Founder Strategy
* Fundraising Mistakes

## Row Actions

* Edit
* Preview
* Duplicate
* Archive
* Delete

Use confirmation modal for delete/archive actions.

---

# Blog Editor Page

Routes:

* `/admin/blog/new`
* `/admin/blog/[id]/edit`

## Page Title

Use:

**New Article**

or

**Edit Article**

## Purpose

Allow admin to write and publish SEO-friendly founder resources.

## Editor Layout

Use split layout.

Left side:

* Article editor

Right side:

* SEO settings
* Publish controls
* Preview button

## Required Content Fields

* Title
* Slug
* Excerpt
* Category
* Featured image optional
* Article body
* Author
* Read time
* Status

## SEO Fields

* SEO title
* Meta description
* Focus keyword
* OG title
* OG description
* OG image
* Canonical URL optional

## Publishing Fields

* Draft / Published / Scheduled
* Publish date
* Featured article toggle
* Related articles
* CTA block selection

## Editor Type

For MVP, use a rich text editor or markdown editor.

Admin should be able to add:

* Headings
* Paragraphs
* Bullets
* Numbered lists
* Links
* Images
* Quote blocks
* Checklist blocks
* CTA blocks
* Warning / note blocks

## Reusable Article Blocks

Create or plan these reusable blocks:

### Key Takeaway Block

Used to summarize main points.

### Checklist Block

Used for practical founder preparation checklists.

### Warning Block

Used for common mistakes or risk notes.

### CTA Block

Example copy:

**Want to know what applies to your company? Check your funding readiness.**

### Related Resource Block

Links to:

* Sample Report
* Services
* Pricing
* Intake

## Editor Buttons

* Save Draft
* Preview
* Publish
* Schedule
* Archive

## SEO Helper

Add simple SEO indicators:

* Title length good / too long
* Meta description good / too long
* Slug set
* Category selected
* Excerpt added
* Focus keyword added

Do not overbuild SEO. Keep it simple and useful.

---

# Page Content / FAQ Editor

Route:

`/admin/pages`

Detail route:

`/admin/pages/[slug]/edit`

## Purpose

Allow admin to safely update important page content without touching code.

This should not be a full page builder for MVP.

Use structured fields so admins cannot accidentally break the website layout.

## Editable Pages

Show these pages:

* Homepage
* How It Works
* Services
* Pricing
* Sample Report
* Intake Form
* Success Page
* Resources
* About
* Contact
* Privacy Policy
* Terms of Service
* Disclaimer

## Page Table Columns

* Page name
* Slug
* Status
* Last updated
* Updated by
* SEO status
* Actions

## MVP Editable Content

For first launch, only allow editing:

* FAQs
* Pricing numbers
* CTA text
* Page SEO title
* Page meta description
* Blog/resource content
* Basic page copy blocks if already structured

## Page Editor Structure

Use section-based editing.

Example for Homepage:

* Hero eyebrow
* Hero headline
* Hero subheadline
* Primary CTA
* Secondary CTA
* Founder pain section
* How it works section
* Services preview
* FAQ
* Final CTA
* SEO title
* Meta description

Example for Pricing Page:

* Hero headline
* Pricing card 1
* Pricing card 2
* Pricing card 3
* FAQ
* Final CTA
* SEO title
* Meta description

## Editing Controls

Each editable section should include:

* Text fields
* Toggle visibility if needed
* Preview button
* Save changes
* Publish changes
* Last updated timestamp
* Updated by admin
* Validation

## Important Rule

Do not use one giant HTML editor for full pages.

Use structured fields only.

---

# Analytics Admin Page

Route:

`/admin/analytics`

## Purpose

Show website and conversion performance.

This page should not replace Google Analytics completely. It should show business-critical metrics inside the admin.

## Page Title

**Analytics**

## Supporting Text

**Understand how visitors move through the website, where they convert, and where they drop off.**

## Date Filters

Allow filtering by:

* Today
* Last 7 days
* Last 30 days
* Last 90 days
* Custom date range

## Traffic Metrics

Show:

* Total visitors
* Page views
* Sessions
* Top pages
* Traffic sources
* Device breakdown
* Country breakdown

## Conversion Metrics

Show:

* CTA clicks
* Intake starts
* Intake completions
* Completion rate
* Payment completions
* Contact form submissions
* Newsletter signups
* Blog lead conversions

## Funnel Metrics

Show funnel:

1. Website visitors
2. CTA clicks
3. Intake starts
4. Intake submissions
5. Payment completed
6. Report delivered

## Page Performance Metrics

For each page show:

* Views
* CTA clicks
* Bounce rate if available
* Conversion rate
* Average time on page if available

## Recommended Charts

Use simple charts:

* Line chart for visitors over time
* Bar chart for top pages
* Funnel chart for conversion flow
* Donut chart for device split
* Table for top traffic sources

## MVP Analytics Data Sources

Use one or more:

* Database events
* Form events
* CTA click tracking
* Google Analytics
* Vercel Analytics
* Plausible
* PostHog

Do not build a full analytics system from scratch unless necessary.

---

# Website Performance / Health Page

Route:

`/admin/performance`

## Purpose

Help admins understand if the website, forms, uploads, payments, and email systems are working.

## Page Title

**Website Performance**

## Supporting Text

**Monitor site speed, system health, form errors, upload issues, payment failures, and recent website errors.**

## Section 1: Speed Overview

Show:

* Average page load time
* Largest Contentful Paint
* Interaction to Next Paint
* Cumulative Layout Shift
* Mobile performance score
* Desktop performance score

## Section 2: Page Speed by Page

Table columns:

* Page
* Load time
* Performance status
* Last checked
* Issues

Pages:

* Homepage
* How It Works
* Services
* Pricing
* Sample Report
* Intake
* Resources
* Contact

## Section 3: System Health

Show status cards for:

* Website
* Database
* File uploads
* Stripe payments
* Email service
* Admin login
* Blog CMS
* Analytics tracking

Statuses:

* Healthy
* Warning
* Down
* Not configured

## Section 4: Error Logs

Show recent errors:

* Time
* Page
* Error type
* Severity
* Status
* Action

## Section 5: Form Health

Show:

* Intake submissions today
* Failed submissions
* Upload failures
* Payment redirect failures
* Contact form failures

## MVP Recommendation

Use external tools for real monitoring and show simplified status inside the admin.

Good integrations later:

* Vercel Analytics
* Google Search Console
* GA4
* Sentry
* UptimeRobot
* PostHog

---

# Admin Settings Page

Route:

`/admin/settings`

## Purpose

Manage website, service, payment, email, integration, and admin settings.

## Settings Sections

Use tabs or grouped cards.

### General Settings

Fields:

* Site name
* Admin email
* Support email
* Contact email
* Timezone
* Default currency

### Services Settings

Fields:

* Service names
* Service pricing
* Service visibility
* CTA links
* Application vs direct payment setting

Services:

* Funding Readiness Review
* Capital Pathway Sprint
* Fundraising Preparation Program
* Partner Workshops

### Payments Settings

Fields:

* Stripe connection status
* Payment mode
* Currency
* Webhook status
* Payment success URL
* Payment failed URL

### Email Settings

Fields:

* Sender name
* Sender email
* Confirmation email templates
* Admin notification email
* Support email

### Integrations

Show connection status for:

* Google Analytics
* Search Console
* Stripe
* Airtable / Supabase
* Resend
* Sentry
* PostHog
* Storage provider

### Admin Users

Fields/actions:

* Add admin
* Remove admin
* Change role
* Reset password

### Legal Settings

Fields:

* Privacy Policy last updated
* Terms last updated
* Disclaimer last updated

---

# Admin User Roles

For MVP, keep roles simple.

## MVP Roles

### Admin

Can manage everything.

### Editor

Can manage blog posts and page content.

### Viewer

Can view dashboard, analytics, and submissions but cannot edit critical settings.

## Later Roles

Add later if needed:

* Owner / Super Admin
* Reviewer
* Support
* Finance
* Partner Manager

---

# Admin Notifications

## Purpose

Admins need to know what needs attention.

Add a notification bell in the top bar.

## Notification Types

* New founder submission
* Payment completed
* Payment failed
* New contact inquiry
* File upload failed
* Report overdue
* Blog scheduled/published
* Website error detected
* Form submission failed

## Notification Item Structure

Each notification should include:

* Icon
* Short message
* Time
* Link to relevant page
* Read/unread state

Example notification:

**New Capital Pathway Sprint application received**

Action:

**Open submission →**

---

# Global Admin Search

The global search should find:

* Founder names
* Company names
* Emails
* Blog posts
* Page titles
* Payments
* Reports
* Contact inquiries

Search results should be grouped by:

* Submissions
* Blog posts
* Payments
* Pages
* Reports

Search should be available in the top bar.

---

# Admin Activity Log

For MVP, track at least important workflow actions.

## Events to Track

* Admin login
* Submission status changed
* Report uploaded
* Report sent
* Payment status updated
* Blog published
* Page content changed
* Admin user added
* File downloaded
* Settings changed

## MVP Minimum

At minimum, track:

* Submission status changes
* Blog publishes
* Page content changes
* Report delivery status changes

Activity log can be shown inside submission detail pages first, and later as a separate global page.

---

# Admin Email Templates

For MVP, templates can be hardcoded.

Later, admin can edit templates.

## Email Templates Needed

1. Intake received
2. Payment completed
3. Payment failed
4. More information needed
5. Application under review
6. Sprint accepted
7. Sprint not a fit
8. Report delivered
9. Strategy session reminder
10. Contact inquiry received

## Template Variables

Use variables like:

* `{{founder_name}}`
* `{{company_name}}`
* `{{selected_service}}`
* `{{payment_link}}`
* `{{report_link}}`
* `{{scheduling_link}}`

---

# Admin UI Components

Create reusable admin UI components.

## Required Components

* AdminSidebar
* AdminTopbar
* KPIStatCard
* StatusPill
* DataTable
* FilterBar
* SearchInput
* ActionMenu
* EmptyState
* LoadingSkeleton
* ConfirmationModal
* ToastNotification
* DateRangePicker
* FileList
* PaymentStatusCard
* ReportStatusCard
* ActivityTimeline
* AdminFormSection
* SEOStatusIndicator

## Status Pill Style

Use consistent status pills across the admin.

Examples:

* New
* Under Review
* Payment Pending
* Payment Complete
* Report In Progress
* Report Delivered
* Draft
* Published
* Failed
* Healthy
* Warning
* Down

Use orange for important active workflow states.

Use green only for success/healthy.

Use red only for critical error/failure.

---

# Tables UX

All admin tables should include:

* Search
* Filters
* Sort
* Pagination
* Status pills
* Row hover
* Row actions
* Empty state
* Loading state
* Export option where useful

Tables that need this:

* Submissions
* Payments
* Reports
* Blog posts
* Website pages
* Error logs
* Activity logs

---

# Forms UX

All admin forms should include:

* Visible labels
* Helpful placeholder text
* Validation
* Save status
* Loading state
* Success toast
* Error toast
* Unsaved changes warning
* Cancel/back button where needed

## Toast Examples

* Blog post saved.
* Page content updated.
* Submission status changed.
* Payment link sent.
* Report uploaded.
* Settings saved.
* Error saving changes. Please try again.

## Confirmation Modals

Use confirmation modals for dangerous actions:

* Delete blog post
* Delete file
* Remove admin user
* Archive submission
* Publish page changes
* Mark report delivered
* Change payment status manually

---

# Analytics Events to Track From Public Website

Track these events and show them in the admin analytics area.

## Website Events

* Page viewed
* CTA clicked
* Pricing card clicked
* Sample report clicked
* Blog article viewed
* Resource downloaded
* Newsletter signup

## Intake Events

* Intake started
* Step completed
* File uploaded
* Intake submitted
* Intake abandoned
* Payment started
* Payment completed
* Payment failed

## Contact Events

* Contact form started
* Contact form submitted
* Inquiry type selected

## Blog Events

* Article viewed
* CTA inside article clicked
* Checklist downloaded

---

# Performance Metrics to Track

Track:

* Page load time
* Mobile performance
* Desktop performance
* Form errors
* Upload errors
* Payment errors
* 404 errors
* Server errors
* Top slow pages
* Failed API calls
* Email sending failures

For MVP, display a simplified health dashboard.

---

# Error / Loading / Empty States

Admin panel must include polished states.

## Loading States

Use skeleton cards and table skeletons.

Examples:

* Dashboard metrics loading
* Submission table loading
* Blog editor saving
* Payment data loading
* Analytics charts loading

## Empty States

Examples:

### No submissions yet

**No founder submissions yet.**

Supporting text:

**New intake submissions will appear here once founders complete the form.**

### No reports yet

**No reports created yet.**

Supporting text:

**Reports will appear here when founder reviews are started.**

### No blog posts yet

**No articles yet.**

Supporting text:

**Create your first founder resource article.**

CTA:

**New Article**

## Error States

Use calm error copy.

Example:

**Could not load submissions.**

Supporting text:

**Please refresh the page or check the database connection.**

CTA:

**Try Again**

---

# Admin Content Safety Rules

Do not let admins accidentally break the public website.

## Required Controls

* Save draft
* Preview
* Publish
* Last updated timestamp
* Updated by admin
* Required field validation
* Slug uniqueness check
* SEO field validation

## Important Rule

For public page editing, use structured fields instead of a full freeform page builder.

Bad:

One giant HTML editor for homepage.

Good:

Separate editable fields for hero headline, subheadline, CTA, FAQs, pricing, and SEO.

---

# SEO Admin Requirements

SEO can be part of Blog and Pages admin.

## MVP SEO Fields

Allow editing:

* Blog SEO title
* Blog meta description
* Blog slug
* Page SEO title
* Page meta description

## SEO Status Indicators

Show:

* Missing meta title
* Missing meta description
* Long title
* Long meta description
* Duplicate slug
* Focus keyword missing
* OG image missing if required

Do not overbuild SEO crawler in MVP.

---

# Visual Design Direction

## Cards

Use white cards with:

* Rounded corners: 18–24px
* Border: `#E0E0E0`
* Soft shadow
* Clear spacing

## Charts

Use clean charts only:

* Line chart
* Bar chart
* Funnel chart
* Donut chart
* Simple tables

Avoid complex analytics visualizations.

## Buttons

Primary button:

* Orange background
* White text
* Rounded corners
* Clear hover state

Secondary button:

* White background
* Border
* Black text

Danger button:

* Use only for delete or irreversible actions
* Do not use too often

## Motion

Admin animations should be minimal:

* KPI cards fade in
* Charts load smoothly
* Tables appear quickly
* Side panel transitions
* Toast slide-in
* Modal fade-in

Avoid heavy animation, 3D, or public-site style effects.

---

# Responsive Direction

## Desktop

* Full sidebar
* Full top bar
* KPI cards in grid
* Tables full-width
* Detail pages with tabs
* Editors split layout

## Tablet

* Collapsible sidebar
* KPI cards 2-column
* Tables horizontally scrollable
* Detail tabs remain usable
* Editors may stack

## Mobile

* Hamburger menu
* Stacked KPI cards
* Tables horizontally scrollable
* Forms full-width
* Action buttons stacked
* Less data shown per row if needed

Desktop is priority, but mobile should not break.

---

# Accessibility Requirements

Admin panel must be accessible.

Requirements:

* Clear heading hierarchy
* Keyboard-accessible navigation
* Visible focus states
* Forms with labels
* Error messages near fields
* Status pills include text, not color only
* Tables have readable contrast
* Buttons have clear labels
* Modals trap focus
* Reduced motion support
* No tiny low-contrast admin text

---

# Admin Page Approval Checklist

The admin panel is approved only if:

* Admin login is protected
* Dashboard shows key business metrics
* Founder submissions can be viewed and managed
* Intake answers are easy to read
* Uploaded files are accessible securely
* Payment status is clear
* Reports can be tracked
* Blog posts can be created and published
* Page content / FAQ content can be updated safely
* Analytics show conversion performance
* Website health/performance is visible
* Admin settings are manageable
* Tables have search, filters, and pagination
* Error/loading/success states are designed
* Sensitive founder data is protected
* The UI is clean, fast, and not overdesigned
* The system is MVP-focused and launch-ready

---

# Final Creative Direction

The CrowdHarbor Admin Panel should visually communicate:

**CrowdHarbor is not just a website — it is an internal operating system for founder preparation.**

The admin panel should help the team manage the full business workflow:

* Website performance
* Founder intake submissions
* Service interest
* Payment status
* Review progress
* Report delivery
* Blog publishing
* Page content updates
* Conversion analytics
* Website health

For the first version, build a clean, private, fast admin system focused on real launch operations.

Do not overbuild.

Build the dashboard that helps CrowdHarbor launch, review founders, publish content, track payments, monitor performance, and improve conversion.
