You are a senior professional UI/UX designer, conversion-focused web designer, and product design strategist.

Design a premium, modern, strategic **Sample Report Page** for a company called **CrowdHarbor**.

CrowdHarbor helps early-stage founders prepare before fundraising by diagnosing funding readiness, reviewing key fundraising materials, identifying blockers, recommending the right capital pathway, and helping founders create a practical action plan before approaching investors, crowdfunding platforms, grants, accelerators, or other capital sources.

The Sample Report Page must communicate this core idea:

**See what funding preparation looks like before you raise.**

The page should make the CrowdHarbor service feel tangible, premium, analytical, human-reviewed, and trustworthy.

The goal is not to show a complete report. The goal is to show enough of a realistic preview that founders understand the value and feel confident taking the next step.

The page must not feel like a basic quiz result, a generic downloadable PDF, a cheap automated report, a playful SaaS dashboard, an investor-matching tool, or a simple score page.

It should feel like a premium founder readiness report created to help founders see what needs to be fixed before funding sources review them.

---

# 1. Page Goal

The Sample Report Page must answer these questions:

* What does a CrowdHarbor report look like?
* What kind of insights will I receive?
* Is this more than a simple score?
* What areas does CrowdHarbor review?
* How does the report help me prepare before fundraising?
* What kind of blockers can be identified?
* What does the action plan look like?
* What should I do after viewing the sample?

The founder should leave the page thinking:

**“I understand what CrowdHarbor will review, I can see the value of the report, and I want this type of preparation before I raise.”**

Primary CTA:

**Get My Readiness Review**

Secondary CTA:

**Apply for the Capital Pathway Sprint**

Third CTA:

**View Pricing**

---

# 2. Brand Direction

The Sample Report Page should feel:

* Premium
* Analytical
* Strategic
* Report-like
* Founder-focused
* Professional
* Valuable
* Human-reviewed
* Investor-facing
* Clear
* Trustworthy
* Preparation-focused

The page should visually communicate:

**CrowdHarbor helps founders see the gaps before funding sources do.**

The report should feel like a professional advisory document, not a playful quiz output.

The score should be important, but not the whole product. The full value comes from diagnosis, blockers, material review, pathway recommendation, and action planning.

---

# 3. Brand Colors

Use this exact color system across the page:

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
* Use `#FFFFFF` for report cards, scorecards, dashboard modules, checklist tables, blocker cards, FAQ accordions, offer cards, and CTA sections.
* Use `#000000` for headings, important labels, report titles, score values, and key statements.
* Use `#444444` for body copy, supporting text, explanations, helper labels, and secondary information.
* Use `#FD6628` for score indicators, priority tags, CTA buttons, active report sections, progress bars, important blockers, pathway highlights, and selected states.
* Use `#E0E0E0` for borders, dividers, table lines, card outlines, and subtle separation.
* Do not overuse orange. Orange should guide attention toward important report findings and conversion actions.

---

# 4. Typography

Use a premium modern sans-serif typography system.

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

Report title: 28–36px
Score number: 64–88px desktop
Score number mobile: 48–60px

Card headings: 20–26px
Body text: 16–18px
Large intro text: 20–22px
Small helper text: 14–15px
```

Typography should feel analytical, confident, structured, and easy to scan.

Avoid dense paragraphs. Use short sections, report-style labels, and clear hierarchy.

---

# 5. Global Layout System

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

Layout principles:

* Make the report feel premium and tangible.
* Use white report cards on the warm background.
* Use large dashboard sections to show value.
* Keep report visuals clean and professional.
* Make the page easy to scan from score to blockers to action plan.
* Avoid overwhelming users with too much small text.
* Use modular report sections that feel like a real deliverable.

---

# 6. Reusable UI Components

Use consistent UI components across the Sample Report Page.

## Report Cards

```css
Background: #FFFFFF
Border: 1px solid #E0E0E0
Border radius: 24–28px
Padding desktop: 28–40px
Padding mobile: 22–28px
Shadow: 0 20px 60px rgba(0,0,0,0.05)
Hover: translateY(-6px)
Hover border: #FD6628
```

## Scorecard Modules

```css
Background: #FFFFFF
Border: 1px solid #E0E0E0
Border radius: 28px
Padding: 36–48px desktop
Shadow: 0 24px 80px rgba(0,0,0,0.06)
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

Primary CTA label:

**Get My Readiness Review**

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

Secondary CTA label:

**Apply for the Capital Pathway Sprint**

## Text Link CTA

