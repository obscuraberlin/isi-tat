import { kursDateien } from "@/data/mediaFiles";
import type { MediaAsset } from "@/data/landingPage";
import type { KursVideo } from "@/data/masterclass";

/**
 * Woher das Video zu einer Kursnummer kommt.
 *
 * Drei Wege, in dieser Reihenfolge:
 *
 * 1. Eine Datei in public/media, benannt nach der Nummer: v07.mp4.
 *    Fuer einzelne Videos in Ordnung — fuer alle vierzig nicht. Sie
 *    laegen dann fuer immer in der Repository-Historie und wuerden bei
 *    jedem Klonen mitgeladen; GitHub lehnt ab 100 MB je Datei ohnehin ab.
 *
 * 2. CLUB_VIDEO_BASIS — die Adresse, unter der die Videos liegen, ohne
 *    Schraegstrich am Ende. Daraus wird v07.mp4 zusammengesetzt. Das ist
 *    der Weg fuer den Betrieb: die Dateien liegen bei einem Videohoster
 *    (Bunny, Cloudflare Stream, Vimeo Pro) oder in einem Objektspeicher,
 *    und im Projekt steht nur, wo.
 *
 * 3. Nichts davon — dann bleibt die Flaeche ein nummerierter Platzhalter,
 *    genau wie auf der Startseite. Der Mitgliederbereich funktioniert
 *    also, bevor ein einziges Video geschnitten ist.
 *
 * Das Standbild kommt aus derselben Quelle (v07-poster.jpg). Fehlt es,
 * springt das Bild des Kapitels ein — besser ein passendes Motiv als eine
 * schwarze Flaeche.
 */

function basis(): string | null {
  const wert = (process.env.CLUB_VIDEO_BASIS ?? "").trim();
  if (!wert) return null;
  return wert.replace(/\/+$/, "");
}

/**
 * Das Bild fuer die Flaeche ganz oben.
 *
 * Hier taugt das Kapitelbild nicht als Ersatz: die Kapitelmotive sind im
 * Hochformat aufgenommen (2:3), und auf 16:9 beschnitten schneidet der
 * Rahmen genau den Kopf ab. Solange kein eigenes Standbild vorliegt,
 * traegt deshalb ein Motiv, das quer gedreht wurde.
 */
export function kursHeroAsset(
  video: KursVideo,
  querFormat: MediaAsset,
): MediaAsset {
  const datei = kursDateien[video.nr];
  const b = basis();
  const eigenes =
    datei?.poster ?? (b ? `${b}/${kursNr(video.nr)}-poster.jpg` : null);

  const bild = eigenes
    ? { src: eigenes, avif: null, webp: null }
    : {
        src: querFormat.poster ?? querFormat.src,
        avif: null,
        webp: null,
      };

  return {
    id: `kurs-hero-${kursNr(video.nr)}`,
    no: video.nr,
    praefix: "v",
    kind: "image",
    ...bild,
    alt: eigenes ? video.titel : querFormat.alt,
    ratio: "16 / 9",
  };
}

/** v07 — so heissen die Dateien, so steht es im Platzhalter. */
export const kursNr = (nr: number) => `v${String(nr).padStart(2, "0")}`;

export function kursVideoAsset(
  video: KursVideo,
  ersatzBild: MediaAsset,
): MediaAsset {
  const datei = kursDateien[video.nr];
  const b = basis();
  const name = kursNr(video.nr);

  const src = datei?.src ?? (b ? `${b}/${name}.mp4` : null);
  const poster = datei?.poster ?? ersatzBild.src ?? null;

  return {
    id: `kurs-${name}`,
    no: video.nr,
    praefix: "v",
    kind: "video",
    src,
    poster,
    klein: datei?.klein ?? null,
    alt: `${video.titel} — Folge ${video.nr}`,
    ratio: "16 / 9",
  };
}

/**
 * Nur das Standbild — fuer die Kacheln in den Uebersichten. Dort soll
 * nichts laden, was nicht angesehen wird: vierzig Videos, die beim
 * Aufklappen der Seite alle ihre ersten Sekunden holen, waeren ein
 * Vielfaches der Seite selbst.
 */
export interface Kursbild {
  bild: MediaAsset;
  /**
   * false = die Kachel zeigt das Bild des Kapitels, weil zu diesem Video
   * noch kein eigenes Standbild vorliegt. Die Oberflaeche schreibt das
   * dann dazu — sonst sehen zehn Kacheln mit demselben Motiv aus wie ein
   * Fehler und nicht wie eine offene Lieferung.
   */
  eigen: boolean;
}

export function kursBildAsset(
  video: KursVideo,
  ersatzBild: MediaAsset,
): Kursbild {
  const datei = kursDateien[video.nr];
  const b = basis();

  /* Ein eigenes Standbild gewinnt. Erst wenn keines da ist, traegt das
     Kapitelbild die Kachel — und dann mitsamt seiner AVIF- und
     WebP-Fassung. Die duerfen nicht stehen bleiben, wenn src woanders
     hinzeigt: der Browser nimmt die <source>-Zeile zuerst und zeigte dann
     das falsche Bild. */
  const eigenes =
    datei?.poster ?? (b ? `${b}/${kursNr(video.nr)}-poster.jpg` : null);

  const bild = eigenes
    ? { src: eigenes, avif: null, webp: null }
    : { src: ersatzBild.src, avif: ersatzBild.avif, webp: ersatzBild.webp };

  return {
    eigen: Boolean(eigenes),
    bild: {
      id: `kurs-bild-${kursNr(video.nr)}`,
      no: video.nr,
      praefix: "v",
      kind: "image",
      ...bild,
      alt: eigenes ? video.titel : ersatzBild.alt,
      ratio: "16 / 9",
    },
  };
}
