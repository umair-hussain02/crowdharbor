# Task: Create CrowdHarbor Custom 404 Page, Error Pages, and System States

Please create a complete custom error-state system for CrowdHarbor.

This includes:

* Custom 404 page
* Custom 500 / general error page
* Maintenance page
* Payment failed page
* Form submission error states
* File upload error states
* Loading states
* Empty states
* Toast notifications
* Offline / connection error states

Do not use default Next.js error screens. Every error state should feel designed, branded, calm, and professional.

---

# Main Goal

Even when something goes wrong, the user should feel:

**“CrowdHarbor is organized. I know what happened and what I should do next.”**

Every error state must do three things:

1. Explain what happened
2. Reduce anxiety
3. Give a clear next step

The tone should be calm, professional, and helpful.

Avoid technical language, jokes, scary red screens, or raw developer errors.

---

# Brand System

Use the CrowdHarbor brand colors:

* Background: `#F5F5EE`
* Text: `#000000`
* Cards: `#FFFFFF`
* Primary orange: `#FD6628`
* Muted text: `#444444`
* Border: `#E0E0E0`

Use orange for:

* Primary recovery buttons
* Alert icons
* 404 label
* Progress indicators
* Active links
* Focus states
* Retry actions

Avoid using harsh red everywhere. The brand should still feel premium and calm.

---

# Required Pages / Components

Create or prepare these pages and reusable components:

## Next.js Pages / Files

* `not-found.tsx`
* `error.tsx`
* `loading.tsx`
* Payment failed page
* Maintenance page if needed

## Reusable Components

* `ErrorCard`
* `StatusPill`
* `AlertBanner`
* `Toast`
* `SkeletonCard`
* `EmptyState`
* `UploadState`
* `PaymentStatusCard`
* `RetryButton`

The reusable error component should support these props:

* title
* message
* primary CTA
* secondary CTA
* text link
* status type
* icon
* support link

---

# 1. Custom 404 Page

## Purpose

The 404 page appears when a visitor lands on a missing, moved, or broken URL.

The page should help the visitor recover quickly and return to a useful path.

## Route / File

Use:

`not-found.tsx`

## Main Copy

Small label:

**404**

Heading:

**This page is not available.**

Supporting copy:

**The page you are looking for may have moved, been removed, or the link may be incorrect. You can return to the homepage, explore the process, or view a sample CrowdHarbor report.**

## CTA Buttons

Primary button:

**Return Home**

Link:

`/`

Secondary button:

**View Sample Report**

Link:

`/sample-report`

Text link:

**See How It Works**

Link:

`/how-it-works`

## Helpful Link Cards

Below the main 404 card, add 3 quick navigation cards:

### Check Funding Readiness

Start the founder intake process.

Link:

`/intake`

### View Sample Report

See what a readiness report looks like.

Link:

`/sample-report`

### Compare Services

Choose the right preparation path.

Link:

`/services`

## Layout Direction

Use a centered layout.

Page structure:

1. Simplified header
2. Main 404 card
3. Helpful links section
4. Contact support note
5. Footer

## Main 404 Card Design

The main card should include:

* Orange 404 label
* Small icon or soft visual
* Heading
* Supporting copy
* CTA buttons
* Text link

Style:

* Background: `#FFFFFF`
* Border: `1px solid #E0E0E0`
* Border radius: 28–32px
* Soft shadow
* Centered content
* Comfortable spacing

## Visual Direction

Use a soft report/pathway visual.

Suggested visual:

A missing report card or broken pathway line that reconnects toward useful links.

Avoid scary broken-page graphics, sad cartoon faces, or jokes.

## Animation

* Main card fades up
* 404 label appears softly
* Pathway line draws toward CTA buttons
* Helpful link cards reveal in stagger

Keep animation subtle and professional.

---

# 2. 500 / General Error Page

## Purpose

The 500 page appears when something unexpected happens.

The page should feel stable and calm.

## Route / File

Use:

