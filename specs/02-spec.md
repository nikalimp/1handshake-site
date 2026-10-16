# 02 · Спецификация — 1handshake.com

> Главный документ проекта: **что** строим. **Как** — стандарт AI-Ready сайта, кроме пунктов из §9 «Исключения».
> Spec хранит только текущее состояние; история — в `changes.md`.
> Версия: 0.1 · Статус: утверждён Ником 2026-10-16
> **Ветка:** новый сайт · **Режим:** ускоренный — собственный продукт Ника, трафика нет; spec и дизайн утверждает Ник.

## 1. Коротко
- **Клиент:** 1handshake (собственный продукт Ника)
- **Формат:** информационный сайт + блог + roadmap, EN
- **Цель сайта:** чтобы люди, поиск и нейросети понимали, что такое 1handshake, как туда попасть и что с данными, — и чтобы участники входили в приложение отсюда.
- **Целевое действие:** `sign in` → `https://app.1handshake.com` (регистрации нет — только через живую встречу с участником)
- **Дедлайн:** 26 октября 2026 — к нему только P0
- **Домен:** `1handshake.com` (сайт + публичные визитки `/@handle`); приложение — `app.1handshake.com`
- **Хостинг и выкладка:** Vercel, отдельный проект `1handshake-site`, статический экспорт; деплой — push в `main` репозитория `nikalimp/1handshake-site` (приватный). DNS — reg.ru. Визитки — rewrite на app (§7).
- **Решения проекта:** `decisions.md`

## 2. Цели и метрики
Внутренняя цель Ника (10 000 участников) в критерии сайта не входит (бриф C).
| Цель | Метрика | Ориентир через 3 мес | Как меряем |
|---|---|---|---|
| Видимость в нейросетях | доля ответов, где упомянут 1handshake, по пулу из `01-research` §3 | бренд-запросы (№1–7) — 7/7 | ручной / скриптовый прогон пула: до запуска и через 30 дней |
| Поиск | показы и клики, проиндексированные страницы | все P0 в индексе | Google Search Console, Bing Webmaster |
| Переход в продукт | клики по `sign in` | — (базовая линия) | аналитика — §7 |

## 3. Аудитория и оффер
- **Главный сегмент:** люди из IT — разработчики, дизайнеры, фаундеры, маркетологи, менеджеры, — которые ходят на митапы и переезжают между городами.
- **Боль:** холодный нетворкинг — спам в личке, коннекты с незнакомцами, лента хвастовства.
- **Оффер одной фразой:** a members-only network for people in tech, built only from real handshakes — you get in by meeting a member, and every intro comes through someone you both know.
- **Почему мы (факты, из README и кода app):**
  1. Попасть можно только через живую встречу: совместное селфи → одноразовый QR на 5 минут.
  2. Интро — только через общего знакомого; он видит запрос и может поддержать его 🔥.
  3. Открытый код (AGPL-3.0, github.com/nikalimp/1handshake), закрытые данные.
  4. Визитка участника `/@handle` с llms.txt — публичная, индексируется поиском и AI.
  5. Данные в ЕС (Франкфурт); экспорт и удаление аккаунта — из профиля; метаданные фото удаляются на устройстве.
- **Возражения и ответы:**
  | Возражение | Ответ на сайте | Где |
  |---|---|---|
  | «у меня нет знакомых участников» | как попасть: прийти туда, где бывают участники; ивенты — в roadmap (v1.1) | `/how-it-works/`, FAQ |
  | «очередной Clubhouse, хайп пройдёт» | держит польза — тёплые интро и визитка, — а не эксклюзивность | `/how-it-works/`, блог |
  | «а мои данные?» | что храним, где, кто что видит, экспорт и удаление | FAQ, `/open-source/` |
  | «зачем, если есть LinkedIn» | граф встреч против графа визиток | блог (P0 статья №2) |

