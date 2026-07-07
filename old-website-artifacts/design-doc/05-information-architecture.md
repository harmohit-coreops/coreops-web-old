# 05 — Information Architecture, Navigation & Content

Scope: the full page inventory (117 captured URLs), how they group, the page templates, the primary nav / mega-menu and footer, the content model and editorial voice, and what all of this implies for the React + headless-WordPress port. Every count below is derived from `manifest.json` / `urls.txt`; every nav/footer claim is cross-checked against the `home.png`, `resource-hub.png`, and `sitemap.png` screenshots and `design-data/home.json` (`navLinks`).

Stack context (ground truth): Next.js front end, headless WordPress backend at `backend.coreops.ai`. **3,299 of 3,331 images are served from `backend.coreops.ai/wp-content/...`** — i.e. essentially all page media (product GIFs, blog thumbnails, team photos, logos, icons) is CMS-managed. This is the single most important fact for the port: the site is a thin Next.js presentation layer over a WordPress content model.

---

## 1. Full sitemap (all 117 captured pages)

Counts are of **captured** pages. HTTP status is from `manifest.json`; four routes returned **404 but rendered the home page** (Next.js soft-404) — flagged inline.

```
CoreOps.ai (117 pages)
│
├── Home ....................................................... 1
│     / ................................................. (home)
│
├── Products ................................................... 7 working (+2 broken routes)
│     Canonical product pages:
│     /products/agentcore ................................ 200
│     /products/coresight ................................ 200
│     /products/datacore ................................. 200
│     /products/coreserv ................................. 200
│     /products/coretrack ................................ 200
│     /products/corehire ................................. 200
│     /aithra ............................................ 200   ← Aithra's working URL is the ROOT one
│     Duplicate / broken product routes:
│     /corehire .......................................... 404  (soft-404 → renders home)
│     /products/aithra ................................... 404  (soft-404 → renders home)
│
├── Standalone / positioning page .............................. 1
│     /coreops-ai-edge ................................... 200
│
├── Services ................................................... 2
│     /enterprise-ai-services ............................ 200
│     /enterprise-application-services ................... 200
│
├── Company .................................................... 3
│     /about ............................................. 200
│     /careers ........................................... 200
│     /contact-us ........................................ 200
│
├── Resource Hub .............................................. 95 total
│     /resource-hub  (hub landing) ....................... 1
│     ├── ai-trends ...................................... 1 landing + 8 detail  = 9
│     ├── blogs .......................................... 1 landing + 14 detail = 15
│     ├── customer-success-stories ...................... 1 landing + 8 detail  = 9
│     ├── customer-success-story  (SINGULAR ALIAS) ...... 1  (duplicate of the plural landing, same title/height)
│     ├── events ......................................... 1 landing + 1 detail  = 2
│     ├── press-releases ................................. 1 landing + 44 detail = 45
│     └── use-cases ...................................... 1 landing + 12 detail = 13
│     (Brochures appears as a hub TAB but has no working page — /brochures = 404)
│
├── Legal ..................................................... 2
│     /privacy-policy .................................... 200
│     /terms-conditions .................................. 200
│
└── Utility / standalone ..................................... 4
      /sitemap ........................................... 200  (HTML sitemap page)
      /mailer.html ....................................... 200  ("2 Years of CoreOps.AI" milestone — static .html, NOT a Next route)
      /press-release  (SINGULAR) ......................... 200  (legacy press-coverage wall; scrollHeight 12,495 = tallest page on the site; distinct from /resource-hub/press-releases)
      /brochures ......................................... 404  (soft-404 → renders home; referenced by a hub tab)
```

### Section counts (quick reference)