```css
Color: #000000
Font weight: 600
Orange arrow: #FD6628
Hover: arrow moves right
```

Text link label:

**View Pricing →**

## Status Tags

Use pill-style tags.

Examples:

* Ready
* Needs Work
* Missing
* Partial
* Priority Gap
* High Priority
* Medium Priority
* Strong Signal
* Best Fit
* Not Yet

Tag style:

```css
Border radius: 999px
Padding: 6px 10px
Font size: 12–13px
Font weight: 600
```

Use orange for priority or important tags. Use muted gray for neutral tags.

---

# 7. Page Structure

Design the Sample Report Page in this exact order:

1. Hero Section
2. Report Preview Overview
3. Sample Founder Profile
4. Overall Readiness Score Section
5. Readiness Category Breakdown
6. Strengths and Weaknesses Section
7. Top Funding Blockers Section
8. Pitch Deck Review Preview
9. Financial Readiness Preview
10. Data Room Checklist Preview
11. Capital Pathway Recommendation
12. 7–14 Day Action Plan Preview
13. What This Report Helps You Decide
14. What Is Included by Offer
15. Trust and Disclaimer Section
16. FAQ Section
17. Final CTA Section

Every section should make the report feel more valuable and move the founder toward getting their own review or applying for the Sprint.

---

# 8. Hero Section

## Purpose

The hero should immediately communicate that this page shows a realistic preview of what founders receive from CrowdHarbor.

The founder should understand:

* This is a sample report preview
* CrowdHarbor identifies readiness gaps before funding sources do
* The report includes more than a score
* The next step is to get a readiness review or apply for the Sprint

## Hero Copy

Eyebrow:

**Sample CrowdHarbor report**

Main headline:

**See the gaps before funding sources do.**

Subheadline:

**Preview how CrowdHarbor diagnoses funding readiness, identifies weak points, reviews key materials, recommends a capital pathway, and creates a practical preparation plan before outreach.**

Primary CTA:

**Get My Readiness Review**

Secondary CTA:

**Apply for the Capital Pathway Sprint**

Text link:

**View Pricing**

Trust microcopy:

**Sample only. Actual reports are based on your company stage, materials, traction, and funding goals.**

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

* Readiness diagnosis
* Funding blockers
* Capital pathway plan

Right side:

Create a premium 3D report/document stack visual.

## Hero Visual Direction

Create a 3D report stack with layered white report pages.

The visual should show report pages with labels:

* Funding Readiness Score
* Top Funding Blockers
* Pitch Review
* Financial Readiness
* Data Room Checklist
* Capital Pathway Plan
* 7–14 Day Action Plan

The top page should show a large readiness score and a short pathway recommendation.

Example visual content:

* Overall Readiness: 62/100
* Main Gap: Financial Model
* Pathway Fit: Crowdfunding + Angel Prep
* Priority: Strengthen Use of Funds

## 3D Style

Use:

* White report pages
* Soft shadows
* Rounded corners
* Slight page depth
* Orange score/progress elements
* Black text
* Warm background
* Premium advisory look
* Clean document hierarchy

Avoid:

* Cartoon 3D
* Spinning pages
* Bright playful gradients
* Fake stock document graphics
* Overly complex finance charts

## Hero Animation

On page load:

* Eyebrow fades in
* Headline slides up
* Subheadline fades in
* CTA buttons appear with slight delay
* Report stack slides in
* Top report page slightly lifts
* Score ring animates to sample value
* Small report tags fade in one by one

Continuous animation:

* Very subtle floating motion only
* No spinning
* No bouncing
* No distracting loops

---

# 9. Report Preview Overview

## Purpose

Give visitors a quick view of what the sample report contains.

This section should make the user understand that the report is multi-layered and practical.

## Section Copy

Section label:

**Report preview**

Heading:

**What the report shows.**

Supporting copy:

**The report is designed to help founders understand where they stand, what is missing, what could block funding conversations, and what preparation path makes sense.**

## Layout Direction

Use 6 overview cards in a clean grid.

Desktop:

* 3-column grid
* 2 rows

Tablet:

* 2-column grid

Mobile:

* Single-column stacked cards

## Overview Cards

1. **Readiness Score**
   A structured view of your current funding readiness.

2. **Strengths and Weaknesses**
   What looks credible and what needs improvement.

3. **Funding Blockers**
   Issues that may create rejection risk before outreach.

4. **Material Review**
   Review areas for pitch deck, financials, data room, and traction story.

5. **Capital Pathway Recommendation**
   A suggested funding route based on stage, traction, and readiness.

