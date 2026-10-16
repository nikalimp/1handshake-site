export type Faq = { q: string; a: string };

// FAQ на <details>: ответ есть в HTML (виден ботам), раскрытие без JavaScript.
export function FaqList({ items, open = 0 }: { items: Faq[]; open?: number }) {
  return (
    <div className="border-t">
      {items.map((f, i) => (
        <details key={f.q} open={i < open} className="group border-b py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[19px] font-bold leading-7">{f.q}</h3>
            <span aria-hidden="true" className="mt-0.5 text-2xl leading-none text-muted-foreground transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-[70ch] leading-7 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
