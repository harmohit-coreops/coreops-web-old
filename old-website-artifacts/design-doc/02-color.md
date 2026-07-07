# CoreOps.ai — Design Reference: COLOR & THEMING

Evidence base: `AGGREGATE-DIGEST.md` (computed-style frequencies across 117 pages) + direct pixel sampling of the desktop screenshots for `home`, `products__agentcore`, `coreops-ai-edge`, `enterprise-ai-services`, `resource-hub`, `products__coresight`. Every hex below is either quoted from the digest (frequency shown) or sampled from a named screenshot. **Gradients are NOT in the computed-style capture** (verified: 0 files in `design-data/` contain the string "gradient") — all gradient claims come from pixel sampling.

The one-line story: this is a **navy-authority palette**. The brand is carried by a family of deep blues (not one blue), body ink is navy-black rather than gray, backgrounds alternate white / near-white gray, and the only real "color" accents are periwinkle tints (section bands, footer, tinted shadows). The declared CSS token file is a generic starter that does **not** describe the rendered site.

---

## 1. Structured Palette

### 1a. Brand / Primary blues (the "action + brand" blues)

| Swatch hex | Role | Where used | Frequency signal |
|---|---|---|---|
| `#19369d` | **Declared primary** (`--coreops-primary`). Royal navy. | Solid CTA buttons ("Enquire now" nav, "Request a demo" on Edge — sampled flat `#19369d`), primary links, H3 accents. | bg 186, text 104; declared on 116p |
| `#132976` | **De-facto brand navy** — deeper, slightly purple. | Hero H1 text (sampled `#132976` on home heading), H5 headings (115p — every page), navy stat/CTA blocks. | text 1065, bg 516 |
| `#002d72` | Mid-deep navy | H3 headings (68p signature), sub-heads | text 499 |
| `#001858` | Deep navy | Headings/emphasis text, some navy blocks | text 812, bg 94 |
| `#1e40af` | **Declared "primary-dark"** (`--coreops-primary-dark`) | Declared only — **does not appear** in the rendered text/bg frequency tables. | declared 116p, rendered ~0 |
| `#5368b5` | Lighter cornflower blue | Rare accent text | text 8 |

Practical read: **`#19369d` is the interactive/brand blue; `#132976` is the display-heading blue.** They are close but distinct — do not collapse them if you want to reproduce the exact look.

### 1b. Navy / ink text colors (the reading colors)

| Swatch hex | Role | Where used | Frequency signal |
|---|---|---|---|
| `#0d1c4f` | **Primary body-text ink** (navy-black, not gray) | Every paragraph (114p paragraph signature), body copy, list items | text 2046 — #2 overall |
| `#000000` | Pure black | Nav labels, much body/heading text, some card text | text 6915 — #1 overall |
| `#0a0a23` | Near-black navy | H6 (1p), dense small text | text 17 |
| `#1f1f1f` / `#333333` / `#555555` | Neutral grays for secondary/muted text | Captions, meta, muted paragraphs | 8 / 23 / 361 |

Note the signature move: **body text is `#0d1c4f` (a navy), not a neutral gray.** This is what makes the whole page feel "blue" even in plain paragraphs.

### 1c. Neutrals / grays

| Swatch hex | Role | Where used | Frequency signal |
|---|---|---|---|
| `#ffffff` | White | Body background (116/117 pages), cards, text-on-navy | bg 1412, text 827 |
| `#f9f9f9` | **Section gray** | Alternating full-width sections (sampled on home between hero and content bands) | bg 1636 — most-used bg |
| `#f8f9fa` `#fbfbfb` `#f8f8f8` `#fafafa` `#f5f5f5` `#f2f2f2` | Near-white section variants (visually ≈ `#f9f9f9`) | Minor section/card fills | 28 / 17 / 1 / 1 / 4 / 2 |
| `#7a84a3` | **Muted slate-blue** | De-emphasized labels, secondary meta, disabled tabs (sampled `~#838eb7` on faded hero text) | text 144 |
| `#555555` | Muted gray | Secondary paragraph text | text 361 |
| `#e5e7eb` | **Declared border** (`--coreops-border`) | Hairline dividers, input borders | declared 116p |
| `#e6e6e6` `#cccccc` | Other light borders | Card outlines | 2 / 1 |

### 1d. Section-background tints (periwinkle / light-blue) — the accent color

