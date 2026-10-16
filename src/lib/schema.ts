// JSON-LD (стандарт §5): один @graph на страницу, сущности связаны через @id.
import { site } from "@/content/site";
import type { Faq } from "@/components/faq";

export const orgId = `${site.url}/#org`;
export const websiteId = `${site.url}/#website`;

export const orgSchema: Record<string, unknown> = {
  "@type": site.orgType,
  "@id": orgId,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  slogan: site.slogan,
  foundingDate: String(site.foundingYear),
  sameAs: site.sameAs,
};

export const websiteSchema = { "@type": "WebSite", "@id": websiteId, url: site.url, name: site.name, inLanguage: "en", publisher: { "@id": orgId } };

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export function faqSchema(faq: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function howToSchema(name: string, steps: { title: string; text: string }[]) {
  return {
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  };
}

export function itemListSchema(name: string, items: { name: string; description?: string }[]) {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, ...(it.description && { description: it.description }) })),
  };
}

export function pageSchema(type: "AboutPage" | "WebPage" | "CollectionPage", path: string, name: string, description: string) {
  return { "@type": type, "@id": `${site.url}${path}#page`, url: `${site.url}${path}`, name, description, isPartOf: { "@id": websiteId }, inLanguage: "en" };
}

export function articleSchema(p: { slug: string; title: string; description: string; date: string; updated?: string }) {
  return {
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: `${site.url}/blog/${p.slug}/`,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    inLanguage: "en",
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    mainEntityOfPage: `${site.url}/blog/${p.slug}/`,
  };
}

export function graph(...nodes: (Record<string, unknown> | null | false | undefined)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
