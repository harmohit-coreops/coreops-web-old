import { chromium, devices } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = '/Users/harmohitsingh/Documents/coreops/projects/coreops-website/old-website-artifacts';
const BASE = 'https://www.coreops.ai';
const HOSTS = new Set(['www.coreops.ai', 'coreops.ai']);
const CONCURRENCY = 4;
const MODE = process.argv[2] || 'full';          // 'smoke' | 'full'
const NAV_TIMEOUT = 45000;

const dir = (...p) => path.join(OUT, ...p);
await fs.mkdir(dir('screenshots/desktop'), { recursive: true });
await fs.mkdir(dir('screenshots/mobile'), { recursive: true });
await fs.mkdir(dir('html'), { recursive: true });
await fs.mkdir(dir('design-data'), { recursive: true });
await fs.mkdir(dir('content'), { recursive: true });
await fs.mkdir(dir('assets/fonts'), { recursive: true });

function normalize(u) {
  try {
    const url = new URL(u, BASE);
    if (!HOSTS.has(url.hostname)) return null;
    if (!/^https?:$/.test(url.protocol)) return null;
    // skip obvious non-page assets
    if (/\.(png|jpe?g|gif|svg|webp|pdf|zip|mp4|webm|woff2?|ttf|otf|ico|css|js|json|xml)$/i.test(url.pathname)) return null;
    url.hash = '';
    url.search = '';
    url.hostname = 'www.coreops.ai';
    url.protocol = 'https:';
    let p = url.pathname;
    if (p.length > 1) p = p.replace(/\/+$/, '');
    url.pathname = p;
    return url.toString();
  } catch { return null; }
}

function slugFor(u, idx) {
  let p = new URL(u).pathname.replace(/^\/|\/$/g, '');
  if (!p) return 'home';
  let s = p.replace(/\//g, '__').replace(/[^a-zA-Z0-9._-]/g, '-');
  if (s.length > 150) s = s.slice(0, 150) + '_' + idx;
  return s;
}

// ---- 1. Gather sitemap URLs (fetch + recurse sitemapindex) ----
async function getSitemapUrls() {
  const urls = new Set();
  const queue = [`${BASE}/sitemap.xml`];
  const seen = new Set();
  while (queue.length) {
    const sm = queue.pop();
    if (seen.has(sm)) continue;
    seen.add(sm);
    try {
      const res = await fetch(sm);
      if (!res.ok) continue;
      const xml = await res.text();
      const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1].trim());
      for (const loc of locs) {
        if (/\.xml($|\?)/i.test(loc)) queue.push(loc);
        else { const n = normalize(loc); if (n) urls.add(n); }
      }
    } catch (e) { console.error('sitemap fail', sm, e.message); }
  }
  return urls;
}

// ---- 2. Link-discovery BFS (concurrent) to catch orphan pages ----
async function discover(browser, seeds) {
  const found = new Set(seeds);
  const queue = [...seeds];
  const visited = new Set();
  const CAP = 400;
  let active = 0, processed = 0;
  const workers = await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (compatible; CoreOpsArchiver/1.0)' });
    const page = await ctx.newPage();
    page.setDefaultTimeout(20000);
    return { ctx, page };
  }));
  async function loop(w) {
    while (true) {
      if (queue.length === 0) {
        if (active === 0) return;
        await new Promise(r => setTimeout(r, 120));
        continue;
      }
      const u = queue.shift();           // no await before active++ => no race
      if (visited.has(u)) continue;
      visited.add(u);
      active++;
      try {
        await w.page.goto(u, { waitUntil: 'domcontentloaded', timeout: 25000 });
        const hrefs = await w.page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')));
        for (const h of hrefs) {
          const n = normalize(h);
          if (n && !found.has(n) && found.size < CAP) { found.add(n); queue.push(n); }
        }
      } catch { /* ignore nav errors during discovery */ }
      active--;
      if (++processed % 20 === 0) console.log(`  discovery: visited ${processed}, known ${found.size}`);
    }
  }
  await Promise.all(workers.map(loop));
  for (const w of workers) await w.ctx.close();
  return found;
}

async function autoScroll(page) {
  try {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0; const step = 500; const max = 60000;
        const timer = setInterval(() => {
          window.scrollBy(0, step); total += step;
          if (total >= document.body.scrollHeight + 1500 || total > max) { clearInterval(timer); resolve(); }
        }, 80);
      });
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(700);
  } catch { /* ignore */ }
}

async function dismissBanners(page) {
  const texts = ['Accept all', 'Accept All', 'Accept', 'I agree', 'Got it', 'Allow all', 'Agree'];
  for (const t of texts) {
    try {
      const btn = page.getByRole('button', { name: t, exact: false });
      if (await btn.first().isVisible({ timeout: 400 })) { await btn.first().click({ timeout: 800 }); await page.waitForTimeout(300); return; }
    } catch { /* ignore */ }
  }
}

