import type { Metadata } from "next";
import { faq } from "@/content/faq";
import { Container, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";
import { Cta } from "@/components/cta";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs, faqSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "1handshake FAQ: joining, privacy, cards and intros",
  description: "Answers about 1handshake: how to join, what is public and private, where data is stored, what cards and intros are, and whether it is free and open source.",
  alternates: { canonical: "/faq/" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={graph(faqSchema(faq), breadcrumbs([{ name: "home", path: "/" }, { name: "faq", path: "/faq/" }]))} />
      <Section className="pt-12">
        <Container className="flex max-w-[840px] flex-col gap-8">
          <div>
            <Crumbs items={[{ name: "home", path: "/" }, { name: "faq" }]} />
            <h1 className="text-[48px] leading-[50px] font-extrabold tracking-[-0.035em] sm:text-[64px] sm:leading-[64px]">questions about 1handshake</h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">1handshake is a free, open-source, members-only network for people in tech. Here are short answers about how to join, what stays private and how intros and cards work.</p>
          </div>
          <FaqList items={faq} open={2} />
        </Container>
      </Section>
      <Cta />
    </>
  );
}
