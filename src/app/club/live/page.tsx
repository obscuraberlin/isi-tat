import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { liveDaten, terminDatum } from "@/lib/live";
import { LiveKarte } from "@/components/Club/LiveKarte";
import { Beispiel } from "@/components/Club/Beispiel";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Live mit ISI.
 *
 * Oben der naechste Termin mit Zusage und Kalender. Darunter, was noch
 * kommt, und was schon war — mit Aufzeichnung, wenn es eine gibt, sonst
 * nur als Zeile. Solange kein Termin eingetragen ist, steht hier genau
 * ein Satz: dass der naechste hier angekuendigt wird.
 */
export default async function LiveSeite() {
  const sitzung = await verlangeMitglied("/club/live/");
  const { naechster, kommend, vergangen } = liveDaten();

  /* Der erste Termin steht schon in der Karte oben. */
  const weitere = kommend.slice(1);

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.live.eyebrow}</p>
        <h1 className={styles.titel}>{club.live.headline}</h1>
        <p className={styles.subline}>{club.live.subline}</p>
      </header>

      <LiveKarte termin={naechster} email={sitzung.email} aufSeite />

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
                <span className={styles.was}>
                  {t.titel} <Beispiel wenn={t.beispiel} />
                </span>
                <a
                  className={styles.replay}
                  href={`/api/kalender/?art=live&id=${encodeURIComponent(t.id)}`}
                >
                  {club.zusage.kalender}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* §24: kein Knopf ohne Aufzeichnung. Vergangene ohne Video stehen
          nur als Zeile — man sieht, was war, ohne ins Leere zu klicken. */}
      {vergangen.length > 0 ? (
        <section className={styles.block} aria-labelledby="vergangen">
          <h2 id="vergangen" className={styles.blockTitel}>
            {club.live.vergangene}
          </h2>
          <ul className={styles.liste}>
            {vergangen.map((t) => (
              <li key={t.id} className={`${styles.zeile} ${styles.vorbei}`}>
                <time className={styles.datum} dateTime={t.datum}>
                  {terminDatum(t.datum)}
                </time>
                <span className={styles.uhr}>{t.beginn} Uhr</span>
                <span className={styles.was}>
                  {t.titel} <Beispiel wenn={t.beispiel} />
                </span>
                {t.aufzeichnung ? (
                  <a
                    className={styles.replay}
                    href={t.aufzeichnung}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {club.live.aufzeichnungAnsehen}
                    <span aria-hidden="true"> →</span>
                  </a>
                ) : (
                  <span className={styles.status}>{club.live.vergangen}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
