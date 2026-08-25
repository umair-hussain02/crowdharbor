You are a senior professional UI/UX designer, conversion-focused web designer, and product design strategist.

Design a premium, modern, strategic **“How It Works” page** for a company called **CrowdHarbor**.

CrowdHarbor helps early-stage founders prepare before fundraising by diagnosing funding readiness, reviewing key business and fundraising materials, identifying blockers, recommending the right capital pathway, and providing a clear action plan before founders approach investors, crowdfunding platforms, grants, accelerators, or other funding sources.

The page must communicate this core idea:

**A structured preparation process before you approach capital.**

The page should make founders feel:

**“I understand the process. This feels serious, organized, human-reviewed, and worth paying for.”**

This page must not feel like a generic “3 easy steps” landing page, a playful quiz flow, a basic SaaS onboarding page, or an automated AI score tool. It should feel like a premium founder preparation workflow from a serious advisory-style company.

---

# 1. Brand Direction

The “How It Works” page should feel:

* Premium
* Process-driven
* Strategic
* Calm
* Organized
* Founder-friendly
* Professional
* Human-reviewed
* Trustworthy
* Clear and structured

The page should visually communicate that CrowdHarbor brings order, clarity, and preparation to a confusing fundraising journey.

The design should feel like a premium advisory workflow mixed with a modern funding-readiness dashboard.

The visitor should understand:

* What happens after they submit information
* What CrowdHarbor reviews
* How the readiness diagnosis works
* What role human review plays
* What deliverables they receive
* How long the process may take
* Why preparation matters before funding outreach

---

# 2. Brand Colors

Use this exact color system across the full page:

```css
Primary Background: #F5F5EE
Primary Text: #000000
Card Background: #FFFFFF
Primary Orange: #FD6628
Muted Text: #444444
Border: #E0E0E0
```

Color usage rules:

* Use `#F5F5EE` as the main page background.
* Use `#FFFFFF` for process cards, form previews, review modules, report mockups, FAQ accordions, timeline cards, deliverable cards, and CTA sections.
* Use `#000000` for headings, important labels, process titles, and key statements.
* Use `#444444` for supporting copy, descriptions, body text, helper text, and small labels.
* Use `#FD6628` for CTA buttons, step numbers, progress lines, active process states, score indicators, important highlights, and selected status tags.
* Use `#E0E0E0` for card borders, dividers, input outlines, timeline lines, and subtle separation.
* Do not overuse orange. Orange should guide attention and create conversion energy.

---

# 3. Typography

Use a premium modern sans-serif system.

Recommended fonts:

* Headings: Manrope, Satoshi, Inter Tight, Neue Haas Grotesk style, or similar
* Body: Inter, Geist Sans, Manrope, or similar

Typography scale:

```css
Hero headline desktop: 60–72px
Hero headline tablet: 48–56px
Hero headline mobile: 38–44px

Section headings desktop: 42–52px
Section headings mobile: 30–36px

Step section headings: 38–48px desktop
Card headings: 20–26px
Body text: 16–18px
Large intro text: 20–22px
Small helper text: 14–15px
```

Typography should be bold, confident, calm, and easy to scan.

Avoid long paragraphs. Use short, structured copy blocks.

---

# 4. Global Layout System

Use a consistent premium layout system.

```css
Standard max-width: 1200px
Wide visual max-width: 1320px
Text-heavy max-width: 860px

Desktop section padding: 100px 24px
Large desktop section padding: 120–140px 24px
Compact section padding: 72–88px 24px

Mobile section padding: 64–80px 20px
Compact mobile padding: 48–56px 20px

Desktop grid: 12 columns
Tablet grid: 6 columns
Mobile: single column
```

General section rhythm:

* Warm background section
* White card-based process section
* Warm background section
* Large report/workflow visual section
* Final CTA
* Footer

The page should feel spacious, calm, and premium.

---

# 5. Reusable UI Components

Use consistent components across the page.

## Cards

```css
Background: #FFFFFF
Border: 1px solid #E0E0E0
Border radius: 24px
Padding desktop: 28–40px
Padding mobile: 22–28px
Shadow: 0 20px 60px rgba(0,0,0,0.05)
Hover: translateY(-6px)
Hover border: #FD6628
```

## Primary Button

