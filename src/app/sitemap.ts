import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

// Только индексируемые страницы; lastmod — только реальные даты (у статей — updated/date).
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/how-it-works`, priority: 0.9 },
    { url: `${site.url}/faq`, priority: 0.9 },
    { url: `${site.url}/open-source`, priority: 0.8 },
    { url: `${site.url}/roadmap`, priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified: "2026-10-16", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: "2026-10-16", priority: 0.3 },
    ...(posts.length ? [{ url: `${site.url}/blog`, lastModified: posts.map((p) => p.updated ?? p.date).sort().at(-1), priority: 0.7 }] : []),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.updated ?? p.date, priority: 0.7 })),
  ];
}
