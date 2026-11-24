import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'writing'>;

// Article files on disk (files starting with "_" are notes, not articles). Checking this first
// keeps builds quiet while the collection is still empty.
const files = Object.keys(import.meta.glob('../content/writing/**/*.md')).filter((f) => !/\/_[^/]*$/.test(f));

/** Published articles, newest first. Drafts only appear in `npm run dev`. */
export async function getPosts(): Promise<Post[]> {
  if (files.length === 0) return [];
  const posts = await getCollection('writing', ({ data }) => !data.draft || import.meta.env.DEV);
  return posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export const formatDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
