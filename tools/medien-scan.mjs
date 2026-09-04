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
 *   03-poster.jpg   Standbild fuer ein Video
 *   03-klein.mp4    kleine, stumme Fassung fuer Handy und Hintergrund
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

for (const name of dateien) {
  const m = /^(\d{2})(-poster|-klein)?\.[a-z0-9]+$/i.exec(name);
  if (!m) continue;
  if (!BILD.test(name) && !VIDEO.test(name)) continue;

  const no = Number(m[1]);
  const rolle = (m[2] ?? "").toLowerCase();
  treffer[no] ??= {};

  if (rolle === "-poster") treffer[no].poster = `/media/${name}`;
  else if (rolle === "-klein") treffer[no].klein = `/media/${name}`;
  else treffer[no].src = `/media/${name}`;
}

/* Ein Posterbild ohne zugehoeriges Asset waere ein stiller Fehler — die
   Flaeche saehe gefuellt aus, ohne dass etwas abspielbar ist. */
for (const [no, eintrag] of Object.entries(treffer)) {
  if (!eintrag.src) {
    console.warn(
      `Warnung: zu Nummer ${no} liegt nur ein Poster oder eine kleine Fassung — die Hauptdatei fehlt.`,
    );
    delete treffer[no];
  }
}

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
  poster?: string;
  klein?: string;
}

export const mediaFiles: Record<number, MediaFile> = {
${zeilen.join("\n")}
};
`,
);

const anzahl = zeilen.length;
console.log(
  anzahl
    ? `src/data/mediaFiles.ts — ${anzahl} Datei${anzahl === 1 ? "" : "en"} gefunden`
    : "src/data/mediaFiles.ts — noch kein Material in public/media",
);
