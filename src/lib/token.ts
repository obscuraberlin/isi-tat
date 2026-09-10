import { createHash, randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * Einmal-Links: Passwort zuruecksetzen, neue E-Mail bestaetigen.
 *
 * In der Datei steht nur der Hash des Tokens. Wer die Datei liest, kann
 * damit keinen Link bauen — genau wie beim Passwort. Jeder Token gilt
 * fuer einen Zweck, eine Adresse und eine Frist, und genau einmal.
 */

export type TokenZweck = "reset" | "email";

interface Eintrag {
  hash: string;
  email: string;
  zweck: TokenZweck;
  /** Beim Zweck "email": die neue Adresse. */
  neu?: string;
  bis: number;
}

const DATEI = () =>
  process.env.CLUB_TOKEN_DATEI || resolve(process.cwd(), "daten", "tokens.json");

const hashen = (roh: string) => createHash("sha256").update(roh).digest("base64url");

function lesen(): Eintrag[] {
  const pfad = DATEI();
  if (!existsSync(pfad)) return [];
  try {
    const roh = JSON.parse(readFileSync(pfad, "utf8"));
    const jetzt = Date.now();
    return Array.isArray(roh)
      ? roh.filter((e): e is Eintrag => !!e && typeof e.hash === "string" && e.bis > jetzt)
      : [];
  } catch {
    return [];
  }
}

function schreiben(liste: Eintrag[]) {
  const pfad = DATEI();
  mkdirSync(dirname(pfad), { recursive: true });
  const tmp = `${pfad}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(liste, null, 2) + "\n", { mode: 0o600 });
  renameSync(tmp, pfad);
}

/**
 * Neuen Token ausstellen. Aeltere Tokens desselben Zwecks fuer dieselbe
 * Adresse verfallen dabei — es gilt immer nur der letzte Link.
 */
export function tokenErzeugen(
  email: string,
  zweck: TokenZweck,
  dauerMs: number,
  neu?: string,
): string {
  const roh = randomBytes(32).toString("base64url");
  const mich = email.trim().toLowerCase();
  const liste = lesen().filter((e) => !(e.email === mich && e.zweck === zweck));
  liste.push({ hash: hashen(roh), email: mich, zweck, neu, bis: Date.now() + dauerMs });
  schreiben(liste);
  return roh;
}

/** Token einloesen: gueltig → Eintrag (und weg), sonst null. */
export function tokenVerbrauchen(roh: string, zweck: TokenZweck): Eintrag | null {
  if (!/^[A-Za-z0-9_-]{20,}$/.test(roh)) return null;
  const h = hashen(roh);
  const liste = lesen();
  const treffer = liste.find((e) => e.hash === h && e.zweck === zweck);
  if (!treffer) return null;
  schreiben(liste.filter((e) => e !== treffer));
  return treffer;
}

/** Nur nachsehen, ohne zu verbrauchen — fuer die Seite mit dem Formular. */
export function tokenGueltig(roh: string, zweck: TokenZweck): boolean {
  if (!/^[A-Za-z0-9_-]{20,}$/.test(roh)) return false;
  const h = hashen(roh);
  return lesen().some((e) => e.hash === h && e.zweck === zweck);
}
