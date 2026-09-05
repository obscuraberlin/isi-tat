"use client";

import { useState } from "react";
import type { Series } from "@/data/landingPage";
import { insideTheClub } from "@/data/landingPage";
import { useInView } from "@/lib/hooks";
import { Media } from "@/components/Media/Media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal/Reveal";
import { SeriesModal } from "./SeriesModal";
import styles from "./SeriesRow.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

function Card({
  series,
  onOpen,
  /** Kopie fuer den Endlos-Lauf: dekorativ, nicht anspringbar, nicht vorgelesen. */
  kopie = false,
}: {
  series: Series;
  onOpen: () => void;
  kopie?: boolean;
}) {
  const count = series.episodes.length;

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onOpen}
      aria-label={`${series.label} öffnen`}
      aria-hidden={kopie || undefined}
      tabIndex={kopie ? -1 : undefined}
    >
      <Media asset={series.cover} tone="dark" radius="inherit" />

      <span className={styles.scrim} aria-hidden="true" />

      <div className={styles.cardBody}>
        {/* Laufzeit steht nur da, wenn sie gemessen ist. Geschaetzte
            Minuten waeren eine Angabe, die sich nachpruefen laesst. */}
        <span className={styles.cardMeta}>
          {series.format === "live" ? "Format" : "Serie"} ·{" "}
          {count} {count === 1 ? "Folge" : "Folgen"}
          {series.runtime ? ` · ${series.runtime}` : ""}
        </span>
        <h3 className={styles.cardLabel}>{series.label}</h3>
        <div className={styles.cardCopyWrap}>
          <div>
            <p className={styles.cardCopy}>{series.tagline}</p>
          </div>
        </div>
        <span className={styles.cardOpen}>
          <svg className={styles.playIcon} viewBox="0 0 9 11" aria-hidden="true">
            <path d="M0 0v11l9-5.5z" />
          </svg>
          Ansehen
        </span>
      </div>
    </button>
  );
}

/* Drei Kopien: eine reicht nicht ueber die Breite eines grossen Schirms,
   zwei liessen beim Sprung eine Luecke. Verschoben wird um genau eine
   Kopie — dadurch sitzt der Sprung auf einem identischen Bild. */
const KOPIEN = 3;

export function SeriesRow() {
  const [active, setActive] = useState<Series | null>(null);

  /* Das Band stand still, bis der Besucher fast daran vorbei war: die
     Animation lief seit dem Aufruf der Seite und war bis hierher schon
     halb durch, also stand die Reihe beim Ankommen zufaellig irgendwo.
     Jetzt wartet sie und setzt sich in Bewegung, sobald der Abschnitt
     ins Bild kommt — ein Stueck vorher, damit sie beim Lesen schon
     laeuft und nicht aus dem Stand anfaengt. */
  const { ref: bandRef, inView } = useInView<HTMLDivElement>({
    threshold: 0,
    rootMargin: "0px 0px 12% 0px",
  });

  return (
    <section className={styles.section} id="im-club">
      <Backdrop variant="glow" tone="light" drift={60} />

      <Reveal className={styles.head}>
        <div>
          <Eyebrow rule>{insideTheClub.eyebrow}</Eyebrow>
          <h2 className={styles.headline}>{insideTheClub.headline}</h2>
        </div>

        <p className={styles.subline}>{insideTheClub.subline}</p>
      </Reveal>

      {/* Laufband ueber die volle Breite statt einer Spalte mit Pfeilen:
          links wie rechts laeuft es aus dem Bild, die Reihe steht nie
          angeschnitten still. Haelt an, sobald jemand mit der Maus oder
          der Tastatur hineingeht — sonst klickt man auf ein Ziel, das
          sich wegbewegt. */}
      <div
        ref={bandRef}
        className={styles.marquee}
        role="region"
        aria-label={`${insideTheClub.headline} — Serien`}
      >
        <div
          className={[styles.track, inView ? "" : styles.trackWartet]
            .filter(Boolean)
            .join(" ")}
        >
          {Array.from({ length: KOPIEN }, (_, kopie) =>
            insideTheClub.series.map((series) => (
              <Card
                key={`${kopie}-${series.id}`}
                series={series}
                kopie={kopie > 0}
                onOpen={() => setActive(series)}
              />
            )),
          )}
        </div>
      </div>

      <div className={styles.noteWrap}>
        <p className={styles.note}>{insideTheClub.note}</p>
      </div>

      <SeriesModal series={active} onClose={() => setActive(null)} />
    </section>
  );
}
