# huy-8bit.github.io

Personal portfolio of **Nguyen Gia Huy**, served at <https://huy-8bit.github.io/>.

A static [Astro](https://astro.build) site with hand-written CSS (light and dark themes, reduced-motion aware).

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run verify     # type check + production build
```

## Edit content

All text on the page lives in [`src/data/cv.ts`](src/data/cv.ts): profile, impact numbers, experience, projects, skills and education. Bullet text supports `**bold**`.

After changing the headline or role, regenerate the social preview image (`public/og.png`):

```sh
npx playwright install chromium   # first time only
npm run og
```

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which type checks, builds and publishes to GitHub Pages (Settings → Pages → Source: GitHub Actions).

Related: the LockLens website lives in a separate repository and is served at <https://huy-8bit.github.io/locklens-site/>.
