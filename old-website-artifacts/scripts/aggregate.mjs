import fs from 'node:fs';
import path from 'node:path';

const OUT = '/Users/harmohitsingh/Documents/coreops/projects/coreops-website/old-website-artifacts';
const DD = path.join(OUT, 'design-data');
const files = fs.readdirSync(DD).filter(f => f.endsWith('.json') && !f.startsWith('_'));
const manifest = JSON.parse(fs.readFileSync(path.join(OUT, 'manifest.json'), 'utf8'));

function rgbToHex(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return str;
  const parts = m[1].split(',').map(s => s.trim());
  const [r, g, b] = parts.map(Number);
  const a = parts[3] !== undefined ? Number(parts[3]) : 1;
  if ([r, g, b].some(n => Number.isNaN(n))) return str;
  const hex = '#' + [r, g, b].map(n => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')).join('');
  return a < 1 ? `${hex} (a=${a})` : hex;
}

const merge = {};
const add = (bucket, key, n = 1) => { merge[bucket] ??= {}; merge[bucket][key] = (merge[bucket][key] || 0) + n; };

const headingSigs = { h1: {}, h2: {}, h3: {}, h4: {}, h5: {}, h6: {} };
const buttonSigs = {};
const paragraphSigs = {};
const containerWidths = {};
const containerPads = {};
const cssVars = {};      // name -> {value: count}
const fontsDeclared = {};
const bodyBgs = {};
const perPage = [];
const imageHosts = {};
const sampleImages = new Set();

function sig(s) {
  if (!s) return null;
  return `${s.fontFamily} | ${s.fontSize} | w${s.fontWeight} | lh${s.lineHeight} | ls${s.letterSpacing} | ${s.textTransform} | ${rgbToHex(s.color)}`;
}

for (const f of files) {
  const d = JSON.parse(fs.readFileSync(path.join(DD, f), 'utf8'));
  perPage.push({ slug: f.replace('.json', ''), title: d.meta.title, h1: d.meta.h1, desc: d.meta.description, sections: d.sectionCount, scrollHeight: d.meta.scrollHeight });
  for (const [k, c] of d.fontFamilies || []) add('fontFamilies', k, c);
  for (const [k, c] of d.colors || []) add('colors', rgbToHex(k), c);
  for (const [k, c] of d.backgrounds || []) add('backgrounds', rgbToHex(k), c);
  for (const [k, c] of d.fontSizes || []) add('fontSizes', k, c);
  for (const [k, c] of d.fontWeights || []) add('fontWeights', k, c);
  for (const [k, c] of d.borderRadii || []) add('borderRadii', k, c);
  for (const [k, c] of d.boxShadows || []) add('boxShadows', k, c);
  for (const [name, val] of Object.entries(d.vars || {})) { cssVars[name] ??= {}; cssVars[name][val] = (cssVars[name][val] || 0) + 1; }
  for (const [lvl, s] of Object.entries(d.headings || {})) { const sg = sig(s); if (sg) headingSigs[lvl][sg] = (headingSigs[lvl][sg] || 0) + 1; }
  for (const b of d.buttons || []) { const sg = sig(b); if (sg && b.text) buttonSigs[`${sg} | pad:${b.padding} | r:${b.borderRadius} | bg:${rgbToHex(b.backgroundColor)}`] = (buttonSigs[`${sg} | pad:${b.padding} | r:${b.borderRadius} | bg:${rgbToHex(b.backgroundColor)}`] || 0) + 1; }
  const pg = sig(d.paragraph); if (pg) paragraphSigs[pg] = (paragraphSigs[pg] || 0) + 1;
  for (const c of d.containers || []) { if (c.maxWidth) containerWidths[c.maxWidth] = (containerWidths[c.maxWidth] || 0) + 1; if (c.pl) containerPads[`${c.pl}/${c.pr}`] = (containerPads[`${c.pl}/${c.pr}`] || 0) + 1; }
  for (const fo of d.fonts || []) fontsDeclared[`${fo.family} (w${fo.weight} ${fo.style})`] = (fontsDeclared[`${fo.family} (w${fo.weight} ${fo.style})`] || 0) + 1;
  bodyBgs[rgbToHex(d.bodyBg)] = (bodyBgs[rgbToHex(d.bodyBg)] || 0) + 1;
  for (const im of d.images || []) { try { const h = new URL(im.src).host; imageHosts[h] = (imageHosts[h] || 0) + 1; } catch {} if (im.src && sampleImages.size < 120) sampleImages.add(im.src); }
}

const sortObj = (o, n = 60) => Object.fromEntries(Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n));
const px = k => parseFloat(k) || 0;
const sortSizes = o => Object.fromEntries(Object.entries(o).sort((a, b) => px(b[0]) - px(a[0])));

