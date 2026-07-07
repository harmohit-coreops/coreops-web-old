# CoreOps.ai — Page-by-Page Section Teardowns

Visual anatomy of each key page template, top to bottom. Every section entry names the block, its layout (columns/media), the copy's job, the components used, the background color, and notable styling. Numbers trace to `AGGREGATE-DIGEST.md` and to the desktop screenshots (read at full resolution in vertical bands).

Colors referenced throughout (from the digest's rendered palette):

| Token I use below | Hex | Where it shows up |
|---|---|---|
| Navy‑primary | `#19369d` (declared `--coreops-primary`) | Filled buttons, active tabs, links, Vision card |
| Navy‑deep | `#132976` / `#0d1c4f` | Headings, dark bands, footer text, body text |
| Navy‑ink | `#001858` / `#002d72` | Sub‑headings (H3/H5) |
| Lavender‑band | `#e7ebfb` / `#edf1ff` | Soft section bands, hero gradients |
| Periwinkle | `#c5cde7` | Footer background, image‑card backdrops, world map |
| Section‑gray | `#f9f9f9` / `#fbfbfb` | Alternating neutral sections |
| White | `#ffffff` | Cards, default sections |
| Slate‑muted | `#7a84a3` / `#555555` | Secondary/muted text |

Type: Helvetica Neue throughout, letter‑spacing ~1px almost everywhere. Section H2s are ~40px light‑weight navy; hero H1s ~40–65px; body 17px `#0d1c4f` / lh 25.5; cards radius 10–15px; primary button radius ~6px.

---

## Shared chrome (present on every page)

**Global header (sticky, ~90px tall, white `#ffffff`, subtle bottom shadow).** Left: dandelion mark + `coreops.ai` wordmark logo. Center: horizontal nav — *CoreOps.AI edge · About · Products · Services · Resource hub · Contact us* (navy‑deep text, ~17px, letter‑spacing 1px; Products/Services/Resource hub are dropdown parents). Right: a notification bell icon with a red "1" badge, then a filled **Enquire now** primary button (navy `#19369d`, white text, ~6px radius). The current section link is tinted navy‑primary.

**Floating utility widgets (bottom‑right, every page).** Two navy circular buttons stacked — an envelope/email icon and a chat icon — plus a small "Hi There!" periwinkle speech bubble. Fixed position, overlaps content.

**Global footer.** Full‑width **periwinkle `#c5cde7`** band. Left column: dandelion logo, "Corporate Address / INS 701, Urbtech Trade Centre, Block B, Sector 132, Noida, Uttar Pradesh 201304", and a navy circular LinkedIn icon. Four link columns with navy‑primary headings: **Products** (AgentCORE, DataCORE, CORESight, COREHire, COREServ, CORETrack, Aithra), **About** (Careers, Contact us), **Services** (Enterprise AI services, Enterprise application services), **Resource hub** (AI trends, Press releases, Events, Blogs, Customer success stories, Use cases). Bottom bar: "Copyright © 2026. All rights reserved." left; "Privacy policy | Terms of service" right.

Each page teardown below omits this repeated header/footer except where a page overrides it.

---

## home.png — Homepage (`/`, scrollHeight 10394)

The flagship template. Alternates white and lavender bands; heavy use of carousels.

1. **Hero** — 2‑column, white→lavender radial gradient background. Left: H1 "Empowering enterprises through data and AI" (large, ~65px, navy‑deep), a one‑line subhead ("Modernize systems, automate operations and activate data 2X faster…"), a gold **"Best AI & Technology Startup of the Year 2026"** award laurel badge, then two buttons — **Request a demo** (white/navy outline) and **CORESight Webinar** (navy‑primary filled). Right: a decorative low‑poly indigo "brain/globe" wireframe network illustration on white. Purpose: positioning + primary CTA.
2. **Webinar promo strip** — full‑width **dark band** (`#0d1c4f`/black). Diagonal split: left third holds a white "CORESight **Webinar**" pill, headline "From data overload to instant intelligence", sub "…CXOs are accelerating smarter decision‑making with CORESight", and a **Register now** button; right shows a cut‑out photo of Ankur Sharma (Co‑founder & CTO) plus his bio, a date chip (calendar icon "8th July 2026") and a time chip (clock "4:00–4:45 PM IST"). A thin black bar underneath carries `marketing@coreops.ai`. Notable: only place a hard black/near‑black background and diagonal photo composition appear.
3. **Our products** — lavender/white section. Left‑aligned H2 "Our products" + intro paragraph, then a **3‑up product card carousel** (Prev/Next circular arrows flanking). Cards: white, rounded ~15px, soft shadow; each has a circular line‑icon in a dotted ring, product name (navy‑ink H3), 2‑line description, and a "Know more" link. Cycles AgentCORE, CORESight, DataCORE, CORETrack, COREServ, COREHire, Aithra.
4. **Powering possibilities, delivering value** — white. Section intro, then a 2‑column interactive block: left a vertical **tab/accordion list** ("1. Enabling organizational efficiencies" [active = navy gradient pill, white text], "2. Simplifying engineering workflows", "3. Delivering operational agility" [inactive = gray pills]); right a large white rounded panel with the active tab's heading + a checkmark bullet list. Panel has a soft periwinkle glow shadow.
5. **The stats of success** — white. Left: intro paragraph + two oversized stat numerals "**100+**" (Digital transformation projects) and "**$15B+**" (Business leadership) — ~90px navy‑deep. Right: an overlapping **stacked‑rectangle stat graphic** in graduated blues (`#0d1c4f`→`#19369d`→periwinkle) showing 55+ AI/EA tech resources, 40 EA certifications, 30+ ERP & CRM projects, 20+ AI agent use cases. Notable: the layered offset‑rectangle motif.
6. **Powering the future of enterprise transformation** — white. A large empty rounded‑rectangle **gray placeholder** in the capture; per content it is an interactive/hover graphic with hotspots (AI innovation, Partnerships, Global engineering strength, Leadership, Global business expertise) that did not render in the static screenshot. Treat as an interactive diagram panel.
7. **Trusted by modern enterprises** — white. Centered navy H2, then a **client logo wall** in a bordered grid (4 / 4 / 3): ESME, Panasonic, iValue, CDIL, motherson, HFCL, Hamdard, IFFCO, Synokem, Nürnberg Messe, Dr. Reddy's. Cells are white with thin dividers; logos full‑color.
8. **Partnerships & alliances** — white. Centered H2 + subhead, then a single‑row **partner logo strip** (grayscale‑ish, full‑bleed, scrolls): AWS, Oracle Partner, NVIDIA, Microsoft Azure, Google Cloud, Hewlett Packard Enterprise, Salesforce, (CoreOps mark).
9. **Success stories** — white→lavender. Centered H2 + subhead, then a **3‑up testimonial card carousel** (Prev/Next arrows). Cards: white, rounded, quote + attribution (role/title), tall. Content rotates through ~7 client quotes.
10. **What's new** — white. Centered H2, a small eyebrow line ("ET AI Conclave & Awards Held in February 2026"), then a single **feature card carousel**: text left (navy link title + paragraph) / event photo right, rounded card with shadow, flanked by arrows.
11. **Blogs** — **section‑gray `#f9f9f9`**. Centered H2 + subhead, then a **3‑up blog card carousel**. Blog cards: image (or logo) top, navy link title (truncated "…"), 2‑line excerpt, then a footer row with a date (dd/mm/yyyy, muted) left and a **Read more** navy button right.
12. **Follow us on linkedIn** — white. Centered navy H2 only; below it an (unrendered) LinkedIn feed/embed region.
13. **Frequently asked questions** — white, inside a large rounded card. 2‑column: left an **accordion** (first item open showing answer; chevron up/down toggles; thin rules between rows) of 6 questions; right a photo (smiling woman at laptop) in a rounded frame. Shared FAQ component reused across the site.
14. **Footer** — shared periwinkle footer.

---

## products__agentcore.png — Product deep‑dive template (`/products/agentcore`, 10175)

Canonical product page. CORESight, DataCORE, etc. reuse this shell verbatim.

1. **Hero** — 2‑column, **lavender `#edf1ff`** background. Left: product wordmark ("AgentC🌱RE" with dandelion glyph in the O), H1 "Integrated all‑in‑one platform for MLOps" (two‑tone: navy‑deep + lighter blue), subhead, an underlined micro‑link "Available on Government e‑Marketplace (GeM).", and two buttons — **Explore AgentCORE** (outline) + **Request a demo** (filled). Right: a **laptop mockup** with an embedded product video (native controls "0:00 / 2:19"). CORESight adds a third square download‑icon button here.
2. **Simply intelligent, simple execution.** — white, 2‑column. Left: H2 + two body paragraphs describing the product. Right: a cut‑out photo of a man with a tablet on a rounded **periwinkle `#c5cde7`** panel. Product‑narrative block.
3. **Benefits for enterprise customers** — white, left‑aligned. H2, then a stack of benefit sub‑blocks: navy‑ink H3 ("Faster time to market", "Unified view for all stakeholders", "End‑to‑end integration…", "Automated CI/CD for ML") each with a short line; a couple of inline metric call‑outs ("2x accelerate development cycle", "25% reduce operational costs").
4. **Breaking barriers between people and data** — **lavender** band with a soft radial glow. Left: H2 + three **overlapping outlined "speech‑bubble" cards** (thin navy border, white fill, staggered/cascading) each stating a data pain point. Right: a supporting paragraph. Distinctive stepped‑card motif (identical on CORESight).
5. **Key features / For everyone in the team** — one big rounded panel with a white→periwinkle diagonal gradient. Two stacked headings (small "Key features" eyebrow + large "For everyone in the team"), then a **2‑column feature grid** (~8 items): each has a navy line‑icon, navy‑ink title (Infrastructure setup, Data management, Model development, Experiment management, Model deployments, Monitoring & observability, User roles & permissions, Project management, Audit trails), and a 2‑line description.
6. **Experience effortless insights** — **lavender** band. Centered H2 + subhead, then a **3‑up video card carousel** (white cards with a gray ▶ play glyph placeholder), arrows on the sides.
7. **Customer spotlight** — white→gray. Centered H2 + subhead, then a **3‑up testimonial card carousel** (same card style as homepage success stories).
8. **Use cases** — **lavender** band. Centered H2 + subhead, then a use‑case card (image top, navy title, excerpt, **Read more** navy button) in a carousel; CORESight variant shows a full 3‑up row.
9. **Explore our product brochure** — white. Centered H2 + a single **Download now** filled button. Minimal band.
10. **Frequently asked questions** — white→gray, shared FAQ component (accordion left, woman‑at‑laptop photo right), product‑specific questions.
11. **Related blogs** — **lavender** band. Centered H2 + subhead, then a **3‑up blog card carousel** (image, title, excerpt, date, Read more).
12. **Your conversational AI is a click away** (contact block) — white, 2‑column. Left: H2 + a rounded handshake photo. Right: a bordered **"Get in touch with us"** form card — Full name, Company email, Message (textarea), and a **Connect with us** filled button. Standard product‑page contact form.
13. **Footer** — shared.

---

## products__coresight.png — Product deep‑dive (`/products/coresight`, 9143)

Same template and section order as AgentCORE; content swapped. Confirmed differences worth noting:

1. **Hero** — lavender; wordmark "C🌱RESight", H1 "Your self‑serve AI data expert", subhead, GeM micro‑link, and **three** hero buttons: **Explore CORESight** (outline), **Request a demo** (filled), plus a small square **download** button. Laptop video mockup right ("0:00 / 2:14").
2. **Benefits for enterprise customers** — white, 2‑column; left stacked H2 sub‑blocks ("Built on generative AI for seamless integration and usability", "Accelerating decisions and driving strategic agility"), right a cut‑out photo of a businesswoman with a tablet on a periwinkle panel.
3. **Breaking barriers between people and data** — identical stepped speech‑bubble motif on lavender; right paragraph is CORESight‑specific.
4. **Key features / For everyone in the team** — same gradient panel; feature grid: Plain‑english data access, Instant query generation, Auto visualizations, Enterprise integration, Faster decisions (line icons).
5. **Experience effortless insights** (video carousel, lavender) → **Customer spotlight** (testimonials) → **Use cases** (here a full 3‑up row with real imagery: "Consumer goods — boosting sales…", "…fraud prevention in EMI schemes", "…AI‑powered sales insights & marketing ROI") on lavender → **FAQ** (shared component) → **Related blogs** → **contact block** → footer. Order is otherwise identical to AgentCORE.

---

## enterprise-ai-services.png — Service template (`/enterprise-ai-services`, 7815)

⚠️ **Inconsistency:** the hero H1 on this URL reads **"Enterprise application services"** (the sister page's title), not "Enterprise AI services". A shared/mislabeled hero heading — flag for the port.

1. **Hero** — 2‑column, soft white→periwinkle gradient. Left: H1 (two‑tone navy) + subhead ("Streamline and power your operations with smart, scalable solutions…") + **Request a demo** filled button. Right: a rounded **periwinkle‑panel photo** (woman at dual monitors showing an AI face/code).
2. **AI adoption made easy** — white, centered. H2 + a centered intro paragraph, then a **left‑aligned 6‑item bullet list** of capabilities (End‑to‑end support, Bespoke AI solutions, Clean/secure data pipelines, Seamless integration, Trained in‑house teams, Maintenance support).
3. **Our repertoire of services** — white. Centered H2 + subhead, then a large rounded gradient panel headed "Key features / For everyone in the team" containing a **vertical accordion list** of service rows (AI strategy consulting, Custom AI development, Data services, AI integration, AI maintenance & support, Training & education) — each a rounded pill row with a right‑chevron.
4. **Enterprise AI services across industries** — big rounded gradient panel. Centered H2 + subhead, then a **2×2 industry grid** (Manufacturing, Finance, Healthcare, Retail & E‑commerce), each a navy‑ink mini‑heading + paragraph.
5. **Use cases** — **lavender** band. Centered H2 + subhead + **3‑up image card row** (Read more buttons).
6. **Our partners in growth** — white. Centered H2 + subhead + the **partner logo strip** (AWS, Oracle, NVIDIA, Azure, Google Cloud, HPE, Salesforce).
7. **Experience effortless insights** — lavender, centered H2 + subhead + **3‑up video card carousel** (play‑glyph placeholders).
8. **Frequently asked questions** — white→gray, shared FAQ (accordion left / woman photo right). First answer expands a multi‑level bulleted taxonomy (AI as a Service, AI Consulting, AI Product Suite).
9. **Your conversational AI is a click away** — contact block (handshake photo left, Get‑in‑touch form right, Connect with us).
10. **Footer** — shared.

---

## resource-hub.png — Resource hub landing (`/resource-hub`, 2544)

Short "directory" template shared by resource‑hub index/category pages.

1. **Hero** — **lavender `#e7ebfb`** band, **centered**. H2 "Techtalks & trends" (black), centered subhead ("From emerging trends and technology conversations to expert takes— stay ahead, stay informed."), a centered **Request a demo** filled button, then a horizontal **category filter/tab bar** with left/right chevrons: *Customer success stories* (active — underlined navy), *Use cases*, *Press releases*, *Brochures* (inactive — muted). The tab bar is the page's primary navigation device.
2. **Resource card grid** — white. A **3‑column card grid** (8 cards here). Cards: image top (rounded top corners), navy link title, and a footer row where present with a **Read more** navy button. No pagination visible; grid fills to content.
3. **Ready to create your own success story?** — white, centered **CTA band**: H2 + subhead ("Our team is ready to help you transform your enterprise operations with AI.") + **Request a demo** filled button.
4. **Footer** — shared.

---

## resource-hub__blogs.png — Blog listing (`/resource-hub/blogs`, 3654)

Same directory template as resource‑hub, with the tab bar shifted to blog categories.

1. **Hero** — lavender, centered "Techtalks & trends" + subhead + Request a demo + **tab bar** now reading *Blogs* (active, underlined) · *Events* · *AI trends* · *Customer success stories*, with chevrons.
2. **Blog card grid** — white, **3‑column grid** (~11 cards across ~4 rows). Blog cards: image or centered product/brand logo on a light panel, navy link title, 2‑line excerpt, footer row = date (muted) + **Read more** navy button. Some cards use the CoreOps/COREServ logo as the thumbnail.
3. **Ready to create your own success story?** — white centered CTA band (H2 + subhead + Request a demo), sitting above a thin navy top rule.
4. **Footer** — shared.

---

## resource-hub__blogs__the-making-of-coreops-ai.png — Blog article template (`/resource-hub/blogs/…`, 3293)

1. **Header band** — full‑width **navy `#0d1c4f`** block (~370px) with a faint constellation/network line motif in the top corners. Acts as a decorative masthead spacer; the article title is not printed here (it appears below the image).
2. **Article body (2‑column)** — white.
   - **Left (main column):** a large rounded **featured image**; a meta line "Published on : 23/06/2025 | Read time : 3 minutes"; the **H2 article title** ("The making of CoreOps.AI"); flowing body paragraphs (17px navy‑deep) with inline navy links, plus bulleted lists. At the end, an **"About the author" card** — light gray `#f9f9f9` rounded box with author name, role ("CEO @ CoreOps.AI"), contact links (email, website), and a **Request a demo** filled button.
   - **Right (sticky sidebar):** an **"Interested in CoreOps.AI?"** bordered card (heading + blurb + Request a demo button), then an **"Related posts"** heading and a **vertical stack of related‑post cards** (image, navy title, excerpt, date, Read more).
3. **Footer** — shared. (No FAQ/CTA band on article pages.)

---

## resource-hub__use-cases__pharmaco-demand-forecasting-promo-planning-with-agentcore.png — Use‑case article (`/resource-hub/use-cases/…`, 3290)

Same article shell as the blog template.

1. **Header band** — navy `#0d1c4f` masthead with corner constellation motif.
2. **Article body (2‑column)** — white.
   - **Left:** rounded featured image (charts/tablet); **H2 title** "PharmaCo – Demand forecasting & promo planning with AgentCORE"; intro paragraph; then structured **H3 subsections** (Challenge, AgentCORE in action, AgentCORE workflow → "1. Data ingestion & preparation", "2. Model training", "3. Model deployment", MLOps built‑in, Customer impact) each followed by bullet lists; a closing summary paragraph. More heavily structured (numbered process + metric bullets) than a narrative blog.
   - **Right:** **"Related posts"** sidebar — vertical cards (AutoPartsCo predictive maintenance, Retail churn prediction, Foreign object detection…), each image + title + excerpt + Read more. (An "Interested in CoreOps.AI?" card appears at the very top of the sidebar as on blogs.)
3. **Footer** — shared.

---

## about.png — About (`/about`, 9248)

Longest editorial template; many carousels and a mission/values narrative.

1. **Hero** — **full‑bleed team group photo** (edge‑to‑edge, ~950px tall) with a centered **translucent blue glass card** holding white H1 "When people with purpose meet AI" and sub "The story behind CoreOps.AI". The only full‑bleed photographic hero on the site.
2. **Our founders** — **lavender** band. Centered H2 + subhead, then a **2‑column grid of founder cards** (Rajiv Srivastava — CEO, Ankur Sharma — CTO, Rajesh Janey — CRO, Rajnish Gupta — COO). Card = portrait on light‑gray top, white lower area with name + role (muted) + **Read more** navy button + a navy LinkedIn icon.
3. **Our leadership** — a large rounded panel on a **blue gradient** background (white top → indigo bottom). Centered H2 + subhead, then a **3‑up leadership card carousel** (same card style; Harmohit Singh, Reshma Sinha Roy, Sandeep Bhatnagar…) with circular arrows.
4. **Our story** — white. Centered H2, then 2‑column: left navy‑ink H3 "Driving the future with AI" + paragraph; right a rounded team photo (people on a staircase).
5. **The dandelion effect** — white. 2‑column: left the big **dandelion logo illustration** on a soft radial periwinkle glow; right H3 "The dandelion effect" + paragraph. Carousel **pager dots** (2 slides) beneath. Brand‑story block.
6. **Rooted in purpose, powered by AI.** — section‑gray gradient. Left‑aligned H2, then 2‑column: left a pair of **overlapping cards** — **Vision** (navy‑primary `#19369d` filled, white text) stacked over **Mission** (white card); right supporting paragraphs. Notable: the filled‑over‑white overlapping card treatment.
7. **The CoreOps.AI way** — centered H2 + subhead (values intro).
8. **What grounds us** (core values) — centered H2 + subhead, **3‑up value‑card carousel** with arrows (Integrity & candour, Respect & trust, Teamwork for results) — blue card titles, muted body.
9. **Who we are as leaders** — centered H2 + subhead, **3‑up attribute‑card carousel** (Visionary & mission‑aligned, Inclusive & people‑focused, Accountable & driven for results).
10. **How we work every day** — centered H2 + subhead, a **coverflow/center‑stage carousel**: an enlarged focused white card ("Bias for action") flanked by faded side cards, arrows.
11. **Our global footprint** — white. Centered H2 + subhead, then a **periwinkle world‑map silhouette** with navy location pins + labels (Chicago USA, London UK, Noida & Gurugram India, Singapore, Sydney Australia).
12. **Frequently asked questions** — white→gray, shared FAQ (accordion left / woman photo right).
13. **Footer** — shared.

---

## careers.png — Careers (`/careers`, 5518)

1. **Hero** — 2‑column, soft white→periwinkle gradient. Left: H1 "Build the future with us" (navy) + subhead + **Get in touch** filled button. Right: cut‑out photo of a man (arms crossed, looking up) on a rounded **periwinkle** panel.
2. **Internship opportunities** — **section‑gray** band, centered. H2 + subhead + a plain "**Coming soon**" line (placeholder state — no listings).
3. **A culture of integrity and growth** — white→lavender. Centered H2 + subhead, then a **3‑column culture‑card grid** (Diversity, equity, and inclusion / Work‑life balance / Learning and growth). Each card stacks multiple blue sub‑headings + gray descriptions; cards have a subtle periwinkle gradient fill.
4. **Voices of CoreOps.AI** — **lavender** band. Centered H2 + subhead, **3‑up employee‑testimonial card carousel** (name + quote; white cards) with arrows.
5. **Moments captured** — white. Centered H2 + subhead, then a large **image carousel** of culture/event photos (arrows).
6. **Join the CoreOps.AI family** (application block) — white, 2‑column. Left: H2 + handshake photo. Right: an extended **"Get in touch with us" application form card** — Full name, Email, Phone number, Company name, Qualification, Linkedin URL, Your Skills (textarea), Your message (textarea), **Upload Resume (PDF/DOC, max 2MB)** file input, and a **Send message** filled button. The richest form on the site (vs. the 3‑field product contact form).
7. **Footer** — shared.

---

## contact-us.png — Contact (`/contact-us`, 1747)

Shortest page; a single form card under a navy masthead.

1. **Header band** — full‑width **navy `#0d1c4f`** block with white left‑aligned H1 "Contact us" (large) and a faint constellation graphic top‑right. Same masthead band used by article/detail pages.
2. **Contact card** — white, one large rounded card, 2‑column:
   - **Left:** H2 "Get in touch with CoreOps.AI" + intro paragraph, then a **contact list** with navy pin icons — Noida & Gurgaon India, London UK, Sydney Australia, Singapore, Chicago USA — and an envelope row `marketing@coreops.ai`.
   - **Right:** H2 "Send us a message" + subhead, then the **message form** — Full name, Work email, Company name, Phone number, Your message (textarea), a **consent checkbox** ("I agree to the Terms of service and Privacy policy…"), and a **Send message** filled button.
3. **Footer** — shared.

---

## coreops-ai-edge.png — CoreOps AI Edge overview (`/coreops-ai-edge`, 7982)

A "product ecosystem" landing that stitches together tabbed product showcases, feature grids, a coverflow, and social proof.

1. **Hero** — 2‑column, soft white→periwinkle gradient. Left: H1 "Unlock efficiency with the CoreOps.AI edge" (two‑tone navy) + subhead + **Request a demo** filled button. Right: a rounded **periwinkle‑panel photo** (three professionals with devices).
2. **Redefining enterprise AI solutions** — **lavender `#e7ebfb`** band. Centered H2 + subhead, then a **product tab switcher** (AgentCORE [active, underlined navy] · DataCORE · CORESight), a **laptop mockup** showing the selected product UI, a description paragraph, a **Learn more** filled button, and below it a **3‑up feature row** (Build & Train, Collaborate, Deploy — small icons) that continues into a second row (Optimize, Integration) — a 5‑item feature card set on light panels.
3. **SAP BTP accelerators** — lavender. Centered H2 + subhead, then a second **product tab switcher** (COREHire [active] · COREServ · CORETrack), laptop mockup with a ▶ play overlay, the product logo, two description paragraphs, and a **"Key benefit"** accordion/expander row.
4. **Your edge in intelligent operations** — section‑gray. Centered H2 + subhead, then a **coverflow/center‑stage carousel** (enlarged focused white card "Enterprise‑grade expertise" flanked by faded side cards, arrows).
5. **Customer success stories** — **lavender** band. Centered H2 + subhead, **3‑up success‑story card carousel** (image + title + Read more).
6. **Our partners in growth** — white. Centered H2 + subhead + **partner logo strip** (AWS, Oracle, NVIDIA, Azure, Google Cloud, HPE, Salesforce).
7. **Frequently asked questions** — white→gray, shared FAQ (accordion left / woman photo right).
8. **Your conversational AI is a click away** — contact block (handshake photo left, "Get in touch with us" 3‑field form right, Connect with us button).
9. **Footer** — shared.

---

## Synthesis — the shared section‑pattern vocabulary

The whole site is assembled from a small kit of repeatable section blocks and three page skeletons. A designer can rebuild almost any page by sequencing these.

**Page skeletons**
- **Marketing skeleton** (home, product deep‑dives, enterprise‑ai‑services, coreops‑ai‑edge, careers, about): `sticky header → split hero → alternating content bands → social proof → FAQ → contact/CTA block → periwinkle footer`.
- **Directory skeleton** (resource‑hub, blogs, and category indexes): `header → centered lavender hero with tab/filter bar → 3‑column card grid → "Ready to create your own success story?" CTA band → footer`.
- **Article skeleton** (blog posts, use‑case details): `header → navy constellation masthead → 2‑column (article body + Related‑posts/"Interested?" sidebar) → footer`. No FAQ/CTA band.

**Recurring section blocks (the reusable Lego set)**
1. **Split hero** — text + CTA(s) left, media right (photo on a periwinkle panel, laptop video mockup, or wireframe illustration). Two‑tone navy H1. About is the exception (full‑bleed photo + glass caption); Contact/articles use a flat navy masthead instead.
2. **Product/feature card carousel** — 3‑up white rounded cards with circular Prev/Next arrows. Used for products, blogs, testimonials, success stories, videos.
3. **Icon feature grid** — 2‑column (or 2×N) line‑icon + title + blurb, usually inside a white→periwinkle gradient panel labeled "Key features / For everyone in the team".
4. **Tab switcher + laptop mockup** — underlined active tab over a device mockup (coreops‑ai‑edge product showcases; product hero videos).
5. **Stepped speech‑bubble cards** — three cascading outlined cards stating pain points ("Breaking barriers between people and data").
6. **Stat block** — oversized numerals + a layered offset‑rectangle graphic in graduated blues.
7. **Logo walls** — bordered client grid ("Trusted by modern enterprises") and a full‑bleed partner strip ("Partnerships & alliances" / "Our partners in growth").
8. **Coverflow/center‑stage carousel** — enlarged focused card between faded neighbors (About values, edge "Your edge…").
9. **Shared FAQ** — rounded card, accordion left + smiling‑woman‑at‑laptop photo right.
10. **Contact/CTA closer** — either the 2‑column "Your conversational AI is a click away" (photo + "Get in touch with us" form) or a centered "Request a demo / Ready to create your own success story?" band.
11. **Periwinkle footer** — identical everywhere.

**Rhythm & color logic:** sections alternate **white / section‑gray `#f9f9f9` / lavender `#e7ebfb`** to separate blocks; **navy `#0d1c4f`** is reserved for high‑drama moments (webinar strip, article/contact mastheads, stat graphic); **periwinkle `#c5cde7`** anchors image panels and the footer; **navy‑primary `#19369d`** is the single accent for filled buttons, active tabs, and links. Every band is centered‑heading + subhead except heroes and a few left‑aligned intros. Carousels are the dominant interaction pattern — nearly every content type is presented as a 3‑up arrow carousel.

**Inconsistencies flagged for the rebuild:**
- `enterprise-ai-services` hero H1 says "Enterprise application **services**" (wrong label for the URL).
- Home "Powering the future of enterprise transformation" renders as an empty gray panel (interactive hotspot graphic that didn't capture) — confirm intended content when porting.
- The declared CSS tokens (`--coreops-secondary #f0f7ff`, `--coreops-text #1f2937`, `--coreops-success #10b981`) barely match the rendered palette, which leans on `#0d1c4f`/`#132976`/`#c5cde7`/`#e7ebfb`; treat the rendered values as ground truth.
- `helvetica_neue_thin` class is applied to body/most text but renders at weight ~400–600, not thin — do not map class names to weights literally.
