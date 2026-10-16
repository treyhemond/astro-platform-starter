// Content collections — https://docs.astro.build/en/guides/content-collections/
// Drop a Markdown file into src/content/<collection>/ and it shows up on the site.
// Files whose name starts with an underscore (e.g. _template.md) are ignored.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        /** Used for sorting (newest first). Use the start date or last significant update. */
        date: z.coerce.date(),
        status: z.enum(['live', 'in-progress', 'planned', 'archived']).default('in-progress'),
        tags: z.array(z.string()).default([]),
        /** Featured projects appear on the home page. */
        featured: z.boolean().default(false),
        /** Drafts are visible in `npm run dev` but excluded from production builds. */
        draft: z.boolean().default(false),
        links: z
            .object({
                /** Where the project lives — an absolute URL or a path on this site. */
                live: z.string().optional(),
                repo: z.string().url().optional()
            })
            .default({})
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

export const collections = { projects, blog };