| Section | Working pages | Notes |
|---|---|---|
| Home | 1 | |
| Products | 7 | 6 under `/products/*` + Aithra at root `/aithra` |
| Broken product routes | 2 | `/corehire`, `/products/aithra` (both 404→home) |
| Standalone positioning | 1 | `/coreops-ai-edge` |
| Services | 2 | |
| Company | 3 | about, careers, contact-us |
| Resource Hub (landings) | 1 hub + 6 category + 1 alias | `customer-success-story` duplicates `customer-success-stories` |
| Resource Hub (detail) | 87 | ai-trends 8, blogs 14, CSS 8, events 1, press-releases 44, use-cases 12 |
| Legal | 2 | privacy-policy, terms-conditions |
| Utility | 4 | sitemap, mailer.html, press-release(legacy), brochures(404) |
| **Total captured** | **117** | 113 real routes + 4 soft-404/duplicate captures |

### Cross-linking anomalies to carry into the port

1. **Aithra and COREHire are each reachable at only ONE of their two advertised URLs.** The brief expects both `/x` and `/products/x` to exist, but the crawl shows:
   - Aithra: `/aithra` = 200 ✅, `/products/aithra` = 404 ❌
   - COREHire: `/products/corehire` = 200 ✅, `/corehire` = 404 ❌
   The mega-menu links Aithra → `/aithra` and COREHire → `/products/corehire` (the working ones), so nav is fine, but stray inbound links to the other form dead-end. **Normalize to one canonical path per product in React.**
2. **`/resource-hub/customer-success-story` (singular)** is a same-content alias of the plural category landing. Collapse to one route (301).
3. **`/press-release` (singular)** is a large legacy WordPress press wall that predates and overlaps `/resource-hub/press-releases`. Decide whether to keep or fold into the hub.
4. **`/brochures`** is surfaced as a hub tab but 404s. Either build the page or drop the tab.
5. **`/mailer.html`** is a hand-built static HTML campaign page ("2 Years of CoreOps.AI"), linked from the About mega-menu as "2 year milestone." It is not a Next.js route and should be treated as a standalone static asset or rebuilt as a campaign route.

---

## 2. Page templates

Nine distinct templates cover the whole site. Detail templates are heavily reused (44 press releases share one shell, 12 use cases share one, etc.), which is exactly what makes this a good CMS-driven React port.

| # | Template | URLs (count) | Defining structure |
|---|---|---|---|
| **T1** | **Home** | `/` (1) | Long single-scroll marketing page (scrollHeight 10,394; 16 sections). Hero → product carousel → 3-dimensions accordion → stats band → capability logos → enterprise logo wall → partnerships wall → success-stories carousel → "What's new" news carousel → blog carousel → LinkedIn embed → FAQ → footer. |
| **T2** | **Product** | `/products/agentcore`, `/products/coresight`, `/products/datacore`, `/products/coreserv`, `/products/coretrack`, `/products/corehire`, `/aithra` (7) | Hero (product logo/GIF + tagline + 2 CTAs, sometimes a "Available on GeM" badge) → benefit narrative blocks → "Key features / For everyone in the team" grid → demo/"Experience effortless insights" band → "Customer spotlight" testimonial carousel → use-case carousel → "Related blogs" → FAQ → inline contact form → footer. |
| **T3** | **Service** | `/enterprise-ai-services`, `/enterprise-application-services` (2) | Near-identical to Product but service-framed: hero → "AI adoption made easy" benefit list → "Our repertoire of services" → key-features grid → industries grid (Manufacturing / Finance / Healthcare / Retail) → use-case carousel → "Our partners in growth" → FAQ → inline contact form → footer. **Treat T2 and T3 as one parametric template.** |
| **T4** | **Standalone positioning** | `/coreops-ai-edge` (1) | Product-like marketing page for the "CoreOps.AI edge" positioning; no `/products/` prefix. Reuses T2 building blocks. |
| **T5** | **Company / About** | `/about` (1), `/careers` (1) | Story + people template: hero → founders grid → leadership carousel → story/vision/mission → values carousel → leadership-attributes carousel → behaviors carousel → global-footprint → FAQ → footer. Careers is a lighter variant (roles/culture). |
| **T6** | **Contact** | `/contact-us` (1) | Short (scrollHeight 1,747). Contact form + corporate address + email; minimal sections. |
| **T7** | **Hub landing** | `/resource-hub` (1) | "Techtalks & trends" hero + "Request a demo" CTA → **tabbed category switcher** (Customer success stories / Use cases / Press releases / Brochures / … via chevrons) → 3-col card grid → "Ready to create your own success story?" CTA band → footer. |
| **T8** | **Category listing** | `/resource-hub/{ai-trends, blogs, customer-success-stories, events, press-releases, use-cases}` + the `customer-success-story` alias (7) | Category hero + intro → responsive card grid of that category's detail pages (title, thumbnail, excerpt, date, "Read more") → CTA band → footer. |
| **T9** | **Article / detail** | 87 pages across 6 categories | One shell, parameterized by category. Sub-variants below. |
| **T10** | **Legal** | `/privacy-policy`, `/terms-conditions` (2) | Narrow single-column long-form text; short (1,412 / 1,487 px). |
| **T11** | **Utility** | `/sitemap`, `/mailer.html`, `/press-release` (3) | One-offs: HTML sitemap, static campaign page, legacy press wall. Not a reusable template family. |

