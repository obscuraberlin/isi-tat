/**
 * Erzeugt MEDIEN.md aus den echten Daten.
 *
 *   node tools/media-liste.mjs
 *
 * Von Hand gepflegt wuerde die Liste beim ersten neuen Asset falsch. Sie
 * liest deshalb dieselbe Datei, aus der die Seite rendert.
 */
import { writeFileSync } from "node:fs";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./ts-loader.mjs", pathToFileURL("./tools/"));

const d = await import("../src/data/landingPage.ts");

/* Wo taucht welches Asset auf — in der Reihenfolge der Seite. */
const gruppen = [
  ["Hero", [d.hero.video, d.hero.image]],
  ["Trailer (Overlay)", [d.trailer.video]],
  ["Intro (Scrollytelling)", d.intro.scenes.map((s) => s.visual)],
  ["Über ISI", [d.trust.video]],
  ["Was bei mir schiefgelaufen ist", [d.failure.image]],
  ...d.insideTheClub.series.map((s) => [
    `Serie: ${s.label}`,
    [s.cover, s.still, s.preview].filter(Boolean),
  ]),
  ["Live mit ISI", [d.live.visual]],
  ["Erfahrungen", d.testimonials.items.map((t) => t.video)],
  ["Freiheit", [d.lifestyle.video]],
  ["Freiheit (Galerie)", d.lifestyle.gallery],
  ["Abschluss", [d.finalCta.video]],
  ["Präsentationsseite", [d.presentation.video]],
  ["Login-Seite", [d.login.visual]],
];

const zeilen = [];
const gesehen = new Set();
for (const [ort, assets] of gruppen) {
  for (const a of assets) {
    if (!a || gesehen.has(a.no)) continue;
    gesehen.add(a.no);
    zeilen.push({ no: d.assetNo(a), ort, was: a.alt, art: a.kind === "video" ? "Video" : "Bild", format: a.ratio });
  }
}
zeilen.sort((x, y) => x.no.localeCompare(y.no));

const md = `# Material für die ISI TAT Landingpage

${zeilen.length} Flächen. Auf der Seite steht in jedem Platzhalter die Nummer.
Benenne deine Dateien danach — \`01.jpg\`, \`07.mp4\` — dann ist eindeutig,
was wohin gehört.

**Bilder** als JPG oder PNG, mindestens 2000 px auf der langen Seite.
**Videos** als MP4 (H.264), ohne Ton nötig, 1080p reicht.

Das Format in der letzten Spalte ist der Bildausschnitt, in dem die Fläche
rendert. Liefere gern größer — zugeschnitten wird beim Einbauen. Was fehlt,
bleibt als Platzhalter stehen; nichts bricht.

| Nr. | Wo auf der Seite | Was | Art | Format |
|---|---|---|---|---|
${zeilen.map((z) => `| **${z.no}** | ${z.ort} | ${z.was} | ${z.art} | ${z.format} |`).join("\n")}
`;

writeFileSync("MEDIEN.md", md);
console.log(`MEDIEN.md — ${zeilen.length} Flächen`);

/* Gegenprobe: jede angelegte Flaeche muss in der Liste stehen. */
const alle = [];
const sammeln = (v) => {
  if (!v || typeof v !== "object") return;
  if (typeof v.no === "number" && typeof v.ratio === "string") { alle.push(v); return; }
  for (const x of Object.values(v)) sammeln(x);
};
sammeln(d);
const fehlend = alle.filter((a) => !gesehen.has(a.no));
if (fehlend.length) {
  console.error(`FEHLT in der Liste: ${fehlend.map((a) => `${d.assetNo(a)} ${a.id}`).join(", ")}`);
  process.exit(1);
}
