import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { formatDate, getPosts } from "@/lib/posts";
import { Container, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, graph, pageSchema } from "@/lib/schema";

const title = "1handshake blog: warm intros and networking in tech";
const description = "Product news from 1handshake and articles about warm introductions, trusted networks and meeting the right people in tech — through people you actually know.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  ...(!site.features.blog && { robots: { index: false, follow: true } }),
};

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <JsonLd data={graph(pageSchema("CollectionPage", "/blog", title, description), breadcrumbs([{ name: "home", path: "/" }, { name: "blog", path: "/blog" }]))} />
      <Section className="pt-12">
        <Container className="max-w-[880px]">
          <Crumbs items={[{ name: "home", path: "/" }, { name: "blog" }]} />
          <h1 className="text-[48px] leading-[50px] font-extrabold tracking-[-0.035em] sm:text-[64px] sm:leading-[64px]">blog</h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-col gap-4 text-lg leading-8 text-muted-foreground">
            <p>Here we write about the thing 1handshake is built for: meeting the right people through the people you already know. Expect practical guides — how to ask for an intro, how to make one, how to keep a network that answers when you need it — and honest comparisons of the tools people in tech use to network.</p>
            <p>We also post product news: what changed in the app, what is next on the roadmap and why we made the decisions we made. 1handshake is open source, and we try to be just as open about how it grows. New posts also appear in our llms.txt, so AI assistants can find them too.</p>
          </div>
          <ul className="mt-12 border-t">
            {posts.map((p) => (
              <li key={p.slug} className="border-b">
                <Link href={`/blog/${p.slug}`} className="block py-7 hover:text-brand">
                  <p className="meta text-muted-foreground"><time dateTime={p.date}>{formatDate(p.date)}</time></p>
                  <h2 className="mt-2 text-2xl font-bold tracking-[-0.01em]">{p.title}</h2>
                  <p className="mt-2 leading-7 text-muted-foreground">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