### T9 detail sub-variants (all share one route pattern, differ by content richness)

| Category | Count | Typical scrollHeight | Character |
|---|---|---|---|
| `press-releases/*` | 44 | ~2,335 (identical) | Thinnest, uniform shell — a publication title/logo + short blurb + outbound link to external coverage (CNBC, ET, YourStory, Inc42, …). Pure link-out cards. |
| `ai-trends/*` | 8 | ~2,413–2,467 | Short curated thought-leadership snippets, near-uniform. |
| `customer-success-stories/*` | 8 | ~2,383–2,627 | Case-study cards (challenge → solution → outcome), compact. |
| `events/*` | 1 | ~2,528 | Event recap. |
| `use-cases/*` | 12 | ~2,488–5,846 | Industry problem/solution write-ups, variable length. |
| `blogs/*` | 14 | ~2,712–6,043 | Full long-form articles, the richest T9 content. |

---

## 3. Primary navigation & footer

### 3.1 Top nav (from `home.png` / `resource-hub.png`, decoded via `navLinks`)

Left: dandelion logo + **coreops.ai** wordmark. Center: six items. Right: bell notification icon (with red unread badge) + **"Enquire now"** filled navy pill button.

```
[logo] coreops.ai      CoreOps.AI edge   About▾   Products▾   Services▾   Resource hub   Contact us      🔔①   [ Enquire now ]
```

| Nav item | Type | Target |
|---|---|---|
| CoreOps.AI edge | direct link | `/coreops-ai-edge` |
| About | **mega-menu** (`href="#"`) | see below |
| Products | **mega-menu** (`href="#"`) | see below |
| Services | **mega-menu** (`href="#"`) | see below |
| Resource hub | direct link | `/resource-hub` |
| Contact us | direct link | `/contact-us` |
| 🔔 (bell) | notification popover | announcements (uses `BellCoreops.gif`) |
| Enquire now | primary CTA button | contact/enquiry |

**About mega-menu**
- CoreOps.AI edge → `/coreops-ai-edge`
- Our story → `/about`
- Meet the team → `/about#team`
- Careers → `/careers`
- 2 year milestone → `/mailer.html`

**Products mega-menu** (each item has a one-line description — the flyout is descriptive, not a bare list)
- AgentCORE → `/products/agentcore` — "Empowers enterprises to build, train & deploy inte…"
- CORESight → `/products/coresight` — "With CORESight, you can ask complex business quest…"
- DataCORE → `/products/datacore` — "Harmonizes and cleanses data from all sources, pow…"
- COREHire → `/products/corehire` — "An advanced AI-driven recruitment platform designe…"
- COREServ → `/products/coreserv` — "A cloud-based, end-to-end service management platf…"
- CORETrack → `/products/coretrack` — "A Fiori-based, cloud-enabled solution that digitiz…"
- Aithra → `/aithra` — "Turn enterprise knowledge into instant intelligenc…"

**Services mega-menu**
- Enterprise application services → `/enterprise-application-services`
- Enterprise AI services → `/enterprise-ai-services`

