import { NextResponse } from "next/server";
import { angemeldet } from "@/lib/zugang";
import { eventMit, eventStatus } from "@/lib/events";
import { terminMit } from "@/lib/live";
import { zusageSetzen, type ZusageArt } from "@/lib/zusagen";

/**
 * Zusagen und Absagen zu Events und Live-Terminen.
 *
 *   POST { art: "event" | "live", id, zusage: true | false }
 *
 * Nur fuer angemeldete Mitglieder, nur zu Terminen, die es gibt und die
 * noch nicht vorbei sind. Ein ausgebuchtes Event nimmt keine Zusagen
 * mehr an — Absagen schon, damit ein Platz frei werden kann.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const sitzung = await angemeldet();
  if (!sitzung) return NextResponse.json({ ok: false }, { status: 401 });

  let daten: { art?: unknown; id?: unknown; zusage?: unknown };
  try {
    daten = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const art = daten.art as ZusageArt;
  const id = typeof daten.id === "string" ? daten.id : "";
  const zusage = daten.zusage === true;
  if ((art !== "event" && art !== "live") || !/^[a-z0-9-]+$/i.test(id)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (art === "event") {
    const event = eventMit(id);
    if (!event) return NextResponse.json({ ok: false }, { status: 404 });
    const status = eventStatus(event);
    if (status === "vergangen" || (zusage && status === "ausgebucht")) {
      return NextResponse.json({ ok: false, grund: status }, { status: 409 });
    }
  } else {
    const termin = terminMit(id);
    if (!termin) return NextResponse.json({ ok: false }, { status: 404 });
    if (new Date(`${termin.datum}T23:59:59+02:00`).getTime() < Date.now()) {
      return NextResponse.json({ ok: false, grund: "vergangen" }, { status: 409 });
    }
  }

  const stand = zusageSetzen(art, id, sitzung.email, zusage);
  return NextResponse.json({ ok: true, ...stand });
}
