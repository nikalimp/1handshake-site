// Даты ивентов — во времени зоне самого ивента, как в app. Работает и при сборке, и в браузере.

const part = (d: Date, tz: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: tz, ...opts }).format(d).toLowerCase().replace(",", "");

/** "09:00–16:00" или "09:00" */
export function timeRange(e: { starts_at: string; ends_at: string | null; timezone: string }) {
  const tz = e.timezone || "UTC";
  const t = (iso: string) => part(new Date(iso), tz, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  if (!e.ends_at) return t(e.starts_at);
  const sameDay = dayKey(e.starts_at, tz) === dayKey(e.ends_at, tz);
  return sameDay ? `${t(e.starts_at)}–${t(e.ends_at)}` : `${t(e.starts_at)} – ${dayLabel(e.ends_at, tz)} ${t(e.ends_at)}`;
}

/** "2026-10-17" в зоне ивента — ключ группировки по дням */
export function dayKey(iso: string, tz: string) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: tz || "UTC", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(iso)).map((x) => [x.type, x.value]),
  );
  return `${p.year}-${p.month}-${p.day}`;
}

/** "sat 17 oct" */
export const dayLabel = (iso: string, tz: string) => part(new Date(iso), tz || "UTC", { weekday: "short", day: "numeric", month: "short" });

/** "Asia/Bangkok" → "bangkok time" */
export const tzLabel = (tz: string) => (!tz || tz === "UTC" ? "utc" : `${(tz.split("/").pop() ?? tz).replace(/_/g, " ").toLowerCase()} time`);

export const placeLine = (e: { online: boolean; venue: string | null; city: string | null; country: string | null }) =>
  e.online ? "online" : [e.venue, e.city, e.country].filter(Boolean).join(" · ") || "place to be announced";
