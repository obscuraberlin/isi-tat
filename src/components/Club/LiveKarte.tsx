import Link from "next/link";
import { club } from "@/data/club";
import type { LiveTermin } from "@/data/live";
import { terminDatum } from "@/lib/live";
import styles from "./LiveKarte.module.css";

/**
 * Der naechste Live-Termin.
 *
 * Steht keiner an, verschwindet die Karte nicht — sie sagt, dass hier
 * einer angekuendigt wird. Ein erfundener Termin waere schlimmer als
 * keiner, eine leere Stelle unehrlicher.
 *
 * Der Knopf erscheint nur, wenn tatsaechlich eine Adresse hinterlegt ist.
 * Ein "LIVE BEITRETEN", das nichts tut, ist die eine Sache, die ein
 * Mitglied genau einmal ausprobiert.
 */
export function LiveKarte({ termin }: { termin: LiveTermin | null }) {
  if (!termin) {
    return (
      <section className={`${styles.karte} ${styles.leer}`}>
        <p className={styles.eyebrow}>{club.live.naechster}</p>
        <p className={styles.leerTitel}>{club.live.leer}</p>
        <p className={styles.leerText}>{club.live.leerText}</p>
      </section>
    );
  }

  return (
    <section className={styles.karte} aria-labelledby="live-naechster">
      <div className={styles.text}>
        <p className={styles.eyebrow}>{club.live.naechster}</p>
        <h2 id="live-naechster" className={styles.titel}>
          {termin.titel}
        </h2>
        <p className={styles.wann}>
          <time dateTime={termin.datum}>{terminDatum(termin.datum)}</time>
          <span className={styles.punkt} aria-hidden="true" />
          {termin.beginn}
          {termin.ende ? `–${termin.ende}` : ""} Uhr
        </p>
        {termin.beschreibung ? (
          <p className={styles.beschreibung}>{termin.beschreibung}</p>
        ) : null}
      </div>

      <div className={styles.aktion}>
        {termin.beitreten ? (
          <a
            className={styles.knopf}
            href={termin.beitreten}
            target="_blank"
            rel="noreferrer noopener"
          >
            {club.live.beitreten}
          </a>
        ) : null}
        <Link href="/club/live/" className={styles.mehr}>
          {club.live.headline.replace(".", "")}
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </section>
  );
}
