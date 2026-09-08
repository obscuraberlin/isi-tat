import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { datumLang, newsBeitraege } from "@/lib/news";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * News — der Feed aus dem Club.
 *
 * Er geht in eine Richtung: ISI schreibt, die Mitglieder lesen. Das ist
 * eine Entscheidung, keine halbe Sache. Ein Bereich, in dem Mitglieder
 * untereinander schreiben, braucht Speicher, Moderation und eine
 * Datenschutzerklaerung, die das beschreibt — ein eigener Schritt.
 */
export default async function NewsSeite() {
  await verlangeMitglied("/club/news/");
  const beitraege = newsBeitraege();

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.news.eyebrow}</p>
        <h1 className={styles.titel}>{club.news.headline}</h1>
        <p className={styles.lead}>{club.news.lead}</p>
        <p className={styles.hinweis}>{club.news.hinweis}</p>
      </header>

      {beitraege.length === 0 ? (
        <div className={styles.leer}>
          <p className={styles.leerTitel}>{club.news.leer}</p>
          <p className={styles.leerText}>{club.news.leerText}</p>
        </div>
      ) : (
        <ol className={styles.liste}>
          {beitraege.map((n) => (
            <li key={`${n.datum}-${n.titel}`} className={styles.eintrag}>
              {n.bild ? (
                <div className={styles.bild}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.bild} alt="" loading="lazy" decoding="async" />
                </div>
              ) : null}
              <div className={styles.koerper}>
                <time className={styles.datum} dateTime={n.datum}>
                  {datumLang(n.datum)}
                </time>
                <h2 className={styles.nachrichtTitel}>{n.titel}</h2>
                <div className={styles.text}>
                  {n.text.map((absatz, i) => (
                    <p key={i}>{absatz}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
