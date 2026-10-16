import type { MetadataRoute } from "next";
import { noindex, site } from "@/content/site";

export const dynamic = "force-static";

// Открыт для всех поисковых и AI-ботов, включая тренировочных (spec §9: GEO — главная цель).
const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended", "CCBot", "Bingbot", "DeepSeekBot", "YandexBot"];

export default function robots(): MetadataRoute.Robots {
  if (noindex) return { rules: [{ userAgent: "*", disallow: "/" }], host: site.url };
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...aiBots.map((b) => ({ userAgent: b, allow: "/" }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
