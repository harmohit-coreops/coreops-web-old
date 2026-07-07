# 03 — Layout, Grid, Spacing & Responsive

Design reference for coreops.ai. This document covers the **structural layer**: grid, page
width, spacing rhythm, corner radii, elevation, and how the desktop layouts collapse to mobile.

## 0. Sources & method

- **Hard numbers** (container width, gutters, radii, shadows, heading margins) are taken verbatim
  from `AGGREGATE-DIGEST.md` and `design-data/home.json`. Frequencies shown as `(n)` are the number
  of elements across all 117 pages exhibiting that value — high frequency = load-bearing token.
- **Spatial numbers** (section padding, card gaps, column ratios) are estimated from the actual
  desktop (1440px) and mobile (iPhone 13, 390px CSS) full-page screenshots for `home`,
  `products/coresight`, `enterprise-ai-services`, and `resource-hub/blogs`. These are marked `~`.
- Stack is **Next.js + headless WordPress**, front end built on a **Bootstrap 5 grid** (the 1320px
  container and 12px half-gutter are Bootstrap 5 `.container` / `.row` defaults, unmodified).

---

## 1. Grid system

### 1.1 The container

| Property | Value | Evidence |
|---|---|---|
| Container max-width | **1320px** | digest "Container max-widths: 1320px (332)"; `home.json` all 11 containers `maxWidth:1320` |
| Container horizontal padding | **12px left / 12px right** | digest "Container horizontal padding: 12px/12px (332)" |
| Container vertical padding | **0px** | `home.json` every container `pt:0 pb:0` — vertical rhythm lives on section wrappers, not `.container` |
| Inner content width | **1296px** (1320 − 2×12) | derived |
| Grid basis | **Bootstrap 5, 12 columns** | 1320px = Bootstrap default xxl container; 12px = half of the default `--bs-gutter-x: 1.5rem` (24px) |
| Gutter between columns | **24px** (12px column padding each side) | Bootstrap default; visually confirmed on `resource-hub/blogs` 3-up card gaps |

This is a **plain, unopinionated Bootstrap grid**. There is exactly one container width across the
entire site (332/332 instances at 1320px) — no narrow "reading" container and no wide "full" variant
below full-bleed. Everything either sits in the 1320 container or goes edge-to-edge.

### 1.2 Column splits actually observed

| Split | Bootstrap cols | Where seen (screenshots) |
|---|---|---|
| **50 / 50 media + text** | `col-lg-6` × 2 | Home hero (text ↔ 3D globe); CORESight hero (text ↔ laptop mockup); CORESight "Benefits"/"Built on generative AI" alternating text↔photo; every bottom CTA ("Get in touch" text block ↔ form card) |
| **3-up card grid** | `col-lg-4` × 3 | Home "Our products", "Success stories", "Blogs"; CORESight "Customer spotlight", "Use cases", "Experience effortless insights" (video thumbs); Enterprise "Use cases"; **`resource-hub/blogs` is the cleanest 3-column reference** |
| **2-up grid** | `col-lg-6` × 2 | CORESight "Related blogs" (2 cards); Enterprise "AI services across industries" (2×2 cells in one card); footer link groups pair up |
| **4-up logo grid** | `col-md-3` × 4 | Home "Trusted by modern enterprises" (≈4 across × 2–3 rows) |
| **Single wide feature card** | `col-12` | CORESight "Key features" panel (2×3 feature grid *inside* one rounded card); Enterprise "Our repertoire of services" (accordion list inside one card) |
| **Sidebar tabs + panel** | `col-4` + `col-8` | Home "Enabling organizational efficiencies" (numbered vertical tab list ↔ content panel) |
| **Carousel row** | 3 visible + arrows | Home "Our products" / "What's new"; CORESight & Enterprise "Use cases" and video rows — 3 cards visible with left/right chevron controls overlapping the container edges |

Note: card grids are frequently wrapped in a **carousel** (chevron arrows sit just outside the 1320
container, at ~viewport edge). The static grid and the carousel share the same 3-up column math.

---