## 4. Карта страниц
| URL | Тип | H1 (EN) | Кластер / главный запрос | GEO (№) | Прямой ответ (черновик) | Schema | P |
|---|---|---|---|---|---|---|---|
| `/` | Главная | in connects we trust | бренд, закрытые сети | 1, 9, 10, 14, 23 | 1handshake is a members-only network for people in tech. you get in only by meeting a member in person — a joint selfie becomes a one-time invite — and every intro comes through someone you both know. free, open source. | WebSite, Organization, FAQPage | P0 |
| `/how-it-works/` | Механика | how 1handshake works | как попасть, тёплые интро | 2, 13 | four steps: meet a member, take a selfie together, scan the 5-minute QR, get your card. after that you see people one handshake away and ask for intros through mutual friends. | HowTo, BreadcrumbList | P0 |
| `/faq/` | FAQ | questions about 1handshake | бренд, приватность | 1–7 | короткие ответы на 15–20 вопросов; первые — «what's the idea?» и «what about privacy?» | FAQPage, BreadcrumbList | P0 |
| `/open-source/` | Манифест | open code, closed data | open source соцсеть, верифицированный граф | 6, 11, 15, 22 | the code of 1handshake is public under AGPL-3.0; members' data is not. what we store, where, who sees what. | AboutPage, BreadcrumbList | P0 |
| `/roadmap/` | Roadmap | roadmap | бренд | — | что уже работает, что следующее (v1.1 — ивенты), что позже; из `BACKLOG.md` без 🗄, монетизации и непринятых идей Claude | ItemList, BreadcrumbList | P0 |
| `/blog/` | Хаб блога | blog | — | — | новости продукта и статьи о нетворкинге | Blog, BreadcrumbList | P0 |
| `/blog/<slug>/` | Статья ×3 | см. §5 | тёплые интро, альтернатива LinkedIn, манифест | 12, 8, 11 | — | BlogPosting, BreadcrumbList | P0 |
| `/@<handle>` | Визитка | — (app) | персональные запросы участников | 19, 20 | отдаёт app через rewrite | ProfilePage (в app) | P0 (rewrite) |
| `/vs/linkedin/` | Сравнение | 1handshake vs linkedin | альтернатива LinkedIn | 5, 8 | | WebPage | P1 |
| `/card/` | Фича | your card, everywhere | визитка, llms.txt | 19, 20, 21 | | WebPage | P1 |
| `/releases/` | Релизы | releases | — | — | из GitHub Releases app | ItemList | P1 |
| `/blog/<slug>/` | Статьи по кластерам | — | 01-research §2 | 16–25 | контент-завод, 1–2 в неделю | BlogPosting | P1 |
| Privacy, Terms | ссылки на `app.1handshake.com/privacy` и `/terms` | — | — | — | один источник — app; сайт сам ПД не собирает | — | P0 (ссылки) |

Объём: каждая индексируемая страница — от 250 слов основного текста (стандарт §2.8). Страницы городов — только под реальные ивенты (P2).

### Навигация
- **Шапка:** знак `1h` + `1handshake` · how it works · faq · roadmap · blog · кнопка `sign in` (пилюля fire)
- **Подвал (как у telegram.org — разделами):** product (how it works, roadmap, releases·P1) · about (faq, open source, blog) · legal (privacy, terms → app) · code (GitHub) · каналы (Telegram, X — только если есть ссылки) · тег разработчика (§5)
- **Мобильное меню:** те же 4 пункта + `sign in` внизу; переключатель темы light / dark / system

## 5. Контент страниц
Источник фактов — бриф, README, бренд-платформа, код app. Тон — бренд-платформа: строчные, коротко, тепло.

### `/` Главная (по модели telegram.org)
| # | Блок | Содержание | Источник |
|---|---|---|---|
| 1 | Hero | H1 `in connects we trust` (буквально); подзаголовок — прямой ответ (§4); кнопка `sign in`; ссылка `how to get in →` | decisions, README |
| 2 | Recent news | 2 последних поста блога (как «Recent News» у telegram.org) | блог |
| 3 | why 1handshake? | сетка 6–9 блоков «заголовок + одна строка»: real (только через встречу) · warm (интро через общих знакомых, 🔥) · verified (каждое ребро — селфи) · yours (визитка работает в поиске и AI) · open (код на GitHub) · private (данные в ЕС, экспорт и удаление) · one handshake away (видно людей через одно рукопожатие) · AI-native (llms.txt, MCP — roadmap) · free | README, бренд-платформа |
| 4 | Манифест | короткая версия манифеста EN из бренд-платформы (LinkedIn made networking cold… everyone you need is one handshake away) | бренд-платформа |
| 5 | FAQ | 5 вопросов: what's the idea · how do I get in · what about privacy · is it free · is it open source | бриф (Ник) + README |
| 6 | About | 2–3 предложения что это и с какого года; ссылки | README |

### `/how-it-works/`
Блоки: 1) прямой ответ; 2) шаги инвайта: селфи вместе → QR на 5 минут с селфи в центре → гость сканирует камерой → рассказывает о себе голосом или текстом → AI собирает визитку → вступление, 🤝 создан; 3) connect: люди через одно рукопожатие, `connect` / `skip`, запрос идёт через общего знакомого, он может поддержать 🔥; 4) feed и стена; 5) graph; 6) визитка `/@handle` + llms.txt, I need / I can (размыт для гостей); 7) видимость: open to hiring / open to network; 8) как попасть без знакомых участников (честно: найти участника; ивенты — v1.1); 9) FAQ 3–5. Скриншоты app — с тестовыми данными.
Источник: `Product/MVP — флоу и экраны.md`, Техархитектура «Статус разработки».