`error.tsx`

## Main Copy

Heading:

**Something went wrong.**

Supporting copy:

**We could not load this page properly. Please try again, return to the homepage, or contact CrowdHarbor if the issue continues.**

## CTA Buttons

Primary:

**Try Again**

Secondary:

**Return Home**

Text link:

**Contact Support**

Link:

`/contact`

## Design Direction

Use a centered white card.

Inside the card:

* Small orange alert icon
* Heading
* Short explanation
* Retry button
* Return Home button
* Contact Support link

## Important Rules

Do not show:

* Raw error stack
* Technical error codes
* Server logs
* Developer messages

The user should only see helpful recovery options.

---

# 3. Maintenance Page

## Purpose

Use this page if the website, intake form, or payment flow is temporarily unavailable.

## Main Copy

Heading:

**CrowdHarbor is being updated.**

Supporting copy:

**We are making improvements to the funding-preparation experience. Please check back shortly, or contact us if you need support.**

## CTA Buttons

Primary:

**Contact Support**

Link:

`/contact`

Secondary:

**Return Home**

Link:

`/`

Optional:

**Join Founder Updates**

Only include this if newsletter/signup is ready.

## Optional Trust Note

**Founder submissions and payments are not processed while this page is active.**

## Visual Direction

Use a calm system-update visual:

* Checklist card
* Progress line
* Small maintenance icon

Avoid construction signs or generic warning graphics.

---

# 4. Payment Failed Page

## Purpose

Shown when Stripe payment fails, is cancelled, or is incomplete.

This page must reduce anxiety and clearly explain that the review has not started yet.

## Main Copy

Heading:

**Payment was not completed.**

Supporting copy:

**Your payment did not go through. Your intake may still be saved, but the selected review will not begin until payment is completed.**

## CTA Buttons

Primary:

**Try Payment Again**

Secondary:

**Contact Support**

Link:

`/contact`

Text link:

**Return to Pricing**

Link:

`/pricing`

## Payment Status Card

Show a clear payment status summary:

### Status

Payment incomplete

### Selected service

Funding Readiness Review

### Next step

Complete payment to begin the review process.

## Support Note

**If your payment was charged but this page still appeared, please contact support with your payment email.**

## Important Copy Rule

Do not say:

**Your review has started**

unless payment actually completed.

---

# 5. Form Submission Error State

## Purpose

Shown when the intake form or contact form cannot be submitted.

This can appear inline or as a full-page error.

## Inline Error Copy

Heading:

**Your form was not submitted.**

Supporting copy:

**Something prevented your submission from going through. Please check your connection and try again.**

## CTA Buttons

Primary:

**Try Again**

Secondary:

**Contact Support**

## Field-Level Error Messages

Use human messages like:

* Please enter your full name.
* Please enter a valid email address.
* Please select your company stage.
* Please choose at least one funding path or select “Not sure yet.”
* Please accept the preparation disclaimer before submitting.

## Style

Field errors should be:

* Close to the field
* Short and clear
* Written in normal human language
* Highlighted with border and text

Avoid:

* Error 422
* Invalid input
* Required field missing
* Request failed
* Technical error language

---

# 6. File Upload Error State

## Purpose

Shown when file upload fails or a file is invalid.

This is important because founders may upload pitch decks, financial models, business plans, and data room materials.

## Required Upload States

Design these states:

1. Empty upload area
2. Drag-over state
3. Uploading state
4. Upload complete state
5. Upload failed state
6. File removed state

## Upload Error Messages

### Unsupported file type

**This file type is not supported. Please upload a PDF, DOC, PPT, XLS, CSV, PNG, or JPG file.**

### File too large

**This file is too large. Please upload a smaller file or contact support.**

### Upload failed

**The file could not be uploaded. Please try again.**

### Connection error

**Your upload was interrupted. Please check your connection and try again.**

## Upload Design

Default upload area:

* White background
* Border: `#E0E0E0`
* Rounded corners
* Clear upload instructions