6. **Action Plan**
   Practical next steps before approaching capital.

## Design Style

* White cards
* Rounded 24px corners
* Thin borders
* Small orange icons
* Short text only
* Report-module feel
* Clean spacing

## Animation

* Cards reveal in stagger
* Icons animate subtly
* Hover lifts card and turns border orange
* Keep motion calm and professional

---

# 10. Sample Founder Profile

## Purpose

Create context for the sample report.

The founder needs to understand that the sample is based on a fictional example company, not a real client.

## Section Copy

Section label:

**Fictional sample**

Heading:

**Sample company profile.**

Supporting copy:

**This sample report is based on a fictional early-stage company so founders can understand how CrowdHarbor presents readiness insights and preparation priorities.**

## Sample Profile Content

Company:

**HarborCart**

Stage:

**Early revenue**

Industry:

**B2B commerce software**

Funding Goal:

**€250,000**

Current Materials:

**Pitch deck, basic financial model, early customer data**

Preferred Funding Path:

**Not sure**

Biggest Challenge:

**Unclear whether to pursue angels, crowdfunding, or accelerator support**

## Layout Direction

Use a large white founder profile card.

Inside the card:

* Company name
* Stage
* Industry
* Funding goal
* Current materials
* Preferred funding path
* Main challenge
* Sample-only label

## Design Style

The card should look like the first page of a professional report.

Use:

* White card
* Rounded 28px corners
* Thin borders
* Small data labels
* Clean report grid
* Visible badge: **Fictional Sample**
* Soft shadow
* Muted explanatory note

## Animation

* Profile card fades in
* Data points appear one by one
* Fictional Sample badge fades in last

---

# 11. Overall Readiness Score Section

## Purpose

Show the diagnostic entry point.

The score should feel useful and important, but it should not feel like the whole product.

## Section Copy

Section label:

**Diagnostic score**

Heading:

**Overall funding readiness score.**

Supporting copy:

**The readiness score gives founders a starting point. It helps show whether the company appears prepared for serious funding review or needs more work before outreach.**

Sample score:

**62 / 100**

Sample status:

**Preparation Needed Before Outreach**

Score explanation:

**The company has early traction and a clear market opportunity, but the funding narrative, financial model, and use-of-funds logic need improvement before serious capital conversations.**

## Layout Direction

Use a large scorecard module.

Left side:

* Big animated score ring
* Large score number
* Status label
* Short explanation

Right side:

* Score interpretation bands

## Score Bands

* **0–39: Not Ready**
* **40–59: Major Gaps**
* **60–74: Preparation Needed**
* **75–89: Near Ready**
* **90–100: Strong Readiness**

## Design Style

Use:

* Large white card
* Orange score ring
* Muted score bands
* Clear text hierarchy
* Professional diagnostic feel
* Small note explaining that the score is a starting point

Do not make the score look like a game, personality quiz, or entertainment result. It should feel like a business-readiness diagnostic framework.

## Animation

* Score ring animates from 0 to 62
* Score number counts up to 62
* Status label appears after the score
* Score bands reveal vertically
* The active band receives a subtle orange accent

---

# 12. Readiness Category Breakdown

## Purpose

Show that CrowdHarbor evaluates multiple areas, not just one score.

This section should reinforce that the report is structured and thoughtful.

## Section Copy

Section label:

**Category breakdown**

Heading:

**Readiness category breakdown.**

Supporting copy:

**The overall score is supported by review categories that show where the company is stronger and where preparation is still needed.**

## Categories and Sample Scores

1. **Pitch Narrative**
   58 / 100 — Needs clearer story
   Status: Needs Work

2. **Pitch Deck Structure**
   64 / 100 — Some structure, needs sharper flow
   Status: Watch Area

3. **Financial Readiness**
   45 / 100 — Main weakness
   Status: Priority Gap

4. **Traction Clarity**
   72 / 100 — Good early signal
   Status: Strong

5. **Data Room Readiness**
   38 / 100 — Missing documents
   Status: Missing

6. **Use of Funds**
   52 / 100 — Needs stronger logic
   Status: Needs Work

7. **Market Positioning**
   68 / 100 — Promising but needs focus
   Status: Watch Area

8. **Capital Pathway Fit**
   61 / 100 — Needs clearer direction
   Status: Needs Work

## Layout Direction

Use a dashboard-style grid.

Each category card should include:

* Category name
* Score
* Small progress bar
* Status tag
* One-line insight

Desktop:

* 4-column or 2x4 dashboard grid

Tablet:

* 2-column grid

Mobile:

* Single-column cards

## Design Style

* White cards
* Orange progress bars
* Gray muted labels
* Report dashboard feel
* Thin borders
* Rounded 22–24px corners
* Small status pills

## Animation

* Category cards appear in rows
* Progress bars fill when visible
* Status tags fade in after progress bars
* Priority Gap card gets subtle orange emphasis

---

# 13. Strengths and Weaknesses Section

## Purpose

Show the founder what is working and what is not working.

This section should feel balanced, not overly negative.

## Section Copy

Section label:

**Signal review**

Heading:

**Strengths and weaknesses.**

Supporting copy:

**The report separates positive signals from preparation gaps so founders know what to keep, what to improve, and what to fix first.**

## Layout Direction

Use two large side-by-side cards.

Left card:

### Current Strengths

* Early customer interest
* Clear founder motivation
* Defined product direction
* Early revenue signal
* Specific funding target

Right card:

### Readiness Gaps

* Financial model lacks detail
* Use of funds is too broad
* Pitch deck story is not sharp enough
* Data room documents are missing
* Funding path is unclear

## Design Style

* Two white cards
* Strengths card uses calm positive indicators
* Weakness card uses orange priority indicators
* Avoid harsh red unless absolutely needed
* Use clean checklist formatting
* Add small summary insight below each card

## Animation

* Strengths card appears first
* Weakness card appears second
* Checklist items reveal one by one
* Gap indicators get subtle orange emphasis

---

# 14. Top Funding Blockers Section

## Purpose

This section should create strong perceived value.

Founders should feel:

**“This is exactly what I need to know before approaching capital.”**

## Section Copy

Section label:

**Priority blockers**

Heading:

**Top funding blockers detected.**

Supporting copy:

**These are the issues most likely to create confusion, hesitation, or rejection during funding review.**

## Blocker Cards

### Blocker 1: Financial model is not investor-ready

The assumptions are not clear enough to support the funding ask.

Priority:

**High Priority**

Suggested fix preview:

Clarify assumptions, runway logic, revenue scenarios, and how the raise supports milestones.

---

### Blocker 2: Use of funds is too general

The report needs to show exactly how the capital will be used and why that amount makes sense.

Priority:

**High Priority**

Suggested fix preview:

Break the raise into hiring, product, marketing, operations, and runway categories.

---

### Blocker 3: Pitch narrative lacks urgency

The deck explains the product but does not clearly explain why now, why this team, and why this market.

Priority:

**Medium Priority**

Suggested fix preview:

Sharpen the story around timing, traction, founder credibility, and market pull.

---

### Blocker 4: Data room is incomplete

Important documents are missing or not organized for review.

Priority:

**Medium Priority**

Suggested fix preview:

Prepare a basic data room checklist and organize missing company documents.

## Layout Direction

Use 4 large blocker cards.

Each card should include:

* Blocker title
* Short explanation
* Priority tag
* Suggested fix preview
* Small warning or priority icon

## Design Style

* White cards
* Orange priority tags
* Thin borders
* Small warning icon
* Professional, not alarming
* Hover reveals or emphasizes the suggested fix line

## Animation

* Blocker cards reveal with slight stagger
* Priority tags appear last
* Hover shows “Suggested Fix” line more clearly
* High Priority cards receive subtle orange accent

---

# 15. Pitch Deck Review Preview

## Purpose

Show that CrowdHarbor reviews fundraising assets, not just business data.

This section should make the report feel more practical and valuable.

## Section Copy

Section label:

**Material review**

Heading:

**Pitch deck review preview.**

Supporting copy:

**CrowdHarbor reviews whether the deck clearly communicates the problem, solution, traction, market, business model, team, financial logic, and funding ask.**

## Layout Direction

Use a deck-review visual.

Left side:

* Explanation
* Review categories
* Short insight

Right side:

* Mini slide-review cards

## Review Categories

1. Problem clarity
2. Solution explanation
3. Market positioning
4. Traction story
5. Business model
6. Funding ask
7. Use of funds
8. Team credibility

## Sample Deck Notes

### Stronger Section

Product explanation is clear and easy to understand.

### Needs Improvement

The traction story needs stronger proof and clearer customer evidence.

### Missing

Use-of-funds slide does not explain why €250,000 is the right amount.

## Mini Slide Cards

Create a row or grid of miniature pitch deck slide cards.

Each slide card should show:

* Slide title
* Status tag
* Short note

Example slide statuses:

* Clear
* Needs Work
* Missing
* Improve

