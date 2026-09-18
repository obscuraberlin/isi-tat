"use client";

import Link from "next/link";
import type { kursKapitel } from "@/data/masterclass";
import type { Kursbild } from "@/lib/kursMedien";
import { club } from "@/data/club";
import { useFortschritt } from "@/lib/fortschritt";
import { Media } from "@/components/Media/Media";
import styles from "./FolgenReihe.module.css";

/**
 * Eine Serie als Reihe auf der Startseite — die Folgen nebeneinander,
 * wischbar, jede mit Bild, Nummer, Titel und Stand.
 *
 * Das ist der kuerzeste Weg zu einem Video: Startseite auf, Reihe
 * sehen, Folge antippen. Kein Plakat, keine Serienseite dazwischen.
 * Die Serienseite gibt es weiter — fuer Beschreibung und Liste.
 */
export function FolgenReihe({
  kapitel,
  bilder,
}: {
  kapitel: (typeof kursKapitel)[number];
  bilder: Record<number, Kursbild>;
}) {
  const stand = useFortschritt();
  const serie = stand ? stand.serie(kapitel.videos.map((v) => v.nr)) : null;

  return (
    <section className={styles.reihe} aria-labelledby={`reihe-${kapitel.id}`}>
      <div className={styles.kopf}>
        <div>
          <h3 id={`reihe-${kapitel.id}`} className={styles.titel}>
            {kapitel.kurz}
          </h3>
          <p className={styles.stand}>
            {serie
              ? `${club.kapitel.stand(serie.gesehen, serie.gesamt)}${serie.prozent > 0 ? ` · ${serie.prozent} %` : ""}`
              : `${kapitel.videos.length} Folgen`}
          </p>
        </div>
        <Link href={`/club/kapitel/${kapitel.id}/`} className={styles.mehr}>
          {club.start.serieOeffnen}
          <span aria-hidden="true"> →</span>
        </Link>
      </div>

      <ol className={styles.band}>
        {kapitel.videos.map((folge, i) => {
          const gesehen = stand?.gesehen.has(folge.nr) ?? false;
          const offen = stand ? stand.frei(folge.nr) : true;
          const prozent = stand ? stand.prozent(folge.nr) : 0;
          const angefangen = prozent > 0 && prozent < 100;
          const inhalt = (
            <>
              <span className={styles.bild}>
                <Media asset={bilder[folge.nr].bild} tone="dark" radius="10px" ratio="16 / 9" />
                <span className={styles.nummer} aria-hidden="true">
                  {gesehen ? (
                    <svg viewBox="0 0 12 10">
                      <path d="M1 5.5 4.5 9 11 1" fill="none" strokeWidth="1.8" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                {!offen ? (
                  <span className={styles.schloss} aria-hidden="true">
                    <svg viewBox="0 0 12 14">
                      <path d="M3 6V4.5a3 3 0 0 1 6 0V6M2 6h8v7H2z" fill="none" strokeWidth="1.4" />
                    </svg>
                  </span>
                ) : (
                  <span className={styles.play} aria-hidden="true">
                    <svg viewBox="0 0 12 14">
                      <path d="M0 0v14l12-7z" />
                    </svg>
                  </span>
                )}
                {angefangen ? (
                  <span className={styles.balken} aria-hidden="true">
                    <span className={styles.balkenVoll} style={{ width: `${prozent}%` }} />
                  </span>
                ) : null}
              </span>
              <span className={styles.text}>
                <span className={styles.folgeTitel}>{folge.titel}</span>
                <span className={styles.folgeUnter}>
                  {!offen ? club.gesperrt.kurz : angefangen ? club.naechste.folgeStand(prozent) : `Folge ${i + 1}`}
                </span>
              </span>
            </>
          );
          const klassen = [styles.karte, gesehen ? styles.gesehen : "", !offen ? styles.zu : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <li key={folge.nr} className={styles.eintrag}>
              {offen ? (
                <Link href={`/club/video/${folge.nr}/`} className={klassen}>
                  {inhalt}
                </Link>
              ) : (
                <span className={klassen} aria-disabled="true">
                  {inhalt}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
