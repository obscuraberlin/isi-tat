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

  /* Mitten in einer Folge aufgehoert? Dann geht es dort weiter — sonst
     bei der naechsten ungesehenen. */
  const video = kursVideos.find((v) => v.nr === stand.weiterBei) ?? kursVideos[0];
  const kapitel = kursKapitel.find((k) => k.id === video.kapitelId);
  const folgeNr = kapitel
    ? kapitel.videos.findIndex((v) => v.nr === video.nr) + 1
    : 0;
  const folgeProzent = stand.prozent(video.nr);
  const angefangen = folgeProzent > 0 && folgeProzent < 100;
  const serie = kapitel ? stand.serie(kapitel.videos.map((v) => v.nr)) : null;
  const gesamt = serie?.gesamt ?? REIHENFOLGE.length;
  const gesehenInSerie = serie?.gesehen ?? stand.anzahl;
  const anteil = serie?.prozent ?? 0;

  const eyebrow = stand.alle
    ? club.naechste.eyebrowFertig
    : angefangen
      ? club.naechste.eyebrowWeiter
      : stand.anzahl === 0
        ? club.naechste.eyebrowAnfang
        : club.naechste.eyebrow;
  const knopf = stand.alle
    ? club.naechste.nochmal
    : stand.anzahl === 0 && !angefangen
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
        {angefangen ? (
          <span className={styles.bildBalken} aria-hidden="true">
            <span className={styles.bildBalkenVoll} style={{ width: `${folgeProzent}%` }} />
          </span>
        ) : null}
      </Link>

      <div className={styles.text}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        {kapitel ? (
          <p className={styles.serie}>
            {kapitel.kurz}
            <span className={styles.punkt} aria-hidden="true" />
            Folge {folgeNr}
            {angefangen ? (
              <>
                <span className={styles.punkt} aria-hidden="true" />
                <span className={styles.folgeStand}>{club.naechste.folgeStand(folgeProzent)}</span>
              </>
            ) : null}
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

      {/* Der Stand in dieser Serie — Zaehlung, kein Zeugnis. */}
      <div className={styles.stand}>
        <div
          className={styles.balken}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={gesamt}
          aria-valuenow={gesehenInSerie}
          aria-label={`${kapitel?.kurz ?? ""}: ${club.naechste.stand(gesehenInSerie, gesamt)}`}
        >
          <span className={styles.balkenVoll} style={{ width: `${anteil}%` }} />
        </div>
        <p className={styles.standText}>
          {kapitel ? `${kapitel.kurz} · ` : ""}
          {club.naechste.stand(gesehenInSerie, gesamt)}
          {anteil > 0 ? ` · ${anteil} %` : ""}
        </p>
      </div>
    </section>
  );
}
