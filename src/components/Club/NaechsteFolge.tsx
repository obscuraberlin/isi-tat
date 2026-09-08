"use client";

import Link from "next/link";
import { kursKapitel, kursVideos } from "@/data/masterclass";
import { club } from "@/data/club";
import type { Kursbild } from "@/lib/kursMedien";
import { REIHENFOLGE, useFortschritt } from "@/lib/fortschritt";
import { Media } from "@/components/Media/Media";
import styles from "./NaechsteFolge.module.css";

/**
 * Die Karte ganz oben: wo es weitergeht.
 *
 * Bild, Serie, Titel, ein Knopf — und darunter, wie weit man ist. Das
 * ist die eine Sache, die ein Mitglied beim Hereinkommen braucht: nicht
 * suchen, sondern druecken.
 *
 * Der Stand kommt aus dem Browser; bis er da ist, steht ein leerer
 * Rahmen in derselben Groesse, damit nichts springt.
 */
export function NaechsteFolge({ bilder }: { bilder: Record<number, Kursbild> }) {
  const stand = useFortschritt();

  if (!stand) {
    return <div className={`${styles.karte} ${styles.leer}`} aria-hidden="true" />;
  }

  const video = kursVideos.find((v) => v.nr === stand.naechste) ?? kursVideos[0];
  const kapitel = kursKapitel.find((k) => k.id === video.kapitelId);
  const folgeNr = kapitel
    ? kapitel.videos.findIndex((v) => v.nr === video.nr) + 1
    : 0;
  const gesamt = REIHENFOLGE.length;
  const anteil = Math.round((stand.anzahl / gesamt) * 100);

  const eyebrow = stand.alle
    ? club.naechste.eyebrowFertig
    : stand.anzahl === 0
      ? club.naechste.eyebrowAnfang
      : club.naechste.eyebrow;
  const knopf = stand.alle
    ? club.naechste.nochmal
    : stand.anzahl === 0
      ? club.naechste.anfangen
      : club.naechste.weiter;

  return (
    <section className={styles.karte} aria-labelledby="naechste">
      <Link href={`/club/video/${video.nr}/`} className={styles.bild}>
        <Media asset={bilder[video.nr].bild} tone="dark" radius="inherit" ratio="16 / 9" />
        <span className={styles.play} aria-hidden="true">
          <svg viewBox="0 0 12 14" aria-hidden="true">
            <path d="M0 0v14l12-7z" />
          </svg>
        </span>
      </Link>

      <div className={styles.text}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        {kapitel ? (
          <p className={styles.serie}>
            {kapitel.label}
            <span className={styles.punkt} aria-hidden="true" />
            Folge {folgeNr}
          </p>
        ) : null}
        <h2 id="naechste" className={styles.titel}>
          {video.titel}
        </h2>
        <p className={styles.unter}>
          {stand.alle ? club.naechste.fertigText : video.unter}
        </p>

        <Link href={`/club/video/${video.nr}/`} className={styles.knopf}>
          <svg className={styles.knopfPlay} viewBox="0 0 12 14" aria-hidden="true">
            <path d="M0 0v14l12-7z" />
          </svg>
          {knopf}
        </Link>
      </div>

      {/* Zaehlung, kein Zeugnis: wie viele Folgen gesehen sind. */}
      <div className={styles.stand}>
        <div
          className={styles.balken}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={gesamt}
          aria-valuenow={stand.anzahl}
          aria-label={club.naechste.stand(stand.anzahl, gesamt)}
        >
          <span className={styles.balkenVoll} style={{ width: `${anteil}%` }} />
        </div>
        <p className={styles.standText}>{club.naechste.stand(stand.anzahl, gesamt)}</p>
      </div>
    </section>
  );
}