```css
Background: #FD6628
Text: #FFFFFF
Border radius: 999px or 16px
Padding: 16px 28px
Font size: 15–16px
Font weight: 600
Hover: slight lift, darker orange, arrow moves right
```

Button label:

**Check Your Funding Readiness**

## Secondary Button

```css
Background: #FFFFFF or transparent
Text: #000000
Border: 1px solid #E0E0E0
Border radius: 999px or 16px
Padding: 16px 28px
Font weight: 600
Hover: border becomes #FD6628
```

Button label:

**View Sample Report**

## Section Labels

Use small uppercase or pill-style labels.

Example:

```css
Font size: 13–14px
Font weight: 600
Letter spacing: 0.04em
Color: #FD6628
Background: rgba(253,102,40,0.08)
Border radius: 999px
Padding: 8px 12px
```

---

# 6. Page Structure

Design the page in this exact order:

1. Hero Section
2. Process Overview Section
3. Step 1 — Founder Intake
4. Step 2 — Internal Review
5. Step 3 — Readiness Diagnosis
6. Step 4 — Strategy Session
7. Step 5 — Action Plan
8. What You Receive Section
9. Human Review vs Automated Score Section
10. Timeline Section
11. Process Trust Section
12. FAQ Section
13. Final CTA Section

Every section should move the user toward understanding the process and taking action.

Primary CTA across the page:

**Check Your Funding Readiness**

Secondary CTA:

**View Sample Report**

---

# 7. Hero Section

## Purpose

The hero should immediately explain that CrowdHarbor has a structured, professional process before founders approach capital.

It should make the visitor understand that this is not just a quiz, not just a score, and not just a generic report.

## Hero Copy

Eyebrow:

**How CrowdHarbor works**

Main headline:

**From funding uncertainty to a clear preparation plan.**

Subheadline:

**CrowdHarbor reviews your company stage, traction, materials, funding goal, and pathway fit so you understand what is strong, what is missing, and what to fix before approaching capital.**

Primary CTA:

**Check Your Funding Readiness**

Secondary CTA:

**View Sample Report**

Trust microcopy:

**Human-reviewed preparation. No funding guarantees. No broker promises.**

## Layout Direction

Use a 2-column hero layout.

Left side:

* Eyebrow
* Large headline
* Subheadline
* CTA buttons
* Trust microcopy
* Small credibility row

Credibility row examples:

* 5-step preparation workflow
* Material review
* Capital pathway recommendation

Right side:

Create a premium workflow dashboard visual showing 5 connected steps:

1. Intake
2. Review
3. Diagnosis
4. Strategy
5. Action Plan

## Hero Visual Direction

The right-side visual should look like a clean, premium founder workflow map.

Use:

* White floating cards
* Thin connecting lines
* Orange active progress line
* Small status labels
* Soft shadows
* Rounded corners
* Slight 3D perspective
* Warm background
* Minimal black text
* Muted gray helper text

Example visual labels:

* Intake Submitted
* Materials Under Review
* Readiness Score Generated
* Strategy Session Scheduled
* Action Plan Delivered

The visual should feel like a professional workflow system, not a playful onboarding graphic.

## Hero Animation

On page load:

* Header appears first
* Eyebrow fades in
* Headline slides up
* Subheadline fades in
* CTA buttons fade in with slight delay
* Workflow visual appears with staggered step cards
* Orange process line draws from step 1 to step 5

Continuous animation:

* Workflow cards can float very subtly
* No spinning
* No aggressive motion
* No distracting loops

---

# 8. Process Overview Section

## Purpose

Give users a simple full-process snapshot before explaining each step in detail.

## Section Copy

Section label:

**The preparation journey**

Heading:

**A five-step preparation journey.**

Supporting copy:

**The process is designed to help founders understand their current readiness, review important fundraising materials, identify blockers, and leave with a practical action plan.**

## Timeline Steps

Create a horizontal timeline on desktop with these five steps:

1. **Founder Intake**
   Share your company stage, traction, materials, funding goal, and biggest challenge.

2. **Internal Review**
   CrowdHarbor reviews the signals that funding sources care about.

3. **Readiness Diagnosis**
   You receive a clear view of strengths, weaknesses, missing materials, and blockers.

4. **Strategy Session**
   Walk through what the findings mean and which fixes matter most.