const EXTRACT = () => {
  const cs = (el) => getComputedStyle(el);
  const sample = (el) => el ? {
    tag: el.tagName.toLowerCase(),
    text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90),
    fontFamily: cs(el).fontFamily, fontSize: cs(el).fontSize, fontWeight: cs(el).fontWeight,
    lineHeight: cs(el).lineHeight, letterSpacing: cs(el).letterSpacing, textTransform: cs(el).textTransform,
    color: cs(el).color, backgroundColor: cs(el).backgroundColor,
    marginTop: cs(el).marginTop, marginBottom: cs(el).marginBottom,
    padding: cs(el).padding, borderRadius: cs(el).borderRadius,
  } : null;

  const all = Array.from(document.querySelectorAll('body *'));
  const fontFreq = {}, colorFreq = {}, bgFreq = {}, sizeFreq = {}, weightFreq = {}, radiusFreq = {}, shadowFreq = {};
  for (const el of all) {
    const c = cs(el);
    const hasText = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim());
    if (hasText) {
      fontFreq[c.fontFamily] = (fontFreq[c.fontFamily] || 0) + 1;
      colorFreq[c.color] = (colorFreq[c.color] || 0) + 1;
      sizeFreq[c.fontSize] = (sizeFreq[c.fontSize] || 0) + 1;
      weightFreq[c.fontWeight] = (weightFreq[c.fontWeight] || 0) + 1;
    }
    const bg = c.backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') bgFreq[bg] = (bgFreq[bg] || 0) + 1;
    const r = c.borderRadius; if (r && r !== '0px') radiusFreq[r] = (radiusFreq[r] || 0) + 1;
    const sh = c.boxShadow; if (sh && sh !== 'none') shadowFreq[sh] = (shadowFreq[sh] || 0) + 1;
  }
  const top = (o, n = 30) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);

  const vars = {};
  for (const sheet of Array.from(document.styleSheets)) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    if (!rules) continue;
    for (const rule of Array.from(rules)) {
      if (rule.style && rule.selectorText && /(:root|^html|\bhtml\b|\bbody\b)/.test(rule.selectorText)) {
        for (const prop of Array.from(rule.style)) {
          if (prop.startsWith('--')) vars[prop] = rule.style.getPropertyValue(prop).trim();
        }
      }
    }
  }

  const headings = {};
  for (const h of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) headings[h] = sample(document.querySelector(h));
  const paragraph = sample(document.querySelector('main p, article p, section p, p'));
  const buttons = Array.from(document.querySelectorAll('a[class*=button i], button, .button, [class*=btn i], a[class*=cta i]')).slice(0, 8).map(sample);
  const linkSample = sample(document.querySelector('main a, article a, a'));

  const containers = Array.from(document.querySelectorAll('div,section,main,header,footer,article'))
    .map(e => ({ tag: e.tagName.toLowerCase(), cls: (typeof e.className === 'string' ? e.className : '').slice(0, 70), maxWidth: cs(e).maxWidth, width: Math.round(e.getBoundingClientRect().width), pl: cs(e).paddingLeft, pr: cs(e).paddingRight, pt: cs(e).paddingTop, pb: cs(e).paddingBottom }))
    .filter(c => c.maxWidth !== 'none' && parseInt(c.maxWidth) > 400).slice(0, 20);

  const fonts = Array.from(document.fonts).map(f => ({ family: f.family, weight: f.weight, style: f.style, status: f.status }));
  const resources = performance.getEntriesByType('resource').map(e => e.name);
  const meta = {
    title: document.title,
    description: (document.querySelector('meta[name=description]') || {}).content || '',
    ogTitle: (document.querySelector('meta[property="og:title"]') || {}).content || '',
    ogImage: (document.querySelector('meta[property="og:image"]') || {}).content || '',
    h1: ((document.querySelector('h1') || {}).textContent || '').trim().slice(0, 160),
    lang: document.documentElement.lang,
    viewportWidth: window.innerWidth,
    scrollHeight: document.body.scrollHeight,
  };
  const bodyBg = cs(document.body).backgroundColor;
  const htmlBg = cs(document.documentElement).backgroundColor;
  const images = Array.from(document.querySelectorAll('img')).slice(0, 80).map(i => ({ src: i.currentSrc || i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }));
  const navLinks = Array.from(document.querySelectorAll('nav a, header a')).map(a => ({ text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50), href: a.href })).slice(0, 80);
  const footerLinks = Array.from(document.querySelectorAll('footer a')).map(a => ({ text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50), href: a.href })).slice(0, 100);
  const sectionCount = document.querySelectorAll('section').length;

  return {
    meta, vars, headings, paragraph, buttons, linkSample, containers, fonts, bodyBg, htmlBg,
    fontFamilies: top(fontFreq), colors: top(colorFreq), backgrounds: top(bgFreq), fontSizes: top(sizeFreq),
    fontWeights: top(weightFreq), borderRadii: top(radiusFreq), boxShadows: top(shadowFreq, 12),
    images, navLinks, footerLinks, sectionCount, resources,
  };
};