## Design Style

* White slide cards
* Report-note style
* Thin borders
* Small tags
* Clean miniature deck layout
* No fake detailed slide content that becomes unreadable

## Animation

* Mini slide cards slide in horizontally
* Status tags appear one by one
* Hover expands a slide card slightly
* Needs Work and Missing tags receive orange emphasis

---

# 16. Financial Readiness Preview

## Purpose

Show that financial preparation matters before fundraising.

The founder should understand that financial clarity is a serious part of readiness.

## Section Copy

Section label:

**Financial review**

Heading:

**Financial readiness preview.**

Supporting copy:

**The financial review checks whether the founder’s numbers, assumptions, revenue logic, and use of funds are clear enough for serious review.**

## Review Areas

* Revenue assumptions
* Cost assumptions
* Burn rate
* Runway
* Use of funds
* Funding amount logic
* Growth assumptions
* Financial model clarity

## Sample Insight

**The company has a basic financial model, but assumptions are not clearly explained. The use of funds should be broken into hiring, product, marketing, operations, and runway logic.**

## Layout Direction

Use a financial dashboard card.

Dashboard modules:

* Revenue Logic
* Cost Structure
* Runway
* Use of Funds
* Assumptions
* Risk Notes

## Design Style

* White dashboard
* Simple bar charts or progress bars
* No complicated finance charts
* Orange for weak areas
* Black for labels
* Muted gray for details
* Small risk note card
* Report-like layout, not a generic analytics dashboard

## Animation

* Progress bars fill on scroll
* Financial modules reveal in sequence
* Risk note card highlights softly
* Use of Funds module gets subtle orange emphasis

---

# 17. Data Room Checklist Preview

## Purpose

Show the practical document-preparation value.

Many founders do not know what documents they need before funding conversations.

## Section Copy

Section label:

**Document readiness**

Heading:

**Data room checklist preview.**

Supporting copy:

**The report shows which documents are ready, missing, or need improvement before serious review.**

## Checklist Items

1. **Company Overview**
   Status: Ready

2. **Pitch Deck**
   Status: Needs Work

3. **Financial Model**
   Status: Needs Work

4. **Cap Table**
   Status: Missing

5. **Incorporation Documents**
   Status: Missing

6. **Customer / Traction Proof**
   Status: Partial

7. **Use-of-Funds Breakdown**
   Status: Missing

8. **Product Demo or Screenshots**
   Status: Ready

## Layout Direction

Use a checklist table inside a white card.

Columns:

* Document
* Status
* Why it matters
* Priority

## Mobile Direction

On mobile, transform the table into stacked document cards.

Each card should show:

* Document name
* Status pill
* Short explanation
* Priority label

## Design Style

* White card
* Thin table lines
* Rounded status pills
* Orange for Missing and Needs Work
* Muted gray for Partial
* Clean report style
* Easy to scan

## Animation

* Table rows reveal one by one
* Missing status tags highlight briefly
* Mobile cards reveal with stagger

---

# 18. Capital Pathway Recommendation

## Purpose

Show CrowdHarbor’s strategic value.

This is one of the most important sections because CrowdHarbor is not just diagnosing readiness. It helps founders choose a better preparation path.

## Section Copy

Section label:

**Pathway strategy**

Heading:

**Capital pathway recommendation.**

Supporting copy:

**CrowdHarbor helps founders understand whether crowdfunding, angel investors, grants, accelerators, pre-seed, revenue-based financing, or strategic partners may fit their company better.**

## Sample Recommendation

Recommended Primary Path:

**Crowdfunding Preparation**

Secondary Path:

**Angel Preparation After Materials Improve**

Not Recommended Yet:

**Direct Pre-Seed Outreach**

Reasoning:

**The company has early customer interest and a product that could benefit from community validation, but the financial model and pitch narrative are not yet strong enough for serious pre-seed investor outreach.**

## Layout Direction

Use a pathway map visual.

Left side:

* Founder profile summary
* Stage
* Traction level
* Readiness level

Right side:

Funding route option cards:

* Crowdfunding
* Angels
* Grants
* Accelerators
* Pre-Seed
* Revenue-Based Financing
* Strategic Partners

Highlight recommended routes.

## Design Style

* White map card
* Orange line to recommended route
* Muted gray lines to lower-fit routes
* Route cards with labels:

  * Best Fit
  * Later
  * Not Yet
  * Needs Prep
* Strategic pathway feel
* No investor-matching design

## Important Design Note

Do not make this section look like investor matching.

