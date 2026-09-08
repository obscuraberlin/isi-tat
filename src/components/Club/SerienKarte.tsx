import Link from "next/link";
import type { MediaAsset } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import styles from "./SerienKarte.module.css";

/**
 * Eine Serie als Kachel — hochkant, wie ein Filmplakat.
 *
 * Das ist die Ebene, auf der man sich im Club bewegt: fuenf Serien, nicht
 * vierzig Videos. Die Folgen kommen erst, wenn man eine Serie geoeffnet
 * hat. Sonst steht alles auf einmal da, und niemand faengt an.
 *
 * Die Motive sind die Kapitelbilder der Startseite — je Serie ein
 * eigenes. Anders als bei den Folgen wiederholt sich hier nichts.
 */
export function SerienKarte({
  href,
  label,
  tagline,
  anzahl,
  cover,
}: {
  href: string;
  label: string;
  tagline: string;
  anzahl: number;
  cover: MediaAsset;
}) {
  return (
    <Link href={href} className={styles.karte}>
      <div className={styles.bild}>
        <Media asset={cover} tone="dark" radius="inherit" ratio="2 / 3" />
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.zahl}>{anzahl} Folgen</span>
      </div>
      <h3 className={styles.titel}>{label}</h3>
      <p className={styles.text}>{tagline}</p>
    </Link>
  );
}
