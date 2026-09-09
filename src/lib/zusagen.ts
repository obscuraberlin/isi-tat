import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * Wer hat zu welchem Termin zugesagt.
 *
 * Eine Zusage ist kein Vertrag und kein Ticket: sie sagt ISI, mit wie
 * vielen er rechnen kann, und dem Mitglied, dass es sich eingetragen hat.
 * Zurueckziehen geht jederzeit, ohne Begruendung.
 *
 * Gespeichert wird in einer JSON-Datei neben den Mitgliedern — dieselbe
 * Ueberlegung wie dort: keine Datenbank fuer eine Liste, die in eine
 * Bildschirmseite passt. Die Datei liegt nicht im Repository.
 *
 *   { "event:clubabend-berlin": ["max@beispiel.de", ...],
 *     "live:2026-09-22":       [...] }
 */

export type ZusageArt = "event" | "live";

const DATEI = () =>
  process.env.CLUB_ZUSAGEN_DATEI || resolve(process.cwd(), "daten", "zusagen.json");

type Liste = Record<string, string[]>;

function lesen(): Liste {
  const pfad = DATEI();
  if (!existsSync(pfad)) return {};
  try {
    const roh = JSON.parse(readFileSync(pfad, "utf8"));
    if (!roh || typeof roh !== "object" || Array.isArray(roh)) return {};
    const liste: Liste = {};
    for (const [k, v] of Object.entries(roh)) {
      if (Array.isArray(v)) liste[k] = v.filter((e): e is string => typeof e === "string");
    }
    return liste;
  } catch {
    return {};
  }
}

function schreiben(liste: Liste) {
  const pfad = DATEI();
  mkdirSync(dirname(pfad), { recursive: true });
  /* Erst daneben schreiben, dann umbenennen: bricht der Prozess mitten
     im Schreiben ab, bleibt die alte Datei heil. */
  const tmp = `${pfad}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(liste, null, 2) + "\n", { mode: 0o600 });
  renameSync(tmp, pfad);
}

const schluessel = (art: ZusageArt, id: string) => `${art}:${id}`;

/** Hat dieses Mitglied zugesagt, und wie viele andere ausserdem? */
export function zusageStand(art: ZusageArt, id: string, email: string) {
  const alle = lesen()[schluessel(art, id)] ?? [];
  const mich = email.trim().toLowerCase();
  const zugesagt = alle.includes(mich);
  return { zugesagt, andere: alle.length - (zugesagt ? 1 : 0) };
}

/** Zusage setzen oder zuruecknehmen. Gibt den neuen Stand zurueck. */
export function zusageSetzen(art: ZusageArt, id: string, email: string, zusage: boolean) {
  const liste = lesen();
  const k = schluessel(art, id);
  const mich = email.trim().toLowerCase();
  const ohne = (liste[k] ?? []).filter((e) => e !== mich);
  liste[k] = zusage ? [...ohne, mich] : ohne;
  if (liste[k].length === 0) delete liste[k];
  schreiben(liste);
  return zusageStand(art, id, email);
}
