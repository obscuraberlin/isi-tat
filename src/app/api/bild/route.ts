import { NextResponse } from "next/server";
import { BILD_HOSTS } from "@/lib/social";
import { COOKIE, sitzungLesen } from "@/lib/sitzung";

/**
 * Reicht Vorschaubilder aus dem Feed durch.
 *
 * Wuerden die Bilder direkt von YouTube oder Instagram geladen, bekaeme
 * Google bzw. Meta bei jedem Aufruf der Startseite die IP-Adresse des
 * Mitglieds — ohne dass es dem zugestimmt haette. So holt der Server das
 * Bild und gibt es weiter; draussen sieht man nur den Server.
 *
 * Nur fuer angemeldete Mitglieder und nur von den Plattformen, die der
 * Feed kennt. Sonst waere das ein offener Durchleiter fuer beliebige
 * Adressen.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 3 * 1024 * 1024;

export async function GET(request: Request) {
  const keks = request.headers.get("cookie")?.match(new RegExp(`${COOKIE}=([^;]+)`))?.[1];
  if (!sitzungLesen(keks)) return new NextResponse(null, { status: 401 });

  const u = new URL(request.url).searchParams.get("u") ?? "";
  let ziel: URL;
  try {
    ziel = new URL(u);
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (ziel.protocol !== "https:" || !BILD_HOSTS.some((h) => h.test(ziel.hostname))) {
    return new NextResponse(null, { status: 400 });
  }

  let antwort: Response;
  try {
    antwort = await fetch(ziel, { next: { revalidate: 60 * 60 * 24 } });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
  if (!antwort.ok) return new NextResponse(null, { status: 502 });

  const art = antwort.headers.get("content-type") ?? "";
  if (!art.startsWith("image/")) return new NextResponse(null, { status: 502 });

  const daten = await antwort.arrayBuffer();
  if (daten.byteLength > MAX_BYTES) return new NextResponse(null, { status: 502 });

  return new NextResponse(daten, {
    headers: {
      "content-type": art,
      /* Ein Vorschaubild aendert sich nicht: einen Tag im Browser halten. */
      "cache-control": "private, max-age=86400",
      "x-content-type-options": "nosniff",
    },
  });
}
