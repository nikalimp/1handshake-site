# 05 · Задачи — 1handshake.com

> По `04-plan.md`. Задачи по 30–90 минут, у каждой — пункт spec и проверка. Сборка — ветка `build`.
> Статусы: `[ ]` не начата · `[~]` в работе · `[x]` готова · `[?]` нужен ответ

## Этап 1. Каркас
- [ ] **T01** Чистка стартера: удалить `about`, `contacts`, `services`, `privacy-policy`, `consent`, cookie-баннер, Метрику, `deploy.yml`; `lang=en` — *spec:* §9 · *проверка:* `npm run build` проходит
- [ ] **T02** `site.ts` по spec §1, бриф C: Organization, ссылки, sameAs (GitHub), features — *проверка:* нет TODO в `site.ts`
- [ ] **T03** Токены бренда и шрифты Figtree + Geist Mono локально, светлая и тёмная темы — *design:* §3 · *проверка:* контраст §3, 360 px; **после T03 стиль заморожен**
- [ ] **T04** Шапка (B), мобильное меню без JS, футер разделами, переключатель темы, тег built by @nikalimp — *spec:* §4 · *проверка:* меню работает без JS, фокус виден
- [ ] **T05** `vercel.json`: rewrites `/@:handle`, `/@:handle/llms.txt`, `/_next/image` → app; `check.mjs` без проверок Метрики, ИНН, согласия, Главреда (EN) — *spec:* §7, §9 · *проверка:* `npm run check` проходит на каркасе с `NOINDEX=1`

## Этап 2. Главная
- [ ] **T06** Hero: сетка точек, H1, прямой ответ, CTA, `RingsGraph` (кольца, ты в центре, огненный путь) — *design:* §2.1 · *проверка:* текст в HTML без JS, граф с `aria-label`
- [ ] **T07** Секции recent news, how it works 01–04, why 1handshake? — *проверка:* 360 / 1440
- [ ] **T08** Секции get in (QR), warm intros (запрос с 🔥), your card (/@anna) — мокапы с подписью example — *проверка:* нет выдуманных цифр
- [ ] **T09** Секции open code / closed data, manifesto, blog, FAQ (5 + 2), флаги `home.ts` — *проверка:* FAQPage в JSON-LD совпадает с видимым FAQ

## Этап 3. Внутренние страницы
- [ ] **T10** `/how-it-works/` по spec §5 (≥250 слов, HowTo) — *проверка:* прямой ответ в первых 100 словах
- [ ] **T11** `/faq/` — 17 вопросов, FAQPage — *проверка:* ответы из фактов README/app
- [ ] **T12** `/open-source/` — манифест и данные, AboutPage — *проверка:* совпадает с app `/privacy`
- [ ] **T13** `/roadmap/` из BACKLOG (live / next / later) — *проверка:* нет 🗄, 10.9, непринятых идей Claude; рекрутмент в later
- [ ] **T14** Блог EN: хаб и шаблон статьи, даты, автор (Organization) — *проверка:* BlogPosting валиден

## Этап 4. Статьи
- [ ] **T15** Статья «what is a warm introduction…» — *проверка:* ≥ 800 слов, без выдуманных фактов, ревью Ника
- [ ] **T16** Статья «linkedin alternatives for people in tech, 2026» — *проверка:* факты о других сервисах — со ссылками на источники
- [ ] **T17** Статья «why you can only join 1handshake in person» — *проверка:* ревью Ника

## Этап 5. GEO и SEO
- [ ] **T18** title/description всех страниц, OG 1200×630 (шаблон с 1h) — *проверка:* длины в норме
- [ ] **T19** llms.txt, llms-full.txt, sitemap, robots (все AI-боты открыты) — *проверка:* geo-check по `out/` ≥ 8/10

## Этап 6. Качество
- [ ] **T20** Адаптив 360 / 768 / 1280 / 1440, обе темы, `prefers-reduced-motion`
- [ ] **T21** Доступность и Lighthouse mobile (Perf ≥ 90, A11y ≥ 95, SEO 100) по 3 страницам
- [ ] **T22** Vercel Analytics + событие клика `sign in`

## Этап 7. Визитки и запуск
- [ ] **T-APP** В репо app: `assetPrefix` для прода, проверка canonical визиток — *проверка:* `1handshake.com/@<handle>` на превью со стилями
- [ ] **T23** Превью ветки `build` → сводный список правок Ника → правки
- [ ] **T24** Запуск: merge в `main`, снять `NOINDEX` в Production, www → 308, проверка визиток и входа — *проверка:* критерии приёмки spec §11
- [ ] **T25** Search Console + Bing Webmaster, sitemap, запрос индексации P0; задача «Замерить GEO 1handshake» +30 дней

## Вопросы
| Задача | Вопрос | Кому | Ответ |
|---|---|---|---|
| | | | |

## Журнал