| Swatch hex | Role | Where used | Frequency signal |
|---|---|---|---|
| `#edf1ff` | **Lightest periwinkle** | Flat hero-tint band on product pages — sampled essentially flat `#edf1ff` across AgentCORE and CORESight heroes | bg 7 |
| `#e7ebfb` | Light periwinkle | Section bands + top band of Resource-hub (sampled `#e7ebfb`), sub-section fills | bg 26 |
| `#f0f7ff` | **Declared secondary** (`--coreops-secondary`) — pale blue | Declared; sits in the same family as the above | declared 116p |
| `#c5cde7` | **Footer periwinkle** + tinted-shadow color | Footer background (sampled `#c5cde7` on Resource-hub footer), also drives the brand box-shadows | bg 232 (large), + shadows |
| `#8c9ace` | Mid periwinkle | Deeper tint fills, borders | bg 4 |
| `#f3f5ff` | Faint blue-white | Rare section fill | bg 1 |

Periwinkle is the **only** non-blue accent in the system and it is used almost exclusively for *surfaces* (hero tints, footer, shadows) — never for text or icons.

### 1e. Semantic colors

| Swatch hex | Role | Reality check |
|---|---|---|
| `#10b981` | **Declared success green** (`--coreops-success`) | Declared on 116p but **absent from the rendered palette** — not in any text/bg frequency list. Effectively unused. |
| `~#e5312a` (approx) | Error / alert red | Not in the computed capture; observed only as the small **notification-bell badge** in the nav (see hero screenshots). Decorative, not a system token yet. |

There is **no evidence of a rendered semantic color system.** Success/error need to be *invented* for the React port.

### 1f. Pure black / white usage

- `#000000` is the single most-used foreground (6915) — CoreOps leans on **pure black for nav + a lot of body text**, mixed with navy `#0d1c4f`. For a "fancier" port, consider standardizing body text on the navy ink and reserving pure black for very few cases.
- `#ffffff` is the default canvas (body bg on 116/117 pages) and the text color on every navy block.
- Semi-transparent whites appear frequently (`#ffffff` a=0.59 / 0.576 / 0.64 / 0.55) — these are **glass/overlay fills on navy or over images** (e.g. frosted cards, hero overlays).

---

## 2. Gradients (screenshot-authoritative — not in computed capture)

Six distinct gradient/tonal treatments are visible:

### G1 — Hero radial periwinkle "glow" on white  *(Edge, Enterprise-AI-Services)*
A soft elliptical/radial bloom: **white at the corners/edges → periwinkle bloom toward center**, then fading back to near-white at the section's lower edge.
- **Edge hero** sampled across the band: edges `#fbfbfd`/`#fdfdfe` → center peak `#c9d0e8` (at y≈300) → back to `#eff1f8` at the bottom. Reads as a large diagonal glow behind the left-aligned heading.
- **Enterprise-AI-Services hero**: white top → center peak `#b7beda` → soft falloff.
- Suggested CSS: `radial-gradient(ellipse at 35% 55%, #cdd4ea 0%, #e7ebfb 45%, #ffffff 85%)`.

### G2 — Flat periwinkle hero tint  *(AgentCORE, CORESight)*
Not a true gradient — a **flat `#edf1ff` band** behind the hero, ending in a hard edge to white below. Same family as G1 but with no bloom. Suggested token: a solid `--surface-tint: #edf1ff`.

### G3 — Secondary hero button gradient  *(home "CORESight Webinar" button)*
A **horizontal left→right blue gradient**, brighter/more saturated than the flat navy buttons. Sampled across the button at y≈828: left `~#6869c5` (light indigo) → `#484dc8` → right `#2731c1` (royal blue). So roughly:
- `linear-gradient(90deg, #5a5cc7 0%, #2731c1 100%)`.
This is the site's one "premium" gradient button. All other primary buttons are **flat `#19369d`** (sampled). Good hook to modernize.

### G4 — Product-mockup screen gradient  *(laptop posters in AgentCORE / CORESight heroes)*
Inside the laptop mockup image, the product logo sits on a **white → light-gray vertical gradient** (`#ffffff` → ~`#e6e6e6`). This is baked into the poster image, but it establishes the "product screen" look.

### G5 — Navy tonal stat/CTA blocks  *(home stats: "55+ / 40 / 30+ / 20+")*
Stacked navy cards stepping **light → dark** through the blue family (`#19369d` → `#132976` → `#0d1c4f`). Implemented as separate solid blocks, but visually reads as a navy gradient staircase. The big-number band ("100+ / $15B+") is navy text on white.

