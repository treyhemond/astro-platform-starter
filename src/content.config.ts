// Content collections — https://docs.astro.build/en/guides/content-collections/
// Drop a Markdown file into src/content/<collection>/ and it shows up on the site.
// Files whose name starts with an underscore (e.g. _template.md) are ignored.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Case studies: one page per piece of work, with headline results. */
const work = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/work' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(['Sales', 'Communications & PR', 'Campaigns & Organizing', 'Leadership']),
        role: z.string(),
        org: z.string(),
        /** Display dates, e.g. "Jan 2019 – May 2021". */
        period: z.string(),
        /** Used for sorting (newest first). Use the end date, or today's date for current work. */
        date: z.coerce.date(),
        /** Headline results shown on cards and at the top of the page. Keep values short ("$10K+", "#1"). */
        metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
        /** Press coverage, published work, etc. */
        links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
        /** Featured work appears on the home page (up to four). */
        featured: z.boolean().default(false),
        /** Drafts are visible in `npm run dev` but excluded from production builds. */
        draft: z.boolean().default(false)
    })
});

/** Fun projects for the semi-hidden /after-hours section. */
const afterHours = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/after-hours' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        /** Shown big on the card. */
        emoji: z.string().default('✨'),
        /** Used for sorting (newest first). */
        date: z.coerce.date(),
        /**
         * Where the card links. Leave empty to give the entry its own page from the Markdown body.
         * Set it to a custom page (e.g. /after-hours/table-tennis) or an external URL (a playlist, a photo album…).
         */
        href: z.string().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false)
    })
});

const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false)
    })
});

export const collections = { work, blog, afterHours };
