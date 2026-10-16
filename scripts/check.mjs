// Проверка перед запуском (стандарт AI-Ready сайта, §11). Запуск: npm run check — сначала собирает сайт, потом проверяет out/.
//  1. В готовом сайте нет TODO и домена-заглушки example.ru.
//  2. geo-check: robots.txt, sitemap, llms.txt, мета-теги, JSON-LD, текст без JS. Балл ≥ 8 и ни одной проблемы P1.
//  3. Индексация (стандарт §2 «Индексация» и §3): страницы из sitemap без noindex, с canonical на себя и title от 40 символов —
//     и не короче 250 слов в <main> — иначе ошибка; title длиннее 65, description вне 120–160, lastmod = дата сборки, нет ключа IndexNow — предупреждения.
//  4. Блокирующее перед выкладкой (стандарт §11): Метрика подключена, ИНН и ОГРН проходят контрольную сумму,
//     есть политика и согласие на обработку ПДн, у переноса — снят geo-check «до».
//  5. Тексты по Главреду (стандарт §7): каждая страница из sitemap — 7,5+ (ниже 6,5 — ошибка).
//  6. Дизайн-система (стандарт §6): цвет в обход токенов (text-[#…], bg-[rgb(…)]) — ошибка.
//  7. Ориентиры с пометкой «estimate» — список мест, которые ждут подтверждения клиента.
// Тестовая выкладка: NOINDEX=1 npm run check — закрытость от индексации ожидаема, TODO и Метрика — предупреждения, а не ошибки.
// Отчёт geo-check сохраняется в specs/reports/geo-check-<дата>.md — история для клиента.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const MIN_SCORE = 8;
let failed = false;
const fail = (msg) => { failed = true; console.log(`✗ ${msg}`); };
const ok = (msg) => console.log(`✓ ${msg}`);
const warn = (msg) => console.log(`  ⚠ ${msg}`);
const STAGING = process.env.NOINDEX === "1";
const prodFail = (msg) => (STAGING ? warn(`${msg} (тестовая выкладка — на боевом домене это ошибка)`) : fail(msg));
if (STAGING) console.log("Режим тестовой выкладки (NOINDEX=1): сайт закрыт от индексации.\n");

if (!fs.existsSync(OUT)) { console.error("Нет out/ — сначала npm run build"); process.exit(1); }

// 1. TODO и заглушки в готовом сайте
const files = (function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? (e.name === "_next" ? [] : walk(p)) : /\.(html|txt|xml)$/.test(e.name) ? [p] : [];
  });
})(OUT);
const todos = [];
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  const n = (text.match(/TODO/g) || []).length;
  if (n) todos.push(`${path.relative(OUT, f)} (${n})`);
}
if (todos.length) prodFail(`TODO в ${todos.length} файлах: ${todos.slice(0, 8).join(", ")}${todos.length > 8 ? " …" : ""}`);
else ok("TODO нет");

const robots = fs.readFileSync(path.join(OUT, "robots.txt"), "utf8");
const base = (robots.match(/^Host:\s*(\S+)/m) || [])[1] || "";
if (!base || base.includes("example.ru")) fail(`Домен не задан: site.url = ${base || "пусто"}`);
else ok(`Домен: ${base}`);

// 2. geo-check по локальной сборке
const date = new Date().toISOString().slice(0, 10);
const reports = path.join(ROOT, "specs", "reports");
fs.mkdirSync(reports, { recursive: true });
const json = path.join(reports, `.geo-check-${date}.json`);
let md = "";
try {
  md = execFileSync("python3", [path.join(ROOT, "scripts", "geo-check.py"), OUT, "--base", base || "https://example.ru", "--max", "200", "--json", json], { encoding: "utf8" });
} catch (e) {
  fail(`geo-check не запустился: ${e.message.split("\n")[0]} (нужен python3)`);
}
if (md) {
  fs.writeFileSync(path.join(reports, `geo-check-${date}.md`), md);
  const R = JSON.parse(fs.readFileSync(json, "utf8"));
  fs.rmSync(json, { force: true });
  // На тестовой выкладке robots.txt и noindex закрывают сайт намеренно — эти P1 и балл не считаем
  const expected = (m) => STAGING && /robots|noindex|закрывает/i.test(m);
  const p1 = R.issues.filter(([s, m]) => s === "P1" && !expected(m)).map(([, m]) => m);
  if (STAGING) ok(`geo-check: балл ${R.tech_score}/10 (на тестовой выкладке не оценивается)`);
  else if (R.tech_score < MIN_SCORE) fail(`geo-check: балл ${R.tech_score}/10, нужно ≥ ${MIN_SCORE}`);
  else ok(`geo-check: балл ${R.tech_score}/10`);
  if (p1.length) fail(`geo-check: проблемы P1 — ${p1.join("; ")}`);
  const other = R.issues.filter(([s]) => s !== "P1");
  if (other.length) console.log(`  ещё ${other.length} замечаний P2/P3 — см. specs/reports/geo-check-${date}.md`);
}

