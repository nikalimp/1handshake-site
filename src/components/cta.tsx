import { site } from "@/content/site";
import { Container, H2, Section } from "./container";
import { Button } from "./ui/button";

export function Cta({ title = "already a member?", text = "Sign in with Google. Not a member yet? Meet one — that's the only way in." }: { title?: string; text?: string }) {
  return (
    <Section className="border-t">
      <Container className="flex flex-col items-center gap-5 text-center">
        <H2>{title}</H2>
        <p className="max-w-xl text-lg text-muted-foreground">{text}</p>
        <div className="flex w-full flex-wrap justify-center gap-3">
          <Button asChild size="lg"><a href={site.cta.href} data-event="sign_in_click">{site.cta.label}</a></Button>
          <Button asChild size="lg" variant="outline"><a href="/how-it-works#get-in">how to get in</a></Button>
        </div>
      </Container>
    </Section>
  );
}
