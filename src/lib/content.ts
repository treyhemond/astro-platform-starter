// Query helpers for content collections, so pages share the same sorting and draft rules.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'blog'>;

const isPublished = ({ data }: { data: { draft?: boolean } }) => import.meta.env.DEV || !data.draft;

export async function getProjects() {
    const projects = await getCollection('projects', isPublished);
    return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getFeaturedProjects(limit = 3) {
    return (await getProjects()).filter((p) => p.data.featured).slice(0, limit);
}

export async function getPosts() {
    const posts = await getCollection('blog', isPublished);
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const projectStatus: Record<Project['data']['status'], { label: string; tone: string }> = {
    live: { label: 'Live', tone: 'text-emerald-300 bg-emerald-400/10 ring-emerald-400/25' },
    'in-progress': { label: 'In progress', tone: 'text-amber-200 bg-amber-300/10 ring-amber-300/25' },
    planned: { label: 'Planned', tone: 'text-sky-200 bg-sky-300/10 ring-sky-300/25' },
    archived: { label: 'Archived', tone: 'text-muted bg-white/5 ring-white/10' }
};
