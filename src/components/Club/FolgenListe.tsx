import Link from "next/link";
import type { KursVideo } from "@/data/masterclass";
import type { Kursbild } from "@/lib/kursMedien";
import { Media } from "@/components/Media/Media";
import styles from "./FolgenListe.module.css";

/**
 * Die Folgen einer Serie als Liste.
 *
 * Nummer, Standbild, Titel, Zeile darunter — mehr braucht die Liste nicht.
 * Sie ist zum Auswaehlen da, nicht zum Lesen; was ein Video erzaehlt,
 * steht auf seiner eigenen Seite.
 *
 * Die Nummer zaehlt innerhalb der Serie (1, 2, 3 …), nicht im Katalog.
 * Wer bei "Sales" anfaengt, soll dort bei 1 anfangen und nicht bei 9.
 *
 * Laufzeiten stehen nicht dabei: die Videos sind nicht geschnitten, und
 * eine geratene Minutenzahl waere die erste Luege im Club.
 */
export function FolgenListe({
  folgen,
  bilder,
  aktuell,
}: {
  folgen: readonly KursVideo[];
  bilder: Record<number, Kursbild>;
  /** Die gerade laufende Folge — wird markiert, nicht verlinkt. */
  aktuell?: number;
}) {
  return (
    <ol className={styles.liste}>
      {folgen.map((folge, i) => {
        const laeuft = folge.nr === aktuell;
        const inhalt = (
          <>
            <span className={styles.nummer} aria-hidden="true">
              {i + 1}
            </span>
            <span
              className={[
                styles.bild,
                bilder[folge.nr]?.eigen ? "" : styles.geliehen,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Media
                asset={bilder[folge.nr].bild}
                tone="dark"
                radius="8px"
                ratio="16 / 9"
              />
            </span>
            <span className={styles.text}>
              <span className={styles.titel}>{folge.titel}</span>
              <span className={styles.unter}>{folge.unter}</span>
            </span>
          </>
        );

        return (
          <li key={folge.nr} className={styles.eintrag}>
            {laeuft ? (
              <span className={`${styles.zeile} ${styles.laeuft}`} aria-current="true">
                {inhalt}
              </span>
            ) : (
              <Link href={`/club/video/${folge.nr}/`} className={styles.zeile}>
                {inhalt}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
}
