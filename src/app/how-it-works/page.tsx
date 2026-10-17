import type { Metadata } from "next";
import { how } from "@/content/how";
import { faq } from "@/content/faq";
import { Container, Eyebrow, H2, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { Cta } from "@/components/cta";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { CardMock, IntroMock, InviteMock } from "@/components/mocks";
import { breadcrumbs, faqSchema, graph, howToSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "How 1handshake works: invites, intros and cards",
  description: "How to join 1handshake: meet a member, take a selfie together, scan a one-time QR code and make your card. Then ask for intros through mutual friends.",
  alternates: { canonical: "/how-it-works" },
};

const more = [
  { title: "connect", text: "The connect tab shows people one handshake away — the connections of your connections — and the people you checked in with at events. People with open offers come first. You can connect or skip; nothing happens until you decide." },
  { title: "feed and wall", text: "Incoming intro requests sit at the top of your feed, sorted by fire. Below are events from your circle: who joined, who met whom. Every profile has a wall, and the joint selfie from your invite is its first post." },
  { title: "graph", text: "Your network on one screen: you in the center, your handshakes around you, and people one handshake away on the outer ring. Filter it by city and by sphere — only the ones present in your own graph." },
  { title: "visibility", text: "“Open to hiring” lets members see your profile and send you requests. “Open to network” lets them see your connections; it works only together with “open to hiring”. Both are on by default, and your public card is always indexed while your account exists." },
];

const qs = faq.filter((_, i) => [3, 6, 7, 13].includes(i));

export default function HowItWorks() {
  return (
    <>
      <JsonLd data={graph(howToSchema("How to join 1handshake", how.steps), faqSchema(qs), breadcrumbs([{ name: "home", path: "/" }, { name: "how it works", path: "/how-it-works" }]))} />
      <Section className="dot-grid border-b pt-12">
        <Container className="max-w-[880px]">
          <Crumbs items={[{ name: "home", path: "/" }, { name: "how it works" }]} />
          <h1 className="text-[48px] leading-[50px] font-extrabold tracking-[-0.035em] sm:text-[64px] sm:leading-[64px]">how 1handshake works</h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">{how.answer}</p>
        </Container>
      </Section>

      <Section id="get-in">
        <Container className="flex flex-col gap-10">
          <H2>four steps to get in</H2>
          <ol className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {how.steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-3 bg-background p-7">
                <span className="meta text-brand">{s.n}</span>
                <h3 className="text-[22px] font-bold">{s.title}</h3>
                <p className="leading-6 text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto] [&>*]:min-w-0">
            <div className="flex flex-col gap-4 text-lg leading-7 text-muted-foreground">
              <p>The invite is the heart of 1handshake. Because every new member arrives through a real meeting, every line in the graph stands for two people who have actually seen each other. Bots and fake profiles have no way in.</p>
              <p>If the 5 minutes run out, the member simply makes a new code with the same selfie. When two people who are already members meet, they scan each other's code and get a handshake 🤝 at once.</p>
            </div>
            <div className="flex justify-center"><InviteMock /></div>
          </div>
        </Container>
      </Section>

      <section className="border-y bg-card">
        <Container className="grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 [&>*]:min-w-0">
          <div className="flex flex-col gap-4">
            <Eyebrow className="mb-0">warm intros</Eyebrow>
            <H2>meet anyone through a friend</H2>
            <p className="text-lg leading-7 text-muted-foreground">You can't message a stranger on 1handshake. To meet someone one handshake away, you send an intro request, and it travels through the people you both know. They see it and can back it with 🔥. The person you want to meet sees your request, the friends in between and their fire — and decides.</p>
          </div>
          <div className="flex justify-center"><IntroMock /></div>
        </Container>
      </section>

      <Section>
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
          <div className="flex justify-center"><CardMock /></div>
          <div className="flex flex-col gap-4">
            <Eyebrow className="mb-0">your card</Eyebrow>
            <H2>a card that works for you</H2>
            <p className="text-lg leading-7 text-muted-foreground">Your card lives at 1handshake.com/@handle: your name and role as the title, your city, a markdown bio and your social links. The same card is published as llms.txt, so search engines and AI assistants can read who you are. Your offers sit on the card too — orders, projects, products and services — and members can tell you they're interested.</p>
          </div>
        </Container>
      </Section>

      <Section className="border-t">
        <Container className="flex flex-col gap-10">
          <H2>inside the app</H2>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {more.map((m) => (
              <div key={m.title} className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold">{m.title}</h3>
                <p className="leading-7 text-muted-foreground">{m.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t">
        <Container className="flex max-w-[840px] flex-col gap-8">
          <H2>questions</H2>
          <FaqList items={qs} />
        </Container>
      </Section>
      <Cta />
    </>
  );
}
