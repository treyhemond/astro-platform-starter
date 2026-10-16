# Trey Hemond — personal site

My professional site: a dark-themed [Astro](https://astro.build) site styled with [Tailwind CSS](https://tailwindcss.com) and deployed on [Netlify](https://www.netlify.com). It's fully static (no server functions) and a **work in progress** (v0.2).

## Quick start

| Command         | Action                                   |
| :-------------- | :--------------------------------------- |
| `npm install`   | Install dependencies                     |
| `npm run dev`   | Start the dev server at `localhost:4321` |
| `npm run build` | Build the production site into `./dist/` |
| `npm run check` | Type-check `.astro` and `.ts` files      |

## Deploying

Netlify deploys every build of `main` to production. The free plan allows about **20 production deploys a month** (300 credits at 15 credits per deploy), so changes ship in batches:

1. **Work on a branch and open a pull request.** Netlify builds a free Deploy Preview with its own URL for checking the changes.
2. **Merge when ready.** The merge is one production deploy for the whole batch.
3. **Docs-only commits** (like this README) can go straight to `main` with `[skip netlify]` in the commit message, which skips the build. Don't use the tag on pull request commits: a squash merge would carry it into `main` and skip the deploy.

## Making changes

| I want to…                               | Edit                                                                                     |
| :--------------------------------------- | :--------------------------------------------------------------------------------------- |
| Update a job, skill, stat or education   | `src/data/resume.ts`. The home page, `/resume` and search-engine data all update from it |
| Change the hero, bio, contact copy or nav | `src/config/site.ts`                                                                    |
| Add a case study                         | Copy `src/content/work/_template.md` to a new file and fill it in                        |
| Write a blog post                        | Copy `src/content/blog/_template.md` to a new file and fill it in                        |
| Re-theme colors or fonts                 | The `@theme` block at the top of `src/styles/globals.css`                                |
| Add, remove or reorder homepage sections | `src/pages/index.astro` (each section is a component in `src/components/home/`)          |
| Add a page                               | Create `src/pages/<name>.astro` using `BaseLayout`, then add it to `nav` in the config   |
| Add an icon                              | Paste the SVG's inner markup into `src/lib/icons.ts`                                     |

Content notes:

- The file name becomes the URL: `src/content/work/my-campaign.md` → `/work/my-campaign`.
- `draft: true` shows an entry in `npm run dev` but leaves it out of production builds.
- Files starting with `_` are ignored, so the templates never appear on the site.
- Case studies with `featured: true` show on the home page (up to four).
- The social preview image (`public/og-image.png`, 1200×630) is a static file. Regenerate it if your headline or numbers change.

## Project structure

```
src/
├── config/site.ts        # Identity, nav, links and page copy
├── data/resume.ts        # Career facts: experience, leadership, skills, stats, education
├── content.config.ts     # Schemas for the work and blog collections
├── content/
│   ├── work/*.md         # One file per case study
│   └── blog/*.md         # One file per post
├── components/
│   ├── layout/           # BaseHead (SEO/meta), Header, Footer, Logo
│   ├── ui/               # Reusable pieces: Section, PageHeader, Timeline, Icon, CopyButton…
│   ├── home/             # Home page sections: Hero, StatsCard, PressStrip, About, Experience…
│   └── work/ blog/       # Cards and list items for content
├── layouts/
│   ├── BaseLayout.astro  # HTML shell used by every page
│   └── ProseLayout.astro # Long-form pages (posts, case studies)
├── lib/                  # Content queries, formatting, icons, structured data
├── scripts/main.ts       # Progressive enhancements (reveal, count-up, copy, print, mobile menu)
├── styles/globals.css    # Design tokens, component classes and print styles
└── pages/                # Routes: /, /work, /resume, /blog, 404
```

## Design system

- **Tokens:** colors are defined once as CSS variables (`--color-canvas`, `--color-surface`, `--color-fg`, `--color-muted`, `--color-accent`, `--color-accent-2`…) and become Tailwind utilities like `bg-surface`, `text-muted` and `border-line`. A print block redefines them for black-on-white output.
- **Component classes:** `.container-page`, `.card`, `.btn` / `.btn-ghost` / `.btn-lg`, `.eyebrow`, `.tag`, `.link`, `.prose`, `.text-gradient`, `.resume-section`.
- **Interaction hooks**, all optional and safe without JavaScript:
  - `data-reveal`: fade in on scroll; add `data-reveal-delay="100"` to stagger.
  - `data-spotlight`: cursor-following glow on a `.card`.
  - `data-count="5000"`: number counts up when it appears, with optional `data-prefix` and `data-suffix`.
  - `data-copy`, `data-print`: copy and print buttons.

  Motion respects `prefers-reduced-motion`.
- **Printing:** `/resume` prints (or saves as PDF) as a one-page, black-on-white document.

## Roadmap ideas

- [ ] Headshot photo in the hero or About section
- [ ] Links to the press coverage in the case studies (`links` in the front matter)
- [ ] More blog posts, then add the `LatestPosts` section back to the home page
- [ ] RSS feed (`@astrojs/rss`) and sitemap (`@astrojs/sitemap`)
- [ ] Custom domain in Netlify