const aggregate = {
  totalPages: perPage.length,
  colors: sortObj(merge.colors, 80),
  backgrounds: sortObj(merge.backgrounds, 50),
  bodyBackgrounds: bodyBgs,
  fontFamiliesByTextNodeCount: sortObj(merge.fontFamilies, 30),
  fontsDeclared: Object.keys(fontsDeclared).sort(),
  fontSizesByFrequency: sortObj(merge.fontSizes, 60),
  fontSizesDescending: sortSizes(merge.fontSizes),
  fontWeights: sortObj(merge.fontWeights, 20),
  borderRadii: sortObj(merge.borderRadii, 30),
  boxShadows: sortObj(merge.boxShadows, 20),
  cssVars,
  containerMaxWidths: sortObj(containerWidths, 30),
  containerHorizontalPadding: sortObj(containerPads, 30),
  headingStyleSignatures: Object.fromEntries(Object.entries(headingSigs).map(([k, v]) => [k, sortObj(v, 12)])),
  paragraphStyleSignatures: sortObj(paragraphSigs, 12),
  buttonStyleSignatures: sortObj(buttonSigs, 20),
  imageHosts,
  sampleImageUrls: [...sampleImages],
  pages: perPage.sort((a, b) => a.slug.localeCompare(b.slug)),
};

fs.writeFileSync(path.join(DD, '_aggregate.json'), JSON.stringify(aggregate, null, 2));

// ---- human-readable digest ----
const L = [];
L.push('# CoreOps.ai — Aggregate Design Data Digest');
L.push(`\nAuto-generated from computed styles across all ${aggregate.totalPages} captured pages. Frequencies = number of text nodes / elements exhibiting the value (summed across pages).\n`);
L.push('## CSS Custom Properties (design tokens defined in stylesheet)');
for (const [name, vals] of Object.entries(cssVars)) L.push(`- \`${name}\`: ${Object.entries(vals).map(([v, c]) => `${v} (${c}p)`).join(', ')}`);
L.push('\n## Colors — text/foreground (hex, by frequency)');
for (const [k, c] of Object.entries(aggregate.colors)) L.push(`- ${k} — ${c}`);
L.push('\n## Backgrounds (hex, by frequency)');
for (const [k, c] of Object.entries(aggregate.backgrounds)) L.push(`- ${k} — ${c}`);
L.push('\n## Body background colors'); for (const [k, c] of Object.entries(bodyBgs)) L.push(`- ${k} — ${c} pages`);
L.push('\n## Font families (by text-node usage)');
for (const [k, c] of Object.entries(aggregate.fontFamiliesByTextNodeCount)) L.push(`- ${k} — ${c}`);
L.push('\n## Fonts declared (@font-face / document.fonts)'); for (const f of aggregate.fontsDeclared) L.push(`- ${f}`);
L.push('\n## Font sizes (descending px → frequency)');
for (const [k, c] of Object.entries(aggregate.fontSizesDescending)) L.push(`- ${k} — ${c}`);
L.push('\n## Font weights'); for (const [k, c] of Object.entries(aggregate.fontWeights)) L.push(`- ${k} — ${c}`);
L.push('\n## Border radii'); for (const [k, c] of Object.entries(aggregate.borderRadii)) L.push(`- ${k} — ${c}`);
L.push('\n## Box shadows'); for (const [k, c] of Object.entries(aggregate.boxShadows)) L.push(`- ${k} — ${c}`);
L.push('\n## Container max-widths'); for (const [k, c] of Object.entries(aggregate.containerMaxWidths)) L.push(`- ${k} — ${c}`);
L.push('\n## Container horizontal padding (left/right)'); for (const [k, c] of Object.entries(aggregate.containerHorizontalPadding)) L.push(`- ${k} — ${c}`);
L.push('\n## Heading style signatures (fontFamily | size | weight | lineHeight | letterSpacing | transform | color)');
for (const [lvl, sigs] of Object.entries(aggregate.headingStyleSignatures)) { L.push(`\n### ${lvl.toUpperCase()}`); for (const [s, c] of Object.entries(sigs)) L.push(`- ${s} — ${c}p`); }
L.push('\n## Paragraph style signatures'); for (const [s, c] of Object.entries(aggregate.paragraphStyleSignatures)) L.push(`- ${s} — ${c}p`);
L.push('\n## Button/CTA style signatures'); for (const [s, c] of Object.entries(aggregate.buttonStyleSignatures)) L.push(`- ${s} — ${c}`);
L.push('\n## Image hosts'); for (const [k, c] of Object.entries(imageHosts).sort((a,b)=>b[1]-a[1])) L.push(`- ${k} — ${c} imgs`);
fs.writeFileSync(path.join(OUT, 'AGGREGATE-DIGEST.md'), L.join('\n'));

console.log('Aggregate written. Pages:', aggregate.totalPages);
console.log('Distinct fg colors:', Object.keys(merge.colors).length, '| bg:', Object.keys(merge.backgrounds).length, '| font sizes:', Object.keys(merge.fontSizes).length);
console.log('CSS vars:', Object.keys(cssVars).length, '| container widths:', Object.keys(containerWidths).length);
