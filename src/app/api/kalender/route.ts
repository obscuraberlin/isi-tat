import { NextResponse } from "next/server";
import { angemeldet } from "@/lib/zugang";
import { eventMit } from "@/lib/events";
import { terminMit } from "@/lib/live";

/**
 * Ein Termin als Kalenderdatei (.ics) — fuer Apple, Google, Outlook.
 *
 *   GET /api/kalender/?art=live&id=...
 *   GET /api/kalender/?art=event&id=...
 *
 * Nur fuer angemeldete Mitglieder. Der Beitritts-Link steht nicht in der
 * Datei: Kalender werden geteilt, der Link soll es nicht.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MARKE = "ISI TAT BUSINESS CLUB";

/* Zeilen in .ics duerfen keine rohen Kommas, Semikolons und Umbrueche
   enthalten. */
const esc = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/* 2026-09-22 + 19:00 in Berliner Zeit → UTC-Stempel. Der Versatz ist im
   Sommer +2, im Winter +1; die letzte Oktober- und Maerzwoche kippen. */
function utc(datum: string, uhr: string): string {
  const [j, m, t] = datum.split("-").map(Number);
  const [h, min] = uhr.split(":").map(Number);
  const probe = new Date(Date.UTC(j, m - 1, t, 12));
  const berlin = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    timeZoneName: "shortOffset",
  })
    .formatToParts(probe)
    .find((p) => p.type === "timeZoneName")?.value;
  const versatz = Number(berlin?.match(/[+-]\d+/)?.[0] ?? 1);
  const d = new Date(Date.UTC(j, m - 1, t, h - versatz, min));
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

const tag = (iso: string) => iso.replace(/-/g, "");
/* Ganztaegige Events: DTEND ist der Tag NACH dem letzten. */
function folgetag(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return tag(d.toISOString().slice(0, 10));
}

export async function GET(request: Request) {
  if (!(await angemeldet())) return new NextResponse(null, { status: 401 });

  const { searchParams } = new URL(request.url);
  const art = searchParams.get("art");
  const id = searchParams.get("id") ?? "";
  if (!/^[a-z0-9-]+$/i.test(id)) return new NextResponse(null, { status: 400 });

  let zeilen: string[];
  let dateiname: string;

  if (art === "live") {
    const t = terminMit(id);
    if (!t) return new NextResponse(null, { status: 404 });
    const ende = t.ende ?? `${String(Number(t.beginn.slice(0, 2)) + 1).padStart(2, "0")}${t.beginn.slice(2)}`;
    zeilen = [
      `UID:live-${t.id}@isi-tat`,
      `DTSTART:${utc(t.datum, t.beginn)}`,
      `DTEND:${utc(t.datum, ende)}`,
      `SUMMARY:${esc(`Live mit ISI: ${t.titel}`)}`,
      ...(t.beschreibung ? [`DESCRIPTION:${esc(t.beschreibung)}`] : []),
    ];
    dateiname = `live-${t.datum}.ics`;
  } else if (art === "event") {
    const e = eventMit(id);
    if (!e) return new NextResponse(null, { status: 404 });
    zeilen = [
      `UID:event-${e.id}@isi-tat`,
      `DTSTART;VALUE=DATE:${tag(e.datum)}`,
      `DTEND;VALUE=DATE:${folgetag(e.ende ?? e.datum)}`,
      `SUMMARY:${esc(`${MARKE}: ${e.titel}`)}`,
      `LOCATION:${esc(e.ort)}`,
      `DESCRIPTION:${esc(e.beschreibung)}`,
    ];
    dateiname = `event-${e.datum}.ics`;
  } else {
    return new NextResponse(null, { status: 400 });
  }

  const stempel = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ISI TAT Business Club//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTAMP:${stempel}`,
    ...zeilen,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="${dateiname}"`,
      "cache-control": "private, no-store",
    },
  });
}
