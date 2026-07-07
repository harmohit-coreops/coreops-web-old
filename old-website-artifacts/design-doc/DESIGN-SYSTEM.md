# CoreOps.ai — Master Design System

**Audience:** Claude Design (claude.ai/design). **Purpose:** a single, canonical, evidence-based reference for the *current* CoreOps.ai visual language, plus a token set ready to drop into CSS variables / a Tailwind config, and opinionated directives for evolving it into a fancier design language and porting the site to React.

**How to trust this doc:** every number below traces to `AGGREGATE-DIGEST.md` (computed styles across all 117 captured pages) or to a named screenshot. The seven dimension analyses (`01-typography.md` … `07-page-teardowns.md`) are the long-form evidence; this file reconciles them into one coherent system. Where two sources conflict, the conflict is flagged and a canonical choice is made.

**One-line reconciliation you must internalize:** the site ships a generic six-token CSS starter (`--coreops-primary` etc.) that **does not describe what actually renders**. The real, rendered site is a **multi-navy + periwinkle** system in **hairline Helvetica Neue**. Treat the declared tokens as legacy scaffolding and this document's §3 token set as ground truth.

---

## 1. Executive summary

**What CoreOps.ai is:** an enterprise AI / AIOps company selling an "AI operating system for enterprises" — a suite of agentic-AI products (AgentCORE, CORESight, DataCORE, COREHire, COREServ, CORETrack, Aithra) plus AI/application services. Audience is CXO/CIO/CTO enterprise buyers. Tech stack: **Next.js front end over headless WordPress** (`backend.coreops.ai`), built on an unmodified **Bootstrap 5 grid**.

**The essence of the current visual language (8 bullets):**

1. **Enterprise / institutional authority**, carried almost entirely by color, not decoration — restrained, corporate-tech, "trustworthy consultancy."
2. **Navy is the brand, and it's a *family* of blues, not one blue** — display navy `#132976`, action navy `#19369d`, body-ink navy `#0d1c4f`, deep navy `#001858`/`#002d72`. Even paragraph text is navy, which is why plain pages still read "blue."
3. **Hairline Helvetica Neue.** Effectively a **two-weight system — Thin (100) for text, Light (300) for headings**; six of nine loaded faces never render. Low weight-contrast; hierarchy comes from **size + color**, not boldness.
4. **Spacious and airy** — generous section padding (~72–96px desktop), a single wide 1320px container, tight display leading (1.0) against loose body leading (1.5), and **~1px letter-spacing on virtually every text node** (the single most defining brand tic).
5. **Card-heavy and carousel-driven.** Nearly every content type (products, blogs, testimonials, use-cases, videos) is a 3-up white rounded card in a Slick carousel with circular arrows.
6. **Blue gradients + periwinkle surfaces.** Soft radial/diagonal periwinkle washes (`#edf1ff`/`#e7ebfb`) for hero and section bands; solid navy blocks for stats/CTAs; a **periwinkle-tinted shadow** (`#c5cde7`) that makes cards float on a blue cushion — a genuine, cheap signature.
7. **The dandelion.** One central brand symbol — a fine line-art dandelion whose seeds "blow away" — reused as logo mark, favicon, an "seeds = people/neural network" illustration, and the seed-burst replacing the "O" in every product wordmark.
8. **Sentence-case, no uppercase, no bold.** `text-transform: none` on 100% of captured signatures; headings split into a **two-tone keyword highlight** (base navy + emphasis words in brighter blue) as the closest thing to a type flourish.

---

## 2. Brand foundations

### 2.1 Logo

- **Lockup:** horizontal — dandelion mark (left) + `coreops.ai` wordmark (right). SVG `viewBox 0 0 171 67`, renders **171×67px**, aspect ~2.55:1. Source: `assets/images/coreops-logo.svg`.
- **Mark:** a small, hand-drawn-feel dandelion (~12 thin vector strokes; stem, seed-head, radiating spokes, 3–4 seeds detaching upper-right). Not geometric/gridded — reads as fine ink line-art. Two-color strokes: primary `#0D1C4F`, secondary `#000000`.
- **Wordmark:** bespoke rounded-lowercase sans (**NOT** Helvetica Neue — the logo does not share the site typeface). Two-tone: `coreops` = `#000000`, **`.ai` = `#19369D`** (the single most important brand-color cue; matches `--coreops-primary` exactly).
- **On dark** (footer, navy bands): a white/light knockout of the same lockup; the two-tone accent collapses to mono-white.
- **Clear-space:** ~one mark-height on all sides; lockup sits ~40px tall in a ~90px header. The `og:image` for every page is `logo.svg` — the mark is the default social graphic.

### 2.2 Voice & tone

- **Confident, benefit-led, lightly technical.** Enterprise vocabulary: "agentic AI," "AI operating system for enterprises," "modernization," "seamless integration," "self-serve AI data expert," "co-pilot."
- **Proof by numbers, everywhere:** "2X faster," "50% modernization," "cutting costs by 25%," "100+ projects," "$15B+," "60+ team," "100+ countries." Preserve this metric-forward credibility pattern.
- **Sentence case, not title case** ("Our products," "Success stories," "Frequently asked questions"). Product names are stylized caps (AgentCORE, CORESight, DataCORE, COREHire, COREServ, CORETrack; Aithra is title case).
- **Brand metaphor:** the *dandelion effect* — "resilient, adaptable, effortlessly scalable… inspired by neural networks in nature." Dandelion = distributed intelligence = neural network. This is the emotional throughline; keep it.
- **Testimonials** are anonymized-by-role ("CFO of a leading CDMO…") for enterprise discretion.
- **Cleanup on port:** mixed British/Indian vs American spelling ("optimisation" vs "optimization") in one corpus, and a visible typo ("takinh ownership" on `/about`). Establish one spelling standard.

