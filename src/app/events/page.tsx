import type { Metadata } from "next";
import { site } from "@/content/site";
import { eventsPage } from "@/content/events";
import { Container, Eyebrow, H2, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { Cta } from "@/components/cta";
import { EventsCalendar } from "@/components/events-calendar";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { EVENTS_API, eventPath, getCalendar } from "@/lib/events";
import { breadcrumbs, faqSchema, graph, pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: eventsPage.title,
  description: eventsPage.description,
  alternates: { canonical: "/events" },
};

export default async function Events() {
  const calendar = await getCalendar();
  // В разметке — только то, что видно на странице: ивенты на момент сборки.
  const list = {
    "@type": "ItemList",
    name: "Upcoming 1handshake events",
    itemListElement: calendar.events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: e.title,
        url: `${site.url}${eventPath(e.slug)}`,
        startDate: e.starts_at,
        ...(e.ends_at && { endDate: e.ends_at }),
        eventStatus: e.cancelled ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
        eventAttendanceMode: e.online ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
        location: e.online
          ? { "@type": "VirtualLocation", url: `${site.url}${eventPath(e.slug)}` }
          : { "@type": "Place", name: e.venue ?? e.city ?? "tba", address: { "@type": "PostalAddress", addressLocality: e.city ?? undefined, addressCountry: e.country ?? undefined } },
        ...(e.cover_url && { image: [e.cover_url] }),
      },
    })),
  };

  return (
    <>
      <JsonLd
        data={graph(
          pageSchema("CollectionPage", "/events", eventsPage.title, eventsPage.description),
          calendar.events.length > 0 && list,
          faqSchema(eventsPage.faq),
          breadcrumbs([{ name: "home", path: "/" }, { name: "events", path: "/events" }]),
        )}
      />
      <Section className="dot-grid border-b pt-12">
        <Container className="max-w-[880px]">
          <Crumbs items={[{ name: "home", path: "/" }, { name: "events" }]} />
          <h1 className="text-[48px] leading-[50px] font-extrabold tracking-[-0.035em] sm:text-[64px] sm:leading-[64px]">events</h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">{eventsPage.answer}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href="#calendar">see the calendar</a></Button>
            <Button asChild size="lg" variant="outline"><a href="#get-in">how to get in at an event</a></Button>
          </div>
        </Container>
      </Section>

      <Section id="calendar" className="scroll-mt-16">
        <Container className="flex max-w-[880px] flex-col gap-8">
          <H2>upcoming events</H2>
          <EventsCalendar initial={calendar} api={EVENTS_API} />
        </Container>
      </Section>

      <section id="get-in" className="scroll-mt-16 border-y bg-card">
        <Container className="flex flex-col gap-10 py-24">
          <div>
            <Eyebrow>not a member yet?</Eyebrow>
            <H2>how to get in at an event</H2>
          </div>
          <ol className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {eventsPage.getIn.map((s) => (
              <li key={s.n} className="flex flex-col gap-3 bg-background p-7">
                <span className="meta text-brand">{s.n}</span>
                <h3 className="text-[22px] font-bold">{s.title}</h3>
                <p className="leading-6 text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow className="mb-0">for members</Eyebrow>
            <H2>check in, meet everyone</H2>
            <p className="text-lg leading-7 text-muted-foreground">{eventsPage.members}</p>
          </div>
          <div className="flex flex-col gap-4">
            <Eyebrow className="mb-0">for hosts</Eyebrow>
            <H2>host an event</H2>
            <p className="text-lg leading-7 text-muted-foreground">{eventsPage.hosts}</p>
            <div>
              <Button asChild size="lg" variant="outline"><a href={`${site.links.app}/events/new`}>host an event</a></Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t">
        <Container className="max-w-[880px]">
          <H2 className="mb-8">questions about events</H2>
          <FaqList items={eventsPage.faq} />
        </Container>
      </Section>

      <Cta />
    </>
  );
}