### G6 — Dark photographic promo band  *(home "CORESight Webinar" band)*
A near-black **`#0f1b20`** (navy-black with a faint teal cast, sampled) photographic band with a **diagonal white cut** revealing a speaker photo, plus a black footer bar. This is the site's only "dark section," and it is image-driven, not CSS. It is the reference point if the new design wants a genuine dark band.

---

## 3. Declared tokens vs. rendered reality — reconciliation

| Declared token | Declared hex | Rendered reality | Verdict |
|---|---|---|---|
| `--coreops-primary` | `#19369d` | **Yes** — interactive/brand blue on buttons & links | Keep |
| `--coreops-primary-dark` | `#1e40af` | **No** — never appears in rendered freq tables. The real "darker blues" are `#132976`, `#001858`, `#0d1c4f` | Replace |
| `--coreops-secondary` | `#f0f7ff` | Approx — real tints rendered are `#edf1ff` / `#e7ebfb` / `#c5cde7` | Redefine as a tint scale |
| `--coreops-text` | `#1f2937` | **No** — real body ink is `#0d1c4f` (navy) and `#000000`. `#1f2937` barely appears | Replace |
| `--coreops-border` | `#e5e7eb` | Plausible for hairlines, but `#c5cde7` periwinkle also does border/shadow duty | Keep + add periwinkle border |
| `--coreops-success` | `#10b981` | **No** — unused | Keep as intent, but it is not "the site" |

**Conclusion:** the declared file is a generic Tailwind-flavored starter. The rendered site is a **multi-navy + periwinkle** system. The React port should adopt the canonical set in §5, not the declared six.

---

## 4. Color usage rules

**Text on light (white / `#f9f9f9` / periwinkle tints):**
- Headings: navy `#132976` (display H1/H5), `#002d72` (H3), or `#0d1c4f`.
- Body: `#0d1c4f` (navy ink) — this is the default, not gray.
- Muted/meta: `#7a84a3` (slate) or `#555555`.
- Never put success-green or bright accents on text — the site doesn't.

**Text on navy (`#132976` / `#19369d` / `#0d1c4f` blocks) and on images:**
- Primary text: `#ffffff`.
- De-emphasized text / rules on navy: semi-transparent white (`rgba(255,255,255,0.55–0.64)`).

**Section alternation rhythm (top → bottom of a page):**
White hero (or periwinkle-tint hero) → `#f9f9f9` content section → white → periwinkle band (`#edf1ff` / `#e7ebfb`) for emphasis → navy `#132976` stat/CTA block → `#f9f9f9` → **periwinkle `#c5cde7` footer.** Verified by scanning `home` top-to-bottom: white → dark promo band (`#0f1b20`) → `#f9f9f9` sections → white → `#c5cde7` footer. The dominant rhythm is simply **white ⇄ `#f9f9f9`**, with periwinkle and navy used as *punctuation*.

**Accent usage:** periwinkle = surfaces only (bands, footer, shadows); navy = brand, headings, primary actions; there is no third hue. Any new accent is a *net addition*, not a replacement.

**Shadows / elevation colors:**

| Shadow | Meaning | Freq |
|---|---|---|
| `rgba(0,0,0,0.1) 0 4px 16px` | **Default card elevation** (workhorse) | 373 |
| `rgba(0,0,0,0.05) -4px 4px 6px, 4px 4px 6px, 0 6px 8px 0.04` | Soft multi-direction card | 348 |
| `rgb(197,205,231) 3px 2px 7px` = **`#c5cde7`** | **Brand periwinkle-tinted shadow** (blue-cast, not gray) | 116 |
| `rgb(197,205,231) 20px 20px 50px` | Large soft periwinkle drop | 36 |
| `rgba(0,0,0,0.2) 0 0 6px` | Tight dark shadow (icons/toggles) | 70 |
| `rgba(67,71,85,0.27) 0 0 4px, rgba(90,125,188,0.05) 0 4px 16px` | Blue-tinted elevated card | 22 |

Signature: elevation is frequently **periwinkle-tinted (`#c5cde7`)** rather than neutral gray — a subtle but distinctive brand cue worth preserving.

---

## 5. Ready-to-use token table (React port)

Canonical set derived from what actually renders. Names are semantic so the design can evolve without renaming.

