import type { NextConfig } from "next";

/**
 * Zwei Auslieferungswege, ein Projekt.
 *
 * Standard: eine normale Next.js-Anwendung. `next build` und danach
 * `next start` — genau das, was Plattformen wie Hostinger, Vercel oder
 * Netlify von Haus aus ausfuehren.
 *
 * STATIC_EXPORT=1: rein statischer Export nach out/, fuer klassisches
 * Webhosting ohne Node. `next start` funktioniert damit ausdruecklich
 * nicht — Next bricht dann mit einer Fehlermeldung ab. Deshalb darf
 * output: "export" nicht fest eingetragen sein.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
