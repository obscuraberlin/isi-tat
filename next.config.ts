import type { NextConfig } from "next";

/**
 * Zwei Auslieferungswege, ein Projekt.
 *
 * Standard: eine normale Next.js-Anwendung. `next build` und danach
 * `next start` — genau das, was Plattformen wie Hostinger, Vercel oder
 * Netlify von Haus aus ausfuehren. In diesem Modus setzt `headers()`
 * unten die Sicherheits- und Cache-Header.
 *
 * STATIC_EXPORT=1: rein statischer Export nach out/, fuer klassisches
 * Webhosting ohne Node. `next start` funktioniert damit ausdruecklich
 * nicht — Next bricht dann mit einer Fehlermeldung ab. Deshalb darf
 * output: "export" nicht fest eingetragen sein.
 *
 * Wichtig fuer den statischen Weg: `headers()` wird beim Export NICHT
 * angewendet — es gibt keinen Server, der sie setzen koennte. Dafuer
 * liegt public/.htaccess bereit, das dieselben Regeln fuer Apache
 * abbildet und beim Export mit nach out/ wandert.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

/* Ein Jahr, unveraenderlich. Gilt nur fuer Dateien, deren Name sich bei
   Aenderung mitaendert (Next haengt Hashes an) oder die wir bewusst
   versionieren — Medien werden ueber ihre Nummer ausgetauscht, ein
   Austausch bekommt dann einen neuen Dateinamen. */
const EIN_JAHR = "public, max-age=31536000, immutable";

/**
 * Sicherheits-Header.
 *
 * HSTS steht bewusst ohne `preload`: Preload ist eine Einbahnstrasse —
 * einmal in der Browserliste, bleibt die Domain dort ueber Monate, auch
 * wenn HTTPS ausfaellt. Das gehoert bewusst entschieden, nicht nebenbei.
 *
 * Content-Security-Policy: alles vom eigenen Server. Skripte und Stile
 * brauchen 'unsafe-inline', weil Next seinen Bootstrap inline schreibt —
 * ohne Nonce-Infrastruktur geht es nicht enger. Was die Regel trotzdem
 * leistet: kein Skript, kein Stil, kein Bild, kein Rahmen von einem
 * fremden Server, keine Einbettung dieser Seite in fremde Seiten, keine
 * Formulare an fremde Ziele. Bilder und Videos duerfen von https-Hosts
 * kommen: die Kursvideos liegen spaeter beim Videohoster.
 *
 * Nur in Produktion — im Entwicklungsmodus braucht Next eval() fuer das
 * Neuladen, und das soll die Regel gar nicht erst erlauben.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");
const sicherheit = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()",
  },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: csp }]
    : []),
];

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,

  async redirects() {
    /* Der Feed hiess erst NEWS und liegt jetzt im Tab CLUB. */
    return [{ source: "/club/news", destination: "/club/kanal/", permanent: false }];
  },

  async headers() {
    return [
      /* Auf allem: die Sicherheits-Header. */
      { source: "/:path*", headers: sicherheit },

      /* HTML nie zwischenspeichern — sonst sieht jemand nach einem Deploy
         tagelang die alte Seite. Die Dateien darin tragen Hashes, das
         Neuladen kostet also nichts. */
      {
        source: "/:path*",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
        missing: [{ type: "header", key: "next-router-prefetch" }],
      },

      /* Medien und Schriften ein Jahr. */
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: EIN_JAHR }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: EIN_JAHR }],
      },
      /* Die Build-Artefakte von Next tragen Hashes im Namen. */
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: EIN_JAHR }],
      },
    ];
  },
};

export default nextConfig;
