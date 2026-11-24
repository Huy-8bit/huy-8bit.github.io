// /writing/rss.xml — generated only when at least one published article exists.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts } from '../../lib/writing';
import { profile } from '../../data/cv';

export const getStaticPaths = (async () => ((await getPosts()).length ? [{ params: { feed: 'rss' } }] : [])) satisfies GetStaticPaths;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = new URL(import.meta.env.BASE_URL, site);
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const link = new URL(`writing/${p.id}/`, base).toString();
      return `<item><title>${esc(p.data.title)}</title><link>${link}</link><guid>${link}</guid><description>${esc(p.data.description)}</description><pubDate>${p.data.published.toUTCString()}</pubDate></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(profile.name)}: Writing</title><link>${new URL('writing/', base)}</link><description>Technical articles by ${esc(profile.name)}.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