Note the nav order and casing: sentence-case labels, and product order in the menu (AgentCORE, CORESight, DataCORE, COREHire, COREServ, CORETrack, Aithra) differs from the footer order (AgentCORE, DataCORE, CORESight, …) — a small inconsistency to normalize.

### 3.2 Persistent overlay elements (all pages)

- **Floating contact affordance**, bottom-right: a round "Contact Us" button (`FloatingCTA.png`, 73×73) plus an **email icon** and a **chat widget** showing a "Hi There!" bubble (visible in `resource-hub.png` and `sitemap.png`).
- These are global, not per-template.

### 3.3 Footer (identical across all pages; from `home.png`, `resource-hub.png`, `sitemap.png`, and every `content/*.txt` tail)

Periwinkle background (`#c5cde7`-family), five columns:

| Col 1 (brand) | Products | About | Services | Resource hub |
|---|---|---|---|---|
| Logo + wordmark | AgentCORE | Careers | Enterprise AI services | AI trends |
| Corporate Address: INS 701, Urbtech Trade Centre, Block B, Sector 132, Noida, Uttar Pradesh 201304 | DataCORE | Contact us | Enterprise application services | Press releases |
| LinkedIn icon | CORESight | | | Events |
| | COREHire | | | Blogs |
| | COREServ | | | Customer success stories |
| | CORETrack | | | Use cases |
| | Aithra | | | |

Bottom bar: `Copyright © 2026. All rights reserved.` (left) · `Privacy policy | Terms of service` (right).

Footer coverage gaps vs. sitemap: the footer omits **CoreOps.AI edge**, **Our story/About landing**, **2 year milestone**, and the legacy **Press Release** page — these live only in the top nav and/or the `/sitemap` page. The dedicated **`/sitemap`** page (T-utility) is the most complete link index: it adds a "Quick Links" column (Home, CoreOps.AI Edge, Resource Hub, Contact Us, Privacy Policy, Terms of Service, Press Release) plus Products / About (Our story, Meet the team, Careers, 2 year milestone) / Services / Resource Hub columns.

---

## 4. Content model & editorial voice

### 4.1 Recurring content blocks (the reusable "sections" library)

Roughly a dozen block types compose every page. Building these as React components covers the whole site:

| Block | Where it appears | Notes |
|---|---|---|
| **Hero** | every template | Headline + subhead + 1–2 CTAs; product heroes add a logo/GIF and occasionally a badge ("Available on Government e-Marketplace (GeM)"). |
| **Stats band** | Home, About | Big number + `+`/`$`/`B+` suffix + label (100+ projects, $15B+ leadership, 55+ tech resources, 40 EA certs, 30+ ERP/CRM projects, 20+ agent use cases; 60+ team; 100+ countries). |
| **Testimonial carousel** | Home ("Success stories"), Products ("Customer spotlight") | Role-anonymized quotes ("MD at one of the world's top exhibition organizations", "CFO of a leading CDMO…"); one named exception: Sonal Kapur Sinha, Esme Consumer. Content is **repeated 2–3× in the DOM** (carousel clones) — dedupe in the React data layer. |
| **Logo wall** | Home | Two walls: "Trusted by modern enterprises" (customer logos) and "Partnerships & alliances" (Google Cloud, HPE, Salesforce, AWS, Oracle, NVIDIA, Azure, EDB — each repeated for the marquee loop). |
| **Feature grid** | Products, Services | "Key features / For everyone in the team" — icon + title + one-liner. |
| **Industries grid** | Services | Manufacturing / Finance / Healthcare / Retail & E-commerce. |
| **Card carousel/grid** | Home, Hub, Category, Product | Blog cards, use-case cards, success-story cards (thumbnail + title + excerpt + date + "Read more"). |
| **"What's new" news band** | Home | Award/press highlights with images. |
| **FAQ accordion** | Home, every Product, every Service, About | 4–6 Q&A; expandable. Ubiquitous — a required component. |
| **Inline contact form** | Products, Services, Contact | "Get in touch with us": Full name · Company email · Message · "Connect with us". |
| **CTA band** | Hub, Products, Services | Full-width prompt + button ("Ready to create your own success story?", "Experience effortless insights", "Your conversational AI is a click away"). |
| **Values/attributes/behaviors carousels** | About only | Card carousels (with DOM-cloned repeats). |