5. **Action Plan**
   Leave with a practical roadmap before approaching capital.

## Layout Direction

Desktop:

* Wide horizontal timeline
* Orange active progress line
* White step cards or circular step markers
* Step numbers emphasized in orange

Mobile:

* Vertical timeline
* Each step becomes a stacked white card
* Orange timeline line on the left

## Animation

* Timeline line fills as the user scrolls
* Step cards fade in one by one
* Active step marker turns orange when visible
* Keep motion smooth and premium

---

# 9. Step 1 — Founder Intake

## Purpose

Show that the intake is thoughtful and strategic, not a basic contact form.

## Section Copy

Section label:

**Step 1**

Heading:

**Tell us where your company stands.**

Supporting copy:

**The intake helps CrowdHarbor understand your company stage, traction, funding goals, current materials, and biggest preparation challenges.**

## Layout Direction

Use a 2-column section.

Left side:

Create a large white form preview card.

Form preview should include:

* Progress bar
* Step label: Founder Intake
* Clean input fields
* Selectable option cards
* File upload area
* Back / Next buttons
* Small helper text

Right side:

Create intake category cards.

## Intake Category Cards

1. **Founder Details**
   Name, company, location, website, and contact information.

2. **Company Stage**
   Idea, MVP, users, revenue, traction, or active fundraising.

3. **Traction**
   Revenue, users, customers, waitlist, partnerships, growth, or market proof.

4. **Funding Goal**
   Target raise, use of funds, preferred path, and timeline.

5. **Current Materials**
   Pitch deck, financial model, business plan, data room documents, or missing materials.

6. **Biggest Challenge**
   Unclear pitch, weak deck, no financial model, no traction story, or wrong funding path.

## Visual Style

* Large white form card
* Rounded 28px corners
* Soft shadow
* Inputs with `#E0E0E0` border
* Selected option uses orange border and pale orange background
* File upload box with dashed border
* Progress bar filled to 20%

## Animation

* Form preview gently slides in
* Intake category cards reveal one by one
* Progress bar animates from 0% to 20%
* Selected card gets a subtle orange border animation

---

# 10. Step 2 — Internal Review

## Purpose

Show the depth and value of the review process.

This section should make founders feel that CrowdHarbor reviews real business signals, not just simple form answers.

## Section Copy

Section label:

**Step 2**

Heading:

**We review the signals funding sources care about.**

Supporting copy:

**CrowdHarbor reviews your pitch, business model, traction proof, financial readiness, data room status, funding goal, founder story, and pathway fit.**

## Layout Direction

Create a premium review dashboard layout.

Use a 3-column grid on desktop and single-column on mobile.

## Review Modules

Create 9 diagnostic review modules:

1. **Pitch Deck**
   Is your deck clear, credible, and structured for serious review?
   Status tag: Needs Review

2. **Business Model**
   Is the way your company creates and captures value easy to understand?
   Status tag: Reviewed

3. **Traction Proof**
   Do you have evidence of demand, revenue, customers, usage, or market validation?
   Status tag: Strong Signal

4. **Market Positioning**
   Is your opportunity clearly framed against the market and competition?
   Status tag: Needs Work

5. **Financial Model**
   Are your numbers understandable, realistic, and connected to your funding ask?
   Status tag: Priority Gap

6. **Legal / Data Room Status**
   Are your core documents organized enough for review?
   Status tag: Missing

7. **Funding Goal**
   Is your funding ask connected to clear milestones and use of funds?
   Status tag: Reviewed

8. **Founder Story**
   Does the founder narrative build credibility and trust?
   Status tag: Needs Work

9. **Pathway Fit**
   Are you pursuing the right funding route for your stage and traction?
   Status tag: Strategic Priority

## Visual Style

Each module should include:

* Minimal line icon
* Title
* One-line explanation
* Small pill status tag
* White background
* Thin border
* Rounded corners
* Report-dashboard feel

Status tag styling:

* Orange for Priority Gap and Strategic Priority
* Muted gray for Reviewed
* Soft red/pale tone for Missing
* Soft green/pale tone for Strong Signal

Use these colors minimally and tastefully.

## Animation

* Cards reveal in a staggered grid
* Status tags appear slightly after the card
* Hover: card lifts and border turns orange
* Icons can animate subtly on hover

---

