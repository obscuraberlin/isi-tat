import { scryptSync, timingSafeEqual, createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Wer darf hinein — und mit welchem Passwort.
 *
 * Es gibt in diesem Projekt keine Datenbank, und fuer eine Mitgliederliste
 * braucht es auch keine. Die Konten stehen in einer JSON-Datei:
 *
 *   daten/mitglieder.json  — oder wohin CLUB_MITGLIEDER_DATEI zeigt.
 *
 * Angelegt werden sie mit `node tools/mitglied.mjs <e-mail> "<name>"`.
 * Das Werkzeug schreibt den Eintrag in die Datei und schickt dem neuen
 * Mitglied die Bestaetigung per Mail. Ein neues Konto wirkt sofort; die
 * Anwendung merkt am Zeitstempel der Datei, dass sie neu lesen muss.
 *
 * Format — eine Liste, ein Eintrag je Mitglied:
 *
 *   [
 *     {
 *       "email": "max@beispiel.de",
 *       "name": "Max Muster",
 *       "hash": "scrypt.16384....",
 *       "angelegt": "2026-09-08"
 *     }
 *   ]
 *
 * Nebenweg fuer Hoster ohne Platz fuer eine Datei: CLUB_MITGLIEDER mit
 * denselben Angaben in einer Zeile, Eintraege mit ";" getrennt, Felder
 * mit "|". Aendern heisst dort: Anwendung neu starten.
 *
 * Klartext-Passwoerter stehen an keiner der beiden Stellen. Ein Konto
 * loeschen heisst: Eintrag aus der Datei nehmen — die laufende Sitzung
 * dieses Mitglieds ist damit beim naechsten Aufruf zu Ende.
 */

export interface Mitglied {
  email: string;
  name: string;
  hash: string;
  /** Wann das Konto angelegt wurde, als ISO-Datum. Nur zur Uebersicht. */
  angelegt?: string;
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

/**
 * Wo die Mitgliederdatei liegt.
 *
 * Ohne Angabe: daten/mitglieder.json im Projekt. Dorthin schreibt auch
 * tools/mitglied.mjs, wenn ein Konto angelegt wird. CLUB_MITGLIEDER_DATEI
 * verlegt sie — sinnvoll, sobald der Hoster bei jedem Deploy das
 * Projektverzeichnis aus dem Repository frisch aufsetzt; dann laege sie
 * besser daneben als darin.
 */
export const MITGLIEDER_DATEI = () =>
  process.env.CLUB_MITGLIEDER_DATEI ||
  resolve(process.cwd(), "daten", "mitglieder.json");

export function mitglieder(): Mitglied[] {
  const variable = process.env.CLUB_MITGLIEDER;
  const ausListe = ausDatei(MITGLIEDER_DATEI());
  /* Die Variable ist der Nebenweg fuer Hoster ohne Platz fuer eine Datei.
     Gibt es beides, gilt beides — ein Konto aus der Datei und eins aus der
     Variablen sperren sich nicht gegenseitig aus. */
  return variable ? [...ausListe, ...ausVariable(variable)] : ausListe;
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