### `/faq/` — первая очередь вопросов
1. what's the idea of 1handshake? *(Ник)* 2. what about privacy? *(Ник)* 3. how do I join? 4. can I join without knowing a member? 5. is it free? 6. who can see my profile? 7. what is a card and llms.txt? 8. what is an intro and a fire 🔥? 9. what happens when I delete my account? (ghost 👻) 10. where is my data stored? 11. is 1handshake open source? which license? 12. how is it different from linkedin? 13. why only google sign-in? 14. what is open to hiring / open to network? 15. who builds 1handshake? (ответ без лица: независимый open-source проект; тег разработчика) 16. is there a mobile app? (PWA) 17. what's next? → roadmap.
Ответы — 1–3 предложения, факты из README, privacy app, BACKLOG «Решение».

### `/open-source/`
Манифест «open code, closed data»: репозиторий и лицензия AGPL-3.0 (что значит: можно читать и запускать; модифицированный сервис — делиться изменениями); что храним (email Google, визитка, день рождения — видишь только ты, рукопожатия и запросы, совместное селфи); где (Postgres и хранилище в ЕС, Франкфурт; фото перекодируются на устройстве, метаданные удаляются); кто что видит; права (экспорт, удаление → ghost). Источник: `app/src/app/privacy/page.tsx`, `app/README.md`.

### `/roadmap/`
Три колонки / секции: **live** (сделано в MVP) · **next** (v1.1: ивенты, рефки организаторов, QR ивента) · **later** (директ, группы, компании, чек-ины, AI-матчинг, MCP, дни рождения, мультиязычность…). Данные — `src/content/roadmap.ts`, переносится из `BACKLOG.md` вручную (бэклог вне репозитория); при изменении бэклога Claude обновляет файл. Не публикуем: 🗄, монетизацию (10.9), непринятые идеи Claude. Рекрутмент (6.4) — показываем в «later» как фичу (Ник, 2026-10-16).

### Блог — P0 (3 статьи, пишет Claude, утверждает Ник)
| slug | Заголовок (черновик) | Кластер |
|---|---|---|
| `/blog/what-is-a-warm-introduction/` | what is a warm introduction (and how to ask for one) | тёплые интро |
| `/blog/linkedin-alternatives-for-tech/` | linkedin alternatives for people in tech, 2026 | альтернатива LinkedIn; честное сравнение, 1handshake — одна из опций |
| `/blog/why-you-can-only-join-in-person/` | why you can only join 1handshake in person | манифест, верифицированный граф |
Дальше — контент-завод (`/content`) после запуска: 1–2 статьи в неделю по кластерам `01-research` §2.

### Тег разработчика в подвале
`built by @nikalimp` → `https://nikalimp.ru` (Ник, 2026-10-16).

## 6. Голос бренда
- Обращение: на «you».
- **Регистр:** строчные — только стилистическая фишка статичных элементов интерфейса (заголовки блоков, кнопки, навигация, подписи). Контент — статьи блога, FAQ-ответы, тексты страниц, манифест в абзацах — по обычным правилам, с заглавными (Ник, 2026-10-16).
- Тон: коротко, тепло, разговорно, как друг зовёт в клуб; без пафоса и «exclusive community».
- Слова: member (не user), handshake, intro, card, fire 🔥, ghost 👻, I need / I can.
- Не используем: «users», «exclusive», «apply now», «waitlist», «revolutionary», выдуманные цифры участников.
- Эмодзи: только 🤝 🔥 👻.
- Пример: `you get in only by meeting a member. no waitlist, no hacks. take a selfie together, scan the code, and you're one handshake away from everyone they know.`