### 4.2 Typical section sequence per template

- **Product (T2):** Hero → Benefit narrative ×2–3 → "Breaking barriers…" problem framing → Key features grid → Demo band → Customer spotlight → Use cases → Related blogs → FAQ → Contact form.
- **Service (T3):** Hero → "AI adoption made easy" benefits → Repertoire of services → Key features → Industries grid → Use cases → Partners → FAQ → Contact form.
- **Home (T1):** Hero → Products carousel → 3 core dimensions → Stats → Capability/partner logos → Success stories → What's new → Blogs → LinkedIn → FAQ.
- **About (T5):** Hero → Founders → Leadership → Story (Vision/Mission/Dandelion) → Values → Leadership attributes → Behaviors → Global footprint → FAQ.
- **Hub/Category (T7/T8):** Hero + demo CTA → tabs/card grid → CTA band.

### 4.3 Voice & tone

- **Audience:** enterprise buyers — CXO/CIO/CTO. Confident, benefit-led, lightly technical. Heavy vocabulary of "agentic AI," "AI operating system for enterprises," "modernization," "seamless integration," "data-driven decision-making," "co-pilot," "self-serve AI data expert."
- **Proof by numbers:** claims are quantified everywhere — "2X faster," "modernization by 50%," "cutting costs by 25%," "100+ projects," "$15B+," "60+ member team," "100+ countries." A rebrand should preserve this metric-forward credibility pattern.
- **Brand metaphor:** the dandelion logo → the "dandelion effect" (resilient, adaptable, effortlessly scalable; "seeds change wherever it lands; quiet, powerful, built for impact"). This is the emotional throughline of About and the blog voice.
- **Headings:** sentence case, not title case ("Our products," "Success stories," "What's new," "Frequently asked questions"). Product names are stylized caps (AgentCORE, CORESight, DataCORE, COREHire, COREServ, CORETrack; Aithra is title case).
- **Testimonials:** anonymized-by-role for confidentiality, which reads as enterprise-discreet.
- **Inconsistency to clean up in the port:** mixed British/Indian and American spelling within the same corpus — "optimisation/optimise/organisation" vs "optimization/organization"; also a visible typo ("takinh ownership" on `/about`). Establish one spelling standard and proofread on migration.

### 4.4 CTA / conversion patterns

- **Primary CTA:** "Request a demo" (filled navy button) — hero of Home, Hub, Products, Services.
- **Header CTA:** "Enquire now" (persistent, filled navy pill).
- **Secondary CTAs:** "Explore CORESight," "Know more" (product cards), "View details," "Read more" (article cards), "Contact us."
- **Always-on capture:** floating Contact/email/chat widget (bottom-right) on every page; inline contact form near the footer of every product/service page; email `marketing@coreops.ai` surfaced in hero and FAQ.
- **Notification bell:** header announcement channel (new awards/press) — a light engagement/retention device rather than lead capture.

---

## 5. Notes for the React port

### 5.1 Routing structure

```
/                                         → Home (T1)
/about, /careers, /contact-us             → Company (T5), Contact (T6)
/coreops-ai-edge                          → Positioning (T4)
/enterprise-ai-services                   → Service (T3)
/enterprise-application-services          → Service (T3)
/products/[slug]                          → Product (T2)   slug ∈ {agentcore,coresight,datacore,coreserv,coretrack,corehire}
/aithra                                    → Product (T2)   ← reconcile: make this /products/aithra OR keep root, but pick ONE canonical
/resource-hub                             → Hub landing (T7)
/resource-hub/[category]                  → Category listing (T8)   category ∈ {ai-trends,blogs,customer-success-stories,events,press-releases,use-cases}
/resource-hub/[category]/[slug]           → Article/detail (T9)
/privacy-policy, /terms-conditions        → Legal (T10)
/sitemap                                   → Utility (T11)
```

