import { scryptSync, timingSafeEqual, createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";

/**
 * Wer darf hinein — und mit welchem Passwort.
 *
 * Es gibt in diesem Projekt keine Datenbank, und fuer eine Mitgliederliste
 * braucht es auch keine. Zwei Wege, beide ohne Zugangsdaten im Repo:
 *
 *   CLUB_MITGLIEDER_DATEI  Pfad zu einer JSON-Datei auf dem Server.
 *                          Der bessere Weg: ein neues Mitglied eintragen,
 *                          speichern, fertig — ohne neuen Deploy.
 *
 *   CLUB_MITGLIEDER        Dieselben Angaben als eine Zeile in einer
 *                          Umgebungsvariablen, falls der Hoster keinen
 *                          Platz fuer eine Datei bietet. Aendern heisst
 *                          hier: Anwendung neu starten.
 *
 * Format der Datei — eine Liste, ein Eintrag je Mitglied:
 *
 *   [
 *     { "email": "max@beispiel.de", "name": "Max Muster", "hash": "scrypt.16384...." }
 *   ]
 *
 * Format der Variablen — ein Eintrag je Semikolon, Felder mit senkrechtem
 * Strich getrennt:
 *
 *   max@beispiel.de|Max Muster|scrypt....;anna@beispiel.de|Anna|scrypt....
 *
 * Den Hash erzeugt `node tools/mitglied.mjs`. Klartext-Passwoerter stehen
 * an keiner der beiden Stellen.
 */

export interface Mitglied {
  email: string;
  name: string;
  hash: string;
}

/* Die Datei wird nicht bei jeder Anfrage von der Platte gelesen, aber auch
   nicht fuer immer behalten: aendert sich ihr Zeitstempel, wird neu
   gelesen. Dadurch wirkt ein neu eingetragenes Mitglied sofort, ohne dass
   jede Anmeldung einen Dateizugriff kostet. */
let zwischen: { stand: number; liste: Mitglied[] } | null = null;

function ausDatei(pfad: string): Mitglied[] {
  let stand: number;
  try {
    stand = statSync(pfad).mtimeMs;
  } catch {
    return [];
  }
  if (zwischen && zwischen.stand === stand) return zwischen.liste;

  try {
    const roh = JSON.parse(readFileSync(pfad, "utf8"));
    const liste = Array.isArray(roh) ? roh.filter(gueltig) : [];
    zwischen = { stand, liste };
    return liste;
  } catch {
    /* Kaputte Datei: niemand kommt herein. Das ist die richtige Richtung —
       eine unlesbare Liste darf keine offene Tuer bedeuten. */
    return [];
  }
}

function ausVariable(wert: string): Mitglied[] {
  return wert
    .split(";")
    .map((satz) => satz.split("|").map((s) => s.trim()))
    .filter((f) => f.length >= 3)
    .map(([email, name, hash]) => ({ email, name, hash }))
    .filter(gueltig);
}

function gueltig(m: unknown): m is Mitglied {
  const k = m as Mitglied;
  return (
    !!k &&
    typeof k.email === "string" &&
    k.email.includes("@") &&
    typeof k.name === "string" &&
    typeof k.hash === "string" &&
    k.hash.startsWith("scrypt.")
  );
}

export function mitglieder(): Mitglied[] {
  const datei = process.env.CLUB_MITGLIEDER_DATEI;
  if (datei) return ausDatei(datei);
  const variable = process.env.CLUB_MITGLIEDER;
  return variable ? ausVariable(variable) : [];
}

/**
 * Passwort pruefen.
 *
 * scrypt statt eines einfachen Hashes: es ist absichtlich langsam und
 * braucht viel Speicher. Wer die Liste in die Haende bekaeme, koennte
 * damit nicht Millionen Passwoerter pro Sekunde durchprobieren.
 *
 * Format: scrypt.<N>.<salt-base64url>.<hash-base64url>
 *
 * Der Punkt als Trenner ist kein Geschmack: mit dem sonst ueblichen "$"
 * kommt der Hash nicht heil durch eine Umgebungsvariable. Next liest .env
 * mit Variablen-Ersetzung — aus "scrypt$16384$leun3FfD..." wird dort
 * "scrypt", weil "$leun3FfD" als Name einer anderen Variablen gilt und
 * leer ersetzt wird. Gemessen, nicht vermutet. Base64url kennt weder "$"
 * noch ".", der Trenner ist also eindeutig.
 */
export function passwortStimmt(hash: string, passwort: string): boolean {
  const [art, nText, saltText, sollText] = hash.split(".");
  if (art !== "scrypt") return false;

  const N = Number(nText);
  /* Nur bekannte Kostenparameter zulassen. Sonst koennte ein manipulierter
     Eintrag mit N=2 die Bremse aushebeln — oder mit einer riesigen Zahl
     den Server beim Anmelden lahmlegen. */
  if (!Number.isInteger(N) || N < 16384 || N > 1048576 || (N & (N - 1)) !== 0) {
    return false;
  }

  let salt: Buffer;
  let soll: Buffer;
  try {
    salt = Buffer.from(saltText, "base64url");
    soll = Buffer.from(sollText, "base64url");
  } catch {
    return false;
  }
  if (salt.length < 8 || soll.length < 16) return false;

  let ist: Buffer;
  try {
    /* maxmem muss mitwachsen: die Voreinstellung von Node reicht fuer
       N = 16384 gerade so, fuer mehr nicht. */
    ist = scryptSync(passwort, salt, soll.length, { N, maxmem: 256 * N * 8 });
  } catch {
    return false;
  }

  return ist.length === soll.length && timingSafeEqual(ist, soll);
}

/**
 * Fingerabdruck des hinterlegten Passworts.
 *
 * Wandert in die Sitzung, damit eine Passwortaenderung die alten Cookies
 * ungueltig macht. Es ist ein Hash des Hashes — aus ihm laesst sich das
 * Passwort nicht zurueckrechnen, und er steht ohnehin nur in einem
 * signierten Cookie, das der Besucher nicht faelschen kann.
 */
export const fingerabdruck = (hash: string) =>
  createHash("sha256").update(hash).digest("base64url").slice(0, 16);

/** Ein Mitglied ueber seine E-Mail. Gross- und Kleinschreibung egal. */
export function mitgliedMit(email: string): Mitglied | null {
  const gesucht = email.trim().toLowerCase();
  return mitglieder().find((m) => m.email.toLowerCase() === gesucht) ?? null;
}
