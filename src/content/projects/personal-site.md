---
title: This website
description: My personal corner of the web — a fast, dark-themed Astro site deployed on Netlify, designed to grow one piece at a time.
date: 2026-10-16
status: in-progress
tags: [Astro, Tailwind CSS, TypeScript, Netlify]
featured: true
links:
  repo: https://github.com/treyhemond/astro-platform-starter
---

This site is my home base on the web, and it's being built in public. Version 0.1 is a working foundation: a landing page, a projects section, a blog, and a lab for platform experiments.

## How it's built

- **[Astro](https://astro.build)** renders almost everything to static HTML at build time, so pages are fast by default.
- **[Tailwind CSS](https://tailwindcss.com)** handles styling, with every color and font defined as a design token in one stylesheet.
- **Content collections** turn Markdown files into pages — adding a project or post is just adding a file.
- **[Netlify](https://www.netlify.com)** deploys every push to `main` automatically, and powers the server-side demos in the [Lab](/lab).

## Roadmap

- [x] Dark-themed landing page
- [x] Projects and blog powered by Markdown
- [x] Netlify platform demos moved into the Lab
- [ ] Write a proper about section
- [ ] Add more projects and posts
- [ ] Social preview images, RSS feed and sitemap
