import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * Die Sitzung eines angemeldeten Mitglieds — als signiertes Cookie.
 *
 * Warum kein Sitzungsspeicher auf dem Server: es gibt keine Datenbank.
 * Ein signiertes Cookie traegt die Angaben selbst und der Server prueft
 * nur die Unterschrift. Das kostet nichts, ueberlebt einen Neustart und
 * kommt ohne zusaetzlichen Dienst aus.
 *
 * Was es dafuer nicht kann: eine einzelne Sitzung gezielt beenden. Wer
 * jemanden sofort aussperren muss, aendert sein Passwort in der
 * Mitgliederliste — dann passt der Fingerabdruck im Cookie nicht mehr und
 * die Sitzung ist tot, ohne dass alle anderen herausfliegen.
 *
 * Bewusst kein JWT und keine Bibliothek dafuer: hier wird eine Zeichenkette
 * signiert und geprueft, mehr nicht. Ein JWT braeuchte eine Abhaengigkeit
 * und braechte ein Format mit, dessen bekannteste Fussangel ("alg": "none")
 * wir uns damit erst einhandeln.
 *
 * Das Geheimnis kommt aus CLUB_SITZUNG_GEHEIMNIS oder aus einer Datei,
 * die der Server beim ersten Start selbst anlegt. Im Quelltext steht es
 * nie — siehe `geheimnis()`.
 */

/** Name des Cookies. Kurz und nichtssagend, es steht in jeder Anfrage. */
export const COOKIE = "isi_sitzung";

/** Wie lange eine Anmeldung haelt, wenn niemand "angemeldet bleiben" waehlt. */
export const DAUER_KURZ = 12 * 60 * 60 * 1000; // 12 Stunden
/** Und mit dem Haken. */
export const DAUER_LANG = 30 * 24 * 60 * 60 * 1000; // 30 Tage

export interface Sitzung {
  /** E-Mail des Mitglieds — die Kennung. */
  email: string;
  /** Anzeigename fuer die Begruessung. */
  name: string;
  /**
   * Fingerabdruck des Passworts zum Zeitpunkt der Anmeldung. Aendert ISI
   * das Passwort, passt er nicht mehr und die alte Sitzung faellt.
   */
  fp: string;
  /** Ablauf als Zeitstempel. */
  exp: number;
}

/**
 * Woher der Schluessel fuer die Unterschrift kommt.
 *
 *   1. CLUB_SITZUNG_GEHEIMNIS, wenn gesetzt und lang genug.
 *   2. Sonst die Datei daten/geheimnis. Gibt es sie nicht, wird sie beim
 *      ersten Aufruf mit 32 Zufallsbytes angelegt.
 *
 * Der zweite Weg ist der Grund, warum der Club ohne Einrichtung laeuft
 * und trotzdem nichts Geheimes im Quelltext steht: der Wert entsteht auf
 * dem Server, bleibt dort und faellt nie in ein Repository.
 *
 * Warum eine Datei und kein Zufallswert im Arbeitsspeicher: Next buendelt
 * proxy.ts und die Routen getrennt. Zwei Buendel bekaemen zwei
 * verschiedene Zufallswerte, und der Proxy wiese jedes Cookie ab, das die
 * Anmelderoute gerade ausgestellt hat. Bei mehreren Arbeitsprozessen und
 * nach einem Neustart dasselbe Bild. Die Datei sehen alle gleich.
 *
 * Angelegt wird mit "wx" — ausschliesslich. Kommen zwei Prozesse
 * gleichzeitig, gewinnt einer, der andere liest, was der erste
 * geschrieben hat. Sonst haetten beide je einen eigenen Schluessel.
 */
const GEHEIMNIS_DATEI = resolve(process.cwd(), "daten", "geheimnis");

let ausDatei: string | null | undefined;

function geheimnisAusDatei(): string | null {
  if (ausDatei !== undefined) return ausDatei;

  try {
    const wert = readFileSync(GEHEIMNIS_DATEI, "utf8").trim();
    if (wert.length >= 32) return (ausDatei = wert);
  } catch {
    /* noch nicht da — gleich anlegen */
  }

  try {
    mkdirSync(dirname(GEHEIMNIS_DATEI), { recursive: true });
    const neu = randomBytes(32).toString("base64url");
    writeFileSync(GEHEIMNIS_DATEI, neu + "\n", { flag: "wx", mode: 0o600 });
    return (ausDatei = neu);
  } catch {
    /* Jemand anders war schneller, oder die Platte ist nicht beschreibbar.
       Noch einmal lesen — dann steht fest, welcher der beiden Faelle. */
    try {
      const wert = readFileSync(GEHEIMNIS_DATEI, "utf8").trim();
      if (wert.length >= 32) return (ausDatei = wert);
    } catch {
      /* nicht beschreibbar und nicht lesbar */
    }
  }

  /* Nicht zwischenspeichern: beim naechsten Versuch koennte es klappen. */
  return null;
}

function geheimnis(): string | null {
  const wert = process.env.CLUB_SITZUNG_GEHEIMNIS ?? "";
  /* Ein zu kurzes Geheimnis ist schlimmer als ein fehlendes: es sieht aus,
     als waere etwas eingerichtet. Unter 32 Zeichen gilt es als nicht
     gesetzt. */
  if (wert.length >= 32) return wert;
  return geheimnisAusDatei();
}

/** Ist die Anmeldung ueberhaupt eingerichtet? */
export const anmeldungMoeglich = () => geheimnis() !== null;

const b64 = (b: Buffer) => b.toString("base64url");

function unterschrift(nutzlast: string, key: string) {
  return createHmac("sha256", key).update(nutzlast).digest();
}

/** Baut das Cookie. Gibt null zurueck, wenn kein Geheimnis gesetzt ist. */
export function sitzungSchreiben(sitzung: Sitzung): string | null {
  const key = geheimnis();
  if (!key) return null;
  const nutzlast = b64(Buffer.from(JSON.stringify(sitzung), "utf8"));
  return `${nutzlast}.${b64(unterschrift(nutzlast, key))}`;
}

/**
 * Prueft das Cookie und gibt die Sitzung zurueck — oder null.
 *
 * Reihenfolge ist Absicht: erst die Unterschrift, dann der Inhalt. Wer
 * zuerst den Inhalt liest, wertet Daten aus, die noch niemand bestaetigt
 * hat.
 */
export function sitzungLesen(wert: string | undefined | null): Sitzung | null {
  const key = geheimnis();
  if (!key || !wert) return null;

  const punkt = wert.lastIndexOf(".");
  if (punkt < 1) return null;

  const nutzlast = wert.slice(0, punkt);
  let gegeben: Buffer;
  try {
    gegeben = Buffer.from(wert.slice(punkt + 1), "base64url");
  } catch {
    return null;
  }

  const erwartet = unterschrift(nutzlast, key);
  if (gegeben.length !== erwartet.length) return null;
  if (!timingSafeEqual(gegeben, erwartet)) return null;

  let sitzung: Sitzung;
  try {
    sitzung = JSON.parse(Buffer.from(nutzlast, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (
    typeof sitzung?.email !== "string" ||
    typeof sitzung?.fp !== "string" ||
    typeof sitzung?.exp !== "number" ||
    sitzung.exp < Date.now()
  ) {
    return null;
  }

  return sitzung;
}

/** Ein Geheimnis erzeugen — fuer tools/mitglied.mjs. */
export const neuesGeheimnis = () => randomBytes(32).toString("base64url");
