import { readFileSync, statSync } from "node:fs";
import { clubEvents, type ClubEvent } from "@/data/events";

/**
 * Die Events — aus dem Projekt oder von der Platte.
 *
 * Wie bei News und Live: steht CLUB_EVENTS_DATEI auf einer JSON-Datei,
 * gewinnt sie. Ein Event laesst sich damit ankuendigen, ausbuchen oder
 * verschieben, ohne die Seite neu bereitzustellen.
 */

export type EventStatus = "offen" | "ausgebucht" | "vergangen";

let zwischen: { stand: number; liste: ClubEvent[] } | null = null;

function gueltig(e: unknown): e is ClubEvent {
  const k = e as ClubEvent;
  return (
    !!k &&
    typeof k.id === "string" &&
    /^[a-z0-9-]+$/i.test(k.id) &&
    typeof k.titel === "string" &&
    typeof k.ort === "string" &&
    typeof k.datum === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(k.datum) &&
    typeof k.beschreibung === "string"
  );
}

function alle(): ClubEvent[] {
  const pfad = process.env.CLUB_EVENTS_DATEI;
  if (!pfad) return [...clubEvents];
  try {
    const stand = statSync(pfad).mtimeMs;
    if (zwischen && zwischen.stand === stand) return zwischen.liste;
    const roh = JSON.parse(readFileSync(pfad, "utf8"));
    if (!Array.isArray(roh)) return [...clubEvents];
    const liste = roh.filter(gueltig);
    zwischen = { stand, liste };
    return liste;
  } catch {
    return [...clubEvents];
  }
}

/** Bis zum Ende des letzten Tages gilt ein Event als kommend. */
function istVergangen(e: ClubEvent, jetzt: Date) {
  const letzter = new Date(`${e.ende ?? e.datum}T23:59:59+02:00`);
  return letzter.getTime() < jetzt.getTime();
}

export function eventStatus(e: ClubEvent, jetzt = new Date()): EventStatus {
  if (istVergangen(e, jetzt)) return "vergangen";
  if (e.ausgebucht) return "ausgebucht";
  return "offen";
}

export function eventDaten(jetzt = new Date()) {
  const liste = alle().sort((a, b) => a.datum.localeCompare(b.datum));
  const kommend = liste.filter((e) => !istVergangen(e, jetzt));
  const vergangen = liste.filter((e) => istVergangen(e, jetzt)).reverse();
  return { naechstes: kommend[0] ?? null, kommend, vergangen };
}

export const eventMit = (id: string) => alle().find((e) => e.id === id) ?? null;

/** "14.–16. November 2026" oder "14. November 2026". */
export function eventDatum(e: ClubEvent): string {
  const f = (iso: string, mitMonat: boolean) => {
    const d = new Date(`${iso}T12:00:00Z`);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("de-DE", {
      day: "numeric",
      ...(mitMonat ? { month: "long", year: "numeric" } : {}),
      timeZone: "UTC",
    }).format(d);
  };
  if (!e.ende || e.ende === e.datum) return f(e.datum, true);
  const gleicherMonat = e.datum.slice(0, 7) === e.ende.slice(0, 7);
  return gleicherMonat
    ? `${f(e.datum, false)}–${f(e.ende, true)}`
    : `${f(e.datum, true)} – ${f(e.ende, true)}`;
}