This is a strategy recommendation and preparation guide, not guaranteed access to investors or funding.

## Animation

* Route map appears
* Orange line draws to recommended route
* Secondary route fades in after
* “Not Recommended Yet” route appears muted
* Hover expands route cards slightly

---

# 19. 7–14 Day Action Plan Preview

## Purpose

Show the execution value.

This section should make founders feel that CrowdHarbor gives practical next steps, not just analysis.

## Section Copy

Section label:

**Preparation roadmap**

Heading:

**Sample 7–14 day preparation roadmap.**

Supporting copy:

**The action plan helps founders understand what to fix first, what can wait, and what should happen before outreach.**

## Roadmap Sections

### Days 1–2: Clarify Funding Ask

Break down the target raise and connect it to specific use-of-funds categories.

### Days 3–5: Strengthen Financial Model

Add assumptions, runway logic, hiring costs, and revenue scenarios.

### Days 6–8: Improve Pitch Narrative

Sharpen the problem, traction, timing, team, and market opportunity.

### Days 9–11: Organize Data Room

Prepare missing documents and organize existing materials.

### Days 12–14: Prepare Pathway Outreach

Start crowdfunding preparation and delay angel outreach until materials improve.

## Layout Direction

Desktop:

* Horizontal roadmap inside a large white card
* Orange timeline line
* Step cards connected across the section

Mobile:

* Vertical timeline cards
* Orange line on the left
* One step per card

## Visual Style

* White roadmap card
* Orange timeline line
* Step cards
* Priority tags
* Small checklist items
* Strategic planning feel

## Animation

* Timeline line fills
* Step cards reveal in order
* Active step gets orange accent
* Final step has subtle completion state

---

# 20. What This Report Helps You Decide

## Purpose

Shift from report features to decision-making benefits.

This section should make founders understand why the report matters before spending time, money, and credibility on outreach.

## Section Copy

Section label:

**Founder decisions**

Heading:

**What this report helps you decide.**

Supporting copy:

**The report is designed to help founders make better decisions before spending time, money, and credibility on funding outreach.**

## Decision Cards

1. **Are we ready to raise now?**
   Understand whether outreach makes sense now or preparation should come first.

2. **What should we fix first?**
   Identify the highest-priority gaps before they create rejection risk.

3. **Which documents are missing?**
   See what should be prepared before serious funding conversations.

4. **Is our funding ask clear?**
   Check whether the raise amount and use of funds are easy to understand.

5. **Which funding path fits best?**
   Compare pathways based on stage, traction, readiness, and business type.

6. **Should we approach capital now or prepare more?**
   Decide whether to begin outreach or strengthen the funding package first.

## Layout Direction

Use 6 cards in a clean grid.

Each card should have:

* Icon
* Decision question
* Short explanation

## Design Style

* White cards
* Black headings
* Muted descriptions
* Orange question icons or arrows
* Founder-friendly tone
* Strategic decision-making feel

## Animation

* Cards fade up
* Question icons scale in gently
* Hover lifts card and moves arrow

---

# 21. What Is Included by Offer

## Purpose

Connect the sample report to CrowdHarbor’s services and pricing.

This section helps the user understand which service gives them which level of report depth.

## Section Copy

Section label:

**Report depth**

Heading:

**Report depth depends on your selected preparation path.**

Supporting copy:

**The Funding Readiness Review gives a focused diagnosis. The Capital Pathway Sprint adds deeper material review, strategy, and roadmap. The Preparation Program adds hands-on support.**

## Layout Direction

Use 3 service cards.

The middle card should be highlighted as recommended.

## Card 1: Funding Readiness Review

Includes:

* Readiness scorecard
* Strengths and weaknesses
* Top blockers
* Basic pathway recommendation
* Short action plan

CTA:

**Get My Review**

## Card 2: Capital Pathway Sprint

Badge:

**Recommended**

Includes:

* Everything in Readiness Review
* Pitch deck review
* Financial readiness review
* Data room checklist
* Strategy session
* Capital pathway recommendation
* 7–14 day roadmap

CTA:

**Apply for Sprint**

## Card 3: Preparation Program

Includes:

* Everything in Sprint
* Pitch narrative improvement
* Deck structure recommendations
* Financial model feedback
* Follow-up readiness review
* 2–4 week support

CTA:

**Apply for Support**

## Design Style

* Three white cards
* Sprint card highlighted
* Orange recommended badge
* Clear CTAs
* Clean checklists
* Premium service-package feel

## Animation

* Cards reveal in sequence
* Sprint card highlights softly
* CTA arrows move on hover

