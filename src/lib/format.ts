const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

/** Formats a date like "Oct 16, 2026". Uses UTC so frontmatter dates don't shift by a day. */
export function formatDate(date: Date) {
    return dateFormatter.format(date);
}

/** Rough reading time for a Markdown body, e.g. "3 min read". */
export function readingTime(markdown = '') {
    const words = markdown.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 220))} min read`;
}

/** True when a link points off-site, so it can open in a new tab. */
export function isExternal(href: string) {
    return /^https?:\/\//.test(href);
}