Drag-over state:

* Border: `#FD6628`
* Light orange tint

Uploading state:

* Orange progress bar
* File name visible

Upload complete:

* File chip with filename
* File type
* Remove option

Upload failed:

* Warning-style file chip
* Retry button
* Remove button

## Failed Upload CTA

Primary:

**Retry Upload**

Secondary:

**Remove File**

## Important UX Rule

If file upload is optional, do not block form completion.

Add this note:

**You can continue without uploading files. Missing materials can still be reviewed as part of your readiness gaps.**

---

# 7. Loading States

## Purpose

Loading states should make the website feel smooth and polished while content, forms, payments, and uploads load.

## Required Loading States

Prepare loading states for:

* Page loading
* Intake form step loading
* Form submission
* File upload
* Payment redirect
* Report preview loading
* Blog article loading
* Contact form submission

## Loading Design

Use skeleton cards instead of only a spinner.

Examples:

* Skeleton hero title
* Skeleton text blocks
* Skeleton pricing cards
* Skeleton report preview
* Skeleton article cards

## Form Submission Loading

Button text:

**Submitting...**

or

**Processing...**

Show a small spinner inside the button.

Disable repeated clicks while submitting.

## Payment Redirect Loading

Heading:

**Redirecting to secure payment.**

Supporting copy:

**You are being redirected to complete your payment securely.**

## Style

* Soft skeleton blocks
* Rounded corners
* Muted gray placeholders
* Orange progress indicator where needed
* Minimal spinner use

Avoid blank full-screen loading.

---

# 8. Empty States

## Purpose

Empty states should be useful, not confusing.

Use them for future dashboards, resource filters, search results, uploads, or admin screens.

## Empty State Examples

### No Articles Found

Heading:

**No resources found.**

Copy:

**Try a different topic or explore the full resource library.**

CTA:

**View All Resources**

### No Uploaded Files

Heading:

**No files uploaded yet.**

Copy:

**You can upload a pitch deck, financial model, business plan, or other materials if available.**

CTA:

**Upload Files**

Secondary:

**Continue Without Files**

### No Search Results

Heading:

**No matching results.**

Copy:

**Try another keyword or browse popular founder preparation topics.**

CTA:

**Clear Search**

## Design

* White card
* Simple icon
* Short heading
* Helpful copy
* Clear CTA

---

# 9. Form Validation States

## Purpose

Validation states are needed for intake, contact, newsletter, and lead magnet forms.

## Required Field States

Each field should have:

1. Empty state
2. Focus state
3. Filled state
4. Valid state
5. Error state
6. Disabled state
7. Loading state if needed

## Input Design

Default:

* Border: `#E0E0E0`
* Text: black
* Placeholder: muted

Focus:

* Border: `#FD6628`
* Subtle orange outline or shadow

Error:

* Warning border
* Error text below field
* Optional icon

Disabled:

* Muted background
* Muted text
* Not clickable

## Selectable Cards

Default:

* White card
* Gray border

Hover:

* Border turns orange

Selected:

* Orange border
* Small orange checkmark
* Light orange tint if used carefully

Error:

* Show error message above or below card group

---

# 10. Success / Toast Notifications

## Purpose

Toast messages should confirm small actions without interrupting the user.

## Toast Examples

### Newsletter Signup

**You’re subscribed. We’ll send practical founder preparation resources.**

### Contact Form

**Your inquiry has been submitted.**

### File Upload

**File uploaded successfully.**

### Form Progress

**Progress saved.**

### Payment Success

**Payment complete. Your review can begin.**

## Toast Design

* Small white toast
* Thin border
* Soft shadow
* Icon on left
* Text on right
* Orange check or accent
* Top-right on desktop
* Bottom or top on mobile depending UX

## Animation

* Slide in softly
* Stay long enough to read
* Fade out smoothly

Avoid loud popups or playful effects.

---

# 11. Offline / Connection Error State

## Purpose

