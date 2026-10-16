import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
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
    },
    integrations: [react()],
    adapter: netlify()
});
