import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// The site is fully static: Netlify serves the prebuilt files in dist/, with no server functions.
// To add server-rendered routes later, run `npx astro add netlify`.
export default defineConfig({
    // Netlify sets URL to the site's primary address during builds; used for canonical, sitemap and social-preview URLs.
    site: process.env.URL || 'http://localhost:4321',
    // Prefetch internal links on hover so page navigation feels instant.
    prefetch: true,
    integrations: [
        sitemap({
            // Keep the semi-hidden After Hours section out of the sitemap.
            filter: (page) => !new URL(page).pathname.startsWith('/after-hours')
        })
    ],
    markdown: {
        shikiConfig: {
            theme: 'github-dark-default'
        }
    },
    vite: {
        plugins: [tailwindcss()]
    }
});
