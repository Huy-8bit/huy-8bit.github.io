# huy-8bit.github.io

Personal portfolio of **Nguyen Gia Huy**, served at <https://huy-8bit.github.io/>.

A static [Astro](https://astro.build) site with hand-written CSS: one font family (Plus Jakarta Sans), design tokens in
[`src/styles/global.css`](src/styles/global.css), and lightweight motion that respects `prefers-reduced-motion`.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run verify     # type check + production build
```

## Edit content

All text on the page lives in [`src/data/cv.ts`](src/data/cv.ts): profile, skills, projects, experience and education.

### Images

| File | Used for |
| --- | --- |
| `src/assets/hero-character.png` | The 3D character in the hero. Replace it with any transparent PNG of an upper-body figure cropped flat at the bottom edge; a higher-resolution file (≥ 1500 px wide) will look sharper on retina screens. Astro converts it to AVIF/WebP at build time. |
| `src/assets/locklens-overview.png`, `src/assets/locklens-incident.png` | LockLens screenshots, copied from the LockLens repository's `docs/images/`. |

After changing the headline or role, regenerate the social preview image (`public/og.png`):

```sh
npx playwright install chromium   # first time only
npm run og
```

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which type checks, builds and publishes to GitHub Pages (Settings → Pages → Source: GitHub Actions).

Related: the LockLens website lives in a separate repository and is served at <https://huy-8bit.github.io/locklens-site/>.
