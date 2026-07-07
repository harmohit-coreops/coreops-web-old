# CoreOps.ai — Design Reference 06: Imagery, Iconography, Logo & Brand Motifs

Evidence base: logo SVG (`assets/images/coreops-logo.svg`), favicon (`assets/images/favicon.png`, 60×60), arrow SVG (`assets/images/arw_white.svg`), the image inventories in `design-data/home.json` and `design-data/products__coresight.json`, the aggregate digest, and direct inspection of the desktop screenshots for `home`, `products__coresight`, `products__agentcore`, `coreops-ai-edge`, `about`, and `enterprise-ai-services` (plus zoom crops of the home hero, the About "dandelion" panel, and the CORESight feature-icon row).

Bottom line: this is a **light, airy, corporate-tech identity built on one central symbol — a line-art dandelion — plus a navy-blue palette and a recurring "neural network / mesh" graphic language.** Almost every raster and vector asset is served from the WordPress media library at `backend.coreops.ai`. Iconography is thin single-weight navy line-art; illustration is a mix of one wireframe "brain" hero render, animated product GIF loops, and periwinkle gradient washes; photography is warm corporate stock plus real team/founder photos.

---

## 1. Logo

### Construction
The primary logo (`backend.coreops.ai/wp-content/uploads/2025/06/logo.svg`, also captured locally as `coreops-logo.svg`) is a **horizontal lockup: dandelion mark on the left + "coreops.ai" wordmark on the right.**

| Property | Value (from SVG source) |
|---|---|
| SVG `viewBox` | `0 0 171 67` |
| Rendered/intrinsic size in DOM | **171 × 67 px** (confirmed in both image inventories) |
| Mark occupies | left ~0–48 px band (inside two nested clip rects, `translate(0,10)`, ~94 px wide reserved) |
| Wordmark occupies | ~x=59 to x=171 |
| Aspect ratio | ~2.55 : 1 |

**The mark** is a small, hand-drawn-feel **dandelion** rendered as ~12 separate thin vector strokes: a single curving stem rising from lower-left, a round seed-head, radiating seed spokes, and 3–4 seeds detaching toward the upper-right (the "blowing away" gesture). It is **not** geometric or gridded — it reads as a fine ink line drawing. Stroke fills alternate between two colors:
- `#0D1C4F` (deep navy) — the primary strokes
- `#000000` (black) — secondary strokes

**The wordmark** "coreops.ai" is set in a **custom rounded-lowercase sans** (bespoke letterforms in the SVG paths — NOT Helvetica Neue, despite the site body font). Two-tone:
- `coreops` → `#000000` (black / near-black)
- `.ai` → **`#19369D`** — the brand primary. This is the single most important brand-color cue and matches the `--coreops-primary` token exactly.

### Colors summary
| Element | Hex |
|---|---|
| Dandelion mark, primary strokes | `#0D1C4F` |
| Dandelion mark, secondary strokes | `#000000` |
| Wordmark "coreops" | `#000000` |
| Wordmark ".ai" accent | `#19369D` |

### Behavior on light vs dark
- **On light** (white / `#f9f9f9` / periwinkle headers): used as-is. In the nav the mark shows as a thin navy-black dandelion; "coreops" reads black, ".ai" reads blue. Clear-space in the header is generous — roughly the height of the mark on all sides; the lockup sits at ~40 px tall in a ~90 px header.
- **On dark** (navy `#132976` panels, footer, dark hero bands): the footer and dark sections use a **white/light knockout version** of the same lockup so the wordmark stays legible. The two-tone accent is dropped to mono-white when reversed.
- The **`og:image` for every page is `logo.svg`** — the logo is the default social share graphic, underscoring how central the mark is.

---

## 2. Iconography

### Overall style
**Thin, single-weight, outline (line) icons — never filled, never duotone.** Uniform navy stroke, no fills, rounded joints, lightly illustrative (each icon carries a small scene rather than a single glyph). Sourced from the open-source **IconPark outline** set (filenames literally read `icon-park-outline_data-null-7.png … -11.png`, 66 × 66 px each), recolored to the brand navy.

