import type { Metadata } from "next";
import { roadmap } from "@/content/roadmap";
import { Container, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { Cta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, graph, itemListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Roadmap: what's live and what comes later",
  description: "The public roadmap of 1handshake: invites by selfie, intros, cards, offers and events are live; later come MCP, companies, direct messages and more.",
  alternates: { canonical: "/roadmap" },
};

export default function Roadmap() {
  return (
    <>
      <JsonLd data={graph(...roadmap.map((g) => itemListSchema(`1handshake roadmap — ${g.title}`, g.items.map((i) => ({ name: i.title, description: i.text })))), breadcrumbs([{ name: "home", path: "/" }, { name: "roadmap", path: "/roadmap" }]))} />
      <Section className="pt-12">
        <Container>
          <Crumbs items={[{ name: "home", path: "/" }, { name: "roadmap" }]} />
          <h1 className="text-[48px] leading-[50px] font-extrabold tracking-[-0.035em] sm:text-[64px] sm:leading-[64px]">roadmap</h1>
          <p className="mt-6 max-w-[760px] text-xl leading-8 text-muted-foreground">Everything 1handshake already does and what we plan later. The code is open, and so is the plan.</p>
          <div className={`mt-14 grid gap-10 ${roadmap.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
            {roadmap.map((g) => (
              <section key={g.id} className="flex flex-col gap-5">
                <div className="flex items-baseline justify-between border-b pb-3">
                  <h2 className="text-[28px] font-extrabold tracking-[-0.02em]">{g.title}</h2>
                  <span className="meta text-muted-foreground">{g.items.length}</span>
                </div>
                <p className="text-muted-foreground">{g.lead}</p>
                <ul className="flex flex-col gap-3">
                  {g.items.map((i) => (
                    <li key={i.title} className={`rounded-[14px] border p-4 ${g.id === "live" ? "bg-card" : g.id === "next" ? "border-primary bg-accent" : "bg-background"}`}>
                      <h3 className="font-bold">{i.title}</h3>
                      <p className="mt-1 text-[15px] leading-6 text-muted-foreground">{i.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </Section>
      <Cta />
    </>
  );
}
