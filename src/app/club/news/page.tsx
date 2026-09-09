import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { bildAdresse, datumLang, feed } from "@/lib/news";
import { Beispiel } from "@/components/Club/Beispiel";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * News — der Feed aus dem Club.
 *
 * Was ISI hier schreibt, zusammen mit dem, was er draussen veroeffentlicht:
 * neue Videos von YouTube und Instagram erscheinen von selbst, sobald die
 * Quellen eingerichtet sind. Jeder Eintrag sagt, woher er kommt.
 *
 * Der Feed geht in eine Richtung: ISI schreibt, die Mitglieder lesen.
 */
export default async function NewsSeite() {
  await verlangeMitglied("/club/news/");
  const eintraege = await feed();

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.news.eyebrow}</p>
        <h1 className={styles.titel}>{club.news.headline}</h1>
        <p className={styles.lead}>{club.news.lead}</p>
        <p className={styles.hinweis}>{club.news.hinweis}</p>
      </header>

      {eintraege.length === 0 ? (
        <div className={styles.leer}>
          <p className={styles.leerTitel}>{club.news.leer}</p>
          <p className={styles.leerText}>{club.news.leerText}</p>
        </div>
      ) : (
        <ol className={styles.liste}>
          {eintraege.map((n) => {
            const bild = n.bild ? (n.bildVonDraussen ? bildAdresse(n.bild) : n.bild) : null;
            const inhalt = (
              <>
                {bild ? (
                  <div className={styles.bild}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={bild} alt="" loading="lazy" decoding="async" />
                    {n.link ? (
                      <span className={styles.play} aria-hidden="true">
                        <svg viewBox="0 0 12 14">
                          <path d="M0 0v14l12-7z" />
                        </svg>
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <div className={styles.koerper}>
                  <p className={styles.meta}>
                    <span className={[styles.quelle, styles[n.quelle]].join(" ")}>
                      {club.news.quelle[n.quelle]}
                    </span>
                    <time className={styles.datum} dateTime={n.datum}>
                      {datumLang(n.datum)}
                    </time>
                    <Beispiel wenn={n.beispiel} />
                  </p>
                  <h2 className={styles.nachrichtTitel}>{n.titel}</h2>
                  {n.text.length > 0 ? (
                    <div className={styles.text}>
                      {n.text.map((absatz, i) => (
                        <p key={i}>{absatz}</p>
                      ))}
                    </div>
                  ) : null}
                  {n.link ? (
                    <span className={styles.mehr}>
                      {club.news.ansehen}
                      <span aria-hidden="true"> →</span>
                    </span>
                  ) : null}
                </div>
              </>
            );

            return (
              <li key={n.id} className={styles.eintrag}>
                {n.link ? (
                  <a
                    href={n.link}
                    className={styles.verweis}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {inhalt}
                  </a>
                ) : (
                  inhalt
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
