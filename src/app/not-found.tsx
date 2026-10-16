import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <Section>
      <Container className="flex max-w-xl flex-col items-center gap-4 text-center">
        <p className="meta text-muted-foreground">404 · 👻</p>
        <h1 className="text-4xl font-extrabold tracking-[-0.03em]">this page is a ghost</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
        <Button asChild className="mt-2"><Link href="/">home</Link></Button>
      </Container>
    </Section>
  );
}
