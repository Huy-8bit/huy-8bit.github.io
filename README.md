# huy-8bit.github.io

Personal portfolio of **Nguyen Gia Huy**, served at <https://huy-8bit.github.io/>.

A static [Astro](https://astro.build) site with hand-written CSS and very little JavaScript (theme toggle, mobile menu,
screenshot lightbox, scroll highlighting). Fonts are self-hosted: Geist for text and JetBrains Mono for labels and code.

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
| [`src/styles/global.css`](src/styles/global.css) | Design tokens (light and dark) and every component style. |
| [`src/pages/index.astro`](src/pages/index.astro) | Home page. |
| [`src/pages/projects/[slug].astro`](src/pages/projects/[slug].astro) | Case-study pages: `/projects/locklens/`, `/projects/keyshift/`, `/projects/extendpad/`. |
| [`src/content/writing/`](src/content/writing/) | Technical articles (Markdown). See below. |
| `src/assets/locklens-*.png` | LockLens screenshots, copied from the LockLens repository's `docs/images/`. |

### Content rules

- Nothing on the site goes beyond the CV or the projects' own repositories: no invented numbers, users, stars or roles.
- Benchmark figures always carry their conditions, and simulations are labelled as simulations.
- Personal projects are labelled as personal projects; nothing claims production use without evidence.
- The phone number is not published. The Galaxy FinX entry stays at the level of Vault Core and smart contracts.
- Screenshots must be real. ExtendPad has none yet, so it shows a diagram instead.

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
