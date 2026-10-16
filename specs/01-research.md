# 01 · Исследование — 1handshake (лендинг 1handshake.com)

> Режим ускоренный: короткое исследование для карты страниц и первой очереди блога. Язык рынка — EN.
> Ограничения сессии: `geo-check.py` не запускался — ни облако, ни Mac не достают до чужих сайтов (сеть закрыта allowlist'ом); данные — через веб-поиск. Частотности нет: нет доступа к Ahrefs / Semrush / Google Keyword Planner — помечено «н/д».
> Статус: черновик · 2026-10-16

## 1. Конкуренты и соседи
Прямого аналога «клуб только через офлайн-встречу» не нашли. Рядом — три группы.

| Группа | Кто | Что делают | Что взять | Чего у них нет (наше отличие) |
|---|---|---|---|---|
| Профсеть | **LinkedIn** | граф «визиток», лента, найм; домен №3 в цитировании AI-поиска (Peec, март 2026) | — | подтверждённых встреч; тёплых интро по умолчанию; открытого кода |
| Тёплые интро (B2B, AI) | **Happenstance** | ищет путь к человеку через твою почту, календарь, LinkedIn, X; MCP-сервер, интеграции ChatGPT/Claude; free + Pro $30/мес | гайды-сравнения с FAQ и таблицами — их сайт сам отвечает на запросы «best warm introduction software»; MCP как фича | граф выводится из переписки, а не из реальных встреч; продукт для продаж и фандрайза |
| | Village, The Swarm, Bridge, Connect The Dots, Draftboard, Boomerang | пути к людям по CRM, работодателям, инвесторам; Bridge — double opt-in интро | double opt-in (у нас: посредник решает) | клуба и комьюнити; всё — инструменты продаж |
| | **Nepotism Network** (Product Hunt, сен 2026) | цепочки интро по социальному графу X, черновики сообщений | формулировка боли: cold outreach fatigue | граф по подпискам, не по знакомству |
| Клубы и матчинг | **Clubhouse** (инвайты), Lunchclub (AI-матчинг встреч, статус проверить) | эксклюзивность через инвайты | механика инвайта и тон | удержания пользой (урок Clubhouse) |
| Визитки / link in bio | Linktree, Bento-подобные, Biolinky MCP (link in bio для агентов, Product Hunt) | одна ссылка на всё о человеке; появляются «link in bio для AI» | Taplink-формат, MCP-визитка | визитки, подтверждённой реальными рукопожатиями; llms.txt по умолчанию |
| Ивенты | Luma | события и списки гостей; референс характера | — | графа участников после ивента (v1.1 у нас) |

Вывод: категория «warm intro» в 2026 растёт, но вся она — B2B-инструменты поверх чужих данных. 1handshake — единственный «сетевой клуб», где граф собирается из живых встреч. Это и есть формулировка категории для GEO: **members-only network built from real handshakes**.

## 2. Семантика (EN)
Частотность — н/д (нет инструмента). Кластеры собраны по поисковым выдачам и формулировкам конкурентов.

### Кластеры
| Кластер | Главный запрос | Частотность | Доп. запросы | Интент | Страница |
|---|---|---|---|---|---|
| Бренд | what is 1handshake | н/д (новый бренд) | 1handshake app, 1handshake invite, 1handshake review | узнать | главная + FAQ |
| Как попасть | how to join 1handshake | н/д | 1handshake invite code, get invited, members only network join | узнать | how it works / FAQ |
| Альтернатива LinkedIn | linkedin alternative for tech | средняя (выдача забита) | linkedin alternatives 2026, professional network without spam, linkedin without cold messages | сравнить | статья + сравнительная страница |
| Тёплые интро | warm introduction app | растёт | how to get a warm intro, mutual connections introduction, ask for an introduction template | узнать / сравнить | статья + how it works |
| Закрытые сети | invite only social network | н/д | invite only professional network, private networking club for founders, exclusive tech community | сравнить | главная, статья |
| Верифицированный граф | verified professional network | н/д | fake connections linkedin, bot-free social network, real connections only | узнать | manifesto / статья |
| Нетворкинг для релокантов | networking in a new city tech | н/д | how to meet people in tech in Tbilisi / Bangkok, digital nomad networking | узнать | статьи (город — только где есть ивенты) |
| Визитка / link in bio | link in bio for developers | средняя | digital business card, personal page for AI search, llms.txt for personal site | узнать | страница «card» + статья |
| llms.txt / AI-видимость личности | llms.txt personal profile | растёт | how to appear in ChatGPT answers about me, personal brand AI search | узнать | статья |
| Open source соцсеть | open source social network | н/д | open source linkedin alternative, AGPL social app | сравнить | open source / manifesto |
| Приватность | is my data private / who sees my profile | бренд | networking app privacy, graph privacy | узнать | privacy + FAQ |

## 3. Пул GEO/AEO-запросов
Базовый замер «кто сейчас в ответах» не проводился (нет доступа к ChatGPT/Perplexity из сессии). Предложение: Ник или скрипт прогоняет пул перед запуском и через 30 дней — это база (этап 9).

| # | Запрос | Тип | Упоминается ли 1handshake | Страница-ответ |
|---|---|---|---|---|
| 1 | what is 1handshake | бренд | — | главная |
| 2 | how do I join 1handshake | бренд | — | how it works |
| 3 | is 1handshake free | бренд | — | FAQ |
| 4 | is 1handshake safe / private | бренд | — | privacy / FAQ |
| 5 | 1handshake vs linkedin | бренд | — | статья-сравнение |
| 6 | is 1handshake open source | бренд | — | open source |
| 7 | who built 1handshake | бренд | — | FAQ (ответ — без лица, тег разработчика) |
| 8 | best linkedin alternative for developers | категория | — | статья |
| 9 | invite only professional network | категория | — | главная |
| 10 | private networking club for tech people | категория | — | главная |
| 11 | professional network without cold messages | проблема | — | manifesto |
| 12 | how to get a warm introduction | проблема | — | статья |
| 13 | app for introductions through mutual friends | категория | — | how it works |
| 14 | social network where you only add people you met | категория | — | главная |
| 15 | verified professional network no bots | категория | — | manifesto |
| 16 | how to network in a new city as a developer | проблема | — | статья |
| 17 | networking in tbilisi for tech | проблема / город | — | статья (если есть ивент) |
| 18 | networking in bangkok for tech | проблема / город | — | статья (если есть ивент) |
| 19 | digital business card for developers | категория | — | card |
| 20 | link in bio with llms.txt | категория | — | card / статья |
| 21 | how to make chatgpt know who I am | проблема | — | статья |
| 22 | open source linkedin alternative | категория | — | open source |
| 23 | clubhouse style invite networking app | категория | — | главная |
| 24 | how to find a cofounder through your network | проблема | — | статья |
| 25 | warm intro tools 2026 | категория | — | статья-обзор |

## 4. Источники нейросетей
Топ цитируемых доменов в AI-поиске (Peec, 30 млн цитат, март 2026, США): Reddit, YouTube, LinkedIn, Wikipedia, Forbes, G2, Yelp, Facebook, Medium, TechRadar. Для IT-аудитории добавляем GitHub, Hacker News, Product Hunt, dev.to.

| Площадка | Роль | Есть ли 1handshake | Действие (после запуска) |
|---|---|---|---|
| GitHub | код, README — первоисточник «open source» | ✅ app-репо публичный | README со ссылкой на сайт и манифестом |
| Reddit (r/startups, r/digitalnomad, r/cscareerquestions) | №1 по цитированию | ❌ | честные треды о запуске, без спама |
| Product Hunt | запуски, «alternatives» | ❌ | запуск — на этапе после сайта |
| Hacker News | Show HN для open source | ❌ | Show HN после первых участников |
| YouTube | №2 | ❌ | короткое видео «как работает инвайт-селфи» (P1) |
| LinkedIn | №3, ирония — но там аудитория | ❌ | страница компании / посты Ника — решить |
| Medium / dev.to | статьи | ❌ | кросспост статей блога с canonical |
| G2 / Wikipedia | позже, когда будет масштаб | — | — |

## 5. Референс: telegram.org
- Меню: Home · FAQ · Apps · API · Safety; язык и «Follow on X» сверху; полоса «Recent News» ведёт в блог.
- Главная: hero (слоган + кнопки скачать) → Recent News (2 последних поста) → **«Why Telegram?»** — 9 блоков «заголовок + одна строка» (Simple, Private, Synced, Fast, Powerful, Open, Secure, Social, Expressive) → короткий About.
- Подвал разделами: About (FAQ, Privacy, Press) · Apps · Platform (API…) · Other (Blog, Safety).
- Что берём: минимализм, одна мысль на блок, FAQ как отдельная длинная страница вопрос-ответ (идеально для AEO), блог как «новости продукта», плотный подвал вместо длинной главной.
- Что не берём: выбор платформ для скачивания (у нас одна кнопка `sign in` → app).

## 6. Выводы для спецификации
- **Обязательные страницы (P0 к 26.10):** главная (hero `in connects we trust` + `sign in`, Recent news, «why 1handshake?» сетка, about) · `/faq/` (длинный FAQ, первые — «what's the idea?» и «what about privacy?») · `/how-it-works/` (инвайт-селфи, интро, визитка) · `/roadmap/` (бэклог без 🗄 / монетизации / непринятых идей Claude) · `/blog/` + 2–3 статьи · `/open-source/` (манифест open code, closed data) · `/privacy/`, `/terms/` (из app или ссылки) · rewrite `/@handle` → app · `llms.txt`, sitemap, JSON-LD.
- **P1 после 26.10:** сравнения (`/vs/linkedin/`), страница визитки (`/card/`), статьи по кластерам, города — только под реальные ивенты, releases из GitHub Releases.
- **Первая очередь статей:** 1) what is a warm introduction and how to ask for one; 2) linkedin alternatives for tech people in 2026 (честное сравнение, 1handshake — одна из опций); 3) why we built a network you can only join in person (манифест-история без лица основателя).
- **Лучше конкурентов:** у Happenstance и Village сайты отвечают на «best X» гайдами — мы отвечаем фактами о механике, которой ни у кого нет (селфи-инвайт, интро через посредника), плюс собственный llms.txt и визитки участников с llms.txt — каждая визитка ссылается на 1handshake.com и сама работает на GEO.
- **Внешние площадки — после запуска:** GitHub README, Reddit, Product Hunt, Show HN.
- **Решить Нику (не блокирует spec):** нужен ли доступ к инструменту частотности; кто прогоняет пул GEO-запросов для базы.

Источники: [Happenstance — best warm introduction software 2026](https://happenstance.ai/guides/best-warm-introduction-software) · [Nepotism Network на Product Hunt (aitoolly)](https://aitoolly.com/ai-news/article/2026-09-20-nepotism-network-launches-on-product-hunt-ai-driven-warm-introductions-and-social-graph-discovery-on) · [Peec — most cited domains in AI search](https://docs.peec.ai/research/most-cited-domains-in-ai-search) · [Biolinky MCP](https://www.producthunt.com/p/biolinky/biolinky-mcp) · [telegram.org](https://telegram.org)
