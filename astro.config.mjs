import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// The site is fully static: Netlify serves the prebuilt files in dist/, with no server functions.
// To add server-rendered routes later, run `npx astro add netlify`.
export default defineConfig({
    // Netlify sets URL to the site's primary address during builds; used for canonical and social-preview URLs.
    site: process.env.URL || 'http://localhost:4321',
    // Prefetch internal links on hover so page navigation feels instant.
    prefetch: true,
    markdown: {
        shikiConfig: {
            theme: 'github-dark-default'
        }
    },
    vite: {
        plugins: [tailwindcss()]
    }
});