# 11. Step 3 — Readiness Diagnosis

## Purpose

Explain the diagnostic output.

The readiness score should feel valuable and professional, but it should not feel like the whole product.

## Section Copy

Section label:

**Step 3**

Heading:

**You receive a clear readiness diagnosis.**

Supporting copy:

**The diagnosis shows your current readiness level, strengths, weaknesses, missing materials, risk areas, and priority blockers before outreach.**

## Layout Direction

Use a 2-column layout.

Left side:

* Heading
* Supporting copy
* Short bullet list of what the diagnosis clarifies
* CTA text link: View Sample Report

Right side:

* Large scorecard/report mockup

## Scorecard Mockup Content

Include these modules:

* Overall Funding Readiness Score
* Pitch Readiness
* Financial Readiness
* Traction Clarity
* Data Room Readiness
* Funding Pathway Fit
* Top Funding Blockers
* Priority Fixes

Suggested visual labels:

* Overall Readiness: 62/100
* Main Blocker: Financial Model
* Missing: Data Room Checklist
* Strong Signal: Early Revenue
* Priority Fix: Sharpen Use of Funds

## Visual Style

The scorecard should look like a professional diagnostic framework.

Use:

* White report card
* Rounded modules
* Score ring
* Orange progress bar
* Small status tags
* Thin dividers
* Muted labels
* Strong black headings
* Soft shadow

Do not make it look like a childish quiz result.

## Animation

* Score ring animates from 0 to 62
* Progress bars fill on scroll
* Blocker tags appear one by one
* Report card enters with slight slide-up motion

---

# 12. Step 4 — Strategy Session

## Purpose

Show the human advisory value.

This section is important because CrowdHarbor should not feel like a fully automated report.

## Section Copy

Section label:

**Step 4**

Heading:

**We walk through what the findings mean.**

Supporting copy:

**The strategy session helps founders understand the diagnosis, ask questions, clarify priorities, and decide what should happen before fundraising outreach.**

## Layout Direction

Use a 2-column layout.

Left side:

* Heading
* Supporting copy
* Three small benefit cards

Right side:

* White “Strategy Session Agenda” card

## Benefit Cards

1. **Understand the why**
   Know why certain gaps matter before outreach.

2. **Prioritize correctly**
   Focus on the fixes that most affect funding readiness.

3. **Ask better questions**
   Leave with clarity instead of confusion.

## Strategy Session Agenda Card

Create a large premium white card titled:

**Strategy Session Agenda**

Agenda checklist:

* Readiness score walkthrough
* Key blockers
* Material gaps
* Pathway recommendation
* Priority fixes
* Next-step roadmap

## Visual Style

* White card
* Rounded 28px corners
* Soft shadow
* Agenda checklist with orange active highlight
* Small calendar/session label
* Professional advisory tone
* Minimal video-call or notes visual elements

## Animation

* Session card slides in
* Agenda checklist reveals one by one
* Small orange highlight follows the active agenda item
* Benefit cards fade up with stagger

---

# 13. Step 5 — Action Plan

## Purpose

Show the final deliverable and outcome.

This section should make the founder feel they leave with practical direction, not just information.

## Section Copy

Section label:

**Step 5**

Heading:

**Leave with a clear action plan before outreach.**

Supporting copy:

**Your action plan shows what to fix now, what can wait, which documents to prepare, what story to sharpen, which funding path to prioritize, and what timeline to follow.**

## Layout Direction

Use a large full-width roadmap visual.

The roadmap should feel like a strategic preparation board.

Recommended layout:

* Large white rounded roadmap card
* Six internal sections
* Orange timeline line or priority marker
* “Fix Now” section subtly emphasized

## Roadmap Sections

1. **Fix Now**
   Clarify use of funds and update the financial model.

2. **Prepare Next**
   Build a basic data room checklist and update pitch deck structure.

3. **Improve Message**
   Sharpen the traction story and founder narrative.

4. **Prioritize Pathway**
   Start with crowdfunding preparation before angel outreach.

5. **Avoid**
   Do not contact investors before the financial assumptions are clearer.

6. **Timeline**
   Follow a 7–14 day preparation roadmap.

## Visual Style

The roadmap can look like:

* Kanban board
* Timeline board
* Report page
* Strategic roadmap

Recommended:

Use a white rounded card with six sections arranged in a 3-column grid on desktop and stacked on mobile.

## Animation

* Roadmap sections appear from left to right
* Orange timeline line fills
* “Fix Now” card gets subtle emphasis
* No excessive motion

---

# 14. What You Receive Section

## Purpose

Summarize deliverables clearly.

The founder should understand exactly what they receive from CrowdHarbor.

## Section Copy

Section label:

**Deliverables**

Heading:

**What you receive from CrowdHarbor.**

Supporting copy:

**Depending on your selected offer, you receive a structured combination of diagnosis, review, recommendation, and action planning.**

## Deliverable Cards

Create six cards:

1. **Funding Readiness Scorecard**
   A clear diagnostic view of your current preparation level.

2. **Strength and Weakness Overview**
   Understand what is working and what needs attention.

3. **Top Funding Blockers**
   Identify the gaps most likely to create friction before outreach.

4. **Pitch / Material Review Notes**
   See where your current materials may need improvement.

5. **Capital Pathway Recommendation**
   Understand which funding route may fit your stage and readiness.

6. **7–14 Day Action Plan**
   Leave with a practical roadmap for what to fix next.

## CTA Under Section

Primary/secondary CTA row:

* **View Sample Report**
* **Compare Services**

## Visual Direction

* White deliverable cards
* Small document/checklist icons
* Report-package feel
* Clean 3-column grid desktop
* Single-column mobile
* Short, clear copy

## Animation

* Cards reveal with stagger
* Icons animate subtly
* Hover card lift
* Border changes to orange on hover

---

# 15. Human Review vs Automated Score Section

## Purpose

Position CrowdHarbor as more valuable than a simple AI quiz or automated score.

## Section Copy

Section label:

**Human-reviewed process**

Heading:

**More than an automated score.**

Supporting copy:

**The readiness score is only the diagnostic entry point. CrowdHarbor’s value comes from reviewing materials, identifying gaps, recommending a pathway, and helping founders understand what to fix before outreach.**

## Layout Direction

Use a two-column comparison layout.

Left card:

**Basic Score Tool**

Bullets:

* Quick result
* Limited context
* No material review
* No pathway strategy
* No action planning

Right card:

**CrowdHarbor Preparation Process**

Bullets:

* Readiness diagnosis
* Material review
* Pathway recommendation
* Strategy session
* Action plan

## Design Style

* Left card should feel more muted
* Right card should feel premium and emphasized
* Use orange accent on the CrowdHarbor side
* Add a subtle “Recommended process” or “Preparation-first” label on the right card
* Use checkmarks on the right side
* Use muted icons or dash markers on the left side

## Animation

* Left card appears first in muted style
* Right card appears with stronger highlight
* Checklist items animate on the right
* Right card hover can show orange border glow

---

# 16. Timeline Section

## Purpose

Set expectations for how long the process typically takes.

## Section Copy

Section label:

**Expected flow**

Heading:

**Designed to give founders clarity quickly.**

Supporting copy:

**CrowdHarbor’s Version 1 preparation process is built to help founders receive clear feedback and next steps without waiting months.**

Important language note:

Do not overpromise exact delivery. Use flexible language like “Typical flow” or “Expected preparation timeline.”

## Timeline Cards

1. **Day 0**
   Submit intake and materials.

2. **Day 1–2**
   CrowdHarbor reviews your company, traction, materials, and funding goal.

3. **Day 3–5**
   You receive your readiness diagnosis and key preparation insights.

4. **Day 5–7**
   Strategy session and action plan delivery.

5. **7–14 Days**
   Sprint roadmap helps guide the next preparation phase.

## Design Direction

Desktop:

* Horizontal timeline
* Milestone cards
* Orange connecting line
* Small date labels

Mobile:

* Stacked vertical timeline
* Orange line on the left
* Cards full-width

## Animation

* Timeline line fills on scroll
* Milestones appear one by one
* Active milestone gets a subtle orange accent

---

# 17. Process Trust Section

## Purpose

Build confidence and reduce legal or expectation risk.

## Section Copy

Section label:

**Trust and expectations**

Heading:

**Clear preparation. Honest expectations.**

Supporting copy:

**CrowdHarbor helps founders prepare before approaching funding sources. It does not guarantee funding, act as an investor, or replace legal, financial, tax, or investment advice.**

