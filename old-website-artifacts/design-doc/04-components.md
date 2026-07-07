# CoreOps.ai — Component Inventory

Evidence-based catalog of reusable UI components on coreops.ai. Every number is cross-referenced to `AGGREGATE-DIGEST.md` / `design-data/home.json` or to a desktop/mobile screenshot that was inspected directly. Where a value is inferred visually (not in the extract), it is flagged **(visual est.)**.

**Global constants that apply to almost every component below:**
- Font: Helvetica Neue family only. Class names are misleading — `helvetica_neue_thin` renders at weight 400–600, `helvetica_neue_light` at 300–500. Headings are visually *light/thin*, not bold.
- **Letter-spacing: 1px on virtually every text node** (headings, body, buttons, nav). This is the single most defining tic of the brand and must be ported.
- Grid: `.container` max-width **1320px**, 12px left/right padding (Bootstrap-style). 12px gutters.
- Body background `#ffffff`; alternating section background `#f9f9f9`; "feature" / hero-tint sections use periwinkle `#edf1ff` / `#e7ebfb`; dark sections use navy `#132976` / `#0d1c4f` / `#001858`.
- Everything sits on a blue-navy ramp: `#19369d` (primary token), `#132976`, `#0d1c4f`, `#001858`, `#002d72`, muted slate `#7a84a3`, periwinkle `#c5cde7`.

---

## Summary component list

| # | Component | Primary locations |
|---|-----------|-------------------|
| 1 | Top navigation bar | Every page (sticky, white) |
| 2 | Mega-menu dropdowns (About / Products / Services) | Nav |
| 3 | Notification bell + badge | Nav (right cluster) |
| 4 | Mobile nav / hamburger | All pages (mobile) |
| 5 | Primary button (filled navy) | Everywhere — "Request a demo", "Enquire now", "Send message" |
| 6 | Secondary button (outline) | Product heroes — "Explore AgentCORE / CORESight" |
| 7 | Icon-only square button | CORESight hero (download), pagination arrows |
| 8 | "Read more" mini-button | Blog / resource / press cards |
| 9 | Text link + arrow / "View details" | Product cards, inline links |
| 10 | Homepage hero (split, image-right) | home |
| 11 | Product hero (tinted, laptop mockup) | AgentCORE, CORESight, product pages |
| 12 | Inner-page banner (dark navy) | Contact us, listing pages |
| 13 | Promo / webinar band (diagonal split, dark) | home |
| 14 | Product card (icon + title + copy) | home "Our products" carousel |
| 15 | Blog / resource card (image + title + date + Read more) | home Blogs, Resource hub, Blogs listing |
| 16 | Press-release card (logo-in-box variant) | Press releases |
| 17 | Testimonial / quote card | home Success stories, Careers "Voices" |
| 18 | Value / benefit card (heading + sub-links) | Careers culture section |
| 19 | Feature block (icon + label + copy) | Product "Key features" grid |
| 20 | Stat / metric elements (giant numerals + overlap panel) | home stats |
| 21 | Logo-wall grid (customers) | home "Trusted by modern enterprises" |
| 22 | Logo strip (partners) | home "Partnerships & alliances" |
| 23 | Vertical tabs (numbered) | home "Enabling organizational efficiencies" |
| 24 | Horizontal tab bar (underline + chevrons) | Resource hub listings |
| 25 | Accordion / FAQ | home FAQ, contact-related |
| 26 | Carousel / slick slider + round arrow controls | products, success stories, what's new, blogs, voices |
| 27 | Full contact form | Contact us |
| 28 | Inline "Get in touch" mini-form | Product page bottom |
| 29 | Award badge (hero medallion) | home hero |
| 30 | Eyebrow / pill label | webinar band, "Key features" eyebrows |
| 31 | Date / time info pills | webinar band |
| 32 | Section header (centered title + subtitle) | most sections |
| 33 | Footer (5-col + brand + legal bar) | every page |
| 34 | Floating CTA + chat widget (stacked circles) | every page, bottom-right |

