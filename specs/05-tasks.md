# 05 · Задачи — 1handshake.com

> По `04-plan.md`. Задачи по 30–90 минут, у каждой — пункт spec и проверка. Сборка — ветка `build`.
> Статусы: `[ ]` не начата · `[~]` в работе · `[x]` готова · `[?]` нужен ответ

## Этап 1. Каркас
- [x] **T01** Чистка стартера: удалить `about`, `contacts`, `services`, `privacy-policy`, `consent`, cookie-баннер, Метрику, `deploy.yml`; `lang=en` — *spec:* §9 · *проверка:* `npm run build` проходит
- [x] **T02** `site.ts` по spec §1, бриф C: Organization, ссылки, sameAs (GitHub), features — *проверка:* нет TODO в `site.ts`
- [x] **T03** Токены бренда и шрифты Figtree + Geist Mono локально, светлая и тёмная темы — *design:* §3 · *проверка:* контраст §3, 360 px; **после T03 стиль заморожен**
- [x] **T04** Шапка (B), мобильное меню без JS, футер разделами, переключатель темы, тег built by @nikalimp — *spec:* §4 · *проверка:* меню работает без JS, фокус виден
- [x] **T05** `vercel.json`: rewrites `/@:handle`, `/@:handle/llms.txt`, `/_next/image` → app; `check.mjs` без проверок Метрики, ИНН, согласия, Главреда (EN) — *spec:* §7, §9 · *проверка:* `npm run check` проходит на каркасе с `NOINDEX=1`

## Этап 2. Главная
- [x] **T06** Hero: сетка точек, H1, прямой ответ, CTA, `RingsGraph` (кольца, ты в центре, огненный путь) — *design:* §2.1 · *проверка:* текст в HTML без JS, граф с `aria-label`
- [x] **T07** Секции recent news, how it works 01–04, why 1handshake? — *проверка:* 360 / 1440
- [x] **T08** Секции get in (QR), warm intros (запрос с 🔥), your card (/@anna) — мокапы с подписью example — *проверка:* нет выдуманных цифр
- [x] **T09** Секции open code / closed data, manifesto, blog, FAQ (5 + 2), флаги `home.ts` — *проверка:* FAQPage в JSON-LD совпадает с видимым FAQ

## Этап 3. Внутренние страницы
- [x] **T10** `/how-it-works/` по spec §5 (≥250 слов, HowTo) — *проверка:* прямой ответ в первых 100 словах
- [x] **T11** `/faq/` — 17 вопросов, FAQPage — *проверка:* ответы из фактов README/app
- [x] **T12** `/open-source/` — манифест и данные, AboutPage — *проверка:* совпадает с app `/privacy`
- [x] **T13** `/roadmap/` из BACKLOG (live / next / later) — *проверка:* нет 🗄, 10.9, непринятых идей Claude; рекрутмент в later
- [x] **T14** Блог EN: хаб и шаблон статьи, даты, автор (Organization) — *проверка:* BlogPosting валиден

## Этап 4. Статьи
- [~] **T15** Статья «what is a warm introduction…» — *проверка:* ≥ 800 слов, без выдуманных фактов, ревью Ника
- [~] **T16** Статья «linkedin alternatives for people in tech, 2026» — *проверка:* факты о других сервисах — со ссылками на источники
- [~] **T17** Статья «why you can only join 1handshake in person» — *проверка:* ревью Ника

## Этап 5. GEO и SEO
- [x] **T18** title/description всех страниц, OG 1200×630 (шаблон с 1h) — *проверка:* длины в норме
- [x] **T19** llms.txt, llms-full.txt, sitemap, robots (все AI-боты открыты) — *проверка:* geo-check по `out/` ≥ 8/10

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
| T15–T17 | Статьи: ок по фактам и тону? | Ник | |
| T08 | Мокапы с примером «anna kim / max» — оставить так или заменить на реальных участников с согласия? | Ник | |

## Журнал
- 2026-10-16 · T01–T14, T18, T19 · ветка `build`: стартер очищен от РФ-частей (about, contacts, services, privacy-policy, consent, cookie, Метрика, deploy.yml); site.ts; токены бренда в OKLCH + Figtree/Geist Mono локально; шапка/подвал/тема; vercel.json (rewrites /@ → app); check.mjs под исключения §9; главная — hero с графом кольцами + все секции §2.1 под флагами `home.sections`; /how-it-works/, /faq/ (17), /open-source/, /roadmap/ (live 15 · next 3 · later 11), блог EN; OG 1200×630 и apple-icon. `npm run check` (без NOINDEX): пройдена, geo-check 9.8/10, 9 страниц в sitemap. Скриншоты 1440 / 360, светлая и тёмная — без горизонтального скролла.
- 2026-10-16 · T15–T17 · 3 статьи написаны, ждут ревью Ника.