## 7. Функции и интеграции
| Функция | Как работает | Данные | Примечание |
|---|---|---|---|
| `sign in` | ссылка на `https://app.1handshake.com` | — | во всех CTA |
| Визитки `/@handle` | `vercel.json` rewrites: `/@:handle` → `https://app.1handshake.com/@:handle`, `/@:handle/llms.txt` → то же | — | **в app:** `assetPrefix`/абсолютные ассеты, иначе через прокси сломаются `/_next/*`, шрифты, картинки; canonical визитки — `https://1handshake.com/@handle` (уже относительный `/@handle` — проверить metadataBase) |
| Блог | `content/blog/*.md` + frontmatter (title, description, date, updated) | — | контент-завод после запуска |
| Roadmap | `src/content/roadmap.ts` | — | синхронизация с BACKLOG вручную |
| llms.txt / llms-full.txt | генерация из контента | — | плюс ссылка на пример визитки |
| Аналитика | Vercel Web Analytics (без cookies → без баннера); событие — клик `sign in` | Vercel | Ник, 2026-10-16 |
| Тема | light / dark / system | localStorage | как в app |
| Формы | нет | — | сайт ПД не собирает |
| Выключенные функции | `site.features`: releases=false (P1), vs=false (P1) | — | |

## 8. Дизайн
`03-design.md`. Дизайн-система бренда уже утверждена (`Product/design-system/`): токены, Figtree + Geist Mono, пилюли, fire #FF5F1F, иконки Lucide. Тёмная тема — да. Анимации — минимальные (знак 1h, точечная сетка графа в hero — на CSS). Иллюстрации — скриншоты app с тестовыми данными; фото встреч — только с согласием (пока нет).

## 9. Исключения из стандарта
| Пункт стандарта | Отступление | Причина |
|---|---|---|
| §1.3 хостинг в РФ | Vercel (EU-регион app — Франкфурт) | Global, решение Ника 2026-10-16 |
| §1.4 шрифты | локально, без изменений | — (не исключение, для ясности) |
| §2.2 ЧПУ | визитки `/@handle` — не английские слова и без слеша | формат продукта, отдаёт app |
| §2.4 хлебные крошки | только в JSON-LD, в вёрстке — нет на коротких страницах | минимализм референса telegram.org |
| §3 title 40–65 | сохраняется; строчные допустимы | бренд |
| §3 коммерческие факторы Яндекса | не применяются | Global, нет услуг и цен |
| §4.8 robots | открыт для всех AI-ботов, включая тренировочных | GEO — главная цель |
| §6.9 подписи по-русски | интерфейс на английском | решение Ника 2026-10-12 |
| §7.2, §7.10 Главред | не применяется к EN; замена — проверка читаемости EN в `check.mjs` (⚠️ или отключить) | Главред только для русского |
| §8 право РФ (152-ФЗ, согласие, реквизиты, баннер cookies, Meta) | не применяется; политика и условия — в app, по GDPR; сайт без форм и cookies | Global без юрлица, решение Ника 2026-10-16 |
| §9 Метрика, Вебмастер, Яндекс Бизнес, 2ГИС | не применяются; Search Console + Bing Webmaster; IndexNow сохраняется (Bing) | Global |
| §10.1 регистрация на клиента | всё на Нике | собственный продукт |
| §11 DoD | `check.mjs` без проверок Метрики, ИНН/ОГРН, согласия, Главреда — настраивается задачей в 05-tasks | следствие строк выше |

## 10. Не входит в проект
- Изменения в app, кроме обеспечения работы визиток через прокси (assetPrefix, canonical) — отдельные задачи в app.
- Мультиязычность (бэклог 10.8).
- Страницы городов, `/vs/`, `/card/`, `/releases/` — P1.
- Регулярный контент блога — контент-завод после запуска.
- Регистрация, вейтлист, формы.

## 11. Критерии приёмки
- [ ] все P0 из §4 опубликованы на `1handshake.com`, тексты утверждены Ником;
- [ ] `sign in` ведёт в app с телефона и компьютера;
- [ ] `1handshake.com/@<handle>` и `/@<handle>/llms.txt` открывают визитку без логина, со стилями и картинками, canonical на `1handshake.com`;
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO = 100;
- [ ] geo-check ≥ 8/10 без ошибок; llms.txt, sitemap, robots, JSON-LD валидны;
- [ ] Search Console подтверждён, sitemap отправлен, P0 запрошены на индексацию;
- [ ] светлая и тёмная темы; 360 px без горизонтального скролла;
- [ ] в коде нет `TODO`.

## 12. Сроки
| Этап | Дата | Что нужно от Ника |
|---|---|---|
| Spec | 16.10 ✅ | — |
| Дизайн: 2–3 прототипа главной | 18–19.10 | выбрать |
| План и задачи | 20.10 | утвердить |
| Сборка | 20–24.10 | смотреть превью после блоков; утвердить 3 статьи |
| Проверка | 25.10 | сводный список правок |
| Запуск | 26.10 | Vercel-проект, DNS корня на reg.ru, push репо |

## 13. Изменения
Текущая версия — 0.1. История — `changes.md`.
