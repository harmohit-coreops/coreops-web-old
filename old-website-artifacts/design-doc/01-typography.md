# CoreOps.ai — Design Reference 01: TYPOGRAPHY

Evidence base: `AGGREGATE-DIGEST.md` (computed styles across 117 pages), `design-data/home.json`,
`design-data/resource-hub__blogs__the-making-of-coreops-ai.json`, the font files in `assets/fonts/`,
and direct inspection of the desktop screenshots for `home`, `products/coresight`,
`enterprise-ai-services`, the blog `the-making-of-coreops-ai`, and `about`.

Every px / weight / color below traces to one of those sources. Where a claim comes from looking at a
screenshot rather than the computed-style dump it is marked *(screenshot)*.

---

## TL;DR — the typographic identity in one paragraph

The entire site is set in **Helvetica Neue** and, in practice, uses only **two of the nine loaded
faces**: **Thin (weight 100)** for almost all running text (10,830 text nodes) and **Light (weight
300)** for headings (2,268 nodes). Medium, Bold, Black and the italics are declared via `@font-face`
but effectively never render (`status: "unloaded"`). The result is a deliberately **hairline, airy,
low-contrast** look: thin strokes, generous line-height on body (1.5), tight leading on the big hero
(1.0), **~1px letter-spacing applied to virtually every element**, **no uppercase anywhere**
(`text-transform: none` on 100% of captured signatures), and a **navy-on-white** palette where even the
body copy is dark navy rather than gray. Headings frequently use a **two-tone keyword highlight** —
base words in dark navy, emphasis words in a brighter blue.

---

## 1. Font families, files, and the misleading class names

### 1a. The actual font files present (`assets/fonts/`)

Each face ships as `.woff2` + `.woff` + `.ttf` (hashed filenames). Mapping file → real design weight:

| Font file (base name) | Real family / weight | Style |
|---|---|---|
| `HelveticaNeue-Thin.*` | Helvetica Neue **Thin — 100** | normal |
| `HelveticaNeue-Light.*` | Helvetica Neue **Light — 300** | normal |
| `helvetica-neue-regular-webfont.*` | Helvetica Neue **Regular — 400** (separate, older webfont build) | normal |
| `HelveticaNeue-Medium.*` | Helvetica Neue **Medium — 500** | normal |
| `HelveticaNeue-MediumItalic.*` | Helvetica Neue **Medium — 500** | italic |
| `HelveticaNeue-Bold.*` | Helvetica Neue **Bold — 700** | normal |
| `HelveticaNeue-Black.*` | Helvetica Neue **Black — 900** | normal |
| `HelveticaNeue-Italic.*` | Helvetica Neue **Regular — 400** | italic |
| `slick.{woff,ttf}` | `slick` **icon font** (carousel arrows/dots) — not text | — |

### 1b. How those files are wired to CSS `@font-face` families

The stylesheet declares nine families, each pinned to a single face:

| CSS `font-family` name | Bound weight/style | Runtime load status | Text-node usage (all pages) |
|---|---|---|---|
| `helvetica_neue_thin` | 100 normal | **loaded** | **10,830** (the workhorse) |
| `helvetica_neue_light` | 300 normal | **loaded** | **2,268** |
| `helvetica_neue_regular` | 400 normal | loaded | 44 |
| `helvetica_neue_medium` | 500 normal | unloaded | 0 (declared, unused) |
| `helvetica_neue_medium_italic` | 500 italic | unloaded | 0 |
| `helvetica_neue_bold` | 700 normal | unloaded | 0 |
| `helvetica_neue_black` | 900 normal | unloaded | 0 |
| `helvetica_neue_italic` | 400 italic | unloaded | 0 |
| `slick` | 400 normal | unloaded | icon font |
| `Arial` / `Times` | system fallback | — | 2 / 1 (stray nodes) |

### 1c. THE MISLEADING PART (read carefully before porting)

Two things break the naive reading of the markup:

1. **Class name ≠ weight.** The class `helvetica_neue_thin` carries computed `font-weight` values of
   **400, 500, and 600** all over the site (e.g. paragraphs are `helvetica_neue_thin | w400`; feature-card
   H3s are `helvetica_neue_thin | w600`). The number in the class is the *family name*, not the rendered
   weight.

2. **The requested `font-weight` mostly does NOT change the glyphs.** Because each `@font-face` family
   contains exactly **one** face, the browser has no bolder master to switch to. Requesting weight 400 or
   500 against `helvetica_neue_thin` (which only has the w100 master) simply renders the **Thin** master.
   Weight 600+ against a thin master is the only case that triggers *synthetic* (faux) bold. Net effect:
   nearly all "thin" text renders as **true Helvetica Neue Thin**, which is exactly the fragile, hairline
   look visible in the screenshots.

**Practical takeaway for the React port:** ignore the class names and the `font-weight` numbers as a
source of truth. The site is, visually, a **two-weight system — Thin (100) for text, Light (300) for
headings.** Reproduce that with real weight tokens, and (recommended) *bump body up to Light 300* for
legibility, since true Thin 100 at 15–18px is uncomfortably fragile on modern displays.

---

## 2. The type scale

### 2a. Raw font-size inventory (computed, by frequency — `AGGREGATE-DIGEST.md`)

`18px` (4,450) ≫ `20px` (2,323) > `16px` (1,618) > `17px` (1,535) > `15px` (1,156) > `22px` (527) >
`14px` (523) > `26px` (365) > `40px` (303) > `23px` (77) > `32px` (45) > `48px` (28) > `28px` (21) >
`24px` (17) > `35px` (4) > `65px` (7) > `90px` (16).

So the middle of the page is dominated by **18 / 20 / 16 / 17 / 15px**, and the display tier is a small
number of **40 / 48 / 65 / 90px** moments.

### 2b. Role-based scale (derived from the per-heading signatures + screenshots)

CSS-weight column = the (misleading) computed `font-weight`; "Renders as" = the real master used.
Line-height and letter-spacing are computed values. Colors are the dominant observed color for that role.

| Role | px | rem (16 base) | CSS weight | Renders as | Line-height | Letter-spacing | Color(s) | Where seen |
|---|---|---|---|---|---|---|---|---|
| **Display / Hero H1** | 65 | 4.06 | 500 | Thin 100 | 65px (**1.0**) | 1px (~0.015em) | `#132976` navy | Home hero "Empowering enterprises through data and AI" *(screenshot)* |
| **Mega stat / special** | 90 | 5.63 | — | Thin/Light | — | 1px | navy / white | Occasional oversized stat or hero (16 nodes) |
| **H1 (interior pages)** | 40 | 2.50 | 500 | Light 300 | 48px (1.2) | 1px | gradient-filled (computed `#fff a0`) → renders **navy**; sometimes `#000` | Blog H1 "The making of CoreOps.AI"; most page H1s |
| **Section header H2** | 40 | 2.50 | 500 | Light 300 | 48px (1.2) | 1px | `#000000`; some transparent-fill | "Our products", "Partnerships & alliances", "Frequently asked questions" *(screenshot)* |
| **Large heading (alt)** | 48 | 3.00 | — | Light 300 | ~1.2 | 1px | navy / black | Larger page titles (28 nodes) |
| **Subsection H2/H3** | 26 | 1.63 | 500 / 600 | Light 300 (or faux-bold Thin at 600) | 31.2px (1.2) | 1px | `#0d1c4f` / `#002d72` | "About the author"; "Interested in CoreOps.AI?"; two-tone headings |
| **Heading H3 (alt)** | 32 | 2.00 | 500 / 600 | Light / Thin | 38.4px (1.2) | 1px | `#000` / `#0d1c4f` | Occasional (45 nodes) |
| **H4 / person name** | 24–28 | 1.50–1.75 | 500 | Light 300 | 30–33.6px (1.2) | 1px | `#000000` (names), `#0d1c4f` | "Ankur Sharma" author/team names |
| **Feature-card title H3** | 20 | 1.25 | 600 | Thin (faux-bold) | 24px (1.2) | 1px | `#002d72` navy | "Plain-english data access", "Instant query generation" (CoreSight/Enterprise cards) |
| **H5 / footer & label head** | 22 | 1.375 | 500 | Light 300 | 26.4px (1.2) | 1px | `#132976` navy | Footer column heads ("Products", "About", "Services", "Resource hub"); 115 nodes — very consistent |
| **Body-large / hero subhead** | 20 | 1.25 | 400 | Thin 100 | ~1.4–1.5 | 1px | `#0d1c4f` / slate | Hero sub-line "Modernize systems, automate operations…"; large intros |
| **UI / nav / button / default** | 18 | 1.125 | 400 | Thin 100 | 27px (1.5) | 1px | `#fff` (nav on dark), navy | Top-nav links, most buttons, many labels — **single most common size** |
| **Body / paragraph** | 17 | 1.06 | 400 | Thin 100 | 25.5px (**1.5**) | 1px | `#0d1c4f` navy — but **`#000000` is the most frequent text color site-wide** | All article/section body copy |
| **Small body / meta** | 16 | 1.00 | 400 | Thin 100 | ~1.5 | 1px | `#555555` / navy | Card descriptions, "Published on : … | Read time : …" |
| **Caption / fine print** | 15 | 0.94 | 400 | Thin 100 | ~1.5 | 1px | `#555555` / `#7a84a3` | Footer address, sub-descriptions, legal |
| **Micro / legal** | 14 | 0.875 | 400 | Thin 100 | ~1.5 | 1px | `#7a84a3` slate / `#555555` | Copyright, timestamps, tiny labels |