---

# 22. Trust and Disclaimer Section

## Purpose

Set expectations and avoid risky claims.

The trust section should be clear and reassuring, not scary.

## Section Copy

Section label:

**Trust and expectations**

Heading:

**A preparation report, not a funding promise.**

Supporting copy:

**CrowdHarbor helps founders prepare before approaching capital. It does not guarantee funding, act as an investor, serve as a broker, or replace legal, tax, financial, or investment advice.**

## Trust Cards

1. **Sample only**
   The preview is fictional and does not represent a guaranteed result.

2. **No funding guarantees**
   The report helps identify gaps and next steps, but funding outcomes are not promised.

3. **Not investor matching**
   Capital pathway recommendations are strategic preparation guidance, not guaranteed access.

4. **Human preparation focus**
   The report is part of a broader preparation process, not just an automated score.

## Design Style

* Calm white cards
* Shield/check icons
* Minimal orange
* Clear professional language
* Reassuring tone
* No scary legal design

## Animation

* Simple fade in only
* Avoid playful motion

---

# 23. FAQ Section

## Purpose

Answer questions about the sample report and deliverables.

## Section Copy

Heading:

**Questions about the sample report.**

Use accordion FAQ cards.

## FAQ Items

1. **Is this a real company report?**
   No. The sample should be based on a fictional company so visitors can understand the structure and type of insights CrowdHarbor provides.

2. **Will my report look exactly like this?**
   The structure may be similar, but the actual content depends on your company stage, traction, materials, funding goal, and selected offer.

3. **Is the readiness score the whole report?**
   No. The score is only the diagnostic entry point. The real value comes from the review, blockers, material gaps, pathway recommendation, and action plan.

4. **What materials do I need to get a better report?**
   A pitch deck, financial model, business plan, traction data, website, product demo, or company overview can help. If you do not have these yet, the report can identify what is missing.

5. **Does the report tell me which investors to contact?**
   The report focuses on preparation and pathway fit. It does not guarantee investor access or funding.

6. **Can I use the report before applying to accelerators or grants?**
   Yes. The report can help identify gaps before approaching accelerators, grants, crowdfunding platforms, angels, or other capital sources.

7. **Do I receive a PDF?**
   For Version 1, the report can be delivered as a polished PDF, Google Doc, or designed report file depending on the internal workflow.

8. **Can I upgrade after receiving the report?**
   Yes. The Funding Readiness Review can lead into the Capital Pathway Sprint or deeper preparation support.

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
* Accessible accordion labels
* Keyboard-friendly interaction
* Visible focus states
* Keep answers clear and concise

---

# 24. Final CTA Section

## Purpose

Convert the visitor after they understand the value of the report.

## Section Copy

Heading:

**Ready to see what your funding gaps look like?**

Supporting copy:

**Start with a readiness review or apply for the Capital Pathway Sprint to understand your current readiness, material gaps, funding blockers, and best-fit preparation path before outreach.**

Primary CTA:

**Get My Readiness Review**

Secondary CTA:

**Apply for the Capital Pathway Sprint**

Text link:

**View Pricing**

Trust line:

**No funding guarantees. No broker promises. Structured preparation before you raise.**

## Visual Direction

Use a large white CTA card on the warm background.

Inside:

* Big heading
* Short paragraph
* CTA buttons
* Trust line
* Small report preview stack in the corner

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
* Report preview card floats gently
* Button arrow moves on hover
* Keep motion subtle and premium

---

# 25. Sample Report Page 3D Direction

Use 3D more heavily here than other inner pages because the report is the product preview.

Recommended 3D elements:

## Hero

Large 3D report stack with layered pages.

It should make the report feel tangible and premium.

## Report Score Section

Scorecard with animated ring and floating category cards.

## Capital Pathway Section

3D pathway map showing recommended route.

## Final CTA

Small report stack or document preview.

## 3D Rules

* Maximum 3 major 3D visuals on this page
* Keep 3D premium and report-like
* No spinning objects
* No cartoon characters
* No heavy 3D models
* Use static fallback on mobile
* Keep load speed clean
* Align every 3D element with white cards, black text, orange accents, and warm background

---

# 26. Animation System

Use animation to make the report feel interactive and valuable.

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

Progress fill:
initial: { scaleX: 0 }
animate: { scaleX: 1 }
transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }

Score ring:
animate from 0 to target score with smooth easing
```

## Page Load

* Hero copy fades up
* CTA buttons appear
* Report stack slides in
* Score ring animates
* Report labels appear in sequence

## Scroll

* Report modules reveal one by one
* Score bars fill
* Checklist rows appear
* Pathway line draws to recommendation
* Roadmap timeline fills
* Blocker tags appear with slight emphasis
* Offer cards reveal in sequence

## Hover

* Report cards lift slightly
* Border turns orange
* Pathway route cards expand slightly
* CTA arrow moves right
* Mini report cards tilt very subtly

Avoid:

* Overly playful animation
* Too much motion around serious report content
* Heavy charts that slow the page
* Fake interactivity that does not work
* Constant spinning
* Distracting loops

Respect `prefers-reduced-motion`.

---

# 27. Responsive Design

## Desktop

* Hero uses 2 columns
* Large report mockups are visible
* Score and category dashboard has strong visual presence
* Strengths and weaknesses are side by side
* Pathway map is full-width
* Roadmap is horizontal
* Offer cards use 3 columns
* Data room checklist can use a table

## Tablet

* Hero can stay 2-column if readable
* Category cards become 2-column
* Report mockups resize cleanly
* Pathway map may become simplified
* Offer cards can become 2 + 1 layout
* Roadmap may stay horizontal only if readable

## Mobile

* Hero copy first
* Report visual second
* CTA buttons full-width
* Scorecard stacked
* Category cards single-column
* Strengths and weaknesses stacked
* Data room table becomes cards
* Pathway map becomes vertical recommendation cards
* Roadmap becomes vertical timeline
* 3D simplified or hidden
* Keep text short and easy to scan
* Tap targets minimum 44px

Mobile must not feel overloaded. The report should still feel premium, readable, and valuable.

---

# 28. Accessibility Rules

Follow accessibility best practices:

* Use semantic heading order
* Maintain high contrast text
* Use visible focus states
* Make all buttons keyboard-friendly
* Make FAQ accordions keyboard-accessible
* Do not rely only on color for score status or document status
* Add text labels to icons and tags
* Keep body text at least 16px
* Minimum tap target size: 44px
* Respect reduced motion preferences
* Avoid tiny gray text
* Avoid orange as small low-contrast text on warm background
* Make data tables accessible or convert them into clear mobile cards

---

# 29. Copy Tone

The copy should feel:

* Strategic
* Clear
* Analytical
* Premium
* Honest
* Helpful
* Founder-friendly
* Professional
* Calm
* Practical

Avoid language like:

* Guaranteed funding
* Investor ready in 24 hours
* We will get you funded
* Instant investor matching
* Perfect pitch guaranteed
* Automatic approval
* Raise money easily
* Investor access included

Use language like:

* Readiness
* Blockers
* Missing materials
* Pathway fit
* Preparation roadmap
* Funding clarity
* Before outreach
* Professional review
* Action plan
* Funding gaps
* Material review
* Strategic preparation

---

# 30. Conversion Rules

The page should convert users after making the report feel real and valuable.

Primary CTA:

**Get My Readiness Review**

Secondary CTA:

**Apply for the Capital Pathway Sprint**

Third CTA:

**View Pricing**

CTA placement recommendations:

* Hero
* After report preview overview
* After top blockers section
* After action plan section
* Offer depth section
* Final CTA section

Do not overwhelm the page with too many different CTA labels.

Avoid weak CTAs like:

* Submit
* Learn More
* Contact Us
* Get Started

The Capital Pathway Sprint should naturally feel like the deeper next step after seeing the sample report.

---

# 31. Design Quality Checklist

The Sample Report Page is approved only if:

* The report feels premium and valuable
* The score does not feel like the whole product
* The page clearly shows diagnosis, review, pathway, and action plan
* The fictional sample founder profile is clear
* The pathway recommendation does not look like investor matching
* The Capital Pathway Sprint naturally feels like the next step
* The design uses brand colors consistently
* The report visuals are clean and professional
* 3D feels useful, not decorative
* Mobile layout is easy to read
* Legal and trust language is visible
* CTAs are clear and repeated naturally
* The page does not look like a basic quiz result
* The page does not feel like a cheap downloadable PDF
* The report feels structured, human-reviewed, and worth paying for

---

# 32. Final Creative Direction

The Sample Report Page should visually communicate:

**CrowdHarbor helps founders see what needs to be fixed before funding sources review them.**

By the end of the page, the founder should feel:

**“I understand what CrowdHarbor will review, I can see the value of the report, and I want this type of preparation before I raise.”**

Create a polished, premium, conversion-focused, mobile-responsive Sample Report Page for CrowdHarbor using this full direction.