## 2. Page width & margins

### 2.1 Desktop (1440px reference)

- Outer margin (viewport edge → container): **(1440 − 1320) / 2 = 60px** each side.
- Plus the 12px container padding → text/cards start **~72px** from the viewport edge.
- On viewports between 1200–1400px the Bootstrap container steps down to **1140px** (xl), so the side
  margin shrinks but content never touches the edge.

### 2.2 Mobile (iPhone 13, 390px CSS)

- Container becomes fluid `width:100%` minus the 12px padding each side → **~12–16px side padding**,
  content spans ~360px. Confirmed on all four mobile screenshots: cards and text sit close to the
  edge with a small, consistent inset.
- Everything is **one column** (see §6).

### 2.3 Full-bleed bands

Several sections break out of the 1320 container to paint a **100vw background**, while their inner
content stays inside the 1320 container:

| Band | Background | Pages |
|---|---|---|
| Promo / webinar strip | near-black `#010102`/`#000000` | Home "CORESight Webinar" strip |
| Stats band | brand navy `#132976` / `#19369d` | Home "100+ / $15B+" + blue stat card cluster |
| Section tint bands | light gray `#f9f9f9` (1636) or white `#ffffff` | alternating section backgrounds site-wide |
| Product/hero wash | periwinkle `#edf1ff` / `#e7ebfb` | CORESight and Enterprise heroes + several inner sections sit on a full-bleed lavender wash |
| Footer | periwinkle `#e7ebfb`-family | all pages |

Pattern to preserve in the port: **full-bleed color band → inner `.container` (max 1320, 12px pad)**.
Never let content itself hit the viewport edge except intentionally-bleeding hero imagery.

---

## 3. Spacing scale & vertical rhythm

### 3.1 What the data proves (exact)

Heading bottom margins are **small and tight** — headings hug their body copy; the big air is added
by section wrappers, not by heading margins.

| Element | margin-bottom | Source |
|---|---|---|
| H1 (hero) | **1.6px** (≈0) | `home.json` h1 |
| H2 | **10px** | `home.json` h2 |
| H3 | **4px** | `home.json` h3 |
| H4 | **1.6px** (≈0) | `home.json` h4 |
| H5 (eyebrow/label) | **20px** | `home.json` h5 |
| Paragraph | **0px** | `home.json` paragraph |
| Column gutter | **12px** (half) / **24px** (full) | container padding |

The recurring literal values in the source are therefore **1.6 ≈ 0, 4, 10, 12, 20, 24** — a loose
mix of a 4-based scale and Bootstrap's 12/24 gutter. Radii (§4) add **6, 8, 10, 15, 20, 40**.

### 3.2 What the screenshots show (estimated section rhythm, desktop)

Measured off the 1440px full-page captures (values are approximate, ±8px):

| Gap | Approx desktop | Notes |
|---|---|---|
| Section top/bottom padding | **~72–96px** | Generous. Big section titles ("Our products", "Success stories") have large air above and below |
| Section title → subtitle | **~12–16px** | centered title, muted subtitle directly under |
| Subtitle → content block | **~40–48px** | |
| Card vertical padding (inner) | **~24–32px** | |
| Gap between cards in a grid | **~24px** | matches Bootstrap gutter; confirmed on blogs grid |
| Card image → card title | **~16px** | blog cards |
| Card title → excerpt | **~8–12px** | |
| Icon → feature title (feature cards) | **~12–16px** | CORESight "Key features" |
| Accordion row height / padding | **~20–24px** vertical | Enterprise "repertoire" rows |

Mobile compresses section padding to roughly **~40–56px** top/bottom and card gaps to **~16–20px**.

### 3.3 Proposed spacing token scale (4/8-based)

A single 4px-based scale absorbs every observed value (4, 8, 10→8, 12, 16, 20, 24, 32, 48, 64, 80, 96).
`space-3` (12px) is the native half-gutter; `space-6` (24px) is the native card gap.

