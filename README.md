# Personal site

My personal website: a dark-themed [Astro](https://astro.build) site styled with [Tailwind CSS](https://tailwindcss.com) and deployed on [Netlify](https://www.netlify.com). It's a **work in progress** (v0.1), built to grow over time.

## Quick start

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Start the dev server at `localhost:4321`        |
| `npm run build`   | Build the production site into `./dist/`        |
| `npm run preview` | Preview the production build locally            |
| `npm run check`   | Type-check `.astro` and `.ts` files             |

Every push to `main` is deployed by Netlify automatically. To run the server-side Lab demos (Blobs, Edge Functions) locally, use the [Netlify CLI](https://docs.netlify.com/cli/local-development/): `netlify link`, then `netlify dev`.

## Making changes

| I want to…                         | Edit                                                                                     |
| :--------------------------------- | :--------------------------------------------------------------------------------------- |
| Change my name, bio, links or copy | `src/config/site.ts`, the single source of truth for site content                        |
| Add a project                      | Copy `src/content/projects/_template.md` to a new file and fill it in                    |
| Write a blog post                  | Copy `src/content/blog/_template.md` to a new file and fill it in                        |
| Re-theme colors or fonts           | The `@theme` block at the top of `src/styles/globals.css`                                |
| Add, remove or reorder homepage sections | `src/pages/index.astro` (each section is a component in `src/components/home/`)    |
| Add a page                         | Create `src/pages/<name>.astro` using `BaseLayout`, then add it to `nav` in the config   |
| Add a Lab experiment               | Create a page in `src/pages/lab/` using `LabLayout`, then list it in `src/pages/lab/index.astro` |
| Add an icon                        | Paste the SVG's inner markup into `src/lib/icons.ts`                                     |

Content notes:

- The file name becomes the URL: `src/content/blog/my-post.md` → `/blog/my-post`.
- `draft: true` shows an entry in `npm run dev` but leaves it out of production builds.
- Files starting with `_` are ignored, so the templates never appear on the site.
- Projects with `featured: true` show on the home page (up to three).

## Project structure

```
src/
├── config/site.ts        # Identity, nav, socials and copy (start here)
├── content.config.ts     # Schemas for the projects and blog collections
├── content/
│   ├── projects/*.md     # One file per project
│   └── blog/*.md         # One file per post
├── components/
│   ├── layout/           # BaseHead (SEO/meta), Header, Footer, Logo
│   ├── ui/               # Reusable pieces: Section, PageHeader, Icon, StatusBadge…
│   ├── home/             # Landing page sections: Hero, About, FeaturedProjects…
│   ├── projects/ blog/   # Cards and list items for content
│   └── lab/              # Helpers used by the Lab demos
├── layouts/
│   ├── BaseLayout.astro  # HTML shell used by every page
│   ├── ProseLayout.astro # Long-form pages (posts, project write-ups)
│   └── LabLayout.astro   # Lab demo pages
├── lib/                  # Content queries, formatting, icons, Netlify helpers
├── scripts/main.ts       # Progressive enhancements (scroll reveal, card glow, mobile menu)
├── styles/globals.css    # Design tokens + component classes
└── pages/                # File-based routes (/, /projects, /blog, /lab, /api…)
netlify/edge-functions/   # Netlify Edge Functions (used by /lab/edge)
```

## Design system

- **Tokens:** colors are defined once as CSS variables (`--color-canvas`, `--color-surface`, `--color-fg`, `--color-muted`, `--color-accent`, `--color-accent-2`…) and become Tailwind utilities like `bg-surface`, `text-muted` and `border-line`.
- **Component classes:** `.container-page`, `.card`, `.btn` / `.btn-ghost` / `.btn-lg`, `.eyebrow`, `.tag`, `.link`, `.prose`, `.text-gradient`.
- **Interaction hooks:** add `data-reveal` to fade an element in on scroll (with an optional `data-reveal-delay="100"`), or `data-spotlight` to give a `.card` a cursor-following glow. Both work without JavaScript and respect `prefers-reduced-motion`.

## Roadmap ideas

- [ ] Write a real bio and add more projects and posts
- [ ] Social preview (Open Graph) image: pass `image` to `BaseLayout`
- [ ] RSS feed (`@astrojs/rss`) and sitemap (`@astrojs/sitemap`)
- [ ] Custom domain in Netlify
- [ ] Analytics, contact form ([Netlify Forms](https://docs.netlify.com/forms/setup/)), view transitions

Started from Netlify's [Astro Platform Starter](https://github.com/netlify-templates/astro-platform-starter); its demos live on under `/lab`.
