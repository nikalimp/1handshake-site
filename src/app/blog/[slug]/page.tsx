import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { site } from "@/content/site";
import { Container, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { Cta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { articleSchema, breadcrumbs, graph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return { robots: { index: false } };
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.description, url: `${site.url}/blog/${p.slug}`, publishedTime: p.date, modifiedTime: p.updated ?? p.date, images: ["/og.png"] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={graph(articleSchema(p), breadcrumbs([{ name: "home", path: "/" }, { name: "blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]))} />
      <Section className="pt-12">
        <Container className="max-w-[760px]">
          <Crumbs items={[{ name: "home", path: "/" }, { name: "blog", path: "/blog" }, { name: p.title }]} />
          <h1 className="text-[36px] leading-[42px] font-extrabold tracking-[-0.03em] sm:text-[48px] sm:leading-[54px]">{p.title}</h1>
          <p className="meta mt-5 text-muted-foreground">
            {site.name} · <time dateTime={p.date}>{formatDate(p.date)}</time>
            {p.updated && p.updated !== p.date && <> · updated <time dateTime={p.updated}>{formatDate(p.updated)}</time></>}
          </p>
          <article className="prose-site mt-10">
            <Markdown remarkPlugins={[remarkGfm]}>{p.body}</Markdown>
          </article>
        </Container>
      </Section>
      <Cta />
    </>
  );
}
