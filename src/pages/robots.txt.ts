// Generates /robots.txt at build time, pointing crawlers at the sitemap for the current site URL.
// After Hours isn't listed here on purpose: a Disallow line would advertise it. Its pages use noindex instead.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
    const sitemap = new URL('sitemap-index.xml', site).href;
    return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
};
