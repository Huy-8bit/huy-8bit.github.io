# huy-8bit.github.io

Personal portfolio of **Nguyen Gia Huy**, served at <https://huy-8bit.github.io/>.

A static [Astro](https://astro.build) site: colourful, dark-first (with its own light palette), with interactive
engineering visuals built from SVG, CSS, a small canvas and plain TypeScript. No UI framework, animation library or 3D
engine; every page is complete static HTML and works without JavaScript. Fonts are self-hosted: Geist and JetBrains Mono.

## Develop

```sh
npm install
npm run dev          # http://localhost:4321
npm run verify       # type check, production build, internal link check
npm run test:links   # also fetches every external link (needs network; LinkedIn blocks bots, check it by hand)
```

## Where things live

| Path | What it holds |
| --- | --- |
| [`src/data/cv.ts`](src/data/cv.ts) | Profile, experience, expertise, education and navigation. Facts come from the CV. |
| [`src/data/projects.ts`](src/data/projects.ts) | LockLens, KeyShift and ExtendPad: home page blocks and case-study pages. Facts come from each project's repository. |
| [`src/data/flows.ts`](src/data/flows.ts) | The flow-lane diagrams for each project. |
| [`src/styles/tokens.css`](src/styles/tokens.css) | Colour (light and dark designed separately, plus a palette per project), type, spacing and motion tokens. |
| [`src/styles/base.css`](src/styles/base.css), [`home.css`](src/styles/home.css), [`case.css`](src/styles/case.css) | Shared components and motion rules, the home page, the case studies. |
| [`src/components/hero/`](src/components/hero/) | The hero: ambient layers and the illustrative engineering scene. |
| [`src/components/demos/`](src/components/demos/) | Interactive project demos: LockLens blocking chain, KeyShift caching simulation, ExtendPad device stage. |
| [`src/scripts/`](src/scripts/) | Site behaviour (reveals, count-ups, pointer light, section colours, scroll progress) and the motion gate. |
| [`src/pages/index.astro`](src/pages/index.astro) | Home page. |
| [`src/pages/projects/[slug].astro`](src/pages/projects/[slug].astro) | Case-study pages: `/projects/locklens/`, `/projects/keyshift/`, `/projects/extendpad/`. |
| [`src/content/writing/`](src/content/writing/) | Technical articles (Markdown). See below. |
| `src/assets/locklens-*.png` | LockLens screenshots, copied from the LockLens repository's `docs/images/`. |

### Content rules

- Nothing on the site goes beyond the CV or the projects' own repositories: no invented numbers, users, stars or roles.
- Benchmark figures always carry their conditions, and simulations are labelled as simulations.
- Personal projects are labelled as personal projects; nothing claims production use without evidence.
- The phone number is not published. The Galaxy FinX entry stays at the level of Vault Core and smart contracts.
- Screenshots must be real. ExtendPad has none yet, so it shows a stylized illustration, labelled as such.
- Demos are labelled *Illustrative* or *Simulated*. The KeyShift demo is a browser simulation, not the SDK, and its
  numbers are not measurements; real benchmark figures are shown separately with their conditions.
- Count-ups only animate towards values already in the HTML (CV figures and documented benchmark results).

### Motion

Everything that moves on its own is gated by `data-motion` on `<html>`: `full` or `reduced`. The head script sets it
from the visitor's saved choice or their `prefers-reduced-motion` setting, and the pause button in the header switches
it for the whole site (and remembers it). Animations also pause when off screen and when the tab is hidden
([`src/scripts/motion.ts`](src/scripts/motion.ts)). Page-to-page transitions use native cross-document View Transitions.

### Writing

Add Markdown files to `src/content/writing/` (front matter is described in
[`src/content/writing/_README.md`](src/content/writing/_README.md)). Until the first non-draft article exists, the site
shows nothing about writing. The first one turns on the header link, the home page section, `/writing/` and the RSS
feed at `/writing/rss.xml`.

### Social preview

After changing the name, role or statement, regenerate `public/og.png` (1200×630):

```sh
npx playwright install chromium   # first time only
npm run og
```

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which type checks, builds and
publishes to GitHub Pages (Settings → Pages → Source: GitHub Actions).

Related sites, each in its own repository: [LockLens](https://huy-8bit.github.io/locklens-site/),
[KeyShift](https://huy-8bit.github.io/keyshift-site/), [ExtendPad](https://huy-8bit.github.io/extendpad-site/).
