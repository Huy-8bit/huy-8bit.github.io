// Checks the production build in dist/:
// - every internal href/src lives under the base path and resolves to a built file,
// - every #fragment points at an element id on the target page,
// - with --online, every external link answers with a 2xx/3xx status (run locally, not in CI).
import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const DIST = path.resolve('dist');
const ONLINE = process.argv.includes('--online');

const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(DIST);

const idsOf = new Map();
const ids = (file) => {
  if (!idsOf.has(file)) idsOf.set(file, new Set([...fs.readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idsOf.get(file);
};
const resolve = (pathname) => {
  const rel = decodeURIComponent(pathname.slice(BASE.length));
  const candidates = [path.join(DIST, rel), path.join(DIST, rel, 'index.html')];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
};

const errors = [];
const warnings = [];
const external = new Set();
let checked = 0;
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const pageUrl = '/' + path.relative(DIST, page).replace(/index\.html$/, '').replace(/\\/g, '/');
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const ref = m[1].replace(/&amp;/g, '&');
    if (/^(mailto:|data:)/.test(ref)) continue;
    if (/^https?:/.test(ref)) {
      // Absolute links to this site itself (canonical, Open Graph) are covered by the internal check.
      const self = /^https:\/\/huy-8bit\.github\.io\/(?!(locklens|keyshift|extendpad)-site\/)/.test(ref);
      if (!self) external.add(ref);
      continue;
    }
    checked++;
    const [p, frag] = ref.split('#');
    let target = page;
    if (p) {
      if (!p.startsWith(BASE)) {
        errors.push(`${pageUrl}: "${ref}" is not under ${BASE}`);
        continue;
      }
      target = resolve(p);
      if (!target) {
        errors.push(`${pageUrl}: "${ref}" does not resolve to a built file`);
        continue;
      }
    }
    if (frag && target.endsWith('.html') && !ids(target).has(frag)) errors.push(`${pageUrl}: "${ref}" has no element with id="${frag}"`);
  }
}

if (ONLINE) {
  await Promise.all(
    [...external].map(async (u) => {
      try {
        let res = await fetch(u, { method: 'HEAD', redirect: 'follow' });
        if (res.status === 405 || res.status === 403) res = await fetch(u, { redirect: 'follow' });
        if (res.status === 999) warnings.push(`external link ${u} answered 999 (the site blocks automated requests; check it by hand)`);
        else if (res.status >= 400) errors.push(`external link ${u} answered ${res.status}`);
      } catch (err) {
        // LinkedIn refuses automated requests outright; everything else must answer.
        if (/linkedin\.com/.test(u)) warnings.push(`external link ${u} refused an automated request; check it by hand`);
        else errors.push(`external link ${u} failed: ${err.message}`);
      }
    }),
  );
}

if (warnings.length) console.warn(warnings.join('\n'));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Checked ${pages.length} page(s), ${checked} internal reference(s); all resolve under ${BASE}. ✓`);
console.log(`${external.size} external link(s)${ONLINE ? ' answered without errors ✓' : ' (run with --online to fetch them)'}`);