---

## 3. Design tokens (canonical, consolidated)

**This is the most important section.** It reconciles all seven dimension docs into one drop-in set. Names are semantic so the design can evolve without renaming. Values are what actually renders, snapped to a 4px grid where the source was already close.

### 3.0 Declared vs rendered — the reconciliation table

The site's stylesheet declares six tokens on 116 pages. Here is the verdict on each; **use the rendered reality, not the declared value.**

| Declared token | Declared hex | Rendered reality | Verdict |
|---|---|---|---|
| `--coreops-primary` | `#19369d` | Yes — interactive/brand blue on buttons & links | **Keep** |
| `--coreops-primary-dark` | `#1e40af` | **Never appears** in rendered freq tables; real "dark blues" are `#132976`/`#001858`/`#0d1c4f` | **Replace** |
| `--coreops-secondary` | `#f0f7ff` | Approx only; real tints are `#edf1ff`/`#e7ebfb`/`#c5cde7` | **Redefine as a tint scale** |
| `--coreops-text` | `#1f2937` | **Barely appears**; real body ink is `#0d1c4f` (navy) + `#000000` | **Replace** |
| `--coreops-border` | `#e5e7eb` | Plausible for hairlines; `#c5cde7` periwinkle also does border/shadow duty | **Keep + add periwinkle border** |
| `--coreops-success` | `#10b981` | **Unused** — not in any rendered text/bg table | Keep as intent only; not "the site" |

### 3.1 Color

**Brand blues** (the "action + display + ink" ramp — do not collapse `#19369d` and `#132976`; they sit side-by-side intentionally):

