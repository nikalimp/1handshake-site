import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { IdeaForm } from "@/components/idea-form";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, graph, pageSchema } from "@/lib/schema";

const title = "Suggest an idea for 1handshake — members-only network";
const description = "Have an idea for 1handshake? Tell us what the club should do better or build next. We read every suggestion, and the best ones go on the public roadmap.";

export const metadata: Metadata = { title: { absolute: title }, description, alternates: { canonical: "/ideas" } };

export default function Ideas() {
  return (
    <>
      <JsonLd data={graph(pageSchema("WebPage", "/ideas", title, description), breadcrumbs([{ name: "home", path: "/" }, { name: "ideas", path: "/ideas" }]))} />
      <Section className="pt-12">
        <Container className="max-w-[760px]">
          <Crumbs items={[{ name: "home", path: "/" }, { name: "suggest an idea" }]} />
          <h1 className="text-[48px] leading-[50px] font-extrabold tracking-[-0.035em] sm:text-[64px] sm:leading-[64px]">suggest an idea</h1>
          <div className="mt-6 flex flex-col gap-4 text-xl leading-8 text-muted-foreground">
            <p>1handshake is built in the open, and the people who use it shape what comes next. If something is missing, confusing or could simply work better, tell us here — you don't need to be a member.</p>
            <p>Every idea is read by a human. The ones that fit the club go on the <a href="/roadmap" className="font-semibold text-brand underline underline-offset-4">public roadmap</a>, so you can see where they land. Leave an email if you'd like us to get back to you; otherwise you can stay anonymous.</p>
          </div>
          <div className="mt-10"><IdeaForm /></div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-extrabold tracking-[-0.02em]">what helps</h2>
              <ul className="flex list-disc flex-col gap-2 pl-5 leading-7 text-muted-foreground">
                <li>The problem first: what were you trying to do, and what got in the way?</li>
                <li>One idea per message, so each can be tracked on its own.</li>
                <li>A real example — a meetup, an intro you wanted, a city you moved to.</li>
                <li>If it's about the app, say whether you were on a phone or a computer.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-extrabold tracking-[-0.02em]">what happens next</h2>
              <p className="leading-7 text-muted-foreground">We go through every new idea. Each one is marked as read, planned, done or not for now. Planned ideas appear on the roadmap; if you left an email and we have questions, we'll write to you. We don't use your email for anything else, and we never add it to a mailing list. Ideas from members and guests count the same.</p>
            </div>
          </div>
          <p className="mt-8 leading-7 text-muted-foreground">Prefer email? Write to <a href={`mailto:${site.links.email}`} className="font-semibold text-brand underline underline-offset-4">{site.links.email}</a>. Found a bug in the code? Open an issue on <a href={site.links.github} className="font-semibold text-brand underline underline-offset-4">GitHub</a>.</p>
        </Container>
      </Section>
    </>
  );
}