Notes on colors: text-color frequency site-wide is `#000000` (6,915) ≫ `#0d1c4f` (2,046) > `#132976`
(1,065) > `#ffffff` (827) > `#001858` (812) > `#002d72` (499) > `#555555` (361) > `#7a84a3` (144) >
`#19369d` (104). Body copy is therefore **inconsistently pure-black or deep-navy** depending on the page
(the blog renders body as navy `#0d1c4f`; CoreSight body renders as near-black *(screenshot)*). Muted /
secondary text is mid-gray `#555555` or slate `#7a84a3`.

### 2c. A clean, rationalized scale for the React / Tailwind port

The original scale is noisy (17/18/20 all doing "body-ish" duty; 24/26/28/32 all doing "H3-ish" duty).
Collapse it to a modular scale, keep the navy palette and the airy feel, but fix legibility. Base = 16px.

| Token | px | rem | Suggested weight | Line-height | Tracking | Replaces original |
|---|---|---|---|---|---|---|
| `text-display` | 72 | 4.5 | 200–300 (Thin/Light) | 1.02 | -0.01em | 65 / 90 hero |
| `text-h1` | 48 | 3.0 | 300 Light | 1.08 | -0.005em | 40 / 48 |
| `text-h2` | 36 | 2.25 | 300 Light | 1.15 | 0 | 32 / 40 |
| `text-h3` | 28 | 1.75 | 400 Regular | 1.25 | 0 | 26 / 28 |
| `text-h4` | 22 | 1.375 | 500 Medium | 1.3 | 0 | 22 / 24 |
| `text-h5` | 18 | 1.125 | 600 Semibold | 1.4 | 0.01em | 20 / 22 feature titles |
| `text-eyebrow` | 13 | 0.8125 | 600, **UPPERCASE**, +0.12em | 1.2 | 0.12em | (new — see §4) |
| `text-body-lg` | 18 | 1.125 | 400 | 1.6 | 0 | 20 |
| `text-body` | 16 | 1.0 | 400 | 1.6 | 0 | 17 |
| `text-small` | 14 | 0.875 | 400 | 1.5 | 0 | 15 / 16 |
| `text-caption` | 12.5 | 0.78 | 500 | 1.4 | 0.01em | 14 |

