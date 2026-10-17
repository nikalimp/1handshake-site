"use client";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Calendar, SiteEvent } from "@/lib/events";
import { dayKey, dayLabel, placeLine, timeRange, tzLabel } from "@/lib/event-format";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

// Календарь /events. Без JavaScript видны все ивенты на момент сборки (HTML).
// С JavaScript: свежий список из API, фильтры по датам и месту — в адресе (?when=week&place=bangkok), чтобы ссылкой можно было поделиться.

type When = "all" | "week" | "weekend" | "month";
const WHEN: { id: When; label: string }[] = [
  { id: "all", label: "upcoming" },
  { id: "week", label: "next 7 days" },
  { id: "weekend", label: "this weekend" },
  { id: "month", label: "next 30 days" },
];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const placeId = (e: Pick<SiteEvent, "online" | "city">) => (e.online ? "online" : e.city ? slugify(e.city) : "");

/** [от, до) для фильтра по датам, в местном времени посетителя */
function range(when: When, now: Date): [number, number] | null {
  const day = 24 * 3600_000;
  if (when === "week") return [now.getTime(), now.getTime() + 7 * day];
  if (when === "month") return [now.getTime(), now.getTime() + 30 * day];
  if (when === "weekend") {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    const toSat = (6 - d.getDay() + 7) % 7; // сегодня суббота → 0
    const sat = d.getDay() === 0 ? d.getTime() - day : d.getTime() + toSat * day; // в воскресенье — эти выходные
    return [Math.max(sat, now.getTime() - day), sat + 2 * day];
  }
  return null;
}

const endOf = (e: SiteEvent) => new Date(e.ends_at ?? new Date(e.starts_at).getTime() + 8 * 3600_000).getTime();

export function EventsCalendar({ initial, api }: { initial: Calendar; api: string }) {
  const [data, setData] = useState(initial);
  const [when, setWhen] = useState<When>("all");
  const [place, setPlace] = useState("all");
  const [now, setNow] = useState<Date | null>(null);

  // Фильтры из адреса и свежие данные — после загрузки (HTML совпадает со сборкой).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const w = q.get("when") as When | null;
    if (w && WHEN.some((x) => x.id === w)) setWhen(w);
    if (q.get("place")) setPlace(q.get("place")!);
    setNow(new Date());
    fetch(api)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Calendar | null) => d && setData({ events: d.events ?? [], places: d.places ?? [], online: Boolean(d.online) }))
      .catch(() => {});
  }, [api]);

  const pick = (k: "when" | "place", v: string) => {
    if (k === "when") setWhen(v as When);
    else setPlace(v);
    const q = new URLSearchParams(window.location.search);
    if (v === "all") q.delete(k);
    else q.set(k, v);
    window.history.replaceState(null, "", `${window.location.pathname}${q.size ? `?${q}` : ""}`);
  };

  const places = useMemo(() => {
    const list = data.places.filter((p) => p.city).map((p) => ({ id: slugify(p.city!), label: p.city!.toLowerCase() }));
    return [...new Map(list.map((p) => [p.id, p])).values()].sort((a, b) => a.label.localeCompare(b.label));
  }, [data.places]);

  const shown = useMemo(() => {
    const r = now ? range(when, now) : null;
    return data.events.filter((e) => {
      if (now && endOf(e) < now.getTime()) return false;
      if (place !== "all" && placeId(e) !== place) return false;
      if (r && !(new Date(e.starts_at).getTime() < r[1] && endOf(e) >= r[0])) return false;
      return true;
    });
  }, [data.events, now, when, place]);

  const days = useMemo(() => {
    const map = new Map<string, { label: string; events: SiteEvent[] }>();
    for (const e of shown) {
      const k = dayKey(e.starts_at, e.timezone);
      if (!map.has(k)) map.set(k, { label: dayLabel(e.starts_at, e.timezone), events: [] });
      map.get(k)!.events.push(e);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [shown]);

  const chip = (active: boolean) => cn("h-9 rounded-full px-4 text-sm", active ? "bg-foreground text-background hover:bg-foreground/90" : "");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3" role="group" aria-label="filters">
        <div className="flex flex-wrap gap-2" aria-label="dates">
          {WHEN.map((w) => (
            <Button key={w.id} type="button" variant={when === w.id ? "default" : "outline"} size="sm" aria-pressed={when === w.id} className={chip(when === w.id)} onClick={() => pick("when", w.id)}>
              {w.label}
            </Button>
          ))}
        </div>
        {(places.length > 0 || data.online) && (
          <div className="flex flex-wrap gap-2" aria-label="places">
            {[{ id: "all", label: "everywhere" }, ...places, ...(data.online ? [{ id: "online", label: "online" }] : [])].map((p) => (
              <Button key={p.id} type="button" variant={place === p.id ? "default" : "outline"} size="sm" aria-pressed={place === p.id} className={chip(place === p.id)} onClick={() => pick("place", p.id)}>
                {p.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {days.length === 0 ? (
        <div className="rounded-[28px] border border-dashed px-6 py-14 text-center">
          <p className="text-lg font-bold">{data.events.length ? "nothing for these filters" : "no events in the calendar yet"}</p>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            {data.events.length ? "Try other dates or another city." : "Members host events from the app. New ones show up here as soon as they're approved."}
          </p>
        </div>
      ) : (
        <ol className="flex flex-col">
          {days.map(([k, d]) => (
            <li key={k} className="grid gap-4 border-t py-6 sm:grid-cols-[140px_1fr] [&>*]:min-w-0">
              <h3 className="meta pt-1 text-brand">{d.label}</h3>
              <ul className="flex flex-col gap-4">
                {d.events.map((e) => (
                  <EventRow key={e.slug} e={e} />
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function EventRow({ e }: { e: SiteEvent }) {
  return (
    <li className="flex gap-4 rounded-[28px] border bg-card p-3 sm:p-4">
      <a href={`/e/${e.slug}`} className="shrink-0" tabIndex={-1} aria-hidden="true">
        {e.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={e.cover_url} alt="" loading="lazy" width={112} height={112} className="size-[88px] rounded-[14px] object-cover sm:size-[112px]" />
        ) : (
          <span className="dot-grid block size-[88px] rounded-[14px] bg-muted sm:size-[112px]" />
        )}
      </a>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="meta text-muted-foreground">
          {timeRange(e)} · {tzLabel(e.timezone)}
        </p>
        <h4 className="text-[19px] leading-6 font-bold">
          <a href={`/e/${e.slug}`} className="hover:text-brand">
            {e.title}
          </a>
        </h4>
        <p className="truncate text-[15px] text-muted-foreground">{placeLine(e)}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {e.cancelled && <Badge variant="accent">cancelled</Badge>}
          {e.price && <Badge variant="outline">{e.price.toLowerCase()}</Badge>}
          {e.going > 0 && <Badge variant="outline">{e.going} going</Badge>}
          {e.host && <span className="meta text-muted-foreground">hosted by <a href={`/@${e.host.handle}`} className="hover:text-foreground">{e.host.name}</a></span>}
          {e.registration_url && !e.cancelled && (
            <a href={e.registration_url} target="_blank" rel="noopener" className="meta ml-auto text-brand hover:underline">
              register ↗
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
