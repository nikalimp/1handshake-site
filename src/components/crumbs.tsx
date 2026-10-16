import Link from "next/link";

export function Crumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="breadcrumbs" className="meta mb-8 text-muted-foreground">
      {items.map((it, i) => (
        <span key={it.name}>
          {i > 0 && " / "}
          {it.path ? <Link href={it.path} className="hover:text-foreground">{it.name}</Link> : it.name}
        </span>
      ))}
    </nav>
  );
}
