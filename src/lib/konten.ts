import { randomBytes, scryptSync } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { MITGLIEDER_DATEI, type Mitglied } from "./mitglieder";

/**
 * Schreibender Zugriff auf die Mitgliederdatei — fuer Passwort, E-Mail
 * und Name, die ein Mitglied selbst aendert.
 *
 * Gelesen wird ueber mitglieder.ts; hier wird nur geschrieben, und zwar
 * so, wie tools/mitglied.mjs es tut: ganze Datei, Modus 600, erst
 * daneben, dann umbenannt. Konten aus der Umgebungsvariablen
 * CLUB_MITGLIEDER lassen sich nicht aendern — das sagt die Funktion mit
 * null, und die Oberflaeche sagt es weiter.
 */

const N = 16384;

export const PASSWORT_MIN = 10;

/** Warum ein Passwort nicht geht — oder null, wenn es geht. */
export function passwortSchwach(pw: string): string | null {
  if (pw.length < PASSWORT_MIN) return `Mindestens ${PASSWORT_MIN} Zeichen.`;
  if (pw.length > 200) return "Höchstens 200 Zeichen.";
  if (/^(.)\1+$/.test(pw)) return "Nicht immer dasselbe Zeichen.";
  if (/^(0123456789|1234567890|abcdefghij|qwertzuiop|passwort|password)/i.test(pw)) {
    return "Das ist zu leicht zu raten.";
  }
  return null;
}

export function passwortHash(pw: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(pw, salt, 32, { N, maxmem: 256 * N * 8 });
  return `scrypt.${N}.${salt.toString("base64url")}.${hash.toString("base64url")}`;
}

function lesen(pfad: string): Mitglied[] {
  if (!existsSync(pfad)) return [];
  const roh = JSON.parse(readFileSync(pfad, "utf8"));
  return Array.isArray(roh) ? roh : [];
}

function schreiben(pfad: string, liste: Mitglied[]) {
  mkdirSync(dirname(pfad), { recursive: true });
  const tmp = `${pfad}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(liste, null, 2) + "\n", { mode: 0o600 });
  renameSync(tmp, pfad);
}

/** Ist die Adresse schon vergeben — in der Datei oder der Variablen? */
export function emailVergeben(email: string): boolean {
  const gesucht = email.trim().toLowerCase();
  const ausDatei = lesen(MITGLIEDER_DATEI()).some((m) => m.email.toLowerCase() === gesucht);
  const ausVariable = (process.env.CLUB_MITGLIEDER ?? "")
    .split(";")
    .some((satz) => satz.split("|")[0]?.trim().toLowerCase() === gesucht);
  return ausDatei || ausVariable;
}

/**
 * Einen Eintrag aendern. Gibt den neuen Eintrag zurueck — oder null,
 * wenn es das Konto in der Datei nicht gibt.
 */
export function mitgliedAendern(
  email: string,
  aenderung: Partial<Pick<Mitglied, "email" | "name" | "hash">>,
): Mitglied | null {
  const pfad = MITGLIEDER_DATEI();
  const liste = lesen(pfad);
  const gesucht = email.trim().toLowerCase();
  const i = liste.findIndex((m) => m.email.toLowerCase() === gesucht);
  if (i < 0) return null;
  const neu: Mitglied = { ...liste[i], ...aenderung };
  if (aenderung.email) neu.email = aenderung.email.trim().toLowerCase();
  liste[i] = neu;
  schreiben(pfad, liste);
  return neu;
}
