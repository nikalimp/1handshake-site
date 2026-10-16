import type { Metadata } from "next";
import { site } from "@/content/site";
import { openSource } from "@/content/open-source";
import { home } from "@/content/home";
import { Container, H2, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { Cta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbs, graph, pageSchema } from "@/lib/schema";

const title = "Open code, closed data: how we treat your data";
const description = "1handshake is open source under AGPL-3.0. What data it keeps, where it is stored (EU, Frankfurt), what is public, and how to export or delete your account.";

export const metadata: Metadata = { title, description, alternates: { canonical: "/open-source" } };

export default function OpenSource() {
  return (
    <>
      <JsonLd data={graph(pageSchema("AboutPage", "/open-source", title, description), breadcrumbs([{ name: "home", path: "/" }, { name: "open source", path: "/open-source" }]))} />
      <Section className="dot-grid border-b pt-12">
        <Container className="max-w-[880px]">
          <Crumbs items={[{ name: "home", path: "/" }, { name: "open source" }]} />
          <h1 className="text-[48px] leading-[50px] font-extrabold tracking-[-0.035em] sm:text-[64px] sm:leading-[64px]">open code,<br />closed data</h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">{openSource.answer}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href={site.links.github}>code on github ↗</a></Button>
            <Button asChild size="lg" variant="outline"><a href={site.links.privacy}>Privacy Policy</a></Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-4">
            <H2>what this means</H2>
            <p className="text-lg leading-7 text-muted-foreground">Anyone can check how 1handshake works — the code that builds the graph, sends intros and publishes cards is open. What is not open is the people in it.</p>
          </div>
          <dl className="border-t">
            {openSource.rows.map((r) => (
              <div key={r.k} className="flex flex-col gap-1 border-b py-5 sm:flex-row sm:gap-6">
                <dt className="meta w-36 flex-none pt-1 text-muted-foreground">{r.k}</dt>
                <dd className="leading-7">{r.v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <section className="dark bg-background text-foreground">
        <Container className="flex max-w-[880px] flex-col gap-6 py-24">
          <span className="meta text-brand">manifesto</span>
          <p className="text-[28px] leading-[38px] font-bold tracking-[-0.02em]">{home.manifesto.lead}</p>
          <p className="text-xl leading-8 text-muted-foreground">{home.manifesto.body}</p>
          <p className="text-[22px] font-bold">{home.manifesto.end}</p>
        </Container>
      </section>

      <Section>
        <Container className="flex max-w-[880px] flex-col gap-5 text-lg leading-8 text-muted-foreground">
          <H2 className="text-foreground">why agpl-3.0</H2>
          <p>A network of trust only works if people can trust the network itself. With AGPL-3.0 nobody can take the code, close it and run a hidden copy as a service: anyone who runs a modified version for others has to publish their changes too.</p>
          <p>Your public card is meant to be found — that is what it is for. Everything else stays inside the club, and leaving is always one button away: export your data as JSON or delete your account, and your place in the graph becomes an anonymous ghost 👻.</p>
        </Container>
      </Section>
      <Cta />
    </>
  );
}