```css
:root {
  /* Brand blues */
  --brand-primary:      #19369d; /* interactive / buttons / links (declared primary) */
  --brand-primary-600:  #132976; /* display headings, navy blocks (de-facto brand navy) */
  --brand-primary-700:  #002d72; /* deep heading navy */
  --brand-primary-800:  #001858; /* deep navy */
  --brand-ink:          #0d1c4f; /* body text (navy-black) */

  /* Neutrals */
  --text-strong:  #0a0a23; /* near-black headings */
  --text-body:    #0d1c4f; /* alias of brand-ink */
  --text-muted:   #7a84a3; /* slate meta */
  --text-subtle:  #555555; /* gray meta */
  --surface:      #ffffff; /* page / card canvas */
  --surface-alt:  #f9f9f9; /* alternating section gray */
  --border:       #e5e7eb; /* hairline */
  --border-tint:  #c5cde7; /* periwinkle border */

  /* Periwinkle tints (accent surfaces) */
  --tint-50:  #f3f5ff;
  --tint-100: #edf1ff; /* flat hero tint */
  --tint-200: #e7ebfb; /* section band */
  --tint-300: #c5cde7; /* footer + shadows */
  --tint-400: #8c9ace;

  /* Semantic (invented — not in current render, define fresh) */
  --success: #10b981; /* declared; keep */
  --error:   #e5312a; /* approx from nav badge; formalize */

  /* Elevation */
  --shadow-card:  0 4px 16px rgba(0,0,0,0.10);
  --shadow-soft:  -4px 4px 6px rgba(0,0,0,0.05), 4px 4px 6px rgba(0,0,0,0.05), 0 6px 8px rgba(0,0,0,0.04);
  --shadow-brand: 3px 2px 7px #c5cde7; /* periwinkle-tinted */

  /* Signature gradients (screenshot-derived) */
  --grad-hero:   radial-gradient(ellipse at 35% 55%, #cdd4ea 0%, #e7ebfb 45%, #ffffff 85%);
  --grad-button: linear-gradient(90deg, #5a5cc7 0%, #2731c1 100%);
}
```

**Dark-mode note:** the current site has **no dark theme** (body bg is white on 116/117 pages); the only dark surface is the image-driven promo band `#0f1b20`. A future dark theme has a natural anchor there: base `#0d1c4f`/`#0a0a23`, surfaces `#132976`, text `#ffffff` + `rgba(255,255,255,0.7)`, and periwinkle `#8c9ace`/`#c5cde7` promoted to the *accent/link* role (since navy can't sit on navy).

### How to evolve the palette
1. **Keep the navy authority.** Multi-blue headings + navy body ink are the brand's fingerprint — don't flatten to a single blue or a gray body text.
2. **Add one modern accent.** The system is monochromatic-blue with zero live accent (green is declared-but-dead). Introduce a single vivid accent — an electric cyan/teal (e.g. `~#00c2ff`) or a warm signal color — for micro-interactions, active states, and data highlights. Use the existing `--grad-button` (`#5a5cc7 → #2731c1`) as the "premium" primary-button treatment to make actions feel richer than today's flat navy.
3. **Promote periwinkle deliberately.** Today `#c5cde7`/`#edf1ff` only fill surfaces. Give the tint scale defined roles (surface / band / footer / border / tinted-shadow) so elevation stays blue-cast — that periwinkle shadow is a cheap, distinctive signature.
4. **Formalize semantics.** Define real success/warning/error/info tokens (only `--success` is declared, and it isn't even used).
5. **Dark mode:** design it on the `#0d1c4f`/`#132976` anchor above rather than inventing new hues.

---

### Inconsistencies & notable findings
- **Declared tokens ≠ rendered site.** `--coreops-primary-dark #1e40af` and `--coreops-text #1f2937` essentially never render; the real ink is `#0d1c4f` and the real "dark blues" are `#132976`/`#001858`. Treat the declared file as legacy scaffolding.
- **Two near-identical brand blues** (`#19369d` action vs `#132976` display) are used side by side — easy to conflate but visually intentional.
- **Body text is navy, not gray** (`#0d1c4f`), which is why plain paragraphs still read "blue."
- **Buttons are inconsistent:** most primary CTAs are flat `#19369d`, but the home "CORESight Webinar" button is a brighter horizontal gradient (`#5a5cc7 → #2731c1`) — a one-off that's more attractive than the norm.
- **Declared success green is dead**, and there is **no semantic error token** (the only red is a nav notification badge). Semantics must be invented for the port.
- **No dark theme exists**; the only dark surface is a photographic promo band, so a dark mode is greenfield.
- **Shadows are frequently periwinkle-tinted** (`#c5cde7`) rather than neutral — a subtle brand asset worth keeping.
