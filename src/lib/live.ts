import { readFileSync, statSync } from "node:fs";
import { liveTermine, type LiveTermin } from "@/data/live";
import { beispielLive, beispieleAktiv } from "@/data/beispiele";

/**
 * Die Live-Termine — aus dem Projekt oder von der Platte.
 *
 * Wie beim Kanal: steht CLUB_LIVE_DATEI auf einer JSON-Datei, gewinnt sie.
 * Ein Termin laesst sich damit ankuendigen oder verschieben, ohne die
 * Seite neu bereitzustellen.
 */

let zwischen: { stand: number; liste: LiveTermin[] } | null = null;

function gueltig(t: unknown): t is LiveTermin {
  const k = t as LiveTermin;
  return (
    !!k &&
    typeof k.id === "string" &&
    typeof k.titel === "string" &&
    typeof k.datum === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(k.datum) &&
    typeof k.beginn === "string" &&
    /^\d{2}:\d{2}$/.test(k.beginn)
  );
}

function alle(): LiveTermin[] {
  return [...echte(), ...(beispieleAktiv ? beispielLive : [])];
}

function echte(): LiveTermin[] {
  const pfad = process.env.CLUB_LIVE_DATEI;
  if (!pfad) return [...liveTermine];

  try {
    const stand = statSync(pfad).mtimeMs;
    if (zwischen && zwischen.stand === stand) return zwischen.liste;
    const roh = JSON.parse(readFileSync(pfad, "utf8"));
    if (!Array.isArray(roh)) return [...liveTermine];
    const liste = roh.filter(gueltig);
    zwischen = { stand, liste };
    return liste;
  } catch {
    /* Datei fehlt oder ist kaputt — dann gilt, was im Projekt steht. */
    return [...liveTermine];
  }
}

/**
 * Ein Termin gilt bis zum Ende des Tages als kommend.
 *
 * Genauer waere, auf die Minute zu rechnen — aber dann verschwaende der
 * Termin um 19:01 aus "Naechster Termin", waehrend die Runde noch laeuft.
 * Wer um 19:05 dazukommt, soll den Knopf noch finden.
 */
function istKommend(t: LiveTermin, jetzt: Date) {
  const tagesende = new Date(`${t.datum}T23:59:59+02:00`);
  return tagesende.getTime() >= jetzt.getTime();
}

export function liveDaten(jetzt = new Date()) {
  const liste = alle().sort((a, b) => a.datum.localeCompare(b.datum));
  const kommend = liste.filter((t) => istKommend(t, jetzt));
  const vergangen = liste.filter((t) => !istKommend(t, jetzt)).reverse();

  return {
    naechster: kommend[0] ?? null,
    kommend,
    /* Vergangene Termine bleiben sichtbar — mit Aufzeichnung, wenn eine
       vorliegt, sonst nur als Zeile. So sieht ein neues Mitglied, was der
       Club bisher gemacht hat, und ein altes findet die Aufzeichnung. */
    vergangen,
  };
}

export const terminMit = (id: string) => alle().find((t) => t.id === id) ?? null;

/** "Dienstag, 14. Oktober" — ohne Jahr, wenn es dasselbe ist. */
export function terminDatum(iso: string, jetzt = new Date()): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    ...(d.getUTCFullYear() === jetzt.getFullYear() ? {} : { year: "numeric" }),
    timeZone: "UTC",
  }).format(d);
}

/** "14. Okt." — fuer enge Stellen. */
export function terminKurz(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(d);
}
