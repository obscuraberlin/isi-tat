import Link from "next/link";
import { club } from "@/data/club";
import type { LiveTermin } from "@/data/live";
import { terminDatum } from "@/lib/live";
import { zusageStand } from "@/lib/zusagen";
import { Beispiel } from "./Beispiel";
import { Zusage } from "./Zusage";
import styles from "./LiveKarte.module.css";

/**
 * Der naechste Live-Termin.
 *
 * Steht keiner an, verschwindet die Karte nicht — sie sagt, dass hier
 * einer angekuendigt wird. Ein erfundener Termin waere schlimmer als
 * keiner, eine leere Stelle unehrlicher.
 *
 * Mit Termin: Zusagen, in den Kalender — und LIVE BEITRETEN nur, wenn
 * tatsaechlich eine Adresse hinterlegt ist. Ein Knopf, der nichts tut,
 * ist die eine Sache, die ein Mitglied genau einmal ausprobiert.
 */
export function LiveKarte({
  termin,
  email,
  aufSeite = false,
}: {
  termin: LiveTermin | null;
  /** Wer gerade angemeldet ist — fuer den Stand der Zusage. */
  email: string;
  /** Auf /club/live selbst: kein Link dorthin. */
  aufSeite?: boolean;
}) {
  if (!termin) {
    return (
      <section className={`${styles.karte} ${styles.leer}`}>
        <p className={styles.eyebrow}>{club.live.naechster}</p>
        <p className={styles.leerTitel}>{club.live.leer}</p>
        <p className={styles.leerText}>{club.live.leerText}</p>
      </section>
    );
  }

  const stand = zusageStand("live", termin.id, email);

  return (
    <section className={styles.karte} aria-labelledby="live-naechster">
      <div className={styles.text}>
        <p className={styles.eyebrow}>
          {club.live.naechster} <Beispiel wenn={termin.beispiel} />
        </p>
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
        <Zusage art="live" id={termin.id} zugesagt={stand.zugesagt} andere={stand.andere} offen />
        {aufSeite ? null : (
          <Link href="/club/live/" className={styles.mehr}>
            {club.live.headline.replace(".", "")}
            <span aria-hidden="true"> →</span>
          </Link>
        )}
      </div>
    </section>
  );
}
