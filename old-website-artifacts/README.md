# CoreOps.ai — Old Website Capture & Design Reference

A complete, offline capture of the **current** [coreops.ai](https://www.coreops.ai) marketing site, plus a reverse-engineered design system. This folder exists so **Claude Design (claude.ai/design)** can ingest the whole existing website, understand its design language, and use it as the basis for a new, fancier design language and a **React port**.

> **Start here → [`design-doc/DESIGN-SYSTEM.md`](design-doc/DESIGN-SYSTEM.md)** — the single authoritative reference (tokens, type scale, components, templates, evolution directives). Everything else is supporting evidence.

Captured **2026-07-06** from `https://www.coreops.ai`. Site is a **Next.js front end over headless WordPress** (`backend.coreops.ai`), on an unmodified **Bootstrap 5** grid.

---

## What was captured

| # | Artifact | Count |
|---|----------|-------|
| **117** | Pages crawled (every page — see note below) | 117 |
| **117** | Full-page **desktop** screenshots (1440px) | `screenshots/desktop/` |
| **117** | Full-page **mobile** screenshots (iPhone 13) | `screenshots/mobile/` |
| **117** | Raw rendered **HTML** | `html/` |
| **117** | Visible **page text** | `content/` |
| **117** | Per-page **computed-style JSON** (fonts, colors, spacing, nav/footer links, images) | `design-data/` |
| **26** | Font files — the full **Helvetica Neue** family (woff2/woff/ttf) + `slick` icon font | `assets/fonts/` |
| — | Logo SVG + favicon | `assets/images/` |
| **8** | Design analysis documents | `design-doc/` |

### "Every page" — how completeness was guaranteed
The two XML sitemaps list **113** URLs. A **link-discovery BFS crawl** (following every internal link on every page) found **4 additional orphan pages the sitemaps omit**, for **117 total**:
`/mailer.html` · `/products/aithra` · `/products/corehire` · `/resource-hub/customer-success-story`

Full inventory: [`urls.txt`](urls.txt) · [`manifest.json`](manifest.json) (url, slug, title, scroll height per page).

---

## Folder map

```
old-website-artifacts/
├── README.md                    ← you are here
├── DESIGN-SYSTEM.md is in design-doc/  ← THE reference doc
│
├── design-doc/                  ← the design system (READ THESE)
│   ├── DESIGN-SYSTEM.md         ← master, consolidated, canonical
│   ├── 01-typography.md         ← fonts, type scale, weights, tracking
│   ├── 02-color.md              ← palette, gradients, tokens, dark-mode notes
│   ├── 03-layout-spacing.md     ← grid, spacing scale, radii, responsive
│   ├── 04-components.md         ← 34-component catalog w/ anatomy + states
│   ├── 05-information-architecture.md  ← full sitemap, page templates, voice
│   ├── 06-imagery-brand.md      ← logo, icons, illustration, motifs
│   └── 07-page-teardowns.md     ← section-by-section anatomy of key pages
│
├── AGGREGATE-DIGEST.md          ← HARD FACTS: exact hex + frequencies, type
│                                   scale in px, tokens, radii, shadows, grid
│
├── screenshots/
│   ├── desktop/<slug>.png       ← 1440px full-page
│   └── mobile/<slug>.png        ← iPhone 13 full-page
├── html/<slug>.html             ← raw rendered DOM
├── content/<slug>.txt           ← visible text (copy / voice)
├── design-data/
│   ├── <slug>.json              ← per-page computed styles
│   └── _aggregate.json          ← machine-readable digest
├── assets/
│   ├── fonts/                   ← full Helvetica Neue family
│   └── images/                  ← logo.svg, favicon.png, arw_white.svg
└── scripts/                     ← the Playwright crawler + aggregator (reproducible)
    ├── crawl.mjs
    └── aggregate.mjs
```

`<slug>` = URL path with `/` → `__` (e.g. `https://www.coreops.ai/resource-hub/blogs/the-making-of-coreops-ai` → `resource-hub__blogs__the-making-of-coreops-ai`). Home = `home`.

---

## The design language in 60 seconds

*(Full detail + tokens in [`design-doc/DESIGN-SYSTEM.md`](design-doc/DESIGN-SYSTEM.md).)*

- **Navy is the brand — a *family* of blues, not one.** Action `#19369D`, display navy `#132976`, body-ink navy `#0D1C4F`, deep navy `#001858`/`#002D72`. Even paragraph text is navy, so every page reads "blue."
- **Hairline Helvetica Neue**, effectively a **two-weight system** (Thin 100 body / Light 300 headings). Hierarchy comes from **size + color, not boldness**. **~1px letter-spacing on nearly every text node** — the single most defining tic.
- **Card-heavy + carousel-driven** (Slick, circular arrow controls), on a **1320px** Bootstrap container.
- **Periwinkle surfaces + a periwinkle-tinted shadow** (`#c5cde7`) that floats cards on a blue cushion — a cheap, genuine signature. Section rhythm alternates white / `#f9f9f9` / periwinkle, with solid navy blocks for drama.
- **The dandelion** — one brand symbol (mark, favicon, "seeds = neural network" illustration, and the seed-burst replacing the "O" in every product wordmark).
- **Sentence case, no uppercase, no bold**; headings use a **two-tone keyword highlight** (base navy + emphasis words in brighter blue).
- ⚠️ **Declared CSS tokens ≠ what renders.** The stylesheet ships a generic 6-token starter (`--coreops-primary` etc.) that mostly doesn't describe the real site. `DESIGN-SYSTEM.md §3` is the reconciled ground-truth token set.

---

## Page inventory (117)

| Section | Pages | Examples |
|---|---|---|
| **Home** | 1 | `/` |
| **Products** | 7 | `/products/{agentcore,coresight,datacore,coreserv,coretrack}`, `/products/aithra`, `/products/corehire` |
| **Standalone product pages** | 2 | `/aithra`, `/corehire` *(duplicate canonical paths — unify on port)* |
| **Positioning** | 1 | `/coreops-ai-edge` |
| **Services** | 2 | `/enterprise-ai-services`, `/enterprise-application-services` |
| **Company** | 3 | `/about`, `/careers`, `/contact-us` |
| **Resource Hub — landing + categories** | 7 | `/resource-hub` + `/resource-hub/{use-cases,ai-trends,press-releases,events,blogs,customer-success-stories}` |
| **Resource Hub — detail pages** | 87 | 12 use-cases · 8 AI-trends · 44 press-releases · 1 event · 14 blogs · 8 success-stories |
| **Utility / legal** | 6 | `/brochures`*, `/press-release`, `/sitemap`, `/privacy-policy`, `/terms-conditions`, `/mailer.html` |
| **Alias** | 1 | `/resource-hub/customer-success-story` (singular) |

\* `/brochures` is a live hub tab that currently 404s.

**Best exemplar per template** (open the desktop screenshot):

| Template | Screenshot |
|---|---|
| Home | `screenshots/desktop/home.png` |
| Product | `screenshots/desktop/products__coresight.png` |
| Service | `screenshots/desktop/enterprise-ai-services.png` |
| Positioning | `screenshots/desktop/coreops-ai-edge.png` |
| Company | `screenshots/desktop/about.png` |
| Contact | `screenshots/desktop/contact-us.png` |
| Hub landing | `screenshots/desktop/resource-hub.png` |
| Category listing | `screenshots/desktop/resource-hub__blogs.png` |
| Article / detail | `screenshots/desktop/resource-hub__blogs__the-making-of-coreops-ai.png` |

---

## How to use this for the redesign / React port

1. **Read [`design-doc/DESIGN-SYSTEM.md`](design-doc/DESIGN-SYSTEM.md) end-to-end.** §3 (tokens) is drop-in for CSS variables / a Tailwind config; §9 lists 12 concrete evolution directives.
2. **Look at the screenshots** to see the real thing — the design docs cite specific `screenshots/desktop/*.png` for every claim.
3. **Trust the numbers in [`AGGREGATE-DIGEST.md`](AGGREGATE-DIGEST.md)** (computed across all 117 pages) over anything inferred.
4. **Build the shared "Lego set" first** (see §6): split hero · card carousel · icon feature grid · tab-switcher + laptop mockup · stat block · logo walls · FAQ · CTA closer · periwinkle footer. Then the 11 templates — note **T2 Product ≈ T3 Service** (one parametric template, 10 pages) and **T9 Article/detail** covers 87 pages (the biggest reuse win).
5. **Evolve, don't discard:** keep navy authority + Helvetica heritage + the dandelion metaphor; modernize the accent (add one electric-blue), the type mechanics (real variable weights, promote body to 16px, drop global tracking), the spacing rhythm (add a ~720px reading measure), motion, and a **real dark mode** (the current site has none).

---

## Reproducing / refreshing the capture

```bash
cd scripts
npm install playwright@1.61.1 && npx playwright install chromium
node crawl.mjs full      # crawl every page → screenshots, html, content, design-data, fonts
node aggregate.mjs       # rebuild AGGREGATE-DIGEST.md + design-data/_aggregate.json
```

The crawler re-derives the URL universe from the sitemaps **and** a link-discovery BFS, so re-running picks up new/changed pages automatically.