Shown when the user loses connection during form submission, upload, or page load.

## Main Copy

Heading:

**Connection issue detected.**

Supporting copy:

**Your connection may have been interrupted. Please check your internet and try again.**

## CTA Buttons

Primary:

**Try Again**

Secondary:

**Return Home**

## Form-Specific Note

Only show this if answers are actually preserved:

**Your answers are still visible. Please try submitting again.**

## Design

* White card
* Orange connection icon
* Calm wording
* Clear retry button

---

# 12. Admin / Internal Error Placeholder

## Purpose

If an admin workflow or internal dashboard is added later, create clean internal error states too.

## Example Copy

Heading:

**Submission could not be loaded.**

Supporting copy:

**This founder submission could not be retrieved. Please refresh or check the database connection.**

## CTA Buttons

* Refresh
* Return to Admin
* Contact Developer

Internal states can be more functional, but they should still use the same design system.

---

# 3D Direction

Use almost no heavy 3D on error pages.

Recommended visuals:

* Small 3D card stack
* Broken pathway line reconnecting
* Small report card with alert icon
* Static illustration fallback

Avoid:

* Large 3D scenes
* Spinning objects
* Cartoon sad faces
* Overly playful failure graphics
* Heavy assets that slow recovery pages

The visual should feel like:

**Something paused, but you can continue.**

---

# Animation Direction

Animations should be minimal and helpful.

Recommended:

* Card fades up
* Alert/check icon draws in
* Helpful link cards reveal
* Buttons hover smoothly
* Loading skeleton shimmer
* Progress bar movement
* Toast slide-in

Avoid:

* Fast motion
* Confetti on error pages
* Shake animations that feel cheap
* Large bouncing icons
* Too much motion on payment pages

---

# Responsive Direction

## Desktop

* Centered error cards
* Helpful links in 3-card grid
* Clean header/footer
* Plenty of spacing

## Tablet

* Cards remain centered
* Helpful links become 2-column or stacked

## Mobile

* Full-width card with comfortable padding
* Buttons full-width
* Helpful links stacked
* Short text
* No heavy visual
* Clear support link
* Error messages near fields

Mobile error recovery must be easy.

---

# Accessibility Direction

Error states must be accessible.

Rules:

* Error messages must be readable text
* Do not rely only on color
* Use icons plus text
* Form errors should be linked to fields
* Buttons must have clear labels
* Focus should move to the error summary after failed submission
* Loading states should communicate status
* Reduced motion should be supported
* Contrast must remain strong

---

# Copy Tone

Use language that is:

* Calm
* Helpful
* Clear
* Professional
* Reassuring

Use phrases like:

* Something went wrong.
* Please try again.
* Your payment was not completed.
* Your upload was interrupted.
* This page is not available.
* Return to the homepage.
* Contact support if the issue continues.

Avoid phrases like:

* Oops!
* Uh oh!
* You broke something.
* Fatal error.
* Invalid request.
* Request failed with status code.
* Transaction rejected forever.
* System crashed.

CrowdHarbor is a professional founder-preparation brand, so error language should feel mature.

---

# Approval Checklist

The error system is approved only if:

* 404 page is custom and useful
* 500 error page is custom and calm
* Payment failed page is clear
* Form errors are human-readable
* Upload errors are designed
* Loading states are polished
* Empty states are helpful
* Toast notifications are designed
* Mobile states are clear
* No raw technical errors are visible
* User always has a recovery path
* Brand colors are consistent
* Tone remains professional
* Legal/funding expectations are not accidentally overstated

---

# Final Creative Direction

The 404 / Error pages and system states should visually communicate:

**Even when something goes wrong, CrowdHarbor is structured, calm, and professional.**

A founder should never feel lost, confused, or abandoned.

Every state should guide users back toward one of these paths:

* Return home
* Start founder intake
* View sample report
* Retry payment
* Contact support
* Continue preparation

This is what makes the website feel complete and launch-ready.
