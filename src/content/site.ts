// Единый источник правды о проекте. По specs/00-brief.md (C) и specs/02-spec.md §1.
// Специфика РФ (контакты, реквизиты, Метрика) снята — spec §9 «Исключения».

export const site = {
  url: "https://1handshake.com",
  name: "1handshake",
  orgType: "Organization" as const,
  // title главной (40–65 символов вместе с брендом)
  title: "1handshake — a members-only network built from real handshakes",
  description:
    "1handshake is a members-only network for people in tech. You join only by meeting a member in person, and every intro comes through someone you both know.",
  tagline: "a members-only network for people in tech, built from real handshakes",
  slogan: "in connects we trust", // decisions.md — дословно
  lang: "en",
  locale: "en_US",
  foundingYear: 2026,

  // Главное целевое действие — вход в приложение
  cta: { label: "sign in", href: "https://app.1handshake.com" },

  links: {
    app: "https://app.1handshake.com",
    github: "https://github.com/nikalimp/1handshake",
    privacy: "/privacy",
    terms: "/terms",
    email: "hello@1handshake.com",
    developer: { label: "built by @nikalimp", href: "https://nikalimp.ru" },
  },

  // Идеи от посетителей: форма /ideas пишет в таблицу public.ideas в Supabase приложения (только insert, RLS).
  // Ключ publishable — публичный по назначению. Разбор идей — в админке app (задача у Ника).
  ideas: {
    endpoint: "https://dydcapnzyoxtgxnqsyit.supabase.co/rest/v1/ideas",
    key: "sb_publishable_CAisnadsRdZR-quoA2pTLQ_e-ayIvRA",
  },

  sameAs: ["https://github.com/nikalimp/1handshake"],
  socials: [] as { label: string; href: string }[], // Telegram, X — когда появятся

  darkTheme: true,

  // Функции — флагами (стандарт §1.9)
  features: {
    blog: true,
    releases: false, // P1
    vs: false, // P1
    card: false, // P1
  },
};

// Тестовая выкладка: NOINDEX=1 закрывает сайт от индексации.
export const noindex = process.env.NOINDEX === "1";

export const nav = [
  { href: "/how-it-works", label: "how it works" },
  { href: "/events", label: "events", also: ["/hosts"] },
  { href: "/roadmap", label: "roadmap" },
  ...(site.features.blog ? [{ href: "/blog", label: "blog" }] : []),
  { href: "/faq", label: "faq" },
];