| Token | Hex | Role | Evidence |
|---|---|---|---|
| `--brand-primary` | `#19369d` | Interactive / buttons / links / active tabs (declared primary) | bg 186, text 104 |
| `--brand-primary-600` | `#132976` | Display H1/H5 headings, navy stat/CTA blocks (de-facto brand navy) | text 1065, bg 516 |
| `--brand-primary-700` | `#002d72` | Deep heading navy (H3 signature) | text 499 |
| `--brand-primary-800` | `#001858` | Deep-navy **emphasis text** (no background usage anywhere in the digest — do not use for blocks) | text 812 |
| `--brand-ink` | `#0d1c4f` | **Body-text ink (navy-black, not gray)**; also does deep-navy **block-background** duty | text 2046 (#2 overall) · **bg 94** |

**Neutrals / text:**

| Token | Hex | Role | Evidence |
|---|---|---|---|
| `--text-strong` | `#0a0a23` | Near-black headings / dense small text | text 17 |
| `--text-body` | `#0d1c4f` | Body copy (alias of `--brand-ink`) | 114/117 paragraph signature |
| `--ink-black` | `#000000` | Nav labels + much body/heading text | text 6915 — **#1 overall** (see §3.1 note) |
| `--text-subtle` | `#555555` | Muted secondary paragraphs | text 361 |
| `--text-muted` | `#7a84a3` | Slate meta / dates / inactive tabs | text 144 |
| `--surface` | `#ffffff` | Page + card canvas (body bg 116/117 pages) | bg 1412 |
| `--surface-alt` | `#f9f9f9` | Alternating section gray (**most-used bg**) | bg 1636 |
| `--border` | `#e5e7eb` | Hairline dividers, input borders | declared 116p |
| `--border-tint` | `#c5cde7` | Periwinkle border | (paired with tint-300) |

**Periwinkle tints** (the only non-blue accent; used for *surfaces* — bands, footer, shadows — never text or icons):

| Token | Hex | Role | Evidence |
|---|---|---|---|
| `--tint-50` | `#f3f5ff` | Faintest blue-white | bg 1 |
| `--tint-100` | `#edf1ff` | Flat hero tint (AgentCORE/CORESight heroes) | bg 7 |
| `--tint-200` | `#e7ebfb` | Section band / resource-hub top band | bg 26 |
| `--tint-300` | `#c5cde7` | **Footer bg + tinted-shadow color** | bg 232 |
| `--tint-400` | `#8c9ace` | Deeper tint fills / stat-collage tiles | bg 4 |

**Semantic** (invented — the current render has no live semantic system; only `--success` is declared and it's unused):

| Token | Hex | Note |
|---|---|---|
| `--success` | `#10b981` | Declared; keep as intent |
| `--error` | `#e5312a` (approx) | Only red observed = nav notification badge; formalize |
| `--warning` / `--info` | — | Define fresh for the port |

**Elevation shadows** (two families coexist — neutral black + a distinctive periwinkle-tinted one; keep the periwinkle, it's a signature):

| Token | Value | Use | Freq |
|---|---|---|---|
| `--shadow-1` | `0 0 10px rgba(0,0,0,.05)` | Ambient soft lift | 27 |
| `--shadow-soft` | `-4px 4px 6px rgba(0,0,0,.05), 4px 4px 6px rgba(0,0,0,.05), 0 6px 8px rgba(0,0,0,.04)` | Symmetric card on tinted bands | 348 |
| `--shadow-2` | `0 4px 16px rgba(0,0,0,.10)` | **Default card (workhorse)** | 373 |
| `--shadow-3` | `0 10px 20px rgba(0,0,0,.10)` | Hover / raised | 22 |
| `--shadow-icon` | `0 0 6px rgba(0,0,0,.2)` | Round carousel arrows / icon buttons | 70 |
| `--shadow-brand-sm` | `3px 2px 7px #c5cde7` | Subtle periwinkle lift | 116 |
| `--shadow-brand-lg` | `20px 20px 50px #c5cde7` | **Feature/hero card (signature "expensive" glow)** | 36 |

**Signature gradients** (screenshot-derived — *no* gradient string exists in any `design-data/*.json`, so these are pixel-sampled, not computed):

| Token | Value | Where |
|---|---|---|
| `--grad-hero` | `radial-gradient(ellipse at 35% 55%, #cdd4ea 0%, #e7ebfb 45%, #ffffff 85%)` | Edge / Enterprise-AI-Services hero glow |
| `--grad-button` | `linear-gradient(90deg, #5a5cc7 0%, #2731c1 100%)` | Home "CORESight Webinar" button — the one "premium" button on the site |
| `--surface-tint` (flat) | `#edf1ff` | AgentCORE / CORESight flat hero band (G2 — not a true gradient) |
| Navy stat staircase | solid blocks stepping `#19369d → #132976 → #0d1c4f` | Home stat collage (reads as a gradient but is stacked solids) |

**Note on `#000000` vs `#0d1c4f`:** pure black is the single most-used foreground (6,915 nodes) but the "official" paragraph color is navy `#0d1c4f`, and other blues appear as body fills with no clear rule — **same role, different hex per page**. Canonical choice for the port: **standardize body on `--brand-ink #0d1c4f`** and reserve pure black for very few cases.

### 3.2 Typography scale

**Font reality (read before porting):** the site is Helvetica Neue but ships **nine single-master `@font-face` families**; only `thin` (100), `light` (300), `regular` (400) actually load. The class names lie — `helvetica_neue_thin` carries computed weights of 400/500/600 all over the site, but because each family has one master, requesting a heavier weight mostly renders the same Thin glyphs (600+ triggers *faux* bold). **Ignore class names and `font-weight` numbers as truth. The site is visually a two-weight system: Thin (100) text, Light (300) headings.**

**As-built role scale** (what actually renders; CSS-weight = the misleading computed value; "renders as" = the real master). Colors are the dominant observed color for that role.

| Role | px | CSS weight | Renders as | Line-height | Tracking | Color | Where |
|---|---|---|---|---|---|---|---|
| Display / hero H1 | 65 | 500 | Thin 100 | 65 (**1.0**) | 1px | `#132976` | Home hero |
| Mega stat / special | 90 | — | Thin/Light | — | 1px | navy/white | Big numerals "100+ / $15B+" (16 nodes) |
| Interior H1 | 40 | 500 | Light 300 | 48 (1.2) | 1px | navy (transparent-fill) / `#000` | Most page H1s (48 nodes) |
| Section H2 | 40 | 500 | Light 300 | 48 (1.2) | 1px | `#000000` | "Our products", section heads (73 nodes) |
| Large title (alt) | 48 | — | Light 300 | ~1.2 | 1px | navy/black | Larger titles (28 nodes) |
| Subsection H2/H3 | 26 | 500/600 | Light 300 | 31.2 (1.2) | 1px | `#0d1c4f`/`#002d72` | Two-tone headings, "About the author" |
| Feature-card H3 | 20 | 600 | Thin (faux-bold) | 24 (1.2) | 1px | `#002d72` | "Plain-english data access" (68 nodes) |
| H5 / footer head | 22 | 500 | Light 300 | 26.4 (1.2) | 1px | `#132976` | Footer column heads (**115 nodes — very consistent**) |
| Body-large / subhead | 20 | 400 | Thin 100 | ~1.4–1.5 | 1px | `#0d1c4f`/slate | Hero sub-lines (2,323 nodes) |
| UI / nav / button | 18 | 400 | Thin 100 | 27 (1.5) | 1px | white/navy | Nav, most buttons (**4,450 — most common size**) |
| Body / paragraph | 17 | 400 | Thin 100 | 25.5 (**1.5**) | 1px | `#0d1c4f` | All article/section copy |
| Small / meta | 16 | 400 | Thin 100 | ~1.5 | 1px | `#555555`/navy | Card descriptions |
| Caption / fine | 15 | 400 | Thin 100 | ~1.5 | 1px | `#555555`/`#7a84a3` | Footer address, legal |
| Micro / legal | 14 | 400 | Thin 100 | ~1.5 | 1px | `#7a84a3`/`#555555` | Copyright, timestamps |

**Canonical rationalized scale for the port** (the as-built scale is noisy: 17/18/20 all do "body-ish" duty, 24/26/28/32 all do "H3-ish"). Collapse to a modular scale, base = 16px. Fix legibility: promote body to real 16px/400, introduce genuine weight contrast, drop the global 1px tracking (keep it only on eyebrow + display).

| Token | px | rem | Weight | Line-height | Tracking | Replaces |
|---|---|---|---|---|---|---|
| `text-display` | 72 | 4.5 | 200–300 | 1.02 | -0.01em | 65 / 90 |
| `text-h1` | 48 | 3.0 | 300 Light | 1.08 | -0.005em | 40 / 48 |
| `text-h2` | 36 | 2.25 | 300 Light | 1.15 | 0 | 32 / 40 |
| `text-h3` | 28 | 1.75 | 400 | 1.25 | 0 | 26 / 28 |
| `text-h4` | 22 | 1.375 | 500 | 1.3 | 0 | 22 / 24 |
| `text-h5` | 18 | 1.125 | 600 | 1.4 | 0.01em | 20 / 22 feature titles |
| `text-eyebrow` | 13 | 0.8125 | 600, **UPPERCASE** | 1.2 | 0.12em | *(new — the site has none)* |
| `text-body-lg` | 18 | 1.125 | 400 | 1.6 | 0 | 20 |
| `text-body` | 16 | 1.0 | 400 | 1.6 | 0 | 17 |
| `text-small` | 14 | 0.875 | 400 | 1.5 | 0 | 15 / 16 |
| `text-caption` | 12.5 | 0.78 | 500 | 1.4 | 0.01em | 14 |

**Signature type moves to preserve:** (a) **two-tone keyword headings** — base navy + emphasis words in `#19369d`/`#5368b5`, applied per-word via colored spans (elevate this into a real system, e.g. a navy→electric-blue gradient text-fill on the emphasized clause); (b) tight display leading (~1.0–1.15) vs loose body (~1.5–1.6); (c) no uppercase (the "all-caps" product names are image logos, not text).

### 3.3 Spacing scale (4px-based)

Absorbs every observed value (heading margins 1.6/4/10/20, gutters 12/24, section padding ~48–96). `space-3` (12) is the native half-gutter; `space-6` (24) is the native card gap. **Vertical rhythm lives on section wrappers, not on `.container` (its vertical padding is 0 everywhere) or on `<p>` (margin 0 everywhere).**

| Token | px | rem | Primary use |
|---|---|---|---|
| `space-1` | 4 | 0.25 | Tight heading margin (H3 = 4px) |
| `space-2` | 8 | 0.5 | title→excerpt micro-gap |
| `space-3` | 12 | 0.75 | **container pad / half-gutter**, H2 margin (~10) |
| `space-4` | 16 | 1 | image→title, feature-icon gap, mobile side pad |
| `space-5` | 20 | 1.25 | eyebrow margin (H5 = 20px), accordion pad |
| `space-6` | 24 | 1.5 | **card gap / full gutter**, card inner pad |
| `space-8` | 32 | 2 | card inner pad (large) |
| `space-12` | 48 | 3 | subtitle→content, mobile section pad |
| `space-16` | 64 | 4 | compact section pad |
| `space-20` | 80 | 5 | **default desktop section pad** |
| `space-24` | 96 | 6 | spacious desktop section pad |

### 3.4 Radius scale

**14 distinct radii** exist in the digest; 10px (1,069), 15px (899), 6px (514), 20px (495), **12px (293)** and 8px (292) dominate. Consolidated:

| Token | px | Use |
|---|---|---|
| `radius-sm` | 6 | buttons, inputs, chips (workhorse control radius, 514 uses) |
| `radius-md` | 8 | small cards, inputs |
| `radius-lg` | 10 | **default card / image** (most common) |
| `radius-xl` | 15 | large feature panels ("Key features") |
| `radius-2xl` | 20 | big media / section cards |
| `radius-3xl` | 24 | extra-large cards |
| `radius-pill` | 40 | pill buttons, category pills, active tabs |
| `radius-full` | 50% | avatars, round icon buttons, FABs, arrow controls, badge |
| `radius-bottom` | `0 0 10px 10px` | dropdown/mega-menu panels & image-topped cards (top square, bottom rounded — 362 uses) |

**Note on 12px (293 uses — nearly as frequent as 8px):** it isn't given its own token above; treat **8 / 10 / 12** as one interchangeable "card/input" radius band in the port (map 12px onto `radius-lg`).

**Critical:** buttons are **small-radius (6–8px), NOT pill.** The pill radius (20–40px) belongs to tabs/chips only. Do not globally round buttons.

### 3.5 Breakpoints & layout (Bootstrap 5)

| Name | Min | Container max | Notes |
|---|---|---|---|
| xs | 0 | 100% fluid | ~12–16px side pad, single column |
| sm | 576 | 540 | |
| md | 768 | 720 | |
| lg | 992 | 960 | **primary collapse point** — hamburger + grids un-stack here |
| xl | 1200 | 1140 | |
| xxl | 1400 | **1320** | width on the 1440px captures |

| Token | Value | Source |
|---|---|---|
| `--container-max` | 1320px | all 332 containers |
| `--container-pad-x` | 12px | half-gutter |
| `--grid-columns` | 12 | Bootstrap basis |
| `--grid-gutter` | 24px | full card-to-card gap (use 24, not 12) |
| `--section-pad-y` | 80px | desktop default (64 compact / 96 spacious) |
| `--section-pad-y-mob` | 48px | mobile |
| `--nav-collapse` | 992px | lg |

There is exactly **one** container width site-wide — no narrow reading measure. Long-form pages (blogs) reuse 1320px, making text lines uncomfortably wide; **add a `--container-narrow` (~720–760px) for prose in the redesign.**

---

## 4. Component library (condensed — full catalog in `04-components.md`)

34 reusable components. Global constants on nearly all of them: Helvetica Neue only, 1px letter-spacing, cards on the navy/periwinkle ramp, white/`#f9f9f9`/periwinkle section bands.

**Chrome (every page):**
- **Top nav** — sticky white bar ~88–90px, subtle bottom shadow. Left: dandelion logo. Center 6 items: `CoreOps.AI edge · About▾ · Products▾ · Services▾ · Resource hub · Contact us` (near-black `#000000` per §3.1, ~18px, 1px tracking; **no dropdown caret is actually rendered** — About/Products/Services still open mega-menus on hover). Right: notification bell + red "1" badge, then filled navy **"Enquire now"** button.
- **Mega-menus** — About/Services = simple link lists; **Products = rich grid** (title + one-line blurb + dandelion wordmark icon per product). White rounded panel, `radius-bottom`, card shadow.
- **Mobile nav** — verified on `mobile/home.png`: header order left→right is **logo · bell + red "1" badge · filled-navy "Enquire now" · hamburger** (three-line, far right). Logo + bell + "Enquire now" stay visible at all breakpoints; the 6 links collapse into the hamburger drawer (drawer contents not captured — assume the 6 top-level items with Products/Services submenus as expandable accordions).
- **Footer** — full-width **periwinkle `#c5cde7`** (not white). Brand col (logo, corporate address "INS 701, Urbtech Trade Centre, Block B, Sector 132, Noida, Uttar Pradesh 201304", single LinkedIn icon) + 4 link columns (Products / About / Services / Resource hub) + legal bar ("Copyright © 2026. All rights reserved." | "Privacy policy | Terms of service"). Column heads = the **H5 signature: display-navy `#132976`, 22px, Light (115 nodes — the most consistent heading on the site)**, NOT `#19369d`/`#0d1c4f`.
- **Floating actions** — fixed bottom-right stack of navy circular FABs (envelope + chat) with a periwinkle "Hi There!" tooltip bubble.

**Buttons & links:**
- **Primary** — filled `#19369d`/`#132976`, white label 17–18px, `radius-sm` (6–8px), pad ~14–18/28–34px. ("Request a demo", "Enquire now", "Send message"…)
- **Secondary** — outline, 1px navy border, navy label, same size/radius. Hero pair pattern: `[outline] [filled]`.
- **Icon-only square** — filled navy square, white glyph (CORESight hero download).
- **"Read more" mini-button** — small filled navy, bottom-right of resource cards, paired with a muted date bottom-left.
- **Text link + arrow / "View details"** — navy text (no button), `arw_rgt.png` inline arrow. (Note: product cards use "View details" text-link; resource cards use "Read more" filled button — same intent, different affordance.)

**Heroes & banners:** home hero (split, wireframe-brain right, gold award medallion "Best AI & Technology Startup of the Year 2026", **dual CTA = `[outline "Request a demo"] [gradient "CORESight Webinar"]`** — this is the one place the premium `--grad-button` renders); product hero (periwinkle-tint bg, product wordmark, two-tone H1, laptop video mockup right, `[outline][filled](+↓)`); dark navy inner-page banner (Contact/articles, faint constellation corner motif); diagonal-split promo/webinar band (dark photo left, speaker card + date/time pills right).

**Cards:** product card (dotted-ring line-icon + title + copy, `--shadow-soft`); blog/resource card (cover image → title → excerpt → date + Read more, `--shadow-2`); press-release variant (logo-on-`#f9f9f9` instead of photo — one component, `media` variant); testimonial/quote card (role/name + quote, no avatar); value/benefit card (tinted-gradient fill, sub-head + body pairs); feature block (line-icon + label + 2-line copy, in a 2-col grid inside a white→periwinkle gradient panel).

**Data & proof:** big-stat numerals (90px); stat collage (overlapping offset rectangles in graduated navy/periwinkle); bordered customer logo-wall grid; auto-scrolling partner logo marquee.

**Interaction:** numbered vertical tabs (active = navy-gradient pill + periwinkle-glow panel); horizontal scrollable tab bar (underline + chevrons) for hub listings; FAQ accordion (chevron flip, hairline dividers, in a rounded card next to a stock photo); **Slick carousel with circular arrow controls** (the dominant interaction pattern — `slick` icon font confirms it).

**Forms:** full contact form (2-col name/email, textarea, consent checkbox, "Send message"); inline 3-field lead form ("Get in touch with us" → "Connect with us"); careers application form (richest — adds phone, qualification, LinkedIn, skills, resume upload). Inputs: white, 1px `#e5e7eb` border, `radius-md`, required `*`.

**Misc furniture:** eyebrow (small navy text label) & chip (boxed pill); date/time info pills; gold award laurel badge (the only warm accent in the system); centered section header (title + muted subtitle, often two-tone accent).

**Gotchas:** three overlapping blue "primaries" (pick one canonical + two darker steps); two card-shadow families (consolidate to 2 levels + keep periwinkle); footer is periwinkle not white; resource cards have two media modes on one skeleton.

**Interaction states — NOT captured in the static full-page screenshots; you MUST author these for the React port.** The captured site renders resting states only, so nothing below is "wrong" in the doc, but a designer porting to React needs all of it:
- **Links (nav / footer / inline text-links):** define `:hover` (suggest underline or recolor to `--brand-primary #19369d`) and `:focus-visible` ring. No active/current-page indicator is rendered on nav today — add one.
- **Buttons (primary / secondary-outline / gradient):** need `:hover` (darken ~8% or lift to `--shadow-3`), `:active` press, `:focus-visible` (2px `--brand-primary` ring + 2px offset), and **disabled** (~40% opacity + `cursor:not-allowed`). The gradient `--grad-button` (hero "CORESight Webinar") has no captured hover.
- **Form inputs:** resting = white / 1px `#e5e7eb` / `radius-md` + required `*`. Author `:focus` (navy border + ring), **error/validation** (use `--error #e5312a` border + helper text), and success/consent-checked states — none exist in the capture.
- **Carousel (Slick) arrows:** circular navy w/ `--shadow-icon`; add `:hover` and a **disabled/greyed state at the track ends** (or confirm the loop wraps and never disables).
- **Tabs:** active is documented (vertical = navy-gradient pill; horizontal hub bar = underline + chevrons); add the inactive→hover transition. **Accordion:** open/closed = chevron flip + reveal (documented); formalize the height/opacity transition.
- **Cards:** no hover captured — §9 rec 11 proposes a hover lift to `--shadow-3`; decide and apply consistently.
- **Empty / loading / success states:** directory listings (resource-hub tab views) and all forms have no captured empty-result, loading, or thank-you/success states — design them. Note `/brochures` is a live tab that 404s, so its empty state is real work.

---

## 5. Layout & grid system

- **One Bootstrap 5 container, 1320px, 12px side padding**, 12-col grid, **24px gutter**. Inner content width 1296px. No narrow or wide variant. Desktop outer margin at 1440px = 60px each side (~72px to content).
- **Full-bleed band pattern:** section paints a 100vw background (navy / `#f9f9f9` / periwinkle / near-black promo), inner content stays in the 1320 container. Never let content hit the viewport edge except deliberately-bleeding hero imagery.
- **Column splits observed:** 50/50 media+text (heroes, alternating benefit blocks, bottom CTA); 3-up card grid (`col-lg-4`, the workhorse — cleanest reference: `resource-hub/blogs`); 2-up; 4-up logo grid; single wide feature panel (`col-12`); sidebar-tabs + panel (`col-4`+`col-8`). Card grids are frequently wrapped in a carousel sharing the same 3-up math.
- **Section rhythm (desktop, ±8px):** section pad ~72–96px; title→subtitle ~12–16px; subtitle→content ~40–48px; card inner pad ~24–32px; card gap ~24px. Mobile compresses section pad to ~40–56px, gaps to ~16–20px.
- **Responsive collapse at lg (992px):** horizontal nav → hamburger; 3-up grids → 1 column; 4-up logos → 2 columns; 50/50 heroes stack; feature/industry grids → single column; footer 4-col → 2-col with address on top. Headline sizes roughly **halve** (65→~34, 40→~26); body holds at 17px; 1px tracking never scales.
- **Color rhythm:** alternate **white / `#f9f9f9` / lavender `#e7ebfb`** to separate blocks; navy `#0d1c4f` for high-drama moments (webinar strip, article/contact mastheads, stat graphic); periwinkle `#c5cde7` for image panels + footer; `#19369d` as the single accent (filled buttons, active tabs, links). Dominant rhythm is simply **white ⇄ `#f9f9f9`**, with periwinkle and navy as punctuation.

---

## 6. Page templates & IA (condensed — full detail in `05-information-architecture.md`, `07-page-teardowns.md`)

**117 captured pages**, thin Next.js presentation over headless WordPress — **3,299 of 3,331 images are `backend.coreops.ai/wp-content/...`** (essentially all media is CMS-managed).

**Three page skeletons:**
1. **Marketing** (home, products, services, edge, careers, about): `sticky header → split hero → alternating content bands → social proof → FAQ → contact/CTA closer → periwinkle footer`.
2. **Directory** (resource-hub + category indexes): `header → centered lavender hero with tab/filter bar → 3-col card grid → "Ready to create your own success story?" CTA band → footer`.
3. **Article** (blogs, use-cases): `header → navy constellation masthead → 2-col (article body + Related-posts / "Interested?" sidebar) → footer`. No FAQ/CTA band.

**Templates (11):** T1 Home (bespoke, 16 sections) · **T2 Product ≈ T3 Service** (build as one parametric template — 10 pages) · T4 Positioning (`/coreops-ai-edge`) · T5 Company (about/careers) · T6 Contact (short) · T7 Hub landing · T8 Category listing (6–7) · **T9 Article/detail (87 pages — biggest reuse win)** · T10 Legal · T11 Utility.

**Reusable section blocks (the Lego set):** split hero · product/testimonial/blog card carousel · icon feature grid · tab-switcher + laptop mockup · stepped speech-bubble cards ("Breaking barriers…") · stat block · logo walls · coverflow/center-stage carousel · shared FAQ · contact/CTA closer · periwinkle footer. Build these first — they compose every page.

**IA cleanups for the port:** canonicalize product paths (Aithra works only at `/aithra`, COREHire only at `/products/corehire` — unify on `/products/[slug]`); collapse the `customer-success-story` singular alias; decide legacy `/press-release` vs the hub category; `/brochures` is a hub tab that 404s; `/mailer.html` is a static campaign page, not a Next route. De-duplicate carousel clones (testimonials/blogs repeat 2–3× in the DOM) at the data layer. Nav vs footer product-order mismatch — unify the source (WP menu/options).

---

## 7. Imagery & motifs (condensed — full detail in `06-imagery-brand.md`)

- **Iconography:** thin, single-weight navy **outline** line-icons (66×66), each a mini-scene. Borrowed from **IconPark outline**, recolored — filenames literally read `icon-park-outline_*`. Not custom. Exceptions to the line rule: solid-navy social badges and the solid-navy dandelion-people illustration.
- **Signature glyph:** a right-pointing chevron `>` (`arw_white.svg` 20×35 on dark; `arw_rgt.png` inline after "View details" — 812 such CTA nodes) + circular chevron carousel buttons.
- **Product wordmark device:** each product wordmark PNG (~420×102) replaces the **"O" in CORE with a dandelion seed-burst** ("AgentC✳RE", "C✳RESight"). The single most reusable brand device.
- **Illustration (three modes):** (A) the bespoke home hero **low-poly wireframe "brain"** in a dotted "digital fabric" of pale tech icons — the flagship "AI = neural network" statement; (B) **dandelion motifs** — favicon, and the About "dandelion effect" illustration where seeds are stylized human figures on a periwinkle radial glow (the conceptual keystone: dandelion = neural network = distributed AI); (C) **laptop/browser mockups** + one **animated square GIF loop per product** (216²–608², abstract blue motion, not literal dashboards).
- **Photography:** real company/founder photos (warm indoor, navy scrim on the About hero) + corporate stock (cooler, professional-with-device). Consistent rounded corners (10–20px), no heavy filters, people almost always present. Real-warm vs stock-cool clash is a flaw to unify.
- **Recurring motifs:** dandelion · neural/mesh networks · periwinkle gradient washes · solid navy blocks · rounded cards with **periwinkle glow shadow** · laptop mockups w/ play button · stepped speech-bubble callouts · gold award laurel (only warm accent) · floating FAB + notification bell · dotted world map with navy location pins · client (mono) + partner (color) logo walls.

---

## 8. Screenshot & artifact index (how Claude Design should use this folder)

All paths absolute under `/Users/harmohitsingh/Documents/coreops/projects/coreops-website/old-website-artifacts/`:

| Location | What's in it | How to use |
|---|---|---|
| `AGGREGATE-DIGEST.md` | Hard facts: hex colors + frequencies, CSS tokens, full type scale in px, weights, radii, shadows, container widths, per-heading signatures, button signatures, image hosts | **Ground truth for every number.** Start here. |
| `design-doc/DESIGN-SYSTEM.md` | This file — consolidated system + port tokens | The single reference; deep-dives below |
| `design-doc/01…07-*.md` | The seven dimension analyses (typography, color, layout, components, IA, imagery, page teardowns) | Open the matching file when you need full evidence/rationale for a decision |
| `manifest.json` / `urls.txt` | All 117 pages (url, slug, title, scrollHeight) + every URL | Route inventory for the React port |
| `screenshots/desktop/<slug>.png` | Full-page **desktop** capture (1440px wide) per page | **Look at these to see the real thing.** Read the PNG with an image tool. |
| `screenshots/mobile/<slug>.png` | Full-page **mobile** (iPhone 13) capture per page | Verify responsive collapse (§5) |
| `design-data/<slug>.json` | Per-page computed-style extract (headings, buttons, containers, colors, fonts, nav/footer links, images) | Exact computed values per page; `home.json` is the reference |
| `design-data/_aggregate.json` | Machine-readable digest | Programmatic token generation |
| `content/<slug>.txt` | Visible text per page | Copy, voice, section sequences |
| `assets/fonts/` | Full Helvetica Neue family (`.woff2/.woff/.ttf`): Thin/Light/Regular/Medium/MediumItalic/Bold/Black + italics; `slick` icon font | Only Thin/Light/Regular actually render today; you have the full family if you keep Helvetica Neue |
| `assets/images/coreops-logo.svg` | The logo lockup | Brand mark source |

**Best exemplar page per template:**

| Template | Read this screenshot |
|---|---|
| Home (T1) | `screenshots/desktop/home.png` |
| Product (T2) | `screenshots/desktop/products__coresight.png` or `products__agentcore.png` |
| Service (T3) | `screenshots/desktop/enterprise-ai-services.png` |
| Positioning (T4) | `screenshots/desktop/coreops-ai-edge.png` |
| Company (T5) | `screenshots/desktop/about.png`; careers `careers.png` |
| Contact (T6) | `screenshots/desktop/contact-us.png` |
| Hub landing (T7) | `screenshots/desktop/resource-hub.png` |
| Category listing (T8) | `screenshots/desktop/resource-hub__blogs.png` (cleanest 3-col grid) |
| Article/detail (T9) | `screenshots/desktop/resource-hub__blogs__the-making-of-coreops-ai.png` |

---

## 9. Recommendations for the NEW design language

**Directive: evolve, don't discard.** The navy authority + Helvetica heritage + dandelion metaphor are real equity. Keep them; modernize the mechanics, the accent, the rhythm, and the motion. 12 concrete, opinionated directives Claude Design can act on:

1. **Keep the navy-authority palette, but resolve it to a disciplined ramp.** Adopt §3.1: one action blue (`#19369d`), one display navy (`#132976`), one ink (`#0d1c4f`), two deep steps (`#002d72`/`#001858`). Stop using pure `#000000` for body — standardize on `--brand-ink #0d1c4f` so paragraphs keep the signature "blue" reading. Retire the dead declared tokens (`#1e40af`, `#1f2937`, unused `#10b981`).

2. **Add exactly one modern accent.** The system is monochrome-blue with zero live accent. Introduce a single vivid accent — an **electric cyan/teal (~`#00c2ff`)** — for micro-interactions, active states, focus rings, and data highlights. Do not add a second hue; the discipline is the brand.

3. **Elevate the two-tone keyword heading into a real system.** Today it's per-word colored spans reading as flat navy. Define it as a navy→electric-blue **gradient text-fill** applied consistently to the emphasized clause of each headline. This is the site's most distinctive existing type idea — make it intentional.

4. **Ship a real variable grotesque, keep the hairline *feeling*.** Replace nine one-off single-master files with one variable Helvetica-Neue-like face. Use **Light 300 for display, 400 for body, 600 for emphasis** — genuine weight contrast instead of size-only hierarchy. Keep the elegant thin display, but **promote body to 16px/400/lh1.6** (true Thin 100 at 15–18px is fragile on modern displays).

5. **Fix the tracking.** Drop the global 1px letter-spacing on body — it hurts legibility. Keep tracking only on the new **uppercase eyebrow (13px, +0.12em, 600, accent)** and lightly on display. The eyebrow is net-new (the site has none) and is the cheapest way to add editorial structure and a "fancier" feel.

6. **Adopt the §3.2 rationalized scale** (display 72 / h1 48 / h2 36 / h3 28 / h4 22 / h5 18 / body 16 / small 14 / caption 12.5) and retire the 17/23/25/28/32/35 duplicates.

7. **Install a better spacing rhythm.** Use the §3.3 4px scale with an explicit vertical-rhythm system on section wrappers (default 80px, compact 64, spacious 96). Add a **narrow reading container (~720px)** for article/legal prose — the current single 1320px measure makes body lines too wide.

8. **Consolidate radii and keep buttons rectangular.** Reduce to 6 (controls) / 10 (cards) / 15–20 (panels) / 40 (pills) / 50% (circles) + `radius-bottom` for dropdowns. Do **not** globally pill buttons — small radius is part of the enterprise-serious tone; pills belong to tabs/chips only.

9. **Keep the periwinkle glow shadow — make it the signature elevation.** Formalize a two-level neutral ramp (`--shadow-2` default, `--shadow-3` hover) plus the periwinkle `--shadow-brand-lg` (`20px 20px 50px #c5cde7`) reserved for feature/hero cards. Give the periwinkle tint scale defined roles (surface / band / footer / border / tinted-shadow) so elevation stays blue-cast.

10. **Build a real dark mode (greenfield — the site has none).** Anchor on the existing dark surfaces: base `#0d1c4f`/`#0a0a23`, elevated surfaces `#132976`, text `#ffffff` + `rgba(255,255,255,0.7)`, and **promote periwinkle (`#8c9ace`/`#c5cde7`) to the accent/link role** (navy can't sit on navy). The image-driven promo band `#0f1b20` is the natural reference tone. Theme-toggle both directions.

11. **Add a motion system.** The site is static today (aside from GIF loops + Slick). Define intentional motion: card hover lift (to `--shadow-3`), the two-tone/gradient headline reveal, an animated neural-mesh hero (unify seeds ⇄ nodes — dandelion = network), carousel easing, and eyebrow/section entrance. Replace the wildly-sized GIF product loops (216²–608²) with a coherent Lottie/SVG motion set.

12. **Modernize the brand assets without losing the metaphor.** Keep the dandelion mark, the two-tone `.ai` accent, and the "O = seed-burst" product-wordmark device. Redraw the mark in a **single color** (it's currently `#0D1C4F` + `#000000`, muddy when scaled). Replace the borrowed IconPark line-icons with a **custom thin-line navy icon set** on one grid (24/32) and one stroke weight. Rebuild product wordmarks + the client logo wall as **SVG** (currently resolution-limited PNG/JPG). Decide deliberately whether the gold award laurel — the lone warm accent — stays as an intentional highlight or is folded into the blue system.

---

### Appendix — conflicts reconciled in this document

- **Declared CSS tokens ≠ rendered site.** `--coreops-primary-dark`, `--coreops-text`, `--coreops-success` essentially never render. Canonical choice: the §3.1 rendered set.
- **Body color drift:** `#000000` (6,915) is most frequent but `#0d1c4f` is the "official" paragraph color. Canonical: `#0d1c4f`.
- **Three overlapping brand blues** (`#19369d` action / `#132976` display / `#0d1c4f` ink) used side-by-side. Kept as a 3-step ramp, not collapsed.
- **Font class names lie about weight;** six of nine faces never load. Canonical: a two-weight (Thin/Light) reading, ported as a real variable face with 300/400/600.
- **Two card-shadow families** (neutral black + periwinkle). Kept both, formalized into a 2-level neutral ramp + one reserved periwinkle glow.
- **Radius sprawl** (16 values). Consolidated to 6.
- **Gradients are screenshot-derived, not computed** (0 gradient strings in `design-data/`) — flagged as pixel-sampled.
- **Content/route bugs to carry forward:** `enterprise-ai-services` hero mislabeled "Enterprise application services"; Aithra/COREHire single-canonical-path issue; `/brochures` 404; home "Powering the future…" panel rendered empty (interactive graphic that didn't capture).
