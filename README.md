# vineethsai.com

Personal site of Vineeth Sai Narajala, AI security researcher at Cisco. Built with React 19, Vite 8, Tailwind CSS 4, and TypeScript; hosted on GitHub Pages behind Cloudflare.

## Run it locally

Needs Node 20.19 or newer.

```sh
npm install
npm run dev        # http://localhost:8080
```

`npm run build` writes the production site to `dist/`, and `npm run preview` serves that build. The build has three steps:

1. `vite build` bundles the app.
2. `scripts/generateFeeds.ts` writes `sitemap.xml` and `rss.xml` from the routes and content.
3. `scripts/prerender.ts` opens every page in headless Chrome and saves it as static HTML (`dist/publications.html`, etc.), so search engines and link previews see each page's content and metadata without running JavaScript. It uses your installed Google Chrome; set `PRERENDER=0` to skip it.

Pages live at real URLs (`/publications`, `/speaking`, …). Old `/#/...` links redirect automatically.

## Updating content

Everything on the site comes from plain data files in `src/content/`. Edit the list, and every page and count that uses it updates:

| File | What it holds |
|---|---|
| `profile.ts` | Name, title, bio, links, focus areas |
| `experience.ts` | Roles, leadership, education, projects, AWS launches |
| `research.ts` | Papers, standards (IETF/OWASP), peer review, awards, industry adoption |
| `talks.ts` | Talks and recordings |
| `media.ts` | Press coverage and podcasts |
| `writing.ts` | Articles published elsewhere (Cisco, CSA, OWASP) |
| `openSource.ts` | Open-source projects (star counts are fetched, not typed) |
| `featured.ts` | "Selected work" cards on the home page |

Adding a page? Add its route in `src/App.tsx` and `src/routes.tsx`, and in `scripts/siteRoutes.ts` so it gets prerendered and listed in the sitemap.

Numbers like citation counts, paper counts, and talk counts are computed from these files and from `src/data/`.

### Refreshing data

```sh
npm run fetch-github      # GitHub stars and forks -> src/data/github.json
npm run fetch-citations   # Google Scholar counts + OpenAlex citing papers -> src/data/citations.json
```

Neither needs an API key. The citation script keeps every existing citing paper and only adds new ones. It also tries Google Scholar once for per-paper counts; if Scholar blocks the request, the old counts are kept.

Update the Google Scholar totals (citations, h-index) by hand in `src/data/scholarMetrics.json`.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which type-checks, lints, builds, and deploys to GitHub Pages. Pull requests run the same checks without deploying. A weekly scheduled run rebuilds the site so GitHub star counts stay current.

The custom domain lives in `public/CNAME`, so every build includes it.

## Checks

```sh
npm run typecheck
npm run lint
```
