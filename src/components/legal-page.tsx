import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, Section } from "./container";

export function LegalPage({ title, body }: { title: string; body: string }) {
  return (
    <Section className="pt-12">
      <Container className="max-w-[760px]">
        <h1 className="text-[40px] leading-[44px] font-extrabold tracking-[-0.03em] sm:text-[52px] sm:leading-[56px]">{title}</h1>
        <article className="prose-site prose-legal mt-8">
          <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
        </article>
      </Container>
    </Section>
  );
}
