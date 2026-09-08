import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { liveDaten, terminDatum } from "@/lib/live";
import { LiveKarte } from "@/components/Club/LiveKarte";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Live mit ISI.
 *
 * Solange kein Termin eingetragen ist, steht hier genau ein Satz: dass
 * der naechste hier angekuendigt wird. Kein Platzhaltertermin, kein
 * Knopf, der nichts tut — beides faellt genau einmal auf und dann nie
 * wieder gut aus.
 */
export default async function LiveSeite() {
  await verlangeMitglied("/club/live/");
  const { naechster, kommend, aufzeichnungen } = liveDaten();

  /* Der erste Termin steht schon in der Karte oben. */
  const weitere = kommend.slice(1);

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.live.eyebrow}</p>
        <h1 className={styles.titel}>{club.live.headline}</h1>
        <p className={styles.subline}>{club.live.subline}</p>
      </header>

      <LiveKarte termin={naechster} />

      {weitere.length > 0 ? (
        <section className={styles.block} aria-labelledby="kommend">
          <h2 id="kommend" className={styles.blockTitel}>
            {club.live.kommende}
          </h2>
          <ul className={styles.liste}>
            {weitere.map((t) => (
              <li key={t.id} className={styles.zeile}>
                <time className={styles.datum} dateTime={t.datum}>
                  {terminDatum(t.datum)}
                </time>
                <span className={styles.uhr}>{t.beginn} Uhr</span>
                <span className={styles.was}>{t.titel}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* §24: kein Knopf ohne Aufzeichnung. Die Liste enthaelt nur
          Termine, zu denen tatsaechlich eine vorliegt. */}
      {aufzeichnungen.length > 0 ? (
        <section className={styles.block} aria-labelledby="replays">
          <h2 id="replays" className={styles.blockTitel}>
            {club.live.aufzeichnungen}
          </h2>
          <ul className={styles.liste}>
            {aufzeichnungen.map((t) => (
              <li key={t.id} className={styles.zeile}>
                <time className={styles.datum} dateTime={t.datum}>
                  {terminDatum(t.datum)}
                </time>
                <span className={styles.was}>{t.titel}</span>
                <a
                  className={styles.replay}
                  href={t.aufzeichnung}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {club.live.aufzeichnungAnsehen}
                  <span aria-hidden="true"> →</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