| Token | px | rem | Maps to observed use |
|---|---|---|---|
| `space-0` | 0 | 0 | H1/H4 margin (≈1.6), paragraph margin |
| `space-1` | 4 | 0.25 | H3 margin-bottom |
| `space-2` | 8 | 0.5 | title→excerpt gap |
| `space-3` | 12 | 0.75 | **container padding / half-gutter**, H2 margin (≈10) |
| `space-4` | 16 | 1 | image→title, feature icon gap |
| `space-5` | 20 | 1.25 | H5 (eyebrow) margin-bottom, accordion padding |
| `space-6` | 24 | 1.5 | **full column gutter / card-to-card gap**, card inner padding |
| `space-8` | 32 | 2 | card inner padding (large) |
| `space-12` | 48 | 3 | subtitle→content, small section padding (mobile) |
| `space-16` | 64 | 4 | section padding (compact) |
| `space-20` | 80 | 5 | section padding (default desktop) |
| `space-24` | 96 | 6 | section padding (spacious desktop) |

---

## 4. Radius scale & mapping

Exact radii and frequencies from the digest, mapped to the component types they belong to
(inferred from screenshots + count patterns):

| Radius | Freq | Token | Component mapping |
|---|---|---|---|
| **4px** | 27 | `radius-xs` | small inputs, tags |
| **6px** | 514 | `radius-sm` | buttons, form inputs, small chips — a workhorse value |
| **8px** | 292 | `radius-md` | inputs, small cards, secondary buttons |
| **10px** | **1069** | `radius-lg` | **default card / image radius** — the single most common radius; standard content cards, blog cards, images |
| **11px** | 22 | (→ 10) | one-off; fold into `radius-lg` |
| **12px** | 293 | `radius-lg-alt` | medium cards, container panels |
| **15px** | **899** | `radius-xl` | **large feature panels / big cards** — second most common; the "Key features" and "repertoire" panels |
| **16px** | 1 | (→ 15) | negligible |
| **20px** | 495 | `radius-2xl` | large rounded section cards, hero/media containers |
| **24px** | 42 | `radius-3xl` | extra-large cards |
| **35px** | 3 | (→ 40) | negligible |
| **40px** | 104 | `radius-pill` | **pill buttons / chips** — the rounded "Request a demo"-style and category pills |
| **50%** | 139 | `radius-full` | **circular** — avatars, round icon buttons, floating CTA/bell buttons |
| **0 0 10px 10px** | 362 | `radius-bottom` | **bottom-only rounding** — dropdown/mega-menu panels and image-topped cards where the top is square and only the bottom two corners round |

Practical reduction for the port: **6 (controls) · 10 (cards/images) · 15/20 (large panels) · 40
(pills) · 50% (circles)** covers ~95% of usage; keep `radius-bottom` for dropdown panels.

---

## 5. Elevation / shadow scale

Exact box-shadows and frequencies from the digest, ordered into a usable ramp. Note the brand uses a
distinctive **periwinkle-tinted shadow** (`rgb(197,205,231)` = `#c5cde7`) for premium/feature cards
in addition to standard neutral black shadows.

| Level | Shadow value | Freq | Use |
|---|---|---|---|
| **e0 — none** | `none` | — | flat sections, logos |
| **e1 — ambient** | `rgba(0,0,0,0.05) 0 0 10px` | 27 | very soft lift on light cards |
| **e1-soft (multi)** | `rgba(0,0,0,0.05) -4px 4px 6px, rgba(0,0,0,0.05) 4px 4px 6px, rgba(0,0,0,0.04) 0 6px 8px` | **348** | soft symmetric card shadow — default on light/white cards over tinted bands |
| **e2 — card (default)** | `rgba(0,0,0,0.1) 0 4px 16px` | **373** | **the workhorse card elevation** — blog cards, product cards, quote cards |
| **e2-tight** | `rgba(0,0,0,0.2) 0 0 6px` | 70 | tight contour on icon buttons / small floating controls |
| **e3 — hover lift** | `rgba(0,0,0,0.1) 0 10px 20px` | 22 | raised/hover state |
| **e-brand-sm** | `rgb(197,205,231) 3px 2px 7px` | 116 | subtle periwinkle-tinted lift |
| **e-brand-lg** | `rgb(197,205,231) 20px 20px 50px` | 36 | **large offset periwinkle glow** — hero/feature cards, the signature "expensive" shadow |
| e2-var | `rgba(0,0,0,0.05) 0 5px 20px` | 29 | alt card |
| e-google | `rgba(67,71,85,0.27) 0 0 4px, rgba(90,125,188,0.05) 0 4px 16px` | 22 | layered card (blue-tinted) |

