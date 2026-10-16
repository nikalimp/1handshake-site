# 04 · План — 1handshake.com

> По утверждённым `02-spec.md` v0.1 и `03-design.md` §2.1. Режим ускоренный.
> Статус: черновик · 2026-10-16

## 1. Основа
- Стартер: `.starter` NikitOS (ai-ready-site 1.0.0) → `site/`
- Репозиторий: `nikalimp/1handshake-site` (приватный). Сборка — в ветке `build`, Ник пушит с Mac; Vercel делает превью на каждую ветку; `main` = прод.
- Хостинг и деплой: **Vercel**, проект сайта, Git-интеграция (push → деплой). `.github/workflows/deploy.yml` (rsync стартера) — удаляем: секретов нет, на каждом push он падает.
- Тестовый адрес: превью-адреса Vercel ветки `build` (Vercel сам отдаёт `X-Robots-Tag: noindex` на превью) + `NOINDEX=1` в env Preview.
- Прод до запуска: в env Production — `NOINDEX=1`, пока `main` не получит готовый сайт (защита от индексации стартера, если домен уже смотрит на проект). Снять в день запуска.
- Домен: `1handshake.com` (Production), `www` → 308 на корень; `app.1handshake.com` — проект app.

### Pre-flight хостинга (Vercel)
| Проверка | Результат | Дата |
|---|---|---|
| Статический экспорт на Vercel (`output: "export"`) | поддерживается | 2026-10-16 |
| Rewrites `/@*` → app при статическом экспорте | только через `vercel.json` (Next rewrites не работают с export) | 2026-10-16 |
| HTTPS, www → корень | настраивается в Domains (308) | — |
| Доступ без пароля | Git-интеграция, секретов нет | — |
| DNS reg.ru | записи добавлены Ником 2026-10-16 | 2026-10-16 |

## 2. Контент-модель в коде
| Данные | Файл | Изменение относительно стартера |
|---|---|---|
| Проект, ссылки, sameAs, тип | `src/content/site.ts` | `orgType: "Organization"`, lang `en`, без contacts/legal/metrika; `cta` → app; `links` (app, github, privacy, terms, nikalimp.ru); `features` (releases, vs, card — false) |
| Главная | `src/content/home.ts` | секции §2.1 с флагами `sections.{news,how,getIn,intros,card,why,data,manifesto,blog,faq}` |
| FAQ | `src/content/faq.ts` | 17 вопросов spec §5; первые 5 — на главной |
| How it works | `src/content/how.ts` | шаги, механики |
| Roadmap | `src/content/roadmap.ts` | live / next / later из `BACKLOG.md` (без 🗄, 10.9, непринятых идей Claude) |
| Open source | `src/content/open-source.ts` | лицензия, что храним, где, кто видит, права |
| Статьи | `content/blog/*.md` | 3 статьи P0, frontmatter title/description/date/updated |
| Услуги | `src/content/services.ts` | не нужны → маршрут `/services/` удаляем (у проекта нет услуг) |

## 3. Маршруты
| URL | Файл | Шаблон / новый | Schema |
|---|---|---|---|
| `/` | `src/app/page.tsx` | переписать | WebSite, Organization, FAQPage |
| `/how-it-works/` | `src/app/how-it-works/page.tsx` | новый | HowTo, BreadcrumbList |
| `/faq/` | `src/app/faq/page.tsx` | новый | FAQPage, BreadcrumbList |
| `/open-source/` | `src/app/open-source/page.tsx` | новый (из `about/`) | AboutPage, BreadcrumbList |
| `/roadmap/` | `src/app/roadmap/page.tsx` | новый | ItemList, BreadcrumbList |
| `/blog/`, `/blog/[slug]/` | стартер | правка под EN | Blog, BlogPosting |
| `/@handle`, `/@handle/llms.txt` | `vercel.json` rewrites → `https://app.1handshake.com/@…` | новый | (app) |
| `/_next/image` | `vercel.json` rewrite → app | на случай next/image визиток | — |
| удаляются | `about/`, `contacts/`, `services/`, `privacy-policy/`, `consent/` | — | исключения spec §9 |

## 4. Компоненты
| Компонент | Откуда | Зачем |
|---|---|---|
| `Logo` (знак 1h) | SVG из ДС бренда | шапка, подвал, hero |
| `RingsGraph` | свой, inline SVG, без JS | hero: кольца, ты в центре, огненный путь |
| `InviteMock`, `IntroMock`, `CardMock` | свои по прототипу C, статичная разметка | секции 3–5 |
| `FeatureGrid` | свой | why 1handshake? |
| `Faq` | стартер (`<details>`) | FAQ |
| `Header`, `Footer`, `ThemeToggle` | стартер, переписать | навигация spec §4 |
| `Button` | shadcn (pill через `--radius` кнопки) | CTA |
| Иконки | `lucide-react` | why-сетка, внешние ссылки |

## 5. Интеграции
| Что | Как | Секреты / доступы |
|---|---|---|
| Vercel Web Analytics | `@vercel/analytics` (`<Analytics />`), событие `sign_in_click` | включить Analytics в проекте Vercel |
| Деплой | Vercel Git | — |
| IndexNow | `scripts/indexnow.mjs` — Bing; запуск после выкладки вручную / P1 | ключ в `public/` |
| Search Console, Bing Webmaster | после запуска | аккаунт Ника |
| В app (отдельный репо) | `assetPrefix: https://app.1handshake.com` в проде; проверить `metadataBase` = `https://1handshake.com` для canonical визиток | задача T-APP |

## 6. Порядок работ
1. Каркас: чистка стартера (РФ-части, услуги), `site.ts`, токены и шрифты бренда, шапка, футер, тема, `vercel.json`, `check.mjs` под исключения.
2. Главная — hero с кольцами и все секции §2.1.
3. Внутренние страницы: how-it-works, faq, open-source, roadmap, blog.
4. Статьи блога (3), ревью Ника.
5. GEO/SEO: JSON-LD, llms.txt, sitemap, robots, OG.
6. Качество: адаптив, тёмная тема, доступность, Lighthouse.
7. Визитки через прокси (сайт + задача в app), превью, правки Ника, запуск 26.10.

## 7. Риски
| Риск | Что делаем |
|---|---|
| Домен уже смотрит на проект сайта, а там стартер с TODO | `NOINDEX=1` в Production сейчас; готовый сайт в `main` только после превью |
| Визитки через прокси без стилей | assetPrefix в app + rewrite `/_next/image`; проверка в критериях приёмки |
| Строчные vs заглавные | правило decisions: строчные — только статичные UI-элементы; проверка на ревью |
| Нет реальных фото | мокапы UI с примером данных, подпись «example» |