- **Two dynamic segments** carry the bulk of the site: `/products/[slug]` (7 pages) and `/resource-hub/[category]/[slug]` (87 pages). Everything else is a static route.
- **Canonicalize the product path scheme.** Today Aithra lives at root and COREHire only under `/products/`; unify on `/products/[slug]` and 301 the strays (`/corehire`, `/aithra` legacy form, `/products/aithra`).
- **Collapse the singular alias** `/resource-hub/customer-success-story` → `/resource-hub/customer-success-stories` (301).
- **Decide on legacy `/press-release`** (singular, WordPress press wall) vs the hub's `press-releases` category — ideally fold into one.
- **`/brochures`**: build the page (there's a hub tab for it) or remove the tab. Currently 404.
- **`/mailer.html`**: a static campaign artifact ("2 Years of CoreOps.AI"); either serve as a static asset or rebuild as a `/milestone`-style campaign route. It is not a Next.js route today.

### 5.2 Templates to build (priority order)

1. **T2/T3 Product+Service** (one parametric marketing template) — 10 pages depend on it (7 products + 2 services + edge).
2. **T9 Article/detail** (category-parameterized) — 87 pages; biggest reuse win.
3. **T8 Category listing** — 6–7 pages.
4. **T1 Home** — bespoke but built from the shared block library.
5. **T5 Company / T6 Contact / T7 Hub landing** — a few pages each.
6. **T10 Legal / T11 Utility** — trivial.

Build the **shared block library first** (Hero, StatsBand, TestimonialCarousel, LogoWall, FeatureGrid, IndustriesGrid, CardGrid/Carousel, FaqAccordion, ContactForm, CtaBand, GlobalHeader w/ mega-menus, GlobalFooter, FloatingContactWidget). These compose every template.

### 5.3 Dynamic vs static & CMS coupling

- **Dynamic (WordPress-sourced):** every Resource Hub detail and listing (blogs, use-cases, press-releases, success-stories, ai-trends, events), plus the product/service page bodies and the About team roster — all pull copy and media from `backend.coreops.ai` (WP REST/GraphQL). 99% of images already resolve to `backend.coreops.ai/wp-content/uploads/...`. Model these as WP custom post types: `product`, `use_case`, `success_story`, `press_release`, `ai_trend`, `event`, `post` (blog), plus a `team_member` type and a reusable `testimonial`/`faq` block.
- **Largely static:** Home layout scaffold, legal pages, `/sitemap`, `/mailer.html`. (Home's cards/testimonials are still CMS-fed data even though the layout is fixed.)
- **Rendering:** the detail/listing pages are ideal for **SSG/ISR** (`generateStaticParams` over the WP slug lists + revalidation), since content changes are editorial, not per-request. Product/service/home can be ISR too.
- **De-duplicate carousels at the data layer:** the captured DOM repeats testimonial/blog/value cards 2–3× (marquee/carousel clones). Fetch each collection once and let the carousel component handle looping — don't persist the duplication.
- **Global nav/footer are content, not code:** mega-menu product descriptions and footer link sets should come from a WP menu/options source so marketing can edit them without a deploy. The current top-nav vs footer product-order mismatch is a symptom of these being maintained separately — unify the source.

---

### Appendix — evidence trail
- Page inventory & statuses: `manifest.json`, `urls.txt` (117 entries; four 404 soft-renders noted).
- Nav decoding: `design-data/home.json` → `navLinks` (23 entries reconstruct the three mega-menus + direct links); footer confirmed visually (`footerLinks` was empty in the JSON extract).
- Screenshots read: `screenshots/desktop/home.png`, `screenshots/desktop/resource-hub.png` (tabs + footer), `screenshots/desktop/sitemap.png` (fullest link index).
- Voice/section sequences: `content/home.txt`, `content/products__coresight.txt`, `content/about.txt`, `content/enterprise-ai-services.txt`.
- Image host dominance: `AGGREGATE-DIGEST.md` → `backend.coreops.ai` 3,299 imgs vs `www.coreops.ai` 28.