| Icon type | Color | Size | Treatment |
|---|---|---|---|
| Feature icons (product/service benefit rows) | navy `#0d1c4f` / `#002d72` outline | 66 × 66 px | thin line, mini-scene (monitor+"ABC", globe+network, monitor+eye, puzzle/circuit, person+check/x) |
| Small UI icons | navy or contextual | email-icon.svg 24×24, calendar 13×13, clock 12×12 | hairline outline |
| "Enterprise value" icons (About/edge) | navy line on light | `entrp_*.png` 88 × 88 | outline emblem style (innovation, partnership, global engineering, leadership, global power) |
| Download / brochure icon | navy outline | `download-icon.svg` 80 × 80 | line |
| Social icons (footer) | filled navy squares | linkedin_icon.png 57×56 | LinkedIn badge on cards is a solid navy rounded square (exception to the line rule) |

### The recurring arrow-CTA icon
The site's signature interactive glyph is a **right-pointing chevron ">"**:
- `arw_white.svg` — **20 × 35 px, pure `>` chevron, white fill**, single path. Used inside dark/navy carousel controls and on the "Our products" cards (white arrow on a navy circular button).
- `arw_rgt.png` — tiny inline right arrow used after **"View details"** text links (the digest logs 812 of these "View details" CTA nodes — it is the dominant repeated CTA on product/home cards).
- Carousels also use **circular chevron buttons** (‹ ›) flanking sliders (success stories, blogs, use cases, testimonials).

### Product wordmark icon device (important)
Each product has a **wordmark logo image** (~420 × 102 px PNG), e.g. `agentcore-header-1.png`, `Frame-39833.png` (CORESight), `Frame-39835.png` (DataCORE), `corehire-header.png`, `coreserv.png`, `coretrack-header.png`, `AITHRALOGO-header.png`. In these, the letter **"O" in "CORE" is replaced by a small dandelion seed-burst / asterisk-star** — visible in the laptop mockups on the edge page ("AgentC✳RE", "C✳RESight", "COREHire"). This ties every product back to the dandelion mark and is the single most reusable brand device.

---

## 3. Illustration / Graphic Style

Three distinct graphic modes coexist:

**A. The "neural mesh / low-poly brain" hero render (home).**
The home hero is anchored by a large translucent **low-poly wireframe brain**: faceted blue-glass triangular panels (`#19369D`/periwinkle at ~10–40% opacity) wrapped in a dense **node-and-edge network** (fine navy lines with dot vertices). It floats inside a faint **"digital fabric" field** — dozens of pale gray line-art tech icons (lightbulb, chat bubbles, gears, monitors, plant, person) connected by thin dotted lines and right-angle traces, like a schematic. No hard background; it dissolves into white. This is the flagship illustration and the clearest statement of the "AI = neural network" theme. It is bespoke, not stock.

**B. The dandelion motifs (brand illustrations).**
- **Favicon** (`favicon.png`, 60 × 60): a pure line-art dandelion — stem, seed-head, and seeds blowing to the upper-right. Same drawing as the logo mark.
- **"The dandelion effect" illustration (About page):** a striking navy illustration of a **dandelion whose seeds are stylized human figures** (arms outstretched, radiating from a central head/stem) on a soft periwinkle radial glow. The adjacent copy makes the brand thesis explicit: *"our logo is the dandelion that symbolizes our vision—resilient, adaptable, and effortlessly scalable… Inspired by neural networks in nature."* Dandelion **=** neural network **=** distributed AI. This is the conceptual keystone to preserve.

