import type { NextConfig } from "next";

// Статический экспорт на Vercel (spec §1, §9). Визитки /@handle проксируются в app через vercel.json.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false, // адреса без слэша: /privacy и /terms требует Google OAuth (spec §9)
  images: { unoptimized: true },
};

export default nextConfig;