---

## 1. Top navigation bar

- **Where:** every page, pinned to top, full-width white bar (~88px tall, **visual est.**), subtle bottom drop-shadow separating it from the page.
- **Anatomy (left→right):**
  1. **Logo** — dandelion "seed-head" glyph + wordmark. `coreops` in near-black `#000000`, `.ai` in blue `#19369d`. Source `logo.svg`, rendered ~171×67 (see `home.json` images).
  2. **Center menu** (6 items, in order): `CoreOps.AI edge` · `About` ▾ · `Products` ▾ · `Services` ▾ · `Resource hub` · `Contact us`. Items 2–4 open mega-menus (§2).
  3. **Right cluster:** notification bell w/ red count badge (§3), then **"Enquire now"** primary button.
- **Visual style:**
  - Menu labels: Helvetica Neue ~17–18px, weight 400, letter-spacing 1px, color navy `#0d1c4f`.
  - "Enquire now" button: filled navy `#19369d`/`#132976`, white text, radius ~6–8px, horizontal padding ~24px **(visual est.)**.
- **States:** hover on menu items (color shift toward `#19369d`) and caret rotation on dropdown open (not captured; infer). Active/scrolled state keeps white bg.
- **React note:** build as `<Header>` with a `navItems` config where 3 entries carry a `megaMenu` payload. Keep the bar sticky; retain the 1px letter-spacing on labels. Bell and CTA are always-visible even on mobile (see §4).

## 2. Mega-menu dropdowns