**C. Product UI mockups + animated GIF loops.**
- **Laptop/browser mockups:** product screenshots shown inside a **realistic silver MacBook frame** (edge page, product heroes) or a plain browser chrome (`white-screen-desktop.png`, 1469 × 896). These carry a small play button (video walkthroughs).
- **Animated product GIF loops:** each product has one square animated GIF used as its "icon"/render on the home "Our products" cards and product pages — `AGENTCORE-gif.gif` (216²), `CORESIGHT-gif.gif` (324²), `DATACORE-gif.gif` (360²), `CoreTrack.gif` (608²), `CoreHire.gif` (608²), `Aithra.gif` (608²), `ezgif-…` COREServ (304²). These are the animated brand "renders" — abstract, blue, motion loops rather than literal dashboards.
- **Data-viz motifs** appear only *inside* screenshots (charts on product screens) and in stock photos (blue-lit dashboards on monitors), not as standalone illustration.

**Not present:** true 3D product renders, isometric scenes, or heavy gradient-mesh blobs. The graphic language is restrained — line-art + one wireframe render + soft gradients.

---

## 4. Photography

Photography splits into **real company photos** and **corporate stock**, both warm-neutral and people-forward.

| Use | Style / treatment | Framing |
|---|---|---|
| **About hero** (`about`) | Real full-bleed **team group photo**, warm indoor tungsten tone, with a **navy gradient scrim** across the bottom and white headline "When people with purpose meet AI" overlaid | Wide, edge-to-edge, environmental |
| **Founders & leadership** (About) | Individual **headshots** on white/light-gray rounded cards; subjects in business/business-casual attire on neutral or dark backdrops; each card carries a **solid-navy LinkedIn badge** + "Read more" | Chest-up portrait, centered |
| **"Our story" team photo** | Real candid group shot on a staircase, warm indoor | Rounded-corner rectangle |
| **Product/section side images** (CORESight, AgentCORE, enterprise services heroes) | Generic **corporate stock** — smiling professional with tablet/laptop, casual-professional, soft neutral background; woman at dual monitors showing blue data viz | Portrait or 3:4, placed in a rounded card, often on periwinkle |
| **"Get in touch" panel** (recurring, near every footer CTA) | Stock **business handshake** (`Handshake.png`, 709 × 531) | Cropped mid-frame |
| **FAQ panels** | Stock woman at laptop, relaxed | Rounded rectangle beside the accordion |
| **Blog / use-case / success thumbnails** | 856 × 436 — darker, techy imagery: data centers, circuit boards, abstract blue tech, some with baked-in text/overlays | 2:1 landscape, rounded top corners |

Treatment is consistent: **rounded corners (10–20 px), no heavy filters, warm-to-neutral color**, and people are almost always present (team, customers, or stock professionals). Real photos skew warm/indoor; stock skews cool/neutral.

---

## 5. Recurring Brand Motifs & Visual Devices

