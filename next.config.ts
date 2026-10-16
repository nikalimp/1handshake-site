import type { NextConfig } from "next";

// Статический экспорт на Vercel (spec §1, §9). Визитки /@handle проксируются в app через vercel.json.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