Recommended port ramp: **e1** (ambient) → **e2** (`0 4px 16px rgba(0,0,0,.1)`, default card) →
**e3** (`0 10px 20px rgba(0,0,0,.1)`, hover) → **e-brand** (`20px 20px 50px #c5cde7`, feature/hero).
Keep the periwinkle shadow — it is a genuine brand signature, not incidental.

---

## 6. Responsive behavior

### 6.1 Breakpoints (Bootstrap 5, implied by the stack)

| Name | Min width | Container max | Container behavior |
|---|---|---|---|
| xs | 0 | 100% (fluid) | full-width, ~12–16px side pad |
| sm | 576 | 540 | |
| md | 768 | 720 | |
| lg | 992 | 960 | **primary collapse point** (navbar-expand-lg; `col-lg-*` grids un-stack here) |
| xl | 1200 | 1140 | |
| xxl | 1400 | **1320** | the width seen on 1440px captures |

The meaningful desktop→mobile break is **lg (992px)**: above it, grids are multi-column and the nav
is horizontal; below it, everything stacks and the nav becomes a hamburger.

### 6.2 How each pattern collapses (desktop → mobile)

| Desktop | Mobile (observed in captures) |
|---|---|
| Horizontal nav (logo · links · bell · "Enquire now") | **Hamburger**: logo left, "Enquire now" + hamburger icon right; links hidden in a drawer/mega-panel |
| Hero 50/50 (text ↔ visual) | **Stacked**: heading + copy + buttons on top, visual below (home hero overlays text on the dark globe visual) |
| 3-up card grids (products, blogs, success stories) | **1 column**, full-width cards stacked; carousels show 1 card at a time with dots/arrows |
| 4-up logo grid ("Trusted by…") | **2 columns** of logo tiles |
| Partner logo row (AWS/Oracle/NVIDIA/…) | wraps to **2–3 per row** / stacked |
| Stats band (text ↔ blue stat cluster + big 100+/$15B+) | stacks vertically; big numbers sit above/below the text |
| Sidebar-tabs + panel ("Enabling…") | tabs collapse above the panel, both full-width |
| Feature panel 2×3 grid ("Key features") | **1 column** list of icon+title+text rows |
| 2×2 industry grid (Enterprise) | **1 column** of stacked cells |
| FAQ: accordion ↔ photo (50/50) | accordion full-width; photo drops **below** (or hides) |
| Bottom CTA: copy+image ↔ form card | **stacked**: heading/image first, form card below |
| Footer 4-column links + address | address block on top, link groups reflow to **2 columns** |

### 6.3 Type scaling

The digest doesn't tag viewport, but the two H1 signatures reveal the scale-down:

- Home **hero H1 desktop = 65px / lh65** (`helvetica_neue_thin`, navy `#132976`) — only 4–7 elements.
- Dominant H1 = **40px / lh48 / w500** (48 elements) — inner-page heroes and the mobile-scaled hero.
- Section **H2 = 40px / lh48** on desktop; scales toward **~26–28px** on mobile.
- Body stays **17px / lh25.5** and small labels **14–16px** across breakpoints (little/no scaling).
- Global **letter-spacing: 1px** is applied everywhere and does not change responsively.

So headline sizes roughly **halve** from desktop to mobile (65→~34, 40→~26), while body text holds.

---

## 7. Recommended layout & spacing tokens for the React port

Drop-in token set that reproduces the observed structure. Values chosen to match the source, snapped
to a 4px grid where the source was already close (e.g. 10→keep as card radius, gutter kept at 24).

