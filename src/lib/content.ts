// Query helpers for content collections, so pages share the same sorting and draft rules.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'work'>;
export type Post = CollectionEntry<'blog'>;

const isPublished = ({ data }: { data: { draft?: boolean } }) => import.meta.env.DEV || !data.draft;

export async function getWork() {
    const work = await getCollection('work', isPublished);
    return work.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getFeaturedWork(limit = 4) {
    return (await getWork()).filter((w) => w.data.featured).slice(0, limit);
}

export async function getPosts() {
    const posts = await getCollection('blog', isPublished);
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
