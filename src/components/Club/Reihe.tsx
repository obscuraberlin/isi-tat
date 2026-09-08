"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { KursVideo } from "@/data/masterclass";
import type { Kursbild } from "@/lib/kursMedien";
import { VideoKarte } from "./VideoKarte";
import styles from "./Reihe.module.css";

/**
 * Eine waagerechte Reihe wie in einem Streamingdienst.
 *
 * Warum kein Raster: auf der Startseite soll man ueberblicken, was es
 * gibt, nicht alles auf einmal sehen. Vierzig Kacheln untereinander sind
 * ein Katalog — der steht unter "Inhalte". Hier laufen sechs bis acht
 * nebeneinander, die naechste schaut hervor, und der Rest ist einen Wisch
 * entfernt.
 *
 * Gescrollt wird nativ mit scroll-snap. Die Pfeile sind Zugabe fuer die
 * Maus; ohne sie funktioniert die Reihe genauso. Auf dem Telefon gibt es
 * sie nicht — dort wischt man.
 *
 * Leere Reihen rendern nichts. Eine Ueberschrift ueber einer leeren
 * Flaeche sieht aus, als waere etwas kaputt.
 */
export function Reihe({
  titel,
  videos,
  bilder,
  mehrHref,
  mehrLabel,
}: {
  titel: string;
  videos: readonly KursVideo[];
  bilder: Record<number, Kursbild>;
  mehrHref?: string;
  mehrLabel?: string;
}) {
  const band = useRef<HTMLUListElement>(null);
  const [kannLinks, setKannLinks] = useState(false);
  const [kannRechts, setKannRechts] = useState(false);

  const pruefen = useCallback(() => {
    const el = band.current;
    if (!el) return;
    /* Ein Pixel Toleranz: Browser runden die Scrollposition, und ohne
       das bleibt der rechte Pfeil am Ende sichtbar, ohne etwas zu tun. */
    setKannLinks(el.scrollLeft > 1);
    setKannRechts(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    pruefen();
    const el = band.current;
    if (!el) return;
    /* Auch auf Groessenaenderung hoeren: beim Drehen des Telefons oder
       beim Aufziehen des Fensters passt die alte Antwort nicht mehr. */
    const beobachter = new ResizeObserver(pruefen);
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, [pruefen, videos.length]);

  if (videos.length === 0) return null;

  const schieben = (richtung: 1 | -1) => {
    const el = band.current;
    if (!el) return;
    /* Nicht ganz eine Fensterbreite: eine Kachel bleibt stehen, damit man
       sieht, wo man war. */
    el.scrollBy({ left: richtung * el.clientWidth * 0.86, behavior: "smooth" });
  };

  const id = `reihe-${titel.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <section className={styles.reihe} aria-labelledby={id}>
      <div className={styles.kopf}>
        <h2 id={id} className={styles.titel}>
          {titel}
        </h2>

        <div className={styles.rechts}>
          {mehrHref ? (
            <Link href={mehrHref} className={styles.mehr}>
              {mehrLabel}
              <span aria-hidden="true"> →</span>
            </Link>
          ) : null}

          <div className={styles.pfeile}>
            <button
              type="button"
              className={styles.pfeil}
              onClick={() => schieben(-1)}
              disabled={!kannLinks}
              aria-label={`${titel}: zurück`}
            >
              <svg viewBox="0 0 8 12" aria-hidden="true">
                <path d="M7 1 2 6l5 5" fill="none" strokeWidth="1.6" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.pfeil}
              onClick={() => schieben(1)}
              disabled={!kannRechts}
              aria-label={`${titel}: weiter`}
            >
              <svg viewBox="0 0 8 12" aria-hidden="true">
                <path d="m1 1 5 5-5 5" fill="none" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul className={styles.band} ref={band} onScroll={pruefen}>
        {videos.map((video) => (
          <li key={video.nr} className={styles.eintrag}>
            <VideoKarte
              video={video}
              bild={bilder[video.nr]?.bild}
              eigen={bilder[video.nr]?.eigen}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
