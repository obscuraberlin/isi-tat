"use client";

import Link from "next/link";
import type { MediaAsset } from "@/data/landingPage";
import type { KursVideo } from "@/data/masterclass";
import { club } from "@/data/club";
import { Media } from "@/components/Media/Media";
import { umschalten, useMerkliste } from "@/lib/merker";
import styles from "./FeaturedHero.module.css";

/**
 * Die Flaeche ganz oben.
 *
 * Ein Bild ueber die volle Breite, darauf ein Satz und zwei Knoepfe —
 * nicht drei Kennzahlen und ein Diagramm. Wer hier hereinkommt, soll
 * etwas ansehen wollen, nicht etwas auswerten.
 *
 * Der Verlauf nach unten ist kein Schmuck: darunter beginnt die erste
 * Reihe, und ohne ihn stuende eine harte Kante zwischen Bild und Inhalt.
 */
export function FeaturedHero({
  video,
  bild,
  kapitel,
}: {
  video: KursVideo;
  bild: MediaAsset;
  kapitel: string;
}) {
  const spaeter = useMerkliste("spaeter");
  /* null = noch nicht nachgesehen. Bis dahin gilt "nicht gemerkt" — sonst
     springt der Knopf beim ersten Rendern sichtbar um. */
  const gemerkt = spaeter?.includes(video.nr) ?? false;

  return (
    <section className={styles.hero} aria-labelledby="featured">
      <div className={styles.bild}>
        <Media asset={bild} tone="dark" priority radius="0" ratio="16 / 9" />
      </div>
      <span className={styles.verlauf} aria-hidden="true" />

      <div className={styles.inhalt}>
        <p className={styles.eyebrow}>
          {club.hero.eyebrow}
          <span className={styles.punkt} aria-hidden="true" />
          <span className={styles.kapitelName}>{kapitel}</span>
        </p>

        <h1 id="featured" className={styles.titel}>
          {video.titel}
        </h1>

        <p className={styles.text}>{video.unter}</p>

        <div className={styles.knoepfe}>
          <Link href={`/club/video/${video.nr}/`} className={styles.ansehen}>
            <svg className={styles.play} viewBox="0 0 12 14" aria-hidden="true">
              <path d="M0 0v14l12-7z" />
            </svg>
            {club.hero.ansehen}
          </Link>

          <button
            type="button"
            className={styles.merken}
            onClick={() => umschalten("spaeter", video.nr)}
            aria-pressed={gemerkt}
          >
            <span className={styles.zeichen} aria-hidden="true">
              {gemerkt ? "✓" : "+"}
            </span>
            {gemerkt ? club.hero.spaeterGemerkt : club.hero.spaeterMerken}
          </button>
        </div>
      </div>
    </section>
  );
}