### 7.1 Layout tokens

```
--container-max:      1320px;   /* single container width, from source */
--container-pad-x:    12px;     /* half-gutter, from source */
--grid-columns:       12;       /* Bootstrap basis */
--grid-gutter:        24px;     /* full gutter between cards/cols */
--section-pad-y:      80px;     /* desktop default (compact 64 / spacious 96) */
--section-pad-y-mob:  48px;     /* mobile */
--page-pad-x-mob:     16px;     /* mobile side padding */
--nav-collapse:       992px;    /* lg — hamburger + un-stack below */
```

### 7.2 Spacing scale

| Token | px | Primary use |
|---|---|---|
| `space-1` | 4 | tight heading margin |
| `space-2` | 8 | title→body micro-gap |
| `space-3` | 12 | container pad / half-gutter |
| `space-4` | 16 | image→title, mobile side pad |
| `space-5` | 20 | eyebrow margin, accordion pad |
| `space-6` | 24 | **card gap / full gutter** |
| `space-8` | 32 | card inner padding |
| `space-12` | 48 | subtitle→content, mobile section pad |
| `space-16` | 64 | compact section pad |
| `space-20` | 80 | **default section pad** |
| `space-24` | 96 | spacious section pad |

### 7.3 Radius scale

| Token | px | Use |
|---|---|---|
| `radius-sm` | 6 | buttons, inputs, chips |
| `radius-md` | 8 | small cards, inputs |
| `radius-lg` | 10 | **default card / image** |
| `radius-xl` | 15 | large feature panels |
| `radius-2xl` | 20 | big media/section cards |
| `radius-pill` | 40 | pill buttons, category pills |
| `radius-full` | 50% | avatars, round icon buttons |
| `radius-bottom` | 0 0 10px 10px | dropdown panels / image-topped cards |

### 7.4 Elevation scale

| Token | Value | Use |
|---|---|---|
| `shadow-1` | `0 0 10px rgba(0,0,0,.05)` | ambient soft |
| `shadow-2` | `0 4px 16px rgba(0,0,0,.1)` | **default card** |
| `shadow-3` | `0 10px 20px rgba(0,0,0,.1)` | hover / raised |
| `shadow-brand-sm` | `3px 2px 7px #c5cde7` | subtle periwinkle lift |
| `shadow-brand-lg` | `20px 20px 50px #c5cde7` | **feature / hero card (signature)** |
| `shadow-icon` | `0 0 6px rgba(0,0,0,.2)` | floating icon buttons |

---

### Notable / inconsistent findings

- **One container, no variants.** All 332 containers are 1320px with 12px padding — there is no
  narrow reading measure and no wide layout. Long-form pages (blogs) reuse the same 1320 grid, which
  makes text lines wide. Consider adding a narrow `--container-narrow` (~760px) in the redesign.
- **Vertical padding is on `.container` = 0 everywhere;** all vertical rhythm is externalized to
  section wrappers and Bootstrap row margins. Keep that separation in the port (containers control
  width only; sections control vertical space).
- **Radius sprawl:** 16 distinct radii (4,6,8,10,11,12,15,16,20,24,35,40,50%, plus `0 0 10px 10px`).
  10px (1069) and 15px (899) dominate; 11/16/35 are near-duplicates that should be consolidated.
- **Two parallel shadow families** — neutral black (`rgba(0,0,0,.05–.2)`) and periwinkle
  (`#c5cde7`). The periwinkle offset glow (`20px 20px 50px`) is the site's most distinctive elevation
  and worth keeping/elevating in a "fancier" redesign.
- **Content mismatch on `enterprise-ai-services`:** the captured hero H1 reads "Enterprise
  application services" (not "Enterprise AI services"), suggesting a mislabeled/duplicated hero on
  that route — a content bug to verify during the port, not a layout rule.
- **Gutter = half-gutter confusion:** the 12px reported "container padding" is Bootstrap's half of a
  24px gutter; the visible card-to-card gap is 24px. Use 24px as the grid gap token, not 12.
