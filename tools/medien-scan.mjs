/**
 * Sucht in public/media nach Dateien, die nach einer Asset-Nummer benannt
 * sind, und schreibt daraus src/data/mediaFiles.ts.
 *
 *   node tools/medien-scan.mjs
 *
 * Laeuft als prebuild automatisch vor jedem Build. Dadurch reicht es, eine
 * Datei 03.mp4 in den Ordner zu legen — niemand muss danach Code anfassen.
 *
 * Erkannt werden:
 *   03.mp4          das Asset selbst
 *   03.avif/.webp   dasselbe Bild in modernem Format, neben der JPEG-Fassung
 *   03-poster.jpg   Standbild fuer ein Video
 *   03-klein.mp4    kleine, stumme Fassung fuer Handy und Hintergrund
 *
 * AVIF und WebP landen NICHT auf src, sondern in eigenen Feldern: sie
 * gehoeren in <source>-Zeilen eines <picture>, waehrend das JPEG die
 * Rueckfallebene im <img> bleibt. Wuerden sie wie bisher alle auf src
 * geschrieben, entschiede die Reihenfolge von readdir, welches Format
 * jemand bekommt — auch ein Browser, der es nicht anzeigen kann.
 *
 * Die kleine Fassung wird NICHT ueber <source media> ausgewaehlt — das
 * Attribut wertet in <video> kein Browser aus, gemessen: auf 390 px laedt
 * Chromium trotzdem die grosse Datei. Die Auswahl trifft deshalb die
 * Media-Komponente im Browser, bevor eine Quelle gesetzt wird.
 */
import { readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const DIR = "public/media";
const BILD = /\.(jpg|jpeg|png|webp|avif)$/i;
const VIDEO = /\.(mp4|webm)$/i;

mkdirSync(DIR, { recursive: true });

const dateien = existsSync(DIR) ? readdirSync(DIR) : [];
const treffer = {};
/* Zweiter Satz Nummern: die 40 Videos der Masterclass heissen v01…v40.
   Ein eigener Namensraum, damit die Nummern der Startseite (01…35) beim
   Dazukommen eines Kursvideos nicht verrutschen — an ihnen haengt die
   ganze Uebergabeliste in MEDIEN.md. */
const kurs = {};

for (const name of dateien) {
  const k = /^v(\d{2})(-poster|-klein)?\.([a-z0-9]+)$/i.exec(name);
  if (k) {
    if (!BILD.test(name) && !VIDEO.test(name)) continue;
    const no = Number(k[1]);
    const rolle = (k[2] ?? "").toLowerCase();
    kurs[no] ??= {};
    if (rolle === "-poster") kurs[no].poster = `/media/${name}`;
    else if (rolle === "-klein") kurs[no].klein = `/media/${name}`;
    else kurs[no].src = `/media/${name}`;
    continue;
  }

  const m = /^(\d{2})(-poster|-klein)?\.([a-z0-9]+)$/i.exec(name);
  if (!m) continue;
  if (!BILD.test(name) && !VIDEO.test(name)) continue;

  const no = Number(m[1]);
  const rolle = (m[2] ?? "").toLowerCase();
  const endung = m[3].toLowerCase();
  treffer[no] ??= {};

  if (rolle === "-poster") {
    /* Das Posterbild steht als Attribut am <video>. Dort gibt es keine
       Aushandlung und keine Rueckfallebene — kann der Browser das Format
       nicht, bleibt die Flaeche schwarz. Also nur breit unterstuetzte
       Formate, moderne Fassungen daneben waeren totes Gewicht. */
    if (endung === "avif" || endung === "webp") continue;
    treffer[no].poster = `/media/${name}`;
  } else if (rolle === "-klein") treffer[no].klein = `/media/${name}`;
  else if (endung === "avif") treffer[no].avif = `/media/${name}`;
  else if (endung === "webp") treffer[no].webp = `/media/${name}`;
  else treffer[no].src = `/media/${name}`;
}

/* Ein Posterbild ohne zugehoeriges Asset waere ein stiller Fehler — die
   Flaeche saehe gefuellt aus, ohne dass etwas abspielbar ist. */
for (const [no, eintrag] of Object.entries(treffer)) {
  /* Liegt nur eine moderne Fassung da, traegt sie eben die Flaeche —
     besser ein WebP ohne Rueckfallebene als ein leeres Feld. */
  eintrag.src ??= eintrag.webp ?? eintrag.avif;

  if (!eintrag.src) {
    console.warn(
      `Warnung: zu Nummer ${no} liegt nur ein Poster oder eine kleine Fassung — die Hauptdatei fehlt.`,
    );
    delete treffer[no];
  }
}

const kursZeilen = Object.keys(kurs)
  .map(Number)
  .sort((a, b) => a - b)
  .map((no) => `  ${no}: ${JSON.stringify(kurs[no])},`);

const zeilen = Object.keys(treffer)
  .map(Number)
  .sort((a, b) => a - b)
  .map((no) => `  ${no}: ${JSON.stringify(treffer[no])},`);

writeFileSync(
  "src/data/mediaFiles.ts",
  `/* Erzeugt von tools/medien-scan.mjs — nicht von Hand aendern.
   Dateien liegen in public/media und heissen nach ihrer Asset-Nummer. */

export interface MediaFile {
  src?: string;
  /** Dasselbe Bild als AVIF — erste Wahl im <picture>. */
  avif?: string;
  /** Dasselbe Bild als WebP — zweite Wahl. */
  webp?: string;
  poster?: string;
  klein?: string;
}

export const mediaFiles: Record<number, MediaFile> = {
${zeilen.join("\n")}
};

/* Die Masterclass-Videos, v01…v40. Liegt zu einer Nummer nichts, bleibt
   die Flaeche im Mitgliederbereich ein Platzhalter — genau wie auf der
   Startseite. */
export const kursDateien: Record<number, MediaFile> = {
${kursZeilen.join("\n")}
};
`,
);

const anzahl = zeilen.length;
console.log(
  anzahl
    ? `src/data/mediaFiles.ts — ${anzahl} Datei${anzahl === 1 ? "" : "en"} gefunden`
    : "src/data/mediaFiles.ts — noch kein Material in public/media",
);
if (kursZeilen.length) {
  console.log(`  davon Masterclass (v01…v40): ${kursZeilen.length}`);
}