1. **The dandelion** — logo mark, favicon, the people-dandelion illustration, and the seed-burst inside every product "O". The one non-negotiable brand symbol.
2. **Neural / mesh network graphics** — node-and-edge webs, the low-poly wireframe brain, and dotted-line "digital fabric" backgrounds. The visual translation of "AI."
3. **Periwinkle gradient washes** — soft diagonal/radial gradients from `#e7ebfb` / `#edf1ff` / `#f0f7ff` (`--coreops-secondary`) into white, used as hero and section backgrounds. Gives the light, airy feel.
4. **Solid navy blocks** — full-bleed panels in `#132976`, `#19369d`, `#0d1c4f` for stat bands ("100+ / $15B+"), CTA bands, the stacked translucent stat-card cluster ("55+ / 40 / 30+ / 20+"), and the footer.
5. **Rounded cards with periwinkle glow shadow** — radius 10–20 px, shadow `rgb(197,205,231) 3px 2px 7px` (tight) or `rgb(197,205,231) 20px 20px 50px` (lifted). The periwinkle `#c5cde7` shadow (instead of gray/black) is a distinctive signature — cards look like they float on a blue cushion.
6. **Laptop / browser mockups** with a play button for product demos.
7. **Speech-bubble / rounded pill callouts** — the "Breaking barriers between people and data" section uses white rounded speech-bubble chips.
8. **Gold award laurel badge** — "Best AI & Technology Startup of the Year 2026" wreath, gold on the home hero (the only warm/gold accent in an otherwise blue system).
9. **Floating round CTA + notification bell** (bottom-right, all pages) — `FloatingCTA.png` 73 × 73 navy circle with envelope, plus an animated `BellCoreops.gif` notification bell (40 × 40) in the header.
10. **World map with location pins** — About "Our global footprint": dotted world map with navy teardrop pins (Chicago, London, Noida/Gurugram, Singapore, Sydney).
11. **Client/partner logo walls** — customers as a single combined **monochrome** logo image (`logo_nw.jpg` 1500 × 583 desktop / 600 × 787 mobile: ESME, Panasonic, iValue, CDIL, Motherson, Fenner, IFFCO, Synokem, Nürnberg Messe, Dr. Reddy's); tech partners as **full-color** logos at 200 × 92 (AWS, Oracle, NVIDIA, Google Cloud, HPE, Salesforce, Azure, EDB, Databricks).

---

## 6. Image Sourcing & Recreate-vs-Restyle Guidance

### Sourcing
- **~3,299 of ~3,331 images are served from `backend.coreops.ai/wp-content/uploads/<year>/<month>/`** — the headless WordPress media library. Only 28 from `www.coreops.ai/assets/images` (the arrow SVGs) and 4 from `static.coreops.ai`.
- Formats in use: **PNG** (majority — wordmarks, photos, badges, feature icons), **SVG** (logo, small UI icons, banners, `og:image`), **GIF** (product loops + notification bell), **JPG** (photo-heavy thumbnails, logo walls).
- Feature icons are **third-party (IconPark outline)**, recolored — not custom. The dandelion mark, product wordmarks, and the hero brain render are **custom/bespoke**.

### For the new (fancier) design language

**Recreate / carry forward (core equity):**
- The **dandelion mark and its "seeds = distributed intelligence / neural network" concept** — this is the brand. Modernize the drawing but keep the metaphor.
- The **two-tone wordmark** logic (neutral name + blue `.ai` accent).
- The **product "O = dandelion seed-burst"** device across the product family.
- The **navy-to-periwinkle** color relationship and the **periwinkle glow shadow** on cards (a genuine differentiator worth keeping, even if refined).
- The **neural-mesh / network** graphic theme as the illustration backbone.

**Restyle / upgrade:**
- Replace the **borrowed IconPark line icons** with a **custom, consistent icon set** (still thin-line, still navy) so iconography stops looking like a stock kit. Standardize on one grid (24/32) and one stroke weight.
- Elevate the **hero "wireframe brain"** — currently a single flat PNG-feel render — into a crisper, possibly interactive/animated network system; unify it with the dandelion (seeds ⇄ nodes).
- Consolidate the **animated GIF product loops** into a coherent motion system (they currently vary wildly in size 216–608 px and style); consider Lottie/SVG for crispness at scale.
- Move photography toward a **single treatment** (currently real-warm vs stock-cool clash). Pick one grade; add a consistent duotone/navy tint if a branded look is wanted.
- Rebuild **product wordmarks and the logo wall as vector/SVG** rather than raster PNG/JPG (the `logo_nw.jpg` client wall and 420×102 PNG wordmarks are resolution-limited and un-themeable).

### Notable inconsistencies found
- **Font mismatch in the logo:** the wordmark uses bespoke rounded letterforms, but the entire site body is Helvetica Neue — the logo does not share the site typeface.
- **Icon rule breaks:** iconography is "thin outline" everywhere except social badges (solid navy squares) and the dandelion-people illustration (solid navy fill).
- **Mark is drawn in two colors** (`#0D1C4F` + `#000000`) rather than one — fine at logo scale, but muddy if scaled down or recolored; a single-color mark would be cleaner.
- **Asset scale is inconsistent** (product GIFs 216–608², wordmarks 420–424 px, hero photos up to 2560 px) — no evident export discipline; a future design system should define fixed asset sizes.
- **One warm accent** (the gold award laurel) sits outside the otherwise strictly blue palette — intentional highlight, but worth a deliberate decision in the new system.
