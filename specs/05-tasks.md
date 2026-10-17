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
- [x] **T22** ~~Vercel Analytics~~ — снято: противоречит Privacy Policy (2026-10-16)

## Этап 7. Визитки и запуск
- [ ] **T-APP** В репо app: `assetPrefix` для прода, проверка canonical визиток — *проверка:* `1handshake.com/@<handle>` на превью со стилями
- [ ] **T23** Превью ветки `build` → сводный список правок Ника → правки
- [ ] **T24** Запуск: merge в `main`, снять `NOINDEX` в Production, www → 308, проверка визиток и входа — *проверка:* критерии приёмки spec §11
- [ ] **T25** Search Console + Bing Webmaster, sitemap, запрос индексации P0; задача «Замерить GEO 1handshake» +30 дней

## Этап 8. Ивенты (v0.3, 2026-10-17)
- [x] **T26** `/events`: календарь из API app (сборка + обновление в браузере), фильтры по датам и месту, шаги «как попасть на ивенте», блоки для участников и хостов, FAQ, JSON-LD (CollectionPage, ItemList of Event, FAQPage) — *spec:* §4, §5, §7 · *проверка:* ивенты в HTML без JS, 360 px без горизонтального скролла, `npm run check`
- [x] **T27** Прокси `/e/:slug` → app `/ev/:slug`; events в шапке и подвале; блок «come to an event» на главной; sitemap, llms.txt — *проверка:* geo-check ≥ 8/10
- [x] **T28** Тексты: FAQ («without knowing a member», «what's next»), how it works 01, roadmap (ивенты → live), статья о вступлении — *проверка:* нет обещаний «один QR для всех гостей»
- [x] **T30** `/hosts`: лендинг организаторов (ценности, шаги, FAQ, HowTo), ссылки с `/events` и из подвала; шапка без github, faq последним; подсветка активной страницы в шапке и подвале — *проверка:* `npm run check`, 390 px без скролла, подсветка есть в HTML без JS
- [ ] **T29** Пересборка сайта при изменении ивентов: Deploy Hook в Vercel-проекте сайта → переменная `SITE_DEPLOY_HOOK_URL` в Vercel app — *проверка:* одобрил ивент → через 1–2 минуты он в HTML `/events`

- [~] **T26** /ideas: форма идей + кнопка в подвале — *проверка:* после создания таблицы (`supabase/ideas.sql`) тестовая идея доходит в public.ideas

## Вопросы
| Задача | Вопрос | Кому | Ответ |
|---|---|---|---|
| T15–T17 | Статьи: ок по фактам и тону? | Ник | |
| T08 | Мокапы с примером «anna kim / max» — оставить так или заменить на реальных участников с согласия? | Ник | |
| T28 | Roadmap «next» опустел (ивенты ушли в live): что ставим следующим? | Ник | колонку убрать (Ник, 2026-10-17) |

## Журнал
- 2026-10-16 · T01–T14, T18, T19 · ветка `build`: стартер очищен от РФ-частей (about, contacts, services, privacy-policy, consent, cookie, Метрика, deploy.yml); site.ts; токены бренда в OKLCH + Figtree/Geist Mono локально; шапка/подвал/тема; vercel.json (rewrites /@ → app); check.mjs под исключения §9; главная — hero с графом кольцами + все секции §2.1 под флагами `home.sections`; /how-it-works/, /faq/ (17), /open-source/, /roadmap/ (live 15 · next 3 · later 11), блог EN; OG 1200×630 и apple-icon. `npm run check` (без NOINDEX): пройдена, geo-check 9.8/10, 9 страниц в sitemap. Скриншоты 1440 / 360, светлая и тёмная — без горизонтального скролла.
- 2026-10-16 · T15–T17 · 3 статьи написаны, ждут ревью Ника.
- 2026-10-17 · T26–T28 · ветка `events-calendar`: /events (календарь, фильтры, как попасть, хосты, FAQ), прокси /e/:slug, блок на главной, шапка/подвал, тексты. `npm run check` на тестовом API: пройдена, geo-check 9.5/10, 12 страниц в sitemap; 390 / 1280 px, обе темы — без горизонтального скролла.
- 2026-10-17 · T30 · /hosts, навигация, подсветка активной страницы; публикация по разрешению Ника.
- 2026-10-17 · v0.3.2 · roadmap без «next»; офферы вместо «i need / i can» в текстах; граф с ивентами.
