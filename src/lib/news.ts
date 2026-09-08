import { readFileSync, statSync } from "node:fs";
import { nachrichten, type Nachricht } from "@/data/club";

/**
 * Die News — aus dem Projekt oder von der Platte.
 *
 * Steht CLUB_NEWS_DATEI auf einer JSON-Datei, gewinnt sie. Dadurch kann
 * eine Nachricht veroeffentlicht werden, ohne die Seite neu
 * bereitzustellen. Ist die Datei kaputt oder fehlt sie, bleibt es bei dem,
 * was im Projekt steht — eine unlesbare Datei darf den Feed nicht leeren.
 */

let zwischen: { stand: number; liste: Nachricht[] } | null = null;

function gueltig(n: unknown): n is Nachricht {
  const k = n as Nachricht;
  return (
    !!k &&
    typeof k.datum === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(k.datum) &&
    typeof k.titel === "string" &&
    Array.isArray(k.text) &&
    k.text.every((t) => typeof t === "string") &&
    (k.bild === undefined || typeof k.bild === "string")
  );
}

export function newsBeitraege(): Nachricht[] {
  const pfad = process.env.CLUB_NEWS_DATEI;
  let liste: Nachricht[] = [...nachrichten];

  if (pfad) {
    try {
      const stand = statSync(pfad).mtimeMs;
      if (zwischen && zwischen.stand === stand) {
        liste = zwischen.liste;
      } else {
        const roh = JSON.parse(readFileSync(pfad, "utf8"));
        if (Array.isArray(roh)) {
          liste = roh.filter(gueltig);
          zwischen = { stand, liste };
        }
      }
    } catch {
      /* Datei fehlt oder ist kaputt — es bleibt bei der Liste im Projekt. */
    }
  }

  /* Neueste zuerst. */
  return [...liste].sort((a, b) => b.datum.localeCompare(a.datum));
}

/** "14. September 2026" — ausgeschrieben, nicht 14.09. */
export function datumLang(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