const fontUrls = new Set();

async function capture(browser, mobileDevice, url, slug) {
  const rec = { url, slug, ok: false, errors: [] };
  // ----- Desktop -----
  let ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' });
  let page = await ctx.newPage();
  page.setDefaultTimeout(NAV_TIMEOUT);
  try {
    let resp;
    try { resp = await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT }); }
    catch { resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT }); await page.waitForTimeout(2500); }
    rec.status = resp ? resp.status() : null;
    await dismissBanners(page);
    await autoScroll(page);
    const design = await page.evaluate(EXTRACT);
    for (const r of design.resources) if (/\.(woff2?|ttf|otf)(\?|$)/i.test(r)) fontUrls.add(r.split('?')[0]);
    delete design.resources;
    rec.title = design.meta.title;
    rec.scrollHeight = design.meta.scrollHeight;
    await fs.writeFile(dir('design-data', slug + '.json'), JSON.stringify(design, null, 2));
    const html = await page.content();
    await fs.writeFile(dir('html', slug + '.html'), html);
    const text = await page.evaluate(() => (document.body.innerText || '').replace(/\n{3,}/g, '\n\n').trim());
    await fs.writeFile(dir('content', slug + '.txt'), `URL: ${url}\nTITLE: ${design.meta.title}\n\n${text}`);
    await page.screenshot({ path: dir('screenshots/desktop', slug + '.png'), fullPage: true });
    rec.ok = true;
  } catch (e) { rec.errors.push('desktop: ' + e.message); }
  await ctx.close();

  // ----- Mobile -----
  ctx = await browser.newContext({ ...mobileDevice, deviceScaleFactor: 2 });
  page = await ctx.newPage();
  page.setDefaultTimeout(NAV_TIMEOUT);
  try {
    try { await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT }); }
    catch { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT }); await page.waitForTimeout(2500); }
    await dismissBanners(page);
    await autoScroll(page);
    await page.screenshot({ path: dir('screenshots/mobile', slug + '.png'), fullPage: true });
  } catch (e) { rec.errors.push('mobile: ' + e.message); }
  await ctx.close();
  return rec;
}

// ---- pool ----
async function pool(items, worker, n) {
  const results = new Array(items.length);
  let i = 0;
  async function run() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: n }, run));
  return results;
}

// ===== main =====
console.log('== fetching sitemaps ==');
const smUrls = await getSitemapUrls();
console.log(`sitemap URLs: ${smUrls.size}`);

const browser = await chromium.launch();
const mobileDevice = devices['iPhone 13'];

let universe;
if (MODE === 'smoke') {
  universe = new Set([`${BASE}/`, `${BASE}/products/agentcore`, `${BASE}/resource-hub/blogs/the-making-of-coreops-ai`]);
} else {
  console.log('== link-discovery BFS ==');
  universe = await discover(browser, smUrls);
}
const urls = [...universe].sort();
console.log(`TOTAL pages to capture: ${urls.length}`);
await fs.writeFile(dir('urls.txt'), urls.join('\n'));

const items = urls.map((u, idx) => ({ u, slug: slugFor(u, idx) }));
let done = 0;
const records = await pool(items, async ({ u, slug }) => {
  const r = await capture(browser, mobileDevice, u, slug);
  done++;
  console.log(`[${done}/${items.length}] ${r.ok ? 'OK ' : 'ERR'} ${r.status || ''} ${u}${r.errors.length ? ' :: ' + r.errors.join(' | ') : ''}`);
  return r;
}, CONCURRENCY);

// download fonts (dedup)
console.log(`== downloading ${fontUrls.size} font files ==`);
for (const fu of fontUrls) {
  try {
    const res = await fetch(fu);
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    const name = fu.split('/').pop().split('?')[0];
    await fs.writeFile(dir('assets/fonts', name), buf);
  } catch (e) { console.error('font dl fail', fu, e.message); }
}

await fs.writeFile(dir('manifest.json'), JSON.stringify({
  generatedFrom: BASE, mode: MODE, total: records.length,
  sitemapCount: smUrls.size, fonts: [...fontUrls], pages: records,
}, null, 2));

await browser.close();
const okCount = records.filter(r => r.ok).length;
console.log(`\nDONE. ${okCount}/${records.length} captured OK. Fonts: ${fontUrls.size}`);
console.log('Failures:', records.filter(r => !r.ok).map(r => r.url).join(', ') || 'none');
