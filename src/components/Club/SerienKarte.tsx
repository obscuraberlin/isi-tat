import Link from "next/link";
import type { MediaAsset } from "@/data/landingPage";
import { club } from "@/data/club";
import { Media } from "@/components/Media/Media";
import styles from "./SerienKarte.module.css";

/**
 * Eine Serie als Kachel — hochkant, wie ein Filmplakat.
 *
 * Das ist die Ebene, auf der man sich im Club bewegt: fuenf Serien, nicht
 * vierzig Videos. Die Folgen kommen erst, wenn man eine Serie geoeffnet
 * hat.
 *
 * Unter dem Plakat steht, wie weit man in der Serie ist. Eine Serie, die
 * noch nicht dran ist, steht gedaempft da — mit Schloss, aber trotzdem
 * anklickbar: man darf hineinsehen, was kommt.
 */
export function SerienKarte({
  href,
  label,
  tagline,
  anzahl,
  cover,
  stand,
  gesperrt = false,
}: {
  href: string;
  label: string;
  tagline: string;
  anzahl: number;
  cover: MediaAsset;
  /** "3 von 8 gesehen" — ohne Angabe steht die Folgenzahl. */
  stand?: string;
  gesperrt?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[styles.karte, gesperrt ? styles.gesperrt : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.bild}>
        <Media asset={cover} tone="dark" radius="inherit" ratio="2 / 3" />
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.zahl}>{stand ?? `${anzahl} Folgen`}</span>
        {gesperrt ? (
          <span className={styles.schloss} title={club.gesperrt.kurz}>
            <svg viewBox="0 0 12 14" aria-hidden="true">
              <path d="M3 6V4.5a3 3 0 0 1 6 0V6M2 6h8v7H2z" fill="none" strokeWidth="1.4" />
            </svg>
            <span className={styles.sr}>{club.gesperrt.kurz}</span>
          </span>
        ) : null}
      </div>
      <h3 className={styles.titel}>{label}</h3>
      <p className={styles.text}>{tagline}</p>
    </Link>
  );
}
