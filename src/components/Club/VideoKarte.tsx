import Link from "next/link";
import type { MediaAsset } from "@/data/landingPage";
import type { KursVideo } from "@/data/masterclass";
import { Media } from "@/components/Media/Media";
import { kursNr } from "@/lib/kursMedien";
import styles from "./VideoKarte.module.css";

/**
 * Eine Kachel je Video.
 *
 * Gross, mit Standbild — das ist die ganze Idee des Bereichs: vierzig
 * Videos, die man ansieht, nicht vierzig Zeilen, die man abhakt. Deshalb
 * traegt die Kachel das Bild und nicht ein Symbol vor einer Ueberschrift.
 *
 * Die Nummer steht klein in der Ecke. Sie ist Ordnung im Katalog und der
 * Name der Datei — kein Pflichtweg. Wer bei 17 anfangen will, faengt bei
 * 17 an.
 */
export function VideoKarte({
  video,
  bild,
  eigen = true,
  breit = false,
}: {
  video: KursVideo;
  bild: MediaAsset;
  /** false = das Bild gehoert dem Kapitel, nicht diesem Video. */
  eigen?: boolean;
  /** Erste Kachel einer Reihe darf groesser stehen. */
  breit?: boolean;
}) {
  return (
    <Link
      href={`/club/video/${video.nr}/`}
      className={[styles.karte, breit ? styles.breit : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[styles.bild, eigen ? "" : styles.geliehen]
          .filter(Boolean)
          .join(" ")}
      >
        <Media asset={bild} tone="dark" radius="inherit" ratio="16 / 9" />
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.nummer}>{kursNr(video.nr)}</span>
        {/* Zurueckhaltend, aber eindeutig: das Motiv gehoert dem Kapitel,
            das eigene Standbild kommt mit dem fertigen Video. */}
        {eigen ? null : (
          <span className={styles.folgt}>Standbild folgt</span>
        )}
        <span className={styles.play} aria-hidden="true">
          <svg viewBox="0 0 11 13" aria-hidden="true">
            <path d="M0 0v13l11-6.5z" />
          </svg>
        </span>
      </div>

      <div className={styles.text}>
        <h3 className={styles.titel}>{video.titel}</h3>
        <p className={styles.unter}>{video.unter}</p>
      </div>
    </Link>
  );
}
