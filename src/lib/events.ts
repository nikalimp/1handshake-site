// Календарь ивентов (spec §4 /events, §7). Данные — API приложения: только одобренные ивенты участников.
// Статический экспорт: список попадает в HTML при сборке, а в браузере календарь подтягивает свежий.
// Сайт пересобирается, когда в app одобряют, меняют или отменяют ивент (deploy hook, spec §7).

export const EVENTS_API = process.env.EVENTS_API ?? "https://app.1handshake.com/api/events";

export type SiteEvent = {
  slug: string;
  title: string;
  description_md: string;
  cover_url: string | null;
  starts_at: string;
  ends_at: string | null;
  timezone: string;
  online: boolean;
  venue: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  price: string | null;
  registration_url: string | null;
  cancelled: boolean;
  going: number;
  checked_in: number;
  host: { name: string | null; handle: string; url: string } | null;
};
export type Place = { city: string | null; country: string | null };
export type Calendar = { events: SiteEvent[]; places: Place[]; online: boolean };

export const emptyCalendar: Calendar = { events: [], places: [], online: false };

/** При сборке. Если app недоступен — пустой календарь (браузер всё равно подтянет свежий список). */
export async function getCalendar(): Promise<Calendar> {
  try {
    const res = await fetch(EVENTS_API, { signal: AbortSignal.timeout(10_000), cache: "force-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Calendar;
    return { events: data.events ?? [], places: data.places ?? [], online: Boolean(data.online) };
  } catch (e) {
    console.warn(`[events] ${EVENTS_API} is not reachable, the calendar is built empty:`, (e as Error).message);
    return emptyCalendar;
  }
}

/** Адрес страницы ивента на сайте: /e/<slug> проксируется в app (vercel.json). */
export const eventPath = (slug: string) => `/e/${slug}`;
