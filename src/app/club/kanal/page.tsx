import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { datumLang, kanalNachrichten } from "@/lib/kanal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Der Kanal — Nachrichten aus dem Club.
 *
 * Er geht in eine Richtung: ISI schreibt, die Mitglieder lesen. Das ist
 * eine Entscheidung, keine halbe Sache.
 *
 * Ein Bereich, in dem Mitglieder untereinander schreiben, ist etwas ganz
 * anderes als eine Seite, die Text anzeigt: es braucht einen Speicher fuer
 * die Beitraege, ein Melden und Loeschen, jemanden, der das taeglich
 * ansieht, und eine Datenschutzerklaerung, die beschreibt, was mit den
 * Beitraegen passiert. Wer das nebenbei einbaut, hat kein Forum, sondern
 * eine offene Flanke.
 */
export default async function KanalSeite() {
  await verlangeMitglied("/club/kanal/");
  const nachrichten = kanalNachrichten();

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.kanal.eyebrow}</p>
        <h1 className={styles.titel}>{club.kanal.headline}</h1>
        <p className={styles.lead}>{club.kanal.lead}</p>
        <p className={styles.hinweis}>{club.kanal.hinweis}</p>
      </header>

      {nachrichten.length === 0 ? (
        <div className={styles.leer}>
          <p className={styles.leerTitel}>{club.kanal.leer}</p>
          <p className={styles.leerText}>{club.kanal.leerText}</p>
        </div>
      ) : (
        <ol className={styles.liste}>
          {nachrichten.map((n) => (
            <li key={`${n.datum}-${n.titel}`} className={styles.eintrag}>
              <time className={styles.datum} dateTime={n.datum}>
                {datumLang(n.datum)}
              </time>
              <h2 className={styles.nachrichtTitel}>{n.titel}</h2>
              <div className={styles.text}>
                {n.text.map((absatz, i) => (
                  <p key={i}>{absatz}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
