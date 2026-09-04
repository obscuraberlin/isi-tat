"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/data/landingPage";
import { useLoopImBild } from "@/lib/videoLoop";
import styles from "./VideoTeaser.module.css";

interface VideoTeaserProps {
  asset: MediaAsset;
  /** Beschriftung neben dem Play-Knopf. */
  label?: string;
  /** Kleine Zeile darunter — was einen im Video erwartet. */
  note?: string;
  className?: string;
}

/**
 * Zwei Zustaende in einem Element.
 *
 * Vorschau: das Video laeuft stumm in Schleife, darueber ein Play-Knopf.
 * Das zieht den Blick, ohne dass jemandem ungefragt Ton entgegenkommt —
 * Browser wuerden das ohnehin blockieren.
 *
 * Nach dem Klick: Sprung auf Anfang, Ton an, Schleife aus, native
 * Bedienelemente. Also das, was ein Besucher von einem Klick auf einen
 * Play-Knopf erwartet — kein Weiterlaufen ab Sekunde sieben.
 *
 * Laeuft das Video durch, faellt es in die Vorschau zurueck.
 *
 * Wichtig: muted, loop und controls haengen am Zustand, nicht an
 * imperativen Zuweisungen. Wuerde man sie am DOM setzen, waehrend React
 * dieselben Attribute im JSX fuehrt, haengt das Verhalten davon ab, ob
 * React beim naechsten Rendern zufaellig darueber geht.
 */
export function VideoTeaser({ asset, label, note, className }: VideoTeaserProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  /* Die Vorschau laeuft in der kleinen Fassung — sie ist stumm, laeuft
     nebenbei und wird niemandem als Film verkauft. Auf Klick uebernimmt
     die volle Datei; dann schaut jemand wirklich zu. */
  const quelle = playing ? asset.src : (asset.klein ?? asset.src);

  /* Ausserhalb des Bildes steht die Vorschau still. Laeuft sie mit Ton,
     bleibt sie an — wer sie gestartet hat, will sie hoeren. */
  useLoopImBild(ref, !playing && Boolean(asset.src));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (playing) {
      /* Die Quelle hat gewechselt — ohne load() spielt der Browser die
         Vorschaudatei weiter. load() setzt auch die Abspielposition auf
         null zurueck; ein eigenes currentTime = 0 direkt danach waere
         nicht nur ueberfluessig, es kann werfen, weil das Element in dem
         Moment noch keine Daten hat. */
      el.load();
      /* Scheitert das Abspielen, bleibt der Zustand trotzdem "spielt":
         das Video steht dann mit Bedienelementen da, und ein Druck auf
         Play startet es. Zurueck in die Vorschau zu fallen hiesse, den
         Klick stillschweigend zu verschlucken. */
      el.play().catch(() => {});
      return;
    }

    /* Autoplay der Vorschau darf scheitern (Energiesparmodus, Datensparmodus).
       Dann steht das Posterbild — der Play-Knopf funktioniert trotzdem. */
    el.play().catch(() => {});
  }, [playing]);

  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")}>
      <video
        ref={ref}
        className={styles.video}
        src={quelle ?? undefined}
        poster={asset.poster ?? undefined}
        aria-label={asset.alt}
        muted={!playing}
        loop={!playing}
        controls={playing}
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {playing ? null : (
        <button
          type="button"
          className={styles.overlay}
          onClick={() => setPlaying(true)}
        >
          {/* Unten links statt in der Bildmitte: mittig sass der Knopf
              genau auf dem Gesicht. Am Rand bleibt die Aufnahme frei und
              die Flaeche liest sich wie ein Banner. */}
          <span className={styles.circle} aria-hidden="true">
            <svg viewBox="0 0 9 11" className={styles.icon}>
              <path d="M0 0v11l9-5.5z" />
            </svg>
          </span>
          <span className={styles.text}>
            <span className={styles.label}>
              {label ?? "Ansehen"}
              {/* Der Ton-Hinweis nimmt die Ueberraschung raus. */}
              <span className={styles.hint} aria-hidden="true">
                mit Ton
              </span>
            </span>
            {note ? <span className={styles.note}>{note}</span> : null}
          </span>
          <span className={styles.srOnly}>
            {asset.alt} — mit Ton von Anfang an abspielen
          </span>
        </button>
      )}
    </div>
  );
}
