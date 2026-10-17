"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Ссылка навигации, которая подсвечивается акцентом на своей странице (и на вложенных: /blog/… → blog).
 * Путь известен и при статической сборке, так что подсветка есть уже в HTML.
 * `plain` — обычный <a> (полная загрузка), как у юр. страниц и llms.txt.
 */
export function NavLink({ href, also = [], className, activeClassName = "text-brand", plain = false, children }: { href: string; also?: string[]; className?: string; activeClassName?: string; plain?: boolean; children: React.ReactNode }) {
  const path = usePathname();
  const under = (p: string) => p.startsWith("/") && p !== "/" && (path === p || path.startsWith(`${p}/`));
  const active = under(href) || also.some(under);
  const props = { href, "aria-current": active ? ("page" as const) : undefined, className: cn(className, active && activeClassName) };
  return plain ? <a {...props}>{children}</a> : <Link {...props}>{children}</Link>;
}