## Trust Cards

1. **Preparation-first**
   We help founders understand and fix readiness gaps before outreach.

2. **No funding guarantees**
   We do not promise funding outcomes.

3. **No broker positioning**
   We do not act as an investor, broker, or fundraising platform.

4. **Founder clarity**
   The goal is to help you make better funding decisions before outreach.

## Design Style

* Calm and professional
* White cards
* Shield/check icons
* Minimal orange
* No scary legal design
* Keep this section reassuring and transparent

## Animation

* Simple fade in only
* Avoid playful motion

---

# 18. FAQ Section

## Purpose

Answer process-specific objections before the founder leaves.

## Section Copy

Heading:

**Questions about the process.**

Use accordion FAQ cards.

## FAQ Items

1. **What happens after I submit the intake?**
   CrowdHarbor reviews your company information, stage, traction, funding goals, and uploaded materials to identify readiness gaps and next steps.

2. **Do I need a pitch deck to start?**
   No. If you do not have one yet, the review can identify what materials are missing and what should be prepared first.

3. **Is the score automated?**
   The score is only part of the preparation process. CrowdHarbor should feel like a professional review that combines diagnosis, material review, pathway strategy, and action planning.

4. **What materials can I upload?**
   You can upload a pitch deck, financial model, business plan, company overview, data room documents, or any materials you currently use for funding conversations.

5. **What if I do not know which funding path is right?**
   That is exactly part of the process. CrowdHarbor helps identify whether crowdfunding, grants, angels, accelerators, pre-seed, revenue-based financing, or another route may fit better.

6. **Will CrowdHarbor introduce me to investors?**
   CrowdHarbor is focused on preparation before funding outreach. Any partner platform introductions should be positioned carefully and never as a funding guarantee.

7. **What do I receive at the end?**
   Depending on the offer, you receive a readiness diagnosis, material review notes, blockers, pathway recommendation, and action plan.

## FAQ Design

```css
Background: #FFFFFF
Border: 1px solid #E0E0E0
Border radius: 20px
Padding: 22–28px
Icon: orange plus/minus
Open animation: height + opacity
```

FAQ behavior:

* Smooth open/close animation
* Only one item can open at a time, or allow multiple if implementation prefers
* Clear keyboard focus states
* Accessible accordion labels

---

# 19. Final CTA Section

## Purpose

Push the founder to begin the process.

## Section Copy

Heading:

**Start with clarity before you approach capital.**

Supporting copy:

**Submit your company details and materials to understand your readiness, identify gaps, and choose a better preparation path before fundraising outreach.**

Primary CTA:

**Check Your Funding Readiness**

Secondary CTA:

**View Sample Report**

Trust line:

**No funding guarantees. No broker promises. Just structured preparation before you raise.**

## Visual Direction

Use a large white rounded CTA card on the warm background.

Inside the CTA card:

* Large heading
* Short paragraph
* CTA buttons
* Small trust line
* Optional small workflow preview in the background

CTA card style:

```css
Background: #FFFFFF
Border: 1px solid #E0E0E0
Border radius: 32px
Padding desktop: 64–80px
Padding mobile: 36–44px
Shadow: 0 24px 80px rgba(0,0,0,0.06)
```

## Animation

* CTA card fades up
* Buttons animate subtly on hover
* Background workflow line moves very lightly
* Button arrow moves right on hover

---

# 20. Page-Specific 3D Direction

Use 3D carefully. This page should feel process-focused and professional.

Recommended 3D elements:

## Hero 3D Visual

A premium 3D workflow map showing the five preparation stages:

Founder Intake → Internal Review → Readiness Diagnosis → Strategy Session → Action Plan

## Internal Review 3D Visual

A subtle 3D stack of review cards or documents labeled:

* Deck
* Financials
* Traction
* Data Room
* Pathway

## Action Plan 3D Visual

A 3D roadmap board or layered action-plan card.

3D rules:

* Maximum 2 major 3D visuals on this page
* No spinning objects
* No cartoon style
* No heavy models
* Use static fallback on mobile
* Align all 3D elements with white cards, black text, orange accents, and warm background

---

# 21. Animation System

Use Framer Motion-style animations.

Global animation values:

