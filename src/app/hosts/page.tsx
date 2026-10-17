import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, BarChart3, CalendarDays, DoorOpen, Ticket, UsersRound } from "lucide-react";
import { site } from "@/content/site";
import { hostsPage } from "@/content/hosts";
import { Container, Eyebrow, H2, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbs, faqSchema, graph, howToSchema, pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: hostsPage.title,
  description: hostsPage.description,
  alternates: { canonical: "/hosts" },
};

const icons = { calendar: CalendarDays, users: UsersRound, check: BadgeCheck, door: DoorOpen, ticket: Ticket, chart: BarChart3 } as const;
const newEvent = `${site.links.app}/events/new`;

export default function Hosts() {
  return (
    <>
      <JsonLd
        data={graph(
          pageSchema("WebPage", "/hosts", hostsPage.title, hostsPage.description),
          howToSchema("How to host an event with 1handshake", hostsPage.steps),
          faqSchema(hostsPage.faq),
          breadcrumbs([{ name: "home", path: "/" }, { name: "events", path: "/events" }, { name: "for hosts", path: "/hosts" }]),
        )}
      />
      <Section className="dot-grid border-b pt-12">
        <Container className="max-w-[880px]">
          <Crumbs items={[{ name: "home", path: "/" }, { name: "events", path: "/events" }, { name: "for hosts" }]} />
          <h1 className="text-[48px] leading-[50px] font-extrabold tracking-[-0.035em] sm:text-[64px] sm:leading-[64px]">host an event</h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">{hostsPage.answer}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href={newEvent}>host an event</a></Button>
            <Button asChild size="lg" variant="outline"><Link href="/events">see the calendar</Link></Button>
          </div>
          <p className="meta mt-4 text-muted-foreground">free · for members · registration stays yours</p>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-10">
          <H2>why host with 1handshake?</H2>
          <ul className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {hostsPage.why.map((w) => {
              const Icon = icons[w.icon as keyof typeof icons];
              return (
                <li key={w.title} className="flex flex-col gap-3 bg-background p-7">
                  <Icon className="size-6 text-brand" aria-hidden="true" />
                  <h3 className="text-[22px] font-bold">{w.title}</h3>
                  <p className="leading-6 text-muted-foreground">{w.text}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <section className="border-y bg-card">
        <Container className="flex flex-col gap-10 py-24">
          <div>
            <Eyebrow>how it works</Eyebrow>
            <H2>from idea to check-in</H2>
          </div>
          <ol className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {hostsPage.steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-3 bg-background p-7">
                <span className="meta text-brand">{s.n}</span>
                <h3 className="text-[20px] font-bold">{s.title}</h3>
                <p className="leading-6 text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Section>
        <Container className="max-w-[880px]">
          <H2 className="mb-8">questions from hosts</H2>
          <FaqList items={hostsPage.faq} />
        </Container>
      </Section>

      <Section className="border-t">
        <Container className="flex flex-col items-center gap-5 text-center">
          <H2>ready to host?</H2>
          <p className="max-w-xl text-lg text-muted-foreground">Create the event in the app — it takes a couple of minutes, or seconds with a Luma link. Not a member yet? Meet one at an event first.</p>
          <div className="flex w-full flex-wrap justify-center gap-3">
            <Button asChild size="lg"><a href={newEvent}>host an event</a></Button>
            <Button asChild size="lg" variant="outline"><Link href="/events">find an event to join</Link></Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
