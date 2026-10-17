import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./container";
import { LogoMark } from "./logo";
import { NavLink } from "./nav-link";

const cols = [
  { title: "product", links: [{ href: "/how-it-works", label: "how it works" }, { href: "/events", label: "events" }, { href: "/hosts", label: "for hosts" }, { href: "/roadmap", label: "roadmap" }, { href: site.cta.href, label: "sign in" }] },
  { title: "about", links: [{ href: "/faq", label: "faq" }, { href: "/open-source", label: "open source" }, ...(site.features.blog ? [{ href: "/blog", label: "blog" }] : [])] },
  { title: "legal", links: [{ href: site.links.privacy, label: "Privacy Policy" }, { href: site.links.terms, label: "Terms of Service" }, { href: `mailto:${site.links.email}`, label: site.links.email }] },
  { title: "code", links: [{ href: site.links.github, label: "github" }, { href: "/llms.txt", label: "llms.txt" }, ...site.socials.map((s) => ({ href: s.href, label: s.label }))] },
];

export function Footer() {
  return (
    <footer className="border-t">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.02em]"><LogoMark /><span>{site.name}</span></Link>
          <p className="max-w-[260px] text-sm text-muted-foreground">{site.tagline}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="flex flex-col gap-2.5 text-[15px]">
            <p className="meta text-muted-foreground">{c.title}</p>
            {c.links.map((l) =>
              l.href.startsWith("/") ? (
                <NavLink key={l.href} href={l.href} plain={l.href.endsWith(".txt") || ["/privacy", "/terms"].includes(l.href)} className="w-fit hover:text-brand" activeClassName="text-brand font-semibold">{l.label}</NavLink>
              ) : (
                <a key={l.href} href={l.href} className="w-fit hover:text-brand">{l.label}</a>
              ),
            )}
          </div>
        ))}
      </Container>
      <Container className="meta flex flex-wrap justify-between gap-3 border-t py-6 text-muted-foreground">
        <span>open source · agpl-3.0 · © {new Date().getFullYear()} {site.name}</span>
        <a href={site.links.developer.href} className="hover:text-foreground">{site.links.developer.label}</a>
      </Container>
    </footer>
  );
}