Rationale: promote body to a real 16px/400 (from a 17px Thin), keep the light display tier for brand
continuity, and reserve genuine weight contrast (400→600) for hierarchy instead of relying on size + color
alone. Drop the global 1px letter-spacing (see §4) and re-introduce tracking only on the eyebrow and
display roles.

---

## 3. Body text, links, and lists

### 3a. Paragraph (the canonical body style)

Computed on every page (114 nodes):

```
font-family: helvetica_neue_thin;   /* renders Helvetica Neue Thin 100 */
font-size:   17px;                  /* 1.0625rem */
font-weight: 400;                   /* no effect — single-master family */
line-height: 25.5px;                /* 1.5 */
letter-spacing: 1px;                /* ~0.059em at this size */
color:       #0d1c4f;               /* deep navy (some pages render body #000000) */
text-transform: none;
margin: 0;                          /* vertical rhythm comes from wrapper padding, not p-margins */
```

Paragraph spacing is handled by container padding and empty gaps rather than `margin` on `<p>` — the
sampled paragraphs report `margin: 0`, and the blog shows clear inter-paragraph gaps created by the
layout, not typographic margins *(screenshot)*.

### 3b. Links

- **Nav links:** `helvetica_neue_thin | 18px | w400 | lh27px | ls1px`, white on the dark header, no
  underline; sentence case ("CoreOps.AI edge", "About", "Products", "Services", "Resource hub",
  "Contact us").
- **In-body links:** render in a **brighter blue** than the surrounding navy body — approximately
  `#19369d` (the `--coreops-primary`), **no underline** in the default state. In the blog, inline links
  "CoreOps.AI", "marketing@coreops.ai", and "www.coreops.ai" all appear as un-underlined bright-blue
  runs inside black/navy body copy *(screenshot)*.
- **Text CTAs ("View details"):** styled like body — `helvetica_neue_thin | 17px | w400 | #0d1c4f`,
  transparent background — i.e. a link, not a filled button.

### 3c. Lists

From the blog article *(screenshot)*: unordered lists use a **small solid round bullet**, hanging
outside the text block, with list items set in the **same 17px body style** and comfortable leading.
No custom markers, counters, or icons on standard prose lists. (Elsewhere, "feature" lists are rebuilt
as icon + heading + paragraph cards rather than true `<ul>`s — e.g. the CoreSight "Key features" grid.)

### 3d. Secondary / muted text