// 3. Индексация
const MIN_WORDS = 250; // минимум слов в <main> для каждой страницы из sitemap (стандарт §2 «Индексация»)
const THIN_OK = ["/contacts/"];
const TITLE_OK = ["/privacy", "/terms"]; // заголовок вкладки задан Ником дословно для Google OAuth (spec §9) // служебные страницы, где объём не важен; добавлять сюда только с причиной в specs/02-spec.md, §9
const sitemapXml = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
const entries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, u]) => ({
  loc: (u.match(/<loc>([^<]+)<\/loc>/) || [])[1], lastmod: (u.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1],
}));
const TITLE_MIN = 40, TITLE_MAX = 65, DESC_MIN = 120, DESC_MAX = 160; // длина вместе с названием бренда
const unesc = (t) => t.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const idx = { noindex: [], canonical: [], thin: [], shortTitle: [], longTitle: [], desc: [] };
for (const { loc } of entries) {
  const pn = decodeURI(new URL(loc).pathname);
  const file = [path.join(OUT, pn, "index.html"), path.join(OUT, `${pn.replace(/\/$/, "")}.html`)].find((f) => fs.existsSync(f)) ?? path.join(OUT, pn, "index.html");
  if (!fs.existsSync(file)) { fail(`В sitemap есть ${loc}, а страницы нет`); continue; }
  const html = fs.readFileSync(file, "utf8");
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) idx.noindex.push(loc);
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canon !== loc) idx.canonical.push(`${loc} → ${canon ?? "нет"}`);
  const p = new URL(loc).pathname;
  const title = unesc((html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "");
  if (title.length < TITLE_MIN && !TITLE_OK.includes(p)) idx.shortTitle.push(`${p} «${title}» (${title.length})`);
  if (title.length > TITLE_MAX) idx.longTitle.push(`${p} (${title.length})`);
  const desc = unesc((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "");
  if (desc.length < DESC_MIN || desc.length > DESC_MAX) idx.desc.push(`${p} (${desc.length})`);
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0]
    .replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  const words = main.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  if (words < MIN_WORDS && !THIN_OK.includes(new URL(loc).pathname)) idx.thin.push(`${new URL(loc).pathname} (${words})`);
}
if (STAGING) idx.noindex = [];
if (idx.noindex.length) fail(`В sitemap страницы с noindex: ${idx.noindex.join(", ")}`);
if (idx.canonical.length) fail(`canonical не указывает на саму страницу: ${idx.canonical.slice(0, 5).join("; ")}`);
if (idx.shortTitle.length) fail(`title короче ${TITLE_MIN} символов — добавь расшифровку или уточнение (стандарт §3): ${idx.shortTitle.join("; ")}`);
if (idx.longTitle.length) console.log(`  ⚠ title длиннее ${TITLE_MAX} символов, Google обрежет: ${idx.longTitle.join(", ")}`);
if (idx.desc.length) console.log(`  ⚠ description вне ${DESC_MIN}–${DESC_MAX} символов: ${idx.desc.join(", ")}`);
if (!idx.noindex.length && !idx.canonical.length && !idx.shortTitle.length) ok(`Индексация: ${entries.length} страниц в sitemap, noindex и чужих canonical нет`);
if (idx.thin.length) fail(`Страницы короче ${MIN_WORDS} слов в <main> — дописать (история, применение, рекомендации, FAQ): ${idx.thin.join(", ")}`);
const today = new Date().toISOString().slice(0, 10);
const buildDated = entries.filter((e) => e.lastmod?.startsWith(today)).length;
if (entries.length > 3 && buildDated / entries.length > 0.5) console.log(`  ⚠ lastmod = сегодня у ${buildDated} из ${entries.length} URL — похоже на дату сборки, ставь только реальные даты изменений`);
if (!fs.readdirSync(path.join(ROOT, "public")).some((f) => /^[a-f0-9]{32}\.txt$/.test(f))) console.log("  ⚠ Нет ключа IndexNow — npm run indexnow:key");

// 4–5. Метрика, ИНН/ОГРН, политика и согласие (152-ФЗ), Главред — не применяются: Global, EN (specs/02-spec.md §9).
// Политика и условия живут в app; проверяем, что ссылки на них есть на главной.
const home = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
for (const u of ['href="/privacy"', 'href="/terms"', "hello@1handshake.com"]) {
  if (home.includes(u)) ok(`Ссылка на ${u} есть`);
  else prodFail(`Нет ссылки на ${u} в подвале`);
}

// 6. Цвет в обход токенов
const srcFiles = (function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : /\.(tsx?|mdx?)$/.test(e.name) ? [p] : [];
  });
})(path.join(ROOT, "src"));
const ARBITRARY_COLOR = /\b(?:text|bg|border|fill|stroke|from|via|to|ring|outline|accent|shadow|decoration|caret|divide|placeholder)-\[(?:#|rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color)/;
const colorHits = [];
for (const f of srcFiles) {
  fs.readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    if (ARBITRARY_COLOR.test(line)) colorHits.push(`${path.relative(ROOT, f)}:${i + 1}`);
  });
}
if (colorHits.length) fail(`Цвет в обход токенов (стандарт §6, Tailwind п. 2) — заведи токен в globals.css: ${colorHits.slice(0, 8).join(", ")}${colorHits.length > 8 ? " …" : ""}`);
else ok("Цвета — только через токены");

// 7. Ориентиры, которые ждут подтверждения клиента
const estimates = [];
for (const f of [...srcFiles.filter((f) => f.includes(`${path.sep}content${path.sep}`)), ...(fs.existsSync(path.join(ROOT, "content")) ? (function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".md") && !e.name.startsWith("_") ? [path.join(d, e.name)] : []));
})(path.join(ROOT, "content")) : [])]) {
  fs.readFileSync(f, "utf8").split("\n").forEach((line, i) => { if (/\bestimate\b/i.test(line)) estimates.push(`${path.relative(ROOT, f)}:${i + 1}`); });
}
if (estimates.length) warn(`Ориентиры без подтверждения клиента (estimate), ${estimates.length}: ${estimates.slice(0, 10).join(", ")} — каждый должен быть в «Вопросах» specs/05-tasks.md`);

console.log(failed ? "\nПроверка НЕ пройдена — к запуску рано." : "\nПроверка пройдена. Дальше — ручной чеклист specs/06-launch-checklist.md.");
process.exit(failed ? 1 : 0);
