import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Container } from "./container";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LogoMark } from "./logo";

// Мобильное меню на <details>: работает без JavaScript.
function MobileMenu() {
  return (
    <details className="group/m md:hidden">
      <summary aria-label="open menu" className="inline-flex size-11 cursor-pointer list-none items-center justify-center rounded-full hover:bg-secondary [&::-webkit-details-marker]:hidden">
        <Menu className="size-5 group-open/m:hidden" />
        <X className="hidden size-5 group-open/m:block" />
      </summary>
      <div className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b bg-background px-4 pb-6 pt-2">
        <ul className="border-b py-2">
          {nav.map((n) => (
            <li key={n.href}><a href={n.href} className="block py-3 text-[17px] font-medium">{n.label}</a></li>
          ))}
          <li><a href={site.links.github} className="block py-3 text-[17px] font-medium">github ↗</a></li>
        </ul>
        <Button asChild size="lg" className="mt-5 w-full"><a href={site.cta.href} data-event="sign_in_click">{site.cta.label}</a></Button>
      </div>
    </details>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.02em]">
          <LogoMark />
          <span>{site.name}</span>
        </Link>
        <nav aria-label="main" className="meta hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-foreground">{n.label}</Link>
          ))}
          <a href={site.links.github} className="hover:text-foreground">github ↗</a>
        </nav>
        <div className="flex items-center gap-1">
          {site.darkTheme && <ThemeToggle />}
          <Button asChild size="sm" className="hidden sm:inline-flex"><a href={site.cta.href} data-event="sign_in_click">{site.cta.label}</a></Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
