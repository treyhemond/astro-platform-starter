# CLAUDE.md

Personal website built with Astro 5, Tailwind CSS v4 and the Netlify adapter. Every build of `main` is a Netlify production deploy. Deploys are rationed, so read **Deploying** before pushing.

## Deploying

The site is on Netlify's free plan: 300 credits a month, hard capped. Each production deploy (a build of `main`) costs 15 credits, so there are at most about 20 a month. Deploy Previews, branch deploys and failed builds are free.

- **Never push site changes straight to `main`.** Commit to a feature branch, push it, and open a pull request against `main`. Netlify builds a free Deploy Preview for the PR. The owner reviews it and merges, and the merge is the single production deploy.
- **Batch work.** Group related changes into one PR instead of opening several small ones.
- **Docs-only changes** (README.md, CLAUDE.md, `.vscode/`, nothing that affects the built site) may be pushed directly to `main`. Include `[skip netlify]` in the commit message so no build runs. Netlify only checks the latest commit in a push, so it must be the last one.
- **Never put `[skip netlify]` in commits on a PR branch.** A squash merge would carry the tag into `main` and silently skip the production deploy.
- Run `npm run build` and `npm run check` before pushing any branch that changes the site.

## Commands

- `npm run dev`: dev server on :4321
- `npm run build`: production build (must pass before pushing)
- `npm run check`: `astro check` type-checking (should report 0 errors)

## Conventions

- **Site copy lives in `src/config/site.ts`.** Don't hard-code names, links or bios in components.
- **Projects and posts are content collections** (`src/content.config.ts`). Add Markdown files rather than new pages. Files prefixed with `_` are templates and are ignored. Query them through `src/lib/content.ts` so draft filtering and sorting stay consistent.
- **Styling:** use the design tokens from `@theme` in `src/styles/globals.css` (`bg-canvas`, `bg-surface`, `text-fg`, `text-muted`, `text-subtle`, `border-line`, `text-accent`, `accent-2`) instead of raw colors. Reuse the component classes (`.container-page`, `.card`, `.btn`, `.btn-ghost`, `.eyebrow`, `.tag`, `.link`, `.prose`).
- **Layouts:** pages use `BaseLayout` (title and description props feed `BaseHead` for SEO), `ProseLayout` for Markdown entries, and `LabLayout` for `/lab/*` demos.
- **Home page:** sections are standalone components in `src/components/home/`, composed in `src/pages/index.astro`. Wrap section content in `Section` for consistent spacing and headings.
- **JS:** keep it progressive and dependency-free in `src/scripts/main.ts`, opting in with data attributes (`data-reveal`, `data-spotlight`, `data-rotator`). Pages must work without JS.
- **Icons:** `<Icon name="..." />` reads from `src/lib/icons.ts` (Lucide-style 24×24 stroke paths).
- **Rendering:** pages are prerendered (static) by default. Server-rendered routes opt in with `export const prerender = false` (see `src/pages/lab/revalidation.astro` and `src/pages/api/`).
- **Formatting:** 4-space indent, single quotes, print width 160 (see `.prettierrc`).