```js
Fade up:
initial: { opacity: 0, y: 24 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }

Stagger cards:
staggerChildren: 0.08

Hover lift:
whileHover: { y: -6, scale: 1.01 }

Button arrow:
whileHover: { x: 4 }

Timeline line:
initial: { scaleX: 0 }
animate: { scaleX: 1 }
transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
```

Main animation patterns:

* Fade up for sections
* Stagger reveal for cards
* Timeline line draw
* Progress bar fill
* Checklist item reveal
* Soft hover lift
* Button arrow movement
* Score ring animation
* Accordion open/close

Avoid:

* Fast motion
* Too many moving icons
* Heavy scroll effects
* Cartoon-like animation
* Overly complex 3D interaction
* Constant spinning or bouncing

Motion should make the process feel guided, premium, and calm.

Respect `prefers-reduced-motion`.

---

# 22. Responsive Design

## Desktop

* Use wide 1200px layout
* Hero uses 2 columns
* Timeline is horizontal
* Review modules use 3-column grid
* Deliverables use 3-column grid
* CTA card is full-width
* Large process visuals are visible

## Tablet

* Hero can remain 2-column if space allows
* Review modules become 2-column
* Timeline can remain horizontal only if readable
* Some visuals can stack under copy

## Mobile

* Hero copy first
* Hero visual second
* CTA buttons full-width
* Timeline becomes vertical
* Cards become single-column
* 3D simplified or hidden
* FAQ full-width
* CTA card becomes compact
* Keep typography readable
* Keep tap targets at least 44px
* Maintain generous spacing

Mobile should feel like a clean premium app experience, not a squeezed desktop layout.

---

# 23. Accessibility Rules

Follow accessibility best practices:

* Use semantic heading order
* Maintain high contrast text
* Use visible focus states
* Make navigation keyboard-friendly
* Make accordion FAQ keyboard-accessible
* Do not rely only on color for status
* Add text labels to icons
* Keep body text at least 16px
* Minimum tap target size: 44px
* Respect reduced motion preferences
* Avoid tiny gray text
* Avoid using orange as small low-contrast text on warm background

---

# 24. Copy Tone

The copy should feel:

* Clear
* Strategic
* Calm
* Professional
* Honest
* Founder-friendly
* Practical
* Trust-building

Avoid language like:

* Guaranteed funding
* We get you funded
* Instant investor access
* Automated magic score
* Raise money easily
* Pitch investors tomorrow
* Investor matching guaranteed

Use language like:

* Prepare before you raise
* Understand what is weak
* Identify what is missing
* Choose the right funding path
* Fix gaps before outreach
* Build a stronger funding package
* Human-reviewed preparation
* Clear readiness diagnosis
* Practical action plan

---

# 25. Conversion Rules

Every major section should naturally move users toward one of these actions:

* Check readiness
* View sample report
* Compare services
* Apply for the sprint

Primary CTA:

**Check Your Funding Readiness**

Secondary CTA:

**View Sample Report**

Avoid weak CTAs like:

* Submit
* Learn More
* Contact Us
* Get Started

CTA placement recommendations:

* Hero
* After process overview
* After what you receive
* Final CTA section

Do not overwhelm the page with too many different CTA labels.

---

# 26. Design Quality Checklist

The How It Works page is approved only if:

* The five-step process is immediately clear
* The page feels human-reviewed, not fully automated
* The intake process feels professional
* The internal review feels valuable
* The readiness diagnosis feels serious and report-like
* The strategy session feels advisory
* The action plan feels practical
* The CTA is clear and repeated naturally
* The design uses brand colors consistently
* Timeline animation is smooth and premium
* The page does not feel like a basic “3 steps” section
* The page does not feel like a simple AI quiz
* Mobile version is simple and readable
* Legal and trust expectations are clear
* The founder feels confident about what happens next

---

# 27. Final Creative Direction

The “How It Works” page should visually communicate:

**CrowdHarbor gives founders a clear preparation path before they approach capital.**

The page should make the process feel like a structured journey:

**Founder Intake → Internal Review → Readiness Diagnosis → Strategy Session → Action Plan**

By the end of the page, the founder should feel:

**“I know what happens next, I trust the process, and I’m ready to submit my company for review.”**

Create a polished, premium, conversion-focused, mobile-responsive “How It Works” page for CrowdHarbor using this full direction.
