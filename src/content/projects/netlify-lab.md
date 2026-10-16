---
title: Netlify Platform Lab
description: A playground of live demos for Netlify primitives — Blobs storage, Edge Functions, Image CDN and on-demand cache revalidation.
date: 2026-10-15
status: live
tags: [Netlify, Edge Functions, Blobs, React]
featured: true
links:
  live: /lab
---

The [Lab](/lab) is where server-side experiments live. It started from Netlify's Astro platform starter, and each demo shows off one building block of the platform:

- **[Blobs](/lab/blobs)** — a key/value object store, used here to save randomly generated shapes from a React island.
- **[Edge Functions](/lab/edge)** — code that runs at the network edge, rewriting the page based on the visitor's location.
- **[Image CDN](/lab/image-cdn)** — on-the-fly image resizing and format conversion.
- **[Revalidation](/lab/revalidation)** — server-rendered pages cached at the CDN and purged on demand with cache tags.

These are handy reference implementations for adding dynamic features to the rest of the site later.
