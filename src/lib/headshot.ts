// Optional headshot: drop a photo named headshot.jpg (or .jpeg/.png/.webp/.avif) into src/assets/
// and it appears in the About section, resized and optimized at build time. No config needed.
import type { ImageMetadata } from 'astro';

const matches = import.meta.glob<{ default: ImageMetadata }>('../assets/headshot.{jpg,jpeg,png,webp,avif}', { eager: true });

export const headshot: ImageMetadata | undefined = Object.values(matches)[0]?.default;