Section sub-descriptions (the gray line under a centered section header, e.g. "Strategic alliances that
accelerate innovation, ensure scalability, and power enterprise-grade AI delivery.") render in **mid-gray
`#555555`**, one step lighter than the navy body *(screenshot)*. Metadata ("Published on : 23/06/2025 |
Read time : 3 minutes") is ~16px gray.

---

## 4. Notable type patterns

1. **~1px letter-spacing is applied to essentially everything.** Every single captured signature —
   H1 through H6, paragraph, button, nav link — carries `letter-spacing: 1px`. Relative to size this
   is heavy on small text (**~0.06em at 17px**) and subtle on display (**~0.015em at 65px**). It is a
   core part of the "airy / engineered" feel but hurts readability at body sizes and should be dropped
   or made size-relative in the port.

2. **Two-weight, hairline identity.** As established in §1, the site lives on **Thin (100)** + **Light
   (300)** only. There is almost no weight contrast; hierarchy is carried by **size + color**, not
   boldness. Display headings (65px hero, 40px section heads) are conspicuously thin and elegant, and
   the hero uses **line-height 1.0** for a tight, poster-like block *(screenshot: "Empowering
   enterprises through data and AI")*.

3. **Two-tone keyword headings (a signature move).** Headings routinely split into a **dark-navy base**
   (`#001858` / `#0d1c4f`) with **emphasis words in a brighter blue** (~`#19369d` / `#5368b5`). Verified
   examples *(screenshot, CoreSight)*:
   - "Benefits for enterprise **customers**"
   - "Built on generative AI for **seamless** integration and **usability**"
   - "Your self-serve AI data **expert**"
   The highlight is applied per-word via colored `<span>`s, not a gradient. This is the closest thing the
   site has to an accent/brand flourish in type and is worth preserving (and elevating) in the new design.

4. **Gradient / transparent-fill H1s.** Several interior H1s report a computed color of
   `rgba(255,255,255,0)` (fully transparent) while rendering as solid navy — a tell-tale of
   `background-clip: text` gradient text fill (e.g. the blog H1). The visible result is subtle (reads as
   flat navy), so the gradient is currently under-exploited.

5. **No uppercase, ever.** `text-transform: none` on 100% of captured signatures. Product names that look
   like all-caps (AgentCORE, CORESight, DataCORE, COREHire, COREServ, CORETrack, Aithra) are **image
   logos**, not styled text. There are **no all-caps eyebrows/labels** — small labels like "Key features"
   are just small sentence-case navy text above a larger heading. (The modern scale in §2c *adds* an
   uppercase eyebrow token as a deliberate new device.)

6. **Tight display leading, loose body leading.** Hero 65px @ lh 1.0; section heads 40px @ lh 1.2; body
   17px @ lh 1.5. Consistent and worth keeping as a ratio (display ≈ 1.0–1.15, body ≈ 1.5–1.6).

---

## 5. Observations, inconsistencies, and how to modernize

### Inconsistencies / smells found
- **Class names lie about weight** (see §1c) — a maintenance hazard. Nine `@font-face` families, each a
  single master, driven by arbitrary `font-weight` values that mostly do nothing (and occasionally
  trigger faux-bold at 600). Six of the nine faces never load.
- **Body color is not fixed:** most text is pure `#000000` (6,915 nodes), but the "official" paragraph
  color is navy `#0d1c4f`, and other blues (`#001858`, `#002d72`, `#132976`, `#19369d`) all appear as
  body/heading fills with no clear rule. Same visual role, different hex per page.
- **Overlapping sizes for one role:** 17/18/20 all serve as "body/large-body"; 24/26/28/32 all serve as
  "sub-heading." No disciplined modular scale.
- **`17px` body @ Thin 100 with 1px tracking** is the weakest legibility choice on the site — thin
  strokes, non-standard size, extra tracking, sometimes low-contrast navy-on-white.
- **Odd values** like `15.2px`, `19.8px`, and `0px` font-sizes (74 nodes) indicate transform-scaled or
  icon-only elements leaking into the type system.

### How to modernize the typography (for the new design language)
1. **Keep the brand cue, fix the mechanics.** Retain the elegant thin/light Helvetica-Neue *feeling* for
   display, but ship a real **variable** grotesque (e.g. a Helvetica-Neue-like variable face, or a modern
   substitute) so weight is a continuous axis instead of nine one-off files. Use **Light 300 for display,
   400 for body, 600 for emphasis** — genuine weight contrast, not size-only hierarchy.
2. **Promote body to 16px / 400 / lh 1.6**, dark navy `#0d1c4f` or ink `#111`, and **drop the global 1px
   letter-spacing** on body (keep tracking only on the eyebrow and display tiers). This alone
   dramatically improves readability while staying on-brand.
3. **Adopt the clean scale in §2c** (display 72 / h1 48 / h2 36 / h3 28 / h4 22 / h5 18 / body 16 / small
   14 / caption 12.5) as design tokens; retire 17/23/25/28/32/35 duplicates.
4. **Elevate the two-tone keyword heading** into a real system: define one accent blue (e.g.
   `#19369d`) or a navy→electric-blue **gradient text-fill** used consistently on the emphasized clause of
   each headline. This is the site's most distinctive existing type idea — make it intentional.
5. **Introduce a proper uppercase eyebrow/label** (13px, +0.12em, weight 600, accent color) to open
   sections — the current design has none, and it is the cheapest way to add structure and a "fancier"
   editorial feel.
6. **Standardize a single ink color for body** and a single muted color (`#555555`/slate) for secondary
   text, instead of the current black-vs-navy-vs-multiple-blues drift.