- **Where:** triggered by `About`, `Products`, `Services` in the nav. (Open state not in screenshots; structure reconstructed from `home.json → navLinks`.)
- **Anatomy / contents:**
  - **About:** `CoreOps.AI edge` (/coreops-ai-edge), `Our story` (/about), `Meet the team` (/about#team), `Careers` (/careers), `2 year milestone` (/mailer.html).
  - **Products:** 7 entries, each a **title + one-line description** (rich menu). AgentCORE ("Empowers enterprises to build, train & deploy inte…"), CORESight ("With CORESight, you can ask complex business quest…"), DataCORE, COREHire, COREServ, CORETrack, Aithra. Product marks are dandelion-lockup images (`agentcore-header-1.png`, `Frame-39833.png`, etc., ~420×102).
  - **Services:** `Enterprise application services`, `Enterprise AI services`.
- **Visual style:** white panel, rounded, drop-shadow (use card shadow `rgba(0,0,0,0.1) 0 4px 16px`); the `0px 0px 10px 10px` radius token (362 occurrences) is consistent with panels that round only their bottom corners hanging off the bar.
- **React note:** `<MegaMenu>` with two layouts — a **simple link list** (About, Services) and a **product grid with title+blurb+icon** (Products). Descriptions are truncated (`…`) at the source.

## 3. Notification bell + badge

- **Where:** nav right cluster, before "Enquire now".
- **Anatomy:** animated bell (`BellCoreops.gif`, 40×40) + circular red badge with white "1".
- **Style:** navy bell, red badge `#e-red` **(visual est.)**, badge is a `50%`-radius circle.
- **React note:** `<IconButton>` with a numeric `<Badge>`. Bell is a GIF today — replace with an SVG + optional pulse animation.

## 4. Mobile nav / hamburger

- **Where:** all pages < ~1024px. See `screenshots/mobile/home.png` top.
- **Anatomy:** logo left; on the right, the **notification bell**, the **"Enquire now"** filled navy button (kept visible even on mobile), then a **hamburger** (3 solid black bars).
- **Style:** white bar; hamburger is plain black rules (no border). "Enquire now" stays navy filled with white text, radius ~8px.
- **States:** tapping hamburger opens a full drawer (panel not captured — reconstruct from nav items + mega-menus as an accordion drawer).
- **React note:** collapse the 6 center links into a slide-in `<Drawer>`; keep bell + "Enquire now" in the top bar at all breakpoints.

## 5. Primary button (filled navy)

- **Where:** ubiquitous — "Request a demo", "Enquire now", "Register now", "Send message", "Connect with us", "Get in touch".
- **Anatomy:** solid rectangle, centered label, no icon (most instances).
- **Visual style:**
  - Fill navy `#19369d` → `#132976` (darker instances read `#0d1c4f`).
  - Label: Helvetica Neue 17–18px, weight 400, **white**, letter-spacing 1px.
  - Radius ~6–8px (matches digest `6px`/`8px` clusters). Padding ≈ 14–18px V / 28–34px H **(visual est.)**.
- **States:** hover darken (infer). No visible disabled state.
- **React note:** `<Button variant="primary">`. Radius is small (6–8px), *not* pill — do not over-round.

## 6. Secondary button (outline)

- **Where:** product heroes — "Explore AgentCORE", "Explore CORESight". Sits left of the primary "Request a demo".
- **Anatomy:** transparent fill, thin navy border, navy label.
- **Style:** 1px border navy `#19369d`; text navy; same size/radius as primary (~6–8px).
- **React note:** `<Button variant="outline">`. Pair pattern: `[outline] [primary]` side-by-side in heroes.

## 7. Icon-only square button

- **Where:** CORESight hero (a small navy square with a **download ↓** glyph after the two text buttons); also the round arrow controls are a cousin (see §26).
- **Style:** filled navy square, white icon, radius ~6–8px, roughly button-height square (~56px) **(visual est.)**.
- **React note:** `<IconButton variant="primary" square>`.

## 8. "Read more" mini-button

- **Where:** blog / resource / press-release cards (home Blogs, Resource hub, Blogs listing, Press releases).
- **Anatomy:** small filled navy pill-rect anchored **bottom-right** of the card, with the publish **date** bottom-left.
- **Style:** fill dark navy `#132976`/`#0d1c4f`, white label ~15–16px, radius ~6px, compact padding.
- **React note:** `<Card.Action>` — a size-`sm` primary button; always paired with a muted date on the same row.

## 9. Text link + arrow / "View details"

- **Where:** product cards on home ("View details" — from `home.json → buttons`, repeated 8×), inline hero links ("Available on Government e-Marketplace (GeM).", underlined).
- **Style:** navy `#0d1c4f` text, 17px, weight 400, letter-spacing 1px; arrow glyphs use `arw_rgt.png` / white arrow `arw_white.svg` (20×35) on dark. Inline links are underlined.
- **React note:** `<TextLink withArrow>`; arrow asset swaps white on dark backgrounds.

## 10. Homepage hero (split, image-right)

- **Where:** `home` top (§ hero crop). ~800px tall.
- **Anatomy:** left column — H1, sub-paragraph, **award medallion** (§29), then `[outline "Request a demo"] [filled "CORESight Webinar"]`; right column — large decorative "AI brain" wireframe illustration bleeding to the edge.
- **Visual style:**
  - H1 "Empowering enterprises through data and AI": Helvetica Neue thin, **65px / lh 65px**, weight 500, letter-spacing 1px, color `#132976` (per `home.json`). Note: interior-page H1s drop to 40px/lh48 (digest H1 signatures).
  - Sub-paragraph: 17px, lh 25.5px, `#0d1c4f`.
  - Background: white, no tint.
- **React note:** `<Hero variant="home">` — asymmetric 2-col, decorative SVG on the right, dual-CTA row. The two hero CTAs differ from the product pattern (here it's outline + filled *promo* button, not outline + demo).

## 11. Product hero (tinted, laptop mockup)

- **Where:** AgentCORE, CORESight (and other product pages).
- **Anatomy:** left — **product lockup logo** (dandelion replaces an "O"), H1 tagline, paragraph, underlined "Available on GeM" link, `[outline "Explore X"] [filled "Request a demo"] (+ optional ↓ icon button)`; right — **laptop mockup** framing an autoplaying product video (`0:00 / 2:19`, mute + fullscreen chrome visible).
- **Visual style:**
  - Section background: soft periwinkle `#edf1ff`/`#e7ebfb` (full-bleed tint).
  - H1 "Integrated all-in-one platform for MLOps": ~48px light navy, letter-spacing 1px; note the tagline mixes two weights/colors (darker navy + lighter blue on the last word) — a recurring **two-tone heading** device seen across product/section titles.
- **React note:** `<Hero variant="product">` with a `<LaptopMockup>` media slot. The two-tone heading (last words in lighter `#19369d`) is a reusable `<Heading accent>` treatment.

## 12. Inner-page banner (dark navy)

- **Where:** Contact us (and other utility pages).
- **Anatomy:** full-width dark navy block; large white page title left; faint constellation/network line-art top-right.
- **Style:** background `#001858`/`#0d1c4f`; title white, ~48–65px light, letter-spacing 1px; block ~360px tall **(visual est.)**.
- **React note:** `<PageBanner tone="dark">` with optional decorative corner graphic.

## 13. Promo / webinar band (diagonal split)

- **Where:** `home`, directly under hero.
- **Anatomy:** dark photographic panel on the **left half** cut by a **diagonal edge**, white panel right. Left: eyebrow pill "CORESight **Webinar**", 2-line white headline "From data overload to instant intelligence", supporting line, filled "Register now" button. Right: speaker portrait + name/title block ("Ankur Sharma, Co-founder & CTO"), bio, and two info pills (date, time — §31).
- **Style:** dark navy/photo bg; white type; the diagonal mask is the signature. Eyebrow pill = white rounded chip with navy text.
- **React note:** `<PromoBand>` with a `clip-path` diagonal; slots for eyebrow, headline, CTA, and a speaker card.

## 14. Product card (icon + title + copy)

- **Where:** home "Our products" carousel (AgentCORE / CORESight / DataCORE… 3 visible, arrow-paged).
- **Anatomy:** white rounded card → circular **dotted-ring icon** (line icon centered), product **title** (navy, ~26px light), 3–4 lines of centered body copy. (Underlying "View details" link exists per data.)
- **Visual style:**
  - Card: white, radius ~15–20px, soft shadow (`rgba(0,0,0,0.05) -4px 4px 6px, 4px 4px 6px, 0 6px 8px` — the 3-way soft shadow, 348 occ.).
  - Title `#002d72`/`#0d1c4f`; body `#0d1c4f` 17px.
  - Icons are thin navy line-art inside a dotted circle.
- **React note:** `<ProductCard>` in a `<Carousel>`; center-aligned content, dotted-ring icon wrapper.

## 15. Blog / resource card (image + title + date + Read more)

- **Where:** home "Blogs", Resource hub grid, Blogs listing.
- **Anatomy (top→bottom):** **cover image** (rounded top corners) → **title** (navy link color, 2-line clamp with `…`) → **excerpt** (1–2 lines) → footer row: **date** (muted, left) + **"Read more"** navy button (right).
- **Visual style:**
  - Card: white, radius ~12–15px, shadow `rgba(0,0,0,0.1) 0 4px 16px` (373 occ.).
  - Title: `#19369d`/`#5368b5` link-navy, ~20px.
  - Excerpt: `#0d1c4f`/`#555555` 16–17px.
  - Date: `#7a84a3` muted, ~15px.
- **States:** hover lift (infer). Titles truncate at source.
- **React note:** `<ResourceCard>` with `image | title | excerpt | {date, readMore}`; 3-up grid on desktop, 1-up mobile.

## 16. Press-release card (logo-in-box variant)

- **Where:** Press releases listing.
- **Anatomy:** identical skeleton to §15 but the media area is a **light-gray box (`#f9f9f9`) with a centered publication logo** (CNBC TV18, StartupNews, The SaaS News, CiOL…) shown `object-fit: contain`, instead of a bleed photo.
- **React note:** same `<ResourceCard>` with a `media="logo"` mode (padded, contained, gray backdrop).

## 17. Testimonial / quote card

- **Where:** home "Success stories" (3-up carousel) and Careers "Voices of CoreOps.AI".
- **Anatomy:** white card → **role/name heading** (e.g. "CFO of a leading CDMO…" or "Himani Rana") → **quote body** in quotation marks. No avatar. Tall cards, generous inner padding.
- **Visual style:** white card, radius ~15–24px, soft shadow; heading navy ~24–26px light; quote `#0d1c4f` 17px. On Careers, cards sit on a periwinkle `#e7ebfb` section band.
- **React note:** `<TestimonialCard>`; carousel on both pages; variable height handled by slick.

## 18. Value / benefit card (heading + sub-links)

- **Where:** Careers "A culture of integrity and growth" (3-up: Diversity/equity, Work-life balance, Learning and growth).
- **Anatomy:** card → **card title** (navy) → repeated pairs of **blue sub-heading** (link-blue `#19369d`) + **description paragraph**.
- **Visual style:** card has a faint periwinkle→white **gradient fill** and rounded corners (~15–20px) with a soft shadow; sub-headings in `#19369d`, body in `#0d1c4f`.
- **React note:** `<ValueCard>` taking a list of `{subhead, body}`; the tinted-gradient card face is reused here and in the product "Key features" wrapper (§19).

## 19. Feature block (icon + label + copy)

- **Where:** product "Key features" section (AgentCORE, CORESight) — a large rounded gradient card containing a **2-column grid** of feature blocks. Section eyebrow "Key features" + big two-tone title "For everyone in the team".
- **Anatomy per block:** thin navy **line icon** → **label** (navy ~20–22px) → 2-line description.
- **Visual style:** wrapper card is white→periwinkle gradient, radius ~20–24px; icons navy line-art; labels `#0d1c4f`.
- **React note:** `<FeatureGrid>` (2-col desktop) of `<FeatureItem icon label copy />`, wrapped in a tinted panel with an eyebrow + accent heading.

## 20. Stat / metric elements

- **Where:** home "spearheaded transformative projects" section.
- **Two distinct treatments:**
  1. **Giant numerals:** "100+" and "$15B+" rendered at **90px** (digest 90px, 16 occ.) in near-black/navy, with small captions — a big-number KPI row.
  2. **Overlapping stat panel:** a stack of **offset rectangles** in alternating dark navy `#132976` and periwinkle `#8c9ace`/`#c5cde7`, each holding a white **value** ("55+", "40", "30+", "20+") + caption ("AI/EA tech resources", "EA certifications", "ERP & CRM projects"). Creates a layered, staircase collage.
- **React note:** two components — `<BigStat>` (oversized numeral + label) and `<StatCollage>` (absolutely-positioned overlapping tiles). The collage is decorative/bespoke; give it a simpler responsive fallback (stack) on mobile.

## 21. Logo-wall grid (customers)

- **Where:** home "Trusted by modern enterprises".
- **Anatomy:** centered section header, then a **bordered grid of logo cells** (ESME, Panasonic, iValue, CDIL, motherson, HFCL, Hamdard, IFFCO, Synokem, NürnbergMesse, Dr. Reddy's). ~4 per row, last row centered 3-up. Thin hairline cell borders (`#e5e7eb`).
- **Style:** white cells, logos in original brand colors, generous padding, faint `1px` dividers forming the grid.
- **React note:** `<LogoGrid bordered>`; cells keep equal height, logos `object-fit: contain`.

## 22. Logo strip (partners)

- **Where:** home "Partnerships & alliances" (below customers).
- **Anatomy:** a horizontal, likely auto-scrolling **strip** of partner logos (AWS, Oracle, NVIDIA, Google Cloud, HPE, Salesforce, EDB, Azure — each 200×92 per `home.json`). Distinct from §21: no bordered grid, single row, marquee feel.
- **React note:** `<LogoMarquee>`; the same asset set repeats 3× in the DOM (see duplicated image list) → confirms an infinite-scroll ticker.

## 23. Vertical tabs (numbered)

- **Where:** home "Enabling organizational efficiencies".
- **Anatomy:** left column of 3 stacked **numbered tab buttons** ("1. Enabling organizational efficiencies", "2. Simplifying engineering workflows", "3. Delivering operational agility"); right — a **content panel card** with the active tab's title + bulleted list.
- **Visual style:**
  - Active tab: **navy gradient fill** (`#19369d`→darker), white text, radius ~15–20px, soft shadow.
  - Inactive tabs: light gray `#f9f9f9` fill, dark text, same radius.
  - Panel: white, radius ~20–24px, soft periwinkle glow shadow (`rgb(197,205,231) 20px 20px 50px`); bullets in navy.
- **States:** active vs inactive (fill + color swap).
- **React note:** `<VerticalTabs>`; active state = gradient pill; content panel animates on change.

## 24. Horizontal tab bar (underline + chevrons)

- **Where:** Resource hub + all listing pages (Blogs, Press releases, Events, AI trends, Use cases, Brochures, Customer success stories).
- **Anatomy:** a single scrollable row of text tabs flanked by **circular/plain chevron arrows** (‹ ›). Active tab = darker navy label with a **navy underline**; inactive = muted `#7a84a3`.
- **Style:** labels ~18–20px light, letter-spacing 1px; underline ~2px navy; arrows navy.
- **States:** active (underline + darker), inactive (muted).
- **React note:** `<TabBar scrollable>`; the arrows page the overflowing tab list. Tab selection swaps the card grid below.

## 25. Accordion / FAQ

- **Where:** home "Frequently asked questions" (+ used elsewhere for Q&A). Two-column: accordion left, supporting image right.
- **Anatomy per row:** **question** (dark ~18–20px) + **chevron** (▲ when open, ▼ when closed) on the right; open row reveals a body paragraph; **hairline divider** (`#e5e7eb`) between rows. Whole list sits in a white rounded card.
- **Visual style:** question `#000`/`#0d1c4f`; body `#555555`/`#0d1c4f` 16–17px; chevron navy.
- **States:** collapsed / expanded (chevron flips, body height animates).
- **React note:** `<Accordion>` with single-open behavior (first item open by default in the capture).

## 26. Carousel / slick slider + round arrow controls

- **Where:** home Products, Success stories, What's new, Blogs; Careers Voices. (The `slick` font is loaded — confirms Slick Carousel.)
- **Anatomy:** a track of cards + **two circular arrow buttons** placed just outside the track left/right.
- **Control style:** white circle, `50%` radius, subtle shadow (`rgba(0,0,0,0.2) 0 0 6px`), navy chevron glyph, ~52px diameter **(visual est.)**.
- **React note:** wrap any card list in `<Carousel>` exposing `<Carousel.Arrow>` round buttons; dots not observed. Keep arrow buttons vertically centered on the card row.

## 27. Full contact form

- **Where:** Contact us ("Send us a message"), inside a large white rounded card next to a "Get in touch with CoreOps.AI" info column.
- **Anatomy / fields:** Full name*, Work email* (side-by-side row), Company name*, Phone number*, Your message* (textarea), a **consent checkbox** ("I agree to the Terms of service and Privacy policy…" with inline links), then **"Send message"** primary button (bottom-right).
- **Visual style:**
  - Inputs: white, 1px border `#e5e7eb`, radius ~8–10px, label sits inside/top-left with a red `*` for required.
  - Left info column: heading, blurb, then a list of **location rows** each with a navy map-pin icon (Noida & Gurgaon, London, Sydney, Singapore, Chicago) and an email row with envelope icon.
  - Container card: white, radius ~20–24px, soft border/shadow.
- **React note:** `<ContactForm>` with a 2-col grid for name/email, full-width for the rest; required-field `*`; consent checkbox gates submit.

## 28. Inline "Get in touch" mini-form

- **Where:** bottom of product pages ("Your conversational AI is a click away" heading + image left, form card right).
- **Anatomy:** compact form — Full name*, Company email*, Message* (textarea), **"Connect with us"** primary button. Paired with a photo (rounded corners) on the left.
- **Style:** same input styling as §27, in a white rounded card with soft shadow.
- **React note:** `<InlineLeadForm>` — a 3-field subset of the contact form, reused as a page-bottom CTA.

## 29. Award badge (hero medallion)

- **Where:** home hero (left column, above CTAs).
- **Anatomy:** gold laurel-wreath medallion ("Best AI & Technology Startup of the Year 2026 — MSME & Startup Innovation Summit"). Asset `award-dsktp.png`.
- **React note:** decorative `<AwardBadge>` image; not a system component but recurring brand furniture.

## 30. Eyebrow / pill label

- **Two forms:**
  - **Text eyebrow:** small navy label above a big title — "Key features" (~20px navy `#002d72`) preceding a 40px title. Reusable section device.
  - **Chip pill:** white rounded chip with navy text, e.g. "CORESight **Webinar**" on the promo band.
- **React note:** `<Eyebrow>` (text) and `<Chip>` (boxed) — both letter-spaced 1px.

## 31. Date / time info pills

- **Where:** webinar band ("📅 8th July 2026", "🕐 4:00 – 4:45 PM IST").
- **Style:** white/outline rounded pills, radius ~8–10px, small icon + navy label. Icons `calander-icon.svg` (13×13), `clock-icon.svg` (12×12).
- **React note:** `<InfoPill icon>`; used in a horizontal row.

## 32. Section header (centered title + subtitle)

- **Where:** most home / listing sections ("Our products", "Success stories", "What's new", "Blogs", "Techtalks & trends", "Frequently asked questions", "Follow us on linkedIn").
- **Style:**
  - Title: H2 Helvetica Neue light, **40px / lh 48px**, weight 500, letter-spacing 1px, color `#000`/`#0d1c4f` (digest H2 signature, 73 occ.). Centered.
  - Subtitle: 17–20px muted, centered, max-width ~700px.
  - Product/section titles frequently use the **two-tone accent** (trailing words in `#19369d`).
- **React note:** `<SectionHeader align="center" title subtitle accentLastWords?>`. Product pages left-align the same header.

## 33. Footer

- **Where:** every page.
- **Anatomy:**
  - **Brand block (col 1):** logo, "Corporate Address" heading + address (INS 701, Urbtech Trade Centre, Noida…), single **LinkedIn** social icon (navy `#0d1c4f` filled circle).
  - **4 link columns:** **Products** (AgentCORE, DataCORE, CORESight, COREHire, COREServ, CORETrack, Aithra) · **About** (Careers, Contact us) · **Services** (Enterprise AI services, Enterprise application services) · **Resource hub** (AI trends, Press releases, Events, Blogs, Customer success stories, Use cases).
  - **Legal bar:** "Copyright © 2026. All rights reserved." (left) · "Privacy policy | Terms of service" (right).
- **Visual style:** background **periwinkle `#c5cde7`**; column headers navy `#19369d`/`#0d1c4f` ~20–22px; links navy `#0d1c4f` ~16–17px, letter-spacing 1px; comfortable 5-col layout, thin divider above legal bar.
- **React note:** `<Footer>` driven by the same nav config; columns map to nav groups. Social is a single-item array today (LinkedIn) — make it a list. Note footer bg is periwinkle, **not** white.

## 34. Floating CTA + chat widget

- **Where:** fixed bottom-right on every page.
- **Anatomy:** a vertical stack of **navy circular buttons** — an **email/envelope** FAB (`FloatingCTA.png`, 73×73) and a **chat** FAB, with a small "Hi There!" speech-bubble tooltip beside the chat button.
- **Style:** solid navy `#0d1c4f`/`#132976` circles (`50%` radius), white glyphs, drop shadow; tooltip is a periwinkle rounded label.
- **React note:** `<FloatingActions>` — position `fixed`, z-above content; the chat bubble is a live-chat entry point, the envelope opens contact.

---

## Cross-cutting tokens for the rebuild (from digest)

| Token | Value(s) | Use |
|-------|----------|-----|
| Radius — button | 6px / 8px | primary/secondary/read-more |
| Radius — card | 12 / 15 / 20 / 24px | cards, panels |
| Radius — panel-bottom | `0 0 10px 10px` | dropdowns / image-cap bottoms |
| Radius — pill/tab | 20 / 40px | active tabs, chips |
| Radius — circle | 50% | avatars, FABs, arrow controls, badge |
| Shadow — card | `rgba(0,0,0,0.1) 0 4px 16px` | blog/resource cards |
| Shadow — soft 3-way | `rgba(0,0,0,0.05) -4px 4px 6px, 4px 4px 6px, 0 6px 8px` | product/feature cards |
| Shadow — periwinkle glow | `rgb(197,205,231) 20px 20px 50px` / `3px 2px 7px` | tab panel, tinted cards |
| Shadow — halo | `rgba(0,0,0,0.2) 0 0 6px` | round carousel arrows |
| Fill — primary | `#19369d` / `#132976` | buttons, active tab |
| Fill — deep navy | `#0d1c4f` / `#001858` | dark banners, FABs, Read-more |
| Tint — periwinkle | `#c5cde7` / `#e7ebfb` / `#edf1ff` | footer, product hero, section bands |
| Section gray | `#f9f9f9` | alternating sections, logo cells |
| Border | `#e5e7eb` | inputs, dividers, logo grid |
| Muted text | `#7a84a3` | dates, inactive tabs, captions |
| Link navy | `#19369d` / `#5368b5` | card titles, sub-heads |

## Notable inconsistencies / gotchas

- **Font-class names lie:** `helvetica_neue_thin` is used for ~90% of text but renders at weight 400–600; treat "thin/light" as *visual* weights, not literal. Only `thin`, `light`, `regular` fonts actually loaded (`home.json → fonts`); `bold`/`black`/`medium` were declared but **unloaded**, so faux/synthetic weight is likely in play.
- **Three overlapping blue "primaries":** the declared token is `#19369D`, but rendered buttons/bands lean on `#132976` and `#0d1c4f`. Pick one canonical primary + two darker steps for the rebuild rather than replicating all three ad hoc.
- **Button radius is small (6–8px), pills are separate:** don't globally round buttons; the pill radius (20–40px) belongs to tabs/chips only.
- **Two card-shadow systems coexist** (the flat `0 4px 16px` vs the 3-way soft shadow vs the periwinkle glow). Consolidate to 2 elevation levels.
- **Footer bg differs by expectation:** it is periwinkle `#c5cde7`, not white — easy to miss because home's footer crop reads pale.
- **Letter-spacing 1px everywhere** slightly reduces legible density; the digest shows it on headings, body, and buttons alike. Keep it as a brand signature but verify at small sizes.
- **Resource cards have two media modes** (bleed photo vs contained logo-on-gray) sharing one skeleton — build as one component with a `media` variant, not two.
- **`View details` vs `Read more`:** product cards use "View details" (text link), resource/blog/press cards use "Read more" (filled mini-button) — same intent, different affordance.
